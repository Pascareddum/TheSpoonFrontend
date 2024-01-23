// VisualizzaOrdine.jsx

import DettagliOrdine from "./Payment";

function VisualizzaOrdine() {

// Estrai i dati dell'ordine dalle props
  const dataString = localStorage.getItem('orderResponse');
  const data = JSON.parse(dataString)
  const keys = Object.keys(data);
  console.log(data);
  console.log(data.idordine);

  return (
    <div>
      <DettagliOrdine data={data} />
    </div>
  );
}

export default VisualizzaOrdine;