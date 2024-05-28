import React,{useState,useEffect} from 'react';
import './board.css';
import {Link, useLocation} from 'react-router-dom';
import Pagination from '../../components/Pagination/pagination';
import axios from 'axios';

function Board() {
    // 페이징 처리
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    const [list, setList] = useState([
        {
            index : null,
            title : null,
        },
    ]);

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get("/board/list");
            const boardList = await res.data.list.map((rowData) => ({
                index : rowData.id,
                title : rowData.title,
                // user : rowData.user_id
            }));
            setList(list.concat(boardList));
            console.log('@@@@@@@@@@@@',res)
            console.log(typeof(res.data.list))
        } 
        fetchData();
      }, []);

    const location = useLocation();
    const boardData = () => {
        console.log(location);
    }


    return (
      <div className='body-board'>
        <h1 className='board-title'> <b>ME</b>:RIGHT BOARD </h1>
        <p className="boardCnt"> 총 <b>{list.length -1}</b> 개의 게시글이 있습니다. </p>
        <div className='board-box'>
            <label
                className='board-length-box'>
                    게시물 수: &nbsp;
                <select
                    type="number"
                    value={limit}
                    onChange={({ target: { value } }) => setLimit(Number(value))}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </select>
            </label>

            <table>
                <thead>
                    <tr>
                        <th className='bindex'> Index </th>
                        <th className='btitle'> Title </th>
                        <th className='buser'> User </th>
                    </tr>
                </thead>

                <tbody>
                    {list.reverse().slice(offset, offset + limit).filter(data => data.title !== null).map(({ index, title }, i) => (
                        <tr key={list[i].index}>
                            <td className='bindex'> {index} </td>
                            <td className='btitle' onClick={() => boardData}>
                                <a className='btitle-a'
                                    href={'/board/read/'+index}>{title}</a></td>
                            <td className='buser'> 익명 </td>
                        </tr>
                    ))}
                </tbody>
            </table>


        </div>

        <Pagination
          totalPosts={list.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />


        <form className='btn-bg'>
            <Link to='/board/write'>
                <button className='write-btn'> 글쓰기 </button>
            </Link>
        </form>

      </div>
    )
}

export default Board;

