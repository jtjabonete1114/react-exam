import React, { Component } from 'react';

import Loader from '../components/UI/Loader/Loader';

import ReactPaginate from 'react-paginate';

import './VisitorPage.css';
class VisitorPage extends Component {
  constructor(props) {
    super(props);
    this.filterBy = React.createRef();
  }

  state = {
    visits: [],
    isLoading: false,
    page: {
      pageNo: 1,
      size: 10,
      filter: 'today',
      totalPage: 0,
      startDate: new Date().toISOString()
    }
  };

  isActive = true;


  componentDidMount() {
    this.fetchEvent(
      this.state.page.pageNo,
      this.state.page.size,
      this.state.page.startDate,
      this.state.page.filter
    );
  }

  fetchEvent = (page, size, startDate, filter) => {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `query {
        visitors(pageNo:${page}, size: ${size}, startDate:"${startDate}",filter:"${filter}") {
          visits {
            _id
            ipAddress
            device
            createdAt
          }
          totalPage
        }
      }`
    };

    fetch('http://localhost:3003/api', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed');
        }
        return res.json();
      })
      .then(resData => {
        const { visitors } = resData.data;
        const updatedPage = { ...this.state.page };
        updatedPage.totalPage = visitors.totalPage;

        if (this.isActive) {
          this.setState({
            visits: visitors.visits,
            isLoading: false,
            page: updatedPage
          });
        }
      })
      .catch(err => {
        this.setState({ isLoading: false });
      });
  };

  handlePageClick = i => {
    const page = i.selected;
    const updatedPage = { ...this.state.page };
    updatedPage.pageNo = +page + 1;
    this.setState({ page: updatedPage });
    this.fetchEvent(
      updatedPage.pageNo,
      this.state.page.size,
      this.state.page.startDate,
      this.state.page.filter
    );
  };

  filterList = () => {
    const filterBy = this.filterBy.current.value;
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

    this.fetchEvent(
      1,
      this.state.page.size,
      stringDate,
      filterBy
    );

    const updatePage = { ...this.state.page };
    updatePage.startDate = stringDate;
    updatePage.filter = filterBy;

    this.setState({ page: updatePage });
  };

  render() {
    return (
      <React.Fragment>
        <div className='visit__filter'>
          <div className='form-controls'>
            <label htmlFor='filterBy'>Filter By:</label>
            <div className="filter_select">
              <select
                id='filterBy'
                ref={this.filterBy}
                onClick={this.filterList}
              >
                <option value='today'>Today</option>
                <option value='yesterday'>Yesterday</option>
                <option value='lastWeek'>Last Week</option>
                <option value='thisMonth'>This Month</option>
              </select>
            </div>
          </div>
        </div>

        {this.state.isLoading ? (
          <Loader />
        ) : (
          <div className='visit__wrapper'>
            <ul className='visit__list'>
              {this.state.visits.map(visit => {
                return (
                  <li key={visit._id} className='visit__item'>
                    <div>
                      <h1>IP: {visit.ipAddress}</h1>
                      <h2>Device: {visit.device}</h2>
                    </div>
                    <div>
                      <h3>Visit Date:</h3>
                      <h3>{new Date(visit.createdAt).toDateString()}</h3>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        <div className='visit__wrapper'>
          <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={this.state.page.totalPage}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default VisitorPage;
