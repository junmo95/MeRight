import './pagination.css';

function Pagination({ total, limit, page, setPage }) {
  const totalPages = Math.ceil(total / limit);
  let firstNum = page - (page % 5) + 1
	let lastNum = page - (page % 5) + 5

  return (
    <div className='pagination'>

      {/* 이전 버튼 */}
        <button 
          className='pagingBtn'
          onClick={() => setPage(page - 1)} 
          disabled={page === 1}>
          &lt;
        </button>

        <button 
          className='pagingBtn'
          onClick={() => setPage(firstNum)}
          aria-current={page === firstNum ? "page" : null}>
          {firstNum}
        </button>

      {/* 페이징 버튼 */}
        {Array(4).fill().map((_, i) =>{
            if(i <=2){
                return (
                    <button
                        className='pagingBtn'
                        border="true" 
                        key={i+1+firstNum} 
                        onClick={() => {setPage(firstNum+1+i)}}
                        aria-current={page === firstNum+1+i ? "page" : null}>
                        {firstNum+1+i}
                    </button>
                )
            }
            else if(i>=3){
                return (
                    <button
                        className='pagingBtn'
                        border="true" 
                        key ={i+1}
                        onClick={() => setPage(lastNum)}
                        aria-current={page === lastNum ? "page" : null}>
                        {lastNum}
                    </button>
                )  
            }
        })}

      {/* 다음 버튼 */}
        <button 
            className='pagingBtn'
            onClick={() => setPage(page + 1)} 
            disabled={page === totalPages}>
          &gt;
        </button>
        
    </div>
  );
}

export default Pagination;
