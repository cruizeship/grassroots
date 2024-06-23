import requests
import json

query = input('Enter term: ')

cse_id = "a4046e53171224720"
api_key = "AIzaSyACbz9sKwTad1zePq5jhnq6825EDL6-cVs"

url = f"https://www.googleapis.com/customsearch/v1?q={query}&num=1&start=1&imgSize=huge&searchType=image&key={api_key}&cx={cse_id}"

response = requests.get(url)
response.raise_for_status()

search_results = response.json()
image_url = search_results['items'][0]['link']

print('Image URL:', image_url)