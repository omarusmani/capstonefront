import './App.css';
import {React, useEffect, useInsertionEffect, useState } from 'react';
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

  const [users, setUsers] = useState([{
    id: 0,
    first_name: "Dummy",
    last_name: "",
    email:"",
    username: ""
},{id: 1,
  first_name: "",
  last_name: "",
  email:"",
  username: ""}]);//had to create in order to access props of json
  const [posts, setPosts] = useState([{
    id: 0,
    username: 800000,
    post: "Dummy Text, You Logged I without a username",
    url: "",
    Title: "Dummy Title",
    Days: ""
},{
  id: 1,
  username: 800000,
  post: "Dummy Text, You Logged I without a username",
  url: "",
  Title: "Dummy Title",
  Days: ""
}]);
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

const fetchPost = async () => {
      try {
        let response = await client.get(`/post/${users.id}`);
        setPosts(response.data);
      } catch (error) {
        console.log(error);
     }
     };




useEffect(() => {

  setTimeout(() => {
        
  }, 180);
      const fetchUsers = async () => {
     try {
       let response = await client.get(`/user/${username}`);
       setUsers(response.data[0]);
       console.log(users)
      } catch (error) {
       console.log(error);
    }
  };
  fetchUsers()
}, [username]);




 


 const sendResults=()=>{

 }
 const deletePost=(e,x)=>{
  e.preventDefault()
  client.delete(`/post/${x}`);
  setPosts(
    posts.filter((y) => {
       return y.id !== x;
    }))
  fetchPost()
}

 
 const handleLogin=(e)=>{
   e.preventDefault();
  setisHidden(!isHidden)
  fetchPost(users.id)

 } 
//  const handleSignup=(e)=>{
//   e.preventDefault()
//   setisSigned(!isSigned)

//  }
console.log(users,posts,username)
// console.log(users,posts,last,first,email,post,title,username,password)
const clearState=()=>{
  setUsername("")
  setPassword("")
  setFirst("")
  setLast("")
  setEmail("")
  setPost("")
  setTitle("")
  setPosts([{
    id: 0,
    username: 800000,
    post: "",
    url: "",
    Title: "",
    Days: ""
},{
  id: 1,
  username: 800000,
  post: "",
  url: "",
  Title: "",
  Days: ""
}])
  setUsers([{
    id: 0,
    first_name: "Dummy",
    last_name: "",
    email:"",
    username: ""
},{id: 1,
  first_name: "Dummy",
  last_name: "",
  email:"",
  username: ""}])
console.log(users,posts,last,first,email,post,title,username,password)

}
  return (
    <div className="App">
    
      {!isHidden&&<span><h1 className="greet">Welcome to Your Diary</h1><div className="center">
          <Link onClick={(e) => {handleLogin(e)}} underline="none" to="">
            <Button className="greet" variant="text">Login</Button>
          </Link>
          <Link href="#" underline="none" to="">
            {/* <Button onClick={(e) => {handleSignup(e);handleLogin(e);}} className="greet" variant="text">Signup</Button> */}
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField onChange={(e)=> setUsername(e.target.value)}  id="User Name" label="username" variant="filled" />
      {/* <TextField onChange={(e) => setPassword(e.target.value)} id="Password" label="password" variant="filled" />  */}
    </Box>
          </Link>
        </div></span>}
          {isHidden&&<span><h1 className="greet">Welcome to Your Diary, {users.first_name}</h1><div className="center">
          <Link underline="none" to="">
            <Button onClick={(e)=>{handleLogin(e);clearState();}}  className="greet" variant="text">Logout</Button>
          </Link>
          <Link underline="none" to="">
            {/* <Button   className="greet" variant="text">Delete Account</Button> */}
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
          <ul style={{ listStyleType: "none" }}>
              {(posts).map((post)=> {return (<li key={post.id}>
                <h2>{post.Title}</h2>
                <h4>{post.post}</h4>
                <Button onClick={(e)=>{deletePost(e,post.id)}}  className="greet" variant="text">Delete Entry</Button>
                </li>)})}
          </ul>

        </div></span>}

        {(!isSigned&&!isHidden)&&<span>
          <Link underline="none" to="">
          <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      >
            {/* <TextField onChange={(e) => setFirst(e.target.value)} id="First_Name" label="First Name" variant="filled" />
            <TextField onChange={(e) => setLast(e.target.value)} id="Last_Name" label="Last Name" variant="filled" /> 
            <TextField onChange={(e) => setEmail(e.target.value)}id="email" label="email" variant="filled" />  */}
          </Box>
          </Link>
        </span>}

    
     
    </div>
  );
}

export default App;
