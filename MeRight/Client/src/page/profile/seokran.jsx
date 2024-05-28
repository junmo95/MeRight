import React from 'react';
import './profile.css';
import { Link } from 'react-router-dom'

// 이미지 임포트
import mongchi from '../../img/mongchi1.jpg';
import {FaPaperPlane} from 'react-icons/fa'; 

//아이콘 임포트
import notion from '../../img/notion.png';
import github from '../../img/github.png';


function Seokran() {
    return (
      <div className='profile-body body'>
        <div className='side-bar'>
        <section className="module-small">
          <div className="container">
            <div className="row">
              <div className="col-sm-4 col-md-3 sidebar">
                <div className="widget">
                <img src={mongchi} alt="seokran-Bae" className='profile-img1'/>
                  <form role="form">
                    <div className="search-box">
                      <input className="form-control" type="text" placeholder="  MESSAGE"/>
                      <button className="search-btn" type="submit"><i><FaPaperPlane/></i></button>
                    </div>
                  </form>
                </div>
                
                <div className="widget">
                  <h5 className="widget-title font-alt">Members</h5>
                  <ul className="icon-list">
                    <Link to='/eunhye'><li className='name'>Eunhye Kang</li></Link>
                    <Link to='/junmo'><li className='name'>Junmo Park</li></Link>
                    <Link to='/yejeong'><li className='name'>Yejeong Son</li></Link>
                    <Link to='/suhyun'><li className='name'>Suhyun Yoo</li></Link>
                    <Link to='/minji'><li className='name'>Minji Jin</li></Link>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        </div>

        <div className='intro'>
          <div className='intro-header'>

          <div className='icon-box'>
            <a href='https://www.notion.so/d9d9791f6cf047f1ba9f3c7a319407e8' target="_blank">
              <img className='icon' src={notion} alt='notion'/>
            </a>
            <a href='https://github.com/suhyun-yoo?tab=repositories' target="_blank">
              <img className='icon' src={github} alt='github'/>
            </a>
          </div>

              <header>
                <p className='names'> SEOKRAN BAE </p>
                <div className='intro-detail'>
                  <p>🎂1998.06.14</p>
                  <p>📩 gmail.com</p>
                </div>
              </header>

              <article className='main-intro'>
                <p className='bb'><b className='bb'>희망직무분야 :</b> 데이터 분석</p>
                <p className='bb'><b className='bb'>맡은 역할 :</b> React 웹페이지 구현</p><br></br>
              </article>
            </div>
          </div>
    </div>
  );
}

export default Seokran;