import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { ScrollShadow } from '@nextui-org/react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

export default function C02Card({co2Data} : { co2Data: any}){

    const options = {
        plugins: {
            tooltip: {
                enabled: false
            },
        },
    };

    return(
        <>
        <ScrollShadow size={5} className=' 
        h-[31vh] lg:h-[67vh] 
        '>  
            <div className='flex flex-row items-center'>
                <h1 className='text-sm lg:text-2xl font-bold pl-[2%]'>
                    CO₂ Emmisions today 
                </h1>
            </div>
            <Line data={{
                labels: co2Data.map((entry : any) => entry[0]),
                datasets: [
                    {
                        label: 'gCO₂/kWh',
                        data: co2Data.map((entry : any) => entry[1]),
                        fill: false,
                        borderColor: 'grey',
                        tension: 0.3,
                    },
                ]
            }}
            options={options}/>
        </ScrollShadow>
        </>
        
    )
}
