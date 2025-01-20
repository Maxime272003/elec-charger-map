from flask import Flask, jsonify
import requests

app = Flask(__name__)


@app.route('/vehicles', methods=['GET'])
def vehicles():
    query = """
    query {
        vehicleList {
            id
            naming {
                make
                model
                chargetrip_version
            }
            media {
                image {
                    thumbnail_url
                }
            }
            battery {
                usable_kwh
            }
            range {
                chargetrip_range {
                    best
                    worst
                }
            }
        }
    }
    """
    headers = {
        'Content-Type': 'application/json',
        'x-client-id': '678a0e236f014f34da84452e',
        'x-app-id': '678a0e236f014f34da844530'
    }
    response = requests.post(
        'https://api.chargetrip.io/graphql', json={'query': query}, headers=headers)
    if response.status_code == 200:
        vehicles = response.json()['data']['vehicleList']
        return jsonify(vehicles)
    else:
        return jsonify({"error": "Erreur lors de la récupération des véhicules."})


if __name__ == '__main__':
    app.run(port=5002, debug=True)
