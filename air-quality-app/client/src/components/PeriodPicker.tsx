import React, {ChangeEvent, useState} from "react";
import { Calendar } from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import '../styles/Calendar.css'

type Props = {
    onChange: () => void
}
type Dates = [Date, Date]
export function PeriodPicker(props: Props) {
    let [startDate, setStartDate] = useState<Dates>()

    const handleChange = (dates: any)=> {
        setStartDate(dates);
    }

    const handleClick = () => {
        alert(startDate)
        props.onChange();
    }

    return (
        <div>
            
            <Calendar onChange={handleChange} value={startDate} returnValue={'range'} selectRange={true}/>
            <button onClick={handleClick}>Fetch data but for real this time</button>
        </div>
    )
}
