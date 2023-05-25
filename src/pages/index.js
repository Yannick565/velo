import styles from "../styles/Home.module.css";
import LogoVelo from '../../public/logoVelo.svg';
import Suggested from "@/components/Suggested";
import GeoLocation from "@/components/GeoLocation";
import SplitScherm from "@/components/SplitScherm";
import Card from "@/components/Card";
import LijnMeter from "@/components/LijnMeter";
import StationHolder from "@/components/StationHolder";
import StationHolder2 from "@/components/StationHolder2";
import StationHolder3 from "@/components/StationHolder3";
import Tussenstuk from "@/components/Tussenstuk";
import {useState, useEffect, startTransition} from 'react';
import useNetwork from '@/data/network';
import {getDistance} from '@/utils/getDistance';
import {useRouter} from 'next/router';

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
  
  const station = network.stations.find(station => station.id === router.query.stationId);
  const stations = network.stations;

  stations.map(station => {
    station.distance = getDistance(location.latitude, location.longitude, station.latitude, station.longitude).distance/1000;
  });

  stations.sort((a, b) => a.distance - b.distance);

  return (
    <>
      <div style={{marginTop:20}}>
        <LogoVelo style={{height:30}}/>
      </div>
        <div>
          <Suggested stations={stations}/>
        </div>
       <div> 
        <br/>
          <div>
            <p style={{padding: 5, fontSize: 16, fontFamily: roboto, color: Titelkleur}}>Stations op wandelafstand</p>
            <StationHolder stations={stations}/>
            <LijnMeter/>
          </div>
          <div className={styles.tussenstukCont}>
            <p style={{padding: 5, fontSize: 16, fontFamily: roboto, color: Titelkleur}}>5 km</p>
          <div className={styles.tussenstuk}>
            <Tussenstuk/>
            <Tussenstuk/>
            <Tussenstuk/>
          </div>
          </div>
          <div>
            <StationHolder2 stations={stations}/>
            <LijnMeter/>
          </div>
          <div className={styles.tussenstukCont}>
            <p style={{padding: 5, fontSize: 16, fontFamily: roboto, color: Titelkleur}}>10 km</p>
          <div className={styles.tussenstuk}>
            <Tussenstuk/>
            <Tussenstuk/>
            <Tussenstuk/>
          </div>
          </div>
          <div>
            <StationHolder3 stations={stations}/>
          </div>
          <em><p style={{padding: 5, fontSize: 12, fontFamily: roboto, color: Titelkleur}}>Verder dan dit zou ik niet gaan...</p></em>
        </div>
    </>
  );
}

