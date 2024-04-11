import '../App.css'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ExpandedContainer from './ExpandedContainer'
import CountryAvatar from './CountryAvatar';
import 'chart.js/auto';
import SmallChart from './SmallChart';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

function CountryContainer({ activeCountry } : {activeCountry : string}) {
  const [ expanded, setExpanded ] = useState(false);
  const [ co2Data, setCo2Data ] = useState([])
  const [ load, setLoad ] = useState([])
  const [ prodForecast, setProdForecast ] = useState([])

  useEffect(() => {
    fetch(`https://api-access.electricitymaps.com/free-tier/carbon-intensity/history?zone=${activeCountry}`, {
        method: 'GET',
        headers: {
            'auth-token': 'dPKs2oUmYyJ7O6dWUy0xDRGkn9AK4sf0'
        },
    })
    .then(response => response.json())
    .then((response : any) => {
        setCo2Data(response.history.map((entry : any) => {
            return [(new Date(entry.datetime)).getHours().toString().padStart(2, '0'), entry.carbonIntensity]
        }))
    })
    .catch(err => console.error(err));
    fetch(`http://jmaillefaud-project-express.course-fwe-2023.isginf.ch/api/${activeCountry}/week`)
    .then(response => response.json())
    .then((response : any) => {
        setLoad(response.map((entry : any) => {
          return [new Intl.DateTimeFormat('en-US', {
            year: 'numeric', 
            month: 'short', 
            day: 'numeric'
          }).format(new Date(entry.datetime)), entry.load, entry.load_forecast]
        }))
        setProdForecast(response.map((entry : any) => {
          return [new Intl.DateTimeFormat('en-US', {
            year: 'numeric', 
            month: 'short', 
            day: 'numeric'
          }).format(new Date(entry.datetime)), entry.prod_forecast]
        }))
    })
}, [activeCountry])

  return (
    <div className='container
      lg:mt-[5vh]
      self-end lg:self-center z-10 
      w-5/6 h-24 hover:h-1/2 lg:w-24 lg:h-1/2 hover:lg:w-1/2 hover:lg:h-5/6
      absolute bg-white 
      dark:bg-black lg:rounded-l-2xl rounded-t-2xl p-4
      overflow-hidden
      transition-[height, width] duration-100 ease-in-out'
      onMouseOver={() => setExpanded(true)}
      onMouseOut={() => setExpanded(false)}
    >
      { expanded && (
        <ExpandedContainer co2Data={co2Data} activeCountry={activeCountry}>
          <CountryAvatar activeCountry={activeCountry}/>
        </ExpandedContainer>
      )}

      { !expanded && (
        <div className='flex flex-row lg:flex-col justify-between py-5 items-center h-full'>
          <div className="flex-[1]" >
            <CountryAvatar activeCountry={activeCountry} />
          </div>
          <div className='flex flex-row lg:flex-col flex-[4] justify-between rounded-full
          px-[1vh] py-[0.5vh]
          ml-[1vh]
          lg:ml-0 lg:p-[1vh] lg:py-[2vh] lg:mt-[4vh] 
          items-center
          border
          border-gray-300
          dark:border-zinc-800	
          border-2 '>
            <FontAwesomeIcon size="xl" icon={["fas", "bolt"]} />
            <SmallChart data={load.map(entry => entry[1])} color={['255', '0', '0']}>
              <></>
            </SmallChart>
            <SmallChart data={prodForecast.map(entry => entry[1])} color={['0', '200', '0']}>
              <></>
            </SmallChart>
          </div>
          <div className='flex flex-[2] flex-col justify-between
          lg:p-[1vh] lg:pt-[2vh]
          items-center'>
            <SmallChart data={co2Data.map((entry : any) => entry[1])} color={['100', '100', '100']}>
              <FontAwesomeIcon size="xl" color="rgba(200, 200, 200, 0.5)" className="align-center" icon={["fas", "industry"]} />
            </SmallChart>
          </div>
        </div>
      )}  
    </div>
  )
}

export default CountryContainer;
  