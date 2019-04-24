<?php
/**
* ▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
*                   Criado por Gabriel Azuaga Barbosa
*                  E-mail: gabrielbarbosaweb7@gmail.com
*  `•.¸¸.•´´¯`••._.• [ http://gabrieldaluz7.co.nf/ ] •._.••`¯´´•.¸¸.•`
* ▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
*/

class tools {

    /* Verifica se URL existe... */
    static function is_url($url) {
        $file_headers = @get_headers($url);
        if ($file_headers[0] == 'HTTP/1.0 404 Not Found'){
            $file_exists = false;
        } else {
            $file_exists = true;
        }
        return $file_exists;
    }

  /* Gerar numeros randomicos */
  static function numeroRandomico($min = 0,$max = 10) {
    return mt_rand($min, $max);
  }

  /* Get DateTime formato MYSQL */
  static function getDateTimeMysql() {
    return date("Y-m-d h:i:s");
  }

  /* Get Date formato MYSQL */
  static function getDateMysql() {
    return date("Y-m-d");
  }

  /* Converte Data de Mysql para BR */
  static function convertDateMysqlToBR($data) {
    return implode("/",array_reverse(explode("-",$data)));
  }
  
  /* Converte Hora 00:00:00 para 00:00 */
  static function convertHoraToHM($hora) {
	$horaEx = explode(":", $hora);
	$horaNova = $horaEx[0].":".$horaEx[1];
	return $horaNova;
  }
  
  /* Converte Data e Hora de Mysql para BR */
  static function convertDateTimeMysqlToBR($dataTime) {
	if(empty($dataTime)) { return false; }
	$explodeString = explode(" ", $dataTime);
	$data = self::convertDateMysqlToBR($explodeString[0]);
	$hora = self::convertHoraToHM($explodeString[1]);
	$retorno = $data." ".$hora;
    return $retorno;
  }

  /* Converte Data de BR para Mysql */
  static function convertDateBRtoMysql($data) {
    return implode("-",array_reverse(explode("/",$data)));
  }

  /* Get Date formato MYSQL */
  static function getTimeMysql() {
    return date("h:i:s");
  }

  /* Get DateTime formato BRASIL */
  static function getDateTimeBR() {
    return date("d/m/Y h:i:s");
  }
  
	/* Função para retornar IP do visitante */
	static function getRealIp()
	{
		if ( !empty( $_SERVER['HTTP_CLIENT_IP'] ) )
		{
			$ip = $_SERVER['HTTP_CLIENT_IP'];
		}
		elseif( !empty( $_SERVER['HTTP_X_FORWARDED_FOR'] ) )
        //to check ip passed from proxy
		{
			$ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
		}
		else
		{
			$ip = $_SERVER['REMOTE_ADDR'];
		}
		return $ip;
	}

    /* Remover break lines de uma string */
    static function removerBreakLinesFromString($string) {
        return  preg_replace( "/\r|\n/", "", $string );
    }

    /* Formatar Bytes para escrita mais legivel */
    static function formatBytes($size, $precision = 0){
        $unit = ['Byte','KB','MB','GB','TB','PB','EB','ZB','YB'];
        for($i = 0; $size >= 1024 && $i < count($unit)-1; $i++){
            $size /= 1024;
        }
        return round($size, $precision).' '.$unit[$i];
    }
    /* Redirecionar */
    static function redirecionar($valor) {
        if(isset($valor)) {
            header("Location: {$valor}");
        }
    }

}
