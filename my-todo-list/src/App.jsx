import React, { useState } from "react";
import "./App.css";
import Button from "./component/Button";
import Todo from "./component/Todo";

const App = () => {
  // 할 일 목록 상태와 초기값 설정
  const [toDoList, setToDoList] = useState([
    { id: 1, content: "리액트 기초를 공부해봅시다.", title: "리액트 공부하기", isDone: false },
    { id: 2, content: "자바스크립트 기초를 공부해봅시다.", title: "자바스크립트 공부하기", isDone: true },
  ]);

  // 제목과 내용 상태 설정
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 입력값 변경 핸들러
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "content") {
      setContent(value);
    }
  };

  // 추가 버튼 클릭 핸들러
  const handleClickAddButton = () => {
    // 새로운 할 일 목록 생성
    const newToDoList = [...toDoList, { id: toDoList.length + 1, content, title, isDone: false }];
    if (title.trim() === "" || content.trim() === "") return;
    // 할 일 목록 업데이트 및 입력값 초기화
    setToDoList(newToDoList);
    setTitle("");
    setContent("");
  };

  // 삭제 버튼 클릭 핸들러
  const handleClickRemoveButton = (id) => {
    // 선택한 아이디와 일치하지 않는 할 일 목록 필터링
    const newToDoList = toDoList.filter((item) => item.id !== id);

    // 할 일 목록 업데이트
    setToDoList(newToDoList);
  };

  // 완료 버튼 클릭 핸들러
  const handleComplete = (id) => {
    // 선택한 아이디와 일치하는 할 일의 완료 상태 토글
    const updatedToDoList = toDoList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isDone: !item.isDone,
        };
      }
      return item;
    });

    // 할 일 목록 업데이트
    setToDoList(updatedToDoList);
  };

  return (
    <div className="layout">
      <div className="container">
        <div>My Todo List</div>
        <div>React</div>
      </div>
      <div className="add-form">
        <div className="input-group">
          <label className="form-label">제목:</label>
          <input name="title" value={title} onChange={handleChange} className="add-input" />
          <label className="form-label">내용:</label>
          <input name="content" value={content} onChange={handleChange} className="add-input" />
          <div className="add-button">
            <Button clickAddButtonHandler={handleClickAddButton} />
          </div>
        </div>
      </div>
      <div className="list-container">
        <h2 className="list-title">Working.. 🔥</h2>
        <div className="list-working">
          {toDoList
            .filter((item) => !item.isDone)
            .map((item) => (
              <div key={item.id}>
                <Todo item={item} completeFunction={handleComplete} clickRemoveButtonHandler={handleClickRemoveButton} />
              </div>
            ))}
        </div>
        <h2 className="list-title">Done..! 🎉</h2>
        <div className="list-working">
          {toDoList
            .filter((item) => item.isDone)
            .map((item) => (
              <div key={item.id}>
                <Todo item={item} completeFunction={handleComplete} clickRemoveButtonHandler={handleClickRemoveButton} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default App;
