import React from 'react';
import {useState, useEffect} from 'react';
import useNetwork from '@/data/network';
import {getDistance} from '@/utils/getDistance';
import {useRouter} from 'next/router';
import style from "../styles/Info.module.css";


export default function SplitScherm() {
    const [location, setLocation] = useState({});
    const { network, isLoading, isError } = useNetwork();
    const router = useRouter()
  
    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            console.error(error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    }, []);
  
    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error</div>
  
    const stations = network.stations;
    const station = network.stations.find(station => station.id === router.query.stationid);
    
  
    stations.map(station => {
      station.distance = getDistance(location.latitude, location.longitude, station.latitude, station.longitude).distance/1000;
    });
  
    stations.sort((a, b) => a.distance - b.distance);

return(
    <>
    <p>test</p>
    <div className={style.display}>
            {Array.from({length: stations.name},(name) => (
                <div className={style.card} key={name}><p>test</p></div>
            ))}
            {Array.from({length: stations.name },(name) => (
                <div className={style.card} key={name}><p>test</p></div>
            ))}
        </div>
    </>
);

}