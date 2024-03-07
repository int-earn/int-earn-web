import React, { useEffect } from 'react'
import styled from 'styled-components'
import { removeCookie } from '../common/Cookie';
import { useRecoilState } from 'recoil';
import { userState } from '../atoms/user';
import { useNavigate } from 'react-router-dom';
import { AxiosC } from '../common/axiosC';
import { API_URL } from '../config';
import { msg403 } from '../common/function';

export default function MyPage() {
    const navigate = useNavigate();
    const [user, setUser] = useRecoilState(userState);

    const handleError = (error) => {
        if (error.response && error.response.status === 403) {
            console.log(error)
            //alert(msg403);
            navigate('/login');
        } else {
            console.log(error);
        }
    }

    const handleLogout = () => {
        alert('로그아웃 하시겠습니까?')
        removeCookie('accessToken');
        setUser(prev => ({
            ...prev,
            user: null,
            isAuthenticated: false,
        }))
        navigate('/')
    }

    useEffect(() => {
        const loadUser = async () => {
            try {
                const axiosInstance = await AxiosC();
                const result = await axiosInstance.get(`${API_URL}/api/user`)
                setUser(prev => ({
                    ...prev,
                    user: result.data.data,
                    isAuthenticated: true,
                }))
            } catch (error) {
                handleError(error);
            }
        }
        loadUser();
    }, [])
    
    return (
        <Container className='container'>
            <InnerContainer>
                mypage
                <Button onClick={handleLogout}>로그아웃</Button>
            </InnerContainer>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: center; 
    align-items: center; 
    width: 100vw;
    height: 100vh;
`

const InnerContainer = styled.div`
width: 75vw;
height: 80vh;
margin-top: 130px;
`

const Button = styled.button`
background-color: #fff;
outline: none;
border: none;
font-family: var(--font-nanum-light);
color: black;
font-weight: bold;
height: 30px;
align-self: end;
text-decoration: underline;
`