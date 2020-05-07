import React from 'react';
import classNames from 'classnames';

import './budge.scss';

const Badge = ({ color, onClick, className }) => (
  <i
    className={classNames('badge', { [`badge--${color}`]: color }, className)}
    onClick={onClick}
  ></i>
)

export default Badge;