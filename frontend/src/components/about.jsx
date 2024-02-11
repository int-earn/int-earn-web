import React from "react";
import googleImg from '../assets/img/google_outside.jpg'

export const About = (props) => {
  return (
    <div id="about" style={{fontFamily: 'var(--font-nanum-light)'}}>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            {" "}
            <img src={googleImg} style={{paddingRight: '15px'}} alt=''/>
            {" "}
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2 style={{paddingTop: '20px'}}>About Us</h2>
              <p>
                {/* {props.data ? props.data.paragraph : "loading..."} */}
                <b>'int earn;들이 남기는 마지막 잎새'</b>는
                글로벌 챌린지 프로그램 참가자들의 후기와 경험을 공유하는 플랫폼입니다.
                2023 동계 글로벌 챌린지 프로그램에 참가했던 저희 'int earn;'팀은
                글로벌 챌린지 프로그램에서 얻은 가치를
                소프트웨어융합대학 후배들에게 전달하고자 웹페이지를 구축하게 되었습니다.
              </p>
              <h3 style={{fontFamily: 'var(--font-nanum-light)', paddingTop: '10px'}}>어떤 기능을 제공하나요?</h3>
              <div className="list-style">
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {props.data
                      ? props.data.Why.map((d, i) => (
                          <li key={`${d}-${i}`}>{d}</li>
                        ))
                      : "loading"}
                  </ul>
                </div>
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {props.data
                      ? props.data.Why2.map((d, i) => (
                          <li key={`${d}-${i}`}> {d}</li>
                        ))
                      : "loading"}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
