import restaurantIcon from "../images/restaurant_icon.png"
import styles from "../css/Ristoranti.module.css"
import { createEffect,createSignal } from "solid-js";
import axios from "axios";

function Ristoranti(){
    const [ricercaList,setRicercaList]=createSignal({
        ricerca: [],
    });
      
    //Funzione per gestire la ricerca
    createEffect(()=>{ const fetchData = async () => {
    try {
        //Chiamata all'API di ricerca
        const response = await axios.post(`http://localhost:8080/ristorante/ricercaRistorante/`,{},);
        setRicercaList({...ricercaList(), ricerca: response.data });
    }catch(error) {
        //Gestione degli errori
        console.error("Errore durante la ricerca:", error.response || error.message || error);
    }
    };
    fetchData();
    });

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
        <div class={styles.container}>
            <div class={styles.products}>
                {ricercaList().ricerca.map((cerca) => (
                    <div class={styles.product}>
                        <img src={restaurantIcon} alt="immagine prodotto"/>
                        <h3>{cerca.nome}</h3>
                        <h4>+{cerca.telefono}</h4>
                        <h5>Via {cerca.via} {cerca.n_Civico}, {cerca.cap}, {cerca.provincia}</h5>
                        <button onClick={()=> ordina(cerca.id)}>ORDINA</button>
                        <button onClick={()=> prenota(cerca.id)}>PRENOTA</button>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Ristoranti