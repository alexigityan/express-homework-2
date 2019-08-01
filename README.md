*Project deployed on [Glitch!](https://express-demo-crud.glitch.me/)*

# Simple web app - todo app (CRUD)

* Render a page with Todos on "/" route
* Add form (1 x input, 1 x button) to the top in the page
* Create new todo when Form button will be pressed(new todo shouldn't be empty)
* Every "Todo" row should contain 2 buttons - Edit, Delete
* Delete buttons should remove current todo from the array
* Edit button should redirect to "/edit" route
* Render Form (1 x input, 1 x button) on "/edit" and fill the input with todo which should be edited
* After editing todo(on button press) redirect to "/" route.

## Update

*Homework: Move Todo App frontend part to render in client-side.*

**Ajaxify todo app & Component-Based JS**
* Imperative/Declarative paradigms
* Updating UI using js    
* Creating components with ES6
* Making HTTP calls using fetch

* Have the following endpoints
  * POST /api/todos to create new todo
  * GET /api/todos to fetch all todos
  * PUT /api/todos/:id and send put request to update todo
  * DELETE /api/todos/:id and send delete request to remove current todo

* All frontend should be kept in client-side and should be sent from backend on '/' route. 
* On Press `Edit` button fill input with the name of current todo
