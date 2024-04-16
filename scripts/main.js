// Tallenna nykyisen sivun URL-osoite sessionStorageen, kun käyttäjä siirtyy ohjesivulle
document.getElementById('help-button').addEventListener('click', function() {
    sessionStorage.setItem('previousPage', window.location.href);
    window.location.href = 'instructions.html'; 
});

// Ohjaa käyttäjä takaisin edelliselle sivulle tallennetun URL-osoitteen perusteella
document.getElementById('continue').addEventListener('click', function() {
    const previousPage = sessionStorage.getItem('previousPage');
    if (previousPage) {
        window.location.href = previousPage;
        sessionStorage.removeItem('previousPage'); // Poista tallennettu URL-osoite
    } else {
        // Jos edellistä sivua ei ole tallennettu, voit ohjata käyttäjän jonnekin oletussivulle
        window.location.href = 'karjalanpiirakka.html'; // Korvaa oikealla oletussivun URL-osoitteella
    }
});