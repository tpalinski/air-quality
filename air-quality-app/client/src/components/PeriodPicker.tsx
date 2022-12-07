import React, {ChangeEvent, useState} from "react";
import { Calendar } from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import '../styles/Calendar.css'
import { TimePeriod } from "../types";

type Props = {
    onChange: (period: TimePeriod) => void
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
        // parse date string to dormat: yyyy-mm-dd hh:mm:ss
        const zeroPad = (num: number, places: number) => String(num).padStart(places, '0')
        let startString = `${selectedPeriod[0].getFullYear()}-${selectedPeriod[0].getMonth()}-` + zeroPad(selectedPeriod[0].getDate(), 2);
        let endString = `${selectedPeriod[1].getFullYear()}-${selectedPeriod[1].getMonth()}-` + zeroPad(selectedPeriod[1].getDate(), 2);
        return [startString + " 00:00:00", endString + " 00:00:00"]
    }

    return (
        <div>
            
            <Calendar onChange={handleChange} value={selectedPeriod} returnValue={'range'} selectRange={true}/>
            <button onClick={handleClick}>Fetch data but for real this time</button>
        </div>
    )
}
