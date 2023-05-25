import style from "../styles/Info.module.css";
import {useState, useEffect} from 'react';
import useNetwork from '@/data/network';
import {getDistance} from '@/utils/getDistance';
import Link from 'next/link';
import LijnMeter from "./LijnMeter";

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
  let stations2 = stations.filter(station => station.distance >= 1 && station.distance <= 5);
  stations2.splice(0,3);

  if (stations2.length === 0) {
    stations2 = [{
      name: 'geen stations gevonden'
      }];
  }

console.log(stations)

return (
  <div className={style.displayHome}>
    {stations2.map(station =>
      <div className={style.cardPage} key={station.id}>
        {station.id ? (
          <Link href={`/stations/${station.id}`}>
            <div className={style.cardHome}>
              <p style={{ fontSize: 15 }} className={style.cardStationName}>{station.name.slice(5)}</p>
              <p style={{ color: "black" }}>{Math.trunc(station.distance*10)/10} km</p>
            </div>
          </Link>
        ) : (
          <div className={style.cardHome}>
            <p style={{ fontSize: 15 }} className={style.cardStationName}>{station.name}</p>
            <p style={{ color: "black" }}>{station.distance} &#8205;</p>
          </div>
        )}
        <div className={style.lijn}></div>
      </div>
    )}
  </div>
);
}