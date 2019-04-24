<?php
	/* 
		Sistema Front-end .. criado por Gabriel A. Barbosa
		Data de criação: 26/06/2018
	*/
	session_start();
	
	/* Inicializando definições */
	require_once("define.php");
	
	/* Iniciando class de conexão com banco de dados */
	require_once "connect/pdo.class.php";
	
	/* Includes */
	require_once "includes/tools.inc.php";
	require_once "includes/youtube.inc.php";

	/* Modulos */
	require_once "modulos/adminNoticias.modulo.php";
	require_once "modulos/adminProjetos.modulo.php";
	require_once "modulos/adminBiblioteca.modulo.php";
	require_once "modulos/adminNewsletter.modulo.php";
	require_once "modulos/adminSlides.modulo.php";
	require_once "modulos/adminCarrousel.modulo.php";
	require_once "modulos/adminImagens.modulo.php";
	require_once "modulos/adminVars.modulo.php";
	require_once "modulos/adminTextos.modulo.php";
	require_once "modulos/adminContato.modulo.php";

	
?>