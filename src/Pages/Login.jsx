import { createSignal } from 'solid-js';
import styles from '../css/LoginSignUp.module.css';
import axios from 'axios';

  function Login(){
    const[email,setEmail]=createSignal("");
    const[password,setPassword]=createSignal("");

    async function log(event) {
      event.preventDefault();
      try {
        const response = await axios.post("http://localhost:8080/auth/login", {
          email: email(),
          password: password(),
        });
        const token = response.data.token;
        sessionStorage.setItem('token',token);
        console.log('Risposta del server:\n', response.data);
        window.location.href='/';
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
  return (
    <>
    <main class={styles.cd_main}>
    <form class={styles.signForm}>
    <div class={styles.elemGroup}>
        <label for="email">Email</label>
        <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email()}placeholder="mickeymouse@gmail.com"/>
    </div>
    <div class={styles.elemGroup}>
        <label for="password">Password</label>
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


