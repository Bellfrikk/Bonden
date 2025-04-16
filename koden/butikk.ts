


let aktivType:LandskapType|Kjoretoy|Redskap|Ting = 'eng'; 

function velgVerktoy(type:LandskapType|Kjoretoy|Redskap|Ting){
aktivType = type;
console.log('nytt verktør: '+type)
}
