import { useState } from "react";
import axios from "axios";

function App() {
  const [length, setLength] = useState(0);
  const [paragraph, setParagraph] = useState("");

  const handleChange = (e) => {
    setLength(Number(e.target.value));
  };

  const generateParagraph = async () => {
    let words = [];

    for (let i = 0; i < length; i++) {
      const wordLength = Math.floor(Math.random() * (8 - 3 + 1)) + 3;

      try {
        const res = await axios.get(`http://localhost:3000/random-word/${wordLength}`);
        words.push(res.data.word);
      } catch (err) {
        console.error("Error fetching word", err);
      }
    }

    setParagraph(words.join(" "));
  };

  return (
    <div>
      <h1>Paragraph Generator</h1>
      <input
        type="number"
        placeholder="Enter number of words"
        value={length}
        onChange={handleChange}
      />
      <button onClick={generateParagraph}>Generate</button>

      <p style={{ marginTop: "20px" }}>{paragraph}</p>
    </div>
  );
}

export default App;
