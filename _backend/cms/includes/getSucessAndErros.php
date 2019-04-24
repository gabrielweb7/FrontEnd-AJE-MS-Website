
<!-- mensagem de sucesso via GET -->
<?php if($getSucesso) { ?>
	<p id="getSucesso" class="bg-primary p-2 text-white"> <i class="fa fa-check"></i> <?php echo $getSucesso; ?> </p>
<?php } ?>

<!-- mensagem de erro via GET -->
<?php if($getError) { ?>
	<p id="getError" class="bg-danger p-2 text-white"> <i class="fa fa-remove"></i> <?php echo $getError; ?> </p>
<?php } ?>