import React, { useEffect } from "react";
import './searchResult.css';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useState } from "react";
import Pagination from "../../components/Pagination/pagination";

// 캐러셀 slick 임포트
import { Carousel } from 'antd';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



function SearchReq() {
    // 뒤로가기 버튼
    const goBack = () => {
        document.location.href="/mypage";
    };

    // 페이징 처리
    const [limit, setLimit] = useState(6);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    const params = useParams();
    const [taglist, setTagResultList] = useState([
        {
            index: '',
            link: '',
            title: '',
            cotent: '',
        },
    ]);

    // 태그 검색 이력
    useEffect(() => {
        async function fetchData() {
            const res = await axios.get('/search_mypage/'+params.no);
            console.log(JSON.parse(res.data.result))

            const tagresult_list = await JSON.parse(res.data.result).map((rowData) => ({
                index: rowData.id,
                link: rowData.link,
                title: rowData.title,
                content: rowData.content
            }));
            setTagResultList(taglist.concat(tagresult_list));
        }
        fetchData();
    }, []);

    // slide 
    const settings = {
        dots: false, // 캐러셀이미지가 몇번째인지 알려주는 점을 보여줄지 정한다.
        infinite: true, // loop를 만들지(마지막 이미지-처음 이미지-중간 이미지들-마지막 이미지)
        speed: 300, // 애미메이션의 속도, 단위는 milliseconds
        slidesToShow: 1, // 한번에 몇개의 슬라이드를 보여줄 지
        slidesToScroll: 1 // 한번 스크롤시 몇장의 슬라이드를 넘길지
      }


    return (
        <>
        <div className="searchReq-body">
            <h2> TAG 검색 결과 창 </h2>
            <br></br>
            <p className="sm-detail"> 총 <b>{taglist.length -1}</b> 개의 검색 결과가 있습니다. </p>

            <label
            className='board-length-box'>
                검색결과 : &nbsp;
                <select
                    type="number"
                    value={limit}
                    onChange={({ target: { value } }) => setLimit(Number(value))}
                >
                    <option value="6">5</option>
                    <option value="11">10</option>
                    <option value="21">20</option>
                    <option value="31">30</option>

                </select>
                </label>
                <button className='mysearchbtn' onClick={goBack}> 이전 </button>

            {/* 태그 검색 결과 */}
            <table className="serachReq" id="myTable" border='1'>

            <thead>
                <tr>
                    <th className="srindex srth"> INDEX </th>
                    <th className="srlink srth"> LINK </th>
                    <th className="srtitle srth"> TITLE </th>
                    <th className="srcontent srth"> CONTENT </th>
                </tr>
            </thead>

            {taglist.slice(offset, offset + limit).filter(data => data.index !== '').map((data) => {
                return(
                <tbody>
                    <tr key={data.index}>
                        <td className='srindex srtd'>{data.index}</td>
                        <td className="srlink srtd">
                            <a href={data.link} target='_blank'>
                            {data.link}</a></td>
                        <td className='srtitle'>{data.title}</td>
                        <td className='srcontent srtd'>{data.content}</td>
                    </tr>
                </tbody>
                )
            })
            }

            </table>

            <Pagination
                total={taglist.length}
                limit={limit}
                page={page}
                setPage={setPage}
                defaultCurrent = {5}
            />
        </div>

        <div className='slide-box'>
            <Carousel {...settings} autoplay draggable={true}>
                <div className="slide-wrap">
                    <div className="slide-image">
                        <img className='slideimg' src='https://mblogthumb-phinf.pstatic.net/20151128_40/klove3546_1448693816027dzLTP_PNG/%C4%C4%C7%BB%C5%CD%B9%E8%B0%E6%C8%AD%B8%E9%B0%ED%C8%AD%C1%FA_01.png?type=w2' alt='slideimg'/>
                    </div>
                    <div className="slide-text">
                        <div className="slide-text-table">
                            <div className="slide-text-table-row">
                                <div className='slide-text-table-cell'>
                                    <p> 다른 무엇이 되려고 애쓰지 않아도 좋아. 
                                        <br/> 너는 그저 너, 너다운 너이기만 하면 된단다. 
                                        <br/> -진 웹스터 - </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="slide-wrap">
                    <div className="slide-image">
                        <img className='slideimg' src='https://p4.wallpaperbetter.com/wallpaper/499/160/952/pier-black-and-white-monochrome-photography-rays-wallpaper-preview.jpg' alt='slideimg'/>
                    </div>
                    <div className="slide-text">
                        <div className="slide-text-table">
                            <div className="slide-text-table-row">
                                <div className='slide-text-table-cell'>
                                    <p> 살아있는 존재라면 
                                        <br/> 누구나 위험 앞에서 두려움을 느껴.
                                        <br/> 진정한 용기란 두려움에도 불구하고 위험에 맞서는 것인데, 
                                        <br/> 너는 이미 그런 용기를 충분히 갖고 있어. 
                                        <br/> - 라이먼 프랭크바음 - </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="slide-wrap">
                    <div className="slide-image">
                        <img className='slideimg' src='https://blog.kakaocdn.net/dn/bpm3qk/btqNtie9w5E/U3eNscdUnZCKVDeqGt9k41/img.jpg' alt='slideimg'/>
                    </div>
                    <div className="slide-text">
                        <div className="slide-text-table">
                            <div className="slide-text-table-row">
                                <div className='slide-text-table-cell'>
                                    <p> 매일 행복하진 않지만 행복한 일은 매일 있어. 
                                    <br/> - 곰돌이 푸 - </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Carousel>
        </div>
    </>
    )
}
export default SearchReq;