from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)  # Enable CORS for all origins
client = MongoClient("mongodb://mongo:27017/")
db = client["webapp"]
collection = db["user_data"]

@app.route('/store', methods=['POST'])
def store_data():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    if name and email:
        collection.insert_one({'name': name, 'email': email})
        return jsonify({'message': 'Data stored successfully'}), 200
    else:
        return jsonify({'message': 'Invalid data format'}), 400

@app.route('/entries', methods=['GET'])
def get_entries():
    entries = list(collection.find({}, {'_id': 0}))  # Exclude _id field
    return jsonify(entries)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
