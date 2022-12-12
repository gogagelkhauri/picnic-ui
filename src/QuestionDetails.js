import useFetch from "./hook/useFetch";
import { useParams } from "react-router-dom";

const QuestionDetails = () => {
    const {title} = useParams();
    const {data: question, error, isPending} = useFetch('https://picnic-ui.herokuapp.com/questions/' + title);

    const sumValues =  (obj)  => {
        return obj.reduce((acc, value) => acc + parseFloat(value.Count), 0);
    }

    // const getAnswers = (data) => {
    //     return [...new Set(data.map((item) => item["Answer"]))]
    // }

    const getAnswersObject = (data) => {
        let answers = [...new Set(data.map((item) => item["Answer"]))];
        let result = answers.map(answer => {
            return {
                [answer] : data.filter(item => item.Answer === answer).reduce((acc, value) => acc + parseFloat(value.Count), 0)
            }
        })

        return result;
    }

    const getSegmentTypesObject = (data) => {
        let segmentTypes = [...new Set(data.map((item) => item["Segment Type"]))];
        let result = segmentTypes.map(segmentType => {
            return {
                [segmentType] : data.filter(item => item["Segment Type"] === segmentType).reduce((acc, value) => acc + parseFloat(value.Count), 0)
            }
        })

        return result;
    }

    const getSegmentDescriptionsObject = (data) => {
        let segmentDescs = [...new Set(data.map((item) => item["Segment Description"]))];
        let result = segmentDescs.map(segmentDesc => {
            return {
                [segmentDesc] : data.filter(item => item["Segment Description"] === segmentDesc).reduce((acc, value) => acc + parseFloat(value.Count), 0)
            }
        })

        return result;
    }

    const getSegmentDescWithAnswers = (desc) => {
        let answers = [...new Set(question.data.map((item) => item["Answer"]))];
        let result = answers.map(answer => {
            return {
                [answer] : question.data.filter(item => item.Answer === answer && item["Segment Description"] === desc).reduce((acc, value) => acc + parseFloat(value.Count), 0)
            }
        })
        return result;
    }

    const getSegmentTypesWithAnswers = (type) => {
        let answers = [...new Set(question.data.map((item) => item["Answer"]))];
        let result = answers.map(answer => {
            return {
                [answer] : question.data.filter(item => item.Answer === answer && item["Segment Type"] === type).reduce((acc, value) => acc + parseFloat(value.Count), 0)
            }
        })
        return result;
    }

    return ( 
       
        <div className="blog-details">
            { isPending && <div>Loading...</div> }
            { error && <div>{ error }</div> }
            { question && (
                <article>
                    <div>
                        <h2>Question</h2>
                        <p>{ question.question } </p>
                        <p>all respodents : {sumValues(question.data)}</p>
                    </div>
                    
                    <hr />  
                    <div>
                        <h2>Answers</h2>
                        <div>
                            {getAnswersObject(question.data).map((item) => (
                                Object.entries(item).map(([key, value]) => { 
                                    return <span className="answers">{key} : {value}</span>
                                })
                            ))
                            }
                        </div>
                    </div>

                    <div>
                        <h2>Segment Types</h2>
                        <div>
                        <ul className="segmentDesc-ul">
                            {getSegmentTypesObject(question.data).map((item) => (
                                Object.entries(item).map(([key, value]) => { 
                                    return (
                                        <li className="answers">
                                             <span className="segment-desc">{key}</span> : <span className="c-green">{value}</span>
                                            <div>
                                                {getSegmentTypesWithAnswers(key).map((item) => (
                                                    Object.entries(item).map(([key, value]) => { 
                                                        return <span className="answers">{key} : {value}</span>
                                                    })
                                                ))
                                                }
                                            </div>
                                        </li>
                                    )
                                })
                            ))
                            }
                        </ul>
                            
                        </div>
                    </div>

                    <hr />

                    <div>
                        <h2>Segment Descriptions</h2>
                        <div>
                            <ul className="segmentDesc-ul">
                                {getSegmentDescriptionsObject(question.data).map((item) => (
                                    Object.entries(item).map(([key, value]) => { 
                                        return (
                                            <li className="answers">
                                                <span className="segment-desc">{key}</span> : <span className="c-green">{value}</span>
                                                <div>
                                                  
                                                    {getSegmentDescWithAnswers(key).map((item) => (
                                                        Object.entries(item).map(([key, value]) => { 
                                                            return <span className="answers">{key} : {value}</span>
                                                        })
                                                    ))
                                                    }
                                                </div>
                                            </li>
                                        )
                                    })
                                ))
                                }

                            </ul>
                        </div>
                    </div>

                    <hr />

                </article>
            )}
        </div>
    );
}
 
export default QuestionDetails;