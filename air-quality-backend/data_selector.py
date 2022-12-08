import pandas as pd
import json

# disable warning as its not valid in our case
pd.options.mode.chained_assignment = None


def valid_pd_date(date):
    try:
        pd.to_datetime(date)
    except:
        return False 
    return True 

class DataSelector:
    datasets = {}

    def __init__(self):
        try:
            DataSelector.datasets = {
                        "co": pd.read_csv("data/co.csv", parse_dates=["data"]),
                        "no2": pd.read_csv("data/no2.csv", parse_dates=["data"]),
                        "pm10": pd.read_csv("data/pm10.csv", parse_dates=["data"]),
                        "coords": pd.read_csv("data/coords.csv").set_index("stacja")
                    }
        except FileNotFoundError:
            print("ERROR: Failed to load data files!")

    # pollution_type
    def __get_dataframe_of_pollution_by_station_and_date(self, pollution_type, station, start_date, end_date):
        # select by pollution_type and station
        dataset = DataSelector.datasets[pollution_type][["data",station]]
        
        # select by date range
        date_mask = (dataset["data"] >= start_date) & (dataset["data"] <= end_date)
        selected_data = dataset.loc[date_mask]
        
        # clean data (remove -1 entries)
        selected_data = selected_data.loc[selected_data[station] >= 0]
        
        return selected_data

    # pollution_type: co/no2/pm10
    # returns array of dicts: [{"time":"2021-02-02 11:00","value":10.0}, ...]
    def __select_pollution_by_station_and_date(self, pollution_type, station, start_date, end_date):
        selected_data = self.__get_dataframe_of_pollution_by_station_and_date(pollution_type, station, start_date, end_date)

        # format data
        selected_data["data"] = selected_data["data"].dt.strftime("%Y-%m-%d %H:%M")
        
        # prepare dicts
        data_to_return = selected_data.rename(columns={"data": "time", station: "value"})
        data_array = (data_to_return.to_dict(orient="records"))
        
        return data_array

    # station: PmGdaLeczkow/PmGdaPowWars/PmGdaWyzwole/PmGdyPorebsk/PmGdySzafran/PmSopBiPlowoc
    # date_format: RRRR-MM-DD HH:MM:SS
    def select_pollutions_by_station(self, station, start_date, end_date):
        if (valid_pd_date(start_date) == False) or \
           (valid_pd_date(end_date) == False):
            return ""
        
        no_dict = self.__select_pollution_by_station_and_date("no2", station, start_date, end_date)
        pm_dict = self.__select_pollution_by_station_and_date("pm10", station, start_date, end_date)
        co_dict = self.__select_pollution_by_station_and_date("co", station, start_date, end_date)
        combined_dict = {
            "no": no_dict,
            "pm": pm_dict,
            "co": co_dict
        }

        return json.dumps(combined_dict)

    def __select_grouped_pollution_by_station_and_date(self, pollution_type, station, start_date, end_date, group_range):
        selected_data = self.__get_dataframe_of_pollution_by_station_and_date(pollution_type, station, start_date, end_date)

        # group data and drop NaN values
        grouped_data = selected_data.groupby(pd.Grouper(key='data', axis=0, freq=f'{group_range}H')).max()
        grouped_data.reset_index(inplace=True)
        grouped_data.dropna(inplace=True)

        # format data
        grouped_data["data"] = grouped_data["data"].dt.strftime("%Y-%m-%d %H:%M")

        # prepare dicts
        data_to_return = grouped_data.rename(columns={"data": "time", station: "value"})
        data_array = (data_to_return.to_dict(orient="records"))
        
        return data_array

    def select_grouped_pollutions_by_station(self, station, start_date, end_date, group_range):
        if (valid_pd_date(start_date) == False) or \
           (valid_pd_date(end_date) == False):
            return ""
        
        no_dict = self.__select_grouped_pollution_by_station_and_date("no2", station, start_date, end_date, group_range)
        pm_dict = self.__select_grouped_pollution_by_station_and_date("pm10", station, start_date, end_date, group_range)
        co_dict = self.__select_grouped_pollution_by_station_and_date("co", station, start_date, end_date, group_range)
        combined_dict = {
            "no": no_dict,
            "pm": pm_dict,
            "co": co_dict
        }

        return json.dumps(combined_dict)

    def __select_grouped_pollution_by_station_and_date(self, pollution_type, station, start_date, end_date, group_range):
        selected_data = self.__get_dataframe_of_pollution_by_station_and_date(pollution_type, station, start_date, end_date)

        # group data and drop NaN values
        grouped_data = selected_data.groupby(pd.Grouper(key='data', axis=0, freq=f'{group_range}H')).max()
        grouped_data.reset_index(inplace=True)
        grouped_data.dropna(inplace=True)

        # format data
        grouped_data["data"] = grouped_data["data"].dt.strftime("%Y-%m-%d %H:%M")

        # prepare dicts
        data_to_return = grouped_data.rename(columns={"data": "time", station: "value"})
        data_array = (data_to_return.to_dict(orient="records"))
        
        return data_array

    # day format: RRRR-MM-DD
    def __select_max_pollution_by_day(self, pollution_type, day):
        # select by pollution_type and station
        dataset = DataSelector.datasets[pollution_type]
        
        # select by day
        dataset = dataset.set_index("data")
        day_of_dataset = dataset.loc[day]
        
        # select stations' max values
        max_pollution = day_of_dataset.max()
        
        # create array with coords and values
        stations_coord_with_values = [] 
        for station, pollution_value in max_pollution.items():
            try:
                station_dict = {
                    "coordinates": DataSelector.datasets["coords"].loc[station].values.tolist(),
                    "value": pollution_value
                }
                stations_coord_with_values.append(station_dict)
            except KeyError:
                # skip non stations (like average column)
                pass 
        
        return stations_coord_with_values

    def select_pollution_for_map(self, day, pollution_type):
        if (valid_pd_date(day) == False):
            return ""
        day = pd.to_datetime(day).strftime("%Y-%m-%d")
        data = self.__select_max_pollution_by_day(pollution_type, day)
        return json.dumps(data)


if __name__ == "__main__":
    # EXAMPLE OF SELECTING DATA FROM DATE RANGE
    data = DataSelector()
    print(data.select_pollution_for_map("2021-02-02", "co"))

    selected_station = data.datasets["coords"].loc["PmGdyPorebsk"]
    coords_dict = selected_station.values
    print(selected_station)
    print(coords_dict)