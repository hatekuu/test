import React,{useState,useEffect} from 'react'
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import *as Realm from 'realm-web'
const app = new Realm.App({ id: process.env.REACT_APP_REALM_ID });
const user= app.currentUser
const schema = {
    title: 'Register',
    type: 'object',
    required: ['email', 'password'],
  
    properties: {
      email: { type: 'string', title: 'Email',format:'email' },
      password: { type: 'string', title: 'Password',format:"password" },
    },
  };
  const Login = {
    title: 'Login',
    type: 'object',
    required: ['email', 'password'],
  
    properties: {
      email: { type: 'string', title: 'Email',format:'email' },
      password: { type: 'string', title: 'Password',format:"password" },
    },
  };
  const Math = {
    title: 'Math',
    type: 'object',

  
    properties: {
      A: { type: 'number', title: 'A'},
      B: { type: 'number', title: 'B' },
    },
  };

const Home = () => {
    const [sum,setSum]= useState()
    const [schema,setSchema]= useState({})
  
    useEffect(()=>{
        fetchData()
    },[])
    const fetchData= async ()=>{
        
        const functionName = "math";
        const args=["none",user.id]
     try {
         const result = await user.callFunction(functionName,...args);
         console.log(result)
         setSum(result[0]?.public?.output?.jsonData?.sum)
         console.log(result[0]?.public?.output?.jsonData?.sum)
         setSchema(result[0]?.public?.input?.jsonSchema)
     } catch (error) {
         console.log(error.error)
     }
    }
    const Register = async (form)=>{

        const {email,password}= form?.formData
        try {
            await app.emailPasswordAuth.registerUser({ email, password });
           console.log("đăng ký thành công")
           window.location.reload(true)
        } catch (error) {
            console.log(error.error)
        }
      } 
      const Loginn = async (form)=>{
    
        const {email,password}= form?.formData
        try {
            const credentials = Realm.Credentials.emailPassword(email, password);
            // Authenticate the user
             await app.logIn(credentials);
           console.log("đăng nhập thành công:",user)
           window.location.reload(true)
        } catch (error) {
            console.log(error.error)
        }
      } 
      const Logout = async ()=>{
    
      
        try {
            await app.currentUser.logOut();
    
           console.log("đăng xuất thành công")
           window.location.reload(true)
        } catch (error) {
            console.log(error.error)
        }
      } 
      const FetchMath = async(form)=>{
        const functionName = "math";
       const args=[form.formData,user.id]
    try {
         await user.callFunction(functionName, ...args);
       fetchData()

    } catch (error) {
        console.log(error.error)
    }
    
    
      }
  return (
    <div>
        {user?(
            <div>home
                <button onClick={Logout}>Đăng xuất</button>
                <Form
            schema={Math}
            validator={validator}
          
            onSubmit={FetchMath}
         
          />
<p> Kết quả:{sum}</p>
          
            </div>
        ):(
            <>    <Form
            schema={schema}
            validator={validator}
          
            onSubmit={Register}
         
          />
                 <Form
            schema={Login}
            validator={validator}
          
            onSubmit={Loginn}
         
          /></>
        )}
   
    </div>
  )
}

export default Home