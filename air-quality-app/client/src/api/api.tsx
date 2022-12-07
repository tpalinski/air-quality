import { GraphData, GraphResponseData, TimePeriod } from "../types";
type RequestBody = {start_date: string, end_date: string};

const API = new URL('http://127.0.0.1:3001/api/PmGdaWyzwole');

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

export async function getDataDebug(timePeriod: TimePeriod): Promise<string>{
    let index: number = await resolveAfter2Seconds();
    return JSON.stringify({co: sampleData[index], no: sampleData[(index+1) % sampleData.length], pa: sampleData[(index+2) % sampleData.length]})
}

export async function getData(timePeriod: TimePeriod): Promise<string>{
  let response = await fetch(API, {
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


