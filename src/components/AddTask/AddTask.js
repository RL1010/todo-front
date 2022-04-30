import './AddTask.css';

const AddTask = ({ isEditing }) => {
  return (
    <button className="add-btn">{isEditing ? ' Edit task' : 'Add task'}</button>
  );
};

export default AddTask;
