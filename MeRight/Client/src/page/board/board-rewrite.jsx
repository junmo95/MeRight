import React, {useEffect} from 'react';
import './board.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
// import Board from './board';


function BoardReWrite() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  // 뒤로가기 버튼
  const goBack = () => {
    navigate('/board')
};

  const params = useParams();
  const [board, setBoard] = useState([
      {
          title : null,
          content : null,
          user_id : null,
          board_id : null
      },
  ]);

  useEffect(() => {
      async function fetchData() {
          const res = await axios.get("/board/read/" + params.no);
          const b = {
            title : res.data.result_b.title,
            content : res.data.result_b.content,
            user_id : res.data.result_b.user_id,
            board_id : res.data.result_b.board_id,
          };
          setBoard(b);
          console.log(res);
      }
      fetchData();
    }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();

    let headers = {
      'Content-Type' : 'application/json'
    }
    let url = '/board/modify/'+params.no

    let data = {
      'title' : boardTitle,
      'content' : boardContent,
    }

    axios.post(url, data, headers)
    .then((res) => {
      if(res.data.success === 'false'){
        Swal.fire({
          title : 'Failed',
          text : '저장에 실패하였습니다. 잠시 후 다시 시도해주세요.',
          icon : 'error'
        })
      } else if(res.data.success === 'true')(
        Swal.fire({
            title : 'Success',
            text : '게시글 수정에 성공하였습니다.',
            icon : 'success'
        }).then(
            navigate("/board")
        )
      )
    })
  }
  const [boardTitle, setBoardTitle] = useState('');
  const [boardContent, setBoardContent] = useState('');

  const changeTitle = (e) => {
    e.preventDefault();
    let { value } = { ...e.target }
    setBoardTitle(value)
}
  const changeContent = (e) => {
    e.preventDefault();
    let { value } = { ...e.target }
    setBoardContent(value)
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
                onChange={changeTitle}
                defaultValue = {board.title}
              />

              <textarea 
                onChange={changeContent}
                defaultValue={board.content}
                className='text-box'
              />
              </div>
            </div>
        </div>
        
        <form className='btn-bg'>
          <button
            onClick={handleSubmit} 
            type='submit'
            className='write-btn'
            > 수정하기 </button>
          <button  
            type='button'
            className='write-btn' 
            onClick={goBack}> 
          이전 </button>

        </form>

      </div>
    )
}

export default BoardReWrite;
