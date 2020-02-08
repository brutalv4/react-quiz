import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import classes from './MenuToggle.module.css';

const MenuToggle = props => {
  const cls = [classes.MenuToggle];

  if (props.isOpen) {
    cls.push(classes.open);
  }

  return (
    <FontAwesomeIcon
      icon={props.isOpen ? faTimes : faBars}
      className={cls.join(' ')}
      onClick={props.onToggle}
    />
  );
};

export default MenuToggle;
