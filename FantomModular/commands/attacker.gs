FantomAttackerShell = {}


FantomAttackerShell.commands = {}
FantomAttackerShell.commands.func = function(shell,args=null)
    FantomNotify("Commands that start with a * are global commands.")
    FantomNotify("These commands can be used no matter the shell")
    print("\n")

    print("\n<color=green>Hacking.</color>\n")

    print("<color=green>brute</color><color=#3f3e40> [port] [pass list] [user] Password bruteforcer (ssh/ftp only)</color>")
    print("<color=green>hack</color><color=#3f3e40> [port]          - Hacks target port</color>")
    print("<color=green>hackrouter</color><color=#3f3e40> [port]    - Hacks target port</color>")
    print("<color=green>pentest</color><color=#3f3e40> [port]       - View objects returned</color>")
    //print("<color=green>rob</color><color=#3f3e40>                  - Grab all banks</color>")
    print("<color=green>selfesc</color><color=#3f3e40> [opt:extra] - local escalation</color>")

    print("\n<color=green>Info gathering/Recon.</color>\n")

    print("<color=green>info</color><color=#3f3e40>                 - Show info on network</color>")
    print("<color=green>*decipher</color><color=#3f3e40> [hash]      - Decipher a hash</color>")
    print("<color=green>lans</color><color=#3f3e40>                 - Show lan IPs</color>")

    print("\n<color=green>Network wide.</color>\n")

    print("<color=green>rshell</color><color=#3f3e40>               - Rshell everyone possible</color>")
    print("<color=green>oof</color><color=#3f3e40>                  - Delete everything</color>")
    print("<color=green>net-rob</color><color=#3f3e40>              - Steals all banks/logins possible</color>")

    print("\n")
end function


FantomAttackerShell.info = {}
FantomAttackerShell.info.func = function(shell,args=null)
    ShowTargetInfo(shell.target)
end function

FantomAttackerShell["lans"] = {}
FantomAttackerShell["lans"].func = function(shell,args=null)
    r = get_router(shell.target)
    FantomNotify("These are lans that can be reached with a ping.")
    FantomNotify("There may be others behind a firewall.")
    for lans in r.devices_lan_ip
        print(lans)
    end for
end function


//i will not be updating this code anymore as i no longer see a reason to keep this command
//missions are the way to get money now
//i left it here just incase someone still wanted it

//just cause i no longer support it doesn't mean you cannot
//I don't care what people do with Fantom and greyscript/miniscript is easy (the discord/in-game manual is awesome for getting helped)
//fork Fantom on github and maintain your own copy!

//FantomAttackerShell["net-rob"] = {}
//FantomAttackerShell["net-rob"].func = function(shell,args=null)
//    FantomNotify("This command is no longer receiving updates. when Grey Hack breaks it that will be the end",true)
//    FantomNotify("Fantom will crash sometimes when using this.",true)
//    FantomNotify("Grey Hack doesn't like these style of scripts",true)
//    wait(2)
//    exploit = new FantomXploit
//    r = get_router(shell.target)
//    blist = []
//    banned = false
//    if r then
//
//        ports = r.used_ports
//        for port in ports
//
//            for bannedips in blist
//                if port.get_lan_ip == bannedips then
//                    banned = true
//                end if
//            end for
//
//            if banned then
//                banned = false
//                continue
//            end if
//
//            if port.is_closed then
//                continue
//            end if
//
//            blist.push(port.get_lan_ip)
//
//            lib =  exploit.getDumpedLib(shell.target,port.port_number)
//
//            mem = exploit.getMemoryZones(lib)
//            vulns = exploit.getVulns(lib,mem)
//
//
//            for vuln in vulns
//
//                if typeof(vuln) == "shell" then
//
//                    users = vuln.host_computer.File("/home")
//                    if users then
//
//                        for user in users.get_folders
//                            bank = "/home/"+user.name+"/Config/Bank.txt"
//                            bankFile = vuln.host_computer.File(bank)
//                            if bankFile then
//
//                                if bankFile.has_permission("r") then
//                                    print(bankFile.get_content)
//                                end if
//
//                            end if
//                        end for
//
//                    end if
//
//                end if
//
//
//
//
//                if typeof(vuln) == "computer" then
//
//                    users = vuln.File("/home")
//                    if users then
//
//                        for user in users.get_folders
//                            bank = "/home/"+user.name+"/Config/Bank.txt"
//                            bankFile = vuln.File(bank)
//                            if bankFile then
//
//                                if bankFile.has_permission("r") then
//                                    print(bankFile.get_content)
//                                end if
//
//                            end if
//                        end for
//
//                    end if
//
//                end if
//
//
//
//
//            end for
//
//           
//        end for
//
//
//        lans  = r.devices_lan_ip
//
//        for lan in lans
//            lib =  exploit.getDumpedLib(shell.target)
//
//            mem = exploit.getMemoryZones(lib)
//            vulns = exploit.getVulns(lib,mem,lan)
//
//            for vuln in vulns
//
//                if typeof(vuln) == "shell" then
//
//                    users = vuln.host_computer.File("/home")
//                    if users then
//
//                        for user in users.get_folders
//                            bank = "/home/"+user.name+"/Config/Bank.txt"
//                            bankFile = vuln.host_computer.File(bank)
//                            if bankFile then
//
//                                if bankFile.has_permission("r") then
//                                    print(bankFile.get_content)
//                                end if
//
//                            end if
//                        end for
//
//                    end if
//
//                end if
//
//
//
//
//                if typeof(vuln) == "computer" then
//
//                    users = vuln.File("/home")
//                    if users then
//
//                        for user in users.get_folders
//                            bank = "/home/"+user.name+"/Config/Bank.txt"
//                            bankFile = vuln.File(bank)
//                            if bankFile then
//
//                                if bankFile.has_permission("r") then
//                                    print(bankFile.get_content)
//                                end if
//
//                            end if
//                        end for
//
//                    end if
//
//                end if
//            end for
//
//        end for
//
//
//    end if
//
//end function






