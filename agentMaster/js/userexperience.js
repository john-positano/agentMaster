var theuser;

var scrollbar = $("<div></div>",
{
	"id" : "scrolldiv"
});
scrollbar.css
({
	"background-color" : "#74a9d8",
	"border-radius" : "10px",
	"width" : "30px",
	"box-shadow" : "0 5px 10px lightgrey"
});

var scrollbutton = $("<div></div>",
{
	"id" : "scrollbutton"
});
scrollbutton.css
({
	"background-color" : "white",
	"border-radius" : "10px",
	"width" : "30px",
	"height" : "30px",
	"box-shadow" : "0 5px 10px #d7e6f4;"
});

function fadeback(a)
{
	if ($(a).attr("rownum") % 2 === 0)
	{
		$(a).children().each( function(i, el)
		{
			$(this).stop();
			$(this).animate({ "background-color" : "#c3daee" }, 600, "easeOutCirc");
		});
	}
	else
	{
		$(a).children().each( function(i, el)
		{
			$(this).stop();
			$(this).animate({ "background-color" : "transparent" }, 600, "easeOutCirc");
		});
	}
}

var para;

function trevent() 
{


	$("tbody>tr").off();
	$("#overviewtablebody>tr>td").off();
	$("tbody>tr>td").off();


	$("tbody>tr").on("mouseover", function()
	{
		$(this).children().each( function()
		{
			$(this).stop();
			$(this).animate({ "background-color" : "#74a9d8" }, 200, "easeOutCirc");
		});
	});
	$("tbody>tr").on("mouseout", function()
	{
		fadeback(this);
	});
	$("#overviewtablebody>tr>td").on
	(
		"click",
		(event) =>
		{
			insertrow(event);
		}
	);
	$("#overviewtablebody>tr>td").on("dblclick", function()
	{	
		console.log($(this).parent().attr("agent"));
//		ws.emit('message', JSON.stringify({ "lock" : $(this).parent().attr("agent") });
		if 
		(
			$(this).attr("datum") != "SiteID" 
		 && $(this).attr("datum") != "dep" 
		 && $(this).attr("datum") != "hireDate"
		 && $(this).attr("datum") != "rate"
		 && $(this).attr("datum") != "active"
		 && $(this).attr("datum") != "class"
		)
		{
			var row = $(this).parent().attr("rownum");
			var column = $(this).attr("cellnum");
			var agent = $(this).parent().attr("agent");
			console.log(agent);
			var left  = $(this).offset().left;
			var width = $(this).outerWidth();
			var height = $(this).outerHeight();
			var bgd = $(this).css("background-color");
			var heighttext = parseInt($(this).css("font-size")) * 2;
			var padtop = height - (parseInt($(this).css("padding-top")) * 2) - $(this).children().eq(0).height();
			$("[clone=yes]").fadeOut(600, "easeOutCirc", function() { $(this).remove(); });
			var input = $("<textarea></textarea>", {
				"class" : "expander"
			});
			var top = $(this).offset().top;
			var html = $(this).children().eq(0).html();
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
					"height" : (height * 2),
					"font-size" : "2vw",
					"padding-top" : "1%",
					"padding-left" : "1.8%",
					"padding-right" : "1.8%",
					"padding-bottom" : "1%",
					"line-height" : "1.1em",
					"letter-spacing" : "-1px !important"
				}, 400, "easeOutExpo"
				)
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
					"top" : ((top - (height / 2)) + (height * 2) + 10),
					"width" : "50px",
					"padding" : "0px",
					"margin" : "0px",
					"left" : ((left - (width / 2)) + (width - 25)),
					"display" : "none"
				})
				.attr("clone", "yes")
				.attr("agent", agent)
				.html("SAVE")
				.fadeIn()
				.on("click",
					function()
					{
						saveagentdata(this);			
					}
				)
			);
			$("#ta").focus();
		}
		else
		{
			if ($(this).attr("datum") == "SiteID")
			{
				var row = $(this).parent().attr("rownum");
				var column = $(this).attr("cellnum");
				var agent = $(this).parent().attr("agent");
				console.log(agent);
				var left  = $(this).offset().left;
				var width = $(this).outerWidth();
				var height = $(this).outerHeight();
				var bgd = $(this).css("background-color");
				var heighttext = parseInt($(this).css("font-size")) * 2;
				var padtop = height - (parseInt($(this).css("padding-top")) * 2) - $(this).children().eq(0).height();
				$("[clone=yes]").fadeOut(600, "easeOutCirc", function() { $(this).remove(); });
				var input = $("<textarea></textarea>", {
					"class" : "expander",
					"disabled" : "true"
				});
				var top = $(this).offset().top;
				var html = $(this).children().eq(0).html();
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
						"height" : (height * 2),
						"font-size" : "2vw",
						"padding-top" : "1%",
						"padding-left" : "1.8%",
						"padding-right" : "1.8%",
						"padding-bottom" : "1%",
						"line-height" : "1.1em",
						"letter-spacing" : "-1px !important"
					}, 400, "easeOutExpo"
					)
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
					.attr("agent", agent)
					.html("SAVE")
					.fadeIn()
					.on("click",
						function()
						{
							saveagentdata(this);			
						}
					)
				);
				$("body").append
				(
					$("#siteidmenu")
						.clone()
						.attr("clone", "yes")
						.attr("id", "sitedropdownclone")
						.removeClass("ddm2")
						.css
						({
							"position" : "absolute",
							"top" : ((top - (height / 2)) + (height * 2) + 10),	
							"left" : (left - (width / 2)),
							"display" : "inline",
							"width" : (width * 2),
							"height" : "156px",
							"overflow-x" : "hidden",
							"overflow-y" : "scroll"
						})
				);
				$("#sitedropdownclone>li>a").on
				(
					"click",
					function()
					{
						$("#ta").val($(this).html());
						$("#ta").attr("siteid", $(this).attr("siteid"));
					}
				);
				$("#ta").focus();
			}
