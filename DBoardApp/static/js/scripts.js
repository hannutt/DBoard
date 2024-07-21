
function verticalBar(visits, cb) {
  if (cb.checked == true) {
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

    const layout = { title: "Visits on page" };

    Plotly.newPlot("Plot", data, layout);

  }
  else {
    resetBar()


  }
}



function resetBar() {
  location.reload()
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

function prettyText(lastreply) {
  console.log("last reply ", lastreply)
  var lastInt = parseInt(lastreply)
  var prettytextCB = document.getElementById("prettyTextCB").value
  console.log(prettytextCB)
  if (prettytextCB == 'on') {
    for (var i = 1; i <= lastInt; i++) {
      var reply = document.getElementById("reply" + i).innerHTML
      document.getElementById("reply" + i).innerHTML = reply.replace("{", "").replace("]", "").replace("'}", "").replace("[", "").replace("]}", "").replace("[{", "").replace(" },", "").replace("[{", "").replace("'}", "")


    }

  }

}

