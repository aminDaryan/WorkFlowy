import React, { useEffect, useLayoutEffect, useState } from "react";

// Utils
import { v4 as uuid } from 'uuid';
import styled from 'styled-components';

const ListContainer = styled.div`
  margin-top: 5rem;
  margin-left: 20rem;
  overflow: auto;
`;

const List = styled.ul`
  margin: 0;  
`;

const ListItem = styled.li`
  position: relative;
  margin: 0.6rem;
  margin-left:${props => props.space > 0 ? `${props.space * 2}rem` : '0'};  
`;



const Title = styled.div`
  height: 1.5rem;
  font-size: 1.1rem;
`;

const VerticalLine = styled.div`
  &:before {
      content:"";
      position: absolute;
      top: 50%;
      left: ${props => props.space > 0 ? `-${props.space === 1 ? props.space * 3 : props.space * 2 + 1}rem` : '0'};;    
      transform: translateY(-50%);
      border-left:${props => props.space > 0 ? `1px solid rgba(0,0,0,0.1)` : 'none'};
      height: 150%;
      width: 1px;
  }
`;

const Input = styled.input`
  height: 1.5rem;
  padding: 0;
  outline: none;
  border: none;
  font-size: 1.1rem;
  font-weight: 400 !important;

  &:focus {
      outline: none;
      border: none;
  }
`;

const PlusButton = styled.button`
  color: rgba(0,0,0,0.2);
  background-color: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 50%;
  margin-left: 0.8rem;
  transition: all 0.2s ease-out;

  :hover{
    background-color: rgba(0,0,0,0.1);
  }
`;

function App() {
  const [items, setItems] = useState([{ title: '', space: 0, id: uuid() },]);

  function handleAddItem() {
    setItems(prevState => [...prevState, { title: null, space: 0, id: uuid() }]);
  }

  function handleEditText(event, theId) {
    const theNewItems = [...items].map(item => {
      const theItem = { ...item };
      if (theItem.id === theId) theItem.title = event.target.value;
      return theItem;
    });
    setItems(theNewItems);
  }

  function handleActionOnItem(event, theId, index) {
    const keyCode = event.keyCode;
    if (event.ctrlKey && event.shiftKey && event.key === "Delete") {
      event.preventDefault();
      const theNewItems = [...items].filter(item => (item.id !== theId));
      setItems(theNewItems);
    } else if (keyCode === 13) {
      let theItems = [...items];
      const theItemIndex = theItems.findIndex(item => (item.id === theId));
      theItems.splice(theItemIndex + 1, 0, { title: null, space: 0, id: uuid() });
      setItems(theItems);
    } else if (keyCode === 9 && event.shiftKey) {
      event.preventDefault();
      const theNewItems = [...items].map(item => {
        const theItem = { ...item };
        if (theItem.id === theId && theItem.space > 0) theItem.space = theItem.space - 1;
        return theItem;
      });
      setItems(theNewItems);
    } else if (keyCode === 9 || event.shiftKey) {
      event.preventDefault();
      const theNewItems = [...items].map(item => {
        const theItem = { ...item };
        if (theItem.id === theId && index > 0 && items[index - 1].space >= theItem.space) theItem.space = theItem.space + 1;
        return theItem;
      });
      setItems(theNewItems);
    }
  }

  useLayoutEffect(() => {
    const thePrevItems = JSON.parse(localStorage.getItem('Items'));
    if (thePrevItems) setItems(thePrevItems);
  }, []);

  useEffect(() => {
    localStorage.setItem('Items', JSON.stringify(items));
  }, [items]);


  return (
    <ListContainer>
      <List>
        {items.map((item, index) => {
          let VerticalLines = [];
          for (let i = 1; i <= item.space; i++) {
            VerticalLines.push(i);
          }
          return (
            <ListItem
              key={item.id}
              onKeyDown={e => handleActionOnItem(e, item.id, index)}
              space={item.space}
              id={item.id}
            >
              <Title>
                <Input
                  defaultValue={item.title}
                  onChange={e => handleEditText(e, item.id)}
                  type="text"
                  autoFocus
                />
                {VerticalLines && VerticalLines.length > 0 && VerticalLines.map(space => {
                  return (
                    <VerticalLine key={space} space={space}></VerticalLine>
                  );
                })}
              </Title>
            </ListItem>
          );
        })}
      </List>
      <PlusButton onClick={handleAddItem}>+</PlusButton>
    </ListContainer>
  );
}

export default App;
