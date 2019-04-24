<?php
	require_once "frontphp7/init.php";

	/* Init Autoload composer */
	require_once("vendor/autoload.php");

	/* Init PhpMailer */
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	if($_SERVER['REQUEST_METHOD'] == "POST") {


		/* Recebe variaveis */
		$razaoSocial = filter_var($_POST["razaoSocial"], FILTER_SANITIZE_STRING);
		$nomeFantasia = filter_var($_POST["nomeFantasia"], FILTER_SANITIZE_STRING);
		$ramoDeAtividade = filter_var($_POST["ramoDeAtividade"], FILTER_SANITIZE_STRING);
		$cnpj = filter_var($_POST["cnpj"], FILTER_SANITIZE_STRING);
		$site = filter_var($_POST["site"], FILTER_SANITIZE_STRING);
		$telefoneFixo = filter_var($_POST["telefoneFixo"], FILTER_SANITIZE_STRING);
		$telefoneCelular = filter_var($_POST["telefoneCelular"], FILTER_SANITIZE_STRING);
		$responsavel = filter_var($_POST["responsavel"], FILTER_SANITIZE_STRING);
		$email = filter_var($_POST["email"], FILTER_SANITIZE_STRING);
		$logradouro = filter_var($_POST["logradouro"], FILTER_SANITIZE_STRING);
		$logradouroNumero = filter_var($_POST["logradouroNumero"], FILTER_SANITIZE_STRING);
		$complemento = filter_var($_POST["complemento"], FILTER_SANITIZE_STRING);
		$bairro = filter_var($_POST["bairro"], FILTER_SANITIZE_STRING);
		$cidade = filter_var($_POST["cidade"], FILTER_SANITIZE_STRING);
		$uf = filter_var($_POST["uf"], FILTER_SANITIZE_STRING);
		$cep = filter_var($_POST["cep"], FILTER_SANITIZE_STRING);

		/* Create mensagem */
		$bodyMessage = "<b>[ Solicitação para se tornar Mantenedor ] </b> <br>";
		$bodyMessage .= " <br>";
		$bodyMessage .= "<b>Razão Social</b>: {$razaoSocial} <br>";
		$bodyMessage .= "<b>Nome Fantasia</b>: {$nomeFantasia} <br>";
		$bodyMessage .= "<b>Ramo de Atividade</b>: {$ramoDeAtividade} <br>";
		$bodyMessage .= "<b>CNPJ</b>: {$cnpj} <br>";
		$bodyMessage .= "<b>Site</b>: {$site} <br>";
		$bodyMessage .= "<b>Telefone Fixo</b>: {$telefoneFixo} <br>";
		$bodyMessage .= "<b>Telefone Celular</b>: {$telefoneCelular} <br>";
		$bodyMessage .= "<b>E-mail</b>: {$email} <br>";
		$bodyMessage .= "<b>Logradouro</b>: {$logradouro} <br>";
		$bodyMessage .= "<b>N°</b>: {$logradouroNumero} <br>";
		$bodyMessage .= "<b>Complemento</b>: {$complemento} <br>";
		$bodyMessage .= "<b>Bairro</b>: {$bairro} <br>";
		$bodyMessage .= "<b>Cidade</b>: {$cidade} <br>";
		$bodyMessage .= "<b>UF</b>: {$uf} <br>";
		$bodyMessage .= "<b>CEP</b>: {$cep} <br>";
		$bodyMessage .= "<br> [ Formulários enviado pelo site AJE-MS ]";
		
		/* Send email */		
		$mail = new PHPMailer(true);                              // Passing `true` enables exceptions
		try {
		    //Server settings
		    $mail->SMTPDebug = 0;                                 // Enable verbose debug output
		    $mail->isSMTP();                                      // Set mailer to use SMTP
		    $mail->Host = 'mail.ajems.com.br';  // Specify main and backup SMTP servers
		    $mail->SMTPAuth = true;                               // Enable SMTP authentication
		    $mail->Username = 'presidencia@ajems.com.br';                 // SMTP username
		    $mail->Password = '@ajems2018';                           // SMTP password
		    $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
		    $mail->Port = 465;                                    // TCP port to connect to
		    $mail->CharSet = 'UTF-8';

		    //Recipients
		    $mail->setFrom($email, $nomeFantasia);
		    $mail->addAddress('presidencia@ajems.com.br', 'Presidência AJE-MS');     // Add a recipient
		  
		    //Content
		    $mail->isHTML(true);                                  // Set email format to HTML
		    $mail->Subject = '* [ Solicitação para ser Mantenedor da AJE-MS ][ '.$nomeFantasia.' ] *';
		    $mail->Body    = $bodyMessage;
		    $mail->AltBody = $email.' - '.$razaoSocial;

		    $mail->send();
	    	

		} catch (Exception $e) {
		    $mail->ErrorInfo = 'Não foi possivel enviar sua Mensagem! <br> '.$mail->ErrorInfo." - <br> <a href='./mantenedores-form.php'> Tente novamente! </a>";
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
			$titlePage = "AJE-MS | Seja um mantenedor";
			require_once "includes/head.php"; 
		?>
		
	</head>
	<body>
	
		<!-- Include Head -->
		<?php 
			$activeMenu = "mantenedores";
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
							<div class="page-title"> Torne-se um Mantenedor </div>

							<!-- page-body -->
							<div class="page-body">

								
							

								<!-- error -->
								<?php 
									if($_SERVER['REQUEST_METHOD'] == "POST") { 

										/* send*/
										if(!$mail->ErrorInfo) { 
								?>
											<div style="color: #005021; text-align: center; font-weight: 500; font-size: 23px !important; padding-top: 40px; padding-bottom: 60px;">
												Sua solicitação foi enviada com sucesso! 
												<br />
												Em breve estaremos entrando em contato.
											</div>
							
											<?php } else { ?>
											
											<div style="color: red; text-align: center; font-weight: 500; font-size: 23px !important; padding-top: 40px; padding-bottom: 60px;">
												<?php echo $mail->ErrorInfo; ?>
											</div>
								<?php } } else { ?>
								

								<!-- form -->
								<form id="associados-form" action="./quero-ser-um-mantenedor" method="post">
									
									<!-- row -->
									<div class="row">
										
										<!-- col -->
										<div class="col-lg-12 col-md-12">
											<!-- label -->
											<label for="razaoSocial">Razão Social <span>*</span></label>
											<!-- input -->
											<input type="text" name="razaoSocial" required />
										</div>
		
										<!-- col -->
										<div class="col-lg-4 col-md-4">
											<!-- label -->
											<label for="nomeFantasia">Nome Fantasia <span>*</span></label>
											<!-- input -->
											<input type="text" name="nomeFantasia" required />
										</div>

									
	<!-- col -->
										<div class="col-lg-4 col-md-4">
											<!-- label -->
											<label for="ramoDeAtividade">Ramo de Atividade <span>*</span></label>
											<!-- input -->
											<input type="text" name="ramoDeAtividade" required />
										</div>

	<!-- col -->
										<div class="col-lg-4 col-md-4">
											<!-- label -->
											<label for="cnpj">CNPJ <span>*</span></label>
											<!-- input -->
											<input type="text" name="cnpj" required />
										</div>
								

										<div class="col-lg-4 col-md-4">
											<!-- label -->
											<label for="site"> Site <span>*</span></label>
											<!-- input -->
											<input type="text" name="site" required />
										</div>

										
										<!-- col -->
										<div class="col-lg-4 col-md-4">
											<!-- label -->
											<label for="telefoneFixo">Telefone Fixo <span>*</span></label>
											<!-- input -->
											<input type="text" name="telefoneFixo" required />
										</div>
										
								
										
											<!-- col -->
										<div class="col-lg-4 col-md-4">
											<!-- label -->
											<label for="telefoneCelular">Telefone Celular <span>*</span></label>
											<!-- input -->
											<input type="text" name="telefoneCelular" required />
										</div>	

										
											<!-- col -->
										<div class="col-lg-6 col-md-6">
											<!-- label -->
											<label for="responsavel"> Responsável <span>*</span></label>
											<!-- input -->
											<input type="text" name="responsavel" required />
										</div>	


		<!-- col -->
										<div class="col-lg-6 col-md-6">
											<!-- label -->
											<label for="email"> E-mail <span>*</span></label>
											<!-- input -->
											<input type="email" name="email" required />
										</div>	

										<!-- col -->
										<div class="col-lg-6 col-md-6">
											<!-- label -->
											<label for="logradouro">Logradouro <span>*</span></label>
											<!-- input -->
											<input type="text" name="logradouro" required />
										</div>

										<!-- col -->
										<div class="col-lg-1 col-md-1">
											<!-- label -->
											<label for="logradouroNumero"> N° <span>*</span></label>
											<!-- input -->
											<input type="text" name="logradouroNumero" required />
										</div>
										
										<!-- col -->
										<div class="col-lg-5 col-md-5">
											<!-- label -->
											<label for="complemento"> Complemento <span>*</span></label>
											<!-- input -->
											<input type="text" name="complemento" required />
										</div>

				
										<div class="col-lg-4 col-md-4">
											<!-- label -->
											<label for="bairro"> Bairro <span>*</span></label>
											<!-- input -->
											<input type="text" name="bairro" required />
										</div>

										<div class="col-lg-4 col-md-4">
											<!-- label -->
											<label for="cidade"> Cidade <span>*</span></label>
											<!-- input -->
											<input type="text" name="cidade" required />
										</div>

										<div class="col-lg-1 col-md-1">
											<!-- label -->
											<label for="uf"> UF <span>*</span></label>
											<!-- input -->
											<input type="text" name="uf" required />
										</div>

										<div class="col-lg-3 col-md-3">
											<!-- label -->
											<label for="cep"> CEP <span>*</span></label>
											<!-- input -->
											<input type="text" name="cep" required />
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
		
		<!-- Design e programação BY GABRIEL A. BARBOSA http://gabrieldaluz.com.br -->
		
		<script type="text/javascript">
			
			

		</script>

	</body>
</html>