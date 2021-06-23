// PAGE templates and useful vars
const titles = {
	'activity': 'My Activity Tracker',
	'weight': 'Weight Log',
	'food': 'My Meal Diary',
	'biking': 'My Biking Log'
};

let activityTracker = null;

/* create activity tracker object */
class Tracker {
	constructor(type) {
		console.log('Creating tracker object of ' + type);
		this.type = type;

		this.data = {
			'run': 'I ran',
			'walk': 'I walked',
		};

		localStorage.setItem()

		// grab a reference to our data element
		this._dataEl = document.getElementById('tracker_data');

		this._dataEl.innerHTML = '';

		// pull the current info
		this.loadData();

		// update the page with our current content
		this.updatePage();
	}

	// get the current values
	loadData() {
		// load the current tracker type data from localStorage
		let currentData = localStorage.getItem( this.type );

		// parse it into an object if it exists
		if ( currentData ) {
			this.data = JSON.parse(currentData);
		} else {
			this.data = {};
		}
	}

	// store a new value
	// TODO - perhaps addRecord is an eventhandler
	addRecord(activity) {
		
		// what does our activity variable look like?
		// 'time' = 'activity'

		this.data[ new Date().toString() ] = activity;

		this.updateRecords();
		this.updatePage();
	}

	// function to write all the data values to localStorage
	updateRecords() {
		localStorage.setItem( this.type, JSON.stringify(this.data) );
	}


	// update the page
	// read all the elements in this.data, 
	// create the list items
	updatePage() {
		var htmlString = '';

		for ( var key in this.data ) {
			htmlString = htmlString + '<li>' + this.data[key] + '</li>';
		}

		this._dataEl.innerHTML = htmlString;
	}
}

// localStorage for our current info
// display our current info on the tab we're on
// add functionality when we add new content
// - store the record
// - also add it to the page




/* load content functions */
function attachEvents(pageName) {
	
	document.getElementById('track_data').addEventListener('click', function(ev) {
		var activity = document.getElementById('add_data').value;
		console.log(activity);
		activityTracker.addRecord(activity);
		document.getElementById('add_data').value = '';
		document.getElementById('add_data').focus();
	});
	
}

function loadDefaultPage() {
	console.log('loading our app at...' + window.location.hash);
	var page = window.location.hash ? window.location.hash.slice(1) : 'activity';
	loadTemplate(page);
}

function loadTemplate(pageName) {
	// pageName = activity/weight/food
	//console.log(pageName);

	// change the page title if we are on a new template
	if ( titles[ pageName ] ) {
		document.title = titles[ pageName ];
	} else {
		console.warn('Page name is not defined in a title');
		document.title = 'FitWizard';
	}
	


	// build a correct url to our templates folder 
	var url = `/templates/${pageName}.html`;

	// make XHR request to load template
	let xhr = new XMLHttpRequest();
	xhr.onload = function() {
		document.getElementById('app').innerHTML = xhr.responseText;

		activityTracker = new Tracker(pageName);

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