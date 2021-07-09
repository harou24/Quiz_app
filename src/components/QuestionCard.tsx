import React from 'react';
import { AnswerObject } from '../App'

type Props = {
    question: string;
    answers: string[];
    callBack: (event: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNbr: number;
    totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({
    question,
    answers,
    callBack,
    userAnswer,
    questionNbr,
    totalQuestions,
}) => (
    <div>
        <p className="number">
            Question: {questionNbr} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML = {{__html: question}}/>
        <div>
            {answers.map(answer => (
                <div key={answer}>
                    <button disabled={userAnswer ? true : false} value={answer} onClick={callBack}>
                        <span dangerouslySetInnerHTML = {{ __html: answer }}/>
                    </button>
                </div>    
            ))}
        </div>
    </div>
);

export default QuestionCard;