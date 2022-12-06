# Air Quality Backend

This backend is used as API for retrieving data. It's written with Flask.

## Preparing environment
To run server, you have to install all dependencies:
### `pip install -r requirements.txt`


## Running server
Simply run `server.py` script:
### `python server.py`


## Debugging backend
By default server runs in production mode. If something wrong happens, you can try running it in debug mode to get more details with this command:
### `flask --app server --debug run --host=localhost --port 3001`