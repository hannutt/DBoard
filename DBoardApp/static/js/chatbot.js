
var API_KEY="";
// fetch the txt file
function getApiKey() {
    fetch("/static/js/apikey.txt")

    .then( r => r.text() )
    .then( t => {

        API_KEY = t;
        console.log(API_KEY);
       
  } )
    
}

//pid saadaan webshop.html kautta, jossa se annetaan parametrina
//sen avulla avataan klikatun tuotteen kohdassa questions div. divit on nimettu questions + forloopin
//numero, että jokaiselle tuotteelle saadaan oma kysymyspohja
var questionClicks=0
function showQuestions(pid,event) {
    questionClicks+=1
    if (questionClicks % 1 == 0)
    {
        var questions=document.getElementById("questions"+pid)
        questions.hidden=false
        event.preventDefault()

    }
    if (questionClicks % 2 ==0) {
        var questions=document.getElementById("questions"+pid)
        questions.hidden=true
        event.preventDefault()

    }
   
    
}

function askFromBot(text)
{

    if (text==="What is this product?")
    {
        var question = 'what are nicotine pouches?'
    }
    const API_URL="https://api.openai.com/v1/chat/completions"
    

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${API_KEY}`
        },
        body:JSON.stringify({
            model:"gpt-3.5-turbo",
            messages:[{role: "user", content: question}]
        })


    }
    fetch(API_URL,requestOptions).then(res=>res.json()).then(data => {
        console.log(data)
        alert(data.choices[0].message.content)
        
       
    }).catch((error)=>{
        console.log(error)
        
    })

}



function ask(prod,pid,event) {
    
    var ta=document.getElementById("ta"+pid)
    ta.hidden=false
    //tämä estää django formin post metodin suorituksen
    event.preventDefault()
    
    var finalFormat = "what is "+prod
    const API_URL="https://api.openai.com/v1/chat/completions"
    

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${API_KEY}`
        },
        body:JSON.stringify({
            model:"gpt-3.5-turbo",
            messages:[{role: "user", content: finalFormat}]
        })


    }
    fetch(API_URL,requestOptions).then(res=>res.json()).then(data => {
        console.log(data)
        ta.innerText=data.choices[0].message.content
        //console.log(data.choices[0].message.content)
        
       
    }).catch((error)=>{
        console.log(error)
        
    })

}


    
    
   
