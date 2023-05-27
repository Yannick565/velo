import styles from "../../styles/Suggested.module.css";
import style from "../../styles/Info.module.css";
import LogoVelo from '../../../public/logoVelo.svg';
import Suggested from "@/components/Suggested";
import {useState, useEffect} from 'react';
import useNetwork from '@/data/network';
import {getDistance} from '@/utils/getDistance';
import {useRouter} from 'next/router';
import Link from 'next/link';
import {Poppins} from '@next/font/google';

const poppins = Poppins({
    subsets:['latin'],
    style:['normal'],
    weight:['100','200','300', '400']
  })

const Titelkleur = "#74B748"
const black = '#1C2517'

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
              <p className={poppins.className} style={{fontWeight: 600, fontSize: 26, color: Titelkleur}}>{station?.name.slice(5)}</p>
              <Link href="/"><p className={style.close} style={{fontSize: 30, color: Titelkleur}}></p></Link>
              </div>
                <br/>
                  <div className={style.bikeString}>
                    <p className={poppins.className} style={{paddingRight: 26, fontSize: 16, color: Titelkleur}}>fietsen</p>
                    <div className={style.bikeAmount}>
                      <p style={{ color: black }} className={poppins.className}>{station?.free_bikes}</p>
                    </div>
                  </div>
                  <div className={style.slotString}>
                    <p className={poppins.className} style={{paddingRight: 8.5, fontSize: 16, color: Titelkleur}}>plaatsen</p>
                    <div className={style.slotAmount}>
                      <p style={{ color: black }} className={poppins.className}>{station?.empty_slots}</p>
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