import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { List, AddList, Tasks } from './components';
import listSvg from './assets/icons/list.svg';
import { Route, useHistory } from 'react-router-dom';


function App() {

  const [lists, setList] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeList, setActiveList] = useState(null);
  let history = useHistory();

  useEffect(() => {
    axios
      .get('http://localhost:3001/lists?_expand=color&_embed=tasks')
      .then(({ data }) => {
        setList(data);
      });
    axios
      .get('http://localhost:3001/colors')
      .then(({ data }) => {
        setColors(data);
      });
  }, []);

  const onAddList = (list) => {
    const newLists = [
      ...lists, list
    ]
    setList(newLists);
  }

  const onAddTask = (listId, task) => {
    const newLists = lists.map(list => {
      if (list.id === listId) {
        list.tasks = [...list.tasks, task];
      }
      return list;
    })
    setList(newLists);
  };

  const onEditTask = (listId, taskObj) => {
    const newTaskText = window.prompt('Текст задачи', taskObj.text);

    if (!newTaskText) {
      return;
    }

    const newLists = lists.map(list => {
      if (list.id === listId) {
        list.tasks = list.tasks.map(task => {
          if (task.id === taskObj.id) {
            task.text = newTaskText;
          }
          return task;
        });
      }
      return list;
    });
    setList(newLists);
    axios
      .patch(`http://localhost:3001/tasks/${taskObj.id}`, {
        text: newTaskText
      })
      .catch(() => {
        alert('Не удалось обновить задачу!');
      });
  }

  const onRemoveTask = (listId, taskId) => {
    if (window.confirm('Вы действительно хотите удалить задачу?')) {
      const newLists = lists.map(list => {
        if (list.id === listId) {
          list.tasks = list.tasks.filter(task => task.id !== taskId);
        }
        return list;
      });
      setList(newLists);
      axios
        .delete(`http://localhost:3001/tasks/${taskId}`)
        .catch(() => {
          alert('Не удалось удалить задачу!');
        });
    }
  };

  const onCompleteTask = (listId, taskId, completed) => {
    const newLists = lists.map(list => {
      if (list.id === listId) {
        list.tasks = list.tasks.map(task => {
          if (task.id === taskId) {
            task.completed = completed;
          }
          return task;
        });
      }
      return list;
    });
    setList(newLists);
    axios
      .patch(`http://localhost:3001/tasks/${taskId}`, { completed })
      .catch(() => {
        alert('Не удалось обновить задачу!');
      });
  }

  const onEditListTitle = (id, title) => {
    const newLists = lists.map(list => {
      if (list.id === id) {
        list.name = title;
      }
      return list;
    });
    setList(newLists);
  }
  
  useEffect(() => {
    const listId = +history.location.pathname.split('lists/')[1];
    if (lists) {
      const list = lists.find(list => list.id === listId);
      setActiveList(list);
    }
  }, [lists, history.location.pathname]);

  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List
          onClickItem={() => {
            history.push(`/`);
          }}
          items={[
            {
              active: history.location.pathname === '/',
              icon: <img src={listSvg} alt="list icon" />,
              name: 'Все задачи'
            }
          ]}
          
        />
        {lists
          ? (
            <List
              items={lists}
              onRemove={(id) => {
                const newLists = lists.filter(item => item.id !== id);
                setList(newLists);
              }}
              onClickItem={list => {
                history.push(`/lists/${list.id}`);
              }}
              activeList={activeList}
              isRemoveble
            />
          )
          : (
            'Loading ...'
          )
        }
        <AddList onAdd={onAddList} colors={colors} />
      </div>
      <div className="todo__tasks">
        <Route exact path='/'>
          {
            lists && lists.map(list => (
              <Tasks
                key={list.id}
                list={list}
                onEditTitle={onEditListTitle}
                onAddTask={onAddTask}
                onEditTask={onEditTask}
                onRemoveTask={onRemoveTask}
                onCompleteTask={onCompleteTask}
                withoutEmpty
              />
            ))
          }
        </Route>
        <Route path='/lists/:id'>
          {
            lists && activeList &&
            <Tasks
              list={activeList}
              onEditTitle={onEditListTitle}
              onAddTask={onAddTask}
              onEditTask={onEditTask}
              onRemoveTask={onRemoveTask}
              onCompleteTask={onCompleteTask}
            />
          }
        </Route>
      </div>
    </div>
  );
}

export default App;