import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../App.css'
import { Divider, Spinner, Tab, Tabs } from "@nextui-org/react";
import { ReactNode, useEffect, useState } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import DataCard from './DataCard';
import C02Card from './C02Card';

library.add(fas)

function ExpandedContainer({ co2Data, children, activeCountry } : { 
    co2Data: any,
    children: ReactNode,
    activeCountry: string
}) {
    const [isLoading, setLoading] = useState(true)
    const [fullName, setFullName] = useState('')
    const [production, setProduction] = useState(
        // {
        //     nuclear: 15,
        //     geothermal: 20,
        //     biomass: 1,
        //     coal: 6,
        //     wind: 8,
        //     solar: 9,
        //     hydro: 21,
        //     gas: 8,
        //     oil: 1,
        //     unknown: 0
        // }
        {
            nuclear: 0,
            geothermal: 0,
            biomass: 0,
            coal: 0,
            wind: 0,
            solar: 0,
            hydro: 0,
            gas: 0,
            oil: 0,
            unknown: 0
        }
    )
    let body;

    if(activeCountry == "AL"){
        return (
            <>
                <div className='flex flex-row pb-3 items-center'>
                    { children }
                    <h1 className='text-2xl dark:text-gray-300 text-gray-500 font-bold pl-3'>{fullName}</h1>
                </div>
                <Divider className=''/>
                <h1 className='2xl'>Oh, snap. Server failed or data unavailable 😔</h1>
            </>
        )
    }

    useEffect(() => {
        setTimeout(() => {
            fetch(`https://restcountries.com/v3.1/alpha/${activeCountry}`)
            .then((res) => res.json())
            .then((data) => {
                setFullName(data[0].name.common);
                fetch(`https://api-access.electricitymaps.com/free-tier/power-breakdown/latest?zone=${activeCountry}`, {
                    method: 'GET',
                    headers: {
                        'auth-token': 'dPKs2oUmYyJ7O6dWUy0xDRGkn9AK4sf0'
                    },
                })
                .then((response : any) => response.json())
                .then((response : any) => {
                    setProduction(response.powerProductionBreakdown)
                    setLoading(false);
                })
                .catch((_) => {
                    setLoading(false)
                })
            })
            .catch((err) => {
                console.log(err);
                setLoading(false)
            })
        }, 100)
    }, [activeCountry])

    if(isLoading || production == null){
        body = (
            <Spinner style={{top: '30%', left: '50%'}} size='lg' color="primary" labelColor="foreground"/>
        )
    }
    else{
        body = (
            <div className="pt-3 pb-5"
            style={{
                height: '93%'
            }}>
                <Tabs aria-label="Options">
                    <Tab key="energy" title={(
                        <div className="flex items-center space-x-2">
                            <FontAwesomeIcon icon={["fas", "bolt"]} />
                            <span className='hidden lg:block'>Energy Data</span>
                        </div>
                    )}
                    >
                        <DataCard activeCountry={activeCountry} production={production}/>
                    </Tab>
                    <Tab key="warnings" title={(
                        <div className="flex items-center space-x-2">
                            <FontAwesomeIcon color="grey" icon={["fas", "industry"]} />
                            <span className='hidden lg:block'>CO₂</span>
                        </div>
                    )}>
                        <C02Card co2Data={co2Data}/>
                    </Tab>
                </Tabs>
            </div>  
        )
    }
    return (
        <>
            <div className='flex flex-row pb-3 items-center'>
                { children }
                <h1 className='text-2xl dark:text-gray-300 text-gray-500 font-bold pl-3'>{fullName}</h1>
            </div>
            <Divider className=''/>
            {body}
        </>
    )
}

export default ExpandedContainer;
