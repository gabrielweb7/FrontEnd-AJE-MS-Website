<?php
    header("Access-Control-Allow-Origin: *");

	require_once "frontphp7/init.php";

	$action = (isset($_REQUEST["action"])) ? $_REQUEST["action"]: false;

	/* registerNewsletter */
	if($action == "registerNewsletter") {
		$nome = filter_var($_POST["nome"], FILTER_SANITIZE_STRING);
		$email = filter_var($_POST["email"], FILTER_SANITIZE_STRING);
		$fuckToken = filter_var($_POST["fucktoken"], FILTER_SANITIZE_STRING);
		if(tools::checkEmailValido($email)) { 
			if(!adminNewsletter::checkExisteEmail($email)) {
				if(adminNewsletter::insertNovoRegistro($nome, $email, $fuckToken)) { 
					echo "1"; /* E-mail inserido com sucesso no banco de dados */
				} else {
					echo "0"; /* Por algum motivo não foi possivel registrar email no banco de dados */
				}
			} else {
				echo "-1"; /* E-mail já existe no banco de dados */
			}
		} else { 
			echo "-2"; /* E-mail não é valido! */ 
		}
	} else if($action == "sendEmailContato") {

		$nome = filter_var($_POST["nome"], FILTER_SANITIZE_STRING);
		$email = filter_var($_POST["email"], FILTER_SANITIZE_STRING);
		$telefone = filter_var($_POST["telefone"], FILTER_SANITIZE_STRING);
		$assunto = filter_var($_POST["assunto"], FILTER_SANITIZE_STRING);
		$mensagem = filter_var($_POST["mensagem"], FILTER_SANITIZE_STRING);

		if(tools::checkEmailValido($email)) {
			if(adminContato::insertNovoRegistro($nome, $email, $telefone, $assunto, $mensagem)) { 
					echo "1"; /* E-mail inserido com sucesso no banco de dados */
			} else {
				echo "0"; /* Por algum motivo não foi possivel registrar email no banco de dados */
			}
		} else { 
			echo "-2"; /* E-mail não é valido! */ 
		}

	} else if($action == "upAssTransaction") {

		/* Security Post Website */
		if(!isset($_SESSION["formToken"])) { die(false); }
		if(!isset($_POST['formToken'])) { die(false); }
		if(!isset($_POST['idRegistro'])) { die(false); }
		if(!isset($_POST['transactionCode'])) { die(false); }

		/* Recebe Variaveis */
		$idRegistro = filter_var($_POST["idRegistro"], FILTER_SANITIZE_NUMBER_INT);
		$transactionCode = filter_var($_POST["transactionCode"], FILTER_SANITIZE_STRING);


		/* Security Token Validação */
		$formToken = filter_var($_POST["formToken"], FILTER_SANITIZE_STRING);
		if($_SESSION['formToken'] != $formToken) { 
			tools::jsRedirecionar("index.php");
			die();
		}	
	

		/* Atualizando registro no banco de dados com checkout do pagseguro */
		$sql = "UPDATE associados_db set transactionCode = '{$transactionCode}' where id = {$idRegistro};";

		/* Execute Sql */
		try {
			$p_sql = conexaoPDO::getInstance()->prepare($sql);
		 	$p_sql->execute();
		 	echo true;
		} catch (Exception $e) {
			print("Erro: Código: " . $e->getCode() . " Mensagem: " . $e->getMessage() . " SQL: ".$sql);
		}

		/* Destroi Token Form */
		unset($_SESSION['formToken']);

	} else if($action == "pagSeguroGetTransactions") {

		/* Get variaveis */
		if(!isset($_POST['transactionCode'])) { die(false); }    
		if(!isset($_POST['data'])) { die(false); }    
		$transactionCode = filter_var($_POST["transactionCode"], FILTER_SANITIZE_STRING);
		$data = filter_var($_POST["data"], FILTER_SANITIZE_STRING);

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

		if($data == "statusCode") { 
			  echo  $respostaPagSegurox->status;
		} else if($data == "status") { 
			  if($respostaPagSegurox->status == "1") { 
			  	echo "Aguardando pagamento";
			  } else if($respostaPagSegurox->status == "2") { 
			  	echo "Em análise";
			  } else if($respostaPagSegurox->status == "3") { 
			  	echo "Paga";
			  } else if($respostaPagSegurox->status == "4") { 
			  	echo "Disponível";
			  } else if($respostaPagSegurox->status == "5") { 
			  	echo "Em disputa";
			  } else if($respostaPagSegurox->status == "6") { 
			  	echo "Devolvida";
			  } else if($respostaPagSegurox->status == "7") { 
			  	echo "Cancelada";
			  } else if($respostaPagSegurox->status == "8") { 
			  	echo "Debitado";
			  } else if($respostaPagSegurox->status == "9") { 
			  	echo "Retenção temporária";
			  } else { 
			  	echo "Nenhum!";
			  }

		} else if($data == "paymentLink") { 
			  echo  $respostaPagSegurox->paymentLink;
		} else { 
			die(false);
		}

	  


	}

?>