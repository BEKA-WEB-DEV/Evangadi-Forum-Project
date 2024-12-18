import React, { useState } from "react";
import { useParams } from "react-router-dom";

function Answer() {
  const { id } = useParams(); // Question ID
  const [answerText, setAnswerText] = useState("");
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("text", answerText);
    if (image) formData.append("image", image);
    if (audio) formData.append("audio", audio);

    // Post the answer with text, image, and audio
    const response = await fetch(`/api/answer`, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    console.log(result);
    alert("Answer submitted successfully!");
  };

  return (
    <div>
      <h1>Submit Your Answer</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write your answer here..."
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
          required
        />

        <label>Upload Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <label>Upload Audio:</label>
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setAudio(e.target.files[0])}
        />

        <button type="submit">Submit Answer</button>
      </form>
    </div>
  );
}

export default Answer;

// import React, { useState } from "react";
// import { useParams } from "react-router-dom";

// function Answer() {
//   const { id } = useParams(); // Question ID
//   const [answer, setAnswer] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log({ questionId: id, text: answer });
//     // API call logic here
//   };

//   return (
//     <div>
//       <h1>Submit Your Answer</h1>
//       <form onSubmit={handleSubmit}>
//         <textarea
//           placeholder="Write your answer here..."
//           value={answer}
//           onChange={(e) => setAnswer(e.target.value)}
//           required
//         />
//         <button type="submit">Submit Answer</button>
//       </form>
//     </div>
//   );
// }

// export default Answer;
