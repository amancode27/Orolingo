# Backend Documentation
## Api Documentation

* Protocol: *localhost:8000/api*
* Endpoints: *localhost:8000/api/{modelName}/*
* For example, if you want to access *student* models then it should be *localhost:8000/api/student/*
* For accessing the list of anything, for example, students, you need to send a get request to *localhost:8000/api/student/*, it sends as response a json in which there is an objects array which contains each of the student objects
* For accessing the details of a particular object with an id,send a get request to *localhost:8000/api/student/{id}/*
* Foreign keys in response: foreign keys are given with their detail uri, for example the *course* model has a foreign key to *language* model. So the foreign key to language 1 in a course will be returned as *language: "api/language/1/"*
* To get the details of a foreign key within the object instead of the uri, you need to set `full=True` in the parameters passed to the foreign key in the resource
* For filtering a set of objects with a particular parameter, send a get request to *localhost:8000/api/{modelName}/?{parameterName1}={parameterValue1}&{parameterName2}={parameterValue2}*
  * Example: to get all courses of a language French simply do *localhost:8000/api/course/?language=2* where 2 is the id of French language.
  * For the above to work, the resource for the particular model should allow *filtering* where the meta class in the resource should have the following code
    ```
      filtering: [
        language: ALL
      ]
    ```
  * There are various other forms of filtering, you can read about that in [tastypie docs - filtering](https://django-tastypie.readthedocs.io/en/latest/resources.html#basic-filtering)
* To create a new record in a model send a post request to *localhost:8000/api/{modelName}/* with *body* as JSON data with details of the record.
* Similarly for put, patch as in post
  * put request can be send to *localhost:8000/api/{modelName}/* to replace the existing version if any.
  * patch request can be send to *localhost:8000/api/{modelName}/{id}/* to set or change any particular detail
* Delete requests are same as get request except it can be send only to *localhost:8000/api/{modelName}/{id}/*

## Social Login
* Code taken from: https://medium.com/@katherinekimetto/simple-facebook-social-login-using-django-rest-framework-e2ac10266be1
* Generic details about various access provider settings: https://github.com/RealmTeam/django-rest-framework-social-oauth2

## Normal Login and Signup
* Login: *localhost:8000/token-auth/*
  * Post Request body: username, password
  * Response: user details and token
* Signup: *localhost:8000/auth/users/*
  * Post Request body: username, password, email, etc.
  * Response: user details and token
* Token Verification on reload: *localhost:8000/auth/current_user/*
  * Get request header: Authorization: 'JWT {token}'
  * Response: user details

## App secret and key
The App secret and key for google and facebook login are in the settings.py file. Please create a new secret and key from any central account and paste it in an environment file and access it from there, instead of directly pasting it in the settings.py file.
