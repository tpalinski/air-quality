from flask import Flask, Response, jsonify, request
from waitress import serve
from data_selector import DataSelector

ACCEPTED_STATION_REQUESTS = ["PmGdaLeczkow", "PmGdaPowWars", "PmGdaWyzwole", "PmGdyPorebsk", "PmGdySzafran", "PmSopBiPlowoc"]

app = Flask("air_quality_backend")
data_selector = DataSelector()

@app.route("/")
def hello_world():
    response = jsonify("This is API server for retrieving data. Please use /api/...")
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/<path:station_name>', methods=['GET', 'POST'])
def data_request(station_name):
    data = get_data(station_name)
    if (data):
        response = jsonify(data)
    else:
        response = jsonify(f"Request for {station_name} not supported")
        response.status_code = 400
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.errorhandler(404)
def page_not_found(error):
    return hello_world()

def get_data(station_name):
    if (station_name not in ACCEPTED_STATION_REQUESTS):
        return False
    result = data_selector.select_pollutions_by_station(station_name, "2021-02-02 10:00:00", "2021-02-02 11:00:00")

    return result

if __name__ == "__main__":
    serve(app, host="localhost", port=3001)