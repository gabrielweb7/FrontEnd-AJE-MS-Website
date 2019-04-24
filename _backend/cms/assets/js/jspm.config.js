SystemJS.config({
    transpiler: 'plugin-babel',
    packages: {
        'reactiveadmintemplate': {
            'main': 'scripts/app',
            'defaultExtension': 'js',
            'meta': {
                '*.ts': {
                    'loader': 'plugin-typescript'
                }
            }
        }
    },
    browserConfig: {
        'baseURL': '',
        'paths': {
            'github:': '/jspm_packages/github/',
            'npm:': '/jspm_packages/npm/',
            'reactiveadmintemplate/': ''
        },
        'bundles': {
            'assets/js/app.js': [
                'reactiveadmintemplate/scripts/app.js',
                'reactiveadmintemplate/scripts/modules/form/slider/init.js',
                'npm:moment@2.18.1/moment.js',
                'npm:moment@2.18.1.json',
                'reactiveadmintemplate/scripts/modules/form/slider/nouislider.js',
                'npm:ion-rangeslider@2.2.0/js/ion.rangeSlider.js',
                'npm:ion-rangeslider@2.2.0.json',
                'reactiveadmintemplate/scripts/modules/form/file-upload.js',
                'npm:bootstrap-imageupload@1.1.3/dist/js/bootstrap-imageupload.js',
                'npm:bootstrap-imageupload@1.1.3.json',
                'npm:easy-pie-chart@2.1.7/dist/easypiechart.js',
                'npm:easy-pie-chart@2.1.7.json',
                'npm:dropzone@4.3.0/dist/dropzone.js',
                'npm:dropzone@4.3.0.json',
                'reactiveadmintemplate/scripts/modules/charts/chart.js',
                'npm:waypoints@4.0.1/lib/jquery.waypoints.js',
                'npm:waypoints@4.0.1.json',
                'npm:chart.js@2.7.0/src/chart.js',
                'npm:chart.js@2.7.0.json',
                'npm:jspm-nodelibs-process@0.2.1/process.js',
                'npm:jspm-nodelibs-process@0.2.1.json',
                'npm:chart.js@2.7.0/src/plugins/plugin.title.js',
                'npm:chart.js@2.7.0/src/helpers/index.js',
                'npm:chart.js@2.7.0/src/helpers/helpers.options.js',
                'npm:chart.js@2.7.0/src/helpers/helpers.core.js',
                'npm:chart.js@2.7.0/src/helpers/helpers.canvas.js',
                'npm:chart.js@2.7.0/src/helpers/helpers.easing.js',
                'npm:chart.js@2.7.0/src/core/core.element.js',
                'npm:chartjs-color@2.2.0/index.js',
                'npm:chartjs-color@2.2.0.json',
                'npm:chartjs-color-string@0.5.0/color-string.js',
                'npm:chartjs-color-string@0.5.0.json',
                'npm:color-name@1.1.3/index.js',
                'npm:color-name@1.1.3.json',
                'npm:color-convert@0.5.3/index.js',
                'npm:color-convert@0.5.3.json',
                'npm:color-convert@0.5.3/conversions.js',
                'npm:chart.js@2.7.0/src/core/core.defaults.js',
                'npm:chart.js@2.7.0/src/plugins/plugin.legend.js',
                'npm:chart.js@2.7.0/src/plugins/plugin.filler.js',
                'npm:chart.js@2.7.0/src/elements/index.js',
                'npm:chart.js@2.7.0/src/elements/element.rectangle.js',
                'npm:chart.js@2.7.0/src/elements/element.point.js',
                'npm:chart.js@2.7.0/src/elements/element.line.js',
                'npm:chart.js@2.7.0/src/elements/element.arc.js',
                'npm:chart.js@2.7.0/src/charts/Chart.Scatter.js',
                'npm:chart.js@2.7.0/src/charts/Chart.Radar.js',
                'npm:chart.js@2.7.0/src/charts/Chart.PolarArea.js',
                'npm:chart.js@2.7.0/src/charts/Chart.Line.js',
                'npm:chart.js@2.7.0/src/charts/Chart.Doughnut.js',
                'npm:chart.js@2.7.0/src/charts/Chart.Bubble.js',
                'npm:chart.js@2.7.0/src/charts/Chart.Bar.js',
                'npm:chart.js@2.7.0/src/controllers/controller.scatter.js',
                'npm:chart.js@2.7.0/src/controllers/controller.radar.js',
                'npm:chart.js@2.7.0/src/controllers/controller.polarArea.js',
                'npm:chart.js@2.7.0/src/controllers/controller.line.js',
                'npm:chart.js@2.7.0/src/controllers/controller.doughnut.js',
                'npm:chart.js@2.7.0/src/controllers/controller.bubble.js',
                'npm:chart.js@2.7.0/src/controllers/controller.bar.js',
                'npm:chart.js@2.7.0/src/scales/scale.time.js',
                'npm:chart.js@2.7.0/src/scales/scale.radialLinear.js',
                'npm:chart.js@2.7.0/src/core/core.ticks.js',
                'npm:chart.js@2.7.0/src/scales/scale.logarithmic.js',
                'npm:chart.js@2.7.0/src/scales/scale.linear.js',
                'npm:chart.js@2.7.0/src/scales/scale.category.js',
                'npm:chart.js@2.7.0/src/scales/scale.linearbase.js',
                'npm:chart.js@2.7.0/src/core/core.tooltip.js',
                'npm:chart.js@2.7.0/src/core/core.scale.js',
                'npm:chart.js@2.7.0/src/core/core.scaleService.js',
                'npm:chart.js@2.7.0/src/core/core.layoutService.js',
                'npm:chart.js@2.7.0/src/core/core.datasetController.js',
                'npm:chart.js@2.7.0/src/core/core.controller.js',
                'npm:chart.js@2.7.0/src/platforms/platform.js',
                'npm:chart.js@2.7.0/src/platforms/platform.dom.js',
                'npm:chart.js@2.7.0/src/platforms/platform.basic.js',
                'npm:chart.js@2.7.0/src/core/core.interaction.js',
                'npm:chart.js@2.7.0/src/core/core.animation.js',
                'npm:chart.js@2.7.0/src/core/core.plugin.js',
                'npm:chart.js@2.7.0/src/core/core.helpers.js',
                'npm:chart.js@2.7.0/src/core/core.js',
                'reactiveadmintemplate/scripts/modules/charts/chart-helper.js',
                'reactiveadmintemplate/scripts/modules/chat.js',
                'npm:perfect-scrollbar@0.6.16/index.js',
                'npm:perfect-scrollbar@0.6.16.json',
                'npm:perfect-scrollbar@0.6.16/src/js/main.js',
                'npm:perfect-scrollbar@0.6.16/src/js/plugin/update.js',
                'npm:perfect-scrollbar@0.6.16/src/js/plugin/update-scroll.js',
                'npm:perfect-scrollbar@0.6.16/src/js/plugin/instances.js',
                'npm:perfect-scrollbar@0.6.16/src/js/lib/guid.js',
                'npm:perfect-scrollbar@0.6.16/src/js/lib/event-manager.js',
                'npm:perfect-scrollbar@0.6.16/src/js/lib/dom.js',
                'npm:perfect-scrollbar@0.6.16/src/js/plugin/default-setting.js',
                'npm:perfect-scrollbar@0.6.16/src/js/lib/class.js',
                'npm:perfect-scrollbar@0.6.16/src/js/lib/helper.js',
                'npm:perfect-scrollbar@0.6.16/src/js/plugin/update-geometry.js',
                'npm:perfect-scrollbar@0.6.16/src/js/plugin/initialize.js',
                'npm:perfect-scrollbar@0.6.16/src/js/plugin/handler/native-scroll.js',
                'npm:perfect-scrollbar@0.6.16/src/js/plugin/handler/selection.js',
                'npm:perfect-scrollbar@0.6.16/src/js/plugin/handler/touch.js',
                'npm:perfect-scrollbar@0.6.16/src/js/plugin/handler/mouse-wheel.js',
                'npm:perfect-scrollbar@0.6.16/src/js/plugin/handler/keyboard.js',
                'npm:perfect-scrollbar@0.6.16/src/js/plugin/handler/drag-scrollbar.js',
                'npm:perfect-scrollbar@0.6.16/src/js/plugin/handler/click-rail.js',
                'npm:perfect-scrollbar@0.6.16/src/js/plugin/destroy.js',
                'npm:emojionearea@3.1.8/dist/emojionearea.js',
                'npm:emojionearea@3.1.8.json',
                'reactiveadmintemplate/scripts/modules/grid/init.js',
                'github:marcj/css-element-queries@0.4.0/src/ElementQueries.js',
                'github:marcj/css-element-queries@0.4.0.json',
                'github:marcj/css-element-queries@0.4.0/src/ResizeSensor.js',
                'reactiveadmintemplate/scripts/modules/dropdown/transition.js',
                'reactiveadmintemplate/scripts/modules/grid/item.js',
                'reactiveadmintemplate/scripts/modules/grid/panel.js',
                'npm:screenfull@3.3.1/dist/screenfull.js',
                'npm:screenfull@3.3.1.json',
                'reactiveadmintemplate/scripts/modules/grid/grid.js',
                'npm:gridstack@0.2.6/dist/gridstack.js',
                'npm:gridstack@0.2.6.json',
                'npm:jquery-ui-touch-punch@0.2.3/jquery.ui.touch-punch.js',
                'npm:jquery-ui-touch-punch@0.2.3.json',
                'github:components/jqueryui@1.12.1/ui/widgets/draggable.js',
                'github:components/jqueryui@1.12.1.json',
                'github:components/jqueryui@1.12.1/ui/widget.js',
                'github:components/jqueryui@1.12.1/ui/version.js',
                'npm:jquery@3.2.1/dist/jquery.js',
                'npm:jquery@3.2.1.json',
                'github:components/jqueryui@1.12.1/ui/scroll-parent.js',
                'github:components/jqueryui@1.12.1/ui/safe-blur.js',
                'github:components/jqueryui@1.12.1/ui/safe-active-element.js',
                'github:components/jqueryui@1.12.1/ui/plugin.js',
                'github:components/jqueryui@1.12.1/ui/data.js',
                'github:components/jqueryui@1.12.1/ui/widgets/mouse.js',
                'github:components/jqueryui@1.12.1/ui/ie.js',
                'github:components/jqueryui@1.12.1/ui/widgets/resizable.js',
                'github:components/jqueryui@1.12.1/ui/disable-selection.js',
                'github:components/jqueryui@1.12.1/ui/unique-id.js',
                'github:components/jqueryui@1.12.1/ui/tabbable.js',
                'github:components/jqueryui@1.12.1/ui/focusable.js',
                'github:components/jqueryui@1.12.1/ui/keycode.js',
                'npm:lodash@4.17.4/lodash.js',
                'npm:lodash@4.17.4.json',
                'reactiveadmintemplate/scripts/modules/grid/store.js',
                'reactiveadmintemplate/scripts/modules/theme.js',
                'reactiveadmintemplate/scripts/modules/store.js',
                'reactiveadmintemplate/scripts/modules/header.js',
                'reactiveadmintemplate/scripts/modules/aside/init.js',
                'reactiveadmintemplate/scripts/modules/aside/aside.js',
                'npm:hammerjs@2.0.8/hammer.js',
                'npm:hammerjs@2.0.8.json',
                'npm:velocity-animate@1.5.0/velocity.js',
                'npm:velocity-animate@1.5.0.json',
                'reactiveadmintemplate/scripts/modules/sidebar/init.js',
                'reactiveadmintemplate/scripts/modules/sidebar/menu.js',
                'reactiveadmintemplate/scripts/modules/sidebar/sidebar.js',
                'reactiveadmintemplate/scripts/modules/form/checkbox/init.js',
                'reactiveadmintemplate/scripts/modules/form/checkbox/main.js',
                'reactiveadmintemplate/scripts/modules/dropdown/init.js',
                'reactiveadmintemplate/scripts/modules/dropdown/api.js',
                'reactiveadmintemplate/scripts/modules/dropdown/main.js',
                'reactiveadmintemplate/scripts/modules/main.js',
                'npm:hideseek@0.8.0/jquery.hideseek.js',
                'npm:hideseek@0.8.0.json',
                'npm:bootstrap@4.0.0-beta/dist/js/bootstrap.js',
                'npm:bootstrap@4.0.0-beta.json',
                'github:HubSpot/tether@1.4.0/js/tether.js',
                'github:HubSpot/tether@1.4.0.json',
                'npm:popper.js@1.12.5/dist/umd/popper.js',
                'npm:popper.js@1.12.5.json'
            ],
            'assets/js/chart.js': [
                'reactiveadmintemplate/scripts/chart.js'
            ],
            'assets/js/prod.js': [
                'reactiveadmintemplate/scripts/prod.js',
                'reactiveadmintemplate/scripts/modules/charts/spark.js',
                'npm:jquery-sparkline@2.4.0/jquery.sparkline.js',
                'npm:jquery-sparkline@2.4.0.json',
                'reactiveadmintemplate/scripts/modules/product/init.js',
                'github:istvan-ujjmeszaros/bootstrap-touchspin@3.1.2/dist/jquery.bootstrap-touchspin.js',
                'github:istvan-ujjmeszaros/bootstrap-touchspin@3.1.2.json',
                'reactiveadmintemplate/scripts/modules/form/editor/summernote.js',
                'npm:bootstrap-table@1.11.2/src/extensions/export/bootstrap-table-export.js',
                'npm:bootstrap-table@1.11.2.json',
                'npm:bootstrap-table@1.11.2/src/extensions/editable/bootstrap-table-editable.js',
                'npm:tableexport.jquery.plugin@1.9.3/tableExport.min.js',
                'npm:tableexport.jquery.plugin@1.9.3.json',
                'npm:x-editable@1.5.1/dist/bootstrap3-editable/js/bootstrap-editable.js',
                'npm:x-editable@1.5.1.json',
                'npm:bootstrap-table@1.11.2/dist/bootstrap-table.js',
                'github:components/jqueryui@1.12.1/ui/widgets/sortable.js',
                'reactiveadmintemplate/scripts/modules/product/photo-editor/init.js',
                'reactiveadmintemplate/scripts/modules/product/photo-editor/view.js',
                'reactiveadmintemplate/scripts/modules/product/photo-editor/controller.js',
                'npm:cropperjs@1.0.0/dist/cropper.js',
                'npm:cropperjs@1.0.0.json'
            ],
            'assets/js/dash1.js': [
                'reactiveadmintemplate/scripts/dash1.js',
                'reactiveadmintemplate/scripts/modules/table/init.js',
                'reactiveadmintemplate/scripts/modules/table/bootstrap-table-filter-control.js',
                'reactiveadmintemplate/scripts/modules/table/bootstrap-table-group-by.js',
                'npm:bootstrap-table@1.11.2/src/extensions/mobile/bootstrap-table-mobile.js',
                'npm:bootstrap-table@1.11.2.json',
                'npm:bootstrap-table@1.11.2/src/extensions/export/bootstrap-table-export.js',
                'npm:bootstrap-table@1.11.2/src/extensions/editable/bootstrap-table-editable.js',
                'npm:tableexport.jquery.plugin@1.9.3/tableExport.min.js',
                'npm:tableexport.jquery.plugin@1.9.3.json',
                'npm:x-editable@1.5.1/dist/bootstrap3-editable/js/bootstrap-editable.js',
                'npm:x-editable@1.5.1.json',
                'npm:bootstrap-table@1.11.2/dist/bootstrap-table.js',
                'github:components/jqueryui@1.12.1/ui/widgets/sortable.js',
                'reactiveadmintemplate/scripts/modules/charts/spark.js',
                'npm:jquery-sparkline@2.4.0/jquery.sparkline.js',
                'npm:jquery-sparkline@2.4.0.json'
            ],
            'assets/js/animation.js': [
                'reactiveadmintemplate/scripts/animation.js',
                'reactiveadmintemplate/scripts/modules/animations.js',
                'npm:velocity-animate@1.5.0/velocity.ui.js'
            ],
            'assets/js/chat.js': [
                'reactiveadmintemplate/scripts/chat.js',
                'reactiveadmintemplate/scripts/modules/calendar.js',
                'npm:fullcalendar@3.5.1/dist/fullcalendar.js',
                'npm:fullcalendar@3.5.1.json'
            ],
            'assets/js/dash2.js': [
                'reactiveadmintemplate/scripts/dash2.js',
                'reactiveadmintemplate/scripts/modules/sortable.js',
                'github:components/jqueryui@1.12.1/ui/widgets/sortable.js',
                'reactiveadmintemplate/scripts/modules/weather/init.js',
                'npm:skycons@1.0.0/skycons.js',
                'npm:skycons@1.0.0.json',
                'reactiveadmintemplate/scripts/modules/weather/weather.js',
                'reactiveadmintemplate/scripts/modules/carousel/init.js',
                'npm:slick-carousel@1.7.1/slick/slick.js',
                'npm:slick-carousel@1.7.1.json',
                'reactiveadmintemplate/scripts/modules/charts/map.js',
                'npm:jquery-mapael@2.1.0/js/maps/world_countries.js',
                'npm:jquery-mapael@2.1.0.json',
                'npm:jquery-mapael@2.1.0/js/jquery.mapael.js',
                'npm:raphael@2.2.7/raphael.min.js',
                'npm:raphael@2.2.7.json'
            ],
            'assets/js/icons.js': [
                'reactiveadmintemplate/scripts/icons.js',
                'reactiveadmintemplate/scripts/modules/icons.js'
            ],
            'assets/js/form-addon.js': [
                'reactiveadmintemplate/scripts/form-addon.js',
                'reactiveadmintemplate/scripts/modules/wizard/init.js',
                'reactiveadmintemplate/scripts/modules/wizard/main.js',
                'reactiveadmintemplate/scripts/modules/form/touch-spin.js',
                'github:istvan-ujjmeszaros/bootstrap-touchspin@3.1.2/dist/jquery.bootstrap-touchspin.js',
                'github:istvan-ujjmeszaros/bootstrap-touchspin@3.1.2.json',
                'reactiveadmintemplate/scripts/modules/form/color-picker.js',
                'npm:spectrum-colorpicker@1.8.0/spectrum.js',
                'npm:spectrum-colorpicker@1.8.0.json',
                'npm:tinycolor2@1.4.1/tinycolor.js',
                'npm:tinycolor2@1.4.1.json',
                'reactiveadmintemplate/scripts/modules/form/editor/init.js',
                'reactiveadmintemplate/scripts/modules/form/editor/summernote.js',
                'reactiveadmintemplate/scripts/modules/form/input-mask.js',
                'npm:inputmask@3.3.8/dist/inputmask/inputmask.extensions.js',
                'npm:inputmask@3.3.8.json',
                'npm:inputmask@3.3.8/dist/inputmask/inputmask.date.extensions.js',
                'npm:inputmask@3.3.8/dist/inputmask/jquery.inputmask.js',
                'npm:inputmask@3.3.8/dist/inputmask/inputmask.js',
                'reactiveadmintemplate/scripts/modules/form/time-picker.js',
                'npm:bootstrap-timepicker@0.5.2/js/bootstrap-timepicker.js',
                'npm:bootstrap-timepicker@0.5.2.json',
                'reactiveadmintemplate/scripts/modules/form/datatimepicker/init.js',
                'reactiveadmintemplate/scripts/modules/form/datatimepicker/main.js',
                'reactiveadmintemplate/scripts/modules/form/datapicker/init.js',
                'reactiveadmintemplate/scripts/modules/form/datapicker/main.js',
                'reactiveadmintemplate/scripts/modules/form/validation/init.js',
                'reactiveadmintemplate/scripts/modules/form/validation/main.js'
            ],
            'assets/js/mail.js': [
                'reactiveadmintemplate/scripts/mail.js',
                'reactiveadmintemplate/scripts/modules/mail.js',
                'reactiveadmintemplate/scripts/modules/form/editor/summernote.js'
            ],
            'assets/js/nestable.js': [
                'reactiveadmintemplate/scripts/nestable.js',
                'reactiveadmintemplate/scripts/modules/nestable.js',
                'npm:nestable2@1.5.0/jquery.nestable.js',
                'npm:nestable2@1.5.0.json'
            ],
            'assets/js/photo.js': [
                'reactiveadmintemplate/scripts/photo.js',
                'reactiveadmintemplate/scripts/modules/product/photo-editor/init.js',
                'reactiveadmintemplate/scripts/modules/product/photo-editor/view.js',
                'reactiveadmintemplate/scripts/modules/product/photo-editor/controller.js',
                'npm:cropperjs@1.0.0/dist/cropper.js',
                'npm:cropperjs@1.0.0.json'
            ],
            'assets/js/project.js': [
                'reactiveadmintemplate/scripts/project.js',
                'reactiveadmintemplate/scripts/modules/project.js',
                'reactiveadmintemplate/scripts/modules/calendar.js',
                'npm:fullcalendar@3.5.1/dist/fullcalendar.js',
                'npm:fullcalendar@3.5.1.json',
                'reactiveadmintemplate/scripts/modules/todos/init.js',
                'reactiveadmintemplate/scripts/modules/todos/view.js',
                'reactiveadmintemplate/scripts/modules/todos/store.js',
                'reactiveadmintemplate/scripts/modules/todos/template.js',
                'reactiveadmintemplate/scripts/modules/todos/controller.js',
                'reactiveadmintemplate/scripts/modules/sortable.js',
                'github:components/jqueryui@1.12.1/ui/widgets/sortable.js'
            ],
            'assets/js/tabs.js': [
                'reactiveadmintemplate/scripts/tabs.js',
                'reactiveadmintemplate/scripts/modules/rating/init.js',
                'reactiveadmintemplate/scripts/modules/rating/rating.js'
            ],
            'assets/js/widget.js': [
                'reactiveadmintemplate/scripts/widget.js',
                'reactiveadmintemplate/scripts/modules/calendar.js',
                'npm:fullcalendar@3.5.1/dist/fullcalendar.js',
                'npm:fullcalendar@3.5.1.json',
                'reactiveadmintemplate/scripts/modules/form/touch-spin.js',
                'github:istvan-ujjmeszaros/bootstrap-touchspin@3.1.2/dist/jquery.bootstrap-touchspin.js',
                'github:istvan-ujjmeszaros/bootstrap-touchspin@3.1.2.json',
                'reactiveadmintemplate/scripts/modules/sortable.js',
                'github:components/jqueryui@1.12.1/ui/widgets/sortable.js',
                'reactiveadmintemplate/scripts/modules/weather/init.js',
                'npm:skycons@1.0.0/skycons.js',
                'npm:skycons@1.0.0.json',
                'reactiveadmintemplate/scripts/modules/weather/weather.js',
                'reactiveadmintemplate/scripts/modules/rating/init.js',
                'reactiveadmintemplate/scripts/modules/rating/rating.js',
                'reactiveadmintemplate/scripts/modules/todos/init.js',
                'reactiveadmintemplate/scripts/modules/todos/view.js',
                'reactiveadmintemplate/scripts/modules/todos/store.js',
                'reactiveadmintemplate/scripts/modules/todos/template.js',
                'reactiveadmintemplate/scripts/modules/todos/controller.js',
                'reactiveadmintemplate/scripts/modules/charts/spark.js',
                'npm:jquery-sparkline@2.4.0/jquery.sparkline.js',
                'npm:jquery-sparkline@2.4.0.json'
            ],
            'assets/js/table.js': [
                'reactiveadmintemplate/scripts/table.js',
                'reactiveadmintemplate/scripts/modules/table/init.js',
                'reactiveadmintemplate/scripts/modules/table/bootstrap-table-filter-control.js',
                'reactiveadmintemplate/scripts/modules/table/bootstrap-table-group-by.js',
                'npm:bootstrap-table@1.11.2/src/extensions/mobile/bootstrap-table-mobile.js',
                'npm:bootstrap-table@1.11.2.json',
                'npm:bootstrap-table@1.11.2/src/extensions/export/bootstrap-table-export.js',
                'npm:bootstrap-table@1.11.2/src/extensions/editable/bootstrap-table-editable.js',
                'npm:tableexport.jquery.plugin@1.9.3/tableExport.min.js',
                'npm:tableexport.jquery.plugin@1.9.3.json',
                'npm:x-editable@1.5.1/dist/bootstrap3-editable/js/bootstrap-editable.js',
                'npm:x-editable@1.5.1.json',
                'npm:bootstrap-table@1.11.2/dist/bootstrap-table.js',
                'github:components/jqueryui@1.12.1/ui/widgets/sortable.js',
                'reactiveadmintemplate/scripts/modules/form/datapicker/init.js',
                'reactiveadmintemplate/scripts/modules/form/datapicker/main.js'
            ],
            'assets/js/task.js': [
                'reactiveadmintemplate/scripts/task.js',
                'reactiveadmintemplate/scripts/modules/form/color-picker.js',
                'npm:spectrum-colorpicker@1.8.0/spectrum.js',
                'npm:spectrum-colorpicker@1.8.0.json',
                'npm:tinycolor2@1.4.1/tinycolor.js',
                'npm:tinycolor2@1.4.1.json',
                'reactiveadmintemplate/scripts/modules/sortable.js',
                'github:components/jqueryui@1.12.1/ui/widgets/sortable.js'
            ]
        }
    },
    nodeConfig: {
        'paths': {
            'github:': 'jspm_packages/github/',
            'npm:': 'jspm_packages/npm/',
            'reactiveadmintemplate/': 'tmp/'
        }
    },
    devConfig: {
        'map': {
            'plugin-babel': 'npm:systemjs-plugin-babel@0.0.21',
            'plugin-typescript': 'github:frankwallis/plugin-typescript@7.1.0',
            'typescript': 'npm:typescript@2.5.2',
            'net': 'npm:jspm-nodelibs-net@0.2.1',
            'module': 'npm:jspm-nodelibs-module@0.2.1'
        },
        'packages': {
            'npm:typescript@2.5.2': {
                'map': {
                    'source-map-support': 'npm:source-map-support@0.4.18'
                }
            },
            'npm:source-map-support@0.4.18': {
                'map': {
                    'source-map': 'npm:source-map@0.5.7'
                }
            }
        }
    }
});

