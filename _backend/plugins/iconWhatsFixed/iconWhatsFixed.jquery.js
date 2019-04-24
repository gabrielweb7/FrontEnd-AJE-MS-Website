/**
* ♥ IconWhatsFixed Jquery Plugin  ♥
* @Autor: Gabriel Azuaga Barbosa
* @Descrição: Cria um icone fixo na tela do navegador.. sendo possivel enviar mensagem via whats utilizando api legal :D
* @Version: 1.0 _Criado em: 24/05/2018
* @Github: https://github.com/gabrielweb7/iconWhatsFixed.jquery.js
* @Facebook: https://fb.com/gabrieldaluzbarbosa
* @Creditos: Por favor não retire os créditos.. seja uma boa pessoa :)
**/
(function ( $ ) {
 
			$.fn.iconWhatsFixed = function( options ) {
		 
				var webWhats = "https://web.whatsapp.com/send?phone=";
				var apiWhats = "https://api.whatsapp.com/send?phone=";
				var hrefMode = null;
			
				var settings = $.extend({
					celular: '00999999999',
					mensagem: 'Oi'
				}, options );
		 
				isMobileDevice = function() {
					return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
				};
		 
				$("head").append('<style> \
				.bloco-wthats { \
				position: fixed;\
				right: 20px;\
				bottom: 20px;\
				z-index: 100000;\
				width: 150px;\
				height: 150px; \
				}\
				.link-whats:hover {\
				background-color: #16b84f;\
				}\
				.link-whats {\
				position: absolute;\
				left: 50%;\
				top: 50%;\
				z-index: 1;\
				display: block;\
				overflow: hidden;\
				width: 70px;\
				height: 70px;\
				border-radius: 50%;\
				background-color: #44bb6e;\
				background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHdpZHRoPSIxMDBweCIgaGVpZ2h0PSIxMDBweCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDEwMCAxMDAiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz4KCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0xMDAsNDguNzEyYzAsMjYuOTAzLTIxLjk3Nyw0OC43MTItNDkuMDkxLDQ4LjcxMmMtOC42MDgsMC0xNi42OTUtMi4yLTIzLjczLTYuMDYxTDAsMTAwbDguODYxLTI2LjEzNgoJCWMtNC40Ny03LjM0MS03LjA0NS0xNS45NS03LjA0NS0yNS4xNTJDMS44MTYsMjEuODA5LDIzLjc5NSwwLDUwLjkwOSwwQzc4LjAyNSwwLDEwMCwyMS44MDksMTAwLDQ4LjcxMiBNNTAuOTA5LDcuNzU4CgkJYy0yMi43NiwwLTQxLjI3NCwxOC4zNzItNDEuMjc0LDQwLjk1NGMwLDguOTYyLDIuOTIxLDE3LjI2Miw3Ljg2MywyNC4wMTJsLTUuMTU3LDE1LjIwOWwxNS44NjEtNS4wNDEKCQljNi41MTcsNC4yNzgsMTQuMzIzLDYuNzc0LDIyLjcwNyw2Ljc3NGMyMi43NTcsMCw0MS4yNzQtMTguMzY5LDQxLjI3NC00MC45NTNDOTIuMTgyLDI2LjEzMSw3My42NjgsNy43NTgsNTAuOTA5LDcuNzU4CgkJIE03NS42OTksNTkuOTMxYy0wLjMwNS0wLjQ5Ny0xLjEwNS0wLjc5Ny0yLjMwOC0xLjM5NGMtMS4yMDQtMC41OTctNy4xMjItMy40ODYtOC4yMjMtMy44ODJjLTEuMTAzLTAuMzk5LTEuOTA3LTAuNi0yLjcwOCwwLjU5NgoJCXMtMy4xMDcsMy44ODMtMy44MTEsNC42OGMtMC43MDMsMC43OTktMS40MDQsMC44OTgtMi42MDgsMC4zMDJjLTEuMjAyLTAuNTk3LTUuMDc4LTEuODYtOS42NzUtNS45MjcKCQljLTMuNTc3LTMuMTY0LTUuOTkyLTcuMDcxLTYuNjk0LTguMjY3Yy0wLjcwMS0xLjE5NC0wLjA3My0xLjg0LDAuNTI4LTIuNDM1YzAuNTQyLTAuNTM2LDEuMjA1LTEuMzk0LDEuODA2LTIuMDkxCgkJYzAuNjAzLTAuNjk4LDAuODAzLTEuMTk1LDEuMjAyLTEuOTkyYzAuNDAzLTAuNzk3LDAuMjAyLTEuNDk0LTAuMTAxLTIuMDkzYy0wLjMtMC41OTYtMi43MDgtNi40NzItMy43MTEtOC44NjIKCQljLTEuMDAyLTIuMzktMi4wMDMtMS45OTItMi43MDctMS45OTJjLTAuNzAxLDAtMS41MDQtMC4xLTIuMzA3LTAuMXMtMi4xMDcsMC4yOTktMy4yMSwxLjQ5NGMtMS4xMDIsMS4xOTUtNC4yMSw0LjA4NC00LjIxLDkuOTU4CgkJYzAsNS44NzYsNC4zMSwxMS41NTIsNC45MTMsMTIuMzQ5YzAuNjAxLDAuNzk2LDguMzIzLDEzLjI0NCwyMC41NTYsMTguMDI1YzEyLjIzNCw0Ljc3NywxMi4yMzQsMy4xODQsMTQuNDQsMi45ODQKCQljMi4yMDUtMC4yLDcuMTE4LTIuODg5LDguMTI1LTUuNjc2Qzc1Ljk5OCw2Mi44MTksNzUuOTk4LDYwLjQyOSw3NS42OTksNTkuOTMxIi8+CjwvZz4KPC9zdmc+Cg==");\
				background-position: 50% 50%;\
				background-size: 30px;\
				background-repeat: no-repeat;\
				box-shadow: 6px 6px 25px 0 rgba(0,0,0,.3);\
				-webkit-transform: translate(-50%,-50%);\
				-ms-transform: translate(-50%,-50%);\
				transform: translate(-50%,-50%);\
				-webkit-transition: all 300ms ease;\
				transition: all 300ms ease;\
				}\
				.aura {\
				position: absolute;\
				left: 50%;\
				top: 50%;\
				width: 10%;\
				height: 10%;\
				border-radius: 50%;\
				background-color: #44bb6e;\
				opacity: .5;\
				-webkit-transform: translate(-50%,-50%);\
				-ms-transform: translate(-50%,-50%);\
				transform: translate(-50%,-50%);\
				transition: width 1500ms, height 1500ms, opacity 2500ms\
				}\
				.aura-active { width:100%; height:100%; opacity:0; }\
				@media only screen and (max-width: 768px) { .bloco-wthats {right: 1px;     bottom: 1px;     width: 108px; height: 108px; } }</style>');

				/* Check Mobile Device */
				if(isMobileDevice()) { 
					hrefMode = apiWhats;
				} else { 
					hrefMode = webWhats;
				}
				
				$("body").append('<div class="bloco-wthats">\
					<a href="'+hrefMode+settings.celular+'&text='+settings.mensagem+'" target="_blank" class="link-whats w-inline-block"></a>\
					<div class="aura"></div>\
				</div>');
									
				setInterval(function() { 
					$(".bloco-wthats .aura").addClass("aura-active");
					setTimeout(function() {
						$(".bloco-wthats .aura").remove();
						$(".bloco-wthats").append('<div class="aura"></div>');
					}, 1600)
				},1700);
		 
			};
		 
		}( jQuery ));
		