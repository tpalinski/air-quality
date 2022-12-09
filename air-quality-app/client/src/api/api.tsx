import { GraphData, GraphResponseData, TimePeriod } from "../types";
type RequestBody = {start_date: string, end_date: string};

const API = 'https://air-quality-gdansk-app.herokuapp.com/api/';
const HOURS_GROUPING = 12

// DEBUGGING CODE
if (process.env.NODE_ENV !== 'production') {
  //sample debug data
  const sampleData: GraphData[] = [ [{time: '01.2020', value: 1}, {time: '02.2020', value: 2}, {time: '03.2020', value: 3}], 
                                [{time: '01.2020', value: 4}, {time: '02.2020', value: 6}, {time: '03.2020', value: 3}],
                                [{time: '01.2020', value: 7}, {time: '02.2020', value: 12}, {time: '03.2020', value: 2}],
                                [{time: '01.2020', value: 2}, {time: '02.2020', value: 9}, {time: '03.2020', value: 1}],
                                [{time: '01.2020', value: 0}, {time: '02.2020', value: 4}, {time: '03.2020', value: 12}]] 


// delay for debuggng purposes
  const resolveAfter2Seconds = () : Promise<number> => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(Math.floor(Math.random() * sampleData.length));
        }, 2000);
      });
  }
}



export async function getBigData(timePeriod: TimePeriod, urlSuffix: string): Promise<string>{
  let response = await fetch(new URL(API+urlSuffix), {
    method: 'POST',
    body: JSON.stringify({
      start_date: timePeriod[0],
      end_date: timePeriod[1],
      type: 'max',
      group_range: HOURS_GROUPING
    }),
    headers: {
      'Content-Type': 'text/plain'
    }
  })
  if(!response.ok){
    throw new Error(`Error retreiving data from the server! Response status: ${response.status}`)
  }
  let result = response.json();
  return result;
}

export async function getData(timePeriod: TimePeriod, urlSuffix: string): Promise<string>{
  let response = await fetch(new URL(API+urlSuffix), {
    method: 'POST',
    body: convertToRequestBody(timePeriod),
    headers: {
      'Content-Type': 'text/plain'
    }
  })
  if(!response.ok){
    throw new Error(`Error retreiving data from the server! Response status: ${response.status}`)
  }
  let result = response.json();
  return result;
}

const convertToRequestBody = (timePeriod: TimePeriod): string => {
  let requestBody: RequestBody =  {
    start_date: timePeriod[0],
    end_date: timePeriod[1]
  }
  return JSON.stringify(requestBody);
}

export async function getMapData(day: Date, pollution: string){
  let response = await fetch(new URL(API+'map'), {
    method: 'POST',
    body: JSON.stringify({
      day: convertDateToString(day),
      pollution_type: pollution,
      type: "map"
    }),
    headers: {
      'Content-Type': 'text/plain'
    }
  });
  if(!response.ok){
    throw new Error(`Error retreiving data from the server! Response status: ${response.status}`)
  }
  let result = response.json();
  return result;
}

const convertDateToString = (date: Date): string => {
  const zeroPad = (num: number, places: number) => String(num).padStart(places, '0')
  return `${date.getFullYear()}-`+ `${zeroPad(date.getMonth()+1, 2)}-` + zeroPad(date.getDate(), 2);
}


