import React, { useState } from 'react'
import axios from 'axios'
import { TextField, Typography, Grid, OutlinedInput, Button }from '@mui/material'
import { useNavigate } from 'react-router-dom';

const initialState = {
    nickname: "",
    username: "",
    password: "",
    rePassword: "",
}

export default function Join() {
    const IP = process.env.REACT_APP_IP
    const navigate = useNavigate();
    const [{ nickname, username, password, rePassword }, setState] = useState(initialState);
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
            rePassword: rePassword
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
        <div style={{marginTop: '60px'}}>
        <div id="contact" style={{margin: '0 auto', width: '100%', height: '100%', position: 'relative', paddingTop: '0'}}>
            <div style={{width: '500px', height: '450px', position: 'absolute', top:'43%', left: '50%', transform: 'translate(-50%, -50%)'}}>
            <div className='section-title'>
                <h2>Sign up</h2>
            </div>
            <form onSubmit={handleSubmit} style={{display: 'column', justifyContent: 'center'}}>
                <Typography style={{margin: '0 0 5px 5px', fontWeight: 'bold'}}>닉네임</Typography>
                <OutlinedInput 
                    //color="none"
                    placeholder="닉네임"
                    name="nickname"
                    value={nickname}
                    onChange={handleChange}
                    sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none'
                        },
                        '& input': {
                            fontSize: '13px',
                        },
                        width: '300px',
                        height: '50px',
                        //border: validUsername == false ? '1px solid #FF3B3B' : '1px solid #E2E2E2',
                        border: '1px solid #E2E2E2',
                        borderRadius: '8px',
                        backgroundColor: 'white',
                        outline: 'none',
                        appearance: 'none',
                        fontSize: '16px',
                    }}
                />

            <Typography style={{margin: '15px 0 5px 5px', fontWeight: 'bold'}}>아이디</Typography>
                <OutlinedInput 
                    //color="none"
                    placeholder="아이디"
                    name="username"
                    value={username}
                    onChange={handleChange}
                    sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none'
                        },
                        '& input': {
                            fontSize: '13px',
                        },
                        width: '300px',
                        height: '50px',
                        //border: validUsername == false ? '1px solid #FF3B3B' : '1px solid #E2E2E2',
                        border: '1px solid #E2E2E2',
                        borderRadius: '8px',
                        backgroundColor: 'white',
                        outline: 'none',
                        appearance: 'none',
                        fontSize: '16px',
                    }}
                />

            <Typography style={{margin: '15px 0 5px 5px', fontWeight: 'bold'}}>비밀번호</Typography>
                <OutlinedInput 
                    //color="none"
                    placeholder="비밀번호"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none'
                        },
                        '& input': {
                            fontSize: '13px',
                        },
                        width: '300px',
                        height: '50px',
                        //border: validUsername == false ? '1px solid #FF3B3B' : '1px solid #E2E2E2',
                        border: '1px solid #E2E2E2',
                        borderRadius: '8px',
                        backgroundColor: 'white',
                        outline: 'none',
                        appearance: 'none',
                        fontSize: '16px',
                    }}
                />

            <Typography style={{margin: '15px 0 5px 5px', fontWeight: 'bold'}}>비밀번호 확인</Typography>
                <OutlinedInput 
                    //color="none"
                    placeholder="비밀번호 재입력"
                    name="rePassword"
                    value={rePassword}
                    onChange={handleChange}
                    sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none'
                        },
                        '& input': {
                            fontSize: '13px',
                        },
                        width: '300px',
                        height: '50px',
                        //border: validUsername == false ? '1px solid #FF3B3B' : '1px solid #E2E2E2',
                        border: '1px solid #E2E2E2',
                        borderRadius: '8px',
                        backgroundColor: 'white',
                        outline: 'none',
                        appearance: 'none',
                        fontSize: '16px',
                    }}
                />

            <Button 
                onClick={handleSubmit}
                className="btn btn-custom btn-lg" 
                style={{margin: '45px 0', width: '300px', fontSize: '14px', border: '1px solid white', borderRadius: '8px', height: '56px', boxShadow: 'none'}}>
                회원가입
            </Button>
            </form>
            </div>
        </div>
        </div>
    )
}
