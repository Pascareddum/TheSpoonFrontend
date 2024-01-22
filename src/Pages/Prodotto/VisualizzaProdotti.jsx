import styles from '../../css/Visualizza.module.css'
import axios from 'axios';
import { createSignal,createEffect } from 'solid-js';
function VisualizzaProdotti(){
    const [prodottiList,setProdottiList]=createSignal({
        prodotti: [],
        otherInfo: [],
    });
    const idRistorante=sessionStorage.getItem("IdRistorante");
    createEffect(()=>{ const fetchData = async () => {
        try {  
           
          const response = await axios.get(`http://localhost:8080/prodotto/getAllProdottiByIdRistorante/${idRistorante}`);
          setProdottiList({...prodottiList(), prodotti: response.data });
        } catch (error) {
          console.error("Errore durante la richiesta GET", error);
        }
      };
        fetchData();
    });


    return(
        <>
    
        <div class={styles.container}>
            <h1> I tuoi prodotti</h1>
            <button class={styles.button} onClick={()=>window.location.href=("/aggiungiProdotto")}>AGGIUNGI PRODOTTO</button>
            {prodottiList().prodotti.map((prodotto) => (
                <div class={styles.dashboard}>
                    <li key={prodotto.id}>{prodotto.nome} | {prodotto.descrizione} | {prodotto.prezzo}€</li>
                </div>

        ))}  
            </div>
        </>
    );

}
export default VisualizzaProdotti;