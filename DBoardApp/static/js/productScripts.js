function adding(id) {
    var randNum=Math.floor(Math.random() * 5000);
    var row=document.getElementById("prow"+id).value
    localStorage.setItem('orderrow'+randNum,row)



  }