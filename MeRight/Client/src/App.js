import React, {useState} from 'react';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Footer from './components/Footer/footer';
import ScrollToTop from "./components/ScrollTop/ScrollTop";
import axios from 'axios';

// 서비스 페이지
import Home from './page/main/main';
import Search from './page/search/search';
import SearchTag from './page/search/search-tag';
import SearchReq from './page/mypage/searchResult';
import SearchImgReq from './page/mypage/searchImgResult';
import Information from './page/information/information';
import Introduction from './page/introduction/introduction';
import Board from './page/board/board';
import BoardWrite from './page/board/board-write';
import BoardRead from './page/board/board-read';
import BoardReWrite from './page/board/board-rewrite';

// 회원페이지
import Signup from './page/user/signup/signup';
import Login from './page/user/login/login';
import MyPage from './page/mypage/mypage';


// 프로필 페이지 
import Suhyun from './page/profile/suhyun';
import Eunhye from './page/profile/eunhye';
import Junmo from './page/profile/junmo';
import Seokran from './page/profile/seokran';
import Yejeong from './page/profile/yejeong';
import Minji from './page/profile/minji';

import Chatting from '../src/page/chatting/chat';

axios.defaults.withCredentials = true;

function App() {
  const [openModal, setOpenModal] = useState(false)

  return (
    <BrowserRouter>
      <Navbar />
      <ScrollToTop />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/search/img' element={<Search/>} />
          <Route path='/search/tag' element={<SearchTag/>} />
          <Route path='/search_Tagmypage/:no' element={<SearchReq/>} />
          <Route path='/search_Imgmypage/:no' element={<SearchImgReq/>} />

          <Route path='/information' element={<Information/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/mypage' element={<MyPage/>} />
          <Route path='/introduction' element={<Introduction/>} />
          <Route path='/board' element={<Board/>} />
          <Route path='/board/write' element={<BoardWrite/>} />
          <Route path='/board/read' element={<BoardRead/>} />
          <Route path='/board/read/:no' element={<BoardRead/>} />
          <Route path='/board/rewrite/:no' element={<BoardReWrite/>} />


          <Route path='/suhyun' element={<Suhyun/>} />
          <Route path='/eunhye' element={<Eunhye/>} />
          <Route path='/junmo' element={<Junmo/>} />
          <Route path='/seokran' element={<Seokran/>} />
          <Route path='/yejeong' element={<Yejeong/>} />
          <Route path='/minji' element={<Minji/>} />
        </Routes>
      <Chatting setOpenModal={setOpenModal}/>
      {openModal && <Chatting/>}
      <Footer/>
    </BrowserRouter>
  );
}

export default App;