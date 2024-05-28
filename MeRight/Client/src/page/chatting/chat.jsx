import React, {Component} from 'react';
import ChatBot from 'react-simple-chatbot';
import './chat.css';
import {getCookie} from '../user/cookie';
import { ThemeProvider } from "styled-components";
import axios from 'axios';
import { Link } from 'react-router-dom';
// import ChatBot_axios from './chatbot';

const CHATBOT_THEME = {
    background: "#FFFEFC",
    fontFamily: "Roboto",
    headerBgColor: "gray",
    headerFontColor: "white",
    headerFontSize: "15px",
    botBubbleColor: "gray",
    botFontColor: "#fff",
    userBubbleColor: "black",
    userFontColor: "#fff",
  };


class Chatting extends Component{
    render(){
    var question = '';
    
    const steps = [
        {
            id:'0',
            message : '안녕하세요.' +(getCookie('username'))+ '님, ME:RIGHT 상담 챗봇입니다.',
            trigger: 'start',
        },
        {
            id : 'start',
            message : '상담을 시작하시겠습니까?',
            trigger : '1',
        },
        {
            id : '1',
            options : [
                { value : 1 , label : '상담 시작하기', trigger : '2'},
                { value : 2, label : '상담 종료하기', trigger : '7'}
            ],
        },
        {
            id : '2',
            message : '무엇이 궁금하신가요?',
            trigger : 'question',
        },
        {
            id : 'question',
            user : true,
            // trigger : (answer) => {
            //     question = answer.value
            //     let headers = {
            //         'Content-Type' : 'application/json'
            //     }
            //     let url = '/chat';
            //     axios.get(url, {params : { 'user_Q' : question}}, headers)
            //     .then((res) => {                    
            //         // if(answer.length >= 2){
            //         //     if(answer[0] === '이미지 검색하기' || answer[1] === '이미지 검색하기'){
            //         //         answer = '이미지 검색'
            //         //     }
            //         if(res.data.user_A === '이미지'){
            //             var answer = '이미지 검색'
            //             alert(answer)
            //             return answer
            //         } else{
            //             var answer = '이해불가'
            //             alert(answer)
            //             return answer 
            //         }
            //     })
            //   },
        
            trigger: function ({ value }) {
                axios.get('/chat', {params : {'user_Q' : value}})
                // .then((res) => {
                    console.log(typeof(value))
                    if(value.indexOf('도용') != -1){
                        return '도용/사칭'
                    } else if(value.indexOf('사칭') != -1){
                        return '도용/사칭'
                    }

                    if(value.indexOf('태그') != -1){
                        return '태그 검색'
                    } else if(value.indexOf('개인') != -1){
                        return '태그 검색'
                    }
                    
                    if(value.indexOf('이미지') != -1) {
                        return '이미지 검색'
                    } else if(value.indexOf('사진') != -1){
                        return '이미지 검색'
                    }
                    
                    if(value.indexOf('게시판') != -1){
                        return '게시판 연결'
                    } else if(value.indexOf('정보') != -1){
                        return '게시판 연결'
                    } else if(value.indexOf('공유') != -1){
                        return '게시판 연결'
                    }
                    
                    if(value.indexOf('비용') != -1){
                        return '비용'
                    } else if(value.indexOf('금액') != -1){
                        return '비용'
                    } else if(value.indexOf('얼마') != -1){
                        return '비용'
                    } else if(value.indexOf('돈') != -1){
                        return '비용'
                    }
                    
                    if(value.indexOf('구제방법') != -1){
                        return '구제방법 알아보기'
                    } else if(value.indexOf('관련') != -1){
                        return '구제방법 알아보기'
                    }
                    
                    if (value.indexOf('전문가') != -1){
                        return '전문가 상담 요청하기'
                    } else if(value.indexOf('상담') != -1){
                        return '전문가 상담 요청하기'
                    } else if(value.indexOf('법') != -1){
                        return '전문가 상담 요청하기'
                    } else if(value.indexOf('자문') != -1){
                        return '전문가 상담 요청하기'
                    } else if(value.indexOf('도움') != -1){
                        return '전문가 상담 요청하기'
                    }
                    
                    else {
                        return '이해불가'
                    }
                // }) 
              },
        
        }, 

        // 서비스 소개
        {
            id : '도용/사칭',
            message : '개인정보가 노출되셨나요? 검색서비스를 이용하시겠습니까?',
            trigger : '이용'
        },
        {
            id : '이용',
            options : [
                { value : 1, label : '네', trigger : '이미지 검색'},
                { value : 2, label : '아니오', trigger : '5'}
            ],
        },

        // 이미지 검색
        {
            id : '이미지 검색',
            message : '이미지 검색 서비스는 이곳에서 이용하실 수 있습니다.',
            trigger : '이미지 검색 링크'
        },
        {
            id : '이미지 검색 링크',
            component : (
                <Link to='/search/img'>
                    <a> 이미지 검색 서비스 이용하기 </a>
                </Link>
            ),
            trigger : '5'
        },


        // 태그 검색
        {
            id : '태그 검색', 
            message : '태그 검색 서비스는 이곳에서 이용하실 수 있습니다.',
            trigger : '태그 검색 링크'
        },
        {
            id : '태그 검색 링크',
            component : (
                <Link to='/search/tag'>
                    <a> 태그 검색 서비스 이용하기</a>
                </Link>
            ),
            trigger : '5'
        },

        // 구제방법 알아보기
        {
            id : '구제방법 알아보기',
            message : '해당 게시글 신고 및 삭제를 원하시나요?',
            options : [
                {value : 1, label : '예', trigger : '법률상담'},
                {value : 2, label : '아니오', trigger : '5'}
            ]
        },


        // 전문가 상담 요청하기
        {
            id : '전문가 상담 요청하기',
            message : '전문가 상담이 필요하신가요?',
            trigger : '법률상담'
        },
        {
            id : '법률상담',
            component : (
                <>
                    <p> 법률상담 132 콜센터 이용가능 </p>
                    <Link to='https://trost.co.kr/service/offline/'>
                        <p> 심리상담을 받을 수 있는 곳이 있어요! </p>
                    </Link>
                </>
            ),
            trigger : '5'
        },

        // 게시판 연결
        {
            id : '게시판 연결',
            message : '다른 사람들과 정보 공유가 가능합니다.',
            trigger : '게시판 링크'
        },
        {
            id : '게시판 링크',
            component : (
                <Link to='/board'>
                    <p> ME:RIGHT 게시판 이동하기</p>
                </Link>
            ),
            trigger : '5'
        },

        // 비용
        {
            id : '비용',
            message : '서비스 이용 금액이 궁금하시군요.',
            trigger : '비용안내'
        }, 
        {
            id : '비용안내',
            message : '현재 저희 서비스는 무료로 제공되고 있습니다.',
            trigger : '5'
        },

        // 잘모르겠습니다
        {
            id : '이해불가',
            message : '잘 이해하지 못했어요. 확인 후 다시 입력해주세요.',
            trigger : 'question'           
        },

        // 추가 검색
        {
            id : '5',
            message : '추가로 검색하고 싶은 것이 있나요?',
            trigger : '6',
        },
        {
            id : '6',
            options : [
                { value : 1 , label : '네', trigger : '2'},
                { value : 2 , label : '아니요',trigger : '7'}
            ],
        },
        {
            id : '7',
            message : '상담을 종료합니다. 감사합니다 :)',
            end : true
        }
    ]

    return (
        <form>
            <ThemeProvider theme={CHATBOT_THEME}>
                <ChatBot
                    floating={true}
                    className='chatbot'
                    steps={steps}
                    hideHeader={false}
                    // hideUserAvatar={true}
                    headerTitle='🗨 ME:RIGHT'
                    customDelay={5000}
                    placeholder={'입력하기'}
                    userDelay = '500'
                />
            </ThemeProvider>
        </form>
    )
}        
}
    
export default Chatting;