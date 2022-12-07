import React, {useState} from "react";
import { Calendar } from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import '../styles/Calendar.css'

type Props = {
    onChange: () => void
}
export function PeriodPicker(props: Props) {
    let [startDate, setStartDate] = useState<Date>(new Date())
    let [endDate, setEndDate] = useState<Date>(new Date())


    return (
        <div>
            <Calendar onChange={setStartDate} value={startDate} />
        </div>
    )
}