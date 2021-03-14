# CypressAutomation

**What are we testing** 

We are mainly testing 2 major functionalities - login and settings

Login tests

1. Verify login functionality with valid user credentials

2. Verify the error message when user tries to login with invalid credentials

Settings tests

1. Verify that all the fields are present in the settings page

2.Verify that the user is able to update the username field from the settings page

3.Verify that the user is able to update the email id field from the settings page

4.Verify that the user is able to update the bio field from the settings page

5.Verify that the user is able to update the password field from the settings page

6.Verify that the user is able to update the profile pic from the settings page

7.Verify the validation message when the email id field is updated with an existing email id

8.Verify the validation message when the email id field is updated with a blank email id

9.Verify the validation message when the username field is updated with an existing username

10.Verify the validation message when the username field is updated with a blank username

11.Verify the validation message when the password field is updated with an invalid password

**Instructions on how to run the tests:**

**Prerequisites:**

Node.js should be installed
VS code should be installed ( not mandatory as the tests can be run from command line as well )

**Steps:**

1) Clone the repo in your local machine 

2) Open the project ( that you just cloned )in VS code

3) Open command line terminal in VS code (Terminal>New Terminal)

4) Run the command :  npm install
  This would install all the dependencies specified in package.json file 

5) To run in mobile view , run the below command :

npx cypress run --headed --browser chrome --env configFile=mobile

6) To run in desktop view , run the below command :

npx cypress run --headed --browser chrome --env configFile=desktop

7) Another way to run the tests is to open cypress runner and run the test through GUI. The command for that is : npx cypress open
  

And that is it, it should run all the 13 test cases which I have written


