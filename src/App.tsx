import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard';
import { fetchQuizQuestions, Question } from './API';
import { Difficulty, QuestionState } from './API'
import { GlobalStyle, Wrapper } from './App.styles';

export type AnswerObject = {
  question: string;
  userAnswer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

const App = () => {

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [questionNbr, setQuestionNbr] = useState(0);
  const [userAnswers, setUserAnswers] = useState<any[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);


  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestons = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY,
    );
//--- to do error handling ---
    setQuestions(newQuestons);
    setScore(0);
    setUserAnswers([]);
    setQuestionNbr(0);
    setLoading(false);
    console.log('new-> ' + newQuestons);
  };

  const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const userAnswer = event.currentTarget.value;
      const isAnswerCorrect = questions[questionNbr].correct_answer === userAnswer;
      if (isAnswerCorrect) setScore(prev => prev + 1);
      const answerObject : AnswerObject = {
        question: questions[questionNbr].question,
        userAnswer: userAnswer,
        correct: isAnswerCorrect,
        correctAnswer: questions[questionNbr].correct_answer,        
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    
    }

  }

  const nextQuestion = () => {
    
    const nextQuestion = questionNbr + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    }
    else {
      setQuestionNbr(nextQuestion);
    }

  }

  console.log('Questions -> \n' + questions);
  console.log('Question nbr -> ' + questionNbr + '\n');
  console.log('question-> ' + questions + '\n');
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>BaBa-Quiz</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ?  (
          <button className="start" onClick={startQuiz}>
            Start
          </button>
        ) : null}

        {!gameOver ? <p className="score">Score: {score}</p> : null}
        {loading ? <p>Loading Questions ...</p> : null }
        { !loading && !gameOver && (
          <QuestionCard
            questionNbr={questionNbr + 1}
            totalQuestions={TOTAL_QUESTIONS} 
            question={questions[questionNbr].question}
            answers={questions[questionNbr].answers}
            userAnswer={userAnswers ? userAnswers[questionNbr] : undefined}
            callBack={checkAnswer}
          />)}
          {!gameOver && !loading && userAnswers.length === questionNbr + 1 && questionNbr !== TOTAL_QUESTIONS - 1 ? (
            <button className="next" onClick={nextQuestion}>
              Next
            </button>
          ) : null}
      </Wrapper>
    </>);
}

export default App;
