import flask
from flask import request, jsonify

app = flask.Flask(__name__)
app.config["DEBUG"] = True

songs = [{'song':'song1'}, {'song':'song2'}, {'song':'song3'}, {'song':'song4'}]

@app.route('/getSong', methods=['POST'])
def home():
    print(request.get_json())
    return jsonify(songs)

app.run()