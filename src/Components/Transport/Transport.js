import React from 'react';
import { useHistory } from 'react-router';
import './Transport.css';
const Transport = (props) => {
    const {name, image} = props.transport;
    const history = useHistory();
    const handleRides = () => {
        history.push('/search');
    } 
    return (
        <div>
            <div className='row'>
                <div className="col-4 col-container">
                    <div onClick={() => handleRides()} className="transport-card">
                        <img src={image} alt=""/>
                        <h4>{name}</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Transport;