import React, {useRef, useState} from 'react';
import './signup.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

// 아이콘 임포트
import id from '../../../img/id.png';
import pw from '../../../img/padlock.png';
import pwcheck from '../../../img/check.png';
import Email from '../../../img/email.png'

function Signup() {
    const userRef = useRef();
    const [username, setUser] = useState('');
    const [passwd, setPwd] = useState('');
    const [check_pwd, setCheckPwd] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        let headers = {
            // authorization: '',
            'Content-Type': 'application/json'
          }
        let url = '/sign-up'
        let body = JSON.stringify({
            'username' : username,
            'passwd' : passwd,
            'email' : email
        })

        if(passwd === check_pwd){
            axios.post(url, body, headers)
            .then(res => {
                console.log(res.data.regist)
                if(res.data.regist === 'success'){
                    Swal.fire({
                        title : 'Regist Succss',
                        text : '로그인하러 가기'
                    }).then(
                        navigate('/login'))
                }
                else if(res.data.regist === 'fail_name 중복된 아이디가 있습니다.'){
                    Swal.fire({
                        title : 'Regist Failed',
                        text : '이미 존재하는 ID입니다. 확인 후 다시 입력해주세요',
                        icon : 'error'
                    })
                }
                else if(res.data.regist === 'fail_email 중복된 이메일이 있습니다.'){
                    Swal.fire({
                        title : 'Regist Failed',
                        text : '이미 존재하는 Email입니다. 확인 후 다시 입력해주세요',
                        icon : 'error'
                    })
                }
            })
        }
        else if(passwd !== check_pwd){
            Swal.fire({
                title : 'Check Password',
                text : '비밀번호가 서로 다릅니다. 확인 후 다시 시도해주세요.'
            })
        }
    };

    return (
    <form>
            <div className='body-signup'>
                <div className='signup-box'>
                    <div>
                        <img className='sign-icon' src={id} alt='id'/>
                        <input 
                            type='text'  
                            className='write' 
                            ref={userRef}
                            autoComplete='off'
                            onChange={(e) => setUser(e.target.value)}
                            value={username}
                            required
                            placeholder='   ID를 입력하세요'/>
                        <br/>
                    </div>
        
                    <div>
                        <img className='sign-icon' src={Email} alt='email'/>
                        <input 
                            type='email' 
                            className='write' 
                            ref={userRef}
                            autoComplete='off'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            placeholder='   Email을 입력하세요'/>
                    </div>
                
                    <div>
                        <img className='sign-icon' src={pw} alt='password'/>
                        <input 
                            type='password' 
                            className='write' 
                            onChange={(e) => setPwd(e.target.value)}
                            value={passwd}
                            required
                            placeholder='   Password를 입력하세요'/>
                    </div>
        
                    <div>
                        <img className='sign-icon' src={pwcheck} alt='passwordCheck'/>
                        <input 
                            type='password' 
                            className='write' 
                            onChange={(e) => setCheckPwd(e.target.value)}
                            value={check_pwd}
                            required
                            placeholder='   Password를 다시 한 번 입력하세요'/>
                    </div>
        
                    <div className="row submit">
                        <button 
                            className='signup-btn'
                            type='submit'
                            onClick={handleSubmit}
                        > 회원가입 </button>
                        <p className="detail-signup">이미 계정을 가지고 계신가요? <a href="./login">지금 로그인하기</a></p>
                    </div>

                </div>
        </div>
    </form>

)}

export default Signup;