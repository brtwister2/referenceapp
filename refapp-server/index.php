<?php
$origin = isset($_SERVER['HTTP_ORIGIN'])?$_SERVER['HTTP_ORIGIN']:$_SERVER['HTTP_HOST'];
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Authorization, X-Requested-With, API-Key, Token');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description, API-Key, Token');
ini_set("xdebug.var_display_max_children", -1);
ini_set("xdebug.var_display_max_data", -1);
ini_set("xdebug.var_display_max_depth", -1);

include_once('vendor/email/EmailHelper.php');
include_once('vendor/push/PushHelper.php');
require 'vendor/autoload.php';

use Utils\EmailHelper;
use Utils\PushHelper;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\ResponseInterface;
$app = new \Slim\App;

//Android api
define( 'API_ACCESS_KEY', 'AIzaSyBMA19ZYG_NV9xHC1kt6ozzqDR1BwslKP0' );
define( 'API_PLACE_URL', 'https://maps.googleapis.com/maps/api/place/details/json?' );

//DB Defs
define( 'SERVER_HOST_ADDRESS', 'http://travellrsapp.com/api/travellrs-server' );
define( 'DB_URL', 'localhost' );
define( 'DB_USER', "root" );
define( 'DB_PASS', "");//GoJqaRhd2SSJP9ZH!@
define( 'DB_NAME', "referenceapp" );

define( 'PROFILE_FOLDER', "./profile/" );


$contentType = 'application/json; charset: utf-8';


class Service {

	public function signUp($req){

		if($req->getParam('email') && $req->getParam('password') && $req->getParam('name')){

			$mysqli = connect();

			$sql = "SELECT email from users where email = '".$req->getParam('email')."'";
			$results = $this->fetchResults($mysqli, $sql);

			if(sizeof($results) > 0) { return ["status" => false, "message" => "E-mail already taken."];  }

			$sql = $this->insertUpdateBuilder([
				'tablename' => 'users',
				'conditions' => null,
				'fields' => [
					'email' => $req->getParam('email'),
					'password' => $req->getParam('password'),
					'name' => $req->getParam('name'),
					'token' => uniqid()
				]
			], false);

			$mysqli->query($sql);
			$status = $mysqli->affected_rows > -1;

			if($status)	{
				$uid = $mysqli->insert_id;
				$sql = "SELECT users.id,users.email,users.name,token,companies.name as ucname, (select ROUND(sum(rating)/count(rating)) from form where userid = users.id) as urating from users JOIN companies ON companies.id = users.companies_id where users.id = '$uid'";
				$results = $this->fetchResults($mysqli, $sql);
				return ["status" => true, "data" => $results[0]];
			}

		}

		return ["status" => false, "message" => ""];

	}

