    //I've had to come up with a crappy way of adding object shells into Fantom
    //For this to work when switching into the object shell FantomObjectShell.Object must be set to
    // the object beforehand

    //Object shells are unique shells in Fantom in that certain commands only appear if you have the right object

        //added ssh
        //edited help menus
        //fixed crash in ss

    FantomObjectShell = {}
    FantomObjectShell.Object = null
    FantomObjectShell.ObjectType = ""


    FantomObjectShell.init = function(shell,object)
        FantomObjectShell.Object = object
        FantomObjectShell.ObjectType = typeof(self.Object)
        shell.ct = self
        shell.system = false
        shell.prefix = "<color=#3f3e40>Fantom [<color=green>"+typeof(self.Object)+"</color>]</color> > "
        
        if FantomObjectShell.ObjectType == "shell" then
            etcPwd = FantomObjectShell.Object.host_computer.File("/etc/passwd")
            if not etcPwd then
                shell.prefix = "<color=#3f3e40>Fantom <color=#3f3e40>[</color><color=orange>P</color><color=#3f3e40>]</color> [<color=green>"+typeof(self.Object)+"</color>]</color> > "
            else

                if etcPwd.has_permission("r") then
                    shell.prefix = "<color=#3f3e40>Fantom <color=#3f3e40>[</color><color=green>P</color><color=#3f3e40>]</color> [<color=green>"+typeof(self.Object)+"</color>]</color> > "
                else
                    shell.prefix = "<color=#3f3e40>Fantom <color=#3f3e40>[</color><color=red>P</color><color=#3f3e40>]</color> [<color=green>"+typeof(self.Object)+"</color>]</color> > "
                end if

            end if
        end if

        if FantomObjectShell.ObjectType == "computer" then
            etcPwd = FantomObjectShell.Object.File("/etc/passwd")
            if not etcPwd then
                shell.prefix = "<color=#3f3e40>Fantom <color=#3f3e40>[</color><color=orange>P</color><color=#3f3e40>]</color> [<color=green>"+typeof(self.Object)+"</color>]</color> > "
            else

                if etcPwd.has_permission("r") then
                    shell.prefix = "<color=#3f3e40>Fantom <color=#3f3e40>[</color><color=green>P</color><color=#3f3e40>]</color> [<color=green>"+typeof(self.Object)+"</color>]</color> > "
                else
                    shell.prefix = "<color=#3f3e40>Fantom <color=#3f3e40>[</color><color=red>P</color><color=#3f3e40>]</color> [<color=green>"+typeof(self.Object)+"</color>]</color> > "
                end if

            end if
        end if



    end function

    FantomObjectShell.exit = {}
    FantomObjectShell.exit.intendedType = "computer"
    FantomObjectShell.exit.func = function(shell,args=null)
        shell.ct = defaultCommandTable
        shell.prefix = defaultPrefix
        shell.system = true
    end function


    FantomObjectShell.commands = {}
    FantomObjectShell.commands.func = function(shell,args=null)


        if FantomObjectShell.ObjectType == "computer" then
            print("\n<color=green> File Management.</color>")
            print("    <color=green>touch [file path]</color> - <color=#3f3e40>Creates a file with the given name.</color>")
            print("    <color=green>rm [file path]</color> - <color=#3f3e40>Delete a file</color>")
            print("    <color=green>copy [file path] [new path]</color> - <color=#3f3e40>Copy a file to another location</color>")
            print("    <color=green>mkdir [folder path]</color> - <color=#3f3e40>Makes a folder in the specified path</color>")
            //print("    <color=green>neo [file]</color> - <color=#3f3e40>Starts the text editor 'Fantom Neo' </color>")
            print("\n<color=green>System</color>")
            print("    <color=green>passwd [user] [passwd]</color> - <color=#3f3e40>Change user password</color>")
            print("    <color=green>adduser [username]</color> - <color=#3f3e40>Adds a user</color>")
            print("    <color=green>deluser [username]</color> - <color=#3f3e40>Delete a user</color>")
            print("    <color=green>addgroup [group]</color> - <color=#3f3e40>Adds a group</color>")
            print("    <color=green>delgroup [group]</color> - <color=#3f3e40>Deletes a group</color>")
            print("    <color=green>ps</color> - <color=#3f3e40>Show currently running processes</color>")
            print("\n<color=green>Network</color>")
            print("    <color=green>ss</color> - <color=#3f3e40>View internal/external open ports of current computer</color>")
            print("    <color=green>ifconfig</color> - <color=#3f3e40>Displays local and public IP</color>\n")
        end if

        if FantomObjectShell.ObjectType == "shell" then
            print("\n<color=green> File Management.</color>")
            print("    <color=green>touch [file path]</color> - <color=#3f3e40>Creates a file with the given name.</color>")
            print("    <color=green>rm [file path]</color> - <color=#3f3e40>Delete a file</color>")
            print("    <color=green>copy [file path] [new path]</color> - <color=#3f3e40>Copy a file to another location</color>")
            print("    <color=green>mkdir [folder path]</color> - <color=#3f3e40>Makes a folder in the specified path</color>")
            print("    <color=green>build [src path] [binary path]</color> - <color=#3f3e40>Builds source file in specified location</color>")
            print("\n<color=green>System</color>")
            print("    <color=green>passwd [user] [passwd]</color> - <color=#3f3e40>Change user password</color>")
            print("    <color=green>adduser [username]</color> - <color=#3f3e40>Adds a user</color>")
            print("    <color=green>deluser [username]</color> - <color=#3f3e40>Delete a user</color>")
            print("    <color=green>addgroup [group]</color> - <color=#3f3e40>Adds a group</color>")
            print("    <color=green>delgroup [group]</color> - <color=#3f3e40>Deletes a group</color>")
            print("    <color=green>ps</color> - <color=#3f3e40>Show currently running processes</color>")
            print("    <color=green>term</color> - <color=#3f3e40>Drop into a regular terminal</color>")
            print("    <color=green>up</color> - <color=#3f3e40>Upload Fantom to target in /home/guest</color>")
            //print("    <color=green>neo [file]</color> - <color=#3f3e40>Starts the text editor 'Fantom Neo' </color>")
            print("\n<color=green>Network</color>")
            print("    <color=green>ss</color> - <color=#3f3e40>View internal/external open ports of current computer</color>")
            print("    <color=green>lmap</color> - <color=#3f3e40>Shows information about inside the network using current device</color>")
            print("    <color=green>ifconfig</color> - <color=#3f3e40>Displays local and public IP</color>")
            print("    <color=green>ssh [user@password] [ip] [opt:port]</color> - <color=#3f3e40>SSH into another computer</color>\n")
        end if


        if FantomObjectShell.ObjectType == "file" then
            print("\n<color=green> File Management.</color>")
            print("    <color=green>cat [file]</color> - <color=#3f3e40>Print file contents</color>")
            //print("    <color=green>touch [file path]</color> - <color=#3f3e40>Creates a file with the given name.</color>")
            print("    <color=green>rm [file path]</color> - <color=#3f3e40>Delete a file</color>")
            print("    <color=green>cp [file path] [new path]</color> - <color=#3f3e40>Copy a file to another location</color>")
            print("    <color=green>mv [file path] [new path]</color> - <color=#3f3e40>Move a file to another location</color>")
            //print("    <color=green>mkdir [folder path]</color> - <color=#3f3e40>Makes a folder in the specified path</color>")
            //print("    <color=green>corruptlog</color> - <color=#3f3e40>Corrupts the logs</color>")
            //print("    <color=green>neo [file]</color> - <color=#3f3e40>Starts the text editor 'Fantom Neo' </color>")
        end if

    end function

    //Commands have to be in this function
    //The code here detects the given object and adds commands based around that object
    //This code cannot run before FantomObjectShell.init is called because certain variables aren't set right
    
    FantomObjectShell.Detect = function()
        if FantomObjectShell.ObjectType == "computer" then

            //fancier touch that grabs the filename from the path
            FantomObjectShell.touch = {}
            FantomObjectShell.touch.func = function(shell,args)
                if args == null then
                    FantomNotify("Please add a path.",true)
                    return
                end if

                split = args[0].split("/")
                filename = split[split.len-1]
                pathh = split[:-1].join("/")

                s = FantomObjectShell.Object.touch(pathh,filename)

                if typeof(s) == "string" then
                    FantomNotify("Failed with reason: "+s,true)
                else
                    FantomNotify("Created successfully.",false)
                end if

            end function


            FantomObjectShell.mkdir = {}
            FantomObjectShell.mkdir.func = function(shell,args)
                if args == null then
                    FantomNotify("Please add a path.",true)
                    return
                end if

                split = args[0].split("/")
                filename = split[split.len-1]
                pathh = split[:-1].join("/")

                FantomObjectShell.Object.create_folder(pathh,filename)

            end function


            FantomObjectShell.rm = {}
            FantomObjectShell.rm.func = function(shell,args)

                if args == null then
                    FantomNotify("Please add a path.",true)
                    return
                end if

                f = FantomObjectShell.Object.File(args[0])
                if f then
                    if f.has_permission("w") then
                        f.delete
                    else
                        FantomNotify("Delete failure. (no permissions)",true)
                    end if
                end if

            end function


            FantomObjectShell.cat = {}
            FantomObjectShell.cat.func = function(shell,args)
                
                if args == null then
                    FantomNotify("Please add a path.",true)
                    return
                end if

                f = FantomObjectShell.Object.File(args[0])
                if f then
                    if f.has_permission("r") then
                        print f.get_content
                    else
                        FantomNotify("Read failure. no permissions",true)
                    end if
                end if

            end function


            FantomObjectShell.copy = {}
            FantomObjectShell.copy.func = function(shell,args)

                if args == null then
                    FantomNotify("Please add a path.",true)
                    return
                end if

                if not args.hasIndex(1) then
                    FantomNotify("Missing 2nd parameter.",true)
                    return
                end if

                split = args[1].split("/")
                filename = split[split.len-1]
                pathh = split[:-1].join("/")

                f = FantomObjectShell.Object.File(args[0])
                if f then
                    f.copy(pathh,filename)
                    FantomNotify("Copy success",false)
                else
                    FantomNotify("File doesn't exist.",true)
                end if

            end function


            FantomObjectShell.ls = {}
            FantomObjectShell.ls.func = function(shell,args)
                if args == null then
                    FantomNotify("No path given. assuming root folder",true)
                    root = FantomObjectShell.Object.File("/")
                    stuff = root.get_files + root.get_folders
                    for file in stuff
                        print(file.name+" "+file.owner+" "+file.permissions)
                    end for
                    return
                end if

                folder = FantomObjectShell.Object.File(args[0])
                stuff = folder.get_files + folder.get_folders
                for file in stuff
                    print(file.name+" "+file.owner+" "+file.permissions)
                end for
                return
            end function


            FantomObjectShell.passwd = {}
            FantomObjectShell.passwd.func = function(shell,args)
                if args == null then
                    FantomNotify("Please specify a user an password",true)
                    return
                end if
                if args.len >= 2 then
                    s = FantomObjectShell.Object.change_password(args[0],args[1])

                    if typeof(s) == "string" then
                        FantomNotify("Failed with reason: "+s,true)
                    end if
                else
                    FantomNotify("Missing 2nd parameter.",true)
                end if
            end function

            FantomObjectShell.adduser = {}
            FantomObjectShell.adduser.func = function(shell,args)
                if args == null then
                    FantomNotify("Please add a username and password.",true)
                    return
                end if
                if args.len >= 2 then
                    s = FantomObjectShell.Object.create_user(args[0],args[1])

                    if typeof(s) == "string" then
                        FantomNotify("Failed with reason: "+s,true)
                    end if
                else
                    FantomNotify("Missing 2nd parameter.",true)
                end if
            end function


            FantomObjectShell.addgroup = {}
            FantomObjectShell.addgroup.func = function(shell,args)
                if args == null then
                    FantomNotify("Please add a username an group.",true)
                    return
                end if
                if args.len >= 2 then
                    s = FantomObjectShell.Object.create_group(args[0],args[1])

                    if typeof(s) == "string" then
                        FantomNotify("Failed with reason: "+s,true)
                    end if
                else
                    FantomNotify("Missing 2nd parameter.",true)
                end if
            end function


            FantomObjectShell.delgroup = {}
            FantomObjectShell.delgroup.func = function(shell,args)
                if args == null then
                    FantomNotify("Please add a username an group.",true)
                    return
                end if
                if args.len >= 2 then
                    s = FantomObjectShell.Object.delete_group(args[0],args[1])

                    if typeof(s) == "string" then
                        FantomNotify("Failed with reason: "+s,true)
                    end if
                else
                    FantomNotify("Missing 2nd parameter.",true)
                end if
            end function


            FantomObjectShell.deluser = {}
            FantomObjectShell.deluser.func = function(shell,args)
                if args == null then
                    FantomNotify("Please add a username.",true)
                    FantomNotify("You can optionally remove their home by adding a true or false after.",true)
                    return
                end if

                if args.hasIndex(1) then
                    if args[1] == "true" then
                        s = FantomObjectShell.Object.delete_user(args[0],1)
                    else
                        s = FantomObjectShell.Object.delete_user(args[0],0)
                    end if
                else
                    s = FantomObjectShell.Object.delete_user(args[0])
                end if

                if typeof(s) == "string" then
                    FantomNotify("Failed with reason: "+s,true)
                end if

            end function

            FantomObjectShell.procs = {}
            FantomObjectShell.procs.func = function(shell,args)

                print("\n")
                output = FantomObjectShell.Object.show_procs
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

            FantomObjectShell.ss = {}
            FantomObjectShell.ss.func = function(shell,args)
                p = FantomObjectShell.Object.get_ports
                for port in p
                    info = get_router().port_info(port)
                    print(port.lan_ip+" "+info)
                end for
            end function


            FantomObjectShell.ifconfig = {}
            FantomObjectShell.ifconfig.func = function(shell,args)
                r = get_router
                print("Public IP: "+r.public_ip)
                print("Lan IP: "+r.local_ip)

            end function

        end if




        if FantomObjectShell.ObjectType == "file" then

            FantomObjectShell.rm = {}
            FantomObjectShell.rm.func = function(shell,args)
                if args == null then
                    FantomNotify("Please specify a file path.",true)
                    return
                end if

                f = findFolderWpath(FantomObjectShell.Object,args[0])
                if typeof(f) == "file" then
                    if f.has_permission("w") then
                        f.delete
                    else
                        FantomNotify("Cant delete. no permissions",true)
                    end if
                else
                    FantomNotify("Invalid file path.",true)
                end if
            end function


            FantomObjectShell.ls = {}
            FantomObjectShell.ls.func = function(shell,args)
                if args == null then
                    FantomNotify("No args given. assuming root directory",true)
                    root = FantomObjectShell.Object.parent
                    for junk in root.get_folders+root.get_files
                        print(junk.name+" "+junk.group+" "+junk.owner+" "+junk.size)
                    end for
                    return
                end if

                f = findFolderWpath(FantomObjectShell.Object,args[0])
                for junk in f.get_folders+f.get_files
                    print(junk.name+" "+junk.group+" "+junk.owner+" "+junk.size)
                end for

            end function

            FantomObjectShell.cat = {}
            FantomObjectShell.cat.func = function(shell,args)
                if args == null then
                    FantomNotify("Please specify a file path.",true)
                end if


                f = findFolderWpath(FantomObjectShell.Object,args[0])

                if typeof(f) == "file" then
                    if f.has_permission("r") then
                        print f.get_content
                    else
                        FantomNotify("Cant read. no permissions",true)
                    end if
                else
                    FantomNotify("Invalid file",true)
                end if
            end function

            FantomObjectShell.mv = {}
            FantomObjectShell.mv.func = function(shell,args)
                if args == null then
                    FantomNotify("Please specify a file and path.",true)
                    return
                end if
                if not args.hasIndex(1) then
                    FantomNotify("Missing 2nd parameter.",true)
                    return
                end if
                f = findFolderWpath(FantomObjectShell.Object,args[0])
                location = findFolderWpath(FantomObjectShell.Object,args[1])

                if typeof(f) == "file" then
                    if typeof(location) == "file" then
                        if location.has_permission("w") then
                            f.move(args[1],f.name)
                        else
                            FantomNotify("Can't move to location. no permissions",true)
                        end if
                    else
                        FantomNotify("Invalid location.",true)
                    end if
                else
                    FantomNotify("File doesn't exist.",true)
                end if
            end function



            FantomObjectShell.cp = {}
            FantomObjectShell.cp.func = function(shell,args)
                if args == null then
                    FantomNotify("Please specify a file and path.",true)
                    return
                end if
                if not args.hasIndex(1) then
                    FantomNotify("Missing 2nd parameter.",true)
                    return
                end if
                f = findFolderWpath(FantomObjectShell.Object,args[0])
                location = findFolderWpath(FantomObjectShell.Object,args[1])

                if typeof(f) == "file" then
                    if typeof(location) == "file" then
                        if location.has_permission("w") then
                            f.copy(args[1],f.name)
                        else
                            FantomNotify("Can't copy to location. no permissions",true)
                        end if
                    else
                        FantomNotify("Invalid location.",true)
                    end if
                else
                    FantomNotify("File doesn't exist.",true)
                end if
            end function

        end if



        if FantomObjectShell.ObjectType == "shell" then

            FantomObjectShell.user = {}
            FantomObjectShell.user.func = function(shell,args)
                homeguest = FantomObjectShell.Object.host_computer.File("/home/guest")
                if not homeguest then
                    FantomNotify("/home/guest doesnt exist. failed",true)
                    return
                end if

                if args.hasIndex(0) == 0 and args.hasIndex(1) == 0 then
                    FantomNotify("Missing user an password args",true)
                end if

                payloadsrc = "get_custom_object.shell = get_shell("+""""+args[0]+""""+","+""""+args[1]+""""+")"
                payload  = FantomObjectShell.Object.host_computer.touch("/home/guest","payload.src")

                if payload then
                    payloadF = FantomObjectShell.Object.host_computer.File("/home/guest/payload.src")
                    payloadF.set_content(payloadsrc)
                    FantomObjectShell.Object.build("/home/guest/payload.src","/home/guest")
                    FantomObjectShell.Object.launch("/home/guest/payload")
                    if get_custom_object.hasIndex("shell") then
                        globals.sessions.push(get_custom_object.shell)
                        FantomNotify("Shell added to sessions manager")
                    end if
                end if

            end function

            FantomObjectShell.touch = {}
            FantomObjectShell.touch.func = function(shell,args)
                if args == null then
                    FantomNotify("Please add a path.",true)
                    return
                end if

                split = args[0].split("/")
                filename = split[split.len-1]
                pathh = split[:-1].join("/")

                s = FantomObjectShell.Object.host_computer.touch(pathh,filename)

                if typeof(s) == "string" then
                    FantomNotify("Failed with reason: "+s,true)
                else
                    FantomNotify("Created successfully.",false)
                end if

            end function

            FantomObjectShell.lmap = {}
            FantomObjectShell.lmap.func = function()
                ports = FantomObjectShell.Object.host_computer.get_ports
                for port in ports
                    print(port.port_number)
                end for
            end function

            FantomObjectShell.up = {}
            FantomObjectShell.up.func =function(shell,args)
                programPath = program_path.split("/")
                programName = programPath[programPath.len-1]
                get_shell.scp(program_path,"/home/guest",FantomObjectShell.Object)
                get_shell.scp("/home/guest/"+programName,"/home/guest",FantomObjectShell.Object)
                get_shell.scp("/lib/metaxploit.so","/home/guest",FantomObjectShell.Object)
                get_shell.scp("/lib/crypto.so","/home/guest",FantomObjectShell.Object)
                get_shell.scp(current_path+"/metaxploit.so","/home/guest",FantomObjectShell.Object)
                get_shell.scp(current_path+"/crypto.so","/home/guest",FantomObjectShell.Object)
                FantomObjectShell.Object.launch("/home/guest"+programName)
            end function


            FantomObjectShell.term = {}
            FantomObjectShell.term = function(shell,args)
                FantomObjectShell.Object.start_terminal
            end function


            FantomObjectShell.ls = {}
            FantomObjectShell.ls.func = function(shell,args)
                if args == null then
                    FantomNotify("No path given. assuming root folder")
                    root = FantomObjectShell.Object.host_computer.File("/")
                    stuff = root.get_files + root.get_folders
                    for file in stuff
                        print(file.name+" "+file.owner+" "+file.permissions)
                    end for
                    return
                end if

                folder = FantomObjectShell.Object.host_computer.File(args[0])
                if not folder then
                    FantomNotify("Invalid path.",true)
                    return
                end if
                if not folder.is_folder then
                    FantomNotify("Not a folder.",true)
                    return
                end if
                stuff = folder.get_files + folder.get_folders
                for file in stuff
                    print(file.name+" "+file.owner+" "+file.permissions)
                end for
            end function



            FantomObjectShell.mkdir = {}
            FantomObjectShell.mkdir.func = function(shell,args)
                if args == null then
                    FantomNotify("Please add a path.",true)
                    return
                end if

                split = args[0].split("/")
                filename = split[split.len-1]
                pathh = split[:-1].join("/")

                FantomObjectShell.Object.host_computer.create_folder(pathh,filename)

            end function


            FantomObjectShell.rm = {}
            FantomObjectShell.rm.func = function(shell,args)

                if args == null then
                    FantomNotify("Please add a path.",true)
                    return
                end if

                f = FantomObjectShell.Object.host_computer.File(args[0])
                if f then
                    if f.has_permission("w") then
                        f.delete
                    else
                        FantomNotify("Delete failure. (no permissions)",true)
                    end if
                end if

            end function


            FantomObjectShell.cat = {}
            FantomObjectShell.cat.func = function(shell,args)
                
                if args == null then
                    FantomNotify("Please add a path.",true)
                    return
                end if

                f = FantomObjectShell.Object.host_computer.File(args[0])
                if f then
                    if f.has_permission("r") then
                        print f.get_content
                    else
                        FantomNotify("Read failure. (no permissions)",true)
                    end if
                end if

            end function


            FantomObjectShell.copy = {}
            FantomObjectShell.copy.func = function(shell,args)

                if args == null then
                    FantomNotify("Please add a path.",true)
                    return
                end if

                split = args[1].split("/")
                filename = split[split.len-1]
                pathh = split[:-1].join("/")

                f = FantomObjectShell.Object.host_computer.File(args[0])
                if f then
                    f.copy(pathh,filename)
                    FantomNotify("Copy success",false)
                else
                    FantomNotify("File doesn't exist.",true)
                end if

            end function



            FantomObjectShell.passwd = {}
            FantomObjectShell.passwd.func = function(shell,args)
                if args == null then
                    FantomNotify("Please specify a user an password",true)
                    return
                end if
                if args.len >= 2 then
                    s = FantomObjectShell.Object.host_computer.change_password(args[0],args[1])

                    if typeof(s) == "string" then
                        FantomNotify("Failed with reason: "+s,true)
                    end if

                end if
            end function

            FantomObjectShell.adduser = {}
            FantomObjectShell.adduser.func = function(shell,args)
                if args == null then
                    FantomNotify("Please add a username and password.",true)
                    return
                end if
                if args.len >= 2 then
                    s = FantomObjectShell.Object.host_computer.create_user(args[0],args[1])

                    if typeof(s) == "string" then
                        FantomNotify("Failed with reason: "+s,true)
                    end if

                end if
            end function


            FantomObjectShell.addgroup = {}
            FantomObjectShell.addgroup.func = function(shell,args)
                if args == null then
                    FantomNotify("Please add a username an group.",true)
                    return
                end if
                if args.len >= 2 then
                    s = FantomObjectShell.Object.host_computer.create_group(args[0],args[1])

                    if typeof(s) == "string" then
                        FantomNotify("Failed with reason: "+s,true)
                    end if

                end if
            end function


            FantomObjectShell.delgroup = {}
            FantomObjectShell.delgroup.func = function(shell,args)
                if args == null then
                    FantomNotify("Please add a username an group.",true)
                    return
                end if
                if args.len >= 2 then
                    s = FantomObjectShell.Object.host_computer.delete_group(args[0],args[1])

                    if typeof(s) == "string" then
                        FantomNotify("Failed with reason: "+s,true)
                    end if

                end if
            end function


            FantomObjectShell.deluser = {}
            FantomObjectShell.deluser.func = function(shell,args)
                if args == null then
                    FantomNotify("Please add a username.",true)
                    FantomNotify("You can optionally remove their home by adding a true or false after.",true)
                    return
                end if

                if args.hasIndex(1) then
                    if args[1] == "true" then
                        s = FantomObjectShell.Object.host_computer.delete_user(args[0],1)
                    else
                        s = FantomObjectShell.Object.host_computer.delete_user(args[0],0)
                    end if
                else
                    s = FantomObjectShell.Object.host_computer.delete_user(args[0])
                end if

                if typeof(s) == "string" then
                    FantomNotify("Failed with reason: "+s,true)
                end if

            end function

            FantomObjectShell.procs = {}
            FantomObjectShell.procs.func = function(shell,args)

                print("\n")
                output = FantomObjectShell.Object.host_computer.show_procs
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

            FantomObjectShell.ss = {}
            FantomObjectShell.ss.func = function(shell,args)
                p = FantomObjectShell.Object.host_computer.get_ports
                for port in p
                    info = get_router().port_info(port)
                    print(port.get_lan_ip+" "+info)
                end for
            end function

            FantomObjectShell.ssh = {}
            FantomObjectShell.ssh.func = function(shell,args)
                if args == null then
                    FantomObjectShell("Missing arguments. see 'commands'", true)
                    return
                end if

                user_details = args[0].split("@")

                if not user_details then
                    FantomNotify("Invalid user details.")
                    return
                end if

                ip = args[1]
                if args.hasIndex(2) then
                    sh = get_shell.connect_service(ip,args[2].to_int,user_details[0],user_details[1])
                else
                    sh = get_shell.connect_service(ip,22,user_details[0],user_details[1])
                end if

                if typeof(sh) == "shell" then
                    FantomNotify("Success! add it to sessions manager? y/n",false)
                    said = user_input(": ",0,1)
                    if said.lower == "y" then
                        globals.sessions.push(sh)
                    end if
                end if

            end function



            FantomObjectShell.ifconfig = {}
            FantomObjectShell.ifconfig.func = function(shell,args)
                r = get_router
                print("Public IP: "+r.public_ip)
                print("Lan IP: "+r.local_ip)

            end function

        end if




        




    end function

