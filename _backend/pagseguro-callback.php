<?php

	header("access-control-allow-origin: *");

	require_once "frontphp7/init.php";

/*
	$name = 'arquivo.txt';
	$text = var_export($_POST, true);
	$text .= "[".date("d/m/Y H:i:s")."] \n \n";
	$file = fopen($name, 'a');
	fwrite($file, $text);
	fclose($file);
*/

	if(!isset($_POST["notificationCode"])) { die(false); }
	if(!isset($_POST["notificationType"])) { die(false); }

	$transactionCode = filter_var($_POST["notificationCode"], FILTER_SANITIZE_STRING);
	$notificationType = filter_var($_POST["notificationType"], FILTER_SANITIZE_STRING);

	if($notificationType == "transaction") { 

		 //URL da chamada para o PagSeguro
	    $url = "https://ws.pagseguro.uol.com.br/v2/transactions/".$transactionCode."?email=".PAGSEGURO_EMAIL."&token=".PAGSEGURO_TOKEN;
	    
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

		$code = $respostaPagSegurox->code;

		/* 
			Se caso não existir o id.. die 
		*/
		if(empty($code)) { die(false); }

		$reference = $respostaPagSegurox->reference;
		$referenceId = str_replace("ID_", "", $reference);

		if($respostaPagSegurox->status == "1") { 
			$statusText = "Aguardando pagamento";
		} else if($respostaPagSegurox->status == "2") { 
			$statusText = "Em análise";
		} else if($respostaPagSegurox->status == "3") { 
			$statusText = "Paga";
		} else if($respostaPagSegurox->status == "4") { 
			$statusText = "Disponível";
		} else if($respostaPagSegurox->status == "5") { 
			$statusText = "Em disputa";
		} else if($respostaPagSegurox->status == "6") { 
			$statusText = "Devolvida";
		} else if($respostaPagSegurox->status == "7") { 
			$statusText = "Cancelada";
		} else if($respostaPagSegurox->status == "8") { 
			$statusText = "Debitado";
		} else if($respostaPagSegurox->status == "9") { 
			$statusText = "Retenção temporária";
		} else { 
			$statusText = "Nenhum!";
		}

		/* Atualizando registro no banco de dados com checkout do pagseguro */
		$sql = "UPDATE associados_db set transactionCode = '{$code}', pagSeguroStatus = '{$statusText}' where id = {$referenceId};";

		/* Execute Sql */
		try {
			$p_sql = conexaoPDO::getInstance()->prepare($sql);
		 	$p_sql->execute();
		 	echo true;
		} catch (Exception $e) {
			print("Erro: Código: " . $e->getCode() . " Mensagem: " . $e->getMessage() . " SQL: ".$sql);
		}

	}

?>