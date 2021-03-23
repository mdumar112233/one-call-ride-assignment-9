import React, { useEffect, useState } from 'react';
import './SearchLocation.css';
import map from '../../images/Map.png';
import FakeData from '../../FakeData/FakeData';
import SearchForVehicle from '../SearchForVehicle/SearchForVehicle';
import { useParams } from 'react-router';

const SearchLocation = () => {
    const {vehicle} = useParams();
    const fakeData = FakeData;
    const [changeLocation, setChangeLocation] = useState(false);
    const [transport, setTransport] = useState([]);
    const newTransport = transport.slice(0,4);
    const [location, setLocation] = useState({});

    useEffect(() => {
        setTransport(fakeData);
    },[])



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
                        { !changeLocation ? <div className='search-input'><label htmlFor="pickFrom">Pick From</label><br/>
                        <input className='location-input' onBlur={handleLocation} type="text" name="pickFrom" /><br/><br/>
                        <label htmlFor="pickTo">Pick To</label><br/>
                        <input className='location-input' onBlur={handleLocation} type="text" name='pickTo' /><br/><br/>
                        <button onClick= {() => setChangeLocation(!changeLocation)} className='search-btn'>search</button>
                        </div> : <div>
                        <div className="location-title">
                            <p>{location.pickFrom}</p>
                            <p>{location.pickTo}</p>
                        </div>
                            {
                                newTransport.map(transport => <SearchForVehicle transport={transport} vehicle={vehicle}></SearchForVehicle>)
                            }
                        </div>
                        }
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