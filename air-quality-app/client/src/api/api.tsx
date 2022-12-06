import { GraphData, GraphResponseData } from "../types";



//sample debug data
const sampleData: GraphData[] = [ [{time: '01.2020', value: 1}, {time: '02.2020', value: 2}, {time: '03.2020', value: 3}], 
                                [{time: '01.2020', value: 4}, {time: '02.2020', value: 6}, {time: '03.2020', value: 3}],
                                [{time: '01.2020', value: 7}, {time: '02.2020', value: 12}, {time: '03.2020', value: 2}],
                                [{time: '01.2020', value: 2}, {time: '02.2020', value: 9}, {time: '03.2020', value: 1}],
                                [{time: '01.2020', value: 0}, {time: '02.2020', value: 4}, {time: '03.2020', value: 12}]] 


export async function getData(url: string): Promise<GraphResponseData>{
    let index: number = await resolveAfter2Seconds();
    return {co: sampleData[index], no2: sampleData[(index+1) % sampleData.length], pa: sampleData[(index+2) % sampleData.length]}
}

// delay for debuggng purposes
function resolveAfter2Seconds() : Promise<number> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(Math.floor(Math.random() * sampleData.length));
      }, 2000);
    });
  }

