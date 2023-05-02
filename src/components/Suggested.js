import React from 'react';
import styles from "../styles/Suggested.module.css";
import Card from "@/components/Card";

const roboto = "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, 'Roboto', Oxygen, Ubuntu, Cantarell, 'Open Sans', Helvetica Neue, sans-serif";

const Suggested = () => {
    return(
    <div className={styles.Holder}>
        <p style={{padding: 5, fontSize: 13, fontFamily: roboto}}>jouw favoriete en meest gebruikte stations</p>
            <Card/>
            <Card/>
            <Card/>
    </div>
    );
} 

export default Suggested;
