// import logo from './logo.svg';
// import './App.css';

const Header_c = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content_c = (props) => {
  return (
    <p>{props.part} - {props.exercises} exercises</p>
  )
}

const Total_c = (props) => {
  return (
    <p>Total number of exercises - {props.n1 + props.n2 + props.n3}</p>
  )
}
function App() {
  const course = 'Half Stack application development'
  const part01 = 'Fundamentals of React'
  const exercises1 = 10
  const part02 = 'Using props to pass data'
  const exercises2 = 7
  const part03 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header_c course={course} />
      <Content_c part={part01} exercises={exercises1}/>
      <Content_c part={part02} exercises={exercises2}/>
      <Content_c part={part03} exercises={exercises3}/>
      <Total_c n1={exercises1} n2={exercises2} n3={exercises3}/>
    </div>
  );
}

export default App;
