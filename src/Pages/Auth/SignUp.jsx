import { createSignal} from "solid-js";
import axios from 'axios';
import styles from '../../css/Insert.module.css'

function SignUp(){ 
  const[nome,setNome]=createSignal("");
  const[cognome,setCognome]=createSignal("");
  const[password,setPassword]=createSignal("");
  const[rePassword,setRePassword]=createSignal("");
  const[email,setEmail]=createSignal("");
  const[telefono,setTelefono]=createSignal("");
  const[data_Nascita,setData_Nascita]=createSignal("");

async function save(event) {
  event.preventDefault();
  try {
    const response = await axios.post("http://localhost:8080/auth/signup", {
      email: email(),
      password: password(),
      rePassword: rePassword(),
      nome: nome(),
      cognome: cognome(),
      telefono: telefono(),
      data_Nascita: data_Nascita()
    });

    const token = response.data.token;
    sessionStorage.setItem('tokenAuth',token);
    window.location.href='/confermaSignUp';
  } catch (error) {
    if (error.response) { //Risolvere messaggi errore di API
      const[error,setError]=createSignal("");
      setError(error.response.data.message);
      const subErrors=error.response.data.subErrors;
      console.error("Errore:\t", error);
      alert("Errore:\n" + error);
      console.error("Sottoerrore:",subErrors);
    } else {
      console.error("Errore durante la richiesta al server:\n", error.message);
      alert("Errore durante la richiesta al server:\n" + error.message);
    }
  }
}

    return(
    <main class={styles.cd_main}>
    <form class={styles.form}>
      <h1>Registrazione:</h1>
      <div class={styles.elemGroup}>
      <label>
        Nome:
        <input type="text" id="nome" placeholder='Mickey'
        onChange={(event)=>{
          setNome(event.target.value);
          }} value={nome()} required/>
      </label>
      </div>
      <div class={styles.elemGroup}>
      <label>
        Cognome:
        <input type="text"   id="cognome" onChange={(e)=>setCognome(e.target.value)}  value={cognome()}placeholder='Mouse'required/>
      </label>
      </div>
      <div class={styles.elemGroup}>
      <label>
        Email:
        <input type="email" value={email()} id="email" onChange={(e)=>setEmail(e.target.value)} placeholder='mickeymouse@mail.com'required/>
      </label>
      </div>
      <div class={styles.elemGroup}>
      <label>
        Password:
        <input type="password" value={password()} id="password" onChange={(e)=>setPassword(e.target.value)} placeholder='*****'required/>
      </label>
      </div>
      <div class={styles.elemGroup}>
        <label>
          Conferma password:
          <input type="password" value={rePassword()} id="rePassword" onChange={(e)=>setRePassword(e.target.value)} placeholder='*****'required/>
        </label>
      </div>
      <div class={styles.elemGroup}>
      <label>
        Cellulare:
        <input type="tel"  value={telefono()} id="telefono" onChange={(e)=>setTelefono(e.target.value)} placeholder='+39 0000000000'required/>
      </label>
      </div>
      <div class={styles.elemGroup}>
      <label>
        Data di nascita:
        <input type="date" value={data_Nascita()} id="data_Nascita" onChange={(e)=>setData_Nascita(e.target.value)} required/>
      </label>
      </div>
      <p>Hai già un account? <a href='/login'>Accedi</a>  </p>
      <button onClick={save} id="inviaForm" class={styles.buttonForm} style="margin-top:10px" type="submit">Registrati</button>
    </form>
    </main>
    );
    
    
        

}

export default SignUp

