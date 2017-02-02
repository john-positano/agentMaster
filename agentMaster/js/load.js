var masteroverviewtabledata;
var overviewtabledata;
var sitetabledata;
var token;
var transreasondata;
var termreasondata;
var sitearray;
var startingpoint = 0;
var multiplier = 10;
var stoppingpoint = multiplier;
var pages;

function loadOverviewTable() 
{
	var tokenfinal = "Bearer " + token;
	$.ajax
	({
		url: apiroot + "employees",
		dataType: "json",
		method: "GET",
		headers: {
			"Authorization" : tokenfinal		
		}
	})
	.always
	(
		function(data, xhr)
		{
			if (xhr == "success")
			{
				overviewtabledata = data;
				masteroverviewtabledata = data;
				loopThroughOverviewData(overviewtabledata);
				paginate();
			}
			else
			{
				$("#myModal").modal("show");
			}
		}
	);
}

var deparmentdata;
var classdata;

function loadDepartments()
{
	$.ajax
	({
		url: "departments.php",
		dataType: "json",
		method: "GET"
	})
	.always
	(
		function(data)
		{
			departmentdata = data;

			for (var i in data)
			{
				var liid = "depli" + i;
				var liidhash = "#" + liid;
				var li = $("<li></li>",
				{
					"id" : liid,
					"role" : "presentation",
					"dep" : data[i]["Department"],
					"depid" : data[i]["ID"]
				});
				var aid = "depa" + i;
				var aidhash = "#" + aid;
				var a = $("<a></a>",
				{
					"id" : aid,
					"href" : "#",
					"role" : "presentation",
					"depid" : data[i]["ID"]
				});
				$("#depidmenu").append
				(
					li.on
					(
						"click",
							function()
							{
								$("#depidbutton").html($(this).attr("dep"));
								$("#depidbutton").attr("depid", $(this).attr("depid"));
							}
					)
				);
				$(liidhash).append(a);
				$(aidhash).html(data[i]["Department"]);
			}

		}
	);
}

function loadClasses()
{
	$.ajax
	({
		url: "classes.php",
		dataType: "json",
		method: "GET"
	})
	.always
	(
		function(data)
		{
			classdata = data;

			for (var i in data)
			{
				var liid = "classli" + i;
				var liidhash = "#" + liid;
				var li = $("<li></li>",
				{
					"id" : liid,
					"role" : "presentation",
					"class" : data[i]["Class"],
					"classid" : data[i]["ID"]
				});
				var aid = "classa" + i;
				var aidhash = "#" + aid;
				var a = $("<a></a>",
				{
					"id" : aid,
					"href" : "#",
					"role" : "presentation",
					"classid" : data[i]["ID"]
				});
				$("#classidmenu").append
				(
					li.on
					(
						"click",
							function()
							{
								$("#classidbutton").html($(this).attr("class"));
								$("#classidbutton").attr("classid", $(this).attr("classid"));
							}
					)
				);
				$(liidhash).append(a);
				$(aidhash).html(data[i]["Class"]);
			}

		}
	);
}

function loadOverviewTable2() 
{
	var tokenfinal = "Bearer " + token;
	$.ajax
	({
		url: "thefuckingtabledata.php",
		dataType: "json",
		method: "GET"
	})
	.always
	(
		function(data)
		{
			overviewtabledata = $.map(data, function(value, index) {
				return [value];
			});
			masteroverviewtabledata = overviewtabledata;
			loopThroughOverviewData(overviewtabledata);
			paginate();
		}
	);
}

function loadSiteIDs()
{
	var tokenfinal = "Bearer " + token;
	$.ajax
	({
		url: apiroot + "sites",
		dataType: "json",
		method: "GET",
		headers: {
			"Authorization" : tokenfinal
		}
	})
	.always
	(
		function(data)
		{
			var holdarray = [];
			for (var i in data)
			{
				holdarray[data[i]["SiteID"]] = $.trim(data[i]["Descrip"]);
			}
			sitearray = holdarray;
			sitetabledata = data;
			loopThroughSiteTableData(sitetabledata);
//			console.log(data);
		}
	);
}

var transferdata;

