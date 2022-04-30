import { useEffect, useState } from 'react';
import './Author.css';

const url = 'https://swapi.dev/api/people';
const Author = ({ userName, setUserName }) => {
  const [usersArray, setUsersArray] = useState([]);

  const fetchPeople = async () => {
    let response = await fetch(url);
    let data = await response.json();
    setUsersArray(data.results);
  };
  useEffect(() => {
    fetchPeople();
  }, []);
  return (
    <div className="author">
      <label>Author :</label>
      <select
        name="username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        required
      >
        {usersArray &&
          usersArray.map((item, index) => (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Author;
