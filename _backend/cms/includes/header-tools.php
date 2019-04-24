<div class="header-tools">
    <a href="" data-sidebar="#sidebar" class="m-icon pull-left" aria-label="toggle menu">
        <i class="icon m-icon-lines" aria-hidden="true"></i>
    </a>
    <a href="<?php echo RAIZ_DIR; ?>logout.php" class="fs-5 clear-style pull-right">
        <i class="fa fa-sign-out"></i> Sair
    </a>
</div>

<div id="page-title-wrap" class="page-title-wrap clearfix">
    <h1 class="page-title pull-left fs-4 fw-light">
		<?php if(isset($faicon)) { ?>
			<i class="fa <?php echo $faicon; ?> icon-mr fs-4"></i>
		<?php } ?>
        <span class="hidden-xs-down"><?php echo $headerTitle; ?></span>
    </h1>
</div>