function loadTransReasons()
{
	var tokenfinal = "Bearer " + token;
	$.ajax
	({
		url: apiroot + "reasons/transfer",
		dataType: "json",
		method: "GET",
		headers: {
			"Authorization" : tokenfinal
		}
	})
	.always
	(
		function(data)
		{
			var holdarray = [];
			for (var i in data)
			{
				holdarray[data[i]["transid"]] = data[i]["transreason"];
			}
			transreasondata = holdarray;
			for (var i = 1; transreasondata[i]; i++)
			{
				var optid = "transopt" + i;
				var optidhash = "#" + optid;
				var opt = $("<option></option>",
				{
					"id" : optid,
					"transreasonid" : i
				});
				$("#transferreason").append
				(
					opt
					.html
					(
						transreasondata[i]
					)
				);
			}
			loadTransIDs(); 
		}
	);
}

$("#transfersubmit")
.on
(
	"click",
	function()
	{
		var tokenfinal = "Bearer " + token;
//        'agentid', 'transreasonid', 
//       'vzw', 'political', 'energy', 
//        'other', 'modifier'Heath
		var submitdata = {
			"agentid" : $(this).attr("agent"),
			"transreasonid" : $("#transferreason>option:selected").attr("transreasonid"),
			"modifier" : theuser,
			"vzw" : 0,
			"political" : 0,
			"energy" : "0",
			"other" : $("tr[agent=" + $("#transfersubmit").attr("agent") + "]>td[datum=dep]>span").attr("dep")	
		};
		console.log(submitdata);
		separatecall(newempdataholder, urllholder);
		$.ajax
		({
			url : apiroot + "transfers",
			method : "POST",
			data: submitdata,
			dataType : "json",
			headers: {
				"Authorization" : tokenfinal
			}
		})
		.always
		(
			function(data, xhr)
			{
				console.log(xhr);
				if (xhr == "success")
				{
					$("#myModal2").modal("hide");
				}
				else
				{
					$("#transerror").slideDown();
				}
			}
		);				
	}	
);

$("#terminationsubmit")
.on
(
	"click",
	function()
	{
		var tokenfinal = "Bearer " + token;
//['active', 'modifier', 'agentid', 'termreasonid']
		var submitdata = {
			"agentid" : $("#terminationsubmit").attr("agent"),
			"termreasonid" : $("#terminationreason>option:selected").attr("terminationreasonid"),
			"modifier" : theuser,
			"active" : $("tr[agent=" + $("#terminationsubmit").attr("agent") + "]>td[datum=active]>span").attr("active")	
		};
		var selectstr = "tr[agent=" + $("#terminationsubmit").attr("agent") + "]>td[datum=rate]>span";
		var rehire = $("#rehire>option:selected").attr("rehire")
		$(selectstr).attr("rehire", rehire);
		newempdataholder['rate'] = $(selectstr).attr("rehire");
		separatecall(newempdataholder, urllholder);
		$.ajax
		({
			url : apiroot + "tenures",
			method : "POST",
			data: submitdata,
			dataType : "json",
			headers: {
				"Authorization" : tokenfinal
			}
		})
		.always
		(
			function(data, xhr)
			{
				console.log(xhr);
				if (xhr == "success")
				{
					$("#myModal3").modal("hide");
				}
			}
		);				
	}	
);		

function loadTermReasons()
{
	var tokenfinal = "Bearer " + token;
	$.ajax
	({
		url: apiroot + "reasons/termination",
		dataType: "json",
		method: "GET",
		headers: {
			"Authorization" : tokenfinal
		}
	})
	.always
	(
		function(data)
		{
			var holdarray = [];
			holdarray[0] = "";
			for (var i in data)
			{
				holdarray[data[i]["termid"]] = data[i]["termreason"];
			}
			termreasondata = holdarray;
			for (var i = 1; termreasondata[i]; i++)
			{
				var optid = "termopt" + i;
				var optidhash = "#" + optid;
				var opt = $("<option></option>",
				{
					"id" : optid,
					"terminationreasonid" : i
				});
				$("#terminationreason").append
				(
					opt
					.html
					(
						termreasondata[i]
					)
				);
			}
			loadTermIDs(); 			
		}
	);
}

function loadTransIDs()
{
	var tokenfinal = "Bearer " + token;
	$.ajax
	({
		url: apiroot + "transfers",
		dataType: "json",
		method: "GET",
		headers: {
			"Authorization" : tokenfinal
		}
	})
	.always
	(
		function(data)
		{
			transferdata = data;
			loopThroughTransferData(transferdata);
			console.log(data);
		}
	);
}

