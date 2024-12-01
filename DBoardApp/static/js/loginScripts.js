

function voiceLogin() {
    var seconds = 10
    document.getElementById("secondsLeft").hidden=false
    //vähennetään seconds muuttujasta luku 1 joka sekunti ja näytetän muuttuva luku html-elementissä
    var interval= setInterval(() => {
        seconds=seconds-1
        console.log(seconds)
       
        document.getElementById("secondsLeft").innerHTML = "Voice login time left: " + seconds
        if (seconds===0)
        {
            clearInterval(interval)
            document.getElementById("secondsLeft").hidden=true
        }
        
    }, 1000);

    const recognitionSvc = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new recognitionSvc();
    var resList = []
    recognition.lang = 'en-GB';
    // Start the speech recognition
    recognition.start();
    recognition.onresult = (event) => {
        // iterate through speech recognition results
        for (const result of event.results) {
            // Print the transcription to the console
            console.log(`${result[0].transcript}`);
            //talleteaan lausutut sanat listaan, että niitä voidan hyödyntää input-kenttiin sijoittamisessa
            resList.push(result[0].transcript)


        }
        document.getElementById("username").value = resList[0]
        //listan viimeinen elementti
        var lastItem = resList.pop()
        document.getElementById("password").value = lastItem
        console.log(resList)



        setTimeout(() => {
            recognition.stop();
            console.log("stopped")
            resList = []

        }, 10000);

     
    }
    
}
  function showPsw() {
      psw = document.getElementById("password")
      if (psw.type === "password") {
        psw.type = "text";
      }
      else {
        psw.type = "password";
      }
    }


