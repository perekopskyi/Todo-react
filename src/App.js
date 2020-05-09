import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { List, AddList, Tasks } from './components';
import listSvg from './assets/icons/list.svg';

// import DB from './assets/db.json';

function App() {

  const [lists, setList] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeList, setActiveList] = useState(null);

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
  


  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List
          items={[
            {
              active: true,
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
              onClickItem={item => {
                setActiveList(item);
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
        {
          lists && activeList &&
          <Tasks
            list={activeList}
            onEditTitle={onEditListTitle}
            onAddTask={onAddTask}
          />
        }
      </div>
    </div>
  );
}

export default App;