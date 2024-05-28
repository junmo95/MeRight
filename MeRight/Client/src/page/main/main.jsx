import React, {useEffect, useState} from 'react';
import './main.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CountUp from 'react-countup';

// 사진 임포트
import search from '../../img/search.png';
import digital from '../../img/digital.png';
import services from '../../img/services.png';

// 아이콘 임포트
import css from '../../img/css.png';
import js from '../../img/javascript.png';
import react from '../../img/react-icon.png';
import mysql from '../../img/mysql.png';
import javaSpring from '../../img/javaSpring.png';
import docker from '../../img/docker.png';
import django from '../../img/django.png';
import python from '../../img/python.png';


function Home() {
  const [data, setData] = useState('');
  const [img, setImg] = useState('');
  const [usercount, setUserCount] = useState('');
  const [searchcount, setSearchCount] = useState('');

  useEffect(() => {
    axios.get('/count',{withCredentials: true})
      .then(res => setData(res.data))
  }, []);

  useEffect(() => {
    axios.get('/count/img',
      {withCredentials: true})
      .then(res => setImg(res.data))
  }, []);

  useEffect(() => {
    axios.get('/req_count', {withCredentials:true})
    .then(res => {
      setSearchCount(res.data.reqcnt)
      setUserCount(res.data.usercnt)
    })
  })

    return (
        <div className='body'>
        <div>
          <main className='main'></main>
          <div className='main-box1'>
              <h1 className='main-text1'> <span className='me'>M E</span> : R I G H T </h1>
              <p className='main-explane1'> 1) 개인이 원치 않는 인터넷 기록 정리 </p>
              <p className='main-explane1'> 2) 근거 없는 비방 게시물 및 허위 사실 정리 </p>
          
          <Link to='/search/img'>
            <button className='useService'> 서비스 이용하기 </button>
          </Link>

          <div className='count-box'>
          <div className='count'>
              <CountUp
                className='count-up'
                start={1000}
                end={data}
                duration={2.75}
                ></CountUp>
              <p className='count-up-detail'> DATA </p>
            </div>

            <br></br>

            <div className='count'>
              <CountUp
                className='count-up'
                start={1000}
                end={img}
                duration={2.75}
                ></CountUp>
              <p className='count-up-detail'> IMG DATA </p>
            </div>

            <div className='count'>
              <CountUp
                className='count-up'
                start={1}
                end={searchcount}
                duration={2.75}
                ></CountUp>
              <p className='count-up-detail'> REQUEST </p>
            </div>

            <div className='count'>
              <CountUp
                className='count-up'
                start={1}
                end={usercount}
                duration={2.75}
                ></CountUp>
              <p className='count-up-detail'> USER </p>
            </div>
          </div>
          </div>
        </div>
  
        <section className='module-medium' id="demos">
          <div className='container'>
            <div className='row multi-columns-row'>
              <Link to='./information'>
              <div className='main-box col-md-4 col-sm-6 col-xs-12'>
                <figure>
                  <img className='content-box-image mainImg' src={digital} alt='services'/>
                    <figcaption>
                      <h3> Information </h3>
                      <p> 자세히보기 </p>
                      </figcaption>
                </figure>
              </div>
              </Link>

              <Link to='/search/img'>
              <div className='main-box col-md-4 col-sm-6 col-xs-12'>
                <figure>
                  <img className='content-box-image mainImg' src={search} alt='board'/>
                  <figcaption>
                    <h3> Services </h3>
                    <p> 자세히보기 </p>
                  </figcaption>
                </figure>
              </div>
              </Link>

              <Link to='/board'>
              <div className='main-box col-md-4 col-sm-6 col-xs-12'>
                <figure>
                  <img className='content-box-image mainImg' src={services} alt='mongchi'/>
                  <figcaption>
                    <h3> Board </h3>
                    <p> 자세히보기 </p>
                  </figcaption>
                </figure>
              </div>
              </Link>
            </div>
          </div>
        </section>


<hr className='main-hr'></hr>

        <section className="module-medium">
          <div className="container">
            <div className="client row multi-columns-row">
                <div className="main-item">
                    <div className="client-logo col-md-4 col-sm-6 col-xs-12">
                      <img className='main-img' src={js} alt="JavaScript Logo"/></div>
                </div>

                <div className="main-item">
                    <div className="client-logo col-md-4 col-sm-6 col-xs-12">
                      <img className='main-img' src={css} alt="CSS Logo"/></div>
                </div>

                <div className="main-item">
                    <div className="client-logo col-md-4 col-sm-6 col-xs-12">
                      <img className='main-img' src={react} alt="React Logo"/></div>
                </div>

                <div className="main-item">
                    <div className="client-logo col-md-4 col-sm-6 col-xs-12">
                      <img className='main-img' src={mysql} alt="MySQL Logo"/></div>
                </div>

                <div className="main-item">
                    <div className="client-logo col-md-4 col-sm-6 col-xs-12">
                      <img className='main-img' src={javaSpring} alt="javaSpring Logo"/></div>
                </div>

                <div className="main-item">
                    <div className="client-logo col-md-4 col-sm-6 col-xs-12">
                      <img className='main-img' src={docker} alt="docker Logo"/></div>
                </div>

                <div className="main-item">
                    <div className="client-logo col-md-4 col-sm-6 col-xs-12">
                      <img className='main-img' src={django} alt="django Logo"/></div>
                </div>
                
                <div className="main-item">
                    <div className="client-logo col-md-4 col-sm-6 col-xs-12">
                      <img className='main-img' src={python} alt="python Logo"/></div>
                </div>
                <br></br>
              </div>
            </div>
        </section>
      </div>
    )
}

export default Home;