
<div class="row" id="addagenttablerow">
	<div class="col-xs-2"></div>
	<div class="col-xs-8" id="addagenttablecolumn">
		<div class="row" id="aa1">
			<div class="col-xs-12">
				<label for="fname"> First Name </label>
				<input type="text" class="addagent" id="fname" placeholder="First Name">
			</div>
		</div>
		<div class="row">
			<div class="col-xs-12">
				<label for="mi"> MI </label>
				<input type="text" class="addagent" id="mi" placeholder="MI">
			</div>
		</div>
		<div class="row">
			<div class="col-xs-12">
				<label for="lname"> Last Name </label>
				<input type="text" class="addagent" id="lname" placeholder="Last Name">
			</div>
		</div>
		<div class="row" id="aa3">
			<div class="col-xs-2" style="margin-top: 8px !important">
				<label for="genderbutton"> Gender </label>
				<div class="dropdown">
					<button type="button" class="addagent ddb dropdown-toggle" data-toggle="dropdown" id="genderbutton">
					Gender
					</button>
					<ul class="dropdown-menu ddm" role="menu">
						<li role="presentation" onclick="setgender(this)" gender="Male"><a role="menuitem" href="#">Male</a></li>
						<li role="presentation" onclick="setgender(this)" gender="Female"><a role="menuitem" href="#">Female</a></li>
					</ul>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-12">
				<label for="mobile"> Mobile Phone Number </label>
				<input type="text" class="addagent" id="mobile" placeholder="Mobile Phone Number">
			</div>
		</div>
		<div class="row">
			<div class="col-xs-12">
				<label for="phone"> Main Phone Number </label>
				<input type="text" class="addagent" id="phone" placeholder="Main Phone Number">
			</div>
		</div>
		<div class="row" id="aa4">
			<div class="col-xs-12">
				<label for="street"> Street </label>
				<input type="text" class="addagent" id="street" placeholder="Street Address">
			</div>
		</div>
		<div class="row" id="aa4">
			<div class="col-xs-12">
				<label for="city"> City </label>
				<input type="text" class="addagent" id="city" placeholder="City">
			</div>
		</div>
		<div class="row" id="aa4">
			<div class="col-xs-12">
				<label for="state"> State </label>
				<input type="text" class="addagent" id="state" placeholder="ST">
			</div>
		</div>
		<div class="row" id="aa4">
			<div class="col-xs-12">
				<label for="zip"> Zip Code </label>
				<input type="text" class="addagent" id="zip" placeholder="Zip Code">
			</div>
		</div>
		<div class="row" id="aa2">
			<div class="col-xs-12">
				<label for="ssn"> 5-digit SSN </label>				
				<input type="text" class="addagent" id="ssn" placeholder="5-digit SSN">
			</div>
		</div>
		<div class="row">
			<div class="col-xs-12">
				<label for="email"> e-Mail Address </label>
				<input type="text" class="addagent" id="email" placeholder="e-Mail Address">
			</div>
		</div>
		<div class="row" id="aa5">
			<div class="col-xs-12" id="hiredatediv">
				<label for="hiredate">Hire Date</label>
				<input type="text" class="addagent" id="hiredate" placeholder="Hire Date">
			</div>
		</div>
		<div class="row" id="aa4">
			<div class="col-xs-4" style="margin-top: 8px !important">
				<label for="sitedropdown"> Site or Vendor Classification </label>
				<div class="dropdown dropup" id="sitedropdown">
					<button type="button" class="addagent ddb dropdown-toggle dropup" data-toggle="dropdown" id="siteidbutton">
					Site
					</button>
					<ul class="dropdown-menu ddm2 dropup" role="menu" id="siteidmenu">
					</ul>
				</div>
			</div>
			<div class="col-xs-4" style="margin-top: 8px !important">
				<label for="depdropdown"> Department </label>
				<div class="dropdown dropup" id="depdropdown">
					<button type="button" class="addagent ddb dropdown-toggle dropup" data-toggle="dropdown" id="depidbutton">
					Department
					</button>
					<ul class="dropdown-menu ddm2 dropup" role="menu" id="depidmenu">
					</ul>
				</div>
			</div>
			<div class="col-xs-4" style="margin-top: 8px !important">
				<label for="classdropdown"> Class </label>
				<div class="dropdown dropup" id="classdropdown">
					<button type="button" class="addagent ddb dropdown-toggle dropup" data-toggle="dropdown" id="classidbutton">
					Class
					</button>
					<ul class="dropdown-menu ddm2 dropup" role="menu" id="classidmenu">
					</ul>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-12">
				<label for="fname"> Enter Data </label>
				<button type="button" class="addagent" id="submitemp">SUBMIT</button>
			</div>
		</div>
	</div>
	<div class="col-xs-2"></div>
</div>
