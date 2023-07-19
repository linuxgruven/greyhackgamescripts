
//update log:
//- Fantom is no longer one giant file. it's split up into many different source files
//- Fantom now has a session manager. come back to your objects at any time

//ideas:

//exploit db support
//libmonitor - watches for lib updates and alerts you
    //could be very nice in combination with the 'finder' command to hunt for secure libs

//email bruteforcer

//email bomber
//this would have two modes "multi" or "single"

//"single" - the user would input the details of a single mail account
    //fantom would then bombard the user with ads

//"multi" - the user would be prompted to give a file of npc mail accounts in user:password format
    //this would then login to each one in the list and send them a randomly picked "ad"

//ad ideas:
//hackers in your area
//rickroll lyrics
//raid shadow legends ad
//nord vpn ad
//dashlane ad
//tech support scam


clear_screen

mx = include_lib("/lib/metaxploit.so")
crypto = include_lib("/lib/crypto.so")
apt = include_lib("/lib/aptclient.so")

//Toggle for streamer mode
globals.streamerMode = false
globals.sessions = []

//This function displays a bunch of target info when given an IP
//It's how Fantom does it when entering an attacker shell
ShowTargetInfo = function(ip)

    if is_lan_ip(ip) then
        r = get_router()
    else
        r = get_router(ip)
    end if


    format_string = "LAN PORT SERVICE VERSION OPEN"

    ports = r.used_ports
    if is_lan_ip(ip) then
        ports = r.device_ports(ip)
    end if

    for port in ports

        if typeof(port) == "string" then continue

        open = "false"
        if not port.is_closed then
            open = "true"
        end if

        format_string = format_string + "\n" + port.get_lan_ip + " " + port.port_number + " " + r.port_info(port) + " " + open
    end for

    print("\n")

    format_string2 = "LAN PORT SERVICE VERSION OPEN"
    for lan in r.devices_lan_ip
        for port in r.device_ports(lan)
                if port == null then continue

                if typeof(port) == "string" then continue
                
                open = "false"
                if not port.is_closed then
                    open = "true"
                end if
            
                format_string2 = format_string2 + "\n" + port.get_lan_ip + " " + port.port_number + " " + r.port_info(port) + " " + open
        end for
    end for


    formatted2 = format_columns(format_string2)
    formatted = format_columns(format_string)

    print("<color=green>Recon information.</color>\n")
    if not globals.streamerMode then
        print("\n<color=green>"+ip+"</color>\n")
    else
        print("IP not shown due to streamer mode.\n")
    end if

    print(formatted)

    print("\nBelow are forwarded/unforwarded ports within the network.\n")

    print(formatted2)

    print("\n")

    if not is_lan_ip(ip) then
        print(whois(ip))
    else
        print("WHOIS not available on lan addresses.")
    end if

    print("\n")

    print("<color=green>Firewall information.</color>\n")
        rules = r.firewall_rules
        if not rules.len == 0 then
            for rule in rules
                print(rule)
            end for
        else
            print("No firewall rules.")
        end if

    print("\n")


    print("<color=green>Other information.</color>\n")
    print("kernel_router.so version "+r.kernel_version)
    print("BSSID "+r.bssid_name)
    print("ESSID "+r.essid_name)

end function

if mx == null then
    mx = include_lib(current_path+"/metaxploit.so")
    if mx == null then
        mx = include_lib("/home/guest/metaxploit.so")
    end if
end if

if crypto == null then
    crypto = include_lib(current_path+"/crypto.so")
    if crypto == null then
        crypto = include_lib("/home/guest/crypto.so")
    end if
end if


//thanks gk258
//give it a object and a file path and a file object will be returned with that path
//made a few modifications so it would find files too
_bring_to_root=function(ex) 
    // Will return a FILE object at /
    if typeof(ex)=="computer" then return ex.File("/")
    if typeof(ex)=="shell" then return ex.host_computer.File("/")
    if typeof(ex)=="file" then
        while ex.path!="/"
            ex=ex.parent
        end while
        return ex
    end if
    end function


