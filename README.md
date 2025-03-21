> #### Rules To Be Follow :-

1. run `npm install` command after cloning the repository.

2. run `npm run build` command before you pushing your code to the remote repository to be reviewed by the Team Leader.

3. All resources are provided in the github project's dashboard of the repository you can check it for more details about the project.

4. Follow the MVC Architectural Pattern:

```
│   index.ts
│   
├───controllers
│       userController.ts
│       
├───middlewares
│       verifyToken.ts
│       
├───models
│       userModel.ts
│       
├───routes
│       userRouts.ts
│       
└───utils
        appError.ts
```

5. Set your `.env` enviroment variables as follows:

```txt
# DATABASE AND PORT
PORT=
LOCAL_DB=

# CLOUDINARY
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# JWT
TOKEN_SECRET=
REFRESH_EXPIRES_IN=
ACCESS_EXPIRES_IN=
EMAIL_EXPIRES_IN=

# Brevo SMTP
API_KEY=
EMAIL_USER=

```

6. Enjoy Coding with you colleagues 😄.

---
