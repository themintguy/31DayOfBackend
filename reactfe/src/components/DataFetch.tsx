import axios from "axios";
import {  useState } from "react";

const DataFetch = () => {

    interface courses {
        id: number;
        body:string;
        topic:string;
    }

    const [courses, setcourses] = useState<courses[]>([]);
    // const [body, setbody] = useState<string>("");
    // const [topic, settopic] = useState<string>("");


    const getCourses = async ()=> {
        const res = await axios.get("http://localhost:3000/docs/");
        setcourses(res.data);
    };

   



  return (
    <>

    <button
    onClick={getCourses}
    >get courses</button>
      <h1>
        <ul>
          {courses.map((course) => (
            <li key={course.id}>
              <strong>{course.body}</strong> — {course.topic}
            </li>
          ))}
        </ul>
      </h1>
    </>
  );
}

export default DataFetch