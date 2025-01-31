import requests  # type: ignore
import os


def get_vehicles():
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
        'x-client-id': os.getenv('X_CLIENT_ID'),
        'x-app-id': os.getenv('X_APP_ID')
    }
    response = requests.post(
        'https://api.chargetrip.io/graphql', json={'query': query}, headers=headers)
    return response.json()['data']['vehicleList']
