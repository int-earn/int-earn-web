import React from "react";
import googleImg from '../assets/img/google_outside.jpg'

export const About = (props) => {
  return (
    <div id="about" style={{fontFamily: 'var(--font-nanum-light)'}}>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            {" "}
            <img src={googleImg} style={{paddingRight: '5px'}} alt=''/>
            {" "}
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2 style={{paddingTop: '10px'}}>About</h2>
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
                {/* <div className="col-lg-6 col-sm-6 col-xs-12"> */}
                <div>
                  <ul>
                    {/* {props.data
                      ? props.data.Why.map((d, i) => (
                          <li key={`${d}-${i}`}>{d}</li>
                        ))
                      : "loading"} */}
                      <li style={{fontWeight: 'bold'}}>자유게시판</li>
                      <p style={{marginTop: '10px'}}>
                        글로벌 챌린지 프로그램과 관련된 글들을 자유롭게 올릴 수 있습니다. 
                        또한 글로벌 챌린지 지원과 관련하여 기존의 참가자들에게 질문하거나, 
                        글로벌 챌린지 참가 팀들이 컨택 예정인 해외 현직자에게 드리고 싶은 질문 등을 작성할 수 있습니다.
                      </p>
                      <li style={{fontWeight: 'bold'}}>아카이브</li>
                      <p style={{marginTop: '10px'}}>
                        글로벌 챌린지 참가 팀들이 일정을 수행하며 남긴 사진 자료들을 게시할 수 있습니다.
                        글로벌 기업에 방문하여 사내 견학을 하는 모습, 현직자와 인터뷰를 하는 모습 등을 소프트웨어융합대학 학우들에게 공유할 수 있습니다.
                      </p>
                  </ul>
                </div>
                {/* <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {props.data
                      ? props.data.Why2.map((d, i) => (
                          <li key={`${d}-${i}`}> {d}</li>
                        ))
                      : "loading"}
                  </ul>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
