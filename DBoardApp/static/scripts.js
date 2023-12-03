

function showModal() {
    document.getElementById("modalBtn").click()

}

function orderForm() {
//input muuttujaan talletetaan checkboxin true/false arvo
   // var input = document.querySelector('.orderCB')
    var form = '<h3>Order form</h3> <form method="post" action="send-order"> <input type="text" id="pname"> <input type="text" id="untPrice">'
    /*
    var pname = document.getElementById("prodName").value
    var price = document.getElementById("unitPrice").value
    console.log(input.checked)
    //jos checkbox on valittu
    if (input.checked==true)
    {
       //sijoitetaan form muuttujassa määritellyt input kentän yms orderformplace diviin
    document.getElementById("orderFormPlace").innerHTML = form
    document.getElementById("pname").value = pname
    document.getElementById("untPrice").value = price

    }
    //jos checkboksia ei ole valittu, piilotetaan html-formi
    else if (input.checked==false)
    {
      document.getElementById("orderFormPlace").innerHTML = '';

    }*/
    document.getElementById("orderFormPlace").innerHTML = form
   
  
}

function setFilter() {
    document.getElementById("setBtn").click()
}

function DoClick() {
    document.getElementById("startBtn").click()
  }
  function move() {
    let id = null;
    const animateDiv = document.getElementById("animate");
    animateDiv.style.top=250 + "px"
    animateDiv.style.left= 450 + "px"
    let pos = 0
    clearInterval(id)
    //frame + luku muuttaa neliön liikkumisnopeutta
    id = setInterval(frame,55);
    function frame() {
      //pos on kuvion liikkumismäärä pikseleinä jos container divin mitat on 50x50 niin animatedivin pos ollessa
      //50 se liikkuu container alareunaan
      if (pos==50) {
        clearInterval(id)
        id = setInterval(frame,55);
        //neliön palautus divin vasempaan yläosaana
        animateDiv.style.top = 1 +"px"
        animateDiv.style.left = 1 + "px"
        clearInterval(id)
       
        
      } else {
        pos++
        animateDiv.style.top = pos +"px"
        animateDiv.style.left = pos + "px"
        
      }
    }
  }

