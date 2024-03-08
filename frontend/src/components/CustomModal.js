import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import styled from 'styled-components';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { userState } from '../atoms/user';
import { AxiosC } from '../common/axiosC';
import { API_URL } from '../config';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');

export default function CustomModal({modalOpen, setModalOpen, archive}) {
    const [contentHeight, setContentHeight] = useState(100);
    const user = useRecoilValue(userState).user;
    const setUser = useSetRecoilState(userState);
    const navigate = useNavigate();

    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)' // 뒷 배경 투명도 조절
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            height: contentHeight,
            maxHeight: '600px'
            //marginTop: '30px'
        },
    };

    const openModal = () => {
        setModalOpen(true);
    }

    const afterOpenModal = () => {
        const contentDiv = document.getElementById('modal-content')
        setContentHeight(contentDiv.clientHeight+100);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    const handleEdit = () => {
        navigate(`/editArchive/${archive.id}`);
    }
    const handleDelete = async () => {
        alert('게시글을 삭제하시겠습니까?');
        try {
            const axiosInstance = await AxiosC();
            const result = await axiosInstance.delete(`${API_URL}/api/archive/${archive.id}`);
            //navigate('/archive');
            window.location.replace('/archive')
        } catch (error) {
            handleError(error);
        }
    }

    const handleError = (error) => {
        if (error.response.status === 403) {
            //alert(msg403);
            navigate('/login');
        } else {
            console.log(error);
        }
    }

    useEffect(() => {
        if (archive === null)
            setModalOpen(false);
    }, [archive])

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

    return (
        <div>
            {archive && user && 
            <Modal
                isOpen={modalOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div style={{marginBottom: '20px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div></div>
                    <Button onClick={closeModal}>close</Button>
                </div>
                <div className='col-xs-12 col-md-6' style={{padding: 0}}>
                    <img 
                        className='col-xs-12 col-md-6'
                        id="modal-content"
                        src={`data:image/jpeg;base64,${archive.img}`} 
                        alt={archive.title} 
                        style={{ width: '100%', height: 'auto', marginBottom: '10px', padding: 0 }} 
                    />
                </div>
                <ContentBox className='col-xs-12 col-md-6' style={{}}>
                    {/* 제목 */}
                    <div className='archive-title'>{archive.title}</div>
                    {/* 학과, 학번, 닉네임 */}
                    <div style={{fontWeight: 'bold', marginBottom: '3px'}}>
                        {archive.major && <span style={{marginRight: '4px'}}>{archive.major}</span>}
                        {archive.studentId && <span style={{marginRight: '7px'}}>{archive.studentId.slice(2, 4)}</span>}
                        {archive.nickname && <span>{archive.nickname}</span>}
                    </div>
                    {/* 날짜 */}
                    <div style={{borderBottom: '2px solid black', fontSize: '11px', paddingBottom: '10px'}}>
                        <span style={{marginRight: '7px', paddingRight: '7px'}}>
                            {archive.createdDate[0]}.
                            {archive.createdDate[1] < 10 ? '0'+archive.createdDate[1] : archive.createdDate[1]}.
                            {archive.createdDate[2] < 10 ? '0'+archive.createdDate[2] : archive.createdDate[2]}
                            <span style={{marginLeft: '5px'}}>{archive.createdDate[3]}:{archive.createdDate[4]}</span>
                        </span>
                        {archive.modifiedDate && 
                        <span style={{marginRight: '7px', borderLeft: '1px solid', paddingLeft: '7px'}}>
                            {archive.modifiedDate[0]}.
                            {archive.modifiedDate[1] < 10 ? '0'+archive.modifiedDate[1] : archive.modifiedDate[1]}.
                            {archive.modifiedDate[2] < 10 ? '0'+archive.modifiedDate[2] : archive.modifiedDate[2]}
                            <span style={{marginLeft: '5px'}}>{archive.modifiedDate[3]}:{archive.modifiedDate[4]}</span>
                            <span style={{marginLeft: '7px'}}>수정됨</span>
                        </span>}
                    </div>
                    {/* 내용 */}
                    <div style={{padding: '20px 0', color: 'black'}}>{archive.content}</div>
                    {/* 수정, 삭제 */}
                    {archive.userId === user.id &&
                    <div style={{display: 'flex', justifyContent: 'space-between', paddingTop: '30px'}}>
                        <div></div>
                        <div style={{display: 'flex'}}>
                            <Button onClick={handleEdit}>수정</Button>
                            <Button onClick={handleDelete}>삭제</Button>
                        </div>
                    </div>
                    }
                </ContentBox>
                </div>
            </Modal>}
        </div>
    )
}

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
margin-bottom: 10px;
`

const ContentBox = styled.div`
font-family: var(--font-nanum-light);
color: black;
.archive-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
}
`