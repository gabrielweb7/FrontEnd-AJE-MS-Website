<?php
/**
* ▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
*                   Criado por Gabriel Azuaga Barbosa
*                  E-mail: gabrielbarbosaweb7@gmail.com
*  `•.¸¸.•´´¯`••._.• [ http://gabrieldaluz7.co.nf/ ] •._.••`¯´´•.¸¸.•`
* ▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
*/

/* Classe para fazer upload de arquivos */
class upload {

	/* Variaveis */
	static $file;
	static $fileNewName;
	static $errorMsg;
	static $remoteDir;

	/* Gerar nome randomico */
	static function getRandomName() {
		return tools::numeroRandomico(1111111,9999999)."_".time();
	}

	/* Retorna somente a extensao do arquivo */
	static function getExtensionByName() {
		$path = self::getFileName();
		return pathinfo($path, PATHINFO_EXTENSION);
	}

	/* Funcao criada para verificar se variavel existe.. e verificar se arquivo existe no diretorio */
	static function arquivoExisteNoDir($filex) { 
		if(isset($filex) and file_exists($filex)) { 
			return true;
		} else { 
			return false;
		}
	}
	
	/* Tratamento de erros do upload file */
	static function tratamentoDeErros($erroId) { 
		switch ($erroId) { 
			case 1: return "O arquivo enviado excede o limite definido na diretiva upload_max_filesize do php.ini.";
			case 2: return "O arquivo excede o limite definido em MAX_FILE_SIZE no formulário HTML.";
			case 3: return "O upload do arquivo foi feito parcialmente.";
			case 6: return "Pasta temporária ausênte. Introduzido no PHP 5.0.3.";
			case 7: return "Falha em escrever o arquivo em disco. Introduzido no PHP 5.1.0.";
			case 8: return "Uma extensão do PHP interrompeu o upload do arquivo. O PHP não fornece uma maneira de determinar qual extensão causou a interrupção. Examinar a lista das extensões carregadas com o phpinfo() pode ajudar. Introduzido no PHP 5.2.0.";
			default: return "Erro não identificado ? o.o"; 
		}
	}
	
	/* função criada para fazer upload do arquivo com diversos filtros e validaçoes */
	static function arquivo($file, $novoNome, $dirUpload, $extension, $maxSizeBytes) {

		/* Configura variavel central da classe */
		self::$file = $file;
		

		/* Valida se $file é uma array alimentada com $_FILES corretamente */
		if(!isset($file['tmp_name']) or empty($file['tmp_name'])) { 
			return false;
		}
		
		/* Verifica existencia de erros */
		if(isset($file["error"]) and $file["error"] > 0) { 
		
			/* Tratamento de erros */
			$msg = self::tratamentoDeErros($file["error"]);
			self::setErrorMsg($msg);
			return false;
			
		}
		
		/* Se caso do novo nome for vazio retornar Erro */
		if(empty($novoNome)) {
			
			/* Erro Msg */
			self::setErrorMsg('[Developer Error] a Variavel $novoNome não está recebendo nenhum valor! ');
			return false;
			
		}

		/* Seta novo nome do arquivo */
		self::setFileNewName($novoNome);

		/* Seta Caminho completo do upload */
		self::setRemoteDir($dirUpload.self::getFileNewName().".".self::getExtensionByName());

		/* Checar se extensão é permitida */
		if(!in_array(self::getExtensionByName(), $extension)) {
			
			/* Erro Msg */
			self::setErrorMsg("Extensão não permitida! Somente: ".implode(',',$extension));
			return false;
		
		}

		/* Checar se o tamanho do arquivo está dentro do permitido */
		if(self::getFileSize() >= $maxSizeBytes) {
			
			/* Erro Msg */
			self::setErrorMsg("Tamanho máximo de upload permitido: ".tools::formatBytes($maxSizeBytes, 0)."");
			return false;

		}

		/*
		  Verificar se pasta setado para upload do arquivo existe
		  se caso não existe.. criar uma
		*/
		if(!is_dir($dirUpload)) {
		  
		  /* Criando um diretorio... */
		  if(mkdir($dirUpload, 0755, true)) {
			  
			/* Diretorio criado com sucesso! */
		  
		  } else {
			  
			/* Erro Msg */
			self::setErrorMsg("File Upload: Não possivel criar diretorio novo para upload do arquivo! [".$dirUpload."]");
			return false;
		  
		  }
		  
		}

		/*
		  Iniciando Upload do Arquivo
		*/
		if(move_uploaded_file(self::getFileTmp(), self::getRemoteDir())) {
			
			/* Upload feito com sucesso! Retorna caminho */
			return self::getRemoteDir();
			
		} else {
			
			/* Erro Msg */
			self::setErrorMsg("Não foi possivel mover arquivo");
			return false;

		}

	}

	static function getFileName() {
	  return self::$file['name'];
	}
	
	static function getFileError() {
	  return self::$file['error'];
	}
	
	static function getFileType() {
	  return self::$file['type'];
	}
	
	static function getFileSize() {
	  return self::$file['size'];
	}
	
	static function getFileTmp() {
	  return self::$file['tmp_name'];
	}
	
	static function setErrorMsg($errorMsg) {
	  self::$errorMsg = $errorMsg;
	}
	
	static function getFileNewName() {
	  return self::$fileNewName;
	}
	
	static function setFileNewName($newName) {
	  self::$fileNewName = $newName;
	}
	
	static function getErrorMsg() {
	  return self::$errorMsg;
	}
	
	static function setRemoteDir($dir) {
	  self::$remoteDir = $dir;
	}
	
	static function getRemoteDir() {
	  return self::$remoteDir;
	}

}
