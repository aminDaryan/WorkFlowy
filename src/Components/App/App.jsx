import React, { useEffect, useLayoutEffect, useState } from "react";

// Utils
import { v4 as uuid } from 'uuid';

// Components
import * as S from './AppStyledComponents';

function App() {
  const [items, setItems] = useState([]);

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

  function handleActionOnItem(event, theId) {
    const keyCode = event.keyCode;
    if (event.ctrlKey && event.shiftKey && event.key === "Delete") {
      event.preventDefault();
      const theNewItems = [...items].filter(item => (item.id !== theId));
      setItems(theNewItems);
    } else if (keyCode === 13) {
      event.preventDefault();
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
      let theItems = [...items];
      const theNewItems = theItems.map(item => {
        const theItemIndex = theItems.findIndex(item => (item.id === theId));
        const theItem = { ...item };
        if (theItem.id === theId && theItemIndex > 0 && items[theItemIndex - 1].space >= theItem.space) theItem.space = theItem.space + 1;
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
    <S.ListContainer>
      <div>
        <S.List>
          {items.map((item) => {
            let VerticalLines = [];
            for (let i = 1; i <= item.space; i++) {
              VerticalLines.push(i);
            }
            return (
              <S.ListItem
                key={item.id}
                onKeyDown={e => handleActionOnItem(e, item.id)}
                space={item.space}
                id={item.id}
              >
                <S.Title>
                  <S.Input
                    defaultValue={item.title}
                    onChange={e => handleEditText(e, item.id)}
                    type="text"
                    autoFocus
                  />
                  {VerticalLines?.length > 0 && VerticalLines.map(space => {
                    return (
                      <S.VerticalLine key={space} space={space}></S.VerticalLine>
                    );
                  })}
                </S.Title>
              </S.ListItem>
            );
          })}
        </S.List>
      </div>
      <div>
        <S.PlusButton onClick={handleAddItem}>+</S.PlusButton>
      </div>
    </S.ListContainer>
  );
}

export default App;
