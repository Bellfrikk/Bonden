
//topplinje
lastAktiv = false;
const nivaStrek = {
  lengde: 100,
  hoyde: 20,
  margin: 3,
  drivstoff: "#008800",
  last: "#880000",
  gronn: "#008800",
  gul: "#888800",
  rod: "#880000",
};
let niva = { last: 0, drivstoff: 0 };
let topplinje;

let peng = 10000;
let lastType = "GRAS";

function nyTopplinje() {
  this.tein = () => {
    //bakgrunn
    verden.moveTo(0, 0);
    verden.beginPath();
    verden.rect(0, 0, pixel.verdenX, toppLinjeHoyde);
    verden.fillStyle = '#000';
    verden.fill();
    //linje ting
    verden.beginPath();
    //peng
    verden.drawImage(document.getElementById('ikonPeng'), 4, 5, toppLinjeIkon, toppLinjeIkon);
    verden.font = "20px Comic Sans MS";
    verden.fillStyle = '#FFF';
    verden.fillText(peng, toppLinjeIkon + 10, 28);
    //drivstoff
    verden.beginPath();
    verden.drawImage(document.getElementById('ikonDrivstoff'), 140, 5, toppLinjeIkon, toppLinjeIkon);
    verden.fillStyle = '#FFF';
    verden.rect(180 - 1, toppLinjeHoyde - nivaStrek.hoyde * 1.5 - 1, nivaStrek.lengde + 2, nivaStrek.hoyde + 2);
    verden.fill();
    //drivstoff strek
    verden.beginPath();
    verden.fillStyle = '#222';
    verden.rect(180, toppLinjeHoyde - nivaStrek.hoyde * 1.5, nivaStrek.lengde, nivaStrek.hoyde);
    verden.fill();
    verden.beginPath();
    verden.fillStyle = nivaStrek.drivstoff;
    verden.rect(180, toppLinjeHoyde - nivaStrek.hoyde * 1.5, niva.drivstoff, nivaStrek.hoyde);
    verden.fill();
    //last
    if ( lastAktiv ) {
      verden.beginPath();
      verden.drawImage(document.getElementById('ikonLast'), 300, 5, toppLinjeIkon, toppLinjeIkon);
      verden.fillStyle = '#FFF';
      verden.rect(340 - 1, toppLinjeHoyde - nivaStrek.hoyde * 1.5 - 1, nivaStrek.lengde + 2, nivaStrek.hoyde + 2);
      verden.fill();
      //last strek
      verden.beginPath();
      verden.fillStyle = '#222';
      verden.rect(340, toppLinjeHoyde - nivaStrek.hoyde * 1.5, nivaStrek.lengde, nivaStrek.hoyde);
      verden.fill();
      verden.beginPath();
      verden.fillStyle = nivaStrek.last;
      verden.rect(340, toppLinjeHoyde - nivaStrek.hoyde * 1.5, niva.last, nivaStrek.hoyde);
      verden.fill();
      //last tekst
      verden.font = "20px Comic Sans MS";
      verden.fillStyle = '#FFF';
      verden.fillText(lastType, 460, 28);
    }
  }
}