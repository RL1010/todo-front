import React, { useEffect, useState } from 'react';
import AddTask from './components/AddTask/AddTask';
import Alert from './components/Alert/Alert';
import Author from './components/Author.js/Author';
import Filter from './components/Filter/Filter';
import Input from './components/Input/Input';
import List from './components/List/List';
import './index.css';
import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:5000/tasks`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// const getLocalStorage = () => {
//   let list = localStorage.getItem('taskList');
//   if (list) {
//     return JSON.parse(localStorage.getItem('taskList'));
//   } else {
//     return [];
//   }
// };
function App() {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState({});
  const [status, setStatus] = useState('2');
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isChanged, changeState] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: '',
  });
  const [filterText, setFilterText] = useState('0');
  const [filterTodos, setFilterToDos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      // alert
      showAlert(true, 'danger', 'Please enter a value');
    } else if (name && isEditing) {
      // edit
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name, author: userName };
          }
          return item;
        })
      );
      setName('');
      setEditId(null);
      setIsEditing(false);
      showAlert(true, 'success', 'Value changed succesfully');

      const response = api
        .patch(`edit/${editId}`, {
          title: name,
          author: userName,
          status: status,
        })
        .then((res) => console.log(res, 'edit response'));
    } else {
      api
        .post('/', {
          title: name,
          status: status,
          author: userName ? userName : '',
        })
        .then((response) => {
          setList([...list, response]);
          changeState(!isChanged);
          setFilterText(status);
        });

      setName('');
      showAlert(true, 'success', 'Task added succesfully');
    }
  };

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, 'danger', 'Empty list');
    setList([]);
  };
  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed');
    api.delete(`/${id}`).then((response) => {
      setList(list.filter((item) => item.title !== response.data.title));
    });
  };

  const editItem = (item) => {
    const specifiedItem = item;
    console.log(specifiedItem);
    setIsEditing(true);
    setEditId(item.id);
    setName(specifiedItem.title);
    setUserName(specifiedItem.author);
    setStatus(specifiedItem.status);
    // console.log(status);
    setFilterText(specifiedItem.status);
  };
  const completeHandler = (item, index) => {
    let tempArray = [...list];
    tempArray[index] = {
      ...tempArray[index],
      status: item.status === 2 ? 1 : 2,
    };
    setList(tempArray);
    setStatus(item.status);
    console.log(status);
  };
  useEffect(() => {
    api.get('/').then((response) => setList(response.data));
  }, [isChanged]);

  return (
    <div className="App">
      <div className="top-background">
        <div className="main-content">
          <form onSubmit={handleSubmit}>
            {alert.show && (
              <Alert {...alert} removeAlert={showAlert} list={list} />
            )}
            <h1>TO DO LIST</h1>
            <Author userName={userName} setUserName={setUserName} />
            <Input name={name} setName={setName} />
            <div className="main-buttons">
              <AddTask isEditing={isEditing} />
              <Filter
                list={list}
                setList={setList}
                filterText={filterText}
                setFilterText={setFilterText}
              />
            </div>
          </form>
          {console.log(list, 'list')}
          {list.length > 0 && (
            <div>
              <List
                items={list}
                removeItem={removeItem}
                editItem={editItem}
                completeHandler={completeHandler}
                filterTodos={list}
              />
              <button className="clear-btn" onClick={clearList}>
                Clear items
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
