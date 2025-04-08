import React from 'react';
import logo from '../assets/images/download.svg'
import './Header.css';
import { FaHospital } from 'react-icons/fa';

const Header = () => {
    return (
        <div className="icon-wrapper">
            <header className='header'>
                <FaHospital className="medical-icon"/><img src={logo} alt="Logo" className="logo"/>
            </header>
        </div>
    );
};

export default Header;