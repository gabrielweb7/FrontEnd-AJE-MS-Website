<?php
/**
 * ▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
 *                   Criado por Gabriel Azuaga Barbosa
 *                  E-mail: gabrielbarbosaweb7@gmail.com
 *  `•.¸¸.•´´¯`••._.• [ http://gabrieldaluz7.co.nf/ ] •._.••`¯´´•.¸¸.•`
 * ▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
 */

class urlAmigavel {

    /* Recebe URL AMIGAVEL e retorna em Array */
    static function getVars($getIdentificador) {
        $url = (isset($_GET[$getIdentificador]))?$_GET[$getIdentificador]:false;
        /* Particiona String recebida em Array e filtra */
        $url = ($url)?array_filter(explode('/', $url)):false;
        return $url;
    }

}
