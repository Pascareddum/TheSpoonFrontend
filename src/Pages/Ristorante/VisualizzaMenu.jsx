import styles from '../../css/Visualizza.module.css'
import axios from 'axios';
import { createSignal,createEffect } from 'solid-js';
function VisualizzaMenu(){
    const [menusList,setMenusList]=createSignal({
        menus: [],
    });
    const idRistorante=sessionStorage.getItem("IdRistorante");
    createEffect(()=>{ const fetchData = async () => {
        try {  
          const response = await axios.get(`http://localhost:8080/ristorante/getMenuByIDRistorante/${idRistorante}`);
          setMenusList({...menusList(), menus: response.data });
        } catch (error) {
          console.error("Errore durante la richiesta GET", error);
        }
      };
        fetchData();
    });
    function visualizzaProdotti(){
        window.location.href=('/visualizzaProdotti');
    }

    function aggiungiProdottoMenu(menuID){
        sessionStorage.setItem('IDMenu',menuID);
        window.location.href=('/aggiungiProdottoMenu');
    }

    function visualizzaProdottiMenu(menuID){
        sessionStorage.setItem('IDMenu',menuID);
        window.location.href=('/visualizzaProdottiMenu');
    }
    
    return(
        <>
    
        <div class={styles.container}>
            <h1> I tuoi menù:</h1>
            <button class={styles.button}onClick={()=>(window.location.href=('/inserisciMenu'))}>INSERISCI MENÙ</button>
            <button class={styles.button} onClick={()=>visualizzaProdotti()}>VISUALIZZA TUTTI I PRODOTTI</button>

            {menusList().menus.map((menu) => (
                <div class={styles.dashboard}>
                    <li key={menu.id}>{menu.nome}</li>
                    <button class={styles.button} onClick={()=>aggiungiProdottoMenu(menu.id)}>AGGIUNGI PRODOTTO</button>
                    <button class={styles.button} onClick={()=>visualizzaProdottiMenu(menu.id)}>VISUALIZZA PRODOTTI DEL MENÙ</button>

                </div>

        ))}  
            </div>
        </>
    );

}
export default VisualizzaMenu;