<?php
/**
* ▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
*                   Criado por Gabriel Azuaga Barbosa
*                  E-mail: gabrielbarbosaweb7@gmail.com
*  `•.¸¸.•´´¯`••._.• [ http://gabrieldaluz7.co.nf/ ] •._.••`¯´´•.¸¸.•`
* ▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
*/

/* Debug Mode */
define('ENGINEPHP7_DEBUG', false);

class debug {
  static function consoleLog($text, $css = "") {
    if(!empty($text) && ENGINEPHP7_DEBUG) {
      jsTools::consoleLog($text, $css);
    }
  }
}

debug::consoleLog("%c `•.¸¸.•´´¯`••._.• [ ENGINEPHP7 ] •._.••`¯´´•.¸¸.•`", "background:black; color:white; font-size:17px; padding:4px;");
debug::consoleLog("%c `•.¸¸.•´´¯`••._.• [ DEBUG MODE ] •._.••`¯´´•.¸¸.•`", "background:black; color:white; font-size:17px; padding:4px;");
debug::consoleLog(' ');