function loadTermIDs()
{
	var tokenfinal = "Bearer " + token;
	$.ajax
	({
		url: apiroot + "tenures",
		dataType: "json",
		method: "GET",
		headers: {
			"Authorization" : tokenfinal
		}
	})
	.always
	(
		function(data)
		{
			termdata = data;
			loopThroughTermData(termdata);
			console.log(data);
		}
	);
}


$("#overviewtablehead").fadeIn();
loadOverviewTable();

var colNames = ['ID', 'Fname', 'MI', 'Lname', 'ssn', 'Suffix', 'Email', 'Address', 'Phone', 'Mobile', 'active', 'hireDate', 'rate', 'SiteID',  'dep', 'class', 'political', 'appleOne'];

var checkorx = ['×', '✓'];

function loopThroughOverviewData(data)
{
//	ws.emit('message', JSON.stringify({ "unlock" : $("[trtemp=yes]").attr("agentid") }));
	for (var i in data)
	{
		if (i > stoppingpoint || i < startingpoint)
		{
			continue;
		}
		else
		{
			var trid = "tr" + i;
			var tridhash = "#tr" + i;
			var tr = $("<tr></tr>",
			{
				"id" : trid,
				"agent" : data[i].ID,
				"rownum" : i,
				"class" : "mainrows"
				
			});
			$("#overviewtablebody").append(tr.css({ "display" : "none" }));
		
			for (var j = 0; colNames[j]; j++)
			{
				if (colNames[j] == "appleOne" || colNames[j] == "political")
				{
					continue;
				}
				var spanid = "spanr" + i + "c" + j;
				var spanidhash = "#spanr" + i + "c" + j;
				var span = $("<span></span>", {
					"id" : spanid,
					"rownum" : i
				});
				var tdid = "td" + j;
				var tdidhash = tridhash + ">#td" + j;
				var td = $("<td></td>",
				{
					"id" : tdid,
					"datum" : colNames[j],
					"cellnum" : j,
					"rownum" : i
				});
				$(tridhash).append(td);
	//			$(tdidhash).html(data[i][colNames[j]]);
				$(tdidhash).append(span);
				if (colNames[j] == "SiteID")
				{
					var jj = data[i]["SiteID"];
					if (sitearray)
					{
						$(spanidhash).html(sitearray[jj]);
					}
					$(spanidhash).attr("siteid", data[i]["SiteID"]);				
				}
				else if (colNames[j] == "dep")
				{
                    var depid = data[i]["Department"];
                    if (depid != 0 && depid != "0" && depid != null && depid != undefined)
                    {
                        var obj = departmentdata.find(function(a) { if (a.ID == depid) { return a["Department"]; } });
                        $(spanidhash).html(obj["Department"]);
                        $(spanidhash).attr("dep", data[i]["Department"]);
                    }
                    else
                    {
                        $(spanidhash).attr("dep", "0");
                    }
				}
				else if (colNames[j] == "class")
				{
                    var depid = data[i]["Class"];
                    if (depid != 0 && depid != "0" && depid != null && depid != undefined)
                    {
                        var obj = classdata.find(function(a) { if (a.ID == depid) { return a; } });
                        $(spanidhash).html(obj["Class"]);
                        $(spanidhash).attr("class", data[i]["Class"]);
                    }
                    else
                    {
                        $(spanidhash).attr("class", "0");
                    }
				}
				else if (colNames[j] == "active")
				{
						$(spanidhash).attr("active", data[i][colNames[j]]);
						$(spanidhash).html(checkorx[data[i][colNames[j]]]);					
				}
				else if (colNames[j] == "rate")
				{
						$(spanidhash).attr("rehire", data[i][colNames[j]]);
						$(spanidhash).html(checkorx[data[i][colNames[j]]]);
				}
				else
				{
					$(spanidhash).html(data[i][colNames[j]]);
				}
			}
		}
	}
	$(".blockrow").remove();
	trevent();
	$("tr").each
	( 
		function(i, el) 
		{ 
			$(this).show();
			var a = this;
			var top = $(this).position().top;
			var left = $(this).position().left;
			var width = $(this).width();
			var height = $(this).height();
			var agentid = $(this).attr("agent");
			$("span[agent]").each
			(
				function(i, el)
				{
					if ($(el).attr("agent") == agentid && $(el).attr("socket") != socketid)
					{
						$(a).off();
						$(a).css({ "opacity" : "0.4" });
						$(a).children().each( function() { 
							$(this).off(); 
						});
					}
				}
			);
		}
	);
//	trevent();
}

