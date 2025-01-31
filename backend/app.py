from flask import Flask, request, jsonify
from services.service_graphql_vehicule import get_vehicles
from services.service_rest_borne import get_nearest_charging_station
from services.service_rest_map import obtenir_trajet
from flask_cors import CORS  # type: ignore
import os
from dotenv import load_dotenv  # type: ignore

load_dotenv()

app = Flask(__name__)
CORS(app)


@app.route('/vehicles', methods=['GET'])
def vehicles():
    return jsonify(get_vehicles())


@app.route('/nearest_station', methods=['GET'])
def nearest_station():
    lat = request.args.get('lat')
    lon = request.args.get('lon')
    return jsonify(get_nearest_charging_station(lat, lon))


@app.route('/trajet', methods=['GET'])
def trajet():
    start = request.args.get('start')
    end = request.args.get('end')
    return jsonify(obtenir_trajet(start, end))


if __name__ == '__main__':
    app.run(port=5000, debug=True)
