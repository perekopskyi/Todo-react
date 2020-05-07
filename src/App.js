import React, { useState } from 'react';
import List from './components/List';
import listSvg from './assets/icons/list.svg';
import AddList from './components/AddListButton';

import DB from './assets/db.json';
import Tasks from './components/Tasks';


function App() {
  const [lists, setList] = useState(DB.lists.map((item) => {
    item.color = DB.colors.filter(color => color.id === item.colorId)[0].name;
    return item;
  }));

  const onAddList = (list) => {
    const newLists = [
      ...lists, list
    ]
    setList(newLists);
  }


  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List
          items={[
            {
              icon: <img src={listSvg} alt="list icon" />,
              name: 'Все задачи'
            }
          ]}
        />
        <List
          items={lists}
          onRemove={(list) => {
            
          }}
          isRemoveble
        />
        <AddList onAdd={onAddList} colors={DB.colors} />
      </div>
      <div className="todo__tasks">
        <Tasks/>
      </div>
    </div>
  );
}

export default App;