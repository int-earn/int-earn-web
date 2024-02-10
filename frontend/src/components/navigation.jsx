import React from "react";
import { Link } from 'react-router-dom';

export const Navigation = (props) => {
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a className="navbar-brand page-scroll" href="#page-top" style={{fontFamily: 'var(--font-nanum-light)'}}>
            int earn;들이 남기는 마지막 잎새
          </a>{" "}
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            {/* <li>
              <a href="/#features" className="page-scroll">
                
              </a>
            </li> */}
            {/* <Link to='/'>Features</Link> */}
            <li>
              <a href="/#about" className="page-scroll">
                About us
              </a>
            </li>
            <li>
              <a href="/#services" className="page-scroll">
                Board
              </a>
            </li>
            <li>
              <a href="/#portfolio" className="page-scroll">
                Archive
              </a>
            </li>
            {/* <li>
              <a href="/#testimonials" className="page-scroll">
                Testimonials
              </a>
            </li>
            <li>
              <a href="/#team" className="page-scroll">
                Team
              </a>
            </li> */}
            <li>
              <a href="/#contact" className="page-scroll">
                Login
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
