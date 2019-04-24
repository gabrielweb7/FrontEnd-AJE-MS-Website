<?php
    /**
    * ▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
    *                   Criado por Gabriel Azuaga Barbosa
    *                  E-mail: gabrielbarbosaweb7@gmail.com
    *  `•.¸¸.•´´¯`••._.• [ http://gabrieldaluz7.co.nf/ ] •._.••`¯´´•.¸¸.•`
    * ▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
    */

    /* Load Framework PHP created by Gabriel A. Barbosa */
    require "EnginePHP7/enginephp7.init.php";

    /* Verifica se está logado ou não */
    if(autenticacaoUsuario::getStatusLogin()) {
        jsTools::redirecionar("dashboard.php");
    } else {
        jsTools::redirecionar("login.php");
    }

	die("o.o?");