
		<!-- Section :: 2 -->
		<section id="section-2" class="pd-top-30 pd-bottom-30">
			<!-- container -->
			<div class="container">
				<!-- row -->
				<div class="row">
					<!-- col -->
					<div class="col-lg-4 col-md-4 col-sm-4 col-xs-6">
						<!-- receba-novidades -->
						<div class="receba-novidades">
							<!-- col-title -->
							<div class="col-title">
								<!-- span -->
								<span>Receba novidades</span>
							</div>
							<!-- div -->
							<div>
								<!-- form -->
								<form id="recebaNovidades" onsubmit="return false;">
									<!-- Token -->
									<input type="hidden" name="fucktoken" value="<?php echo adminNewsletter::gerarFormToken(); ?>" />
									<!-- form-input -->
									<div class="form-line pd-top-12">
										<!-- title -->
										<div class="title"> Seu nome <span>*</span> </div>
										<!-- input -->
										<div class="input"> <input type="text" name="nome" /> </div>
									</div>
									<!-- form-input -->
									<div class="form-line pd-top-20">
										<!-- title -->
										<div class="title"> Seu e-mail <span>*</span> </div>
										<!-- input -->
										<div class="input"> <input type="text" name="email" /> </div>
									</div>
									<div id="msgResultAjax" style="position:relative;top:5px;"></div>
									<!-- btn-submit -->
									<input type="submit" value="Enviar" />
								</form>

							</div>
						</div>
					</div>
					<!-- col -->
					<div class="col-lg-4 col-md-4 col-sm-4 col-xs-6">
						<!-- canal-aje-ms -->
						<div class="canal-aje-ms">
							<?php 
								/* Get links das redes sociais */
								$linkCanalUrl = adminVars::getRegister("identificador = 'link-canal-url'");
								$linkVideoDestaque = adminVars::getRegister("identificador = 'video-destaque-url'");
							?>
							<!-- col-title -->
							<div class="col-title">
								<!-- span -->
								<span>
									<a target="_blank" href="<?php echo ($linkCanalUrl["valor"])?$linkCanalUrl["valor"]:'javascript:void(0);'?>">
										Canal da AJE-MS
									</a>
								</span>
							</div>
							<!-- div -->
							<div style="text-align:center;">
								<?php if($linkVideoDestaque["valor"]) { ?>
									<iframe width="100%" height="212" src="https://www.youtube.com/embed/<?php echo youtube::getIdFromURL($linkVideoDestaque["valor"]); ?>" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
								<?php } ?>
							</div>
						</div>
					</div>
					<!-- col -->
					<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
						<!-- curta-aje-ms -->
						<div class="curta-aje-ms">
							<!-- col-title -->
							<div class="col-title">
								<!-- span -->
								<span>Curta a AJE-MS</span>
							</div>
							<!-- div -->
							<div style="text-align:center;overflow:hidden;">
							<div class="fb-page" data-href="https://www.facebook.com/aje.matogrossodosul/" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="false"><blockquote cite="https://www.facebook.com/aje.matogrossodosul/" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/aje.matogrossodosul/">Aje/MS</a></blockquote></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>