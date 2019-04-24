/**
* ♥ uploadFiles7 Jquery Plugin  ♥
* _Autor: Gabriel Azuaga Barbosa
* _Descrição: Possibilita criar um campo de upload personalizado com botão e input invisvel
*             pré carregamento de imagens em base64 e validação de arquivos e tamanho em kbytes
* _Version: 1.1 _Criado em: 18/04/2018
* _Github: https://github.com/gabrielweb7/uploadFiles7.jquery.js
**/
(function ( $ ) {
 
    $.fn.uploadFiles7 = function( options ) {
 
		/* This */
		var objThis = $(this);
 
        /* Default options */
        var settings = $.extend({
			buttonUploadById: false,
			buttonUploadText: 'Procurar',
			buttonRemoverById: false,
			buttonRemoverText: 'Remover',
            messageUploadById: false,
            messageUploadText: 'Nenhum arquivo selecionado!',
			onlyExtensions: false,
			imagePreviewById: false,
			onErrorEvent: function() { },
			onSuccess: function() { },
			onReset: function() { }
        }, options );
 
		/* Verifica se buttonUploadById existe*/
		if(existeIdOrClass(settings.buttonUploadById)) { 
			objThis.prop("style", "opacity:0;position:absolute;top:0px;bottom:0px;height:0px;width:0px;"); 
			$(settings.buttonUploadById).html(settings.buttonUploadText);
		}
	
		/* Verifica se msgUploadFotoById existe*/
		if(existeIdOrClass(settings.messageUploadById)) { 
			$(settings.messageUploadById).html(settings.messageUploadText);
		}
		
		/* Verifica se buttonRemoverById existe*/
		if(existeIdOrClass(settings.buttonRemoverById)) { 
			$(settings.buttonRemoverById).hide().html(settings.buttonRemoverText);
		}
	

		/**  
			Evento quando clica no objThis 
		**/
		$(settings.buttonUploadById).on("click", function(e) {
			objThis.click();	
		});
		
		/**  
			Evento quando clica no buttonRemoverById 
		**/
		$(settings.buttonRemoverById).on("click", function(e) {
			resetAllPlugin();
		});
		
		/** 
			Evento de quando há alteração no objThis 
		**/
		objThis.on("change", function(e) {
			
			/* Recebe dados do input */
			var inputProp = objThis.prop("files")[0];
			var inputPropName = inputProp["name"];
			var inputPropType = inputProp["type"];
			
			/* Ver se validação de extensao está ativado */
			if(settings.onlyExtensions) { 
				if(isArray(settings.onlyExtensions)) {
					if(settings.onlyExtensions.indexOf(inputPropType.toLowerCase()) > -1) {
						
						/* Verifica se imagePreviewById existe*/
						if(existeIdOrClass(settings.imagePreviewById)) { 
							
							/* Gera a base64 do arquivo selecionado no input e executa função de preview */
							getBase64(inputProp, function(resultado64) {  
								$(settings.imagePreviewById).prop("src", resultado64);
							} );
							
						}
						
						/* Funcao de Sucesso Dinamica */
						settings.onSuccess(inputProp);
						
					} else {
						
						/* Funcao de Erro Dinamica */
						settings.onErrorEvent('Extensão de arquivos permitidos: '+filterArrayElementsExplode(settings.onlyExtensions,"/",1).toString().toString());

						/* Clear value do input */
						resetAllPlugin();
						
						/* Return */
						return false;
					}
				}
			}
			
			/* Verifica se buttonUploadById existe*/
			if(existeIdOrClass(settings.buttonUploadById)) { 
				$(settings.buttonUploadById).html("Alterar");
			}
			
			/* Verifica se msgUploadFotoById existe*/
			if(existeIdOrClass(settings.messageUploadById)) { 
				$(settings.messageUploadById).html(inputPropName);
			}
			
			/* Verifica se buttonRemoverById existe*/
			if(existeIdOrClass(settings.buttonRemoverById)) { 
				$(settings.buttonRemoverById).show(500);
			}
			
		});
		
		/* Funcao criada para resetar padroes do plugin */
		function resetAllPlugin() { 
		
			/* Apaga value do input */
			objThis.val("");
			
			/* Verifica se buttonUploadById existe e reseta configuracao padrao */
			if(existeIdOrClass(settings.buttonUploadById)) { 
				objThis.prop("style", "opacity:0;position:absolute;top:0px;bottom:0px;height:0px;width:0px;"); 
				$(settings.buttonUploadById).html(settings.buttonUploadText);
			}
			
			/* Verifica se msgUploadFotoById existe e reseta configuracao padrao */
			if(existeIdOrClass(settings.messageUploadById)) { 
				$(settings.messageUploadById).html(settings.messageUploadText);
			}
			
			/* Verifica se buttonRemoverById existe e reseta configuracoes padrao */
			if(existeIdOrClass(settings.buttonRemoverById)) { 
				$(settings.buttonRemoverById).hide();
			}
			
			/* Verifica se imagePreviewById existe e reseta configuracoes padrao */
			if(existeIdOrClass(settings.imagePreviewById)) { 
				$(settings.imagePreviewById).prop("src", "");
			}
			
			/* Executa funcao onReset Dinamica */
			settings.onReset();
			
		}
		
		/* Lê o arquivo e retorna base64 ou false */
		function getBase64(file, actionSucces) {
			var reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = function () {
				actionSucces(reader.result);
			};
			reader.onerror = function (error) {
				return false;
			};
		}

		/* filtro para Array - converter cada registro em case baixo */
		function filterArrayElementsToLowerCase(value) {
		  return value.toString().toLowerCase();
		}
		
		/* filtro para Array - explode e retorna posicao selecionada */
		function filterArrayElementsExplode(arrayVar, caractere, posicao) {
			var newArray = [];
			for ( var i = 0; i < arrayVar.length; i++ ) {
				var exploded = arrayVar[i].split(caractere);
				newArray.push(exploded[posicao]);
			}
			return newArray;
		}
		
		
		/* Verifica se variavel é do tipo Array */
		function isArray(value) {
			return value && typeof value === 'object' && value.constructor === Array;
		};

		/* Funcao que verifica se ID ou CLASS existe na pagina */
		function existeIdOrClass(identificador) {
			if($(identificador).length) { 
				return true;	
			} else {
				return false;
			}
		}
		
		//return this.append('Hello ' + settings.name + '!').css({ color: settings.color });
		

    };
}( jQuery ));