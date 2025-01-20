from flask import Flask, request, render_template
import requests

app = Flask(__name__, template_folder='templates')


@app.route('/')
def index():
    response = requests.get('http://localhost:5002/vehicles')
    vehicles = response.json() if response.status_code == 200 else []

    map_html = """
    <div id="map" style="height: 500px;"></div>
    <script>
        var map = L.map('map').setView([48.8566, 2.3522], 6); // Centré sur Paris
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
    </script>
    """

    return render_template('index_rest.html', vehicles=vehicles, map_html=map_html)


@app.route('/nearest_station', methods=['POST'])
def nearest_station():
    lat = request.form['latitude']
    lon = request.form['longitude']
    response = requests.get(
        'http://localhost:5000/nearest_station', params={'lat': lat, 'lon': lon})
    if response.status_code == 200:
        station = response.json()
        return render_template('index_rest.html', station=station)
    else:
        return render_template('index_rest.html', error="Erreur lors de la récupération de la station.")


@app.route('/trajet', methods=['POST'])
def trajet():
    start = request.form['start']
    end = request.form['end']
    response = requests.get('http://localhost:5000/trajet',
                            params={'start': start, 'end': end})
    if response.status_code == 200:
        data = response.json()
        if 'map_html' in data:
            return render_template('index_rest.html', map_html=data['map_html'])
        else:
            return render_template('index_rest.html', error="Erreur lors de la récupération du trajet.")
    else:
        return render_template('index_rest.html', error="Erreur lors de la récupération du trajet.")


if __name__ == '__main__':
    app.run(port=5001, debug=True)
