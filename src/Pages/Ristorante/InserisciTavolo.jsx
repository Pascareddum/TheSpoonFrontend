import { createEffect, createSignal } from "solid-js";
import axios from "axios";
import styles from "../../css/Insert.module.css"
export default function InserisciTavolo(){
    const[numeroTavolo,setNumeroTavolo]=createSignal("");
    const[capacita,setCapacita]=createSignal("");

    
    
    const tokenAuth=sessionStorage.getItem('tokenAuth');
    const idRistorante=sessionStorage.getItem('IdRistorante');
    async function insert(event) {
        event.preventDefault();
      
            try {
          const response = await axios.post("http://localhost:8080/ristorante/insertTavolo", {
           
                numeroTavolo: numeroTavolo(),
                stato: 0,
                capacita: capacita(),
                idRistorante: idRistorante,
          },
          {headers: {
            Authorization: `Bearer ${tokenAuth}`,
          }
        }
          );
            alert("Tavolo inserito!");
            window.location.href=('/visualizzaTavoli');
              } catch (error) {
            if (error.response) {
              console.error("Errore:\n", error.response.data);
              alert("Errore:\n" + error.response.data.message);
            } else {
              console.error("Errore durante la richiesta al server:\n", error.message);
              alert("Errore durante la richiesta al server:\n" + error.message);
            }
          }
        }
    return (
        <main class={styles.cd__main}>
            <form class={styles.form}>
                <div class={styles.elemGroup}>
                    <label>Numero tavolo:</label>
                    <input type="number" value={numeroTavolo()} onChange={(event)=>{setNumeroTavolo(event.target.value);}} required/>
                </div>
                <div class={styles.elemGroup}>
                    <label>Capacità</label>
                <input type="tel"  value={capacita()} onChange={(event)=>{setCapacita(event.target.value);}}placeholder="498-348-3872" pattern="0039-\d{3}-\d{7,}" required=""/>
                </div>
                <br/> <br/>
                <button class={styles.buttonForm} onClick={insert} style="margin-top:10px" type="submit">INSERISCI</button>
            </form>
        </main>
    );
}