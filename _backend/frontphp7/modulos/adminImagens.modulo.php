<?php
	class adminImagens {
		
		private static $tableName = "admin_imagens";
		
		public static function getRegister($where = NULL) {
			if($where) { 
				try {
					$sql = "select * from ".self::$tableName;
					$sql .= " WHERE ".$where;
					$sql .= " LIMIT 1"; 
					$p_sql = conexaoPDO::getInstance()->prepare($sql);
					$p_sql->execute(); 
					$rowCount = $p_sql->rowCount();
					if(!$rowCount) { return false; } 
					$row = $p_sql->fetch();
					return $row;
				} catch (Exception $e) {
					print("Erro: Código: " . $e->getCode() . " Mensagem: " . $e->getMessage() . " SQL: ".$sql);
				}
			}
			return false;
		} 
		
	}
?>