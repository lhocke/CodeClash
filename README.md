# CodeClash

CodeClash is an interactive coding quiz that uses CodeMirror and MySQL to give a user a problem, take the user's input and run a series of test cases to determine the validity of the solution. By storing the test arguments and expected values rather than attempting to match input exactly we are able to check for a number of possible answers.

CodeClash uses npm pacakges sequelize, express, mysql2, bcrypt, passport, body-parser, and method-override.


## Walkthroughs

### Arena

The Arena uses CodeMirror to provide the user with a text editor and grabs the user input to check against a series of arguments and expected values. If the function fails, the user will be provided with an error and the number of failed tests.

![Arena Fail Check](/demo-gifs/arena-fail-check.gif)

![Arena Success Check](/demo-gifs/arena-success-check.gif)
#### Demo

#### Code

