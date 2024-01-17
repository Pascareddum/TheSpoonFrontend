import Login from "./Pages/Login";
import Home from "./Pages/Home";
import TheSpoonLogo from "./images/logo_The_Spoon_white.png";
import UserIcon from "./images/User_icon_white.png";
import SearchIcon from "./images/search.png"
import {Router,Route} from '@solidjs/router'
import styles from './css/App.module.css'
import SignUp from "./Pages/SignUp";
import CercaRistoranti from "./Pages/CercaRistorante";
import InserisciRistorante from "./Pages/InserisciRistorante";
import PrenotaRistorante from "./Pages/PrenotaRistorante";
import DashBoard from "./Pages/DashBoard";
import Ordini from "./Pages/Ordini";
import About from "./Pages/About";
import Ristoranti from "./Pages/Ristoranti";
import { useState } from "react";

function App () {
  return(
    <>
      <div class={styles.topnav}>
    <a href="/"><img alt="logo" style="width:50px;height: 50px;" src={TheSpoonLogo}/></a>
    <div class={styles.topnavCentered}>
    <a href="/"style="font-size: 20px;">THE SPOON</a>
    </div>
    <div class={styles.topnavRight}>
    <a href="/about">About</a>
    <a href="/ristoranti">Ristoranti</a>
        
  
        <a href="/login"><img style="width: 25px;height: 25px;" alt="logo"  src={UserIcon}/> </a>
    </div>
    </div>    
    
    <Router>
      <Route path="/about" component={About}/>
      <Route path="/signUp" component={SignUp}/>
      <Route path="/ristoranti" component={Ristoranti}/>
      <Route path="/" component={Home}/>
      <Route path="/login" component={Login}/>
      <Route path="/cercaRistoranti" component={CercaRistoranti}/>
      <Route path="/inserisciRistorante" component={InserisciRistorante}/>
      <Route path="/prenotaRistorante" component={PrenotaRistorante}/>
      <Route path="/dashBoard" component={DashBoard}/>
      <Route path="/ordini" component={Ordini}/>
    </Router>
</>
  )
};
export default App;
