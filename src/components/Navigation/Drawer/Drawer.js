import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './Drawer.module.css';

const links = [
  { to: '/', label: 'Список', exact: true },
  { to: '/auth', label: 'Авторизация', exact: false },
  { to: '/quiz-creator', label: 'Создать тест', exact: false },
];

class Drawer extends Component {
  render() {
    const cls = [classes.Drawer];

    if (!this.props.isOpen) {
      cls.push(classes.close);
    }

    return (
      <React.Fragment>
        <nav className={cls.join(' ')}>
          <ul>
            {links.map((link, index) => (
              <li key={index}>
                <NavLink
                  to={link.to}
                  exact={link.exact}
                  activeClassName={classes.active}
                  onClick={this.props.onClose}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
      </React.Fragment>
    );
  }
}

export default Drawer;
