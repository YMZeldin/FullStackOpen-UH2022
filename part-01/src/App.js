import logo from './logo.svg';
import './App.css';

/* To render a React component, start it's name with an uppercase letter */
const Hello_c = (props) => {
  return (
    <div>
      <p>Hello world!<br/>It is {Date().toString()}</p>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}

function App() {
  const name = "Ann"
  const age = 29
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        console.log("Fist Hello_c")
        <Hello_c name="Peter" age="34" />
        <Hello_c name={name} age={age} />
      </header>
    </div>
  );
}

export default App;
