# back-end

to utilize the file in the api, please check teh dependencies in the package.json file. 

initial endpoint are all protected wia middleware. 

default URL is 'api/', however, 'GET /' can only test out on a server interface i.e. postman, insomnia, etc. 'GET /' can not test out in browser unless public route is live.   

base route : '/api/'
- to register: '/register' params: username, password
- to login: '/login' params: username, password
- to see public jokes: '/public' this is an unprotected route, users do not have to be register/login to see public route

- below functions only available to the protected route

-add joke '/jokes' params: {joke:'/your input here/'}
-edit joke '/jokes/:id' params: {joke:'/your input here/'}
-delete joke '/jokes/:id' server should return 204 when delete complete
-review available jokes '/jokes'
-to review jokes by joke id if known '/jokes/:id'
-to review jokes by user '/jokes/user/:id' if user id known
