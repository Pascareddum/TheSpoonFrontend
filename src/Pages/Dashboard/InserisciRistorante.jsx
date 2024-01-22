import { createEffect, createSignal } from "solid-js";
import axios from "axios";
import styles from "../../css/Insert.module.css"
export default function InserisciRistorante(){
    const[nome,setNome]=createSignal("");
    const[telefono,setTelefono]=createSignal("");
    const[via,setVia]=createSignal("");
    const[nCivico,setNCivico]=createSignal("");
    const[cap,setCap]=createSignal("");
    const[provincia,setProvincia]=createSignal("");
    
    
    const tokenAuth=sessionStorage.getItem('tokenAuth');
    async function insert(event) {
        event.preventDefault();
            setTelefono(`0039${telefono()}`);
      
            try {
          const response = await axios.post("http://localhost:8080/ristorante/insertRistorante", {
           
                nome: nome(),
                n_Civico: nCivico(),
                cap: cap(),
                via: via(),
                provincia: provincia(),
                telefono: telefono(),
          },
          {headers: {
            Authorization: `Bearer ${tokenAuth}`,
          }
        }
          );
      
          const tokenRistorante = response.data.token;
          console.log("token generato",tokenRistorante);
          sessionStorage.setItem('tokenRistorante',tokenRistorante);
          window.location.href=('/dashBoard')
        } catch (error) {
            if (error.response) {
              console.error("Errore:\n", error.response.data);
              alert("Errore:\n" + error.response.data.message);
            } else {
              console.error("Errore durante la richiesta al server:\n", error.message);
              alert("Errore durante la richiesta al server:\n" + error.message);
            }
          }
        }
    return (
        <main class={styles.cd__main}>
            <form class={styles.form}>
                <div class={styles.elemGroup}>
                    <label>Nome</label>
                    <input type="text" value={nome()} onChange={(event)=>{setNome(event.target.value);}}  placeholder="Pizzeria da Mario" pattern="[A-Z\\sa-z]{3,20}" required=""/>
                </div>
                <div class={styles.elemGroup}>
                    <label for="phone">Telefono</label>
                <input type="tel"  value={telefono()} onChange={(event)=>{setTelefono(event.target.value);}}placeholder="498-348-3872" pattern="0039-\d{3}-\d{7,}" required=""/>
                </div>
                <hr/>
                <div class={styles.elemGroup}>
                    <label>Via</label>
                    <input value={via()} onChange={(event)=>{setVia(event.target.value);}}type="text" placeholder="Roma"required=""/>
                </div>
                <div class={styles.elemGroupAddress}>
                    <label>N.Civico</label>
                    <input type="text" value={nCivico()} onChange={(event)=>{setNCivico(event.target.value);}}placeholder="23" required/>
                    <label>CAP</label>
                    <input type="text" value={cap()} onChange={(event)=>{setCap(event.target.value);}}placeholder="81100" required></input>
                    <label>Provincia</label>
                    <input type="text" value={provincia()} onChange={(event)=>{setProvincia(event.target.value);}}placeholder="CE" required></input>
                </div>
                <br/> <br/>
                <button class={styles.buttonForm} onClick={insert} style="margin-top:10px" type="submit">INSERISCI</button>
            </form>
        </main>
    );
}