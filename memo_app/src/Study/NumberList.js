import React from 'react';

function ListItem(props) {
  const value = props.value;
  return (
    <li>
      {value}
    </li>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  const numberList = numbers.map((number) =>
    <ListItem key={number.toString()} value={number}/>
  );
  return (
    <ul>{numberList}</ul>
  );  
}

export default NumberList;