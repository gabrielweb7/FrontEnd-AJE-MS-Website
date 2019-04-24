<?php
/**
* ▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
*                   Criado por Gabriel Azuaga Barbosa
*                  E-mail: gabrielbarbosaweb7@gmail.com
*  `•.¸¸.•´´¯`••._.• [ http://gabrieldaluz7.co.nf/ ] •._.••`¯´´•.¸¸.•`
* ▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
*/

/* Classe criada para autenticar e controlar sessão do usuario no sistema */
class autenticacaoUsuario {

    /* Funcao de Logout */
    static function logout() {
     	session_unset();
        session_destroy();
    }

    /* Funcao para setar sessao ID */
    static function setNome($valor) {
        $_SESSION["usuario_nome"] = $valor;
    }
    /* Funcao para setar sessao ID */
    static function setSobrenome($valor) {
        $_SESSION["usuario_sobrenome"] = $valor;
    }
    /* Funcao para setar sessao ID */
    static function setFoto($valor) {
        $_SESSION["usuario_foto"] = $valor;
    }

    /* Funcao para setar sessao ID */
    static function setSessionId($valor) {
        $_SESSION["usuario_id"] = $valor;
    }

    /* Funcao para setar sessao email */
    static function setSessionEmail($valor) {
        $_SESSION["usuario_email"] = $valor;
    }

    /* Funcao para setar nivel de acesso */
    static function setNivelAcesso($valor) {
        $_SESSION["usuario_nivelAcesso"] = $valor;
    }

    /* Funcao para setar nivel de acesso */
    static function setCargo($valor) {
        $_SESSION["usuario_cargo"] = $valor;
    }

    /* Funcao para retornar nivel de acesso */
    static function getCargo() {
        return (isset($_SESSION["usuario_cargo"]))?$_SESSION["usuario_cargo"]:false;
    }

    /* Funcao para retornar nivel de acesso */
    static function getNome() {
        return (isset($_SESSION["usuario_nome"]))?$_SESSION["usuario_nome"]:false;
    }

    /* Funcao para retornar nivel de acesso */
    static function getSobrenome() {
        return (isset($_SESSION["usuario_sobrenome"]))?$_SESSION["usuario_sobrenome"]:false;
    }

    /* Funcao para retornar nivel de acesso */
    static function getFoto() {
        return (isset($_SESSION["usuario_foto"]))?$_SESSION["usuario_foto"]:false;
    }

    /* Funcao para retornar nivel de acesso */
    static function getNivelAcesso() {
        return (isset($_SESSION["usuario_nivelAcesso"]))?$_SESSION["usuario_nivelAcesso"]:false;
    }

    /* Funcao para retornar valor da sessao ID */
    static function getSessionId() {
        return (isset($_SESSION["usuario_id"]))?$_SESSION["usuario_id"]:false;
    }

    /* Funcao para retornar valor da sessao EMAIL */
    static function getSessionEmail() {
        return (isset($_SESSION["usuario_email"]))?$_SESSION["usuario_email"]:false;
    }

    /* Função para verificar se usuario está logado! */
	static function getStatusLogin() {
	    
		/* Se sessão existir */
	    if(self::getSessionId() and self::getSessionEmail()) {
		
			/* Variaveis */
            $id = self::getSessionId();
            $email = self::getSessionEmail();
            $sql = "select id,email from ".TABLE_USUARIOS." where id = '{$id}' and email = '{$email}' LIMIT 1";
			
			/* Query */
            mysqlidb::query($sql);
            
			/* se quantidade de registros for positivo retornar true */
			if(mysqlidb::num_rows()) {
                return true;
            }

        }
        return false;
    }

	/* Função para autenticar usuario via Login e Senha */
	static function login($login, $senha, $returnJson = false) {
		
		/* Debug */
		debug::consoleLog('%c MODULO ACTION: autenticacaoUsuario::autenticarUsuarioByLoginSenha("'.$login.'","'.$senha.'",'.$returnJson.')', 'background:#00efb7;font-weight:bold;color:black;padding:2px 5px;font-size:12px;');

		/* Inicia variavel que vai gerar Json */
		$jsonSaida = array();
		
		/* Validação E-mail Post */
		$login = (!empty($login))?filter_var($login, FILTER_SANITIZE_STRING):false;
		if(!$login) { 
			$jsonSaida["error"][] = ["email" => "Digite seu e-mail!"];
		}
		
		/* Validação Senha Post */
		$senha = (!empty($senha))?filter_var($senha, FILTER_SANITIZE_STRING):false;
		if(!$senha){ 
			$jsonSaida["error"][] = ["senha" => "Digite sua senha!"];
		}
		
		/* Senão existir nenhum erro... */
		if(!isset($jsonSaida["error"])) { 
		
			/* Create SQL de Comparação */
			$sql = "select id,email,senha,nivelAcesso,nome,sobrenome,foto,cargo from ".TABLE_USUARIOS." where email = '".$login."' and senha = '".$senha."' LIMIT 1;";
			
			/* Query */
			mysqlidb::query($sql);
			
			/* Resultado Positivo da Consulta */
			if(mysqlidb::num_rows()) {

				/* json retorno */
				$jsonSaida["sucesso"] = "Autenticação efetuado com sucesso!";

				/* Recebe Array */
				$re = mysqlidb::fetch_array();

				/* Cria sessions de usuario logado! */
                self::setSessionId($re["id"]);
                self::setSessionEmail($re["email"]);
                self::setNivelAcesso($re["nivelAcesso"]);
                self::setNome($re["nome"]);
                self::setSobrenome($re["sobrenome"]);
                self::setFoto($re["foto"]);
                self::setCargo($re["cargo"]);

            } else {
				
				/* json retorno */
				$jsonSaida["error"] = "O endereço de email ou a senha que você inseriu não é válido. Tente novamente. ";
				
			}
			
		}
		
		/* Gera Json Resultados */
		if($returnJson) { 
			$jsonSaida = json_encode($jsonSaida);
		} 

		/* Debug */
		debug::consoleLog('%c MODULO ACTION RETURN >> '.json_encode($jsonSaida), 'background:#00a780;font-weight:bold;color:black;padding:2px 5px;font-size:12px;');
		
		/* Return */
		return $jsonSaida;
		
	}
	
	/* funcao criada para atualizar informacoes do usuario nas sessoes :3 */
	static function updateUserSessions() {

		/* Verifica se ID existe */
		if(self::getSessionId()) { 
		
			/* Create SQL de Comparação */
			$sql = "select id,email,senha,nivelAcesso,nome,sobrenome,foto,cargo from ".TABLE_USUARIOS." where id = ".self::getSessionId()." and email = '".self::getSessionEmail()."' LIMIT 1;";
			
			/* Query */
			mysqlidb::query($sql);
			
			/* Se registro for encontrado */
			if(mysqlidb::num_rows()) {

				/* Recebe Array */
				$re = mysqlidb::fetch_array();

				/* atualiza sessions de usuario logado! */
				self::setSessionEmail($re["email"]);
				self::setNivelAcesso($re["nivelAcesso"]);
				self::setNome($re["nome"]);
				self::setSobrenome($re["sobrenome"]);
				self::setFoto($re["foto"]);
				self::setCargo($re["cargo"]);

			} 
			
		} 
	}
}