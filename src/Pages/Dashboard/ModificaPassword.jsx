import { createSignal } from "solid-js";
import axios from "axios";
import styles from '../../css/Insert.module.css';
function ModficaPassword(){
    const[password,setPassword]=createSignal("");
    const[rePassword,setRePassword]=createSignal("");
    const token=sessionStorage.getItem('tokenAuth');

    async function modify(event) {
        event.preventDefault();
        try {
          const response = await axios.post("http://localhost:8080/dashboard/updatePassword", {
            password:password(),
            rePassword:rePassword(),
          },
          { headers: {
            Authorization: `Bearer ${token}`,
          }
        } 
          );
          alert("Password modificata con successo");
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
          <h1>Modifica password:</h1>
            <div class={styles.elemGroup}>
                <label for="name">Password:</label>
                <input type="password" 
                value={password()} onInput={(e)=>setPassword(e.target.value)} required=""/>
            </div>
            <div class={styles.elemGroup}>
                <label>Conferma password:</label>
                <input type="password" value={rePassword()} onInput={(e)=>setRePassword(e.target.value)}required=""/>
            </div>
         
    
            <button class={styles.buttonForm} onClick={modify} style="margin-top:10px" type="submit">Modifca</button>
        </form>
    </main>
    );
    
}
export default ModficaPassword;