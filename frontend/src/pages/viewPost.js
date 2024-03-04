import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { AxiosC } from '../common/axiosC';
import { API_URL } from '../config';
import { useNavigate, useParams } from 'react-router-dom';
import { msg403 } from '../common/function';
import { useRecoilValue } from 'recoil';
import { userState } from '../atoms/user';
import { CgProfile } from "react-icons/cg";

export default function ViewPost() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const user = useRecoilValue(userState);

    const handleEdit = () => {
        console.log(user)
    }
    const handleDelete = () => {

    }

    useEffect(() => {
        const loadPost = async () => {
            try {
                const axiosInstance = await AxiosC();
                const result = await axiosInstance.get(`${API_URL}/api/board/${id}`);
                setPost(result.data);
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
            {post && 
            <InnerContainer>
                <Empty className='d-none d-md-block col-md-2'></Empty>
                <Box className='col-xs-12 col-md-8'>
                    <TopBox>
                        <h2 style={{marginBottom: '7px'}}>BOARD</h2>
                        <div style={{display: 'flex'}}>
                            <Button onClick={handleEdit}>수정</Button>
                            <Button onClick={handleDelete}>삭제</Button>
                        </div>
                    </TopBox>
                    <TitleBox>
                        <div className='viewPost-title'>{post.title}</div>
                        <DateUser>
                            <div><span style={{marginRight: '7px', paddingRight: '7px', borderRight: '1px solid'}}>
                                {post.createdDate[0]}.
                                {post.createdDate[1] < 10 ? '0'+post.createdDate[1] : post.createdDate[1]}.
                                {post.createdDate[2] < 10 ? '0'+post.createdDate[2] : post.createdDate[2]}
                                <span style={{marginLeft: '5px'}}>{post.createdDate[3]}:{post.createdDate[4]}</span>
                                </span>{post.nickname}
                            </div>
                        </DateUser>
                    </TitleBox>
                    <ContentBox>
                        {post.content}
                    </ContentBox>
                    <CommentBox>
                        <div className='comment-top'>댓글 (3)</div>
                        
                    </CommentBox>
                </Box>
                <Empty className='d-none d-md-block col-md-2' style={{height: '30px', marginBottom: '20px'}}></Empty>
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
    padding: 25px 10px 15px 5px;
    font-family: var(--font-nanum-light);
    

    .viewPost-title {
        color: black;
        font-size: 18px;
        font-weight: bold;
    }
`

const DateUser = styled.div`
    font-size: 12px;
    color: black;
    display: flex;
    //justify-content: space-between;
    margin-top: 7px;
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