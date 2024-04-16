// Tallentaa nykyisen sivun URL-osoitten sessionStorageen, kun käyttäjä siirtyy ohjesivulle
document.getElementById('help-button').addEventListener('click', function() {
    sessionStorage.setItem('previousPage', window.location.href);
    window.location.href = 'instructions.html'; 
});

// Ohjaa käyttäjän takaisin edelliselle sivulle tallennetun URL-osoitteen perusteella
document.getElementById('continue').addEventListener('click', function() {
    const previousPage = sessionStorage.getItem('previousPage');
    if (previousPage) {
        window.location.href = previousPage;
        sessionStorage.removeItem('previousPage'); // Poista tallennettun URL-osoite
    } else {
        // Jos edellistä sivua ei ole tallennettu, ohjaa käyttäjän jonnekin oletussivulle
        window.location.href = 'karjalanpiirakka.html';
    }
});