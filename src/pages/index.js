import styles from "../styles/Home.module.css";
import LogoVelo from '../../public/logoVelo.svg';
import Suggested from "@/components/Suggested";
import GeoLocation from "@/components/GeoLocation";
import SplitScherm from "@/components/SplitScherm";
import Card from "@/components/Card";
import LijnMeter from "@/components/LijnMeter";
import StationHolder from "@/components/StationHolder";
import Tussenstuk from "@/components/Tussenstuk";

const roboto = "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, 'Roboto', Oxygen, Ubuntu, Cantarell, 'Open Sans', Helvetica Neue, sans-serif";
const Titelkleur = "#74B748"

export default function App() {
  return (
    <>
      <div style={{marginTop:20}}>
        <LogoVelo style={{height:30}}/>
      </div>
        <div>
        <Suggested/>
        </div>
       <div> 
        <br/>
          <div>
            <p style={{padding: 5, fontSize: 15, fontFamily: roboto, color: Titelkleur}}>Stations in de buurt</p>
            <SplitScherm leftWeight={6} rightWeight={1}>
            <StationHolder/>
            <LijnMeter/>
            </SplitScherm>
          </div>
          <div>
            <Tussenstuk/>
            <Tussenstuk/>
            <Tussenstuk/>
          </div>
          <div>
            <SplitScherm leftWeight={6} rightWeight={1}>
            <StationHolder/>
            <LijnMeter/>
            </SplitScherm>
          </div>
          <div>
            <Tussenstuk/>
            <Tussenstuk/>
            <Tussenstuk/>
          </div>
          <div>
            <SplitScherm leftWeight={6} rightWeight={1}>
            <StationHolder/>
            <LijnMeter/>
            </SplitScherm>
          </div>
        </div>
    </>
  );
}

