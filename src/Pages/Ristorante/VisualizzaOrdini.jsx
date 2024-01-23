import styles from '../../css/Visualizza.module.css'
import axios from 'axios';
import { createSignal,createEffect } from 'solid-js';
function VisualizzaOrdini(){
    const [ordiniList,setOrdiniList]=createSignal({
        ordini: [],
    });
    const idRistorante=sessionStorage.getItem("IdRistorante");
    const token=sessionStorage.getItem('tokenAuth');
    const [dettagliOrdine, setDettagliOrdine] = createSignal(null);
    const [showPopup, setShowPopup] = createSignal(false);

    
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

    async function mostraDettagliOrdine(idOrdine, idRistorante){
      try{
        console.log(token);
        const response = await axios.get(`http://localhost:8080/ordini/prodottiByIdRisAndIdOrd/${idRistorante}/${idOrdine}`,
          { headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        const prodotti = response.data;
        setDettagliOrdine(prodotti);
        setShowPopup(true);
      }catch (error) {
        if (error.response) {
          console.error("Errore:\t", error.response.data);
          alert("Errore:\n" + error.response.data.message);
        } else {
          console.error("Errore durante la richiesta al server:\n", error.message);
          alert("Errore durante la richiesta al server:\n" + error.message);
        }
      }

    }

    function chiudiPopup() {
      setShowPopup(false);
      setDettagliOrdine(null);
    }

    return( <>
    
        <div class={styles.container}>
            <h1> Le tue ordinazioni:</h1>
            {ordiniList().ordini.map((ordine) => (
                <div class={styles.dashboard}>
                    <li key={ordine.idordine}>{ordine.idordine}</li>
                    <h5>ORA: {ordine.ora} | Nr. Tavolo: {ordine.nr_Tavolo} | Totale: {ordine.totale}€ | Stato: {ordine.stato === 1 ? 'Confermato' : ordine.stato === 2 ? 'Pagato' : 'Ordinato'} </h5>
                    <button class={styles.button} onClick={()=>mostraDettagliOrdine(ordine.idordine, ordine.idristorante)}>DETTAGLI ORDINE</button>
                    <button class={styles.button} onClick={()=>conferma(ordine.idordine)}>CONFERMA</button>

                </div>

        ))}  
            </div>

        {showPopup() && (
          <div class={styles.popup}>
          <div class={styles.popupContent}>
            <span class={styles.close} onClick={chiudiPopup}>
              &times;
            </span>
            <h2>Dettagli dell'ordine {}</h2>
            <ul>
              {dettagliOrdine() && dettagliOrdine().length > 0 ? (
                dettagliOrdine().map((prodotto, index) => (
                  <li key={index}>
                    <strong>{prodotto.nome}</strong> 
                    <br/>
                    <strong>Quantità: </strong>{prodotto.quantita}
                    <br/>
                    <strong>Descrizione: </strong>{prodotto.descrizione}
                  </li>
                ))
              ) : (
                <p>Nessun dettaglio disponibile.</p>
              )}
            </ul>
          </div>
        </div>
        )}
        </>);
}
export default VisualizzaOrdini;