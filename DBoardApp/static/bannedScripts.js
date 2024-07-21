function getBanDate() {
    var Primarytable = document.getElementById("table")
    var sencondaryTable = document.getElementById("tableDays")
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
      tableHeight=Primarytable.scrollHeight
      sencondaryTable.scrollHeight=tableHeight
      console.log('height ',tableHeight)
      console.log(sencondaryTable.scrollHeight)
     
      
  }

        //funktio tarkistaa että ip osoitteessa on 3 pistettä
        function checkIp()
        {
            var ip = document.getElementById("ipadd").value;
            var checkelem =  document.getElementById("checker")
            var char = '.'
            var count = 0
            for (i=0;i<ip.length;i++)
            {
              //jos ip muuttijasta löytyy . merkki kasvatetaan count muuttujaa luvulla 1
              //i muuttujalla ja for-silmukalla käydään jokainen muuttujan merkki läpi
              if (ip.charAt(i)== char)
              {
                count+=1

              }

            }
            console.log(count)
            
            if (count == 4)
            {
                //var checkelem =  document.getElementById("checker")
                checkelem.innerHTML="Correct address"
              //document.getElementById("checker").innerHTML="Correct address"
                checkelem.style.background="green";
                checkelem.style.fontSize="large"
               
                
            }
            else {

                checkelem.innerHTML="Incorrect address"
                //var checkelem =  document.getElementById("checker")
               // document.getElementById("checker").innerHTML="Incorrect address"
                checkelem.style.background="red";
                checkelem.style.fontSize="large"

            }
        }
        