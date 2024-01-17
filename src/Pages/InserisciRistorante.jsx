import styles from "../css/InserisciRistorante.module.css"
export default function InserisciRistorante(){
    return (
        <main class={styles.cd__main}>
    <form class={styles.bookingForm} action="#" method="post">
        <div class={styles.elemGroup}>
            <label for="name">Nome</label>
            <input type="text" id="name" name="restaurant_name" placeholder="Pizzeria da Mario" pattern="[A-Z\\sa-z]{3,20}" required=""/>
        </div>
        <div class={styles.elemGroup}>
            <label for="address">E-mail</label>
            <input type="text" id="address" name="restaurant_address" placeholder="Via Rossi 7,Caserta CE" required=""/>
        </div>
        <div class={styles.elemGroup}>
            <label for="phone">Cellulare</label>
            <input type="tel" id="phone" name="restaurant_phone" placeholder="498-348-3872" pattern="(\\d{3})-?\\s?(\\d{3})-?\\s?(\\d{4})" required=""/>
        </div>
        <hr/>
        <button type="submit">Inserisci immagine</button>
        <button style="margin-left: 150px" type="submit">Inserisci menù</button>
        <hr/>

        <button class={styles.buttonInsert} style="margin-top:10px" type="submit">Prenota</button>
    </form>
</main>
    );
}