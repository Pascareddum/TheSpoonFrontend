import { createEffect,createSignal } from "solid-js";
import styles from '../../css/Visualizza.module.css';
import axios from "axios";
function VisualizzaProdottiMenu(){
    const [prodottiList,setProdottiList]=createSignal({
        prodotti: [],
    });
    const idMenu=sessionStorage.getItem("IDMenu");
    const idRistorante=sessionStorage.getItem("IdRistorante");
    const token=sessionStorage.getItem('tokenAuth');

    
    createEffect(()=>{ const fetchData = async () => {
        try {  
           
          const response = await axios.get(`http://localhost:8080/ristorante/getProdottiByIDMenu/${idMenu}`);
          setProdottiList({...prodottiList(), prodotti: response.data });
        } catch (error) {
          console.error("Errore durante la richiesta GET", error);
        }
      };
        fetchData();
    });

    function rimuovi(idProdotto){
        const removeProduct= async()=>{
            try{
                const response= await axios.delete(`http://localhost:8080/ristorante/removeProductMenu/${idMenu}/${idProdotto}/${idRistorante}`,
                {  headers: {
                    Authorization: `Bearer ${token}`,
                  }
                }
                )
                alert("Prodotto eliminato correttamente!");
                window.location.reload();

            }catch(error){
                console.error("Errore nella richiesta DELETE",error);
            }
        }

        removeProduct();
    }


    return(
        <>
    
        <div class={styles.container}>
            <h1> I tuoi prodotti:</h1>
            {prodottiList().prodotti.map((prodotto) => (
                <div class={styles.dashboard}>
                    <li key={prodotto.id}>{prodotto.nome} | {prodotto.descrizione} | {prodotto.prezzo}€</li>
                    <button class={styles.button} onClick={()=>rimuovi(prodotto.id)}>RIMUOVI PRODOTTO</button>

                </div>

        ))}  
            </div>
        </>
    );
}
export default VisualizzaProdottiMenu;