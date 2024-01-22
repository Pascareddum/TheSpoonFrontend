import { createSignal, createEffect } from 'solid-js';
import styles from '../../css/Insert.module.css';
import axios from 'axios';

function ModificaAuth(){
    const token=sessionStorage.getItem('tokenAuth');
    if(token==null)
    window.location.href=('/');
    const[nome,setNome]=createSignal("");
    const[cognome,setCognome]=createSignal("");
    const[email,setEmail]=createSignal("");
    const[telefono,setTelefono]=createSignal("");
    const[data_Nascita,setData_Nascita]=createSignal(""); //Non riuscita a modificare a causa del formato

   createEffect(()=>{ const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/dashboard/ristoratoreDetails", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNome(response.data.nome);
      setCognome(response.data.cognome);
      setEmail(response.data.email);
      setTelefono(response.data.telefono);
      setData_Nascita(response.data.data_Nascita);

    } catch (error) {
      console.error("Errore durante la richiesta GET", error);
    }
  };
    fetchData();
   });
    async function modify(event) {
        event.preventDefault();
        try {
          const response = await axios.post("http://localhost:8080/dashboard/updateRistoratoreDetails", {
            nome:nome(),
            cognome:cognome(),
            email: email(),
            telefono: telefono(),
            data_Nascita: data_Nascita(), //Data nascita non modificata per problemi di formato
          },
          { headers: {
            Authorization: `Bearer ${token}`,
          }
        } 
          ,);
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
          <h1>Modifica dati:</h1>
            <div class={styles.elemGroup}>
                <label for="name">Nome:</label>
                <input type="text" 
                value={nome()} onInput={(e)=>setNome(e.target.value)} required=""/>
            </div>
            <div class={styles.elemGroup}>
                <label for="address">Cognome:</label>
                <input type="text" value={cognome()} onInput={(e)=>setCognome(e.target.value)}required=""/>
            </div>
            <div class={styles.elemGroup}>
                <label for="address">Email:</label>
                <input type="mail" value={email()} onInput={(e)=>setEmail(e.target.value)} required=""/>
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
export default ModificaAuth;