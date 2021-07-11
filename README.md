# chiletto-spotify

###### _See your spotify public playlists_
<br />


##### Demo: https://spotify-egcch.web.app/

##### Technical documentation: https://chiletto-jsdoc.web.app/

##### Integration Manual (API): https://chiletto-apidoc.web.app/

<br />
<br />


*****This project is based on didactic purposes*****

* Create an api that lists Spotify's public playlists
* It should use Node and Express
* It should be documented
* It is tested by chai framework
* It should focus on code reusability, performance and security
* It should use json schema

<br />
<br />

## Extras

* Authentication using JWT
* Deploy it (On Firebase)
* Use Mongo as database
* Use Mongoose as ORM
* Use React
* Use [Antd React Framework](https://3x.ant.design/)
* Use bcrypt for password protection

<br />
<br />

## Project Structure

*****The entire project contains the following folder structure:*****

```text
app
	public
	src
functions
	api
	schemas
	test
	token
	public
```

Each one has its own package.json as they are separated projects. *App* is the website and *functions* is the project's api.

<br />
<br />

## Before you start

**1. Spotify Config**

1. Create an app on the [Spotify developers page](https://developer.spotify.com/dashboard/login) to get your `client_id` and `client_secret`; 
2. Open [spotify-lib.js](https://github.com/eduardochiletto/chiletto-spotify/blob/main/functions/api/spotify-lib.js) file and set your `client_id` and `client_secret`.


**2. MongoDB**

1. Create or access your [MongoDB](https://cloud.mongodb.com/) account and configure a database to use in this project. Relax. You can use the free account 😉; 
2. Insert your password and your database name in the [connection.js](https://github.com/eduardochiletto/chiletto-spotify/blob/main/functions/api/orm/connection.js) file; 
3. You need set your callback domain as well.

**3. Firebase**

* Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project. If you don't know how, [here's a great tutorial](https://firebase.google.com/docs/web/setup?authuser=0); 

* Follow the Firebase wizard steps; 
* In the terminal, open the project folder and type the command `firebase init` and follow instructions; 
* Create a *launch.json* file in the *.vscode* folder and configure it like this:

```json
"version": "0.2.0",
"configurations": [
	{
		"type": "node",
		"request": "attach",
		"name": "Firebase Functions",
		"port": 9229,
	},
]}
```

<br />
<br />

## Running your project Locally

1. Once you have Firebase ready and running locally, go into the functions/ directory and first run `npm i` then type: `firebase emulators:start --only functions --inspect-functions`; 

2. Maybe, on the first time that you run it, the console may ask for more settings. Follow standard instructions;

3. Copy the fullpath url on console, open [firebase.js](https://github.com/eduardochiletto/chiletto-spotify/blob/main/app/src/firebase/firebase.js) file and paste it on `API_PATH` variable, including `/api/v1/` endpoint; 

4. Go to the App directory and run `npm i` then `npm run dev`

<br />
<br />

## Do you want to deploy?

* Follow instructions [here](https://firebase.google.com/docs/functions/get-started#deploy-functions-to-a-production-environment) to deploy your function and [here](https://firebase.google.com/docs/hosting) to deploy your website (You will need execute `npm run build` command in your App directory and configure `firebase.json` file pointing to your build output directory).

<br />
<br />

### Notes

> :information_source: Yes! **Firebase** has an excellent document-based
> database called Firestore. However, as the goal here is to
> demonstrate the use of MongoDB, the project did not make use of
> Firestore, but you can easily change it. 😃

> :information_source: You will need to migrate to Firebase paid plan if you want to deploy the project online. Check fees and costs according to the amount of hits you want your site to have.  

<br />
<br />

### Powered by

<p align="center">
  <img alt="Light" src="https://www.shareicon.net/data/128x128/2015/09/11/99371_javascript_512x512.png" width="20%">

  <img alt="Light" src="https://www.shareicon.net/data/128x128/2016/07/08/117548_google_512x512.png" width="20%">

  <img alt="Light" src="https://www.shareicon.net/data/128x128/2015/10/06/112729_development_512x512.png" width="20%">

  <img alt="Light" src="https://www.shareicon.net/data/128x128/2016/06/26/619521_studio_256x256.png" width="20%">
  </p>

<br />
<br />

By [Eduardo Chiletto](https://www.linkedin.com/in/eduardochiletto/)
