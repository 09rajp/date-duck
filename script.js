

 // // Initialize Firebase
 //  var config = {
 //    apiKey: "AIzaSyA8c0Kk-Ei2y4URupPcyNzXCiTJfofE6HY",
 //    authDomain: "date-duck.firebaseapp.com",
 //    databaseURL: "https://date-duck.firebaseio.com",
 //    projectId: "date-duck",
 //    storageBucket: "date-duck.appspot.com",
 //    messagingSenderId: "359049402122"
 //  };
 //  firebase.initializeApp(config);

	// var userZipCode = "";


	$("#zip-submit").click(function(){
		event.preventDefault();
		userZipCode = $("#zip").val();
		console.log(userZipCode);
		$("#get-started").css("display", "none")
		$("#vibe-selection").show(300);

		var wuAPIKey = "a4c27a2f36ce4003";
		var queryURL = "http://api.wunderground.com/api/" + wuAPIKey + "/conditions/q/" + userZipCode + ".json";

		$.ajax({
	    	url: queryURL,
	    	method: "GET"
	  	})
	      
	  // retrieved data "response"
	  .done(function(response) {
	    console.log(queryURL);
	    console.log(response);
	    console.log("Current weather: " + response.current_observation.weather);
	    console.log("Current temperature: " + response.current_observation.temp_f + " degrees(f)")

	    $("#conditions").html("<span class='conditions-heading'>Conditions:</span><br><span class='conditions-response'>" + response.current_observation.weather) + "</span>";
	    $("#temperature").html("<span class='temperature-heading'>Temperature:</span><br><span class='temperature-response'>" + response.current_observation.temp_f + " F</span");
	  });
  	

  // Here we are building the URL we need to query the database
  var queryURL = "http://api.wunderground.com/api/" + wuAPIKey + "/conditions/q/GA/Atlanta.json";

  // AJAX call to the Weather Underground API
  $.ajax({
    url: queryURL,
    method: "GET"
  })

      
  // retrieved data "response"
  .done(function(response) {
    console.log(queryURL);
    console.log(response);
    console.log("Current weather: " + response.current_observation.weather);
    console.log("Current temperature: " + response.current_observation.temp_f + " degrees(f)")

    $("#conditions").html("Weather conditions: " + response.current_observation.weather);
    $("#temperature").html("Temperature: " + response.current_observation.temp_f + " degrees(f)");
  });
  
  });


