# Creating a mod

## Getting Started
Creating a mod with miml is very simple. First is the config file (mod.json), this file contains all the information about the mod. Here is an example:
```json
// mod.json
{
    "name": "example-mod",
    "description": "A really cool example mod.",
    "author": "me, my friend",
    "version": "1.0.0",
    "homepage": "https://mods.mimloader.com/example-mod",
    "preload": false,
    "main": "index.js",
    "dependencies": [
        "example-dependency"
    ],
    "priority": 1
}
```

Lets go over each of these fields:
- `name`: The name of the mod, this is used to identify the mod and is used in the mod list. Assets are also served under this name.
- `description`: A description of the mod, keep it short and sweet.
- `author`: The authors of the mod. You silly!
- `version`: The version of the mod. (using [semver](https://semver.org/))
- `homepage`: The homepage of the mod (if using a hosting provider that supports it use `/download?version` so the mimlauncher can download your mod automatically).
- `preload`: Whether or not the mod should be loaded in a node process. (set to false to disable or a path to the script to run (relative to the mod root))
- `main`: The main file of the mod, this is the file that will be executed when the mod is loaded. (relative to the mod root)
- `dependencies`: A list of dependencies that the mod requires. (should be the link ending of the mod on mod.io)
- `priority`: The priority of the mod, this is used to determine the order in which mods are loaded. (lower number = lower priority, 5 should only be used for things like APIs)

You should put the config file you just created in a folder with the same name as the mod. (`e.g. example-mod/mod.json`)

Now that we have the config file we can start writing the mod. The main file of the mod is where all the code should go. Here is an example of a mod initialises a mimlAPI instance:
```js
// index.js

// Run the code inside a function to make it isolated from the rest of the game and other mods.
class exampleMod {
    console.log("Loading example-mod!");
    // Create an instance of the modding API for this mod.
    // const exampleModAPI = new MimlAPI();
}
```

Great! Now we have a mod, very basic but its a mod. Lets get it running in the game. Just pop it in the mods folder and run the game. You should see the message in the console and the audio changed! (F12)
Look at the [API](#modding-api) section for more information on what you just did and what else you can do.

# Modding API

## Functions

### captureRequest
Used to capture both xml and fetch requests and return custom responses.

Parameters:
- `url`: The url to capture.
- `redirect`: The local to redirect to. (it is **strongly** recommended to only use local files but the there isn't hard enforcement other than you have to figure it out yourself.)

```js
// redirect request for media/SFX_Battle_Attack_Bite.webm to a local sfx/Bite.webm
api.captureRequest('media/SFX_Battle_Attack_Bite.webm', 'cool-mod/assets/sfx/Bite.webm');

// redirect request for Data/cards.json to a local cards.json
api.captureRequest('Data/cards.json', 'cool-mod/assets/cards.json');

```

> ### captureXML
Used to capture xml requests and return custom responses. 

Use [captureRequest](#capturerequest) if you are unsure on the request type.*

Parameters:
- `url`: The url to capture.
- `redirect`: The local to redirect to. (it is **strongly** recommended to only use local files but the there isn't hard enforcement other than you have to figure it out yourself.)

```js
// redirect request for Data/cards.json to a local cards.json
api.captureXML('Data/cards.json', 'cool-mod/assets/cards.json');
```

>### captureFetch
Used to capture fetch requests and return custom responses. *Use [captureRequest](#capturerequest) if you are unsure on the request type.*

Parameters:
- `url`: The url to capture.
- `redirect`: The local to redirect to. (it is **strongly** recommended to only use local files but the there isn't hard enforcement other than you have to figure it out yourself.)

```js
// redirect request for media/SFX_Battle_Attack_Bite.webm to a local sfx/Bite.webm
api.captureFetch('media/SFX_Battle_Attack_Bite.webm', 'cool-mod/assets/sfx/Bite.json');
```

## Events
>### Request
Called when a request is redirected.

**event.detail:**
- `url`: The original url of the request.
- `redirect`: The redirect url of the request.

```js
mimlAPI.addEventListener('request', (event) => {
    console.log(`request: ${event.detail.url} ${event.detail.redirect}`);
});
```

# Utils
## Serving files
To access local files you let miml serve them for you. To do this you need to put any files in an `assets` folder in the root of the mod. They will then be available at `http://localhost:5131/mods/<mod name>/assets/<file path>`. For example if you have a file at `cool-mod/assets/sfx/Bite.webm` you can access it at `http://localhost:5131/mods/cool-mod/assets/sfx/Bite.webm`.

Any mimlAPI function will write the `http://localhost:5131/mods` part for you so you can just use the relative path. (e.g. `cool-mod/assets/sfx/Bite.webm`)

# Donate
If you have found the mod loader useful and would like to support me you can do so on my [ko-fi](https://ko-fi.com/J3J2R58HH).

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/J3J2R58HH)