<?php

	/* Configuração do TimeZone */
	date_default_timezone_set('America/Manaus');
	
	/* Variaveis Essenciais */
	define("SERVER_NAME", $_SERVER["SERVER_NAME"]);
	define("REQUEST_URI", $_SERVER["REQUEST_URI"]);
	define("SCRIPT_NAME", $_SERVER["SCRIPT_NAME"]);

	/* Configurações de conexão com o banco de dados */
	if(SERVER_NAME == "localhost" || SERVER_NAME == "127.0.0.1") {
		define("DATABASE_DB","novosite_aje_ms_2018");
		define("DATABASE_HOST","localhost");
		define("DATABASE_USER","root");
		define("DATABASE_PASS","");
		/* RAIZ DO SITE */
		define('RAIZ_DIR','http://localhost/@_MEUS_CLIENTES_@/Empreender%20Grupo%20Criativo/AJE%20MS/NovoWebsite2018/WWW_FTP/');
	} else {
		define("DATABASE_DB","ajems_banco");
		define("DATABASE_HOST","localhost");
		define("DATABASE_USER","ajems_user");
		define("DATABASE_PASS","Ops");
		/* RAIZ DO SITE */
		define('RAIZ_DIR','http://ajems.com.br/');
	}

	define("PAGSEGURO_EMAIL", "secretaria.ajems@gmail.com");
	define("PAGSEGURO_TOKEN", "66D4936B6EA24E11B8E7602F7B98B562");

?>