//////////////////////////////////////////////////////////////////// DEP
			else if ($(this).attr("datum") == "dep")
			{
				var row = $(this).parent().attr("rownum");
				var column = $(this).attr("cellnum");
				var agent = $(this).parent().attr("agent");
				console.log(agent);
				var left  = $(this).offset().left;
				var width = $(this).outerWidth();
				var height = $(this).outerHeight();
				var bgd = $(this).css("background-color");
				var heighttext = parseInt($(this).css("font-size")) * 2;
				var padtop = height - (parseInt($(this).css("padding-top")) * 2) - $(this).children().eq(0).height();
				$("[clone=yes]").fadeOut(600, "easeOutCirc", function() { $(this).remove(); });
				var input = $("<textarea></textarea>", {
					"class" : "expander",
					"disabled" : "true"
				});
				var top = $(this).offset().top;
				var html = $(this).children().eq(0).html();
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
						"height" : (height * 2),
						"font-size" : "2vw",
						"padding-top" : "1%",
						"padding-left" : "1.8%",
						"padding-right" : "1.8%",
						"padding-bottom" : "1%",
						"line-height" : "1.1em",
						"letter-spacing" : "-1px !important"
					}, 400, "easeOutExpo"
					)
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
					.attr("agent", agent)
					.html("SAVE")
					.fadeIn()
					.on("click",
						function()
						{
							saveagentdata(this);			
						}
					)
				);
				$("body").append
				(
					$(
						"<ul class='dropdown-menu ddm2' role='menu'>"
					+   "</ul>"
					)
					.attr("clone", "yes")
					.attr("id", "sitedropdownclone")
					.removeClass("ddm2")
					.css
					({
						"position" : "absolute",
						"top" : ((top - (height / 2)) + (height * 2) + 10),	
						"left" : (left - (width / 2)),
						"display" : "inline",
						"width" : (width * 2),
						"height" : "156px",
						"overflow-x" : "hidden",
						"overflow-y" : "scroll"
					})
				);
                for (var i in departmentdata)
                {
                    var li = $("<li></li>",
                              {
                                  "role" : "presentation"
                              });
                    var a = $("<a></a>",
                             {
                                 "href" : "#",
                                 "role" : "presentation",
                                 "department" : departmentdata[i]["ID"]
                             });
                    $("#sitedropdownclone").append(li.append(a.html(departmentdata[i]["Department"])));
                }
				$("#sitedropdownclone>li>a").on
				(
					"click",
					function()
					{
						$("#ta").val($(this).html());
						$("#ta").attr("dep", $(this).attr("department"));
					}
				);
				$("#ta").focus();
			}
