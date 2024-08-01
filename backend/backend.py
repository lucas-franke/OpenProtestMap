#!/bin/python

from flask import Flask, request, send_file, Response
import requests
import json
import gzip
from io import BytesIO


api_key = "e9e80697-e365-459f-8ace-afffd3cf3715"


app = Flask(__name__)

def get_coordinate(zCoordinate, xCoordinate, yCoordinate):
    print(api_key)
    url = "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/" + zCoordinate + "/" + xCoordinate + "/" + yCoordinate + ".png?api_key=" + api_key
    print("URL: ")
    response = requests.get(url, headers={"Accept-Encoding": "gzip"})
    
    return Response(response.content, mimetype='image/png')

@app.route("/getcoordinate")
def index():
    zCoordinate = request.args['zCoordinate']
    xCoordinate = request.args['xCoordinate']
    yCoordinate = request.args['yCoordinate']

    data = {
        "zCoordinate": zCoordinate,
        "xCoordinate": xCoordinate,
        "yCoordinate": yCoordinate
    }
    
    #return data
    return get_coordinate(zCoordinate, xCoordinate, yCoordinate)

app.run(host="0.0.0.0", port=5000)
