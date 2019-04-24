<!-- Footer -->
<footer>
	<!-- container -->
	<div class="container">
		<!-- row -->
		<div class="row">
			<!-- col -->
			<div class="col-lg-7 col-md-7">
				<?php 
					/* Get links das redes sociais */
					$rodapeTexto = adminTextos::getRegister("identificadorFront = 'rodape-texto'");
					if($rodapeTexto) { 
				?>
					<!-- box -->
					<div class="box">
						<?php echo htmlspecialchars_decode($rodapeTexto["texto"]); ?>
					</div>
				<?php } ?>
			</div>
			<!-- col -->
			<div class="col-lg-5 col-md-5">
				<!-- redesSociais -->
				<div class="redesSociais">
					<!-- ul -->
					<ul>
						<?php 
							/* Get links das redes sociais */
							$faceUrl = adminVars::getRegister("identificador = 'facebook-url'");
							$youtUrl = adminVars::getRegister("identificador = 'youtube-url'");
							$instUrl = adminVars::getRegister("identificador = 'instagram-url'");
							$twitUrl = adminVars::getRegister("identificador = 'twitter-url'");
						?>
						<?php if($faceUrl["valor"] and $faceUrl["valor"] != "#") { ?> 
							<li> <a target="_blank" href="<?php echo $faceUrl["valor"]; ?>"> <img src="img/redes/face.png" /> </a> <li>
						<?php } ?>
						<?php if($youtUrl["valor"] and $youtUrl["valor"] != "#") { ?> 
							<li> <a target="_blank" href="<?php echo $youtUrl["valor"]; ?>"> <img src="img/redes/youtube.png" /> </a> <li>
						<?php } ?>
						<?php if($instUrl["valor"] and $instUrl["valor"] != "#") { ?> 
							<li> <a target="_blank" href="<?php echo $instUrl["valor"]; ?>"> <img src="img/redes/instagram.png" /> </a> <li>
						<?php } ?>
						<?php if($twitUrl["valor"] and $twitUrl["valor"] != "#") { ?> 
							<li> <a target="_blank" href="<?php echo $twitUrl["valor"]; ?>"> <img src="img/redes/twitter.png" /> </a> <li>
						<?php } ?>
					</ul>
				</div>
			</div>
		</div>
	</div>
</footer>

<!-- Desenvolvido By Gabriel A. Barbosa -->
<?php 
	$copyrightImg = adminVars::getRegister("identificador = 'website_rodape_copyright'");
	$copyrightUrl = adminVars::getRegister("identificador = 'website_rodape_copyright_url'");
	if($copyrightImg) { 
?>
	<div class="copyright">
		<a target="_blank" href="<?php echo ($copyrightUrl["valor"])?$copyrightUrl["valor"]:'#'; ?>"> 
			<img src="<?php echo "cms/".$copyrightImg["valor"]; ?>" /> 
		</a>
	</div>
<?php } ?>


<!-- Javascript: Biblioteca Jquery -->
<script src="plugins/jquery/jquery-3.3.1.min.js"></script>

<!-- Javascript: Pre Loading Page By Gabriel A. Barbosa -->
<script src="plugins/preLoadingPage7/preLoadingPage7.jquery.js"></script>

<!-- Javascript: Biblioteca Jquery UI -->
<script src="plugins/jquery-ui/1.12.1/jquery-ui.min.js"></script>

<!-- Latest compiled and minified JavaScript -->
<script src="plugins/bootstrap/3.3.7/js/bootstrap.min.js"></script>
		
<!-- Javascript: Funções Javascript do Projeto -->
<script src="plugins/OwlCarousel2/2.3.4/owl.carousel.min.js"></script>		

<!-- jquery.mask.js -->
<script src="plugins/jquery.mask.js"></script>

<!-- Javascript: Funções Javascript do Projeto -->
<script src="js/functions-site.js"></script>
	
<!-- Javascript: Icon Whats Fixed by Gabriel A. Barbosa -->
<script src="plugins/iconWhatsFixed/iconWhatsFixed.jquery.js"></script>



<!-- Facebook Social Page -->
<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = 'https://connect.facebook.net/pt_PT/sdk.js#xfbml=1&version=v3.0&appId=1661089080786186&autoLogAppEvents=1';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>

<script>
	$(function() { 
		<?php 
			$obj = new adminVars();
			$row = $obj->getRegister("identificador = 'contato_whats'");
			if($row) { 
				if(!empty($row["valor"])) { 
		?>
					/* Execute Plugin iconWhatsFixed */
					$("body").iconWhatsFixed({ celular: "<?php echo $row["valor"]; ?>" });
		<?php 	
				} 
			} 
		?>
	});
</script>

<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-117372629-4"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-117372629-4');
</script>