//////////////////////////////////////////////////////////////////////////////// CLASS
			else if ($(this).attr("datum") == "class")
			{
				var row = $(this).parent().attr("rownum");
				var column = $(this).attr("cellnum");
				var agent = $(this).parent().attr("agent");
				console.log(agent);
				var left  = $(this).offset().left;
				var width = $(this).outerWidth();
				var height = $(this).outerHeight();
				var bgd = $(this).css("background-color");
				var heighttext = parseInt($(this).css("font-size")) * 2;
				var padtop = height - (parseInt($(this).css("padding-top")) * 2) - $(this).children().eq(0).height();
				$("[clone=yes]").fadeOut(600, "easeOutCirc", function() { $(this).remove(); });
				var input = $("<textarea></textarea>", {
					"class" : "expander",
					"disabled" : "true"
				});
				var top = $(this).offset().top;
				var html = $(this).children().eq(0).html();
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
						"height" : (height * 2),
						"font-size" : "2vw",
						"padding-top" : "1%",
						"padding-left" : "1.8%",
						"padding-right" : "1.8%",
						"padding-bottom" : "1%",
						"line-height" : "1.1em",
						"letter-spacing" : "-1px !important"
					}, 400, "easeOutExpo"
					)
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
					.attr("agent", agent)
					.html("SAVE")
					.fadeIn()
					.on("click",
						function()
						{
							saveagentdata(this);			
						}
					)
				);
				$("body").append
				(
					$(
						"<ul class='dropdown-menu ddm2' role='menu'>"
					+   "</ul>"
					)
					.attr("clone", "yes")
					.attr("id", "sitedropdownclone")
					.removeClass("ddm2")
					.css
					({
						"position" : "absolute",
						"top" : ((top - (height / 2)) + (height * 2) + 10),	
						"left" : (left - (width / 2)),
						"display" : "inline",
						"width" : (width * 2),
						"height" : "156px",
						"overflow-x" : "hidden",
						"overflow-y" : "scroll"
					})
				);
                for (var i in classdata)
                {
                    var li = $("<li></li>",
                              {
                                  "role" : "presentation"
                              });
                    var a = $("<a></a>",
                             {
                                 "href" : "#",
                                 "role" : "presentation",
                                 "class" : classdata[i]["ID"]
                             });
                    $("#sitedropdownclone").append(li.append(a.html(classdata[i]["Class"])));
                }
				$("#sitedropdownclone>li>a").on
				(
					"click",
					function()
					{
						$("#ta").val($(this).html());
						$("#ta").attr("class", $(this).attr("class"));
					}
				);
				$("#ta").focus();
			}
			else if ($(this).attr("datum") == "hireDate")
			{
				var row = $(this).parent().attr("rownum");
				var column = $(this).attr("cellnum");
				var agent = $(this).parent().attr("agent");
				console.log(agent);
				var left  = $(this).offset().left;
				var width = $(this).outerWidth();
				var height = $(this).outerHeight();
				var bgd = $(this).css("background-color");
				var heighttext = parseInt($(this).css("font-size")) * 2;
				var padtop = height - (parseInt($(this).css("padding-top")) * 2) - $(this).children().eq(0).height();
				$("[clone=yes]").fadeOut(600, "easeOutCirc", function() { $(this).remove(); });
				$("#datediv").fadeOut(600, "easeOutCirc", function() { $(this).remove(); });
				$("#datediv").attr("id", "bla2");
				var input = $("<textarea></textarea>", {
					"class" : "expander",
					"disabled" : "true"
				});
				var top = $(this).offset().top;
				var html = $(this).children().eq(0).html();
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
						"height" : (height * 2),
						"font-size" : "2vw",
						"padding-top" : "1%",
						"padding-left" : "1.8%",
						"padding-right" : "1.8%",
						"padding-bottom" : "1%",
						"line-height" : "1.1em",
						"letter-spacing" : "-1px !important"
					}, 400, "easeOutExpo"
					)
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
					.attr("agent", agent)
					.html("SAVE")
					.fadeIn()
					.on("click",
						function()
						{
							saveagentdata(this);			
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
						"top" : ((top - (height / 2)) + (height * 2) + 10),
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
			else if ($(this).attr("datum") == "active")
			{
				var row = $(this).parent().attr("rownum");
				var column = $(this).attr("cellnum");
				var agent = $(this).parent().attr("agent");
				console.log(agent);
				var left  = $(this).offset().left;
				var width = $(this).outerWidth();
				var height = $(this).outerHeight();
				var bgd = $(this).css("background-color");
				var heighttext = parseInt($(this).css("font-size")) * 2;
				var padtop = height - (parseInt($(this).css("padding-top")) * 2) - $(this).children().eq(0).height();
				$("[clone=yes]").fadeOut(600, "easeOutCirc", function() { $(this).remove(); });
				var input = $("<textarea></textarea>", {
					"class" : "expander",
					"disabled" : "true"
				});
				var top = $(this).offset().top;
				var html = $(this).children().eq(0).html();
				input
					.val(html)
					.attr("disabled", "true")
					.attr("active", $(this).attr("active"))
					.css({ "padding-top" : (padtop / 2) })
				;
				var btn = $("<button></button>", {
					"type" : "button",
					"class" : "btn btn-info clonebutton"
				});
				var btn2 = $("<button></button>", {
					"type" : "button",
					"class" : "btn btn-info clonebutton"
				});
				var btn3 = $("<button></button>", {
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
						"font-size" : "30px",
						"line-height" : "1.15em",
						"white-space" : "normal",
						"box-shadow" : "0 0px 30px #2d6a9f"
					})
					.animate({
						"top" : (top - (height / 2)),
						"left" : (left - (width / 2)),
						"width" : (width * 2),
						"height" : (height * 2),
						"font-size" : "60px",
						"padding-top" : "1%",
						"padding-left" : "1.8%",
						"padding-right" : "1.8%",
						"padding-bottom" : "1%",
						"line-height" : "1.1em",
						"letter-spacing" : "-1px !important"
					}, 400, "easeOutExpo"
					)
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
						"display" : "none",
						"box-shadow" : "0 -5px 30px #2d6a9f",
						"z-index" : "20 !important"
					})
					.attr("clone", "yes")
					.attr("agent", agent)
					.html("SAVE")
					.fadeIn()
					.on("click",
						function()
						{
							saveagentdata(this);			
						}
					)
				);
				$("body").append(btn2
					.css({
						"position" : "absolute",
						"top" : ((top - (height / 2)) + (height * 2) + 10),
						"width" : width,
						"height" : width,
						"padding" : "0px",
						"font-size" : "30px",
						"margin" : "0px",
						"left" : left - (width / 2),
						"display" : "none",
						"box-shadow" : "-10px 10px 30px #2d6a9f",
						"z-index" : "20 !important"
					})
					.attr("clone", "yes")
					.attr("agent", agent)
					.html("&#10003;")
					.fadeIn()
					.on("click",
						function()
						{
							$("#ta").val("✓");
							$("#ta").attr("active", "1");			
						}
					)
				);
				$("body").append(btn3
					.css({
						"position" : "absolute",
						"top" : ((top - (height / 2)) + (height * 2) + 10),
						"width" : width,
						"height" : width,
						"padding" : "0px",
						"font-size" : "30px",
						"margin" : "0px",
						"left" : left + (width / 2),
						"display" : "none",
						"box-shadow" : "10px 10px 30px #2d6a9f",
						"z-index" : "20 !important"
					})
					.attr("clone", "yes")
					.attr("agent", agent)
					.html("&times;")
					.fadeIn()
					.on("click",
						function()
						{
							$("#ta").val("×");
							$("#ta").attr("active", "0");			
						}
					)
				);
			}
			else if ($(this).attr("datum") == "rate")
			{
				var row = $(this).parent().attr("rownum");
				var column = $(this).attr("cellnum");
				var agent = $(this).parent().attr("agent");
				console.log(agent);
				var left  = $(this).offset().left;
				var width = $(this).outerWidth();
				var height = $(this).outerHeight();
				var bgd = $(this).css("background-color");
				var heighttext = parseInt($(this).css("font-size")) * 2;
				var padtop = height - (parseInt($(this).css("padding-top")) * 2) - $(this).children().eq(0).height();
				$("[clone=yes]").fadeOut(600, "easeOutCirc", function() { $(this).remove(); });
				var input = $("<textarea></textarea>", {
					"class" : "expander",
					"disabled" : "true"
				});
				var top = $(this).offset().top;
				var html = $(this).children().eq(0).html();
				input
					.val(html)
					.attr("disabled", "true")
					.attr("rehire", $(this).attr("rehire"))
					.css({ "padding-top" : (padtop / 2) })
				;
				var btn = $("<button></button>", {
					"type" : "button",
					"class" : "btn btn-info clonebutton"
				});
				var btn2 = $("<button></button>", {
					"type" : "button",
					"class" : "btn btn-info clonebutton"
				});
				var btn3 = $("<button></button>", {
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
						"font-size" : "30px",
						"line-height" : "1.15em",
						"white-space" : "normal",
						"box-shadow" : "0 20px 30px #2d6a9f"
					})
					.animate({
						"top" : (top - (height / 2)),
						"left" : (left - (width / 2)),
						"width" : (width * 2),
						"height" : (height * 2),
						"font-size" : "60px",
						"padding-top" : "1%",
						"padding-left" : "1.8%",
						"padding-right" : "1.8%",
						"padding-bottom" : "1%",
						"line-height" : "1.1em",
						"letter-spacing" : "-1px !important"
					}, 400, "easeOutExpo"
					)
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
					.attr("agent", agent)
					.html("SAVE")
					.fadeIn()
					.on("click",
						function()
						{
							saveagentdata(this);			
						}
					)
				);
				$("body").append(btn2
					.css({
						"position" : "absolute",
						"top" : ((top - (height / 2)) + (height * 2) + 10),
						"width" : width,
						"height" : width,
						"padding" : "0px",
						"font-size" : "30px",
						"margin" : "0px",
						"left" : left - (width / 2),
						"display" : "none"
					})
					.attr("clone", "yes")
					.attr("agent", agent)
					.html("&#10003;")
					.fadeIn()
					.on("click",
						function()
						{
							$("#ta").val("✓");
							$("#ta").attr("rehire", "1");			
						}
					)
				);
				$("body").append(btn3
					.css({
						"position" : "absolute",
						"top" : ((top - (height / 2)) + (height * 2) + 10),
						"width" : width,
						"height" : width,
						"padding" : "0px",
						"font-size" : "30px",
						"margin" : "0px",
						"left" : left + (width / 2),
						"display" : "none"
					})
					.attr("clone", "yes")
					.attr("agent", agent)
					.html("&times;")
					.fadeIn()
					.on("click",
						function()
						{
							$("#ta").val("×");
							$("#ta").attr("rehire", "0");			
						}
					)
				);
			}
		}
	});
	$("tbody>tr>td").on("click", function()
	{
		$("[clone=yes]").attr("id", "bla").fadeOut(600, "easeOutCirc", function() { $(this).remove(); });
		$("#datediv").fadeOut(600, "easeOutCirc", function() { $(this).remove(); });
		$("#datediv").attr("id", "bla2");
	});
}

