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
            btn.setAttribute('disabled','true')
            
        }
       

    }
  
 }
 
 //lasketaan varastomäärä kaikkien tuotteiden osalta
 function countItems() {
    var items = []
    var sum = 0
    //classnamella voidaan hakea kaikki luokan sisällä olevat arvot
    var amount = document.getElementsByClassName("amount")

    //toisto eli niin kauan kuin i on pienempi kuin amount
    //luokan merkkimäärä lisätään merkkejä listaan
    for (i = 0; i < amount.length; i++) {
        //muunto luvuiksi
        items.push(Number(amount[i].outerText))
        //yhteenlasku
        sum += Number(amount[i].outerText)
        console.log(items)
        console.log(sum)


    }
    //tuloksen näyttö sum p-tagissa ja värien määrittely
    document.getElementById("sum").style.background="lightgray"
    document.getElementById("sum").style.color="blue"
    document.getElementById("most").style.background="lightgray"
    document.getElementById("most").style.color="green"
    document.getElementById("least").style.background="lightgray"
    document.getElementById("least").style.color="red"
    
    document.getElementById("sum").innerHTML = "Sum of all products: " + sum


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
        document.getElementById("prodIdVal").value = ''

        document.getElementById("prodIdVal").style.background = "red"
        //3 sekunnin jälkeen kutsutaan changecolorback funktiota
        //joka muuttaa input taustavärin takaisin oletusväriksi
        const Mytimeout = setTimeout(changeColorBack, 3000)
    }

}