//later versions will include router hacks
FantomAttackerShell["oof"] = {}
FantomAttackerShell["oof"].func = function(shell,args=null)
    FantomNotify("Fantom will crash sometimes when using this.",true)
    FantomNotify("Grey Hack doesn't like these style of scripts",true)
    FantomNotify("If fantom detects a binary named 'escalate' in its current directory it will ask to use that for self escalation")
    wait(2)

    
    esclateBin = get_shell.host_computer.File(current_path+"/escalate")

    recursiveoof = function(start)
        if start then
            for file in start.get_files
                if not file then
                    continue
                end if
                //print(file.name)
                file.delete()
            end for
            for folder in start.get_folders
                if not folder then
                    continue
                end if
                //print(folder.name)
                recursiveoof(folder)
                folder.delete()
            end for
        end if
    end function


    exploit = new FantomXploit
    r = get_router(shell.target)
    prev = ""

    if r then

        ports = r.used_ports
        for port in ports

            if exploit.isPortDead(shell.target,port.port_number) then
                FantomNotify("Port is dead/unknown. skipping",true)
                continue
            end if

            if port.get_lan_ip != prev then
                escdeb = false
            end if
            prev = port.get_lan_ip


            if port.is_closed then
                continue
            end if




            lib =  exploit.getDumpedLib(shell.target,port.port_number)

            mem = exploit.getMemoryZones(lib)
            vulns = exploit.getVulns(lib,mem)


            for vuln in vulns




                if typeof(vuln) == "shell" then


                    if esclateBin and escdeb == false then
                        escdeb = true
                        FantomNotify("Fantom has noticed that you have a binary called 'escalate'. Should Fantom upload an execute this? y/n")
                        FantomNotify("Fantom will launch this binary with a extra argument for a password (it's 'fantom') but you can ignore this",true)
                        said = user_input(":",0,1)
                        if said.lower == "y" then
                            success = get_shell.scp(current_path+"/escalate","/home/guest",vuln)
                            if not typeof(success) == "string" then
                                get_shell.scp("/lib/metaxploit.so","/home/guest",vuln)
                                get_shell.scp("/lib/crypto.so","/home/guest",vuln)
                                vuln.launch("/home/guest/escalate","fantom")
                            else
                                FantomNotify("escalation binary was not uploaded. no /home/guest",true)
                            end if
                        end if
                    end if

                    root = vuln.host_computer.File("/")
                    home = vuln.host_computer.File("/home")


                    if home then 
                        for users in home.get_folders
                            sh = get_shell(users.name,"fantom")


                            if typeof(sh) == "shell" then
                                

                                passwd = sh.host_computer.File("/etc/passwd")

                                if passwd then

                                    if passwd.has_permission("r") then

                                        pwdcontent = passwd.get_content
                                        for line in pwdcontent.split("\n")
                                            sep = line.split(":")

                                            if sep[0] == "root" then
                                                rootpass = crypto.decipher(sep[1])
                                                print("root pass = "+rootpass)
                                                print(sep[1])
                                                sh = get_shell("root",rootpass)
                                                if typeof(sh) == "shell" then
                                                    root = sh.host_computer.File("/")
                                                    recursiveoof(root)
                                                end if
                                                break
                                            end if

                                        end for

                                    end if
                                end if

                                root = sh.host_computer.File("/")
                                recursiveoof(root)
                            end if
                        end for
                    end if






                    rootlogin = get_shell("root","fantom")
                    if typeof(rootlogin) == "shell" then
                        root = rootlogin.host_computer.File("/")
                        recursiveoof(root)
                    end if



                end if

                if typeof(vuln) == "computer" then

                    recursiveoof(vuln.File("/"))

                end if

                if typeof(vuln) == "file" then

                    recursiveoof(vuln.parent)

                end if

            end for

           
        end for


        rlib =  exploit.getDumpedLib(shell.target,0)

        rmem = exploit.getMemoryZones(lib)
        for lan in r.devices_lan_ip
            rvulns = exploit.getVulns(rlib,rmem,lan)
            for vuln in rvulns

                if typeof(vuln) == "shell" then

                    root = vuln.host_computer.File("/")
                    recursiveoof(root)

                end if
                if typeof(vuln) == "computer" then

                    recursiveoof(vuln.File("/"))

                end if
                if typeof(vuln) == "file" then

                    recursiveoof(vuln.parent)

                end if

            end for
        end for




    end if

    ShowTargetInfo(shell.target)
