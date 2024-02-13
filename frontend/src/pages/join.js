import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const initialState = {
    nickname: "",
    username: "",
    password: "",
    rePassword: "",
    studentId: "",
    major: "",
}

export default function Join() {
    const IP = process.env.REACT_APP_IP
    const navigate = useNavigate();
    const [{ nickname, username, password, rePassword, studentId, major }, setState] = useState(initialState);
    const handleChange = (e) => {
        const {name, value} = e.target;
        setState((prevState) => ({...prevState, [name]: value}))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            nickname: nickname,
            username: username,
            password: password,
            rePassword: rePassword,
            studentId: studentId,
            major: major
        }
        //const response = await axios.post('http://localhost:8080/api/user/save', data)
        const response = await axios.post(`${IP}/api/user/save`, data)
        console.log(response);
        if (response.status === 201) {
            navigate('/')
        } else {
            
        }
    }
    return (

<div style={{
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    width: '100vw', 
    height: '120vh', 
    backgroundColor: '#F1F3F4'}}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'center',
        height: '105vh',
      }}>
        <h2 style={{marginBottom: '55px', paddingTop: '130px'}}>SIGN UP</h2>
        <form 
            onSubmit={handleSubmit}
            style={{
                //display: 'flex',
                //flexDirection: 'column',
                //justifyContent: 'center',
                width: '100vw'
                //alignItems: 'center'
        }}>
        <div className='col-xs-12 col-md-4' style={{backgroundColor: '#F1F3F4'}}></div>
        <div className='col-xs-12 col-md-4' 
            style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <div>
        <Label className='col-xs-12 col-md-4'>닉네임*</Label>
        <Input 
            className='col-xs-12 col-md-8'
            required
            placeholder='닉네임을 입력해주세요.'
            name="nickname"
            value={nickname}
            onChange={handleChange} />
        </div>
        <div>
        <Label className='col-xs-12 col-md-4'>아이디*</Label>
        <Input 
            className='col-xs-12 col-md-8'
            required
            placeholder='6자 이상의 영문 혹은 영문 숫자 조합'
            name="nickname"
            value={nickname}
            onChange={handleChange} />
        </div>
        <div>
        <Label className='col-xs-12 col-md-4'>비밀번호*</Label>
        <Input 
            className='col-xs-12 col-md-8'
            required
            type="password"
            placeholder='영문/숫자/특수문자 조합 8자 이상'
            name="nickname"
            value={nickname}
            onChange={handleChange} />
        </div>
        <div>
        <Label className='col-xs-12 col-md-4'>비밀번호 확인*</Label>
        <Input 
            className='col-xs-12 col-md-8'
            required
            type="password"
            placeholder='비밀번호를 한번 더 입력해주세요.'
            name="nickname"
            value={nickname}
            onChange={handleChange} />
        </div>

        <div style={{marginTop: '30px'}}>
        <Label className='col-xs-12 col-md-4' style={{}}>학번</Label>
        <Input 
            className='col-xs-12 col-md-8'
            required
            placeholder='학번을 입력해주세요. 예: 2023311234'
            name="nickname"
            value={nickname}
            onChange={handleChange} />
        </div>
        <div>
        <div><Label className='col-xs-12 col-md-4'>학과</Label></div>
        <Input 
            className='col-xs-12 col-md-8'
            required
            placeholder='학과를 입력해주세요.'
            name="nickname"
            value={nickname}
            onChange={handleChange} />
        </div>
        </div>
        <div className='col-xs-12 col-md-4'></div>
        
        </form>
        <div style={{display: 'flex', marginBottom: '30px'}}>
            {/* <div className='col-xs-12 col-md-2'></div> */}
          <Button onClick={handleSubmit}>회원가입</Button>
          {/* <div className='col-xs-12 col-md-2'></div> */}
        </div>
      </div>
  </div>
    )
}

const Input = styled.input`
  border: none;
  border-bottom: 1px solid #303030;
  background-color: #F1F3F4;
  height: 45px;
  padding: 0 7px 4px 7px;
  color: black;
  border-radius: 0;
  outline: none;
  margin-bottom: 12px;

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
  border: none;
  outline: none;
  margin-bottom: 30px;
`


const Label = styled.div`
font-family: var(--font-nanum-light);
margin-bottom: 4px;
padding-top: 10px;
padding-left: 7px;
color: black;
`