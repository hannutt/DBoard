function isAdmin(btnCount) {
    //tekstin piilotus tupla klikkaamalla sitä jos kirjautunut käyttäjä on admin
    var user = document.getElementById("user").innerHTML
    var btnInt = parseInt(btnCount)
   
    if (user === '<b>admin</b>') {
      jQuery(".bodyTxt").dblclick(function () {
        event.preventDefault();
        var text = jQuery(this).hide();
      })
    }
    else {
      //käydään silmukassa läpi kaikki buttonit joiden id on deletebtn+i eli numero
      //numeroiden kokonaismäärä saadaan btncount parametrista, jonka arvo on index.html:ssä
      //käytettävän forloop counterin viimeinen arvo
      for (var i=1;i<=btnInt;i++)
      {
        document.getElementById("deleteBtn"+i).hidden=true

      }
     
    }
  }

  function googleTranslateElementInit() {
    new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
  }

  //simuloidaan setBtn ja startBtn painikkeiden klikkaus CBvar son parametri, jonka sisältö
  //annetaan funktiokutsutta index.html:ssä
function setFilter(CBvar) {

    if (CBvar.checked===true)
    {
        document.getElementById("setBtn").click()
    }
}

function DoClick() {
    document.getElementById("startBtn").click()
  }

var data=''
var subjects=[]

//haetaan kaikki otsikot, eli ne joissa id=subject+numero
function getHeaders() {
  var lastReply = document.getElementById("lastReply").innerHTML
  var lastReplyInt = Number(lastReply) 
  for (var i=1;i<lastReplyInt;i++)
  {
    
    data=document.getElementById("subject"+i).innerHTML
    subjects.push(data)
    
    
  }
  console.log(subjects)
 //käytetään allaolevassa funktiossa
  return lastReplyInt
}

//kutsutaan subjectChange funkiota joka 5 sekunti, setinterval talletetaan muuttujaan,
//että voidaan clearInterval funktiota, joka pysäyttää toiston.
var interval = setInterval(subjectChange, 5000);
var j = 0;
//subject change kasvattaa j:n arvoa yhdellä eli subjects listalta näytetään aina seuraava arvo
function subjectChange() {
  var last = getHeaders()
 
  if (j===last)
  {
    j=0
  }
  else{
    j=j+1
  }
  document.getElementById("changingSubjects").innerHTML=subjects[j]
  document.getElementById("subjectID").innerHTML=j

  
}
var changeClicks=0
function stopChanging() {
  changeClicks+=1
  console.log(changeClicks)
  //cb.checked ei toimi tässä tapauksessa
  if (changeClicks % 1 == 0)
  {

    clearInterval(interval);  
  }
  if(changeClicks % 2 == 0) {
    interval=setInterval(subjectChange, 5000);

  }
  
  

 
  
}