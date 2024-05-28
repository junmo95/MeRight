import React from 'react';
import './profile.css';
import { Link } from 'react-router-dom'

// 이미지 임포트
import son from '../../img/son.jpg';
import son1 from '../../img/son1.jpg';
import son2 from '../../img/son2.jpg';
import {FaPaperPlane} from 'react-icons/fa'; 

//아이콘 임포트
import notion from '../../img/notion.png';
import github from '../../img/github.png';

function Yejeong() {
    return (
      <div className='profile-body body'>
        <div className='side-bar'>
        <section className="module-small">
          <div className="container">
            <div className="row">
              <div className="col-sm-4 col-md-3 sidebar">
                <div className="widget">
                <img src={son} alt="yejeong-Son" className='profile-img1'/>
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
                    <Link to='/seokran'><li className='name'>Seokran Bae</li></Link>
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
            <a href='https://jagged-slime-beb.notion.site/0a01dc25afae4a519608e06d43fff1d6' target="_blank">
              <img className='icon' src={notion} alt='notion'/>
            </a>
            <a href='https://github.com/suhyun-yoo?tab=repositories' target="_blank">
              <img className='icon' src={github} alt='github'/>
            </a>
          </div>

              <header>
                <p className='names'> YEJEONG SON </p>
                <div className='intro-detail'>
                  <p>🎂1992.07.14</p>
                  <p>📩 wkfthd1234@gmail.com</p>
                </div>
              </header>

              <article className='main-intro'>
                <p className='bb'><b className='bb'>희망직무분야 :</b> Back-end</p>
                <p className='bb'><b className='bb'>맡은 역할 :</b> 서버 구축</p><br></br>
              </article>
            </div>

            
            <div>
              <img className='jejuImg' src={son1} alt='son'/>
              <img className='jejuImg' src={son2} alt='son'/>
            </div>

          </div>
    </div>
  );
}

export default Yejeong;