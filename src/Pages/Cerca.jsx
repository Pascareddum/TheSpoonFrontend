import styles from '../css/Cerca.module.css';
import restaurantIcon from "../images/restaurant_icon.png"
import menuIcon from "../images/menu_icon.png"
import axios from 'axios';

import { createSignal } from 'solid-js';
function Cerca(){
    const [nome, setNome] = createSignal("");
    const [ricercaList,setRicercaList]=createSignal({
      ricerca: [],
  });


    const handleSearch = async () => {
        const nomeRistorante=nome();
        const query = {query: {}}
                 try {
            const response = await axios.post(`http://localhost:8080/ristorante/ricercaRistorante/${nomeRistorante}`,{},);
            setRicercaList({...ricercaList(), ricerca: response.data });

            //sessionStorage.setItem('ricerca',);

            console.log("Risultati di ricerca:", response.data);
          

        }catch(error) {
          console.error("Errore durante la ricerca:", error.response || error.message || error);
        }
      };

    return(<>
    

        <div class={styles.wrap}>
  <div class={styles.search}>
    <input type="text" class={styles.searchTerm} value={nome()} onChange={(e)=>setNome(e.target.value)} placeholder=""/>
    <button type="submit" onClick={handleSearch} class={styles.searchButton}>
      <i class="fa fa-search"></i>
    </button>
  </div>
</div>
{ricercaList().ricerca.map((cerca) => (
  <div class={styles.container}>
    <img src={restaurantIcon}/>
    <div class={styles.description}>
        <h1>{cerca.nome}</h1>
        <h3>Indrizzo</h3>
    </div>
    <div class={styles.navLink}>
        <a href="#"><img src={menuIcon}/></a>
        <button class={styles.buttonOrder}>Ordina</button>
        <button class={styles.buttonBook} onClick={() => window.location.href = '/prenotaRistorante'}role="button">Prenota</button>

    </div>
</div>
                    ))}



</>

    );

}
export default Cerca;