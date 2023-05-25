import React from 'react';
import styles from "../styles/Card.module.css";
import GeoLocation from "@/components/GeoLocation";
import Link from 'next/link';
import useNetwork from '@/data/network';


const Card = (props) => {
    return(
        <Link href={`/stations/${props.station.id}`}>
            <div className={styles.Container}>
                <p className={styles.CardNumber}>{props.station?.name.slice(5)}</p>
           </div>
        </Link>
    );
}

export default Card;