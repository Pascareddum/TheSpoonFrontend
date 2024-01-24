import { createSignal,createEffect } from "solid-js";
import styles from "../../css/Insert.module.css";
import axios from 'axios';
function ModificaRistorante(){

const [nCivico,setNCivico]=createSignal("");
const [cap,setCap]=createSignal("");
const [via,setVia]=createSignal("");
const [provincia,setProvincia]=createSignal("");
const [telefono,setTelefono]=createSignal("");
const IdRistorante=sessionStorage.getItem('IdRistorante');
const token=sessionStorage.getItem('tokenAuth');

//Funzione per la modifica dei dati di un ristorante
createEffect(()=>{ const fetchData = async () => {
    try {
      //Chiamata all'API
      const response = await axios.get(`http://localhost:8080/ristorante/getRistorante/${IdRistorante}`);
      setNCivico(response.data.n_Civico);
      setCap(response.data.cap);
      setVia(response.data.via);
      setProvincia(response.data.provincia);
      setTelefono(response.data.telefono);
      
  

    } catch (error) {
      //Gestione degli errori
      console.error("Errore durante la richiesta GET", error);
    }
  }
  fetchData();

});

async function modify(event) {
  event.preventDefault();
  try {
    const response = await axios.post(`http://localhost:8080/ristorante/updateRistorante/${IdRistorante}`, {
      n_Civico: nCivico() ,
      cap: cap(),
      via: via(),
      provincia: provincia(),
      telefono: setTelefono(),     
    },
    { headers: {
      Authorization: `Bearer ${token}`,
    }
  } 
    ,);
    sessionStorage.removeItem('IdRistorante');
    window.location.href='/dashBoard';

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
    return(
        <main class={styles.cd__main}>
        <form class={styles.form}>
          <h1>Modifica ristorante:</h1>
        <div class={styles.elemGroup}>
                <label>Via:</label>
                <input type="mail" value={via()} onInput={(e)=>setVia(e.target.value)} required=""/>
            </div>
            <div class={styles.elemGroupAddress}>
                    <label>N.Civico</label>
                    <input type="text" value={nCivico()} onChange={(event)=>{setNCivico(event.target.value);}}placeholder="23" required/>
                    <label>CAP</label>
                    <input type="text" value={cap()} onChange={(event)=>{setCap(event.target.value);}}placeholder="81100" required></input>
                    <label>Provincia</label>
                    <input type="text" value={provincia()} onChange={(event)=>{setProvincia(event.target.value);}}placeholder="CE" required></input>
                </div>
            
            <div class={styles.elemGroup}>
                <label>Cellulare:</label>
                <input type="tel" value={telefono()} onInput={(e)=>setTelefono(e.target.value)} required=""/>
            </div>
         
    
            <button class={styles.buttonForm} onClick={modify} style="margin-top:10px" type="submit">Modifca</button>
        </form>
    </main>
        );
}
export default ModificaRistorante;