findFolderWpath = function(obj, folderS)
    if typeof(obj) == "shell" then o = obj.host_computer.File("/")
    if typeof(obj) == "computer" then o = obj.File("/")
    if typeof(obj) == "file" then o = _bring_to_root(obj)
    if typeof(o) != "file" then exit("ffWpath fail")
    listFnames = folderS.split("/")
    tracker = 1

    while 1
        for each in o.get_folders+o.get_files
            if each.name != listFnames[tracker] then continue
            o = each
            if each.path == folderS then return each
            tracker = tracker + 1
        end for
    end while
    return
end function


userDetect = function(obj)
    rootDetect = function(obj)
            if typeof(obj) == "shell" then
                
                isRoot = obj.host_computer.create_user("bob","e")
                if typeof(isRoot) != "string" then
                    obj.host_computer.delete_user("bob",1)
                    return true
                else
                    return false
                end if

            end if

            if typeof(obj) == "computer" then

                isRoot = obj.create_user("bob","e")
                if typeof(isRoot) != "string" then
                    obj.delete_user("bob",1)
                    return true
                else
                    return false
                end if

            end if

            if typeof(obj) == "file" then

                root = obj.parent
                for file in root.get_files
                    if file.name == "lib" then
                        if file.has_permission("w") then
                            return true
                        else
                            return false
                        end if
                    end if
                end for

            end if
    end function

    if rootDetect then
        return "root"
    end if

    if typeof(obj) == "shell" then

        homeFolders = obj.host_computer.File("/home")
        if homeFolders then
            for userFolder in homeFolders.get_folders

                if userFolder.name == "guest" then
                    continue
                end if

                if userFolder.has_permission("w") and userFolder.has_permission("r") then
                    etcPwd = obj.host_computer.File("/etc/passwd")

                    if etcPwd then
                        if etcPwd.has_permission("r") then
                            return "user-admin"
                        else
                            return "user"
                        end if
                    end if

                    return "user"
                else
                    return "guest"

                end if

            end for
            return "guest"

        end if

        return "unknown"

    end if

    if typeof(obj) == "computer" then
        homeFolder = obj.File("/home")
        if homeFolder then

            for user in homeFolder.get_folders
                if user.name == "guest" then continue
                if user.has_permission("r") and user.has_permission("w") then

                    etcPwd = obj.File("/etc/passwd")

                    if etcPwd then
                        if etcPwd.has_permission("r") then
                            return "user-admin"
                        else
                            return "user"
                        end if
                    end if

                    return "user"

                end if
            end for
            return "guest"
        end if
    end if

    if typeof(obj) == "file" then
        rootDir = obj.parent

        for rootFile in rootDir.get_folders

            if rootFile.name == "home" then

                for user in rootFile.get_folders

                    if user.name == "guest" then
                        continue
                    end if

                    if user.has_permission("r") and user.has_permission("w") then

                        for passwd in rootDir.get_folders

                            if passwd.name == "etc" then
                                for passwdFile in passwd.get_files

                                    if passwdFile.name == "passwd" then

                                        if passwdFile.has_permission("r") then
                                            return "user-admin"
                                        else
                                            return "user"
                                        end if

                                    end if

                                end for

                            end if

                        end for

                        return "user"

                    end if

                end for

                return "guest"

            end if

        end for

        return "guest"
    end if

end function






//Nice notification like thing
FantomNotify = function(message,warn=false)
    if warn then
        print("<color=#3f3e40>[</color><color=#fc0345>*</color><color=#3f3e40>]</color> <color=#3f3e40>"+message+"</color>")
    else
        print("<color=#3f3e40>[</color><color=green>*</color><color=#3f3e40>]</color> <color=#3f3e40>"+message+"</color>")
    end if
end function


if apt != null then

    mxupdated = apt.check_upgrade("/lib/metaxploit.so")
    cryptoupdated = apt.check_upgrade("/lib/crypto.so")


    if mxupdated == true or cryptoupdated == true then
            print("\n")
            FantomNotify("Fantom has detected out of date exploit libs.",false)
            FantomNotify("Should fantom update these for you? y/n",false)
            FantomNotify("Don't worry! this doesn't upgrade other libs on your system",true)
            said = user_input(":",0,1)

            if active_user != "root" then
                FantomNotify("Please run Fantom as root in order to use this. update was skipped",true)
                wait(5)
            else
                if said.lower == "y" then
                    apt.install("metaxploit.so","/lib")
                    apt.install("crypto.so","/lib")
                end if
            end if


    end if
