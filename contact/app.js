const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});
/*
$('form').on('submit', function( event ) {
  var $form = $( this );

  event.preventDefault();
  $('.alert-success').addClass('hidden');
var gradeField = document.querySelector("input[type=submit]");

gradeField.addEventListener("success", function() {
  this.setCustomValidity('');
  if (!this.validity.valid) {
    this.setCustomValidity('Pesanmu berhasil dikirm!');
  }
});
  $.ajax({
    url: '/contact/index.html',
    type: 'POST',
    data: $form.serialize(),
    success: function(response){
        $('.alert-success').removeClass('hidden');
        $('.js-btn').button('reset');
    }
  });
 }); */