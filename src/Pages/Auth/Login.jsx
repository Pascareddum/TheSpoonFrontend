import { createSignal } from 'solid-js';
import styles from '../../css/Insert.module.css';
import axios from 'axios';

function Login(){
  const[email,setEmail]=createSignal("");
  const[password,setPassword]=createSignal("");

  //Funzione alla chiamata di login
  async function log(event) {
    event.preventDefault();
    try {
      //Chiamata all'API
      const response = await axios.post("http://localhost:8080/auth/login", {
          email: email(),
          password: password(),
        });
      const token = response.data.token; 
      //Salvataggio del token di autenticazione all'interno della sessione
      sessionStorage.setItem('tokenAuth',token); 
      window.location.href='/';
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
  
  return (
    <>
      <main class={styles.cd_main}>
        <form class={styles.form}>
          <h1>Login:</h1>
          <div class={styles.elemGroup}>
            <label>Email:</label>
            <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email()}placeholder="mickeymouse@gmail.com"/>
          </div>
          <div class={styles.elemGroup}>
            <label>Password:</label>
            <input  type="password"   onChange={(e)=>setPassword(e.target.value)} value={password()} placeholder="********"/>
          </div>
          <p>Non hai un account? <a href="/signUp">Registrati</a></p>
          <button class={styles.buttonForm} onClick={log} style="margin-top:10px" type="submit">Accedi</button>
        </form>
      </main> 
    </>
  )
}
  export default Login


