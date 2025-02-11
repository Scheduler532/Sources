import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/home" ;
import { Login } from "./components/Login/Login"
import { Page404 } from "./components/404/404";
import { Auth } from "./components/Auth/Auth"
import { Settings } from "./components/Settings/Settings";
import { About } from "./components/About/About";
import { UpdateLog } from "./components/UpdateLog/UpdateLog";
import { Usage } from "./components/Usage/Usage";
import { Assignments } from "./components/Assignments/Assignments";
import { Classes } from './components/Classes/Classes';
import { Edit } from './components/Classes/Edit/Edit';


function App() {
    return (
        <div className="App">
          <Routes>
            <Route path='/' element={<Auth />} />
            <Route path='/Auth' element={<Auth />} />
            <Route path='/Login' element={<Login />}/>
            <Route path="/Home" element={<Home />}></Route>
            <Route path="/Settings" element={<Settings />}></Route>
            <Route path="/About" element={<About />}></Route>
            <Route path="/UpdateLog" element={<UpdateLog />}></Route>
            <Route path="/Usage" element={<Usage />}></Route>
            <Route path='*' element={<Page404 />}></Route>
            <Route path="/Assignments" element={<Assignments />}></Route>
            <Route path="/Classes" element={<Classes />}></Route>
            <Route path="/Classes-Edit" element={<Edit/>}></Route>
          </Routes>
      </div>
    );

  }

export default App;

