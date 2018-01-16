var fs = require("fs");
var twitter = require("twitter");
var spotify = require("node-spotify-api");
var request = require("request");
var keysjs = require("./keys.js");

var twitterKeys = keysjs.twitterKeys;
var spotifyKeys = keysjs.spotifyKeys;

//To make things look pretty
logAndAddToTxt("COMMAND LINE: " + (process.argv).slice(2).join(" "));
runCommand(process.argv[2], process.argv.slice(3));


//FUNCTIONS
//---------------
function runCommand (command, subCommand)
{
	if (command === "my-tweets")
	{
		myTweets();
	}
	else if (command === "spotify-this-song")
	{
		searchSpotify(subCommand);
	}
	else if ( command === "movie-this")
	{
		searchMovie(subCommand);
	}
	else if (command === "do-what-it-says")
	{
		doWhatItSays();
	}
	else
	{
		setTimeout(function() {
			logAndAddToTxt("I don't understand. What was it that you wanted me to do?");
		}, 500);
	}
}


function myTweets()
{
	var twitterObj = new twitter(twitterKeys);
	twitterObj.get('statuses/user_timeline', function(error, tweets, response) {
		if (!error) {
			//header is to make things look pretty and organized.
			var header = "TWENTY RECENT TWEETS";
			//The purpose of initiating the first tweet outside of the for loop is to prettify.
			var myTweets = "\n1. " +tweets[0].text;
			for (var i = 1; i < 20; i++)
			{
				myTweets += "\n"+(i+1)+". "+ tweets[i].text;
			}
			logAndAddToTxt(header + myTweets);
		}
		else
		{
			console.log(error);
		}
	});
}

function searchSpotify(songName)
{
	var spotifyObj = new spotify(spotifyKeys);
	//If subCommand happens to be an array (if the user did not put quotations around song name)
	if (typeof songName === "object")
	{
		//Join the components of the array with a space, which will turn subCommand into a string.
		songName = songName.join(" ");
	}
	if (songName === "" || songName === undefined || songName.length === 0)
		{
			songName = ("The Sign").toUpperCase();
		}
	//Call searchSpotify() function with the song name forced into uppercase letters for comparison.
	songName = songName.trim();
	songName = songName.toUpperCase();

	spotifyObj.search({ type: "track", query: songName}, function(err, data)
	{
		if (!err)
		{
			var listOfTracks = data.tracks.items;
			var songNum = [];
			var artists = [];

			//Check the given songs to see which songs match the song title.
			//Spotify is weird and sometimes will not filter out artists names that also match and their song name does not match
			for (var i = 0; i < data.tracks.items.length; i++)
			{
				//change each song titles in JSON to uppercase to compare with commanded song
				var songsInJSON = (listOfTracks[i].name).toUpperCase();

				//If the song name user identifies matches with any of the songs listed in JSON, push the number into an array so we
				//can index the first song that includes the song name.
				if ((songsInJSON).includes(songName))
				{
					songNum.push(i);
				}
			}

			//If there are no songs that match the specified song name, send the user a message.
			if (songNum.length === 0)
			{
				setTimeout(function(){
					logAndAddToTxt("That song doesn't seem to exist in Spotify. Try another song");
				}, 500);
			}
			else
			{
				//Look through the first song of the list that matches the song name and collect artists.
				for (var i = 0; i < listOfTracks[songNum[0]].artists.length; i++)
				{
					artists.push(listOfTracks[songNum[0]].artists[i].name);

				}

				//display the information to logAndAddToTxt()
				var header = "SONG INFORMATION: "
				var songInfo = "\nArtist Name(s): " + artists+
				"\nSong Name: "+ listOfTracks[songNum[0]].name+
				"\nPreview Song URL: "+ (listOfTracks[songNum[0]].preview_url || "There doesn't seem to be one available")+
				"\nAlbum: "+ listOfTracks[songNum[0]].album.name;
				logAndAddToTxt(header + songInfo);
			}
		}
		else
		{
			console.log(err);
		}
	});
}

function searchMovie(movieName)
{
	//if movieName happens to not have anything in it at all, default to "Mr. Nobody", per instructions
	if (typeof movieName === "object")
	{
		movieName = movieName.join("+");
	}
	if (movieName.length === 0 || movieName === undefined)
	{
		movieName = "Mr. Nobody";
	}
	//If movieName happens to be an array because user did not use quotations, join with "+".

	//Replace all spaces in the movieName with a "+" to accurately query.
	movieName = movieName.trim();
	movieName.replace(" ", "+");

	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
	request(queryUrl, function(error, response, body) {

		//If the movie name typed does not produce a response, send a message.
		if (JSON.parse(body).Response === "False")
		{
			setTimeout(function() {
				logAndAddToTxt("That movie does not seem to exist in OMDB. Try another movie");
			}, 500)
		}

		//If movie name does exist and there are no errors, display the information
		else if (!error && response.statusCode === 200) {
			var movieInfo = "Title: " + JSON.parse(body).Title+
			"\nRelease Year: " + JSON.parse(body).Year+
			"\nIMDB Rating: " + JSON.parse(body).imdbRating+
			"\nRotton Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value+
			"\nCountry Produced: " + JSON.parse(body).Country+
			"\nLanguage: " + JSON.parse(body).Language+
			"\nPlot: " + JSON.parse(body).Plot+
			"\nActors: " + JSON.parse(body).Actors;
			logAndAddToTxt(movieInfo);
		}
		//If there is an error, console.log the error message
		else if (error)
		{
			console.log(error);
		}
	});
}

function doWhatItSays(command, subCommand) {
	fs.readFile("random.txt", "utf8", function(error, data) {
		logAndAddToTxt("COMMAND LINE: " + data);
		data = data.split(",");
		command = data[0];
		//if someone changed random.txt with the command being do-what-it-says, display an angry message as LIRI is upset.
		if (command === "do-what-it-says")
		{
			setTimeout(function() {
				logAndAddToTxt("NO WAY YOU'LL MAKE ME WORK FOREVER");
			}, 500);
		}
		else if (data[1] !== undefined)
		{
			//If there are quotation marks, take the quotation marks out and set to subCommand
			if ((data[1].charAt(0) === '"' && data[1].charAt(data[1].length-1) === '"') ||
				(data[1].charAt(0) === "'" && data[1].charAt(data[1].length-1) === "'"))
			{
				subCommand = data[1].slice(1, data[1].length-1);
			}
			//If no quotation marks, take the data as is and set as subCommand
			else
			{
				subCommand = data[1];
			}
			runCommand(command, subCommand.toUpperCase());
		}
		else
		{
			runCommand(command);
		}
	});
}


//Adds text to the log.txt file for BONUS
function logAndAddToTxt(whatToAdd) {
	console.log(whatToAdd);
	fs.appendFile("log.txt", "\n" + whatToAdd + "\n ----------", function(err) {
		if (err) {
			console.log(err);
		}
		else {
			console.log("***log.txt has been updated!***");
		}
	});
}
