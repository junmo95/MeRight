import React, {useState} from 'react';
import './search.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {getCookie} from '../user/cookie';
import Swal from 'sweetalert2';


function Search() {
  // 불러온 이미지 미리보기 
  const [fileImage, setFileImage] = useState("");
  const saveFileImage = (event) =>{
    setFileImage(URL.createObjectURL(event.target.files[0]));
  };

  const navigate = useNavigate();

  // 입력받은 사진 post 형태로 보내기
  const handleSubmit = async(e) => {
    e.preventDefault();
    e.persist();

    let files = e.target.imgfile.files[0];

    console.log("imgfile.files[0] :", e.target.imgfile.files[0]);

    let formData = new FormData();
    formData.append('imgfile', files);

    let headers = {
      'Content-Type' : 'multipart/form-data',
    }
    let url = '/face'

    axios.post(url, formData, headers)
    .then(res => {
      console.log(res)
      if(res.data.success === 'false'){
        Swal.fire({
          title : 'Search Failed',
          text : '로그인 후 이용가능한 페이지입니다. 로그인 후 사용해주세요',
          icon : 'error'
        }).then(
          navigate('/login')
        )
      } else {
        console.log(res.data.result)
        Swal.fire({
          title : 'Search Success',
          text : '사진 전송이 완료되었습니다. 결과를 확인하시겠습니까?',
          icon : 'question'
        }).then(
          document.location.href="/mypage"
        )
      }
    }).catch(error => {
      console.log(error.response.data)
      Swal.fire({
        title : 'Failed',
        text : '얼굴의 정면 사진을 권장합니다. 확인 후 다시 시도해주세요.',
        icon : 'error'
      })
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
            <h3> Search <b className='search-b'>{getCookie('username')}</b>'s Img </h3>
            </Link>
            <Link to='/search/tag'>
            <h3> Search <b className='search-b'>{getCookie('username')}</b>'s Tag </h3>
            </Link>
            </>
      ) : (
            <>
              <Link to='/search/img'>
                <h3> Search Img Service</h3>
              </Link>
              <Link to='/search/tag'>
                  <h3> Search Tag Service </h3>
              </Link>
            </>

        )
      }
        </div>
      </div>

    <form onSubmit={handleSubmit}>
      <div className='search-content'>
          <label className="input-file-btn" htmlFor='input-img'>
            파일 선택
          </label>
          <input id='input-img' type="file" accept='image/*' onChange={saveFileImage} name = "imgfile"/>
        <div className='search-detail'>
          <h3> 이미지 업로드 가이드 </h3>
          <p> 1. 얼굴이 식별될 수 있는 사진을 올려주세요. 정면 사진을 권장합니다. </p>
          <p> 2. 본인의 사진만 사용해 주세요. 타인의 사진을 무단사용할 경우, 관련 법률에 따라 처벌될 수 있습니다. </p>
          <p> 3. 사진은 일정 저장되지 않으며, 검색용도 이외에는 사용하지 않습니다. </p>
        </div>

        <div>
          {fileImage && ( <img alt='미리보기' src={fileImage} className='upload-img' />)}
        </div>
        <input 
          className='subBtn' 
          type = "submit" 
          />
      </div>
    </form>

</div>
  );
}

export default Search;