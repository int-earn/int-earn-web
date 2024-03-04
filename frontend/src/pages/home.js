import React, { useState, useEffect } from 'react'
import { Header } from "../components/header";
import { Features } from "../components/features";
import { About } from "../components/about";
import { Services } from "../components/services";
import { Gallery } from "../components/gallery";
import { Testimonials } from "../components/testimonials";
import { Team } from "../components/Team";
import { Contact } from "../components/contact";
import JsonData from "../data/data.json";
import SmoothScroll from "smooth-scroll";
import { TestHeader } from '../components/testHeader';
import { Footer } from '../components/footer';
import styled from 'styled-components';
import { API_URL } from '../config';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from '../atoms/user';
import { useNavigate } from 'react-router-dom';
import { msg403 } from '../common/function';
import { AxiosC } from '../common/axiosC';

export const scroll = new SmoothScroll('a[href*="#"]', {
    speed: 1000,
    speedAsDuration: true,
  });

export default function Home() {
    const navigate = useNavigate();
    const [landingPageData, setLandingPageData] = useState({});
    const [boardTitle, setBoardTitle] = useState([]);
    //const isAuthenticated = useRecoilValue(userState).isAuthenticated;
    const [user, setUser] = useRecoilState(userState);

    const handleError = (error) => {
      if (error.response && error.response.status === 403) {
          alert(msg403);
          navigate('/login');
      } else {
          console.log(error);
      }
    }

    const handleBoardBtnClick = () => {
      if (!user.isAuthenticated) {
        alert('로그인 먼저 진행해주세요');
        navigate('/login')
      } else {
        navigate('/board')
      }
    }
    const handlePostClick = (id) => {
      if (!user.isAuthenticated) {
        alert('로그인 먼저 진행해주세요');
        navigate('/login')
      } else {
        navigate(`/viewPost/${id}`)
      }
    }

    useEffect(() => {
      const loadBoardTitle = async () => {
        try {
          const result = await axios.get(`${API_URL}/api/board/title`)
          setBoardTitle(result.data);
        } catch (error) {
          handleError(error);
        }
      }
      loadBoardTitle();
      setLandingPageData(JsonData);
    }, []);

    useEffect(() => {
      const loadUser = async () => {
        try {
          const axiosInstance = await AxiosC();
          const result = await axiosInstance.get(`${API_URL}/api/user`)
          setUser(prev => ({
            ...prev,
            user: result.data.data,
            isAuthenticated: true,
          }));
        } catch (error) {
          handleError(error);
        }
      }
      loadUser();
    }, [])
    return (
        <div>
        {/* <TestHeader />
        <About data={landingPageData.About} />
        <Services data={landingPageData.Services} />
        <Gallery data={landingPageData.Gallery} /> */}
        <Banner>
        <Empty className='d-none d-md-block col-md-1' style={{height: '30px', marginBottom: '20px'}}></Empty>
          {/* <H2>SKKU</H2><H2>GLOBAL</H2><H2>CHALLENGE</H2> */}
        </Banner>
        <Main>
          <div className='main-margin'></div>
          <Empty className='d-none d-md-block col-md-1' style={{height: '30px', marginBottom: '20px'}}></Empty>
          <div className='col-xs-12 col-md-5'>
            <TopBox style={{display: 'flex', justifyContent: 'space-between', }}>
              <h2 className='main-h2'>BOARD</h2>
              <Button onClick={handleBoardBtnClick}>View All</Button>
            </TopBox>
            <BoardBox>
              {boardTitle.length > 0 &&
              (boardTitle.length >= 10 ?
              [...boardTitle].reverse().slice(0, 10).map(b => (
                <div className='board-each' key={b.id} onClick={() => handlePostClick(b.id)}>
                  <div className='board-title'>{b.title}</div>
                  <div>
                    {b.createdDate[1] < 10 ? '0'+b.createdDate[1] : b.createdDate[1]}.
                    {b.createdDate[2] < 10 ? '0'+b.createdDate[2] : b.createdDate[2]}
                  </div>
                </div>
              ))
              :
              [...boardTitle].reverse().map(b => (
                <div className='board-each' key={b.id} onClick={() => handlePostClick(b.id)}>
                  <div className='board-title'>{b.title}</div>
                  <div>
                    {b.createdDate[1] < 10 ? '0'+b.createdDate[1] : b.createdDate[1]}.
                    {b.createdDate[2] < 10 ? '0'+b.createdDate[2] : b.createdDate[2]}
                  </div>
                </div>
              ))
              )
              }
            </BoardBox>
          </div>

          <div className='col-xs-12 col-md-5 main-each-box'>
            <h2 className='main-h2'>Archive</h2>
          </div>
          <Empty className='d-none d-md-block col-md-1' style={{height: '30px', marginBottom: '20px'}}></Empty>
        </Main>
        {/* <Footer /> */}
        </div>
    )
}

const Banner = styled.div`
display: flex;
background-color: #303030;
height: 250px;
padding-top: 130px;
`

const TopBox = styled.div`
display: flex;
justify-content: space-between;
border-bottom: 2px solid black;
padding-bottom: 7px;
margin-bottom: 7px;
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

const Main = styled.div`
background-color: white;

.main-margin {
  height: 40px;
}
.main-h2 {
  //marginRight: 15px;
  margin-bottom: 0;
}
.main-each-box{
  //margin: 0 10px;
}
`

const Empty = styled.div`
`

const BoardBox = styled.div`
padding: 10px;
font-family: var(--font-nanum-light);

.board-each {
  display: flex;
  justify-content: space-between;
  color: black;
  align-items: center;
  padding-bottom: 12px;
  cursor: pointer;
}

.board-title {
  font-size: 16px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
`