// ==UserScript==
// @name        IMDB Template Generator
// @version     1.0.0
// @description Generates a BBCode/HTML template for a specific IMDB release
// @author      JaxEllis
// @icon        https://i.imgur.com/rcSipDw.png
// @homepage    https://github.com/jaxellis/Imdb_Template_Generator
// @supportURL  https://github.com/jaxellis/Imdb_Template_Generator/issues/
// @updateURL   https://github.com/jaxellis/Imdb_Template_Generator/raw/master/script.user.js
// @downloadURL https://github.com/jaxellis/Imdb_Template_Generator/raw/master/script.user.js
// @include     /^https:\/\/www\.imdb\.com\/title\/*
// @require     https://code.jquery.com/jquery-3.5.1.min.js
// @require     https://code.jquery.com/ui/1.12.1/jquery-ui.js
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// @grant       GM_setClipboard
// @grant       GM.setValue
// @grant       GM.getValue
// @run-at      document-end
// ==/UserScript==

main();

const buttonTemplate = `<div id="omdb-Generator-Container">
<br /><button class="omdb-button ipc-button" id="Generate" type="button"><span>⚙</span> Generate Template</button>
</div>`;

const omdbinput = `<br />
<div id="omdb-Generator-Container">
<h3>Enter Your <a href="https://www.omdbapi.com/">OMDB API Key</a>, Then Click On Save</h3>
<form id="Omdb-Generator">
<label for="fname">Omdb Key</label>
<br />
<input type="text" class="omdb-input" id="omdb-Key" placeholder="Your Omdb API Key..">
<br />
<button class="omdb-button ipc-button" id="Save-Key" type="button"><span>💾</span> Save Key</button>
<button class="omdb-button ipc-button" id="Clear-Btn" type="reset" value="Reset"><span>⌫</span> Clear</button>
</form>
</div>
`;

var errPopup = `
<div class="alert alert-error">
<span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
errorMessages
</div>
`;

var successPopup = `
<div class="alert alert-success">
<span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
successMessages
</div>
`;

function main() {
	GM.getValue('APIKEY', 'foo').then((value) => {
		var APIVALUE = value;
		const htmlpush = document.getElementsByClassName('plot_summary ')[0];
		htmlpush.innerHTML += APIVALUE !== 'foo' ? buttonTemplate : omdbinput;
		$('#Save-Key').click(() => saveApiKey(APIVALUE, htmlpush));
		$('#Generate').click(() => generateTemplate(APIVALUE));
	});
}

// Popup for Errors
function popupErr(errors) {
	let errOutput = errPopup.replace('errorMessages', errors);
	let container = document.getElementById('omdb-Generator-Container');
	container.insertAdjacentHTML('beforeend', errOutput);
}

// Popup for Good
function popupSuccess(success) {
	let successOutput = successPopup.replace('successMessages', success);
	let container = document.getElementById('omdb-Generator-Container');
	container.insertAdjacentHTML('beforeend', successOutput);
}

function saveApiKey(APIVALUE, htmlpush) {
	if (APIVALUE == 'foo') {
		let omdbKey = $('#omdb-Key').val();
		GM_xmlhttpRequest({
			method: 'GET',
			url: `http://www.omdbapi.com/?apikey=${omdbKey}&i=tt0848228&r=json`,
			onload: function (response) {
				let json = JSON.parse(response.responseText);
				let errors = `Uhoh! Please check that... <br /><br />`;
				if (!json.Title) {
					if (json.Error.includes('No API key provided')) {
						errors += `<li> 1. You Entered An API Key!</li><br /><br />`;
					} else if (json.Error.includes('Invalid API key')) {
						errors += `<li> 1. You Activated Your API Key!</li>
                                   <li> 2. You Entered The Correct Key!</li><br /><br />`;
					} else {
						errors += `<li> 1. OMDB Is Up And Running!</li><br /><br />`;
					}
					if (json.Error) {
						errors = errors + 'Error Message: ' + json.Error;
					}
					popupErr(errors);
				} else {
					if (omdbKey) {
						GM.setValue('APIKEY', omdbKey);
						document.getElementById('omdb-Generator-Container').remove();
						main();
					}
				}
			},
		});
	}
}

