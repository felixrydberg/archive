import { Component } from 'react';

class Fridge extends Component {
  categories = ['Kött', 'Vätska', 'Frukt'];
  items = {
    Kött: [],
    Vätska: [],
    Frukt: [],
  };
  options = this.categories.map((category, i) => {return <option key={i} value={category}>{category}</option>});
  lists = Object.keys(this.items).map((category, i) => {
    const list = this.items[category].map((item) => {
        return <li>
            <ul>                        
                <li>{item.name}</li>
                <li>{item.category}</li>
                <li>{item.date}</li>
                <li>{item.amount}</li>
            </ul>
            <button onClick={this.removeItem}>X</button>
        </li>
    });
    console.log(list)
    return <ul id={category} key={i}>{list}</ul>
  })
  constructor() {
    super();
    this.state = {
      name: '',
      category: this.categories[0],
      date: '',
      amount: '',
    };
    this.submit = this.submit.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeSelect = this.onChangeSelect.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }
  render() {
    return (
      <figure>
        <form onSubmit={this.submit}>
          <input required type='text' value={this.state.name} onChange={this.onChangeName} placeholder='Produktnamn'></input>
          <select required defaultValue={this.categories[0]} onChange={this.onChangeSelect}>
            {this.options}
          </select>
          <input required type='date' value={this.state.date} onChange={this.onChangeDate}></input>
          <input required type='number' value={this.state.amount} onChange={this.onChangeAmount} placeholder='Amount'></input>
          <button type='submit'>Lägg till</button>
        </form>
        <figure>
            {this.state.name}
            {this.state.category}
            {this.state.date}
            {this.state.amount}
        </figure>
      </figure>
    );
  }
  submit(event) {
    event.preventDefault();
    for (const key in this.items) {
        if (this.items[key].some((item) => item.name === this.state.name)) alert('Item already in cart');
        else {
          const data = {
            name: this.state.name,
            category: this.state.category,
            date: this.state.date,
            amount: this.state.amount,
          };
          this.items[this.state.category].push(data);
        }
    }
    console.log(this.lists)
    console.log(this.items)
  }
  onChangeName(event) {
    this.setState({ name: event.target.value });
  }
  onChangeSelect(event) {
    this.setState({ category: event.target.value });
  }
  onChangeDate(event) {
    this.setState({ date: event.target.value });
  }
  onChangeAmount(event) {
    this.setState({ amount: event.target.value });
  }
  removeItem(event) {
    event.target.closest('li').remove();
  }
}

export default Fridge;
