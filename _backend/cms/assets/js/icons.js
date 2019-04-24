System.registerDynamic("reactiveadmintemplate/scripts/modules/icons.js", ["velocity"], true, function ($__require, exports, module) {
    'use strict';

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    /*!
     * @version: 1.1.2
     * @name: icons
     *
     * @author: https://themeforest.net/user/flexlayers
     */
    $__require("velocity");
    $(function () {
        $('.icon-def-list').on('mouseenter', '.icon-list-item', function () {
            $(this).find('.title').fadeOut(0);
            $(this).find('.click').fadeIn(0);
        }).on('mouseleave', '.icon-list-item', function () {
            $(this).find('.title').fadeIn(0);
            $(this).find('.click').fadeOut(0);
        });
        $('.icon-font-sizes').on('click', '.item', function () {
            $('.icon-font-sizes .item').removeClass('active');
            $(this).addClass('active');
            $('.icon-def-list').find('.icon').css('fontSize', $(this).find('a').data('size'));
        });
        $('.icon-font-group').on('click', '.item', function (event) {
            event.preventDefault();
            $('body').velocity('scroll', { offset: $($(this).find('a').attr('href')).offset().top - 50, duration: 500, queue: false, easing: 'easeInOutCubic', mobileHA: false });
        });
    });
});
System.registerDynamic("reactiveadmintemplate/scripts/icons.js", ["./app", "./modules/icons"], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", { value: true });
  /*!
   * @version: 1.1.2
   * @name: icons
   *
   * @author: https://themeforest.net/user/flexlayers
   */
  $__require("./app");
  $__require("./modules/icons");
});