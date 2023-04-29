FantomSharedCommands = {}

FantomSharedCommands.streamer = {}
FantomSharedCommands.streamer.func = function(args=null)
    if globals.streamerMode then
        globals.streamerMode = false
        FantomNotify("Streamer mode has been disabled. be careful!")
    else
        globals.streamerMode = true
        FantomNotify("Streamer mode has been enabled.")
        FantomNotify("Streamer mode hides sensitive information",true)
    end if
end function

FantomSharedCommands.credits = {}
FantomSharedCommands.credits.func = function(shell,args=null)
    FantomNotify("Up until April 22 2023 all of Fantom Rewritten was written by potato not including forks",true)
    FantomNotify("<color=green>AwETux</color> - Rewrote processlogger command to help fix it",false)
    FantomNotify("<color=green>AwETux</color> - Status icon idea",false)
    print("")
    FantomNotify("<color=green>gk258/TheGateKeeper</color> - Teaching me stuff & helping with finder command",false)
    print("")
    print("<color=yellow>And most importantly..</color>")
    FantomNotify("A very special thank you to saschahi for updating Fantom while I was away", false)
    FantomNotify("Thank you for choosing Fantom.",false)
end function


FantomSharedCommands.logcorrupt = {}
FantomSharedCommands.logcorrupt.func = function(shell,args=null)
    guest = get_shell.host_computer.File("/home/guest")
    if guest then

        dummyFile = get_shell.host_computer.touch("/home/guest","system2.log.src")
        
        if typeof(dummyFile) == "string" then
            FantomNotify("Failed with reason: "+dummyFile,true)
            return
        end if
        dummyFileObj = get_shell.host_computer.File("/home/guest/system2.log.src")
        dummyFileObj.set_content("//eggs")

        
        err = get_shell.build("/home/guest/system2.log.src","/var")
        logFile = get_shell.host_computer.File("/var/system2.log")
        

        if err.len == 0 then
            dummyFileObj.delete
            logFile.move("/var","system.log")
            FantomNotify("Success.")
        else
            FantomNotify("Failure with reason: "+err,true)
        end if
    else
        FantomNotify("No /home/guest",true)
    end if
end function

FantomSharedCommands.sessions = {}
FantomSharedCommands.sessions.func = function(shell,args=null)
    if globals.sessions.len == 0 then
        FantomNotify("Nothing in sessions manager.",true)
        return
    end if
    FantomNotify("Fantom's user detection is certainly not great and can give false detections.",true)
    i = 0
    for session in globals.sessions
        ln = i + 1
        accesslevel = userDetect(session)
        if typeof(session) == "shell" then

            print("<color=green>"+ln+".</color> <color=#3f3e40>"+typeof(session)+"@"+session.host_computer.local_ip+" "+session.host_computer.public_ip+"</color>")
            print("<color=#3f3e40>Detected access: "+accesslevel+"</color>\n")

        end if

        if typeof(session) == "computer" then

            print("<color=green>"+ln+".</color> <color=#3f3e40>"+typeof(session)+"@"+session.local_ip+" "+session.public_ip+"</color>")
            print("<color=#3f3e40>Detected access: "+accesslevel+"</color>\n")
        end if

        if typeof(session) == "file" then
            print("<color=green>"+ln+".</color> <color=#3f3e40>"+typeof(session)+"@unknown</color>")
            print("<color=#3f3e40>Detected access: "+accesslevel+"</color>\n")
        end if

        if typeof(session) == "number" then
            print("<color=green>"+ln+".</color> <color=#3f3e40>firewall/password@unknown</color>\n")
        end if

        i=i+1
    end for
    pick = user_input(":")
    num = pick.to_int
    if globals.sessions.hasIndex(num-1) then
        if typeof(globals.sessions[num-1]) == "number" then
            FantomNotify("Rerun the command with a extra argument.",true)
            return
        end if
        FantomObjectShell.init(shell,globals.sessions[num-1])
        FantomObjectShell.Detect
    end if
end function

FantomSharedCommands["brute"] = {}
FantomSharedCommands["brute"].func = function(shell,args=null)
    if args == null then
        FantomNotify("Assuming root user.",true)
    else
        FantomNotify("Bruteforcing "+args[0]+".",true)
    end if
    found = 0

    if globals.passwords.len == 0 then
        FantomNotify("No password list files given during build.",true)
        return
    end if

    for password in globals.passwords

        split = password.split(":")
        if args != null then
            shell = get_shell(args[0],split[0])
        else
            shell = get_shell("root",split[0])
        end if

        if typeof(shell) == "shell" then
            FantomNotify("Password was: "+split[0])
            found = 1

            print("Would you like to escalate to this user? y/n")
            option = user_input(":")

            if option.lower == "y" then shell.start_terminal

            break
        end if
    
    end for

    if found == 0 then
        FantomNotify("Password not in database.",true)
    end if

