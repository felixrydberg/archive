import { Component } from "react";

export default class Buttons extends Component {
    render() {
        return <>
            <button onClick={() => this.props.callback('ALL')} data-type="all">ALL</button>
            {this.props.types.map((item, index) => <button onClick={() => this.props.callback(item)} key={index} data-type={item}>{item.toUpperCase()}</button>)}
        </> 
    }
}