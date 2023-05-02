import React from 'react';
import styles from "../styles/Card.module.css";
import StationHolder from './StationHolder';
import styled from 'styled-components';



const Pane = styled.div`
    flex: ${props => props.weight};
`;

const SplitScherm = ({
    children,
    leftWeight = 1,
    rightWeight = 1
}) => {
    const[left, right] = children;
    return(
        
        <div className={styles.Div}>
            <Pane weight={leftWeight}>
                {left}
                {left}
                {left}
            </Pane>
            <Pane weight={rightWeight} className={styles.Pane}>
                 {right}
            </Pane>
        </div>
    );
}

export default SplitScherm