function loopThroughSiteTableData(data)
{
	for (var i in data)
	{
		var liid = "li" + i;
		var liidhash = "#" + liid;
		var li = $("<li></li>",
		{
			"id" : liid,
			"role" : "presentation",
			"site" : data[i]["Descrip"],
			"siteid" : data[i]["SiteID"]
		});
		var aid = "a" + i;
		var aidhash = "#" + aid;
		var a = $("<a></a>",
		{
			"id" : aid,
			"href" : "#",
			"role" : "presentation",
			"siteid" : data[i]["SiteID"]
		});
		$("#siteidmenu").append
		(
			li.on
			(
				"click",
				function()
				{
					$("#siteidbutton").html($(this).attr("site"));
					$("#siteidbutton").attr("siteid", $(this).attr("siteid"));
				}
			)
		);
		$(liidhash).append(a);
		$(aidhash).html(data[i]["Descrip"]);
	}
}

var transNames = ['id', 'modifier', 'agentid', 'vzw', 'political', 'energy', 'other', 'transreasonid', 'timestamp'];
var termNames = ['id', 'modifier', 'agentid', 'active', 'termreasonid', 'timestamp'];

function loopThroughTransferData(transferdata)
{
	for (var i in transferdata)
	{
		var trid = "transtr" + i;
		var tridhash = "#transtr" + i;
		var tr = $("<tr></tr>",
		{
			"id" : trid,
//			"transfer" : transferdata[i]['id'],
			"rownum" : i
		});
		$("#alterationtranstablebody").append(tr);
		
		for (var j = 0; transNames[j]; j++)
		{
			var spanid = "transspanr" + i + "c" + j;
			var spanidhash = "#transspanr" + i + "c" + j;
			var span = $("<span></span>", {
				"id" : spanid
			});
			var tdid = "transtd" + j;
			var tdidhash = tridhash + ">#transtd" + j;
			var td = $("<td></td>",
			{
				"id" : tdid,
				"datum" : transNames[j],
				"cellnum" : j
			});
			$(tridhash).append(td);
//			$(tdidhash).html(data[i][colNames[j]]);
			$(tdidhash).append(span);
			if (transNames[j] == "transreasonid")
			{
				var gg = transferdata[i][transNames[j]];
				$(spanidhash).html(transreasondata[gg]);				
			}
			else
			{
				$(spanidhash).html(transferdata[i][transNames[j]]);
			}
		}

	}
}

function loopThroughTermData(termdata)
{
	for (var i in termdata)
	{
		var trid = "termtr" + i;
		var tridhash = "#termtr" + i;
		var tr = $("<tr></tr>",
		{
			"id" : trid,
//			"transfer" : transferdata[i]['id'],
			"rownum" : i
		});
		$("#alterationtermtablebody").append(tr);
		
		for (var j = 0; termNames[j]; j++)
		{
			var spanid = "termspanr" + i + "c" + j;
			var spanidhash = "#termspanr" + i + "c" + j;
			var span = $("<span></span>", {
				"id" : spanid
			});
			var tdid = "termtd" + j;
			var tdidhash = tridhash + ">#termtd" + j;
			var td = $("<td></td>",
			{
				"id" : tdid,
				"datum" : termNames[j],
				"cellnum" : j
			});
			$(tridhash).append(td);
//			$(tdidhash).html(data[i][colNames[j]]);
			$(tdidhash).append(span);
			if (termNames[j] == "termreasonid")
			{
				var gg = termdata[i][termNames[j]];
				$(spanidhash).html(termreasondata[gg]);				
			}
			else
			{
				$(spanidhash).html(termdata[i][termNames[j]]);
			}
		}

	}
}

$(window).on
(
	"resize", 
	function()
	{
		$("[clone=yes]").fadeOut(600, "easeOutCirc", function() { $(this).remove(); });
	}
);

$("#middle").on
(
	"scroll", 
	function()
	{
		$("[clone=yes]").fadeOut(600, "easeOutCirc", function() { $(this).remove(); });
		$("#datediv").fadeOut(600, "easeOutCirc", function() { $(this).remove(); });
	}
);


$(".ddb").dropdown();