$("#activebutton").on("click",
	function()
	{
		switch($(this).html())
		{
			case "Active":
				$(this).html("Not Active");
				break;
			case "Not Active":
				$(this).html("Active");
				break;
		}
	}
);

$("#vzwbutton").on("click",
	function()
	{
		switch($(this).html())
		{
			case "Not VZW":
				$(this).html("VZW");
				break;
			case "VZW":
				$(this).html("Not VZW");
				break;
		}
	}
);

$("#polbutton").on("click",
	function()
	{
		switch($(this).html())
		{
			case "POL":
				$(this).html("Not POL");
				break;
			case "Not POL":
				$(this).html("POL");
				break;
		}
	}
);

$(".nav-tabs a").on("show.bs.tab", function()
{
	$("[clone=yes]").fadeOut(600, "easeOutCirc", function() { $(this).remove(); });
	$("#datediv").fadeOut(600, "easeOutCirc", function() { $(this).remove(); });
	$("#datediv").attr("id", "bla2");
});

//$("body").on("mousewheel", function(event) { console.log(event.originalEvent.wheelDelta); });

$("#sitedropdown").on
(
	"shown.bs.dropdown",
	function()
	{
		var s = $("#siteidmenu");
		var h = s.outerHeight();
		var w = s.outerWidth();
		var t = s.parent().parent().position().top - 270;
		var l = s.offset().left;
		var left = l + w + 5;
		$("#middle").append
		(
			scrollbar
			.css
			({
				"position" : "absolute",
				"height" : h,
				"top" : t,
				"left" : left
			})
			.append
			(
				scrollbutton
				.draggable
				({
					axis: "y",
					containment: "#scrolldiv"
				})
				.on
				(
					"drag",
					function()
					{
						$("#siteidmenu")
						.scrollTop
						(
							(($(this).position().top / $("#scrolldiv").outerHeight()) * 3.75 * $("#siteidmenu").outerHeight())
						)
					}
				)
			)
		);
	}
);

$("#scrolldiv").on
(
	"focus",
	function(event)
	{
		$("#depidmenu").show();
	}
);

$("#sitedropdown").on
(
	"hide.bs.dropdown",
	function()
	{
		$("body").find("#scrolldiv").remove();
		scrollbutton.css({ "top" : "0px" });
	}
);

/////////////////////////////////////////////////////////////////////////////////////////////////

