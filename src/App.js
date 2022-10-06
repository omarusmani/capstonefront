import './App.css';
import {React, useEffect, useState } from 'react';
import Axios from 'axios';
import { Button } from '@mui/material';
import {Link} from "@mui/material"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';




function App() {

  
  const [user, setUser] = useState([]);
  const [isHidden,setisHidden]=useState(false)
  const [isSigned,setisSigned]=useState(false)

  const [users, setUsers] = useState({ email: "",
                                       first_name: "",
                                       id: 0,
                                       last_name: "",
                                       username: ""});
  const [posts, setPosts] = useState({});
  const [password, setPassword] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [post,setPost]=useState("");
  const [title,setTitle]=useState("");



  
  const client = Axios.create({
  baseURL: "https://cap-stone-brown.vercel.app",
  timeout: 1000,
  });


  // GET with Axios
const fetchPost = async (a) => {
      try {
        let response = await client.get(`/post/${a}`);
        setPosts(response.data);
      } catch (error) {
        console.log(error);
     }
     };
  
const fetchUsers = async () => {
     try {
       let response = await client.get(`/user/${username}`);
       setUsers(response.data);
     } catch (error) {
       console.log(error);
    }
  };
 


 const sendResults=()=>{

 }

 
 const handleLogin=(e)=>{
  // e.preventDefault();
  fetchUsers()
  fetchPost(0)
  setisHidden(!isHidden)

 } 
 const handleSignup=(e)=>{
  e.preventDefault()
  setisSigned(!isSigned)

 }
console.log(users,posts)
// console.log(users,posts,last,first,email,post,title,username,password)
const clearState=(e)=>{
  setUsername("")
  setPassword("")
  setFirst("")
  setLast("")
  setEmail("")
  setPost("")
  setTitle("")
  setPosts({})
  setUsers({})
}
  return (
    <div className="App">
    
      {!isHidden&&<p><h1 className="greet">Welcome to Your Diary</h1><div className="center">
          <Link onClick={(e) => (handleLogin(e))} underline="none" to="">
            <Button className="greet" variant="text">Login</Button>
          </Link>
          <Link href="#" underline="none" to="">
            <Button onClick={(e) => (handleSignup(e))((e)=>handleLogin(e))} className="greet" variant="text">Signup</Button>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField onChange={(e)=> setUsername(e.target.value)}  id="User Name" label="username" variant="filled" />
      <TextField onChange={(e) => setPassword(e.target.value)} id="Password" label="password" variant="filled" /> 
    </Box>
          </Link>
        </div></p>}
          {isHidden&&<p><h1 className="greet">Welcome to Your Diary</h1><div className="center">
          <Link underline="none" to="">
            <Button onClick={()=>(handleLogin())((clearState()))}  className="greet" variant="text">Logout</Button>
          </Link>
          <Link underline="none" to="">
            <Button   className="greet" variant="text">Delete Account</Button>
          </Link>
          <br/>
          <TextField onChange={(e)=>setTitle(e.target.value)} fullWidth label="Title" id="fullWidth" />
          <br/>
          <br/>
          <TextareaAutosize
          onChange={(e)=>setPost(e.target.value)} 
          rows="6" cols="87"
          aria-label="Entry"
          placeholder="Entry"
          id="Entry"
            />
          <Link underline="none" to="">
            <Button onClick={(e)=>sendResults()}  className="greet" variant="text">Upload Entry</Button>
          </Link>
          <br/> 
          {/* users need to be mapped by their posts */}
            <ul>
              
              <li></li>
            </ul>

        </div></p>}

        {(!isSigned&&!isHidden)&&<p>
          <Link underline="none" to="">
          <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      >
            <TextField onChange={(e) => setFirst(e.target.value)} id="First_Name" label="First Name" variant="filled" />
            <TextField onChange={(e) => setLast(e.target.value)} id="Last_Name" label="Last Name" variant="filled" /> 
            <TextField onChange={(e) => setEmail(e.target.value)}id="email" label="email" variant="filled" /> 
          </Box>
          </Link>
        </p>}

    
     
    </div>
  );
}

export default App;
