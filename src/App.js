import './App.css';
import Forecaster from './components/Forecaster/Forecaster';
import Logo from './Logo/Logo';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Logo />
      <h1>Forte's Forecaster</h1>
      </header>
      <main>
      <Forecaster />
      </main>
      <footer>
      Page created and maintained by Mark Forte
      </footer>
    </div>
  );
}

export default App;