$("#depdropdown").on
(
	"shown.bs.dropdown",
	function()
	{
		var s = $("#depidmenu");
		var h = s.outerHeight();
		var w = s.outerWidth();
		var t = s.parent().parent().position().top - 270;
		var l = s.offset().left;
		var left = l + w + 5;
		$("#middle").append
		(
			scrollbar
			.css
			({
				"position" : "absolute",
				"height" : h,
				"top" : t,
				"left" : left
			})
			.append
			(
				scrollbutton
				.draggable
				({
					axis: "y",
					containment: "#scrolldiv"
				})
				.on
				(
					"drag",
					function()
					{
						$("#siteidmenu")
						.scrollTop
						(
							(($(this).position().top / $("#scrolldiv").outerHeight()) * 3.75 * $("#depidmenu").outerHeight())
						)
					}
				)
			)
		);
	}
);

$("#scrolldiv").on
(
	"focus",
	function(event)
	{
		$("#siteidmenu").show();
	}
);

$("#depdropdown").on
(
	"hide.bs.dropdown",
	function()
	{
		$("body").find("#scrolldiv").remove();
		scrollbutton.css({ "top" : "0px" });
	}
);

///////////////////////////////////////////////////////////////////////////////////////////////////

$("#classdropdown").on
(
	"shown.bs.dropdown",
	function()
	{
		var s = $("#classidmenu");
		var h = s.outerHeight();
		var w = s.outerWidth();
		var t = s.parent().parent().position().top - 270;
		var l = s.offset().left;
		var left = l + w + 5;
		$("#middle").append
		(
			scrollbar
			.css
			({
				"position" : "absolute",
				"height" : h,
				"top" : t,
				"left" : left
			})
			.append
			(
				scrollbutton
				.draggable
				({
					axis: "y",
					containment: "#scrolldiv"
				})
				.on
				(
					"drag",
					function()
					{
						$("#classidmenu")
						.scrollTop
						(
							(($(this).position().top / $("#scrolldiv").outerHeight()) * 3.75 * $("#classidmenu").outerHeight())
						)
					}
				)
			)
		);
	}
);

$("#scrolldiv").on
(
	"focus",
	function(event)
	{
		$("#classidmenu").show();
	}
);

$("#classdropdown").on
(
	"hide.bs.dropdown",
	function()
	{
		$("body").find("#scrolldiv").remove();
		scrollbutton.css({ "top" : "0px" });
	}
);

////////////////////////////////////////////////////////////////////////////////////////////////////////

var jaja = 0;

$(".sorter").on("click",
	function()
	{
	$("div[trtemp=yes]").remove();
	var i = 0;
//		console.log(overviewtabledata[0][$(this).attr("sortvalue")]);
	var sortvalue = $(this).attr("sortvalue");
	var dir = $(this).attr("directional");
	overviewtabledata.sort
	(
		function (a,b)
		{
			i++;
			if (a[sortvalue] < b[sortvalue])
			{
				if (dir == "up")
				{
					return -1;
				}
				else
				{
					return 1;
				}
			}
			if (a[sortvalue] > b[sortvalue])
			{
				if (dir == "up")
				{
					return 1;
				}
				else
				{
					return -1;
				}
			}
			return 0;
		}
	);
	$("tbody>tr").remove();
	loopThroughOverviewData(overviewtabledata);
//	console.log(i);
	}
);

$("#initiallogin").on
(
	"click",
	function()
	{
		mainlogin();
	}
);

//////////////////////////////////////////
////////      mainlogin             //////
//////////////////////////////////////////

function mainlogin()
{
	var logininfo = new Object();
	logininfo.id = $("#loginid").val();
	logininfo.fname = $("#loginfname").val();
	$.ajax
	({
		url: apiroot + "auth/login",
		method: "POST",
		data: logininfo			
	})
	.always
	(
		function(data, xhr)
		{
			if (xhr == "success")
			{
				theuser = $("#loginid").val();
				$("#myModal").modal("hide");
				$("#loginerror").slideUp("fast");
				$("#loginid").css({ "color" : "#74a9d8" });
				$("#loginfname").css({ "color" : "#74a9d8" });
				token = data;
                loadDepartments();
                loadClasses();
				loadTermReasons();
				loadTransReasons();	
				loadSiteIDs();
				loadOverviewTable2();
				ws.emit('message', JSON.stringify({ "login" : logininfo.id }));
//				paginate();		 	
			}
			else
			{
				$("#loginerror").slideDown("fast");
				$("#loginid").animate({ "color" : "red" });
				$("#loginfname").animate({ "color" : "red" });
			}
		}
	);
}

var newempdataholder;
var urllholder;
var agentholder;
var classholder;

