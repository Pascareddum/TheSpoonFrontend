import { createEffect, createSignal } from "solid-js";
import styles from "../../css/Visualizza.module.css"
import axios from "axios";
function IMieiRistoranti(){
    const tokenAuth=sessionStorage.getItem('tokenAuth');
    const [restaurantList,setRestaurantList]=createSignal({
        restaurants: [],
    });

    const token=sessionStorage.getItem('tokenAuth'); 
    if(token==null) //Se non c'è nessun token, l'utente ritorna alla home
        window.location.href=('/');
    const idAuth=sessionStorage.getItem("tokenId");

    //Funzione per ottenere una lista dei ristoranti dell'utente tramite il proprio id
    createEffect(()=>{ const fetchData = async () => {
        try {  
          const response = await axios.get(`http://localhost:8080/ristorante/restaurantsList/${idAuth}`);
          setRestaurantList({ ...restaurantList(), restaurants: response.data });
        } catch (error) {
            //Gestione degli errori
            console.error("Errore durante la richiesta GET", error);
        }
      };
        fetchData();
    });
 
    //Funzione di modifica dati di un ristorante
    function Modifica(restaurantId){
        sessionStorage.setItem('IdRistorante',restaurantId);
        window.location.href=('/modificaRistorante');
      }

    //Funzione di visualizzazione dei menù
    function VisualizzaMenus(restaurantId){
        sessionStorage.setItem('IdRistorante',restaurantId);
        window.location.href=('/visualizzaMenu');
    }

    //Funzione di visualizzazione dei tavoli
    function VisualizzaTavoli(restaurantId){
        sessionStorage.setItem('IdRistorante',restaurantId);
        window.location.href=('/visualizzaTavoli');
    }

    //Funzione di viusalizzazione delle prenotazioni
    function VisualizzaPrenotazioni(restaurantId){
        sessionStorage.setItem('IdRistorante',restaurantId);
        window.location.href=('/visualizzaPrenotazioni');
    }

    //Funzione di visualizzazione degli ordini
    function VisualizzaOrdini(restaurantId){
        sessionStorage.setItem('IdRistorante',restaurantId);
        window.location.href=('/visualizzaOrdini')
    }

    return(
        <>
            <div class={styles.container}>
                <h1> I tuoi ristoranti:</h1>
                {restaurantList().restaurants.map((restaurant) => ( //Lista dei ristoranti 
                    <div class={styles.dashboard}>
                        <li key={restaurant.id}>{restaurant.nome}</li>
                        <button class={styles.button} onClick={()=>Modifica(restaurant.id)}>MODIFICA RISTORANTE</button>
                        <button class={styles.button} onClick={() =>VisualizzaMenus(restaurant.id)}>VISUALIZZA I MENÙ</button>
                        <button class={styles.button} onClick={()=>VisualizzaTavoli(restaurant.id)}>VISUALIZZA TAVOLI</button>
                        <button class={styles.button} onClick={()=>VisualizzaPrenotazioni(restaurant.id)}>VISUALIZZA PRENOTAZIONI</button>
                        <button class={styles.button} onClick={()=>VisualizzaOrdini(restaurant.id)}>VISUALIZZA ORDINI</button>
                    </div>
                ))}
            </div>
        </>
    );
}
export default IMieiRistoranti;