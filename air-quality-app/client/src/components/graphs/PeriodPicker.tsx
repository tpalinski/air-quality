//@ts-nocheck
//only because of react-picker jsx components don't have proper typings
import React, {ChangeEvent, useState} from "react";
import { Calendar } from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import '../../styles/Calendar.css'
import '../../styles/Picker.css'
import Select from "react-select";
import { TimePeriod } from "../../types";

type Props = {
    onChange: (period: TimePeriod) => void,
    onStationChange: (stationName: string) => void,
    isLoading: boolean
}
type Dates = [Date, Date]

// a date which cannnot be picked, used for checking if user selected a valid time period
const invalidDate = new Date(1900, 0, 1);

export function PeriodPicker(props: Props) {

    const options = [
        { value: 'Average', label: 'Average reading from all stations' },
        { value: 'PmGdyPorebsk', label: 'Gdynia - Porebsk' },
        { value: 'PmGdySzafran', label: 'Gdynia - Szafran' },
        { value: 'PmSopBiPlowoc', label: 'Sopot' },
        { value: 'PmGdaWyzwole', label: 'Gdansk - Wyzwole' },
        { value: 'PmGdaLeczkow', label: 'Gdansk - Leczkow' },
        { value: 'PmGdaPowWars', label: 'Gdansk - Pow Wars' },
      ];

    let [selectedPeriod, setSelectedPeriod] = useState<Dates>([invalidDate, invalidDate])
    let [station, setStation] = useState(options[0])

    const handleChange = (dates: any)=> {
        setSelectedPeriod(dates);
    }

    const handleClick = () => {
        if(selectedPeriod[0] === invalidDate) {
            alert('Please select a valid period!');
            return;
        }
        props.onChange(convertRange());
        props.onStationChange(station.value);
    }

    const convertRange = (): TimePeriod => {
        // parse date string to format: yyyy-mm-dd hh:mm:ss
        const zeroPad = (num: number, places: number) => String(num).padStart(places, '0')
        let startString = `${selectedPeriod[0].getFullYear()}-${zeroPad(selectedPeriod[0].getMonth()+1, 2)}-` + zeroPad(selectedPeriod[0].getDate(), 2);
        let endString = `${selectedPeriod[1].getFullYear()}-${zeroPad(selectedPeriod[1].getMonth()+1, 2)}-` + zeroPad(selectedPeriod[1].getDate(), 2);
        return [startString + " 00:00:00", endString + " 00:00:00"]
    }

    //rendering logic
    return (
        <div className='PeriodSelector'>
            <div className="Lore">
                <h4>Select the relevant time period on the calendar and see how the air pollution changes over time</h4>
            </div>
            <Calendar 
                onChange={handleChange} 
                value={selectedPeriod} 
                returnValue={'range'} 
                selectRange={true} 
                minDate={new Date(2021, 0, 1)} 
                maxDate={new Date(2021, 11, 31)} 
                defaultActiveStartDate={new Date(2021, 0, 1)} 
                defaultValue={[new Date(2021, 0, 1), new Date(2021, 0, 2)]}
                next2Label={null} 
                prev2Label={null}
                minDetail={'year'}
            />
            <div style={{color: 'black'}}>
                <Select 
                    defaultValue={station}
                    onChange={setStation}
                    options={options}
                    className="react-select-container"
                    classNamePrefix="react-select" 
                />
            </div>
            {props.isLoading ? <div className='Loader'></div> : <button className="FetchButton" onClick={handleClick}>Check the pollution!</button>}
        </div>
    )
}
