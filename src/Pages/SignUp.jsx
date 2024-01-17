import { createSignal,createEffect } from "solid-js";
import axios from 'axios';
import styles from '../css/LoginSignUp.module.css'

function SignUp(){ 
  const[username,setUsername]=createSignal(" ");
  const[surname,setSurname]=createSignal(" ");
  const[password,setPassword]=createSignal(" ");
  const[rePassword,setRePassword]=createSignal(" ");
  const[email,setEmail]=createSignal(" ");
  const[cellular,setCellular]=createSignal(" ");
  const[birthday,setBirthday]=createSignal(" ");
 
  async function save(event){
    event.preventDefault();
    try{
      await axios.post("http://localhost:8080/auth/signup",{
        username: username,
        surname: surname,
        password: password,
        rePassword: rePassword,
        email: email,
        cellular: cellular,
        birthday: birthday,
      });
      alert("Ristoratore registrato con successo");
    }catch(err){
      alert(err);
    }
  }

    return(
    <main class={styles.cd_main}>
    <form class={styles.signForm} method="POST" >
      <div class={styles.elemGroup}>
      <label>
        Nome:
        <input type="text"  placeholder='Mickey'
        onChange={(event)=>{
          setUsername(event.target.value);
          }}/>
      </label>
      </div>
      <div class={styles.elemGroup}>
      <label>
        Cognome:
        <input type="text"  onChange={(e)=>setSurname(e.target.value)} placeholder='Mouse'/>
      </label>
      </div>
      <div class={styles.elemGroup}>
      <label>
        Email:
        <input type="email" onChange={(e)=>setEmail(e.target.value)} placeholder='mickeymouse@mail.com'/>
      </label>
      </div>
      <div class={styles.elemGroup}>
      <label>
        Password:
        <input type="password"  onChange={(e)=>setPassword(e.target.value)} placeholder='*****'/>
      </label>
      </div>
      <div class={styles.elemGroup}>
        <label>
          Conferma password:
          <input type="password"  onChange={(e)=>setRePassword(e.target.value)} placeholder='*****'/>
        </label>
      </div>
      <div class={styles.elemGroup}>
      <label>
        Cellulare:
        <input type="tel"  onChange={(e)=>setCellular(e.target.value)} placeholder='+39 0000000000'/>
      </label>
      </div>
      <div class={styles.elemGroup}>
      <label>
        Data di nascita:
        <input type="date" onChange={(e)=>setBirthday(e.target.value)}></input>
      </label>
      </div>
      <p>Hai già un account? <a href='/login'>Accedi</a>  </p>
      <button onClick={save} class={styles.buttonForm} style="margin-top:10px" type="submit">Registrati</button>
    </form>
    </main>
    );
}

export default SignUp