function saveagentdata(a)
{
	var selectstr = "tr[agent='" + $(a).attr("agent") + "']";
	var spanhash = "#spanr" + $("#ta").attr("rownum") + "c" + $("#ta").attr("cellnum");
	var spanhashhtml = $(spanhash).html();
	var spanhashattr;
	$(spanhash).html($("#ta").val());
	if ($(spanhash).parent().attr("datum") == "SiteID")
	{
		$(spanhash).attr("siteid", $("#ta").attr("siteid"));
	}
	if ($(spanhash).parent().attr("datum") == "dep")
	{
        spanhashattr = $(spanhash).attr("dep");
		$(spanhash).attr("dep", $("#ta").attr("dep"));
	}
	if ($(spanhash).parent().attr("datum") == "class")
	{
        spanhashattr = $(spanhash).attr("class");
		$(spanhash).attr("class", $("#ta").attr("class"));
	}
	if ($(spanhash).parent().attr("datum") == "rate")
	{
		spanhashattr = $(spanhash).attr("rehire");
		$(spanhash).attr("rehire", $("#ta").attr("rehire"));
	}
	if ($(spanhash).parent().attr("datum") == "active")
	{
		spanhashattr = $(spanhash).attr("active");
		$(spanhash).attr("active", $("#ta").attr("active"));
	}
	var fname;
	var mi;
	var lname;
	var email;
	var phone;
	var mobile;
	var address;
	var ssn;
	if ($(selectstr + ">td[datum='Fname']>span").html().trim() == "")
	{ fname = "placeholder"; } else { fname = $(selectstr + ">td[datum='Fname']>span").html() }

	if ($(selectstr + ">td[datum='MI']>span").html().trim() == "")
	{ mi = "placeholder"; } else { mi = $(selectstr + ">td[datum='MI']>span").html() }

	if ($(selectstr + ">td[datum='Lname']>span").html().trim() == "")
	{ lname = "placeholder"; } else { lname = $(selectstr + ">td[datum='Lname']>span").html() }

	if ($(selectstr + ">td[datum='Email']>span").html().trim() == "")
	{ email = "placeholder"; } else { email = $(selectstr + ">td[datum='Email']>span").html() }

	if ($(selectstr + ">td[datum='Phone']>span").html().trim() == "")
	{ phone = "0000000000"; } else { phone = $(selectstr + ">td[datum='Phone']>span").html() }

	if ($(selectstr + ">td[datum='Mobile']>span").html().trim() == "")
	{ mobile = "0000000000"; } else { mobile = $(selectstr + ">td[datum='Mobile']>span").html() }

	if ($(selectstr + ">td[datum='Address']>span").html().trim() == "")
	{ address = "placeholder"; } else { address = $(selectstr + ">td[datum='Address']>span").html() }

	if ($(selectstr + ">td[datum='ssn']>span").html().trim() == "")
	{ ssn = "00000"; } else { ssn = $(selectstr + ">td[datum='ssn']>span").html() }

	var urll = apiroot + "employees/" + $(a).attr("agent");
	var newempdata = {
		"fname" : fname,
		"mi" : mi,
		"lname" : lname,
		"email" : email,
		"phone" : phone,
		"mobile" : mobile,
		"address" : address,
		"ssn" : ssn,
		"position" : "FT",
		"active" : $(selectstr + ">td[datum='active']>span").attr("active"),
		"political" : 0,
		"vzw" : 0,
		"siteid" : $(selectstr + ">td[datum='SiteID']>span").attr("siteid"),
		"rate" : $(selectstr + ">td[datum='rate']>span").attr("rehire"),
		"hireDate" : $(selectstr + ">td[datum='hireDate']>span").html(),
        "department" : $(selectstr + ">td[datum='dep']>span").attr("dep")
	};
	classholder = {
		"userclass" : $(selectstr + ">td[datum='class']>span").attr("class"),
		"userid" : $(a).attr("agent")
	};
	$("[clone=yes]").fadeOut(600, "easeOutCirc", function() { $(this).remove(); });
	$("#datediv").fadeOut(600, "easeOutCirc", function() { $(this).remove(); });
	$("#datediv").attr("id", "bla2");
	var transhash = "tr[rownum=" + $("#ta").attr("rownum") + "]>td[cellnum=" + $("#ta").attr("cellnum") + "]";
	var transhashspan = "tr[rownum=" + $("#ta").attr("rownum") + "]>td[cellnum=" + $("#ta").attr("cellnum") + "]>span";
	if ($(transhash).attr("datum") == "dep")
	{
		$("#myModal2").modal("show");
		$("#transfersubmit").attr("agent", $(a).attr("agent"));
		newempdataholder = newempdata;
		urllholder = urll;
	}
	else if ($(transhash).attr("datum") == "active" && spanhashattr == 1 && $("#ta").attr("active") == 0)
	{
		$("#myModal3").modal("show");
		$("#terminationsubmit").attr("agent", $(a).attr("agent"));
		newempdataholder = newempdata;
		urllholder = urllholder;		
	}
	else if ($(transhash).attr("datum") == "active" && spanhashattr == 0 && $("#ta").attr("active") == 1)
	{
		$("#terminationsubmit").attr("agent", $(a).attr("agent"));
		newempdataholder = newempdata;
		urllholder = urll;
		var tokenfinal = "Bearer " + token;
		var submitdata = {
			"agentid" : $("#terminationsubmit").attr("agent"),
			"termreasonid" : 0,
			"modifier" : theuser,
			"active" : 1	
		};
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
			}
		);				
	}
	else
	{
		console.log(newempdata);
		separatecall(newempdata, urll);
	}
}

function separatecall(newempdata, urll)
{
	var tokenfinal = "Bearer " + token;
	var empdata;
	console.log(newempdata);
	$.ajax({
		url : urll,
		method : "PUT",
		data : newempdata,
		dataType : "json",
		headers: {
			"Authorization" : tokenfinal
		}
	}).always(function(data, xhr)
	{
		$.ajax({
			url : urll,
			method : "GET",
			data : newempdata,
			dataType : "json",
			headers: {
				"Authorization" : tokenfinal
			}
		}).always(function(data, xhr)
		{
			console.log(xhr);
			console.log(data);
			if (xhr == "success")
			{
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

						$.ajax
						({
							method: "GET",
							dataType : "json",
							data : classholder,
							url : "empclasses.php"
						})
						.always
						(
							(data, xhr, status) => 
							{
							 console.log(data); console.log(xhr); 
							}
						);
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
								var classid = $("tr[agent=" + empdata['ID'] + "]>td[datum='class']>span").attr("class");
								var classname = $("tr[agent=" + empdata['ID'] + "]>td[datum='class']>span").html();
								ws.emit('message', JSON.stringify({"update": empdata['ID'], "updateinfo": { "classid" : classid, "classname" : classname } }));
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
											}, 400, "easeOutExpo"
											)
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
			}
		});

	});
}

