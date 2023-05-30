import style from "../styles/Info.module.css";
import {useState, useEffect} from 'react';
import useNetwork from '@/data/network';
import {getDistance} from '@/utils/getDistance';
import Link from 'next/link';
import {Poppins} from '@next/font/google';

const poppins = Poppins({
    subsets:['latin'],
    style:['normal'],
    weight:['100','200','300', '400']
  })

  const black = '#1C2517'

export default function Home() {
  const [filter, setFilter] = useState('');
  const [location, setLocation] = useState({});
  const { network, isLoading, isError } = useNetwork();

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

  let stations = network.stations.filter(station => station.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0);

  stations.map(station => {
    station.distance = getDistance(location.latitude, location.longitude, station.latitude, station.longitude).distance / 1000;
  });

  stations.sort((a, b) => a.distance - b.distance);

  let stations2 = stations.filter(station => station.distance <= 1);

  stations2.splice(0,3);
  
  if (stations2.length === 0) {
    stations2 = [{
      name: 'geen stations gevonden'
      }];
    
  }
  
console.log(stations2)

return (
  <div className={style.displayHome}>
    {stations2.map(station =>
      <div className={style.cardPage} key={station.id}>
        {station.id ? (
          <Link href={`/stations/${station.id}`}>
            <div className={style.cardHome}>
              <div className={poppins.className}>
              <p style={{ fontSize: 15 }} className={style.cardStationName}>{station.name.slice(5)}</p>
              <p style={{ color: black }}>{Math.trunc(station.distance*1000)} m</p>
              </div>
            </div>
          </Link>
        ) : (
          <div className={style.cardHome}>
            <div className={poppins.className}>
            <p style={{ fontSize: 15 }} className={style.cardStationName}>{station.name}</p>
            <p style={{ color: black }}>{station.distance} &#8205;</p>
            </div>
          </div>
        )}
        <div className={style.lijn}></div>
      </div>
    )}
  </div>
);
}