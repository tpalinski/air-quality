# Air Quality
### (This project was made as an entry to BEST Gdańsk Hackathon 2022)

## About
The goal of this project is to highlight how the air quality in Gdańsk changes throughout the year(s) based on the data provided by air measuring stations located throuhout the city and educate people on what has the most impact on the overall air quality.
The project itself consists of 3 parts:
    1. Static data analysis - comparing the available data and trying to establish corellations between the time of the year, weather conditions and pollution levels.
      The results of this analysis are displayed on the website
    2. API - makes the pollution data more accessible for analysis by providing free access to the pollution data on client's request
    3. Website - it provides visualization tools to present the data served by the api in a convenient and readable manner
The project utilizes React + TypeScript for the website, Flask for the API server and Python for the static data analysis

## Usage
Production build is ready for user to launch - just click the link below:
https://tpalinski.github.io/air-quality/

## Contributing to the project
To launch the development build locally:
  1. Website:
      * Navigate to `./air-quality-app/client/`
      * Run command `npm install`
      * Run: `npm start`
  That should run the app in development mode
  2. Backend API
      * Navigate to `./air-quality-backend`
      * Run `pip install -r requirements.txt`
      * To start the server, run `python server.py`

## Authors
* Mateusz Naklicki (mateusz.naklicki06@gmail.com)
* Adam Niesiobędzki (adam.niesiobedzki@o2.pl)
* Tymoteusz Paliński (tpalinski@icloud.com)