/*
        'fname', 'mi', 'lname',
        'email', 'phone', 'mobile', 'gender',
        'address', 'ssn', 'position', 'active',
        'political', 'vzw', 'siteid', 'rate',
*/

$("#submitemp").on("click", function() { submitemp() });

var jsondata;

function submitemp()
{
	var tokenfinal = "Bearer " + token;
	var newagentid;
	var address = $("#street").val() + " " + $("#city").val() + " " + $("#state").val() + " " + $("#zip").val();
	jsondata = {
		"fname" : $("#fname").val(),
		"mi" : $("#mi").val(),
		"lname" : $("#lname").val(),
		"ssn" : $("#ssn").val(),
		"siteid" : $("#siteidbutton").attr("siteid"),
		"email" : $("#email").val(),
		"gender" : $("#genderbutton").html(),
		"phone" : $("#phone").val(),
		"mobile" : $("#mobile").val(),
		"address" : address,
		"active" : 1,
		"vzw" : 0,
		"political" : 0,
		"rate" : 1,
		"position" : "FT",
		"department" : $("#depidbutton").attr("depid"),
		"hireDate" : $("#hiredate").val()
	};

	if ($("#siteidbutton").html().match(/\bSite\b/))
	{
		alert("Choose a site for the new employee!");
	}
	else if (jsondata.gender.match(/\bGender\b/))
	{	
		alert("Choose a gender for the new employee!");
	}
	else if ($("#depidbutton").html().match(/\bDepartment\b/))
	{	
		alert("Choose a department for the new employee!");
	}
	else if ($("#classidbutton").html().match(/\bClass\b/))
	{	
		alert("Choose a class for the new employee!");
	}
	else
	{

		if (confirm("You are about to create a new employee"))
		{
		}
		else
		{
			return;
		}

		$.ajax({
			url : apiroot + "employees",
			method : "POST",
			data : jsondata,
			dataType : "json",
			headers: {
				"Authorization" : tokenfinal
			}
		}).always(function(data, xhr)
		{
			if (xhr == "success")
			{

			}
			else
			{
				alert("There was an error creating the employee!");
			}
			console.log(xhr);
			console.log(data['ID']);
			newagentid = data['ID'];

			var newtenuredata = {
				"modifier" : theuser,
				"agentid" : newagentid,
				"active" : 1,
				"termreasonid" : 0
			};

			var newclassdata = {
				"userid": newagentid,
				"userclass" : $("#classidbutton").attr("classid")
			};
			$.ajax
			({
				method: "GET",
				dataType : "json",
				data : newclassdata,
				url : "empclasses.php"
			})
			.always
			(
				(data, xhr, status) => { console.log(data); console.log(xhr); }
			);
			$.ajax({
				url : apiroot + "tenures",
				method : "POST",
				data : newtenuredata,
				dataType : "json",
				headers: {
					"Authorization" : tokenfinal
				}
			}).always(function(data, xhr)
			{
				if (xhr == "success")
				{
					alert("Employee successfully created!");
				}
				else
				{
					alert("There was an error creating the employee!");
				}
				console.log(xhr);
				console.log(data);
				$("#overviewtablebody>tr").remove();
				loadOverviewTable2(); 
			});

		});

	}
}

