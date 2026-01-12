"use client"; // Needed because we use useState and useEffect

import { useState, useEffect } from "react";

type AnswerChoice = {
  id: string;
  body: string;
};

type Question = {
  data: {
    body: string;
    answerChoices: AnswerChoice[];
  };
};

export default function Home() {
  const [question, setQuestion] = useState<Question | null>(null);

  useEffect(() => {
    async function fetchQuestion() {
      const res = await fetch(
        "https://api.boilerexams.com/questions/d44531f1-3cf7-404d-bd10-e9a786484b8a"
      );
      const data = await res.json();
      setQuestion(data);
    }

    fetchQuestion();
  }, []); // empty array = run once

  if (!question) return <p>Loading question...</p>;

  return (
    <main style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ fontWeight: "bold", marginBottom: "10px" }}>Practice Question</h1>

      <p style={{ marginBottom: "20px" }}>{question.data.body}</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {question.data.answerChoices.map((choice) => (
          <button
            key={choice.id}
            style={{
              padding: "10px",
              border: "1px solid #000",
              textAlign: "left",
              cursor: "pointer",
            }}
          >
            {choice.body}
          </button>
        ))}
      </div>
    </main>
  );
}
