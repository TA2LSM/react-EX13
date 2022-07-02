import React, { Component } from 'react';

import _ from 'lodash'; // lodash, underscore'un optimize edilmiş hali
import PropTypes from 'prop-types';

class Pagination extends Component {
  render() {
    const {
      itemsCount,
      defaultPageSizes,
      pageSize,
      currentPage,
      onPageChange,
      onPageSizeSelection,
      onSelectNext,
      onSelectPrevious,
    } = this.props;

    const pagesCount = Math.ceil(itemsCount / pageSize); // bölüm sonucunu tam sayıya yuvarlar

    //if (pagesCount === 1) return null;
    const pages = _.range(1, pagesCount + 1); //1, 2, ... pagesCount da dahil olmak üzere bir dizi oluşturur.

    return (
      <>
        <div
          className='col-3 d-flex align-items-center'
          style={{ height: '50px' }}
        >
          <span>Movies per page:</span>
          <div
            className='form-group'
            style={{ marginLeft: '10px', cursor: 'pointer' }}
          >
            {/* <label htmlFor='selection-moviesPerPage'>Movies per page</label> */}
            <select
              // id='selection-moviesPerPage'
              className='form-select'
              data-role='select-dropdown'
              data-profile='minimal'
              defaultValue={pageSize}
            >
              {/* <option>Select</option> */}
              {defaultPageSizes.map(pageSize => (
                <option
                  key={'_liId' + pageSize.toString()}
                  onClick={() => onPageSizeSelection(pageSize)}
                >
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>

        {pagesCount !== 1 ? (
          <div
            className='col d-flex justify-content-end '
            style={{ height: '50px' }}
          >
            <nav
            // aria-label='tablePagination'
            >
              <ul
                className='pagination d-flex align-items-center'
                style={{ cursor: 'pointer' }}
              >
                <li
                  key='previous'
                  // className={currentPage !== 1 ? 'page-item' : 'd-none'}
                  className={currentPage !== 1 ? 'page-item' : 'page-item disabled'}
                >
                  <a
                    className='page-link'
                    onClick={() => onSelectPrevious(currentPage)}
                  >
                    <i className='fa fa-fw fa-angle-double-left' />
                    <strong>Previous</strong>
                  </a>
                </li>

                {/* map metodu kullanıldığı için "key" lazım. Elle yazılsa sorun olmuyor */}
                {pages.map(page => (
                  <li
                    key={page}
                    className={page === currentPage ? 'page-item fst-italic fw-bold active' : 'page-item'}
                  >
                    <a
                      className='page-link'
                      onClick={() => onPageChange(page)}
                    >
                      {page}
                    </a>
                  </li>
                ))}

                <li
                  key='next'
                  // className={currentPage !== pagesCount ? 'page-item' : 'd-none'}
                  className={currentPage !== pagesCount ? 'page-item' : 'page-item disabled'}
                >
                  <a
                    className='page-link'
                    onClick={() => onSelectNext(currentPage, pagesCount)}
                  >
                    <strong>Next</strong>
                    <i className='fa fa-fw fa-angle-double-right' />
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        ) : null}
      </>
    );
  }
}

// metot yanlış yazılırsa (proptypes ya da PropTypes gibi) çalışmayacaktır !!!
//.propTypes olmalı. Tüm veri tipleri için reactjs.org'dan "type checking" olarak
// araştırınız...
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
