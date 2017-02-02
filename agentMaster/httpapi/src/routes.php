<?php

try
{
	$pdoEmp = new PDO("dblib:host=172.16.2.35;dbname=EMPLOYEE_COPY", "sa", "k!p@ny52");
//	$pdoC1 = new PDO("mysql:host=172.16.81.151;dbname=asterisk", "cron", "1234");
//	$pdoC2 = new PDO("mysql:host=172.16.82.151;dbname=asterisk", "cron", "1234");
//	$pdoC3 = new PDO("mysql:host=172.16.82.1;dbname=asterisk", "cron", "1234");
//	$pdoHostMan = new PDO("mysql:host=209.208.149.190;port=43320;dbname=totalmarketing", "TMCremote1", "pass4TMC1");
//	$pdoHostPre = new PDO("mysql:host=209.208.149.190;port=43320;dbname=totalmarketing3", "TMCremote1", "pass4TMC1");
}
catch (PDOException $e)
{

}

$app->get('/overviewtable', function ($request, $response, $args)
{
	return json_encode($this->db->table('dbo.EmpMaster')->select('ID', 'Fname', 'MI', 'Lname', 'ssn', 'Suffix', 'Email', 'Address', 'Phone', 'Mobile', 'active', 'SiteID', 'vzw', 'political', 'appleOne')->get());
});

$app->get('/sitetable', function ($request, $response, $args)
{
	return json_encode($this->db->table('dbo.SiteTable')->get());
});

$app->get('/addagent', function ($request, $response, $args) use ($pdoEmp, $pdoC1, $pdoC2, $pdoC3, $pdoHostMan, $pdoHostPre)
{
	$fname = $request->getParam('fname');
	$mi = $request->getParam('mi');
	$lname = $request->getParam('lname');
	$suffix = $request->getParam('suffix');
	$email = $request->getParam('email');
	$gender = $request->getParam('gender');
	$phone = $request->getParam('phone');
	$address = $request->getParam('address');
	$ssn = $request->getParam('ssn');
	$active = $request->getParam('active');
	$vzw = $request->getParam('vzw');
	$siteid = $request->getParam('siteid');
	$mobile = $request->getParam('mobile');
	$political = $request->getParam('political');
	$appleone = $request->getParam('appleone');

	$stmtEmp = $pdoEmp->query("DECLARE @t TABLE (id int) "
		. "INSERT INTO dbo.EmpMaster "
			. "("
				. "Fname, "
				. "MI, "
				. "Lname, "
				. "Suffix, "
				. "Email, "
				. "Gender, "
				. "Phone, "
				. "Address, "
				. "ssn, "
				. "active, "
				. "vzw, "
				. "SiteID, "
				. "Mobile, "
				. "political, "
				. "appleOne, "
				. "Username, "
				. "Password, "
				. "hireDate, "
				. "rate, "
				. "position"
			. ") "
			. "OUTPUT INSERTED.ID INTO @t "
			. "VALUES "
			. "("
				. "'$fname', "
				. "'$mi', "
				. "'$lname', "
				. "'$suffix', "
				. "'$email', "
				. "'$gender', "
				. "'$phone', "
				. "'$address', "
				. "'$ssn', "
				. "$active, "
				. "$vzw, "
				. "$siteid, "
				. "'$mobile', "
				. "$political, "
				. "$appleone, "
				. "'temp', "
				. "'temp', "
				. "GETDATE(), "
				. "0, "
				. "'FT'"
			. ") "
		. "SELECT * FROM @t"
	);

	$stmtEmp->nextRowset();
	$rows = $stmtEmp->fetch();

#################################
# !!!!!!!!!!!!!!!!!!!!!!!!!!!!! #
#################################

	$masterID = $rows["id"];

#################################
# !!!!!!!!!!!!!!!!!!!!!!!!!!!!! #
#################################

	return json_encode(var_dump($masterID));
});
