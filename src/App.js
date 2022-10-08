
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Footer from "./components/Footer/Footer";
import Home from "./Pages/Home/Home";
import Quiz from "./Pages/Quiz/Quiz";
import Result from "./Pages/Result/Result";
import { useState } from 'react';
import axios from 'axios';

function App() {

    const [name, setName] = useState("");
    const [questions, setQuestions] = useState("");
    const [score, setScore] = useState(0);

    const fetchQuestions = async (category = "", difficulty = "") => {
        const {data } = await axios.get(`https://opentdb.com/api.php?amount=10${
            category && `&category=${category}`
          }${difficulty && `&difficulty=${difficulty}`}&type=multiple`);

          console.log(data);

          setQuestions(data.results);
          
    };
 
    return<>
    <div className='app'> 
   <BrowserRouter>
    <Header/>
    <Routes>
        <Route path="/" element={< Home 
              name={name}
              setName={setName}
              fetchQuestions={fetchQuestions} />}>Home</Route>
        <Route path= "/Quiz" element={< Quiz
        name={name}
        questions={questions}
        score={score}
        setScore={setScore}
        setQuestions={setQuestions} />}>Quiz</Route>
        <Route path="/Result" element={< Result 
        name={name} score={score} />}>Result</Route>
     </Routes>
     <Footer/>
    </BrowserRouter>
    </div>
</>
}

export default App;
