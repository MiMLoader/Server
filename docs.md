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
    "priority": 1,
    "tags": [
        "card",
        "recipe"
    ]
}
```

Lets go over each of these fields:
- `name`: The name of the mod, this is used to identify the mod and is used in the mod list. Assets are also served under this name.
- `description`: A description of the mod, keep it short and sweet.
- `author`: The author of the mod. You silly!
- `version`: The version of the mod. (using [semver](https://semver.org/))
- `homepage`: The homepage of the mod (if using a hosting provider that supports it use `/download?version` so the mimlauncher can download your mod automatically).
- `preload`: Whether or not the mod should be loaded in a node process. (set to false to disable or a path to the script to run (relative to the mod root))
- `main`: The main file of the mod, this is the file that will be executed when the mod is loaded. (relative to the mod root)
- `dependencies`: A list of dependencies that the mod requires. (should be the name/id of the mod)
- `priority`: The priority of the mod, this is used to determine the order in which mods are loaded. (lower number = lower priority, 5 should only be used for things like APIs)
- `tags`: (optional) List of tags that describe the mods function.

You should put the config file you just created in a folder with the same name as the mod. (`e.g. example-mod/mod.json`)

Now that we have the config file we can start writing the mod. The main file of the mod is where all the code should go. Here is an example of a mod initialises a mimlAPI instance:
```js
// index.js

// create your mod class extending the mimlAPI
class ExampleMod extends MimlAPI {
    constructor() {
        // use your mods name
        super('example-mod');
        console.log('Loading example mod');

        // run the main code
        this.main();
    }

    // put your mods code in here
    main() {
        console.log('wow! my really cool code for my really cool mod!');
    }
}

// run your mod
new ExampleMod();
```

Great! Now we have a mod, very basic but its a mod. Lets get it running in the game. Just pop it in the mods folder and run the game. You should see the messages in the console! (F12)
Look at the [API](#modding-api) section for more information on what you just did and what else you can do.

# Modding API

## Functions

### awaitGameLoad
Will wait for the player object to exist (in a game).

```js
await this.awaitGameLoad();
```

### awaitRuntimeLoad
Will wait for the runtime to exist.

```js
await this.awaitRuntimeLoad()
```

### recipe.modify
Modify an existing recipe.

- method: string - The method to modify (e.g. "player", "furnace", "workbench")
- name: string - The name of the recipe to modify
- materials: Array - The materials to set the recipe to (e.g. "wood:3,stone:2")
- locked: boolean - If the recipe is locked by default, can be unlocked with a quest
- hidden: boolean - If the recipe should be hidden in UI's while locked.
- priority: number - Quest completed to unlock (optional) (e.g. "blacksmith quest1")
- verySpecial: boolean - Whether the alchemist *strikes a pose* when they craft the item for the first time

```js
this.recipe.modify("player", "gate", "wood:3,store:2");
```

### card.modify

Coming soon. I hate the game engine :/

# Utils
## Serving files
To access local files you let miml serve them for you. To do this you need to put any files in an `assets` folder in the root of the mod. They will then be available at `http://localhost:5131/mods/<mod name>/assets/<file path>`. For example if you have a file at `example-mod/assets/sfx/Bite.webm` you can access it at `http://localhost:5131/mods/example-mod/assets/sfx/Bite.webm`.

## Runtime
MiMLauncher gives an easy way of talking to the game runtime, just use the global variable `miml.runtime`

# Donate
If you have found the mod loader useful and would like to support me you can do so on my [ko-fi](https://ko-fi.com/J3J2R58HH).

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/J3J2R58HH)
