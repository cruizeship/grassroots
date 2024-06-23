from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
from openai import OpenAI
import urllib.parse
import os
import ast

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

def get_news_search_results(query, num_results):
    search_url = f"https://www.google.com/search?q={query}&tbm=nws&num={num_results}"
    response = requests.get(search_url, headers={"User-Agent": "Mozilla/5.0"})
    response.raise_for_status()
    soup = BeautifulSoup(response.text, "html.parser")

    divs = soup.find_all('div', class_='BNeawe vvjwJb AP7Wnd')
    articles = []
    
    if not divs:
        print("No news results found.")
        return articles
    
    for div in divs:
        headline = div.text
        link_tag = div.find_parent('a')
        if link_tag:
            raw_url = link_tag.get('href')
            if raw_url.startswith('/url?q='):
                url = urllib.parse.unquote(raw_url.split('/url?q=')[1].split('&sa=')[0])
            else:
                url = 'No valid link found'
        else:
            url = 'No link found'
            
        articles.append((headline, url))
            
    return articles

def prompt_openai(prompt):
    api_key = os.getenv('OPENAI_API_KEY')
    client = OpenAI(api_key=api_key)
    completion = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )
    return completion.choices[0].message.content

def fetch_headline_image(query):
    url = f"https://www.google.com/search?q={query}&tbm=isch"

    page = requests.get(url).text

    soup = BeautifulSoup(page, 'html.parser')

    links = []

    for raw_img in soup.find_all('img'):
        link = raw_img.get('src')
        if link:
            links.append(link)
    
    if len(links) > 1:
        return links[1]
    else:
        return links[0]
    
def fetch_high_res_image(query):
    cse_id = "a4046e53171224720"
    api_key = "AIzaSyACbz9sKwTad1zePq5jhnq6825EDL6-cVs"

    url = f"https://www.googleapis.com/customsearch/v1?q={query}&num=1&start=1&imgSize=huge&searchType=image&key={api_key}&cx={cse_id}"

    response = requests.get(url)
    response.raise_for_status()

    links = response.json()
    imageLink = links['items'][0]['link']

    return imageLink

@app.route('/run-script', methods=['POST'])
def run_script():
    input_data = request.json
    selected_topics = input_data.get('selectedTopics')
    if not selected_topics:
        return jsonify({"error": "No topics provided"}), 400

    location = "San Francisco Bay Area"
    num_results = 5
    all_articles = []

    for topic in selected_topics:
        query = f"{location} local news in the past week about {topic}"
        articles = get_news_search_results(query, num_results)
        if articles:
            all_articles.extend(articles)

    if not all_articles:
        return jsonify({"error": "No articles found"}), 404

    prompt = f"""For the following list, give me a list of important distinct events that are referenced by several articles (i.e. a short blurb). 
    {all_articles} If it's not related to the selected  {selected_topics} and/or it's not in {location}, don't account for it. If it's an opinion article or a guide, don't account for it.
    It should be formatted as a python array of arrays, with the first item being the event title and the second item the links that pertain to it. The event should be something distinct and not a general topic — i.e. the Golden Gate Bridge has shut down."
    Please don't do things like '''python or /n, i should be able to assign the output text to a variable
    """
    
    response_content = prompt_openai(prompt)
    
    try:
        response_tuples = ast.literal_eval(response_content)
        for event in response_tuples:
            
            #event.append((fetch_high_res_image(event[0])))
            event.append((fetch_headline_image(event[0])))

        return jsonify({'headlines': response_tuples})
    except ValueError:
        return jsonify({"error": "Failed to parse OpenAI response"}), 500

    
def scrape_article(url):
    # Send a request to the URL
    response = requests.get(url)

    # Check if the request was successful
    # if response.status_code != 200:
      #  raise Exception(f"Failed to load page {url}, status code: {response.status_code}")

    # Parse the HTML content of the page
    soup = BeautifulSoup(response.content, 'html.parser')

    # Extract the relevant content
    # This part depends on the structure of the website. We'll use an example of a common structure.
    article_content = ''

    # Many news websites use <article> tag or specific class names for article content
    article = soup.find('article')
    if article:
        paragraphs = article.find_all('p')
    else:
        # Fallback to a generic method, searching for <p> tags within a div with a common class name
        paragraphs = soup.find_all('p')

    for p in paragraphs:
        article_content += p.get_text() + '\n'

    return article_content.strip()

def prompt_openai(prompt):
    api_key = os.getenv('OPENAI_API_KEY')
    client = OpenAI(api_key=api_key)
    completion = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )
    return completion.choices[0].message.content

@app.route('/generate-article', methods=['POST'])
def generate_article():
    input_data = request.json
    headline = input_data.get("headline")
    links = input_data.get("links")
    imageLink = input_data.get("imageLink")

    linkText = ""

    for link in links:
        linkText += scrape_article(link)
    
    articleText = prompt_openai(f"""Summarize the following text. Three to five key takeaway bullet points at the topic, then several subheadings with paragraphs on certain topics. : {linkText}.
    at the top."""
    )
    print("done with article gen")
    print(articleText)

    return jsonify({'txt' : [headline, imageLink, articleText]})

if __name__ == '__main__':
    app.run(debug=True)