function insertrow(e)
{
	if ($("#trtemp").length > 0)
	{
		if ( ($(e.target).attr("rownum")) == ($("#trtemp").attr("rownum")) )
		{
			return;
		}
	}
	var tr = $("<div></div>",
	{
		"id" : "trtemp",
		"rownum" : ($(e.target).attr("rownum"))
	});
	var agentid = $("tr[rownum=" + $(e.target).attr("rownum") + "]").attr("agent");
	ws.emit('message', JSON.stringify({ "lock" : agentid }));
//	console.log(agentid);
	var tokenfinal = "Bearer " + token;
	var tenurestatus;
	var transferstatus;
	var tenuredata;
	var transferdata;
	console.log($("div[trtemp=yes]").attr("agentid"));
	$("div[trtemp=yes]").remove();
	var divrow = $("<div></div>").addClass("row").addClass("temprow");
	var divrow2 = $("<div></div>").addClass("row").addClass("temprow2");
	var divcol1 = $("<div></div>").addClass("col-xs-2").addClass("tempcol");
	var divcol2 = $("<div></div>").addClass("col-xs-5").addClass("tempcol");
	var divcol3 = $("<div></div>").addClass("col-xs-5").addClass("tempcol");
	$("tr[rownum=" + $(e.target).attr("rownum") + "]")
	.after
	(
		tr
		.css
		({
			"background-color" : "rgb(215, 230, 244) !important",
			"height" : "auto",
			"border-radius" : "10px"
		})
		.attr("trtemp", "yes")
		.attr("agentid", agentid)
		.append
		(
			divrow2
//			.css
//			({
//				"height" : "3vh"
//			})
			.append
			(
				$("<button></button>", { 
					"type" : "button" 
				})
				.on
				(
					"click",
					() => 
					{ 
						ws.emit('message', JSON.stringify({ "unlock" : $("div[trtemp=yes]").attr("agentid") }));
						$("div[trtemp=yes]").remove();
						$("[clone=yes]").fadeOut(600, "easeOutCirc", function() { $(this).remove(); });
						$(".ui-datepicker-inline").remove();
						$("#datediv").attr("id", "bla2"); 
					}
				)
				.html("&times;")
				.addClass("btn")
				.css
				({ 
					"float" : "right", 
					"background-color" : "rgb(116, 169, 216)", 
					"color" : "white", 
					"font-size" : "24px",
					"padding" : "0px !important",
					"line-height" : "2vh",
					"padding-bottom" : "1vh"
				})
			)
		)
		.append(
			divrow
			.append(
				divcol1
				.html("<h1 align='center'>Agent Information</h1>")
			)
			.append
			(
				divcol2
				.append
				(
					$
					(
						"<table>"
					+		"<thead>"
					+			"<tr>"
					+			"<h3>Transfer History</h3>"
					+			"</tr>"
					+			"<tr>"
					+				"<th>DEPARTMENT</th>"
					+				"<th>DATE</th>"
					+				"<th>REASON</th>"
					+				"<th>BY</th>"
					+			"</tr>"
					+		"</thead>"
					+		"<tbody id='transfertemp'>"
					+		"</tbody>"
					+	"</table>"
					)
				)				
				.css({ "padding-right" : "10px" })
			)
			.append
			(
				divcol3
				.append
				(
					$
					(
						"<table>"
					+		"<thead>"
					+			"<tr>"
					+			"<h3>Employment History</h3>"
					+			"</tr>"
					+			"<tr>"
					+				"<th>ACT</th>"
					+				"<th>DATE</th>"
					+				"<th>REASON</th>"
					+				"<th>BY</th>"
					+			"</tr>"
					+		"</thead>"
					+		"<tbody id='tenuretemp'>"
					+		"</tbody>"
					+	"</table>"
					)
				)
				.css({ "padding-right" : "10px" })
			)
		)
	);
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
//					console.log(transferdata);
//					console.log(tenuredata);
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
					$("#trtemp>div>div>table>tbody>tr>td")
					.on
					(
						"click",
						function()
						{
							$("[clone=yes]").fadeOut(600, "easeOutCirc", function() { $(this).remove(); });
							$("#datediv").fadeOut(600, "easeOutCirc", function() { $(this).remove(); });
							$("#datediv").attr("id", "bla2");
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
								}, 400, "easeOutExpo"
								)
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

function savedate(a)
{	
	var tokenfinal = "Bearer " + token;
	var agentid = $(a).attr("agentid");
	var tid = $(a).attr("tid");
	var date = $("#ta").val();
	var tenureortransfer = $(a).attr("tenureortransfer");
	var datacollect = {
		"tid" : tid,
		"tenureortransfer" : tenureortransfer,
		"date" : date
	};
	$.ajax
	({
		"url" : "tenuretransferdatemodify.php",
		"dataType" : "json",
		"data" : datacollect
	})
	.always
	(
		function(data, xhr)
		{
			console.log(datacollect);
			console.log(data);
			console.log(xhr);
			if (xhr == "success")
			{
				$("[clone=yes]").fadeOut(600, "easeOutCirc", function() { $(this).remove(); });
				$("#datediv").fadeOut(600, "easeOutCirc", function() { $(this).remove(); });
				$("#datediv").attr("id", "bla2");
				$("#tenuretemp").html("");
				$("#transfertemp").html("");
/////////////////////////////////////////////////////////////////////////////////////////////////////////
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
					$("#trtemp>div>div>table>tbody>tr>td")
					.on
					(
						"click",
						function()
						{
							$("[clone=yes]").fadeOut(600, "easeOutCirc", function() { $(this).remove(); });
							$("#datediv").fadeOut(600, "easeOutCirc", function() { $(this).remove(); });
							$("#datediv").attr("id", "bla2");
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
								}, 400, "easeOutExpo"
								)
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
/////////////////////////////////////////////////////////////////////////////////////////////////////////
							}
						);
					}
				);
/////////////////////////////////////////////////////////////////////////////////////////////////////////				
			}
		}
	);
}

function check(arg)
{
	if (arg)
	{
		return "&#10003;";
	}
	else
	{
		return "&times;";
	}
}

function name(arg)
{
	var retval =
	overviewtabledata
	.find
	(
		(a) =>
		{
			if (a.ID == arg)
			{
				return a;
			}
		}
	);
	if (retval)
	{
		return retval.Fname + " " + retval.Lname + " (" + arg + ")";
	}
	else
	{
		return arg;
	}
}

$("#numoptdropdown>li>a").on
(
	"click",
	(event) =>
	{
		$("div[trtemp=yes]").remove();
		var currentpage = stoppingpoint / multiplier;
		var lastpage = startingpoint / multiplier;
		var innerHTML = $(event.target).html() + " <span class='caret'></span>";
		$("#numoptdropdownbutton").html(innerHTML);
		$("#numoptdropdownbutton").attr("numopt", $(event.target).attr("numopt"));
		multiplier = parseInt($("#numoptdropdownbutton").attr("numopt"));
		stoppingpoint = multiplier * currentpage;
		startingpoint = multiplier * lastpage;
		$("tbody>tr").remove();
		loopThroughOverviewData(overviewtabledata);
		paginate();
		console.log(startingpoint + " " + stoppingpoint + " " + multiplier);
	}
);

$("#likeorexactdropdown>li>a").on
(
	"click",
	(event) =>
	{
		var innerHTML = $(event.target).html() + " <span class='caret'></span>";
		$("#likeorexactdropdownbutton").html(innerHTML);
		$("#likeorexactdropdownbutton").attr("likeorexact", $(event.target).attr("likeorexact"));
		multiplier = parseInt($("#numoptdropdownbutton").attr("numopt"));
	}
);

$("#filterdropdown>li>a").on
(
	"click",
	function()
	{
		$("#filterdropdownbutton").attr("datum", $(this).attr("datum"));
		$("#filterdropdownbutton").html($(this).html());
		setparams();
	}
);

function setparams()
{
	var datum = $("#filterdropdownbutton").attr("datum");
}
