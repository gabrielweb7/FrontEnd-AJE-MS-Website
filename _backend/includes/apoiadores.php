<?php
	$slides = adminCarrousel::getAllRegisters("identificador = 'mantenedores'", "ordem asc");
	if($slides) { 
?>
<!-- APOIADORES -->
<section class="apoiadores">
	<!-- Container -->
	<div class="container">
		<!-- col-title -->
		<div class="col-title">
			<!-- span -->
			<span>Mantenedores</span>
		</div>
		<div class="owl-carousel" id="apoiadores">
			<?php foreach($slides as $row) { ?>
				<?php if(file_exists("cms/".$row["imagem_src"])) { ?>
					<div class="imgApoio" style="background-image: url('<?php echo "cms/".$row["imagem_src"]; ?>');"> </div>
					<?php } ?>
			<?php } ?>
		</div>
	</div>
</section>
<?php } ?>