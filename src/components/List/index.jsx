import React from 'react';
import './list.scss';


const List = ({items}) => {
  return (
    <ul className="list">
      {
        items.map(({ color, icon, name, active}, index) => (
          <li key={index} className={active ? 'active' : ''}>
            <div>
              <i>{icon ? icon : <i className={`badge badge--${color}`}></i>}</i>
              <span>{name}</span>
            </div>
            {
              active
              ? <div className='close'>&times;</div>
              : null
            }
          </li>
        ))
      }
    </ul>
  );
}

export default List;