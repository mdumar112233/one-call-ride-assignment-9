import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import FakeData from '../../FakeData/FakeData';
import Transport from '../Transport/Transport';
import './Home.css';

const Home = () => {
    const fakeData = FakeData.slice(0, 4);
    const [transports, setTransports] = useState([]);
    useEffect(() => {
        setTransports(fakeData);
    }, [])

    return (
        <div className='home-design'>
            <div className="container main-content">
                {
                    transports.map(transport => <Transport transport={transport}></Transport>)
                }
            </div>
        </div>
    );
};

export default Home;