function generateTemplate(APIVALUE) {
	let tabURL = window.location.href;
	var IID = tabURL.match(/tt\d+/)[0];
	GM_xmlhttpRequest({
		method: 'GET',
		url: `http://www.omdbapi.com/?apikey=${APIVALUE}&i=${IID}&plot=full&y&r=json`,
		onload: function (response) {
			let json = JSON.parse(response.responseText);
			let poster =
				json.Poster && json.Poster !== 'N/A'
					? '[center][img]' + json.Poster + '[/img]\n'
					: '';
			if (json.Title && json.Title !== 'N/A') {
				var title = '[color=#fac51c][b][size=25]' + json.Title;
			}
			let year =
				json.Year && json.Year !== 'N/A'
					? json.Year + ')[/size][/b][/color]\n'
					: '';
			let imdbId =
				json.imdbID && json.imdbID !== 'N/A'
					? '[url=https://www.imdb.com/title/' +
					  json.imdbID +
					  '][img]https://i.imgur.com/rcSipDw.png[/img][/url]'
					: '';
			let rating =
				json.imdbRating && json.imdbRating !== 'N/A'
					? '[size=20][b]' + json.imdbRating + '[/b]/10[/size]\n'
					: '';
			let imdbVotes =
				json.imdbVotes && json.imdbVotes !== 'N/A'
					? '[size=20][img]https://i.imgur.com/sEpKj3O.png[/img]' +
					  json.imdbVotes +
					  '[/size][/center]\n'
					: '';
			let plot =
				json.Plot && json.Plot !== 'N/A'
					? '[size=25][color=#fac51c][b]Plot[/b][/color][/size]\n\n ' +
					  json.Plot
					: '';
			let rated =
				json.Rated && json.Rated !== 'N/A'
					? '[B]Rating: [/B]' + json.Rated + '\n'
					: '';
			let genre =
				json.Genre && json.Genre !== 'N/A'
					? '[*][B]Genre: [/B] ' + json.Genre + '\n'
					: '';
			let director =
				json.Director && json.Director !== 'N/A'
					? '[*][B]Directed By: [/B] ' + json.Director + '\n'
					: '';
			let writer =
				json.Writer && json.Writer !== 'N/A'
					? '[*][B]Written By: [/B] ' + json.Writer + '\n'
					: '';
			let actors =
				json.Actors && json.Actors !== 'N/A'
					? '[*][B]Starring: [/B] ' + json.Actors + '\n'
					: '';
			let released =
				json.Released && json.Released !== 'N/A'
					? '[*][B]Release Date: [/B] ' + json.Released + '\n'
					: '';
			let runtime =
				json.Runtime && json.Runtime !== 'N/A'
					? '[*][B]Runtime: [/B] ' + json.Runtime + '\n'
					: '';
			let production =
				json.Production && json.Production !== 'N/A'
					? '[*][B]Production: [/B] ' + json.Production + '\n'
					: '';
			let template = `${poster}${title} (${year}${imdbId} ${rating}${imdbVotes}${plot}\n
[size=25][color=#fac51c][b]Movie Info[/b][/color][/size]
[LIST][*]${rated}${genre}${director}${writer}${actors}${released}${runtime}${production}[/LIST]`;
			GM_setClipboard(template);
			popupSuccess('Template has been copied to your Clipboard!');
		},
	});
}

GM_addStyle(
	'                                    \
.omdb-button {                           \
	background-color: #0e63be !important;\
	color: white !important;             \
	justify-content: left;               \
	padding: 14px 20px;                  \
	margin: 8px 0;                       \
	border: none;                        \
	border-radius: 4px;                  \
	cursor: pointer;                     \
}                                        \
.omdb-button:hover {                     \
	background-color: #0e75e3;           \
}                                        \
.omdb-input {                            \
	width: 50%;                          \
	padding: 12px 20px;                  \
	margin: 8px 0;                       \
	display: inline-block;               \
	border: 1px solid #ccc;              \
	border-radius: 4px;                  \
	box-sizing: border-box;              \
}                                        \
div#omdb-Generator-Container {           \
	border-radius: 5px;                  \
	background-color: #f2f2f2;           \
	padding: 20px;                       \
}                                        \
.alert {                                 \
    position: relative;                  \
    padding: .75rem 1.25rem;             \
    margin-bottom: 1rem;                 \
    border: 1px solid transparent;       \
    border-radius: .25rem;               \
    z-index:   777;                      \
}                                        \
.alert-error {                           \
	color: #721c24;                      \
    background-color: #f8d7da;           \
    border-color: #f5c6cb;               \
}                                        \
.alert-success {                         \
	color: #3c763d;                      \
    background-color: #dff0d8;           \
    border-color: #d6e9c6;               \
}                                        \
.closebtn {                              \
    margin-left: 15px;                   \
    color: black;                        \
    font-weight: bold;                   \
    float: right;                        \
    font-size: 22px;                     \
    line-height: 20px;                   \
    cursor: pointer;                     \
    transition: 0.3s;                    \
}                                        \
.closebtn:hover {                        \
    color: white;                        \
}                                        \
'
);
