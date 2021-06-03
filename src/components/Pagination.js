import React from 'react'

const Pagination = ({postsPerPage, totalPost, paginate, currentPage}) => {
    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(totalPost / postsPerPage); i++){
        pageNumbers.push(i)
    }
    

    return (
        <div className="pagination">
            {
                pageNumbers.map(number => (
                    <a  onClick={() => paginate(number)} key={number} href="!#">{number}</a>
                ))
            }
            
        </div>
    )
}

export default Pagination