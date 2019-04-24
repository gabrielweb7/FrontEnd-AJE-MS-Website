<?php
/**
* ▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
*                   Criado por Gabriel Azuaga Barbosa
*                  E-mail: gabrielbarbosaweb7@gmail.com
*  `•.¸¸.•´´¯`••._.• [ http://gabrieldaluz7.co.nf/ ] •._.••`¯´´•.¸¸.•`
* ▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
*/

/* Configuração do TimeZone */
date_default_timezone_set('America/Manaus');

/* Iniciando Definições do FrameWork */
define("ENGINEPHP7_VERSION", "1.0.0");
define("ENGINEPHP7_NAME", "EnginePHP7");
define("ENGINEPHP7_CREATED_BY", "Gabriel A. Barbosa");
define("ENGINEPHP7_CREATED_BY_EMAIL", "gabrielbarbosaweb7@gmail.com");

/* Variaveis Essenciais */
define("SERVER_NAME", $_SERVER["SERVER_NAME"]);
define("REQUEST_URI", $_SERVER["REQUEST_URI"]);
define("SCRIPT_NAME", $_SERVER["SCRIPT_NAME"]);

/* Caminho padrão para upload de arquivos com a classe upload.class.php */
define("UPLOAD_DIR", "EnginePHP7/uploads/");

/* Caminho de imagens padrão */
define("IMAGE_NOUSER_DIR", "EnginePHP7/img/nouser.png");
define("IMAGE_NOIMAGE_DIR", "EnginePHP7/img/noimage.jpg");


/* Definições de Conexão com Banco de Dados */
if(SERVER_NAME == "localhost" || SERVER_NAME == "127.0.0.1") {
  define('ENGINEPHP7_DB_HOST', 'localhost');
  define('ENGINEPHP7_DB_USER', 'root');
  define('ENGINEPHP7_DB_PASS', '');
  define('ENGINEPHP7_DB_NAME', 'novosite_aje_ms_2018');
  /* RAIZ DO SITE */
  define('RAIZ_DIR','http://localhost/@_MEUS_CLIENTES_@/Empreender%20Grupo%20Criativo/AJE%20MS/NovoWebsite2018/WWW_FTP/cms/');
} else {
  define("ENGINEPHP7_DB_NAME","ajems_banco");
  define("ENGINEPHP7_DB_HOST","localhost");
  define("ENGINEPHP7_DB_USER","ajems_user");
  define("ENGINEPHP7_DB_PASS","ops");
  /* RAIZ DO SITE */
  define('RAIZ_DIR','http://ajems.com.br/cms/');
}

/* DEFINE TABELAS DO SISTEMA (MODULOS) */
define('TABLE_USUARIOS', 'admin_usuarios');

define('TABLE_ADMINVARS', 'admin_vars');

define('TABLE_ADMINMENU', 'admin_menu');

define('TABLE_LOGS', 'logs');

define('TABLE_IMAGENS', 'admin_imagens');

define('TABLE_TEXTOS', 'admin_textos');

define('TABLE_SLIDES', 'admin_slides');

define('TABLE_CARROUSEL', 'admin_carrousel');

define('TABLE_CONTATO', 'admin_contato');

define('TABLE_NEWSLETTER', 'admin_newsletter');

define('TABLE_NOTICIAS', 'admin_noticias');

define('TABLE_PROJETOS', 'admin_projetos');

define('TABLE_BIBLIOTECA', 'admin_biblioteca');


/* Define  Tabelas adicionais */
//define('TABLE_INSCRICOES', 'inscricao');
//define('TABLE_TURMAS', 'turmas');
