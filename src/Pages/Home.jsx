import restaurantIcon from "../images/restaurant_icon.png"
import styles from '../css/Home.module.css'
import { createSignal,createEffect } from "solid-js";
import axios from "axios";
export default function Home(){
  const [ricercaList,setRicercaList]=createSignal({
    ricerca: [],
});




createEffect(()=>{ const fetchData = async () => {
               try {
          const response = await axios.post(`http://localhost:8080/ristorante/ricercaRistorante/`,{},);
          setRicercaList({...ricercaList(), ricerca: response.data });
      }catch(error) {
        console.error("Errore durante la ricerca:", error.response || error.message || error);
      }

    };

    fetchData();
  });

  function ordina(IDRistorante){
    sessionStorage.setItem('IdRistorante',IDRistorante);
    window.location.href=('/ordini');
}
  function prenota(IDRistorante){
    sessionStorage.setItem('IdRistorante',IDRistorante);
    window.location.href=('/prenota');
  }
  
    return(
        <>
    <div class={styles.container}>
      <h1 style="text-align: center;color: white;"> Scelti per te</h1>
      <div class={styles.containerCards}>
      {ricercaList().ricerca.slice(0,4).map((cerca) => (

        <div class={styles.shell}>
          <div class={styles.row}>
            <div class={styles.cardProduct}>
              <div class={styles.cardImg}>
                  <img src={restaurantIcon} class={styles.imgResponsive} />
              </div>
              <div class={styles.cardText}>
                <div class={styles.titleProduct}>
                  <h3>{cerca.nome.length > 22 ? cerca.nome.slice(0, 22)+'...' : cerca.nome}</h3>
                  <h4>+{cerca.telefono}</h4>
                </div>
                <div class={styles.descriptionProd}>
                  <h5>Via {cerca.via} {cerca.n_Civico}, {cerca.cap}, {cerca.provincia}</h5>
                  <button class={styles.button} onClick={()=> ordina(cerca.id)}>ORDINA</button>
                  <button class={styles.button} onClick={()=> prenota(cerca.id)}>PRENOTA</button>
                </div>
              </div>
          </div>
        </div>
      </div> ))}
    </div>
  </div>
  </>
    );
}