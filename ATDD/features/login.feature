Feature: Inicio de Sesión en el Aplicativo

  Scenario: Inicio de sesión exitoso y visualización de productos
    Given el usuario se encuentra en la pantalla de inicio de sesión
    And ingresa el correo "standard_user" y la contraseña "secret_sauce"
    When hace clic en el botón "Iniciar sesión"
    Then el usuario accede correctamente a su cuenta
    And se redirecciona a la página principal
    And la lista de productos es visible
    And el producto "Sauce Labs Backpack" está en la lista de productos
