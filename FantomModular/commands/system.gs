FantomSystemShell = {}


FantomSystemShell.login = {}
FantomSystemShell.login.func = function(shell,args=null)
    if args == null then
        FantomNotify("Please specify a user an password.",true)
        return
    end if
    if args.len >=2 then
        sh = get_shell(args[0],args[1])
        if typeof(sh) == "shell" then
            sh.start_terminal
        else
            FantomNotify("Invalid login details.",true)
        end if
    else
        FantomNotify("Too little arguments.",true)
        return
    end if
end function


FantomSystemShell.commands = {}
FantomSystemShell.commands.func = function(shell,args=null)
    print("\n")
    print("<color=green>secure</color><color=#3f3e40>              - Secures your system</color>")
    print("<color=green>wifihack</color><color=#3f3e40>            - Automatically hack and connect to wifi</color>")
    print("<color=green>decipher</color><color=#3f3e40> [hash]     - Decipher a hash</color>")
    print("<color=green>selfesc</color><color=#3f3e40> [opt:extra] - local escalation</color>")
    print("<color=green>processlogger</color><color=#3f3e40>  - Logs when processes are open/closed</color>")
    print("<color=green>usegift</color><color=#3f3e40>  - Automatically connect to wifi in gift.txt</color>")
    print("<color=green>login</color><color=#3f3e40>  - Login as another user (no sudo binary required)</color>")

    print("\n<color=green>Misc commands.</color>\n")

    print("<color=green>finder</color><color=#3f3e40> [service] - Find NPC running x service </color>")
    print("\n")

end function


FantomSystemShell.secure = {}
FantomSystemShell.secure.func = function(shell,args=null)

    if active_user != "root" then
        FantomNotify("Fantom cannot ensure this command worked successfully without root access",true)
    else
        FantomNotify("Fantom has secured this machine")
    end if

    root = get_shell.host_computer.File("/")
    for folder in root.get_folders
        folder.chmod("o-wrx",1)
        folder.chmod("u-wr",1)
        folder.chmod("g-wr",1)
    end for
    for file in root.get_files
        file.chmod("o-wrx")
        file.chmod("u-wr")
        file.chmod("g-wr")
    end for
end function


FantomSystemShell.exit = {}
FantomSystemShell.exit.func = function(shell,args=null)
    exit("<color=green>Thanks for using Fantom</color>")
end function