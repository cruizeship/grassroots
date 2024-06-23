from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from mistralai.client import MistralClient
from mistralai.models.chat_completion import ChatMessage

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

API_KEY = "f1WKMcmgAeBgZiLNnKvnVXUgqbucBsCS"
MODEL = "mistral-large-latest"

client = MistralClient(api_key=API_KEY)

def prompt(prompt):
  chat_response = client.chat(
      model=MODEL,
      messages=[ChatMessage(role="user", content=prompt)]
  )
  return chat_response.choices[0].message.content

@app.route('/run-script', methods=['POST'])
def run_script():
    input_data = request.json
    prompt_text = input_data.get('prompt')
    if not prompt_text:
        return jsonify({"error": "No prompt provided"}), 400
    
    response_message = prompt(prompt_text)
    return jsonify({"message": response_message})

if __name__ == '__main__':
    app.run(debug=True)
