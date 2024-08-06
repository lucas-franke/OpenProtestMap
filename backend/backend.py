#!/bin/python

from flask import Flask, request, Response, jsonify
from flask_cors import CORS
import requests
import os
import json


api_key = "Insert-API-key"
project_root_dir = os.path.dirname(os.path.abspath(__file__))


app = Flask(__name__)
CORS(app)

def get_coordinate(zCoordinate, xCoordinate, yCoordinate):
    print(api_key)
    url = "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/" + zCoordinate + "/" + xCoordinate + "/" + yCoordinate + ".png?api_key=" + api_key
    print("URL: ")
    response = requests.get(url, headers={"Accept-Encoding": "gzip"})
    
    return Response(response.content, mimetype='image/png')

@app.route("/getLocations", methods=['GET'])
def getLocations():
    #Read existing location entries from json array
    with open(project_root_dir + "/locations.json", "r") as file:
        locations = json.load(file)
        file.close()

    return locations

@app.route("/saveLocation", methods=['POST'])
def receive_data():
    #Read existing location entries from json array
    with open(project_root_dir + "/locations.json", "r") as file:
        locations = json.load(file)
        file.close()

    #Ensure location data is a list
    if not isinstance(locations, list):
        raise ValueError("JSON data is not an array")

    #Add new location to list
    new_location = request.get_json()
    locations.append(new_location)

    #Write updated locations into locations.json
    with open(project_root_dir + "/locations.json", "w") as file:
        print("Writing into file...")
        json.dump(locations, file, indent=4)
        file.close()

    return jsonify({"status": "success", "data_received": locations}), 200

@app.route("/getcoordinate")
def index():
    zCoordinate = request.args['zCoordinate']
    xCoordinate = request.args['xCoordinate']
    yCoordinate = request.args['yCoordinate']

    #return data
    return get_coordinate(zCoordinate, xCoordinate, yCoordinate)


app.run(host="0.0.0.0", port=5000)