function setgender(a)
{
	$("#genderbutton").html($(a).attr("gender"));
}

$("#searchdropdown>li>a").on
(
	"click",
	function()
	{
		$("#searchinput").off();
		$("#searchinput").val("");
		$("#searchinput").attr("data-toggle", "");
		$("#searcherdropdown").html("");
		$("#searcherdropdown>li>a").off();
		$(".ui-datepicker-inline").remove();
		$("#searchdiv").removeClass("hasDatepicker");
 
		$("li.numeric").show();
		$("li.regex").hide();
		$("#likeorexactdropdownbutton").html("≈ <span class='caret'></span>");
		$("#likeorexactdropdownbutton").attr("likeorexact", "like");
		
		$("#searchdropdownbutton").html($(this).html());
		$("#searchdropdownbutton").attr("datum", $(this).attr("datum"))
		var condition = $("#searchdropdownbutton").attr("datum");
		if (condition == "Class")
		{
			$("#searchinput").attr("data-toggle", "dropdown");
			$("#searcherdropdown").html(createClassDropdown());
			$("#searcherdropdown>li>a").on("click", function() { $("#searchinput").val($(this).html()); });			
		}
		if (condition == "Department")
		{
			$("#searchinput").attr("data-toggle", "dropdown");
			$("#searcherdropdown").html(createDepartmentDropdown());
			$("#searcherdropdown>li>a").on("click", function() { $("#searchinput").val($(this).html()); });		
		}
		if (condition == "hireDate")
		{
			$("li.numeric").show();
			$("li.regex").hide();
			$("#likeorexactdropdownbutton").html("&lt; <span class='caret'></span>");
			$("#likeorexactdropdownbutton").attr("likeorexact", "less");
			
			$("#searchinput")
			.on
			(
				"keyup",
				function()
				{
					$(this).val("");
				}
			);			

			$("#searchinput").on
			(
				"click",
				function()
				{
					if (!$("#searchdiv").hasClass("hasDatepicker"))
					{
						$("#searchdiv").datepicker
						(
							{
								onSelect: 
								function(date) 
								{ 
									$("#searchinput").val(new Date(date).toISOString().slice(0, 10).replace('T', ' '));
									$(".ui-datepicker-inline").remove();
									$("#searchdiv").removeClass("hasDatepicker");		 
								},
								autoSize: true,
								showOptions: { direction: "up" },
								changeMonth: true,
								changeYear: true
							}
						)
						.on("changeDate", function(e) { console.log("a"); });
						$(".ui-datepicker-inline")
						.css
						({
							"width" : "92%",
							"position" : "absolute",
							"top" : ( ($(".ui-datepicker-inline").outerHeight() * -1) + "px" ),
							"z-index" : "20"
						});
					}
					else
					{
						$(".ui-datepicker-inline").remove();
						$("#searchdiv").removeClass("hasDatepicker");
					}
				}
			);

		}
	}
);

$("#searchbutton").on
(
	"click",
	function()
	{
		var searchdata =
		{
			"criterion" : $("#searchdropdownbutton").attr("datum"),
			"searchval" : $("#searchinput").val().replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, ''),
			"likeorexact" : $("#likeorexactdropdownbutton").attr("likeorexact")
		};
		$.ajax
		({
			url: "searchemp.php",
			dataType: "json",
			method: "GET",
			data: searchdata
		})
		.always
		(
			function(data)
			{
				overviewtabledata = $.map(data, function(value, index) {
					return [value];
				});
				masteroverviewtabledata = overviewtabledata;
				ws.emit('message', JSON.stringify({ "unlock" : $("[trtemp=yes]").attr("agentid") }));
				$("[trtemp=yes]").remove();
				$("[clone=yes]").remove();
				$("tbody>tr").remove();
				startingpoint = 0;
				stoppingpoint = multiplier;
				loopThroughOverviewData(overviewtabledata);
				paginate();
			}
		);
		$(".ui-datepicker-inline").remove();
		$("#searchdiv").removeClass("hasDatepicker");
	}
);

var msdn;
var startmouseposition;

function pauseEvent(e){
    if(e.stopPropagation) e.stopPropagation();
    if(e.preventDefault) e.preventDefault();
    e.cancelBubble=true;
    e.returnValue=false;
    return false;
}

$("#selectlist").scrollLeft(0);

