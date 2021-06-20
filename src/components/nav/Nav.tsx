import './Nav.css';

import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => (
  <nav>
    <NavLink to="/">Home</NavLink>
    <NavLink to="/seen">Seen</NavLink>
    <NavLink to="/bookmarks">Bookmarks</NavLink>
  </nav>
);

export default Nav;