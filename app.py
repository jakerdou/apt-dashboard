from nyct_gtfs import NYCTFeed
from datetime import datetime
from flask import Flask, request, jsonify

from config import STOP_DATA
from secret import API_KEY

app = Flask(__name__)

def get_times_from_stop(trains, stop_id):
    times_from_stop = []
    for train in trains:
        stop_time_update = next(stop for stop in train.stop_time_updates if stop.stop_id == stop_id)
        seconds_away_from_stop = (stop_time_update.arrival - datetime.now()).seconds
        times_from_stop.append(seconds_away_from_stop)
    times_from_stop.sort()
    return times_from_stop

@app.route("/train-time-data")
def get_train_time_data():
    train_id = request.args.get('train_id')
    feed = NYCTFeed(train_id, api_key=API_KEY)
    trains_north = feed.filter_trips(line_id=train_id, headed_for_stop_id=STOP_DATA[train_id]['north'], underway=True)
    trains_south = feed.filter_trips(line_id=train_id, headed_for_stop_id=STOP_DATA[train_id]['south'], underway=True)

    train_time_data = {
        'north': get_times_from_stop(trains_north, STOP_DATA[train_id]['north']),
        'south': get_times_from_stop(trains_south, STOP_DATA[train_id]['south']),
    }

    response = jsonify(train_time_data)
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

if __name__ == "__main__":
    app.run()







    