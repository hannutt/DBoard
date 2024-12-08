var pattern=/[0-9]/g
function adding(id) {
    var qtyField=document.getElementById("amount"+id).value
    var qtyInt = parseInt(qtyField)
    var priceField=document.getElementById("priceTag").innerHTML
    var priceInt=parseFloat(priceField)
    var sum= qtyInt*priceInt
    console.log(qtyField)
    
    
    if (document.getElementById("amount"+id).value=="0" ||document.getElementById("amount"+id).value=="")
    {
        alert("set amount")

    }
    //jos input-kenttä ei sisällä pattern muuttujasssa määriteltyä sisältöä eli numeroita.
    else if(!qtyField.match(pattern))
    {
        alert("use numbers in amount field")
    }
    else {
        var randNum = Math.floor(Math.random() * 5000);
        var row = document.getElementById("prow" + id).value+" "+sum 
        localStorage.setItem('orderrow' + randNum, row)

    }
   



}
var c = 0
function showform() {
    c += 1
    if (c % 1 === 0) {
        document.getElementById("orderForm").hidden = false

    }
    if (c % 2 === 0) {
        document.getElementById("orderForm").hidden = true

    }

}

function getLSprods() {
    var prods = []

    for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).includes("orderrow")) {
            prods.push(localStorage.getItem(localStorage.key(i)));

            var tablecode = ` <table border="1px solid black">
                      <tr>
                      <th>Your Orders</th>
                      </tr>
                      <tr><td id="product">${prods}</tr></td>
                     </table>`


        }

        document.getElementById("tableplace").innerHTML = tablecode
    }
}
function simulateBtnClick() {
    document.getElementById("prodClick").click()
  }
  
