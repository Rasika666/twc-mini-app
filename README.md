# twc-mini-app
---

# Descritption
> This mini app able to create, edit and delete the dummy users. Once user login, there will be a welcome page. Then able to upload dummy user with name, email, telephone number and their avatar. All the avatar images upload to the UPLOAD folder. 

---

# Technologies
### fornt-end side
* reactjs
* react hooks
* redux
* material-UI

### back-end side
* NodeJs with expressJs
* mongodb
* JWT
---

# How To  Run the App
1. clone the project
2. Goto the client directory and run the command `npm install` on terminal
3. once all the dependancies are installed then run command `npm run dev` (concurrently run both NodeJs server(:5000) and React Deployment server(:3000)) <br/>
***remember you need to install the mongodb to your pc and instantiate the mongodb instance***
4. for the user registation --> open the postman (https://www.postman.com/) and send the request to `POST http://localhost:5000/api/v1/auth/register` endpoint with body <br/>
```javascript
{
  "username": "some username",
   "email": "some email",
   "password": "some password"

}
```

5. login with those credentials
6. enjoy

