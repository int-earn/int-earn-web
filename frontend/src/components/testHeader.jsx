import React from "react";
import background from '../assets/img/samsung_outside.jpg'
import styled from 'styled-components';

export const TestHeader = () => {
  return (
    <div style={{
        height: '88vh',
        width: '100vw',
        backgroundImage: `url(${background})`, 
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
        }}
        >
        <div id="#test" style={{display: 'flex', flexDirection: 'column'}}>
            <h2 style={{color: 'white', fontSize: '60px', textAlign: 'center', textShadow: '-2px 0px black, 0px 2px black, 2px 0px black, 0px -2px black'}}>SKKU</h2>
        <h2 style={{color: 'white', fontSize: '60px', textAlign: 'center', textShadow: '-2px 0px black, 0px 2px black, 2px 0px black, 0px -2px black'}}>GLOBAL CHALLENGE</h2>
        </div>

        {/* <div style={{display: 'flex', flexDirection: 'column'}}>
        <a
                href="#about"
                className="btn btn-custom btn-lg page-scroll"
                style={{textAlign: 'center'}}
            >
                View More
            </a>
            </div> */}
    </div>
  );
};