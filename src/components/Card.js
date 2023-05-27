import React from 'react';
import styles from "../styles/Card.module.css";
import GeoLocation from "@/components/GeoLocation";
import Link from 'next/link';
import useNetwork from '@/data/network';
import {Poppins} from '@next/font/google';

const poppins = Poppins({
    subsets:['latin'],
    style:['normal'],
    weight:['100','200','300', '400']
  })


const Card = (props) => {
    return(
        <Link href={`/stations/${props.station.id}`}>
        <div className={poppins.className}>
            <div className={styles.Container}>
                <p  className={styles.CardNumber}>{props.station?.name.slice(5)}</p>
           </div>
        </div>
        </Link>
    );
}

export default Card;