const Todo = ({ item, completeFunction, clickRemoveButtonHandler }) => {
  const { id, content, title, isDone } = item;

  const handleComplete = () => {
    completeFunction(id);
  };

  return (
    <div className="todo-component-style">
      <div>
        <h3>{title}</h3>
        <p>{content}</p>
      </div>
      <div className="button-container">
        <button className="todo-complete-button" onClick={handleComplete}>
          {/* 취소/완료 버튼 렌더링, 완료 상태에 따라 텍스트가 변경됨 */}
          {isDone ? "취소" : "완료"}
        </button>
        <button className="delete-Button" onClick={() => clickRemoveButtonHandler(id)}>
          {/* 삭제 버튼 렌더링 */}
          삭제하기
        </button>
      </div>
    </div>
  );
};

export default Todo;
