import styles from "../../styles/Suggested.module.css";
import style from "../../styles/Info.module.css";
import LogoVelo from '../../../public/logoVelo.svg';
import Suggested from "@/components/Suggested";
import {useState, useEffect} from 'react';
import useNetwork from '@/data/network';
import {getDistance} from '@/utils/getDistance';
import {useRouter} from 'next/router';
import Link from 'next/link';

const roboto = "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, 'Roboto', Oxygen, Ubuntu, Cantarell, 'Open Sans', Helvetica Neue, sans-serif";
const Titelkleur = "#74B748"

export default function App() {
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
     <div style={{marginTop:20}}>
        <Link href="/"><LogoVelo style={{height:30}}/></Link>
      </div>
        <div>
        <Suggested stations={stations}/>
        </div> 
          <div className={style.card}>
            <div className={style.cardTitle}>
              <p style={{ fontSize: 26, fontFamily: roboto, color: Titelkleur}}>{station?.name.slice(5)}</p>
              <Link href="/"><p className={style.close} style={{fontFamily: roboto, fontSize: 30, color: Titelkleur}}></p></Link>
              </div>
                <br/>
                  <div className={style.bikeString}>
                    <p style={{paddingRight: 19, fontSize: 16, fontFamily: roboto, color: Titelkleur}}>fietsen</p>
                    <div className={style.bikeAmount}>
                      <p>{station?.free_bikes}</p>
                    </div>
                  </div>
                  <div className={style.slotString}>
                    <p style={{paddingRight: 7.5, fontSize: 16, fontFamily: roboto, color: Titelkleur}}>plaatsen</p>
                    <div className={style.slotAmount}>
                      <p>{station?.empty_slots}</p>
                    </div>
                  </div>
                <div className={style.display}>
                  {Array.from({length: station?.free_bikes },(free_bikes) => (
                  <div className={style.bikes} key={free_bikes}></div>
                   ))}
                   {Array.from({length: station?.empty_slots },(empty_slots) => (
                  <div className={style.slots} key={empty_slots}></div>
                   ))}
                </div>
          </div>
    </>
  );
}