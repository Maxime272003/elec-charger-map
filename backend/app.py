import requests
from flask import Flask, request, jsonify
from services.service_graphql_vehicule import get_vehicles
from services.service_rest_borne import get_nearest_charging_station
from services.service_rest_map import obtenir_trajet, geocode_location
from flask_cors import CORS
from dotenv import load_dotenv
from lxml import etree

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

@app.route('/geocode', methods=['GET'])
def geocode():
    location = request.args.get('location')
    coordinates = geocode_location(location)
    if coordinates:
        return jsonify({"lat": coordinates[0], "lon": coordinates[1]})
    else:
        return jsonify({"error": "Location not found"}), 404

@app.route('/calculer_temps_trajet', methods=['GET'])
def calculer_temps_trajet():
    distance = float(request.args.get('distance'))
    autonomie = float(request.args.get('autonomie'))
    nb_charge = int(request.args.get('nb_recharges'))

    # Construire la requête SOAP
    soap_request = f"""
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:spy="spyne.service.soap">
       <soapenv:Header/>
       <soapenv:Body>
          <spy:calculer_temps_trajet>
             <spy:distance>{distance}</spy:distance>
             <spy:autonomie>{autonomie}</spy:autonomie>
             <spy:nb_charge>{nb_charge}</spy:nb_charge>
          </spy:calculer_temps_trajet>
       </soapenv:Body>
    </soapenv:Envelope>
    """

    headers = {'Content-Type': 'text/xml'}
    response = requests.post('http://localhost:8000/', data=soap_request, headers=headers)

    # Parse la réponse SOAP
    root = etree.fromstring(response.content)
    namespaces = {'ns': 'spyne.service.soap'}
    time = root.find('.//ns:calculer_temps_trajetResponse/ns:calculer_temps_trajetResult/ns:string[1]', namespaces).text
    price = root.find('.//ns:calculer_temps_trajetResponse/ns:calculer_temps_trajetResult/ns:string[2]', namespaces).text

    return jsonify({"time": time, "price": price})

if __name__ == '__main__':
    app.run(port=5000, debug=True)