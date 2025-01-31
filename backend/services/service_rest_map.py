import requests  # type: ignore
import os

def obtenir_trajet(start, end):
    api_key = os.getenv('ORS_API_KEY')
    url = f"https://api.openrouteservice.org/v2/directions/driving-car?api_key={api_key}&start={start}&end={end}"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        return data
    else:
        return {"error": "Erreur lors de la récupération du trajet."}

def geocode_location(location):
    api_key = os.getenv('ORS_API_KEY')
    url = f"https://api.openrouteservice.org/geocode/search?api_key={api_key}&text={location}"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        if data['features']:
            coordinates = data['features'][0]['geometry']['coordinates']
            return coordinates[1], coordinates[0]
        else:
            return None
    else:
        return None