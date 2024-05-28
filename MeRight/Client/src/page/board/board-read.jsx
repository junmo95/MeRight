import React,{useState} from 'react';
import './board.css';
import { useNavigate, useParams} from 'react-router-dom';
import {getCookie} from '../user/cookie';
import axios from 'axios';
import {FaPaperPlane} from 'react-icons/fa';
import { useEffect } from 'react';
import Swal from 'sweetalert2';


function BoardRead() {
    const navigate = useNavigate();
    const params = useParams();

    const [board, setBoard] = useState([
        {
            index : null,
            title : null,
            content : null,
            user : null
        },
    ]);

    const [comment, setComment] = useState([
        {
            comment : null,
            date : null
        },
    ]);

    // 게시글 불러오기 및 댓글 불러오기
    useEffect(() => {
        async function fetchData() {
            const res = await axios.get("/board/read/"+params.no);

            const b = {
                index : res.data.result_b.id,
                title : res.data.result_b.title,
                content : res.data.result_b.content,
                user : res.data.result_b.user_id
            };
            setBoard(b);
        }
        fetchData();
      }, []);


      useEffect(() => {
        async function fetchData() {
            const res = await axios.get("/board/read/"+params.no);
            const c = await res.data.result_c.map((rowData) => ({
                comment : rowData.content,
                date : rowData.create_date
            }));
            setComment(comment.concat(c));
        }
        fetchData();
      }, []);

    // 뒤로가기 버튼
    const goBack = () => {
        navigate('/board')
    };

    // 수정 버튼
    const modifyboard = () => {
        navigate('/board/rewrite/'+params.no)
    };

    // 삭제 버튼
    const deleteboard = () => {
        let url = '/board/delete/'+params.no
        let headers = {
            'Content-Type' : 'application/json'
        }
        let body = {
            'user_id' : getCookie('user_id')
        }

        axios.get(url, headers, body)
        .then((res) => {
            if(res.data.success === 'false'){
                Swal.fire({
                    title : 'Failed',
                    text : '게시글 삭제를 실패하였습니다. 잠시 후 다시 시도해주세요',
                    icon : 'error'
                })
            } else {
                Swal.fire({
                    title : 'Success',
                    text : '게시글 삭제를 완료하였습니다.',
                    icon : 'success'
                })
                navigate('/board')
            }
        })
    }

    // 댓글 작성
    const [content, setContent] = useState('');
    
    const handleSubmit = async(e) => {
        e.preventDefault();

        let headers = {
            'Content-Type' : 'application/json'
        }
        let url = '/board/read/'+params.no
        let data = {
            'user_id' : getCookie('user_id'),
            'board_id' : params.no,
            'content' : content
        }

        axios.post(url, data, headers)
        .then(console.log('@@@@@@',content))
        .then(res =>{
            if(res.data.success === 'success'){
                console.log('content',res.data.content)
                console.log('date',res.data.time)
            }
        })
        document.location.href="/board/read/"+params.no;
    }

    return (
      <div className='body-boardread'>
        <h1 className='boardread-title'> <b>ME</b>:RIGHT BOARD </h1>
        <table className='b-table'>
            <thead>
                <tr>
                    <th className='b-title b b1'> TITLE </th>
                    <th className='b-title'> {board.title} </th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td className='b-content b b1'> CONTENT </td>
                    <td className='b-content'> {board.content}</td>
                </tr>
            </tbody>
        </table>

        <p className='comment-title'> Comment </p>
        <p className='coment-detail'> 타인을 비방하는 목적의 글은 법적 조치를 받을 수 있습니다. </p>


        <table className='boardReadtb'>
        {comment.filter(data => data.comment !== null).map((data) => {
            return(
                <tbody>
                    <tr>
                        <td className='brt-user'> 익명 </td> 
                        <td className='brt-comment'>{data.comment}</td>
                        <td className='brt-time'>{data.date}</td>
                    </tr>
                </tbody>
                )
            })}
        </table>

        <form 
            className='comment-box'
            onSubmit={handleSubmit}>
            <input 
                className='board-comment' 
                type='text' 
                onChange={(e) => setContent(e.target.value)}
                value={content}
                placeholder='C O M M E N T'>
            </input>
            <button 
                className="board-commentBtn" 
                type="submit">
                    <i><FaPaperPlane/></i>
            </button>
        </form>

        {
          getCookie("access_token") != null ? (       // 토큰값이 존재하면  -> 작성자의 user_id와 현재 사용자의 user_id 비교 필요
            <>
            <button className='boardread-btn' onClick={goBack}> 이전 </button>
            <button className='boardread-btn' onClick={modifyboard}> 수정 </button>
            <button className='boardread-btn' onClick={deleteboard}> 삭제 </button>
            </>
            ) : (                                     // 토큰값이 존재하지 않으면
            <button className='boardread-btn' onClick={goBack}> 이전 </button>
            )
        }
      </div>
    )
}

export default BoardRead;
