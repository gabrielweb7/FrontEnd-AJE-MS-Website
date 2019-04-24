<?php
	class adminContato {
		
		private static $tableName = "admin_contato";

		public static function insertNovoRegistro($nome, $email, $telefone, $assunto, $mensagem) {
			if(empty($email)) { return false; }
			try {
				$sql = "insert into ".self::$tableName." (nome, telefone, assunto, email, mensagem, data_envio) values (:nome, :telefone, :assunto, :email, :mensagem, :data_envio);";
				$p_sql = conexaoPDO::getInstance()->prepare($sql);
			 	$p_sql->bindValue(":nome", $nome);
			 	$p_sql->bindValue(":telefone", $telefone);
			 	$p_sql->bindValue(":assunto", $assunto);
			 	$p_sql->bindValue(":email", $email);
			 	$p_sql->bindValue(":mensagem", $mensagem);
			 	$p_sql->bindValue(":data_envio", date("Y-m-d H:i:s"));
			 	$p_sql->execute();
			 	return true;
			} catch (Exception $e) {
				print("Erro: Código: " . $e->getCode() . " Mensagem: " . $e->getMessage() . " SQL: ".$sql);
			}
			return false;
		}
		
	}
?>