from flask import Flask, Response, jsonify, request
from waitress import serve
from data_selector import DataSelector
import json

ACCEPTED_REQUESTS = ["PmGdaLeczkow", "PmGdaPowWars", "PmGdaWyzwole", "PmGdyPorebsk", "PmGdySzafran", "PmSopBiPlowoc", "Average"]

app = Flask("air_quality_backend")
data_selector = DataSelector()


@app.route("/")
def info_page():
    response = jsonify("This is API server for retrieving data. Please use /api/...")
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.errorhandler(404)
def page_not_found(error):
    return info_page()

@app.route('/api/<path:station_name>', methods=['GET', 'POST'])
def data_request(station_name):
    request_args = get_request_args()
    data = get_data(station_name, request_args)
    if (data):
        response = jsonify(data)
    else:
        response = jsonify(f"Request for {station_name} not supported")
        response.status_code = 400
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

def get_request_args():
    # if there is no data (GET request), load example values
    request_args = {
        "start_date": "2021-02-02 10:00:00",
        "end_date": "2021-02-02 11:00:00",
    }
    
    # load args (start_date, end_date) from POST body
    if (request.data):
        request_args = json.loads(request.data.decode("utf-8"))

    if ("type" not in request_args):
        request_args["type"] = "all"
    
    return request_args

def get_data(station_name, request_args):
    if (station_name not in ACCEPTED_REQUESTS):
        return False
    
    result = ""
    if (request_args["type"] == "all"):
        result = data_selector.select_pollutions_by_station(
            station_name, 
            request_args["start_date"], 
            request_args["end_date"]
            )
    elif (request_args["type"] == "max"):
        group_range = request_args["group_range"] if "group_range" in request_args else 12 
        result = data_selector.select_grouped_pollutions_by_station(
            station_name, 
            request_args["start_date"], 
            request_args["end_date"],
            group_range
            )
    return result

if __name__ == "__main__":
    serve(app, host="localhost", port=3001)