<?php
	require_once "frontphp7/init.php";

	/* Recebe id */
	$id = (isset($_GET["value"])) ? filter_var($_GET["value"],FILTER_SANITIZE_NUMBER_INT) : false;
	$acao = (isset($_GET["acao"])) ? filter_var($_GET["acao"],FILTER_SANITIZE_STRING) : false;

	/* Caso ID exista.. */
	if($id and $acao != "pag") { 

		$row = adminNoticias::getRegister("id = '{$id}'");

		/* Caso o registro não esteja alimentado.. voltar para listagem */
		if(!$row) {
			tools::jsRedirecionar(RAIZ_DIR."noticias");
		}

		/* Seta titulo da pagina dinamico */
		$dinamicTitle = strip_tags($row["titulo"]);

	} else { 
		$dinamicTitle = "Notícias";
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
			$titlePage = "AJE-MS | ".$dinamicTitle;
			require_once "includes/head.php"; 
		?>
		
	</head>
	<body>
	
		<!-- Include Head -->
		<?php 
			$activeMenu = "noticias";
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
						
						<?php 
							if((!$id) or ($id and $acao == "pag")) { 


								
									/* Paginacao */
									$pagina = ($id) ? filter_var($id, FILTER_SANITIZE_NUMBER_INT) : 1;
									
									/* caso página for igual a zero.. desbugar.. fix */
									if($pagina == "0") { $pagina = 1; }
							

								/* Salva paginacao atual em sessao para mais tarde recuperar.. no noticia-single */
								$_SESSION["noticiaPagination"] = $pagina;

								/* Total de registros a ser mostrado na Paginação */
								$registros = 5;

								/* Pega total de registros */
								$getTotalRegistros = adminNoticias::getRowCount("identificador = 'noticias'");

								/* Calcula o numero de paginas arredondando o resultado para cima */
								$numPaginas = ceil($getTotalRegistros/$registros);

								//variavel para calcular o início da visualização com base na página atual 
								$inicio = ($registros*$pagina)-$registros; 

								/* alimenta var com as noticias */
								$todasNoticias = adminNoticias::getAllRegistersPagination("identificador = 'noticias'", "data_criacao desc", "{$inicio},{$registros}");

							

						?>
							<!-- page-single -->
							<div class="page-single">
								
								<!-- page-title -->
								<div class="page-title"> Notícias </div>

								<!-- page-body -->
								<div class="page-body">
									
									<?php 
										/* Caso o registro não esteja alimentado.. voltar para listagem */
										if(!$todasNoticias) {
											echo "Nenhum Registro encontrado!";
										} else { 

											foreach($todasNoticias as $row) { 

												/* tratando data */
												$dataTime = new DateTime($row["data_criacao"]);
												$data = $dataTime->format('d/m/Y');
												$hora = $dataTime->format('H:i');

												/* Transforma titulo em url amigavel */
									
												/* remover todos caracteres */
												$tituloAmigavel = iconv( "UTF-8" , "ASCII//TRANSLIT//IGNORE" , $row["titulo"] );
												/* remove espaços duplos ou mais.. e deixa com um espaço */
												$tituloAmigavel = preg_replace('/( )+/', ' ', $tituloAmigavel );
												/* transforma espaço em '-' */
												$tituloAmigavel = str_replace(' ', '-', $tituloAmigavel );
												/* deixa passar somente lestra e numeros */
												$tituloAmigavel = preg_replace('/[^A-Za-z0-9-]/', '', $tituloAmigavel );
												/* Caso tenha mais que um '-' .. deixar apenas um .. */
												$tituloAmigavel = preg_replace('/[-]+/', '-', $tituloAmigavel );
												/* deixa tudo minusculo */
												$tituloAmigavel = strtolower($tituloAmigavel);

									?>
											<!-- a -->
											<a href="./noticias/<?php echo $tituloAmigavel; ?>/<?php echo $row["id"]; ?>">
											
												<!-- boxedBody -->
												<div class="boxedBody">
													
													<!-- boxedTitle -->
													<div class="boxedTitle"><?php echo tools::mb_ucfirst($row["titulo"],'UTF-8', true); ?></div>

													<!-- boxedDesc -->
													<div class="boxedDesc"><?php echo tools::mb_ucfirst($row["subtitulo"],'UTF-8', true); ?></div>

													<!-- boxedData -->
													<div class="boxedData"> <b>Data:</b> <?php echo $data; ?> <b>Hora:</b> <?php echo $hora; ?> </div>

												</div>

											</a>

										<?php } ?>

										<!-- Pagination -->
										<div class="paginationx">
											<?php 
												echo adminNoticias::get_pagination_links($pagina, $numPaginas, "noticias/pag/");
											?>
										</div>

									<?php }  ?>

								</div>

							</div>
						<?php 

							} else {  

							/* Imagem existe ? */
							$row["imagem_src"] = (!empty($row["imagem_src"]) and file_exists("cms/".$row["imagem_src"]))? "cms/".$row["imagem_src"]:false;

						
							$dataTime = new DateTime($row["data_criacao"]);
							$data = $dataTime->format('d/m/Y');
							$hora = $dataTime->format('H:i');

						?>
							<!-- Noticia Single-->
							<div class="noticia-single">

								<!-- Titulo -->
								<div class="titulo"> <?php echo tools::mb_ucfirst($row["titulo"],'UTF-8', true); ?>  </div>

								<!-- SubTitulo -->
								<div class="subtitulo"> <?php echo tools::mb_ucfirst($row["subtitulo"],'UTF-8', true); ?> </div>

								<?php if($row["imagem_src"]) {  ?>
									<!-- Imagem -->
									<div class="imagem">
										<img src="<?php echo $row["imagem_src"]; ?>" />
									</div>
								<?php } ?>

								<!-- Conteudo -->
								<div class="conteudo">
									<?php echo html_entity_decode($row["texto"]); ?>
								</div>

								<!-- Data Criação -->
								<div class="dataCriacao"> <b>Data:</b> <?php echo $data; ?> <b>Hora:</b> <?php echo $hora; ?> </div>

								<!-- btn -->
								<a href="./noticias<?php echo (isset($_SESSION["noticiaPagination"]))?"/pag/".$_SESSION["noticiaPagination"]:""; ?>" class="btn1"> Voltar para Notícias </a>
							</div>

						<?php } ?>
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
		
	</body>
</html>