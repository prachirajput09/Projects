import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
 

import NewsItem from './components/NewsItem';
// import News setProgress={setProgress} from './components/News setProgress={setProgress}';
import News from './components/News' ;
import LoadingBar from 'react-top-loading-bar'
import {BrowserRouter as Router, Switch, Route,} from "react-router-dom";
const App=()=> {
  const pageSize=15;
  const apiKey= "e0bf6b99ba274e929b45c898fa8738cc" //pending video 37
  const state = {
    progress:0
  } 
   const[progress,setProgress]=useState(0)
  return (
      <div>
        <Router>
        <Navbar/>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={progress}
        // onLoaderFinished={() => setProgress(0)}
        />
       {/* <News setProgress={setProgress} pageSize={5} country="us" category ="general"/> */}
        <Switch>
        <Route exact path="/"><News setProgress={setProgress} apiKey={apiKey}  key="general" pageSize={pageSize} country="us" category ="general"/></Route>
        <Route exact path="/business"><News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country="us" category ="business"/></Route>
        <Route exact path="/entertainment"><News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country="us" category ="entertainment"/></Route>
        <Route exact path="/general"><News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="us" category ="general"/></Route>
        <Route exact path="/health"><News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country="us" category ="health"/></Route>
        <Route exact path="/science"><News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country="us" category ="science"/></Route>
        <Route exact path="/sports"><News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country="us" category ="sports"/></Route>
        <Route exact path="/technology"><News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country="us" category ="technology"/></Route>
       </Switch>
       </Router>
       </div> 
    )
  }
  export default App;

