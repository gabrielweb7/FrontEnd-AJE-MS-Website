<?php

	header("access-control-allow-origin: *");

	require_once "frontphp7/init.php";

	$sql = "select * from associados_db WHERE pagSeguroStatus = 'Aguardando pagamento' or pagSeguroStatus = 'Em análise' or pagSeguroStatus = 'Em disputa' or pagSeguroStatus = 'Retenção temporária' order by id desc";

	$p_sql = conexaoPDO::getInstance()->prepare($sql);
	$p_sql->execute();
	
	$rowCount = $p_sql->rowCount();
	
	/* Caso não existir.. não fazer nada. die(); */
	if(!$rowCount) { die("Nenhum registro a ser atualizado!"); }

	$fetchAll = $p_sql->fetchAll();	

	foreach($fetchAll as $row) { 

		//URL da chamada para o PagSeguro
		$url = "https://ws.pagseguro.uol.com.br/v2/transactions?email=".PAGSEGURO_EMAIL."&token=".PAGSEGURO_TOKEN."&reference=ID_".$row["id"];

		//Transformando os dados da compra no formato da URL
		//$dadosCompra = http_build_query($data);

		//Realizando a chamada
		$curl = curl_init($url);
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		//curl_setopt($curl, CURLOPT_POSTFIELDS, $dadosCompra);
		$respostaPagSeguro = curl_exec($curl);
		$http = curl_getinfo($curl);

		$respostaPagSegurox = simplexml_load_string($respostaPagSeguro);

		$code = (isset($respostaPagSegurox->transactions->transaction->code))?$respostaPagSegurox->transactions->transaction->code:"0";

		if($respostaPagSegurox->transactions->transaction->status == "1") { 
			$statusText = "Aguardando pagamento";
		} else if($respostaPagSegurox->transactions->transaction->status == "2") { 
			$statusText = "Em análise";
		} else if($respostaPagSegurox->transactions->transaction->status == "3") { 
			$statusText = "Paga";
		} else if($respostaPagSegurox->transactions->transaction->status == "4") { 
			$statusText = "Disponível";
		} else if($respostaPagSegurox->transactions->transaction->status == "5") { 
			$statusText = "Em disputa";
		} else if($respostaPagSegurox->transactions->transaction->status == "6") { 
			$statusText = "Devolvida";
		} else if($respostaPagSegurox->transactions->transaction->status == "7") { 
			$statusText = "Cancelada";
		} else if($respostaPagSegurox->transactions->transaction->status == "8") { 
			$statusText = "Debitado";
		} else if($respostaPagSegurox->transactions->transaction->status == "9") { 
			$statusText = "Retenção temporária";
		} else { 
			$statusText = "Aguardando pagamento";
		}

		/* Atualizando registro no banco de dados com checkout do pagseguro */
		$sql = "UPDATE associados_db set transactionCode = '{$code}', pagSeguroStatus = '{$statusText}' where id = ".$row["id"].";";

		/* Execute Sql */
		try {
			$p_sql = conexaoPDO::getInstance()->prepare($sql);
		 	$p_sql->execute();
		} catch (Exception $e) {
			print("Erro: Código: " . $e->getCode() . " Mensagem: " . $e->getMessage() . " SQL: ".$sql);
		}

	}	

	echo $rowCount." registro(s) atualizado(s).";
?>