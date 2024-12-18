import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Question() {
  const { id } = useParams();
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    // Fetch question details
    fetch(`/api/question/${id}`)
      .then((res) => res.json())
      .then((data) => setQuestion(data));

    // Fetch answers for the question
    fetch(`/api/answer/${id}`)
      .then((res) => res.json())
      .then((data) => setAnswers(data));
  }, [id]);

  return (
    <div>
      <h1>{question.title}</h1>
      <p>{question.body}</p>

      {/* Render Question Media */}
      {question.image && (
        <img
          src={question.image}
          alt="Question Media"
          style={{ maxWidth: "100%" }}
        />
      )}
      {question.audio && (
        <audio controls>
          <source src={question.audio} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}

      <h2>Answers</h2>
      {answers.map((ans) => (
        <div key={ans.id}>
          <p>{ans.text}</p>

          {/* Render Answer Media */}
          {ans.image && (
            <img
              src={ans.image}
              alt="Answer Media"
              style={{ maxWidth: "100%" }}
            />
          )}
          {ans.audio && (
            <audio controls>
              <source src={ans.audio} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}
        </div>
      ))}
    </div>
  );
}

export default Question;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { fetchQuestionDetails, fetchAnswers } from "../utils/api";

// function Question() {
//   const { id } = useParams();
//   const [question, setQuestion] = useState({});
//   const [answers, setAnswers] = useState([]);

//   useEffect(() => {
//     fetchQuestionDetails(id).then(setQuestion);
//     fetchAnswers(id).then(setAnswers);
//   }, [id]);

//   return (
//     <div>
//       <h1>{question.title}</h1>
//       <p>{question.body}</p>
//       <h2>Answers</h2>
//       {answers.map((ans) => (
//         <p key={ans.id}>{ans.text}</p>
//       ))}
//     </div>
//   );
// }

// export default Question;