end function

FantomSharedCommands.passcheck = {}
FantomSharedCommands.passcheck.func = function(shell,args=null)
    if args == null then
        FantomNotify("Please specify a password.",true)
        return
    end if
    found = 0
    for password in globals.passwords
        split = password.split(":")
        if split[0] == args[0] then
            FantomNotify("This password is in the database.",false)
            found = 1
            break
        end if
    end for
    if not found then
        FantomNotify("This password isn't in the database. add it!",true)
    end if
end function


FantomSharedCommands.help = {}
FantomSharedCommands.help.func = function(shell,args=null)

    print("\n<color=green>Welcome! this goes over how Fantom works</color>\n")

    print("<color=green>Types of shells</color>\n")
    print("    Fantom seperates its hacking commands an system commands into different shells.")
    print("    While a 'system shell' is active commands executed will run on YOUR machine")
    print("    You can get into an 'attacker' shell by typing in a ip or domain at any point.\n")


    print("<color=green>Types of shells 2</color>\n")
    print("    Some shells can only be accessed through Fantoms hacking system when a object is obtained")
    print("    File shell, Computer shell, Shell shell")

    print("<color=green>System shell</color>\n")
    print("    The 'system shell' will contain commands that assist you such as 'secure' but not really hacking related.\n")

    print("<color=green>Attacker shell</color>\n")
    print("    The 'attacker shell' will assist you in hacking your targets.\n")

    print("<color=green>Global commands</color>\n")
    print("    Global commands are commands that can be executed from any shell.")
    print("    These are commands like clear, decipher, things you would want everywhere.\n")

    print("<color=green>Status Icons</color>\n")
    print("    Status Icons are a quick way of viewing certain things.")
    print("    See the '[P]' down where you type? it's color tells you if /etc/passwd is readable\n")
    print("    green = /etc/passwd is readable")
    print("    red = /etc/passwd isn't readable")
    print("    orange = /etc/passwd was deleted")


//will return when i feel like working on it
//    print("<color=green>AMC (Automatic Mission Completion)</color>\n")
//    print("AMC is a special shell for Fantom's automatic mission completion system.")
//    print("AMC can automatically do certain missions without user interference")
//    print("Where AMC cannot automate you will be prompted with instructions.")
//    print("AMC is NOT bug-free and is not finished. use rentals and expect bugs/crashes")


end function




FantomSharedCommands.updatemx = {}
FantomSharedCommands.updatemx.func = function(shell,args=null)
    apt.update()
    apt.install("metaxploit.so")
end function



FantomSharedCommands.ps = {}
FantomSharedCommands.ps.func = function(shell,args=null)
    print("\n")
    output = get_shell.host_computer.show_procs
    fancyoutput = ""

    split = output.split(char(10))
    for line in split
        if line == split[0] then
            fancyoutput = "<color=green>"+line+"</color>\n"
        else
            fancyoutput = fancyoutput + "<color=#3f3e40>"+line+"</color>\n"
        end if
    end for

    print(format_columns(fancyoutput))
end function


FantomSharedCommands.wifihack = {}
FantomSharedCommands.wifihack.func = function(shell,args=null)
    if args == null then
        FantomNotify("Please type the name of the WIFI network.",true)
        return
    end if

    cdir = get_shell.host_computer.File(current_path)
    if not cdir.has_permission("w") then
        FantomNotify("No write permission in current directory.",true)
        return
    end if

    if not cdir.has_permission("r") then
        FantomNotify("No read permission in current directory.",true)
        return
    end if


    crypto.airmon("start","wlan0")

    wifis = get_shell.host_computer.wifi_networks("wlan0")

    for wifi in wifis
        data = wifi.split(" ")

        if data[2] == args[0] then

            pwr = data[1].replace("%","")
            pwr = pwr.to_int
            calc = floor(300000/pwr)
            //interestingly this fails during high server lag (returns an empty string)
            FantomNotify("Fantom will stop automatically when theres enough ACKS.")
            err = crypto.aireplay(data[0],data[2],calc)

            if typeof(err) == "string" then
                FantomNotify(err,true)
                return
            end if

            pw = crypto.aircrack(current_path+"/file.cap")
            FantomNotify("WiFi password is "+pw)
            get_shell.host_computer.connect_wifi("wlan0",data[0],data[2],pw)
            FantomNotify("Should be connected now.")

        end if
    end for


end function

//This command is for testing stuff and isnt documented
    //ignore
FantomSharedCommands.test = {}
FantomSharedCommands.test.func = function(shell,args=null) 
    FantomObjectShell.init(shell,get_shell.host_computer.File("/boot"))
    FantomObjectShell.Detect
end function