function paginate()
{
	var pages = Math.ceil(overviewtabledata.length / multiplier);
	$("#selectlist").html("");
	for (var i = 1; i <= pages; i++)
	{
		var divid = "selectdiv" + i;
		var dividhash = "#" + divid;
		var div = $("<div></div>",
		{
			"id" : divid,
			"class" : "selectdiv"
		});
		$("#selectlist").append
		(
			div
			.html(i)
			.on
			(
				"mousedown",
				function(event)
				{
					pauseEvent(event);
					startmouseposition = event.clientX;
					msdn = true;
					$("div.selectdiv").stop();
					console.log("mousedown");
				}
			)
			.on
			(
				"dblclick",
				function(event)
				{
					ws.emit('message', JSON.stringify({ "unlock" : $("[trtemp=yes]").attr("agentid") }));
					$("div[trtemp=yes]").remove();
					startingpoint = (parseInt($(this).html()) - 1)  * multiplier;
					stoppingpoint = startingpoint + multiplier;
					$("tbody>tr").remove();
					loopThroughOverviewData(overviewtabledata);
					console.log(startingpoint + " " + stoppingpoint);
				}
			)
			.on
			(
				"mousemove",
				function(event)
				{
					if (msdn)
					{
						pauseEvent(event);
						var move = event.clientX - startmouseposition;
						startmouseposition = event.clientX;
						var movewhat = $("#selectlist").scrollLeft();
						var newscroll = (movewhat - move);
						$("#selectlist").scrollLeft(newscroll);
					}
				}
			)
			.on
			(
				"mouseup",
				function(event)
				{
					pauseEvent(event);
					msdn = false;
					var divided = Math.round($("#selectlist").scrollLeft() / 50);
					var newscroll = divided * 50;
					$("#selectlist").animate({ scrollLeft : newscroll }, 400, "easeOutExpo");
				}
			)	
		);
	}
}

$("#selectlist").on
(
	"mouseleave",
	function()
	{
		msdn = false;
		var divided = Math.round($("#selectlist").scrollLeft() / 50);
		var newscroll = divided * 50;
		$("#selectlist").animate({ scrollLeft : newscroll }, 400, "easeOutExpo");
	}
);

$("#aoverview").on("shown.bs.tab", function() {
	$("#overviewcontrols").show(); 
});
$("#aaddagent").on("shown.bs.tab", function() {
	$("#overviewcontrols").hide();
	$("#datediv").fadeOut(600, "easeOutCirc", function() { $(this).remove(); }); 
});
$("#hiredate").on
(
	"click",
	function()
	{
		if (!$("#hiredatediv").hasClass("hasDatepicker"))
		{
			$("#hiredatediv").datepicker
			(
				{
					onSelect: 
					function(date) 
					{ 
						$("#hiredate").val(new Date(date).toISOString().slice(0, 19).replace('T', ' '));
						$(".ui-datepicker-inline").remove();
						$("#hiredatediv").removeClass("hasDatepicker");								 
					},
					autoSize: true,
					showOptions: { direction: "up" },
					changeMonth: true,
					changeYear: true
				}
			);
			$(".ui-datepicker-inline")
			.css
			({
				"width" : "90%",
				"position" : "absolute",
				"top" : (-150 - $(".ui-datepicker-inline").outerHeight()) + "px",
				"z-index" : "20"
			});
		}
		else
		{
			$(".ui-datepicker-inline").remove();
			$("#hiredatediv").removeClass("hasDatepicker");
		}
	}
);
$("#hiredate").on("keyup", function() { $("#hiredate").val(""); });
$("#filterinput").on
(
	"click",
	() =>
	{
		showmenu()
	}
);

var deparray = 
{
	"VZW" : { "POL" : 0, "VZW" : 1 },
	"POL" : { "POL" : 1, "VZW" : 0 },
	"NONE" : { "POL" : 0, "VZW" : 0 },
	"BOTH" : { "POL" : 1, "VZW" : 1 }
};

function createDepartmentDropdown()
{
	var dropdownstr = "";
	for (var i in departmentdata)
	{
		dropdownstr += "<li><a href='#'>" + departmentdata[i]["Department"] + "</a></li>";
	}
	return dropdownstr;
}

function createClassDropdown()
{
	var dropdownstr = "";
	for (var i in classdata)
	{
		dropdownstr += "<li><a href='#'>" + classdata[i]["Class"] + "</a></li>";
	}
	return dropdownstr;
}