//FOURSQUARE API HERE

		var app = {};

		var clientId = 'JFYFDNW4QYLUK5AKHG2LLQBJ2OMGE1J24X0NUHJTED0EQT4H'
		var clientSecret = 'T5TVNZ4L3X0M3XFXURPGSA040NWBR4MCQG1VU05PWEI1ASZA'

		app.romantic = function(query) {
			$.ajax({
				url: 'https://api.foursquare.com/v2/venues/search', 
				type: 'GET',
				dataType: 'jsonp',
				data: {
					client_id: clientId,
					client_secret: clientSecret,
					intent: 'browse',
					v: 20150513,
					format: 'jsonp', 
					near: userZipCode,
					query: query, 
					limit: 6,
					openNow : true,
					sortByDistance: 1,
					venuePhotos : 1
				}, 
				success: function(data) {
					app.dataIwant = data.response.venues;
					app.displayRomantic(app.dataIwant);
					console.log("Foursquare API Object:")
					console.log(data.response)
				}
			});
		};


		app.displayRomantic = function(dateRomantic) {
			$('#dateNightResults').empty();
			$.each(dateRomantic, function(item, venue){
				// var photoSize = '500x500';
				// var photoPrefix = venue.photos.groups[0].items[0];
				var $venueTitle = '<h2>' + venue.name + '</h2>';
				var $venueLocation = '<p>' + venue.location.address + '</p>';
				// var $venuePhotos = $('<img>').attr('src', photoPrefix.prefix + photoPrefix.photoSize + photoPrefix.suffix);
				var $venueContainer = $('<div>').addClass('dateContainer').append($venueTitle, $venueLocation);

				$('#dateNightResults').append($venueContainer);
			});

		}


		// var $venuePhotos = $('<img>').attr('src', item.venue.photos.groups[0].items[0].prefix + photoSize + item.venue.photos.groups[0].items[0].suffix);

		//OR

		//venue photo
				// var photoPrefix = places[i].venue.photos.groups[0].items[0];
				// var photo = $('<img>').attr('src',photoPrefix.prefix + photoPrefix.height + photoPrefix.suffix);



			// Using dateType need to get a random number and select a random element from date type
			// With random date we need to display part 1, part 2, part 3
			// With those displayed, we then need to allow user to click on an icon(part) and make a call to Foursquare api to get information
			// With this information we need to display it on the page

		app.events = function(){

			$('.vibes li').on('click', function() {
				
				$("#duck-icon").animate({height: "40px", width: "40px"});
				$("#page-title").hide(300);


				var getDates = $(this).text();
				

				if(getDates==='Romantic'){
					//display a random romanticDate
					app.displayDate(romanticDates);

				}
				if(getDates==='Fun'){
					//display a random classicDate
					app.displayDate(funDates);
				}
				if(getDates==='Sporty'){
					//display a random sportyDate
					app.displayDate(sportyDates);
				}
				if(getDates==='Chill'){
					//display a random chillDate
					app.displayDate(chillDates);
				}
				if(getDates==='Extreme'){
					//display a random extremeDate
					app.displayDate(extremeDates);
				}

				app.dateRandomizer(getDates);
			});

		};

		app.randomNumber = function(n) {
			return (Math.floor(Math.random() * n) );
		};

		app.dateRandomizer = function(datesArray) {
			var randomDateIndex = app.randomNumber(datesArray.length)
			var randomDate = datesArray[randomDateIndex];
			return randomDate;
		};


		app.displayDate = function(dateType){

			var myDate = app.dateRandomizer(dateType)
			

			var firstIdea = '<p>' + myDate.part1.title + '</p>';
			var firstImg = '<img src="' + myDate.part1.icon + '"/>';
			var firstDiv = '<div class="first dateIdeas" data-date="' + myDate.part1.query + '">' + firstImg + firstIdea  + '</div>';

			var secondIdea = '<p>' + myDate.part2.title + '</p>';
			var secondImg = '<img src="' + myDate.part2.icon + '"/>';
			var secondDiv = '<div class="second dateIdeas" data-date="' + myDate.part2.query + '">' + secondImg + secondIdea  + '</div>';

			var thirdIdea = '<p>' + myDate.part3.title + '</p>';
			var thirdImg = '<img src="' + myDate.part3.icon + '"/>';
			var thirdDiv = '<div class="third dateIdeas" data-date="' + myDate.part3.query + '">' + thirdImg+ thirdIdea  + '</div>';

			$('.dateOptions').empty();
			$('.dateOptions').append(firstDiv, secondDiv, thirdDiv);
			app.searchDates();
			
		}

		app.searchDates = function() {


			$('.dateOptions').on('click', '.dateIdeas', function() {
				$(".dateOptions").animate({height: "50%", width: "50%"});
				$("#weather").slideDown("slow");


				var idea = $(this).data('date');
				app.romantic(idea);
			});

		}




// DATE COMBOS!!! :) There are five categories of dates: Romantic, Sporty, Chill, Classic and Extreme. Each of those have objects in the (date options), and those date options each have 3 parts. 

// The date OPTIONS will be randomized. The date parts will remain the same. 

// Using ".on(click)" - on the li's (in the UL with a class of "vibes") - link them to these variables: 
// (SOO!! when you click on the sporty li, a random sporty date with 3 parts will appear)

var romanticDates = [
	{
		part1: {
			title: 'Ice Cream',
			icon: 'images/icecream.png',
			query: 'ice cream'
		},
		part2: {
			title: 'Go to the Park',
			icon: 'images/park.png',
			query: 'park'
		},
		part3: {
			title: 'Sight Seeing',
			icon: 'images/statueofliberty.png',
			query: 'landmark'
		}
	},
	{
		part1: {
			title: 'Coffee',
			icon: 'images/coffee.png',
			query: 'coffee shop'
		},
		part2: {
			title: 'Picnic',
			icon: 'images/picnic.png',
			query: 'park'
		},
		part3: {
			title: 'Museum',
			icon: 'images/museum.png',
			query: 'museum'
		}
	},
	{
		part1: {
			title: 'Strawberry Picking',
			icon: 'images/strawberry.png',
			query: 'strawberry picking'
		},	
		part2: {
			title: 'Dinner',
			icon: 'images/fancy.png',
			query: 'Dinner'
		},
		part3: {
			title: 'Camping',
			icon: 'images/campfire.png',
			query: 'camping'
		}
	}
]

