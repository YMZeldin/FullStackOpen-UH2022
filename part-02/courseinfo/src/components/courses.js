// Make output for one of courses
const Course = ({ course }) => {

    // new array of elements course.parts.exercises[i]
    const exercisesNums = course.parts.map (part => part.exercises)
    // console.log(exercisesNums)
  
    return(
      <div>
        <h1>{course.name}</h1>
        <ul>
          {course.parts.map (part => 
            <li key={part.id}>{part.name} - {part.exercises} exercises</li>
          )}
        </ul>
        <p>Total of {exercisesNums.reduce((sum, current) => sum + current, 0)} exercises</p>
      </div>
    )
  }
  
// Make output for all courses
const Courses = ({ courses }) => {
  return(
    <div>
      {courses.map (oneCourse => <Course course = {oneCourse} />)}
    </div>
  )
}

  export default Courses