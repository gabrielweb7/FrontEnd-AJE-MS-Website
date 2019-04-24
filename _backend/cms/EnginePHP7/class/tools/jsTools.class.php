<?php
/**
 * ▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
 *                   Criado por Gabriel Azuaga Barbosa
 *                  E-mail: gabrielbarbosaweb7@gmail.com
 *  `•.¸¸.•´´¯`••._.• [ http://gabrieldaluz7.co.nf/ ] •._.••`¯´´•.¸¸.•`
 * ▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
 */
 
 /* Classe criada somente para trabalhar com javascript */
class jsTools {
	
	/* Função criada para criar alert em javascript utilizando php */
	static function alert($text) {
		if(isset($text)) { 
			self::echoScript("alert('".$text."');");
		}
	}

	/* escreve console.log em javascript utilizando php */
	static function consoleLog($text, $css = "") {
		if(isset($text)) {
			if(!isset($css)) {
				self::echoScript("console.log('".$text."')");
			} else {
				self::echoScript("console.log('".$text."','".$css."')");
			}
		}
	}

	/* Escreve dentro de tags <script> ... </script> */
	static function echoScript($valor) {
		if(isset($valor)) {
		  echo "<script>".$valor."</script>";
		}
	}

	/* Redirecionar */
	static function redirecionar($valor) {
		if(isset($valor)) {
			self::echoScript("document.location.href=\"{$valor}\";");
		}
	}

}