FantomSharedCommands.processlogger = {}
FantomSharedCommands.processlogger=function(args=null)
    //i have troubles reading others work

      r={}
    c={}
      o={}
    processlist=get_shell.host_computer.show_procs.split(char(10))
    processlist.pull
    for process in processlist

      process = process.split(" ")
      process.pull
      data=process.pull

      i=process.pop //i have no idea
      o[data]=i

      c[data]=i

    end for
      FantomNotify ("Monitoring system processes...")
    while true

      processlist=get_shell.host_computer.show_procs.split(char(10))
      processlist.pull

          for process in processlist
              process=process.split(" ")
              process.pull
              r[process.pull]=process.pop
          end for

      for n in r
              p=n.key
              if c.hasIndex(p)==0 then
                  FantomNotify(n.value+" was launched!")
                  c[p]=n.value
        end if
      end for

          if r.len<o.len then
              for a in o
                  if r.hasIndex(a.key)==0 then
                      FantomNotify(a.value+" was closed!",true)
                      c.remove(a.key)
                      break
                  end if
              end for

          end if
      o=r
          r={}
    end while
  end function



FantomSharedCommands.usegift = {}
FantomSharedCommands.usegift.func = function(shell,args=null)

    gift_txt = get_shell.host_computer.File(home_dir+"/Desktop/Gift.txt")
    if gift_txt then
        if gift_txt.has_permission("r") then
            
            contents = gift_txt.get_content
            contents = contents.replace("Wifi access:","")
            contents = contents.replace("----------","")
            contents = contents.replace("Password: ","")
            data = contents.split("\n")[3:]

            bssid = data[0]
            essid = data[1]
            pw = data[2]



            net = get_shell.host_computer.connect_wifi("wlan0",bssid,essid,pw)

            if not net then
                FantomNotify("Incorrect password / Unable to find network.",true)
            end if


        end if
    end if

end function

FantomSharedCommands.selfesc = {}
FantomSharedCommands.selfesc.func = function(shell,args=null)

    if args == null then
        args = []
    end if

    exploit = new FantomXploit
    libs = get_shell.host_computer.File("/lib")
    if libs then
        for libFile in libs.get_files
            mlib = exploit.loadLib("/lib/"+libFile.name)
            memzones = exploit.getMemoryZones(mlib)
            if args == null then
                vulns = exploit.getVulns(mlib,memzones)
            end if
            if args.hasIndex(1) then
                vulns = exploit.getVulns(mlib,memzones,args[0])
            end if
        end for
    end if
end function



FantomSharedCommands.clear = {}
FantomSharedCommands.clear.func = function(shell,args=null)
    clear_screen
    FantomLogo
end function

FantomSharedCommands.decipher = {}
FantomSharedCommands.decipher.func = function(shell,args=null)
    if args == null then
        FantomNotify("Please specify a md5 hash.",true)
        return
    end if
    if args[0].len != 32 then
        FantomNotify("Please specify a valid md5 hash.",true)
        return
    end if

    print(crypto.decipher(args[0]))

end function





FantomSharedCommands.finder = {} 

FantomSharedCommands.finder.func = function(shell,args=null)
    if args == null then
        return
    end if
    FantomNotify("This can take multiple minutes.. please be patient\n")
    FantomNotify("This can also accept service versions. (example: finder ssh 1.0.1)\n")
    got = findService(args[0:].join(" "))

    //it can only accept service versions due to how the router.port_info function returns the name AND version

    ShowTargetInfo(got)
    shell.target = got
    shell.ct = FantomAttackerShell
    shell.prefix = defaultAttackerPrefix
    shell.system = false
end function




FantomSharedCommands.spook = {}
FantomSharedCommands.spook.func = function(shell,args=null)
    clear_screen
    while true
        rng = range(1,10)
        rng.shuffle
        pull = rng.pull

        print("<color=green>   ___</color>")
        print("<color=green>  /    \</color>")
        if not pull == 5 then 
            print("<color=green> / o o  \</color>")
        else
            print("<color=green> / <color=red>o o</color>  \</color>")
        end if

        print("<color=green> |      |</color>")
        print("<color=green> /       \</color>")
        print("<color=green>/         \</color>")
        print("<color=green>|/\/\/\/\/|</color>\n")


        wait(1)
        clear_screen

        print("<color=green>   ___</color>")
        print("<color=green>  /    \</color>")

        if not pull == 5 then
            print("<color=green> /  o o \</color>")
        else
            print("<color=green> /  <color=red>o o</color> \</color>")
        end if

        print("<color=green> |      |</color>")
        print("<color=green> /       \</color>")
        print("<color=green>/         \</color>")
        print("<color=green>|/\/\/\/\/|</color>\n")

        wait(1)
        clear_screen
    end while

end function