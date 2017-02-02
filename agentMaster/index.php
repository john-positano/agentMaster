<html>

	<head>
		<script>

////////////////////////////////////////////////////////////////
////////////////////// config //////////////////////////////////
////////////////////////////////////////////////////////////////

			var apiroot = "http://localhost:8000/";	
//			var apiroot = "http://agenthrm.sanford.tmccorp.local/";	

			var wsroot = "ws://localhost:10001";
//			var wsroot = "ws://10.16.80.27:10000";
		
			var socketid;

		</script>
		<script src="js/jquery-3.1.1.min.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
		<script src="js/bootstrap.min.js"></script>
		
		<link rel="stylesheet" href="css/bootstrap.min.css">
		<link rel="stylesheet" href="css/styles.css">
		<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">

	</head>

	<body>
		<div class="container-fluid" id="main">
			
			<div class="row" id="top">	
	
				<div class="col-xs-5" id="tabber">
					<ul class="nav nav-tabs" id="maintabs">
						<li class="active">
							<a href="#overview" data-toggle="tab" id="aoverview">
								All Agents
							</a>
						</li>
						<li>
							<a href="#addagent" data-toggle="tab" id="aaddagent">
								Add Agent
							</a>
						</li>
					</ul>
				</div>
				<div class="col-xs-1" style="height: 100%; color: #214e78; padding-top: calc(4vh - 7px);">
					Users logged in:
				</div>
				<div class="col-xs-2" id="logpanel" style="height: 100%; overflow-y: scroll; padding-top: 5px; background-color: #ebf3f9; border-radius: 10px;">

				</div>
				<div class="col-xs-1" style="height: 100%; color: #214e78; padding-top: calc(4vh - 7px);">
					Agents locked:
				</div>
				<div class="col-xs-2" id="lockpanel" style="height: 100%; overflow-y: scroll; padding-top: 5px; background-color: #ebf3f9; border-radius: 10px;">

				</div>
			</div>

			<div class="row" id="middle">
				
				<div class="col-xs-12">
					<div class="tab-content clearfix">
						<div class="tab-pane active" id="overview">
							<?php include "inc/overview.php"; ?>
						</div>
						<div class="tab-pane" id="addagent">
							<?php include "inc/addagent.php"; ?>
						</div>
					</div>
				</div>
			</div>

			<div class="row" id="overviewcontrols">
				<div class="col-xs-4">
					<div id="selectlist" style="width: 100%; height: 8vh !important;">
					</div>
				</div>
				<div class="col-xs-2">
					<div class="dropdown dropup" style="width: 100%;">
						  <button class="btn btn-primary dropdown-toggle" type="button" datum="ID" data-toggle="dropdown" style="width: 100%; height: 8vh !important;" id="searchdropdownbutton">Agent ID
						  <span class="caret"></span></button>
						  <ul class="dropdown-menu dropup" style="width: 100%" id="searchdropdown">
								<li><a href="#" datum="ID">Agent ID</a></li>
								<li><a href="#" datum="Fname">First Name</a></li>
								<li><a href="#" datum="Lname">Last Name</a></li>
								<li><a href="#" datum="ssn">SSN</a></li>
								<li><a href="#" datum="Email">Email</a></li>
								<li><a href="#" datum="Address">Address</a></li>
								<li><a href="#" datum="Phone">Phone</a></li>
								<li><a href="#" datum="Mobile">Mobile</a></li>
								<li><a href="#" datum="Department">Department</a></li>
								<li><a href="#" datum="hireDate">Hire Date</a></li>
								<li><a href="#" datum="Class">Class</a></li>
						  </ul>
					</div>
				</div>
				<div class="col-xs-1" id="numopt">
					<div class="dropdown dropup" style="width: 100%;">
					  <button class="btn btn-primary dropdown-toggle" type="button" likeorexact="like" data-toggle="dropdown" style="width: 100%; height: 8vh !important; font-size: 24px;" id="likeorexactdropdownbutton">≈
					  <span class="caret"></span></button>
					  <ul class="dropdown-menu dropup" style="width: 100%" id="likeorexactdropdown">
						<li style="display: none;" class="numeric"><a href="#" likeorexact="less" style="font-size: 24px;">&lt;</a></li>
						<li class="regex"><a href="#" likeorexact="like" style="font-size: 24px;" class="regex">≈</a></li>
						<li class="universal"><a href="#" likeorexact="exact" style="font-size: 24px;" class="regex">=</a></li>
						<li style="display: none;" class="numeric"><a href="#" likeorexact="more" style="font-size: 24px;">&gt;</a></li>
					  </ul>
					</div>
				</div>	
				<div class="col-xs-3 dropdown dropup" style="height: 100%;" id="searchdiv">
					<input type="text" class="logininput dropdown-toggle" data-toggle="" aria-expanded="false" style="height: 8vh;" placeholder="Search Field" id="searchinput">
					<ul class="dropdown-menu dropup" id="searcherdropdown">
					</ul>
				</div>
				<div class="col-xs-1">
					<button type="button" class="btn" style="width: 100%; height: 8vh;" id="searchbutton">GO</button>
				</div>
				<div class="col-xs-1" id="numopt">
					<div class="dropdown dropup" style="width: 100%;">
					  <button class="btn btn-primary dropdown-toggle" type="button" numopt="10" data-toggle="dropdown" style="width: 100%; height: 8vh !important; word-wrap: break-word;" id="numoptdropdownbutton">10
					  <span class="caret"></span></button>
					  <ul class="dropdown-menu dropup" style="width: 100%" id="numoptdropdown">
						<li><a href="#" numopt="10">10</a></li>
						<li><a href="#" numopt="25">25</a></li>
						<li><a href="#"	numopt="50">50</a></li>
						<li><a href="#" numopt="100">100</a></li>
					  </ul>
					</div>
				</div>	
			</div>	

		</div>

		<div id="myModal" class="modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
			<div class="modal-dialog">
					<!-- Modal content-->
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title" align="center">Login:</h4>
					</div>
					<div class="modal-body">
						<br>
						<div class="row">
							<div class="col-xs-12" id="loginerror" style="text-align: center; color: white; background-color: red !important; display: none;">
								Error logging in!
							</div>
							<br>
						</div>
						<div class="row">
							<div class="col-xs-2"></div>
								<div class="col-xs-8">
									<input type="text" class="logininput" id="loginid" placeholder="Your User ID">
								</div>
							<div class="col-xs-2"></div>
						</div>
						<div class="row">
							<br>
						</div>
						<div class="row">
							<div class="col-xs-2"></div>
								<div class="col-xs-8">
									<input type="password" class="logininput" id="loginfname" placeholder="Your Password">
								</div>
							<div class="col-xs-2"></div>				
						</div>
						<br>
						<div class="row">
							<div class="col-xs-5"></div>
								<div class="col-xs-2">
									<button type="button" class="btn btn-info" id="initiallogin">SUBMIT</button>
								</div>
							<div class="col-xs-5"></div>				
						</div>
						<br>
					</div>
				</div>
			</div>
		</div>

		<div id="myModal2" class="modal fade" role="dialog">
			<div class="modal-dialog">
					<!-- Modal content-->
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title" align="center">You are about to transfer this agent and you must provide a reason:</h4>
					</div>
					<div class="modal-body">
						<br>
						<div class="row">
							<div class="col-xs-12" id="transerror" style="text-align: center; color: white; background-color: red !important; display: none;">
								Error on transfer!
							</div>
							<br>
						</div>
						<div class="row">
							<div class="col-xs-2"></div>
								<div class="col-xs-8">
									<select id="transferreason" class="form-control"></select>
								</div>
							<div class="col-xs-2"></div>
						</div>
						<br>
						<div class="row">
							<div class="col-xs-5"></div>
								<div class="col-xs-2">
									<button type="button" class="btn btn-info" id="transfersubmit">SUBMIT</button>
								</div>
							<div class="col-xs-5"></div>				
						</div>
						<br>
					</div>
				</div>
			</div>
		</div>

		<div id="myModal3" class="modal fade" role="dialog">
			<div class="modal-dialog">
					<!-- Modal content-->
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title" align="center">You are about to terminate this agent and you must provide a reason:</h4>
					</div>
					<div class="modal-body">
						<br>
						<div class="row">
							<div class="col-xs-12" id="termerror" style="text-align: center; color: white; background-color: red !important; display: none;">
								Error capturing termination reason!
							</div>
							<br>
						</div>
						<div class="row">
							<div class="col-xs-2"></div>
								<div class="col-xs-8">
									<select id="terminationreason" class="form-control"></select>
								</div>
							<div class="col-xs-2"></div>
						</div>
						<br>
						<div class="row">
							<div class="col-xs-2"></div>
							<div class="col-xs-8" style="text-align: center; padding-bottom: 3vh;">
								Can this employee be rehired?
							</div>
							<div class="col-xs-2"></div>
						</div>
						<div class="row">
							<div class="col-xs-2"></div>
							<div class="col-xs-8">
									<select id="rehire" class="form-control" rehire="1">
										<option rehire="1">YES</option>
										<option rehire="0">NO</option>
									</select>
							</div>
							<div class="col-xs-2"></div>
						</div>
						<div class="row">
							<div class="col-xs-5"></div>
								<div class="col-xs-2" style="padding-top: 3vh;">
									<button type="button" class="btn btn-info" id="terminationsubmit">SUBMIT</button>
								</div>
							<div class="col-xs-5"></div>				
						</div>
						<br>
					</div>
				</div>
			</div>
		</div>

		<script src="js/load.js"></script>
		<script src="js/userexperience.js"></script>
		<script src="js/socket.io.js"></script>
		<script src="js/websocket.js"></script>
	</body>

</html>
