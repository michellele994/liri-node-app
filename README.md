# liri-node-app
This project was a homework due for the Trilogy & University of Arizona Coding Bootcamp. This project was intended to hone my skills in
 * Javascript
 * jQuery
 * Ajax
 * Node


The homework for this project instructed me to construct an application that will perform certain actions as commanded.

To use, follow these steps
 1. Clone the repository using the link under "Live Demonstration" below.
 2. Once cloned, install all the dependencies using the following code
    ```
    npm install
    ```
 3. Now you can run liri-node-app by running certain commands in the command line. Each command must be preceded by the following:
    ```
    node liri.js ...
    ```
    There are four commands that can be used following "node liri.js".
    * `my-tweets`
        * When this is ran, the 10 most recent tweets on my twitter account will be shown. You can edit this to be your own tweets in keys.js by reconfiguring your twitterKeys.
    * `spotify-this-song '<OPTIONAL: insert song name here>'`
        * When this is ran, information about a song will be displayed using Spotify API.
        * A user can run this command by "spotify-this-song" alone or with the addition of an optional song name.
            * If no song name is specified, information about "The Sign" by the Ace of Base will be displayed. 
            * If a song name is specified, information about that song will be displayed, if exists.
    * `movie-this '<OPTIONAL: insert movie name here>'`
        * When this is ran, information about a movie will be displayed using OMDB API.
        * A user can run this command by "movie-this" alone or with the addition of an optional movie name.
            * If no movie name is specified, information about the movie "Mr. Nobody" will be displayed.
            * If a movie name is specified, information about that movie will be displayed, if exists.
    * `do-what-it-says`
        * When this is ran, the app reads a command from random.txt and runs that command.
            * At default, the command is to run "spotify-this-song,'I Want it That Way'", which will display information about the song I Want it That Way by the Backstreet Boys.

 4. Each command, and even commands entered that are not known, will be logged into log.txt. You can review a history of your commands and its responses in log.txt.

## Live Demonsration
This application is not hosted on the web. Please clone the repository [here](https://github.com/michellele994/liri-node-app) and follow the instructions above.

## Acknowledgements
Bootcamp Instructor: Jan Jorgensen
Bootcamp TAs: Joel Borjorquez, Peter Fesz-Nguyen, and Nicholas Green

Copyright 2017 Michelle Le