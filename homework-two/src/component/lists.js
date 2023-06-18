import Ul from "./lists/ul";
import Buttons from "./lists/buttons";
import { useState } from "react";

const Lists = (props) => {
  const [currentDisplay, setDisplay] = useState('ALL')
  const showType = (type) => {
    setDisplay(type);
  }
  return <>
    <div class="buttons">
      <Buttons types={props.types} callback={showType}></Buttons>
    </div>
    <div class="lists">
      {props.types.map((type, index) => {
        if(currentDisplay === 'ALL') return <Ul key={index} item={props.items[type]} type={type}></Ul>
        if(currentDisplay === type) return <Ul key={index} item={props.items[type]} type={type}></Ul>
        return <></>
      })}
    </div>

  </>;
};

export default Lists;
