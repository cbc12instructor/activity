// PAGE templates and useful vars
const titles = {
	'activity': 'My Activity Tracker',
	'weight': 'Weight Log',
	'food': 'My Meal Diary'
};

function attachEvents(pageName) {
	if ( pageName == 'activity' ) {
		document.getElementById('track_exercise').addEventListener('click', function(ev) {
			var activity = document.getElementById('add_activity').value;
			console.log(activity);
		});
	} else if ( pageName == 'weight' ) {

	} else if ( pageName == 'food' ) {

	}
}

function loadDefaultPage() {
	loadTemplate('activity');
}

function loadTemplate(pageName) {
	// pageName = activity/weight/food
	console.log(pageName);

	// change the page title if we are on a new template
	document.title = titles[ pageName ];

	// build a correct url to our templates folder 
	var url = `/templates/${pageName}.html`;

	// make XHR request to load template
	let xhr = new XMLHttpRequest();
	xhr.onload = function() {
		document.getElementById('app').innerHTML = xhr.responseText;

		console.log(pageName);
		attachEvents(pageName);
	};
	xhr.open('GET', url);
	xhr.send();
}


// event listeners
document.addEventListener('DOMContentLoaded', function() {

	loadDefaultPage();

	document.getElementById('mainMenu').addEventListener('click', function(ev) {
		if ( ev.target.getAttribute('href') ) {
			var pageToLoad = ev.target.getAttribute('href');
			loadTemplate(pageToLoad.slice(1));
		}
	});

});