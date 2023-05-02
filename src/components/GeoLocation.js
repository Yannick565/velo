import {useState, useEffect} from 'react';
import useNetwork from '@/data/network';
import {getDistance} from '@/utils/getDistance';
import Link from 'next/link';

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

  function handleFilterChange(e) {
    setFilter(e.target.value);
  }

  const stations = network.stations;
  console.log(stations)

  return (
    <div>
      {stations.map(station => 
        <div key={station.id}>
          <p href={`/stations/${station.id}`}>{station.name}: {getDistance(location.latitude, location.longitude, station.latitude, station.longitude).distance} m</p>
        </div>)}
    </div>
  )
}