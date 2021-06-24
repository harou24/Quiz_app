import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard';
import { fetchQuizQuestions } from './API';
import { Difficulty } from './API'
const TOTAL_QUESTIONS = 10;

const App = () => {

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [questionNbr, setQuestionNbr] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY));

  const startQuiz = async () => {

  }

  const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {


  }

  const nextQuestion = () => {

  }

  return (
    <div className="App">
      <h1>Quiz</h1>
      <button className="start" onClick={startQuiz}>
        Start
      </button>
      <p className="score">Score:</p>
      <p>Loading Questions ...</p>
      {/*<QuestionCard
        questionNbr={questionNbr + 1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[questionNbr].question}
        answers={questions[questionNbr].answers}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        callBack={checkAnswer}
      />*/}
      <button className="next" onClick={nextQuestion}>
        Next
      </button>
    </div>);
}

export default App;
