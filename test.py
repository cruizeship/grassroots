import requests
from bs4 import BeautifulSoup

url = "https://www.google.com/search?q=puppies&tbm=isch"

# page = open('tower.html', 'r').read()
page = requests.get(url).text

soup = BeautifulSoup(page, 'html.parser')

for raw_img in soup.find_all('img'):
  link = raw_img.get('src')
  if link:
    print(link)