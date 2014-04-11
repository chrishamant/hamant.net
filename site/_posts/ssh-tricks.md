---

layout: post
slug : ssh-tricks
title: SSH Port Forwarding Tricks
description: Some SSH Tricks
keywords: chris hamant,ssh,tricks,how to get fired
date : 2011-05-09

---

## ...that probably violate your company's security policy


[SSH](http://www.openssh.com/) is a very powerful tool that replaces the *beleaguered* (excellent word) telnet, rlogin and rsh family of tools (Don't know what these are? [here](http://lmgtfy.com/?q=telnet)). There are thousands of guides, HOWTOs, books, and wikis on which to find information about SSH.

Here are a few useful tips (that I always find useful) consolidated for your pleasure.

## Port Forwarding

Sometimes you need to access to a service or TCP port on a host you might not have direct access to, or it is behind a firewall of some kind.

### Access service behind firewall on remote host

For example, say you are running MongoDB - but have the port it is listening to blocked by local firewall (good idea). Your firewall is blocking everything but ports 80,443, and 22 (or another port you configured  SSH to listen on (another good idea)). How can you access your mongo instance? You could just ssh into the box itself and run your commands locally... but that isn't any fun. Mongodb listens by default on port 27017 - because of your firewall rules this port is only accessible from the 'l0' localhost interface (again- good idea). Assuming you have shell access on this remote machine, you could do something like this:

```sh
ssh -L 4321:localhost:27017 username@yourmongodb.host
```

What this command does is forward and requests made to ```localhost port#4321``` to ```port#27017``` on ```yourmongodb.host```. Note that in this case the 'localhost' is referring to the remote 'localhost' not your 'localhost'. This distinction is highlighted in the next example.

### Access a service 'through' the remote host

Another example. Say you really really can't wait for the new [Dr. Who](http://www.bbc.co.uk/doctorwho/dw) to air on delay on BBC America and you happen to have access to a machine located somewhere in the UK... My lawyers inform me that I should probably put disclaimer stating that I'm not advocating you bypass any geographical restrictions they place on their content - just an example.

```sh
ssh -L 4321:bbc.co.uk:80 username@yourmachine.com
```

This creates a tunnel from your local machine (port 4321) through ```yourmachine.com``` to ```bbc.co.uk``` (port 80). So if you make a request to ```localhost:4321``` this will be tunneled to ```bbc.co.uk```. The host ```bbc.co.uk``` will see the request as if it originated from ```yourmachine.com``` not your actual IP address. (note that due to way streaming work - this likely will not actually work to stream video from the BBC, although you might want to see ```-D``` below for other alternatives)

### Reverse port forwarding

This application is very similar to the above mentioned port forwarding exercises, but works in reverse.
For example, you have something running on site.com (which you can access via ssh) - but for some reason want to forward a service running on your local machine (web server on port 80 in this case).

```sh
ssh -R 80:localhost:4321 user@site.com
```

You can now access http://site.com:4321 and see the webserver running on your machine's port 80. (actually this won't work, a little more work is involved as the remote site will only forward this from localhost by default, not all network interfaces, [rtfm](http://www.openbsd.org/cgi-bin/man.cgi?query=ssh) - good for example though). Note that like -L, one could also use this in conjunction with yet another host.

## SOCKS Proxies

SSH also has a built-in socks5 proxy server.

```sh
ssh -D 4321 username@yourmachine.com
```

Will create a SOCKS5 proxy on localhost port #4321. This allows you to enter into your browser's (or whole machine's) proxy settings and point your OS's (or browser's) SOCKS proxy to localhost. This is useful for a variety of reasons... Similar to the 'Access a service through remote host' use case above - but on a broader scope as all requests will be forwarded through the remote host. This is also very good for protecting yourself at coffee shops and public wifi access points. Setup a server listening for SSH connections on port 443 (rare to find this blocked - and one would have to use [deep packet inspection](http://en.wikipedia.org/wiki/Deep_packet_inspection) to disambiguate the traffic) and you have the ability to create your own SOCKs proxy at will to help mitigate the threats of public wifi --- or is it just me that worries? I recommend setting up a <a title="note the blantant plugging of referral code" href="http://www.linode.com/?r=f62b30ace9d03e44b746a44c0aff0ca7740bda77">linode</a> just for that purpose.

All of these can be used in various combinations to bend TCP ports to your will.

Hope somebody finds it useful...
