import 'chart.js/auto';
import { Doughnut, Line } from 'react-chartjs-2';
import { ScrollShadow, Chip, Slider, Progress } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';

library.add(fas)

interface ProductionType {
    nuclear: number,
    geothermal: number,
    biomass: number,
    coal: number,
    wind: number,
    solar: number,
    hydro: number,
    gas: number,
    oil: number,
    unknown: number
}

export default function DataTab({production, activeCountry} : {
    production : ProductionType,
    activeCountry : string
}){
    const [ frame, setFrame ] = useState(0)
    const [ load, setLoad ] = useState([])
    const [ prodForecast, setProdForecast ] = useState([])
    const [ isLoading, setLoading ] = useState(true)


    const label = () => {
        switch(frame){
            case 0:
                return 'day'
            case 1:
                return 'week'
            case 2:
                return 'month'
            case 3:
                return 'year'
            default:
                return 'Past Day'
        }
    }

    useEffect(() => {
        setLoading(true)
        fetch(`http://jmaillefaud-project-express.course-fwe-2023.isginf.ch/api/${activeCountry}/${label()}`)
        .then(response => response.json())
        .then((response : any) => {
            let options : any
            if(frame != 0){
                options = {
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                }
            }
            else{
                options = {
                    hour: 'numeric'
                }
            }
            let filteredLoad = response.map((entry : any) => {
                return [
                    new Intl.DateTimeFormat('en-US', options).format(new Date(entry.datetime)),
                    entry.load,
                    entry.load_forecast
                ];
            });
            let filteredProd = response.map((entry : any) => {
                return [
                    new Intl.DateTimeFormat('en-US', options).format(new Date(entry.datetime)),
                    entry.prod_forecast
                ];
            });
    
            if (frame === 3 || frame === 2 || frame === 1) { 
                const nthDataPoint = Math.ceil(filteredLoad.length / 10);
                filteredLoad = filteredLoad.filter((_ : any, index : any) => index % nthDataPoint === 0);
                filteredProd = filteredProd.filter((_ : any, index : any) => index % nthDataPoint === 0);
            }
    
            setLoad(filteredLoad);

            setProdForecast(filteredProd);
            setLoading(false)
        })
        .catch(_ => {
            setLoading(false)
        })
    }, [activeCountry, frame])

    const options = {
        plugins: {
            legend: {
                display: false, 
            },
        },
    };

    return(
        <>
        
        <ScrollShadow size={5} className=' 
        h-[31vh] lg:h-[67vh] 
        '>  
            <div className='flex flex-row items-center'>
                <Chip
                    startContent={<FontAwesomeIcon icon={['fas', 'circle']} />}
                    variant="shadow"
                    color="danger"
                    className=''
                >
                    Live
                </Chip>
                <h1 className='text-sm lg:text-2xl font-bold pl-[2%]'>
                    Electricity Production Today (GW)
                </h1>
            </div>
            <Doughnut data={{
                labels: Object.entries(production).map(([key, value]) => {
                    value
                    return key
                }),
                datasets: [
                {
                    label: '',
                    data: Object.entries(production).map(([key, value]) => {
                        key
                        return value
                    }),
                },
                ],
            }}
                options={options}
            />
            <div className='flex flex-row items-center'>
                <h1 className='text-sm lg:text-2xl font-bold pl-[2%]'>
                    Load (MW)
                </h1>
                <Slider 
                    label={String("Past " + label())} 
                    step={1} 
                    maxValue={3} 
                    minValue={0} 
                    defaultValue={0}
                    value={frame}
                    hideValue
                    onChange={(value : any) => setFrame(value)}
                    className="max-w-md px-[10%] py-[5%]"
                />
            </div>

            { !isLoading && <Line data={{
                labels: load.map(entry => entry[0]),
                datasets: [
                    {
                        label: 'Load',
                        data: load.map(entry => entry[1]),
                        fill: false,
                        borderColor: 'rgba(75,192,192,1)',
                        tension: 0.5,
                    },
                    {
                        label: 'Predicted Load',
                        data: load.map(entry => entry[2]),
                        fill: false,
                        borderColor: 'red',
                        tension: 0.1,
                    },
                ]
            }}/>
            }
            
            {
                isLoading && <Progress
                                size="sm"
                                isIndeterminate
                                aria-label="Loading..."
                                className="max-w-md px-[10%] py-[15vh]"
                            />
            }
            <div className='flex flex-row items-center'>
                <h1 className='text-sm lg:text-2xl font-bold pl-[2%]'>
                    Production (MW)
                </h1>
            </div>

            { !isLoading && <Line data={{
                labels: load.map(entry => entry[0]),
                datasets: [
                    {
                        label: 'Production Forecast',
                        data: prodForecast.map(entry => entry[1]),
                        fill: false,
                        borderColor: 'green',
                        tension: 0.5,
                    },
                ]
            }}/>
            }
            {
                isLoading && <Progress
                                size="sm"
                                isIndeterminate
                                aria-label="Loading..."
                                className="max-w-md px-[10%] py-[15vh]"
                            />
            }
        </ScrollShadow>
        </> 
    )
}
