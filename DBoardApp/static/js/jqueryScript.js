  //jquery koodi plot-divn piilottamiseen tuplaklikkaamlla piilottamisen jälkeen
    //näytetään shwoDiv ja button elementti
 
$(document).ready(function () {
    $('#ourProducts').dblclick(function () {
      $('#prods').show();
    })
  });

  $(document).ready(function () {
    $('#ourProducts').click(function () {
      $('#prods').hide();
    })
  });

   //jquery funktio hakee vaihtuvan id-numeron subjectID elementistä, kun käyttäjä klikkaa
     //changingSubjects elementtiä. klikkauksen jälkeen scrollIntoView funktio siirtää
     //käyttäjän klikattuun subject+id diviin.
     $(document).ready(function () {
     jQuery("#changingSubjects").click(function () {
        event.preventDefault();
        var idNumber = jQuery("#subjectID").text();
        console.log(idNumber)
        var element = document.getElementById("subject"+idNumber);
        element.scrollIntoView();
      
      })
    })

       //jquery funktio näyttää jokaisen _id-arvon ja siirtää sen input-kenttään kun sitä klikkaa hiirellä.
       $(document).ready(function () {
       jQuery("#question{{forloop.counter}}").click(function () {
        event.preventDefault();
        var text = jQuery(this).text();
        console.log(text)
        askFromBot(text)
      })
    })

    $(document).ready(function () {
    jQuery("#prodName{{forloop.counter}}").click(function () {
        event.preventDefault();
        var text = jQuery(this).text();
        console.log(text)
        askFromBot(text)
      })
    })
