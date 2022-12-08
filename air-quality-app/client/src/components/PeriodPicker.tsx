import React, {ChangeEvent, useState} from "react";
import { Calendar } from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import '../styles/Calendar.css'
import { TimePeriod } from "../types";

type Props = {
    onChange: (period: TimePeriod) => void,
    isLoading: boolean
}
type Dates = [Date, Date]
export function PeriodPicker(props: Props) {
    let [selectedPeriod, setSelectedPeriod] = useState<Dates>([new Date, new Date])

    const handleChange = (dates: any)=> {
        setSelectedPeriod(dates);
    }

    const handleClick = () => {
        props.onChange(convertRange());
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
            <h4>Select the relevant time period on the calendar and see how the air pollution changes over time</h4>
            <Calendar 
                onChange={handleChange} 
                value={selectedPeriod} 
                returnValue={'range'} 
                selectRange={true} 
                minDate={new Date(2021, 0, 1)} 
                maxDate={new Date(2021, 11, 31)} 
                defaultActiveStartDate={new Date(2021, 0, 1)} 
                next2Label={null} 
                prev2Label={null}
                minDetail={'year'}
            />
            {props.isLoading ? <div className='Loader'></div> : <button className="FetchButton" onClick={handleClick}>Check the pollution!</button>}
        </div>
    )
}
