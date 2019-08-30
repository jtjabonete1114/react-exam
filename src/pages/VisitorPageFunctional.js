import React, { useState } from 'react';

import ReactPaginate from 'react-paginate';
import { useQuery } from '@apollo/react-hooks';
import { visitorsV2 } from '../graphql/visits';
import Loader from '../components/UI/Loader/Loader';
import './VisitorPage.css';

// NOTE : REFACTOR CODE LATER

const VisitorPage = () => {
  const [pageNo, setPageNo] = useState(1);
  const [size] = useState(10);
  const [startDate, setStartDate] = useState(new Date().toISOString());
  const [today, setToday] = useState('today');
  const [sortType, setSortType] = useState({desc: true, asc: false});
  const [sortColumn, setSortColumn] = useState("createAt");
  const [sortBy, setSortBy] = useState("DESC");
  const [pageNumber, setPageNumber] =useState(true);

  const { loading, error, data, fetchMore } = useQuery(visitorsV2, {
    variables: {
      pageNo: pageNo,
      size: size,
      startDate: startDate,
      filter: today,
      sortColumn: "createAt",
      sortBy: "DESC",
    }
  });

  function filterList(e) {
    const selectBox = document.getElementById('filterBy');
    const filterBy = selectBox.options[selectBox.selectedIndex].value;
    let date = new Date();
    let startDate;
    switch (filterBy) {
      case 'today':
      case 'thisMonth':
        startDate = date;
        break;
      case 'yesterday':
      case 'lastWeek':
        startDate = new Date(date.setDate(date.getDate() - 1));
        break;

      default:
        startDate = date;
    }
    const stringDate = startDate.toISOString();
    setPageNo(1);
    setStartDate(stringDate);
    setToday(filterBy);
  }

  function onSortListBy(){
    const selectBox = document.getElementById('sortBy');
    const sortColumn = selectBox.options[selectBox.selectedIndex].value;
    setSortColumn(sortColumn)
    reFetchSetList({pageNo: 1, sortColumn:sortColumn, sortBy:sortBy})
    setPageNumber(0)
  }

  function onDescending(){
    setSortType({desc:true, asc:false});
    setSortBy('DESC')
    reFetchSetList({pageNo: 1, sortColumn:sortColumn, sortBy:"DESC"})
    setPageNumber(0)
  }

  function onAscending(){
    setSortType({desc:false, asc:true});
    setSortBy('ASC')
    reFetchSetList({pageNo: 1, sortColumn:sortColumn, sortBy:"ASC"});
    setPageNumber(0)
  }

  function onPageChangeRender(i) {
    reFetchSetList({ pageNo: +i.selected + 1,  sortColumn:sortColumn, sortBy:sortBy });
  }

  function reFetchSetList(variables) {
    fetchMore({
      variables: variables,
      updateQuery: (previousResult, { fetchMoreResult }) => {
        setPageNumber(1)
        const visitsP = fetchMoreResult.visitors.visits;
        return visitsP.length ? fetchMoreResult : previousResult;
      }
    });
  }

  let visits = [];
  let page = 0;
  if (!loading && !error && data) {
    console.log(data)
    visits = data.visitors.visits;
    page = data.visitors.totalPage;
  }

  return (
    <React.Fragment>
      <div className='visit__filter'>
        <small>
          Filter by: {today} | 
          Sort Column: {sortColumn} | 
          Sort by: {sortBy} | 
          Active Page : {pageNo} | 
          Total Page : {page} | 
        </small>
        <div className='form-controls'>
          <div className='filter__option'>
            <label htmlFor='filterBy'>Filter By:</label>
            <div className='filter_select'>
              <select id='filterBy' onClick={e => filterList(e)}>
                <option value='today'>Today</option>
                <option value='yesterday'>Yesterday</option>
                <option value='lastWeek'>Last Week</option>
                <option value='thisMonth'>This Month</option>
              </select>
            </div>
          </div>

          <div className='filter__option'>
            <label htmlFor='sortBy'>Sort By:</label>
            <div className='filter_select'>
              <select id='sortBy' onClick={e => onSortListBy(e)}>
                <option value='createdAt'>Visit Date</option>
                <option value='ipAddress'>IP Address</option>
                <option value='device'>Device</option>
              </select>
            </div>
            <div className='sort_option'>
              <span 
              onClick={()=> onDescending()}
              className={ sortType.desc ? 'is-active' : 'not-active'}>
                <i className='zmdi zmdi-triangle-up' />
              </span>
              <span 
              onClick={()=>onAscending()}
              className={ sortType.asc ? 'is-active' : 'not-active'}>
                <i className='zmdi zmdi-triangle-down' />
              </span>
            </div>
          </div>
        </div>

        {loading ? <Loader /> : null}

        {error ? <h1>`Error! ${error.message}`</h1> : null}
      </div>

      {data ? (
        <div className='visit__wrapper'>
          <ul className='visit__list'>
            {visits.map(visit => {
              return (
                <li key={visit._id} className='visit__item'>
                  <div>
                    <h1>IP: {visit.ipAddress}</h1>
                    <h2>Device: {visit.device}</h2>
                  </div>
                  <div>
                    <h3>Visit Date</h3>
                    <h3>{new Date(visit.createdAt).toLocaleString()}</h3>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}

      {page && pageNumber ? (
        <div className='visit__wrapper'>
          <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={page}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={onPageChangeRender}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
          />
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default VisitorPage;
