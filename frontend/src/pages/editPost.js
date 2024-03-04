import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { AxiosC } from '../common/axiosC';
import { API_URL } from '../config';
import { useNavigate, useParams } from 'react-router-dom';
import { msg403 } from '../common/function';
import { useRecoilValue } from 'recoil';
import { userState } from '../atoms/user';
import { CgProfile } from "react-icons/cg";

export default function EditPost() {
    const { id } = useParams();
    const navigate = useNavigate();
    const user = useRecoilValue(userState);
    const [data, setData] = useState(null);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const {name, value} = e.target;
        setError('');
        setData({
            ...data,
            [name]: value,
        })
    }

    const handleSubmit = async () => {
        try {
            if (data.title === '') {
                setError('*제목을 입력해주세요')
                return;
            } else if (data.content === '') {
                setError('*본문 내용을 입력해주세요')
                return;
            }
            const sendData = {
                title: data.title,
                content: data.content
            }
            const axiosInstance = await AxiosC();
            await axiosInstance.put(`${API_URL}/api/board/${id}`, sendData);
            alert('수정되었습니다.')
            navigate(`/viewPost/${id}`)
        } catch (error) {
            if (error.response.status === 403) {
                alert(msg403);
                navigate('/login');
            } else {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        const loadPost = async () => {
            try {
                const axiosInstance = await AxiosC();
                const result = await axiosInstance.get(`${API_URL}/api/board/${id}`);
                setData(result.data);
            } catch (error) {
                if (error.response.status === 403) {
                    alert(msg403);
                    navigate('/login');
                } else {
                    console.log(error);
                }
            }
        }
        loadPost();
    }, [])

    return (
        <Container className='container'>
            {data && 
            <InnerContainer>
                <Empty className='d-none d-md-block col-md-2'></Empty>
                <Box className='col-xs-12 col-md-8'>
                    <TopBox>
                        <h2 style={{marginBottom: '7px'}}>BOARD</h2>
                        <div style={{display: 'flex'}}>
                            <Button onClick={handleSubmit}>수정하기</Button>
                        </div>
                    </TopBox>
                    <TitleBox>
                        {/* <Input 
                            className='viewPost-title' 
                            value={data.title}
                            name="title"
                            type="text"
                            onChange={handleChange}
                        /> */}
                        {error === '' ? <div style={{height: '23.71px'}}></div> : <ErrorMsg>{error}</ErrorMsg>}
                        <Input 
                            required
                            placeholder='제목'
                            value={data.title}
                            onChange={handleChange}
                            name='title'
                            type='text'
                        />
                        <Textarea 
                            required
                            placeholder='본문 내용을 입력하세요'
                            value={data.content}
                            onChange={handleChange}
                            name='content'
                            type='text'
                        />
                    </TitleBox>
                </Box>
            </InnerContainer>}
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: center; 
    align-items: center; 
    width: 100vw;
    height: 100vh;
    padding: 0;
`

const InnerContainer = styled.div`
    width: 95vw;
    height: 80vh;
    margin-top: 130px;
`

const Box = styled.div`

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
    margin-right: 8px;

    &:focus {
        font-weight: bold;
    }
`

const Empty = styled.div`
`

const TitleBox = styled.div`
    padding: 0px 10px 15px 5px;
    font-family: var(--font-nanum-light);
    color: black;

    .viewPost-title {
        color: black;
        font-size: 18px;
        font-weight: bold;
    }
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
    height: 500px;
    font-family: var(--font-nanum-light);

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

const ContentBox = styled.div`
    padding: 15px;
    font-family: var(--font-nanum-light);
    font-weight: bold;
    color: black;
    border: 1px solid #BABABA;
    height: 300px;
`

const CommentBox = styled.div`
    font-family: var(--font-nanum-light);

    .comment-top {
        font-size: 16px;
        font-weight: bold;
        padding: 15px 7px 8px 7px;
        border-bottom: 1px solid black;
        color: black;
    }
`