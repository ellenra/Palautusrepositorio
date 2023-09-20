const Header = ({ name }) => <h2>{name}</h2>

const Total = ({ parts }) => {
  const sum = parts.reduce((x, y) => {
    console.log('testi:', x, y)
    return x + y.exercises
  }, 0)
  console.log(sum)
  return (
    <p>
      <strong>total of {sum} exercises</strong>
    </p>
  )
}

const Part = ({ part, exercises }) => {
  return (
    <p>
      {part} {exercises}
    </p>
  )
}

const Content = ({ parts }) => {
  return (
    <>
    {parts.map((part) => (
    <Part key={part.id} part={part.name} exercises={part.exercises} />
    ))}
    </>
  )
}

const Course = ({course}) => {
  return (
    <>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
    </>
  )
}

export default Course;
