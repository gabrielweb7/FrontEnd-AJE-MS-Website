<?php
	class tools {

		public static function jsRedirecionar($url) { 
			echo "<script>document.location.href='{$url}';</script>";
		}

		public static function checkEmailValido($email) { 
			if(empty($email)) { return false; }
			return (!preg_match("/^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/ix", $email)) ? false : true;
		}
		
		public static function limitaCaracteres($texto, $limite, $quebra = true){
			$tamanho = strlen($texto);
			if($tamanho <= $limite){
				$novo_texto = $texto;
			}else{ 
				if($quebra == true){
					$novo_texto = trim(substr($texto, 0, $limite))."...";
				}else{ 
					$ultimo_espaco = strrpos(substr($texto, 0, $limite), " "); 
					$novo_texto = trim(substr($texto, 0, $ultimo_espaco))."..."; 
				}
			}
			return $novo_texto; 
		}

		/* Transformar strings para caracteres minusculos e com primeiro caractere em maisculo.. */
		public static function mb_ucfirst($str, $encoding = "UTF-8", $lower_str_end = false) {
			$first_letter = mb_strtoupper(mb_substr($str, 0, 1, $encoding), $encoding);
			$str_end = "";
			if ($lower_str_end) {
				$str_end = mb_strtolower(mb_substr($str, 1, mb_strlen($str, $encoding), $encoding), $encoding);
			} else {
				$str_end = mb_substr($str, 1, mb_strlen($str, $encoding), $encoding);
			}
			$str = $first_letter . $str_end;
			return $str;
		}

	}
?>