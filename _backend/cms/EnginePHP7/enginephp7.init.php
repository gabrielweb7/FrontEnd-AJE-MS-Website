<?php
/**
* ▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
*                   Criado por Gabriel Azuaga Barbosa
*                  E-mail: gabrielbarbosaweb7@gmail.com
*  `•.¸¸.•´´¯`••._.• [ http://gabrieldaluz7.co.nf/ ] •._.••`¯´´•.¸¸.•`
* ▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
*/
/* ByPass */
header("Access-Control-Allow-Origin: *");

/* Forçar codificação */
//header ('Content-type: text/html; charset=ISO-8859-1');
header ('Content-type: text/html; charset=UTF-8');

/* Mostrar erros do sistema ? */
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

/* Configuração de limite de uploads */
ini_set('upload_max_filesize', '25M');
ini_set('post_max_size', '25M');
ini_set('max_input_time', 300);
ini_set('max_execution_time', 300);

/* Iniciando Sessão do Sistema */
session_start();

/* Gerando nova sessão para diminuir probabilidade de sequestro de sessão! */
session_regenerate_id();

/* Carregando Classes Tools do Sistema */
require "class/tools/tools.class.php";
require "class/tools/jsTools.class.php";
require "class/tools/upload.class.php";

/* Carregando Classe de Debug */
require "class/debug.class.php";

/* Carregando Definições do Framework */
require "define.php";

/* Carregando Classes Connectdb do Sistema*/
require "class/connectdb/mysqli.class.php";
mysqlidb::connect();

/* Iniciando Modulos */
require "class/modulos/adminVars.class.php";
require "class/modulos/adminMenu.class.php";
require "class/modulos/autenticacaoUsuario.class.php";

/* COnfig App Class Website */
$configAppClass = "reactive-app no-saved-theme header-bg-danger sidebar-type-push sidebar-state-open sidebar-tr-state-default sidebar-bg-default sidebar-option-default";
