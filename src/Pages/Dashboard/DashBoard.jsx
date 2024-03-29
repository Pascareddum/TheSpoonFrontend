import { createEffect, createSignal, onCleanup } from "solid-js";
import styles from "../../css/DashBoard.module.css";
import axios from "axios"; 

function DashBoard(){
  const token=sessionStorage.getItem('tokenAuth'); 
  if(token==null) //Se non c'è nessun token, l'utente ritorna alla home
    window.location.href=('/');
  const[nome,setNome]=createSignal("");
  
  //Funzione per ottenere i dettagli di un utente tramite il proprio token
  createEffect(()=>{ const fetchData = async () => {
    try {
      //Chiamata all'API
      const response = await axios.get("http://localhost:8080/dashboard/ristoratoreDetails", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNome(response.data.nome);
      sessionStorage.setItem('tokenId',response.data.id);
    } catch (error) {
        //Sessione scaduta, l'utente è obbligato a rieffettuare l'accesso
        alert("Token scaduto, rieffettua il login!");
        Logout();
        console.error("Errore durante la richiesta GET", error);
    }
  };
  fetchData();
  });
      
  //Funzione di logout
  function Logout(){
    sessionStorage.removeItem('tokenAuth');
    sessionStorage.removeItem('tokenId');
    window.location.href=('/');
  }

  return(
    <>
      <div class={styles.container}>
        <h1>Ciao {nome()}!</h1>
        <div class={styles.dashboard}>
          <div class={styles.options}>
            <button onClick={Logout}>LOGOUT</button> <br/>
            <button onClick={() => window.location.href = '/modifcaAuth'}>MODIFICA DATI</button>
            <button onClick={()=>window.location.href='/modificaPassword'}>MODIFICA PASSWORD</button> <br/>
            <button onClick={() => window.location.href = '/inserisciRistorante'}>INSERISCI RISTORANTE</button>
            <button onClick={() => window.location.href = '/iMieiRistoranti'}> I MIEI RISTORANTI</button>
          </div>
        </div>
      </div>
    </>
  )
}
export default DashBoard;
