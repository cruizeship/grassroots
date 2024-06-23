from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

def generate_articles(selected_topics):
    articles = []
    for index, topic in enumerate(selected_topics):
        headline = f"{topic} Headline #{index+1}"
        image_url = f"https://via.placeholder.com/150?text={topic}"
        articles.append({"headline": headline, "image_url": image_url})
    return articles

@app.route('/run-script', methods=['POST'])
def run_script():
    input_data = request.json
    selected_topics = input_data.get('selectedTopics')
    if not selected_topics:
        return jsonify({"error": "No topics provided"}), 400
    
    articles = generate_articles(selected_topics)
    return jsonify({"articles": articles})

if __name__ == '__main__':
    app.run(debug=True)