end if




//The text behind your input
defaultPrefix = "\n<color=#3f3e40>Fantom</color> <color=#3f3e40>[</color><color=green>SYSTEM</color><color=#3f3e40>]</color> > "

etcPwd = get_shell.host_computer.File("/etc/passwd")
if not etcPwd then
    defaultPrefix = "\n<color=#3f3e40>Fantom</color> <color=#3f3e40>[</color><color=orange>P</color><color=#3f3e40>]</color> <color=#3f3e40>[</color><color=green>SYSTEM</color><color=#3f3e40>]</color> > "
else
    if etcPwd.has_permission("r") then
        defaultPrefix = "\n<color=#3f3e40>Fantom</color> <color=#3f3e40>[</color><color=green>P</color><color=#3f3e40>]</color> <color=#3f3e40>[</color><color=green>SYSTEM</color><color=#3f3e40>]</color> > "
    else
        defaultPrefix = "\n<color=#3f3e40>Fantom</color> <color=#3f3e40>[</color><color=red>P</color><color=#3f3e40>]</color> <color=#3f3e40>[</color><color=green>SYSTEM</color><color=#3f3e40>]</color> > "
    end if
end if

defaultAttackerPrefix = "\n<color=#3f3e40>Fantom <color=#3f3e40>[</color><color=green>ATTACKER</color><color=#3f3e40>]</color> > </color>"


//This function is used by Fantom to generate random IPs
ipgen = function()

    r = range(255,1)
    r.shuffle
    ip = ""

    for i in range(1,4)

        pull = r.pull
        ip = ip + pull+"."

    end for
    ip = ip[:-1]

    if is_lan_ip(ip) then
        ipgen
    end if
    if not is_valid_ip(ip) then
        ipgen
    end if

    //print(ip)
    return ip
end function


findService = function(service)

    while true
        ip = ipgen
        r = get_router(ip)

        if typeof(r) == "router" then

                ports = r.used_ports

                for port in ports

                    if not r.port_info(port).indexOf(service) == null then
                        return ip
                    end if

                    split = service.split(" ")
                    if split[0] == "kernel_router" then
                        if r.kernel_version == split[1] then
                            return ip
                        end if
                    end if

                end for

        
        end if


    end while
end function



//this disables the metaxploit an crypto check before going into attacker mode
    debug = false




FantomLogo = function()

    print("<color=green>   ___</color>")
    print("<color=green>  /    \</color>")
    print("<color=green> / <b>o o</b>  \</color>")
    print("<color=green> |       |</color>")
    print("<color=green> /       \</color>")
    print("<color=green>/         \</color>")
    print("<color=green>|/\/\/\/\/|</color>\n")



    print("<color=green><b>Fantom</b></color> <color=#3f3e40>Rewritten</color>")
    FantomNotify("Enter a valid ip/domain for an attacker shell or use system commands by typing 'commands'")
    FantomNotify("If you want further help trying saying 'help'")
    FantomNotify("You may also type 'exit' to close out of Fantom.")
    print(" ")
    if hackingEnabled or debug then
        FantomNotify("Hacking commands enabled.")
        if debug then
            FantomNotify("(Debug mode)",true)
        end if
    else
        FantomNotify("Hacking commands are disabled.\n",true)
    end if

end function




hackingEnabled = true
if mx == null or crypto == null then
    hackingEnabled = false
end if


