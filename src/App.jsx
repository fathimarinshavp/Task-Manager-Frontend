import Login from "./Component/Login";
import Register from "./Component/Register";
// import Nav from "./Component/Nav";
import Dashboard from "./Component/Dashboard";
import AddTask from "./Component/AddTask";
import Update from "./Component/Update";
import { BrowserRouter,Routes,Route } from "react-router-dom";


function App() {
  return (
    <>
        
      <BrowserRouter>
     {/* <Nav/> */}
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} /> 
           <Route path="/addtask" element={<AddTask />} />
            <Route path="/dashboard" element={<Dashboard />} />
             <Route  path="/updatetask/:id" element={<Update />} />  
      </Routes> 
       
  </BrowserRouter>
    </>
  );
}

export default App;