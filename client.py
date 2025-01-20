from flask import Flask, request, render_template
from zeep import Client

app = Flask(__name__, template_folder='templates')

client = Client('http://localhost:8000/?wsdl')


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        distance = int(request.form['distance'])
        autonomie = int(request.form['autonomy'])
        temps_chargement = int(request.form['temps_de_recharge'])
        result = client.service.calculer_temps_trajet(
            distance, autonomie, temps_chargement)

        return render_template('index.html', time=result[0], price=result[1])
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
