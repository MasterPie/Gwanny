#!/usr/bin/python

import sys

from urllib2 import Request, urlopen, URLError


host = "https://mago.herokuapp.com/"
apps = {"2":"weather",
	"3":"emergency_sms",
	"4":"reminder",
	"5":"pizza",
	"6":"news",
	"7":"contacts",
	"8":"yo"
	}

msg_i = sys.argv[1]


request = Request(host + apps[msg_i])



try:
	response = urlopen(request)
	kittens = response.read()
	print kittens
except URLError, e:
    print 'No kittez. Got an error code:', e

