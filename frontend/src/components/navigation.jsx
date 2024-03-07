import React, { useEffect, useState } from "react";
import { getCookie, removeCookie } from '../common/Cookie';

export const Navigation = (props) => {
  const [hasCookie, setHasCookie] = useState(false);
  const [curPath, setCurPath] = useState('/');

  const handleLogout = () => {
    removeCookie('accessToken');
    /*setUserAtom(prev => ({
      ...prev,
      user: null,
      isAuthenticated: false,
    }))*/
  }

  /*useEffect(() => {
    const func = async () => {
      // 현재 화면이 로그인 화면이면 token=false로 표시.
      setCurPath(window.location.pathname);

      //removeCookie('accessToken');
      const token = await getCookie('accessToken');
      if (token === undefined) {
        setHasCookie(false);
      } else {
        setHasCookie(true);
      }
    }
    func();
  }, [])*/

  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a className="navbar-brand page-scroll" href="/" style={{fontFamily: 'var(--font-nanum-light)', fontSize: '16px'}}>
            int earn;들이 남기는 마지막 잎새
          </a>{" "}
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            {/* <li>
              <a href="/#about2" className="page-scroll">
                test
              </a>
            </li> */}
            {/* <Link to='/'>Features</Link> */}
            <li>
              <a href="/#about" className="page-scroll">
                웹페이지 소개
              </a>
            </li>
            <li>
              <a href="/board" className="page-scroll">
                자유게시판
              </a>
            </li>
            <li>
              <a href="/#portfolio" className="page-scroll">
                아카이브
              </a>
            </li>
            {/* <li>
              <a href="/#testimonials" className="page-scroll">
                Testimonials
              </a>
            </li>
            <li>
              <a href="/#team" className="page-scroll">
                Team
              </a>
            </li> */}
            <li>
              {/* {hasCookie ?  */}
                <a href="/myPage" className='page-scroll'>
                  마이페이지
                </a>
                {/* : 
                <a href="/login" className="page-scroll">
                  로그인
                </a>
              } */}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
