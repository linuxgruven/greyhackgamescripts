FantomAMCShell = {}
amcmail = ""
amcpass = ""


FantomAMCShell.commands = {}
FantomAMCShell.commands.func = function(shell,args=null)
    print("\n")
    print("<color=green>amc-login</color><color=#3f3e40> [mail] [pass]           - Lets Fantom into your email (Required for AMC)</color>")
    print("<color=green>amc-list</color><color=#3f3e40>                          - List detected missions from email.</color>")
    print("<color=green>amc-do</color><color=#3f3e40> [id]                       - Do selected mission</color>")
    FantomNotify("AMC is still very much a WIP! expect bugs/crashes and use rentals.",true)
end function


FantomAMCShell["amc-login"] = {}
FantomAMCShell["amc-login"].func = function(shell,args=null)
    FantomNotify("For security reasons your login details are not stored. This means you will have to sign in again if you restart Fantom or it crashes.",true)
    if args.len >= 2 then
        amcmail = args[0]
        amcpass = args[1]
    else
        FantomNotify("Not enough arguments.",true)
        return
    end if
    mail = mail_login(amcmail,amcpass)
    if typeof(mail) == "string" then
        amcmail = ""
        amcpass = ""
        FantomNotify(mail,true)
        return
    end if
    FantomNotify("Successfully logged in.")
end function

FantomAMCShell.exit = {}
FantomAMCShell.exit.func = function(shell,args=null)
    shell.prefix = defaultPrefix
    shell.ct = FantomSystemShell
    shell.system = true
    FantomNotify("AMC shell exited.")
end function

FantomSharedCommands.amc = {}
FantomSharedCommands.amc.func = function(shell,args=null)
    FantomNotify("AMC shell started.")
    FantomNotify("Please type 'help for for more information.")
    shell.system = false
    shell.ct = FantomAMCShell
    shell.prefix = "<color=green>AMC > </color>"
end function

FantomSharedCommands["amc-list"] = {}
FantomSharedCommands["amc-list"].func = function(shell,args=null)

end function