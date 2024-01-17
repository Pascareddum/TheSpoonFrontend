import { createSignal, onCleanup } from "solid-js";
import styles from "../css/DashBoard.module.css";
import axios from "axios"; 
import { useEffect } from "react";

function DashBoard(){
        const token=sessionStorage.getItem('token');
        const [userData,setUserData]=createSignal(null);

       const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:8080/dashboard/ristoratoreDetails", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserData(response.data);
        } catch (error) {
          console.error("Errore durante la richiesta GET", error);
        }
      };

    onCleanup(()=>{
        fetchData();
    })

    
    return(<>
<div class={styles.container}>
    <h1>Ciao{userData().nome} {userData().cognome}</h1>
    <div class={styles.dashboard}>
        <div class={styles.options}>
            <a>Logout</a><br/>
            <a onClick={() => window.location.href = '/inserisciRistorante'}>INSERISCI RISTORANTE</a><br/>
            <a onClick={() => window.location.href = '/'}>MODIFICA DATI PERSONALI</a><br/>
            <a onClick={() => window.location.href = '/'}> I MIEI RISTORANTI</a>
            <a> MODIFICA RISTORANTE <br/></a><br/><br/>
        </div>
    </div>
</div>
</>
    )
    }
export default  DashBoard
