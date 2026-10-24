## TRABAJO PRÁCTICO DE TL II

**Nombre y Apellido:** Axel Cardozo

**Profesores:** Agustin Centurión, Marcos Francos, Diego Britos

## Mi justificacion :

## Colecciones

- **users:** username, email, password, profile, tasks, isActive
- **profiles:** biography, address (city, province), user, isActive
- **tasks:** title, description, owner, tags, isActive
- **tags:** name, isActive

## Justificación de las relaciones

### Embebido: `address` dentro de profiles

Elegí embebido porque la dirección pertenece solo a ese perfil, no se comparte con
ningún otro documento y no la consulto por separado. Como siempre se lee junto con
el perfil, al estar embebida viene en la misma consulta sin necesidad de populate.
No tenía sentido crear otra colección solo para guardar ciudad y provincia.

### Relación 1:1: users ↔ profiles (referenciada)

El perfil guarda el id del usuario en el campo `user` con `ref: "User"`. Para que sea
1 a 1, el campo tiene `unique: true`, así no pueden existir dos perfiles con el mismo
usuario, y además en la validación con `custom()` reviso que el usuario no tenga
perfil antes de crearlo. El user también guarda el id de su perfil en `profile`.

Elegí referenciado porque el perfil tiene su propio CRUD: se crea, se actualiza y se
borra por separado del usuario.

### Relación 1:N: users → tasks (referenciada)

Cada tarea guarda el id de su dueño en `owner`, y el usuario guarda un arreglo
`tasks` con los ids de sus tareas. Cuando creo una tarea, la agrego al arreglo del
usuario con `$addToSet`.

Elegí referenciado porque un usuario puede tener muchas tareas y cada tarea se maneja
por separado (tiene su propio CRUD). Si las tareas estuvieran embebidas dentro del
usuario, el documento crecería cada vez más y sería más difícil modificar una sola.

### Relación N:M: tasks ↔ tags (referenciada)

Cada tarea guarda un arreglo `tags` con los ids de sus etiquetas. Una tarea puede
tener muchas etiquetas y una misma etiqueta puede estar en muchas tareas.

Elegí referenciado porque las etiquetas se comparten entre tareas. Si estuvieran
embebidas, al cambiarle el nombre a una etiqueta tendría que cambiarlo en todas las
tareas que la tienen. Al ser referencia, se cambia en un solo lugar.

## Investigación

### 1. Populate desde colecciones sin referencias

`populate` solo funciona sobre un campo que tenga `ref`. Por ejemplo, si solo la
tarea guardara `owner`, desde el usuario no habría ningún campo para hacer populate
de sus tareas.

En mi trabajo lo resolví guardando la referencia en los dos lados: el usuario
tiene `profile` y `tasks`, y los completo cuando se crea un perfil o una tarea. Así
desde `GET /api/users` puedo hacer populate del perfil, de las tareas y, con un
populate anidado, de las etiquetas de cada tarea. Por esta razón no se permite
cambiar el `owner` de una tarea en el update, para que los dos lados no queden
desincronizados.

Investigando encontré otra forma que se llama **virtual populate**: se define un
campo virtual en el schema con `ref`, `localField` y `foreignField`, y Mongoose busca
los documentos relacionados sin guardar nada en la colección. No lo usé porque no lo
vimos en clase y preferí usar el populate normal.

### 2. Eliminación lógica y en cascada

**Lógica:** en vez de borrar el documento, le cambio `isActive` a `false` con
`findByIdAndUpdate`. El documento sigue en la base de datos, pero todas las
consultas filtran por `isActive: true`, así que deja de aparecer.

**En cascada:** cuando borro un documento también actualizo los que dependen de él:

- Al borrar un **usuario**, también se desactivan su perfil y todas sus tareas con
  `updateMany`.
- Al borrar una **etiqueta**, se saca de todas las tareas que la tenían con `$pull`.

### 3. Endpoint para agregar un vínculo N:M

Creé la ruta `POST /api/tasks/:id/tags/:tagId`, que le agrega una etiqueta a una
tarea que ya existe, sin tener que mandar la tarea completa de nuevo.

En el controlador uso `findByIdAndUpdate` con el operador `$addToSet`, que agrega el
id de la etiqueta al arreglo `tags` de la tarea solo si todavía no está.
