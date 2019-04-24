<?php
	require_once "frontphp7/init.php";
?>
<?php 

	
	
	/* Init Autoload composer */
	require_once("vendor/autoload.php");

	/* Init PhpMailer */
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	if($_SERVER['REQUEST_METHOD'] == "GET") {
	
		/* Generate Form Token */
		$_SESSION['formToken'] = bin2hex(random_bytes(32));

	} else if($_SERVER['REQUEST_METHOD'] == "POST") {


		/* Security Token Validação */
		if(!isset($_SESSION['formToken'])) {
			tools::jsRedirecionar("index.php");
			die();
		} else { 
			$formToken = filter_var($_POST["formToken"], FILTER_SANITIZE_STRING);
			if($_SESSION['formToken'] != $formToken) { 
				tools::jsRedirecionar("index.php");
				die();
			}	
		}
		

		/* Recebe variaveis */
		$nome = filter_var($_POST["nome"], FILTER_SANITIZE_STRING);
		$sobrenome = filter_var($_POST["sobrenome"], FILTER_SANITIZE_STRING);
		$email = filter_var($_POST["email"], FILTER_SANITIZE_STRING);
		$dataNascimento = filter_var($_POST["dataNascimento"], FILTER_SANITIZE_STRING);
		$cpf = filter_var($_POST["cpf"], FILTER_SANITIZE_STRING);
		$telefoneFixo = filter_var($_POST["telefoneFixo"], FILTER_SANITIZE_STRING);
		$telefoneCelular = filter_var($_POST["telefoneCelular"], FILTER_SANITIZE_STRING);
		$logradouro = filter_var($_POST["logradouro"], FILTER_SANITIZE_STRING);
		$logradouroNumero = filter_var($_POST["logradouroNumero"], FILTER_SANITIZE_STRING);
		$complemento = filter_var($_POST["complemento"], FILTER_SANITIZE_STRING);
		$bairro = filter_var($_POST["bairro"], FILTER_SANITIZE_STRING);
		$cidade = filter_var($_POST["cidade"], FILTER_SANITIZE_STRING);
		$uf = filter_var($_POST["uf"], FILTER_SANITIZE_STRING);
		$cep = filter_var($_POST["cep"], FILTER_SANITIZE_STRING);
		$escolaridade = filter_var($_POST["escolaridade"], FILTER_SANITIZE_STRING);
		$curso = filter_var($_POST["curso"], FILTER_SANITIZE_STRING);
		$ocupacaoPrincipal = filter_var($_POST["ocupacaoPrincipal"], FILTER_SANITIZE_STRING);
		$jaEhEmpresario = filter_var($_POST["jaEhEmpresario"], FILTER_SANITIZE_STRING);
		$planosAnuais = filter_var($_POST["planosAnuais"], FILTER_SANITIZE_STRING);

		if($planosAnuais == "basico") { 
			$planosAnuaisTxt = "BÁSICO R$ 109,90 (SEM BENEFÍCIOS EXTRAS)";
			$precoPlano = "109.90"; 
		}
		else if($planosAnuais == "premium") { 
			$planosAnuaisTxt = "PREMIUM R$ 139,90 (BÁSICO + REDE EMPREENDEDORA)";
			$precoPlano = "139.90"; 
		}
		else if($planosAnuais == "platinum") { 
			$planosAnuaisTxt = " PLATINUM R$ 399,90 (PREMIUM + CLUBE DE NEGÓCIOS)";
			$precoPlano = "399.90"; 
		}


		/* Inserindo registro no banco de dados */
		$sql = "INSERT INTO associados_db (nome, sobrenome, email, dataNascimento, cpf, telefoneFixo, telefoneCelular, logradouro, logradouroNumero, complemento, bairro, cidade, uf, cep, escolaridade, curso, ocupacaoPrincipal, jaEhEmpresario, planosAnuais, pagSeguroStatus, dataRegistro) VALUES ('{$nome}', '{$sobrenome}', '{$email}', '{$dataNascimento}', '{$cpf}', '{$telefoneFixo}', '{$telefoneCelular}', '{$logradouro}', '{$logradouroNumero}', '{$complemento}', '{$bairro}', '{$cidade}', '{$uf}', '{$cep}', '{$escolaridade}', '{$curso}', '{$ocupacaoPrincipal}', '{$jaEhEmpresario}', '{$planosAnuais}', 'Aguardando pagamento', NOW())";


		/* Execute Sql */
		try {
			$p_sql = conexaoPDO::getInstance()->prepare($sql);
		 	$p_sql->execute();
		 	$lastId = conexaoPDO::getInstance()->lastInsertId();
		} catch (Exception $e) {
			print("Erro: Código: " . $e->getCode() . " Mensagem: " . $e->getMessage() . " SQL: ".$sql);
		}

		/* id do registro novo inserido */
		$idRegistro = (isset($lastId))?$lastId:0;

		/* Gerando data para pagseguro */
		$data['email'] = PAGSEGURO_EMAIL;
		$data['token'] = PAGSEGURO_TOKEN;
		$data['currency'] = 'BRL';
		$data['itemId1'] = '0001';
		$data['itemDescription1'] = utf8_decode('Associado AJE-MS ['.$planosAnuaisTxt.']');
		$data['itemAmount1'] = $precoPlano;
		$data['itemQuantity1'] = '1';
		$data['itemWeight1'] = '0';
		$data['reference'] = 'ID_'.$idRegistro;
		$data['senderName'] = $nome.' '.$sobrenome;
		$data['senderEmail'] = $email;
		$data['notificationURL'] = "http://ajems.com.br/pagseguro-callback.php";

		/* Gerando checkout */
		include "associados-pagseguro-checkout.php";

		/* Checkout gerado do pagseguro para esse associado */
		$checkoutCode = $respostaPagSeguro->code;

		/* Atualizando registro no banco de dados com checkout do pagseguro */
		$sql = "UPDATE associados_db set checkoutCode = '{$checkoutCode}' where id = {$idRegistro};";

		/* Execute Sql */
		try {
			$p_sql = conexaoPDO::getInstance()->prepare($sql);
		 	$p_sql->execute();
		 	$lastId = conexaoPDO::getInstance()->lastInsertId();
		} catch (Exception $e) {
			print("Erro: Código: " . $e->getCode() . " Mensagem: " . $e->getMessage() . " SQL: ".$sql);
		}

		/* Create mensagem */
		$bodyMessage = "<b>[ Solicitação para se tornar um Associado ] </b> <br>";
		$bodyMessage .= " <br>";
		$bodyMessage .= "<b style='color:blue;'>ID </b>: {$idRegistro} <br>";
		$bodyMessage .= "<b>Nome </b>: {$nome} <br>";
		$bodyMessage .= "<b>Sobrenome </b>: {$sobrenome} <br>";
		$bodyMessage .= "<b>E-mail</b>: {$email} <br>";
		$bodyMessage .= "<b>Data Nascimento</b>: {$dataNascimento} <br>";
		$bodyMessage .= "<b>CPF</b>: {$cpf} <br>";
		$bodyMessage .= "<b>Telefone Fixo</b>: {$telefoneFixo} <br>";
		$bodyMessage .= "<b>Telefone Celular</b>: {$telefoneCelular} <br>";
		$bodyMessage .= "<b>Logradouro</b>: {$logradouro} <br>";
		$bodyMessage .= "<b>N°</b>: {$logradouroNumero} <br>";
		$bodyMessage .= "<b>Complemento</b>: {$complemento} <br>";
		$bodyMessage .= "<b>Bairro</b>: {$bairro} <br>";
		$bodyMessage .= "<b>Cidade</b>: {$cidade} <br>";
		$bodyMessage .= "<b>UF</b>: {$uf} <br>";
		$bodyMessage .= "<b>CEP</b>: {$cep} <br>";
		$bodyMessage .= "<b>Escolaridade </b>: {$escolaridade} <br>";
		$bodyMessage .= "<b>Curso </b>: {$curso} <br>";
		$bodyMessage .= "<b>Ocupação Principal</b>: {$ocupacaoPrincipal} <br>";
		$bodyMessage .= "<b>Já é empresário(a) ?</b>: {$jaEhEmpresario} <br>";
		$bodyMessage .= "<b style='color:red;'>Plano Anual</b>: {$planosAnuaisTxt} <br>";
		$bodyMessage .= "<br> [ Formulários enviado pelo site AJE-MS ]";
		
		/* Send email */		
		$mail = new PHPMailer(true);                              // Passing `true` enables exceptions
		try {
		    //Server settings
		    $mail->SMTPDebug = 0;                                 // Enable verbose debug output
		    $mail->isSMTP();                                      // Set mailer to use SMTP
		    $mail->Host = 'mail.ajems.com.br';  // Specify main and backup SMTP servers
		    $mail->SMTPAuth = true;                               // Enable SMTP authentication
		    $mail->Username = 'contato@ajems.com.br';                 // SMTP username
		    $mail->Password = '@ajems2018';                           // SMTP password
		    $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
		    $mail->Port = 465;                                    // TCP port to connect to
		    $mail->CharSet = 'UTF-8';

		    //Recipients
		    $mail->setFrom($email, $nome." ".$sobrenome);
		    $mail->addAddress('contato@ajems.com.br', 'Contato AJE-MS');     // Add a recipient
		  
		    //Content
		    $mail->isHTML(true);                                  // Set email format to HTML
		    $mail->Subject = '* [ Solicitação para ser um Associado da AJE-MS ][ '.$nome." ".$sobrenome.' ]['.ucfirst($planosAnuais).'] *';
		    $mail->Body    = $bodyMessage;
		    $mail->AltBody = $email.' - '.$nome.' '.$sobrenome;

	    	$mail->send();
	    	

		} catch (Exception $e) {
		    $mail->ErrorInfo = 'Não foi possivel enviar sua Mensagem! <br> '.$mail->ErrorInfo." - <br> <a href='./associados-form.php'> Tente novamente! </a>";
		}


		/* Se caso der erro no envio de email.. remover registro do db */
		if($mail->ErrorInfo) { 
			try {
				$sql = "delete from associados_db where id = '{$idRegistro}'; ";
				$p_sql = conexaoPDO::getInstance()->prepare($sql);
			 	$p_sql->execute();
			} catch (Exception $e) {
				print("Erro: Código: " . $e->getCode() . " Mensagem: " . $e->getMessage() . " SQL: ".$sql);
			}
		}


	}

