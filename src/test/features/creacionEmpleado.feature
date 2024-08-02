@orange
Feature: creacion de un empleado
    @creacionUsuario
    Scenario: El administrador crea un nuevo empleado sin password y username
        Given El admin ingresa a la web de Orange
        And El admin ingresa sus credenciales "Admin" y "admin123"
        And El admin se dirige a la seccion para crear un nuevo empleado
        When El admin ingresa el nombre completo del empleado:
            | firstName | middleName | lastName     |
            | Juana     | Armas      | Belen Quispe |
        Then El admin visualiza un pop up con un mensaje de creación exitosa
        And El nuevo usuario se encuentra en la lista de empleados

    @creacionUsuario
    Scenario: El administrador crea un nuevo empleado con password y username
        Given El admin ingresa a la web de Orange
        And El admin ingresa sus credenciales "Admin" y "admin123"
        And El admin se dirige a la seccion para crear un nuevo empleado
        When El admin ingresa el nombre completo del empleado:
            | firstName | middleName | lastName    |
            | Renesto   | Pablo      | Gareca Tata |
        And El admin ingresa datos extra del usuario:
            | username | password   | confirmarPassword |
            | rene1    | abcsderer1 | abcsderer1        |
        Then El admin visualiza un pop up con un mensaje de creación exitosa
        And El nuevo usuario se encuentra en la lista de empleados


    @NoCrearUsuario
    Scenario Outline: El administrador no puede crear un empleado <caso>
        Given El admin ingresa a la web de Orange
        And El admin ingresa sus credenciales "Admin" y "admin123"
        And El admin se dirige a la seccion para crear un nuevo empleado
        When El admin ingresa el nombre completo del empleado:
            | firstName   | middleName   | lastName   |
            | <firstName> | <middleName> | <lastName> |
        And El admin modifica el "<idEmpleado>"
        Then El admin visualiza el mensaje de advertencia "<mensaje>"

        Examples:
            | caso                         | idEmpleado | firstName | middleName | lastName        | mensaje                    |
            | sin enviar nombre y apellido | 9999       |           |            |                 | Required                   |
            | con un employee id existente | 0295       | Juan      | Manuel     | Guerrero Vargas | Employee Id already exists |

    @NoCrearUsuario
    Scenario Outline: El administrador no puede crear un empleado con datos extras incorrectos, <caso>
        Given El admin ingresa a la web de Orange
        And El admin ingresa sus credenciales "Admin" y "admin123"
        And El admin se dirige a la seccion para crear un nuevo empleado
        When El admin ingresa el nombre completo del empleado:
            | firstName | middleName | lastName    |
            | Renesto   | Pablo      | Gareca Tata |
        And El admin ingresa datos extra del usuario:
            | username | password   | confirmarPassword   |
            | rene1    | <password> | <confirmarPassword> |
        Then El admin visualiza el mensaje de advertencia "<mensaje>"

        Examples:
            | caso                                                   | password | confirmarPassword | mensaje                           |
            | password confirmado es diferente al password principal | abcde123 | nnnnnnn           | Passwords do not match            |
            | password menor a 7 caracteres                          | adasd    | adasd             | Should have at least 7 characters |



    @buscarUsuario
    Scenario Outline: El administrador busca un empleado por <caso>
        Given El admin ingresa a la web de Orange
        And El admin ingresa sus credenciales "Admin" y "admin123"
        And El admin se dirige a la seccion para crear un nuevo empleado
        When El admin busca al empleado con su "<identificador>"
        And El usuario se encuentra en la lista de empleados

        Examples:
            | caso        | identificador            |
            | nombre      | Juana Armas Belen Quispe |
            | employee id | 0460                     |
    @noEncontrarUsuario
    Scenario Outline: El administrador no encuentra un empleado por <caso>
        Given El admin ingresa a la web de Orange
        And El admin ingresa sus credenciales "Admin" y "admin123"
        And El admin se dirige a la seccion para crear un nuevo empleado
        When El admin busca al empleado con su "<identificador>"
        And El admin visualiza un mensaje que el empleado no fue encontrado

        Examples:
            | caso        | identificador                |
            | nombre      | Manuel Mario Vargas Guerrero |
            | employee id | 0111                         |
