import React from 'react';
import { AnswerObject } from '../App'
import { Wrapper, ButtonWrapper }  from './QuestionCard.styles'

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
    <Wrapper>
        <p className="number">
            Question: {questionNbr} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML = {{__html: question}}/>
        <div>
            {answers.map(answer => (
                <ButtonWrapper 
                    key={answer}
                    correct={userAnswer?.correctAnswer === answer}
                    userClicked={userAnswer?.userAnswer === answer}    
                >
                    <button disabled={userAnswer ? true : false} value={answer} onClick={callBack}>
                        <span dangerouslySetInnerHTML = {{ __html: answer }}/>
                    </button>
                </ButtonWrapper>    
            ))}
        </div>
    </Wrapper>
);

export default QuestionCard;