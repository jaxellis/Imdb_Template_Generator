import requests
import tkinter as tk
import re
import json
from tkinter import scrolledtext


class templateGen():
    def __init__(self):
        self.masterWindow = tk.Tk()
        self.masterWindow.title("Imdb BBCode Template Generator By Jaxellis")

    def startGUI(self):
        # GUI
        buttonsFrame = tk.Frame(self.masterWindow)

        buttonsFrame.grid(row=0, column=0, sticky=tk.W+tk.E)

        keyInputLabel = tk.Label(buttonsFrame, text="Omdb Api Key")
        keyInputLabel.grid(row=0, column=0, padx=10, pady=10)

        self.keyInput = tk.Entry(buttonsFrame, borderwidth=2)
        self.keyInput.grid(row=0, column=1, padx=10, pady=10)
        self.keyInput.focus_set()

        imdbLabel = tk.Label(buttonsFrame, text="Imdb Link/ID")
        imdbLabel.grid(row=1, column=0, padx=10, pady=10)

        self.imdbInput = tk.Entry(buttonsFrame, borderwidth=2)
        self.imdbInput.grid(row=1, column=1, padx=10, pady=10)

        genButton = tk.Button(
            buttonsFrame, text='Generate Template', command=self.runScript)
        genButton.grid(row=1, column=2, padx=10, pady=10)

        group1 = tk.LabelFrame(
            self.masterWindow, text="BBCode Output", padx=5, pady=5)
        group1.grid(row=1, column=0, columnspan=3,
                    padx=5, pady=5, sticky=tk.E+tk.W+tk.N+tk.S)

        self.masterWindow.columnconfigure(0, weight=1)
        self.masterWindow.rowconfigure(1, weight=1)

        group1.rowconfigure(0, weight=1)
        group1.columnconfigure(0, weight=1)

        self.bbcodeTxtBox = scrolledtext.ScrolledText(
            group1, width=20, height=5)
        self.bbcodeTxtBox.grid(row=0, column=0, sticky=tk.E+tk.W+tk.N+tk.S)

        self.masterWindow.geometry("500x500")
        self.masterWindow.mainloop()

    # Main Run
    def runScript(self):
        try:
            jsResp = self.grabJson()
            self.generateBBCode(jsResp)
        except Exception as e:
            self.bbcodeTxtBox.insert(
                tk.INSERT, "Be Sure To Fill In The Boxes Above!\n")
            self.bbcodeTxtBox.insert(tk.INSERT, "\n\n\n\n Script Error:\n")
            self.bbcodeTxtBox.insert(tk.INSERT, e)

    def grabJson(self):
        omdbKey = self.keyInput.get()
        IID = self.imdbInput.get()

        if 'imdb' in IID or '/' in IID:
            IID = re.findall(r'tt\d+', IID)[0]

        url = ('http://www.omdbapi.com/?apikey=' + omdbKey + '&i=' + IID +
               '&r=json')
        jsResp = json.loads(requests.get(url=url).content)
        return jsResp

    def generateBBCode(self, jsResp):
        self.bbcodeTxtBox.delete(1.0, 'end')
        poster = ('[center][img]' + jsResp['Poster'] + '[/img]\n' if '' !=
                  jsResp['Poster'] and 'N/A' not in jsResp else '')

        title = ('[color=#fac51c][b][size=25]' + jsResp['Title'] if '' !=
                 jsResp['Title'] and 'N/A' not in jsResp['Title'] else '')

        year = (jsResp['Year'] + ')[/size][/b][/color]\n' if '' !=
                jsResp['Year'] and 'N/A' not in jsResp['Year'] else '')

        imdbId = ('[url=https://www.imdb.com/title/' + jsResp['imdbID'] +
                  '][img]https://i.imgur.com/rcSipDw.png[/img][/url]' if '' !=
                  jsResp['imdbID'] and 'N/A' not in jsResp['imdbID'] else '')

        rating = ('[size=20][b]' + jsResp['imdbRating'] + '[/b]/10[/size]\n'
                  if '' != jsResp['imdbRating'] and 'N/A' not in
                  jsResp['imdbRating'] else '')

        imdbVotes = ('[size=20][img]https://i.imgur.com/sEpKj3O.png[/img]' +
                     jsResp['imdbVotes'] + '[/size][/center]\n' if '' !=
                     jsResp['imdbVotes'] and 'N/A' not in jsResp['imdbVotes']
                     else '')

        plot = ('[size=25][color=#fac51c][b]Plot[/b][/color][/size]\n\n ' +
                jsResp['Plot'] if '' !=
                jsResp['Plot'] and 'N/A' not in jsResp['Plot'] else '')

        rated = ('[B]Rating: [/B]' + jsResp['Rated'] + '\n' if '' !=
                 jsResp['Rated'] and 'N/A' not in jsResp['Rated'] else '')

        genre = ('[*][B]Genre: [/B] ' + jsResp['Genre'] + '\n' if '' !=
                 jsResp['Genre'] and 'N/A' not in jsResp['Genre'] else '')

        director = ('[*][B]Directed By: [/B] ' + jsResp['Director'] + '\n'
                    if '' != jsResp['Director'] and 'N/A' not in
                    jsResp['Director'] else '')

        writer = ('[*][B]Written By: [/B] ' + jsResp['Writer'] + '\n' if '' !=
                  jsResp['Writer'] and 'N/A' not in jsResp['Writer'] else '')

        actors = ('[*][B]Starring: [/B] ' + jsResp['Actors'] + '\n' if '' !=
                  jsResp['Actors'] and 'N/A' not in jsResp['Actors'] else '')

        released = ('[*][B]Release Date: [/B] ' + jsResp['Released'] + '\n'
                    if '' != jsResp['Released'] and 'N/A' not in
                    jsResp['Released'] else '')

        runtime = ('[*][B]Runtime: [/B] ' + jsResp['Runtime'] + '\n' if '' !=
                   jsResp['Runtime'] and 'N/A' not in jsResp['Runtime']
                   else '')

        production = ('[*][B]Production: [/B] ' + jsResp['Production'] + '\n'
                      if '' != jsResp['Production'] and 'N/A' not in
                      jsResp['Production'] else '')

        template = (poster + title + ' (' + year + imdbId + ' ' + rating +
                    imdbVotes + plot + '\n' + '[size=25][color=#fac51c][b]' +
                    'Movie Info[/b][/color][/size]\n' + '[LIST][*]' + rated +
                    genre + director + writer + actors + released + runtime +
                    production + '[/LIST]')

        self.bbcodeTxtBox.insert(tk.INSERT, template)


templateGen().startGUI()
