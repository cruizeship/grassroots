import requests
from bs4 import BeautifulSoup
import json
import re

url = "https://www.google.com/search?q=puppies&tbm=isch"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}

# Send a request to Google Images
response = requests.get(url, headers=headers)
page = response.text

# Parse the HTML content
soup = BeautifulSoup(page, 'html.parser')

# Find the script tags that contain the image data
script_tags = soup.find_all('script')

high_res_images = []

# Extract the high resolution images from the JSON data in the script tags
for script in script_tags:
    if 'AF_initDataCallback' in script.text:
        try:
            json_data = re.search(r'AF_initDataCallback\((.*?)\);', script.text).group(1)
            json_data = json_data.replace('key: \'ds:1\'', '\"key\": \"ds:1\"')
            json_data = json_data.replace('hash: \"2\"', '\"hash\": \"2\"')
            json_data = json_data.replace('data:', '\"data\":')
            json_data = json_data.replace('\n', '').replace(' ', '')
            data = json.loads(json_data)
            images = data['data'][31][0][12][2]
            for image in images:
                try:
                    high_res_images.append(image[1][3][0])
                except:
                    continue
        except:
            continue

# Print high resolution image URLs
for img_url in high_res_images:
    print(img_url)
