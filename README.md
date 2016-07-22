# mock server for redux thunk sign-in example

## Running

1. ```npm install```
2. ```npm start```
2. ```running on localhost:3000```

routes:  
		http://localhost:3000/signin/  --post - sent with headers.secret:'123456',    
		body: {name:me,password:password}    
		returns { secret:'123456' };  
		and redirects you to localhost:3000/secure/  with headers.secret:'123456'  
		this protected page token expires in 10 seconds   
