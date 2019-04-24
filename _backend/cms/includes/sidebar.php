<section id="sidebar" class="sidebar-wrap">
    <div class="sidebar-content">
        <a href="/" class="app-name">
            <span class="full-name">Grupo Empreender</span>
            <span class="compact-name">
                    <i class="icon-layers"></i>
                </span>
        </a>
        <div class="profile">
            <div class="details" style="  <?php echo ($setMenu == "meuPerfil")?"background:#3e434e;":""; ?>  border-bottom: 5px solid #5a606d;     padding-bottom: 23px;     padding-top: 23px;">
                <div class="clearfix">
                    <?php
                        $foto = (isset($_SESSION["usuario_foto"]))?$_SESSION["usuario_foto"]:"assets/user.png";
                        if(!file_exists($foto)) {
                            $foto = "assets/user.png";
                        }
                    ?>
                    <div class="picture rounded-circle pull-left" style="background-position:center;background-image: url('<?php echo $foto; ?>');"></div>
                    <div class="about pull-left">
                        <a href="" class="clear-style sbg-settings">
                            <i class="fa fa-edit"></i>
                        </a>
                       
						<!-- Nome -->
						<h3 class="name">
						<?php
							$nome = ($_SESSION["usuario_nome"])?ucfirst(substr($_SESSION["usuario_nome"],0,12)):"Sem Nome";
							$sobrenome = ($_SESSION["usuario_sobrenome"])?" ".strtoupper ($_SESSION["usuario_sobrenome"][0]).".":null;
							echo $nome.$sobrenome;
						?>
						</h3>

						<!-- Meu Perfil -->
                        <a href="meuPerfil.php" class="clear-style settings">
                            <i class="fa fa-gear icon-mr-ch"></i>Meu Perfil</a>
                        <a href="chat-profile.html" class="clear-style sbg-title">
                            <?php
                                $cargo = ($_SESSION["usuario_cargo"])?ucfirst($_SESSION["usuario_cargo"]):ucfirst($_SESSION["usuario_nivelAcesso"]);
                                echo $cargo;
                            ?>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div class="tab-content">
            <div class="tab-pane active" id="side-home" role="tabpanel">
                <nav class="sidebar-menu pb-3" role="navigation">
                    <ul class="clear-style">
                        <!-- Menu header-->

                        <li class="header">Gerenciar Website</li>
                        <!-- #Menu header-->

                        <!-- Menu item-->
                        <li class="menu-item <?php echo ($setMenu == "dashboard")?"active":""; ?>"> <!-- .active .active-icon -->
                            <a href="<?php echo RAIZ_DIR; ?>">
                                <i class="menu-icon fa fa-dashboard"></i>
                                <span>Página Inicial</span>
                            </a>
                            <!-- #Sub menu-->
                        </li>

						<?php

							/* Recebe menu Pai */
							$menuItens = adminMenu::getArrayMenus();

							if($menuItens) {

								for($i=0;$i<sizeof($menuItens);$i++) {

									/* Filhos (Submenu Nivel 1) */
									$menuItensF = adminMenu::getArrayMenusFilhos($menuItens[$i]["id"]);

						?>
									<li class="menu-item <?php echo (($_SESSION["pactive"] == $menuItens[$i]["id"]) or ($_SESSION["mactive"] == $menuItens[$i]["id"])) ? "active active-icon" : false; ?>">
										<a href="<?php echo $menuItens[$i]["ahref"]."&mactive=".base64_encode($menuItens[$i]["id"])."&pactive=".base64_encode($menuItens[$i]["pai_id"]); ?>">
											<i class="menu-icon <?php echo (!empty($menuItens[$i]["icon_class"]))?$menuItens[$i]["icon_class"]:"fa fa-circle"; ?>"></i>
											<span>
												<?php echo $menuItens[$i]["menuTitulo"]; ?>
											</span>
											<?php if($menuItensF) { ?> <i class="fa fa-angle-left pull-right toggle"></i> <?php } ?>
										</a>
										<?php
											if($menuItensF) {
										?>
											<!-- Sub menu-->
											<ul class="sub-menu <?php echo (($_SESSION["pactive"]) == $menuItens[$i]["id"]) ? "menu-open" : false; ?>">
												<?php
													for($s=0;$s<sizeof($menuItensF);$s++) {
												?>
													<!-- Menu item-->
													<li class="menu-item <?php if(($_SESSION["mactive"]) == $menuItensF[$s]["id"]) { echo "active active-icon"; } ?>">
														<a href="<?php echo $menuItensF[$s]["ahref"]."&mactive=".base64_encode($menuItensF[$s]["id"])."&pactive=".base64_encode($menuItensF[$s]["pai_id"]); ?>">
														<i class="menu-icon <?php echo (!empty($menuItens[$i]["icon_class"]))?$menuItensF[$s]["icon_class"]:"fa fa-circle"; ?>"></i>
														<span>
															<?php echo $menuItensF[$s]["menuTitulo"]; ?>
														</span>
														<!-- <i class="fa fa-angle-left pull-right toggle"></i> -->
														</a>
													</li>
												<?php } ?>
											</ul>
										<?php } ?>
									</li>
						<?php 
								}
							}  
						?>

                        <!-- Menu item
                        <li class="menu-item">
                            <a href="">
                                <i class="menu-icon fa fa-laptop"></i>
                                <span>Imagens</span>
                            </a>
                        </li>
                        <li class="menu-item">
                            <a href="">
                                <i class="menu-icon fa fa-edit"></i>
                                <span>Textos</span>
                            </a>
                        </li>
                        <li class="menu-item">
                            <a href="">
                                <i class="menu-icon fa fa-envelope-o"></i>
                                <span>Contato</span>
                            </a>
                        </li>
-->
                        <!-- Menu header-->
                        <?php 
							if(autenticacaoUsuario::getNivelAcesso() == "administrador" or autenticacaoUsuario::getNivelAcesso() == "programador") { 
						?>
							<li class="header">Administrador</li>
							<!-- #Menu header-->
							<!-- Menu item-->
							<li class="menu-item <?php echo ($setMenu == "adminUsuarios")?"active":null; ?>">
								<a href="adminUsuarios.php">
									<i class="menu-icon icon-user"></i>
									<span>Usuários</span>
								</a>
							</li>
							<!-- 
							 
								<li class="menu-item <?php echo ($setMenu == "adminLogs")?"active":null; ?>">
									<a href="adminLogs.php">
										<i class="menu-icon fa fa-bar-chart"></i>
										<span>Logs do Sistema</span>
									</a> 
								</li> 
							
							-->
						<?php } ?>

					    <?php 
							if(autenticacaoUsuario::getNivelAcesso() == "programador") { 
						?>
							<!-- Menu header-->
							<li class="header">Programador</li>
							<!-- #Menu header-->

							<!-- Menu item-->
							<li class="menu-item <?php echo ($setMenu == "devMenuEditor")?"active":null; ?>">
								<a href="devMenuEditor.php">
									<i class="menu-icon fa fa-bar-chart"></i>
									<span>Menu Editor</span>
								</a>
							</li>

							<!-- Menu item-->
							<li class="menu-item <?php echo ($identificadorGet == "cms")?"active":null; ?>">
								<a href="adminVars.php?categoria=cms">
									<i class="menu-icon fa fa-bar-chart"></i>
									<span>CMS Vars</span>
								</a>
							</li>
						<?php } ?>

                    </ul>
                </nav>
            </div>

        </div>
    </div>
</section>
