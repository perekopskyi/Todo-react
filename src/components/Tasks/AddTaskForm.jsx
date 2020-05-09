import React, { useState } from 'react';
import axios from 'axios';

import addSvg from '../../assets/icons/add.svg';

const AddTaskForm = ({ list, onAddTask }) => {
  const [visibleForm, setVisibleForm] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleFormVisible = () => {
    setVisibleForm(!visibleForm);
    setInputValue('');
  }

  const addTask = () => {
    const newTask = {
      listId: list.id,
      text: inputValue,
      completed: false
    };

    axios
      .post(`http://localhost:3001/tasks`, newTask)
      .then(({ data }) => {
        onAddTask(list.id, data);
        toggleFormVisible();
      })
      .catch(() => { alert('Ошибка при добавлении задачи'); })
      .finally(() => { setIsLoading(false); });
  };

  return (
    <div className="tasks__form">
      {visibleForm ? (
        <div className="tasks__form-block">
          <input
            type="text"
            className="field"
            placeholder="Текст задачи"
            value={inputValue}
            onChange={event => setInputValue(event.target.value)}
          />
          <button
            disabled={isLoading}
            className="button"
            onClick={addTask}
          >
            {isLoading ? 'Добавление ...' : 'Добавить задачу'}
          </button>
          <button
            className="button button-grey"
            onClick={toggleFormVisible}
          >
            Отмена
          </button>
        </div>
      ) : (
        <div
          className="tasks__form-new"
          onClick={toggleFormVisible}
        >
          <img src={addSvg} alt="add" />
          <span>Новая задача</span>
        </div>
      )}
      

      
    </div>
  );
};

export default AddTaskForm;