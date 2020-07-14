# Imdb Template Generator
Generates a BBCode Template based on information grabbed from IMDB through the OMDB API

## Developer Notes:
Please note that not all Forums use the same BBCode's as others so be sure to change Sizes to your liking. I used [This Site](https://infinite-story.com/tools/bbcode.php) to test the BBCode used in this.

## Requirements:
A Userscript manager + installing the script
<a href="https://raw.githubusercontent.com/Bilibox/Snahp-Template-Generators/Omdb/script.user.js">Click to install script </a>
<small>(A Userscript engine, like [Violentmonkey](https://violentmonkey.github.io/get-it/) or [Tampermonkey](https://www.tampermonkey.net/))</small>

Grab your Free OMDB API key here: [omdbapi.com](https://www.omdbapi.com/apikey.aspx?__EVENTTARGET=freeAcct&__EVENTARGUMENT=&__LASTFOCUS=&__VIEWSTATE=%2FwEPDwUKLTIwNDY4MTIzNQ9kFgYCAQ9kFgICBw8WAh4HVmlzaWJsZWhkAgIPFgIfAGhkAgMPFgIfAGhkGAEFHl9fQ29udHJvbHNSZXF1aXJlUG9zdEJhY2tLZXlfXxYDBQtwYXRyZW9uQWNjdAUIZnJlZUFjY3QFCGZyZWVBY2N0x0euvR%2FzVv1jLU3mGetH4R3kWtYKWACCaYcfoP1IY8g%3D&__VIEWSTATEGENERATOR=5E550F58&__EVENTVALIDATION=%2FwEdAAU5GG7XylwYou%2BzznFv7FbZmSzhXfnlWWVdWIamVouVTzfZJuQDpLVS6HZFWq5fYpioiDjxFjSdCQfbG0SWduXFd8BcWGH1ot0k0SO7CfuulN6vYN8IikxxqwtGWTciOwQ4e4xie4N992dlfbpyqd1D&at=freeAcct&Email=) and be sure to activate the key via the email sent to you.

# How To Use

### 1.
*Userscript*: First you'll want to navigate to a Movie/Show on the IMDB site. The interface will show up below the Plot, at this point you should input your OMDB API key and click the "Save Key" button. You will only have to do this once. <br />
Ex: `https://www.imdb.com/title/tt8503618/`

*Python*: First enter your Activated Omdb Api Key, Then enter the Imdb link or TT Id you wish to make a template for.<br />
Ex: `https://www.imdb.com/title/tt8503618/` or `tt8503618`

### 2.
*Userscript*: A button will now appear that says "Generate Template". Once this button is pressed it will gather the necessary information and convert it to the BBCode Template. You will receive a Success message below and the BBCode will be in your Clipboard. Paste it where you want!

*Python*: Press "Generate Template" and the BBCode will be shown below. Copy it's entirety and paste where you want!



## Screenshots

![](https://i.imgur.com/Vvle3jN.png)
<br />
*Userscript .js*

![](https://i.imgur.com/hk6ZXRn.png)
<br />
*Python .pyw*
