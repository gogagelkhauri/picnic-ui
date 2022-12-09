 import { Link } from "react-router-dom";

const QuestionList  = ({questions,title,handleDelete}) => {
    return ( 
        <div className="question-list">
            <h2>{title}</h2>
            {
                questions.map(question => (
                    <Link to={`/questions/${question}`}>
                        <div className="question-preview">
                            {question}
                        </div>
                    </Link>
                ))
            }
        </div>
     );
}

export default QuestionList ;