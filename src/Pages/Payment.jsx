// DettagliOrdine.jsx

import { createSignal } from "solid-js";
import axios from "axios"; 



function DettagliOrdine(props) {
    const data = props.data;
    console.log(data.idordine);

    // Funzione per gestire il pagamento
const handlePayment = async () => {
    try {
      // Chiamata all'API di pagamento
      const response = await axios.post(`http://localhost:8080/pagamenti/pay/${data.idordine}/${data.idristorante}`);
      const link = response.data;
      alert("Risposta api: " + link);
      window.location.href=link;
      
      // Log della risposta (opzionale)
      console.log("Risposta dall'API di pagamento:", response.data);

    } catch (error) {
      // Gestione degli errori
      console.error("Errore durante la chiamata API di pagamento:", error);
    }
  };

  return (
    <div>
    <h1>Dettagli Ordine</h1>
    <table>
      <tbody>
        <tr>
          <th>ID Ordine</th>
          <td>{data.idordine}</td>
        </tr>
        <tr>
          <th>Tipologia</th>
          <td>{data.tipologia}</td>
        </tr>
        <tr>
          <th>ID Ristorante</th>
          <td>{data.idristorante}</td>
        </tr>
        <tr>
          <th>Numero Tavolo</th>
          <td>{data.nr_Tavolo}</td>
        </tr>
        <tr>
          <th>Totale</th>
          <td>{data.totale}</td>
        </tr>
        <tr>
          <th>Stato</th>
          <td>{data.stato}</td>
        </tr>
        <tr>
          <th>Chat ID</th>
          <td>{data.chatId}</td>
        </tr>
        <tr>
          <th>Ora</th>
          <td>{data.ora}</td>
        </tr>
      </tbody>
    </table>
    <button onClick={handlePayment}>Paga</button>
  </div>
  );
}

export default DettagliOrdine;