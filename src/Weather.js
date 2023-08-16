import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJs,
  LineElement,
  CategoryScale,//X
  LinearScale,//Y
  PointElement,
  Legend,
  Tooltip,
  Filler
} from 'chart.js';
import { Component } from 'react';

ChartJs.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler
)

class Weather extends Component {

  state = {
    dataJson: null,
    data: {
      labels: [1,2,3,4,5,6,7],
      datasets: [
        {
          label: 'Temperatura',
          data: [],
          backgroundColor: '#bc6c25',
          borderColor: '#dda15e',
          pointBorderColor: '#dda15e',
          tension: 0.4,
          fill: {
            target: 'origin',
            above: '#bc6c25'
          }
        }
      ]
    },
    options: {
      plugins: {
        legend: {
          font: {
            size: 30
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Data',
            color: '#606c38' // Ustawienie koloru tekstu na osi X
          },
          ticks: {
            color: '#283618', // Ustawienie koloru tekstu wartości na osi X
            font: {
              size: '14px'
            }
          }
        },
        y: {
          min: 0,
          max: 40,
          title: {
            display: true,
            text: 'Temperatura (°C)',
            color: '#606c38' // Ustawienie koloru tekstu na osi Y
          },
          ticks: {
            color: '#283618', // Ustawienie koloru tekstu wartości na osi Y
            font: {
              size: '16px'
            }
          }
        }
      }
    }
  }

  componentDidMount() {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=52.2298&longitude=21.0118&hourly=temperature_2m&forecast_days=3')
      .then(response => response.json())
      .then(dataJson => {
        this.setState({ dataJson });
        // Aktualizacja danych na osi X (Data)
        var newLabels = dataJson.hourly.time;
        newLabels = newLabels.map(label => {
          if (label.includes('00:00')){
            return label.replace('T', ' ');
          } else {
            return label.split('T')[1];
          }
        });
        const updatedData = { ...this.state.data, labels: newLabels };
        // Aktualizacja danych na osi Y (Temperatura)
        const newY = dataJson.hourly.temperature_2m;
        updatedData.datasets[0].data = newY;

        this.setState({ data: updatedData });

        // Aktualizacja skali temperatury dla Y
        const minTemperature = Math.floor(Math.min(...newY));
        const maxTemperature = Math.ceil(Math.max(...newY));
        const updatedOptions = { ...this.state.options }
        updatedOptions.scales.y.min = minTemperature-1;
        updatedOptions.scales.y.max = maxTemperature+2;

        this.setState({ options: updatedOptions });

      })
      .catch(err => console.error("Pa to: "+err));
  }
  
  render() {
    const data = this.state.data;
    const { dataJson } = this.state;
    const options = this.state.options;

    if (!dataJson) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <div style={{color: "black"}} >
          <p>Warszawa</p>
        </div>
        <div style={{
          width: '1200px',
          height: '800px',
          display: 'grid',
          placeItems: 'center'
        }}>
          <Line 
            data = {data}
            options = {options}
            // width = {'800px'}
            // height = {'400px'}
          ></Line>
        </div>
      </div>
    );
  }
}
  
export default Weather;