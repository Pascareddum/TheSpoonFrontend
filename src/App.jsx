import Login from "./Pages/Auth/Login";
import Home from "./Pages/Home";
import TheSpoonLogo from "./images/logo_The_Spoon_white.png";
import UserIcon from "./images/User_icon_white.png";
import SearchIcon from "./images/search.png"
import {Router,Route} from '@solidjs/router'
import styles from './css/App.module.css'
import SignUp from "./Pages/Auth/SignUp";
import CercaRistoranti from "./Pages/Ristorante/CercaRistorante";
import InserisciRistorante from "./Pages/Dashboard/InserisciRistorante";
import PrenotaRistorante from "./Pages/Prenota";
import DashBoard from "./Pages/Dashboard/DashBoard";
import Ordini from "./Pages/Ordini/Ordini";
import About from "./Pages/About";
import Ristoranti from "./Pages/Ristoranti";
import ModificaAuth from "./Pages/Dashboard/ModificaAuth";
import ConfermaSignUp from "./Pages/Auth/ConfermaSignUp";
import ModficaPassword from "./Pages/Dashboard/ModificaPassword";
import IMieiRistoranti from "./Pages/Dashboard/IMieiRistoranti";
import ModificaRistorante from "./Pages/Dashboard/ModificaRistorante";
import Cerca from "./Pages/Cerca";
import VisualizzaMenu from "./Pages/Ristorante/VisualizzaMenu";
import InserisciMenu from "./Pages/Ristorante/InserisciMenu";
import AggiungiProdotto from "./Pages/Prodotto/AggiungiProdotto";
import VisualizzaTavoli from "./Pages/Ristorante/VisualizzzaTavoli";
import InserisciTavolo from "./Pages/Ristorante/InserisciTavolo";
import VisualizzaProdotti from "./Pages/Prodotto/VisualizzaProdotti";
import AggiungiPrdottoMenu from "./Pages/Ristorante/AggiungiProdottoMenu";
import AggiungiProdottoMenu from "./Pages/Ristorante/AggiungiProdottoMenu";
import VisualizzaProdottiMenu from "./Pages/Ristorante/VisualizzaProdottiMenu";
import VisualizzaPrenotazioni from "./Pages/Ristorante/VisualizzaPrenotazioni";

function App () {
  const token=sessionStorage.getItem('tokenAuth');
  
 

  return(
    <>
      <div class={styles.topnav}>
    <a href="/"><img alt="logo" style="width:50px;height: 50px;" src={TheSpoonLogo}/></a>
    <a href="/about">ABOUT</a>

    <div class={styles.topnavCentered}>
    <a href="/"style="font-size: 20px;">THE SPOON</a>
    </div>
    <div class={styles.topnavRight}>
    <a href="/cerca">CERCA</a>

    <a href="/ristoranti">RISTORANTI</a>
        
        {token===null ? (
        <a href="/login"><img style="width: 25px;height: 25px;" alt="logo"  src={UserIcon}/> </a>):null}
        {token!==null?(<a href="/dashBoard">DASHBOARD</a>):null}
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
      <Route path="/prenota" component={PrenotaRistorante}/>
      <Route path="/dashBoard" component={DashBoard}/>
      <Route path="/ordini" component={Ordini}/>
      <Route path="/modifcaAuth" component={ModificaAuth}/>
      <Route path="/confermaSignUp" component={ConfermaSignUp}/>
      <Route path="/modificaPassword" component={ModficaPassword}/>
      <Route path="/iMieiRistoranti" component={IMieiRistoranti}/>
      <Route path="/modificaRistorante" component={ModificaRistorante}/>
      <Route path="/cerca" component={Cerca}/>
      <Route path="/visualizzaMenu" component={VisualizzaMenu}/>
      <Route path="/inserisciMenu" component={InserisciMenu}/>
      <Route path="/aggiungiProdotto" component={AggiungiProdotto}/>
      <Route path="/visualizzaProdotti" component={VisualizzaProdotti}/>
      <Route path="/visualizzaTavoli" component={VisualizzaTavoli}/>
      <Route path="/inserisciTavolo" component={InserisciTavolo}/>
      <Route path="/aggiungiProdottoMenu" component={AggiungiProdottoMenu}/>
      <Route path="/visualizzaProdottiMenu" component={VisualizzaProdottiMenu}/>
      <Route path="/visualizzaPrenotazioni" component={VisualizzaPrenotazioni}/>
    </Router>
</>
  )
};
export default App;
