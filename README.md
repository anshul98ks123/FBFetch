# FBfetch
Fetches posts from csi nsit fb page and displays in order of likes and shares.

## Setting Up The App

### Step-1
In the directory of saved files, open terminal, cd into that directory, and run following commands: 
```
npm install
```

### Step-2
* Option-1
Run following commands in mysql client.
```
create user fbuser identified by 'password';
create database dbfbfetch;
grant all privileges on dbfbfetch.* to fbuser;
flush privileges;
```
* Option-2
Create your own mysql database and set its details in config.js file under DB object

### Step 3
1. Register an fb app ar https://developers.facebook.com.
1. Go to the settings of your fb app.
1. Click on 'Add Platform', and choose 'Website' option.
1. Now enter the following link in the site URL input under website section of settings page.
```
http://localhost:8000/
```
1. Save Changes.

Now enter the following fields in config.js file

1. CLIENT_ID (APP ID from facebook)
1. CLIENT_SECRET (APP SECRET from facebook) ( with quotes )

### Step 4
In the directory of saved files, open terminal, cd into that directory, and run following command: 
```
node app.js
```

### Step-5
Now you can access the website at http://localhost:8000

*If it does not work, send an email at anshul98ks123@gmail.com*
