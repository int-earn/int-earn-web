import React from "react";
import { useNavigate } from 'react-router-dom';

export const Services = (props) => {
  const navigate = useNavigate();
  const board = [
    {"id": 1, "title": "글로벌 챌린지 참가자 분들께 질문이 있습니다!", "date": "02.11"},
    {"id": 2, "title": "글챌 지원할 때", "date": "02.11"},
    {"id": 3, "title": "ㅇㅇ팀 인터뷰 할 현직자 분들", "date": "02.10"},
    {"id": 4, "title": "글로벌 챌린지 참가자 분들께 질문이 있습니다!", "date": "02.09"},
    {"id": 5, "title": "글로벌 챌린지 참가자 분들께 질문이 있습니다!", "date": "02.07"},
    {"id": 6, "title": "글로벌 챌린지 참가자 분들께 질문이 있습니다!", "date": "02.07"},
    {"id": 7, "title": "글로벌 챌린지 참가자 분들께 질문이 있습니다!", "date": "02.06"},
    {"id": 4, "title": "글로벌 챌린지 참가자 분들께 질문이 있습니다!", "date": "02.09"},
    {"id": 5, "title": "글로벌 챌린지 참가자 분들께 질문이 있습니다!", "date": "02.07"},
    {"id": 6, "title": "글로벌 챌린지 참가자 분들께 질문이 있습니다!", "date": "02.07"},
  ]

  const handleBtnClick = () => {
    navigate('/board')
    window.scrollTo(0, 0); 
  }
  return (
    <div id="service" style={{paddingTop: '100px'}}>
    <div className="container">
      <div className='row'>
      <div style={{display: 'flex'}}>
      <h2 style={{marginLeft: '15px'}}>BOARD</h2>
      <div 
        onClick={handleBtnClick}
        style={{marginLeft: '15px', alignSelf: 'end', marginBottom: '25px', borderBottom: '1px solid', paddingBottom: '2px', cursor: 'pointer'}}>
        View All 
      </div>
      </div>
        <div className='col-xs-12 col-md-4' style={{borderTop: '1px solid #ccc'}}>
          
        </div>
        <div
          className='col-xs-12 col-md-8'
          style={{marginTop: 0, backgroundColor: '#F1F2F2', paddingBottom: '45px', padding: 0}}>
            {/* <h2 className='text-center'>BOARD</h2> */}
          <div className='test' style={{padding: '30px', color: 'black', borderTop: '1px solid #ccc'}}>
          
          {board.map(b => (
            <div style={{display: 'grid', gridTemplateColumns: '5fr 50px', padding: '12px 0', fontSize: '16px', fontFamily: 'var(--font-nanum-light)'}}>
              {/* <div></div> */}
              <div className='title' style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{b.title}</div>
              <div className='title' style={{marginLeft: '5px'}}>{b.date}</div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};
