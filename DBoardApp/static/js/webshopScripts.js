

//id on webshop.html:ssä for silmukassa läpi käydyn tuotekortin id-numero
function setStrength(id, strength) {
  var elem = document.getElementsByName("str")
  //silmukassa käydään läpi str nimiset radiobuttonit
  for (i = 0; i < elem.length; i++)
    //jos jokin buttoneista on valittu talletetaan sen value localstorageen
    if (elem[i].checked) {
      console.log(elem[i].value)
      localStorage.setItem('str', elem[i].value)
      document.getElementById("prow" + id).value += " " + elem[i].value

    }

}

function setAmountField() {

  var quantity = document.getElementsByName("amount")
  //silmukassa käydään läpi str nimiset radiobuttonit
  for (i = 0; i < quantity.length; i++)
    //jos jokin amount nimisen input kentän arvo on suurempi kuin 0 talletetaan arvo am-muuttujaan ja am
    //muuttuja puolestaan talletetaan localstorageen
    if (quantity[i].value > 0) {

      var am = quantity[i].value
      console.log(am)
      localStorage.setItem("qty", am)

    }

}
function createProw(id, price) {
  var quantity = document.getElementsByName("amount")
  for (i = 0; i < quantity.length; i++)
    //jos jokin amount nimisen input kentän arvo on suurempi kuin 0 talletetaan arvo am-muuttujaan ja am
    //muuttuja puolestaan talletetaan localstorageen
    if (quantity[i].value > 0) {
      var am = quantity[i].value
    }
  document.getElementById("prow" + id).value += " " + am + " " + price

}

//amount kentän arvon tallennus localstorageen
function getAmount() {
  var amount = document.getElementById("amount").value;
  //localStorage.setItem("Amount",amount)
  document.getElementById("setBtn").click()

}

function Discount() {
  code = document.getElementById('code').value
  compareCode = document.getElementById("compare").innerHTML
  if (code === compareCode) {

    totalDiscount = total - 2
    document.getElementById("total").innerHTML = totalDiscount

  }

}

var clicks = 0
function openForm() {
  clicks = clicks + 1
  document.getElementById("formPlace").style.display = "block";
  //jos clicks on jaollinen kahdella niin suljetaan lomake eli jos buttonia
  //on klikattu avauksen jälkeen uudelleen
  if (clicks % 2 === 0) {
    document.getElementById("formPlace").style.display = "none";

  }
}

function DelFromCart(lsItem) {

  prodCounter = localStorage.getItem("counter")
  prodCounter-=1
  localStorage.setItem("counter",prodCounter)
  document.getElementById("cartNum").innerText = prodCounter
  localStorage.removeItem(lsItem)
  console.log(lsItem)


}


function ShoppingCart() {

  document.getElementById("productForm").style.display = "block";
  var list = document.getElementById("list")
  var btn = document.createElement("BUTTON")
  btn.setAttribute("class", "cartBtn")
  btn.textContent = "X"



  for (var i = 0; i < localStorage.length; i++) {
    //tarkistus, että avain sisältää orderrow, muuten yksi painikkeista saa arvokseen counterin
    if (localStorage.key(i).includes("orderrow")) {
      btn.id = i
      //jokainen buttoni saa value attribuutiksi localstorageen tallannetun orderrow+numero avaimen
      btn.value = localStorage.key(i)


    }

    //buttoneilla asetetaan onclick tapahtumankäsittelijä, joka lähettää funktiolle
    //parametrina this.valuen eli klikatun buttonin value attribuutin arvon
    btn.setAttribute('onclick', "DelFromCart(this.value)")

    //kaikki localstoragen sisältö saadaan silmukana avulla näkyviin. kierrosmuuttuja
    //i lähtee luvusta 0 ja kasvaa siihen asti kuin localstoragen pituus on (eli montako
    //tilausriviä on talletettu)

    //näytetään tuotteet <li> elementissä ja rivinvaihdolla eri id saadaan lisättyä jokaiseen
    //elementtiin ${i} paraetrilla eli id on aina kierrosmuuttujan luku. 0-> niin kauan kuin listassa
    //on alkioita. includes metodilla tarkistetaan, että localstoragen avain sisältää sanan orderrow
    //muuteen ostoskoriin tulisi kaikki localstoragen sisältö, kuten tuotteiden määrän laskeva muuttuja
    if (localStorage.key(i).includes("orderrow")) {
      list.innerHTML += `<li id=${"li" + i}><br>` + localStorage.getItem(localStorage.key(i)) + `<br/></li>`
      list.appendChild(btn)
    }
  }

}

function closeShoppingCart() {
  document.getElementById("productForm").style.display = "none";
  //clearOrderTable()
}


//funktiolla muutetaan tuotekortin fontin sisältöä medium-large välillä tuotekortti ja vaihtimen
//arvo saadaan parametreina, joiden arvot annetaan webshop.html ssä
function fontChange(switchVar, total) {
  console.log(total)
  var totalInt = parseInt(total)
  if (switchVar.checked === true) {

    for (var i = 1; i < totalInt; i++) {
      document.getElementById("Prodcard" + i).style.fontSize = "larger"
      document.getElementById("card-body" + i).style.fontSize = "larger"
    }
  }

  else {
    for (var i = 1; i < totalInt; i++) {
      document.getElementById("Prodcard" + i).style.fontSize = "medium"
      document.getElementById("card-body" + i).style.fontSize = "medium"

    }
  }

}

function getProductCounter() {
  if (localStorage.getItem("counter")===null){
    var count=0
    localStorage.setItem("counter",count)
    document.getElementById("cartNum").innerText = count
  }
  else{
    count = localStorage.getItem("counter")
    document.getElementById("cartNum").innerText = count
  }
  //document.getElementById("cartNum").innerText = parseInt(prodCounter)
}



