import React from 'react';
import axios from 'axios';

import AddTaskForm from './AddTaskForm';
import Task from './Task';
import editSvg from '../../assets/icons/edit.svg';

import './tasks.scss';
import { Link } from 'react-router-dom';

const Tasks = ({ list, onEditTitle, onAddTask, onEditTask, onRemoveTask, onCompleteTask, withoutEmpty }) => {

  const editTitle = () => {
    const newTitle = window.prompt('Название списка', list.name);
    if (newTitle) {
      onEditTitle(list.id, newTitle);
      axios.patch(`http://localhost:3001/lists/${list.id}`, {
        name: newTitle
      }).catch(() => {
        alert('Не удалось изменить название!');
      });
    }
  };

  return (
    <div className="tasks">
      <Link to={`/lists/${list.id}`}>
        <h2 style={{ color: list.color.hex }} className="tasks__title">
          {list.name}
          <img
            onClick={editTitle}
            src={editSvg}
            alt="Edit icon"
          />
        </h2>
      </Link>
      

      <div className="tasks__items">
        {!withoutEmpty && !list.tasks.length && <h2>Задачи отсутсвуют</h2>}
        {
          list.tasks.map(task => (
            <Task
              key={task.id} {...task}
              list={list}
              onRemove={onRemoveTask}
              onEdit={onEditTask}
              onComplete={onCompleteTask}
            />
          ))
        }
        <AddTaskForm key={list.id} list={list} onAddTask={onAddTask} />
      </div>
    </div>
  );
};

export default Tasks;