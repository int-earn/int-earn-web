import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import { AxiosC } from '../common/axiosC';
import { API_URL } from '../config';
import { useRecoilState } from 'recoil';
import { archiveState } from '../atoms/archive';
import { msg403 } from '../common/function';
import { AiFillPlusCircle } from "react-icons/ai";
import CustomModal from '../components/CustomModal';

export default function Archive() {
    const [archive, setArchive] = useRecoilState(archiveState);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedArchive, setSelectedArchive] = useState(null);
    const navigate = useNavigate();

    const handleBtnClick = () => {
        navigate('/addArchive');
    }

    const handleBoxClick = (idx) => {
        const temp = [...archive].reverse()
        setSelectedArchive(temp[idx])
        setModalOpen(true);
    }

    useEffect(() => {
        const loadArchives = async() => {
            try {
                const axiosInstance = await AxiosC();
                const result = await axiosInstance.get(`${API_URL}/api/archive`);
                setArchive(result.data);
            } catch (error) {
                if (error.response.status === 403) {
                    alert(msg403);
                    navigate('/login');
                } else {
                    console.log(error);
                }
            }
        }
        loadArchives();
    }, [])

    return (
        <Container className='container'>
            <InnerContainer>
                <Empty className='col-xs-12 col-md-1'></Empty>
                <TopBox className='col-xs-12 col-md-10'>
                    <h2 style={{marginBottom: '7px'}}>ARCHIVE</h2>
                    <AiFillPlusCircle onClick={handleBtnClick} style={{width: '45px', height: '45px', cursor: 'pointer'}} />
                </TopBox>
                <Empty className='d-none d-md-block col-md-1' style={{height: '30px', marginBottom: '20px'}}></Empty>
                <Empty className='col-xs-12 col-md-1'></Empty>
                <div className='col-xs-12 col-md-10' style={{padding: 0, marginTop: '20px'}}>
                    <div className="row">
                        {archive.length > 0 &&
                        [...archive].reverse().map((item, i) => (
                            <div key={item.id} className="col-xs-12 col-sm-6 col-md-4 mb-3" style={{paddingTop: '10px', marginBottom: '10px'}}>
                                <img src={`data:image/jpeg;base64,${item.img}`} alt={item.title} style={{width: '100%', height: '300px', objectFit: 'cover'}} />
                                <ContentBox onClick={() => handleBoxClick(i)}>
                                    <div className='box-title'>{item.title}</div>
                                    <div className='box-date' style={{marginRight: '7px', paddingRight: '7px'}}>
                                        {item.createdDate[0]}.
                                        {item.createdDate[1] < 10 ? '0'+item.createdDate[1] : item.createdDate[1]}.
                                        {item.createdDate[2] < 10 ? '0'+item.createdDate[2] : item.createdDate[2]}
                                    </div>
                                </ContentBox>
                            </div>
                        ))}
                    </div>
                </div>

                <CustomModal 
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    archive={selectedArchive}
                />
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

const ContentBox = styled.div`
width: 100%;
color: black;
font-family: var(--font-nanum-light);
padding: 10px;
border: 1px solid #777777;
cursor: pointer;

.box-title {
    font-size: 16px;
    font-weight: bolder;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.box-date {
    font-size: 12px;
    color: #777777;
    margin-top: 5px;
}
`