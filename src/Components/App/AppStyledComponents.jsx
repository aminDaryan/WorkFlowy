
import styled from 'styled-components';

export const ListContainer = styled.div`
  margin-top: 5rem;
  margin-left: 20rem;
  overflow: auto;
`;

export const List = styled.ul`
  margin: 0;  
`;

export const ListItem = styled.li`
  position: relative;
  margin: 0.6rem;
  margin-left:${props => props.space > 0 ? `${props.space * 2}rem` : '0'};  
`;



export const Title = styled.div`
  height: 1.5rem;
  font-size: 1.1rem;
`;

export const VerticalLine = styled.div`
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

export const Input = styled.input`
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

export const PlusButton = styled.button`
  color: rgba(0,0,0,0.2);
  background-color: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 50%;
  margin-left: 0.8rem;
  transition: all 0.2s ease-out;

  &:hover{
    background-color: rgba(0,0,0,0.1);
  }
`;