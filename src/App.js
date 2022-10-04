import './App.css';
import {React, useEffect, useState } from 'react';
import Axios from 'axios';
import { Button } from '@mui/material';
import {Link} from "@mui/material"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';



function App() {

  
  const [user, setUser] = useState([]);
  const [isHidden,setisHidden]=useState(false)
  const [isSigned,setisSigned]=useState(false)


  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  
  const client = Axios.create({
  baseURL: "https://cap-stone-3ag3hcts4-omarusmani.vercel.app" 
  });
  // GET with Axios
  useEffect((e) => {
     const fetchPost = async () => {
      try {
        let response = await client.get(`/post`);
        setPosts(response.data);
      } catch (error) {
        console.log(error);
     }
     };
     fetchPost();
  }, []);

  useEffect((e) => {
    const fetchUsers = async () => {
     try {
       let response = await client.get(`/user`);
       setUsers(response.data);
     } catch (error) {
       console.log(error);
    }
    };
    fetchUsers();
 }, []);

 const handleLogin=(e)=>{
  e.preventDefault()
  setisHidden(!isHidden)

 } 
 const handleSignup=(e)=>{
  e.preventDefault()
  setisSigned(!isSigned)

 


 }

console.log(users,posts)
  return (
    <div className="App">
    
      {!isHidden&&<p><h1 className="greet">Welcome to Your Diary</h1><div className="center">
          <Link onClick={(e) => handleLogin(e)} underline="none" to="">
            <Button className="greet" variant="text">Login</Button>
          </Link>
          <Link href="#" underline="none" to="">
            <Button onClick={(e) => handleSignup(e),(e)=>handleLogin(e)} className="greet" variant="text">Signup</Button>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="User Name" label="username" variant="filled" />
      <TextField id="Password" label="password" variant="filled" /> 
    </Box>
          </Link>
        </div></p>}
          {isHidden&&<p><h1 className="greet">Welcome to Your Diary</h1><div className="center">
          <Link underline="none" to="">
            <Button onClick={(e)=>handleLogin(e)}  className="greet" variant="text">Logout</Button>
          </Link>
          <Link underline="none" to="">
            <Button   className="greet" variant="text">Delete Account</Button>
          </Link>
            
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
            <TextField id="First_Name" label="First Name" variant="filled" />
            <TextField id="Last_Name" label="Last Name" variant="filled" /> 
            <TextField id="email" label="email" variant="filled" /> 
          </Box>
          </Link>
        </p>}

    
     
    </div>
  );
}

export default App;
