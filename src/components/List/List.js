import { FaEdit, FaTrash, FaCheck } from 'react-icons/fa';
import './List.css';
const List = ({ removeItem, editItem, completeHandler, filterTodos }) => {
  return (
    <div className="todo-list">
      {filterTodos.map((item, idx) => {
        const { id, title } = item;
        return (
          <article
            key={idx}
            className={`todo-item ${item.status === 1 ? 'completed' : ''}`}
          >
            <div className="first-part">
              <button
                className="checked-btn"
                onClick={() => completeHandler(item, idx)}
              >
                <FaCheck />
              </button>
              <p className="title">{title}</p>
            </div>
            <div className="btn-container">
              <button
                className="edit-btn"
                type="button"
                onClick={() => editItem(item)}
              >
                <FaEdit />
              </button>

              <button
                className="delete-btn"
                type="button"
                onClick={() => removeItem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
