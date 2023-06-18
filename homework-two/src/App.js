import React from "react";
import { useState, useEffect } from "react";
import Inputs from "./component/inputs";
import Lists from "./component/lists";

const App = () => {
  const [types, setTypes] = useState([]);
  const [items, setItems] = useState({});

  const addType = (type) => {
    if (!types.find((item) => item === type)) setTypes([...types, ...[type]]);
  };

  const addItem = (data) => {
    addType(data.category);
    if (!items[data.category]) items[data.category] = [];
    if (
      items[data.category].find(
        (item) => item.name.toLowerCase() === data.name.toLowerCase()
      )
    ) {
      alert("Item already exists");
      return;
    }
    items[data.category].push(data);
    setItems(items);
  };

  return (
    <>
      <h1>Fridge</h1>
      <Inputs callback={addItem}></Inputs>
      <Lists types={types} items={items}></Lists>
    </>
  );
};

export default App;
