"use strict";
function logginn() {
    //logg inn eller velg nytt kart
    const loggInnVindu = document.createElement('div');
    loggInnVindu.style.position = 'fixed';
    loggInnVindu.style.top = '0';
    loggInnVindu.style.left = '0';
    loggInnVindu.style.width = '100vw';
    loggInnVindu.style.height = '100vh';
    loggInnVindu.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    loggInnVindu.style.display = 'flex';
    loggInnVindu.style.flexDirection = 'column';
    loggInnVindu.style.justifyContent = 'center';
    loggInnVindu.style.alignItems = 'center';
    document.body.appendChild(loggInnVindu);
    const overskrift = document.createElement('h1');
    overskrift.innerText = 'Velkommen til Bonden';
    overskrift.style.color = 'white';
    loggInnVindu.appendChild(overskrift);
    const brukernavnInput = document.createElement('input');
    brukernavnInput.type = 'text';
    brukernavnInput.placeholder = 'Brukernavn';
    brukernavnInput.style.margin = '10px';
    loggInnVindu.appendChild(brukernavnInput);
    const passordInput = document.createElement('input');
    passordInput.type = 'password';
    passordInput.placeholder = 'Passord';
    passordInput.style.margin = '10px';
    loggInnVindu.appendChild(passordInput);
    const loggInnKnapp = document.createElement('button');
    loggInnKnapp.innerText = 'Logg Inn';
    loggInnKnapp.style.margin = '10px';
    loggInnKnapp.addEventListener('click', () => {
        // Implementer innloggingslogikk her
        document.body.removeChild(loggInnVindu);
        startNyttSpel();
    });
    const nyttSpelKnapp = document.createElement('button');
    nyttSpelKnapp.innerText = 'Start Nytt Spill';
    nyttSpelKnapp.style.margin = '10px';
    nyttSpelKnapp.addEventListener('click', () => {
        document.body.removeChild(loggInnVindu);
        startNyttSpel();
    });
    loggInnVindu.appendChild(loggInnKnapp);
    loggInnVindu.appendChild(nyttSpelKnapp);
}
