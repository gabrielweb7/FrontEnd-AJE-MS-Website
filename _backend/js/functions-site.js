/**
* ▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
*                   Criado por Gabriel Azuaga Barbosa
*                  E-mail: gabrielbarbosaweb7@gmail.com
*  `•.¸¸.•´´¯`••._.• [ http://gabrieldaluz7.co.nf/ ] •._.••`¯´´•.¸¸.•`
* ▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
*/



$(function() { 

	/* Carregando paginas */
	if(typeof noPreloadingPage7 == "undefined") { 
		$("body").preLoadingPage7({ gifSrc: "img/aje-icon.gif", gifWidth: 45 });
	}

	if($("input[name='cnpj']").length) { 
		$("input[name='cnpj']").mask('00.000.000/0000-00', {reverse: true});
	}	

	if($("input[name='cpf']").length) { 
		  $("input[name='cpf']").mask('000.000.000-00', {reverse: true});
	}

	if($("input[name='dataNascimento']").length) { 
		  $("input[name='dataNascimento']").mask('00/00/0000');
	}

	if($("input[name='cep']").length) { 
		  $("input[name='cep']").mask('00000-000');
	}
	
	if($("input[name='telefoneCelular']").length) { 
		var SPMaskBehavior = function (val) {
		    return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
		},
		spOptions = {
		    onKeyPress: function(val, e, field, options) {
		        field.mask(SPMaskBehavior.apply({}, arguments), options);
		    }
		};
	  	$("input[name='telefoneCelular']").mask(SPMaskBehavior, spOptions);
	}

	if($("input[name='telefoneFixo']").length) { 
		var SPMaskBehavior = function (val) {
		    return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
		},
		spOptions = {
		    onKeyPress: function(val, e, field, options) {
		        field.mask(SPMaskBehavior.apply({}, arguments), options);
		    }
		};
	  	$("input[name='telefoneFixo']").mask(SPMaskBehavior, spOptions);
	}


	/* Contato */
	$("form#contato").submit(function() { 

		var form = $(this);
		var nome = $(this).find("input[name=nome]");
		var email = $(this).find("input[name=email]");
		var telefone = $(this).find("input[name=telefone]");
		var assunto = $(this).find("input[name=assunto]");
		var mensagem = $(this).find("textarea[name=mensagem]");
		var contatoResultAjax = $("div#contatoResultAjax");
		var contatoResultAjaxC = contatoResultAjax.find(".container");

		if(nome.val() === "") { nome.focus(); return false; }
		if(email.val() === "") { email.focus(); return false; }
		if(assunto.val() === "") { assunto.focus(); return false; }
		if(mensagem.val() === "") { mensagem.focus(); return false; }

		var data = { action:"sendEmailContato", nome:nome.val(), email:email.val(), telefone: telefone.val(), assunto: assunto.val(), mensagem: mensagem.val() };

		console.log('Enviando contato...');

		$.ajax({
			url: "action.php",
			type: "post",
			data: data,
			beforeSend: function() { 
				form.hide();
				contatoResultAjaxC.html("Enviando sua mensagem...");
				contatoResultAjax.show();
			},
			success: function(retorno) {
				console.log(retorno);
				if(retorno == "1") {
					contatoResultAjaxC.html("<img src='img/success.png' style='width: 78px;padding-right: 17px;position: relative;top: -3px;' />Mensagem enviada com sucesso!").css("color", "#00814e");
					setTimeout(function() {  document.location.href='./index.php'; }, 5000);
				} else if(retorno == "-2") { 
					contatoResultAjaxC.html("Verifique se você digitou o e-mail corretamente!").css("color", "red");
					setTimeout(function() { contatoResultAjax.hide(); form.show(); email.focus(); }, 3000);
				} else if(retorno == "0") { 
					contatoResultAjaxC.html("Não foi enviar sua mensagem!").css("color", "red");
					setTimeout(function() { contatoResultAjax.hide(); form.show(); }, 3000);
				} else {
					contatoResultAjaxC.html(retorno);
				}
			},
		});

	});

	/* NewsLetter */
	$("form#recebaNovidades").submit(function() { 
		var nome = $(this).find("input[name=nome]");
		var email = $(this).find("input[name=email]");
		var fucktoken = $(this).find("input[name=fucktoken]");
		var btnSubmit = $(this).find("input[type=submit]");
		var msgResultAjax = $(this).find("div#msgResultAjax")
		var data = { action:"registerNewsletter", nome:nome.val(), email:email.val(), fucktoken: fucktoken.val() };
		
		if(nome.val() === "") { nome.focus(); return false; }
		if(email.val() === "") { email.focus(); return false; }

		console.log('Enviando email...');

		$.ajax({
			url: "action.php",
			type: "post",
			data: data,
			beforeSend: function() { 
				msgResultAjax.hide();
				nome.prop('disabled', true);
				email.prop('disabled', true);
				btnSubmit.attr("value", "Enviando..").css('background','#5b6964');
				btnSubmit.prop('disabled', true);
			},
			success: function(retorno) {
				console.log(retorno);
				if(retorno == "1") {
					msgResultAjax.html("E-mail registrado com sucesso!").css("color", "blue");
				} else if(retorno == "-1") {
					msgResultAjax.html("Esse e-mail já foi registrado!").css("color", "red");
				} else if(retorno == "-2") { 
					msgResultAjax.html("Verifique se você digitou o e-mail corretamente!").css("color", "red");
				} else if(retorno == "0") { 
					msgResultAjax.html("Não foi possivel registrar seu e-mail no banco de dados!").css("color", "red");
				} else {
					msgResultAjax.html(retorno);
				}
				msgResultAjax.show(1000);
				setTimeout(function() { 
					nome.prop('disabled', false);
					email.prop('disabled', false);
					btnSubmit.attr("value", "Enviar");
					btnSubmit.prop('disabled', false).css('background','#008052');
				}, 2000);
			},
		});
	});

	/* Mantenedores  ! */
	if($("#apoiadores").length) { 
		/* Carrousel Logo Apoiadores */
		try {
			$('#apoiadores').owlCarousel({
			    loop:true,
			    margin:0,
			    autoplay: true,
			    autoplayTimeout: 3000,
			    responsiveClass:true,
			    items:4,
			    responsive:{
			        0:{
			            items:1,
			        },
			        420:{
			            items:2
			        },
			        800:{
			            items:4
			        }
			    }
			});
		} catch(err) {
			$('section.apoiadores').hide();
		}
	}	

	/* Se existir owlcarrousel2 ativar ! */
	if($("#superSlide").length) { 
		 // Slideshow 1
		$('#superSlide').owlCarousel({
			loop:true,
			margin:0,
			nav:false,
			items: 1,
			autoplay:true,
			autoplayTimeout:6500
		});
	}
	
	/* Se existir owlcarrousel2 ativar ! */
	if($("#owl-projetos-destaque").length) { 
		$('#owl-projetos-destaque').owlCarousel({
			loop:true,
			margin:0,
			nav:false,
			items: 1,
			autoplay:true,
			autoplayTimeout:3500,
			autoplayHoverPause:true
		});
	}
	
	/* se existir: ativar o datepicker */
	if($("#datepicker").length) { 
		$.datepicker.regional['pt-BR'] = {
			closeText: 'Fechar',
			prevText: '&#x3c;Anterior',
			nextText: 'Pr&oacute;ximo&#x3e;',
			currentText: 'Hoje',
			monthNames: ['Janeiro','Fevereiro','Mar&ccedil;o','Abril','Maio','Junho',
			'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
			monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun',
			'Jul','Ago','Set','Out','Nov','Dez'],
			dayNames: ['Domingo','Segunda-feira','Ter&ccedil;a-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sabado'],
			dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
			dayNamesMin: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
			weekHeader: 'Sm',
			dateFormat: 'dd/mm/yy',
			firstDay: 0,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: ''
		};
		$.datepicker.setDefaults($.datepicker.regional['pt-BR']);
		$("#datepicker").datepicker({ 
			beforeShowDay: function( date ) {
				/* Marcar dias no calendario pela variavel array */
				var datePtBr = date.toLocaleDateString('pt-BR');
				var highlight = selectedDates[datePtBr];
				if (highlight) {
					return [true, "highlighted", 'Ver Eventos'];
				}
				else {
					return [true, '', ''];
				}
			},
			onSelect: function(date) {
				/* Quando clicar... redirecionar para o link na variavel array */
				if(selectedDates[date] != undefined) { document.location.href = selectedDates[date]; }
			}
		});
		
	}


});

console.log("**************************************************************************************************************************");
console.log("%cUma pessoa feliz não precisa de religião, não precisa de nenhum templo. Para ela, todo o universo é um templo. %c- %cOsho ", "color:green;", "color:black;", "color:red;");
console.log("Created By %cGabriel A. Barbosa %c<http://gabrieldaluz7.co.nf>", "color:blue;","color:black;");
console.log("**************************************************************************************************************************");