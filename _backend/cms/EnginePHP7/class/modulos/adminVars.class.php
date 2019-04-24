<?php
/**
 * ▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
 *                   Criado por Gabriel Azuaga Barbosa
 *                  E-mail: gabrielbarbosaweb7@gmail.com
 *  `•.¸¸.•´´¯`••._.• [ http://gabrieldaluz7.co.nf/ ] •._.••`¯´´•.¸¸.•`
 * ▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
 */

/* Classe criada para acessar e gerenciar tabela config_vars */
class adminVars {

    /* Recebe valor da variavel dinamica através do identificador */
    public static function getValue($identificador)
    {
        /* Se caso a sessao não existe.. carregar sessoes via mysql */
        if (!isset($_SESSION["adminVars"][$identificador])) {
            self::loadVarsSession();
        }
        $re = (isset($_SESSION["adminVars"][$identificador])) ? $_SESSION["adminVars"][$identificador] : false;
        return $re;
    }

    /* Função que carrega todas variaveis do sistema em uma sesão! */
    public static function loadVarsSession() {
        /* Inicia SQL */
        $sql = "select identificador,valor from ".TABLE_ADMINVARS." where categoria = 'cms';";
        /* Query */
        mysqlidb::query($sql);
        /* Num Rows */
        $nums = mysqlidb::num_rows();
        if ($nums) {
            for($i=0;$i<$nums;$i++) {
                $re = mysqlidb::fetch_array();
                $_SESSION["adminVars"][$re["identificador"]] = $re["valor"];
            }
        }
    }

}
