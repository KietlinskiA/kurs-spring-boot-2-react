import logo from './img/1.png';
import './App.css';
import Car from './Car';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Się obraca sztanga</p>
        Naucz się Reacta
        <Car></Car>
      </header>
    </div>
  );
}

export default App;