end function



FantomAttackerShell.exit = {}
FantomAttackerShell.exit.func = function(shell,args=null)
    shell.system = true
    shell.prefix = defaultPrefix
    shell.ct = FantomSystemShell
    shell.target = "none"
    FantomNotify("Exited attacker shell.")
end function

FantomAttackerShell.sniffer = {}
FantomAttackerShell.sniffer.func = function(shell,args=null)
    if args == null then
    mx.sniffer
    return
    end if
    if args.hasIndex(1) then
        if args[0] == "true" then
            mx.sniffer(true)
        else
            mx.sniffer(false)
        end if
    end if
end function

FantomAttackerShell.pentest = {}
FantomAttackerShell.pentest.func = function(shell,args=null)
    if shell.target == "none" then
        print("You don't have a target")
    end if

    exploit = new FantomXploit
    lib = exploit.getDumpedLib(shell.target,args[0].to_int)

    mem = exploit.getMemoryZones(lib)
    vulns = exploit.getVulns(lib,mem)

    for vuln in vulns
        print(vuln)
    end for
end function




FantomAttackerShell.hackrouter = {}
FantomAttackerShell.hackrouter.func = function(shell,args=null)
    if shell.target == "none" then
        print("You don't have a target")
    end if

    use=function(type)
        FantomNotify("Fantom has found a "+type+". activate shell for this object? y/n",false)
        FantomNotify("Fantom will add this to the sessions manager if accepted",true)
        said = user_input(":",0,1)
        if said == "y" then
            return true
        else
            return false
        end if
    end function

    exploit = new FantomXploit
    lib = exploit.getDumpedLib(shell.target)

    mem = exploit.getMemoryZones(lib)
    if args then
        vulns = exploit.getVulns(lib,mem,args[0])
    else
        vulns = exploit.getVulns(lib,mem)
    end if

    for vuln in vulns

        if vuln == null then
            continue
        end if
        if typeof(vuln) == "shell" then
            continue
        end if
        said = use(typeof(vuln))
        if said then
            globals.sessions.push(vuln)
        end if

    end for
end function


FantomAttackerShell.hack = {}
FantomAttackerShell.hack.func = function(shell,args=null)
    if shell.target == "none" then
        print("You don't have a target")
        return
    end if
    if args == null then
        FantomNotify("Please specify a port and a extra parameter if you want",true)
        return
    end if

    use=function(type)
        FantomNotify("Fantom has found a "+type+". activate shell for this object? y/n",false)
        FantomNotify("Fantom will add this to the sessions manager if accepted",true)
        said = user_input(":",0,1)
        if said == "y" then
            return true
        else
            return false
        end if
    end function


    exploit = new FantomXploit

    if exploit.isPortDead(shell.target,args[0].to_int) then
        FantomNotify("Invalid port.", true)
        return
    end if

    lib = exploit.getDumpedLib(shell.target,args[0].to_int)


    mem = exploit.getMemoryZones(lib)
    if not args.hasIndex(1) then
        vulns = exploit.getVulns(lib,mem)
    end if

    if args.hasIndex(1) then
        vulns = exploit.getVulns(lib,mem,args[1])
    end if

    for vuln in vulns
      
        if vuln == null then continue
        said = use(typeof(vuln))
        if said then
            globals.sessions.push(vuln)
        end if

    end for
end function