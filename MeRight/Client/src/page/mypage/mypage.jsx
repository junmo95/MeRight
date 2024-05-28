import axios from 'axios';
import React, { useState,useEffect } from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import './mypage.css';
import { FaImages } from 'react-icons/fa';
import {FaHashtag} from 'react-icons/fa';
import Pagination from '../../components/Pagination/pagination';
import { useParams } from 'react-router-dom';


function MyPage() {

    /////////// progress-bar 수치
    const [datacnt, setDataCnt] = useState(0);
    const [imgcnt, setImgCnt] = useState(0);

    useEffect(() => {
        axios.get('/count',   // 총데이터 개수
          {withCredentials: true})
          .then(res => {
            setDataCnt(res.data)
        })
      }, []);
      
    useEffect(() => {
        axios.get('/count/img',   // img 데이터 개수
          {withCredentials: true})
          .then(res => {
            setImgCnt(res.data)
        })
    }, []);

    ///// 유저정보 받기
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [tag_list, setTagList] = useState([
        {
            index : null,
            keyword_1 : null,
            keyword_2 : null,
            keyword_3 : null,
            keyword_4 : null,
            keyword_5 : null,
        },
    ]);

    const [img_list, setImgList] = useState([
        {
            index : null,
            img : null,
            date : null,
        },
    ]);

    const [board_list, setBoardList] = useState([
        {
            index : null,
            title : null,
            cotent : null,
        },
    ]);

     useEffect(() => {
        async function fetchData() {
            const res = await axios.get('/mypage',{withCredentials:true});
            setUsername(res.data.user_info.username);
            setEmail(res.data.user_info.email);
            console.log(username, email)

            const search_tag = await res.data.search_tag.map((rowData) => ({
                index : rowData.request_id,
                keyword_1 : rowData.keyword_1,
                keyword_2 : rowData.keyword_2,
                keyword_3 : rowData.keyword_3,
                keyword_4 : rowData.keyword_4,
                keyword_5 : rowData.keyword_5,
            }));
            setTagList(tag_list.concat(search_tag));

            const search_img = await res.data.search_img.map((rowData) => ({
                index : rowData.request_id,
                img : rowData.img_desc,
                date : rowData.request_dt
            }));
            setImgList(img_list.concat(search_img));


            const b_list = await res.data.my_boards.filter(data => data != null).map((rowData) => ({
                index : rowData.id,
                title : rowData.title,
                content : rowData.content,
            }));
            setBoardList(board_list.concat(b_list));
        }
        fetchData();
    }, []);

    // pagination
    const limit = 5;
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    // seachTagData
    const params = useParams();
    const [tagReq, setTagReq] = useState([
        {
            user_id : null,
            keyword_1 : null,
            keyword_2 : null,
            keyword_3 : null,
            keyword_4 : null,
            keyword_5 : null
        }
    ]);

    const searchTag = ()=>{
        const res = axios.post('/search_mypage/' + params.no);
        console.log(res);
    }

    const searchImg = ()=>{
        const res = axios.post('/search_mypage/' + params.no);
        console.log(res);
    }

    return (
        <div className='my-body'>
        <div className='mside-bar'>
        <section className="mmodule-small">
            <img className='usericon' 
                src='https://www.icmetl.org/wp-content/uploads/2020/11/user-icon-human-person-sign-vector-10206693.png' 
                alt='user' />
                <h5 className="myuser">USER INFO</h5>
                <ul className="icon-list">
                    <li> ID : {username} </li>
                    <li> EMAIL : {email} </li>
                </ul>
                
                <div className='progressbar-box'>
                    <div className='bar-icon'>
                        <p className='user-search-p'>
                        <FaImages className='searchImg-icon'/>
                        IMG Search </p>
                    </div>
                    <ProgressBar 
                        className='progress-bar'
                        completed={Number(Math.round(imgcnt/datacnt*100))}
                        maxCompleted={100}
                        height='3px'
                        labelColor='transparent'
                        bgColor='black'
                        baseBgColor='lightgray'
                        borderRadius='3px'/>

                    <div className='bar-icon'>
                        <p className='user-search-p'>
                        <FaHashtag className='searchImg-icon'/>
                        TAG Search </p>
                    </div>
                    <ProgressBar 
                        className='progress-bar'
                        completed={Number(Math.round(imgcnt/datacnt*200))}
                        maxCompleted={100}
                        labelColor='transparent'
                        height='3px'
                        bgColor='black'
                        baseBgColor='lightgray'
                        borderRadius='3px'/>                  
                </div>
            </section>
            </div>
        
        <div className='mypage-body intro'>
            <h3> My Page </h3>
            <p> 최근 5개 검색 이력만 확인 가능합니다. </p>
            <div className='mp-content'>


                <fieldset className='user-search-box'> 
                    <legend> &ensp;&ensp;SEARCH TAG REQUEST&ensp;&ensp; </legend>
                        <table>
                            <thead>
                                <tr>
                                <th className='mh'> INDEX </th>
                                <th className='mh'> TAG </th>
                                <th className='mh'> RESULT </th>   
                                </tr>
                            </thead>
                            
                        {tag_list.reverse().slice(offset, offset + limit).filter(data => data.index != null).map((data) => {
                            return(
                                <tbody>
                                <tr key={data.index}>
                                    <td className='mindex'>{data.index}</td>
                                    <td className='mtitle' onClick={()=> searchTag}>
                                        <a>{data.keyword_1}&ensp;</a>
                                        <a>{data.keyword_2}&ensp;</a>
                                        <a>{data.keyword_3}&ensp;</a>
                                        <a>{data.keyword_4}&ensp;</a>
                                        <a>{data.keyword_5}&ensp;</a>
                                    </td>
                                <td className='mcontent'>
                                    <a className='mtitle-a' 
                                        href={'/search_Tagmypage/'+data.index}>
                                    결과 확인하기</a>
                                    </td>
                                </tr>
                                </tbody>
                            )})
                        }
                        </table>
                </fieldset>

                <fieldset className='user-search-box'> 
                    <legend> &ensp;&ensp;SEARCH IMG REQUEST&ensp;&ensp; </legend>
                        <table>
                            <thead>
                                <tr>
                                <th className='mh'> INDEX </th>
                                <th className='mh'> DATE </th>
                                <th className='mh'> RESULT </th>
                                </tr>
                            </thead>
                            
                        {img_list.reverse().slice(offset, offset + limit).filter(data => data.index != null).map((data) => {
                            return(
                                <tbody>
                                    <tr key={data.index}>
                                        <td className='mindex'>{data.index}</td>
                                        <td className='mtitle' onClick={()=>searchImg}>
                                            <a>{data.date}&ensp;</a>
                                        </td>
                                    <td className='mcontent'>
                                        <a className='mtitle-a' 
                                            href={'/search_Imgmypage/'+data.index}>
                                            결과 확인하기 </a>
                                    </td>
                                    </tr>
                                </tbody>
                            )})
                        }
                        </table>
                </fieldset>
            </div>


            <div className='mp-content'>
                <fieldset className='user-board-box'> 
                    <legend> &ensp;&ensp;ME:RIGHT BOARD&ensp;&ensp; </legend>
                    <table>
                        <thead>
                            <tr>
                                <th className='mh'> INDEX </th>
                                <th className='mh'> TITLE </th>
                                <th className='mh'> CONTENT </th> 
                            </tr>
                        </thead>
                    {board_list.reverse().slice(offset, offset + limit).filter(data => data.index != null).map(({index, title, content}, i) => {
                        return(
                            <tbody>
                                <tr key={board_list[i].index}>
                                    <td className='mindex'>
                                        {index}
                                    </td>
                                    <td className='mtitle'>
                                        {title}
                                    </td>
                                    <td className='mcontent'>
                                        <a className='mtitle-a'
                                            href={'/board/read/'+index}>{content}</a>
                                    </td>
                                </tr>
                            </tbody>
                        )})
                    }
                    </table>
                    <Pagination
                        total={board_list.length}
                        limit={limit}
                        page={page}
                        setPage={setPage}
                    />
                </fieldset>
            </div>
            </div>
        </div>
    )
}

export default MyPage;