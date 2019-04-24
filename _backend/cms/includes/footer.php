	<!--Begin Footer-->
	<footer id="footer" class="footer-wrap" role="contentinfo">
			<span class="fs-7">
				<i class="icon-layers fs-4 mr-2 c-body-inverse-darker"></i> <?php echo adminVars::getValue("admin_rodape_copyright"); ?>
				<span class="hidden-xs-down"> CMS <?php echo adminVars::getValue("admin_version"); ?> </span>
				<span class="ml-1">&copy; <?php echo adminVars::getValue("admin_year_created"); ?>  </span>
			</span>
	</footer>

<!--End Footer-->
</div>

<!-- inject-body-end:js -->
<script src="<?php echo RAIZ_DIR; ?>assets/js/shim.js?1510690221342"></script>
<script src="<?php echo RAIZ_DIR; ?>assets/js/system.js?1510690221342"></script>
<script src="<?php echo RAIZ_DIR; ?>assets/js/jspm.config.js?1510690221342"></script>

<!-- endinject -->
<script src="<?php echo RAIZ_DIR; ?>assets/js/jquery-3.3.1.min.js"></script>


<!-- uploadFiles7.jquery.js -->
<script src="<?php echo RAIZ_DIR; ?>js7/uploadFiles7/uploadFiles7.jquery.js"></script>

<!-- <script> $(".page-loader").hide(); </script> -->
<script>
  SystemJS.import('scripts/dash1');
</script>

<!-- FUNCTIONS ADICIONAIS -->
<script>
	
	
	$(document).ready(function() {

		/* Funcao para getSucesso (Mensagens de sucesso recebidos via get ) */
		if($("#getSucesso").length) { 
			setTimeout(function() { 
				$("#getSucesso").fadeOut(1000);
			}, 7000);
		}
		
		/* Funcao para getError (Mensagens de erro recebidos via get ) */
		if($("#getError").length) { 
			setTimeout(function() { 
				$("#getError").fadeOut(1000);
			}, 7000);
		}
	
		/* Funcao para editor ) */
		if($("#summernote").length) { 
			//  $('#summernote').summernote();
		}

	});
	
	

</script>
