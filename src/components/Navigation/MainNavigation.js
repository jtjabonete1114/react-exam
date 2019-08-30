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
      </header>
    </React.Fragment>
  );
};

export default MainNavigation;
