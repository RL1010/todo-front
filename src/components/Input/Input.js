import './Input.css';
const Input = ({ name, setName }) => {
  return (
    <input
      className="search"
      type="text"
      placeholder="ex. learn react"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  );
};

export default Input;
