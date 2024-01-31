const Header = ({ name }: { name: string }): JSX.Element => (
  <h1>{name}</h1>
);

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartExtension extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartExtension {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartExtension {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartExtension {
  requirements: Array<string>;
  kind:"special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

const Part = ({ course }: { course: CoursePart }): JSX.Element => {
  switch (course.kind) {
    case "basic":
      return <p>{course.description}</p>
    case "group":
      return <p>Project exercises {course.groupProjectCount}</p>
    case "background":
      return <div><p>{course.description}</p> 
                  <p>{course.backgroundMaterial}</p>
             </div>
    case "special":
      return <div>
                <p>{course.description}</p>
                <p>Required skills: {course.requirements}</p>
             </div>
  }
};

const Content = ({ courseParts }: { courseParts: CoursePart[]}): JSX.Element => {
  return (
    <div>
      {courseParts.map((course, index) => (
        <div key={index}>
            <h3>{course.name} {course.exerciseCount}</h3>
          <Part course={course} />
        </div>
      ))}
    </div>
  )
};

const Total = ({ totalExercises }: { totalExercises: number }): JSX.Element => (
  <u>Number of exercises {totalExercises}</u>
);


const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special",
    }
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <br />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;