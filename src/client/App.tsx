import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import './App.css';
import 'leaflet/dist/leaflet.css';
import { euMap } from './map/eu-map'
import { useState } from 'react';
import CountryContainer from './components/CountryContainer';
import { Card, Switch, Image } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useTheme} from "next-themes";
import logoImage from '../../logo.png';

import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons'
library.add(far)

import L from 'leaflet';

export function App() {
  const [ activeCountry, setActiveCountry ] = useState("CH")
  const { theme, setTheme } = useTheme()

  const europeBounds = new L.LatLngBounds(
    new L.LatLng(30, -30), 
    new L.LatLng(75, 40) 
  );

  const mapInside = (
    <>
      <TileLayer 
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <GeoJSON data={euMap}
        style={(feature) => ({
          weight: 1,
          fillColor: feature?.id === activeCountry ? 'green' : '#3388ff',
        })}
        onEachFeature={(feature, layer) => {
          layer.on({
            click: () => setActiveCountry(String(feature.id)),
          })
        }}
      />
    </>
  )

  return (
    <main className='flex justify-center lg:justify-end'>
      <Card className='absolute z-10 top-5 right-0 p-3 pr-1 rounded-l-full'>
        <Switch
            defaultSelected
            size="lg"
            color="primary"
            onClick={() => {
              setTheme(theme === 'light' ? 'dark' : 'light');
            }}
            startContent={<FontAwesomeIcon icon={["far", 'sun']}/>}
            endContent={<FontAwesomeIcon icon={["far", 'moon']} />}
        >
        </Switch>
      </Card>

      <Card className='absolute z-10 top-[1vh] left-0 p-3 rounded-l-none rounded-r-2xl'>
          <Image width={50} height={50} src={logoImage}/>
      </Card>
       
      <CountryContainer activeCountry={activeCountry} />

      <MapContainer key={theme} center={[54.42, 8.26]} maxBounds={europeBounds} minZoom={4} zoom={4} className='map' style={{
        zIndex: 0,
        filter: theme === 'dark' ? 'invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%)' : '',
      }}>
        {mapInside}
      </MapContainer>
      
    </main>
  )
}