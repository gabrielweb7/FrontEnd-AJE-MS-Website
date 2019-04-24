<?php
/**
 * ▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
 *                   Criado por Gabriel Azuaga Barbosa
 *                  E-mail: gabrielbarbosaweb7@gmail.com
 *  `•.¸¸.•´´¯`••._.• [ http://gabrieldaluz7.co.nf/ ] •._.••`¯´´•.¸¸.•`
 * ▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
 */

debug::consoleLog('%c MODULO INICIADO: adminMenu', 'background:#00efb7;font-weight:bold;color:black;padding:2px 5px;font-size:12px;');

/* Classe criada para acessar e gerenciar tabela config_vars */
class adminMenu {

    /* Vai nular as sessoes do menu */
    public static function unsetSessions() { 
        /* Resetar sessoes do menu */
        unset($_SESSION["mactive"]);
        unset($_SESSION["pactive"]);
    }

    /* Recebe Array de registro by id */
    static function getArrayPageDinamicaById($id) {
        $sql = "SELECT * FROM ".TABLE_ADMINMENU." where id = {$id};";
        mysqlidb::query($sql);
        $pageDinamicArr = mysqlidb::fetch_array();
        return $pageDinamicArr;
    }

    /* Recebe menus apenas pai_id = 0 em Array */
    static function getArrayMenus() {
        $sql = "SELECT * FROM ".TABLE_ADMINMENU." where pai_id = 0 order by ordem asc;";
        mysqlidb::query($sql);
        if(mysqlidb::num_rows()) {
            for($i=0;$i<mysqlidb::num_rows();$i++) {
                $menuItens[$i] = mysqlidb::fetch_array();
            }
            return $menuItens;
        } else {
            return false;
        }
    }

    static function getArrayMenusFilhos($idPai) {
        $sql = "SELECT * FROM ".TABLE_ADMINMENU." where pai_id = {$idPai} order by ordem asc;";
        mysqlidb::query($sql);
        if(mysqlidb::num_rows()) {
            for($i=0;$i<mysqlidb::num_rows();$i++) {
                $menuItens[$i] = mysqlidb::fetch_array();
            }
            return $menuItens;
        } else {
            return false;
        }
    }

    /* Função criada para alimentar uma variavel com valores do registro obtido no banco */
    public static function getVarsMenuPage($menu_id) { 
        $sql = "SELECT * FROM ".TABLE_ADMINMENU." where id = {$menu_id};";
        mysqlidb::query($sql);
        $pageDinamicArr = mysqlidb::fetch_array();
        if(empty($pageDinamicArr["paginaTitulo"])) { $pageDinamicArr["paginaTitulo"] = $pageDinamicArr["menuTitulo"]; }
        return $pageDinamicArr;
    }


}
