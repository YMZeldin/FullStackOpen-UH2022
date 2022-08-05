// import logo from './logo.svg';
// import './App.css';

const Header = (props) => {
  // console.log(props)
  return <h1>{props.course}</h1>
}

const Content = (props) => {
  // console.log(props.parts)
  return (
    <div>
      <p>{props.parts[0].name} - {props.parts[0].exercises} exercises</p>
      <p>{props.parts[1].name} - {props.parts[1].exercises} exercises</p>
      <p>{props.parts[2].name} - {props.parts[2].exercises} exercises</p>  
    </div>
  )
}

const Total = (props) => {
  return (
    <p>Total number of exercises - {props.parts[0].exercises + 
      props.parts[1].exercises + props.parts[2].exercises}</p>
  )
}

function App() {
  const course = {
    name: 'Half Stack application development',
    parts: [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises:  7
    },
    {
    name: 'State of a component',
    exercises:  14
    }
  ]
}

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App;
