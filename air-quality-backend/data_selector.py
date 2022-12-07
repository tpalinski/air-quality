import pandas as pd

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
            self.datasets = {
                        "co": pd.read_csv("data/co.csv", parse_dates=["data"]),
                        "no2": pd.read_csv("data/no2.csv", parse_dates=["data"]),
                        "pm10": pd.read_csv("data/pm10.csv", parse_dates=["data"]),
                    }
        except FileNotFoundError:
            print("ERROR: Failed to load data files!")

    # station: PmGdaLeczkow/PmGdaPowWars/PmGdaWyzwole/PmGdyPorebsk/PmGdySzafran/PmSopBiPlowoc
    # date_format: RRRR-MM-DD HH:MM:SS
    def select_by_date(self, station, start_date, end_date):
        if (valid_pd_date(start_date) == False) or \
           (valid_pd_date(end_date) == False):
            return ""
        
        # selecting by station
        dataset = self.datasets["co"][["data",station]]
        
        # selecting by date range
        date_mask = (dataset["data"] >= start_date) & (dataset["data"] <= end_date)
        selected_data = dataset.loc[date_mask]

        # formatting data
        selected_data["data"] = selected_data["data"].dt.strftime("%Y-%m-%d %H:%M")
        
        # create and format json to frontend requirements
        json = selected_data.to_json(orient="values")
        json = json.replace("[", "{").replace("]", "}")
        json = "[" + json[1:-1] + "]"

        return json


if __name__ == "__main__":
    # EXAMPLE OF SELECTING DATA FROM DATE RANGE
    dataset_co = pd.read_csv("data/co.csv", parse_dates=["data"])
    start_date = "2021-02-02 10:00:00"
    end_date = "2021-02-02 11:00:00"
    mask = (dataset_co["data"] >= start_date) & (dataset_co["data"] <= end_date)

    selected_dataset_co = dataset_co.loc[mask]
    selected_dataset_co = selected_dataset_co[["data","PmGdaLeczkow"]]
    print(selected_dataset_co)
    print(dataset_co.dtypes)

    selected_dataset_co["data"] = selected_dataset_co["data"].dt.strftime("%Y-%m-%d %H:%M")
    json = selected_dataset_co.to_json(orient="values")

    # format json to frontend requirements
    json = json.replace("[", "{").replace("]", "}")
    json = "[" + json[1:-1] + "]"

    print(json)