import React from 'react';
import './profile.css';
import { Link } from 'react-router-dom'
import dlib1 from '../../img/dlib1.png';
import dlib2 from '../../img/dlib2.png';

// 이미지 임포트
import junmo from '../../img/junmo.jpg';
import {FaPaperPlane} from 'react-icons/fa'; 

//아이콘 임포트
import notion from '../../img/notion.png';
import github from '../../img/github.png';


function Junmo() {
    return (
      <div className='profile-body body'>
        <div className='side-bar'>
        <section className="module-small">
          <div className="container">
            <div className="row">
              <div className="col-sm-4 col-md-3 sidebar">
                <div className="widget">
                <img src={junmo} alt="junmo-Park" className='profile-img1'/>
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
                    <Link to='/seokran'><li className='name'>Seokran Bae</li></Link>
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
            <a href='https://rhinestone-gasosaurus-995.notion.site/1369e8f19dc64110b46ec0a8b0786408' target="_blank">
              <img className='icon' src={notion} alt='notion'/>
            </a>
            <a href='https://github.com/junmo95?tab=repositories' target="_blank">
              <img className='icon' src={github} alt='github'/>
            </a>
          </div>

              <header>
                <p className='names'> JUNMO PARK </p>
                <div className='intro-detail'>
                  <p>🎂 1995.02.11</p>
                  <p>📩 junmop950@gmail.com</p>
                </div>
              </header>

              <article className='main-intro'>
                <p className='bb'><b className='bb'>희망직무분야 :</b> MLOps</p>
                <p className='bb'><b className='bb'>맡은 역할 :</b> 서버 구축, dlib </p><br></br>
              </article>
            </div>

            <div>
            <img className='jejuImg' src={dlib1} alt='dlib'/>
            <img className='jejuImg' src={dlib2} alt='dlib'/>
          </div>
          </div>

    </div>
  );
}

export default Junmo;