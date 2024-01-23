import styles from '../../css/ConfermaSignUp.module.css';

function ConfermaSignUp(){
    //Conferma all'utente di essersi registrato con successo
    return(
        <>
        <div class={styles.container}>
            <h1>Registrazione effettuata con successo</h1><br/>
            <a href="/" style="color:black;">Torna alla home</a>
        </div>
        </>
    );
}
export default ConfermaSignUp;