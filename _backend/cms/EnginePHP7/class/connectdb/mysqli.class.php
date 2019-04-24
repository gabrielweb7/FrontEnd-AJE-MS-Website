<?php
/**
* ▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
*                   Criado por Gabriel Azuaga Barbosa
*                  E-mail: gabrielbarbosaweb7@gmail.com
*  `•.¸¸.•´´¯`••._.• [ http://gabrieldaluz7.co.nf/ ] •._.••`¯´´•.¸¸.•`
* ▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
*/

/* Init Class Mysqlidb */
class mysqlidb {

  /* Variaveis */
  static $con;
  static $result;

  /* Cria conexão com banco de dados */
  static function connect() {
	  
	  /* Configurações Iniciais */
   

      /* Tentando conexão MYSQL */
      try {

		/* Connectando */
        self::$con = new mysqli(ENGINEPHP7_DB_HOST, ENGINEPHP7_DB_USER, ENGINEPHP7_DB_PASS);
	
		/* Configurando Charset Mysql para UTF8 */
        mysqli_set_charset(self::$con, "utf8");
		mb_internal_encoding( 'UTF-8' );
		mb_regex_encoding( 'UTF-8' );
		mysqli_report( MYSQLI_REPORT_STRICT );

        /* Se banco de dados não existir.. mostrar erro */
        if(!self::$con->select_db(ENGINEPHP7_DB_NAME)) {
          die('Banco de dados não existe: ['.ENGINEPHP7_DB_NAME.'] Verifique se o nome está correto!');
        } 
    
      }
	  /* Em caso de erro ... mostrar */
	  catch ( Exception $e ) {
        die('Não foi possivel connectar com banco de dados!');
      }

  }

  /* Funcao para retornar erro de Query inline e debug class */
  static function debugErrorQuery() {
    echo mysqli_error(self::$con);
    debug::consoleLog('%c SQL CONSULTA ERRO ► ['.addslashes(mysqli_error(self::$con)).'] ', 'background:red;color:white;');
  }

  /*
    Executa uma query
    - Caso queira ativar o debug mode é só deixar $debug = true
    Importante: se caso ativar debug mode é preciso alterar a variavel define ENGINEPHP7_DEBUG
    para TRUE. Esse arquivo se encontra na classe debug.class.php
  */
  static function query($sql, $debug = false) {
      /* Query */
      self::$result = mysqli_query(self::$con, $sql) or die (self::debugErrorQuery());
		/* Return */
      return self::$result;
  }

  static function fetch_array($i = null) {
    if(isset($i) and is_object($i)) {
      return mysqli_fetch_array($i);
    } else if(isset(self::$result) and is_object(self::$result)) {
      return mysqli_fetch_array(self::$result);
    } else {
      return null;
    }
  }

  static function fetch_array_all($i = null) {
    if(isset($i) and is_object($i)) {
      return mysqli_fetch_all($i);
    } else if(isset(self::$result) and is_object(self::$result)) {
      return mysqli_fetch_all(self::$result);
    } else {
      return null;
    }
  }

  static function fetch_object($i = null) {

    if(isset($i) and is_object($i)) {
      return mysqli_fetch_object($i);
    } else if(isset(self::$result) and is_object(self::$result)) {
      return mysqli_fetch_object(self::$result);
    } else {
      return null;
    }
  }
  
  /* Função criada para retornar ID do ultimo registro inserido */
  static function return_insert_id($i = null) {
    if(isset($i) and is_object($i)) {
      return mysqli_insert_id($i);
    } else if(isset(self::$con) and is_object(self::$con)) {
      return mysqli_insert_id(self::$con);
    } else {
      return null;
    }
  }

 /* Retorna quantidade de rows encontrados após executar uma query */
  static function num_rows($i = null) {
    /* Se caso variavel de entrada existir usar $i se não pegar na variavel interna */
    if(isset($i) and is_object($i)) {
      return mysqli_num_rows($i);
    } else if(isset(self::$result) and is_object(self::$result)) {
      return mysqli_num_rows(self::$result);
    } else {
      return 0;
    }
  }

  /* Retorna quantidade de registros afetados no banco de dados */
   static function affected_rows() {
	/* Se caso variavel de entrada existir usar $i se não pegar na variavel interna */
    if(isset($i) and is_object($i)) {
      return mysqli_affected_rows($i);
    } else if(isset(self::$con) and is_object(self::$con)) {
      return mysqli_affected_rows(self::$con);
    } else {
      return 0;
    }
   }

  /*
    FILTRO DE VALORES
    - Converte elementos HTML em TEXTO
    - Coloca barra invertida em ASPAS
    - Retira espaços desnecessarios antes e depois da string
  */
  static function filter( $data )
  {
    if( !is_array( $data ) )
    {
      $data = mysqli_real_escape_string(self::$con, $data );
      $data = trim( htmlentities( $data, ENT_QUOTES, 'UTF-8', false ) );
    }
    else
    {
      $data = array_map('self::filter', $data );
    }
    return $data;
  }

  /*
    FILTRO DE VALORES
    - Coloca barra invertida em ASPAS
  */
  static function escape( $data )
  {
    if( !is_array( $data ) )
    {
      $data = mysqli_real_escape_string(self::$con, $data);
    }
    else
    {
      $data = array_map('self::escape', $data);
    }
    return $data;
  }


}
