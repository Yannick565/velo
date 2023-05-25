import React from 'react';
import styles from "../styles/Suggested.module.css";
import Card from "@/components/Card";

const roboto = "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, 'Roboto', Oxygen, Ubuntu, Cantarell, 'Open Sans', Helvetica Neue, sans-serif";

const Suggested = (props) => {
    return(
    <div className={styles.Holder}>
        <p style={{padding: 5, fontSize: 14, fontFamily: roboto}}>Dichtstbijzijnde stations</p>
            <Card station={props.stations[0]}/>
            <Card station={props.stations[1]}/>
            <Card station={props.stations[2]}/>
    </div>
    );
} 

export default Suggested;
