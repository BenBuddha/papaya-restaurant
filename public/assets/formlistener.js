var frm = $('#contact_form');
var msg_res ='';

frm.submit(function (e) {

    e.preventDefault();

   
    $.ajax({
        type: frm.attr('method'),
        method: "POST",
        url: "https://formsubmit.co/ajax/ben.skoglund@live.se",
        dataType: 'html',
        accepts: 'application/json',
        data: frm.serialize(),
        success: function (response) {
        $("#message").html(response);
            if(response != msg_res){
                msg_res = response; //store new response
                document.getElementById('contact_form').style.display = 'none';
                document.getElementById('topic-text').style.display = 'none';
                // Show thank you message element
                document.getElementById('thank_you').style.display = 'block';
              }
        },
        error: function (data) {
            console.log('An error occurred.');
            console.log(data);
        }
    });
    return false; // here a change
}); 

const theButton = document.querySelector(".button");

theButton.addEventListener("click", () => {
    theButton.classList.add("button--loading");
});


var $input = $('input:text'),
    $register = $('#nextStep');

$register.attr('disabled', true);
$input.keyup(function() {
    var trigger = false;
    $input.each(function() {
        if (!$(this).val()) {
            trigger = true;
        }
    });
    trigger ? $register.attr('disabled', true) : $register.removeAttr('disabled');
});