SystemJS.config({
    packageConfigPaths: [
        'npm:@*/*.json',
        'npm:*.json',
        'github:*/*.json'
    ],
    map: {
        'assert': 'npm:jspm-nodelibs-assert@0.2.1',
        'bootstrap': 'npm:bootstrap@4.0.0-beta',
        'bootstrap-table': 'npm:bootstrap-table@1.11.2',
        'buffer': 'npm:jspm-nodelibs-buffer@0.2.3',
        'chartjs': 'npm:chart.js@2.7.0',
        'child_process': 'npm:jspm-nodelibs-child_process@0.2.1',
        'colorpicker': 'npm:spectrum-colorpicker@1.8.0',
        'constants': 'npm:jspm-nodelibs-constants@0.2.1',
        'cropperjs': 'npm:cropperjs@1.0.0',
        'crypto': 'npm:jspm-nodelibs-crypto@0.2.1',
        'css-element-queries': 'github:marcj/css-element-queries@0.4.0',
        'devicons': 'npm:devicons@1.8.0',
        'dropzone': 'npm:dropzone@4.3.0',
        'easy-pie-chart': 'npm:easy-pie-chart@2.1.7',
        'emojionearea': 'npm:emojionearea@3.1.8',
        'events': 'npm:jspm-nodelibs-events@0.2.2',
        'font-awesome': 'npm:font-awesome@4.7.0',
        'fs': 'npm:jspm-nodelibs-fs@0.2.1',
        'fullcalendar': 'npm:fullcalendar@3.5.1',
        'gridstack': 'npm:gridstack@0.2.6',
        'hammerjs': 'npm:hammerjs@2.0.8',
        'hideseek': 'npm:hideseek@0.8.0',
        'http': 'npm:jspm-nodelibs-http@0.2.0',
        'imageupload': 'npm:bootstrap-imageupload@1.1.3',
        'inputmask': 'npm:inputmask@3.3.8',
        'ionicons': 'npm:ionicons@2.0.1',
        'ionrangeslider': 'npm:ion-rangeslider@2.2.0',
        'istvan-ujjmeszaros/bootstrap-touchspin': 'github:istvan-ujjmeszaros/bootstrap-touchspin@3.1.2',
        'jquery': 'npm:jquery@3.2.1',
        'jquery-mapael': 'npm:jquery-mapael@2.1.0',
        'jquery-ui': 'github:components/jqueryui@1.12.1',
        'jquery-ui-touch-punch': 'npm:jquery-ui-touch-punch@0.2.3',
        'lodash': 'npm:lodash@4.17.4',
        'moment': 'npm:moment@2.18.1',
        'moment-timezone': 'npm:moment-timezone@0.4.1',
        'nestable': 'npm:nestable2@1.5.0',
        'os': 'npm:jspm-nodelibs-os@0.2.2',
        'path': 'npm:jspm-nodelibs-path@0.2.3',
        'perfect-scrollbar': 'npm:perfect-scrollbar@0.6.16',
        'popper': 'npm:popper.js@1.12.5',
        'popper.js': 'npm:popper.js@1.12.5',
        'process': 'npm:jspm-nodelibs-process@0.2.1',
        'raphael': 'npm:raphael@2.2.7',
        'screenfull': 'npm:screenfull@3.3.1',
        'simple-line-icons': 'npm:simple-line-icons@2.4.1',
        'skycons': 'npm:skycons@1.0.0',
        'slick-carousel': 'npm:slick-carousel@1.7.1',
        'sparkline': 'npm:jquery-sparkline@2.4.0',
        'stream': 'npm:jspm-nodelibs-stream@0.2.1',
        'string_decoder': 'npm:jspm-nodelibs-string_decoder@0.2.1',
        'tableexport.jquery.plugin': 'npm:tableexport.jquery.plugin@1.9.3',
        'timepicker': 'npm:bootstrap-timepicker@0.5.2',
        'tinycolor': 'npm:tinycolor2@1.4.1',
        'touchspin': 'github:istvan-ujjmeszaros/bootstrap-touchspin@3.1.2',
        'tty': 'npm:jspm-nodelibs-tty@0.2.1',
        'url': 'npm:jspm-nodelibs-url@0.2.1',
        'util': 'npm:jspm-nodelibs-util@0.2.2',
        'velocity': 'npm:velocity-animate@1.5.0',
        'vm': 'npm:jspm-nodelibs-vm@0.2.1',
        'waypoints': 'npm:waypoints@4.0.1',
        'weather-icons': 'github:erikflowers/weather-icons@2.0.10',
        'x-editable': 'npm:x-editable@1.5.1'
    },
    packages: {
        'github:components/jqueryui@1.12.1': {
            'map': {
                'jquery': 'npm:jquery@3.2.1'
            }
        },
        'npm:font-awesome@4.7.0': {
            'map': {
                'css': 'github:systemjs/plugin-css@0.1.35'
            }
        },
        'npm:diffie-hellman@5.0.2': {
            'map': {
                'randombytes': 'npm:randombytes@2.0.5',
                'bn.js': 'npm:bn.js@4.11.8',
                'miller-rabin': 'npm:miller-rabin@4.0.0'
            }
        },
        'npm:public-encrypt@4.0.0': {
            'map': {
                'create-hash': 'npm:create-hash@1.1.3',
                'randombytes': 'npm:randombytes@2.0.5',
                'browserify-rsa': 'npm:browserify-rsa@4.0.1',
                'bn.js': 'npm:bn.js@4.11.8',
                'parse-asn1': 'npm:parse-asn1@5.1.0'
            }
        },
        'npm:create-ecdh@4.0.0': {
            'map': {
                'bn.js': 'npm:bn.js@4.11.8',
                'elliptic': 'npm:elliptic@6.4.0'
            }
        },
        'npm:browserify-rsa@4.0.1': {
            'map': {
                'randombytes': 'npm:randombytes@2.0.5',
                'bn.js': 'npm:bn.js@4.11.8'
            }
        },
        'npm:browserify-cipher@1.0.0': {
            'map': {
                'evp_bytestokey': 'npm:evp_bytestokey@1.0.3',
                'browserify-des': 'npm:browserify-des@1.0.0',
                'browserify-aes': 'npm:browserify-aes@1.0.8'
            }
        },
        'npm:elliptic@6.4.0': {
            'map': {
                'inherits': 'npm:inherits@2.0.3',
                'bn.js': 'npm:bn.js@4.11.8',
                'hash.js': 'npm:hash.js@1.1.3',
                'minimalistic-crypto-utils': 'npm:minimalistic-crypto-utils@1.0.1',
                'brorand': 'npm:brorand@1.1.0',
                'minimalistic-assert': 'npm:minimalistic-assert@1.0.0',
                'hmac-drbg': 'npm:hmac-drbg@1.0.1'
            }
        },
        'npm:sha.js@2.4.8': {
            'map': {
                'inherits': 'npm:inherits@2.0.3'
            }
        },
        'npm:browserify-des@1.0.0': {
            'map': {
                'cipher-base': 'npm:cipher-base@1.0.4',
                'inherits': 'npm:inherits@2.0.3',
                'des.js': 'npm:des.js@1.0.0'
            }
        },
        'npm:miller-rabin@4.0.0': {
            'map': {
                'bn.js': 'npm:bn.js@4.11.8',
                'brorand': 'npm:brorand@1.1.0'
            }
        },
        'npm:asn1.js@4.9.1': {
            'map': {
                'bn.js': 'npm:bn.js@4.11.8',
                'inherits': 'npm:inherits@2.0.3',
                'minimalistic-assert': 'npm:minimalistic-assert@1.0.0'
            }
        },
        'npm:stream-browserify@2.0.1': {
            'map': {
                'inherits': 'npm:inherits@2.0.3',
                'readable-stream': 'npm:readable-stream@2.3.3'
            }
        },
        'npm:des.js@1.0.0': {
            'map': {
                'inherits': 'npm:inherits@2.0.3',
                'minimalistic-assert': 'npm:minimalistic-assert@1.0.0'
            }
        },
        'npm:url@0.11.0': {
            'map': {
                'querystring': 'npm:querystring@0.2.0',
                'punycode': 'npm:punycode@1.3.2'
            }
        },
        'npm:parse-asn1@5.1.0': {
            'map': {
                'browserify-aes': 'npm:browserify-aes@1.0.8',
                'create-hash': 'npm:create-hash@1.1.3',
                'pbkdf2': 'npm:pbkdf2@3.0.14',
                'evp_bytestokey': 'npm:evp_bytestokey@1.0.3',
                'asn1.js': 'npm:asn1.js@4.9.1'
            }
        },
        'npm:jspm-nodelibs-stream@0.2.1': {
            'map': {
                'stream-browserify': 'npm:stream-browserify@2.0.1'
            }
        },
        'npm:jspdf-autotable@2.0.17': {
            'map': {
                'jspdf': 'npm:jspdf@1.3.2'
            }
        },
        'npm:jspm-nodelibs-url@0.2.1': {
            'map': {
                'url': 'npm:url@0.11.0'
            }
        },
        'npm:browserify-sign@4.0.4': {
            'map': {
                'create-hmac': 'npm:create-hmac@1.1.6',
                'create-hash': 'npm:create-hash@1.1.3',
                'browserify-rsa': 'npm:browserify-rsa@4.0.1',
                'elliptic': 'npm:elliptic@6.4.0',
                'parse-asn1': 'npm:parse-asn1@5.1.0',
                'bn.js': 'npm:bn.js@4.11.8',
                'inherits': 'npm:inherits@2.0.3'
            }
        },
        'npm:jquery-mapael@2.1.0': {
            'map': {
                'jquery-mousewheel': 'npm:jquery-mousewheel@3.1.13',
                'jquery': 'npm:jquery@3.2.1',
                'raphael': 'npm:raphael@2.2.7'
            }
        },
        'npm:raphael@2.2.7': {
            'map': {
                'eve-raphael': 'npm:eve-raphael@0.5.0'
            }
        },
        'npm:moment-timezone@0.4.1': {
            'map': {
                'moment': 'npm:moment@2.6.0'
            }
        },
        'npm:jspdf@1.3.2': {
            'map': {
                'cf-blob.js': 'npm:cf-blob.js@0.0.1',
                'adler32cs': 'github:chick307/adler32cs.js@0.0.1',
                'filesaver.js': 'github:andyinabox/FileSaver.js@master'
            }
        },
        'npm:hmac-drbg@1.0.1': {
            'map': {
                'hash.js': 'npm:hash.js@1.1.3',
                'minimalistic-assert': 'npm:minimalistic-assert@1.0.0',
                'minimalistic-crypto-utils': 'npm:minimalistic-crypto-utils@1.0.1'
            }
        },
        'npm:create-hmac@1.1.6': {
            'map': {
                'create-hash': 'npm:create-hash@1.1.3',
                'inherits': 'npm:inherits@2.0.3',
                'cipher-base': 'npm:cipher-base@1.0.4',
                'sha.js': 'npm:sha.js@2.4.8',
                'ripemd160': 'npm:ripemd160@2.0.1',
                'safe-buffer': 'npm:safe-buffer@5.1.1'
            }
        },
        'npm:create-hash@1.1.3': {
            'map': {
                'inherits': 'npm:inherits@2.0.3',
                'cipher-base': 'npm:cipher-base@1.0.4',
                'sha.js': 'npm:sha.js@2.4.8',
                'ripemd160': 'npm:ripemd160@2.0.1'
            }
        },
        'npm:ripemd160@2.0.1': {
            'map': {
                'inherits': 'npm:inherits@2.0.3',
                'hash-base': 'npm:hash-base@2.0.2'
            }
        },
        'npm:hash-base@2.0.2': {
            'map': {
                'inherits': 'npm:inherits@2.0.3'
            }
        },
        'npm:gridstack@0.2.6': {
            'map': {
                'jquery-ui': 'npm:jquery-ui@1.12.1',
                'lodash': 'npm:lodash@4.17.4',
                'jquery': 'npm:jquery@3.2.1'
            }
        },
        'npm:jspm-nodelibs-http@0.2.0': {
            'map': {
                'http-browserify': 'npm:stream-http@2.7.2'
            }
        },
        'npm:randombytes@2.0.5': {
            'map': {
                'safe-buffer': 'npm:safe-buffer@5.1.1'
            }
        },
        'npm:bootstrap@4.0.0-beta': {
            'map': {
                'tether': 'github:HubSpot/tether@1.4.0'
            }
        },
        'npm:nestable2@1.5.0': {
            'map': {
                'jquery': 'npm:jquery@1.12.4'
            }
        },
        'npm:emojionearea@3.1.8': {
            'map': {
                'jquery': 'npm:jquery@3.2.1',
                'jquery-textcomplete': 'npm:jquery-textcomplete@1.8.4'
            }
        },
        'npm:ion-rangeslider@2.2.0': {
            'map': {
                'jquery': 'npm:jquery@3.2.1'
            }
        },
        'npm:slick-carousel@1.7.1': {
            'map': {
                'jquery': 'npm:jquery@3.2.1'
            }
        },
        'npm:tableexport.jquery.plugin@1.9.3': {
            'map': {
                'jquery': 'npm:jquery@3.2.1',
                'file-saver': 'npm:file-saver@1.3.3',
                'html2canvas': 'npm:html2canvas@0.5.0-beta4',
                'jspdf-autotable': 'npm:jspdf-autotable@2.0.17',
                'jspdf': 'npm:jspdf@1.3.2'
            }
        },
        'npm:jspm-nodelibs-crypto@0.2.1': {
            'map': {
                'crypto-browserify': 'npm:crypto-browserify@3.11.1'
            }
        },
        'npm:jspm-nodelibs-string_decoder@0.2.1': {
            'map': {
                'string_decoder': 'npm:string_decoder@0.10.31'
            }
        },
        'npm:jspm-nodelibs-buffer@0.2.3': {
            'map': {
                'buffer': 'npm:buffer@5.0.7'
            }
        },
        'npm:crypto-browserify@3.11.1': {
            'map': {
                'browserify-sign': 'npm:browserify-sign@4.0.4',
                'create-ecdh': 'npm:create-ecdh@4.0.0',
                'create-hmac': 'npm:create-hmac@1.1.6',
                'create-hash': 'npm:create-hash@1.1.3',
                'pbkdf2': 'npm:pbkdf2@3.0.14',
                'browserify-cipher': 'npm:browserify-cipher@1.0.0',
                'diffie-hellman': 'npm:diffie-hellman@5.0.2',
                'inherits': 'npm:inherits@2.0.3',
                'randombytes': 'npm:randombytes@2.0.5',
                'public-encrypt': 'npm:public-encrypt@4.0.0'
            }
        },
        'npm:jquery-textcomplete@1.8.4': {
            'map': {
                'grunt-cli': 'npm:grunt-cli@1.2.0'
            }
        },
        'npm:stream-http@2.7.2': {
            'map': {
                'to-arraybuffer': 'npm:to-arraybuffer@1.0.1',
                'builtin-status-codes': 'npm:builtin-status-codes@3.0.0',
                'xtend': 'npm:xtend@4.0.1',
                'readable-stream': 'npm:readable-stream@2.3.3',
                'inherits': 'npm:inherits@2.0.3'
            }
        },
        'npm:buffer@5.0.7': {
            'map': {
                'base64-js': 'npm:base64-js@1.2.1',
                'ieee754': 'npm:ieee754@1.1.8'
            }
        },
        'npm:readable-stream@2.3.3': {
            'map': {
                'string_decoder': 'npm:string_decoder@1.0.3',
                'safe-buffer': 'npm:safe-buffer@5.1.1',
                'core-util-is': 'npm:core-util-is@1.0.2',
                'isarray': 'npm:isarray@1.0.0',
                'process-nextick-args': 'npm:process-nextick-args@1.0.7',
                'util-deprecate': 'npm:util-deprecate@1.0.2',
                'inherits': 'npm:inherits@2.0.3'
            }
        },
        'npm:string_decoder@1.0.3': {
            'map': {
                'safe-buffer': 'npm:safe-buffer@5.1.1'
            }
        },
        'npm:grunt-cli@1.2.0': {
            'map': {
                'grunt-known-options': 'npm:grunt-known-options@1.1.0',
                'findup-sync': 'npm:findup-sync@0.3.0',
                'nopt': 'npm:nopt@3.0.6',
                'resolve': 'npm:resolve@1.1.7'
            }
        },
        'npm:cipher-base@1.0.4': {
            'map': {
                'safe-buffer': 'npm:safe-buffer@5.1.1',
                'inherits': 'npm:inherits@2.0.3'
            }
        },
        'npm:browserify-aes@1.0.8': {
            'map': {
                'safe-buffer': 'npm:safe-buffer@5.1.1',
                'cipher-base': 'npm:cipher-base@1.0.4',
                'create-hash': 'npm:create-hash@1.1.3',
                'evp_bytestokey': 'npm:evp_bytestokey@1.0.3',
                'buffer-xor': 'npm:buffer-xor@1.0.3',
                'inherits': 'npm:inherits@2.0.3'
            }
        },
        'npm:nopt@3.0.6': {
            'map': {
                'abbrev': 'npm:abbrev@1.1.0'
            }
        },
        'npm:evp_bytestokey@1.0.3': {
            'map': {
                'safe-buffer': 'npm:safe-buffer@5.1.1',
                'md5.js': 'npm:md5.js@1.3.4'
            }
        },
        'npm:findup-sync@0.3.0': {
            'map': {
                'glob': 'npm:glob@5.0.15'
            }
        },
        'npm:hash.js@1.1.3': {
            'map': {
                'minimalistic-assert': 'npm:minimalistic-assert@1.0.0',
                'inherits': 'npm:inherits@2.0.3'
            }
        },
        'npm:md5.js@1.3.4': {
            'map': {
                'hash-base': 'npm:hash-base@3.0.4',
                'inherits': 'npm:inherits@2.0.3'
            }
        },
        'npm:hash-base@3.0.4': {
            'map': {
                'safe-buffer': 'npm:safe-buffer@5.1.1',
                'inherits': 'npm:inherits@2.0.3'
            }
        },
        'npm:glob@5.0.15': {
            'map': {
                'inflight': 'npm:inflight@1.0.6',
                'minimatch': 'npm:minimatch@3.0.4',
                'path-is-absolute': 'npm:path-is-absolute@1.0.1',
                'once': 'npm:once@1.4.0',
                'inherits': 'npm:inherits@2.0.3'
            }
        },
        'npm:inflight@1.0.6': {
            'map': {
                'once': 'npm:once@1.4.0',
                'wrappy': 'npm:wrappy@1.0.2'
            }
        },
        'npm:once@1.4.0': {
            'map': {
                'wrappy': 'npm:wrappy@1.0.2'
            }
        },
        'npm:minimatch@3.0.4': {
            'map': {
                'brace-expansion': 'npm:brace-expansion@1.1.8'
            }
        },
        'npm:brace-expansion@1.1.8': {
            'map': {
                'concat-map': 'npm:concat-map@0.0.1',
                'balanced-match': 'npm:balanced-match@1.0.0'
            }
        },
        'npm:jspm-nodelibs-os@0.2.2': {
            'map': {
                'os-browserify': 'npm:os-browserify@0.3.0'
            }
        },
        'npm:chart.js@2.7.0': {
            'map': {
                'moment': 'npm:moment@2.18.1',
                'chartjs-color': 'npm:chartjs-color@2.2.0'
            }
        },
        'npm:fullcalendar@3.5.1': {
            'map': {
                'moment': 'npm:moment@2.18.1',
                'jquery': 'npm:jquery@3.2.1'
            }
        },
        'npm:chartjs-color@2.2.0': {
            'map': {
                'color-convert': 'npm:color-convert@0.5.3',
                'chartjs-color-string': 'npm:chartjs-color-string@0.5.0'
            }
        },
        'npm:pbkdf2@3.0.14': {
            'map': {
                'create-hash': 'npm:create-hash@1.1.3',
                'create-hmac': 'npm:create-hmac@1.1.6',
                'ripemd160': 'npm:ripemd160@2.0.1',
                'sha.js': 'npm:sha.js@2.4.8',
                'safe-buffer': 'npm:safe-buffer@5.1.1'
            }
        },
        'npm:chartjs-color-string@0.5.0': {
            'map': {
                'color-name': 'npm:color-name@1.1.3'
            }
        }
    }
});
