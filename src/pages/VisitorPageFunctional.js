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

  const variables = {
    pageNo: pageNo,
    size: size,
    startDate: startDate,
    filter: today
  };

  const { loading, error, data, fetchMore } = useQuery(visitorsV2, {
    variables: variables
  });

  let visits = [];
  let page = 0;
  if (!loading && !error && data) {
    visits = data.visitors.visits;
    page = data.visitors.totalPage;
  }

  function filterList(e) {
    var selectBox = document.getElementById('filterBy');
    var filterBy = selectBox.options[selectBox.selectedIndex].value;
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

  return (
    <React.Fragment>
      {/* This Section Will be Move to a funtional component later */}
      <div className='visit__filter'>
        <div className='form-controls'>
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

      {page ? (
        <div className='visit__wrapper'>
          <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={page}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={i => {
              fetchMore({
                variables: {
                  pageNo: +i.selected + 1
                },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                  const visitsP = fetchMoreResult.visitors.visits;
                  return visitsP.length ? fetchMoreResult : previousResult;
                }
              });
            }}
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
