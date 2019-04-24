/**
* ▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
*                   Criado por Gabriel Azuaga Barbosa
*                  E-mail: gabrielbarbosaweb7@gmail.com
*  `•.¸¸.•´´¯`••._.• [ http://gabrieldaluz7.co.nf/ ] •._.••`¯´´•.¸¸.•`
* ▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
*/

$(function() { 

	
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