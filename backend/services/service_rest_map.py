import requests  # type: ignore
import os


def obtenir_trajet(start, end):
    api_key = os.getenv('ORS_API_KEY')
    url = f"https://api.openrouteservice.org/v2/directions/driving-car?api_key={
        api_key}&start={start}&end={end}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": "Erreur lors de la récupération du trajet."}
