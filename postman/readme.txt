En las pruebas seleccionadas para este proyecto, elegí aquellas que cubren adecuadamente las condiciones solicitadas en el parcial, 
asegurando que se validen todos los casos de uso relevantes para la creación, obtención, eliminación y validación de usuarios, 
clases y bonos dentro del sistema. Cada prueba fue diseñada para reflejar con precisión las reglas de negocio y las restricciones establecidas, 
garantizando que el comportamiento del sistema cumpla con los requisitos esperados en distintos escenarios.

Los nombres de las pruebas dentro de Postman han sido cuidadosamente elegidos para que sean intuitivos y reflejen claramente lo que cada prueba está validando. 
Esto facilita la comprensión del propósito de cada test sin necesidad de revisar el detalle de la implementación. 
Cada endpoint tiene un nombre descriptivo que permite identificar de inmediato qué acción se está evaluando, ya sea la creación de un usuario, 
la búsqueda de una clase o la eliminación de un bono.

Es importante seguir un orden específico al ejecutar las pruebas en Postman: primero, 
se deben correr las pruebas relacionadas con usuarios, ya que estos son los elementos fundamentales en el sistema y afectan la creación de otros objetos. 
Luego, deben ejecutarse las pruebas de clase, ya que son necesarias para asociar correctamente los bonos con las clases correspondientes. 
Finalmente, se deben realizar las pruebas de bono, que dependen tanto de la existencia de usuarios válidos como de clases registradas en el sistema. 
Este orden garantiza que los datos necesarios estén correctamente configurados antes de validar las funciones relacionadas con los bonos.