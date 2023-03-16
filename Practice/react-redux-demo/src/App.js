import CakeContainer from "./components/CakeContainer";
import { Provider } from "react-redux";
import store from "./redux/Store";
import HooksCakeContainer from "./components/HooksCakeContainer";
import CakeContainer1 from "./components/CakeContainer1";
import store1 from "./redux/Store1";
import UserContainer from "./components/UserContainer";

function App() {
  return (
    <Provider store={store}>
    {/* <Provider store={store1}> */}
      <div className="App">
        {/* <CakeContainer />
        <HooksCakeContainer />
        <CakeContainer1 /> */}
        <UserContainer />
      </div>
    </Provider>
  );
}

export default App;
