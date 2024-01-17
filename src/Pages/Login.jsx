import { createSignal } from 'solid-js';
import styles from '../css/LoginSignUp.module.css';

  const Login=()=>{
    const[email,setEmail]=createSignal('');
    const[password,setPassword]=createSignal('');
  return (
    <>
    
    <main class={styles.cd_main}>
    <form class={styles.signForm}>
    <div class={styles.elemGroup}>
        <label for="email">Email</label>
        <input type="email" onChange={(e)=>setEmail(e.target.value)} placeholder="mickeymouse@gmail.com"/>
    </div>
    <div class={styles.elemGroup}>
        <label for="password">Password</label>
        <input  type="password"   onChange={(e)=>setPassword(e.target.value)} placeholder="********"/>
    </div>
    <p>Non hai un account? <a href="/signUp">Registrati</a></p>
    <button class={styles.buttonForm} style="margin-top:10px" type="submit">Accedi</button>
</form>
</main> 
    </>
  )
  }
  export default Login


