
var ws = io(wsroot);

var cache;
var newemps;
var oldemps;

ws
.on(
	'message', 
	function(rawmessage)
	{
		process(rawmessage);
	}
);

function process(rawmessage)
{

	var message = JSON.parse(rawmessage);
	console.log(message);

/* ------------- message cache update -------------- */

	if (message.cache)
	{
		$("#logpanel").html("");
		for (var i in message.cache.userslogged)
		{
			if (message.cache.userslogged[i].empid != null)
			{
				var span = $("<span></span>",
				{
					"empid" : message.cache.userslogged[i].empid
				});
				$("#logpanel")
				.append
				(
					span
					.html
					(
						"¤ " + message.cache.userslogged[i].empid
					)
					.attr("agent", i)
					.attr("socket", i)
				);
				ii++;
			}					
		}
		console.log("it made it");
		$("#lockpanel").html("");
		var ii = 1;
		for (var i in message.cache.userslocked)
		{
			var span = $("<span></span>",
			{
				"empid" : i
			});
			$("#lockpanel")
			.append
			(
				span
				.html
				(
					"¤ " + i
				)
				.attr("agent", i)
				.attr("socket", message.cache.userslocked[i].lockedbysocket)
			);
			ii++;					
		}
	}

/* ---------------- employee update ----------------- */

	if (message.update)
	{
		console.log(message.update);
		if ($("tr[agent="  + message.update + "]")[0])
		{
			var tokenfinal = "Bearer " + token;
			$.ajax({
				url : apiroot + "employees/" + message.update,
				method: "GET",
				dataType : "json",
				headers : {
					"Authorization" : tokenfinal
				}
			}).always(
				(data, xhr, status) =>			
				{
					if (xhr != "success")
					{
					}
					else
					{

/* ---------------------------------- HOOOLY GODDDDD THE LAST MAJOR UPDATE ---------------------------------- */

						empdata = data;
						$("tr[agent=" + data['ID'] + "]>td[datum='Fname']>span").html(data['Fname']);
						$("tr[agent=" + data['ID'] + "]>td[datum='MI']>span").html(data['MI']);
						$("tr[agent=" + data['ID'] + "]>td[datum='Lname']>span").html(data['Lname']);
						$("tr[agent=" + data['ID'] + "]>td[datum='ssn']>span").html(data['ssn']);
						$("tr[agent=" + data['ID'] + "]>td[datum='Suffix']>span").html(data['Suffix']);
						$("tr[agent=" + data['ID'] + "]>td[datum='Email']>span").html(data['Email']);
						$("tr[agent=" + data['ID'] + "]>td[datum='Address']>span").html(data['Address']);
						$("tr[agent=" + data['ID'] + "]>td[datum='Phone']>span").html(data['Phone']);
						$("tr[agent=" + data['ID'] + "]>td[datum='Mobile']>span").html(data['Mobile']);
						$("tr[agent=" + data['ID'] + "]>td[datum='active']>span").html(checkorx[data['active']]);
						$("tr[agent=" + data['ID'] + "]>td[datum='active']>span").attr("active", data['active']);
						$("tr[agent=" + data['ID'] + "]>td[datum='hireDate']>span").html(data['hireDate']);
						$("tr[agent=" + data['ID'] + "]>td[datum='rate']>span").html(checkorx[data['rate']]);
						$("tr[agent=" + data['ID'] + "]>td[datum='rate']>span").attr("rate", data['rate']);
						$("tr[agent=" + data['ID'] + "]>td[datum='SiteID']>span").attr("siteid", data['SiteID']);
						$("tr[agent=" + data['ID'] + "]>td[datum='SiteID']>span").html(sitearray[data['SiteID']]);
						$("tr[agent=" + data['ID'] + "]>td[datum='dep']>span").attr("dep", data['Department']);
				        var depid = data["Department"];
				        if (depid != null && depid != 0 && depid != "0" && depid != undefined)
				        {
				            var obj = departmentdata.find(function(a) { if (a.ID == depid) { return a["department"]; } });
				            $("tr[agent=" + data['ID'] + "]>td[datum='dep']>span").html(obj['Department']);
				            $("tr[agent=" + data['ID'] + "]>td[datum='dep']>span").attr("dep", data[i]["Department"]);
				        }
				        else
				        {
				            $("tr[agent=" + data['ID'] + "]>td[datum='dep']>span").attr("dep", "0");
				        }
						$("#transfertemp").html("");
						$("#tenuretemp").html("");
						var agentid = data['ID'];
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////
						var tenuredata;
						var transferdata;
						$.ajax
						({
							method : "GET",
							dataType : "json",
							headers: {
								"Authorization" : tokenfinal
							},
							url : (apiroot + "employees/" + agentid + "/tenures")
						})
						.always
						(
							(data, xhr, status) =>
							{
								tenuredata = data;
								tenurestatus = status;
		///////////////////////////////////////////////////////////

								$("tr[agent=" + empdata['ID'] + "]>td[datum='class']>span").attr("class", message.updateinfo.classid );
								$("tr[agent=" + empdata['ID'] + "]>td[datum='class']>span").html( message.updateinfo.classname );						
		///////////////////////////////////////////////////////////
								$.ajax
								({
									method : "GET",
									dataType : "json",
									headers: {
										"Authorization" : tokenfinal
									},
									url : (apiroot + "employees/" + agentid + "/transfers")
								})
								.always
								(
									(data, xhr, status) =>
									{
										transferdata = data;
										transferstatus = status;
										console.log(transferdata);
										console.log(tenuredata);
										for (var i in transferdata)
										{
											var dep;
											if (transferdata[i]["other"] && transferdata[i]["other"] != 0)
											{
												dep = (departmentdata.find( (a) => { if (a.ID == transferdata[i]["other"] ) { return a; } })).Department;
											}
											else
											{
												dep = "Unspecified";
											}
											$("#transfertemp")
											.append
											(
												$("<tr></tr>")
												.append
												(
													"<td>" + dep + "</td>"
												+	"<td datepick agentid='" + transferdata[i]["agentid"] + "' transferid='" + transferdata[i]["id"] + "'>" + transferdata[i]["timestamp"] + "</td>"
												+	"<td>" + transreasondata[transferdata[i]["transreasonid"]] + "</td>"
												+	"<td>" + name(transferdata[i]["modifier"]) + "</td>"
												)
											);
										}
										for (var j in tenuredata)
										{
											$("#tenuretemp")
											.append
											(
												$("<tr></tr>")
												.append
												(
													"<td>" + check(tenuredata[j]["active"]) + "</td>"
												+	"<td datepick agentid='" + tenuredata[j]["agentid"] + "' tenureid='" + tenuredata[j]["id"] + "'>" + tenuredata[j]["timestamp"] + "</td>"
												+	"<td>" + termreasondata[tenuredata[j]["termreasonid"]] + "</td>"
												+	"<td>" + name(tenuredata[j]["modifier"]) + "</td>"							
												)
											);
										}
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
										console.log("buster");
										$("#trtemp>div>div>table>tbody>tr>td")
										.on
										(
											"click",
											function()
											{
												$("[clone=yes]").fadeOut(600, "easeOutCirc", function() { $(this).remove(); });
												$("#datediv").fadeOut(600, "easeOutCirc", function() { $(this).remove(); });
												$("#datediv").attr("id", "bla2");
												console.log("refresh click");
											}
										);
										$("#trtemp>div>div>table>tbody>tr>th")
										.on
										(
											"click",
											function()
											{
												$("[clone=yes]").fadeOut(600, "easeOutCirc", function() { $(this).remove(); });
												$("#datediv").fadeOut(600, "easeOutCirc", function() { $(this).remove(); });
												$("#datediv").attr("id", "bla2");
												console.log("refresh click");
											}
										);
										$("[datepick]")
										.on
										(
											"dblclick",
											function()
											{
												var row = $(this).parent().attr("rownum");
												var column = $(this).attr("cellnum");
												var agent = $(this).attr("agentid");
												console.log(agent);
												var left  = $(this).offset().left;
												var width = $(this).outerWidth();
												var height = $(this).outerHeight();
												var bgd = "#74a9d8";
												var heighttext = parseInt($(this).css("font-size")) * 2;
												var tenureOrTransfer;
												var tid;
												if ($(this).attr("tenureid") != undefined)
												{
													tenureOrTransfer = "tenure";
													tid = $(this).attr("tenureid");
												}
												if ($(this).attr("transferid") != undefined)
												{
													tenureOrTransfer = "transfer";
													tid = $(this).attr("transferid");
												}
												var padtop = height - (parseInt($(this).css("padding-top")) * 2) - $(this).children().eq(0).height();
												$("[clone=yes]").fadeOut(600, "easeOutCirc", function() { $(this).remove(); });
												$("#datediv").fadeOut(600, "easeOutCirc", function() { $(this).remove(); });
												$("#datediv").attr("id", "bla2");
												var input = $("<textarea></textarea>", {
													"class" : "expander",
													"disabled" : "true"
												});
												var top = $(this).offset().top;
												var html = $(this).html();
												input
													.val(html)
													.css({ "padding-top" : (padtop / 2) })
												;
												var btn = $("<button></button>", {
													"type" : "button",
													"class" : "btn btn-info clonebutton"
												});
												$("body").append($(this).clone()
													.attr("z-index", "10")
													.attr("clone", "yes")
													.attr("id", "temp")
													.attr("rownum", row)
													.attr("cellnum", column)
													.css({
														"position" : "absolute",
														"top" : top,
														"left" : left,
														"width" : width,
														"height" : height,
														"background-color" : bgd,
														"border-radius" : "5px",
														"text-align" : "center",
														"vertical-align" : "bottom",
														"padding-top" : ".5%",
														"padding-left" : ".9%",
														"padding-right" : ".9%",
														"padding-bottom" : ".5%",
														"font-size" : "1vw",
														"line-height" : "1.15em",
														"white-space" : "normal",
														"box-shadow" : "0 20px 30px #2d6a9f"
													})
													.animate({
														"top" : (top - (height / 2)),
														"left" : (left - (width / 2)),
														"width" : (width * 2),
														"height" : (height * 3),
														"font-size" : "2vw",
														"padding-top" : "1%",
														"padding-left" : "1.8%",
														"padding-right" : "1.8%",
														"padding-bottom" : "1%",
														"line-height" : "1.1em",
														"letter-spacing" : "-1px !important"
													}, 400, "easeOutExpo")
													.html("")
													.append(input
														.animate({
															"padding-top" : padtop
														}, 400, "easeOutExpo")
														.attr("id", "ta")
														.attr("rownum", row)
														.attr("cellnum", column)
													)
												);
												$("body").append(btn
													.css({
														"position" : "absolute",
														"top" : ((top - (height / 2)) - 30),
														"width" : "50px",
														"padding" : "0px",
														"margin" : "0px",
														"left" : ((left - (width / 2)) + (width - 25)),
														"display" : "none"
													})
													.attr("clone", "yes")
													.attr("tenureOrTransfer", tenureOrTransfer)
													.attr("tid", tid)
													.attr("agentid", agent)
													.html("SAVE")
													.fadeIn()
													.on("click",
														function()
														{
															savedate(this);			
														}
													)
												);
												$("body").append
												(
													$("<div></div>",
													{
														"id" : "datediv"
													})
													.css
													({
														"position" : "absolute",
														"top" : ((top - (height / 2)) + (height * 3) + 10),
														"width" : (width * 2),
														"padding" : "0px",
														"margin" : "0px",
														"background-color" : "rgb(195, 218, 238)",
														"border-radius" : "10px",
														"left" : (left - (width / 2)),
														"display" : "none"
													})
													.fadeIn()
												);					
												$("#datediv").datepicker
												(
													{
														onSelect: 
														function(date) 
														{ 
															$("#ta").val(new Date(date).toISOString().slice(0, 19).replace('T', ' ')); 
														},
														changeMonth: true,
														changeYear: true
													}
												);
											}
										);
		/////////////////////////////////////////////////////////////////////////////////////////////////
									}
								);
							}
						);


					}
				}
			);
		}
		else
		{
			console.log("no update to make");
		}	
	}

	if (message.socketid)
	{
		socketid = message.socketid;
	}

	if (message.lock)
	{
		$("tr[agent=" + message.lock + "]").off();
		$("tr[agent=" + message.lock + "]").animate({ "opacity" : "0.4" }, 1500, "easeOutExpo");
		$("tr[agent=" + message.lock + "]")
		.children()
		.each
		(
			function()
			{
				$(this).off();
				
			}
		);
	}

	if (message.unlock)
	{
		trevent();
		$("tr[agent=" + message.unlock + "]").animate({ "opacity" : "1" }, 1500, "easeOutExpo");
	}

	if (message.check)
	{
		if (theuser != null && theuser != undefined)
		{
			ws.emit('message', JSON.stringify({"login" : theuser}));
		}
	}

}

function whatsnew(older, newer)
{
	console.log('whatsnew fired');
	thenew = [];
	for (var i in newer.userslogged)
	{
		var isitinthere = "no";
		for (var j in older.userslogged)
		{
			if (j == i && older.userslogged[j].empid != null)
			{
				isitinthere = "yes";
				break;
			}
		}
		if (isitinthere == "no" && newer.userslogged[i].empid != null)
		{
			thenew[i] = {"empid" : newer.userslogged[i].empid };
		}
	}
	return thenew;
}

function whatsold(older, newer)
{
	console.log('whatsold fired');
	theold = [];
	for (var i in older.userslogged)
	{
		var isitinthere = "no";
		for (var j in newer.userslogged)
		{
			if (i == j && older.userslogged[i].empid != null)
			{
				isitinthere = "yes";
				break;
			}
		}
		if (isitinthere == "no" && older.userslogged[i].empid != null)
		{
			theold[i] = {"empid" : older.userslogged[i].empid};
		}
	}
	return theold;
}
