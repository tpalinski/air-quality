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

    # data_name: "pm10"/"no2"/"co"
    # date_format: RRRR-MM-DD HH:MM:SS
    def select_by_date(self, data_name, start_date, end_date):
        if (valid_pd_date(start_date) == False) or \
        (valid_pd_date(end_date) == False) or \
        (data_name not in self.datasets):
            return ""
        dataset = self.datasets[data_name]
        date_mask = (dataset["data"] >= start_date) & (dataset["data"] <= end_date)
        selected_data = dataset.loc[date_mask]
        return selected_data.to_json()


if __name__ == "__main__":
    # EXAMPLE OF SELECTING RANGE
    dataset_co = pd.read_csv("data/co.csv", parse_dates=["data"])
    start_date = "2021-02-02 10:00:00"
    end_date = "2021-02-02 20:00:00"
    mask = (dataset_co["data"] >= start_date) & (dataset_co["data"] <= end_date)

    selected_dataset_co = dataset_co.loc[mask]
    print(selected_dataset_co)
    print(dataset_co.dtypes)