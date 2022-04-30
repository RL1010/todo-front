import axios from 'axios';
import { useEffect } from 'react';
import './Filter.css';

const api = axios.create({
  baseURL: `http://localhost:5000/tasks`,
  headers: {
    'Content-Type': 'application/json',
  },
});

const Filter = ({
  filterText,
  setFilterText,
  setFilterToDos,
  filterTodos,
  setList,
  list,
}) => {
  const filterHandler = (filteredText) => {
    api.get(`filter/${filteredText}`).then((res) => setList(res.data));
  };
  const statusHandler = (e) => {
    setFilterText(e.target.value);
    console.log('teksti ne fjale' + filterText, 'vlera' + e.target.value);
  };
  useEffect(() => {
    console.log(filterText, 'lrks');
    filterHandler(filterText);
  }, [filterText]);
  return (
    <select onChange={statusHandler} className="filter" value={filterText}>
      <option value="0">All</option>
      <option value="1">Completed</option>
      <option value="2">Uncompleted</option>
    </select>
  );
};

export default Filter;
