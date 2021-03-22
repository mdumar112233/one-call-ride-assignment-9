import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <div className='container header-design'>
            <div>
                <h3>One Call Riders</h3>
            </div>
            <div className='menu'>
                <ul>
                    <li>
                        <a href=""><Link to='/home'>Home</Link></a>
                    </li>
                    <li><a href=""><Link>Destination</Link></a></li>
                    <li><a href=""><Link>Blog</Link></a></li>
                    <li><a href=""><Link>Contact</Link></a></li>
                    <li>
                        <a href=""><Link to='/login'>Login</Link></a>
                    </li>
                </ul>
            </div>
     
        </div>
    );
};

export default Header;