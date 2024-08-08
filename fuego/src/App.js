import { useState } from "react";

const initialKanditade = [
  {
    id: 1,
    name: "Sabrina",
    image: "https://i.pravatar.cc/41?u=118830",
    description: "A talented contemporary dancer.",
    skills: ["Contemporary", "Jazz"],
  },
  {
    id: 2,
    name: "Ohomear",
    image: "https://i.pravatar.cc/42?u=933392",
    description: "Expert in hip-hop and breakdance.",
    skills: ["Hip-hop", "Breakdance"],
  },
  {
    id: 3,
    name: "Melinda",
    image: "https://i.pravatar.cc/44?u=499466",
    description: "Specializes in ballet and modern dance.",
    skills: ["Ballet", "Modern"],
  },
  {
    id: 4,
    name: "Ploppy",
    image: "https://i.pravatar.cc/44?u=499262",
    description: "Versatile dancer with a passion for all styles.",
    skills: ["All Styles"],
  },
];
function App() {
  const teachers = initialKanditade;

  return (
    <>
      <label>Want to be Bashata proo? </label>

      <ListOfKandidate teacher={teachers} />

      <FuegoDanceInstruction teachers={teachers} />
      <Message teachers={teachers} />
    </>
  );
}
function Button({ children, ...props }) {
  return (
    <button className="button" {...props}>
      {children}
    </button>
  );
}

function ListOfKandidate({ teacher }) {
  return (
    <>
      <ul className="contanier">
        {teacher.map((fr) => (
          <Kandidates key={fr.id} teacher={fr} />
        ))}
      </ul>
    </>
  );
}

function Kandidates({ teacher }) {
  if (!teacher || !Array.isArray(teacher.skills)) {
    return null;
  }
  return (
    <div>
      <li>
        <img src={teacher.image} alt={teacher.name} />
        <h3>{teacher.name}</h3>
        <p>{teacher.description}</p>
        <ul>
          {teacher.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </li>
    </div>
  );
}

function FuegoDanceInstruction({ teachers = [] }) {
  const [selectedTeacherId, setSelectedTeacherId] = useState([]);

  const selectedTeacher = teachers.find(
    (teacher) => teacher.id === selectedTeacherId
  );

  return (
    <>
      <div>
        {selectedTeacher && (
          <>
            <h2>{selectedTeacher.name}</h2>
            <img
              className="img"
              src={selectedTeacher.image}
              alt={selectedTeacher.name}
            />

            <p>{selectedTeacher.description}</p>
          </>
        )}
      </div>
      <div>
        {teachers.map((teacher) => (
          <Button
            key={teacher.id}
            onClick={() => setSelectedTeacherId(teacher.id)}
          >
            Book Instructer {teacher.name}
          </Button>
        ))}
      </div>
      {/* Skicka selectedTeacher som prop till Message-komponenten */}
      <Message onSelectedTeacher={selectedTeacher} />
    </>
  );
}

function Message({ onSelectedTeacher }) {
  // Kontrollera om en lärare är vald och vilken lärare det är
  const renderMessage = () => {
    if (!onSelectedTeacher) {
      return;
    }

    // Basera meddelandet på lärarens namn eller andra egenskaper
    switch (onSelectedTeacher.name) {
      case "Sabrina":
        return (
          <p>Thank you for booking Sabrina! Looking forward to your session!</p>
        );
      case "Ohomear":
        return <p>Thanks for choosing Ohomear! Get ready to groove!</p>;
      case "Melinda":
        return <p>Thank you for selecting Melinda! Ballet awaits!</p>;
      case "Ploppy":
        return <p>Thanks for booking Ploppy! Enjoy diverse styles!</p>;
      default:
        return <p>Thank you for booking! Looking forward to seeing you!</p>;
    }
  };

  return <div>{renderMessage()}</div>;
}
export default App;
