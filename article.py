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

    return jsonify({'headline' : headline, 'imageLink' : imageLink, 'articleText' : articleText})

if __name__ == '__main__':
    app.run(debug=True)