import React from 'react';
import './introduction.css';
import { Link } from 'react-router-dom';

// 캐러셀 slick 임포트
import { Carousel } from 'antd';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// 슬라이드 이미지 임포트
import lawtalk from '../../img/lawtalk.png'
import lawgood from '../../img/lawgood.png';
import lawimg from '../../img/law3.png';

function Introduction() {

  const settings = {
    dots: false, // 캐러셀이미지가 몇번째인지 알려주는 점을 보여줄지 정한다.
    infinite: true, // loop를 만들지(마지막 이미지-처음 이미지-중간 이미지들-마지막 이미지)
    speed: 300, // 애미메이션의 속도, 단위는 milliseconds
    slidesToShow: 1, // 한번에 몇개의 슬라이드를 보여줄 지
    slidesToScroll: 1 // 한번 스크롤시 몇장의 슬라이드를 넘길지
  }

    return (
      <div className='body-introduction'>
        <div className='law-box'>
          <fieldset>
            <legend> 개인정보 보호법 제2조 </legend>
            <p> 1. <b className='law-b'>'개인정보'</b>란, 살아있는 개인에 관한 정보로서 다음 각 목의 어느 하나에 해당하는 정보를 말한다. </p>
            <div className='detail'>
            <p> 가. 성명, 주민등록번호 및 영상 등을 통하여 개인을 알아볼 수 있는 정보 </p>
            <p> 나. 해당 정보만으로는 특정 개인을 알아볼 수 없더라도 다른 정보의 입수 가능성 등 개인을 알아보는데 소요되는 시간, 비용, 기술 등을 합리적으로 고려하여야 한다. </p>
            <p> 다. 가목 또는 나목을 제1호의2에 따라 가명처리함으로써 원래의 상태로 복원하기 위한 추가 정보의 사용ㆍ결합 없이는 특정 개인을 알아볼 수 없는 정보(이하 "가명정보"라 한다)
                1의2. "가명처리"란 개인정보의 일부를 삭제하거나 일부 또는 전부를 대체하는 등의 방법으로 추가 정보가 없이는 특정 개인을 알아볼 수 없도록 처리하는 것을 말한다.</p>
            </div>
          </fieldset>

          <fieldset>
            <legend> 개인정보자기결정권 </legend>
            <p> 1. <b className='law-b'> 정보주체의 개인정보 자기결정권 </b> </p>
            <div className='detail'>
            <p> 가. 자기 자신에 대한 정보가 언제, 누구에게, 어느 범위까지 알려지고 이용되도록 할 것인지를 그 정보주체가 스스로 결정하고 통제할 권리를 말한다.</p>
            <p> 나. 즉 정보의 조사･수집･취급의 형태, 정보의 내용등을 불문하고 자신에 관해 무엇인가를 말해주는 정보를 수집･처리 해도 되는지 여부,그 범위 및 목적에 관해 정보주체 스스로 결정함으로써 개인이 자신에 관한 정보의 흐름을 파악하여 통제할 수 있는 권능에 대한 법적 보호를 말한다. </p>
            <p> 다. 자신에 관한 정보를 누가 어떤 목적으로 보유하고 있고 누구에게 정보를 제공했으며 그 정보가 정확하고 적절한 것인지 등을 통제할 권리를 내용으로 한다. 따라서 개인정보를 제공하도록 강요당하는 것뿐만 아니라 그 개인정보가 타인에 의해 사용되는 것도 이 권리에 대한 제한을 의미한다.</p>
            </div>
          </fieldset>
        </div>
        <div className='carousel-field-box'>
            <Carousel {...settings} autoplay draggable={true}>
              <div>
                <Link to='#' onClick={() => window.open('https://www.lawtalk.co.kr/')}>
                  <img className='slide1' src={lawtalk} alt='lawtalk' title='LAWTALK'/>
                </Link>
              </div>

              <div>
                <Link to='#' onClick={() => window.open('https://www.lawandgood.com/')}>
                  <img className='slide2' src={lawgood} alt='lawgood' title='LAW&GOOD'/>
                </Link>
              </div>

              <div>
                <Link to='#' onClick={() => window.open('http://korea-lawyer.com/')}>
                  <img className='slide3' src={lawimg} alt='law2' title='변호사닷컴'/>
                </Link>
              </div>

            </Carousel>
          </div>
      </div>
    )
}

export default Introduction;