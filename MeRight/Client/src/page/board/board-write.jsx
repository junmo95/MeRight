import React from 'react';
import './board.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { getCookie } from '../user/cookie';
import Swal from 'sweetalert2';


function Board() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    let headers = {
      'Content-Type' : 'application/json'
    }
    let url = '/board/write'

    let data = {
      'user_id' : getCookie('user_id'),
      'title' : title,
      'content' : content,
    }
    console.log(data)

    // 여기 프론트에서 게시글 넘버 넘겨줘야 함! 이벤트 객체에서 받아올 것
    axios.post(url, data, headers)
    .then((res) => {
      if(res.data.success === 'false'){
        Swal.fire({
          title : 'Failed',
          text : '로그인 후 이용가능한 페이지입니다. 로그인 후 사용해주세요',
          icon : 'error'
        }).then(
          navigate('/login')
        )
      } else(
        navigate("/board")
      )
      console.log('title:',title,'content:', content)
    })

  }
    return (
      <div className='body-board'>
        <div className='board-write'>
          <h3> <b>ME</b>:RIGHT 게시판 글 작성하기</h3>
            <div>
              <div className='write-box'>
                <input 
                  className='text-title-box' 
                  type='text' 
                  placeholder='제목을 입력하세요'
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  />

                <textarea 
                  onChange={(e) => setContent(e.target.value)}
                  value={content}
                  placeholder='내용을 입력하세요' 
                  className='text-box'/>
              </div>
            </div>
        </div>


        <form className='btn-bg' onSubmit={handleSubmit}>
          <button 
            type='submit'
            className='write-btn'
            > 글쓰기 </button>
        </form>

      </div>
    )
}

export default Board;
