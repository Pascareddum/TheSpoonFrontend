import { createSignal } from "solid-js"
import styles from "../css/DashBoard.module.css"
    const DashBoard=()=>{
        const[user,setUser]=createSignal({});
    return(
<div class={styles.container}>
    <h1>Ciao *Nome e Cognome*</h1>
    <div class={styles.dashboard}>
        <div class={styles.options}>
            <button>Logout</button>
            <button onClick={() => window.location.href = '/inserisciRistorante'}>INSERISCI RISTORANTE</button><br/>
            <button onClick={() => window.location.href = '/'}>MODIFICA DATI PERSONALI</button><br/>
            <button onClick={() => window.location.href = '/'}> I MIEI RISTORANTI</button>
            <button style="background:linear-gradient(to right,#777777,#777777)!important; color: black"> MODIFICA RISTORANTE <br/></button><br/><br/>
        </div>
    </div>
</div>
    )
    }
export default  DashBoard
