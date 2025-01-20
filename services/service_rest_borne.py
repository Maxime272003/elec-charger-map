from flask import Flask, request, jsonify
import requests

app = Flask(__name__)


@app.route('/nearest_station', methods=['GET'])
def nearest_station():
    lat = request.args.get('lat')
    lon = request.args.get('lon')
    station = get_nearest_charging_station(lat, lon)
    return jsonify(station)


def get_nearest_charging_station(lat, lon):
    url = "https://odre.opendatasoft.com/api/records/1.0/search/"
    params = {
        'dataset': 'bornes-irve',
        'geofilter.distance': f'{lat},{lon},10000',
        'rows': 1,
    }

    response = requests.get(url, params=params)

    if response.status_code == 200:
        data = response.json()
        if data['records']:
            station = data['records'][0]['fields']
            return station
        else:
            return {"error": "Aucune borne de recharge trouvée à proximité."}
    else:
        return {"error": f"Erreur lors de la requête : {response.status_code}"}


if __name__ == '__main__':
    app.run(port=5000, debug=True)
