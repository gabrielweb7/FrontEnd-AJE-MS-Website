<?php
	class adminSlides {
		
		private static $tableName = "admin_slides";
		
		public static function getAllRegisters($where = NULL, $order = NULL) {
			try {
				$sql = "select * from ".self::$tableName;
				if($where) { $sql .= " WHERE ".$where; }
				if($order) { $sql .= " ORDER BY ".$order; }
				$p_sql = conexaoPDO::getInstance()->prepare($sql);
				$p_sql->execute();
				$rowCount = $p_sql->rowCount();
				if(!$rowCount) { return false; } 
				$fetchAll = $p_sql->fetchAll();	
				return $fetchAll;
			} catch (Exception $e) {
				print("Erro: Código: " . $e->getCode() . " Mensagem: " . $e->getMessage() . " SQL: ".$sql);
			}
			return false;
		} 
		
	}
?>