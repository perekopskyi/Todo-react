import React from 'react';
import classNames from 'classnames';
import axios from 'axios';

import Budge from '../Budge';

import './list.scss';



const List = ({ items, isRemoveble, onClick, onRemove, onClickItem, activeList }) => {

  const removeList = ({name, id}) => {
    if (window.confirm(`Вы действительно хотите удалить список ${name}?`)) {
      axios
        .delete(`http://localhost:3001/lists/${id}`)
        .then(() => { onRemove(id); });
    }
  };

  return (
    <ul onClick={onClick} className="list">
      {
        items.map((item, index) => {
          console.log('item: ', item);
          const { color, icon, name, className } = item;
          return (
            <li
              key={index}
              className={classNames(className, {
                'active': item.active ? item.active : activeList && activeList.id === item.id
              })}
              onClick={onClickItem ? () => onClickItem(item) : null}
            >
              <i>{icon ? icon : <Budge color={color.name} />}</i>
              <span>{name}{item.tasks && ` (${item.tasks.length})`}</span>
              {isRemoveble && (
                <div
                  className='close'
                  onClick={() => removeList(item)}
                >
                  &times;
                </div>
              )}
            </li>
          )
        })
      }
    </ul>
  );
}

export default List;