if not hackingEnabled then
    clear_screen
    FantomLogo

    FantomNotify("Fantom has detected missing libs. Would you like Fantom to install them? y/n",true)
    FantomNotify("In some cases this can take multiple minutes or even longer.\n",true)
    FantomNotify("Times depend on how fresh the world is. best used in mp (newer = longer times)",true)
    pick = user_input("<color=green> ></color>")
    
    if not get_shell.host_computer.is_network_active then
    	FantomNotify("You need internet to download libs. Fantom will start with hacking commands disabled.",true)
    	pick = "n"
    end if
    
    if pick == "y" and apt != null then

        print("<color=green>Fantom is searching. please read the above text while you're waiting</color>")


        hs = findService("repository")
        apt.add_repo(hs)
        apt.update

        libF = get_shell.host_computer.File("/lib")
        guest = get_shell.host_computer.File("/home/guest")
        sucess = false

        if libF then
            if libF.has_permission("w") then
                apt.install("metaxploit.so","/lib")
                apt.install("crypto.so","/lib")

                mx = include_lib("/lib/metaxploit.so")
                crypto = include_lib("/lib/crypto.so")
                hackingEnabled = true
                success = true
            end if
        end if

        if guest then
            if not success then
                if guest.has_permission("w") then
                    apt.install("metaxploit.so","/home/guest")
                    apt.install("crypto.so","/home/guest")

                    mx = include_lib("/home/guest/metaxploit.so")
                    crypto = include_lib("/home/guest/crypto.so")
                    hackingEnabled = true

                end if
            end if
        end if
    
        FantomNotify("If Fantom still has hacking commands disabled this process failed.",true)
        wait(3)
    else

        FantomNotify("Either aptclient.so was not found or you declined the question.",true)
        wait(3)

    end if

    clear_screen
end if




//This is the class I made for the exploit system

FantomXploit = {}

FantomXploit.sanity = function(self)
    if hackingEnabled then
        return true
    else
        return false
    end if
end function

//for the self escalation command
FantomXploit.loadLib = function(self,file)
    if not self.sanity then
        return
    end if
    s = get_shell.host_computer.File(file)
    if s then
        return mx.load(file)
    else
        return null
    end if
end function


FantomXploit.isPortDead = function(self,ip,aport)

    if aport == 0 then return false
    r = get_router(ip)
    if r then
        lans = r.devices_lan_ip
        for lan in lans
            ports = r.device_ports(lan)
            if ports == null then continue
            for port in ports
                if port.port_number != aport then continue
                info = r.port_info(port).split(" ")[0]
                if info == "unknown" then
                    return true
                else
                    return false
                end if
            end for
        end for
        return true
    end if
end function

FantomXploit.getDumpedLib = function(self,ip,port=null)
    if not self.sanity then
        return
    end if
    if port != null then
        lib = mx.net_use(ip,port)
        if typeof(lib) != "net_session" then //These two if statements patch the kernel_router delete secure method
            lib = mx.net_use(ip,port)
        end if

    else
        lib = mx.net_use(ip)
        if typeof(lib) != "net_session" then
            lib = mx.net_use(ip)
        end if

    end if
    return lib.dump_lib
end function


FantomXploit.getMemoryZones = function(self,mlib)
    if not self.sanity then
        return
    end if
    return mx.scan(mlib)
end function

//custom parser btw
FantomXploit.getVulns = function(self,lib,memoryZones,extra=null)
    if not self.sanity then
        return
    end if
    vulns = []

    for address in memoryZones

        got = mx.scan_address(lib,address)


        got = got.replace("decompiling source...","")
        got = got.replace("searching unsecure values...","")
        got = got.replace("Unsafe check: ","")
        
        lines = got.split(char(10))

        for line in lines
            if line.indexOf("*") == null then
                if line == "" then continue
                line = line.replace(".","")
                unsafe = line[line.indexOf("<b>"):line.indexOf("</b>")]

                unsafe = unsafe.replace("<b>","")
                unsafe = unsafe.replace("</b>","")

                //print(unsafe + address)
                if extra == null then
                    got = lib.overflow(address,unsafe)
                else
                    got = lib.overflow(address,unsafe,extra)
                end if
                vulns.push(got)
            end if
        end for

    end for
    return vulns
end function


