@orange
Feature: iniciar sesion en la web orange


    Scenario: Iniciar sesion con credenciales validas
        Given El admin ingresa a la web de Orange
        When El admin ingresa sus credenciales "Admin" y "admin123"
        Then El admin ingresa al Dashboard de Orange



    Scenario: Iniciar sesion con credenciales invalidas, <caso>
        Given El admin ingresa a la web de Orange
        When El admin ingresa sus credenciales "<username>" y "<password>"
        Then El admin visualiza un mensaje de credenciales invalidas

        Examples:
            | caso                            | username | password |
            | username incorreccto            | dasdasd  | admin123 |
            | password incorreccto            | Admin    | wrong    |
            | username y password incorrectos | wrong    | wrong    |



