import React,{ lazy,Suspense} from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
const Home =lazy(()=>import("./router/home/page")) 

function App() {
  return (
<Router>
  <Suspense fallback={<div> Loading...</div>}>
   <Routes>
    <Route path="/test" element={<Home/>}/>
   </Routes>
  </Suspense>
</Router>
  );
}

export default App;
