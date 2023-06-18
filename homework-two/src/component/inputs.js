import { useState } from "react";

const Inputs = (props) => {

    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');

    const onSubmit = (event) => {
        event.preventDefault();
        props.callback({
            name: name,
            amount: amount,
            category: category,
            date: date,
        })
    }

  return (<form onSubmit={onSubmit}>
    <input required onChange={event => setName(event.target.value)} type="text" value={name} placeholder="name"></input>
    <input required onChange={event => setAmount(event.target.value)} type="number" value={amount} placeholder="amount"></input>
    <input required onChange={event => setCategory(event.target.value)} type="text" value={category} placeholder="category"></input>
    <input required onChange={event => setDate(event.target.value)} type="date" value={date} placeholder="date"></input>
    <button type="submit">Add</button>
  </form>);
};

export default Inputs;
