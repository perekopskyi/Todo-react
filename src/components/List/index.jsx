import React from 'react';
import classNames from 'classnames';
import Budge from '../Budge';

import './list.scss';



const List = ({ items, isRemoveble, onClick, onRemove }) => {

  const removeList = (listName) => {
    if (window.confirm(`Вы действительно хотите удалить список ${listName}?`)) {
      onRemove(listName);
    }
  }

  return (
    <ul onClick={onClick} className="list">
      {
        items.map(({ color, icon, name, active, className}, index) => (
          <li key={index} className={classNames(className, {'active': active})}>
            <div>
              <i>{icon ? icon : <Budge color={color}/>}</i>
              <span>{name}</span>
            </div>
            {isRemoveble && (
              <div
                className='close'
                onClick={() => removeList(name)}
              >
                &times;
              </div>
            )}
          </li>
        ))
      }
    </ul>
  );
}

export default List;