import React, { useState } from "react";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userState } from '../atoms/user';
import { loadUser, login } from '../actions/user';

export const Login = () => {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);

  const [userInput, setUserInput] = useState({
    username: '',
    password: '',
  })
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setError(false);
    const {name, value} = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    login(userInput, ([result, message]) => {
      if (result) {
        loadUser(([result, data]) => {
          if (result) {
            setUser(prev => ({
              ...prev,
              user: data,
              isAuthenticated: true,
            }))
            navigate(-1)
          } else {
            console.log(data);
          }
        })
      } else {
        console.log(message)
      }
    });
  }

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
          <h2 style={{marginBottom: '27px'}}>LOGIN</h2>
          <form 
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Input 
              placeholder='아이디' 
              onChange={handleChange}
              name="username"
              type="text"
            />
            <Input 
              placeholder='비밀번호' 
              onChange={handleChange}
              name="password"
              type="password" 
            />
            {error ? <div style={{width: '100%'}}><ErrorMsg>아이디 또는 비밀번호가 일치하지 않습니다.</ErrorMsg></div> : <div style={{height: '25px'}}></div>}
            <Button onClick={handleSubmit}>로그인하기</Button>
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
  margin-top: 8px;
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

const ErrorMsg = styled.div`
  font-size: 11px;
  font-weight: bold;
  font-family: var(--font-nanum-light);
  color: red;
  padding: 4px 0;
`

const Button = styled.button`
  width: 300px;
  height: 50px;
  background-color: #303030;
  font-family: var(--font-nanum-light);
  font-weight: bold;
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