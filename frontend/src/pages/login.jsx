import React from "react";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      width: '100vw', 
      height: '100vh', 
      backgroundColor: '#F1F3F4'}}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <h2 style={{marginBottom: '35px'}}>LOGIN</h2>
          <form style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Input placeholder='아이디' />
            <Input placeholder='비밀번호' type="password" />
            <Button>로그인하기</Button>
          </form>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '320px',
            marginTop: '30px',
            marginRight: '5px'
          }}>
            <SmBtn onClick={() => navigate('/join')} style={{borderRight: '1px solid'}}>회원가입</SmBtn>
            <SmBtn style={{borderRight: '1px solid'}}>아이디찾기</SmBtn>
            <SmBtn style={{paddingLeft: '13px'}}>비밀번호찾기</SmBtn>
          </div>
        </div>
    </div>
  );
};

const Input = styled.input`
  border: 1px solid #303030;
  width: 300px;
  height: 50px;
  margin-bottom: 8px;
  padding: 0 7px 0 7px;
  color: black;
  border-radius: 0;
  outline: none;

  &:focus {
    outline: none;
  }

  &::placeholder {
    font-family: var(--font-nanum-light);
  }
`

const Button = styled.button`
  width: 300px;
  height: 50px;
  background-color: #303030;
  font-family: var(--font-nanum-light);
  color: white;
  margin-top: 15px;
`

const SmBtn = styled.button`
flex: 1;
border: none;
font-family: var(--font-nanum-light);
background-color: #F1F3F4;
color: #303030;
`