import usefetch from './hook/useFetch';
import QuestionList from './QuestionList';

const Home = () => {
    
    const {data: questions,isPending, error} = usefetch('https://picnic-ui.herokuapp.com/questions');
    return ( 
        <div className="home">
           { error && <div>{error}</div> }
           { isPending && <div>Loading ...</div> }
           { questions && <QuestionList questions={questions} title="All Questions" />}
        </div>
     );
}

export default Home;