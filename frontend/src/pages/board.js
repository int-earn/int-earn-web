import React from "react";
import styled from 'styled-components';

export const Board = () => {
    const tempBoard = [
        {"id": 1, "title": "글로벌 챌린지 참가자 분들께 질문이 있습니다!", "date": "02.11", "content": "본문 내용입니다. 임시 본문 내용입니다.", "nickname": "데이터사이언스융합전공 22 홍길동"},
        {"id": 2, "title": "글챌 지원할 때", "date": "02.11", "content": "본문 내용입니다. 임시 본문 ", "nickname": "데이터사이언스융합전공 21 홍길동"},
        {"id": 3, "title": "ㅇㅇ팀 인터뷰 할 현직자 분들", "date": "02.10", "content": "본문 내용입니다. 임시 본문 ", "nickname": "소프트웨어학과 22 홍길동"},
        {"id": 4, "title": "글로벌 챌린지 참가자 분들께 질문이 있습니다!", "date": "02.09", "content": "본문 내용입니다. 임시 본문 ", "nickname": "소프트웨어학과 22 홍길동"},
        {"id": 5, "title": "글로벌 챌린지 참가자 분들께 질문이 있습니다!", "date": "02.07", "content": "본문 내용입니다. 임시 본문 내용입니다.", "nickname": "인공지능융합전공 19 홍길동"},
        {"id": 6, "title": "글로벌 챌린지 참가자 분들께 질문이 있습니다!", "date": "02.07", "content": "본문 내용입니다. 임시 본문 내용입니다.", "nickname": "인공지능융합전공 20 홍길동"},
        {"id": 7, "title": "글로벌 챌린지 참가자 분들께 질문이 있습니다!", "date": "02.06", "content": "본문 내용입니다. 임시 본문 ", "nickname": "소프트웨어학과 22 홍길동"},
        {"id": 4, "title": "글로벌 챌린지 참가자 분들께 질문이 있습니다!", "date": "02.09", "content": "본문 내용입니다. 임시 본문 ", "nickname": "데이터사이언스융합전공 22 홍길동"},
        {"id": 5, "title": "글로벌 챌린지 참가자 분들께 질문이 있습니다!", "date": "02.07", "content": "본문 내용입니다. 임시 본문 내용입니다", "nickname": "데이터사이언스융합전공 22 홍길동"},
        {"id": 6, "title": "글로벌 챌린지 참가자 분들께 질문이 있습니다!", "date": "02.07", "content": "본문 내용입니다. 임시 본문 내용입니다.", "nickname": "인공지능융합전공 20 홍길동"},
    ]
  return (
    <Container className='container'>
        {/* <div className='col-xs-12 col-md-3'></div> */}
        <InnerContainer>
        <h2 style={{width: '90vw'}}>BOARD</h2>
            <div className='col-xs-12 col-md-4' style={{borderTop: '2px solid black'}}>
            
            </div>
            <div
                className='col-xs-12 col-md-8' 
                style={{borderTop: '2px solid black', padding: '0 0 30px 0'}}>
                    {tempBoard.map(b => (
                        <ContentBox>
                        <Title>{b.title}</Title>
                        <Content>{b.content}</Content>
                        <div className='col-xs-12 col-md-7'></div>
                        <DateUser className='col-xs-12 col-md-5'>
                            <div></div>
                            <div><span style={{marginRight: '7px', paddingRight: '7px', borderRight: '1px solid'}}>{b.date}</span>{b.nickname}</div>
                            {/* <div>{b.nickname}</div> */}
                        </DateUser>
                        </ContentBox>
                    ))}
            </div>
        </InnerContainer>
        {/* <div className='col-xs-12 col-md-3'></div> */}
    </Container>
  );
};

const Container = styled.div`
    display: flex;
    justify-content: center; 
    align-items: center; 
    width: 100vw;
    height: 100vh;
`

const InnerContainer = styled.div`
width: 85vw;
height: 80vh;
margin-top: 130px;
`

const ContentBox = styled.div`
margin-top: 15px;
padding-bottom: 12px;
font-family: var(--font-nanum-light);
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
border-bottom: 1px solid black;
`

const Title = styled.div`
font-weight: bold;
font-size: 17px;
color: black;
padding-bottom: 4px;
`

const Content = styled.div`
font-size: 14px;
`

const DateUser = styled.div`
font-size: 13px;
color: black;
display: flex;
justify-content: space-between;
margin-top: 17px;
`