import React from 'react'
import { Link } from 'react-router-dom';
import './footer.css';


function Footer() {
    return (
        <div className='footer-container'>
            <div className='footer-links'>
                <div className='footer-link-wrapper'>
                    <div className='footer-link-items'>
                        <h2>About Us</h2>
                        <Link to='/information'>Information</Link>
                        <Link to='/introduction'>Introduction</Link>
                    </div>
                    <div className='footer-link-items'>
                        <h2>Our Services</h2>
                        <Link to='/search/img'>Search </Link>
                        <Link to='/board'>Board</Link>
                    </div>
                </div>
                <div className='footer-link-wrapper'>
                    <div className='footer-link-items'>
                        <h2>Contact Us<span className='footer-span'> _WEB</span> </h2>
                        <Link to='/suhyun'>Suhyun Yoo</Link>
                        <Link to='/yejeong'>Yejeong Son</Link>
                        <Link to='/minji'>Minji Jin</Link>
                    </div>
                    <div className='footer-link-items'>
                        <h2>Contact Us<span className='footer-span'>_Model/Data</span> </h2>
                        <Link to='/eunhye'>Eunhye Kang</Link>
                        <Link to='/junmo'>Junmo Park</Link>
                        <Link to='/seokran'>Seokran Bae</Link>
                    </div>
                </div>
            </div>
            
            <section>
                <div>
                    <form>
                        <Link to='/signup'>
                            <button className='footer-btn'> JOIN US</button>
                        </Link>
                    </form>
                </div>
            </section>

            <div className='fo-detail'>
                <p>개인권리보호 및 명예훼손 침해사례에 대해 적극적으로 대처하겠습니다. </p>
                <p>또한 잊혀질 권리를 위해 오늘도 모든 에너지를 100% 집중하여 인터넷 감시자의 역할을 다하겠습니다. </p>
            </div>
            
        </div>
    )
}

export default Footer