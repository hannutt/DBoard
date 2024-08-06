let API_KEY="";

function ask(prod,event) {
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
        //console.log(data.choices[0].message.content)
        
       
    }).catch((error)=>{
        console.log(error)
        
    })

}
    
    
   
