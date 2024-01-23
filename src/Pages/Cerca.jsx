import styles from '../css/Cerca.module.css';
import restaurantIcon from "../images/restaurant_icon.png"
import menuIcon from "../images/menu_icon.png"
import axios from 'axios';

import { createSignal } from 'solid-js';
function Cerca(){
  const [nome, setNome] = createSignal(""); 
  const [ricercaList,setRicercaList]=createSignal({
     ricerca: [],
  });

  //Funzione per gestire la ricerca
  const handleSearch = async () => { 
      const nomeRistorante=nome();
        try {
          //Chiamata all'API di ricerca
          const response = await axios.post(`http://localhost:8080/ristorante/ricercaRistorante/${nomeRistorante}`,{},);
          setRicercaList({...ricercaList(), ricerca: response.data });          
         }catch(error) {
          //Gestione degli errori
          console.error("Errore durante la ricerca:", error.response || error.message || error);
         }
  };

  //Funzione per gestire il pulsante ordina
  function ordina(IDRistorante){
    sessionStorage.setItem('IdRistorante',IDRistorante);
    window.location.href=('/ordini');
  }

  //Funzione per gestire il pulsante prenota
  function prenota(IDRistorante){
      sessionStorage.setItem('IdRistorante',IDRistorante);
      window.location.href=('/prenota');
  }

  return(
    <>
      <div class={styles.wrap}>
        <div class={styles.search}>
          <input type="text" class={styles.searchTerm} value={nome()} onChange={(e)=>setNome(e.target.value)} placeholder=""/>
          <button type="submit" onClick={handleSearch} class={styles.searchButton}>
            <i class="fa fa-search"/>
          </button>
        </div>
      </div>
      {ricercaList().ricerca.map((cerca) => ( //Lista dei locali trovati tramite l'input inserito
        <div class={styles.container}>
          <img src={restaurantIcon}/>
            <div class={styles.description}>
              <h1>{cerca.nome}</h1>
              <h3>Indrizzo</h3>
            </div>
            <div class={styles.navLink}>
              <a href="#"><img src={menuIcon}/></a>
              <button class={styles.buttonOrder} onClick={()=>ordina(cerca.id)}>Ordina</button>
              <button class={styles.buttonBook} onClick={() => prenota(cerca.id)}role="button">Prenota</button>
            </div>
        </div>
      ))}
    </>
  );
}
export default Cerca;