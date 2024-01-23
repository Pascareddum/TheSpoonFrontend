import axios from "axios"
import styles from "../css/Insert.module.css"
import { createSignal,createEffect } from "solid-js"

export default function PrenotaRistorante(){
  const[email,setEmail]=createSignal("");
  const[telefono,setTelefono]=createSignal("");
  const[data,setData]=createSignal("");
  const[ora,setOra]=createSignal();
  const[nrPersone,setNrPersone]=createSignal("");
  const [tavoliList,setTavoliList]=createSignal({
    tavoli: [],
  });
  const [tavoliSelezionati,setTavoliSelezionati] = createSignal([]);
  const [chatID,setChatID]=createSignal();
  const idRistorante=sessionStorage.getItem("IdRistorante");

  //Funzione per ottenere i tavoli del ristorante selezionato
  createEffect(()=>{ const fetchData = async () => {
    try {  
      //Chiamata all'API
      const response = await axios.get(`http://localhost:8080/ristorante/getTavoliRistorante/${idRistorante}`);
      setTavoliList({...tavoliList(), tavoli: response.data });
    } catch (error) {
        //Gestione degli errori 
        console.error("Errore durante la richiesta GET", error);
      }
  };
  fetchData();
  });

  const handleChange=(e)=>{
    setNrPersone(e.target.value);
    sceltaTavoli(); //Chiamata alla funzione per la gestione dei tavoli
  }

  //Funzione per gestire i tavoli disponibili in base al numero di persone
  function sceltaTavoli(){
    const tavoliDisponibili = tavoliList().tavoli.filter(tavolo => tavolo.stato == 0);
    tavoliDisponibili.sort((a, b) => Math.abs(a.capacita - nrPersone()) - Math.abs(b.capacita - nrPersone()));
    calcolaSommaCapacita(); //Chiamata alla funzione per la gestione dei coperti
    let capacitaTotale = 0;
    const selezionati=[]
    for (const tavolo of tavoliDisponibili) {
      if (capacitaTotale < nrPersone()) {
        selezionati.push(tavolo.numeroTavolo);
        capacitaTotale += tavolo.capacita;
      }
    }
    setTavoliSelezionati(selezionati);
  }

  //Funzione che calcola il massimo di coperti disponibili all'interno del ristorante
  function calcolaSommaCapacita ()  {
    const tavoliArray = tavoliList().tavoli.filter(tavolo=>tavolo.stato==0);
    const max=tavoliArray.reduce((acc, tavolo) => acc + tavolo.capacita, 0);
    if(nrPersone()>max)
      //Avviso all'utente del massimo di coperti superato
      alert("Capacità massima superatà, il ristorante ha solo "+max+" coperti disponibili");
    return max;
  }

    
  //Funzione di prenotazione
  async function prenota() {
    preventDefault()
    try {
      //Chiamata all'API di prenotazione
      const response = await axios.post("http://localhost:8080/prenotazioni/insertPrenotazione", {
        tableIDs: tavoliSelezionati(),
        data: data(),
        ora: ora(),
        nr_Persone: nrPersone(),
        email:email(),
        telefono: telefono(),
        idRistorante: idRistorante,
        chatID: chatID(),
      },
      {headers: {
        'Content-Type': 'application/json'
      }});
      
      alert("Prenotazione effettuata!");
      window.location.href=('/')
          
    } catch (error) {
        //Gestione degli errori
        if (error.response) {
          console.error("Errore:\t", error.response.data);
          alert("Errore:\n" + error.response.data.message);
        } else {
            console.error("Errore durante la richiesta al server:\n", error.message);
            alert("Errore durante la richiesta al server:\n" + error.message);
          }
    }
  }

  //Funzione informativa per l'utente riguardo l'utilizzo del chatID  
  function chatIDInfo(){
    alert("Contatta @TheSpoonBot su telegram e inserisci in questo campo il ChatID che ti restituirà, facendolo potrai ottenere notifiche sullo stato della tua prenotazione");
  }
    


   
  return(
    <main class={styles.cd__main}>
      <form class={styles.form} action="#" method="post">
        <div class={styles.elemGroup}>
          <label>E-mail</label>
          <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email()} placeholder="VincenzoEsposito@gmail.com" required=""/>
        </div>
        <div class={styles.elemGroup}>
          <label>Cellulare</label>
          <input type="tel" onChange={(e)=>setTelefono(e.target.value)} value={telefono()} placeholder="498-348-3872" required=""/>
        </div>
        <hr/>
        <div class={styles.elemGroupIn}>
          <label>Nr. Persone</label>
          <input type="number" onChange={handleChange} value={nrPersone()} placeholder="2" min="1" required=""/>
        </div>
        <div class={styles.elemGroupIn}>
          <label>Data:</label>
          <input type="date"  onChange={(e)=>setData(e.target.value)} value={data()}required=""/>
        </div>
        <div class={styles.elemGroupIn}>
          <label>Ora:</label>
          <input type="time"  step="1" onChange={(e)=>setOra(e.target.value)} value={ora()} required=""/>
        </div>
        <div class={styles.elemGroupIn}>
          <label>Chat ID<a href="" onClick={()=>chatIDInfo()}>(Cos'è?)</a>: </label>
          <input type="number" onChange={(e)=>setChatID(e.target.value)} value={chatID()} required=""/>
        </div>
        <hr/>
        <button class={styles.buttonForm} onClick={()=>prenota()}type="submit">Prenota</button>
      </form>
    </main>
  )
}