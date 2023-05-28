import React from 'react';
import styles from "../styles/Suggested.module.css";
import Card from "@/components/Card";
import {Poppins} from '@next/font/google';

const poppins = Poppins({
    subsets:['latin'],
    style:['normal'],
    weight:['100','200','300', '400']
  })

const black = '#1C2517'

const Suggested = (props) => {
    return(
    <div className={styles.Holder}>
        <p className={poppins.className} style={{padding: 5, color:black, fontSize: 14, fontWeight: 500 }}>Dichtstbijzijnde stations</p>
            <Card station={props.stations[0]}/>
            <Card station={props.stations[1]}/>
            <Card station={props.stations[2]}/>
    </div>
    );
} 

export default Suggested;
