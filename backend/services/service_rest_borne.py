import requests  # type: ignore


def get_nearest_charging_station(lat, lon):
    url = "https://odre.opendatasoft.com/api/records/1.0/search/"
    params = {
        'dataset': 'bornes-irve',
        'geofilter.distance': f'{lat},{lon},10000',
        'rows': 1,
    }

    response = requests.get(url, params=params)
    print(response.url)

    if response.status_code == 200:
        data = response.json()
        if data['records']:
            station = data['records'][0]['fields']
            return station
        else:
            return {"error": "Aucune borne de recharge trouvée à proximité."}
    else:
        return {"error": f"Erreur lors de la requête : {response.status_code}"}
