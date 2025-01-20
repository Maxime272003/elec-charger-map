from flask import Flask, request, jsonify
import requests
import folium

app = Flask(__name__)


@app.route('/trajet', methods=['GET'])
def trajet():
    api_key = "5b3ce3597851110001cf6248f61ad671d5cc49c9b6342744f48ab3b9"
    start = request.args.get('start')
    end = request.args.get('end')
    trajet = obtenir_trajet(api_key, start, end)
    if trajet:
        map_html = dessiner_trajet(trajet)
        return jsonify({"map_html": map_html})
    else:
        return jsonify({"error": "Erreur lors de la récupération du trajet."})


def obtenir_trajet(api_key, start, end):
    url = f"https://api.openrouteservice.org/v2/directions/driving-car?api_key={api_key}&start={start}&end={end}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        return None


def dessiner_trajet(trajet):
    if 'features' in trajet and 'geometry' in trajet['features'][0]:
        coords = trajet['features'][0]['geometry']['coordinates']
        coords = [(coord[1], coord[0]) for coord in coords]

        m = folium.Map(location=coords[0], zoom_start=6)

        folium.PolyLine(coords, color="blue", weight=2.5, opacity=1).add_to(m)

        folium.Marker(coords[0], popup="Départ").add_to(m)
        folium.Marker(coords[-1], popup="Arrivée").add_to(m)

        return m._repr_html_()
    return None


if __name__ == '__main__':
    app.run(port=5000, debug=True)
