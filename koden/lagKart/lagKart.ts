let nyttKart:Kart = tmpKart;
const verktoyKnappar = ['vei', 'grus', 'asfalt', 'skog', 'vatn', 'eng', 'jorde']
  
  function startLagKart(){
  let antalX = tmpKart.antalRuter.x;
  let antalY = tmpKart.antalRuter.y;
  const verden = document.getElementById("verden");
  const verktoy = document.createElement("div");
  verktoy.id = "verktoyLinje";
  verden!.appendChild(verktoy);
  const verktoyLinje = document.getElementById("verktoyLinje");
    verktoyKnappar.forEach(type => {
    const knapp = document.createElement("button");
    knapp.id = type;
    knapp.name =type;
    verktoyLinje!.appendChild(knapp);
      });
  for(let y = 0; y < antalY; y++){
    const rekke = document.createElement("div");
    let id = "rekke" + y;
    rekke.id = id;
    verden!.appendChild(rekke);
    for(let x = 0; x < antalX; x++){
      const rute = document.createElement("div");
      rekke.appendChild(rute)
    }
  }
}