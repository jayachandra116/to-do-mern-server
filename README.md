# to-do-mern-server
To-Do Application using MERN stack- server side

Node-Express server for REST API for to-do management along with user authentication with email, password

Routes:

User:
1.New User Signup
  path: /auth/signup
  method: PUT
  Request Body:
    a. firstName
    b. lastName
    c. email
    d. password
2.User Login
  path: /auth/login
  method: POST
  Request Body:
    a. email
    b. password


To-Do:
1.New To-Do
  path: /todo/new
  method: POST
  headers: Authorization: Bearer {token recieved from login request}
  Request Body:
    a. title

2. Update a to-do
   path: /todo/update/{id}
   method: POST
   headers: Authorization: Bearer {token recieved from login request}
   Request Body:
     a. title
     b. isCompleted

3. Fetch to-do related to specific user
  path: /todo/mine
  method: GET
  headers: Authorization: Bearer {token recieved from login request}

4. Delete a to-do
   path: /todo/delete/{id}
   mathod: DELETE
   headers:  Authorization: Bearer {token recieved from login request}
    
  
