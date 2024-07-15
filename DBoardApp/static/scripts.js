function CheckId()
{   //haetaan käyttäjän syöttämä arvo
    var userInput = document.getElementById("prodIdVal").value;
    //muunnetaan se kokonaisluvuksi
    var userInputInt = parseInt(userInput)
    console.log(typeof(userInputInt))
    
    var numberList = []
    //käytetyt numerot ovat li-tagin sisällä, joten haku kohdistuu
    //li tagiin
    var numbers = document.getElementsByTagName("li")
    
    //var result = Array.isArray(numberList)
   
    //käytettyjen numeroiden läpikäynti    
    for (var i = 0; i < numbers.length; i++)
    {
        //numeroiden tallennus listaan ja muunto kokonaisluvuksi
        numberList.push(numbers[i].innerHTML)
        numberList = numberList.map(Number)
        console.log(numberList)

                         
 
    } //jos lista sisältää käyttäjän syöttämän numero, tulostetaan ilmoitus
    if (numberList.includes(userInputInt))
        {
            alert("id already used")
        } 
      }

function showModal() {
    document.getElementById("modalBtn").click()

}

function orderForm() {
//input muuttujaan talletetaan checkboxin true/false arvo
   // var input = document.querySelector('.orderCB')
   //lomakkeen sisältämän input kentät yms
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
//simuloidaan setBtn ja startBtn painikkeiden klikkaus
function setFilter() {
    document.getElementById("setBtn").click()
}

function DoClick() {
    document.getElementById("startBtn").click()
  }

function setDelivered() {
  document.getElementById("setdeliv").click()
  document.getElementById("setdeliv").hidden=true
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

  function Banned() {
    var add = document.getElementById("ip").innerHTML;
    console.log(add)
    if (add === "banned!") 
    {//asetetaan loginBtn id:llä nimettu buttoni disabloiduksi
       

      //document.querySelector('#ban').click();

      document.querySelector('#loginBtn').setAttribute('disabled', true);

    }
    console.log(add)
  }

  function getBanDate() {
    //counterin arvo saadaan views.py funktiosta jossa lasketaan
    //bannedips kokoelman docukemnttien määrä
    var counter = document.getElementById("counter").innerHTML
    var datevalueList = []
    var finalList = []
      console.log("counter: ",counter)
      var table = document.getElementById("table");
      var tableDays = document.getElementById("tableDays");
     //byclassnamella saadaan kaikki luokan td-sarakkeessa olevat arvot
      var datevalue = document.getElementsByClassName("daterow")
      console.log(datevalue)
      //datevalueList.push(datevalue)
      var date1=''
      var txt=''
      var targetTime = new Date(Date.now())
     // var rowCount = document.getElementById('table').rows[0].cells.length;
      
      //counter muuttujan käyttö silmukassa
      for (var i = 0;i<counter; i++)
      {
         //datevalue on käytännössä lista jonka arot käydään silmukalla ja i muuttujalla yksitellen läpi
          datevalueList.push(datevalue[i].innerHTML)
          //txt +=datevalueList[i]+"<br>"
          //document.getElementById("days").innerHTML=txt
          //date1 muuttujaan talletetaan vuorollaan jokainen datevaluelistassa oleva arvo (i)
          date1=datevalueList[i]
          console.log(date1)

          var date1Final = date1.split(".")
           //date1 on muodossa PP.KK.VVVv ja se täytyy muuttaa muotoon KK.PP.VVVV eetä aikaeron laskeminen
      //toimii. jaetaan merkkijonon . merkin kohdalta osiin
          var dateObject = new Date(+date1Final[2], date1Final[1] - 1, +date1Final[0]);
          //lasketaan 2 päivämäärän erotus 
          var result = targetTime.getTime() - dateObject.getTime()
          var difDays = Math.round(result / (1000 * 3600 * 24));
          console.log(difDays)
          txt +=datevalueList[i]+" " +difDays+"<br>"
          finalList.push(difDays)
          var row = tableDays.insertRow();
          var cell1 = row.insertCell();
          cell1.innerHTML = "Days"
         
          var row2 = tableDays.insertRow(i)
          var cell2 = row.insertCell(0);
          cell2.innerHTML=finalList[i]
         
          
      
      }
  
     
     
     
     
      
     
      
  }

