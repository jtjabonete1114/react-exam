import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import MainNavigation from './MainNavigation';
import { NavLink } from 'react-router-dom';

configure({adapter: new Adapter()});

describe('<MainNavigation />', () => {
  let wrapper;  
 
  beforeEach(() => {
    wrapper = shallow(<MainNavigation/>);
  });

  it('should render 2 <NavLink />', () => {
    expect(wrapper.find(NavLink)).toHaveLength(2);
  })

  it('should render 3 <NavLink />', () => {
    wrapper.setProps({displayTestNav: true})
    expect(wrapper.find(NavLink)).toHaveLength(3);
  })

  it('should render TEST LInk <NavLink />', () => {
    wrapper.setProps({displayTestNav: true})
    expect(wrapper.contains(<NavLink to='/logout'>Logout</NavLink>)).toEqual(true)
  })
});