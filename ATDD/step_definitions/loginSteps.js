const { Given, When, Then } = require('@cucumber/cucumber');

let usuarioActual = {};
const productosDisponibles = ["Sauce Labs Backpack", "Sauce Labs Bike Light", "Sauce Labs Bolt T-Shirt"];

Given('el usuario se encuentra en la pantalla de inicio de sesión', function () {
  usuarioActual = {}; // Reiniciar usuario
  console.log("Usuario en la pantalla de inicio de sesión");
});

Given('ingresa el correo {string} y la contraseña {string}', function (usuario, contraseña) {
  usuarioActual.username = usuario;
  usuarioActual.password = contraseña;
  console.log(`Ingresando usuario: ${usuario}, contraseña: ${contraseña}`);
});

When('hace clic en el botón "Iniciar sesión"', function () {
  if (usuarioActual.username && usuarioActual.password) {
    console.log("Clic en el botón de inicio de sesión");
  } else {
    console.log("Faltan credenciales");
  }
});

Then('el usuario accede correctamente a su cuenta', function () {
  if (usuarioActual.username === "standard_user" && usuarioActual.password === "secret_sauce") {
    console.log("Inicio de sesión exitoso");
  } else {
    console.log("Error: credenciales incorrectas");
  }
});

Then('se redirecciona a la página principal', function () {
  if (usuarioActual.username === "standard_user" && usuarioActual.password === "secret_sauce") {
    console.log("Redirigiendo a la página principal...");
  } else {
    console.log("No se puede redirigir, error de autenticación");
  }
});

Then('la lista de productos es visible', function () {
  console.log("Lista de productos cargada exitosamente");
});

Then('el producto {string} está en la lista de productos', function (producto) {
  if (productosDisponibles.includes(producto)) {
    console.log(`Producto encontrado: ${producto}`);
  } else {
    console.log(`Producto no encontrado: ${producto}`);
  }
});
