import React from 'react';
import { useHistory } from 'react-router';
import './Transport.css';
const Transport = (props) => {
    const {name, image} = props.transport;
    const history = useHistory();
    const handleRides = () => {
        const url = `/search/${name}`;
        history.push(url);
    } 
    return (
            <div className='col-md-3'>
                <div className="col-container">
                    <div onClick={() => handleRides()} className="transport-card">
                        <img src={image} alt=""/>
                        <h4>{name}</h4>
                    </div>
                </div>
            </div>
    );
};

export default Transport;