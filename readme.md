# Escenarios de Prueba

## Login

**Técnica de Prueba:**  
- Se utilizó la técnica de tabla de decisión

### Escenarios

1. **Iniciar sesión con credenciales válidas**
2. **Iniciar sesión con credenciales inválidas**
   - Usuario incorrecto
   - Contraseña incorrecta
   - Ambos incorrectos

## Crear Usuario

**Técnica de Prueba:**  
- Particiones de equivalencia
- Pruebas de Casos de Uso Negativos

### Escenarios

1. **El administrador crea un nuevo empleado sin contraseña y nombre de usuario**
2. **El administrador crea un nuevo empleado con contraseña y nombre de usuario**
3. **El administrador no puede crear un empleado**
   - sin enviar nombre y apellido
   - con un employee id existente
4. **El administrador no puede crear un empleado con datos extras incorrectos**
   - password confirmado es diferente al password principal
   - password menor a 7 caracteres


## Buscar Empleado

**Técnica de Prueba:**  
- Particiones de equivalencia
- Pruebas de Casos de Uso Negativos

### Escenarios

1. **Buscar un empleado por**
   - ID de empleado
   - Nombre del empleado

2. **Buscar un empleado que no existe por**
   - ID de empleado no registrado
   - Nombre del empleado no registrado

---

# Instalación de Playwright

1. **Instalar VSCode**
2. **Instalar Playwright**  
   Ejecuta: `npm init playwright@latest`
3. **Instalar Cucumber**  
   Ejecuta: `npm i @cucumber/cucumber -D`
4. **Instalar el plugin de Cucumber para VSCode**
5. **Instalar el compilador de TypeScript**  
   Ejecuta: `npm i ts-node -D`


# Comandos de Ejecución
## Instala las dependecnias para ejecutar el proyecto
    Ejecuta: `npm i`
### Ejecutar todos los escenarios
     Ejecuta: `npm run test`
### Ejecutar escenario de crear usuario
     Ejecuta: `npm run test -- --tags @creacionUsuario`