import React from "react";
import background from '../assets/img/samsung1.jpg'
import styled from 'styled-components';

export const TestHeader = () => {
  return (
    <div style={{
        height: '100vh',
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
            <h2 style={{color: 'white', fontSize: '60px', textAlign: 'center'}}>SKKU</h2>
        {/* <h2 style={{color: 'white', fontSize: '60px', textAlign: 'center', textShadow: '-1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black'}}>GLOBAL CHALLENGE</h2> */}
        <h2 style={{color: 'white', fontSize: '60px', textAlign: 'center'}}>GLOBAL CHALLENGE</h2>
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
