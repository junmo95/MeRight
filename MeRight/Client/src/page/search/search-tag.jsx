import React, {useEffect, useState} from 'react';
import './search.css';
import { Link, useNavigate } from 'react-router-dom';
import { getCookie } from '../user/cookie';
import axios from 'axios';
import Swal from 'sweetalert2';
import { TagsInput } from 'react-tag-input-component';


function SearchTag() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');


  // 태그
  const [tag, setTag] = useState('');

  // 검색 태그 전송
  const handleSubmit = async() => {
    let headers = {
      'Content-Type' : 'application/json'
    }
    let url = '/search'
    let body = {
      'keyword_1' : tag[0],
      'keyword_2' : tag[1],
      'keyword_3' : tag[2],
      'keyword_4' : tag[3],
      'keyword_5' : tag[4],
    }

    axios.post(url, body, headers)
    .then((res) => {
      if(document.getElementById("tags") === ""){
        Swal.fire({
          title : 'Failed',
          text : '태그를 입력해주세요',
      })
    }else if(res.data.success === 'false'){
        Swal.fire({
          title : 'Search Failed', 
          text : '로그인 후 이용가능한 페이지입니다. 로그인 후 사용해주세요',
          icon : 'error'
        }).then(
          navigate('/login')
        )
      } else {
        if(res.data.success === 'true'){
          const searchTagData = res.data
          console.log('type!!!!!!!!!!!!!!!!!! : ',typeof(searchTagData))
          console.log('search Tag : ', res.data.result)
          console.log('link : ', res.data.result[0].link)
          console.log('cnt : ', res.data.cnt)
          console.log('searchTagData : ', searchTagData)

          Swal.fire({
            title : 'Search Success',
            text : '태그 전송이 완료되었습니다. 결과를 확인하시겠습니까?',
            icon : 'question'
          }).then(
            document.location.href="/mypage"
          )
        } else {
          Swal.fire({
            title : 'Search Failed',
            text : '태그를 확인해주세요',
            icon : 'error'
          })
        }
      }
      console.log(res.data.success)
    })
  }; 

    return (
      <div className='body'>

      <div className='top'>
        <main className='search-main'>
          <p className='main-explane2'> <b>ME</b>:RIGHT </p>
          <h1 className='main-text2'> Search Image / Tag Page </h1>
        </main>
      </div>

      <div className='search-box'>
        <div className="search-title">
        {getCookie("access_token") != null ? (
            <>
            <Link to='/search/img'>
              <h3> Search <b className='search-b'> {getCookie('username')} </b>'s Img </h3>
            </Link>
            <Link to='/search/tag'>
              <h3> Search <b className='search-b'>{getCookie('username')}</b>'s Tag </h3>
            </Link>
            </>
      ) : (
            <>
              <Link to='/search/img'>
                <h3> Search Img Service </h3>
              </Link>
              <Link to='/search/tag'>
                  <h3> Search Tag Service</h3>
              </Link>
            </>

        )
      }
        </div>
      </div>

      <div>
        <div className='tag-box'>
          <div className='search-tag-detail'>
            <h3> 태그 입력 가이드 </h3>
              <p> 1. ENTER 키를 활용하여 성함, 나이, 학력 등 검색하고 싶은 태그를 입력하세요. </p>
              <p> 2. 태그는 검색용도 외에 별도로 활용되지 않으며, 사용자의 요청에 따라 개인정보에 저장 및 삭제가 가능합니다. </p>
              <p> ( 최대 입력 개수는 5개이며, 동일 단어 중복 입력은 제한됩니다. ) </p>
          </div>

          <br></br> 

          <TagsInput
            id='tags'
            value={tag}
            onChange={setTag}
            placeHolder="태그를 입력해주세요"
          />

            <button
                className='submitBtn'
                type='submit'
                onClick={handleSubmit}>
               제출</button>
          </div>
      </div>
</div>
  );
}

export default SearchTag;