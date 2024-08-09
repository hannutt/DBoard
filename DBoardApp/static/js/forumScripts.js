function isAdmin(btnCount) {
    //tekstin piilotus tupla klikkaamalla sitä jos kirjautunut käyttäjä on admin
    var user = document.getElementById("user").innerHTML
    var btnInt = parseInt(btnCount)
    console.log("buttons ",btnCount )
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

  