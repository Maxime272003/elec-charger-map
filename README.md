# EV Services

## Description
Ce projet fournit une API pour obtenir des informations sur les véhicules électriques, les bornes de recharge les plus proches, les trajets et le calcul du temps de trajet.


## Technologies
- Python
- Flask
- React
- SOAP

## Documentation API

### 1. GET /vehicles
Récupère la liste des véhicules électriques.
- https://elecmapapi.azurewebsites.net/vehicles

### 2. GET /nearest_station
Récupère la borne de recharge la plus proche.
- Paramètres :
    - lat : latitude
    - lon : longitude
- https://elecmapapi.azurewebsites.net/nearest_station?lat=48.858844&lon=2.294351

### 3. GET /geocode
Récupère les coordonnées géographiques d'une ville.
- Paramètres :
    - city : nom de la ville
- https://elecmapapi.azurewebsites.net/geocode?location=Paris

### 4. GET /trajet
Récupère le trajet entre deux points.
- Paramètres :
    - start : point de départ (latitude, longitude)
    - end : point d'arrivée (latitude, longitude)
- https://elecmapapi.azurewebsites.net/trajet?start=2.294351,48.858844&end=2.294351,48.858844



## Installation

1. Clonez le dépôt :
    ```sh
    git clone https://github.com/Maxime272003/elec-charger-map.git
    cd <nom_du_dépôt>
    ```

2. Installez les dépendances pour le backend :
    ```sh
    cd backend
    pip install -r requirements.txt
    ```

3. Installez les dépendances pour le frontend :
    ```sh
    cd ../frontend
    npm install
    ```

4. Installez les dépendances pour le service SOAP :
    ```sh
    cd ../service_soap
    pip install -r requirements.txt
    ```

## Démarrage

Pour démarrer les services, exécutez le script [run.bat](http://_vscodecontentref_/1) :
```sh
./run.bat
