import React, { Component } from 'react';

class Car extends Component{
  
  state = {
    data: []
  }

  componentDidMount() {
    fetch('http://localhost:8080/cars')
    .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({data});
    })
  }

  render() {
    return (
      <div>
        <h2>Iteracja po tablicy</h2>
        <ul>
          {this.state.data.map((item, index) => (
            <li key={index}>{item.id}, {item.mark}, {item.model}, {item.color}</li>
          ))}
        </ul>
        Marka: {this.state.data[1]?.mark}, Model: {this.state.data[1]?.model}, Kolor: {this.state.data[1]?.color}
      </div>
    );
  }


}

export default Car;
