import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './MainNavigation.module.scss';

const MainNavigation = props => {
  // Fot some reason active class style is not applying
  // into the element that is why i force the styling here
  const activeStyle = { color: '#555' };

  return (
    <React.Fragment>
      <header className={style.mainNavigation}>
        <div className={style.mainNavigation__logo}>
          <h1>
            &lt; <span>Kyb</span>Dev /&gt;
          </h1>
        </div>

        <div className={style.mainNavigation__items}>
          <ul>
            <li>
              <NavLink activeStyle={activeStyle} to='/'>
                <i className='zmdi zmdi-chart zmdi-hc-lg'></i> Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink activeStyle={activeStyle} to='/visitors'>
                <i className='zmdi zmdi-accounts-list zmdi-hc-lg'></i> Visitor
              </NavLink>
            </li>

            {/* THIS SECTION IS FOR TESTING PURPOSES ONLY */}
            {props.displayTestNav ? (
              <li>
                <NavLink to='/logout'>Logout</NavLink>
              </li>
            ) : null}
          </ul>
        </div>



        <div className={style.nav__repo}>
         
          <div className={style.mainNavigation__items}>
            <h4>Repositories: </h4>
            <ul>
              <li>
                <a href="https://github.com/kybDev/react-exam"  target={`_blank`}>
                   <i className='zmdi zmdi-github-alt zmdi-hc-lg'></i> react-exam
                </a>
              </li>

              <li>
                <a href="https://github.com/kybDev/react-exam-api"  target={`_blank`}>
                   <i className='zmdi zmdi-github-alt zmdi-hc-lg'></i> react-exam-api
                </a>
              </li>
            </ul>
          </div>
        </div>

        
      </header>
    </React.Fragment>
  );
};

export default MainNavigation;
