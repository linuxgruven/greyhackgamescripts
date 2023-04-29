# greyhackgamescripts
Scripts I made or Updated for the game "GreyHack"

Fantom is my abomination of a script for a game called "Grey Hack". I do not care what happens with Fantom anymore.
//FantomNew.src is the one you'll want

Special thanks to the user 'saschahi' for fixing Fantom while I was away
https://github.com/saschahi/greyhackgamescripts



Do feel free to open an issue if something breaks or you want to suggest something.


**Installing Fantom**
```
	1) Goto https://github.com/tball1/greyhackgamescripts
	2) Download either with git or download as zip
	3) if you downloaded it as a zip be sure you extract it and open the folder otherwise just open the folder
	4) open FantomModular/fantom.src and visit line 737
	4) replace all of the occurrences of "potato" to your ingame username
	5) in game make a directory called "commands" in your users home folder
	6) in FantomModular/commands open each file and copy/paste into in-game codeeditor and save under the same file name with a .src extension in the ingame commands directory
	7) assuming everything setup properly copy the code from FantomModular/fantom.gs into code editor and build it into an executable
```

**Setting up Fantom's brute command**
```
	Making this easier
```


        //Biggest Changes:

                //Fantom setup - Setting up Fantom has changed and so I created a installer program for the less knowledgable.
                    //Simply build the program from source and it'll setup the directories for you and give you instructions

                //Modularity - Fantom is no longer one massive .src file and is instead split up into a couple different files
                    //Dont want a part of Fantom? delete a import_code line (no promises on stability though)
                    //This also means people can add their own commands into Fantom easier
                    //Feel free to release your add-ons/modifications. with your permission & credits ofcourse i'll add it into Fantom maybe
                    

                //Session manager - Fantom no longer trashes obtained objects after used and now saves them for that terminal only
                                //Currently not possible to save forever due to a incomplete exploit db system
                                //Going back into a session will give you a object shell for that object type
                                //When initially hacking into a system all objects will be saved into the session manager and you'll be prompted to pick what one you want


                //more shells! - Fantom now has shells for all objects! it used to automate these
                    //File shell - For interacting with File objects
                    //Computer shell - For interacting with Computer objects
                    //Shell - For interacting with Shell objects

                //Status icons - Fantom now displays useful information at every shell.
                    //Before typing anything you'll see a [P] where you type
                        //The color of it indicates if the /etc/passwd file is usable
                        //green = readable
                        //red = unreadable
                        //orange = deleted

                //Fantom will have its own Discord guild - So I can flood with update logs as fast as I want lol

        //Smaller changes:
            //theme adjustment - Fantom has had some slight theme changes
            //fancy ps command - Now in color!
            //re-done the commands list for every shell

            //reworked brute command - Fantom can use your provided passwords during Fantom setup to bruteforce passwords
                //brute will get another rework adding its old features back
                //as of now its just a local machine password bruteforcer




