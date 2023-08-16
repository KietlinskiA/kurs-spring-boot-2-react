import React, { Component } from 'react';

class Dog extends Component{
  
  dogImage = "";


  componentDidMount() {
    fetch('https://random.dog/woof.json')
      .then(response => response.json())
      .then(data => {
        this.setState({data});
        this.dogImage = data.url;
        console.log(data.url)
      }) 
      .catch(error => {
        // Ten blok .catch zostanie wywołany w przypadku błędu
        console.error('Pa to: ', error);
      });
  }

  render() {
    const extension = this.dogImage.split('.').pop(); // Pobranie rozszerzenia

    return (
      <div>
        {extension === 'mp4' ? (
          <video autoPlay loop>
            <source src={this.dogImage} type="video/mp4" style={{width: 400 +"px", height:400+"px"}} />
            Przeglądarka nie obsługuje odtwarzania wideo.
          </video>
        ) : (
          <img src={this.dogImage} alt="Dog" style={{width: 400 +"px", height:400+"px"}} />
        )}

      </div>
    );
  }


}

export default Dog;
