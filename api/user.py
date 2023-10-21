from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import openai
import requests

app = Flask(__name__)

users = {}
form_data = {}

@app.route('/register', methods=['POST'])
def register():
    username = request.json.get('username')
    password = request.json.get('password')

    if username in users:
        return jsonify({'message': 'User already exists'}), 400

    users[username] = generate_password_hash(password)
    return jsonify({'message': 'User created successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')

    if username not in users or not check_password_hash(users[username], password):
        return jsonify({'message': 'Invalid username or password'}), 401

    return jsonify({'message': 'Logged in successfully'}), 200

@app.route('/form1', methods=['POST'])
def form1():
    form_data['form1'] = request.form.to_dict()
    return jsonify({'message': 'Form 1 data stored successfully'}), 200

@app.route('/form2', methods=['POST'])
def form2():
    form_data['form2'] = request.form.to_dict()
    return jsonify({'message': 'Form 2 data stored successfully'}), 200

@app.route('/form3', methods=['POST'])
def form3():
    form_data['form3'] = request.form.to_dict()
    return jsonify({'message': 'Form 3 data stored successfully'}), 200

@app.route('/form4', methods=['POST'])
def form4():
    form_data['form4'] = request.form.to_dict()
    return jsonify({'message': 'Form 4 data stored successfully'}), 200

@app.route('/openai', methods=['POST'])
def gpt_call():
    openai.api_key = "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"

    # Example of calling the GPT-3 API
    response = openai.Completion.create(
        engine="gpt-3.5-turbo-instruct",
        prompt=requests.json.get('prompt'),
        max_tokens = 3500
    )

    output = response.choices[0].text
    return jsonify({'output': output}), 200

if __name__ == '__main__':
    app.run(port=8000,debug=True)