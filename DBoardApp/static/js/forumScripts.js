function isAdmin() {
    //tekstin piilotus tupla klikkaamalla sitä jos kirjautunut käyttäjä on admin
    var user = document.getElementById("user").innerHTML
    console.log(user)
    if (user === 'admin') {
      jQuery(".bodyTxt").dblclick(function () {
        event.preventDefault();
        var text = jQuery(this).hide();
      })

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

  