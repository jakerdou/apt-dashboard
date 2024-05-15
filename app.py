from nyct_gtfs import NYCTFeed
from datetime import datetime
from flask import Flask, request, jsonify

from config import STOP_DATA
from secret import API_KEY

app = Flask(__name__)

def get_times_from_stop(trains, train_id, stop_id):
    times_from_stop = []
    for train in trains:
        stop_time_update = next(stop for stop in train.stop_time_updates if stop.stop_id == stop_id)
        seconds_away_from_stop = (stop_time_update.arrival - datetime.now()).seconds

        if seconds_away_from_stop < 1800 and seconds_away_from_stop > 240:
            times_from_stop.append({'train_id': train_id, 'trip_id': train.trip_id, "secs_away": seconds_away_from_stop})
    times_from_stop = sorted(times_from_stop, key=lambda d: d['secs_away'])
    return times_from_stop[0:3]

@app.route("/train-time-data")
def get_train_time_data():
    train_ids = request.args.getlist('train_id')

    train_time_data = {'uptown': [], 'downtown': []}

    for train_id in train_ids:
        feed = NYCTFeed(train_id, api_key=API_KEY)
        uptown_trains = feed.filter_trips(line_id=train_id, headed_for_stop_id=STOP_DATA[train_id]['uptown'], underway=True)
        downtown_trains = feed.filter_trips(line_id=train_id, headed_for_stop_id=STOP_DATA[train_id]['downtown'], underway=True)

        uptown_times = get_times_from_stop(uptown_trains, train_id, STOP_DATA[train_id]['uptown'])
        downtown_times = get_times_from_stop(downtown_trains, train_id, STOP_DATA[train_id]['downtown'])

        train_time_data['uptown'].extend(uptown_times)
        train_time_data['downtown'].extend(downtown_times)

    train_time_data['uptown'] = sorted(train_time_data['uptown'], key=lambda d: d['secs_away'])
    train_time_data['downtown'] = sorted(train_time_data['downtown'], key=lambda d: d['secs_away'])

    response = jsonify(train_time_data)
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

if __name__ == "__main__":
    app.run(debug=True)







    