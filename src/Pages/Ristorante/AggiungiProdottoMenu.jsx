import { createEffect,createSignal } from "solid-js";
import axios from "axios";
import styles from "../../css/Insert.module.css";
function AggiungiProdottoMenu(){    
    const [prodottiList,setProdottiList]=createSignal({
    prodotti: [],
    otherInfo: [],
});
const [selectedProdotto, setSelectedProdotto] = createSignal(0);
const [nomeRistorante,setNomeRistorante]=createSignal(" ");
const [nomeMenu,setNomeMenu]=createSignal(" ");
const token=sessionStorage.getItem('tokenAuth');
const idRistorante=sessionStorage.getItem("IdRistorante");
const idMenu=sessionStorage.getItem("IDMenu");

//Funzione per ottenere i dettagli di un ristorante tramite il proprio ID
createEffect(()=>{ const fetchData = async () => {
  try {
    //Chiamata all'API
    const response = await axios.get(`http://localhost:8080/ristorante/getRistorante/${idRistorante}`);
    setNomeRistorante(response.data.nome);
  } catch (error) {
    //Gestione degli errori
    console.error("Errore durante la richiesta GET", error);
  }
}
fetchData();
});

//Funzione per ottenere il menù tramite il proprio ID
createEffect(()=>{ const fetchData = async () => {
  try {
    //Chiamata all'API
    const response = await axios.get(`http://localhost:8080/ristorante/getMenuByID/${idMenu}`);
    setNomeMenu(response.data.nome);
  } catch (error) {
    //Gestione degli errori
    console.error("Errore durante la richiesta GET", error);
  }
}
fetchData();

});

//Funzoione per ottenre una lista di prodotti di un ristorante tramite il proprio ID
createEffect(()=>{ const fetchData = async () => {
    try {  
       //Chiamata all'API
      const response = await axios.get(`http://localhost:8080/prodotto/getAllProdottiByIdRistorante/${idRistorante}`);
      setProdottiList({...prodottiList(), prodotti: response.data });
    } catch (error) {
      //Gestione degli errori
      console.error("Errore durante la richiesta GET", error);
    }
  };
    fetchData();
});
//funzione di insermento di un prodotto all'interno del menù
async function insert(event) {
  if (selectedProdotto() !== 0) {
  event.preventDefault();
      try {
        //Chiamata all'API
    const response = await axios.post(`http://localhost:8080/ristorante/addProductToMenu/${idMenu}/${selectedProdotto()}/${idRistorante}`, {},
    {  headers: {
      Authorization: `Bearer ${token}`,
    }
  }
    );
    alert("Prodotto inserito!");
    window.location.href=('/visualizzaMenu');
  } catch (error) {
    //Gestione degli errori
      if (error.response) {
        console.error("Errore:\n", error.response.data);
        alert("Errore:\n" + error.response.data.message);
      } else {
        console.error("Errore durante la richiesta al server:\n", error.message);
        alert("Errore durante la richiesta al server:\n" + error.message);
      }
    }
  }else{ //Se l'utente non ha inserito niente, la chiamata non verrà eseguita
    alert("Inserisci un prodotto!");
  }
}


const handleProdottoChange = (event) => {
    setSelectedProdotto(event.target.value);
  };


    return(
        <>
        <div class={styles.form}>
        <h1>Inserisci prodotto nel ristorante "{nomeRistorante()}"" all'interno del menù "{nomeMenu()}"</h1>
        <select  class={styles.select} onChange={handleProdottoChange} value={selectedProdotto()}>
        <option value={0}>Seleziona un prodotto</option>
        {prodottiList().prodotti.map((prodotto) => (
          <option key={prodotto.id} value={prodotto.id}>
            {prodotto.nome}
          </option>
        ))}
      </select>
     
    
      <button class={styles.buttonForm} onClick={insert} disabled={selectedProdotto===''}> INSERISCI</button>
      </div>

        </>
    )
}
export default AggiungiProdottoMenu;