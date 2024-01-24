import styles from "../../css/Ordini.module.css"
import mealIcon from "../../images/meal_icon.png"
import { createEffect,createSignal } from "solid-js";
import axios from "axios";

export default function Ordini(){
    const [menusList,setMenusList]=createSignal({
        menus: [],
    });
    const [prodottiList,setProdottiList]=createSignal({
        prodotti: [],
    });

    const[nomeMenu,setNomeMenu]=createSignal("");
    const[idOrdini,setIDOrdini]=createSignal([]);
    const [ordini, setOrdini] = createSignal([]);
    const [mostraOrdini, setMostraOrdini] = createSignal(false);
    const [tipoOrdine,setTipoOrdine]=createSignal(false);
    const [tipo,setTipo]=createSignal(false);
    const [numeroTavolo,setNumeroTavolo]=createSignal(null);
    const [chatID,setChatID]=createSignal("");
    const [tipologia,setTipologia]=createSignal("0");


    const idRistorante=sessionStorage.getItem("IdRistorante");
    //Funzione per ottenere una lista dei menù di un ristorante
    createEffect(()=>{ const fetchData = async () => {
        try {  
          //Chiamata all'API
          const response = await axios.get(`http://localhost:8080/ristorante/getMenuByIDRistorante/${idRistorante}`);
          setMenusList({...menusList(), menus: response.data });
        } catch (error) {
          //Gestione degli errori
          console.error("Errore durante la richiesta GET", error);
        }
      };
        fetchData();
    });
    

    function prodotti(menuID,nomeMenu){
        setNomeMenu(nomeMenu);
        //Funzione per ottenere i prodotti di un menù
       const prodottiMenu = async () => {
            try {  
              //Chiamata all'API
              const response = await axios.get(`http://localhost:8080/ristorante/getProdottiByIDMenu/${menuID}`);
              setProdottiList({...prodottiList(), prodotti: response.data });

            } catch (error) {
              //Gestione degli errori
              console.error("Errore durante la richiesta GET", error);
            }
          };
            prodottiMenu();
    }

    //Funzione per aggiungere un prodotto alla lista degli ordini
    function Aggiungi(prodotto){
      setIDOrdini([...idOrdini(), prodotto.id]);
      const prodottoEsistente = ordini().find(item => item.id === prodotto.id);
      if (prodottoEsistente) {
        // Se il prodotto è già nel carrello, aumenta la quantità di 1
        const nuovoOrdine = ordini().map(item =>
          item.id === prodotto.id ? { ...item, quantita: item.quantita + 1 } : item
        );
        setOrdini(nuovoOrdine);
      } else {
        // Se il prodotto non è nel carrello, aggiungilo con quantità 1
        setOrdini([...ordini(), { ...prodotto, quantita: 1 }]);
      }
    }

    //Funzione di visualizzazione del proprio ordine
    function Visualizza(){
      setMostraOrdini(true);
      //console.log(prodottiDaMostrare());
    }

    //Funzione per poter aggiungere un prodotto al proprio ordine
    function Ordina(){
      setMostraOrdini(false);
      setTipoOrdine(true);
      if(tipo()==true)
        setTipologia("1");
    }

    //Funzione di inoltro ordine al ristorante
    async function insert(){
        try {
          //Chiamata all'API
          const response = await axios.post("http://localhost:8080/ordini/insertOrdine", {
           productsIDs: idOrdini(),
           numeroTavolo: numeroTavolo(),
           chatID: chatID(),
           idRistorante: idRistorante,
           tipologia: tipologia(),
          },{headers: {
            'Content-Type': 'application/json'
          }});
          alert("ORDINE EFFETTUATO");
          console.log(response.data);
          localStorage.setItem('orderResponse', JSON.stringify(response.data));
          window.location.href=('/payment');
        } catch (error) {
          //Gestione dell'errore
          if (error.response) {
            console.error("Errore:\t", error.response.data);
            alert("Errore:\n" + error.response.data.message);
          } else {
            console.error("Errore durante la richiesta al server:\n", error.message);
            alert("Errore durante la richiesta al server:\n" + error.message);
          }
        }
      }
    
      //alert di info sul funzionamento del chatID
      function chatIDInfo(){
        alert("Contatta @TheSpoonBot su telegram e inserisci in questo campo il ChatID che ti restituirà, facendolo potrai ottenere notifiche sullo stato del tuo ordine");
      }
    return(
      <>
        {!tipoOrdine() && (
          <>
          <div class={styles.choice}>
          <h1>Che tipo di ordine?</h1>
          <label>
          <input type="radio" name="radio"  onChange={(e)=>setTipo(true)}/>AL TAVOLO</label>
          <label>
          <input type="radio" name="radio" onChange={(e)=>setTipo(false)}/>TAKE AWAY</label>
          <button class={styles.continue} onClick={()=>Ordina()}> Continua</button>
          </div>
          </>
        )}
        {!mostraOrdini() && tipoOrdine() && (
        <div class={styles.container}>
                <div class={styles.header}>
                {prodottiList().prodotti.length === 0 ?(
            <h2>Seleziona un menù! </h2>):null}
                  {prodottiList().prodotti.length !== 0 ?(
            <h2>{nomeMenu()} </h2>):null}</div>

    <div class={styles.category}>
    {menusList().menus.map((menu) => (
        <button onClick={(()=>prodotti(menu.id,menu.nome))} value={menu.id}>{menu.nome}</button>
    ))}
    </div>
    <div class={styles.products}>
  
        
    {prodottiList().prodotti.map((prodotto) => (
        <div class={styles.product}>
            <img src={mealIcon} alt="immagine prodotto"/>
            <h3>{prodotto.nome}</h3>
            <p>{prodotto.descrizione}</p>
            <button onClick={()=>Aggiungi(prodotto)}>AGGIUNGI</button>
        </div>
    ))}
    </div>
    <div class={styles.footer}>
        <button onClick={()=>Visualizza()}>VISUALIZZA ORDINI</button>
    </div>
</div>
        )}
      {mostraOrdini() && (
        <div class={styles.viewOrder}>
          <h1>La tua ordinazione:</h1>
          <button class={styles.backButton} onClick={()=>Ordina()}>TORNA AD ORDINARE</button><br/>
          {tipo()===true ?(
        <>
        <label>Inserisci il numero del tavolo:
          <input type="number" value={numeroTavolo()} onChange={(e)=>setNumeroTavolo(e.target.value)}></input></label></>
          ):true}

          <table style={{borderCollapse:'collapse',width: '100%'}}>
            <thead>
            <tr>
              <th>NOME</th>
              <th>PREZZO</th>
              <th>QUANTITA</th>
            </tr>
            </thead>
            <tbody>
      {ordini().map((ordine) => (
     <tr >
       <td key={ordine.id} >{ordine.nome}</td> 
       <td>{ordine.prezzo}€</td>
        <td>{ordine.quantita}</td>
     </tr>
       ))}
          </tbody>
      </table>
      <label>Inserisci il chatID:<a href="" onClick={()=>chatIDInfo()}>(Cos'è?)</a>
          <input type="number"  value={chatID()} onChange={(e)=>setChatID(e.target.value)}required=""> </input></label>
          <button class={styles.orderButton} onClick={()=>insert()}>CONFERMA</button>
      </div>
      
        
      )}
</>


    )
}