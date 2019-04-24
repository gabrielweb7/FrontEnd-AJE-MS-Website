	<?php
			$slides = adminSlides::getAllRegisters("identificador = 'topo'", "ordem asc");
			if($slides) { 
		?>
		<!-- superSlide -->
		<div id="superSlide" class="owl-carousel owl-theme">
			<?php foreach($slides as $row) { ?>
				<?php if(file_exists("cms/".$row["imagem_src"])) { ?>
					<!-- item -->
					<div> <img src="<?php echo "cms/".$row["imagem_src"]; ?>" alt="<?php echo $row["imagem_alt"]; ?>" /> </div>
				<?php } ?>
			<?php } ?>
		</div>
		<?php } ?>
	