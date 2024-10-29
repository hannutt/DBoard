
function verticalBar(visits, cb) {
  if (cb.checked == true) {
    console.log(cb.checked)
    //muunto kokonaisluvuksi
    parseInt(visits)
    const xArray = [""];
    const yArray = [visits];

    const data = [{
      x: xArray,
      y: yArray,
      //numeroväli 1, eli desimaaleja ei näytetä
      dtick: 1,
      //kaavion tyyppi
      type: "bar",
      //kaavion piirtosuunta
      orientation: "v",
      marker: { color: "rgba(50, 168, 145)" }
    }];

    const layout = { title: "Visits on page",plot_bgcolor:"lightblue",
      paper_bgcolor:"lightblue"}; 

    Plotly.newPlot("Plot", data, layout);

  }
  else if (cb.checked==false) {
    horizontalBar(document.getElementById('times').innerHTML,document.getElementById('verticalBar'))


  }
}

function horizontalBar(visits) {
  
  console.log(cb.checked)
  console.log(visits)
  
  parseInt(visits)
  const xArray = [visits];
  const yArray = [""];

  const data = [{
    x: xArray,
    y: yArray,
    //numeroväli 1, eli desimaaleja ei näytetä
    dtick: 1,
    //kaavion tyyppi
    type: "bar",
    //kaavion piirtosuunta
    orientation: "h",
    marker: { color: "rgba(50, 168, 145)" }
  }];

  const layout = { title: "Visits on page" ,plot_bgcolor:"lightblue",
    paper_bgcolor:"lightblue"};

  Plotly.newPlot("Plot", data, layout);

}




function CheckId() {   //haetaan käyttäjän syöttämä arvo
  var userInput = document.getElementById("prodIdVal").value;
  //muunnetaan se kokonaisluvuksi
  var userInputInt = parseInt(userInput)
  console.log(typeof (userInputInt))

  var numberList = []
  //käytetyt numerot ovat li-tagin sisällä, joten haku kohdistuu
  //li tagiin
  var numbers = document.getElementsByTagName("li")

  //var result = Array.isArray(numberList)

  //käytettyjen numeroiden läpikäynti    
  for (var i = 0; i < numbers.length; i++) {
    //numeroiden tallennus listaan ja muunto kokonaisluvuksi
    numberList.push(numbers[i].innerHTML)
    numberList = numberList.map(Number)
    console.log(numberList)



  } //jos lista sisältää käyttäjän syöttämän numero, tulostetaan ilmoitus
  if (numberList.includes(userInputInt)) {
    alert("id already used")
  }
}
function visitors() {
  var visits = document.getElementById("webshopvisitor").innerHTML
  var visitrep = visits.replace("{","").replace("}","")
  var visitInt = parseInt(visitrep)
  console.log(visits)
  
}

function showModal() {
  document.getElementById("modalBtn").click()


}




function setDelivered() {
  document.getElementById("setdeliv").click()
  document.getElementById("setdeliv").hidden = true
}


function Banned() {
  var add = document.getElementById("ip").innerHTML;
  console.log(add)
  if (add === "banned!") {//asetetaan loginBtn id:llä nimettu buttoni disabloiduksi


    //document.querySelector('#ban').click();

    document.querySelector('#loginBtn').setAttribute('disabled', true);

  }
  console.log(add)
}



//jokainen reply on yksilöity id:llä reply+forloop.counterin numero näin for silmukan avulla
//saadaan käytyä kaikki reply elementin läpi ja poistettua replacen avulla ylim. merkit.
//lastreply eli vastauksien kokonaismäärä saadaan lastreply parametrina, joka annetaann
//index.html:ssä funktion kutsun yhteydessä.

function prettyText(prettyTextCB,lastreply) {
  console.log("last reply ", lastreply)
  var lastInt = parseInt(lastreply)

  if (prettyTextCB.checked == true) {
    for (var i = 1; i <= lastInt; i++) {
      var original = document.getElementById("reply"+i).innerHTML
      var reply = document.getElementById("reply" + i).innerHTML
      document.getElementById("reply" + i).innerHTML = reply.replace("{", "").replace("]", "").replace("'}", "").replace("[", "").replace("]}", "").replace("[{", "").replace("},", "").replace("[{", "").replace("'}", "").replace('replymsg','').replace('replymsg','').replace(":","").replace(":","")


    }

  }


}

function filterClear(total) {

  var totalInt=parseInt(total)
  //chars on sanakirjamuodossa, eli jokaiselle korvattavalle merkille täytyy kertoa että millä se korvataan
  //tässä tapauksessa kaikki korvataan tyhjällä
 // var chars={"{":"","}":"","[":"","]":"","[{":"","},":"","[]":""}
  for (var j = 1; j<=totalInt;j++)
  {
    var reply=document.getElementById("reply"+j).innerHTML
    //replace metodilla voidaan antaa lista merkeistä, jotka korvataa tyhjällä, g tarkoittaa globaalia hakua
    reply = reply.replace(/[{}[][{}[,]/g,"");
    document.getElementById("reply"+j).innerHTML=reply
    //jos tyhjiä kohtia, lisätään niihen teksti
    if ( document.getElementById("reply"+j).innerHTML=='')
    {
      document.getElementById("reply"+j).textContent="No reply yet"

    }
    
  }

}
function voiceLogin() {
  const recognitionSvc = window.SpeechRecognition || window.webkitSpeechRecognition;

// Instantiate it
const recognition = new recognitionSvc();
/* Set the speech recognition to continuous so it keeps listening to whatever you say. This way you can record long texts, conversations and so on. */
recognition.continuous = true;
/* Sets the language for speech recognition. It uses IETF tags, ISO 639-1 like en-GB, en-US, es-ES and so on */
recognition.lang = 'en-GB';
// Start the speech recognition
recognition.start();
recognition.onresult = (event) => { 
  // iterate through speech recognition results
  for (const result of event.results) {
    // Print the transcription to the console
    console.log(`${result[0].transcript}`);
    document.getElementById("username").value=`${result[0].transcript}`
   
}
setTimeout(() => {
  recognition.stop();
  console.log("stopped")
  
}, 10000);  
}
}



