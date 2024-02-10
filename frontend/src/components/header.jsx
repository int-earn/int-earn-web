import React from "react";
import background from '../assets/img/samsung_outside.jpg'

export const Header = (props) => {
  return (
    <header id="header">
      <div className="intro" style={{backgroundImage: `url(${background})`}}>
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-12 intro-text">
                <h1>SKKU</h1>
                <h1>
                  GLOBAL CHALLENGE
                  <span></span>
                </h1>
                <p style={{height: '80px'}}>{/*{props.data ? props.data.paragraph : "Loading"}*/}</p>
                <a
                  href="#about"
                  className="btn btn-custom btn-lg page-scroll"
                >
                  View More
                </a>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
