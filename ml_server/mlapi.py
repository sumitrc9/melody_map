import flask
from flask import request, jsonify
import json
import ml_model

app = flask.Flask(__name__)
app.config["DEBUG"] = True

songs = [{'song':'song1'}, {'song':'song2'}, {'song':'song3'}, {'song':'song4'}]

@app.route('/getSong', methods=['POST'])
def home():
	data = json.loads(request.get_json())
	print(data)
	uri_list = ml_model.generate_recomendations(data)
	print(uri_list)
	return jsonify(uri_list)

app.run()