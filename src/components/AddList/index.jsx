import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { List, Budge } from '..';

import './addList.scss';

import addSvg from '../../assets/icons/add.svg';



const AddList = ({ colors, onAdd }) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectedColor, selectColor] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (Array.isArray(colors)) {
      selectColor(colors[0].id);
    }
  }, [colors]);

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
    setIsLoading(true);
    axios
      .post('http://localhost:3001/lists', { name: inputValue, colorId: selectedColor })
      .then(({ data }) => {
        const colorName = colors.filter(({ id }) => id === selectedColor)[0].name;
        const newList = { ...data, color: { name: colorName }, tasks: [] };
        onAdd(newList);
        onClose();
      }).finally(() => {
        setIsLoading(false);
      });
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
          {isLoading ? 'Добавление ...' : 'Добавить' }
        </button>
      </div>}
    </div>
  );
}

export default AddList;