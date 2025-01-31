from spyne import Application, rpc, ServiceBase, Float, Unicode, Iterable
from spyne.protocol.soap import Soap11
from spyne.server.wsgi import WsgiApplication
from wsgiref.simple_server import make_server


class TrajetService(ServiceBase):
    @rpc(Float, Float, Float, _returns=Iterable(Unicode))
    def calculer_temps_trajet(ctx, distance, autonomie, temps_chargement):
        time = distance/autonomie*60 + temps_chargement
        price = time * 2
        return [str(time), str(price)]


soap_app = Application([TrajetService], 'spyne.service.soap',
                       in_protocol=Soap11(validator='lxml'),
                       out_protocol=Soap11())

wsgi_app = WsgiApplication(soap_app)

if __name__ == '__main__':
    server = make_server('localhost', 8000, wsgi_app)
    print("Listening on port 8000...")
    server.serve_forever()
