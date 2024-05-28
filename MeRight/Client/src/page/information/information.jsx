import React from 'react';
import './information.css';
import digital from '../../img/digital2.png';


// icon 임포트
import idea from '../../img/idea-icon.png';
import service from '../../img/service-icon.png';
import speed from '../../img/speed-icon.png';
import design from '../../img/design-icon.png';
import { FaChevronDown } from 'react-icons/fa';


function Information() {
    return (
        <div className='body'>
            <div className='top'>
                <main className='info-main'>
                    <p className='main-explane2'> <b>ME</b>:RIGHT </p>
                    <h1 className='main-text2'> Information </h1>
                </main>
            </div>

            <section className='module'>
                <div className='container1 col-sm-8 col-sm-offset-2'>
                    <h2 className='module-title'> <span>Welcome to <b>ME</b>:RIGHT</span> </h2>
                    <p className='module-subtitle'> 세상을 떠난 사람들이 온라인에 남긴 흔적(=디지털 유산) 및 </p>
                    <p className='module-subtitle'> 개인이 원하지 않는 인터넷 기록을 정리해드립니다. </p>
                </div>

                <div className='scroll-div'>
                  <a className="section-scroll" href="#services">
                    <i className="down"><FaChevronDown/></i>
                  </a>
                </div>

            </section>

            <hr className='hr1'></hr>
            
          <section className="module" id="services">
          <div className="container1">

            <div className="row">
              <div className="col-sm-6 col-sm-offset-3">
                <h2 className="module-title font-alt">Our Services</h2>
              </div>
            </div>

            <div className="row multi-columns-row icons">
              <div className="col-md-3 col-sm-6 col-xs-12">
                  <div className="features-item">
                    <div className="features-icon"><img className='icon' src={service} alt='service-icon'/></div>
                    <h3 className="features-title">Coding &amp; development</h3>
                  </div>
                </div>

                <div className="col-md-3 col-sm-6 col-xs-12">
                  <div className="features-item">
                    <div className="features-icon"><img className='icon' src={idea} alt='idae-icon'/></div>
                    <h3 className="features-title font-alt">Ideas &amp; concepts</h3>
                  </div>
                </div>

                <div className="col-md-3 col-sm-6 col-xs-12">
                  <div className="features-item">
                    <div className="features-icon"><img className='icon' src={speed} alt='speed-icon'/></div>
                    <h3 className="features-title font-alt">Optimised for speed</h3>
                  </div>
                </div>

                <div className="col-md-3 col-sm-6 col-xs-12">
                  <div className="features-item">
                    <div className="features-icon"><img className='icon' src={design} alt='design-icon'/></div>
                    <h3 className="features-title font-alt">Designs &amp; interfaces</h3>
                  </div>
                </div>

            </div>
          </div>
            
            <div className='scroll-div'>
              <a className="section-scroll" href="#news">
                <i className="down"><FaChevronDown/></i>
              </a>
            </div>

        </section>
        <br></br>
        <hr className='hr1'></hr>
        
        <div id='news'>
          <img src={digital} className="disital" alt='digital'/>
        </div>
      </div>
    )
}

export default Information;