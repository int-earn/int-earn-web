import React, { useState } from 'react'
import styled from 'styled-components'
import { AxiosC } from '../common/axiosC';
import { API_URL } from '../config';
import { useNavigate } from 'react-router-dom';

export default function AddPost() {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [boardInput, setBoardInput] = useState({
        title: '',
        content: '',
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setError('');
        setBoardInput({
            ...boardInput,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        try {
            if (boardInput.title === '') {
                setError('*제목을 입력해주세요')
                return;
            } else if (boardInput.content === '') {
                setError('*본문 내용을 입력해주세요')
                return;
            }

            const axiosInstance = await AxiosC();
            await axiosInstance.post(`${API_URL}/api/board`, boardInput);
            navigate('/board');
            
        } catch (error) {
            if (error.response.status === 403) {
                alert('로그인 기간 만료.')
                navigate('/login');
            } else {
                console.log(error);
            }
        }
    }

    return (
    <Container className='container'>
        <InnerContainer>
            <Empty className='col-xs-12 col-md-2'></Empty>
            <TopBox className='col-xs-12 col-md-8'>
                <h2 style={{marginBottom: '7px'}}>BOARD</h2>
                <Button onClick={handleSubmit}>등록하기</Button>
            </TopBox>
            <Empty className='d-none d-md-block col-md-2' style={{height: '30px', marginBottom: '20px'}}></Empty>
            <Empty className='col-xs-12 col-md-2'></Empty>
            <BoardBox className='col-xs-12 col-md-8'>
                {error === '' ? <div style={{height: '23.71px'}}></div> : <ErrorMsg>{error}</ErrorMsg>}
                <Input 
                    required
                    placeholder='제목'
                    onChange={handleChange}
                    name='title'
                    type='text'
                />
                <Textarea 
                    required
                    placeholder='본문 내용을 입력하세요'
                    onChange={handleChange}
                    name='content'
                    type='text'
                />
            </BoardBox>
            <Empty className='col-xs-12 col-md-2'></Empty>
            
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
    width: 85vw;
    height: 80vh;
    margin-top: 130px;
`

const TopBox = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid black; 
    padding: 0;
`

const Button = styled.button`
    background-color: #fff;
    outline: none;
    border: none;
    font-family: var(--font-nanum-light);
    color: black;
    font-weight: bold;

    &:focus {
        font-weight: bold;
    }
`

const Empty = styled.div`
`

const BoardBox = styled.div`
    padding: 0;
    margin-bottom: 40px;
    font-family: var(--font-nanum-light);
`

const Input = styled.input`
    border: none;
    border-bottom: 1px solid #BABABA;
    padding: 8px;
    color: black;
    outline: none;
    //margin-top: 14px;
    width: 100%;

    &:focus {
        outline: none;
    }
    
    &::placeholder {
        font-family: var(--font-nanum-light);
    }
`

const Textarea = styled.textarea`
    border: 1px solid #BABABA;
    padding: 12px 8px;
    color: black;
    outline: none;
    margin-top: 10px;
    width: 100%;
    height: 600px;

    &:focus {
        outline: none;
    }

    &::placeholder {
        font-family: var(--font-nanum-light);
    }
`

const ErrorMsg = styled.div`
    color: red;
    font-size: 11px;
    font-weight: bold;
    padding-top: 8px;
`