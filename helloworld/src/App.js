
import './App.css';
import Greet from './components/Greet';
import Welcome from './components/Welcome';
import Message from './components/Message';
import Counter from './components/Counter';
import ParentComponent from './components/ParentComponent';
import Mylist from './components/Mylist';
import Form from './components/Form';
import FocusComp from './components/FocusComp';
import PortalComp from './components/PortalComp';
import ClickCount from './components/ClickCount';
import HoverCount from './components/HoverCount';
import CounterTwo from './components/CounterTwo';
import ClickCountTwo from './components/ClickCountTwo';
import HoverCountTwo from './components/HoverCountTwo';
import ComponentC from './components/ComponentC';
import { ContextProvider } from './components/UserContext';
import MyLinks from './components/MyLinks';
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <Greet name="Bahar"/>
      <Greet name="Baharudin"/>
      <Greet name="Behar"/> */}
      {/* <Welcome/> */}
      {/* <Message /> */}
      {/* <Counter/> */}
      {/* <ParentComponent/> */}
      {/* <Mylist/> */}
      {/* <Form/> */}
      {/* <FocusComp /> */}
      {/* <PortalComp/> */}
      {/* <ClickCount/>
      <HoverCount/> */}
      {/* <CounterTwo render={(count, countHandler)=>(
          <ClickCountTwo count={count} countHandler={countHandler}/>
      )} />
      <CounterTwo render={(count, countHandler)=>(
          <HoverCountTwo count={count} countHandler={countHandler}/>
      )} /> */}
      {/* <ContextProvider value='Beharudin'>
          <ComponentC />
      </ContextProvider> */}
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<MyLinks/>}/>
        <Route path="/form" element={<Form/>} />
        <Route path="/welcome" element={<Welcome/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
