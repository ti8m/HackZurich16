# tim_hackzurich_backend

Backend code for Joy App

## About

The backend for the Joy App was developed with Java 1.8, the Spring Framework, the Build-Management Tool Gradle, Hibernate with JPA and MySql as Database.

## Getting Started

### Open Project

The Project can be oppened by an IDEE. Intellij is recommended!
The Project has to be import as a gradle project with Java 1.8.

### Database

The default database is MySql. To use the default database you need to create a datasource with the following settings:
```
  datasource:
    url: jdbc:mysql://localhost:3306/paybox
    username: root
    password:
```
A datasource can be created with MySQL Workbench which we recommend 
All settings can be changed by changing the application.yaml at app/src/main/resources if you use different schema or username.


### Server

The server can be started by excuting the main methode of the Application class from app module (app/src/main/java/ch.ti8m.paybox). The Tomcat server will started automatically by starting the main method. Befor executing the main method the MySQL server must be running!