	public function login($req){
		
		
		$mysqli = connect();

		if($req->getParam('linkedinid')){

			$sql = "SELECT users.id,users.email,users.name,token,companies.name as ucname, (select ROUND(sum(rating)/count(rating)) from form where userid = users.id) as urating from users JOIN companies ON companies.id = users.companies_id where users.linkedinid = '".$req->getParam('linkedinid')."'";
			$results = $this->fetchResults($mysqli, $sql);

			if(sizeof($results) > 0) {
				return ["status" => true, "data" => $results[0]]; 
			}else{


				if($req->getParam('picture')){

					// Without extesion.
					$newfile = uniqid();
					$newpath = "./profile/" . $newfile;

					// if is not base64 then it's a url.
					file_put_contents($newpath, file_get_contents($req->getParam('picture'), false, stream_context_create(array(
					    "ssl"=>array(
					        "verify_peer"=>false,
					        "verify_peer_name"=>false,
					    ),
					))));

				}

				$sql = $this->insertUpdateBuilder([
					'tablename' => 'users',
					'conditions' => null,
					'fields' => [
						'email' => $req->getParam('email'),
						'password' => $req->getParam('password'),
						'linkedinid' => $req->getParam('linkedinid'),
						'linkedintoken' => $req->getParam('linkedintoken'),
						'name' => $req->getParam('name'),
						'picture' => $newfile,
						'token' => uniqid()
					]
				], false);

				$mysqli->query($sql);
				$status = $mysqli->affected_rows > -1;

				if($status)	{
					$uid = $mysqli->insert_id;
					$sql = "SELECT users.id,users.email,users.name,token,companies.name as ucname, (select ROUND(sum(rating)/count(rating)) from form where userid = users.id) as urating from users JOIN companies ON companies.id = users.companies_id where users.id = '$uid'";
					$results = $this->fetchResults($mysqli, $sql);
					return ["status" => true, "data" => $results[0]];
				}else{
					return ["status" => false, "message" => ""];
				}

			}

		}else{
			$sql = "SELECT users.id,users.email,users.name,token, companies.name as ucname, (select ROUND(sum(rating)/count(rating)) from form where userid = users.id) as urating from users JOIN companies ON companies.id = users.companies_id where users.email = '".$req->getParam('email')."' and users.password = '".$req->getParam('password')."'";
			$results = $this->fetchResults($mysqli, $sql);
			if(sizeof($results) > 0) {
				return ["status" => true, "data" => $results[0]]; 
			}else{
				return ["status" => false, "message" => "User not found."];
			}
		}


	}

	function getUserReferencesReqs($args){
		if(isset($args,$args['id'])){
			$mysqli = connect();
			$sql = "SELECT referencerequest.id, (select ROUND(sum(rating)/count(rating)) from form where userid = users.id) as urating, unix_timestamp(referencerequest.createdAt) * 1000 as createdAt, users.name, users.id as uid, companies.name as ucname FROM referencerequest JOIN users ON users.id = referencerequest.userid JOIN companies ON users.companies_id = companies.id";
			$results = $this->fetchResults($mysqli, $sql);
			if(sizeof($results) > 0) {
				return ["status" => true, "data" => $results]; 
			}else{
				return ["status" => false];
			}			
		}
	}

	function setUserReferences($req){
		if($req->getParam('userid') && $req->getParam('refid') && $req->getParam('data')){

			$mysqli = connect();

			$sql = $this->insertUpdateBuilder([
				'tablename' => 'form',
				'conditions' => null,
				'fields' => [
					'userid' => $req->getParam('userid'),
					'refid' => $req->getParam('refid'),
					'rating' => $req->getParam('rating'),
					'data' => $req->getParam('data')
				]
			], false);

			$mysqli->query($sql);
			$status = $mysqli->affected_rows > -1;

			if($status)	{
				return ["status" => true];
			}

		}

		return ["status" => false, "message" => ""];
	}

	function getUserReferences($args){
		if(isset($args,$args['id'])){
			$mysqli = connect();
			$sql = "SELECT form.id, form.data,(select ROUND(sum(rating)/count(rating)) from form where userid = users.id) as urating, form.rating, unix_timestamp(form.createdAt) * 1000 as createdAt, users.name, users.id as uid, companies.name as ucname FROM form JOIN users ON users.id = form.userid JOIN companies ON users.companies_id = companies.id";
			$results = $this->fetchResults($mysqli, $sql);
			if(sizeof($results) > 0) {
				return ["status" => true, "data" => $results]; 
			}else{
				return ["status" => false];
			}
		}
	}

	function getCompanies(){

		$mysqli = connect();
		$sql = "SELECT * from companies";
		$results = $this->fetchResults($mysqli, $sql);
		if(sizeof($results) > 0) {
			return ["status" => true, "data" => $results]; 
		}else{
			return ["status" => false];
		}			
	}	


