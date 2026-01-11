"use client";

import { useEffect, useState } from "react";

type AnswerChoice = {
  id: string;
  index: number;
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
      const response = await fetch(
        "https://api.boilerexams.com/questions/d44531f1-3cf7-404d-bd10-e9a786484b8a"
      );
      const data = await response.json();
      setQuestion(data);
    }

    fetchQuestion();
  }, []);

  if (!question) {
    return <p className="p-10">Loading question...</p>;
  }

  return (
    <main className="p-10 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Practice Question</h1>

      <p className="mb-6">{question.data.body}</p>

      <div className="flex flex-col gap-3">
        {question.data.answerChoices.map((choice) => (
          <button
            key={choice.id}
            className="border rounded p-3 text-left hover:bg-gray-100"
          >
            {choice.body}
          </button>
        ))}
      </div>
    </main>
  );
}
