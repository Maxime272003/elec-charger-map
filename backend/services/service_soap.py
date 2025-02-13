from spyne import Application, rpc, ServiceBase, Float, Unicode, Iterable
from spyne.protocol.soap import Soap11
from spyne.server.wsgi import WsgiApplication
from wsgiref.simple_server import make_server

class TrajetService(ServiceBase):
    @rpc(Float, Float, Float, _returns=Iterable(Unicode))
    def calculer_temps_trajet(ctx, distance, autonomie, nb_charge):

        prix_electricite = 0.574  # €/kWh
        consommation_moyenne = 20.4 / 100  # kWh/km
        prix_recharge = autonomie * consommation_moyenne * prix_electricite
        cout_total = prix_recharge * nb_charge
        cout_total = round(cout_total, 2)

        vitesse_moyenne = 100  # km/h
        temps_trajet = distance / vitesse_moyenne
        temps_chargement = 30 * nb_charge
        temps_trajet_minutes = temps_trajet * 60
        temps_trajet_minutes += temps_chargement
        temps_total = str(int(temps_trajet_minutes // 60)) + "h" + str(int(temps_trajet_minutes % 60))

        return [str(temps_total), str(cout_total)]

soap_app = Application([TrajetService], 'spyne.service.soap',
                       in_protocol=Soap11(validator='lxml'),
                       out_protocol=Soap11())

wsgi_app = WsgiApplication(soap_app)

if __name__ == '__main__':
    server = make_server('localhost', 8000, wsgi_app)
    print("Listening on port 8000...")
    server.serve_forever()