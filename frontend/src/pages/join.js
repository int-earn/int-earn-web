import React, { useState } from 'react'
import axios from 'axios'
import { TextField, Typography, Grid }from '@mui/material'

const initialState = {
    nickname: "",
    username: "",
    password: "",
    rePassword: "",
}

export default function Join() {
    const [{ nickname, username, password, rePassword }, setState] = useState(initialState);
    const handleChange = (e) => {
        const {name, value} = e.target;
        console.log(name, value)
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
        const response = await axios.post('http://localhost:8080/api/user/save', data)
        console.log(response);
    }
    return (
        <div style={{marginTop: '100px'}}>
        <div id="contact" style={{margin: '0 auto', width: '100%', height: '90%', position: 'relative'}}>
            <div style={{width: '500px', height: '450px', position: 'absolute', top:'50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
            <div className='section-title'>
                <h2>Sign up</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <Typography>닉네임</Typography>
                {/* <div><label style={{display: 'block'}}>닉네임</label></div>
                <input 
                    type="text"
                    name="nickname" 
                    value={nickname} 
                    className="form-control"
                    onChange={handleChange} 
                    style={{color: 'black', width: '300px', height: '50px', borderRadius: '10px', marginBottom: '12px'}}
                />
                <input 
                    type="text"
                    name="username" 
                    value={username} 
                    className="form-control"
                    onChange={handleChange} 
                    style={{color: 'black', width: '300px', height: '50px', borderRadius: '10px', marginBottom: '12px'}}
                />
                <input 
                    type="password"
                    name="password" 
                    value={password} 
                    className="form-control"
                    onChange={handleChange} 
                    style={{color: 'black', width: '300px', height: '50px', borderRadius: '10px', marginBottom: '12px'}}
                />
                <input 
                    type="password"
                    name="rePassword" 
                    value={rePassword} 
                    className="form-control"
                    onChange={handleChange} 
                    style={{color: 'black', width: '300px', height: '50px', borderRadius: '10px', marginBottom: '12px'}}
                />
                <button type="submit">submit</button> */}
            </form>
            </div>
        </div>
        </div>
    )
}
