 //tarkistetaan onko tuote toimitettu, eli delivered sisältä sanan yes
 //jos on, disabloidaan painike
 function delivered(total) {
   
    console.log(total)
    
    var totalInt = parseInt(total)
    
    for (var i=1;i<=totalInt;i++)
    {
        var d = document.getElementById("delivered"+i).innerHTML
        console.log(d)
        if (d.includes("yes"))
        {
            var btn=document.getElementById("setdelivered"+i)
            btn.disabled=true
            
        }
       

    }
  
 }
 
 //lasketaan varastomäärä kaikkien tuotteiden osalta
 

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
        document.getElementById("prodIdVal").value = ''

        document.getElementById("prodIdVal").style.background = "red"
        //3 sekunnin jälkeen kutsutaan changecolorback funktiota
        //joka muuttaa input taustavärin takaisin oletusväriksi
        const Mytimeout = setTimeout(changeColorBack, 3000)
    }

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

  function changeColorBack() {
    document.getElementById("prodIdVal").style.background = "#1fe0"
}

function getMongoField(field) {
  var fieldName=document.getElementById("fields").value = field.options[field.selectedIndex].text
  console.log(fieldName)
  document.getElementById("field").value=fieldName

}