FantomXploit.getAddresses = function(self,lib,memoryZones,extra=null)
    if not self.sanity then
        return
    end if
    vulns = []

    for address in memoryZones

        got = mx.scan_address(lib,address)


        got = got.replace("decompiling source...","")
        got = got.replace("searching unsecure values...","")
        got = got.replace("Unsafe check: ","")
        
        lines = got.split(char(10))

        for line in lines
            if line.indexOf("*") == null then
                if line == "" then continue
                line = line.replace(".","")
                unsafe = line[line.indexOf("<b>"):line.indexOf("</b>")]
                //print(unsafe + address)
                unsafe = unsafe.replace("<b>","")
                unsafe = unsafe.replace("</b>","")
                got = lib.overflow(address,unsafe)
                vulns.push([address,unsafe])
            end if
        end for

    end for
    return vulns
end function





passwords1 = 0 //leave this alone otherwise fantom will crash
//Place password lists below this line!

//Place password lists above this line!

if passwords1 then
    globals.passwords = passwords1 + passwords2 + passwords3 + passwords4 + passwords5
else
    globals.passwords = []
end if

//This is where we import all of the commands
//all commands are put into different files by category
import_code("/home/potato/commands/system.gs") //system commands

//The commandTable is a map which maps the command name to its function
//Placement of this is important
//probably not a good idea to move
defaultCommandTable = FantomSystemShell

import_code("/home/potato/commands/attacker.gs") //attacker commands
import_code("/home/potato/commands/objectshell.gs") //object shells
import_code("/home/potato/commands/shared.gs") //global commands
import_code("/home/potato/commands/amc.gs") //not in use atm









//Core of Fantom
//Would not recommend you touch this without extensive ms/greyscript knowledge
FantomShell = {}
FantomShell.init = function(self,prefix,commandTable)
    self.prefix = prefix //Just the text before our users input
    self.ct = commandTable //This points to the map which points the command name to its function
    //NOTE: switching between system/attacker shells is done by modifying this variable

    self.target = "none" //Our target
    self.system = true //Are we in the system shell?
end function

//The mainLoop function is responsible for parsing out the users input and executing the given commands
FantomShell.mainLoop = function(self)

    while true

        if globals.streamerMode then
            said = user_input(self.prefix,1,0)
        else
            said = user_input(self.prefix)
        end if

        if said == "" then
            continue
        end if

        nsr = nslookup(said)

        vip = is_valid_ip(said)

        args = said.split(" ")

        if FantomSharedCommands.hasIndex(args[0]) then
            if args[1:] == [] or args[1:] == [""] or args[1:].len == 0 then
                FantomSharedCommands[args[0]].func(self)
            else
                FantomSharedCommands[args[0]].func(self,args[1:])
            end if
            continue
        end if

        if self.ct.hasIndex(args[0]) then

            if args[1:] == [] or args[1:] == [""] or args[1:].len == 0 then
                self.ct[args[0]].func(self)
            else
                self.ct[args[0]].func(self,args[1:])
            end if

        else



            if nsr != "Not found" then

                if not debug == true then
                    if not hackingEnabled then
                        print("\n")
                        FantomNotify("Please ensure metaxploit.so and crypto.so are in /lib or current installation directory.",true)
                        FantomNotify("Hacking commands have been disabled.",true)
                        continue
                    end if
                end if

                self.target = nsr
                self.ct = FantomAttackerShell
                self.prefix = defaultAttackerPrefix
                self.system = false
                print("\n")
                FantomNotify("Attacker shell activated.")
                FantomNotify("See commands by typing 'commands'")
                FantomNotify("You can type 'exit' to exit out of the attacker shell.\n")
                ShowTargetInfo(self.target)

            end if

            if vip then

                if not debug == true then
                    if not hackingEnabled then
                        print("\n")
                        FantomNotify("Please ensure metaxploit.so and crypto.so are in /lib or current installation directory.",true)
                        FantomNotify("Hacking commands have been disabled.",true)
                        continue
                    end if
                end if

                self.target = said
                self.prefix = defaultAttackerPrefix
                self.ct = FantomAttackerShell
                self.system = false
                print("\n")
                FantomNotify("Attacker shell activated.")
                FantomNotify("See commands by typing 'commands'")
                FantomNotify("You can type 'exit' to exit out of the attacker shell.\n")
                ShowTargetInfo(self.target)

            end if

        end if

    end while

end function


clear_screen

s = new FantomShell
s.init(defaultPrefix,defaultCommandTable)
FantomLogo
s.mainLoop


