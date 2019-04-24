<?php
	class adminNewsletter {
		
		private static $tableName = "admin_newsletter";

		public static function gerarFormToken() {
			$_SESSION["newsletter_fucktoken"] = "FUCKTOKEN-".rand(10000000,99999999)."-".rand(10000000,99999999);
			return $_SESSION["newsletter_fucktoken"];
		}

		private static function checkFuckToken($fucktoken) { 
			if(empty($fucktoken) or empty($_SESSION["newsletter_fucktoken"])) { 
				die('Developer: É necessario configurar um fucktoken para inserir novos registros (NewsLetters).'); 
			} else if($fucktoken != $_SESSION["newsletter_fucktoken"]) {
				die('Developer: FuckToken recebido do form é diferente da sessão no servidor!');
			}
		}

		public static function checkExisteEmail($email) {
			if(empty($email)) { return false; }
			try {
				$sql = "select email from ".self::$tableName." where email = '{$email}'"; 
				$p_sql = conexaoPDO::getInstance()->prepare($sql);
				$p_sql->execute();
				if($p_sql->rowCount() > 0) { return true; } 
			} catch (Exception $e) {
				print("Erro: Código: " . $e->getCode() . " Mensagem: " . $e->getMessage() . " SQL: ".$sql);
			}
			return false;
		}

		public static function insertNovoRegistro($nome, $email, $fucktoken) {
			if(empty($email)) { return false; }
			self::checkFuckToken($fucktoken);
			try {
				$sql = "insert into ".self::$tableName." (nome, email, datahora) values (:nome, :email, :datahora);";
				$p_sql = conexaoPDO::getInstance()->prepare($sql);
			 	$p_sql->bindValue(":nome", $nome);
			 	$p_sql->bindValue(":email", $email);
			 	$p_sql->bindValue(":datahora", date("Y-m-d H:i:s"));
			 	$p_sql->execute();
			 	return true;
			} catch (Exception $e) {
				print("Erro: Código: " . $e->getCode() . " Mensagem: " . $e->getMessage() . " SQL: ".$sql);
			}
			return false;
		}
		
	}
?>