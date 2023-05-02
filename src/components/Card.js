import React from 'react';
import styles from "../styles/Card.module.css";
import GeoLocation from "@/components/GeoLocation";

const Card = () => {
    return(
        <div className={styles.Container}>
            <p className={styles.CardNumber}>{}</p>
            <p className={styles.CardText}>{}</p>
        </div>
    );
}

function distanceBetween(){
    if(stations.name > "50m"){

    }
}

export default Card;