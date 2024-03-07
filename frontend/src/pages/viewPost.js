import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { AxiosC } from '../common/axiosC';
import { API_URL } from '../config';
import { useNavigate, useParams } from 'react-router-dom';
import { msg403 } from '../common/function';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { userState } from '../atoms/user';
import { CgProfile } from "react-icons/cg";
import { IoPersonCircleOutline } from "react-icons/io5";

export default function ViewPost() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [comment, setComment] = useState(null);
    const [commentData, setCommentData] = useState({
        content: '',
        boardId: id,
    });

    const user = useRecoilValue(userState).user;
    const setUser = useSetRecoilState(userState);

    const handleEdit = () => {
        navigate(`/editPost/${id}`);
    }
    const handleDelete = async () => {
        alert('게시글을 삭제하시겠습니까?');
        try {
            const axiosInstance = await AxiosC();
            const result = await axiosInstance.delete(`${API_URL}/api/board/${id}`);
            navigate('/board');
        } catch (error) {
            handleError(error);
        }
    }

    const handleInputChange = (e) => {
        setCommentData({
            ...commentData,
            content: e.target.value,
        })
    }

    const handleError = (error) => {
        if (error.response.status === 403) {
            //alert(msg403);
            navigate('/login');
        } else {
            console.log(error);
        }
    }

    const handleCommentDelete = async (id) => {
        alert('댓글을 삭제하시겠습니까?');
        try {
            const newComment = comment.filter(c => c.id !== id);
            setComment(newComment);
            setCommentData(prev => ({
                ...prev,
                content: ''
            }))
            const axiosInstance = await AxiosC();
            await axiosInstance.delete(`${API_URL}/api/comment/${id}`);
        } catch (error) {
            handleError(error);
        }
    }

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        if (commentData.comment !== '') {
            try {
                const axiosInstance = await AxiosC();
                await axiosInstance.post(`${API_URL}/api/comment`, commentData);
                loadComment();
                setCommentData({
                    ...commentData,
                    content: ''
                })
            } catch (error) {
                handleError(error);
            }
        }
    }

    const loadComment = async () => {
        try {
            const axiosInstance = await AxiosC();
            const result = await axiosInstance.get(`${API_URL}/api/comment/${id}`);
            setComment(result.data);
            console.log(result.data);
        } catch (error) {
            handleError(error);
        }
    }

    useEffect(() => {
        const loadPost = async () => {
            try {
                const axiosInstance = await AxiosC();
                const result = await axiosInstance.get(`${API_URL}/api/board/${id}`);
                setPost(result.data);
            } catch (error) {
                handleError(error);
            }
        }
        loadPost();
    }, [])

    useEffect(() => {
        const loadUser = async () => {
            try {
                if (user == null) {
                    const axiosInstance = await AxiosC();
                    const result = await axiosInstance.get(`${API_URL}/api/user`);
                    setUser(prev => ({
                        ...prev,
                        user: result.data.data,
                        isAuthenticated: true,
                    }))
                }
            } catch (error) {
                handleError(error);
            }
        }
        loadUser();
    }, [])

    useEffect(() => {
        
        loadComment();
    }, [])


    return (
        <Container className='container'>
            {post && user && 
            <InnerContainer>
                <Empty className='d-none d-md-block col-md-2'></Empty>
                <Box className='col-xs-12 col-md-8'>
                    <TopBox>
                        <h2 style={{marginBottom: '7px', cursor: 'pointer'}} onClick={() => navigate('/board')}>BOARD</h2>
                        {post.userId === user.id &&
                        <div style={{display: 'flex'}}>
                            <Button onClick={handleEdit}>수정</Button>
                            <Button onClick={handleDelete}>삭제</Button>
                        </div>}
                    </TopBox>
                    <TitleBox>
                        <div className='viewPost-title'>{post.title}</div>
                        <DateUser>
                            <div>
                                <Flex>
                                    <span style={{marginRight: '7px', paddingRight: '7px', marginBottom: '5px'}}>{post.nickname}</span>
                                    <div></div>
                                </Flex>
                                <Flex>
                                    <div></div>
                                    <div>
                                        <span style={{marginRight: '7px', paddingRight: '7px'}}>
                                            {post.createdDate[0]}.
                                            {post.createdDate[1] < 10 ? '0'+post.createdDate[1] : post.createdDate[1]}.
                                            {post.createdDate[2] < 10 ? '0'+post.createdDate[2] : post.createdDate[2]}
                                            <span style={{marginLeft: '5px'}}>{post.createdDate[3]}:{post.createdDate[4]}</span>
                                        </span>
                                        {post.modifiedDate && 
                                        <span style={{marginRight: '7px', borderLeft: '1px solid', paddingLeft: '7px'}}>
                                            {post.modifiedDate[0]}.
                                            {post.modifiedDate[1] < 10 ? '0'+post.modifiedDate[1] : post.modifiedDate[1]}.
                                            {post.modifiedDate[2] < 10 ? '0'+post.modifiedDate[2] : post.modifiedDate[2]}
                                            <span style={{marginLeft: '5px'}}>{post.modifiedDate[3]}:{post.modifiedDate[4]}</span>
                                            <span style={{marginLeft: '7px'}}>수정됨</span>
                                        </span>}
                                    </div>
                                </Flex>
                            </div>
                        </DateUser>
                    </TitleBox>
                    <ContentBox>
                        {post.content}
                    </ContentBox>
                    {comment && 
                    <CommentBox>
                        <div className='comment-top'>댓글 ({comment.length})</div>
                        {[...comment].reverse().map(c => (
                            <CommentEach key={c.id}>
                                <IoPersonCircleOutline style={{width: '38px', height: '38px', color: '#303030', }} />
                                <div style={{color: 'black', }}>
                                    {/* 닉네임, 삭제 버튼 */}
                                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                        <div>
                                            <span style={{fontSize: '16px', fontWeight: 'bold'}}>{c.nickname}</span>
                                            {/* 날짜 */}
                                            <span style={{marginLeft: '10px', color: '#777777', fontSize: '13px'}}>
                                                {/* {post.createdDate[0]}. */}
                                                {c.createdDate[1] < 10 ? '0'+c.createdDate[1] : c.createdDate[1]}.
                                                {c.createdDate[2] < 10 ? '0'+c.createdDate[2] : c.createdDate[2]}
                                                <span style={{marginLeft: '5px'}}>{c.createdDate[3] < 10 ? '0'+c.createdDate[3] : c.createdDate[3]}:{c.createdDate[4] < 10 ? '0'+c.createdDate[4] : c.createdDate[4]}</span>
                                            </span>
                                        </div>
                                        {c.userId === user.id ? <button className='del-button' onClick={() => handleCommentDelete(c.id)}>삭제</button> : <div></div>}
                                    </div>
                                    {/* 댓글 내용 */}
                                    <div style={{}}>{c.content}</div>
                                </div>
                                
                            </CommentEach>
                        ))
                        }
                    </CommentBox>}
                </Box>
                {/* <Empty className='d-none d-md-block col-md-2' style={{height: '30px', marginBottom: '20px'}}></Empty> */}
            </InnerContainer>}

            {/* 댓글 입력란 고정 */}
            <InputBox>
                <Empty className='d-none d-md-block col-md-2'></Empty>
                <CommentInner className='col-xs-12 col-md-8' onSubmit={handleCommentSubmit}>
                    <input 
                        className='comment-input'
                        value={commentData.content}
                        onChange={(e) => handleInputChange(e)}
                    />
                    <button onClick={handleCommentSubmit}>전송</button>
                </CommentInner>
            </InputBox>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: center; 
    align-items: center; 
    width: 100vw;
    //height: 100vh;
    padding: 0;
`

const InnerContainer = styled.div`
    width: 95vw;
    //height: 80vh;
    margin-top: 130px;
    margin-bottom: 85px;
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
    padding: 25px 0px 5px 5px;
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
    //display: flex;
    //justify-content: space-between;
    margin-top: 3px;
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

const CommentEach = styled.div`
display: grid;
grid-template-columns: 45px auto;
padding: 10px;

.del-button {
background-color: #fff;
outline: none;
border: none;
font-family: var(--font-nanum-light);
color: #777777;
font-weight: bold;
height: 30px;
align-self: end;
text-decoration: underline;
}
`

const Flex = styled.div`
display: flex;
justify-content: space-between;
width: 100%;
color: black;
font-size: 13px;
`

const InputBox = styled.div`
position: fixed;
bottom: 0;
padding-bottom: 20px;
width: 100%;
font-family: var(--font-nanum-light);
background-color: white;
`

const CommentInner = styled.form`
display: grid;
grid-template-columns: auto 50px; 
padding: 0 20px;


input {
    border: 1px solid #3C3C3C;
    border-radius: 10px;
    height: 40px;
    background-color: white;
    padding: 8px;
    color: black;
        &:focus {
            outline: none;
        }

        &::placeholder {
            font-family: var(--font-nanum-light);
        }
}
button {
    background-color: #303030;
    margin-left: 5px;
    border: none;
    outline: none;
    border-radius: 8px;
    color: white;
    font-weight: bold;
    padding: 4px 7px;
}
`
