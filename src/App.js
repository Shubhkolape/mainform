import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css'
import problem from './problem.png'
function App() {


  const [Email, setemail]=useState('');
  const [SessionId, setSessionId]=useState('');
  const [Issue, setIssue]=useState('');
  const [data, setData]=useState([]);

  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

    useEffect(()=>{
      const storedEmail = localStorage.getItem('userEmail')
      if(storedEmail){
        setemail(storedEmail);
      }
    },[])

    useEffect(()=>{
      const storedSessionId = sessionStorage.getItem('df-messenger-sessionID')
      if(storedSessionId){
        setSessionId(storedSessionId)
      }
    },[])


  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(Email,SessionId,Issue);

    const data = {
      Email,SessionId,Issue
    }
    axios.post('https://sheet.best/api/sheets/a29f63ad-148f-4a21-ab45-f56c8697afee',data).then(response=>{
      console.log(response);
      setemail('');
      setSessionId('');
      setIssue('');
      getData()
    })
  }


  // getting data function

  const getData=()=>{
    axios.get('https://sheet.best/api/sheets/a29f63ad-148f-4a21-ab45-f56c8697afee').then((response)=>{
      console.log(response.data);
      setData(response.data);
    }).catch((error) => {
      console.error('Error fetching data:', error);
    })
  }


  useEffect(() => {
    getData();
  }, []);


  return (
    <div>
      <div onClick={toggleChatbot} className='circle' >
        <img src={problem} alt="issue"   />
      </div>

      {isChatbotOpen && (
        <div className='main-div' >
         <div className="ultra-main">
    <div className="main">
      <h1>Q Bot Report Issue </h1>
      <h3>Enter your Issue</h3>
      <form autoComplete="off"
      onSubmit={handleSubmit}>


        <label htmlFor="first">
          Email:
        </label>
        <input
          type="email"
          id="first"
          onChange={(e)=>setemail(e.target.value)}
          placeholder='Enter your Email'
          name="first"
          value={Email}
        />

        <label htmlFor="Sessoon ID ">
        Sessoon ID :
        </label>
        <input
          type="text"
          id="Sessoonid"
          name="Sessoonid"
          placeholder="Enter your Sessoonid"
          value={SessionId}
          onChange={(e)=>setSessionId(e.target.value)}
        />
          <label>Issue</label>
        <textarea id="w3review" name="w3review" rows="4" cols="50"   onChange={(e)=>setIssue(e.target.value)}
          value={Issue}     placeholder='Enter your Issue' ></textarea>

        <div className="wrap">
          <button type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
        </div>
        </div>
      )}
    </div>
  );
}

export default App;
