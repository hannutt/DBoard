
function getQty() {
  var qty = localStorage.getItem("qty")
  document.getElementById("qty").value=qty
}


function setStrength(strength) {
  console.log(strength)
  var elem = document.getElementsByName("str")
  //silmukassa käydään läpi str nimiset radiobuttonit
  for (i = 0; i < elem.length; i++)
    //jos jokin buttoneista on valittu talletetaan sen value localstorageen
    if (elem[i].checked) {
      console.log(elem[i].value)
      localStorage.setItem('str', elem[i].value)

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

//amount kentän arvon tallennus localstorageen
function getAmount() {
  var amount = document.getElementById("amount").value;
  //localStorage.setItem("Amount",amount)
  document.getElementById("setBtn").click()


}


function setAmount() {
  //muuttujaan talletetaan html tagin sisältö ( tagin id on price)
  price = document.getElementById("price").innerHTML
  //korvataan € merkki tyhjällä
  priceRep = price.replace('€', '')
  //talletetaan muuttujiin local storagesta haetut arvot.
  placeAmount = localStorage.getItem("qty")
  strength = localStorage.getItem("str")
  //kerrotaan hinta ja kappalemäärä
  total = priceRep * placeAmount
  console.log(total)
  //localstoragen arvojen asetus <td> tageihin
  document.getElementById("finalAm").innerHTML = placeAmount
  document.getElementById('total').innerHTML = total
  document.getElementById("str").innerHTML = strength
  //asetetaan input kenttiin localstoragen arvo
  document.getElementById('amountField').value = placeAmount
  document.getElementById('strengthField').value = strength
  document.getElementById('totalField').value = total
  //localStorage.clear()

}
//TILAUKSEN TIETOJEN TALLENNUS LOCALSTORAGEEN
let prodCounter = 0


function AddToCart() {
  
  //ostoskori painikkeen kulmassa, ilmaisee tuotteiden määrää korissa
  prodCounter =prodCounter+1
  console.log(prodCounter)
  localStorage.setItem("counter",prodCounter)

  //poistetaan määrä ja vahvuus tässä kohtaa, että ne eivät tule lopulliselle tilausriville.
  localStorage.removeItem("str");
  localStorage.removeItem("qty");
  var ordernro = Math.floor(Math.random() * 100);

  var product = document.getElementById("product").innerHTML
  var price = document.getElementById("price").innerHTML
  var amount = document.getElementById("finalAm").innerHTML
 
  var strength = document.getElementById("str").innerHTML
  var total = document.getElementById("total").innerHTML
  document.getElementById("orderRow").innerHTML = product + ' ' + price + ' ' + amount + ' ' + strength + ' ' + total
  var row = document.getElementById("orderRow").innerHTML

  //tuoterivin tallennus local storageen satunnaisnumerolla.
  localStorage.setItem('orderrow' + ordernro, row)
  //jos counter avaimella ei löydy mitää local storagesta, lisätään prodcounter
 
  

  //css-luokan vaihto
  document.getElementById("shoppingCart").className = "shoppingCartBtnEffect";
  //parseInt(prodCounter)
  //prodcounter täytyy muuntaa parseintillä, että luku kasvaa tuotteita lisätetssä.
  var prod=[]
  document.getElementById("cartNum").innerHTML =  parseInt(prodCounter)
  for (var i=0;i<localStorage.length;i++)
  {
    //tarkistus että localstoragen avain sisältää sanan orderrow, näin ainoastaan
    //sillä alkavat arvot lisätään tilaus laatikkoon.
    if (localStorage.key(i).includes("orderrow"))
    {
      prod.push(localStorage.getItem(localStorage.key(i)))
      document.getElementById("orderDetails").innerText+=prod
      console.log(prod)
    }
  }

  /*
  var productsFromStorage = Object.values(localStorage);
  document.getElementById("orderDetails").innerText=productsFromStorage*/

  //5 sekunnin jälkeen vaihdetaan css-luokka takaisin alkuperäiseen
  setTimeout(() => {
    document.getElementById("shoppingCart").className = "shoppingCartBtn";

  }, 5000);



  //orders.push('orderrow' + ordernro)
}


function SaveCart() {
  var ordernro = Math.floor(Math.random() * 100);
  var product = document.getElementById("product").innerHTML
  var price = document.getElementById("price").innerHTML
  var amount = document.getElementById("finalAm").innerHTML
  var strength = document.getElementById("str").innerHTML
  var total = document.getElementById("total").innerHTML
  var row = document.getElementById("orderRow").innerHTML = product + ' ' + price + ' ' + amount + ' ' + strength + ' ' + total + ' ' + productsFromStorage
  localStorage.setItem('orderrow' + ordernro, row)
  document.getElementById('product').innerHTML = ""
  document.getElementById('price').innerHTML = ""
  document.getElementById('total').innerHTML = ""


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
  
  prodCounter=localStorage.getItem("counter")
  //prodCounter=prodCounter-1
  localStorage.setItem("counter",parseInt(prodCounter)-1)
  document.getElementById("cartNum").innerHTML=parseInt(prodCounter)

  
  localStorage.removeItem(lsItem)
  console.log(lsItem)


}


function ShoppingCart() {

  document.getElementById("productForm").style.display = "block";
  var list = document.getElementById("list")
  var btn = document.createElement("BUTTON")
  btn.setAttribute("class","cartBtn")
  btn.textContent = "X"



  for (var i = 0; i < localStorage.length; i++) {
    //tarkistus, että avain sisältää orderrow, muuten yksi painikkeista saa arvokseen counterin
    if (localStorage.key(i).includes("orderrow"))
    {
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
      if (localStorage.key(i).includes("orderrow"))
      {
        list.innerHTML += `<li id=${"li" + i}><br>` + localStorage.getItem(localStorage.key(i)) + `<br/></li>`
        list.appendChild(btn)
       
      
      }
  }




}

function closeShoppingCart() {
  document.getElementById("productForm").style.display = "none";
  clearOrderTable()
}

function clearOrderTable() {

  document.getElementById('product').innerHTML = ""
  document.getElementById('price').innerHTML = ""
  document.getElementById('total').innerHTML = ""
  document.getElementById('finalAm').innerHTML = ""
  document.getElementById('str').innerHTML = ""
}

//funktiolla muutetaan tuotekortin fontin sisältöä medium-large välillä tuotekortti ja vaihtimen
//arvo saadaan parametreina, joiden arvot annetaan webshop.html ssä
function fontChange(productCard,switchVar) {
  if (switchVar.checked == true) {
    productCard.style.fontSize = "medium";
  }
  else {
    productCard.style.fontSize = "large";
  }

}

function getProductCounter() {
  prodCounter=localStorage.getItem("counter")
  document.getElementById("cartNum").innerHTML=parseInt(prodCounter)
}



