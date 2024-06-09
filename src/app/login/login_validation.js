
document.addEventListener('DOMContentLoaded', function () {
  const logname = document.getElementById('logname');
  const logemail = document.getElementById('logemail');
  const logpass = document.getElementById('logpass');


  form.addEventListener('submit', function (event) {

    let errorMessage = '';
    
    if (!logname.value) {
      errorMessage += 'El nombre de usuario es requerido.\n';
    }
    
    if (!logemail.value) {
      errorMessage += 'El correo electrónico es requerido.\n';
    }
    
    if (!logpass.value) {
      errorMessage += 'La contraseña es requerida.\n';
    }

    // Si hay algún mensaje de error, se muestra la alerta y se previene el envío del formulario
    if (errorMessage) {
      alert(errorMessage);
      event.preventDefault();
      event.stopPropagation();
    }
  });
});
