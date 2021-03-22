import React, { useEffect, useState } from 'react';
import './SearchLocation.css';
import map from '../../images/Map.png';
import { useParams } from 'react-router';
import FakeData from '../../FakeData/FakeData';
import { Link } from 'react-router-dom';

const SearchLocation = () => {
    const {vehicle} = useParams();
    const fakeData = FakeData;
    const [location, setLocation] = useState({});

    let filterName = [];
    fakeData.filter(searchVehicle => {
        const {name, price, capacity, image} = searchVehicle;
        const allInfo = {name, price, capacity, image}; 
        if(vehicle === name){
            filterName.push(allInfo);
        }
    });


    const handleLocation = e => {
            const pickPoint = e.target.value;
            const userLocation = {...location};
            userLocation[e.target.name] = pickPoint;
            setLocation(userLocation);
    }

    return (
        <div className='container'>
            <div className="row ride-location">
                <div className="col-md-4 search-section">
                    <div className="search">
                        <label htmlFor="pick-from">Pick From</label><br/>
                        <input onBlur={handleLocation} type="text" name="pick-from" required/><br/><br/>
                        <label htmlFor="pick-to">Pick To</label><br/>
                        <input onBlur={handleLocation} type="text" name='pick-to' required/><br/><br/>
                        <Link to='/vehicle'>
                            <button className='search-btn'>search</button>
                        </Link>
                    </div>
                </div>
                <div className="col-md-8 google-map">
                    <img src={map} alt=""/>
                </div>
            </div>
        </div>
    );
};

export default SearchLocation;