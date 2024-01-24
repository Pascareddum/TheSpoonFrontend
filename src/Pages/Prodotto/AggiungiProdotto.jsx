import { createSignal } from 'solid-js';
import styles from '../../css/Insert.module.css';
import axios from 'axios';
function AggiungiProdotto(){


    const[nome,setNome]=createSignal("");
    const[descrizione,setDescrizione]=createSignal("");
    const[prezzo,setPrezzo]=createSignal("");
    const idRestaurant=sessionStorage.getItem("IdRistorante");
    const tokenAuth=sessionStorage.getItem('tokenAuth');

    //Funzione per aggiungere un prodotto all'interno di un ristorante
    async function insert(event) {
        event.preventDefault();
      
            try {
                //chiamata all'API
                const response = await axios.post("http://localhost:8080/prodotto/insertProdotto", {
                nome: nome(),
                descrizione: descrizione(),
                prezzo: prezzo(),
                idRistorante:idRestaurant,
          },
          {headers: {
            Authorization: `Bearer ${tokenAuth}`,
          }
        }
          );
          alert("Prodotto inserito!");
          window.location.href=('/visualizzaMenu');
        } catch (error) {
          //Gestione degli errori
            if (error.response) {
              console.error("Errore:\n", error.response.data);
              alert("Errore:\n" + error.response.data.message);
            } else {
              console.error("Errore durante la richiesta al server:\n", error.message);
              alert("Errore durante la richiesta al server:\n" + error.message);
            }
          }
        }
    return(
        <main class={styles.cd__main}>
            <form class={styles.form}>
            <h1>Inserisci il nuovo prodotto:</h1>
                <div class={styles.elemGroup}>
                    <label>Nome:</label>
                    <input type="text" value={nome()} onChange={(event)=>{setNome(event.target.value);}}  placeholder="Inserisci il nome del menù" required=""/>
                </div>
                <div class={styles.elemGroup}>
                    <label>Descrizione:</label>
                <input   value={descrizione()} onChange={(event)=>{setDescrizione(event.target.value);}}placeholder="Inserisci una descrizione"/>
                </div>

                <div class={styles.elemGroup}>
                    <label>Prezzo:</label>
                <input  type="text" value={prezzo()} onChange={(event)=>{setPrezzo(event.target.value);}}placeholder="5,50"/>
                </div>
                <br/> <br/>
                <button class={styles.buttonForm} onClick={insert} style="margin-top:10px" type="submit">INSERISCI</button>
            </form>
        </main>
    );

}

export default AggiungiProdotto;