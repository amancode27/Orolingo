## Introduction

This is a language learning platform named Orolingo

## Requirements
* Python3
* Pipenv

## Getting started

1. Navigate into the diretory ```[cd backend]```
2. Source the virtual environment ```[pipenv shell]```
3. Install the dependencies ```[pipenv install]```
4. Navigate into the frontend directory ```[cd frontend]```
5. Install the dependencies ```[npm install]```

## Run the application
You will need two terminals pointed to the frontend and backend directories to start the servers for this application.
1. Download the xampp server and run apache and sql then always run the command ```[python manage.py migrate]``` after pulling commits from git in backend folder to migrate the database
2. If the migration doesn't happen the run  ```[localhost/phpmyadmin]``` on the browser and create a blank database named 'orolingo' then run the command ```[python manage.py migrate]``` in backend folder to migrate the database .
3. Run this command to start the backend server in the ```[backend]``` directory: ```[python manage.py runserver]``` (You have to run this command while you are sourced into the virtual environment)
4. Run this command to start the frontend development server in the ```[frontend]``` directory: ```[npm run start]``` (This will start the frontend on the adddress [localhost:3000](http://localhost:3000))


## Built With

* [React](https://reactjs.org) - A progressive JavaScript framework.
* [Python](https://www.python.org/) - A programming language that lets you work quickly and integrate systems more effectively.
* [Django](http://djangoproject.org/) - A high-level Python Web framework that encourages rapid development and clean, pragmatic design.

## Django JWTS use
* pipenv install django
* pipenv install djangorestframework
* pipenv install djangorestframework-jwt
* pipenv install django-cors-headers

## Others 
* pip install django-rest-framework-social-oauth2
* pip install django-tastypie
