import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { API_URL } from '../config';

const initialState = {
    nickname: "",
    username: "",
    password: "",
    rePassword: "",
    studentId: "",
    major: "",
}

export default function Join() {
    const navigate = useNavigate();
    const [{ nickname, username, password, rePassword, studentId, major }, setState] = useState(initialState);
    const [error, setError] = useState({
      nickname: "",
      username: "",
      password: "",
      rePassword: "",
      studentId: "",
      major: "",
    })

    const majorList = ["글로벌융합학부", "데이터사이언스융합전공", "소프트웨어학과", "인공지능융합전공"]
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setState((prevState) => ({...prevState, [name]: value}))
        setError((prevState) => ({...prevState, [name]: ''}))
    }

    const validationCheck = () => {
      if (nickname === "") setError({...error, nickname: "닉네임을 입력해주세요."})
      else if (nickname.length >= 10) setError({...error, nickname: "10자 미만으로 입력해주세요."})
      else if (username.length < 6) setError({...error, username: "6자 이상으로 입력해주세요."})
      else if (password !== rePassword) setError({...error, rePassword: "비밀번호가 일치하지 않습니다."})
      else if (studentId.length !== 10) setError({...error, studentId: "정확한 학번을 입력해주세요."})
      else if (!majorList.includes(major)) setError({...error, major: "정확한 전공명을 입력해주세요."})
      else return true;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(validationCheck())
        if (!validationCheck()) return;

        const data = {
            nickname: nickname,
            username: username,
            password: password,
            rePassword: rePassword,
            studentId: studentId,
            major: major
        }
        try {
        const response = await axios.post(`${API_URL}/api/user/save`, data)
        //console.log(response);
        if (response.status === 201) {
            navigate('/')
        }} catch (e) {
            setError({...error, username: "닉네임 또는 아이디가 중복됩니다."})
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
            <div className='col-xs-12 col-md-4'></div>
            {error.nickname ? <Error className='col-xs-12 col-md-8'>{error.nickname}</Error> : <Empty className='col-xs-12 col-md-8'></Empty>}
        </div>
        <div>
        <Label className='col-xs-12 col-md-4'>아이디*</Label>
        <Input 
            className='col-xs-12 col-md-8'
            required
            placeholder='6자 이상'
            name="username"
            value={username}
            onChange={handleChange} />
            <div className='col-xs-12 col-md-4'></div>
            {error.username ? <Error className='col-xs-12 col-md-8'>{error.username}</Error> : <Empty className='col-xs-12 col-md-8'></Empty>}
        </div>
        <div>
        <Label className='col-xs-12 col-md-4'>비밀번호*</Label>
        <Input 
            className='col-xs-12 col-md-8'
            required
            type="password"
            placeholder='영문/숫자 조합 8자 이상'
            name="password"
            value={password}
            onChange={handleChange} />
            <div className='col-xs-12 col-md-4'></div>
            {error.password ? <Error className='col-xs-12 col-md-8'>{error.password}</Error> : <Empty className='col-xs-12 col-md-8'></Empty>}
        </div>
        <div>
        <Label className='col-xs-12 col-md-4'>비밀번호 확인*</Label>
        <Input 
            className='col-xs-12 col-md-8'
            required
            type="password"
            placeholder='비밀번호를 한번 더 입력해주세요.'
            name="rePassword"
            value={rePassword}
            onChange={handleChange} />
            <div className='col-xs-12 col-md-4'></div>
            {error.rePassword ? <Error className='col-xs-12 col-md-8'>{error.rePassword}</Error> : <Empty className='col-xs-12 col-md-8'></Empty>}
        </div>

        <div>
        <Label className='col-xs-12 col-md-4' style={{}}>학번</Label>
        <Input 
            className='col-xs-12 col-md-8'
            required
            placeholder='학번을 입력해주세요. 예: 2023311234'
            name="studentId"
            value={studentId}
            onChange={handleChange} />
            <div className='col-xs-12 col-md-4'></div>
            {error.studentId ? <Error className='col-xs-12 col-md-8'>{error.studentId}</Error> : <Empty className='col-xs-12 col-md-8'></Empty>}
        </div>
        <div>
        <div><Label className='col-xs-12 col-md-4'>학과</Label></div>
        <Input 
            className='col-xs-12 col-md-8'
            required
            placeholder='학과를 입력해주세요.'
            name="major"
            value={major}
            onChange={handleChange} />
            <div className='col-xs-12 col-md-4'></div>
            {error.major ? <Error className='col-xs-12 col-md-8'>{error.major}</Error> : <Empty className='col-xs-12 col-md-8'></Empty>}
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
  margin-bottom: 5px;

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

const Error = styled.div`
font-size: 11px;
font-weight: bold;
color: red;
font-family: var(--font-nanum-light);
padding: 0px 0 0 7px;
`

const Empty = styled.div`
height: 15.71px;
`