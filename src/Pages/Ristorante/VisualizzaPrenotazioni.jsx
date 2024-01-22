import styles from "../../css/Visualizza.module.css"
import { createSignal,createEffect } from "solid-js";
import axios from "axios";
export default function VisualizzaPrenotazioni(){
    const [prenotazioniList,setPrenotazioniList]=createSignal({
        prenotazioni: [],
    });
    const idRistorante=sessionStorage.getItem("IdRistorante");
    const token=sessionStorage.getItem('tokenAuth');

    
    createEffect(()=>{ const fetchData = async () => {
        try {  
           
          const response = await axios.get(`http://localhost:8080/prenotazioni/getAllPrenotazioni/${idRistorante}`,{headers: {
            Authorization: `Bearer ${token}`,}});
          setPrenotazioniList({...prenotazioniList(), prenotazioni: response.data });
        } catch (error) {
          console.error("Errore durante la richiesta GET", error);
        }
      };
        fetchData();
    });

return(
        <>
    
        <div class={styles.container}>
            <h1> Le tue prenotazioni:</h1>
            {prenotazioniList().prenotazioni.map((prenotazione) => (
                <div class={styles.dashboard}>
                    <li key={prenotazione.idPrenotazione}>{prenotazione.email}</li>
                    <p>Ora:{prenotazione.ora} | Data:{prenotazione.data[2]}/{prenotazione.data[1]}/{prenotazione.data[0]} | Cellulare:{prenotazione.cellulare} | Nr. persone:{prenotazione.nrPersone}</p>
                    <button class={styles.button}>CONFERMA</button>

                </div>

        ))}  
            </div>
        </>
    );
}