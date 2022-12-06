from flask import Flask, Response, jsonify, request
from waitress import serve
from data_selector import DataSelector

ACCEPTED_DATA_REQUESTS = ["pm10", "no2", "co"] 

app = Flask("air_quality_backend")
data_selector = DataSelector()

@app.route("/")
def hello_world():
    return "This is API server for retrieving data. Please use /api/..."

@app.route('/api/<path:data_name>')
def data_request(data_name, methods=['GET, POST']):
    data_name = data_name.lower()
    data = get_data(data_name)
    if (data):
        return jsonify(data)
    else:
        response = jsonify(f"Request for {data_name} not supported")
        response.status_code = 400
        return response

@app.errorhandler(404)
def page_not_found(error):
    return hello_world()

def get_data(data_name):
    if (data_name not in ACCEPTED_DATA_REQUESTS):
        return False
    result = data_selector.select_by_date(data_name, "2021-02-02 10:00:00", "2021-02-02 11:00:00")

    return result

if __name__ == "__main__":
    serve(app, host="localhost", port=3001)