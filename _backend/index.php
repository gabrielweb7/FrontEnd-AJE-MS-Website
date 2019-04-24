<?php
	require_once "frontphp7/init.php";
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
			$titlePage = "AJE-MS | Página Inicial";
			require_once "includes/head.php"; 
		?>
		
	</head>
	<body>
	
		<!-- Include Head -->
		<?php 
			$activeMenu = "index";
			require_once "includes/header.php"; 
		?>
		
		<!-- Include Super Slides -->
		<?php require_once "includes/superSlides.php"; ?>
	
		
		<!-- Section :: 1 -->
		<section id="section-1" class="pd-bottom-20 pd-top-20">
			<!-- container -->
			<div class="container">
				<!-- row -->
				<div class="row">
					<!-- col -->
					<div class="col-lg-8 col-md-8">
						<!-- ultimas-noticias -->
						<div class="ultimas-noticias">
							<!-- col-title -->
							<div class="col-title">
								<!-- span -->
								<span>Últimas Notícias</span>
								<?php
									$noticias = adminNoticias::getAllRegisters("identificador = 'noticias'", "data_criacao desc", 6);
								?>
							</div>
							<!-- row -->
							<div class="row">

								<?php 
									foreach($noticias as $row) { 
									$dataHoraEx = explode(" ", $row["data_criacao"]);
									$dataEx = explode("-", $dataHoraEx[0]);
									$dia = $dataEx[2];
									$mes = $dataEx[1];
									$ano = $dataEx[0];

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
									<!-- col -->
									<div class="col-lg-6">
										<!-- a -->
										<a href="./noticias/<?php echo $tituloAmigavel; ?>/<?php echo $row["id"]; ?>">
											<!-- noticia -->
											<div class="noticia">
												<!-- datebox -->
												<div class="datebox">
													<span><?php echo $dia; ?></span>
													<span><?php echo $mes; ?>, <?php echo $ano; ?></span>
												</div>
												<!-- p -->
												<p><b><?php echo tools::mb_ucfirst(($row["titulo"]),'UTF-8', true); ?></b></p>
												<!-- p -->
												<p><?php echo tools::mb_ucfirst(tools::limitaCaracteres(strip_tags($row["subtitulo"]), 205, false),'UTF-8', true); ?> </p>
											</div>
										</a>
									</div>
								<?php } ?>


								<!-- col -->
								<div class="col-lg-12">
									<!-- btn-submit -->
									<a href="./noticias" class="btn-ver-todas-noticias">Ver todas Notícias</a>
								</div>
							</div>
						</div>
					</div>

					
					<!-- col -->
					<div class="col-lg-4 col-md-4">
						<!-- row -->
						<div class="row">
							<?php 
			
								$projetosDestaque = adminProjetos::getAllRegisters("identificador = 'projetos'", "data_criacao desc", 4);
									
								if($projetosDestaque) { 	
							 ?>

								<!-- col -->
								<div class="col-lg-12 col-md-12 col-sm-6 col-xs-6">
									<!-- projetos-em-destaque -->
									<div class="projetos-em-destaque">
										<!-- col-title -->
										<div class="col-title">
											<!-- span -->
											<span>Projetos em Destaque</span>
										</div>
										<!-- owl-projetos-destaque -->
										<div id="owl-projetos-destaque" class="owl-carousel owl-theme">
											<?php 
												foreach($projetosDestaque as $row) { 
												
													/* Imagem existe ? */
													$row["imagem_src"] = (!empty($row["imagem_src"]) and file_exists("cms/".$row["imagem_src"]))? "cms/".$row["imagem_src"]:false;

														/* Preparando Title ID */
													$titleId = strtolower($row["titulo"]);
													$titleId = str_replace("&", "e", $titleId);
													$titleId = str_replace(" ", "-", $titleId);
													
													if($row["imagem_src"]) { 
											?>

												<!-- item -->
												<div>
													<a href="./projetos/<?php echo $titleId; ?>">
														<img src="<?php echo $row["imagem_src"]; ?>" width="100%" />
													</a>
												</div>

											<?php } } ?>
											
										</div>
									</div>
								</div>
							<?php }  ?>
							<!-- col -->
							<div class="col-lg-12 col-md-12 col-sm-6 col-xs-6">
								<!-- agenda-aje-ms -->
								<div class="agenda-aje-ms pd-top-20">
									<!-- col-title -->
									<div class="col-title">
										<!-- span -->
										<span>Agenda AJE MS</span>
									</div>
									<!-- div -->
									<div>
										<!-- datepicker -->
										<div id="datepicker"></div>
										<!-- script variables -->
										<script>
											/* Dias marcados */
											var selectedDates = {};
											selectedDates[new Date('2018/06/14').toLocaleDateString('pt-BR')] = 'http://google.com/';
											selectedDates[new Date('2018/06/22').toLocaleDateString('pt-BR')] = 'http://face.com/';
											selectedDates[new Date('2018/06/28').toLocaleDateString('pt-BR')] = 'http://fbi.com/';
										</script>
									</div>
								</div>
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
		
	</body>
</html>