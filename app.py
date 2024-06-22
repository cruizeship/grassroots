from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/run-script', methods=['POST'])
def run_script():
    # Your Python script logic here
    result = {"message": "Python script executed successfully"}
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)