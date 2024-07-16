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
var orders = []
function saveOrderRow() {
    var ordernro = Math.floor(Math.random() * 100);
    console.log(ordernro)
    
    var product = document.getElementById("product").innerHTML
    var price = document.getElementById("price").innerHTML
    var amount = document.getElementById("finalAm").innerHTML
    var strength = document.getElementById("str").innerHTML
    var total = document.getElementById("total").innerHTML
    document.getElementById("orderRow").innerHTML = product + ' ' + price + ' ' + amount + ' ' + strength + ' ' + total+ productsFromStorage
    var row = document.getElementById("orderRow").innerHTML
    console.log(row)
    //localstoragen avaimeen pystyy lisäämään numerotunnisteen
    //localStorage.setItem('orderrow' + ordernro, row)
    orders.push('orderrow' + ordernro)
}

function SaveCart() {
    var ordernro = Math.floor(Math.random() * 100);
    var product = document.getElementById("product").innerHTML
    var price = document.getElementById("price").innerHTML
    var amount = document.getElementById("finalAm").innerHTML
    var strength = document.getElementById("str").innerHTML
    var total = document.getElementById("total").innerHTML
    var row=  document.getElementById("orderRow").innerHTML = product + ' ' + price + ' ' + amount + ' ' + strength + ' ' + total +' '+ productsFromStorage
    localStorage.setItem('orderrow'+ordernro,row)

}

function Discount() {
    code = document.getElementById('code').value
    compareCode = document.getElementById("compare").innerHTML
    if (code === compareCode) {

      totalDiscount = total - 2
      document.getElementById("total").innerHTML = totalDiscount

    }

  }
  var productsFromStorage = Object.values(localStorage);
  function getEarlierProducts() {
    //haetaan localstoragen arvot ja talletetaan ne listaan,
    //joka näytetään orderrow elementissä
    
    document.getElementById("orderRow").innerHTML=productsFromStorage
  }

  function removeLatest() {
    var deletethis=document.getElementById("removeThis")
    productsFromStorage.pop(deletethis)
    document.getElementById("orderRow").innerHTML=productsFromStorage
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
  var clicks = 0
  var orderTxt = document.getElementById("orderTxt").value
  function openProductForm() {
    document.getElementById("orderTxt").value = ''
   
    clicks = clicks + 1
    
    document.getElementById("productForm").style.display = "block";
    for (var i = 0; i < localStorage.length; i++) {
      //document.getElementById("orderTxt").value+=localStorage.key(i)
      //kaikki localstoragen sisältö saadaan silmukana avulla näkyviin. kierrosmuuttuja
      //i lähtee luvusta 0 ja kasvaa siihen asti kuin localstoragen pituus on (eli montako
      //tilausriviä on talletettu)

      console.log(orderTxt)
      document.getElementById("orderTxt").value += localStorage.getItem(localStorage.key(i))

    }

    //jos clicks on jaollinen kahdella niin suljetaan lomake eli jos buttonia
    //on klikattu avauksen jälkeen uudelleen
    if (clicks % 2 === 0) {
      document.getElementById("ProductForm").style.display = "none";

    }
  }
