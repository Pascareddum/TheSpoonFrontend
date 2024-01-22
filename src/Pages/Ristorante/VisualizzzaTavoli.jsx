import styles from '../../css/Visualizza.module.css'
import axios from 'axios';
import { createSignal,createEffect } from 'solid-js';
function VisualizzaTavoli(){
    const [tavoliList,setTavoliList]=createSignal({
        tavoli: [],
    });
    const idRistorante=sessionStorage.getItem("IdRistorante");
    createEffect(()=>{ const fetchData = async () => {
        try {  
          const response = await axios.get(`http://localhost:8080/ristorante/getTavoliRistorante/${idRistorante}`);
          setTavoliList({...tavoliList(), tavoli: response.data });
        } catch (error) {
          console.error("Errore durante la richiesta GET", error);
        }
      };
        fetchData();
    });

    return(
        <>
    
        <div class={styles.container}>
            <h1> I tuoi tavoli:</h1>
            <button class={styles.button}onClick={()=>(window.location.href=('/inserisciTavolo'))}>INSERISCI TAVOLO</button>

            {tavoliList().tavoli.map((tavolo) => (
                <div class={styles.dashboard}>
                    <li key={tavolo.numeroTavolo}>Nr. tavolo:{tavolo.numeroTavolo} | Capacità:{tavolo.capacita} persone | Stato: {tavolo.stato===0 ? 'Libero' : 'Prenotato'}</li>
                </div>
        ))}  
            </div>
        </>
    );

}
export default VisualizzaTavoli;