?>
<!-- /**
* ▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
*                   Criado por Gabriel Azuaga Barbosa
*                  E-mail: gabrielbarbosaweb7@gmail.com
*  `•.¸¸.•´´¯`••._.• [ http://gabrieldaluz7.co.nf/ ] •._.••`¯´´•.¸¸.•`
* ▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
*/ -->
<!doctype html>
<html lang="pt-br">
	<head>
		
		<!-- Include Head -->
		<?php 
			$titlePage = "AJE-MS | Torne-se um Associado";
			require_once "includes/head.php"; 
		?>
		
	</head>
	<body>
	
		<!-- Include Head -->
		<?php 
			$activeMenu = "associados";
			require_once "includes/header.php"; 
		?>
		
		<!-- Section :: 1 -->
		<section class="pd-bottom-20 pd-top-20">
			
			<!-- container -->
			<div class="container">
				
				<!-- row -->
				<div class="row">

					<!-- col -->
					<div class="col-lg-12 col-md-12">
					
						<!-- page-single -->
						<div class="page-single page-associados">
							
							<!-- page-title -->
							<div class="page-title"> Torne-se um Associado </div>

							<!-- page-body -->
							<div class="page-body">



							
								<!-- error -->
								<?php 
									if($_SERVER['REQUEST_METHOD'] == "POST") { 

										/* send*/
										if(!$mail->ErrorInfo) { 


								?>
										<script type="text/javascript"
	src="https://stc.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.lightbox.js">
	</script>

											<div style="color: #005021; text-align: center; font-weight: 500; font-size: 23px !important; padding-top: 40px; padding-bottom: 60px;">
												Sua solicitação foi enviada com sucesso! 
												<br />
												Acessando forma de pagamento em <br><b><span id='contador'>5</span></b> seg.
											</div>

											<script type="text/javascript">
												var noPreloadingPage7 = true;
												var contador = 5;
											    var timePagseguro = setInterval(function() { 
											        if(contador <= 0) { 
											           PagSeguroLightbox({
															code: '<?php echo $checkoutCode; ?>'
															}, {
															success : function(transactionCode) {
																updateAjaxTransactionCode('<?php echo $idRegistro; ?>', transactionCode, '<?php echo $formToken;?>');
															},
															abort : function() {
																alert("Detectamos que você não escolheu nenhuma forma de pagamento. Para efetuar o pagamento, você precisará entrar em contato com a AJE-MS!");
																/*document.location.href='contato.php';*/
															}
														});
														clearInterval(timePagseguro);
											        }
											        document.getElementById("contador").innerHTML = contador;
											        contador--;

											    }, 1100);

											</script>
							
											<?php } else { ?>
											
											<div style="color: red; text-align: center; font-weight: 500; font-size: 23px !important; padding-top: 40px; padding-bottom: 60px;">
												<?php echo $mail->ErrorInfo; ?>
											</div>
								<?php } } else { ?>


								<!-- form -->
								<form id="associados-form" action="./quero-ser-um-associado" method="post">
									
									<!-- hidden inputs -->
									<input type="hidden" name="formToken" value="<?php echo $_SESSION['formToken']; ?>" />

									<!-- row -->
									<div class="row">
										
										<!-- col -->
										<div class="col-lg-3 col-md-3">
											<!-- label -->
											<label for="nome">Nome <span>*</span></label>
											<!-- input -->
											<input type="text" name="nome" required />
										</div>

										<!-- col -->
										<div class="col-lg-3 col-md-3">
											<!-- label -->
											<label for="nome">Sobrenome <span>*</span></label>
											<!-- input -->
											<input type="text" name="sobrenome" required />
										</div>
										
										<!-- col -->
										<div class="col-lg-4 col-md-4">
											<!-- label -->
											<label for="nome">E-mail <span>*</span></label>
											<!-- input -->
											<input type="email" name="email" required />
										</div>


										<div class="col-lg-2 col-md-2">
											<!-- label -->
											<label for="nome"> Data Nascimento <span>*</span></label>
											<!-- input -->
											<input type="text" name="dataNascimento" required />
										</div>

										
										<!-- col -->
										<div class="col-lg-4 col-md-4">
											<!-- label -->
											<label for="nome">CPF <span>*</span></label>
											<!-- input -->
											<input type="text" name="cpf" required="" />
										</div>
										
										<!-- col -->
										<div class="col-lg-4 col-md-4">
											<!-- label -->
											<label for="nome">Telefone Fixo <span>*</span></label>
											<!-- input -->
											<input type="text" name="telefoneFixo" required />
										</div>
										
											<!-- col -->
										<div class="col-lg-4 col-md-4">
											<!-- label -->
											<label for="nome">Telefone Celular <span>*</span></label>
											<!-- input -->
											<input type="text" name="telefoneCelular" required />
										</div>	

										<!-- col -->
										<div class="col-lg-6 col-md-6">
											<!-- label -->
											<label for="nome">Logradouro <span>*</span></label>
											<!-- input -->
											<input type="text" name="logradouro" required />
										</div>

										<!-- col -->
										<div class="col-lg-1 col-md-1">
											<!-- label -->
											<label for="nome"> N° <span>*</span></label>
											<!-- input -->
											<input type="text" name="logradouroNumero" required />
										</div>
										
										<!-- col -->
										<div class="col-lg-5 col-md-5">
											<!-- label -->
											<label for="nome"> Complemento <span>*</span></label>
											<!-- input -->
											<input type="text" name="complemento" required />
										</div>

				
										<div class="col-lg-4 col-md-4">
											<!-- label -->
											<label for="nome"> Bairro <span>*</span></label>
											<!-- input -->
											<input type="text" name="bairro" required />
										</div>

										<div class="col-lg-4 col-md-4">
											<!-- label -->
											<label for="nome"> Cidade <span>*</span></label>
											<!-- input -->
											<input type="text" name="cidade" required />
										</div>

										<div class="col-lg-1 col-md-1">
											<!-- label -->
											<label for="nome"> UF <span>*</span></label>
											<!-- input -->
											<input type="text" name="uf" required />
										</div>

										<div class="col-lg-3 col-md-3">
											<!-- label -->
											<label for="nome"> CEP <span>*</span></label>
											<!-- input -->
											<input type="text" name="cep" required />
										</div>


										<div class="col-lg-3 col-md-3">
											<!-- label -->
											<label for="nome"> Escolaridade <span>*</span></label>
											<!-- input -->
											<select name="escolaridade">
												
												<option value="FUNDAMENTAL"> FUNDAMENTAL </option>
												<option value="MÉDIO"> MÉDIO  </option>
												<option value="TÉCNICO"> TÉCNICO   </option>
												<option value="SUPERIOR" selected> SUPERIOR    </option>
												<option value="PÓS GRADUAÇÃO"> PÓS GRADUAÇÃO    </option>
												<option value="OUTRO"> OUTRO  </option>
											</select>
										</div>

										<div class="col-lg-3 col-md-3">
											<!-- label -->
											<label for="nome"> Curso <span>*</span></label>
											<!-- input -->
											<select name="curso">
												<option value="FUNDAMENTAL COMPLETO"> FUNDAMENTAL COMPLETO </option>
												<option value="FUNDAMENTAL INCOMPLETO"> FUNDAMENTAL INCOMPLETO </option>
												<option value="MÉDIO COMPLETO"> MÉDIO COMPLETO </option>
												<option value="MÉDIO INCOMPLETO"> MÉDIO INCOMPLETO </option>
												<option value="TÉCNICO COMPLETO"> TÉCNICO COMPLETO   </option>
												<option value="TÉCNICO INCOMPLETO"> TÉCNICO INCOMPLETO   </option>
												<option value="SUPERIOR COMPLETO" selected> SUPERIOR COMPLETO   </option>
												<option value="SUPERIOR INCOMPLETO"> SUPERIOR INCOMPLETO    </option>
												<option value="PÓS GRADUAÇÃO COMPLETO"> PÓS GRADUAÇÃO COMPLETO    </option>
												<option value="PÓS GRADUAÇÃO INCOMPLETO"> PÓS GRADUAÇÃO INCOMPLETO    </option>
												<option value="OUTRO"> OUTRO  </option>
											</select>
										</div>

										<div class="col-lg-3 col-md-3">
											<!-- label -->
											<label for="nome"> Ocupação Principal <span>*</span></label>
											<!-- input -->
											<select name="ocupacaoPrincipal">
												<option value="EMPRESÁRIO" selected> EMPRESÁRIO </option>
												<option value="FUNCIONÁRIO "> FUNCIONÁRIO  </option>
												<option value="UNIVERSITÁRIO "> UNIVERSITÁRIO  </option>
												<option value="ESTUDANTE"> ESTUDANTE </option>
												<option value="OUTRO"> OUTRO  </option>
											</select>
										</div>

										<div class="col-lg-3 col-md-3">
											<!-- label -->
											<label for="nome"> Já é empresário(a) ? <span>*</span></label>
											<!-- input -->
											<select name="jaEhEmpresario">
												<option value="SIM" selected> SIM  </option>
												<option value="NÃO"> NÃO   </option>
											</select>
										</div>

										<div class="col-lg-6 col-md-6">
											<!-- label -->
											<label for="nome"><b> Planos Anuais: </b><span>*</span></label>
											<!-- input -->
											<select name="planosAnuais">
												<option value="basico" selected> BÁSICO R$ 109,90 (SEM BENEFÍCIOS EXTRAS)  </option>
												<option value="premium"> PREMIUM R$ 139,90 (BÁSICO + REDE EMPREENDEDORA)  </option>
												<option value="platinum"> PLATINUM R$ 399,90 (PREMIUM + CLUBE DE NEGÓCIOS)  </option>
											</select>
										</div>
											<br>	

										<!-- col -->
										<div class="col-lg-12 col-md-12">
											<!-- btn-submit -->
											<input type="submit" value="Enviar Solicitação" />
										</div>

									</div>

								</form>

								<?php } ?>

							</div>
						
						</div>

					</div>

				</div>

			</div>

		</section>
		
		<!-- Include subFooter -->
		<?php require_once "includes/subFooter.php"; ?>	

		<!-- Include Apoiadores -->
		<?php require_once "includes/apoiadores.php"; ?>
		
		<!-- Include Footer -->
		<?php require_once "includes/footer.php"; ?>

		<script type="text/javascript">
			
			function updateAjaxTransactionCode(idRegistro, transactionCode, formToken) {
				$.post("action.php",
			    {
			        action: "upAssTransaction",
			        idRegistro: idRegistro,
			        transactionCode: transactionCode,
			        formToken: formToken
			    },
			    function(data, status){
			        if(data) { 
			        	$(".page-body").find("div").html("Redirecionando para Home...");
			        	document.location.href='./index.php';
			        }
			    });
			}

		</script>
		
		<!-- Design e programação BY GABRIEL A. BARBOSA http://gabrieldaluz.com.br -->
		
	</body>
</html>