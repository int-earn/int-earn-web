import React from "react";
import background from '../assets/img/samsung_outside.jpg'
import styled from 'styled-components';

export const TestHeader = () => {
  return (
    <div style={{
        height: '100vh',
        width: '100vw',
        backgroundImage: `url(${background})`, 
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'}}
        >
        <h2>SKKU GLOBAL CHALLENGE</h2>
    </div>
  );
};
