import React, { useState } from 'react';
import './SearchForVehicle.css';


const SearchForVehicle = (props) => {
    const vehicleName = props.vehicle;
    const transport = props.transport;

    const {name, price, capacity, image} = transport;

    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-4">
                    <div className="search-result">
                        {
                        vehicleName === transport.name && <div className='allVehicle'>
                            <div className="vehicle-info">
                                <div style={{width:'60px'}}><img src={image} alt=""/></div>
                                <div><span>{name} </span></div>
                                <div> <span>{capacity}</span></div>
                                <div><span>${price}</span></div>
                            </div>
                            <div className="vehicle-info">
                                <div style={{width:'80px'}}><img src={image} alt=""/></div>
                                <div><span>{name} </span></div>
                                <div> <span>{capacity}</span></div>
                                <div><span>${price}</span></div>
                            </div>
                            <div className="vehicle-info">
                                <div style={{width:'80px'}}><img src={image} alt=""/></div>
                                <div><span>{name} </span></div>
                                <div> <span>{capacity}</span></div>
                                <div><span>${price}</span></div>
                            </div>
                    </div>
                    }
                </div>
            </div>
            
        </div>
        </div>
    );
};

export default SearchForVehicle;