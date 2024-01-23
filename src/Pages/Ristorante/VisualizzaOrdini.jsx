import styles from '../../css/Visualizza.module.css'
import axios from 'axios';
import { createSignal,createEffect } from 'solid-js';
function VisualizzaOrdini(){
    const [ordiniList,setOrdiniList]=createSignal({
        ordini: [],
    });
    const idRistorante=sessionStorage.getItem("IdRistorante");
    const token=sessionStorage.getItem('tokenAuth');

    
    createEffect(()=>{ const fetchData = async () => {
        try {  
           
          const response = await axios.get(`http://localhost:8080/ordini/ordiniByRistorante/${idRistorante}`,{headers: {
            Authorization: `Bearer ${token}`,}});
          setOrdiniList({...ordiniList(), ordini: response.data });
        } catch (error) {
          console.error("Errore durante la richiesta GET", error);
        }
      };
        fetchData();
    });

    async function conferma(idOrdine){
        try {
          const response = await axios.post(`http://localhost:8080/ordini/confermaOrdine/${idOrdine}`,
          null,
          { headers: {
            Authorization: `Bearer ${token}`,
          }
        });
          alert("Ordine confermato!")
          window.location.reload();
        } catch (error) {
          if (error.response) {
            console.error("Errore:\t", error.response.data);
            alert("Errore:\n" + error.response.data.message);
          } else {
            console.error("Errore durante la richiesta al server:\n", error.message);
            alert("Errore durante la richiesta al server:\n" + error.message);
          }
        }
      }

    return( <>
    
        <div class={styles.container}>
            <h1> Le tue ordinazioni:</h1>
            {ordiniList().ordini.map((ordine) => (
                <div class={styles.dashboard}>
                    <li key={ordine.idordine}>{ordine.chatId}</li>
                    <h5>ORA: {ordine.ora} | Nr. Tavolo: {ordine.nr_Tavolo} | Totale: {ordine.totale}€</h5>
                    <button class={styles.button} onClick={()=>conferma(ordine.idordine)}>CONFERMA</button>

                </div>

        ))}  
            </div>
        </>);
}
export default VisualizzaOrdini;