import { createEffect, createSignal } from "solid-js";
import styles from "../../css/Visualizza.module.css"
import axios from "axios";
function IMieiRistoranti(){
    const tokenAuth=sessionStorage.getItem('tokenAuth');
    const [restaurantList,setRestaurantList]=createSignal({
        restaurants: [],
        otherInfo: [],
    });
    const idAuth=sessionStorage.getItem("tokenId");

    createEffect(()=>{ const fetchData = async () => {
        try {  
          const response = await axios.get(`http://localhost:8080/ristorante/restaurantsList/${idAuth}`);
          setRestaurantList({ ...restaurantList(), restaurants: response.data });
        } catch (error) {
          console.error("Errore durante la richiesta GET", error);
        }
      };
        fetchData();
    });
 
    function Modifica(restaurantId){
        sessionStorage.setItem('IdRistorante',restaurantId);
        window.location.href=('/modificaRistorante');
      }

    function VisualizzaMenus(restaurantId){
        sessionStorage.setItem('IdRistorante',restaurantId);
        window.location.href=('/visualizzaMenu');
    }

    function VisualizzaTavoli(restaurantId){
        sessionStorage.setItem('IdRistorante',restaurantId);
        window.location.href=('/visualizzaTavoli');
    }

    function VisualizzaPrenotazioni(restaurantId){
        sessionStorage.setItem('IdRistorante',restaurantId);
        window.location.href=('/visualizzaPrenotazioni');
    }
    return(
        <>
    
        <div class={styles.container}>
            <h1> I tuoi ristoranti:</h1>
            {restaurantList().restaurants.map((restaurant) => (
                <div class={styles.dashboard}>
                    <li key={restaurant.id}>{restaurant.nome}</li>
                        <button class={styles.button} onClick={()=>Modifica(restaurant.id)}>MODIFICA RISTORANTE</button>
                        <button class={styles.button} onClick={() =>VisualizzaMenus(restaurant.id)}>VISUALIZZA I MENÙ</button>
                        <button class={styles.button} onClick={()=>VisualizzaTavoli(restaurant.id)}>VISUALIZZA TAVOLI</button>
                        <button class={styles.button} onClick={()=>VisualizzaPrenotazioni(restaurant.id)}>VISUALIZZA PRENOTAZIONI</button>

                </div>
        ))}
             
           
            </div>
        </>
    );
}
export default IMieiRistoranti;