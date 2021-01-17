import React from 'react';
import { Route} from "react-router";

import Join from './Components/Join';
import Chat from './Components/Chat';

const App =()=> {
  return(
    <div>
      <Route path={"/"} exact component={Join}></Route>
      <Route path={"/chat"} exact component={Chat}></Route>
    </div>
  )
}
  

export default App;
