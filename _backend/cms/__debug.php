<?php
/**
 * ▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
 *                   Criado por Gabriel Azuaga Barbosa
 *                  E-mail: gabrielbarbosaweb7@gmail.com
 *  `•.¸¸.•´´¯`••._.• [ http://gabrieldaluz7.co.nf/ ] •._.••`¯´´•.¸¸.•`
 * Name: DebugTools7 <1.0.0>
 * ▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
 */

/* Load Session */
session_start();

$version = "1.0.0";
$senha = "grupo7"; /* variavel da senha para acessar o arquivo via get debug.php?s=<senha> */

/* Recebe informações via GET */
$s = (isset($_GET["s"])) ? $_GET["s"] : false;
$a = (isset($_GET["a"])) ? $_GET["a"] : false;

/* Verifica se palavra passe está correta! */
if(!$s or $s !== $senha) { die("Erro na autenticação!"); }

?>
    <html>
    <head>
        <style>
            button { padding:5px 10px; cursor:pointer;background:black; color:red; border:1px solid red; }
            button.active { color:white; }
        </style>
    </head>
    <body style='background:black;color:deepskyblue;font-family:monospace;font-size:12px;'>

        <div style='color:lawngreen;'>Deubg created By Gabriel A. Barbosa (gabrielbarbosaweb7@gmail.com) [Version <?php echo $version; ?>] </div>
        <br />

        <!-- Menu -->
        <a href="?s=<?php echo $s; ?>&a=showAllSessions"><button <?php echo ($a=="showAllSessions")?"class='active'":null; ?>>ShowAllSesssions</button></a>
        <a href="?s=<?php echo $s; ?>&a=showAllCookies"><button <?php echo ($a=="showAllCookies")?"class='active'":null; ?>>ShowAllCookies</button></a>
        <a href="?s=<?php echo $s; ?>&a=showVarServer"><button <?php echo ($a=="showVarServer")?"class='active'":null; ?>>ShowVarServer</button></a>
        <a href="?s=<?php echo $s; ?>&a=showVarIniGet"><button <?php echo ($a=="showVarIniGet")?"class='active'":null; ?>>showVarIniGet</button></a>
		<br>
<?php

    if($a == "showAllSessions") {
        echo "<pre>";
        print_r($_SESSION);
    }  else if($a == "showAllCookies") {
        echo "<pre>";
        print_r($_COOKIE);
    } else if($a == "showVarServer") {
        echo "<pre>";
        print_r($_SERVER);
    } else if($a == "showVarIniGet") {
    
        echo '<br> <span style="color:yellow">[UPLOADS VARS]</span>';
        echo '<br> > upload_max_filesize = '.ini_get('upload_max_filesize');
        echo '<br> > post_max_size = '.ini_get('upload_max_filesize');
        echo '<br> > max_input_time = '.ini_get('max_input_time');
        echo '<br> > max_execution_time = '.ini_get('max_execution_time');
    }
?>


