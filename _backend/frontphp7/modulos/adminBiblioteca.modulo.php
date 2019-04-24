<?php
	class adminBiblioteca {
		
		private static $tableName = "admin_biblioteca";
		
		public static function getAllRegisters($where = NULL, $order = NULL, $limit = NULL) {
			try {
				$sql = "select * from ".self::$tableName;
				if($where) { $sql .= " WHERE ".$where; }
				if($order) { $sql .= " ORDER BY ".$order; }
				if($limit) { $sql .= " LIMIT ".$limit; }
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

		public static function getRowCount($where = NULL) {
			try {
				$sql = "select id from ".self::$tableName;
				if($where) { $sql .= " WHERE ".$where; }
				$p_sql = conexaoPDO::getInstance()->prepare($sql);
				$p_sql->execute();
				$rowCount = $p_sql->rowCount();
				if(!$rowCount) { return false; } 
				return $rowCount;
			} catch (Exception $e) {
				print("Erro: Código: " . $e->getCode() . " Mensagem: " . $e->getMessage() . " SQL: ".$sql);
			}
			return false;
		}

	public static function get_pagination_links($current_page, $total_pages, $url)
		{
		    $links = "";
		    if ($total_pages >= 1 && $current_page <= $total_pages) {
		    	$active = ($current_page == 1) ? "active":"";
		        $links .= "<a href=\"{$url}?pag=1\" class=\"{$active}\">1</a>";
		        $i = max(2, $current_page - 5);
		        if ($i > 2) { 
		            $links .= " ... ";
		        }
		        for (; $i < min($current_page + 6, $total_pages); $i++) {
	        		$active = ($i == $current_page) ? "active":"";
		            $links .= "<a href=\"{$url}?pag={$i}\" class=\"{$active}\">{$i}</a>";
		        }
		        if ($i != $total_pages and $total_pages > 1) { 
		            $links .= " ... ";
		        }
		        if($total_pages > 1) { 
		        	$active = ($current_page == $total_pages) ? "active":"";
		        	$links .= "<a href=\"{$url}?pag={$total_pages}\" class=\"{$active}\">{$total_pages}</a>";
		        }
		    }
		    return $links;
		}


		public static function getAllRegistersPagination($where = NULL, $order = NULL, $limit = NULL) {
			try {
				$sql = "select * from ".self::$tableName;
				if($where) { $sql .= " WHERE ".$where; }
				if($order) { $sql .= " ORDER BY ".$order; }
				if($limit) { $sql .= " LIMIT ".$limit; }
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