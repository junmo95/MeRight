import React, {useState} from 'react';
import axios from 'axios';
import './login.css';
import { setCookie, getCookie } from '../cookie';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";


// 아이콘 임포트
import id from '../../../img/id.png';
import pw from '../../../img/padlock.png';

function Login() {
    const navigate = useNavigate();
    const [username, setUser] = useState('');
    const [passwd, setPwd] = useState('');
      
    const handleSubmit = async(e) => {
        e.preventDefault();
        let headers = {
            'Content-Type': 'application/json'
          }
        let url = '/login'
        let body = {
            'username' : username,
            'passwd' : passwd
        }
        axios.post(url, body, {headers})
        .then(res => {
            console.log(res.data.success)
            if(res.data.success === "true"){
                // console.log(typeof(res.data.access_token))
                const tmp_token = JSON.stringify(res.data.access_token);
                const user_id = JSON.stringify(res.data.user_id);
                setCookie('access_token', tmp_token);
                setCookie('user_id', user_id);
                setCookie('username', username);
                console.log(getCookie('access_token'));
                Swal.fire({
                    title : 'Login Success',
                    text : '로그인을 성공하였습니다',
                    icon : 'success'
                });
                document.location.href="/";
            }else if(res.data.success ==='false_passwd'){
                Swal.fire({
                    title : 'Login Failed',
                    text : 'PW를 다시 확인하세요.',
                    icon : 'error'
                })
            }else if(res.data.success === 'false_username'){
                Swal.fire({
                    title : 'Failed',
                    text : '존재하지 않는 회원입니다. 회원가입 후 시도해주세요',
                    icon : 'error'
                }).then(
                    navigate('/signup'))
            }
        })
    };

    return (
    <div className='body-login'>
        <div className="login">
        <div  className='login-field'>
            <div className='login-box1'>
                <p className='p1'> Welcome to ME:RIGHT </p>
                <p className='p-detail-1'> 아름다운 인터넷 문화를 만들어 갑니다. </p>
                <p className='p-detail'> - 세계적으로 확대되는 "잊힐 권리" </p> 
                <p className='p-detail'> - 원치 않는 개인정보유출로 인한 피해 방지 및 사생활 침해 방지 </p>
            </div>
            <form className='login-box2'>
                    <div>
                        <img className='sign-icon' src={id} alt='id'/>
                        <input 
                            type="text" 
                            className='write'
                            onChange={(e) => setUser(e.target.value)}
                            value={username}
                            required
                            multiple='multiple'
                            placeholder="ID를 입력하세요"/>
                    </div>
                
                    <div>
                        <img className='sign-icon' src={pw} alt='password'/>
                        <input 
                            type="password" 
                            className='write' 
                            onChange={(e) => setPwd(e.target.value)}
                            value={passwd}
                            required
                            multiple='multiple'
                            placeholder="Password를 입력하세요"/>
                    </div>

                    <div className='submit'>
                        <button type='submit' 
                                className='login-btn'
                                onClick={handleSubmit}> 로그인 </button>
                            <br/>
                        <p className="detail-login">계정이 없으신가요? 
                            <a href="./signup">  회원가입하기</a>
                        </p>
                    </div>
            </form>
        </div>
        </div>
    </div>
)
}
export default Login;
