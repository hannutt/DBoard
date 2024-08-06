
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

function ask(prod,pid,event) {
    getApiKey()
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
    
    
   
