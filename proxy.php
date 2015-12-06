<?php

function post($url, $data, $token) {
	//$header = array("User-Agent: " . $_SERVER["HTTP_USER_AGENT"], "Content-Type: application/x-www-form-urlencoded");
	$curl = curl_init();
	curl_setopt($curl, CURLOPT_URL, $url);
	// curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
	if($token == null){	
		curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
	}else{
		curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'X-Auth-Token: '.$token,
						'authorization: Token token='.$token));
	}

	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($curl, CURLOPT_POST, 1);
	curl_setopt($curl, CURLOPT_USERAGENT,'Tinder/3.0.4 (iPhone; iOS 7.1; Scale/2.00)');
	curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
	$response = curl_exec($curl);
	curl_close($curl);
	return $response;
}

function get($url, $token) {
	//$header = array("User-Agent: " . $_SERVER["HTTP_USER_AGENT"], "Content-Type: application/x-www-form-urlencoded");

	// foreach($header as $value){
	// 	echo " " . $value;
	// }
	$curl = curl_init();
	curl_setopt($curl, CURLOPT_URL, $url);
	curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'X-Auth-Token: '.$token,
						'authorization: Token token='.$token));
	//curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($curl, CURLOPT_HTTPGET, 1);
	curl_setopt($curl, CURLOPT_USERAGENT,'Tinder/3.0.4 (iPhone; iOS 7.1; Scale/2.00)');
	//curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
	$response = curl_exec($curl);
	curl_close($curl);
	return $response;
}

//$url = "your cross domain request here";
// $data = $_SERVER["QUERY_STRING"];

// $arr = $_POST['facebook_token'] + $_POST['facebook_id'];

//echo print_r($_POST['postData']);

$url = $_POST['endPointURL'];

$header = $_POST['headers'];
$type = $_POST['method'];
$token = null;

 if($type == 'post'){
 	if(isset($_POST['token'])){
		$token = $_POST['token'];
	}
	$data = json_encode($_POST['postData']);
	echo(post($url, $data, $token));
	
}
else if($type == 'get'){
	$token = $_POST['token'];
	echo(get($url, $token));
}


?>
