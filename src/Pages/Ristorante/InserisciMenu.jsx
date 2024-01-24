import { createSignal } from 'solid-js';
import styles from '../../css/Insert.module.css';
import axios from 'axios';

function InserisciMenu(){
    const[nome,setNome]=createSignal("");
    const[descrizione,setDescrizione]=createSignal("");
    const idRestaurant=sessionStorage.getItem("IdRistorante");
    const tokenAuth=sessionStorage.getItem('tokenAuth');

    //Funzione per inserire un menù all'interno di un ristorante
    async function insert(event) {
        event.preventDefault();
      
            try {
              //Chiamata all'API
          const response = await axios.post("http://localhost:8080/ristorante/insertMenu", {
           
                nome: nome(),
                descrizione: descrizione(),
                idRistorante: idRestaurant,
          },
          {headers: {
            Authorization: `Bearer ${tokenAuth}`,
          }
        }
          );
          alert("Menù inserito!");
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
                <div class={styles.elemGroup}>
                    <label>Nome</label>
                    <input type="text" value={nome()} onChange={(event)=>{setNome(event.target.value);}}  placeholder="Inserisci il nome del menù" required=""/>
                </div>
                <div class={styles.elemGroup}>
                    <label>Descrizione:</label>
                <input   value={descrizione()} onChange={(event)=>{setDescrizione(event.target.value);}}placeholder="Inserisci una descrizione"/>
                </div>
                <br/> <br/>
                <button class={styles.buttonForm} onClick={insert} style="margin-top:10px" type="submit">INSERISCI</button>
            </form>
        </main>
    );

}
export default InserisciMenu;