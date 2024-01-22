import axios from "axios"
import styles from "../css/Insert.module.css"
import { createSignal,createEffect } from "solid-js"
export default function PrenotaRistorante(){
    const[email,setEmail]=createSignal("");
    const[telefono,setTelefono]=createSignal("");
    const[data,setData]=createSignal("");
    const[ora,setOra]=createSignal();
    const[nrPersone,setNrPersone]=createSignal("");
    const [tavoliList,setTavoliList]=createSignal({
        tavoli: [],
    });
    const [tavoliSelezionati,setTavoliSelezionati] = createSignal([]);
    const idRistorante=sessionStorage.getItem("IdRistorante");

    createEffect(()=>{ const fetchData = async () => {
        try {  
          const response = await axios.get(`http://localhost:8080/ristorante/getTavoliRistorante/${idRistorante}`);
          setTavoliList({...tavoliList(), tavoli: response.data });
        } catch (error) {
          console.error("Errore durante la richiesta GET", error);
        }
      };
        fetchData();
    });

    const handleChange=(e)=>{
        setNrPersone(e.target.value);
        console.log(ora());

        sceltaTavoli();
      }

      function sceltaTavoli(){
        const tavoliDisponibili = tavoliList().tavoli.filter(tavolo => tavolo.stato == 0);
        tavoliDisponibili.sort((a, b) => Math.abs(a.capacita - nrPersone()) - Math.abs(b.capacita - nrPersone()));
        const capacita=calcolaSommaCapacita();
        let capacitaTotale = 0;
        const selezionati=[]
        for (const tavolo of tavoliDisponibili) {
            if (capacitaTotale < nrPersone()) {
                selezionati.push(tavolo.numeroTavolo);
            capacitaTotale += tavolo.capacita;
            }
        }
        setTavoliSelezionati(selezionati);
      }

    function calcolaSommaCapacita ()  {
        const tavoliArray = tavoliList().tavoli.filter(tavolo=>tavolo.stato==0);
        const max=tavoliArray.reduce((acc, tavolo) => acc + tavolo.capacita, 0);
        if(nrPersone()>max)
        alert("Capacità massima superatà, il ristorante ha solo "+max+" coperti disponibili");
        return max;
      }

    

    async function prenota() {
        //const [ore, minuti, secondi] = ora().split(':');
        const oraSQL=new Date();
        //oraSQL.setHours(parseInt(ore,10),parseInt(minuti,10),parseInt(secondi,10));
        //console.log(oraSQL);
        try {
          const response = await axios.post("http://localhost:8080/prenotazioni/insertPrenotazione", {
                tableIDs: tavoliSelezionati(),
                data: data(),
                ora: "13:00:00",
                nr_Persone: nrPersone(),
                email:email(),
                telefono: telefono(),
                idRistorante: idRistorante,
                chatID: '000000000',
          },{headers: {
            'Content-Type': 'application/json'
          }});
          console.log(response.data);
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
    <form class={styles.form} action="#" method="post">
        <div class={styles.elemGroup}>
            <label>E-mail</label>
            <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email()} placeholder="VincenzoEsposito@gmail.com" required=""/>
        </div>
        <div class={styles.elemGroup}>
            <label>Cellulare</label>
            <input type="tel" onChange={(e)=>setTelefono(e.target.value)} value={telefono()} placeholder="498-348-3872" pattern="(\\d{3})-?\\s?(\\d{3})-?\\s?(\\d{4})" required=""/>
        </div>
        <hr/>
        <div class={styles.elemGroupIn}>
            <label>Nr. Persone</label>
            <input type="number" onChange={handleChange} value={nrPersone()} placeholder="2" min="1" required=""/>
        </div>

        <div class={styles.elemGroupIn}>
            <label>Data:</label>
            <input type="date"  onChange={(e)=>setData(e.target.value)} value={data()}required=""/>
        </div>
        <div class={styles.elemGroupIn}>
            <label>Ora:</label>
            <input type="time"  onChange={(e)=>setOra(e.target.value)} value={ora()} required=""/>
        </div>
        <hr/>

        <button class={styles.buttonForm} onClick={()=>prenota()}type="submit">Prenota</button>
    </form>
</main>
    )
}