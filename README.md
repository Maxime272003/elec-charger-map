# EV Services

## Description
Ce projet fournit une API pour obtenir des informations sur les véhicules électriques, les bornes de recharge les plus proches, les trajets et le calcul du temps de trajet.


## Technologies
- Python
- Flask
- React
- SOAP

## Documentation API

### Routes

# 1. GET /vehicles
Récupère la liste des véhicules électriques.
https://elecmapapi.azurewebsites.net/vehicles

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