var sportyDates = [
	{
		part1: {
			title: 'Play Tennis',
			icon: 'images/tennis.png',
			query: 'tennis'
		},
		part2: {
			title: 'Hike',
			icon: 'images/hike.png',
			query: 'hiking'
		},
		part3: {
			title: 'Sky Diving',
			icon: 'images/skydive.png',
			query: 'sky dive'
		}
	},
	{
		part1: {
			title: 'Biking',
			icon: 'images/bike.png', 
			query: 'bike path'
		},
		part2: {
			title: 'Ping Pong',
			icon: 'images/pingpong.png',
			query: 'ping pong'
		},
		part3: {
			title: 'Beers',
			icon: 'images/beer.png',
			query: 'pub',
		}
	},
	{
		part1: {
			title: 'Rock Climbing',
			icon: 'images/climbing.png',
			query: 'rock climbing'
		},
		part2: {
			title: 'Baseball Game',
			icon: 'images/baseball.png',
			query: 'baseball'
		},
		part3: {
			title: 'Paintball',
			icon: 'images/paintball.png',
			query: 'paintball'
		}
	},
	{
		part1: {
			title: 'Go Karting',
			icon: 'images/raceflag.png',
			query: 'go-karts'
		},
		part2: {
			title: 'Volleyball',
			icon: 'images/volleyball.png',
			query: 'volleyball'
		},
		part3: {
			title: 'Golf',
			icon: 'images/golf.png',
			query: 'golf'
		}
	}
]

var chillDates = [
	{
		part1: {
			title: 'Visit a Record Store',
			icon: 'images/vinyl.png',
			query: 'record store'
		},
		part2: {
			title: 'Art Gallery',
			icon: 'images/art.png',
			query: 'art gallery'
		},
		part3: {
			title: 'Drinks',
			icon: 'images/cocktail.png',
			query: 'drinks'
		}
	},
	{
		part1: {
			title: 'Visit a Museum',
			icon: 'images/museum.png',
			query: 'museum'
		},
		part2: {
			title: 'Movies',
			icon: 'images/popcorn.png',
			query: 'movie cinema'
		},
		part3: {
			title: 'Fishing',
			icon: 'images/fishing.png',
			query: 'lake'
		}
	},
	{
		part1: {
			title: 'Grab Coffee',
			icon: 'images/coffee.png',
			query: 'coffee'
		},
		part2: {
			title: 'Picnic',
			icon: 'images/picnic.png',
			query: 'park'
		},
		part3: {
			title: 'Mini Golf',
			icon: 'images/minigolf.png',
			query: 'golf'
		}
	}
]

var funDates = [
	{
		part1: {
			title: 'Icecream',
			icon: 'images/icecream.png',
			query: 'icecream'
		},
		part2: {
			title: 'Zoo',
			icon: 'images/peacock.png', 
			query: 'zoo'
		},
		part3: {
			title: 'Evening Drinks',
			icon: 'images/beer.png',
			query: 'drinks'
		}
	},
	{
		part1: {
			title: 'Trivia',
			icon: 'images/trivia.png',
			query: 'trivia'
		},
		part2: {
			title: 'Aquarium',
			icon: 'images/fish.png',
			query: 'aquarium'
		},
		part3: {
			title: 'Rooftop Bars',
			icon: 'images/cocktail.png',
			query: 'rooftop bar'
		}
	},
	{
		part1: {
			title: 'Bowling',
			icon: 'images/bowling.png',
			query: 'bowling'
		},
		part2: {
			title: 'Tour a Brewery',
			icon: 'images/beer.png',
			query: 'brewery'
		},
		part3: {
			title: 'Grab Dessert',
			icon: 'images/cupcake.png',
			query: 'dessert'
		}
	},
	{
		part1: {
			title: 'Fly a Kite',
			icon: 'images/kite.png',
			query: 'park'
		},
		part2: {
			title: 'Movies',
			icon: 'images/popcorn.png',
			query: 'movie cinema'
		},
		part3: {
			title: 'Bar Crawl',
			icon: 'images/beer.png',
			query: 'bars'
		}
	}

]

var extremeDates = [
	{
		part1: {
			title: 'Sky Dive',
			icon: 'images/skydive.png',
			query: 'sky dive'
		},
		part2: {	
			title: 'Go Karting',
			icon: 'images/raceflag.png',
			query: 'go-karts'
		},
		part3: {
			title: 'Water Sking',
			icon: 'images/waterski.png',
			query: 'lake'
		}
	},
	{
		part1: {
			title: 'Roller Coasters',
			icon: 'images/rollercoaster.png',
			query: 'amusement park'
		},
		part2: {
			title: 'Concert',
			icon: 'images/concert.png',
			query: 'concert venue'
		},
		part3: {
			title: 'Zip Lining',
			icon: 'images/zipline.png',
			query: 'zip line'
		}
	},
	{
		part1: {
			title: 'Bungee Jumping',
			icon: 'images/bungeejumping.png',
			query: 'bungee jump'
		},
		part2: {
			title: 'Jet Ski',
			icon: 'images/jeyski.png',
			query: 'lake'
		},
		part3: {
			title: 'Rock Climb',
			icon: 'climbing.png',
			query: 'rock climb'
		}
	}
]


app.init = function() {
	app.events();
	
};

$(function() {
	app.init()
});