	function getUserDefaultProfilePicture($args){
		$mysqli = connect();

		$filepath = "./profile/" . 'profile.png';
		if(isset($args,$args['id'])){
			$uid = $args['id'];
			$sql = "SELECT picture from users where id = '$uid'";
			$result = $this->fetchResults($mysqli, $sql);
			if($result != false && $result[0]['picture'] && $result[0]['picture'] != "" && file_exists("./profile/".$result[0]['picture'])){
				$filepath = "./profile/".$result[0]['picture'];
			}
		}


		$ntct = Array( "1" => "image/gif",
		               "2" => "image/jpeg",
		               "3" => "image/png",
		               "6" => "image/bmp",
		               "17" => "image/ico");

		header('Content-type: ' . $ntct[exif_imagetype($filepath)]);
		echo file_get_contents($filepath);
		exit;
		
	}

	function updateUser($id, $req){
		echo $id;
		print_r($req->getParams());
	}


	function fetchResults($mysqli, $sql){
		$query = $mysqli->query($sql);
		if(!mysqli_errno($mysqli)){
			$list = [];
		    while($row = mysqli_fetch_assoc($query)) {
		    	$list[] = $row;
		    }
		    return $list;
		}else{
			return false;
		}
	}	


	function insertUpdateBuilder($array, $isUpdate){

		$tablename = $array['tablename'];
		$fields = $array['fields'];
		$conditions = $array['conditions'];

		if($isUpdate){

			$s = [];
			foreach ($fields as $key => $value) {
				$s[] = "`$key` = '$value'";
			}

			$set = join(",", $s);
			return "UPDATE $tablename SET $set WHERE $conditions";


		}else{

			$k = [];
			$v = [];
			foreach ($fields as $key => $value) {
				$k[] = "`$key`";
				$v[] = "'$value'";
			}

			$keys = join(",", $k);
			$values = join(",", $v);
			return "INSERT INTO $tablename ($keys) VALUES ($values)";
		}

	}


}


function connect(){
	$mysqli = new mysqli(DB_URL, DB_USER, DB_PASS, DB_NAME);
	$mysqli->set_charset("utf8");	
	return $mysqli;
}


$app->get('/userpicture/{id}', function (ServerRequestInterface $request, ResponseInterface $response, $args) use ($contentType) {
	$service = new Service();
    return $response->withHeader('Content-type', $contentType)->write(json_encode($service->getUserDefaultProfilePicture($args)));
});

$app->put('/user/{id}', function (ServerRequestInterface $request, ResponseInterface $response, $args) use ($contentType) {
	$service = new Service();
    return $response->withHeader('Content-type', $contentType)->write(json_encode($service->updateUser($args['id'], $request)));
});

$app->post('/signup', function (ServerRequestInterface $request, ResponseInterface $response, $args) use ($contentType) {
	$service = new Service();
    return $response->withHeader('Content-type', $contentType)->write(json_encode($service->signUp($request)));
});

$app->post('/login', function (ServerRequestInterface $request, ResponseInterface $response, $args) use ($contentType) {
	$service = new Service();
    return $response->withHeader('Content-type', $contentType)->write(json_encode($service->login($request)));
});

$app->get('/companies', function (ServerRequestInterface $request, ResponseInterface $response, $args) use ($contentType) {
	$service = new Service();
    return $response->withHeader('Content-type', $contentType)->write(json_encode($service->getCompanies()));
});

$app->get('/ref/{id}', function (ServerRequestInterface $request, ResponseInterface $response, $args) use ($contentType) {
	$service = new Service();
    return $response->withHeader('Content-type', $contentType)->write(json_encode($service->getUserReferences($args)));
});

$app->post('/ref', function (ServerRequestInterface $request, ResponseInterface $response, $args) use ($contentType) {
	$service = new Service();
    return $response->withHeader('Content-type', $contentType)->write(json_encode($service->setUserReferences($request)));
});


$app->get('/refreq/{id}', function (ServerRequestInterface $request, ResponseInterface $response, $args) use ($contentType) {
	$service = new Service();
    return $response->withHeader('Content-type', $contentType)->write(json_encode($service->getUserReferencesReqs($args)));
});


$app->run();