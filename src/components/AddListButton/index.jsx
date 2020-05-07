import React, { useState } from 'react';
import List from '../List';
import Budge from '../Budge';

import './addList.scss';

import addSvg from '../../assets/icons/add.svg';




const AddList = ({ colors, onAdd }) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectedColor, selectColor] = useState(colors[0].id);
  const [inputValue, setInputValue] = useState('');

  const onClose = () => {
    setVisiblePopup(false);
    setInputValue('');
    selectColor(colors[0].id);
  }

  const addList = () => {
    if (!inputValue) {
      alert('Введите название списка');
      return;
    }
    const color = colors.filter(({ id }) => id === selectedColor)[0].name;
    onAdd({ id: Math.random(), name: inputValue, color });
    onClose();
  }

  return (
    <div className="add-list">
      <List
        onClick={() => setVisiblePopup(true)}
        items={[
          {
            className: 'list__add-button',
            icon: <img src={addSvg} alt="plus" />,
            name: 'Добавить список'
          }
        ]}
      />
      {visiblePopup && <div className="add-list__popup">
        <div
          className="add-list__popup-close-btn"
          onClick={onClose}
        >
          &times;
        </div>
        <input
          type="text"
          className="field"
          placeholder="Название списка"
          value={inputValue}
          onChange={event => setInputValue(event.target.value)}
        />
        <div className="add-list__popup-colors">
          {
            colors.map(({id, hex, name}) => (
              <Budge
                onClick={() => selectColor(id)} key={id} color={name}
                className={selectedColor === id && 'active'}
              />
            ))
          }
        </div>
        <button
          className="button"
          onClick={addList}
        >
          Добавить
        </button>
      </div>}
    </div>
  );
}

export default AddList;