"use strict";

//var WS = require('ws').Server;
//var ws = new WS({ port: 10001 });

var ws = require('socket.io')(10001);
var uuid = require('uuid');
var cache = 
{ 
	"userslogged" : {}, 
	"userslocked" : {} 
};

class User
{
	constructor()
	{
		this.empid = null;
	}
}

ws
.on
(
	"connection",
	function(socket)
	{
		var newid = uuid.v4();
		socket.uuid = newid;
		cache.userslogged[newid] = new User();

		socket.send(JSON.stringify({"check" : "check"}));

		socket
		.on
		(
			"disconnect",
			function()
			{
				for (var i in cache.userslocked)
				{
					if (cache.userslocked[i].lockedbysocket == socket.uuid)
					{
						delete cache.userslocked[i];
						ws.emit('message', JSON.stringify({"unlock": i}));
					}
				}
				delete cache.userslogged[socket.uuid];
//				ws
//				.clients
//				.forEach
//				(
//					(client) =>
//					{
//						client.send(JSON.stringify(cache));
//					}
//				);
					
				ws.emit('message', JSON.stringify({"cache": cache}));
			}
		);

		socket
		.on
		(
			"message",
			function(message)
			{
				try
				{
					JSON.parse(message);
				}
				catch (e)
				{
					console.log(e);
					return;
				}
				if ( (JSON.parse(message)).login )
				{
					login(message, this);
				}
				if ( (JSON.parse(message)).lock )
				{
					lock(message, this);
				}
				if ( (JSON.parse(message)).unlock )
				{
					unlock(message, this);
				}
				if ( (JSON.parse(message)).update )
				{
					update(message, this);
				}
//				console.log(cache.userslogged);
//				console.log(JSON.parse(message));
			}
		);

		console.log(cache.userslogged);
	}
);

ws.on('message', function(message) { console.log(message); });

function login(msg, t)
{
	var m = JSON.parse(msg);
	var error;
	for (var i in cache.userslogged)
	{
		if (cache.userslogged[i].empid == m.login)
		{
			error = JSON.stringify({"loginresult": "ALREADY"});
		}
	}
	if (!error)
	{
		if (cache.userslogged[t.uuid].empid == null)
		{
			cache.userslogged[t.uuid].empid = m.login;
//			ws
//			.clients
//			.forEach
//			(
//				(client) =>
//				{
//					client.send(JSON.stringify(cache));
//				}
//			);
			t.send(JSON.stringify({"loginresult": "SUCCESS"}));
			ws.emit('message', JSON.stringify({"cache": cache}));
		}
	}
	else
	{
		cache.userslogged[t.uuid].empid = m.login;
		t.send(error);
		ws.emit('message', JSON.stringify({"cache": cache}));		
	}
	t.send(JSON.stringify({ "socketid": t.uuid }));
}

function lock(msg, t)
{
	var m = JSON.parse(msg);
	var error;
	for (var i in cache.userslocked)
	{
		if (i == m.lock)
		{
			var error = JSON.stringify({"lockerror": "ALREADY"});
			console.log(m);
			console.log(cache);
		}
		if (cache.userslocked[i])
		{
		 	if (cache.userslocked[i].lockedbysocket == t.uuid && i != m.lock)
			{
				t.broadcast.send(JSON.stringify({"unlock" : i }));
				delete cache.userslocked[i];
			}
		}
	}
	if (!error)
	{
		cache.userslocked[m.lock] = {"lockedby" : cache.userslogged[t.uuid].empid, "lockedbysocket" : t.uuid };
//		ws
//		.clients
//		.forEach
//		(
//			(client) =>
//			{
//				client.send(JSON.stringify(cache));
//			}
//		);
		ws.emit('message', JSON.stringify({"cache": cache}));
	}
	else
	{
		t.send(error);
	}
	t.broadcast.send(JSON.stringify({"lock" : m.lock}));
}

function unlock(msg, t)
{
	var m = JSON.parse(msg);
	var error = {"lockerror": "NOTFOUND"};
	for (var i in cache.userslocked)
	{
		if (i == m.unlock && cache.userslocked[i].lockedbysocket == t.uuid)
		{
			delete cache.userslocked[i];
			error = undefined;
		}
	}
	if (!error)
	{
//		ws
//		.clients
//		.forEach
//		(
//			(client) =>
//			{
//				client.send(JSON.stringify(cache));
//			}
//		);
		ws.emit('message', JSON.stringify({"cache": cache}));
	}
	else
	{
		t.send(JSON.stringify(error));
	}
	t.broadcast.send(JSON.stringify({"unlock" : m.unlock}));
}

function update(m, t)
{
	t.broadcast.send(m);
}

