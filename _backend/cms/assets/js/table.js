"bundle";
/*!
 * @version: 1.1.2
 * @name: Adapted datapicker plugin
 *
 * @author: https://themeforest.net/user/flexlayers
 */
/* =========================================================
 * bootstrap-datepicker.js
 * Repo: https://github.com/eternicode/bootstrap-datepicker/
 * Demo: http://eternicode.github.io/bootstrap-datepicker/
 * Docs: http://bootstrap-datepicker.readthedocs.org/
 * Forked from http://www.eyecon.ro/bootstrap-datepicker
 * =========================================================
 * Started by Stefan Petre; improvements by Andrew Rowls + contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */

(function (factory) {
    'use strict';

    if ("function" === "function" && true) {
        System.registerDynamic("reactiveadmintemplate/scripts/modules/form/datapicker/main.js", ["jquery"], false, function ($__require, $__exports, $__module) {
            if (typeof factory === "function") {
                return factory.call(this, $__require("jquery"));
            } else {
                return factory;
            }
        });
    } else if (typeof exports === 'object') {
        factory(require('jquery'));
    } else {
        factory(jQuery);
    }
})(function ($, undefined) {
    'use strict';

    function UTCDate() {
        return new Date(Date.UTC.apply(Date, arguments));
    }

    function UTCToday() {
        var today = new Date();
        return UTCDate(today.getFullYear(), today.getMonth(), today.getDate());
    }

    function isUTCEquals(date1, date2) {
        return date1.getUTCFullYear() === date2.getUTCFullYear() && date1.getUTCMonth() === date2.getUTCMonth() && date1.getUTCDate() === date2.getUTCDate();
    }

    function alias(method) {
        return function () {
            return this[method].apply(this, arguments);
        };
    }

    function isValidDate(d) {
        return d && !isNaN(d.getTime());
    }

    var DateArray = function () {
        var extras = {
            get: function (i) {
                return this.slice(i)[0];
            },
            contains: function (d) {
                // Array.indexOf is not cross-browser;
                // $.inArray doesn't work with Dates
                var val = d && d.valueOf();
                for (var i = 0, l = this.length; i < l; i++) if (this[i].valueOf() === val) return i;
                return -1;
            },
            remove: function (i) {
                this.splice(i, 1);
            },
            replace: function (new_array) {
                if (!new_array) return;
                if (!$.isArray(new_array)) new_array = [new_array];
                this.clear();
                this.push.apply(this, new_array);
            },
            clear: function () {
                this.length = 0;
            },
            copy: function () {
                var a = new DateArray();
                a.replace(this);
                return a;
            }
        };

        return function () {
            var a = [];
            a.push.apply(a, arguments);
            $.extend(a, extras);
            return a;
        };
    }();

    // Picker object

    var Datepicker = function (element, options) {
        $(element).data('bsDatepicker', this);
        this._process_options(options);

        this.dates = new DateArray();
        this.viewDate = this.o.defaultViewDate;
        this.focusDate = null;

        this.element = $(element);
        this.isInput = this.element.is('input');
        this.inputField = this.isInput ? this.element : this.element.find('input');
        this.component = this.element.hasClass('date') ? this.element.find('.add-on, .input-group-addon, .btn') : false;
        this.hasInput = this.component && this.inputField.length;
        if (this.component && this.component.length === 0) this.component = false;
        this.isInline = !this.component && this.element.is('div');

        this.picker = $(DPGlobal.template);

        // Checking templates and inserting
        if (this._check_template(this.o.templates.leftArrow)) {
            this.picker.find('.prev').html(this.o.templates.leftArrow);
        }
        if (this._check_template(this.o.templates.rightArrow)) {
            this.picker.find('.next').html(this.o.templates.rightArrow);
        }

        this._buildEvents();
        this._attachEvents();

        if (this.isInline) {
            this.picker.addClass('bs-datepicker-inline').appendTo(this.element);
        } else {
            this.picker.addClass('bs-datepicker-dropdown dropdown-menu');
        }

        if (this.o.rtl) {
            this.picker.addClass('bs-datepicker-rtl');
        }

        this.viewMode = this.o.startView;

        if (this.o.calendarWeeks) this.picker.find('thead .bs-datepicker-title, tfoot .today, tfoot .clear').attr('colspan', function (i, val) {
            return parseInt(val) + 1;
        });

        this._allow_update = false;

        this.setStartDate(this._o.startDate);
        this.setEndDate(this._o.endDate);
        this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled);
        this.setDaysOfWeekHighlighted(this.o.daysOfWeekHighlighted);
        this.setDatesDisabled(this.o.datesDisabled);

        this.fillDow();
        this.fillMonths();

        this._allow_update = true;

        this.update();
        this.showMode();

        if (this.isInline) {
            this.show();
        }
    };

    Datepicker.prototype = {
        constructor: Datepicker,

        _resolveViewName: function (view, default_value) {
            if (view === 0 || view === 'days' || view === 'month') {
                return 0;
            }
            if (view === 1 || view === 'months' || view === 'year') {
                return 1;
            }
            if (view === 2 || view === 'years' || view === 'decade') {
                return 2;
            }
            if (view === 3 || view === 'decades' || view === 'century') {
                return 3;
            }
            if (view === 4 || view === 'centuries' || view === 'millennium') {
                return 4;
            }
            return default_value === undefined ? false : default_value;
        },

        _check_template: function (tmp) {
            try {
                // If empty
                if (tmp === undefined || tmp === "") {
                    return false;
                }
                // If no html, everything ok
                if ((tmp.match(/[<>]/g) || []).length <= 0) {
                    return true;
                }
                // Checking if html is fine
                var jDom = $(tmp);
                return jDom.length > 0;
            } catch (ex) {
                return false;
            }
        },

        _process_options: function (opts) {
            // Store raw options for reference
            this._o = $.extend({}, this._o, opts);
            // Processed options
            var o = this.o = $.extend({}, this._o);

            // Check if "de-DE" style date is available, if not language should
            // fallback to 2 letter code eg "de"
            var lang = o.language;
            if (!dates[lang]) {
                lang = lang.split('-')[0];
                if (!dates[lang]) lang = defaults.language;
            }
            o.language = lang;

            // Retrieve view index from any aliases
            o.startView = this._resolveViewName(o.startView, 0);
            o.minViewMode = this._resolveViewName(o.minViewMode, 0);
            o.maxViewMode = this._resolveViewName(o.maxViewMode, 4);

            // Check that the start view is between min and max
            o.startView = Math.min(o.startView, o.maxViewMode);
            o.startView = Math.max(o.startView, o.minViewMode);

            // true, false, or Number > 0
            if (o.multidate !== true) {
                o.multidate = Number(o.multidate) || false;
                if (o.multidate !== false) o.multidate = Math.max(0, o.multidate);
            }
            o.multidateSeparator = String(o.multidateSeparator);

            o.weekStart %= 7;
            o.weekEnd = (o.weekStart + 6) % 7;

            var format = DPGlobal.parseFormat(o.format);
            if (o.startDate !== -Infinity) {
                if (!!o.startDate) {
                    if (o.startDate instanceof Date) o.startDate = this._local_to_utc(this._zero_time(o.startDate));else o.startDate = DPGlobal.parseDate(o.startDate, format, o.language, o.assumeNearbyYear);
                } else {
                    o.startDate = -Infinity;
                }
            }
            if (o.endDate !== Infinity) {
                if (!!o.endDate) {
                    if (o.endDate instanceof Date) o.endDate = this._local_to_utc(this._zero_time(o.endDate));else o.endDate = DPGlobal.parseDate(o.endDate, format, o.language, o.assumeNearbyYear);
                } else {
                    o.endDate = Infinity;
                }
            }

            o.daysOfWeekDisabled = o.daysOfWeekDisabled || [];
            if (!$.isArray(o.daysOfWeekDisabled)) o.daysOfWeekDisabled = o.daysOfWeekDisabled.split(/[,\s]*/);
            o.daysOfWeekDisabled = $.map(o.daysOfWeekDisabled, function (d) {
                return parseInt(d, 10);
            });

            o.daysOfWeekHighlighted = o.daysOfWeekHighlighted || [];
            if (!$.isArray(o.daysOfWeekHighlighted)) o.daysOfWeekHighlighted = o.daysOfWeekHighlighted.split(/[,\s]*/);
            o.daysOfWeekHighlighted = $.map(o.daysOfWeekHighlighted, function (d) {
                return parseInt(d, 10);
            });

            o.datesDisabled = o.datesDisabled || [];
            if (!$.isArray(o.datesDisabled)) {
                o.datesDisabled = [o.datesDisabled];
            }
            o.datesDisabled = $.map(o.datesDisabled, function (d) {
                return DPGlobal.parseDate(d, format, o.language, o.assumeNearbyYear);
            });

            var plc = String(o.orientation).toLowerCase().split(/\s+/g),
                _plc = o.orientation.toLowerCase();
            plc = $.grep(plc, function (word) {
                return (/^auto|left|right|top|bottom$/.test(word)
                );
            });
            o.orientation = { x: 'auto', y: 'auto' };
            if (!_plc || _plc === 'auto') ; // no action
            else if (plc.length === 1) {
                    switch (plc[0]) {
                        case 'top':
                        case 'bottom':
                            o.orientation.y = plc[0];
                            break;
                        case 'left':
                        case 'right':
                            o.orientation.x = plc[0];
                            break;
                    }
                } else {
                    _plc = $.grep(plc, function (word) {
                        return (/^left|right$/.test(word)
                        );
                    });
                    o.orientation.x = _plc[0] || 'auto';

                    _plc = $.grep(plc, function (word) {
                        return (/^top|bottom$/.test(word)
                        );
                    });
                    o.orientation.y = _plc[0] || 'auto';
                }
            if (o.defaultViewDate) {
                var year = o.defaultViewDate.year || new Date().getFullYear();
                var month = o.defaultViewDate.month || 0;
                var day = o.defaultViewDate.day || 1;
                o.defaultViewDate = UTCDate(year, month, day);
            } else {
                o.defaultViewDate = UTCToday();
            }
        },
        _events: [],
        _secondaryEvents: [],
        _applyEvents: function (evs) {
            for (var i = 0, el, ch, ev; i < evs.length; i++) {
                el = evs[i][0];
                if (evs[i].length === 2) {
                    ch = undefined;
                    ev = evs[i][1];
                } else if (evs[i].length === 3) {
                    ch = evs[i][1];
                    ev = evs[i][2];
                }
                el.on(ev, ch);
            }
        },
        _unapplyEvents: function (evs) {
            for (var i = 0, el, ev, ch; i < evs.length; i++) {
                el = evs[i][0];
                if (evs[i].length === 2) {
                    ch = undefined;
                    ev = evs[i][1];
                } else if (evs[i].length === 3) {
                    ch = evs[i][1];
                    ev = evs[i][2];
                }
                el.off(ev, ch);
            }
        },
        _buildEvents: function () {
            var events = {
                keyup: $.proxy(function (e) {
                    if ($.inArray(e.keyCode, [27, 37, 39, 38, 40, 32, 13, 9]) === -1) this.update();
                }, this),
                keydown: $.proxy(this.keydown, this),
                paste: $.proxy(this.paste, this)
            };

            if (this.o.showOnFocus === true) {
                events.focus = $.proxy(this.show, this);
            }

            if (this.isInput) {
                // single input
                this._events = [[this.element, events]];
            } else if (this.component && this.hasInput) {
                // component: input + button
                this._events = [
                // For components that are not readonly, allow keyboard nav
                [this.inputField, events], [this.component, {
                    click: $.proxy(this.show, this)
                }]];
            } else {
                this._events = [[this.element, {
                    click: $.proxy(this.show, this),
                    keydown: $.proxy(this.keydown, this)
                }]];
            }
            this._events.push(
            // Component: listen for blur on element descendants
            [this.element, '*', {
                blur: $.proxy(function (e) {
                    this._focused_from = e.target;
                }, this)
            }],
            // Input: listen for blur on element
            [this.element, {
                blur: $.proxy(function (e) {
                    this._focused_from = e.target;
                }, this)
            }]);

            if (this.o.immediateUpdates) {
                // Trigger input updates immediately on changed year/month
                this._events.push([this.element, {
                    'changeYear changeMonth': $.proxy(function (e) {
                        this.update(e.date);
                    }, this)
                }]);
            }

            this._secondaryEvents = [[this.picker, {
                click: $.proxy(this.click, this)
            }], [$(window), {
                resize: $.proxy(this.place, this)
            }], [$(document), {
                mousedown: $.proxy(function (e) {
                    // Clicked outside the bs-datepicker, hide it
                    if (!(this.element.is(e.target) || this.element.find(e.target).length || this.picker.is(e.target) || this.picker.find(e.target).length || this.isInline)) {
                        this.hide();
                    }
                }, this)
            }]];
        },
        _attachEvents: function () {
            this._detachEvents();
            this._applyEvents(this._events);
        },
        _detachEvents: function () {
            this._unapplyEvents(this._events);
        },
        _attachSecondaryEvents: function () {
            this._detachSecondaryEvents();
            this._applyEvents(this._secondaryEvents);
        },
        _detachSecondaryEvents: function () {
            this._unapplyEvents(this._secondaryEvents);
        },
        _trigger: function (event, altdate) {
            var date = altdate || this.dates.get(-1),
                local_date = this._utc_to_local(date);

            this.element.trigger({
                type: event,
                date: local_date,
                dates: $.map(this.dates, this._utc_to_local),
                format: $.proxy(function (ix, format) {
                    if (arguments.length === 0) {
                        ix = this.dates.length - 1;
                        format = this.o.format;
                    } else if (typeof ix === 'string') {
                        format = ix;
                        ix = this.dates.length - 1;
                    }
                    format = format || this.o.format;
                    var date = this.dates.get(ix);
                    return DPGlobal.formatDate(date, format, this.o.language);
                }, this)
            });
        },

        show: function () {
            if (this.inputField.prop('disabled') || this.inputField.prop('readonly') && this.o.enableOnReadonly === false) return;
            if (!this.isInline) this.picker.appendTo(this.o.container);
            this.place();
            if (!this.picker.is(':visible')) {
                this.picker.show();
                this._trigger('show');
            }
            this._attachSecondaryEvents();
            if ((window.navigator.msMaxTouchPoints || 'ontouchstart' in document) && this.o.disableTouchKeyboard) {
                $(this.element).blur();
            }
            return this;
        },

        hide: function () {
            if (this.isInline || !this.picker.is(':visible')) return this;
            this.focusDate = null;
            this.picker.hide().detach();
            this._detachSecondaryEvents();
            this.viewMode = this.o.startView;
            this.showMode();

            if (this.o.forceParse && this.inputField.val()) this.setValue();
            this._trigger('hide');
            return this;
        },

        destroy: function () {
            this.hide();
            this._detachEvents();
            this._detachSecondaryEvents();
            this.picker.remove();
            delete this.element.data().datepicker;
            if (!this.isInput) {
                delete this.element.data().date;
            }
            return this;
        },

        paste: function (evt) {
            var dateString;
            if (evt.originalEvent.clipboardData && evt.originalEvent.clipboardData.types && $.inArray('text/plain', evt.originalEvent.clipboardData.types) !== -1) {
                dateString = evt.originalEvent.clipboardData.getData('text/plain');
            } else if (window.clipboardData) {
                dateString = window.clipboardData.getData('Text');
            } else {
                return;
            }
            this.setDate(dateString);
            this.update();
            evt.preventDefault();
        },

        _utc_to_local: function (utc) {
            return utc && new Date(utc.getTime() + utc.getTimezoneOffset() * 60000);
        },
        _local_to_utc: function (local) {
            return local && new Date(local.getTime() - local.getTimezoneOffset() * 60000);
        },
        _zero_time: function (local) {
            return local && new Date(local.getFullYear(), local.getMonth(), local.getDate());
        },
        _zero_utc_time: function (utc) {
            return utc && new Date(Date.UTC(utc.getUTCFullYear(), utc.getUTCMonth(), utc.getUTCDate()));
        },

        getDates: function () {
            return $.map(this.dates, this._utc_to_local);
        },

        getUTCDates: function () {
            return $.map(this.dates, function (d) {
                return new Date(d);
            });
        },

        getDate: function () {
            return this._utc_to_local(this.getUTCDate());
        },

        getUTCDate: function () {
            var selected_date = this.dates.get(-1);
            if (typeof selected_date !== 'undefined') {
                return new Date(selected_date);
            } else {
                return null;
            }
        },

        clearDates: function () {
            if (this.inputField) {
                this.inputField.val('');
            }

            this.update();
            this._trigger('changeDate');

            if (this.o.autoclose) {
                this.hide();
            }
        },
        setDates: function () {
            var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
            this.update.apply(this, args);
            this._trigger('changeDate');
            this.setValue();
            return this;
        },

        setUTCDates: function () {
            var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
            this.update.apply(this, $.map(args, this._utc_to_local));
            this._trigger('changeDate');
            this.setValue();
            return this;
        },

        setDate: alias('setDates'),
        setUTCDate: alias('setUTCDates'),
        remove: alias('destroy'),

        setValue: function () {
            var formatted = this.getFormattedDate();
            this.inputField.val(formatted);
            return this;
        },

        getFormattedDate: function (format) {
            if (format === undefined) format = this.o.format;

            var lang = this.o.language;
            return $.map(this.dates, function (d) {
                return DPGlobal.formatDate(d, format, lang);
            }).join(this.o.multidateSeparator);
        },

        getStartDate: function () {
            return this.o.startDate;
        },

        setStartDate: function (startDate) {
            this._process_options({ startDate: startDate });
            this.update();
            this.updateNavArrows();
            return this;
        },

        getEndDate: function () {
            return this.o.endDate;
        },

        setEndDate: function (endDate) {
            this._process_options({ endDate: endDate });
            this.update();
            this.updateNavArrows();
            return this;
        },

        setDaysOfWeekDisabled: function (daysOfWeekDisabled) {
            this._process_options({ daysOfWeekDisabled: daysOfWeekDisabled });
            this.update();
            this.updateNavArrows();
            return this;
        },

        setDaysOfWeekHighlighted: function (daysOfWeekHighlighted) {
            this._process_options({ daysOfWeekHighlighted: daysOfWeekHighlighted });
            this.update();
            return this;
        },

        setDatesDisabled: function (datesDisabled) {
            this._process_options({ datesDisabled: datesDisabled });
            this.update();
            this.updateNavArrows();
        },

        place: function () {
            if (this.isInline) return this;
            var calendarWidth = this.picker.outerWidth(),
                calendarHeight = this.picker.outerHeight(),
                visualPadding = 10,
                container = $(this.o.container),
                windowWidth = container.width(),
                scrollTop = this.o.container === 'body' ? $(document).scrollTop() : container.scrollTop(),
                appendOffset = container.offset();

            var parentsZindex = [];
            this.element.parents().each(function () {
                var itemZIndex = $(this).css('z-index');
                if (itemZIndex !== 'auto' && itemZIndex !== 0) parentsZindex.push(parseInt(itemZIndex));
            });
            var zIndex = Math.max.apply(Math, parentsZindex) + this.o.zIndexOffset;
            var offset = this.component ? this.component.parent().offset() : this.element.offset();
            var height = this.component ? this.component.outerHeight(true) : this.element.outerHeight(false);
            var width = this.component ? this.component.outerWidth(true) : this.element.outerWidth(false);
            var left = offset.left - appendOffset.left,
                top = offset.top - appendOffset.top;

            if (this.o.container !== 'body') {
                top += scrollTop;
            }

            this.picker.removeClass('bs-datepicker-orient-top bs-datepicker-orient-bottom ' + 'bs-datepicker-orient-right bs-datepicker-orient-left');

            if (this.o.orientation.x !== 'auto') {
                this.picker.addClass('bs-datepicker-orient-' + this.o.orientation.x);
                if (this.o.orientation.x === 'right') left -= calendarWidth - width;
            }
            // auto x orientation is best-placement: if it crosses a window
            // edge, fudge it sideways
            else {
                    if (offset.left < 0) {
                        // component is outside the window on the left side. Move it into visible range
                        this.picker.addClass('bs-datepicker-orient-left');
                        left -= offset.left - visualPadding;
                    } else if (left + calendarWidth > windowWidth) {
                        // the calendar passes the widow right edge. Align it to component right side
                        this.picker.addClass('bs-datepicker-orient-right');
                        left += width - calendarWidth;
                    } else {
                        // Default to left
                        this.picker.addClass('bs-datepicker-orient-left');
                    }
                }

            // auto y orientation is best-situation: top or bottom, no fudging,
            // decision based on which shows more of the calendar
            var yorient = this.o.orientation.y,
                top_overflow;
            if (yorient === 'auto') {
                top_overflow = -scrollTop + top - calendarHeight;
                yorient = top_overflow < 0 ? 'bottom' : 'top';
            }

            this.picker.addClass('bs-datepicker-orient-' + yorient);
            if (yorient === 'top') top -= calendarHeight + parseInt(this.picker.css('padding-top'));else top += height;

            if (this.o.rtl) {
                var right = windowWidth - (left + width);
                this.picker.css({
                    top: top,
                    right: right,
                    zIndex: zIndex
                });
            } else {
                this.picker.css({
                    top: top,
                    left: left,
                    zIndex: zIndex
                });
            }
            return this;
        },

        _allow_update: true,
        update: function () {
            if (!this._allow_update) return this;

            var oldDates = this.dates.copy(),
                dates = [],
                fromArgs = false;
            if (arguments.length) {
                $.each(arguments, $.proxy(function (i, date) {
                    if (date instanceof Date) date = this._local_to_utc(date);
                    dates.push(date);
                }, this));
                fromArgs = true;
            } else {
                dates = this.isInput ? this.element.val() : this.element.data('date') || this.inputField.val();
                if (dates && this.o.multidate) dates = dates.split(this.o.multidateSeparator);else dates = [dates];
                delete this.element.data().date;
            }

            dates = $.map(dates, $.proxy(function (date) {
                return DPGlobal.parseDate(date, this.o.format, this.o.language, this.o.assumeNearbyYear);
            }, this));
            dates = $.grep(dates, $.proxy(function (date) {
                return !this.dateWithinRange(date) || !date;
            }, this), true);
            this.dates.replace(dates);

            if (this.dates.length) this.viewDate = new Date(this.dates.get(-1));else if (this.viewDate < this.o.startDate) this.viewDate = new Date(this.o.startDate);else if (this.viewDate > this.o.endDate) this.viewDate = new Date(this.o.endDate);else this.viewDate = this.o.defaultViewDate;

            if (fromArgs) {
                // setting date by clicking
                this.setValue();
            } else if (dates.length) {
                // setting date by typing
                if (String(oldDates) !== String(this.dates)) this._trigger('changeDate');
            }
            if (!this.dates.length && oldDates.length) this._trigger('clearDate');

            this.fill();
            this.element.change();
            return this;
        },

        fillDow: function () {
            var dowCnt = this.o.weekStart,
                html = '<tr>';
            if (this.o.calendarWeeks) {
                this.picker.find('.bs-datepicker-days .bs-datepicker-switch').attr('colspan', function (i, val) {
                    return parseInt(val) + 1;
                });
                html += '<th class="cw">&#160;</th>';
            }
            while (dowCnt < this.o.weekStart + 7) {
                html += '<th class="dow';
                if ($.inArray(dowCnt, this.o.daysOfWeekDisabled) > -1) html += ' disabled';
                html += '">' + dates[this.o.language].daysMin[dowCnt++ % 7] + '</th>';
            }
            html += '</tr>';
            this.picker.find('.bs-datepicker-days thead').append(html);
        },

        fillMonths: function () {
            var localDate = this._utc_to_local(this.viewDate);
            var html = '',
                i = 0;
            while (i < 12) {
                var focused = localDate && localDate.getMonth() === i ? ' focused' : '';
                html += '<span class="month' + focused + '">' + dates[this.o.language].monthsShort[i++] + '</span>';
            }
            this.picker.find('.bs-datepicker-months td').html(html);
        },

        setRange: function (range) {
            if (!range || !range.length) delete this.range;else this.range = $.map(range, function (d) {
                return d.valueOf();
            });
            this.fill();
        },

        getClassNames: function (date) {
            var cls = [],
                year = this.viewDate.getUTCFullYear(),
                month = this.viewDate.getUTCMonth(),
                today = new Date();
            if (date.getUTCFullYear() < year || date.getUTCFullYear() === year && date.getUTCMonth() < month) {
                cls.push('old');
            } else if (date.getUTCFullYear() > year || date.getUTCFullYear() === year && date.getUTCMonth() > month) {
                cls.push('new');
            }
            if (this.focusDate && date.valueOf() === this.focusDate.valueOf()) cls.push('focused');
            // Compare internal UTC date with local today, not UTC today
            if (this.o.todayHighlight && date.getUTCFullYear() === today.getFullYear() && date.getUTCMonth() === today.getMonth() && date.getUTCDate() === today.getDate()) {
                cls.push('today');
            }
            if (this.dates.contains(date) !== -1) cls.push('active');
            if (!this.dateWithinRange(date)) {
                cls.push('disabled');
            }
            if (this.dateIsDisabled(date)) {
                cls.push('disabled', 'disabled-date');
            }
            if ($.inArray(date.getUTCDay(), this.o.daysOfWeekHighlighted) !== -1) {
                cls.push('highlighted');
            }

            if (this.range) {
                if (date > this.range[0] && date < this.range[this.range.length - 1]) {
                    cls.push('range');
                }
                if ($.inArray(date.valueOf(), this.range) !== -1) {
                    cls.push('selected');
                }
                if (date.valueOf() === this.range[0]) {
                    cls.push('range-start');
                }
                if (date.valueOf() === this.range[this.range.length - 1]) {
                    cls.push('range-end');
                }
            }
            return cls;
        },

        _fill_yearsView: function (selector, cssClass, factor, step, currentYear, startYear, endYear, callback) {
            var html, view, year, steps, startStep, endStep, thisYear, i, classes, tooltip, before;

            html = '';
            view = this.picker.find(selector);
            year = parseInt(currentYear / factor, 10) * factor;
            startStep = parseInt(startYear / step, 10) * step;
            endStep = parseInt(endYear / step, 10) * step;
            steps = $.map(this.dates, function (d) {
                return parseInt(d.getUTCFullYear() / step, 10) * step;
            });

            view.find('.bs-datepicker-switch').text(year + '-' + (year + step * 9));

            thisYear = year - step;
            for (i = -1; i < 11; i += 1) {
                classes = [cssClass];
                tooltip = null;

                if (i === -1) {
                    classes.push('old');
                } else if (i === 10) {
                    classes.push('new');
                }
                if ($.inArray(thisYear, steps) !== -1) {
                    classes.push('active');
                }
                if (thisYear < startStep || thisYear > endStep) {
                    classes.push('disabled');
                }
                if (thisYear === this.viewDate.getFullYear()) {
                    classes.push('focused');
                }

                if (callback !== $.noop) {
                    before = callback(new Date(thisYear, 0, 1));
                    if (before === undefined) {
                        before = {};
                    } else if (typeof before === 'boolean') {
                        before = { enabled: before };
                    } else if (typeof before === 'string') {
                        before = { classes: before };
                    }
                    if (before.enabled === false) {
                        classes.push('disabled');
                    }
                    if (before.classes) {
                        classes = classes.concat(before.classes.split(/\s+/));
                    }
                    if (before.tooltip) {
                        tooltip = before.tooltip;
                    }
                }

                html += '<span class="' + classes.join(' ') + '"' + (tooltip ? ' title="' + tooltip + '"' : '') + '>' + thisYear + '</span>';
                thisYear += step;
            }
            view.find('td').html(html);
        },

        fill: function () {
            var d = new Date(this.viewDate),
                year = d.getUTCFullYear(),
                month = d.getUTCMonth(),
                startYear = this.o.startDate !== -Infinity ? this.o.startDate.getUTCFullYear() : -Infinity,
                startMonth = this.o.startDate !== -Infinity ? this.o.startDate.getUTCMonth() : -Infinity,
                endYear = this.o.endDate !== Infinity ? this.o.endDate.getUTCFullYear() : Infinity,
                endMonth = this.o.endDate !== Infinity ? this.o.endDate.getUTCMonth() : Infinity,
                todaytxt = dates[this.o.language].today || dates['en'].today || '',
                cleartxt = dates[this.o.language].clear || dates['en'].clear || '',
                titleFormat = dates[this.o.language].titleFormat || dates['en'].titleFormat,
                tooltip,
                before;
            if (isNaN(year) || isNaN(month)) return;
            this.picker.find('.bs-datepicker-days .bs-datepicker-switch').text(DPGlobal.formatDate(d, titleFormat, this.o.language));
            this.picker.find('tfoot .today').text(todaytxt).toggle(this.o.todayBtn !== false);
            this.picker.find('tfoot .clear').text(cleartxt).toggle(this.o.clearBtn !== false);
            this.picker.find('thead .bs-datepicker-title').text(this.o.title).toggle(this.o.title !== '');
            this.updateNavArrows();
            this.fillMonths();
            var prevMonth = UTCDate(year, month - 1, 28),
                day = DPGlobal.getDaysInMonth(prevMonth.getUTCFullYear(), prevMonth.getUTCMonth());
            prevMonth.setUTCDate(day);
            prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.o.weekStart + 7) % 7);
            var nextMonth = new Date(prevMonth);
            if (prevMonth.getUTCFullYear() < 100) {
                nextMonth.setUTCFullYear(prevMonth.getUTCFullYear());
            }
            nextMonth.setUTCDate(nextMonth.getUTCDate() + 42);
            nextMonth = nextMonth.valueOf();
            var html = [];
            var clsName;
            while (prevMonth.valueOf() < nextMonth) {
                if (prevMonth.getUTCDay() === this.o.weekStart) {
                    html.push('<tr>');
                    if (this.o.calendarWeeks) {
                        // ISO 8601: First week contains first thursday.
                        // ISO also states week starts on Monday, but we can be more abstract here.
                        var
                        // Start of current week: based on weekstart/current date
                        ws = new Date(+prevMonth + (this.o.weekStart - prevMonth.getUTCDay() - 7) % 7 * 864e5),

                        // Thursday of this week
                        th = new Date(Number(ws) + (7 + 4 - ws.getUTCDay()) % 7 * 864e5),

                        // First Thursday of year, year from thursday
                        ythTemp = UTCDate(th.getUTCFullYear(), 0, 1),
                            yth = new Date(Number(ythTemp) + (7 + 4 - ythTemp.getUTCDay()) % 7 * 864e5),

                        // Calendar week: ms between thursdays, div ms per day, div 7 days
                        calWeek = (th - yth) / 864e5 / 7 + 1;
                        html.push('<td class="cw">' + calWeek + '</td>');
                    }
                }
                clsName = this.getClassNames(prevMonth);
                clsName.push('day');

                if (this.o.beforeShowDay !== $.noop) {
                    before = this.o.beforeShowDay(this._utc_to_local(prevMonth));
                    if (before === undefined) before = {};else if (typeof before === 'boolean') before = { enabled: before };else if (typeof before === 'string') before = { classes: before };
                    if (before.enabled === false) clsName.push('disabled');
                    if (before.classes) clsName = clsName.concat(before.classes.split(/\s+/));
                    if (before.tooltip) tooltip = before.tooltip;
                }

                //Check if uniqueSort exists (supported by jquery >=1.12 and >=2.2)
                //Fallback to unique function for older jquery versions
                if ($.isFunction($.uniqueSort)) {
                    clsName = $.uniqueSort(clsName);
                } else {
                    clsName = $.unique(clsName);
                }

                html.push('<td class="' + clsName.join(' ') + '"' + (tooltip ? ' title="' + tooltip + '"' : '') + '>' + prevMonth.getUTCDate() + '</td>');
                tooltip = null;
                if (prevMonth.getUTCDay() === this.o.weekEnd) {
                    html.push('</tr>');
                }
                prevMonth.setUTCDate(prevMonth.getUTCDate() + 1);
            }
            this.picker.find('.bs-datepicker-days tbody').empty().append(html.join(''));

            var monthsTitle = dates[this.o.language].monthsTitle || dates['en'].monthsTitle || 'Months';
            var months = this.picker.find('.bs-datepicker-months').find('.bs-datepicker-switch').text(this.o.maxViewMode < 2 ? monthsTitle : year).end().find('span').removeClass('active');

            $.each(this.dates, function (i, d) {
                if (d.getUTCFullYear() === year) months.eq(d.getUTCMonth()).addClass('active');
            });

            if (year < startYear || year > endYear) {
                months.addClass('disabled');
            }
            if (year === startYear) {
                months.slice(0, startMonth).addClass('disabled');
            }
            if (year === endYear) {
                months.slice(endMonth + 1).addClass('disabled');
            }

            if (this.o.beforeShowMonth !== $.noop) {
                var that = this;
                $.each(months, function (i, month) {
                    var moDate = new Date(year, i, 1);
                    var before = that.o.beforeShowMonth(moDate);
                    if (before === undefined) before = {};else if (typeof before === 'boolean') before = { enabled: before };else if (typeof before === 'string') before = { classes: before };
                    if (before.enabled === false && !$(month).hasClass('disabled')) $(month).addClass('disabled');
                    if (before.classes) $(month).addClass(before.classes);
                    if (before.tooltip) $(month).prop('title', before.tooltip);
                });
            }

            // Generating decade/years picker
            this._fill_yearsView('.bs-datepicker-years', 'year', 10, 1, year, startYear, endYear, this.o.beforeShowYear);

            // Generating century/decades picker
            this._fill_yearsView('.bs-datepicker-decades', 'decade', 100, 10, year, startYear, endYear, this.o.beforeShowDecade);

            // Generating millennium/centuries picker
            this._fill_yearsView('.bs-datepicker-centuries', 'century', 1000, 100, year, startYear, endYear, this.o.beforeShowCentury);
        },

        updateNavArrows: function () {
            if (!this._allow_update) return;

            var d = new Date(this.viewDate),
                year = d.getUTCFullYear(),
                month = d.getUTCMonth();
            switch (this.viewMode) {
                case 0:
                    if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear() && month <= this.o.startDate.getUTCMonth()) {
                        this.picker.find('.prev').css({ visibility: 'hidden' });
                    } else {
                        this.picker.find('.prev').css({ visibility: 'visible' });
                    }
                    if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear() && month >= this.o.endDate.getUTCMonth()) {
                        this.picker.find('.next').css({ visibility: 'hidden' });
                    } else {
                        this.picker.find('.next').css({ visibility: 'visible' });
                    }
                    break;
                case 1:
                case 2:
                case 3:
                case 4:
                    if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear() || this.o.maxViewMode < 2) {
                        this.picker.find('.prev').css({ visibility: 'hidden' });
                    } else {
                        this.picker.find('.prev').css({ visibility: 'visible' });
                    }
                    if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear() || this.o.maxViewMode < 2) {
                        this.picker.find('.next').css({ visibility: 'hidden' });
                    } else {
                        this.picker.find('.next').css({ visibility: 'visible' });
                    }
                    break;
            }
        },

        click: function (e) {
            e.preventDefault();
            e.stopPropagation();

            var target, dir, day, year, month, monthChanged, yearChanged;
            target = $(e.target);

            // Clicked on the switch
            if (target.hasClass('bs-datepicker-switch')) {
                this.showMode(1);
            }

            // Clicked on prev or next
            var navArrow = target.closest('.prev, .next');
            if (navArrow.length > 0) {
                dir = DPGlobal.modes[this.viewMode].navStep * (navArrow.hasClass('prev') ? -1 : 1);
                if (this.viewMode === 0) {
                    this.viewDate = this.moveMonth(this.viewDate, dir);
                    this._trigger('changeMonth', this.viewDate);
                } else {
                    this.viewDate = this.moveYear(this.viewDate, dir);
                    if (this.viewMode === 1) {
                        this._trigger('changeYear', this.viewDate);
                    }
                }
                this.fill();
            }

            // Clicked on today button
            if (target.hasClass('today') && !target.hasClass('day')) {
                this.showMode(-2);
                this._setDate(UTCToday(), this.o.todayBtn === 'linked' ? null : 'view');
            }

            // Clicked on clear button
            if (target.hasClass('clear')) {
                this.clearDates();
            }

            if (!target.hasClass('disabled')) {
                // Clicked on a day
                if (target.hasClass('day')) {
                    day = parseInt(target.text(), 10) || 1;
                    year = this.viewDate.getUTCFullYear();
                    month = this.viewDate.getUTCMonth();

                    // From last month
                    if (target.hasClass('old')) {
                        if (month === 0) {
                            month = 11;
                            year = year - 1;
                            monthChanged = true;
                            yearChanged = true;
                        } else {
                            month = month - 1;
                            monthChanged = true;
                        }
                    }

                    // From next month
                    if (target.hasClass('new')) {
                        if (month === 11) {
                            month = 0;
                            year = year + 1;
                            monthChanged = true;
                            yearChanged = true;
                        } else {
                            month = month + 1;
                            monthChanged = true;
                        }
                    }
                    this._setDate(UTCDate(year, month, day));
                    if (yearChanged) {
                        this._trigger('changeYear', this.viewDate);
                    }
                    if (monthChanged) {
                        this._trigger('changeMonth', this.viewDate);
                    }
                }

                // Clicked on a month
                if (target.hasClass('month')) {
                    this.viewDate.setUTCDate(1);
                    day = 1;
                    month = target.parent().find('span').index(target);
                    year = this.viewDate.getUTCFullYear();
                    this.viewDate.setUTCMonth(month);
                    this._trigger('changeMonth', this.viewDate);
                    if (this.o.minViewMode === 1) {
                        this._setDate(UTCDate(year, month, day));
                        this.showMode();
                    } else {
                        this.showMode(-1);
                    }
                    this.fill();
                }

                // Clicked on a year
                if (target.hasClass('year') || target.hasClass('decade') || target.hasClass('century')) {
                    this.viewDate.setUTCDate(1);

                    day = 1;
                    month = 0;
                    year = parseInt(target.text(), 10) || 0;
                    this.viewDate.setUTCFullYear(year);

                    if (target.hasClass('year')) {
                        this._trigger('changeYear', this.viewDate);
                        if (this.o.minViewMode === 2) {
                            this._setDate(UTCDate(year, month, day));
                        }
                    }
                    if (target.hasClass('decade')) {
                        this._trigger('changeDecade', this.viewDate);
                        if (this.o.minViewMode === 3) {
                            this._setDate(UTCDate(year, month, day));
                        }
                    }
                    if (target.hasClass('century')) {
                        this._trigger('changeCentury', this.viewDate);
                        if (this.o.minViewMode === 4) {
                            this._setDate(UTCDate(year, month, day));
                        }
                    }

                    this.showMode(-1);
                    this.fill();
                }
            }

            if (this.picker.is(':visible') && this._focused_from) {
                $(this._focused_from).focus();
            }
            delete this._focused_from;
        },

        _toggle_multidate: function (date) {
            var ix = this.dates.contains(date);
            if (!date) {
                this.dates.clear();
            }

            if (ix !== -1) {
                if (this.o.multidate === true || this.o.multidate > 1 || this.o.toggleActive) {
                    this.dates.remove(ix);
                }
            } else if (this.o.multidate === false) {
                this.dates.clear();
                this.dates.push(date);
            } else {
                this.dates.push(date);
            }

            if (typeof this.o.multidate === 'number') while (this.dates.length > this.o.multidate) this.dates.remove(0);
        },

        _setDate: function (date, which) {
            if (!which || which === 'date') this._toggle_multidate(date && new Date(date));
            if (!which || which === 'view') this.viewDate = date && new Date(date);

            this.fill();
            this.setValue();
            if (!which || which !== 'view') {
                this._trigger('changeDate');
            }
            if (this.inputField) {
                this.inputField.change();
            }
            if (this.o.autoclose && (!which || which === 'date')) {
                this.hide();
            }
        },

        moveDay: function (date, dir) {
            var newDate = new Date(date);
            newDate.setUTCDate(date.getUTCDate() + dir);

            return newDate;
        },

        moveWeek: function (date, dir) {
            return this.moveDay(date, dir * 7);
        },

        moveMonth: function (date, dir) {
            if (!isValidDate(date)) return this.o.defaultViewDate;
            if (!dir) return date;
            var new_date = new Date(date.valueOf()),
                day = new_date.getUTCDate(),
                month = new_date.getUTCMonth(),
                mag = Math.abs(dir),
                new_month,
                test;
            dir = dir > 0 ? 1 : -1;
            if (mag === 1) {
                test = dir === -1
                // If going back one month, make sure month is not current month
                // (eg, Mar 31 -> Feb 31 == Feb 28, not Mar 02)
                ? function () {
                    return new_date.getUTCMonth() === month;
                }
                // If going forward one month, make sure month is as expected
                // (eg, Jan 31 -> Feb 31 == Feb 28, not Mar 02)
                : function () {
                    return new_date.getUTCMonth() !== new_month;
                };
                new_month = month + dir;
                new_date.setUTCMonth(new_month);
                // Dec -> Jan (12) or Jan -> Dec (-1) -- limit expected date to 0-11
                if (new_month < 0 || new_month > 11) new_month = (new_month + 12) % 12;
            } else {
                // For magnitudes >1, move one month at a time...
                for (var i = 0; i < mag; i++)
                // ...which might decrease the day (eg, Jan 31 to Feb 28, etc)...
                new_date = this.moveMonth(new_date, dir);
                // ...then reset the day, keeping it in the new month
                new_month = new_date.getUTCMonth();
                new_date.setUTCDate(day);
                test = function () {
                    return new_month !== new_date.getUTCMonth();
                };
            }
            // Common date-resetting loop -- if date is beyond end of month, make it
            // end of month
            while (test()) {
                new_date.setUTCDate(--day);
                new_date.setUTCMonth(new_month);
            }
            return new_date;
        },

        moveYear: function (date, dir) {
            return this.moveMonth(date, dir * 12);
        },

        moveAvailableDate: function (date, dir, fn) {
            do {
                date = this[fn](date, dir);

                if (!this.dateWithinRange(date)) return false;

                fn = 'moveDay';
            } while (this.dateIsDisabled(date));

            return date;
        },

        weekOfDateIsDisabled: function (date) {
            return $.inArray(date.getUTCDay(), this.o.daysOfWeekDisabled) !== -1;
        },

        dateIsDisabled: function (date) {
            return this.weekOfDateIsDisabled(date) || $.grep(this.o.datesDisabled, function (d) {
                return isUTCEquals(date, d);
            }).length > 0;
        },

        dateWithinRange: function (date) {
            return date >= this.o.startDate && date <= this.o.endDate;
        },

        keydown: function (e) {
            if (!this.picker.is(':visible')) {
                if (e.keyCode === 40 || e.keyCode === 27) {
                    // allow down to re-show picker
                    this.show();
                    e.stopPropagation();
                }
                return;
            }
            var dateChanged = false,
                dir,
                newViewDate,
                focusDate = this.focusDate || this.viewDate;
            switch (e.keyCode) {
                case 27:
                    // escape
                    if (this.focusDate) {
                        this.focusDate = null;
                        this.viewDate = this.dates.get(-1) || this.viewDate;
                        this.fill();
                    } else this.hide();
                    e.preventDefault();
                    e.stopPropagation();
                    break;
                case 37: // left
                case 38: // up
                case 39: // right
                case 40:
                    // down
                    if (!this.o.keyboardNavigation || this.o.daysOfWeekDisabled.length === 7) break;
                    dir = e.keyCode === 37 || e.keyCode === 38 ? -1 : 1;
                    if (this.viewMode === 0) {
                        if (e.ctrlKey) {
                            newViewDate = this.moveAvailableDate(focusDate, dir, 'moveYear');

                            if (newViewDate) this._trigger('changeYear', this.viewDate);
                        } else if (e.shiftKey) {
                            newViewDate = this.moveAvailableDate(focusDate, dir, 'moveMonth');

                            if (newViewDate) this._trigger('changeMonth', this.viewDate);
                        } else if (e.keyCode === 37 || e.keyCode === 39) {
                            newViewDate = this.moveAvailableDate(focusDate, dir, 'moveDay');
                        } else if (!this.weekOfDateIsDisabled(focusDate)) {
                            newViewDate = this.moveAvailableDate(focusDate, dir, 'moveWeek');
                        }
                    } else if (this.viewMode === 1) {
                        if (e.keyCode === 38 || e.keyCode === 40) {
                            dir = dir * 4;
                        }
                        newViewDate = this.moveAvailableDate(focusDate, dir, 'moveMonth');
                    } else if (this.viewMode === 2) {
                        if (e.keyCode === 38 || e.keyCode === 40) {
                            dir = dir * 4;
                        }
                        newViewDate = this.moveAvailableDate(focusDate, dir, 'moveYear');
                    }
                    if (newViewDate) {
                        this.focusDate = this.viewDate = newViewDate;
                        this.setValue();
                        this.fill();
                        e.preventDefault();
                    }
                    break;
                case 13:
                    // enter
                    if (!this.o.forceParse) break;
                    focusDate = this.focusDate || this.dates.get(-1) || this.viewDate;
                    if (this.o.keyboardNavigation) {
                        this._toggle_multidate(focusDate);
                        dateChanged = true;
                    }
                    this.focusDate = null;
                    this.viewDate = this.dates.get(-1) || this.viewDate;
                    this.setValue();
                    this.fill();
                    if (this.picker.is(':visible')) {
                        e.preventDefault();
                        e.stopPropagation();
                        if (this.o.autoclose) this.hide();
                    }
                    break;
                case 9:
                    // tab
                    this.focusDate = null;
                    this.viewDate = this.dates.get(-1) || this.viewDate;
                    this.fill();
                    this.hide();
                    break;
            }
            if (dateChanged) {
                if (this.dates.length) this._trigger('changeDate');else this._trigger('clearDate');
                if (this.inputField) {
                    this.inputField.change();
                }
            }
        },

        showMode: function (dir) {
            if (dir) {
                this.viewMode = Math.max(this.o.minViewMode, Math.min(this.o.maxViewMode, this.viewMode + dir));
            }
            this.picker.children('div').hide().filter('.bs-datepicker-' + DPGlobal.modes[this.viewMode].clsName).show();
            this.updateNavArrows();
        }
    };

    var DateRangePicker = function (element, options) {
        $(element).data('bsDatepicker', this);
        this.element = $(element);
        this.inputs = $.map(options.inputs, function (i) {
            return i.jquery ? i[0] : i;
        });
        delete options.inputs;

        datepickerPlugin.call($(this.inputs), options).on('changeDate', $.proxy(this.dateUpdated, this));

        this.pickers = $.map(this.inputs, function (i) {
            return $(i).data('bsDatepicker');
        });
        this.updateDates();
    };
    DateRangePicker.prototype = {
        updateDates: function () {
            this.dates = $.map(this.pickers, function (i) {
                return i.getUTCDate();
            });
            this.updateRanges();
        },
        updateRanges: function () {
            var range = $.map(this.dates, function (d) {
                return d.valueOf();
            });
            $.each(this.pickers, function (i, p) {
                p.setRange(range);
            });
        },
        dateUpdated: function (e) {
            // `this.updating` is a workaround for preventing infinite recursion
            // between `changeDate` triggering and `setUTCDate` calling.  Until
            // there is a better mechanism.
            if (this.updating) return;
            this.updating = true;

            var dp = $(e.target).data('bsDatepicker');

            if (typeof dp === "undefined") {
                return;
            }

            var new_date = dp.getUTCDate(),
                i = $.inArray(e.target, this.inputs),
                j = i - 1,
                k = i + 1,
                l = this.inputs.length;
            if (i === -1) return;

            $.each(this.pickers, function (i, p) {
                if (!p.getUTCDate()) p.setUTCDate(new_date);
            });

            if (new_date < this.dates[j]) {
                // Date being moved earlier/left
                while (j >= 0 && new_date < this.dates[j]) {
                    this.pickers[j--].setUTCDate(new_date);
                }
            } else if (new_date > this.dates[k]) {
                // Date being moved later/right
                while (k < l && new_date > this.dates[k]) {
                    this.pickers[k++].setUTCDate(new_date);
                }
            }
            this.updateDates();

            delete this.updating;
        },
        remove: function () {
            $.map(this.pickers, function (p) {
                p.remove();
            });
            delete this.element.data().datepicker;
        }
    };

    function opts_from_el(el, prefix) {
        // Derive options from element data-attrs
        var data = $(el).data(),
            out = {},
            inkey,
            replace = new RegExp('^' + prefix.toLowerCase() + '([A-Z])');
        prefix = new RegExp('^' + prefix.toLowerCase());

        function re_lower(_, a) {
            return a.toLowerCase();
        }

        for (var key in data) if (prefix.test(key)) {
            inkey = key.replace(replace, re_lower);
            out[inkey] = data[key];
        }
        return out;
    }

    function opts_from_locale(lang) {
        // Derive options from locale plugins
        var out = {};
        // Check if "de-DE" style date is available, if not language should
        // fallback to 2 letter code eg "de"
        if (!dates[lang]) {
            lang = lang.split('-')[0];
            if (!dates[lang]) return;
        }
        var d = dates[lang];
        $.each(locale_opts, function (i, k) {
            if (k in d) out[k] = d[k];
        });
        return out;
    }

    var old = $.fn.bsDatepicker;
    var datepickerPlugin = function (option) {
        var args = Array.apply(null, arguments);
        args.shift();
        var internal_return;
        this.each(function () {
            var $this = $(this),
                data = $this.data('bsDatepicker'),
                options = typeof option === 'object' && option;
            if (!data) {
                var elopts = opts_from_el(this, 'date'),

                // Preliminary otions
                xopts = $.extend({}, defaults, elopts, options),
                    locopts = opts_from_locale(xopts.language),

                // Options priority: js args, data-attrs, locales, defaults
                opts = $.extend({}, defaults, locopts, elopts, options);
                if ($this.hasClass('input-daterange') || opts.inputs) {
                    $.extend(opts, {
                        inputs: opts.inputs || $this.find('input').toArray()
                    });
                    data = new DateRangePicker(this, opts);
                } else {
                    data = new Datepicker(this, opts);
                }
                $this.data('bsDatepicker', data);
            }
            if (typeof option === 'string' && typeof data[option] === 'function') {
                internal_return = data[option].apply(data, args);
            }
        });

        if (internal_return === undefined || internal_return instanceof Datepicker || internal_return instanceof DateRangePicker) return this;

        if (this.length > 1) throw new Error('Using only allowed for the collection of a single element (' + option + ' function)');else return internal_return;
    };
    $.fn.bsDatepicker = datepickerPlugin;

    var defaults = $.fn.bsDatepicker.defaults = {
        assumeNearbyYear: false,
        autoclose: false,
        beforeShowDay: $.noop,
        beforeShowMonth: $.noop,
        beforeShowYear: $.noop,
        beforeShowDecade: $.noop,
        beforeShowCentury: $.noop,
        calendarWeeks: false,
        clearBtn: false,
        toggleActive: false,
        daysOfWeekDisabled: [],
        daysOfWeekHighlighted: [],
        datesDisabled: [],
        endDate: Infinity,
        forceParse: true,
        format: 'mm/dd/yyyy',
        keyboardNavigation: true,
        language: 'en',
        minViewMode: 0,
        maxViewMode: 4,
        multidate: false,
        multidateSeparator: ',',
        orientation: "auto",
        rtl: false,
        startDate: -Infinity,
        startView: 0,
        todayBtn: false,
        todayHighlight: false,
        weekStart: 0,
        disableTouchKeyboard: false,
        enableOnReadonly: true,
        showOnFocus: true,
        zIndexOffset: 10,
        container: 'body',
        immediateUpdates: false,
        title: '',
        templates: {
            leftArrow: '<i class="fa fa-angle-double-left"></i>',
            rightArrow: '<i class="fa fa-angle-double-right"></i>'
        }
    };
    var locale_opts = $.fn.bsDatepicker.locale_opts = ['format', 'rtl', 'weekStart'];
    $.fn.bsDatepicker.Constructor = Datepicker;
    var dates = $.fn.bsDatepicker.dates = {
        en: {
            days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            today: "Today",
            clear: "Clear",
            titleFormat: "MM yyyy"
        }
    };

    var DPGlobal = {
        modes: [{
            clsName: 'days',
            navFnc: 'Month',
            navStep: 1
        }, {
            clsName: 'months',
            navFnc: 'FullYear',
            navStep: 1
        }, {
            clsName: 'years',
            navFnc: 'FullYear',
            navStep: 10
        }, {
            clsName: 'decades',
            navFnc: 'FullDecade',
            navStep: 100
        }, {
            clsName: 'centuries',
            navFnc: 'FullCentury',
            navStep: 1000
        }],
        isLeapYear: function (year) {
            return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
        },
        getDaysInMonth: function (year, month) {
            return [31, DPGlobal.isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
        },
        validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
        nonpunctuation: /[^ -\/:-@\u5e74\u6708\u65e5\[-`{-~\t\n\r]+/g,
        parseFormat: function (format) {
            if (typeof format.toValue === 'function' && typeof format.toDisplay === 'function') return format;
            // IE treats \0 as a string end in inputs (truncating the value),
            // so it's a bad format delimiter, anyway
            var separators = format.replace(this.validParts, '\0').split('\0'),
                parts = format.match(this.validParts);
            if (!separators || !separators.length || !parts || parts.length === 0) {
                throw new Error("Invalid date format.");
            }
            return { separators: separators, parts: parts };
        },
        parseDate: function (date, format, language, assumeNearby) {
            if (!date) return undefined;
            if (date instanceof Date) return date;
            if (typeof format === 'string') format = DPGlobal.parseFormat(format);
            if (format.toValue) return format.toValue(date, format, language);
            var part_re = /([\-+]\d+)([dmwy])/,
                parts = date.match(/([\-+]\d+)([dmwy])/g),
                fn_map = {
                d: 'moveDay',
                m: 'moveMonth',
                w: 'moveWeek',
                y: 'moveYear'
            },
                dateAliases = {
                yesterday: '-1d',
                today: '+0d',
                tomorrow: '+1d'
            },
                part,
                dir,
                i,
                fn;
            if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(date)) {
                date = new Date();
                for (i = 0; i < parts.length; i++) {
                    part = part_re.exec(parts[i]);
                    dir = parseInt(part[1]);
                    fn = fn_map[part[2]];
                    date = Datepicker.prototype[fn](date, dir);
                }
                return UTCDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
            }

            if (typeof dateAliases[date] !== 'undefined') {
                date = dateAliases[date];
                parts = date.match(/([\-+]\d+)([dmwy])/g);

                if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(date)) {
                    date = new Date();
                    for (i = 0; i < parts.length; i++) {
                        part = part_re.exec(parts[i]);
                        dir = parseInt(part[1]);
                        fn = fn_map[part[2]];
                        date = Datepicker.prototype[fn](date, dir);
                    }

                    return UTCDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
                }
            }

            parts = date && date.match(this.nonpunctuation) || [];
            date = new Date();

            function applyNearbyYear(year, threshold) {
                if (threshold === true) threshold = 10;

                // if year is 2 digits or less, than the user most likely is trying to get a recent century
                if (year < 100) {
                    year += 2000;
                    // if the new year is more than threshold years in advance, use last century
                    if (year > new Date().getFullYear() + threshold) {
                        year -= 100;
                    }
                }

                return year;
            }

            var parsed = {},
                setters_order = ['yyyy', 'yy', 'M', 'MM', 'm', 'mm', 'd', 'dd'],
                setters_map = {
                yyyy: function (d, v) {
                    return d.setUTCFullYear(assumeNearby ? applyNearbyYear(v, assumeNearby) : v);
                },
                yy: function (d, v) {
                    return d.setUTCFullYear(assumeNearby ? applyNearbyYear(v, assumeNearby) : v);
                },
                m: function (d, v) {
                    if (isNaN(d)) return d;
                    v -= 1;
                    while (v < 0) v += 12;
                    v %= 12;
                    d.setUTCMonth(v);
                    while (d.getUTCMonth() !== v) d.setUTCDate(d.getUTCDate() - 1);
                    return d;
                },
                d: function (d, v) {
                    return d.setUTCDate(v);
                }
            },
                val,
                filtered;
            setters_map['M'] = setters_map['MM'] = setters_map['mm'] = setters_map['m'];
            setters_map['dd'] = setters_map['d'];
            date = UTCToday();
            var fparts = format.parts.slice();
            // Remove noop parts
            if (parts.length !== fparts.length) {
                fparts = $(fparts).filter(function (i, p) {
                    return $.inArray(p, setters_order) !== -1;
                }).toArray();
            }

            // Process remainder
            function match_part() {
                var m = this.slice(0, parts[i].length),
                    p = parts[i].slice(0, m.length);
                return m.toLowerCase() === p.toLowerCase();
            }

            if (parts.length === fparts.length) {
                var cnt;
                for (i = 0, cnt = fparts.length; i < cnt; i++) {
                    val = parseInt(parts[i], 10);
                    part = fparts[i];
                    if (isNaN(val)) {
                        switch (part) {
                            case 'MM':
                                filtered = $(dates[language].months).filter(match_part);
                                val = $.inArray(filtered[0], dates[language].months) + 1;
                                break;
                            case 'M':
                                filtered = $(dates[language].monthsShort).filter(match_part);
                                val = $.inArray(filtered[0], dates[language].monthsShort) + 1;
                                break;
                        }
                    }
                    parsed[part] = val;
                }
                var _date, s;
                for (i = 0; i < setters_order.length; i++) {
                    s = setters_order[i];
                    if (s in parsed && !isNaN(parsed[s])) {
                        _date = new Date(date);
                        setters_map[s](_date, parsed[s]);
                        if (!isNaN(_date)) date = _date;
                    }
                }
            }
            return date;
        },
        formatDate: function (date, format, language) {
            if (!date) return '';
            if (typeof format === 'string') format = DPGlobal.parseFormat(format);
            if (format.toDisplay) return format.toDisplay(date, format, language);
            var val = {
                d: date.getUTCDate(),
                D: dates[language].daysShort[date.getUTCDay()],
                DD: dates[language].days[date.getUTCDay()],
                m: date.getUTCMonth() + 1,
                M: dates[language].monthsShort[date.getUTCMonth()],
                MM: dates[language].months[date.getUTCMonth()],
                yy: date.getUTCFullYear().toString().substring(2),
                yyyy: date.getUTCFullYear()
            };
            val.dd = (val.d < 10 ? '0' : '') + val.d;
            val.mm = (val.m < 10 ? '0' : '') + val.m;
            date = [];
            var seps = $.extend([], format.separators);
            for (var i = 0, cnt = format.parts.length; i <= cnt; i++) {
                if (seps.length) date.push(seps.shift());
                date.push(val[format.parts[i]]);
            }
            return date.join('');
        },
        headTemplate: '<thead>' + '<tr>' + '<th colspan="7" class="bs-datepicker-title"></th>' + '</tr>' + '<tr>' + '<th class="prev">&laquo;</th>' + '<th colspan="5" class="bs-datepicker-switch"></th>' + '<th class="next">&raquo;</th>' + '</tr>' + '</thead>',
        contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
        footTemplate: '<tfoot>' + '<tr>' + '<th colspan="7" class="today"></th>' + '</tr>' + '<tr>' + '<th colspan="7" class="clear"></th>' + '</tr>' + '</tfoot>'
    };
    DPGlobal.template = '<div class="bs-datepicker">' + '<div class="bs-datepicker-days">' + '<table class="table-condensed">' + DPGlobal.headTemplate + '<tbody></tbody>' + DPGlobal.footTemplate + '</table>' + '</div>' + '<div class="bs-datepicker-months">' + '<table class="table-condensed">' + DPGlobal.headTemplate + DPGlobal.contTemplate + DPGlobal.footTemplate + '</table>' + '</div>' + '<div class="bs-datepicker-years">' + '<table class="table-condensed">' + DPGlobal.headTemplate + DPGlobal.contTemplate + DPGlobal.footTemplate + '</table>' + '</div>' + '<div class="bs-datepicker-decades">' + '<table class="table-condensed">' + DPGlobal.headTemplate + DPGlobal.contTemplate + DPGlobal.footTemplate + '</table>' + '</div>' + '<div class="bs-datepicker-centuries">' + '<table class="table-condensed">' + DPGlobal.headTemplate + DPGlobal.contTemplate + DPGlobal.footTemplate + '</table>' + '</div>' + '</div>';

    $.fn.bsDatepicker.DPGlobal = DPGlobal;

    /* DATEPICKER NO CONFLICT
    * =================== */

    $.fn.bsDatepicker.noConflict = function () {
        $.fn.bsDatepicker = old;
        return this;
    };

    /* DATEPICKER VERSION
     * =================== */
    $.fn.bsDatepicker.version = '1.6.4';

    /* DATEPICKER DATA-API
    * ================== */

    $(document).on('focus.bs-datepicker.data-api click.bs-datepicker.data-api', '[data-provide="bs-datepicker"]', function (e) {
        var $this = $(this);
        if ($this.data('bsDatepicker')) return;
        e.preventDefault();
        // component click requires us to explicitly show it
        datepickerPlugin.call($this, 'show');
    });
    $(function () {
        datepickerPlugin.call($('[data-provide="bs-datepicker-inline"]'));
    });

    $.fn.datepicker = [];
    $.fn.datepicker = $.fn.bsDatepicker;
});
System.registerDynamic("reactiveadmintemplate/scripts/modules/form/datapicker/init.js", ["./main"], true, function ($__require, exports, module) {
    'use strict';

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    /*!
     * @version: 1.1.2
     * @name: init
     *
     * @author: https://themeforest.net/user/flexlayers
     */
    $__require("./main");
    $(function () {
        ////////////////////////
        // Data Picker
        $('.bs-datepicker.picker-simple').bsDatepicker({
            todayBtn: true,
            todayHighlight: true
        });
        $('.bs-datepicker.picker-disabled').bsDatepicker({
            todayBtn: true,
            todayHighlight: true,
            daysOfWeekDisabled: [0, 5, 6]
        });
        $('.bs-datepicker.picker-format').bsDatepicker({
            todayBtn: true,
            todayHighlight: true,
            format: 'mm - dd - yyyy'
        });
        $('.bs-datepicker.picker-range').bsDatepicker({
            todayBtn: true,
            todayHighlight: true
        }).find('input').each(function () {
            $(this).bsDatepicker('clearDates');
        });
        $('.bs-datepicker').on('show', function () {
            $('.bs-datepicker-dropdown').css('opacity', '0').addClass('transition scale in').on('click', function () {
                $(this).removeClass('transition scale in').css('opacity', '1');
            });
        });
        // End Data Picker
    });
});
/*!
 * jQuery UI Sortable 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Sortable
//>>group: Interactions
//>>description: Enables items in a list to be sorted using the mouse.
//>>docs: http://api.jqueryui.com/sortable/
//>>demos: http://jqueryui.com/sortable/
//>>css.structure: ../../themes/base/sortable.css

(function (factory) {
	if ("function" === "function" && true) {

		// AMD. Register as an anonymous module.
		System.registerDynamic("github:components/jqueryui@1.12.1/ui/widgets/sortable.js", ["jquery", "./mouse", "../data", "../ie", "../scroll-parent", "../version", "../widget"], false, function ($__require, $__exports, $__module) {
			if (typeof factory === "function") {
				return factory.call(this, $__require("jquery"), $__require("./mouse"), $__require("../data"), $__require("../ie"), $__require("../scroll-parent"), $__require("../version"), $__require("../widget"));
			} else {
				return factory;
			}
		});
	} else {

		// Browser globals
		factory(jQuery);
	}
})(function ($) {

	return $.widget("ui.sortable", $.ui.mouse, {
		version: "1.12.1",
		widgetEventPrefix: "sort",
		ready: false,
		options: {
			appendTo: "parent",
			axis: false,
			connectWith: false,
			containment: false,
			cursor: "auto",
			cursorAt: false,
			dropOnEmpty: true,
			forcePlaceholderSize: false,
			forceHelperSize: false,
			grid: false,
			handle: false,
			helper: "original",
			items: "> *",
			opacity: false,
			placeholder: false,
			revert: false,
			scroll: true,
			scrollSensitivity: 20,
			scrollSpeed: 20,
			scope: "default",
			tolerance: "intersect",
			zIndex: 1000,

			// Callbacks
			activate: null,
			beforeStop: null,
			change: null,
			deactivate: null,
			out: null,
			over: null,
			receive: null,
			remove: null,
			sort: null,
			start: null,
			stop: null,
			update: null
		},

		_isOverAxis: function (x, reference, size) {
			return x >= reference && x < reference + size;
		},

		_isFloating: function (item) {
			return (/left|right/.test(item.css("float")) || /inline|table-cell/.test(item.css("display"))
			);
		},

		_create: function () {
			this.containerCache = {};
			this._addClass("ui-sortable");

			//Get the items
			this.refresh();

			//Let's determine the parent's offset
			this.offset = this.element.offset();

			//Initialize mouse events for interaction
			this._mouseInit();

			this._setHandleClassName();

			//We're ready to go
			this.ready = true;
		},

		_setOption: function (key, value) {
			this._super(key, value);

			if (key === "handle") {
				this._setHandleClassName();
			}
		},

		_setHandleClassName: function () {
			var that = this;
			this._removeClass(this.element.find(".ui-sortable-handle"), "ui-sortable-handle");
			$.each(this.items, function () {
				that._addClass(this.instance.options.handle ? this.item.find(this.instance.options.handle) : this.item, "ui-sortable-handle");
			});
		},

		_destroy: function () {
			this._mouseDestroy();

			for (var i = this.items.length - 1; i >= 0; i--) {
				this.items[i].item.removeData(this.widgetName + "-item");
			}

			return this;
		},

		_mouseCapture: function (event, overrideHandle) {
			var currentItem = null,
			    validHandle = false,
			    that = this;

			if (this.reverting) {
				return false;
			}

			if (this.options.disabled || this.options.type === "static") {
				return false;
			}

			//We have to refresh the items data once first
			this._refreshItems(event);

			//Find out if the clicked node (or one of its parents) is a actual item in this.items
			$(event.target).parents().each(function () {
				if ($.data(this, that.widgetName + "-item") === that) {
					currentItem = $(this);
					return false;
				}
			});
			if ($.data(event.target, that.widgetName + "-item") === that) {
				currentItem = $(event.target);
			}

			if (!currentItem) {
				return false;
			}
			if (this.options.handle && !overrideHandle) {
				$(this.options.handle, currentItem).find("*").addBack().each(function () {
					if (this === event.target) {
						validHandle = true;
					}
				});
				if (!validHandle) {
					return false;
				}
			}

			this.currentItem = currentItem;
			this._removeCurrentsFromItems();
			return true;
		},

		_mouseStart: function (event, overrideHandle, noActivation) {

			var i,
			    body,
			    o = this.options;

			this.currentContainer = this;

			//We only need to call refreshPositions, because the refreshItems call has been moved to
			// mouseCapture
			this.refreshPositions();

			//Create and append the visible helper
			this.helper = this._createHelper(event);

			//Cache the helper size
			this._cacheHelperProportions();

			/*
    * - Position generation -
    * This block generates everything position related - it's the core of draggables.
    */

			//Cache the margins of the original element
			this._cacheMargins();

			//Get the next scrolling parent
			this.scrollParent = this.helper.scrollParent();

			//The element's absolute position on the page minus margins
			this.offset = this.currentItem.offset();
			this.offset = {
				top: this.offset.top - this.margins.top,
				left: this.offset.left - this.margins.left
			};

			$.extend(this.offset, {
				click: { //Where the click happened, relative to the element
					left: event.pageX - this.offset.left,
					top: event.pageY - this.offset.top
				},
				parent: this._getParentOffset(),

				// This is a relative to absolute position minus the actual position calculation -
				// only used for relative positioned helper
				relative: this._getRelativeOffset()
			});

			// Only after we got the offset, we can change the helper's position to absolute
			// TODO: Still need to figure out a way to make relative sorting possible
			this.helper.css("position", "absolute");
			this.cssPosition = this.helper.css("position");

			//Generate the original position
			this.originalPosition = this._generatePosition(event);
			this.originalPageX = event.pageX;
			this.originalPageY = event.pageY;

			//Adjust the mouse offset relative to the helper if "cursorAt" is supplied
			o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt);

			//Cache the former DOM position
			this.domPosition = {
				prev: this.currentItem.prev()[0],
				parent: this.currentItem.parent()[0]
			};

			// If the helper is not the original, hide the original so it's not playing any role during
			// the drag, won't cause anything bad this way
			if (this.helper[0] !== this.currentItem[0]) {
				this.currentItem.hide();
			}

			//Create the placeholder
			this._createPlaceholder();

			//Set a containment if given in the options
			if (o.containment) {
				this._setContainment();
			}

			if (o.cursor && o.cursor !== "auto") {
				// cursor option
				body = this.document.find("body");

				// Support: IE
				this.storedCursor = body.css("cursor");
				body.css("cursor", o.cursor);

				this.storedStylesheet = $("<style>*{ cursor: " + o.cursor + " !important; }</style>").appendTo(body);
			}

			if (o.opacity) {
				// opacity option
				if (this.helper.css("opacity")) {
					this._storedOpacity = this.helper.css("opacity");
				}
				this.helper.css("opacity", o.opacity);
			}

			if (o.zIndex) {
				// zIndex option
				if (this.helper.css("zIndex")) {
					this._storedZIndex = this.helper.css("zIndex");
				}
				this.helper.css("zIndex", o.zIndex);
			}

			//Prepare scrolling
			if (this.scrollParent[0] !== this.document[0] && this.scrollParent[0].tagName !== "HTML") {
				this.overflowOffset = this.scrollParent.offset();
			}

			//Call callbacks
			this._trigger("start", event, this._uiHash());

			//Recache the helper size
			if (!this._preserveHelperProportions) {
				this._cacheHelperProportions();
			}

			//Post "activate" events to possible containers
			if (!noActivation) {
				for (i = this.containers.length - 1; i >= 0; i--) {
					this.containers[i]._trigger("activate", event, this._uiHash(this));
				}
			}

			//Prepare possible droppables
			if ($.ui.ddmanager) {
				$.ui.ddmanager.current = this;
			}

			if ($.ui.ddmanager && !o.dropBehaviour) {
				$.ui.ddmanager.prepareOffsets(this, event);
			}

			this.dragging = true;

			this._addClass(this.helper, "ui-sortable-helper");

			// Execute the drag once - this causes the helper not to be visiblebefore getting its
			// correct position
			this._mouseDrag(event);
			return true;
		},

		_mouseDrag: function (event) {
			var i,
			    item,
			    itemElement,
			    intersection,
			    o = this.options,
			    scrolled = false;

			//Compute the helpers position
			this.position = this._generatePosition(event);
			this.positionAbs = this._convertPositionTo("absolute");

			if (!this.lastPositionAbs) {
				this.lastPositionAbs = this.positionAbs;
			}

			//Do scrolling
			if (this.options.scroll) {
				if (this.scrollParent[0] !== this.document[0] && this.scrollParent[0].tagName !== "HTML") {

					if (this.overflowOffset.top + this.scrollParent[0].offsetHeight - event.pageY < o.scrollSensitivity) {
						this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop + o.scrollSpeed;
					} else if (event.pageY - this.overflowOffset.top < o.scrollSensitivity) {
						this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop - o.scrollSpeed;
					}

					if (this.overflowOffset.left + this.scrollParent[0].offsetWidth - event.pageX < o.scrollSensitivity) {
						this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft + o.scrollSpeed;
					} else if (event.pageX - this.overflowOffset.left < o.scrollSensitivity) {
						this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft - o.scrollSpeed;
					}
				} else {

					if (event.pageY - this.document.scrollTop() < o.scrollSensitivity) {
						scrolled = this.document.scrollTop(this.document.scrollTop() - o.scrollSpeed);
					} else if (this.window.height() - (event.pageY - this.document.scrollTop()) < o.scrollSensitivity) {
						scrolled = this.document.scrollTop(this.document.scrollTop() + o.scrollSpeed);
					}

					if (event.pageX - this.document.scrollLeft() < o.scrollSensitivity) {
						scrolled = this.document.scrollLeft(this.document.scrollLeft() - o.scrollSpeed);
					} else if (this.window.width() - (event.pageX - this.document.scrollLeft()) < o.scrollSensitivity) {
						scrolled = this.document.scrollLeft(this.document.scrollLeft() + o.scrollSpeed);
					}
				}

				if (scrolled !== false && $.ui.ddmanager && !o.dropBehaviour) {
					$.ui.ddmanager.prepareOffsets(this, event);
				}
			}

			//Regenerate the absolute position used for position checks
			this.positionAbs = this._convertPositionTo("absolute");

			//Set the helper position
			if (!this.options.axis || this.options.axis !== "y") {
				this.helper[0].style.left = this.position.left + "px";
			}
			if (!this.options.axis || this.options.axis !== "x") {
				this.helper[0].style.top = this.position.top + "px";
			}

			//Rearrange
			for (i = this.items.length - 1; i >= 0; i--) {

				//Cache variables and intersection, continue if no intersection
				item = this.items[i];
				itemElement = item.item[0];
				intersection = this._intersectsWithPointer(item);
				if (!intersection) {
					continue;
				}

				// Only put the placeholder inside the current Container, skip all
				// items from other containers. This works because when moving
				// an item from one container to another the
				// currentContainer is switched before the placeholder is moved.
				//
				// Without this, moving items in "sub-sortables" can cause
				// the placeholder to jitter between the outer and inner container.
				if (item.instance !== this.currentContainer) {
					continue;
				}

				// Cannot intersect with itself
				// no useless actions that have been done before
				// no action if the item moved is the parent of the item checked
				if (itemElement !== this.currentItem[0] && this.placeholder[intersection === 1 ? "next" : "prev"]()[0] !== itemElement && !$.contains(this.placeholder[0], itemElement) && (this.options.type === "semi-dynamic" ? !$.contains(this.element[0], itemElement) : true)) {

					this.direction = intersection === 1 ? "down" : "up";

					if (this.options.tolerance === "pointer" || this._intersectsWithSides(item)) {
						this._rearrange(event, item);
					} else {
						break;
					}

					this._trigger("change", event, this._uiHash());
					break;
				}
			}

			//Post events to containers
			this._contactContainers(event);

			//Interconnect with droppables
			if ($.ui.ddmanager) {
				$.ui.ddmanager.drag(this, event);
			}

			//Call callbacks
			this._trigger("sort", event, this._uiHash());

			this.lastPositionAbs = this.positionAbs;
			return false;
		},

		_mouseStop: function (event, noPropagation) {

			if (!event) {
				return;
			}

			//If we are using droppables, inform the manager about the drop
			if ($.ui.ddmanager && !this.options.dropBehaviour) {
				$.ui.ddmanager.drop(this, event);
			}

			if (this.options.revert) {
				var that = this,
				    cur = this.placeholder.offset(),
				    axis = this.options.axis,
				    animation = {};

				if (!axis || axis === "x") {
					animation.left = cur.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollLeft);
				}
				if (!axis || axis === "y") {
					animation.top = cur.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollTop);
				}
				this.reverting = true;
				$(this.helper).animate(animation, parseInt(this.options.revert, 10) || 500, function () {
					that._clear(event);
				});
			} else {
				this._clear(event, noPropagation);
			}

			return false;
		},

		cancel: function () {

			if (this.dragging) {

				this._mouseUp(new $.Event("mouseup", { target: null }));

				if (this.options.helper === "original") {
					this.currentItem.css(this._storedCSS);
					this._removeClass(this.currentItem, "ui-sortable-helper");
				} else {
					this.currentItem.show();
				}

				//Post deactivating events to containers
				for (var i = this.containers.length - 1; i >= 0; i--) {
					this.containers[i]._trigger("deactivate", null, this._uiHash(this));
					if (this.containers[i].containerCache.over) {
						this.containers[i]._trigger("out", null, this._uiHash(this));
						this.containers[i].containerCache.over = 0;
					}
				}
			}

			if (this.placeholder) {

				//$(this.placeholder[0]).remove(); would have been the jQuery way - unfortunately,
				// it unbinds ALL events from the original node!
				if (this.placeholder[0].parentNode) {
					this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
				}
				if (this.options.helper !== "original" && this.helper && this.helper[0].parentNode) {
					this.helper.remove();
				}

				$.extend(this, {
					helper: null,
					dragging: false,
					reverting: false,
					_noFinalSort: null
				});

				if (this.domPosition.prev) {
					$(this.domPosition.prev).after(this.currentItem);
				} else {
					$(this.domPosition.parent).prepend(this.currentItem);
				}
			}

			return this;
		},

		serialize: function (o) {

			var items = this._getItemsAsjQuery(o && o.connected),
			    str = [];
			o = o || {};

			$(items).each(function () {
				var res = ($(o.item || this).attr(o.attribute || "id") || "").match(o.expression || /(.+)[\-=_](.+)/);
				if (res) {
					str.push((o.key || res[1] + "[]") + "=" + (o.key && o.expression ? res[1] : res[2]));
				}
			});

			if (!str.length && o.key) {
				str.push(o.key + "=");
			}

			return str.join("&");
		},

		toArray: function (o) {

			var items = this._getItemsAsjQuery(o && o.connected),
			    ret = [];

			o = o || {};

			items.each(function () {
				ret.push($(o.item || this).attr(o.attribute || "id") || "");
			});
			return ret;
		},

		/* Be careful with the following core functions */
		_intersectsWith: function (item) {

			var x1 = this.positionAbs.left,
			    x2 = x1 + this.helperProportions.width,
			    y1 = this.positionAbs.top,
			    y2 = y1 + this.helperProportions.height,
			    l = item.left,
			    r = l + item.width,
			    t = item.top,
			    b = t + item.height,
			    dyClick = this.offset.click.top,
			    dxClick = this.offset.click.left,
			    isOverElementHeight = this.options.axis === "x" || y1 + dyClick > t && y1 + dyClick < b,
			    isOverElementWidth = this.options.axis === "y" || x1 + dxClick > l && x1 + dxClick < r,
			    isOverElement = isOverElementHeight && isOverElementWidth;

			if (this.options.tolerance === "pointer" || this.options.forcePointerForContainers || this.options.tolerance !== "pointer" && this.helperProportions[this.floating ? "width" : "height"] > item[this.floating ? "width" : "height"]) {
				return isOverElement;
			} else {

				return l < x1 + this.helperProportions.width / 2 && // Right Half
				x2 - this.helperProportions.width / 2 < r && // Left Half
				t < y1 + this.helperProportions.height / 2 && // Bottom Half
				y2 - this.helperProportions.height / 2 < b; // Top Half
			}
		},

		_intersectsWithPointer: function (item) {
			var verticalDirection,
			    horizontalDirection,
			    isOverElementHeight = this.options.axis === "x" || this._isOverAxis(this.positionAbs.top + this.offset.click.top, item.top, item.height),
			    isOverElementWidth = this.options.axis === "y" || this._isOverAxis(this.positionAbs.left + this.offset.click.left, item.left, item.width),
			    isOverElement = isOverElementHeight && isOverElementWidth;

			if (!isOverElement) {
				return false;
			}

			verticalDirection = this._getDragVerticalDirection();
			horizontalDirection = this._getDragHorizontalDirection();

			return this.floating ? horizontalDirection === "right" || verticalDirection === "down" ? 2 : 1 : verticalDirection && (verticalDirection === "down" ? 2 : 1);
		},

		_intersectsWithSides: function (item) {

			var isOverBottomHalf = this._isOverAxis(this.positionAbs.top + this.offset.click.top, item.top + item.height / 2, item.height),
			    isOverRightHalf = this._isOverAxis(this.positionAbs.left + this.offset.click.left, item.left + item.width / 2, item.width),
			    verticalDirection = this._getDragVerticalDirection(),
			    horizontalDirection = this._getDragHorizontalDirection();

			if (this.floating && horizontalDirection) {
				return horizontalDirection === "right" && isOverRightHalf || horizontalDirection === "left" && !isOverRightHalf;
			} else {
				return verticalDirection && (verticalDirection === "down" && isOverBottomHalf || verticalDirection === "up" && !isOverBottomHalf);
			}
		},

		_getDragVerticalDirection: function () {
			var delta = this.positionAbs.top - this.lastPositionAbs.top;
			return delta !== 0 && (delta > 0 ? "down" : "up");
		},

		_getDragHorizontalDirection: function () {
			var delta = this.positionAbs.left - this.lastPositionAbs.left;
			return delta !== 0 && (delta > 0 ? "right" : "left");
		},

		refresh: function (event) {
			this._refreshItems(event);
			this._setHandleClassName();
			this.refreshPositions();
			return this;
		},

		_connectWith: function () {
			var options = this.options;
			return options.connectWith.constructor === String ? [options.connectWith] : options.connectWith;
		},

		_getItemsAsjQuery: function (connected) {

			var i,
			    j,
			    cur,
			    inst,
			    items = [],
			    queries = [],
			    connectWith = this._connectWith();

			if (connectWith && connected) {
				for (i = connectWith.length - 1; i >= 0; i--) {
					cur = $(connectWith[i], this.document[0]);
					for (j = cur.length - 1; j >= 0; j--) {
						inst = $.data(cur[j], this.widgetFullName);
						if (inst && inst !== this && !inst.options.disabled) {
							queries.push([$.isFunction(inst.options.items) ? inst.options.items.call(inst.element) : $(inst.options.items, inst.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), inst]);
						}
					}
				}
			}

			queries.push([$.isFunction(this.options.items) ? this.options.items.call(this.element, null, { options: this.options, item: this.currentItem }) : $(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);

			function addItems() {
				items.push(this);
			}
			for (i = queries.length - 1; i >= 0; i--) {
				queries[i][0].each(addItems);
			}

			return $(items);
		},

		_removeCurrentsFromItems: function () {

			var list = this.currentItem.find(":data(" + this.widgetName + "-item)");

			this.items = $.grep(this.items, function (item) {
				for (var j = 0; j < list.length; j++) {
					if (list[j] === item.item[0]) {
						return false;
					}
				}
				return true;
			});
		},

		_refreshItems: function (event) {

			this.items = [];
			this.containers = [this];

			var i,
			    j,
			    cur,
			    inst,
			    targetData,
			    _queries,
			    item,
			    queriesLength,
			    items = this.items,
			    queries = [[$.isFunction(this.options.items) ? this.options.items.call(this.element[0], event, { item: this.currentItem }) : $(this.options.items, this.element), this]],
			    connectWith = this._connectWith();

			//Shouldn't be run the first time through due to massive slow-down
			if (connectWith && this.ready) {
				for (i = connectWith.length - 1; i >= 0; i--) {
					cur = $(connectWith[i], this.document[0]);
					for (j = cur.length - 1; j >= 0; j--) {
						inst = $.data(cur[j], this.widgetFullName);
						if (inst && inst !== this && !inst.options.disabled) {
							queries.push([$.isFunction(inst.options.items) ? inst.options.items.call(inst.element[0], event, { item: this.currentItem }) : $(inst.options.items, inst.element), inst]);
							this.containers.push(inst);
						}
					}
				}
			}

			for (i = queries.length - 1; i >= 0; i--) {
				targetData = queries[i][1];
				_queries = queries[i][0];

				for (j = 0, queriesLength = _queries.length; j < queriesLength; j++) {
					item = $(_queries[j]);

					// Data for target checking (mouse manager)
					item.data(this.widgetName + "-item", targetData);

					items.push({
						item: item,
						instance: targetData,
						width: 0, height: 0,
						left: 0, top: 0
					});
				}
			}
		},

		refreshPositions: function (fast) {

			// Determine whether items are being displayed horizontally
			this.floating = this.items.length ? this.options.axis === "x" || this._isFloating(this.items[0].item) : false;

			//This has to be redone because due to the item being moved out/into the offsetParent,
			// the offsetParent's position will change
			if (this.offsetParent && this.helper) {
				this.offset.parent = this._getParentOffset();
			}

			var i, item, t, p;

			for (i = this.items.length - 1; i >= 0; i--) {
				item = this.items[i];

				//We ignore calculating positions of all connected containers when we're not over them
				if (item.instance !== this.currentContainer && this.currentContainer && item.item[0] !== this.currentItem[0]) {
					continue;
				}

				t = this.options.toleranceElement ? $(this.options.toleranceElement, item.item) : item.item;

				if (!fast) {
					item.width = t.outerWidth();
					item.height = t.outerHeight();
				}

				p = t.offset();
				item.left = p.left;
				item.top = p.top;
			}

			if (this.options.custom && this.options.custom.refreshContainers) {
				this.options.custom.refreshContainers.call(this);
			} else {
				for (i = this.containers.length - 1; i >= 0; i--) {
					p = this.containers[i].element.offset();
					this.containers[i].containerCache.left = p.left;
					this.containers[i].containerCache.top = p.top;
					this.containers[i].containerCache.width = this.containers[i].element.outerWidth();
					this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
				}
			}

			return this;
		},

		_createPlaceholder: function (that) {
			that = that || this;
			var className,
			    o = that.options;

			if (!o.placeholder || o.placeholder.constructor === String) {
				className = o.placeholder;
				o.placeholder = {
					element: function () {

						var nodeName = that.currentItem[0].nodeName.toLowerCase(),
						    element = $("<" + nodeName + ">", that.document[0]);

						that._addClass(element, "ui-sortable-placeholder", className || that.currentItem[0].className)._removeClass(element, "ui-sortable-helper");

						if (nodeName === "tbody") {
							that._createTrPlaceholder(that.currentItem.find("tr").eq(0), $("<tr>", that.document[0]).appendTo(element));
						} else if (nodeName === "tr") {
							that._createTrPlaceholder(that.currentItem, element);
						} else if (nodeName === "img") {
							element.attr("src", that.currentItem.attr("src"));
						}

						if (!className) {
							element.css("visibility", "hidden");
						}

						return element;
					},
					update: function (container, p) {

						// 1. If a className is set as 'placeholder option, we don't force sizes -
						// the class is responsible for that
						// 2. The option 'forcePlaceholderSize can be enabled to force it even if a
						// class name is specified
						if (className && !o.forcePlaceholderSize) {
							return;
						}

						//If the element doesn't have a actual height by itself (without styles coming
						// from a stylesheet), it receives the inline height from the dragged item
						if (!p.height()) {
							p.height(that.currentItem.innerHeight() - parseInt(that.currentItem.css("paddingTop") || 0, 10) - parseInt(that.currentItem.css("paddingBottom") || 0, 10));
						}
						if (!p.width()) {
							p.width(that.currentItem.innerWidth() - parseInt(that.currentItem.css("paddingLeft") || 0, 10) - parseInt(that.currentItem.css("paddingRight") || 0, 10));
						}
					}
				};
			}

			//Create the placeholder
			that.placeholder = $(o.placeholder.element.call(that.element, that.currentItem));

			//Append it after the actual current item
			that.currentItem.after(that.placeholder);

			//Update the size of the placeholder (TODO: Logic to fuzzy, see line 316/317)
			o.placeholder.update(that, that.placeholder);
		},

		_createTrPlaceholder: function (sourceTr, targetTr) {
			var that = this;

			sourceTr.children().each(function () {
				$("<td>&#160;</td>", that.document[0]).attr("colspan", $(this).attr("colspan") || 1).appendTo(targetTr);
			});
		},

		_contactContainers: function (event) {
			var i,
			    j,
			    dist,
			    itemWithLeastDistance,
			    posProperty,
			    sizeProperty,
			    cur,
			    nearBottom,
			    floating,
			    axis,
			    innermostContainer = null,
			    innermostIndex = null;

			// Get innermost container that intersects with item
			for (i = this.containers.length - 1; i >= 0; i--) {

				// Never consider a container that's located within the item itself
				if ($.contains(this.currentItem[0], this.containers[i].element[0])) {
					continue;
				}

				if (this._intersectsWith(this.containers[i].containerCache)) {

					// If we've already found a container and it's more "inner" than this, then continue
					if (innermostContainer && $.contains(this.containers[i].element[0], innermostContainer.element[0])) {
						continue;
					}

					innermostContainer = this.containers[i];
					innermostIndex = i;
				} else {

					// container doesn't intersect. trigger "out" event if necessary
					if (this.containers[i].containerCache.over) {
						this.containers[i]._trigger("out", event, this._uiHash(this));
						this.containers[i].containerCache.over = 0;
					}
				}
			}

			// If no intersecting containers found, return
			if (!innermostContainer) {
				return;
			}

			// Move the item into the container if it's not there already
			if (this.containers.length === 1) {
				if (!this.containers[innermostIndex].containerCache.over) {
					this.containers[innermostIndex]._trigger("over", event, this._uiHash(this));
					this.containers[innermostIndex].containerCache.over = 1;
				}
			} else {

				// When entering a new container, we will find the item with the least distance and
				// append our item near it
				dist = 10000;
				itemWithLeastDistance = null;
				floating = innermostContainer.floating || this._isFloating(this.currentItem);
				posProperty = floating ? "left" : "top";
				sizeProperty = floating ? "width" : "height";
				axis = floating ? "pageX" : "pageY";

				for (j = this.items.length - 1; j >= 0; j--) {
					if (!$.contains(this.containers[innermostIndex].element[0], this.items[j].item[0])) {
						continue;
					}
					if (this.items[j].item[0] === this.currentItem[0]) {
						continue;
					}

					cur = this.items[j].item.offset()[posProperty];
					nearBottom = false;
					if (event[axis] - cur > this.items[j][sizeProperty] / 2) {
						nearBottom = true;
					}

					if (Math.abs(event[axis] - cur) < dist) {
						dist = Math.abs(event[axis] - cur);
						itemWithLeastDistance = this.items[j];
						this.direction = nearBottom ? "up" : "down";
					}
				}

				//Check if dropOnEmpty is enabled
				if (!itemWithLeastDistance && !this.options.dropOnEmpty) {
					return;
				}

				if (this.currentContainer === this.containers[innermostIndex]) {
					if (!this.currentContainer.containerCache.over) {
						this.containers[innermostIndex]._trigger("over", event, this._uiHash());
						this.currentContainer.containerCache.over = 1;
					}
					return;
				}

				itemWithLeastDistance ? this._rearrange(event, itemWithLeastDistance, null, true) : this._rearrange(event, null, this.containers[innermostIndex].element, true);
				this._trigger("change", event, this._uiHash());
				this.containers[innermostIndex]._trigger("change", event, this._uiHash(this));
				this.currentContainer = this.containers[innermostIndex];

				//Update the placeholder
				this.options.placeholder.update(this.currentContainer, this.placeholder);

				this.containers[innermostIndex]._trigger("over", event, this._uiHash(this));
				this.containers[innermostIndex].containerCache.over = 1;
			}
		},

		_createHelper: function (event) {

			var o = this.options,
			    helper = $.isFunction(o.helper) ? $(o.helper.apply(this.element[0], [event, this.currentItem])) : o.helper === "clone" ? this.currentItem.clone() : this.currentItem;

			//Add the helper to the DOM if that didn't happen already
			if (!helper.parents("body").length) {
				$(o.appendTo !== "parent" ? o.appendTo : this.currentItem[0].parentNode)[0].appendChild(helper[0]);
			}

			if (helper[0] === this.currentItem[0]) {
				this._storedCSS = {
					width: this.currentItem[0].style.width,
					height: this.currentItem[0].style.height,
					position: this.currentItem.css("position"),
					top: this.currentItem.css("top"),
					left: this.currentItem.css("left")
				};
			}

			if (!helper[0].style.width || o.forceHelperSize) {
				helper.width(this.currentItem.width());
			}
			if (!helper[0].style.height || o.forceHelperSize) {
				helper.height(this.currentItem.height());
			}

			return helper;
		},

		_adjustOffsetFromHelper: function (obj) {
			if (typeof obj === "string") {
				obj = obj.split(" ");
			}
			if ($.isArray(obj)) {
				obj = { left: +obj[0], top: +obj[1] || 0 };
			}
			if ("left" in obj) {
				this.offset.click.left = obj.left + this.margins.left;
			}
			if ("right" in obj) {
				this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left;
			}
			if ("top" in obj) {
				this.offset.click.top = obj.top + this.margins.top;
			}
			if ("bottom" in obj) {
				this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top;
			}
		},

		_getParentOffset: function () {

			//Get the offsetParent and cache its position
			this.offsetParent = this.helper.offsetParent();
			var po = this.offsetParent.offset();

			// This is a special case where we need to modify a offset calculated on start, since the
			// following happened:
			// 1. The position of the helper is absolute, so it's position is calculated based on the
			// next positioned parent
			// 2. The actual offset parent is a child of the scroll parent, and the scroll parent isn't
			// the document, which means that the scroll is included in the initial calculation of the
			// offset of the parent, and never recalculated upon drag
			if (this.cssPosition === "absolute" && this.scrollParent[0] !== this.document[0] && $.contains(this.scrollParent[0], this.offsetParent[0])) {
				po.left += this.scrollParent.scrollLeft();
				po.top += this.scrollParent.scrollTop();
			}

			// This needs to be actually done for all browsers, since pageX/pageY includes this
			// information with an ugly IE fix
			if (this.offsetParent[0] === this.document[0].body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() === "html" && $.ui.ie) {
				po = { top: 0, left: 0 };
			}

			return {
				top: po.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
				left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
			};
		},

		_getRelativeOffset: function () {

			if (this.cssPosition === "relative") {
				var p = this.currentItem.position();
				return {
					top: p.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
					left: p.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
				};
			} else {
				return { top: 0, left: 0 };
			}
		},

		_cacheMargins: function () {
			this.margins = {
				left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
				top: parseInt(this.currentItem.css("marginTop"), 10) || 0
			};
		},

		_cacheHelperProportions: function () {
			this.helperProportions = {
				width: this.helper.outerWidth(),
				height: this.helper.outerHeight()
			};
		},

		_setContainment: function () {

			var ce,
			    co,
			    over,
			    o = this.options;
			if (o.containment === "parent") {
				o.containment = this.helper[0].parentNode;
			}
			if (o.containment === "document" || o.containment === "window") {
				this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, o.containment === "document" ? this.document.width() : this.window.width() - this.helperProportions.width - this.margins.left, (o.containment === "document" ? this.document.height() || document.body.parentNode.scrollHeight : this.window.height() || this.document[0].body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
			}

			if (!/^(document|window|parent)$/.test(o.containment)) {
				ce = $(o.containment)[0];
				co = $(o.containment).offset();
				over = $(ce).css("overflow") !== "hidden";

				this.containment = [co.left + (parseInt($(ce).css("borderLeftWidth"), 10) || 0) + (parseInt($(ce).css("paddingLeft"), 10) || 0) - this.margins.left, co.top + (parseInt($(ce).css("borderTopWidth"), 10) || 0) + (parseInt($(ce).css("paddingTop"), 10) || 0) - this.margins.top, co.left + (over ? Math.max(ce.scrollWidth, ce.offsetWidth) : ce.offsetWidth) - (parseInt($(ce).css("borderLeftWidth"), 10) || 0) - (parseInt($(ce).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, co.top + (over ? Math.max(ce.scrollHeight, ce.offsetHeight) : ce.offsetHeight) - (parseInt($(ce).css("borderTopWidth"), 10) || 0) - (parseInt($(ce).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top];
			}
		},

		_convertPositionTo: function (d, pos) {

			if (!pos) {
				pos = this.position;
			}
			var mod = d === "absolute" ? 1 : -1,
			    scroll = this.cssPosition === "absolute" && !(this.scrollParent[0] !== this.document[0] && $.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
			    scrollIsRootNode = /(html|body)/i.test(scroll[0].tagName);

			return {
				top:

				// The absolute mouse position
				pos.top +

				// Only for relative positioned nodes: Relative offset from element to offset parent
				this.offset.relative.top * mod +

				// The offsetParent's offset without borders (offset + border)
				this.offset.parent.top * mod - (this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : scrollIsRootNode ? 0 : scroll.scrollTop()) * mod,
				left:

				// The absolute mouse position
				pos.left +

				// Only for relative positioned nodes: Relative offset from element to offset parent
				this.offset.relative.left * mod +

				// The offsetParent's offset without borders (offset + border)
				this.offset.parent.left * mod - (this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft()) * mod
			};
		},

		_generatePosition: function (event) {

			var top,
			    left,
			    o = this.options,
			    pageX = event.pageX,
			    pageY = event.pageY,
			    scroll = this.cssPosition === "absolute" && !(this.scrollParent[0] !== this.document[0] && $.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
			    scrollIsRootNode = /(html|body)/i.test(scroll[0].tagName);

			// This is another very weird special case that only happens for relative elements:
			// 1. If the css position is relative
			// 2. and the scroll parent is the document or similar to the offset parent
			// we have to refresh the relative offset during the scroll so there are no jumps
			if (this.cssPosition === "relative" && !(this.scrollParent[0] !== this.document[0] && this.scrollParent[0] !== this.offsetParent[0])) {
				this.offset.relative = this._getRelativeOffset();
			}

			/*
    * - Position constraining -
    * Constrain the position to a mix of grid, containment.
    */

			if (this.originalPosition) {
				//If we are not dragging yet, we won't check for options

				if (this.containment) {
					if (event.pageX - this.offset.click.left < this.containment[0]) {
						pageX = this.containment[0] + this.offset.click.left;
					}
					if (event.pageY - this.offset.click.top < this.containment[1]) {
						pageY = this.containment[1] + this.offset.click.top;
					}
					if (event.pageX - this.offset.click.left > this.containment[2]) {
						pageX = this.containment[2] + this.offset.click.left;
					}
					if (event.pageY - this.offset.click.top > this.containment[3]) {
						pageY = this.containment[3] + this.offset.click.top;
					}
				}

				if (o.grid) {
					top = this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1];
					pageY = this.containment ? top - this.offset.click.top >= this.containment[1] && top - this.offset.click.top <= this.containment[3] ? top : top - this.offset.click.top >= this.containment[1] ? top - o.grid[1] : top + o.grid[1] : top;

					left = this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0];
					pageX = this.containment ? left - this.offset.click.left >= this.containment[0] && left - this.offset.click.left <= this.containment[2] ? left : left - this.offset.click.left >= this.containment[0] ? left - o.grid[0] : left + o.grid[0] : left;
				}
			}

			return {
				top:

				// The absolute mouse position
				pageY -

				// Click offset (relative to the element)
				this.offset.click.top -

				// Only for relative positioned nodes: Relative offset from element to offset parent
				this.offset.relative.top -

				// The offsetParent's offset without borders (offset + border)
				this.offset.parent.top + (this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : scrollIsRootNode ? 0 : scroll.scrollTop()),
				left:

				// The absolute mouse position
				pageX -

				// Click offset (relative to the element)
				this.offset.click.left -

				// Only for relative positioned nodes: Relative offset from element to offset parent
				this.offset.relative.left -

				// The offsetParent's offset without borders (offset + border)
				this.offset.parent.left + (this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft())
			};
		},

		_rearrange: function (event, i, a, hardRefresh) {

			a ? a[0].appendChild(this.placeholder[0]) : i.item[0].parentNode.insertBefore(this.placeholder[0], this.direction === "down" ? i.item[0] : i.item[0].nextSibling);

			//Various things done here to improve the performance:
			// 1. we create a setTimeout, that calls refreshPositions
			// 2. on the instance, we have a counter variable, that get's higher after every append
			// 3. on the local scope, we copy the counter variable, and check in the timeout,
			// if it's still the same
			// 4. this lets only the last addition to the timeout stack through
			this.counter = this.counter ? ++this.counter : 1;
			var counter = this.counter;

			this._delay(function () {
				if (counter === this.counter) {

					//Precompute after each DOM insertion, NOT on mousemove
					this.refreshPositions(!hardRefresh);
				}
			});
		},

		_clear: function (event, noPropagation) {

			this.reverting = false;

			// We delay all events that have to be triggered to after the point where the placeholder
			// has been removed and everything else normalized again
			var i,
			    delayedTriggers = [];

			// We first have to update the dom position of the actual currentItem
			// Note: don't do it if the current item is already removed (by a user), or it gets
			// reappended (see #4088)
			if (!this._noFinalSort && this.currentItem.parent().length) {
				this.placeholder.before(this.currentItem);
			}
			this._noFinalSort = null;

			if (this.helper[0] === this.currentItem[0]) {
				for (i in this._storedCSS) {
					if (this._storedCSS[i] === "auto" || this._storedCSS[i] === "static") {
						this._storedCSS[i] = "";
					}
				}
				this.currentItem.css(this._storedCSS);
				this._removeClass(this.currentItem, "ui-sortable-helper");
			} else {
				this.currentItem.show();
			}

			if (this.fromOutside && !noPropagation) {
				delayedTriggers.push(function (event) {
					this._trigger("receive", event, this._uiHash(this.fromOutside));
				});
			}
			if ((this.fromOutside || this.domPosition.prev !== this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent !== this.currentItem.parent()[0]) && !noPropagation) {

				// Trigger update callback if the DOM position has changed
				delayedTriggers.push(function (event) {
					this._trigger("update", event, this._uiHash());
				});
			}

			// Check if the items Container has Changed and trigger appropriate
			// events.
			if (this !== this.currentContainer) {
				if (!noPropagation) {
					delayedTriggers.push(function (event) {
						this._trigger("remove", event, this._uiHash());
					});
					delayedTriggers.push(function (c) {
						return function (event) {
							c._trigger("receive", event, this._uiHash(this));
						};
					}.call(this, this.currentContainer));
					delayedTriggers.push(function (c) {
						return function (event) {
							c._trigger("update", event, this._uiHash(this));
						};
					}.call(this, this.currentContainer));
				}
			}

			//Post events to containers
			function delayEvent(type, instance, container) {
				return function (event) {
					container._trigger(type, event, instance._uiHash(instance));
				};
			}
			for (i = this.containers.length - 1; i >= 0; i--) {
				if (!noPropagation) {
					delayedTriggers.push(delayEvent("deactivate", this, this.containers[i]));
				}
				if (this.containers[i].containerCache.over) {
					delayedTriggers.push(delayEvent("out", this, this.containers[i]));
					this.containers[i].containerCache.over = 0;
				}
			}

			//Do what was originally in plugins
			if (this.storedCursor) {
				this.document.find("body").css("cursor", this.storedCursor);
				this.storedStylesheet.remove();
			}
			if (this._storedOpacity) {
				this.helper.css("opacity", this._storedOpacity);
			}
			if (this._storedZIndex) {
				this.helper.css("zIndex", this._storedZIndex === "auto" ? "" : this._storedZIndex);
			}

			this.dragging = false;

			if (!noPropagation) {
				this._trigger("beforeStop", event, this._uiHash());
			}

			//$(this.placeholder[0]).remove(); would have been the jQuery way - unfortunately,
			// it unbinds ALL events from the original node!
			this.placeholder[0].parentNode.removeChild(this.placeholder[0]);

			if (!this.cancelHelperRemoval) {
				if (this.helper[0] !== this.currentItem[0]) {
					this.helper.remove();
				}
				this.helper = null;
			}

			if (!noPropagation) {
				for (i = 0; i < delayedTriggers.length; i++) {

					// Trigger all delayed events
					delayedTriggers[i].call(this, event);
				}
				this._trigger("stop", event, this._uiHash());
			}

			this.fromOutside = false;
			return !this.cancelHelperRemoval;
		},

		_trigger: function () {
			if ($.Widget.prototype._trigger.apply(this, arguments) === false) {
				this.cancel();
			}
		},

		_uiHash: function (_inst) {
			var inst = _inst || this;
			return {
				helper: inst.helper,
				placeholder: inst.placeholder || $([]),
				position: inst.position,
				originalPosition: inst.originalPosition,
				offset: inst.positionAbs,
				item: inst.currentItem,
				sender: _inst ? _inst.element : null
			};
		}

	});
});
System.registerDynamic('npm:bootstrap-table@1.11.2/dist/bootstrap-table.js', [], false, function ($__require, $__exports, $__module) {
    var _retrieveGlobal = System.registry.get("@@global-helpers").prepareGlobal($__module.id, null, {});

    (function ($__global) {
        /**
         * @author zhixin wen <wenzhixin2010@gmail.com>
         * version: 1.11.1
         * https://github.com/wenzhixin/bootstrap-table/
         */

        (function ($) {
            'use strict';

            // TOOLS DEFINITION
            // ======================

            var cachedWidth = null;

            // it only does '%s', and return '' when arguments are undefined
            var sprintf = function (str) {
                var args = arguments,
                    flag = true,
                    i = 1;

                str = str.replace(/%s/g, function () {
                    var arg = args[i++];

                    if (typeof arg === 'undefined') {
                        flag = false;
                        return '';
                    }
                    return arg;
                });
                return flag ? str : '';
            };

            var getPropertyFromOther = function (list, from, to, value) {
                var result = '';
                $.each(list, function (i, item) {
                    if (item[from] === value) {
                        result = item[to];
                        return false;
                    }
                    return true;
                });
                return result;
            };

            var getFieldIndex = function (columns, field) {
                var index = -1;

                $.each(columns, function (i, column) {
                    if (column.field === field) {
                        index = i;
                        return false;
                    }
                    return true;
                });
                return index;
            };

            // http://jsfiddle.net/wenyi/47nz7ez9/3/
            var setFieldIndex = function (columns) {
                var i,
                    j,
                    k,
                    totalCol = 0,
                    flag = [];

                for (i = 0; i < columns[0].length; i++) {
                    totalCol += columns[0][i].colspan || 1;
                }

                for (i = 0; i < columns.length; i++) {
                    flag[i] = [];
                    for (j = 0; j < totalCol; j++) {
                        flag[i][j] = false;
                    }
                }

                for (i = 0; i < columns.length; i++) {
                    for (j = 0; j < columns[i].length; j++) {
                        var r = columns[i][j],
                            rowspan = r.rowspan || 1,
                            colspan = r.colspan || 1,
                            index = $.inArray(false, flag[i]);

                        if (colspan === 1) {
                            r.fieldIndex = index;
                            // when field is undefined, use index instead
                            if (typeof r.field === 'undefined') {
                                r.field = index;
                            }
                        }

                        for (k = 0; k < rowspan; k++) {
                            flag[i + k][index] = true;
                        }
                        for (k = 0; k < colspan; k++) {
                            flag[i][index + k] = true;
                        }
                    }
                }
            };

            var getScrollBarWidth = function () {
                if (cachedWidth === null) {
                    var inner = $('<p/>').addClass('fixed-table-scroll-inner'),
                        outer = $('<div/>').addClass('fixed-table-scroll-outer'),
                        w1,
                        w2;

                    outer.append(inner);
                    $('body').append(outer);

                    w1 = inner[0].offsetWidth;
                    outer.css('overflow', 'scroll');
                    w2 = inner[0].offsetWidth;

                    if (w1 === w2) {
                        w2 = outer[0].clientWidth;
                    }

                    outer.remove();
                    cachedWidth = w1 - w2;
                }
                return cachedWidth;
            };

            var calculateObjectValue = function (self, name, args, defaultValue) {
                var func = name;

                if (typeof name === 'string') {
                    // support obj.func1.func2
                    var names = name.split('.');

                    if (names.length > 1) {
                        func = window;
                        $.each(names, function (i, f) {
                            func = func[f];
                        });
                    } else {
                        func = window[name];
                    }
                }
                if (typeof func === 'object') {
                    return func;
                }
                if (typeof func === 'function') {
                    return func.apply(self, args || []);
                }
                if (!func && typeof name === 'string' && sprintf.apply(this, [name].concat(args))) {
                    return sprintf.apply(this, [name].concat(args));
                }
                return defaultValue;
            };

            var compareObjects = function (objectA, objectB, compareLength) {
                // Create arrays of property names
                var objectAProperties = Object.getOwnPropertyNames(objectA),
                    objectBProperties = Object.getOwnPropertyNames(objectB),
                    propName = '';

                if (compareLength) {
                    // If number of properties is different, objects are not equivalent
                    if (objectAProperties.length !== objectBProperties.length) {
                        return false;
                    }
                }

                for (var i = 0; i < objectAProperties.length; i++) {
                    propName = objectAProperties[i];

                    // If the property is not in the object B properties, continue with the next property
                    if ($.inArray(propName, objectBProperties) > -1) {
                        // If values of same property are not equal, objects are not equivalent
                        if (objectA[propName] !== objectB[propName]) {
                            return false;
                        }
                    }
                }

                // If we made it this far, objects are considered equivalent
                return true;
            };

            var escapeHTML = function (text) {
                if (typeof text === 'string') {
                    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;').replace(/`/g, '&#x60;');
                }
                return text;
            };

            var getRealDataAttr = function (dataAttr) {
                for (var attr in dataAttr) {
                    var auxAttr = attr.split(/(?=[A-Z])/).join('-').toLowerCase();
                    if (auxAttr !== attr) {
                        dataAttr[auxAttr] = dataAttr[attr];
                        delete dataAttr[attr];
                    }
                }

                return dataAttr;
            };

            var getItemField = function (item, field, escape) {
                var value = item;

                if (typeof field !== 'string' || item.hasOwnProperty(field)) {
                    return escape ? escapeHTML(item[field]) : item[field];
                }
                var props = field.split('.');
                for (var p in props) {
                    if (props.hasOwnProperty(p)) {
                        value = value && value[props[p]];
                    }
                }
                return escape ? escapeHTML(value) : value;
            };

            var isIEBrowser = function () {
                return !!(navigator.userAgent.indexOf("MSIE ") > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./));
            };

            var objectKeys = function () {
                // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
                if (!Object.keys) {
                    Object.keys = function () {
                        var hasOwnProperty = Object.prototype.hasOwnProperty,
                            hasDontEnumBug = !{ toString: null }.propertyIsEnumerable('toString'),
                            dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'],
                            dontEnumsLength = dontEnums.length;

                        return function (obj) {
                            if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
                                throw new TypeError('Object.keys called on non-object');
                            }

                            var result = [],
                                prop,
                                i;

                            for (prop in obj) {
                                if (hasOwnProperty.call(obj, prop)) {
                                    result.push(prop);
                                }
                            }

                            if (hasDontEnumBug) {
                                for (i = 0; i < dontEnumsLength; i++) {
                                    if (hasOwnProperty.call(obj, dontEnums[i])) {
                                        result.push(dontEnums[i]);
                                    }
                                }
                            }
                            return result;
                        };
                    }();
                }
            };

            // BOOTSTRAP TABLE CLASS DEFINITION
            // ======================

            var BootstrapTable = function (el, options) {
                this.options = options;
                this.$el = $(el);
                this.$el_ = this.$el.clone();
                this.timeoutId_ = 0;
                this.timeoutFooter_ = 0;

                this.init();
            };

            BootstrapTable.DEFAULTS = {
                classes: 'table table-hover',
                sortClass: undefined,
                locale: undefined,
                height: undefined,
                undefinedText: '-',
                sortName: undefined,
                sortOrder: 'asc',
                sortStable: false,
                striped: false,
                columns: [[]],
                data: [],
                totalField: 'total',
                dataField: 'rows',
                method: 'get',
                url: undefined,
                ajax: undefined,
                cache: true,
                contentType: 'application/json',
                dataType: 'json',
                ajaxOptions: {},
                queryParams: function (params) {
                    return params;
                },
                queryParamsType: 'limit', // undefined
                responseHandler: function (res) {
                    return res;
                },
                pagination: false,
                onlyInfoPagination: false,
                paginationLoop: true,
                sidePagination: 'client', // client or server
                totalRows: 0, // server side need to set
                pageNumber: 1,
                pageSize: 10,
                pageList: [10, 25, 50, 100],
                paginationHAlign: 'right', //right, left
                paginationVAlign: 'bottom', //bottom, top, both
                paginationDetailHAlign: 'left', //right, left
                paginationPreText: '&lsaquo;',
                paginationNextText: '&rsaquo;',
                search: false,
                searchOnEnterKey: false,
                strictSearch: false,
                searchAlign: 'right',
                selectItemName: 'btSelectItem',
                showHeader: true,
                showFooter: false,
                showColumns: false,
                showPaginationSwitch: false,
                showRefresh: false,
                showToggle: false,
                buttonsAlign: 'right',
                smartDisplay: true,
                escape: false,
                minimumCountColumns: 1,
                idField: undefined,
                uniqueId: undefined,
                cardView: false,
                detailView: false,
                detailFormatter: function (index, row) {
                    return '';
                },
                trimOnSearch: true,
                clickToSelect: false,
                singleSelect: false,
                toolbar: undefined,
                toolbarAlign: 'left',
                checkboxHeader: true,
                sortable: true,
                silentSort: true,
                maintainSelected: false,
                searchTimeOut: 500,
                searchText: '',
                iconSize: undefined,
                buttonsClass: 'default',
                iconsPrefix: 'glyphicon', // glyphicon of fa (font awesome)
                icons: {
                    paginationSwitchDown: 'glyphicon-collapse-down icon-chevron-down',
                    paginationSwitchUp: 'glyphicon-collapse-up icon-chevron-up',
                    refresh: 'glyphicon-refresh icon-refresh',
                    toggle: 'glyphicon-list-alt icon-list-alt',
                    columns: 'glyphicon-th icon-th',
                    detailOpen: 'glyphicon-plus icon-plus',
                    detailClose: 'glyphicon-minus icon-minus'
                },

                customSearch: $.noop,

                customSort: $.noop,

                rowStyle: function (row, index) {
                    return {};
                },

                rowAttributes: function (row, index) {
                    return {};
                },

                footerStyle: function (row, index) {
                    return {};
                },

                onAll: function (name, args) {
                    return false;
                },
                onClickCell: function (field, value, row, $element) {
                    return false;
                },
                onDblClickCell: function (field, value, row, $element) {
                    return false;
                },
                onClickRow: function (item, $element) {
                    return false;
                },
                onDblClickRow: function (item, $element) {
                    return false;
                },
                onSort: function (name, order) {
                    return false;
                },
                onCheck: function (row) {
                    return false;
                },
                onUncheck: function (row) {
                    return false;
                },
                onCheckAll: function (rows) {
                    return false;
                },
                onUncheckAll: function (rows) {
                    return false;
                },
                onCheckSome: function (rows) {
                    return false;
                },
                onUncheckSome: function (rows) {
                    return false;
                },
                onLoadSuccess: function (data) {
                    return false;
                },
                onLoadError: function (status) {
                    return false;
                },
                onColumnSwitch: function (field, checked) {
                    return false;
                },
                onPageChange: function (number, size) {
                    return false;
                },
                onSearch: function (text) {
                    return false;
                },
                onToggle: function (cardView) {
                    return false;
                },
                onPreBody: function (data) {
                    return false;
                },
                onPostBody: function () {
                    return false;
                },
                onPostHeader: function () {
                    return false;
                },
                onExpandRow: function (index, row, $detail) {
                    return false;
                },
                onCollapseRow: function (index, row) {
                    return false;
                },
                onRefreshOptions: function (options) {
                    return false;
                },
                onRefresh: function (params) {
                    return false;
                },
                onResetView: function () {
                    return false;
                }
            };

            BootstrapTable.LOCALES = {};

            BootstrapTable.LOCALES['en-US'] = BootstrapTable.LOCALES.en = {
                formatLoadingMessage: function () {
                    return 'Loading, please wait...';
                },
                formatRecordsPerPage: function (pageNumber) {
                    return sprintf('%s rows per page', pageNumber);
                },
                formatShowingRows: function (pageFrom, pageTo, totalRows) {
                    return sprintf('Showing %s to %s of %s rows', pageFrom, pageTo, totalRows);
                },
                formatDetailPagination: function (totalRows) {
                    return sprintf('Showing %s rows', totalRows);
                },
                formatSearch: function () {
                    return 'Search';
                },
                formatNoMatches: function () {
                    return 'No matching records found';
                },
                formatPaginationSwitch: function () {
                    return 'Hide/Show pagination';
                },
                formatRefresh: function () {
                    return 'Refresh';
                },
                formatToggle: function () {
                    return 'Toggle';
                },
                formatColumns: function () {
                    return 'Columns';
                },
                formatAllRows: function () {
                    return 'All';
                }
            };

            $.extend(BootstrapTable.DEFAULTS, BootstrapTable.LOCALES['en-US']);

            BootstrapTable.COLUMN_DEFAULTS = {
                radio: false,
                checkbox: false,
                checkboxEnabled: true,
                field: undefined,
                title: undefined,
                titleTooltip: undefined,
                'class': undefined,
                align: undefined, // left, right, center
                halign: undefined, // left, right, center
                falign: undefined, // left, right, center
                valign: undefined, // top, middle, bottom
                width: undefined,
                sortable: false,
                order: 'asc', // asc, desc
                visible: true,
                switchable: true,
                clickToSelect: true,
                formatter: undefined,
                footerFormatter: undefined,
                events: undefined,
                sorter: undefined,
                sortName: undefined,
                cellStyle: undefined,
                searchable: true,
                searchFormatter: true,
                cardVisible: true,
                escape: false
            };

            BootstrapTable.EVENTS = {
                'all.bs.table': 'onAll',
                'click-cell.bs.table': 'onClickCell',
                'dbl-click-cell.bs.table': 'onDblClickCell',
                'click-row.bs.table': 'onClickRow',
                'dbl-click-row.bs.table': 'onDblClickRow',
                'sort.bs.table': 'onSort',
                'check.bs.table': 'onCheck',
                'uncheck.bs.table': 'onUncheck',
                'check-all.bs.table': 'onCheckAll',
                'uncheck-all.bs.table': 'onUncheckAll',
                'check-some.bs.table': 'onCheckSome',
                'uncheck-some.bs.table': 'onUncheckSome',
                'load-success.bs.table': 'onLoadSuccess',
                'load-error.bs.table': 'onLoadError',
                'column-switch.bs.table': 'onColumnSwitch',
                'page-change.bs.table': 'onPageChange',
                'search.bs.table': 'onSearch',
                'toggle.bs.table': 'onToggle',
                'pre-body.bs.table': 'onPreBody',
                'post-body.bs.table': 'onPostBody',
                'post-header.bs.table': 'onPostHeader',
                'expand-row.bs.table': 'onExpandRow',
                'collapse-row.bs.table': 'onCollapseRow',
                'refresh-options.bs.table': 'onRefreshOptions',
                'reset-view.bs.table': 'onResetView',
                'refresh.bs.table': 'onRefresh'
            };

            BootstrapTable.prototype.init = function () {
                this.initLocale();
                this.initContainer();
                this.initTable();
                this.initHeader();
                this.initData();
                this.initHiddenRows();
                this.initFooter();
                this.initToolbar();
                this.initPagination();
                this.initBody();
                this.initSearchText();
                this.initServer();
            };

            BootstrapTable.prototype.initLocale = function () {
                if (this.options.locale) {
                    var parts = this.options.locale.split(/-|_/);
                    parts[0].toLowerCase();
                    if (parts[1]) parts[1].toUpperCase();
                    if ($.fn.bootstrapTable.locales[this.options.locale]) {
                        // locale as requested
                        $.extend(this.options, $.fn.bootstrapTable.locales[this.options.locale]);
                    } else if ($.fn.bootstrapTable.locales[parts.join('-')]) {
                        // locale with sep set to - (in case original was specified with _)
                        $.extend(this.options, $.fn.bootstrapTable.locales[parts.join('-')]);
                    } else if ($.fn.bootstrapTable.locales[parts[0]]) {
                        // short locale language code (i.e. 'en')
                        $.extend(this.options, $.fn.bootstrapTable.locales[parts[0]]);
                    }
                }
            };

            BootstrapTable.prototype.initContainer = function () {
                this.$container = $(['<div class="bootstrap-table">', '<div class="fixed-table-toolbar"></div>', this.options.paginationVAlign === 'top' || this.options.paginationVAlign === 'both' ? '<div class="fixed-table-pagination" style="clear: both;"></div>' : '', '<div class="fixed-table-container">', '<div class="fixed-table-header"><table></table></div>', '<div class="fixed-table-body">', '<div class="fixed-table-loading">', this.options.formatLoadingMessage(), '</div>', '</div>', '<div class="fixed-table-footer"><table><tr></tr></table></div>', this.options.paginationVAlign === 'bottom' || this.options.paginationVAlign === 'both' ? '<div class="fixed-table-pagination"></div>' : '', '</div>', '</div>'].join(''));

                this.$container.insertAfter(this.$el);
                this.$tableContainer = this.$container.find('.fixed-table-container');
                this.$tableHeader = this.$container.find('.fixed-table-header');
                this.$tableBody = this.$container.find('.fixed-table-body');
                this.$tableLoading = this.$container.find('.fixed-table-loading');
                this.$tableFooter = this.$container.find('.fixed-table-footer');
                this.$toolbar = this.$container.find('.fixed-table-toolbar');
                this.$pagination = this.$container.find('.fixed-table-pagination');

                this.$tableBody.append(this.$el);
                this.$container.after('<div class="clearfix"></div>');

                this.$el.addClass(this.options.classes);
                if (this.options.striped) {
                    this.$el.addClass('table-striped');
                }
                if ($.inArray('table-no-bordered', this.options.classes.split(' ')) !== -1) {
                    this.$tableContainer.addClass('table-no-bordered');
                }
            };

            BootstrapTable.prototype.initTable = function () {
                var that = this,
                    columns = [],
                    data = [];

                this.$header = this.$el.find('>thead');
                if (!this.$header.length) {
                    this.$header = $('<thead></thead>').appendTo(this.$el);
                }
                this.$header.find('tr').each(function () {
                    var column = [];

                    $(this).find('th').each(function () {
                        // Fix #2014 - getFieldIndex and elsewhere assume this is string, causes issues if not
                        if (typeof $(this).data('field') !== 'undefined') {
                            $(this).data('field', $(this).data('field') + '');
                        }
                        column.push($.extend({}, {
                            title: $(this).html(),
                            'class': $(this).attr('class'),
                            titleTooltip: $(this).attr('title'),
                            rowspan: $(this).attr('rowspan') ? +$(this).attr('rowspan') : undefined,
                            colspan: $(this).attr('colspan') ? +$(this).attr('colspan') : undefined
                        }, $(this).data()));
                    });
                    columns.push(column);
                });
                if (!$.isArray(this.options.columns[0])) {
                    this.options.columns = [this.options.columns];
                }
                this.options.columns = $.extend(true, [], columns, this.options.columns);
                this.columns = [];

                setFieldIndex(this.options.columns);
                $.each(this.options.columns, function (i, columns) {
                    $.each(columns, function (j, column) {
                        column = $.extend({}, BootstrapTable.COLUMN_DEFAULTS, column);

                        if (typeof column.fieldIndex !== 'undefined') {
                            that.columns[column.fieldIndex] = column;
                        }

                        that.options.columns[i][j] = column;
                    });
                });

                // if options.data is setting, do not process tbody data
                if (this.options.data.length) {
                    return;
                }

                var m = [];
                this.$el.find('>tbody>tr').each(function (y) {
                    var row = {};

                    // save tr's id, class and data-* attributes
                    row._id = $(this).attr('id');
                    row._class = $(this).attr('class');
                    row._data = getRealDataAttr($(this).data());

                    $(this).find('>td').each(function (x) {
                        var $this = $(this),
                            cspan = +$this.attr('colspan') || 1,
                            rspan = +$this.attr('rowspan') || 1,
                            tx,
                            ty;

                        for (; m[y] && m[y][x]; x++); //skip already occupied cells in current row

                        for (tx = x; tx < x + cspan; tx++) {
                            //mark matrix elements occupied by current cell with true
                            for (ty = y; ty < y + rspan; ty++) {
                                if (!m[ty]) {
                                    //fill missing rows
                                    m[ty] = [];
                                }
                                m[ty][tx] = true;
                            }
                        }

                        var field = that.columns[x].field;

                        row[field] = $(this).html();
                        // save td's id, class and data-* attributes
                        row['_' + field + '_id'] = $(this).attr('id');
                        row['_' + field + '_class'] = $(this).attr('class');
                        row['_' + field + '_rowspan'] = $(this).attr('rowspan');
                        row['_' + field + '_colspan'] = $(this).attr('colspan');
                        row['_' + field + '_title'] = $(this).attr('title');
                        row['_' + field + '_data'] = getRealDataAttr($(this).data());
                    });
                    data.push(row);
                });
                this.options.data = data;
                if (data.length) this.fromHtml = true;
            };

            BootstrapTable.prototype.initHeader = function () {
                var that = this,
                    visibleColumns = {},
                    html = [];

                this.header = {
                    fields: [],
                    styles: [],
                    classes: [],
                    formatters: [],
                    events: [],
                    sorters: [],
                    sortNames: [],
                    cellStyles: [],
                    searchables: []
                };

                $.each(this.options.columns, function (i, columns) {
                    html.push('<tr>');

                    if (i === 0 && !that.options.cardView && that.options.detailView) {
                        html.push(sprintf('<th class="detail" rowspan="%s"><div class="fht-cell"></div></th>', that.options.columns.length));
                    }

                    $.each(columns, function (j, column) {
                        var text = '',
                            halign = '',
                            // header align style
                        align = '',
                            // body align style
                        style = '',
                            class_ = sprintf(' class="%s"', column['class']),
                            order = that.options.sortOrder || column.order,
                            unitWidth = 'px',
                            width = column.width;

                        if (column.width !== undefined && !that.options.cardView) {
                            if (typeof column.width === 'string') {
                                if (column.width.indexOf('%') !== -1) {
                                    unitWidth = '%';
                                }
                            }
                        }
                        if (column.width && typeof column.width === 'string') {
                            width = column.width.replace('%', '').replace('px', '');
                        }

                        halign = sprintf('text-align: %s; ', column.halign ? column.halign : column.align);
                        align = sprintf('text-align: %s; ', column.align);
                        style = sprintf('vertical-align: %s; ', column.valign);
                        style += sprintf('width: %s; ', (column.checkbox || column.radio) && !width ? '36px' : width ? width + unitWidth : undefined);

                        if (typeof column.fieldIndex !== 'undefined') {
                            that.header.fields[column.fieldIndex] = column.field;
                            that.header.styles[column.fieldIndex] = align + style;
                            that.header.classes[column.fieldIndex] = class_;
                            that.header.formatters[column.fieldIndex] = column.formatter;
                            that.header.events[column.fieldIndex] = column.events;
                            that.header.sorters[column.fieldIndex] = column.sorter;
                            that.header.sortNames[column.fieldIndex] = column.sortName;
                            that.header.cellStyles[column.fieldIndex] = column.cellStyle;
                            that.header.searchables[column.fieldIndex] = column.searchable;

                            if (!column.visible) {
                                return;
                            }

                            if (that.options.cardView && !column.cardVisible) {
                                return;
                            }

                            visibleColumns[column.field] = column;
                        }

                        html.push('<th' + sprintf(' title="%s"', column.titleTooltip), column.checkbox || column.radio ? sprintf(' class="bs-checkbox %s"', column['class'] || '') : class_, sprintf(' style="%s"', halign + style), sprintf(' rowspan="%s"', column.rowspan), sprintf(' colspan="%s"', column.colspan), sprintf(' data-field="%s"', column.field), '>');

                        html.push(sprintf('<div class="th-inner %s">', that.options.sortable && column.sortable ? 'sortable both' : ''));

                        text = that.options.escape ? escapeHTML(column.title) : column.title;

                        if (column.checkbox) {
                            if (!that.options.singleSelect && that.options.checkboxHeader) {
                                text = '<input name="btSelectAll" type="checkbox" />';
                            }
                            that.header.stateField = column.field;
                        }
                        if (column.radio) {
                            text = '';
                            that.header.stateField = column.field;
                            that.options.singleSelect = true;
                        }

                        html.push(text);
                        html.push('</div>');
                        html.push('<div class="fht-cell"></div>');
                        html.push('</div>');
                        html.push('</th>');
                    });
                    html.push('</tr>');
                });

                this.$header.html(html.join(''));
                this.$header.find('th[data-field]').each(function (i) {
                    $(this).data(visibleColumns[$(this).data('field')]);
                });
                this.$container.off('click', '.th-inner').on('click', '.th-inner', function (event) {
                    var target = $(this);

                    if (that.options.detailView) {
                        if (target.closest('.bootstrap-table')[0] !== that.$container[0]) return false;
                    }

                    if (that.options.sortable && target.parent().data().sortable) {
                        that.onSort(event);
                    }
                });

                this.$header.children().children().off('keypress').on('keypress', function (event) {
                    if (that.options.sortable && $(this).data().sortable) {
                        var code = event.keyCode || event.which;
                        if (code == 13) {
                            //Enter keycode
                            that.onSort(event);
                        }
                    }
                });

                $(window).off('resize.bootstrap-table');
                if (!this.options.showHeader || this.options.cardView) {
                    this.$header.hide();
                    this.$tableHeader.hide();
                    this.$tableLoading.css('top', 0);
                } else {
                    this.$header.show();
                    this.$tableHeader.show();
                    this.$tableLoading.css('top', this.$header.outerHeight() + 1);
                    // Assign the correct sortable arrow
                    this.getCaret();
                    $(window).on('resize.bootstrap-table', $.proxy(this.resetWidth, this));
                }

                this.$selectAll = this.$header.find('[name="btSelectAll"]');
                this.$selectAll.off('click').on('click', function () {
                    var checked = $(this).prop('checked');
                    that[checked ? 'checkAll' : 'uncheckAll']();
                    that.updateSelected();
                });
            };

            BootstrapTable.prototype.initFooter = function () {
                if (!this.options.showFooter || this.options.cardView) {
                    this.$tableFooter.hide();
                } else {
                    this.$tableFooter.show();
                }
            };

            /**
             * @param data
             * @param type: append / prepend
             */
            BootstrapTable.prototype.initData = function (data, type) {
                if (type === 'append') {
                    this.data = this.data.concat(data);
                } else if (type === 'prepend') {
                    this.data = [].concat(data).concat(this.data);
                } else {
                    this.data = data || this.options.data;
                }

                // Fix #839 Records deleted when adding new row on filtered table
                if (type === 'append') {
                    this.options.data = this.options.data.concat(data);
                } else if (type === 'prepend') {
                    this.options.data = [].concat(data).concat(this.options.data);
                } else {
                    this.options.data = this.data;
                }

                if (this.options.sidePagination === 'server') {
                    return;
                }
                this.initSort();
            };

            BootstrapTable.prototype.initSort = function () {
                var that = this,
                    name = this.options.sortName,
                    order = this.options.sortOrder === 'desc' ? -1 : 1,
                    index = $.inArray(this.options.sortName, this.header.fields),
                    timeoutId = 0;

                if (this.options.customSort !== $.noop) {
                    this.options.customSort.apply(this, [this.options.sortName, this.options.sortOrder]);
                    return;
                }

                if (index !== -1) {
                    if (this.options.sortStable) {
                        $.each(this.data, function (i, row) {
                            if (!row.hasOwnProperty('_position')) row._position = i;
                        });
                    }

                    this.data.sort(function (a, b) {
                        if (that.header.sortNames[index]) {
                            name = that.header.sortNames[index];
                        }
                        var aa = getItemField(a, name, that.options.escape),
                            bb = getItemField(b, name, that.options.escape),
                            value = calculateObjectValue(that.header, that.header.sorters[index], [aa, bb]);

                        if (value !== undefined) {
                            return order * value;
                        }

                        // Fix #161: undefined or null string sort bug.
                        if (aa === undefined || aa === null) {
                            aa = '';
                        }
                        if (bb === undefined || bb === null) {
                            bb = '';
                        }

                        if (that.options.sortStable && aa === bb) {
                            aa = a._position;
                            bb = b._position;
                        }

                        // IF both values are numeric, do a numeric comparison
                        if ($.isNumeric(aa) && $.isNumeric(bb)) {
                            // Convert numerical values form string to float.
                            aa = parseFloat(aa);
                            bb = parseFloat(bb);
                            if (aa < bb) {
                                return order * -1;
                            }
                            return order;
                        }

                        if (aa === bb) {
                            return 0;
                        }

                        // If value is not a string, convert to string
                        if (typeof aa !== 'string') {
                            aa = aa.toString();
                        }

                        if (aa.localeCompare(bb) === -1) {
                            return order * -1;
                        }

                        return order;
                    });

                    if (this.options.sortClass !== undefined) {
                        clearTimeout(timeoutId);
                        timeoutId = setTimeout(function () {
                            that.$el.removeClass(that.options.sortClass);
                            var index = that.$header.find(sprintf('[data-field="%s"]', that.options.sortName).index() + 1);
                            that.$el.find(sprintf('tr td:nth-child(%s)', index)).addClass(that.options.sortClass);
                        }, 250);
                    }
                }
            };

            BootstrapTable.prototype.onSort = function (event) {
                var $this = event.type === "keypress" ? $(event.currentTarget) : $(event.currentTarget).parent(),
                    $this_ = this.$header.find('th').eq($this.index());

                this.$header.add(this.$header_).find('span.order').remove();

                if (this.options.sortName === $this.data('field')) {
                    this.options.sortOrder = this.options.sortOrder === 'asc' ? 'desc' : 'asc';
                } else {
                    this.options.sortName = $this.data('field');
                    this.options.sortOrder = $this.data('order') === 'asc' ? 'desc' : 'asc';
                }
                this.trigger('sort', this.options.sortName, this.options.sortOrder);

                $this.add($this_).data('order', this.options.sortOrder);

                // Assign the correct sortable arrow
                this.getCaret();

                if (this.options.sidePagination === 'server') {
                    this.initServer(this.options.silentSort);
                    return;
                }

                this.initSort();
                this.initBody();
            };

            BootstrapTable.prototype.initToolbar = function () {
                var that = this,
                    html = [],
                    timeoutId = 0,
                    $keepOpen,
                    $search,
                    switchableCount = 0;

                if (this.$toolbar.find('.bs-bars').children().length) {
                    $('body').append($(this.options.toolbar));
                }
                this.$toolbar.html('');

                if (typeof this.options.toolbar === 'string' || typeof this.options.toolbar === 'object') {
                    $(sprintf('<div class="bs-bars pull-%s"></div>', this.options.toolbarAlign)).appendTo(this.$toolbar).append($(this.options.toolbar));
                }

                // showColumns, showToggle, showRefresh
                html = [sprintf('<div class="columns columns-%s btn-group pull-%s">', this.options.buttonsAlign, this.options.buttonsAlign)];

                if (typeof this.options.icons === 'string') {
                    this.options.icons = calculateObjectValue(null, this.options.icons);
                }

                if (this.options.showPaginationSwitch) {
                    html.push(sprintf('<button class="btn' + sprintf(' btn-%s', this.options.buttonsClass) + sprintf(' btn-%s', this.options.iconSize) + '" type="button" name="paginationSwitch" aria-label="pagination Switch" title="%s">', this.options.formatPaginationSwitch()), sprintf('<i class="%s %s"></i>', this.options.iconsPrefix, this.options.icons.paginationSwitchDown), '</button>');
                }

                if (this.options.showRefresh) {
                    html.push(sprintf('<button class="btn' + sprintf(' btn-%s', this.options.buttonsClass) + sprintf(' btn-%s', this.options.iconSize) + '" type="button" name="refresh" aria-label="refresh" title="%s">', this.options.formatRefresh()), sprintf('<i class="%s %s"></i>', this.options.iconsPrefix, this.options.icons.refresh), '</button>');
                }

                if (this.options.showToggle) {
                    html.push(sprintf('<button class="btn' + sprintf(' btn-%s', this.options.buttonsClass) + sprintf(' btn-%s', this.options.iconSize) + '" type="button" name="toggle" aria-label="toggle" title="%s">', this.options.formatToggle()), sprintf('<i class="%s %s"></i>', this.options.iconsPrefix, this.options.icons.toggle), '</button>');
                }

                if (this.options.showColumns) {
                    html.push(sprintf('<div class="keep-open btn-group" title="%s">', this.options.formatColumns()), '<button type="button" aria-label="columns" class="btn' + sprintf(' btn-%s', this.options.buttonsClass) + sprintf(' btn-%s', this.options.iconSize) + ' dropdown-toggle" data-toggle="dropdown">', sprintf('<i class="%s %s"></i>', this.options.iconsPrefix, this.options.icons.columns), ' <span class="caret"></span>', '</button>', '<ul class="dropdown-menu" role="menu">');

                    $.each(this.columns, function (i, column) {
                        if (column.radio || column.checkbox) {
                            return;
                        }

                        if (that.options.cardView && !column.cardVisible) {
                            return;
                        }

                        var checked = column.visible ? ' checked="checked"' : '';

                        if (column.switchable) {
                            html.push(sprintf('<li role="menuitem">' + '<label><input type="checkbox" data-field="%s" value="%s"%s> %s</label>' + '</li>', column.field, i, checked, column.title));
                            switchableCount++;
                        }
                    });
                    html.push('</ul>', '</div>');
                }

                html.push('</div>');

                // Fix #188: this.showToolbar is for extensions
                if (this.showToolbar || html.length > 2) {
                    this.$toolbar.append(html.join(''));
                }

                if (this.options.showPaginationSwitch) {
                    this.$toolbar.find('button[name="paginationSwitch"]').off('click').on('click', $.proxy(this.togglePagination, this));
                }

                if (this.options.showRefresh) {
                    this.$toolbar.find('button[name="refresh"]').off('click').on('click', $.proxy(this.refresh, this));
                }

                if (this.options.showToggle) {
                    this.$toolbar.find('button[name="toggle"]').off('click').on('click', function () {
                        that.toggleView();
                    });
                }

                if (this.options.showColumns) {
                    $keepOpen = this.$toolbar.find('.keep-open');

                    if (switchableCount <= this.options.minimumCountColumns) {
                        $keepOpen.find('input').prop('disabled', true);
                    }

                    $keepOpen.find('li').off('click').on('click', function (event) {
                        event.stopImmediatePropagation();
                    });
                    $keepOpen.find('input').off('click').on('click', function () {
                        var $this = $(this);

                        that.toggleColumn($(this).val(), $this.prop('checked'), false);
                        that.trigger('column-switch', $(this).data('field'), $this.prop('checked'));
                    });
                }

                if (this.options.search) {
                    html = [];
                    html.push('<div class="pull-' + this.options.searchAlign + ' search">', sprintf('<input class="form-control' + sprintf(' input-%s', this.options.iconSize) + '" type="text" placeholder="%s">', this.options.formatSearch()), '</div>');

                    this.$toolbar.append(html.join(''));
                    $search = this.$toolbar.find('.search input');
                    $search.off('keyup drop blur').on('keyup drop blur', function (event) {
                        if (that.options.searchOnEnterKey && event.keyCode !== 13) {
                            return;
                        }

                        if ($.inArray(event.keyCode, [37, 38, 39, 40]) > -1) {
                            return;
                        }

                        clearTimeout(timeoutId); // doesn't matter if it's 0
                        timeoutId = setTimeout(function () {
                            that.onSearch(event);
                        }, that.options.searchTimeOut);
                    });

                    if (isIEBrowser()) {
                        $search.off('mouseup').on('mouseup', function (event) {
                            clearTimeout(timeoutId); // doesn't matter if it's 0
                            timeoutId = setTimeout(function () {
                                that.onSearch(event);
                            }, that.options.searchTimeOut);
                        });
                    }
                }
            };

            BootstrapTable.prototype.onSearch = function (event) {
                var text = $.trim($(event.currentTarget).val());

                // trim search input
                if (this.options.trimOnSearch && $(event.currentTarget).val() !== text) {
                    $(event.currentTarget).val(text);
                }

                if (text === this.searchText) {
                    return;
                }
                this.searchText = text;
                this.options.searchText = text;

                this.options.pageNumber = 1;
                this.initSearch();
                this.updatePagination();
                this.trigger('search', text);
            };

            BootstrapTable.prototype.initSearch = function () {
                var that = this;

                if (this.options.sidePagination !== 'server') {
                    if (this.options.customSearch !== $.noop) {
                        this.options.customSearch.apply(this, [this.searchText]);
                        return;
                    }

                    var s = this.searchText && (this.options.escape ? escapeHTML(this.searchText) : this.searchText).toLowerCase();
                    var f = $.isEmptyObject(this.filterColumns) ? null : this.filterColumns;

                    // Check filter
                    this.data = f ? $.grep(this.options.data, function (item, i) {
                        for (var key in f) {
                            if ($.isArray(f[key]) && $.inArray(item[key], f[key]) === -1 || !$.isArray(f[key]) && item[key] !== f[key]) {
                                return false;
                            }
                        }
                        return true;
                    }) : this.options.data;

                    this.data = s ? $.grep(this.data, function (item, i) {
                        for (var j = 0; j < that.header.fields.length; j++) {

                            if (!that.header.searchables[j]) {
                                continue;
                            }

                            var key = $.isNumeric(that.header.fields[j]) ? parseInt(that.header.fields[j], 10) : that.header.fields[j];
                            var column = that.columns[getFieldIndex(that.columns, key)];
                            var value;

                            if (typeof key === 'string') {
                                value = item;
                                var props = key.split('.');
                                for (var prop_index = 0; prop_index < props.length; prop_index++) {
                                    value = value[props[prop_index]];
                                }

                                // Fix #142: respect searchForamtter boolean
                                if (column && column.searchFormatter) {
                                    value = calculateObjectValue(column, that.header.formatters[j], [value, item, i], value);
                                }
                            } else {
                                value = item[key];
                            }

                            if (typeof value === 'string' || typeof value === 'number') {
                                if (that.options.strictSearch) {
                                    if ((value + '').toLowerCase() === s) {
                                        return true;
                                    }
                                } else {
                                    if ((value + '').toLowerCase().indexOf(s) !== -1) {
                                        return true;
                                    }
                                }
                            }
                        }
                        return false;
                    }) : this.data;
                }
            };

            BootstrapTable.prototype.initPagination = function () {
                if (!this.options.pagination) {
                    this.$pagination.hide();
                    return;
                } else {
                    this.$pagination.show();
                }

                var that = this,
                    html = [],
                    $allSelected = false,
                    i,
                    from,
                    to,
                    $pageList,
                    $first,
                    $pre,
                    $next,
                    $last,
                    $number,
                    data = this.getData(),
                    pageList = this.options.pageList;

                if (this.options.sidePagination !== 'server') {
                    this.options.totalRows = data.length;
                }

                this.totalPages = 0;
                if (this.options.totalRows) {
                    if (this.options.pageSize === this.options.formatAllRows()) {
                        this.options.pageSize = this.options.totalRows;
                        $allSelected = true;
                    } else if (this.options.pageSize === this.options.totalRows) {
                        // Fix #667 Table with pagination,
                        // multiple pages and a search that matches to one page throws exception
                        var pageLst = typeof this.options.pageList === 'string' ? this.options.pageList.replace('[', '').replace(']', '').replace(/ /g, '').toLowerCase().split(',') : this.options.pageList;
                        if ($.inArray(this.options.formatAllRows().toLowerCase(), pageLst) > -1) {
                            $allSelected = true;
                        }
                    }

                    this.totalPages = ~~((this.options.totalRows - 1) / this.options.pageSize) + 1;

                    this.options.totalPages = this.totalPages;
                }
                if (this.totalPages > 0 && this.options.pageNumber > this.totalPages) {
                    this.options.pageNumber = this.totalPages;
                }

                this.pageFrom = (this.options.pageNumber - 1) * this.options.pageSize + 1;
                this.pageTo = this.options.pageNumber * this.options.pageSize;
                if (this.pageTo > this.options.totalRows) {
                    this.pageTo = this.options.totalRows;
                }

                html.push('<div class="pull-' + this.options.paginationDetailHAlign + ' pagination-detail">', '<span class="pagination-info">', this.options.onlyInfoPagination ? this.options.formatDetailPagination(this.options.totalRows) : this.options.formatShowingRows(this.pageFrom, this.pageTo, this.options.totalRows), '</span>');

                if (!this.options.onlyInfoPagination) {
                    html.push('<span class="page-list">');

                    var pageNumber = [sprintf('<span class="btn-group %s">', this.options.paginationVAlign === 'top' || this.options.paginationVAlign === 'both' ? 'dropdown' : 'dropup'), '<button type="button" class="btn' + sprintf(' btn-%s', this.options.buttonsClass) + sprintf(' btn-%s', this.options.iconSize) + ' dropdown-toggle" data-toggle="dropdown">', '<span class="page-size">', $allSelected ? this.options.formatAllRows() : this.options.pageSize, '</span>', ' <span class="caret"></span>', '</button>', '<ul class="dropdown-menu" role="menu">'];

                    if (typeof this.options.pageList === 'string') {
                        var list = this.options.pageList.replace('[', '').replace(']', '').replace(/ /g, '').split(',');

                        pageList = [];
                        $.each(list, function (i, value) {
                            pageList.push(value.toUpperCase() === that.options.formatAllRows().toUpperCase() ? that.options.formatAllRows() : +value);
                        });
                    }

                    $.each(pageList, function (i, page) {
                        if (!that.options.smartDisplay || i === 0 || pageList[i - 1] < that.options.totalRows) {
                            var active;
                            if ($allSelected) {
                                active = page === that.options.formatAllRows() ? ' class="active"' : '';
                            } else {
                                active = page === that.options.pageSize ? ' class="active"' : '';
                            }
                            pageNumber.push(sprintf('<li role="menuitem"%s><a href="#">%s</a></li>', active, page));
                        }
                    });
                    pageNumber.push('</ul></span>');

                    html.push(this.options.formatRecordsPerPage(pageNumber.join('')));
                    html.push('</span>');

                    html.push('</div>', '<div class="pull-' + this.options.paginationHAlign + ' pagination">', '<ul class="pagination' + sprintf(' pagination-%s', this.options.iconSize) + '">', '<li class="page-pre"><a href="#">' + this.options.paginationPreText + '</a></li>');

                    if (this.totalPages < 5) {
                        from = 1;
                        to = this.totalPages;
                    } else {
                        from = this.options.pageNumber - 2;
                        to = from + 4;
                        if (from < 1) {
                            from = 1;
                            to = 5;
                        }
                        if (to > this.totalPages) {
                            to = this.totalPages;
                            from = to - 4;
                        }
                    }

                    if (this.totalPages >= 6) {
                        if (this.options.pageNumber >= 3) {
                            html.push('<li class="page-first' + (1 === this.options.pageNumber ? ' active' : '') + '">', '<a href="#">', 1, '</a>', '</li>');

                            from++;
                        }

                        if (this.options.pageNumber >= 4) {
                            if (this.options.pageNumber == 4 || this.totalPages == 6 || this.totalPages == 7) {
                                from--;
                            } else {
                                html.push('<li class="page-first-separator disabled">', '<a href="#">...</a>', '</li>');
                            }

                            to--;
                        }
                    }

                    if (this.totalPages >= 7) {
                        if (this.options.pageNumber >= this.totalPages - 2) {
                            from--;
                        }
                    }

                    if (this.totalPages == 6) {
                        if (this.options.pageNumber >= this.totalPages - 2) {
                            to++;
                        }
                    } else if (this.totalPages >= 7) {
                        if (this.totalPages == 7 || this.options.pageNumber >= this.totalPages - 3) {
                            to++;
                        }
                    }

                    for (i = from; i <= to; i++) {
                        html.push('<li class="page-number' + (i === this.options.pageNumber ? ' active' : '') + '">', '<a href="#">', i, '</a>', '</li>');
                    }

                    if (this.totalPages >= 8) {
                        if (this.options.pageNumber <= this.totalPages - 4) {
                            html.push('<li class="page-last-separator disabled">', '<a href="#">...</a>', '</li>');
                        }
                    }

                    if (this.totalPages >= 6) {
                        if (this.options.pageNumber <= this.totalPages - 3) {
                            html.push('<li class="page-last' + (this.totalPages === this.options.pageNumber ? ' active' : '') + '">', '<a href="#">', this.totalPages, '</a>', '</li>');
                        }
                    }

                    html.push('<li class="page-next"><a href="#">' + this.options.paginationNextText + '</a></li>', '</ul>', '</div>');
                }
                this.$pagination.html(html.join(''));

                if (!this.options.onlyInfoPagination) {
                    $pageList = this.$pagination.find('.page-list a');
                    $first = this.$pagination.find('.page-first');
                    $pre = this.$pagination.find('.page-pre');
                    $next = this.$pagination.find('.page-next');
                    $last = this.$pagination.find('.page-last');
                    $number = this.$pagination.find('.page-number');

                    if (this.options.smartDisplay) {
                        if (this.totalPages <= 1) {
                            this.$pagination.find('div.pagination').hide();
                        }
                        if (pageList.length < 2 || this.options.totalRows <= pageList[0]) {
                            this.$pagination.find('span.page-list').hide();
                        }

                        // when data is empty, hide the pagination
                        this.$pagination[this.getData().length ? 'show' : 'hide']();
                    }

                    if (!this.options.paginationLoop) {
                        if (this.options.pageNumber === 1) {
                            $pre.addClass('disabled');
                        }
                        if (this.options.pageNumber === this.totalPages) {
                            $next.addClass('disabled');
                        }
                    }

                    if ($allSelected) {
                        this.options.pageSize = this.options.formatAllRows();
                    }
                    $pageList.off('click').on('click', $.proxy(this.onPageListChange, this));
                    $first.off('click').on('click', $.proxy(this.onPageFirst, this));
                    $pre.off('click').on('click', $.proxy(this.onPagePre, this));
                    $next.off('click').on('click', $.proxy(this.onPageNext, this));
                    $last.off('click').on('click', $.proxy(this.onPageLast, this));
                    $number.off('click').on('click', $.proxy(this.onPageNumber, this));
                }
            };

            BootstrapTable.prototype.updatePagination = function (event) {
                // Fix #171: IE disabled button can be clicked bug.
                if (event && $(event.currentTarget).hasClass('disabled')) {
                    return;
                }

                if (!this.options.maintainSelected) {
                    this.resetRows();
                }

                this.initPagination();
                if (this.options.sidePagination === 'server') {
                    this.initServer();
                } else {
                    this.initBody();
                }

                this.trigger('page-change', this.options.pageNumber, this.options.pageSize);
            };

            BootstrapTable.prototype.onPageListChange = function (event) {
                var $this = $(event.currentTarget);

                $this.parent().addClass('active').siblings().removeClass('active');
                this.options.pageSize = $this.text().toUpperCase() === this.options.formatAllRows().toUpperCase() ? this.options.formatAllRows() : +$this.text();
                this.$toolbar.find('.page-size').text(this.options.pageSize);

                this.updatePagination(event);
                return false;
            };

            BootstrapTable.prototype.onPageFirst = function (event) {
                this.options.pageNumber = 1;
                this.updatePagination(event);
                return false;
            };

            BootstrapTable.prototype.onPagePre = function (event) {
                if (this.options.pageNumber - 1 === 0) {
                    this.options.pageNumber = this.options.totalPages;
                } else {
                    this.options.pageNumber--;
                }
                this.updatePagination(event);
                return false;
            };

            BootstrapTable.prototype.onPageNext = function (event) {
                if (this.options.pageNumber + 1 > this.options.totalPages) {
                    this.options.pageNumber = 1;
                } else {
                    this.options.pageNumber++;
                }
                this.updatePagination(event);
                return false;
            };

            BootstrapTable.prototype.onPageLast = function (event) {
                this.options.pageNumber = this.totalPages;
                this.updatePagination(event);
                return false;
            };

            BootstrapTable.prototype.onPageNumber = function (event) {
                if (this.options.pageNumber === +$(event.currentTarget).text()) {
                    return;
                }
                this.options.pageNumber = +$(event.currentTarget).text();
                this.updatePagination(event);
                return false;
            };

            BootstrapTable.prototype.initRow = function (item, i, data, parentDom) {
                var that = this,
                    key,
                    html = [],
                    style = {},
                    csses = [],
                    data_ = '',
                    attributes = {},
                    htmlAttributes = [];

                if ($.inArray(item, this.hiddenRows) > -1) {
                    return;
                }

                style = calculateObjectValue(this.options, this.options.rowStyle, [item, i], style);

                if (style && style.css) {
                    for (key in style.css) {
                        csses.push(key + ': ' + style.css[key]);
                    }
                }

                attributes = calculateObjectValue(this.options, this.options.rowAttributes, [item, i], attributes);

                if (attributes) {
                    for (key in attributes) {
                        htmlAttributes.push(sprintf('%s="%s"', key, escapeHTML(attributes[key])));
                    }
                }

                if (item._data && !$.isEmptyObject(item._data)) {
                    $.each(item._data, function (k, v) {
                        // ignore data-index
                        if (k === 'index') {
                            return;
                        }
                        data_ += sprintf(' data-%s="%s"', k, v);
                    });
                }

                html.push('<tr', sprintf(' %s', htmlAttributes.join(' ')), sprintf(' id="%s"', $.isArray(item) ? undefined : item._id), sprintf(' class="%s"', style.classes || ($.isArray(item) ? undefined : item._class)), sprintf(' data-index="%s"', i), sprintf(' data-uniqueid="%s"', item[this.options.uniqueId]), sprintf('%s', data_), '>');

                if (this.options.cardView) {
                    html.push(sprintf('<td colspan="%s"><div class="card-views">', this.header.fields.length));
                }

                if (!this.options.cardView && this.options.detailView) {
                    html.push('<td>', '<a class="detail-icon" href="#">', sprintf('<i class="%s %s"></i>', this.options.iconsPrefix, this.options.icons.detailOpen), '</a>', '</td>');
                }

                $.each(this.header.fields, function (j, field) {
                    var text = '',
                        value_ = getItemField(item, field, that.options.escape),
                        value = '',
                        type = '',
                        cellStyle = {},
                        id_ = '',
                        class_ = that.header.classes[j],
                        data_ = '',
                        rowspan_ = '',
                        colspan_ = '',
                        title_ = '',
                        column = that.columns[j];

                    if (that.fromHtml && typeof value_ === 'undefined') {
                        return;
                    }

                    if (!column.visible) {
                        return;
                    }

                    if (that.options.cardView && !column.cardVisible) {
                        return;
                    }

                    if (column.escape) {
                        value_ = escapeHTML(value_);
                    }

                    style = sprintf('style="%s"', csses.concat(that.header.styles[j]).join('; '));

                    // handle td's id and class
                    if (item['_' + field + '_id']) {
                        id_ = sprintf(' id="%s"', item['_' + field + '_id']);
                    }
                    if (item['_' + field + '_class']) {
                        class_ = sprintf(' class="%s"', item['_' + field + '_class']);
                    }
                    if (item['_' + field + '_rowspan']) {
                        rowspan_ = sprintf(' rowspan="%s"', item['_' + field + '_rowspan']);
                    }
                    if (item['_' + field + '_colspan']) {
                        colspan_ = sprintf(' colspan="%s"', item['_' + field + '_colspan']);
                    }
                    if (item['_' + field + '_title']) {
                        title_ = sprintf(' title="%s"', item['_' + field + '_title']);
                    }
                    cellStyle = calculateObjectValue(that.header, that.header.cellStyles[j], [value_, item, i, field], cellStyle);
                    if (cellStyle.classes) {
                        class_ = sprintf(' class="%s"', cellStyle.classes);
                    }
                    if (cellStyle.css) {
                        var csses_ = [];
                        for (var key in cellStyle.css) {
                            csses_.push(key + ': ' + cellStyle.css[key]);
                        }
                        style = sprintf('style="%s"', csses_.concat(that.header.styles[j]).join('; '));
                    }

                    value = calculateObjectValue(column, that.header.formatters[j], [value_, item, i], value_);

                    if (item['_' + field + '_data'] && !$.isEmptyObject(item['_' + field + '_data'])) {
                        $.each(item['_' + field + '_data'], function (k, v) {
                            // ignore data-index
                            if (k === 'index') {
                                return;
                            }
                            data_ += sprintf(' data-%s="%s"', k, v);
                        });
                    }

                    if (column.checkbox || column.radio) {
                        type = column.checkbox ? 'checkbox' : type;
                        type = column.radio ? 'radio' : type;

                        text = [sprintf(that.options.cardView ? '<div class="card-view %s">' : '<td class="bs-checkbox %s">', column['class'] || ''), '<input' + sprintf(' data-index="%s"', i) + sprintf(' name="%s"', that.options.selectItemName) + sprintf(' type="%s"', type) + sprintf(' value="%s"', item[that.options.idField]) + sprintf(' checked="%s"', value === true || value_ || value && value.checked ? 'checked' : undefined) + sprintf(' disabled="%s"', !column.checkboxEnabled || value && value.disabled ? 'disabled' : undefined) + ' />', that.header.formatters[j] && typeof value === 'string' ? value : '', that.options.cardView ? '</div>' : '</td>'].join('');

                        item[that.header.stateField] = value === true || value && value.checked;
                    } else {
                        value = typeof value === 'undefined' || value === null ? that.options.undefinedText : value;

                        text = that.options.cardView ? ['<div class="card-view">', that.options.showHeader ? sprintf('<span class="title" %s>%s</span>', style, getPropertyFromOther(that.columns, 'field', 'title', field)) : '', sprintf('<span class="value">%s</span>', value), '</div>'].join('') : [sprintf('<td%s %s %s %s %s %s %s>', id_, class_, style, data_, rowspan_, colspan_, title_), value, '</td>'].join('');

                        // Hide empty data on Card view when smartDisplay is set to true.
                        if (that.options.cardView && that.options.smartDisplay && value === '') {
                            // Should set a placeholder for event binding correct fieldIndex
                            text = '<div class="card-view"></div>';
                        }
                    }

                    html.push(text);
                });

                if (this.options.cardView) {
                    html.push('</div></td>');
                }
                html.push('</tr>');

                return html.join(' ');
            };

            BootstrapTable.prototype.initBody = function (fixedScroll) {
                var that = this,
                    html = [],
                    data = this.getData();

                this.trigger('pre-body', data);

                this.$body = this.$el.find('>tbody');
                if (!this.$body.length) {
                    this.$body = $('<tbody></tbody>').appendTo(this.$el);
                }

                //Fix #389 Bootstrap-table-flatJSON is not working

                if (!this.options.pagination || this.options.sidePagination === 'server') {
                    this.pageFrom = 1;
                    this.pageTo = data.length;
                }

                var trFragments = $(document.createDocumentFragment());
                var hasTr;

                for (var i = this.pageFrom - 1; i < this.pageTo; i++) {
                    var item = data[i];
                    var tr = this.initRow(item, i, data, trFragments);
                    hasTr = hasTr || !!tr;
                    if (tr && tr !== true) {
                        trFragments.append(tr);
                    }
                }

                // show no records
                if (!hasTr) {
                    trFragments.append('<tr class="no-records-found">' + sprintf('<td colspan="%s">%s</td>', this.$header.find('th').length, this.options.formatNoMatches()) + '</tr>');
                }

                this.$body.html(trFragments);

                if (!fixedScroll) {
                    this.scrollTo(0);
                }

                // click to select by column
                this.$body.find('> tr[data-index] > td').off('click dblclick').on('click dblclick', function (e) {
                    var $td = $(this),
                        $tr = $td.parent(),
                        item = that.data[$tr.data('index')],
                        index = $td[0].cellIndex,
                        fields = that.getVisibleFields(),
                        field = fields[that.options.detailView && !that.options.cardView ? index - 1 : index],
                        column = that.columns[getFieldIndex(that.columns, field)],
                        value = getItemField(item, field, that.options.escape);

                    if ($td.find('.detail-icon').length) {
                        return;
                    }

                    that.trigger(e.type === 'click' ? 'click-cell' : 'dbl-click-cell', field, value, item, $td);
                    that.trigger(e.type === 'click' ? 'click-row' : 'dbl-click-row', item, $tr, field);

                    // if click to select - then trigger the checkbox/radio click
                    if (e.type === 'click' && that.options.clickToSelect && column.clickToSelect) {
                        var $selectItem = $tr.find(sprintf('[name="%s"]', that.options.selectItemName));
                        if ($selectItem.length) {
                            $selectItem[0].click(); // #144: .trigger('click') bug
                        }
                    }
                });

                this.$body.find('> tr[data-index] > td > .detail-icon').off('click').on('click', function () {
                    var $this = $(this),
                        $tr = $this.parent().parent(),
                        index = $tr.data('index'),
                        row = data[index]; // Fix #980 Detail view, when searching, returns wrong row

                    // remove and update
                    if ($tr.next().is('tr.detail-view')) {
                        $this.find('i').attr('class', sprintf('%s %s', that.options.iconsPrefix, that.options.icons.detailOpen));
                        that.trigger('collapse-row', index, row);
                        $tr.next().remove();
                    } else {
                        $this.find('i').attr('class', sprintf('%s %s', that.options.iconsPrefix, that.options.icons.detailClose));
                        $tr.after(sprintf('<tr class="detail-view"><td colspan="%s"></td></tr>', $tr.find('td').length));
                        var $element = $tr.next().find('td');
                        var content = calculateObjectValue(that.options, that.options.detailFormatter, [index, row, $element], '');
                        if ($element.length === 1) {
                            $element.append(content);
                        }
                        that.trigger('expand-row', index, row, $element);
                    }
                    that.resetView();
                    return false;
                });

                this.$selectItem = this.$body.find(sprintf('[name="%s"]', this.options.selectItemName));
                this.$selectItem.off('click').on('click', function (event) {
                    event.stopImmediatePropagation();

                    var $this = $(this),
                        checked = $this.prop('checked'),
                        row = that.data[$this.data('index')];

                    if (that.options.maintainSelected && $(this).is(':radio')) {
                        $.each(that.options.data, function (i, row) {
                            row[that.header.stateField] = false;
                        });
                    }

                    row[that.header.stateField] = checked;

                    if (that.options.singleSelect) {
                        that.$selectItem.not(this).each(function () {
                            that.data[$(this).data('index')][that.header.stateField] = false;
                        });
                        that.$selectItem.filter(':checked').not(this).prop('checked', false);
                    }

                    that.updateSelected();
                    that.trigger(checked ? 'check' : 'uncheck', row, $this);
                });

                $.each(this.header.events, function (i, events) {
                    if (!events) {
                        return;
                    }
                    // fix bug, if events is defined with namespace
                    if (typeof events === 'string') {
                        events = calculateObjectValue(null, events);
                    }

                    var field = that.header.fields[i],
                        fieldIndex = $.inArray(field, that.getVisibleFields());

                    if (that.options.detailView && !that.options.cardView) {
                        fieldIndex += 1;
                    }

                    for (var key in events) {
                        that.$body.find('>tr:not(.no-records-found)').each(function () {
                            var $tr = $(this),
                                $td = $tr.find(that.options.cardView ? '.card-view' : 'td').eq(fieldIndex),
                                index = key.indexOf(' '),
                                name = key.substring(0, index),
                                el = key.substring(index + 1),
                                func = events[key];

                            $td.find(el).off(name).on(name, function (e) {
                                var index = $tr.data('index'),
                                    row = that.data[index],
                                    value = row[field];

                                func.apply(this, [e, value, row, index]);
                            });
                        });
                    }
                });

                this.updateSelected();
                this.resetView();

                this.trigger('post-body', data);
            };

            BootstrapTable.prototype.initServer = function (silent, query, url) {
                var that = this,
                    data = {},
                    params = {
                    searchText: this.searchText,
                    sortName: this.options.sortName,
                    sortOrder: this.options.sortOrder
                },
                    request;

                if (this.options.pagination) {
                    params.pageSize = this.options.pageSize === this.options.formatAllRows() ? this.options.totalRows : this.options.pageSize;
                    params.pageNumber = this.options.pageNumber;
                }

                if (!(url || this.options.url) && !this.options.ajax) {
                    return;
                }

                if (this.options.queryParamsType === 'limit') {
                    params = {
                        search: params.searchText,
                        sort: params.sortName,
                        order: params.sortOrder
                    };

                    if (this.options.pagination) {
                        params.offset = this.options.pageSize === this.options.formatAllRows() ? 0 : this.options.pageSize * (this.options.pageNumber - 1);
                        params.limit = this.options.pageSize === this.options.formatAllRows() ? this.options.totalRows : this.options.pageSize;
                    }
                }

                if (!$.isEmptyObject(this.filterColumnsPartial)) {
                    params.filter = JSON.stringify(this.filterColumnsPartial, null);
                }

                data = calculateObjectValue(this.options, this.options.queryParams, [params], data);

                $.extend(data, query || {});

                // false to stop request
                if (data === false) {
                    return;
                }

                if (!silent) {
                    this.$tableLoading.show();
                }
                request = $.extend({}, calculateObjectValue(null, this.options.ajaxOptions), {
                    type: this.options.method,
                    url: url || this.options.url,
                    data: this.options.contentType === 'application/json' && this.options.method === 'post' ? JSON.stringify(data) : data,
                    cache: this.options.cache,
                    contentType: this.options.contentType,
                    dataType: this.options.dataType,
                    success: function (res) {
                        res = calculateObjectValue(that.options, that.options.responseHandler, [res], res);

                        that.load(res);
                        that.trigger('load-success', res);
                        if (!silent) that.$tableLoading.hide();
                    },
                    error: function (res) {
                        that.trigger('load-error', res.status, res);
                        if (!silent) that.$tableLoading.hide();
                    }
                });

                if (this.options.ajax) {
                    calculateObjectValue(this, this.options.ajax, [request], null);
                } else {
                    if (this._xhr && this._xhr.readyState !== 4) {
                        this._xhr.abort();
                    }
                    this._xhr = $.ajax(request);
                }
            };

            BootstrapTable.prototype.initSearchText = function () {
                if (this.options.search) {
                    if (this.options.searchText !== '') {
                        var $search = this.$toolbar.find('.search input');
                        $search.val(this.options.searchText);
                        this.onSearch({ currentTarget: $search });
                    }
                }
            };

            BootstrapTable.prototype.getCaret = function () {
                var that = this;

                $.each(this.$header.find('th'), function (i, th) {
                    $(th).find('.sortable').removeClass('desc asc').addClass($(th).data('field') === that.options.sortName ? that.options.sortOrder : 'both');
                });
            };

            BootstrapTable.prototype.updateSelected = function () {
                var checkAll = this.$selectItem.filter(':enabled').length && this.$selectItem.filter(':enabled').length === this.$selectItem.filter(':enabled').filter(':checked').length;

                this.$selectAll.add(this.$selectAll_).prop('checked', checkAll);

                this.$selectItem.each(function () {
                    $(this).closest('tr')[$(this).prop('checked') ? 'addClass' : 'removeClass']('selected');
                });
            };

            BootstrapTable.prototype.updateRows = function () {
                var that = this;

                this.$selectItem.each(function () {
                    that.data[$(this).data('index')][that.header.stateField] = $(this).prop('checked');
                });
            };

            BootstrapTable.prototype.resetRows = function () {
                var that = this;

                $.each(this.data, function (i, row) {
                    that.$selectAll.prop('checked', false);
                    that.$selectItem.prop('checked', false);
                    if (that.header.stateField) {
                        row[that.header.stateField] = false;
                    }
                });
                this.initHiddenRows();
            };

            BootstrapTable.prototype.trigger = function (name) {
                var args = Array.prototype.slice.call(arguments, 1);

                name += '.bs.table';
                this.options[BootstrapTable.EVENTS[name]].apply(this.options, args);
                this.$el.trigger($.Event(name), args);

                this.options.onAll(name, args);
                this.$el.trigger($.Event('all.bs.table'), [name, args]);
            };

            BootstrapTable.prototype.resetHeader = function () {
                // fix #61: the hidden table reset header bug.
                // fix bug: get $el.css('width') error sometime (height = 500)
                clearTimeout(this.timeoutId_);
                this.timeoutId_ = setTimeout($.proxy(this.fitHeader, this), this.$el.is(':hidden') ? 100 : 0);
            };

            BootstrapTable.prototype.fitHeader = function () {
                var that = this,
                    fixedBody,
                    scrollWidth,
                    focused,
                    focusedTemp;

                if (that.$el.is(':hidden')) {
                    that.timeoutId_ = setTimeout($.proxy(that.fitHeader, that), 100);
                    return;
                }
                fixedBody = this.$tableBody.get(0);

                scrollWidth = fixedBody.scrollWidth > fixedBody.clientWidth && fixedBody.scrollHeight > fixedBody.clientHeight + this.$header.outerHeight() ? getScrollBarWidth() : 0;

                this.$el.css('margin-top', -this.$header.outerHeight());

                focused = $(':focus');
                if (focused.length > 0) {
                    var $th = focused.parents('th');
                    if ($th.length > 0) {
                        var dataField = $th.attr('data-field');
                        if (dataField !== undefined) {
                            var $headerTh = this.$header.find("[data-field='" + dataField + "']");
                            if ($headerTh.length > 0) {
                                $headerTh.find(":input").addClass("focus-temp");
                            }
                        }
                    }
                }

                this.$header_ = this.$header.clone(true, true);
                this.$selectAll_ = this.$header_.find('[name="btSelectAll"]');
                this.$tableHeader.css({
                    'margin-right': scrollWidth
                }).find('table').css('width', this.$el.outerWidth()).html('').attr('class', this.$el.attr('class')).append(this.$header_);

                focusedTemp = $('.focus-temp:visible:eq(0)');
                if (focusedTemp.length > 0) {
                    focusedTemp.focus();
                    this.$header.find('.focus-temp').removeClass('focus-temp');
                }

                // fix bug: $.data() is not working as expected after $.append()
                this.$header.find('th[data-field]').each(function (i) {
                    that.$header_.find(sprintf('th[data-field="%s"]', $(this).data('field'))).data($(this).data());
                });

                var visibleFields = this.getVisibleFields(),
                    $ths = this.$header_.find('th');

                this.$body.find('>tr:first-child:not(.no-records-found) > *').each(function (i) {
                    var $this = $(this),
                        index = i;

                    if (that.options.detailView && !that.options.cardView) {
                        if (i === 0) {
                            that.$header_.find('th.detail').find('.fht-cell').width($this.innerWidth());
                        }
                        index = i - 1;
                    }

                    var $th = that.$header_.find(sprintf('th[data-field="%s"]', visibleFields[index]));
                    if ($th.length > 1) {
                        $th = $($ths[$this[0].cellIndex]);
                    }

                    $th.find('.fht-cell').width($this.innerWidth());
                });
                // horizontal scroll event
                // TODO: it's probably better improving the layout than binding to scroll event
                this.$tableBody.off('scroll').on('scroll', function () {
                    that.$tableHeader.scrollLeft($(this).scrollLeft());

                    if (that.options.showFooter && !that.options.cardView) {
                        that.$tableFooter.scrollLeft($(this).scrollLeft());
                    }
                });
                that.trigger('post-header');
            };

            BootstrapTable.prototype.resetFooter = function () {
                var that = this,
                    data = that.getData(),
                    html = [];

                if (!this.options.showFooter || this.options.cardView) {
                    //do nothing
                    return;
                }

                if (!this.options.cardView && this.options.detailView) {
                    html.push('<td><div class="th-inner">&nbsp;</div><div class="fht-cell"></div></td>');
                }

                $.each(this.columns, function (i, column) {
                    var key,
                        falign = '',
                        // footer align style
                    valign = '',
                        csses = [],
                        style = {},
                        class_ = sprintf(' class="%s"', column['class']);

                    if (!column.visible) {
                        return;
                    }

                    if (that.options.cardView && !column.cardVisible) {
                        return;
                    }

                    falign = sprintf('text-align: %s; ', column.falign ? column.falign : column.align);
                    valign = sprintf('vertical-align: %s; ', column.valign);

                    style = calculateObjectValue(null, that.options.footerStyle);

                    if (style && style.css) {
                        for (key in style.css) {
                            csses.push(key + ': ' + style.css[key]);
                        }
                    }

                    html.push('<td', class_, sprintf(' style="%s"', falign + valign + csses.concat().join('; ')), '>');
                    html.push('<div class="th-inner">');

                    html.push(calculateObjectValue(column, column.footerFormatter, [data], '&nbsp;') || '&nbsp;');

                    html.push('</div>');
                    html.push('<div class="fht-cell"></div>');
                    html.push('</div>');
                    html.push('</td>');
                });

                this.$tableFooter.find('tr').html(html.join(''));
                this.$tableFooter.show();
                clearTimeout(this.timeoutFooter_);
                this.timeoutFooter_ = setTimeout($.proxy(this.fitFooter, this), this.$el.is(':hidden') ? 100 : 0);
            };

            BootstrapTable.prototype.fitFooter = function () {
                var that = this,
                    $footerTd,
                    elWidth,
                    scrollWidth;

                clearTimeout(this.timeoutFooter_);
                if (this.$el.is(':hidden')) {
                    this.timeoutFooter_ = setTimeout($.proxy(this.fitFooter, this), 100);
                    return;
                }

                elWidth = this.$el.css('width');
                scrollWidth = elWidth > this.$tableBody.width() ? getScrollBarWidth() : 0;

                this.$tableFooter.css({
                    'margin-right': scrollWidth
                }).find('table').css('width', elWidth).attr('class', this.$el.attr('class'));

                $footerTd = this.$tableFooter.find('td');

                this.$body.find('>tr:first-child:not(.no-records-found) > *').each(function (i) {
                    var $this = $(this);

                    $footerTd.eq(i).find('.fht-cell').width($this.innerWidth());
                });
            };

            BootstrapTable.prototype.toggleColumn = function (index, checked, needUpdate) {
                if (index === -1) {
                    return;
                }
                this.columns[index].visible = checked;
                this.initHeader();
                this.initSearch();
                this.initPagination();
                this.initBody();

                if (this.options.showColumns) {
                    var $items = this.$toolbar.find('.keep-open input').prop('disabled', false);

                    if (needUpdate) {
                        $items.filter(sprintf('[value="%s"]', index)).prop('checked', checked);
                    }

                    if ($items.filter(':checked').length <= this.options.minimumCountColumns) {
                        $items.filter(':checked').prop('disabled', true);
                    }
                }
            };

            BootstrapTable.prototype.getVisibleFields = function () {
                var that = this,
                    visibleFields = [];

                $.each(this.header.fields, function (j, field) {
                    var column = that.columns[getFieldIndex(that.columns, field)];

                    if (!column.visible) {
                        return;
                    }
                    visibleFields.push(field);
                });
                return visibleFields;
            };

            // PUBLIC FUNCTION DEFINITION
            // =======================

            BootstrapTable.prototype.resetView = function (params) {
                var padding = 0;

                if (params && params.height) {
                    this.options.height = params.height;
                }

                this.$selectAll.prop('checked', this.$selectItem.length > 0 && this.$selectItem.length === this.$selectItem.filter(':checked').length);

                if (this.options.height) {
                    var toolbarHeight = this.$toolbar.outerHeight(true),
                        paginationHeight = this.$pagination.outerHeight(true),
                        height = this.options.height - toolbarHeight - paginationHeight;

                    this.$tableContainer.css('height', height + 'px');
                }

                if (this.options.cardView) {
                    // remove the element css
                    this.$el.css('margin-top', '0');
                    this.$tableContainer.css('padding-bottom', '0');
                    this.$tableFooter.hide();
                    return;
                }

                if (this.options.showHeader && this.options.height) {
                    this.$tableHeader.show();
                    this.resetHeader();
                    padding += this.$header.outerHeight();
                } else {
                    this.$tableHeader.hide();
                    this.trigger('post-header');
                }

                if (this.options.showFooter) {
                    this.resetFooter();
                    if (this.options.height) {
                        padding += this.$tableFooter.outerHeight() + 1;
                    }
                }

                // Assign the correct sortable arrow
                this.getCaret();
                this.$tableContainer.css('padding-bottom', padding + 'px');
                this.trigger('reset-view');
            };

            BootstrapTable.prototype.getData = function (useCurrentPage) {
                return this.searchText || !$.isEmptyObject(this.filterColumns) || !$.isEmptyObject(this.filterColumnsPartial) ? useCurrentPage ? this.data.slice(this.pageFrom - 1, this.pageTo) : this.data : useCurrentPage ? this.options.data.slice(this.pageFrom - 1, this.pageTo) : this.options.data;
            };

            BootstrapTable.prototype.load = function (data) {
                var fixedScroll = false;

                // #431: support pagination
                if (this.options.sidePagination === 'server') {
                    this.options.totalRows = data[this.options.totalField];
                    fixedScroll = data.fixedScroll;
                    data = data[this.options.dataField];
                } else if (!$.isArray(data)) {
                    // support fixedScroll
                    fixedScroll = data.fixedScroll;
                    data = data.data;
                }

                this.initData(data);
                this.initSearch();
                this.initPagination();
                this.initBody(fixedScroll);
            };

            BootstrapTable.prototype.append = function (data) {
                this.initData(data, 'append');
                this.initSearch();
                this.initPagination();
                this.initSort();
                this.initBody(true);
            };

            BootstrapTable.prototype.prepend = function (data) {
                this.initData(data, 'prepend');
                this.initSearch();
                this.initPagination();
                this.initSort();
                this.initBody(true);
            };

            BootstrapTable.prototype.remove = function (params) {
                var len = this.options.data.length,
                    i,
                    row;

                if (!params.hasOwnProperty('field') || !params.hasOwnProperty('values')) {
                    return;
                }

                for (i = len - 1; i >= 0; i--) {
                    row = this.options.data[i];

                    if (!row.hasOwnProperty(params.field)) {
                        continue;
                    }
                    if ($.inArray(row[params.field], params.values) !== -1) {
                        this.options.data.splice(i, 1);
                        if (this.options.sidePagination === 'server') {
                            this.options.totalRows -= 1;
                        }
                    }
                }

                if (len === this.options.data.length) {
                    return;
                }

                this.initSearch();
                this.initPagination();
                this.initSort();
                this.initBody(true);
            };

            BootstrapTable.prototype.removeAll = function () {
                if (this.options.data.length > 0) {
                    this.options.data.splice(0, this.options.data.length);
                    this.initSearch();
                    this.initPagination();
                    this.initBody(true);
                }
            };

            BootstrapTable.prototype.getRowByUniqueId = function (id) {
                var uniqueId = this.options.uniqueId,
                    len = this.options.data.length,
                    dataRow = null,
                    i,
                    row,
                    rowUniqueId;

                for (i = len - 1; i >= 0; i--) {
                    row = this.options.data[i];

                    if (row.hasOwnProperty(uniqueId)) {
                        // uniqueId is a column
                        rowUniqueId = row[uniqueId];
                    } else if (row._data.hasOwnProperty(uniqueId)) {
                        // uniqueId is a row data property
                        rowUniqueId = row._data[uniqueId];
                    } else {
                        continue;
                    }

                    if (typeof rowUniqueId === 'string') {
                        id = id.toString();
                    } else if (typeof rowUniqueId === 'number') {
                        if (Number(rowUniqueId) === rowUniqueId && rowUniqueId % 1 === 0) {
                            id = parseInt(id);
                        } else if (rowUniqueId === Number(rowUniqueId) && rowUniqueId !== 0) {
                            id = parseFloat(id);
                        }
                    }

                    if (rowUniqueId === id) {
                        dataRow = row;
                        break;
                    }
                }

                return dataRow;
            };

            BootstrapTable.prototype.removeByUniqueId = function (id) {
                var len = this.options.data.length,
                    row = this.getRowByUniqueId(id);

                if (row) {
                    this.options.data.splice(this.options.data.indexOf(row), 1);
                }

                if (len === this.options.data.length) {
                    return;
                }

                this.initSearch();
                this.initPagination();
                this.initBody(true);
            };

            BootstrapTable.prototype.updateByUniqueId = function (params) {
                var that = this;
                var allParams = $.isArray(params) ? params : [params];

                $.each(allParams, function (i, params) {
                    var rowId;

                    if (!params.hasOwnProperty('id') || !params.hasOwnProperty('row')) {
                        return;
                    }

                    rowId = $.inArray(that.getRowByUniqueId(params.id), that.options.data);

                    if (rowId === -1) {
                        return;
                    }
                    $.extend(that.options.data[rowId], params.row);
                });

                this.initSearch();
                this.initPagination();
                this.initSort();
                this.initBody(true);
            };

            BootstrapTable.prototype.insertRow = function (params) {
                if (!params.hasOwnProperty('index') || !params.hasOwnProperty('row')) {
                    return;
                }
                this.data.splice(params.index, 0, params.row);
                this.initSearch();
                this.initPagination();
                this.initSort();
                this.initBody(true);
            };

            BootstrapTable.prototype.updateRow = function (params) {
                var that = this;
                var allParams = $.isArray(params) ? params : [params];

                $.each(allParams, function (i, params) {
                    if (!params.hasOwnProperty('index') || !params.hasOwnProperty('row')) {
                        return;
                    }
                    $.extend(that.options.data[params.index], params.row);
                });

                this.initSearch();
                this.initPagination();
                this.initSort();
                this.initBody(true);
            };

            BootstrapTable.prototype.initHiddenRows = function () {
                this.hiddenRows = [];
            };

            BootstrapTable.prototype.showRow = function (params) {
                this.toggleRow(params, true);
            };

            BootstrapTable.prototype.hideRow = function (params) {
                this.toggleRow(params, false);
            };

            BootstrapTable.prototype.toggleRow = function (params, visible) {
                var row, index;

                if (params.hasOwnProperty('index')) {
                    row = this.getData()[params.index];
                } else if (params.hasOwnProperty('uniqueId')) {
                    row = this.getRowByUniqueId(params.uniqueId);
                }

                if (!row) {
                    return;
                }

                index = $.inArray(row, this.hiddenRows);

                if (!visible && index === -1) {
                    this.hiddenRows.push(row);
                } else if (visible && index > -1) {
                    this.hiddenRows.splice(index, 1);
                }
                this.initBody(true);
            };

            BootstrapTable.prototype.getHiddenRows = function (show) {
                var that = this,
                    data = this.getData(),
                    rows = [];

                $.each(data, function (i, row) {
                    if ($.inArray(row, that.hiddenRows) > -1) {
                        rows.push(row);
                    }
                });
                this.hiddenRows = rows;
                return rows;
            };

            BootstrapTable.prototype.mergeCells = function (options) {
                var row = options.index,
                    col = $.inArray(options.field, this.getVisibleFields()),
                    rowspan = options.rowspan || 1,
                    colspan = options.colspan || 1,
                    i,
                    j,
                    $tr = this.$body.find('>tr'),
                    $td;

                if (this.options.detailView && !this.options.cardView) {
                    col += 1;
                }

                $td = $tr.eq(row).find('>td').eq(col);

                if (row < 0 || col < 0 || row >= this.data.length) {
                    return;
                }

                for (i = row; i < row + rowspan; i++) {
                    for (j = col; j < col + colspan; j++) {
                        $tr.eq(i).find('>td').eq(j).hide();
                    }
                }

                $td.attr('rowspan', rowspan).attr('colspan', colspan).show();
            };

            BootstrapTable.prototype.updateCell = function (params) {
                if (!params.hasOwnProperty('index') || !params.hasOwnProperty('field') || !params.hasOwnProperty('value')) {
                    return;
                }
                this.data[params.index][params.field] = params.value;

                if (params.reinit === false) {
                    return;
                }
                this.initSort();
                this.initBody(true);
            };

            BootstrapTable.prototype.getOptions = function () {
                return this.options;
            };

            BootstrapTable.prototype.getSelections = function () {
                var that = this;

                return $.grep(this.options.data, function (row) {
                    // fix #2424: from html with checkbox
                    return row[that.header.stateField] === true;
                });
            };

            BootstrapTable.prototype.getAllSelections = function () {
                var that = this;

                return $.grep(this.options.data, function (row) {
                    return row[that.header.stateField];
                });
            };

            BootstrapTable.prototype.checkAll = function () {
                this.checkAll_(true);
            };

            BootstrapTable.prototype.uncheckAll = function () {
                this.checkAll_(false);
            };

            BootstrapTable.prototype.checkInvert = function () {
                var that = this;
                var rows = that.$selectItem.filter(':enabled');
                var checked = rows.filter(':checked');
                rows.each(function () {
                    $(this).prop('checked', !$(this).prop('checked'));
                });
                that.updateRows();
                that.updateSelected();
                that.trigger('uncheck-some', checked);
                checked = that.getSelections();
                that.trigger('check-some', checked);
            };

            BootstrapTable.prototype.checkAll_ = function (checked) {
                var rows;
                if (!checked) {
                    rows = this.getSelections();
                }
                this.$selectAll.add(this.$selectAll_).prop('checked', checked);
                this.$selectItem.filter(':enabled').prop('checked', checked);
                this.updateRows();
                if (checked) {
                    rows = this.getSelections();
                }
                this.trigger(checked ? 'check-all' : 'uncheck-all', rows);
            };

            BootstrapTable.prototype.check = function (index) {
                this.check_(true, index);
            };

            BootstrapTable.prototype.uncheck = function (index) {
                this.check_(false, index);
            };

            BootstrapTable.prototype.check_ = function (checked, index) {
                var $el = this.$selectItem.filter(sprintf('[data-index="%s"]', index)).prop('checked', checked);
                this.data[index][this.header.stateField] = checked;
                this.updateSelected();
                this.trigger(checked ? 'check' : 'uncheck', this.data[index], $el);
            };

            BootstrapTable.prototype.checkBy = function (obj) {
                this.checkBy_(true, obj);
            };

            BootstrapTable.prototype.uncheckBy = function (obj) {
                this.checkBy_(false, obj);
            };

            BootstrapTable.prototype.checkBy_ = function (checked, obj) {
                if (!obj.hasOwnProperty('field') || !obj.hasOwnProperty('values')) {
                    return;
                }

                var that = this,
                    rows = [];
                $.each(this.options.data, function (index, row) {
                    if (!row.hasOwnProperty(obj.field)) {
                        return false;
                    }
                    if ($.inArray(row[obj.field], obj.values) !== -1) {
                        var $el = that.$selectItem.filter(':enabled').filter(sprintf('[data-index="%s"]', index)).prop('checked', checked);
                        row[that.header.stateField] = checked;
                        rows.push(row);
                        that.trigger(checked ? 'check' : 'uncheck', row, $el);
                    }
                });
                this.updateSelected();
                this.trigger(checked ? 'check-some' : 'uncheck-some', rows);
            };

            BootstrapTable.prototype.destroy = function () {
                this.$el.insertBefore(this.$container);
                $(this.options.toolbar).insertBefore(this.$el);
                this.$container.next().remove();
                this.$container.remove();
                this.$el.html(this.$el_.html()).css('margin-top', '0').attr('class', this.$el_.attr('class') || ''); // reset the class
            };

            BootstrapTable.prototype.showLoading = function () {
                this.$tableLoading.show();
            };

            BootstrapTable.prototype.hideLoading = function () {
                this.$tableLoading.hide();
            };

            BootstrapTable.prototype.togglePagination = function () {
                this.options.pagination = !this.options.pagination;
                var button = this.$toolbar.find('button[name="paginationSwitch"] i');
                if (this.options.pagination) {
                    button.attr("class", this.options.iconsPrefix + " " + this.options.icons.paginationSwitchDown);
                } else {
                    button.attr("class", this.options.iconsPrefix + " " + this.options.icons.paginationSwitchUp);
                }
                this.updatePagination();
            };

            BootstrapTable.prototype.refresh = function (params) {
                if (params && params.url) {
                    this.options.url = params.url;
                }
                if (params && params.pageNumber) {
                    this.options.pageNumber = params.pageNumber;
                }
                if (params && params.pageSize) {
                    this.options.pageSize = params.pageSize;
                }
                this.initServer(params && params.silent, params && params.query, params && params.url);
                this.trigger('refresh', params);
            };

            BootstrapTable.prototype.resetWidth = function () {
                if (this.options.showHeader && this.options.height) {
                    this.fitHeader();
                }
                if (this.options.showFooter) {
                    this.fitFooter();
                }
            };

            BootstrapTable.prototype.showColumn = function (field) {
                this.toggleColumn(getFieldIndex(this.columns, field), true, true);
            };

            BootstrapTable.prototype.hideColumn = function (field) {
                this.toggleColumn(getFieldIndex(this.columns, field), false, true);
            };

            BootstrapTable.prototype.getHiddenColumns = function () {
                return $.grep(this.columns, function (column) {
                    return !column.visible;
                });
            };

            BootstrapTable.prototype.getVisibleColumns = function () {
                return $.grep(this.columns, function (column) {
                    return column.visible;
                });
            };

            BootstrapTable.prototype.toggleAllColumns = function (visible) {
                $.each(this.columns, function (i, column) {
                    this.columns[i].visible = visible;
                });

                this.initHeader();
                this.initSearch();
                this.initPagination();
                this.initBody();
                if (this.options.showColumns) {
                    var $items = this.$toolbar.find('.keep-open input').prop('disabled', false);

                    if ($items.filter(':checked').length <= this.options.minimumCountColumns) {
                        $items.filter(':checked').prop('disabled', true);
                    }
                }
            };

            BootstrapTable.prototype.showAllColumns = function () {
                this.toggleAllColumns(true);
            };

            BootstrapTable.prototype.hideAllColumns = function () {
                this.toggleAllColumns(false);
            };

            BootstrapTable.prototype.filterBy = function (columns) {
                this.filterColumns = $.isEmptyObject(columns) ? {} : columns;
                this.options.pageNumber = 1;
                this.initSearch();
                this.updatePagination();
            };

            BootstrapTable.prototype.scrollTo = function (value) {
                if (typeof value === 'string') {
                    value = value === 'bottom' ? this.$tableBody[0].scrollHeight : 0;
                }
                if (typeof value === 'number') {
                    this.$tableBody.scrollTop(value);
                }
                if (typeof value === 'undefined') {
                    return this.$tableBody.scrollTop();
                }
            };

            BootstrapTable.prototype.getScrollPosition = function () {
                return this.scrollTo();
            };

            BootstrapTable.prototype.selectPage = function (page) {
                if (page > 0 && page <= this.options.totalPages) {
                    this.options.pageNumber = page;
                    this.updatePagination();
                }
            };

            BootstrapTable.prototype.prevPage = function () {
                if (this.options.pageNumber > 1) {
                    this.options.pageNumber--;
                    this.updatePagination();
                }
            };

            BootstrapTable.prototype.nextPage = function () {
                if (this.options.pageNumber < this.options.totalPages) {
                    this.options.pageNumber++;
                    this.updatePagination();
                }
            };

            BootstrapTable.prototype.toggleView = function () {
                this.options.cardView = !this.options.cardView;
                this.initHeader();
                // Fixed remove toolbar when click cardView button.
                //that.initToolbar();
                this.initBody();
                this.trigger('toggle', this.options.cardView);
            };

            BootstrapTable.prototype.refreshOptions = function (options) {
                //If the objects are equivalent then avoid the call of destroy / init methods
                if (compareObjects(this.options, options, true)) {
                    return;
                }
                this.options = $.extend(this.options, options);
                this.trigger('refresh-options', this.options);
                this.destroy();
                this.init();
            };

            BootstrapTable.prototype.resetSearch = function (text) {
                var $search = this.$toolbar.find('.search input');
                $search.val(text || '');
                this.onSearch({ currentTarget: $search });
            };

            BootstrapTable.prototype.expandRow_ = function (expand, index) {
                var $tr = this.$body.find(sprintf('> tr[data-index="%s"]', index));
                if ($tr.next().is('tr.detail-view') === (expand ? false : true)) {
                    $tr.find('> td > .detail-icon').click();
                }
            };

            BootstrapTable.prototype.expandRow = function (index) {
                this.expandRow_(true, index);
            };

            BootstrapTable.prototype.collapseRow = function (index) {
                this.expandRow_(false, index);
            };

            BootstrapTable.prototype.expandAllRows = function (isSubTable) {
                if (isSubTable) {
                    var $tr = this.$body.find(sprintf('> tr[data-index="%s"]', 0)),
                        that = this,
                        detailIcon = null,
                        executeInterval = false,
                        idInterval = -1;

                    if (!$tr.next().is('tr.detail-view')) {
                        $tr.find('> td > .detail-icon').click();
                        executeInterval = true;
                    } else if (!$tr.next().next().is('tr.detail-view')) {
                        $tr.next().find(".detail-icon").click();
                        executeInterval = true;
                    }

                    if (executeInterval) {
                        try {
                            idInterval = setInterval(function () {
                                detailIcon = that.$body.find("tr.detail-view").last().find(".detail-icon");
                                if (detailIcon.length > 0) {
                                    detailIcon.click();
                                } else {
                                    clearInterval(idInterval);
                                }
                            }, 1);
                        } catch (ex) {
                            clearInterval(idInterval);
                        }
                    }
                } else {
                    var trs = this.$body.children();
                    for (var i = 0; i < trs.length; i++) {
                        this.expandRow_(true, $(trs[i]).data("index"));
                    }
                }
            };

            BootstrapTable.prototype.collapseAllRows = function (isSubTable) {
                if (isSubTable) {
                    this.expandRow_(false, 0);
                } else {
                    var trs = this.$body.children();
                    for (var i = 0; i < trs.length; i++) {
                        this.expandRow_(false, $(trs[i]).data("index"));
                    }
                }
            };

            BootstrapTable.prototype.updateFormatText = function (name, text) {
                if (this.options[sprintf('format%s', name)]) {
                    if (typeof text === 'string') {
                        this.options[sprintf('format%s', name)] = function () {
                            return text;
                        };
                    } else if (typeof text === 'function') {
                        this.options[sprintf('format%s', name)] = text;
                    }
                }
                this.initToolbar();
                this.initPagination();
                this.initBody();
            };

            // BOOTSTRAP TABLE PLUGIN DEFINITION
            // =======================

            var allowedMethods = ['getOptions', 'getSelections', 'getAllSelections', 'getData', 'load', 'append', 'prepend', 'remove', 'removeAll', 'insertRow', 'updateRow', 'updateCell', 'updateByUniqueId', 'removeByUniqueId', 'getRowByUniqueId', 'showRow', 'hideRow', 'getHiddenRows', 'mergeCells', 'checkAll', 'uncheckAll', 'checkInvert', 'check', 'uncheck', 'checkBy', 'uncheckBy', 'refresh', 'resetView', 'resetWidth', 'destroy', 'showLoading', 'hideLoading', 'showColumn', 'hideColumn', 'getHiddenColumns', 'getVisibleColumns', 'showAllColumns', 'hideAllColumns', 'filterBy', 'scrollTo', 'getScrollPosition', 'selectPage', 'prevPage', 'nextPage', 'togglePagination', 'toggleView', 'refreshOptions', 'resetSearch', 'expandRow', 'collapseRow', 'expandAllRows', 'collapseAllRows', 'updateFormatText'];

            $.fn.bootstrapTable = function (option) {
                var value,
                    args = Array.prototype.slice.call(arguments, 1);

                this.each(function () {
                    var $this = $(this),
                        data = $this.data('bootstrap.table'),
                        options = $.extend({}, BootstrapTable.DEFAULTS, $this.data(), typeof option === 'object' && option);

                    if (typeof option === 'string') {
                        if ($.inArray(option, allowedMethods) < 0) {
                            throw new Error("Unknown method: " + option);
                        }

                        if (!data) {
                            return;
                        }

                        value = data[option].apply(data, args);

                        if (option === 'destroy') {
                            $this.removeData('bootstrap.table');
                        }
                    }

                    if (!data) {
                        $this.data('bootstrap.table', data = new BootstrapTable(this, options));
                    }
                });

                return typeof value === 'undefined' ? this : value;
            };

            $.fn.bootstrapTable.Constructor = BootstrapTable;
            $.fn.bootstrapTable.defaults = BootstrapTable.DEFAULTS;
            $.fn.bootstrapTable.columnDefaults = BootstrapTable.COLUMN_DEFAULTS;
            $.fn.bootstrapTable.locales = BootstrapTable.LOCALES;
            $.fn.bootstrapTable.methods = allowedMethods;
            $.fn.bootstrapTable.utils = {
                sprintf: sprintf,
                getFieldIndex: getFieldIndex,
                compareObjects: compareObjects,
                calculateObjectValue: calculateObjectValue,
                getItemField: getItemField,
                objectKeys: objectKeys,
                isIEBrowser: isIEBrowser
            };

            // BOOTSTRAP TABLE INIT
            // =======================

            $(function () {
                $('[data-toggle="table"]').bootstrapTable();
            });
        })(jQuery);
    })(this);

    return _retrieveGlobal();
});
System.registerDynamic("npm:x-editable@1.5.1.json", [], true, function() {
  return {
    "format": "global",
    "meta": {
      "*.json": {
        "format": "json"
      },
      "CHANGELOG.txt": {
        "globals": {
          "process": null
        }
      },
      "Gruntfile.js": {
        "globals": {
          "process": null
        }
      },
      "LICENSE-MIT": {
        "globals": {
          "process": null
        }
      },
      "Package.nuspec": {
        "globals": {
          "process": null
        }
      },
      "dist/*": {
        "globals": {
          "process": null
        }
      },
      "src/*": {
        "globals": {
          "process": null
        }
      },
      "test/*": {
        "globals": {
          "process": null
        }
      }
    }
  };
});

System.registerDynamic('npm:x-editable@1.5.1/dist/bootstrap3-editable/js/bootstrap-editable.js', [], false, function ($__require, $__exports, $__module) {
    var _retrieveGlobal = System.registry.get("@@global-helpers").prepareGlobal($__module.id, null, {});

    (function ($__global) {
        /*! X-editable - v1.5.1
        * In-place editing with Twitter Bootstrap, jQuery UI or pure jQuery
        * http://github.com/vitalets/x-editable
        * Copyright (c) 2013 Vitaliy Potapov; Licensed MIT */
        /**
        Form with single input element, two buttons and two states: normal/loading.
        Applied as jQuery method to DIV tag (not to form tag!). This is because form can be in loading state when spinner shown.
        Editableform is linked with one of input types, e.g. 'text', 'select' etc.

        @class editableform
        @uses text
        @uses textarea
        **/
        (function ($) {
            "use strict";

            var EditableForm = function (div, options) {
                this.options = $.extend({}, $.fn.editableform.defaults, options);
                this.$div = $(div); //div, containing form. Not form tag. Not editable-element.
                if (!this.options.scope) {
                    this.options.scope = this;
                }
                //nothing shown after init
            };

            EditableForm.prototype = {
                constructor: EditableForm,
                initInput: function () {
                    //called once
                    //take input from options (as it is created in editable-element)
                    this.input = this.options.input;

                    //set initial value
                    //todo: may be add check: typeof str === 'string' ?
                    this.value = this.input.str2value(this.options.value);

                    //prerender: get input.$input
                    this.input.prerender();
                },
                initTemplate: function () {
                    this.$form = $($.fn.editableform.template);
                },
                initButtons: function () {
                    var $btn = this.$form.find('.editable-buttons');
                    $btn.append($.fn.editableform.buttons);
                    if (this.options.showbuttons === 'bottom') {
                        $btn.addClass('editable-buttons-bottom');
                    }
                },
                /**
                Renders editableform
                 @method render
                **/
                render: function () {
                    //init loader
                    this.$loading = $($.fn.editableform.loading);
                    this.$div.empty().append(this.$loading);

                    //init form template and buttons
                    this.initTemplate();
                    if (this.options.showbuttons) {
                        this.initButtons();
                    } else {
                        this.$form.find('.editable-buttons').remove();
                    }

                    //show loading state
                    this.showLoading();

                    //flag showing is form now saving value to server.
                    //It is needed to wait when closing form.
                    this.isSaving = false;

                    /**
                    Fired when rendering starts
                    @event rendering
                    @param {Object} event event object
                    **/
                    this.$div.triggerHandler('rendering');

                    //init input
                    this.initInput();

                    //append input to form
                    this.$form.find('div.editable-input').append(this.input.$tpl);

                    //append form to container
                    this.$div.append(this.$form);

                    //render input
                    $.when(this.input.render()).then($.proxy(function () {
                        //setup input to submit automatically when no buttons shown
                        if (!this.options.showbuttons) {
                            this.input.autosubmit();
                        }

                        //attach 'cancel' handler
                        this.$form.find('.editable-cancel').click($.proxy(this.cancel, this));

                        if (this.input.error) {
                            this.error(this.input.error);
                            this.$form.find('.editable-submit').attr('disabled', true);
                            this.input.$input.attr('disabled', true);
                            //prevent form from submitting
                            this.$form.submit(function (e) {
                                e.preventDefault();
                            });
                        } else {
                            this.error(false);
                            this.input.$input.removeAttr('disabled');
                            this.$form.find('.editable-submit').removeAttr('disabled');
                            var value = this.value === null || this.value === undefined || this.value === '' ? this.options.defaultValue : this.value;
                            this.input.value2input(value);
                            //attach submit handler
                            this.$form.submit($.proxy(this.submit, this));
                        }

                        /**
                        Fired when form is rendered
                        @event rendered
                        @param {Object} event event object
                        **/
                        this.$div.triggerHandler('rendered');

                        this.showForm();

                        //call postrender method to perform actions required visibility of form
                        if (this.input.postrender) {
                            this.input.postrender();
                        }
                    }, this));
                },
                cancel: function () {
                    /**
                    Fired when form was cancelled by user
                    @event cancel
                    @param {Object} event event object
                    **/
                    this.$div.triggerHandler('cancel');
                },
                showLoading: function () {
                    var w, h;
                    if (this.$form) {
                        //set loading size equal to form
                        w = this.$form.outerWidth();
                        h = this.$form.outerHeight();
                        if (w) {
                            this.$loading.width(w);
                        }
                        if (h) {
                            this.$loading.height(h);
                        }
                        this.$form.hide();
                    } else {
                        //stretch loading to fill container width
                        w = this.$loading.parent().width();
                        if (w) {
                            this.$loading.width(w);
                        }
                    }
                    this.$loading.show();
                },

                showForm: function (activate) {
                    this.$loading.hide();
                    this.$form.show();
                    if (activate !== false) {
                        this.input.activate();
                    }
                    /**
                    Fired when form is shown
                    @event show
                    @param {Object} event event object
                    **/
                    this.$div.triggerHandler('show');
                },

                error: function (msg) {
                    var $group = this.$form.find('.control-group'),
                        $block = this.$form.find('.editable-error-block'),
                        lines;

                    if (msg === false) {
                        $group.removeClass($.fn.editableform.errorGroupClass);
                        $block.removeClass($.fn.editableform.errorBlockClass).empty().hide();
                    } else {
                        //convert newline to <br> for more pretty error display
                        if (msg) {
                            lines = ('' + msg).split('\n');
                            for (var i = 0; i < lines.length; i++) {
                                lines[i] = $('<div>').text(lines[i]).html();
                            }
                            msg = lines.join('<br>');
                        }
                        $group.addClass($.fn.editableform.errorGroupClass);
                        $block.addClass($.fn.editableform.errorBlockClass).html(msg).show();
                    }
                },

                submit: function (e) {
                    e.stopPropagation();
                    e.preventDefault();

                    //get new value from input
                    var newValue = this.input.input2value();

                    //validation: if validate returns string or truthy value - means error
                    //if returns object like {newValue: '...'} => submitted value is reassigned to it
                    var error = this.validate(newValue);
                    if ($.type(error) === 'object' && error.newValue !== undefined) {
                        newValue = error.newValue;
                        this.input.value2input(newValue);
                        if (typeof error.msg === 'string') {
                            this.error(error.msg);
                            this.showForm();
                            return;
                        }
                    } else if (error) {
                        this.error(error);
                        this.showForm();
                        return;
                    }

                    //if value not changed --> trigger 'nochange' event and return
                    /*jslint eqeq: true*/
                    if (!this.options.savenochange && this.input.value2str(newValue) == this.input.value2str(this.value)) {
                        /*jslint eqeq: false*/
                        /**
                        Fired when value not changed but form is submitted. Requires savenochange = false.
                        @event nochange
                        @param {Object} event event object
                        **/
                        this.$div.triggerHandler('nochange');
                        return;
                    }

                    //convert value for submitting to server
                    var submitValue = this.input.value2submit(newValue);

                    this.isSaving = true;

                    //sending data to server
                    $.when(this.save(submitValue)).done($.proxy(function (response) {
                        this.isSaving = false;

                        //run success callback
                        var res = typeof this.options.success === 'function' ? this.options.success.call(this.options.scope, response, newValue) : null;

                        //if success callback returns false --> keep form open and do not activate input
                        if (res === false) {
                            this.error(false);
                            this.showForm(false);
                            return;
                        }

                        //if success callback returns string -->  keep form open, show error and activate input
                        if (typeof res === 'string') {
                            this.error(res);
                            this.showForm();
                            return;
                        }

                        //if success callback returns object like {newValue: <something>} --> use that value instead of submitted
                        //it is usefull if you want to chnage value in url-function
                        if (res && typeof res === 'object' && res.hasOwnProperty('newValue')) {
                            newValue = res.newValue;
                        }

                        //clear error message
                        this.error(false);
                        this.value = newValue;
                        /**
                        Fired when form is submitted
                        @event save
                        @param {Object} event event object
                        @param {Object} params additional params
                        @param {mixed} params.newValue raw new value
                        @param {mixed} params.submitValue submitted value as string
                        @param {Object} params.response ajax response
                         @example
                        $('#form-div').on('save'), function(e, params){
                            if(params.newValue === 'username') {...}
                        });
                        **/
                        this.$div.triggerHandler('save', { newValue: newValue, submitValue: submitValue, response: response });
                    }, this)).fail($.proxy(function (xhr) {
                        this.isSaving = false;

                        var msg;
                        if (typeof this.options.error === 'function') {
                            msg = this.options.error.call(this.options.scope, xhr, newValue);
                        } else {
                            msg = typeof xhr === 'string' ? xhr : xhr.responseText || xhr.statusText || 'Unknown error!';
                        }

                        this.error(msg);
                        this.showForm();
                    }, this));
                },

                save: function (submitValue) {
                    //try parse composite pk defined as json string in data-pk
                    this.options.pk = $.fn.editableutils.tryParseJson(this.options.pk, true);

                    var pk = typeof this.options.pk === 'function' ? this.options.pk.call(this.options.scope) : this.options.pk,

                    /*
                      send on server in following cases:
                      1. url is function
                      2. url is string AND (pk defined OR send option = always)
                    */
                    send = !!(typeof this.options.url === 'function' || this.options.url && (this.options.send === 'always' || this.options.send === 'auto' && pk !== null && pk !== undefined)),
                        params;

                    if (send) {
                        //send to server
                        this.showLoading();

                        //standard params
                        params = {
                            name: this.options.name || '',
                            value: submitValue,
                            pk: pk
                        };

                        //additional params
                        if (typeof this.options.params === 'function') {
                            params = this.options.params.call(this.options.scope, params);
                        } else {
                            //try parse json in single quotes (from data-params attribute)
                            this.options.params = $.fn.editableutils.tryParseJson(this.options.params, true);
                            $.extend(params, this.options.params);
                        }

                        if (typeof this.options.url === 'function') {
                            //user's function
                            return this.options.url.call(this.options.scope, params);
                        } else {
                            //send ajax to server and return deferred object
                            return $.ajax($.extend({
                                url: this.options.url,
                                data: params,
                                type: 'POST'
                            }, this.options.ajaxOptions));
                        }
                    }
                },

                validate: function (value) {
                    if (value === undefined) {
                        value = this.value;
                    }
                    if (typeof this.options.validate === 'function') {
                        return this.options.validate.call(this.options.scope, value);
                    }
                },

                option: function (key, value) {
                    if (key in this.options) {
                        this.options[key] = value;
                    }

                    if (key === 'value') {
                        this.setValue(value);
                    }

                    //do not pass option to input as it is passed in editable-element
                },

                setValue: function (value, convertStr) {
                    if (convertStr) {
                        this.value = this.input.str2value(value);
                    } else {
                        this.value = value;
                    }

                    //if form is visible, update input
                    if (this.$form && this.$form.is(':visible')) {
                        this.input.value2input(this.value);
                    }
                }
            };

            /*
            Initialize editableform. Applied to jQuery object.
             @method $().editableform(options)
            @params {Object} options
            @example
            var $form = $('&lt;div&gt;').editableform({
                type: 'text',
                name: 'username',
                url: '/post',
                value: 'vitaliy'
            });
             //to display form you should call 'render' method
            $form.editableform('render');
            */
            $.fn.editableform = function (option) {
                var args = arguments;
                return this.each(function () {
                    var $this = $(this),
                        data = $this.data('editableform'),
                        options = typeof option === 'object' && option;
                    if (!data) {
                        $this.data('editableform', data = new EditableForm(this, options));
                    }

                    if (typeof option === 'string') {
                        //call method
                        data[option].apply(data, Array.prototype.slice.call(args, 1));
                    }
                });
            };

            //keep link to constructor to allow inheritance
            $.fn.editableform.Constructor = EditableForm;

            //defaults
            $.fn.editableform.defaults = {
                /* see also defaults for input */

                /**
                Type of input. Can be <code>text|textarea|select|date|checklist</code>
                 @property type
                @type string
                @default 'text'
                **/
                type: 'text',
                /**
                Url for submit, e.g. <code>'/post'</code>
                If function - it will be called instead of ajax. Function should return deferred object to run fail/done callbacks.
                 @property url
                @type string|function
                @default null
                @example
                url: function(params) {
                    var d = new $.Deferred;
                    if(params.value === 'abc') {
                        return d.reject('error message'); //returning error via deferred object
                    } else {
                        //async saving data in js model
                        someModel.asyncSaveMethod({
                           ...,
                           success: function(){
                              d.resolve();
                           }
                        });
                        return d.promise();
                    }
                }
                **/
                url: null,
                /**
                Additional params for submit. If defined as <code>object</code> - it is **appended** to original ajax data (pk, name and value).
                If defined as <code>function</code> - returned object **overwrites** original ajax data.
                @example
                params: function(params) {
                    //originally params contain pk, name and value
                    params.a = 1;
                    return params;
                }
                 @property params
                @type object|function
                @default null
                **/
                params: null,
                /**
                Name of field. Will be submitted on server. Can be taken from <code>id</code> attribute
                 @property name
                @type string
                @default null
                **/
                name: null,
                /**
                Primary key of editable object (e.g. record id in database). For composite keys use object, e.g. <code>{id: 1, lang: 'en'}</code>.
                Can be calculated dynamically via function.
                 @property pk
                @type string|object|function
                @default null
                **/
                pk: null,
                /**
                Initial value. If not defined - will be taken from element's content.
                For __select__ type should be defined (as it is ID of shown text).
                 @property value
                @type string|object
                @default null
                **/
                value: null,
                /**
                Value that will be displayed in input if original field value is empty (`null|undefined|''`).
                 @property defaultValue
                @type string|object
                @default null
                @since 1.4.6
                **/
                defaultValue: null,
                /**
                Strategy for sending data on server. Can be `auto|always|never`.
                When 'auto' data will be sent on server **only if pk and url defined**, otherwise new value will be stored locally.
                 @property send
                @type string
                @default 'auto'
                **/
                send: 'auto',
                /**
                Function for client-side validation. If returns string - means validation not passed and string showed as error.
                Since 1.5.1 you can modify submitted value by returning object from `validate`:
                `{newValue: '...'}` or `{newValue: '...', msg: '...'}`
                 @property validate
                @type function
                @default null
                @example
                validate: function(value) {
                    if($.trim(value) == '') {
                        return 'This field is required';
                    }
                }
                **/
                validate: null,
                /**
                Success callback. Called when value successfully sent on server and **response status = 200**.
                Usefull to work with json response. For example, if your backend response can be <code>{success: true}</code>
                or <code>{success: false, msg: "server error"}</code> you can check it inside this callback.
                If it returns **string** - means error occured and string is shown as error message.
                If it returns **object like** <code>{newValue: &lt;something&gt;}</code> - it overwrites value, submitted by user.
                Otherwise newValue simply rendered into element.

                @property success
                @type function
                @default null
                @example
                success: function(response, newValue) {
                    if(!response.success) return response.msg;
                }
                **/
                success: null,
                /**
                Error callback. Called when request failed (response status != 200).
                Usefull when you want to parse error response and display a custom message.
                Must return **string** - the message to be displayed in the error block.

                @property error
                @type function
                @default null
                @since 1.4.4
                @example
                error: function(response, newValue) {
                    if(response.status === 500) {
                        return 'Service unavailable. Please try later.';
                    } else {
                        return response.responseText;
                    }
                }
                **/
                error: null,
                /**
                Additional options for submit ajax request.
                List of values: http://api.jquery.com/jQuery.ajax

                @property ajaxOptions
                @type object
                @default null
                @since 1.1.1
                @example
                ajaxOptions: {
                    type: 'put',
                    dataType: 'json'
                }
                **/
                ajaxOptions: null,
                /**
                Where to show buttons: left(true)|bottom|false
                Form without buttons is auto-submitted.
                 @property showbuttons
                @type boolean|string
                @default true
                @since 1.1.1
                **/
                showbuttons: true,
                /**
                Scope for callback methods (success, validate).
                If <code>null</code> means editableform instance itself.
                 @property scope
                @type DOMElement|object
                @default null
                @since 1.2.0
                @private
                **/
                scope: null,
                /**
                Whether to save or cancel value when it was not changed but form was submitted
                 @property savenochange
                @type boolean
                @default false
                @since 1.2.0
                **/
                savenochange: false
            };

            /*
            Note: following params could redefined in engine: bootstrap or jqueryui:
            Classes 'control-group' and 'editable-error-block' must always present!
            */
            $.fn.editableform.template = '<form class="form-inline editableform">' + '<div class="control-group">' + '<div><div class="editable-input"></div><div class="editable-buttons"></div></div>' + '<div class="editable-error-block"></div>' + '</div>' + '</form>';

            //loading div
            $.fn.editableform.loading = '<div class="editableform-loading"></div>';

            //buttons
            $.fn.editableform.buttons = '<button type="submit" class="editable-submit">ok</button>' + '<button type="button" class="editable-cancel">cancel</button>';

            //error class attached to control-group
            $.fn.editableform.errorGroupClass = null;

            //error class attached to editable-error-block
            $.fn.editableform.errorBlockClass = 'editable-error';

            //engine
            $.fn.editableform.engine = 'jquery';
        })(window.jQuery);

        /**
        * EditableForm utilites
        */
        (function ($) {
            "use strict";

            //utils

            $.fn.editableutils = {
                /**
                * classic JS inheritance function
                */
                inherit: function (Child, Parent) {
                    var F = function () {};
                    F.prototype = Parent.prototype;
                    Child.prototype = new F();
                    Child.prototype.constructor = Child;
                    Child.superclass = Parent.prototype;
                },

                /**
                * set caret position in input
                * see http://stackoverflow.com/questions/499126/jquery-set-cursor-position-in-text-area
                */
                setCursorPosition: function (elem, pos) {
                    if (elem.setSelectionRange) {
                        elem.setSelectionRange(pos, pos);
                    } else if (elem.createTextRange) {
                        var range = elem.createTextRange();
                        range.collapse(true);
                        range.moveEnd('character', pos);
                        range.moveStart('character', pos);
                        range.select();
                    }
                },

                /**
                * function to parse JSON in *single* quotes. (jquery automatically parse only double quotes)
                * That allows such code as: <a data-source="{'a': 'b', 'c': 'd'}">
                * safe = true --> means no exception will be thrown
                * for details see http://stackoverflow.com/questions/7410348/how-to-set-json-format-to-html5-data-attributes-in-the-jquery
                */
                tryParseJson: function (s, safe) {
                    if (typeof s === 'string' && s.length && s.match(/^[\{\[].*[\}\]]$/)) {
                        if (safe) {
                            try {
                                /*jslint evil: true*/
                                s = new Function('return ' + s)();
                                /*jslint evil: false*/
                            } catch (e) {} finally {
                                return s;
                            }
                        } else {
                            /*jslint evil: true*/
                            s = new Function('return ' + s)();
                            /*jslint evil: false*/
                        }
                    }
                    return s;
                },

                /**
                * slice object by specified keys
                */
                sliceObj: function (obj, keys, caseSensitive /* default: false */) {
                    var key,
                        keyLower,
                        newObj = {};

                    if (!$.isArray(keys) || !keys.length) {
                        return newObj;
                    }

                    for (var i = 0; i < keys.length; i++) {
                        key = keys[i];
                        if (obj.hasOwnProperty(key)) {
                            newObj[key] = obj[key];
                        }

                        if (caseSensitive === true) {
                            continue;
                        }

                        //when getting data-* attributes via $.data() it's converted to lowercase.
                        //details: http://stackoverflow.com/questions/7602565/using-data-attributes-with-jquery
                        //workaround is code below.
                        keyLower = key.toLowerCase();
                        if (obj.hasOwnProperty(keyLower)) {
                            newObj[key] = obj[keyLower];
                        }
                    }

                    return newObj;
                },

                /*
                exclude complex objects from $.data() before pass to config
                */
                getConfigData: function ($element) {
                    var data = {};
                    $.each($element.data(), function (k, v) {
                        if (typeof v !== 'object' || v && typeof v === 'object' && (v.constructor === Object || v.constructor === Array)) {
                            data[k] = v;
                        }
                    });
                    return data;
                },

                /*
                 returns keys of object
                */
                objectKeys: function (o) {
                    if (Object.keys) {
                        return Object.keys(o);
                    } else {
                        if (o !== Object(o)) {
                            throw new TypeError('Object.keys called on a non-object');
                        }
                        var k = [],
                            p;
                        for (p in o) {
                            if (Object.prototype.hasOwnProperty.call(o, p)) {
                                k.push(p);
                            }
                        }
                        return k;
                    }
                },

                /**
                 method to escape html.
                **/
                escape: function (str) {
                    return $('<div>').text(str).html();
                },

                /*
                 returns array items from sourceData having value property equal or inArray of 'value'
                */
                itemsByValue: function (value, sourceData, valueProp) {
                    if (!sourceData || value === null) {
                        return [];
                    }

                    if (typeof valueProp !== "function") {
                        var idKey = valueProp || 'value';
                        valueProp = function (e) {
                            return e[idKey];
                        };
                    }

                    var isValArray = $.isArray(value),
                        result = [],
                        that = this;

                    $.each(sourceData, function (i, o) {
                        if (o.children) {
                            result = result.concat(that.itemsByValue(value, o.children, valueProp));
                        } else {
                            /*jslint eqeq: true*/
                            if (isValArray) {
                                if ($.grep(value, function (v) {
                                    return v == (o && typeof o === 'object' ? valueProp(o) : o);
                                }).length) {
                                    result.push(o);
                                }
                            } else {
                                var itemValue = o && typeof o === 'object' ? valueProp(o) : o;
                                if (value == itemValue) {
                                    result.push(o);
                                }
                            }
                            /*jslint eqeq: false*/
                        }
                    });

                    return result;
                },

                /*
                Returns input by options: type, mode.
                */
                createInput: function (options) {
                    var TypeConstructor,
                        typeOptions,
                        input,
                        type = options.type;

                    //`date` is some kind of virtual type that is transformed to one of exact types
                    //depending on mode and core lib
                    if (type === 'date') {
                        //inline
                        if (options.mode === 'inline') {
                            if ($.fn.editabletypes.datefield) {
                                type = 'datefield';
                            } else if ($.fn.editabletypes.dateuifield) {
                                type = 'dateuifield';
                            }
                            //popup
                        } else {
                            if ($.fn.editabletypes.date) {
                                type = 'date';
                            } else if ($.fn.editabletypes.dateui) {
                                type = 'dateui';
                            }
                        }

                        //if type still `date` and not exist in types, replace with `combodate` that is base input
                        if (type === 'date' && !$.fn.editabletypes.date) {
                            type = 'combodate';
                        }
                    }

                    //`datetime` should be datetimefield in 'inline' mode
                    if (type === 'datetime' && options.mode === 'inline') {
                        type = 'datetimefield';
                    }

                    //change wysihtml5 to textarea for jquery UI and plain versions
                    if (type === 'wysihtml5' && !$.fn.editabletypes[type]) {
                        type = 'textarea';
                    }

                    //create input of specified type. Input will be used for converting value, not in form
                    if (typeof $.fn.editabletypes[type] === 'function') {
                        TypeConstructor = $.fn.editabletypes[type];
                        typeOptions = this.sliceObj(options, this.objectKeys(TypeConstructor.defaults));
                        input = new TypeConstructor(typeOptions);
                        return input;
                    } else {
                        $.error('Unknown type: ' + type);
                        return false;
                    }
                },

                //see http://stackoverflow.com/questions/7264899/detect-css-transitions-using-javascript-and-without-modernizr
                supportsTransitions: function () {
                    var b = document.body || document.documentElement,
                        s = b.style,
                        p = 'transition',
                        v = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'];

                    if (typeof s[p] === 'string') {
                        return true;
                    }

                    // Tests for vendor specific prop
                    p = p.charAt(0).toUpperCase() + p.substr(1);
                    for (var i = 0; i < v.length; i++) {
                        if (typeof s[v[i] + p] === 'string') {
                            return true;
                        }
                    }
                    return false;
                }

            };
        })(window.jQuery);

        /**
        Attaches stand-alone container with editable-form to HTML element. Element is used only for positioning, value is not stored anywhere.<br>
        This method applied internally in <code>$().editable()</code>. You should subscribe on it's events (save / cancel) to get profit of it.<br>
        Final realization can be different: bootstrap-popover, jqueryui-tooltip, poshytip, inline-div. It depends on which js file you include.<br>
        Applied as jQuery method.

        @class editableContainer
        @uses editableform
        **/
        (function ($) {
            "use strict";

            var Popup = function (element, options) {
                this.init(element, options);
            };

            var Inline = function (element, options) {
                this.init(element, options);
            };

            //methods
            Popup.prototype = {
                containerName: null, //method to call container on element
                containerDataName: null, //object name in element's .data()
                innerCss: null, //tbd in child class
                containerClass: 'editable-container editable-popup', //css class applied to container element
                defaults: {}, //container itself defaults

                init: function (element, options) {
                    this.$element = $(element);
                    //since 1.4.1 container do not use data-* directly as they already merged into options.
                    this.options = $.extend({}, $.fn.editableContainer.defaults, options);
                    this.splitOptions();

                    //set scope of form callbacks to element
                    this.formOptions.scope = this.$element[0];

                    this.initContainer();

                    //flag to hide container, when saving value will finish
                    this.delayedHide = false;

                    //bind 'destroyed' listener to destroy container when element is removed from dom
                    this.$element.on('destroyed', $.proxy(function () {
                        this.destroy();
                    }, this));

                    //attach document handler to close containers on click / escape
                    if (!$(document).data('editable-handlers-attached')) {
                        //close all on escape
                        $(document).on('keyup.editable', function (e) {
                            if (e.which === 27) {
                                $('.editable-open').editableContainer('hide');
                                //todo: return focus on element
                            }
                        });

                        //close containers when click outside
                        //(mousedown could be better than click, it closes everything also on drag drop)
                        $(document).on('click.editable', function (e) {
                            var $target = $(e.target),
                                i,
                                exclude_classes = ['.editable-container', '.ui-datepicker-header', '.datepicker', //in inline mode datepicker is rendered into body
                            '.modal-backdrop', '.bootstrap-wysihtml5-insert-image-modal', '.bootstrap-wysihtml5-insert-link-modal'];

                            //check if element is detached. It occurs when clicking in bootstrap datepicker
                            if (!$.contains(document.documentElement, e.target)) {
                                return;
                            }

                            //for some reason FF 20 generates extra event (click) in select2 widget with e.target = document
                            //we need to filter it via construction below. See https://github.com/vitalets/x-editable/issues/199
                            //Possibly related to http://stackoverflow.com/questions/10119793/why-does-firefox-react-differently-from-webkit-and-ie-to-click-event-on-selec
                            if ($target.is(document)) {
                                return;
                            }

                            //if click inside one of exclude classes --> no nothing
                            for (i = 0; i < exclude_classes.length; i++) {
                                if ($target.is(exclude_classes[i]) || $target.parents(exclude_classes[i]).length) {
                                    return;
                                }
                            }

                            //close all open containers (except one - target)
                            Popup.prototype.closeOthers(e.target);
                        });

                        $(document).data('editable-handlers-attached', true);
                    }
                },

                //split options on containerOptions and formOptions
                splitOptions: function () {
                    this.containerOptions = {};
                    this.formOptions = {};

                    if (!$.fn[this.containerName]) {
                        throw new Error(this.containerName + ' not found. Have you included corresponding js file?');
                    }

                    //keys defined in container defaults go to container, others go to form
                    for (var k in this.options) {
                        if (k in this.defaults) {
                            this.containerOptions[k] = this.options[k];
                        } else {
                            this.formOptions[k] = this.options[k];
                        }
                    }
                },

                /*
                Returns jquery object of container
                @method tip()
                */
                tip: function () {
                    return this.container() ? this.container().$tip : null;
                },

                /* returns container object */
                container: function () {
                    var container;
                    //first, try get it by `containerDataName`
                    if (this.containerDataName) {
                        if (container = this.$element.data(this.containerDataName)) {
                            return container;
                        }
                    }
                    //second, try `containerName`
                    container = this.$element.data(this.containerName);
                    return container;
                },

                /* call native method of underlying container, e.g. this.$element.popover('method') */
                call: function () {
                    this.$element[this.containerName].apply(this.$element, arguments);
                },

                initContainer: function () {
                    this.call(this.containerOptions);
                },

                renderForm: function () {
                    this.$form.editableform(this.formOptions).on({
                        save: $.proxy(this.save, this), //click on submit button (value changed)
                        nochange: $.proxy(function () {
                            this.hide('nochange');
                        }, this), //click on submit button (value NOT changed)
                        cancel: $.proxy(function () {
                            this.hide('cancel');
                        }, this), //click on calcel button
                        show: $.proxy(function () {
                            if (this.delayedHide) {
                                this.hide(this.delayedHide.reason);
                                this.delayedHide = false;
                            } else {
                                this.setPosition();
                            }
                        }, this), //re-position container every time form is shown (occurs each time after loading state)
                        rendering: $.proxy(this.setPosition, this), //this allows to place container correctly when loading shown
                        resize: $.proxy(this.setPosition, this), //this allows to re-position container when form size is changed
                        rendered: $.proxy(function () {
                            /**
                            Fired when container is shown and form is rendered (for select will wait for loading dropdown options).
                            **Note:** Bootstrap popover has own `shown` event that now cannot be separated from x-editable's one.
                            The workaround is to check `arguments.length` that is always `2` for x-editable.

                            @event shown
                            @param {Object} event event object
                            @example
                            $('#username').on('shown', function(e, editable) {
                                editable.input.$input.val('overwriting value of input..');
                            });
                            **/
                            /*
                             TODO: added second param mainly to distinguish from bootstrap's shown event. It's a hotfix that will be solved in future versions via namespaced events.
                            */
                            this.$element.triggerHandler('shown', $(this.options.scope).data('editable'));
                        }, this)
                    }).editableform('render');
                },

                /**
                Shows container with form
                @method show()
                @param {boolean} closeAll Whether to close all other editable containers when showing this one. Default true.
                **/
                /* Note: poshytip owerwrites this method totally! */
                show: function (closeAll) {
                    this.$element.addClass('editable-open');
                    if (closeAll !== false) {
                        //close all open containers (except this)
                        this.closeOthers(this.$element[0]);
                    }

                    //show container itself
                    this.innerShow();
                    this.tip().addClass(this.containerClass);

                    /*
                    Currently, form is re-rendered on every show.
                    The main reason is that we dont know, what will container do with content when closed:
                    remove(), detach() or just hide() - it depends on container.

                    Detaching form itself before hide and re-insert before show is good solution,
                    but visually it looks ugly --> container changes size before hide.
                    */

                    //if form already exist - delete previous data
                    if (this.$form) {
                        //todo: destroy prev data!
                        //this.$form.destroy();
                    }

                    this.$form = $('<div>');

                    //insert form into container body
                    if (this.tip().is(this.innerCss)) {
                        //for inline container
                        this.tip().append(this.$form);
                    } else {
                        this.tip().find(this.innerCss).append(this.$form);
                    }

                    //render form
                    this.renderForm();
                },

                /**
                Hides container with form
                @method hide()
                @param {string} reason Reason caused hiding. Can be <code>save|cancel|onblur|nochange|undefined (=manual)</code>
                **/
                hide: function (reason) {
                    if (!this.tip() || !this.tip().is(':visible') || !this.$element.hasClass('editable-open')) {
                        return;
                    }

                    //if form is saving value, schedule hide
                    if (this.$form.data('editableform').isSaving) {
                        this.delayedHide = { reason: reason };
                        return;
                    } else {
                        this.delayedHide = false;
                    }

                    this.$element.removeClass('editable-open');
                    this.innerHide();

                    /**
                    Fired when container was hidden. It occurs on both save or cancel.
                    **Note:** Bootstrap popover has own `hidden` event that now cannot be separated from x-editable's one.
                    The workaround is to check `arguments.length` that is always `2` for x-editable.
                     @event hidden
                    @param {object} event event object
                    @param {string} reason Reason caused hiding. Can be <code>save|cancel|onblur|nochange|manual</code>
                    @example
                    $('#username').on('hidden', function(e, reason) {
                        if(reason === 'save' || reason === 'cancel') {
                            //auto-open next editable
                            $(this).closest('tr').next().find('.editable').editable('show');
                        }
                    });
                    **/
                    this.$element.triggerHandler('hidden', reason || 'manual');
                },

                /* internal show method. To be overwritten in child classes */
                innerShow: function () {},

                /* internal hide method. To be overwritten in child classes */
                innerHide: function () {},

                /**
                Toggles container visibility (show / hide)
                @method toggle()
                @param {boolean} closeAll Whether to close all other editable containers when showing this one. Default true.
                **/
                toggle: function (closeAll) {
                    if (this.container() && this.tip() && this.tip().is(':visible')) {
                        this.hide();
                    } else {
                        this.show(closeAll);
                    }
                },

                /*
                Updates the position of container when content changed.
                @method setPosition()
                */
                setPosition: function () {
                    //tbd in child class
                },

                save: function (e, params) {
                    /**
                    Fired when new value was submitted. You can use <code>$(this).data('editableContainer')</code> inside handler to access to editableContainer instance

                    @event save
                    @param {Object} event event object
                    @param {Object} params additional params
                    @param {mixed} params.newValue submitted value
                    @param {Object} params.response ajax response
                    @example
                    $('#username').on('save', function(e, params) {
                        //assuming server response: '{success: true}'
                        var pk = $(this).data('editableContainer').options.pk;
                        if(params.response && params.response.success) {
                            alert('value: ' + params.newValue + ' with pk: ' + pk + ' saved!');
                        } else {
                            alert('error!');
                        }
                    });
                    **/
                    this.$element.triggerHandler('save', params);

                    //hide must be after trigger, as saving value may require methods of plugin, applied to input
                    this.hide('save');
                },

                /**
                Sets new option

                @method option(key, value)
                @param {string} key
                @param {mixed} value
                **/
                option: function (key, value) {
                    this.options[key] = value;
                    if (key in this.containerOptions) {
                        this.containerOptions[key] = value;
                        this.setContainerOption(key, value);
                    } else {
                        this.formOptions[key] = value;
                        if (this.$form) {
                            this.$form.editableform('option', key, value);
                        }
                    }
                },

                setContainerOption: function (key, value) {
                    this.call('option', key, value);
                },

                /**
                Destroys the container instance
                @method destroy()
                **/
                destroy: function () {
                    this.hide();
                    this.innerDestroy();
                    this.$element.off('destroyed');
                    this.$element.removeData('editableContainer');
                },

                /* to be overwritten in child classes */
                innerDestroy: function () {},

                /*
                Closes other containers except one related to passed element.
                Other containers can be cancelled or submitted (depends on onblur option)
                */
                closeOthers: function (element) {
                    $('.editable-open').each(function (i, el) {
                        //do nothing with passed element and it's children
                        if (el === element || $(el).find(element).length) {
                            return;
                        }

                        //otherwise cancel or submit all open containers
                        var $el = $(el),
                            ec = $el.data('editableContainer');

                        if (!ec) {
                            return;
                        }

                        if (ec.options.onblur === 'cancel') {
                            $el.data('editableContainer').hide('onblur');
                        } else if (ec.options.onblur === 'submit') {
                            $el.data('editableContainer').tip().find('form').submit();
                        }
                    });
                },

                /**
                Activates input of visible container (e.g. set focus)
                @method activate()
                **/
                activate: function () {
                    if (this.tip && this.tip().is(':visible') && this.$form) {
                        this.$form.data('editableform').input.activate();
                    }
                }

            };

            /**
            jQuery method to initialize editableContainer.

            @method $().editableContainer(options)
            @params {Object} options
            @example
            $('#edit').editableContainer({
                type: 'text',
                url: '/post',
                pk: 1,
                value: 'hello'
            });
            **/
            $.fn.editableContainer = function (option) {
                var args = arguments;
                return this.each(function () {
                    var $this = $(this),
                        dataKey = 'editableContainer',
                        data = $this.data(dataKey),
                        options = typeof option === 'object' && option,
                        Constructor = options.mode === 'inline' ? Inline : Popup;

                    if (!data) {
                        $this.data(dataKey, data = new Constructor(this, options));
                    }

                    if (typeof option === 'string') {
                        //call method
                        data[option].apply(data, Array.prototype.slice.call(args, 1));
                    }
                });
            };

            //store constructors
            $.fn.editableContainer.Popup = Popup;
            $.fn.editableContainer.Inline = Inline;

            //defaults
            $.fn.editableContainer.defaults = {
                /**
                Initial value of form input
                 @property value
                @type mixed
                @default null
                @private
                **/
                value: null,
                /**
                Placement of container relative to element. Can be <code>top|right|bottom|left</code>. Not used for inline container.
                 @property placement
                @type string
                @default 'top'
                **/
                placement: 'top',
                /**
                Whether to hide container on save/cancel.
                 @property autohide
                @type boolean
                @default true
                @private
                **/
                autohide: true,
                /**
                Action when user clicks outside the container. Can be <code>cancel|submit|ignore</code>.
                Setting <code>ignore</code> allows to have several containers open.
                 @property onblur
                @type string
                @default 'cancel'
                @since 1.1.1
                **/
                onblur: 'cancel',

                /**
                Animation speed (inline mode only)
                @property anim
                @type string
                @default false
                **/
                anim: false,

                /**
                Mode of editable, can be `popup` or `inline`

                @property mode
                @type string
                @default 'popup'
                @since 1.4.0
                **/
                mode: 'popup'
            };

            /*
            * workaround to have 'destroyed' event to destroy popover when element is destroyed
            * see http://stackoverflow.com/questions/2200494/jquery-trigger-event-when-an-element-is-removed-from-the-dom
            */
            jQuery.event.special.destroyed = {
                remove: function (o) {
                    if (o.handler) {
                        o.handler();
                    }
                }
            };
        })(window.jQuery);

        /**
        * Editable Inline
        * ---------------------
        */
        (function ($) {
            "use strict";

            //copy prototype from EditableContainer
            //extend methods

            $.extend($.fn.editableContainer.Inline.prototype, $.fn.editableContainer.Popup.prototype, {
                containerName: 'editableform',
                innerCss: '.editable-inline',
                containerClass: 'editable-container editable-inline', //css class applied to container element

                initContainer: function () {
                    //container is <span> element
                    this.$tip = $('<span></span>');

                    //convert anim to miliseconds (int)
                    if (!this.options.anim) {
                        this.options.anim = 0;
                    }
                },

                splitOptions: function () {
                    //all options are passed to form
                    this.containerOptions = {};
                    this.formOptions = this.options;
                },

                tip: function () {
                    return this.$tip;
                },

                innerShow: function () {
                    this.$element.hide();
                    this.tip().insertAfter(this.$element).show();
                },

                innerHide: function () {
                    this.$tip.hide(this.options.anim, $.proxy(function () {
                        this.$element.show();
                        this.innerDestroy();
                    }, this));
                },

                innerDestroy: function () {
                    if (this.tip()) {
                        this.tip().empty().remove();
                    }
                }
            });
        })(window.jQuery);
        /**
        Makes editable any HTML element on the page. Applied as jQuery method.

        @class editable
        @uses editableContainer
        **/
        (function ($) {
            "use strict";

            var Editable = function (element, options) {
                this.$element = $(element);
                //data-* has more priority over js options: because dynamically created elements may change data-*
                this.options = $.extend({}, $.fn.editable.defaults, options, $.fn.editableutils.getConfigData(this.$element));
                if (this.options.selector) {
                    this.initLive();
                } else {
                    this.init();
                }

                //check for transition support
                if (this.options.highlight && !$.fn.editableutils.supportsTransitions()) {
                    this.options.highlight = false;
                }
            };

            Editable.prototype = {
                constructor: Editable,
                init: function () {
                    var isValueByText = false,
                        doAutotext,
                        finalize;

                    //name
                    this.options.name = this.options.name || this.$element.attr('id');

                    //create input of specified type. Input needed already here to convert value for initial display (e.g. show text by id for select)
                    //also we set scope option to have access to element inside input specific callbacks (e. g. source as function)
                    this.options.scope = this.$element[0];
                    this.input = $.fn.editableutils.createInput(this.options);
                    if (!this.input) {
                        return;
                    }

                    //set value from settings or by element's text
                    if (this.options.value === undefined || this.options.value === null) {
                        this.value = this.input.html2value($.trim(this.$element.html()));
                        isValueByText = true;
                    } else {
                        /*
                          value can be string when received from 'data-value' attribute
                          for complext objects value can be set as json string in data-value attribute,
                          e.g. data-value="{city: 'Moscow', street: 'Lenina'}"
                        */
                        this.options.value = $.fn.editableutils.tryParseJson(this.options.value, true);
                        if (typeof this.options.value === 'string') {
                            this.value = this.input.str2value(this.options.value);
                        } else {
                            this.value = this.options.value;
                        }
                    }

                    //add 'editable' class to every editable element
                    this.$element.addClass('editable');

                    //specifically for "textarea" add class .editable-pre-wrapped to keep linebreaks
                    if (this.input.type === 'textarea') {
                        this.$element.addClass('editable-pre-wrapped');
                    }

                    //attach handler activating editable. In disabled mode it just prevent default action (useful for links)
                    if (this.options.toggle !== 'manual') {
                        this.$element.addClass('editable-click');
                        this.$element.on(this.options.toggle + '.editable', $.proxy(function (e) {
                            //prevent following link if editable enabled
                            if (!this.options.disabled) {
                                e.preventDefault();
                            }

                            //stop propagation not required because in document click handler it checks event target
                            //e.stopPropagation();

                            if (this.options.toggle === 'mouseenter') {
                                //for hover only show container
                                this.show();
                            } else {
                                //when toggle='click' we should not close all other containers as they will be closed automatically in document click listener
                                var closeAll = this.options.toggle !== 'click';
                                this.toggle(closeAll);
                            }
                        }, this));
                    } else {
                        this.$element.attr('tabindex', -1); //do not stop focus on element when toggled manually
                    }

                    //if display is function it's far more convinient to have autotext = always to render correctly on init
                    //see https://github.com/vitalets/x-editable-yii/issues/34
                    if (typeof this.options.display === 'function') {
                        this.options.autotext = 'always';
                    }

                    //check conditions for autotext:
                    switch (this.options.autotext) {
                        case 'always':
                            doAutotext = true;
                            break;
                        case 'auto':
                            //if element text is empty and value is defined and value not generated by text --> run autotext
                            doAutotext = !$.trim(this.$element.text()).length && this.value !== null && this.value !== undefined && !isValueByText;
                            break;
                        default:
                            doAutotext = false;
                    }

                    //depending on autotext run render() or just finilize init
                    $.when(doAutotext ? this.render() : true).then($.proxy(function () {
                        if (this.options.disabled) {
                            this.disable();
                        } else {
                            this.enable();
                        }
                        /**
                        Fired when element was initialized by `$().editable()` method.
                        Please note that you should setup `init` handler **before** applying `editable`.

                        @event init
                        @param {Object} event event object
                        @param {Object} editable editable instance (as here it cannot accessed via data('editable'))
                        @since 1.2.0
                        @example
                        $('#username').on('init', function(e, editable) {
                            alert('initialized ' + editable.options.name);
                        });
                        $('#username').editable();
                        **/
                        this.$element.triggerHandler('init', this);
                    }, this));
                },

                /*
                 Initializes parent element for live editables
                */
                initLive: function () {
                    //store selector
                    var selector = this.options.selector;
                    //modify options for child elements
                    this.options.selector = false;
                    this.options.autotext = 'never';
                    //listen toggle events
                    this.$element.on(this.options.toggle + '.editable', selector, $.proxy(function (e) {
                        var $target = $(e.target);
                        if (!$target.data('editable')) {
                            //if delegated element initially empty, we need to clear it's text (that was manually set to `empty` by user)
                            //see https://github.com/vitalets/x-editable/issues/137
                            if ($target.hasClass(this.options.emptyclass)) {
                                $target.empty();
                            }
                            $target.editable(this.options).trigger(e);
                        }
                    }, this));
                },

                /*
                Renders value into element's text.
                Can call custom display method from options.
                Can return deferred object.
                @method render()
                @param {mixed} response server response (if exist) to pass into display function
                */
                render: function (response) {
                    //do not display anything
                    if (this.options.display === false) {
                        return;
                    }

                    //if input has `value2htmlFinal` method, we pass callback in third param to be called when source is loaded
                    if (this.input.value2htmlFinal) {
                        return this.input.value2html(this.value, this.$element[0], this.options.display, response);
                        //if display method defined --> use it
                    } else if (typeof this.options.display === 'function') {
                        return this.options.display.call(this.$element[0], this.value, response);
                        //else use input's original value2html() method
                    } else {
                        return this.input.value2html(this.value, this.$element[0]);
                    }
                },

                /**
                Enables editable
                @method enable()
                **/
                enable: function () {
                    this.options.disabled = false;
                    this.$element.removeClass('editable-disabled');
                    this.handleEmpty(this.isEmpty);
                    if (this.options.toggle !== 'manual') {
                        if (this.$element.attr('tabindex') === '-1') {
                            this.$element.removeAttr('tabindex');
                        }
                    }
                },

                /**
                Disables editable
                @method disable()
                **/
                disable: function () {
                    this.options.disabled = true;
                    this.hide();
                    this.$element.addClass('editable-disabled');
                    this.handleEmpty(this.isEmpty);
                    //do not stop focus on this element
                    this.$element.attr('tabindex', -1);
                },

                /**
                Toggles enabled / disabled state of editable element
                @method toggleDisabled()
                **/
                toggleDisabled: function () {
                    if (this.options.disabled) {
                        this.enable();
                    } else {
                        this.disable();
                    }
                },

                /**
                Sets new option

                @method option(key, value)
                @param {string|object} key option name or object with several options
                @param {mixed} value option new value
                @example
                $('.editable').editable('option', 'pk', 2);
                **/
                option: function (key, value) {
                    //set option(s) by object
                    if (key && typeof key === 'object') {
                        $.each(key, $.proxy(function (k, v) {
                            this.option($.trim(k), v);
                        }, this));
                        return;
                    }

                    //set option by string
                    this.options[key] = value;

                    //disabled
                    if (key === 'disabled') {
                        return value ? this.disable() : this.enable();
                    }

                    //value
                    if (key === 'value') {
                        this.setValue(value);
                    }

                    //transfer new option to container!
                    if (this.container) {
                        this.container.option(key, value);
                    }

                    //pass option to input directly (as it points to the same in form)
                    if (this.input.option) {
                        this.input.option(key, value);
                    }
                },

                /*
                * set emptytext if element is empty
                */
                handleEmpty: function (isEmpty) {
                    //do not handle empty if we do not display anything
                    if (this.options.display === false) {
                        return;
                    }

                    /*
                    isEmpty may be set directly as param of method.
                    It is required when we enable/disable field and can't rely on content
                    as node content is text: "Empty" that is not empty %)
                    */
                    if (isEmpty !== undefined) {
                        this.isEmpty = isEmpty;
                    } else {
                        //detect empty
                        //for some inputs we need more smart check
                        //e.g. wysihtml5 may have <br>, <p></p>, <img>
                        if (typeof this.input.isEmpty === 'function') {
                            this.isEmpty = this.input.isEmpty(this.$element);
                        } else {
                            this.isEmpty = $.trim(this.$element.html()) === '';
                        }
                    }

                    //emptytext shown only for enabled
                    if (!this.options.disabled) {
                        if (this.isEmpty) {
                            this.$element.html(this.options.emptytext);
                            if (this.options.emptyclass) {
                                this.$element.addClass(this.options.emptyclass);
                            }
                        } else if (this.options.emptyclass) {
                            this.$element.removeClass(this.options.emptyclass);
                        }
                    } else {
                        //below required if element disable property was changed
                        if (this.isEmpty) {
                            this.$element.empty();
                            if (this.options.emptyclass) {
                                this.$element.removeClass(this.options.emptyclass);
                            }
                        }
                    }
                },

                /**
                Shows container with form
                @method show()
                @param {boolean} closeAll Whether to close all other editable containers when showing this one. Default true.
                **/
                show: function (closeAll) {
                    if (this.options.disabled) {
                        return;
                    }

                    //init editableContainer: popover, tooltip, inline, etc..
                    if (!this.container) {
                        var containerOptions = $.extend({}, this.options, {
                            value: this.value,
                            input: this.input //pass input to form (as it is already created)
                        });
                        this.$element.editableContainer(containerOptions);
                        //listen `save` event
                        this.$element.on("save.internal", $.proxy(this.save, this));
                        this.container = this.$element.data('editableContainer');
                    } else if (this.container.tip().is(':visible')) {
                        return;
                    }

                    //show container
                    this.container.show(closeAll);
                },

                /**
                Hides container with form
                @method hide()
                **/
                hide: function () {
                    if (this.container) {
                        this.container.hide();
                    }
                },

                /**
                Toggles container visibility (show / hide)
                @method toggle()
                @param {boolean} closeAll Whether to close all other editable containers when showing this one. Default true.
                **/
                toggle: function (closeAll) {
                    if (this.container && this.container.tip().is(':visible')) {
                        this.hide();
                    } else {
                        this.show(closeAll);
                    }
                },

                /*
                * called when form was submitted
                */
                save: function (e, params) {
                    //mark element with unsaved class if needed
                    if (this.options.unsavedclass) {
                        /*
                         Add unsaved css to element if:
                          - url is not user's function
                          - value was not sent to server
                          - params.response === undefined, that means data was not sent
                          - value changed
                        */
                        var sent = false;
                        sent = sent || typeof this.options.url === 'function';
                        sent = sent || this.options.display === false;
                        sent = sent || params.response !== undefined;
                        sent = sent || this.options.savenochange && this.input.value2str(this.value) !== this.input.value2str(params.newValue);

                        if (sent) {
                            this.$element.removeClass(this.options.unsavedclass);
                        } else {
                            this.$element.addClass(this.options.unsavedclass);
                        }
                    }

                    //highlight when saving
                    if (this.options.highlight) {
                        var $e = this.$element,
                            bgColor = $e.css('background-color');

                        $e.css('background-color', this.options.highlight);
                        setTimeout(function () {
                            if (bgColor === 'transparent') {
                                bgColor = '';
                            }
                            $e.css('background-color', bgColor);
                            $e.addClass('editable-bg-transition');
                            setTimeout(function () {
                                $e.removeClass('editable-bg-transition');
                            }, 1700);
                        }, 10);
                    }

                    //set new value
                    this.setValue(params.newValue, false, params.response);

                    /**
                    Fired when new value was submitted. You can use <code>$(this).data('editable')</code> to access to editable instance

                    @event save
                    @param {Object} event event object
                    @param {Object} params additional params
                    @param {mixed} params.newValue submitted value
                    @param {Object} params.response ajax response
                    @example
                    $('#username').on('save', function(e, params) {
                        alert('Saved value: ' + params.newValue);
                    });
                    **/
                    //event itself is triggered by editableContainer. Description here is only for documentation
                },

                validate: function () {
                    if (typeof this.options.validate === 'function') {
                        return this.options.validate.call(this, this.value);
                    }
                },

                /**
                Sets new value of editable
                @method setValue(value, convertStr)
                @param {mixed} value new value
                @param {boolean} convertStr whether to convert value from string to internal format
                **/
                setValue: function (value, convertStr, response) {
                    if (convertStr) {
                        this.value = this.input.str2value(value);
                    } else {
                        this.value = value;
                    }
                    if (this.container) {
                        this.container.option('value', this.value);
                    }
                    $.when(this.render(response)).then($.proxy(function () {
                        this.handleEmpty();
                    }, this));
                },

                /**
                Activates input of visible container (e.g. set focus)
                @method activate()
                **/
                activate: function () {
                    if (this.container) {
                        this.container.activate();
                    }
                },

                /**
                Removes editable feature from element
                @method destroy()
                **/
                destroy: function () {
                    this.disable();

                    if (this.container) {
                        this.container.destroy();
                    }

                    this.input.destroy();

                    if (this.options.toggle !== 'manual') {
                        this.$element.removeClass('editable-click');
                        this.$element.off(this.options.toggle + '.editable');
                    }

                    this.$element.off("save.internal");

                    this.$element.removeClass('editable editable-open editable-disabled');
                    this.$element.removeData('editable');
                }
            };

            /* EDITABLE PLUGIN DEFINITION
            * ======================= */

            /**
            jQuery method to initialize editable element.

            @method $().editable(options)
            @params {Object} options
            @example
            $('#username').editable({
                type: 'text',
                url: '/post',
                pk: 1
            });
            **/
            $.fn.editable = function (option) {
                //special API methods returning non-jquery object
                var result = {},
                    args = arguments,
                    datakey = 'editable';
                switch (option) {
                    /**
                    Runs client-side validation for all matched editables

                    @method validate()
                    @returns {Object} validation errors map
                    @example
                    $('#username, #fullname').editable('validate');
                    // possible result:
                    {
                      username: "username is required",
                      fullname: "fullname should be minimum 3 letters length"
                    }
                    **/
                    case 'validate':
                        this.each(function () {
                            var $this = $(this),
                                data = $this.data(datakey),
                                error;
                            if (data && (error = data.validate())) {
                                result[data.options.name] = error;
                            }
                        });
                        return result;

                    /**
                    Returns current values of editable elements.
                    Note that it returns an **object** with name-value pairs, not a value itself. It allows to get data from several elements.
                    If value of some editable is `null` or `undefined` it is excluded from result object.
                    When param `isSingle` is set to **true** - it is supposed you have single element and will return value of editable instead of object.

                    @method getValue()
                    @param {bool} isSingle whether to return just value of single element
                    @returns {Object} object of element names and values
                    @example
                    $('#username, #fullname').editable('getValue');
                    //result:
                    {
                    username: "superuser",
                    fullname: "John"
                    }
                    //isSingle = true
                    $('#username').editable('getValue', true);
                    //result "superuser"
                    **/
                    case 'getValue':
                        if (arguments.length === 2 && arguments[1] === true) {
                            //isSingle = true
                            result = this.eq(0).data(datakey).value;
                        } else {
                            this.each(function () {
                                var $this = $(this),
                                    data = $this.data(datakey);
                                if (data && data.value !== undefined && data.value !== null) {
                                    result[data.options.name] = data.input.value2submit(data.value);
                                }
                            });
                        }
                        return result;

                    /**
                    This method collects values from several editable elements and submit them all to server.
                    Internally it runs client-side validation for all fields and submits only in case of success.
                    See <a href="#newrecord">creating new records</a> for details.
                    Since 1.5.1 `submit` can be applied to single element to send data programmatically. In that case
                    `url`, `success` and `error` is taken from initial options and you can just call `$('#username').editable('submit')`.

                    @method submit(options)
                    @param {object} options
                    @param {object} options.url url to submit data
                    @param {object} options.data additional data to submit
                    @param {object} options.ajaxOptions additional ajax options
                    @param {function} options.error(obj) error handler
                    @param {function} options.success(obj,config) success handler
                    @returns {Object} jQuery object
                    **/
                    case 'submit':
                        //collects value, validate and submit to server for creating new record
                        var config = arguments[1] || {},
                            $elems = this,
                            errors = this.editable('validate');

                        // validation ok
                        if ($.isEmptyObject(errors)) {
                            var ajaxOptions = {};

                            // for single element use url, success etc from options
                            if ($elems.length === 1) {
                                var editable = $elems.data('editable');
                                //standard params
                                var params = {
                                    name: editable.options.name || '',
                                    value: editable.input.value2submit(editable.value),
                                    pk: typeof editable.options.pk === 'function' ? editable.options.pk.call(editable.options.scope) : editable.options.pk
                                };

                                //additional params
                                if (typeof editable.options.params === 'function') {
                                    params = editable.options.params.call(editable.options.scope, params);
                                } else {
                                    //try parse json in single quotes (from data-params attribute)
                                    editable.options.params = $.fn.editableutils.tryParseJson(editable.options.params, true);
                                    $.extend(params, editable.options.params);
                                }

                                ajaxOptions = {
                                    url: editable.options.url,
                                    data: params,
                                    type: 'POST'
                                };

                                // use success / error from options
                                config.success = config.success || editable.options.success;
                                config.error = config.error || editable.options.error;

                                // multiple elements
                            } else {
                                var values = this.editable('getValue');

                                ajaxOptions = {
                                    url: config.url,
                                    data: values,
                                    type: 'POST'
                                };
                            }

                            // ajax success callabck (response 200 OK)
                            ajaxOptions.success = typeof config.success === 'function' ? function (response) {
                                config.success.call($elems, response, config);
                            } : $.noop;

                            // ajax error callabck
                            ajaxOptions.error = typeof config.error === 'function' ? function () {
                                config.error.apply($elems, arguments);
                            } : $.noop;

                            // extend ajaxOptions
                            if (config.ajaxOptions) {
                                $.extend(ajaxOptions, config.ajaxOptions);
                            }

                            // extra data
                            if (config.data) {
                                $.extend(ajaxOptions.data, config.data);
                            }

                            // perform ajax request
                            $.ajax(ajaxOptions);
                        } else {
                            //client-side validation error
                            if (typeof config.error === 'function') {
                                config.error.call($elems, errors);
                            }
                        }
                        return this;
                }

                //return jquery object
                return this.each(function () {
                    var $this = $(this),
                        data = $this.data(datakey),
                        options = typeof option === 'object' && option;

                    //for delegated targets do not store `editable` object for element
                    //it's allows several different selectors.
                    //see: https://github.com/vitalets/x-editable/issues/312
                    if (options && options.selector) {
                        data = new Editable(this, options);
                        return;
                    }

                    if (!data) {
                        $this.data(datakey, data = new Editable(this, options));
                    }

                    if (typeof option === 'string') {
                        //call method
                        data[option].apply(data, Array.prototype.slice.call(args, 1));
                    }
                });
            };

            $.fn.editable.defaults = {
                /**
                Type of input. Can be <code>text|textarea|select|date|checklist</code> and more
                 @property type
                @type string
                @default 'text'
                **/
                type: 'text',
                /**
                Sets disabled state of editable
                 @property disabled
                @type boolean
                @default false
                **/
                disabled: false,
                /**
                How to toggle editable. Can be <code>click|dblclick|mouseenter|manual</code>.
                When set to <code>manual</code> you should manually call <code>show/hide</code> methods of editable.
                **Note**: if you call <code>show</code> or <code>toggle</code> inside **click** handler of some DOM element,
                you need to apply <code>e.stopPropagation()</code> because containers are being closed on any click on document.

                @example
                $('#edit-button').click(function(e) {
                    e.stopPropagation();
                    $('#username').editable('toggle');
                });
                 @property toggle
                @type string
                @default 'click'
                **/
                toggle: 'click',
                /**
                Text shown when element is empty.
                 @property emptytext
                @type string
                @default 'Empty'
                **/
                emptytext: 'Empty',
                /**
                Allows to automatically set element's text based on it's value. Can be <code>auto|always|never</code>. Useful for select and date.
                For example, if dropdown list is <code>{1: 'a', 2: 'b'}</code> and element's value set to <code>1</code>, it's html will be automatically set to <code>'a'</code>.
                <code>auto</code> - text will be automatically set only if element is empty.
                <code>always|never</code> - always(never) try to set element's text.
                 @property autotext
                @type string
                @default 'auto'
                **/
                autotext: 'auto',
                /**
                Initial value of input. If not set, taken from element's text.
                Note, that if element's text is empty - text is automatically generated from value and can be customized (see `autotext` option).
                For example, to display currency sign:
                @example
                <a id="price" data-type="text" data-value="100"></a>
                <script>
                $('#price').editable({
                    ...
                    display: function(value) {
                      $(this).text(value + '$');
                    }
                })
                </script>

                @property value
                @type mixed
                @default element's text
                **/
                value: null,
                /**
                Callback to perform custom displaying of value in element's text.
                If `null`, default input's display used.
                If `false`, no displaying methods will be called, element's text will never change.
                Runs under element's scope.
                _**Parameters:**_

                * `value` current value to be displayed
                * `response` server response (if display called after ajax submit), since 1.4.0

                For _inputs with source_ (select, checklist) parameters are different:

                * `value` current value to be displayed
                * `sourceData` array of items for current input (e.g. dropdown items)
                * `response` server response (if display called after ajax submit), since 1.4.0

                To get currently selected items use `$.fn.editableutils.itemsByValue(value, sourceData)`.

                @property display
                @type function|boolean
                @default null
                @since 1.2.0
                @example
                display: function(value, sourceData) {
                   //display checklist as comma-separated values
                   var html = [],
                       checked = $.fn.editableutils.itemsByValue(value, sourceData);

                   if(checked.length) {
                       $.each(checked, function(i, v) { html.push($.fn.editableutils.escape(v.text)); });
                       $(this).html(html.join(', '));
                   } else {
                       $(this).empty();
                   }
                }
                **/
                display: null,
                /**
                Css class applied when editable text is empty.
                 @property emptyclass
                @type string
                @since 1.4.1
                @default editable-empty
                **/
                emptyclass: 'editable-empty',
                /**
                Css class applied when value was stored but not sent to server (`pk` is empty or `send = 'never'`).
                You may set it to `null` if you work with editables locally and submit them together.
                 @property unsavedclass
                @type string
                @since 1.4.1
                @default editable-unsaved
                **/
                unsavedclass: 'editable-unsaved',
                /**
                If selector is provided, editable will be delegated to the specified targets.
                Usefull for dynamically generated DOM elements.
                **Please note**, that delegated targets can't be initialized with `emptytext` and `autotext` options,
                as they actually become editable only after first click.
                You should manually set class `editable-click` to these elements.
                Also, if element originally empty you should add class `editable-empty`, set `data-value=""` and write emptytext into element:
                 @property selector
                @type string
                @since 1.4.1
                @default null
                @example
                <div id="user">
                  <!-- empty -->
                  <a href="#" data-name="username" data-type="text" class="editable-click editable-empty" data-value="" title="Username">Empty</a>
                  <!-- non-empty -->
                  <a href="#" data-name="group" data-type="select" data-source="/groups" data-value="1" class="editable-click" title="Group">Operator</a>
                </div>

                <script>
                $('#user').editable({
                    selector: 'a',
                    url: '/post',
                    pk: 1
                });
                </script>
                **/
                selector: null,
                /**
                Color used to highlight element after update. Implemented via CSS3 transition, works in modern browsers.

                @property highlight
                @type string|boolean
                @since 1.4.5
                @default #FFFF80
                **/
                highlight: '#FFFF80'
            };
        })(window.jQuery);

        /**
        AbstractInput - base class for all editable inputs.
        It defines interface to be implemented by any input type.
        To create your own input you can inherit from this class.

        @class abstractinput
        **/
        (function ($) {
            "use strict";

            //types

            $.fn.editabletypes = {};

            var AbstractInput = function () {};

            AbstractInput.prototype = {
                /**
                 Initializes input
                  @method init()
                 **/
                init: function (type, options, defaults) {
                    this.type = type;
                    this.options = $.extend({}, defaults, options);
                },

                /*
                this method called before render to init $tpl that is inserted in DOM
                */
                prerender: function () {
                    this.$tpl = $(this.options.tpl); //whole tpl as jquery object
                    this.$input = this.$tpl; //control itself, can be changed in render method
                    this.$clear = null; //clear button
                    this.error = null; //error message, if input cannot be rendered
                },

                /**
                 Renders input from tpl. Can return jQuery deferred object.
                 Can be overwritten in child objects
                  @method render()
                **/
                render: function () {},

                /**
                 Sets element's html by value.
                  @method value2html(value, element)
                 @param {mixed} value
                 @param {DOMElement} element
                **/
                value2html: function (value, element) {
                    $(element)[this.options.escape ? 'text' : 'html']($.trim(value));
                },

                /**
                 Converts element's html to value
                  @method html2value(html)
                 @param {string} html
                 @returns {mixed}
                **/
                html2value: function (html) {
                    return $('<div>').html(html).text();
                },

                /**
                 Converts value to string (for internal compare). For submitting to server used value2submit().
                  @method value2str(value)
                 @param {mixed} value
                 @returns {string}
                **/
                value2str: function (value) {
                    return value;
                },

                /**
                 Converts string received from server into value. Usually from `data-value` attribute.
                  @method str2value(str)
                 @param {string} str
                 @returns {mixed}
                **/
                str2value: function (str) {
                    return str;
                },

                /**
                 Converts value for submitting to server. Result can be string or object.
                  @method value2submit(value)
                 @param {mixed} value
                 @returns {mixed}
                **/
                value2submit: function (value) {
                    return value;
                },

                /**
                 Sets value of input.
                  @method value2input(value)
                 @param {mixed} value
                **/
                value2input: function (value) {
                    this.$input.val(value);
                },

                /**
                 Returns value of input. Value can be object (e.g. datepicker)
                  @method input2value()
                **/
                input2value: function () {
                    return this.$input.val();
                },

                /**
                 Activates input. For text it sets focus.
                  @method activate()
                **/
                activate: function () {
                    if (this.$input.is(':visible')) {
                        this.$input.focus();
                    }
                },

                /**
                 Creates input.
                  @method clear()
                **/
                clear: function () {
                    this.$input.val(null);
                },

                /**
                 method to escape html.
                **/
                escape: function (str) {
                    return $('<div>').text(str).html();
                },

                /**
                 attach handler to automatically submit form when value changed (useful when buttons not shown)
                **/
                autosubmit: function () {},

                /**
                Additional actions when destroying element
                **/
                destroy: function () {},

                // -------- helper functions --------
                setClass: function () {
                    if (this.options.inputclass) {
                        this.$input.addClass(this.options.inputclass);
                    }
                },

                setAttr: function (attr) {
                    if (this.options[attr] !== undefined && this.options[attr] !== null) {
                        this.$input.attr(attr, this.options[attr]);
                    }
                },

                option: function (key, value) {
                    this.options[key] = value;
                }

            };

            AbstractInput.defaults = {
                /**
                HTML template of input. Normally you should not change it.
                 @property tpl
                @type string
                @default ''
                **/
                tpl: '',
                /**
                CSS class automatically applied to input

                @property inputclass
                @type string
                @default null
                **/
                inputclass: null,

                /**
                If `true` - html will be escaped in content of element via $.text() method.
                If `false` - html will not be escaped, $.html() used.
                When you use own `display` function, this option obviosly has no effect.

                @property escape
                @type boolean
                @since 1.5.0
                @default true
                **/
                escape: true,

                //scope for external methods (e.g. source defined as function)
                //for internal use only
                scope: null,

                //need to re-declare showbuttons here to get it's value from common config (passed only options existing in defaults)
                showbuttons: true
            };

            $.extend($.fn.editabletypes, { abstractinput: AbstractInput });
        })(window.jQuery);

        /**
        List - abstract class for inputs that have source option loaded from js array or via ajax

        @class list
        @extends abstractinput
        **/
        (function ($) {
            "use strict";

            var List = function (options) {};

            $.fn.editableutils.inherit(List, $.fn.editabletypes.abstractinput);

            $.extend(List.prototype, {
                render: function () {
                    var deferred = $.Deferred();

                    this.error = null;
                    this.onSourceReady(function () {
                        this.renderList();
                        deferred.resolve();
                    }, function () {
                        this.error = this.options.sourceError;
                        deferred.resolve();
                    });

                    return deferred.promise();
                },

                html2value: function (html) {
                    return null; //can't set value by text
                },

                value2html: function (value, element, display, response) {
                    var deferred = $.Deferred(),
                        success = function () {
                        if (typeof display === 'function') {
                            //custom display method
                            display.call(element, value, this.sourceData, response);
                        } else {
                            this.value2htmlFinal(value, element);
                        }
                        deferred.resolve();
                    };

                    //for null value just call success without loading source
                    if (value === null) {
                        success.call(this);
                    } else {
                        this.onSourceReady(success, function () {
                            deferred.resolve();
                        });
                    }

                    return deferred.promise();
                },

                // ------------- additional functions ------------

                onSourceReady: function (success, error) {
                    //run source if it function
                    var source;
                    if ($.isFunction(this.options.source)) {
                        source = this.options.source.call(this.options.scope);
                        this.sourceData = null;
                        //note: if function returns the same source as URL - sourceData will be taken from cahce and no extra request performed
                    } else {
                        source = this.options.source;
                    }

                    //if allready loaded just call success
                    if (this.options.sourceCache && $.isArray(this.sourceData)) {
                        success.call(this);
                        return;
                    }

                    //try parse json in single quotes (for double quotes jquery does automatically)
                    try {
                        source = $.fn.editableutils.tryParseJson(source, false);
                    } catch (e) {
                        error.call(this);
                        return;
                    }

                    //loading from url
                    if (typeof source === 'string') {
                        //try to get sourceData from cache
                        if (this.options.sourceCache) {
                            var cacheID = source,
                                cache;

                            if (!$(document).data(cacheID)) {
                                $(document).data(cacheID, {});
                            }
                            cache = $(document).data(cacheID);

                            //check for cached data
                            if (cache.loading === false && cache.sourceData) {
                                //take source from cache
                                this.sourceData = cache.sourceData;
                                this.doPrepend();
                                success.call(this);
                                return;
                            } else if (cache.loading === true) {
                                //cache is loading, put callback in stack to be called later
                                cache.callbacks.push($.proxy(function () {
                                    this.sourceData = cache.sourceData;
                                    this.doPrepend();
                                    success.call(this);
                                }, this));

                                //also collecting error callbacks
                                cache.err_callbacks.push($.proxy(error, this));
                                return;
                            } else {
                                //no cache yet, activate it
                                cache.loading = true;
                                cache.callbacks = [];
                                cache.err_callbacks = [];
                            }
                        }

                        //ajaxOptions for source. Can be overwritten bt options.sourceOptions
                        var ajaxOptions = $.extend({
                            url: source,
                            type: 'get',
                            cache: false,
                            dataType: 'json',
                            success: $.proxy(function (data) {
                                if (cache) {
                                    cache.loading = false;
                                }
                                this.sourceData = this.makeArray(data);
                                if ($.isArray(this.sourceData)) {
                                    if (cache) {
                                        //store result in cache
                                        cache.sourceData = this.sourceData;
                                        //run success callbacks for other fields waiting for this source
                                        $.each(cache.callbacks, function () {
                                            this.call();
                                        });
                                    }
                                    this.doPrepend();
                                    success.call(this);
                                } else {
                                    error.call(this);
                                    if (cache) {
                                        //run error callbacks for other fields waiting for this source
                                        $.each(cache.err_callbacks, function () {
                                            this.call();
                                        });
                                    }
                                }
                            }, this),
                            error: $.proxy(function () {
                                error.call(this);
                                if (cache) {
                                    cache.loading = false;
                                    //run error callbacks for other fields
                                    $.each(cache.err_callbacks, function () {
                                        this.call();
                                    });
                                }
                            }, this)
                        }, this.options.sourceOptions);

                        //loading sourceData from server
                        $.ajax(ajaxOptions);
                    } else {
                        //options as json/array
                        this.sourceData = this.makeArray(source);

                        if ($.isArray(this.sourceData)) {
                            this.doPrepend();
                            success.call(this);
                        } else {
                            error.call(this);
                        }
                    }
                },

                doPrepend: function () {
                    if (this.options.prepend === null || this.options.prepend === undefined) {
                        return;
                    }

                    if (!$.isArray(this.prependData)) {
                        //run prepend if it is function (once)
                        if ($.isFunction(this.options.prepend)) {
                            this.options.prepend = this.options.prepend.call(this.options.scope);
                        }

                        //try parse json in single quotes
                        this.options.prepend = $.fn.editableutils.tryParseJson(this.options.prepend, true);

                        //convert prepend from string to object
                        if (typeof this.options.prepend === 'string') {
                            this.options.prepend = { '': this.options.prepend };
                        }

                        this.prependData = this.makeArray(this.options.prepend);
                    }

                    if ($.isArray(this.prependData) && $.isArray(this.sourceData)) {
                        this.sourceData = this.prependData.concat(this.sourceData);
                    }
                },

                /*
                 renders input list
                */
                renderList: function () {
                    // this method should be overwritten in child class
                },

                /*
                set element's html by value
                */
                value2htmlFinal: function (value, element) {
                    // this method should be overwritten in child class
                },

                /**
                * convert data to array suitable for sourceData, e.g. [{value: 1, text: 'abc'}, {...}]
                */
                makeArray: function (data) {
                    var count,
                        obj,
                        result = [],
                        item,
                        iterateItem;
                    if (!data || typeof data === 'string') {
                        return null;
                    }

                    if ($.isArray(data)) {
                        //array
                        /*
                           function to iterate inside item of array if item is object.
                           Caclulates count of keys in item and store in obj.
                        */
                        iterateItem = function (k, v) {
                            obj = { value: k, text: v };
                            if (count++ >= 2) {
                                return false; // exit from `each` if item has more than one key.
                            }
                        };

                        for (var i = 0; i < data.length; i++) {
                            item = data[i];
                            if (typeof item === 'object') {
                                count = 0; //count of keys inside item
                                $.each(item, iterateItem);
                                //case: [{val1: 'text1'}, {val2: 'text2} ...]
                                if (count === 1) {
                                    result.push(obj);
                                    //case: [{value: 1, text: 'text1'}, {value: 2, text: 'text2'}, ...]
                                } else if (count > 1) {
                                    //removed check of existance: item.hasOwnProperty('value') && item.hasOwnProperty('text')
                                    if (item.children) {
                                        item.children = this.makeArray(item.children);
                                    }
                                    result.push(item);
                                }
                            } else {
                                //case: ['text1', 'text2' ...]
                                result.push({ value: item, text: item });
                            }
                        }
                    } else {
                        //case: {val1: 'text1', val2: 'text2, ...}
                        $.each(data, function (k, v) {
                            result.push({ value: k, text: v });
                        });
                    }
                    return result;
                },

                option: function (key, value) {
                    this.options[key] = value;
                    if (key === 'source') {
                        this.sourceData = null;
                    }
                    if (key === 'prepend') {
                        this.prependData = null;
                    }
                }

            });

            List.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
                /**
                Source data for list.
                If **array** - it should be in format: `[{value: 1, text: "text1"}, {value: 2, text: "text2"}, ...]`
                For compability, object format is also supported: `{"1": "text1", "2": "text2" ...}` but it does not guarantee elements order.

                If **string** - considered ajax url to load items. In that case results will be cached for fields with the same source and name. See also `sourceCache` option.

                If **function**, it should return data in format above (since 1.4.0).

                Since 1.4.1 key `children` supported to render OPTGROUP (for **select** input only).
                `[{text: "group1", children: [{value: 1, text: "text1"}, {value: 2, text: "text2"}]}, ...]`
                    @property source
                @type string | array | object | function
                @default null
                **/
                source: null,
                /**
                Data automatically prepended to the beginning of dropdown list.

                @property prepend
                @type string | array | object | function
                @default false
                **/
                prepend: false,
                /**
                Error message when list cannot be loaded (e.g. ajax error)

                @property sourceError
                @type string
                @default Error when loading list
                **/
                sourceError: 'Error when loading list',
                /**
                if <code>true</code> and source is **string url** - results will be cached for fields with the same source.
                Usefull for editable column in grid to prevent extra requests.

                @property sourceCache
                @type boolean
                @default true
                @since 1.2.0
                **/
                sourceCache: true,
                /**
                Additional ajax options to be used in $.ajax() when loading list from server.
                Useful to send extra parameters (`data` key) or change request method (`type` key).

                @property sourceOptions
                @type object|function
                @default null
                @since 1.5.0
                **/
                sourceOptions: null
            });

            $.fn.editabletypes.list = List;
        })(window.jQuery);

        /**
        Text input

        @class text
        @extends abstractinput
        @final
        @example
        <a href="#" id="username" data-type="text" data-pk="1">awesome</a>
        <script>
        $(function(){
            $('#username').editable({
                url: '/post',
                title: 'Enter username'
            });
        });
        </script>
        **/
        (function ($) {
            "use strict";

            var Text = function (options) {
                this.init('text', options, Text.defaults);
            };

            $.fn.editableutils.inherit(Text, $.fn.editabletypes.abstractinput);

            $.extend(Text.prototype, {
                render: function () {
                    this.renderClear();
                    this.setClass();
                    this.setAttr('placeholder');
                },

                activate: function () {
                    if (this.$input.is(':visible')) {
                        this.$input.focus();
                        $.fn.editableutils.setCursorPosition(this.$input.get(0), this.$input.val().length);
                        if (this.toggleClear) {
                            this.toggleClear();
                        }
                    }
                },

                //render clear button
                renderClear: function () {
                    if (this.options.clear) {
                        this.$clear = $('<span class="editable-clear-x"></span>');
                        this.$input.after(this.$clear).css('padding-right', 24).keyup($.proxy(function (e) {
                            //arrows, enter, tab, etc
                            if (~$.inArray(e.keyCode, [40, 38, 9, 13, 27])) {
                                return;
                            }

                            clearTimeout(this.t);
                            var that = this;
                            this.t = setTimeout(function () {
                                that.toggleClear(e);
                            }, 100);
                        }, this)).parent().css('position', 'relative');

                        this.$clear.click($.proxy(this.clear, this));
                    }
                },

                postrender: function () {
                    /*
                    //now `clear` is positioned via css
                    if(this.$clear) {
                        //can position clear button only here, when form is shown and height can be calculated
                    //                var h = this.$input.outerHeight(true) || 20,
                        var h = this.$clear.parent().height(),
                            delta = (h - this.$clear.height()) / 2;

                        //this.$clear.css({bottom: delta, right: delta});
                    }
                    */
                },

                //show / hide clear button
                toggleClear: function (e) {
                    if (!this.$clear) {
                        return;
                    }

                    var len = this.$input.val().length,
                        visible = this.$clear.is(':visible');

                    if (len && !visible) {
                        this.$clear.show();
                    }

                    if (!len && visible) {
                        this.$clear.hide();
                    }
                },

                clear: function () {
                    this.$clear.hide();
                    this.$input.val('').focus();
                }
            });

            Text.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
                /**
                @property tpl
                @default <input type="text">
                **/
                tpl: '<input type="text">',
                /**
                Placeholder attribute of input. Shown when input is empty.
                 @property placeholder
                @type string
                @default null
                **/
                placeholder: null,

                /**
                Whether to show `clear` button

                @property clear
                @type boolean
                @default true
                **/
                clear: true
            });

            $.fn.editabletypes.text = Text;
        })(window.jQuery);

        /**
        Textarea input

        @class textarea
        @extends abstractinput
        @final
        @example
        <a href="#" id="comments" data-type="textarea" data-pk="1">awesome comment!</a>
        <script>
        $(function(){
            $('#comments').editable({
                url: '/post',
                title: 'Enter comments',
                rows: 10
            });
        });
        </script>
        **/
        (function ($) {
            "use strict";

            var Textarea = function (options) {
                this.init('textarea', options, Textarea.defaults);
            };

            $.fn.editableutils.inherit(Textarea, $.fn.editabletypes.abstractinput);

            $.extend(Textarea.prototype, {
                render: function () {
                    this.setClass();
                    this.setAttr('placeholder');
                    this.setAttr('rows');

                    //ctrl + enter
                    this.$input.keydown(function (e) {
                        if (e.ctrlKey && e.which === 13) {
                            $(this).closest('form').submit();
                        }
                    });
                },

                //using `white-space: pre-wrap` solves \n  <--> BR conversion very elegant!
                /*
                value2html: function(value, element) {
                     var html = '', lines;
                     if(value) {
                         lines = value.split("\n");
                         for (var i = 0; i < lines.length; i++) {
                             lines[i] = $('<div>').text(lines[i]).html();
                         }
                         html = lines.join('<br>');
                     }
                     $(element).html(html);
                 },

                 html2value: function(html) {
                     if(!html) {
                         return '';
                     }
                      var regex = new RegExp(String.fromCharCode(10), 'g');
                     var lines = html.split(/<br\s*\/?>/i);
                     for (var i = 0; i < lines.length; i++) {
                         var text = $('<div>').html(lines[i]).text();
                          // Remove newline characters (\n) to avoid them being converted by value2html() method
                         // thus adding extra <br> tags
                         text = text.replace(regex, '');
                          lines[i] = text;
                     }
                     return lines.join("\n");
                 },
                  */
                activate: function () {
                    $.fn.editabletypes.text.prototype.activate.call(this);
                }
            });

            Textarea.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
                /**
                @property tpl
                @default <textarea></textarea>
                **/
                tpl: '<textarea></textarea>',
                /**
                @property inputclass
                @default input-large
                **/
                inputclass: 'input-large',
                /**
                Placeholder attribute of input. Shown when input is empty.
                 @property placeholder
                @type string
                @default null
                **/
                placeholder: null,
                /**
                Number of rows in textarea
                 @property rows
                @type integer
                @default 7
                **/
                rows: 7
            });

            $.fn.editabletypes.textarea = Textarea;
        })(window.jQuery);

        /**
        Select (dropdown)

        @class select
        @extends list
        @final
        @example
        <a href="#" id="status" data-type="select" data-pk="1" data-url="/post" data-title="Select status"></a>
        <script>
        $(function(){
            $('#status').editable({
                value: 2,
                source: [
                      {value: 1, text: 'Active'},
                      {value: 2, text: 'Blocked'},
                      {value: 3, text: 'Deleted'}
                   ]
            });
        });
        </script>
        **/
        (function ($) {
            "use strict";

            var Select = function (options) {
                this.init('select', options, Select.defaults);
            };

            $.fn.editableutils.inherit(Select, $.fn.editabletypes.list);

            $.extend(Select.prototype, {
                renderList: function () {
                    this.$input.empty();

                    var fillItems = function ($el, data) {
                        var attr;
                        if ($.isArray(data)) {
                            for (var i = 0; i < data.length; i++) {
                                attr = {};
                                if (data[i].children) {
                                    attr.label = data[i].text;
                                    $el.append(fillItems($('<optgroup>', attr), data[i].children));
                                } else {
                                    attr.value = data[i].value;
                                    if (data[i].disabled) {
                                        attr.disabled = true;
                                    }
                                    $el.append($('<option>', attr).text(data[i].text));
                                }
                            }
                        }
                        return $el;
                    };

                    fillItems(this.$input, this.sourceData);

                    this.setClass();

                    //enter submit
                    this.$input.on('keydown.editable', function (e) {
                        if (e.which === 13) {
                            $(this).closest('form').submit();
                        }
                    });
                },

                value2htmlFinal: function (value, element) {
                    var text = '',
                        items = $.fn.editableutils.itemsByValue(value, this.sourceData);

                    if (items.length) {
                        text = items[0].text;
                    }

                    //$(element).text(text);
                    $.fn.editabletypes.abstractinput.prototype.value2html.call(this, text, element);
                },

                autosubmit: function () {
                    this.$input.off('keydown.editable').on('change.editable', function () {
                        $(this).closest('form').submit();
                    });
                }
            });

            Select.defaults = $.extend({}, $.fn.editabletypes.list.defaults, {
                /**
                @property tpl
                @default <select></select>
                **/
                tpl: '<select></select>'
            });

            $.fn.editabletypes.select = Select;
        })(window.jQuery);

        /**
        List of checkboxes.
        Internally value stored as javascript array of values.

        @class checklist
        @extends list
        @final
        @example
        <a href="#" id="options" data-type="checklist" data-pk="1" data-url="/post" data-title="Select options"></a>
        <script>
        $(function(){
            $('#options').editable({
                value: [2, 3],
                source: [
                      {value: 1, text: 'option1'},
                      {value: 2, text: 'option2'},
                      {value: 3, text: 'option3'}
                   ]
            });
        });
        </script>
        **/
        (function ($) {
            "use strict";

            var Checklist = function (options) {
                this.init('checklist', options, Checklist.defaults);
            };

            $.fn.editableutils.inherit(Checklist, $.fn.editabletypes.list);

            $.extend(Checklist.prototype, {
                renderList: function () {
                    var $label, $div;

                    this.$tpl.empty();

                    if (!$.isArray(this.sourceData)) {
                        return;
                    }

                    for (var i = 0; i < this.sourceData.length; i++) {
                        $label = $('<label>').append($('<input>', {
                            type: 'checkbox',
                            value: this.sourceData[i].value
                        })).append($('<span>').text(' ' + this.sourceData[i].text));

                        $('<div>').append($label).appendTo(this.$tpl);
                    }

                    this.$input = this.$tpl.find('input[type="checkbox"]');
                    this.setClass();
                },

                value2str: function (value) {
                    return $.isArray(value) ? value.sort().join($.trim(this.options.separator)) : '';
                },

                //parse separated string
                str2value: function (str) {
                    var reg,
                        value = null;
                    if (typeof str === 'string' && str.length) {
                        reg = new RegExp('\\s*' + $.trim(this.options.separator) + '\\s*');
                        value = str.split(reg);
                    } else if ($.isArray(str)) {
                        value = str;
                    } else {
                        value = [str];
                    }
                    return value;
                },

                //set checked on required checkboxes
                value2input: function (value) {
                    this.$input.prop('checked', false);
                    if ($.isArray(value) && value.length) {
                        this.$input.each(function (i, el) {
                            var $el = $(el);
                            // cannot use $.inArray as it performs strict comparison
                            $.each(value, function (j, val) {
                                /*jslint eqeq: true*/
                                if ($el.val() == val) {
                                    /*jslint eqeq: false*/
                                    $el.prop('checked', true);
                                }
                            });
                        });
                    }
                },

                input2value: function () {
                    var checked = [];
                    this.$input.filter(':checked').each(function (i, el) {
                        checked.push($(el).val());
                    });
                    return checked;
                },

                //collect text of checked boxes
                value2htmlFinal: function (value, element) {
                    var html = [],
                        checked = $.fn.editableutils.itemsByValue(value, this.sourceData),
                        escape = this.options.escape;

                    if (checked.length) {
                        $.each(checked, function (i, v) {
                            var text = escape ? $.fn.editableutils.escape(v.text) : v.text;
                            html.push(text);
                        });
                        $(element).html(html.join('<br>'));
                    } else {
                        $(element).empty();
                    }
                },

                activate: function () {
                    this.$input.first().focus();
                },

                autosubmit: function () {
                    this.$input.on('keydown', function (e) {
                        if (e.which === 13) {
                            $(this).closest('form').submit();
                        }
                    });
                }
            });

            Checklist.defaults = $.extend({}, $.fn.editabletypes.list.defaults, {
                /**
                @property tpl
                @default <div></div>
                **/
                tpl: '<div class="editable-checklist"></div>',

                /**
                @property inputclass
                @type string
                @default null
                **/
                inputclass: null,

                /**
                Separator of values when reading from `data-value` attribute
                 @property separator
                @type string
                @default ','
                **/
                separator: ','
            });

            $.fn.editabletypes.checklist = Checklist;
        })(window.jQuery);

        /**
        HTML5 input types.
        Following types are supported:

        * password
        * email
        * url
        * tel
        * number
        * range
        * time

        Learn more about html5 inputs:
        http://www.w3.org/wiki/HTML5_form_additions
        To check browser compatibility please see:
        https://developer.mozilla.org/en-US/docs/HTML/Element/Input

        @class html5types
        @extends text
        @final
        @since 1.3.0
        @example
        <a href="#" id="email" data-type="email" data-pk="1">admin@example.com</a>
        <script>
        $(function(){
            $('#email').editable({
                url: '/post',
                title: 'Enter email'
            });
        });
        </script>
        **/

        /**
        @property tpl
        @default depends on type
        **/

        /*
        Password
        */
        (function ($) {
            "use strict";

            var Password = function (options) {
                this.init('password', options, Password.defaults);
            };
            $.fn.editableutils.inherit(Password, $.fn.editabletypes.text);
            $.extend(Password.prototype, {
                //do not display password, show '[hidden]' instead
                value2html: function (value, element) {
                    if (value) {
                        $(element).text('[hidden]');
                    } else {
                        $(element).empty();
                    }
                },
                //as password not displayed, should not set value by html
                html2value: function (html) {
                    return null;
                }
            });
            Password.defaults = $.extend({}, $.fn.editabletypes.text.defaults, {
                tpl: '<input type="password">'
            });
            $.fn.editabletypes.password = Password;
        })(window.jQuery);

        /*
        Email
        */
        (function ($) {
            "use strict";

            var Email = function (options) {
                this.init('email', options, Email.defaults);
            };
            $.fn.editableutils.inherit(Email, $.fn.editabletypes.text);
            Email.defaults = $.extend({}, $.fn.editabletypes.text.defaults, {
                tpl: '<input type="email">'
            });
            $.fn.editabletypes.email = Email;
        })(window.jQuery);

        /*
        Url
        */
        (function ($) {
            "use strict";

            var Url = function (options) {
                this.init('url', options, Url.defaults);
            };
            $.fn.editableutils.inherit(Url, $.fn.editabletypes.text);
            Url.defaults = $.extend({}, $.fn.editabletypes.text.defaults, {
                tpl: '<input type="url">'
            });
            $.fn.editabletypes.url = Url;
        })(window.jQuery);

        /*
        Tel
        */
        (function ($) {
            "use strict";

            var Tel = function (options) {
                this.init('tel', options, Tel.defaults);
            };
            $.fn.editableutils.inherit(Tel, $.fn.editabletypes.text);
            Tel.defaults = $.extend({}, $.fn.editabletypes.text.defaults, {
                tpl: '<input type="tel">'
            });
            $.fn.editabletypes.tel = Tel;
        })(window.jQuery);

        /*
        Number
        */
        (function ($) {
            "use strict";

            var NumberInput = function (options) {
                this.init('number', options, NumberInput.defaults);
            };
            $.fn.editableutils.inherit(NumberInput, $.fn.editabletypes.text);
            $.extend(NumberInput.prototype, {
                render: function () {
                    NumberInput.superclass.render.call(this);
                    this.setAttr('min');
                    this.setAttr('max');
                    this.setAttr('step');
                },
                postrender: function () {
                    if (this.$clear) {
                        //increase right ffset  for up/down arrows
                        this.$clear.css({ right: 24 });
                        /*
                        //can position clear button only here, when form is shown and height can be calculated
                        var h = this.$input.outerHeight(true) || 20,
                            delta = (h - this.$clear.height()) / 2;

                        //add 12px to offset right for up/down arrows
                        this.$clear.css({top: delta, right: delta + 16});
                        */
                    }
                }
            });
            NumberInput.defaults = $.extend({}, $.fn.editabletypes.text.defaults, {
                tpl: '<input type="number">',
                inputclass: 'input-mini',
                min: null,
                max: null,
                step: null
            });
            $.fn.editabletypes.number = NumberInput;
        })(window.jQuery);

        /*
        Range (inherit from number)
        */
        (function ($) {
            "use strict";

            var Range = function (options) {
                this.init('range', options, Range.defaults);
            };
            $.fn.editableutils.inherit(Range, $.fn.editabletypes.number);
            $.extend(Range.prototype, {
                render: function () {
                    this.$input = this.$tpl.filter('input');

                    this.setClass();
                    this.setAttr('min');
                    this.setAttr('max');
                    this.setAttr('step');

                    this.$input.on('input', function () {
                        $(this).siblings('output').text($(this).val());
                    });
                },
                activate: function () {
                    this.$input.focus();
                }
            });
            Range.defaults = $.extend({}, $.fn.editabletypes.number.defaults, {
                tpl: '<input type="range"><output style="width: 30px; display: inline-block"></output>',
                inputclass: 'input-medium'
            });
            $.fn.editabletypes.range = Range;
        })(window.jQuery);

        /*
        Time
        */
        (function ($) {
            "use strict";

            var Time = function (options) {
                this.init('time', options, Time.defaults);
            };
            //inherit from abstract, as inheritance from text gives selection error.
            $.fn.editableutils.inherit(Time, $.fn.editabletypes.abstractinput);
            $.extend(Time.prototype, {
                render: function () {
                    this.setClass();
                }
            });
            Time.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
                tpl: '<input type="time">'
            });
            $.fn.editabletypes.time = Time;
        })(window.jQuery);

        /**
        Select2 input. Based on amazing work of Igor Vaynberg https://github.com/ivaynberg/select2.
        Please see [original select2 docs](http://ivaynberg.github.com/select2) for detailed description and options.

        You should manually download and include select2 distributive:

            <link href="select2/select2.css" rel="stylesheet" type="text/css"></link>
            <script src="select2/select2.js"></script>

        To make it **bootstrap-styled** you can use css from [here](https://github.com/t0m/select2-bootstrap-css):

            <link href="select2-bootstrap.css" rel="stylesheet" type="text/css"></link>

        **Note:** currently `autotext` feature does not work for select2 with `ajax` remote source.
        You need initially put both `data-value` and element's text youself:

            <a href="#" data-type="select2" data-value="1">Text1</a>


        @class select2
        @extends abstractinput
        @since 1.4.1
        @final
        @example
        <a href="#" id="country" data-type="select2" data-pk="1" data-value="ru" data-url="/post" data-title="Select country"></a>
        <script>
        $(function(){
            //local source
            $('#country').editable({
                source: [
                      {id: 'gb', text: 'Great Britain'},
                      {id: 'us', text: 'United States'},
                      {id: 'ru', text: 'Russia'}
                   ],
                select2: {
                   multiple: true
                }
            });
            //remote source (simple)
            $('#country').editable({
                source: '/getCountries',
                select2: {
                    placeholder: 'Select Country',
                    minimumInputLength: 1
                }
            });
            //remote source (advanced)
            $('#country').editable({
                select2: {
                    placeholder: 'Select Country',
                    allowClear: true,
                    minimumInputLength: 3,
                    id: function (item) {
                        return item.CountryId;
                    },
                    ajax: {
                        url: '/getCountries',
                        dataType: 'json',
                        data: function (term, page) {
                            return { query: term };
                        },
                        results: function (data, page) {
                            return { results: data };
                        }
                    },
                    formatResult: function (item) {
                        return item.CountryName;
                    },
                    formatSelection: function (item) {
                        return item.CountryName;
                    },
                    initSelection: function (element, callback) {
                        return $.get('/getCountryById', { query: element.val() }, function (data) {
                            callback(data);
                        });
                    }
                }
            });
        });
        </script>
        **/
        (function ($) {
            "use strict";

            var Constructor = function (options) {
                this.init('select2', options, Constructor.defaults);

                options.select2 = options.select2 || {};

                this.sourceData = null;

                //placeholder
                if (options.placeholder) {
                    options.select2.placeholder = options.placeholder;
                }

                //if not `tags` mode, use source
                if (!options.select2.tags && options.source) {
                    var source = options.source;
                    //if source is function, call it (once!)
                    if ($.isFunction(options.source)) {
                        source = options.source.call(options.scope);
                    }

                    if (typeof source === 'string') {
                        options.select2.ajax = options.select2.ajax || {};
                        //some default ajax params
                        if (!options.select2.ajax.data) {
                            options.select2.ajax.data = function (term) {
                                return { query: term };
                            };
                        }
                        if (!options.select2.ajax.results) {
                            options.select2.ajax.results = function (data) {
                                return { results: data };
                            };
                        }
                        options.select2.ajax.url = source;
                    } else {
                        //check format and convert x-editable format to select2 format (if needed)
                        this.sourceData = this.convertSource(source);
                        options.select2.data = this.sourceData;
                    }
                }

                //overriding objects in config (as by default jQuery extend() is not recursive)
                this.options.select2 = $.extend({}, Constructor.defaults.select2, options.select2);

                //detect whether it is multi-valued
                this.isMultiple = this.options.select2.tags || this.options.select2.multiple;
                this.isRemote = 'ajax' in this.options.select2;

                //store function returning ID of item
                //should be here as used inautotext for local source
                this.idFunc = this.options.select2.id;
                if (typeof this.idFunc !== "function") {
                    var idKey = this.idFunc || 'id';
                    this.idFunc = function (e) {
                        return e[idKey];
                    };
                }

                //store function that renders text in select2
                this.formatSelection = this.options.select2.formatSelection;
                if (typeof this.formatSelection !== "function") {
                    this.formatSelection = function (e) {
                        return e.text;
                    };
                }
            };

            $.fn.editableutils.inherit(Constructor, $.fn.editabletypes.abstractinput);

            $.extend(Constructor.prototype, {
                render: function () {
                    this.setClass();

                    //can not apply select2 here as it calls initSelection
                    //over input that does not have correct value yet.
                    //apply select2 only in value2input
                    //this.$input.select2(this.options.select2);

                    //when data is loaded via ajax, we need to know when it's done to populate listData
                    if (this.isRemote) {
                        //listen to loaded event to populate data
                        this.$input.on('select2-loaded', $.proxy(function (e) {
                            this.sourceData = e.items.results;
                        }, this));
                    }

                    //trigger resize of editableform to re-position container in multi-valued mode
                    if (this.isMultiple) {
                        this.$input.on('change', function () {
                            $(this).closest('form').parent().triggerHandler('resize');
                        });
                    }
                },

                value2html: function (value, element) {
                    var text = '',
                        data,
                        that = this;

                    if (this.options.select2.tags) {
                        //in tags mode just assign value
                        data = value;
                        //data = $.fn.editableutils.itemsByValue(value, this.options.select2.tags, this.idFunc);
                    } else if (this.sourceData) {
                        data = $.fn.editableutils.itemsByValue(value, this.sourceData, this.idFunc);
                    } else {}
                    //can not get list of possible values
                    //(e.g. autotext for select2 with ajax source)


                    //data may be array (when multiple values allowed)
                    if ($.isArray(data)) {
                        //collect selected data and show with separator
                        text = [];
                        $.each(data, function (k, v) {
                            text.push(v && typeof v === 'object' ? that.formatSelection(v) : v);
                        });
                    } else if (data) {
                        text = that.formatSelection(data);
                    }

                    text = $.isArray(text) ? text.join(this.options.viewseparator) : text;

                    //$(element).text(text);
                    Constructor.superclass.value2html.call(this, text, element);
                },

                html2value: function (html) {
                    return this.options.select2.tags ? this.str2value(html, this.options.viewseparator) : null;
                },

                value2input: function (value) {
                    // if value array => join it anyway
                    if ($.isArray(value)) {
                        value = value.join(this.getSeparator());
                    }

                    //for remote source just set value, text is updated by initSelection
                    if (!this.$input.data('select2')) {
                        this.$input.val(value);
                        this.$input.select2(this.options.select2);
                    } else {
                        //second argument needed to separate initial change from user's click (for autosubmit)
                        this.$input.val(value).trigger('change', true);

                        //Uncaught Error: cannot call val() if initSelection() is not defined
                        //this.$input.select2('val', value);
                    }

                    // if defined remote source AND no multiple mode AND no user's initSelection provided -->
                    // we should somehow get text for provided id.
                    // The solution is to use element's text as text for that id (exclude empty)
                    if (this.isRemote && !this.isMultiple && !this.options.select2.initSelection) {
                        // customId and customText are methods to extract `id` and `text` from data object
                        // we can use this workaround only if user did not define these methods
                        // otherwise we cant construct data object
                        var customId = this.options.select2.id,
                            customText = this.options.select2.formatSelection;

                        if (!customId && !customText) {
                            var $el = $(this.options.scope);
                            if (!$el.data('editable').isEmpty) {
                                var data = { id: value, text: $el.text() };
                                this.$input.select2('data', data);
                            }
                        }
                    }
                },

                input2value: function () {
                    return this.$input.select2('val');
                },

                str2value: function (str, separator) {
                    if (typeof str !== 'string' || !this.isMultiple) {
                        return str;
                    }

                    separator = separator || this.getSeparator();

                    var val, i, l;

                    if (str === null || str.length < 1) {
                        return null;
                    }
                    val = str.split(separator);
                    for (i = 0, l = val.length; i < l; i = i + 1) {
                        val[i] = $.trim(val[i]);
                    }

                    return val;
                },

                autosubmit: function () {
                    this.$input.on('change', function (e, isInitial) {
                        if (!isInitial) {
                            $(this).closest('form').submit();
                        }
                    });
                },

                getSeparator: function () {
                    return this.options.select2.separator || $.fn.select2.defaults.separator;
                },

                /*
                Converts source from x-editable format: {value: 1, text: "1"} to
                select2 format: {id: 1, text: "1"}
                */
                convertSource: function (source) {
                    if ($.isArray(source) && source.length && source[0].value !== undefined) {
                        for (var i = 0; i < source.length; i++) {
                            if (source[i].value !== undefined) {
                                source[i].id = source[i].value;
                                delete source[i].value;
                            }
                        }
                    }
                    return source;
                },

                destroy: function () {
                    if (this.$input.data('select2')) {
                        this.$input.select2('destroy');
                    }
                }

            });

            Constructor.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
                /**
                @property tpl
                @default <input type="hidden">
                **/
                tpl: '<input type="hidden">',
                /**
                Configuration of select2. [Full list of options](http://ivaynberg.github.com/select2).
                 @property select2
                @type object
                @default null
                **/
                select2: null,
                /**
                Placeholder attribute of select
                 @property placeholder
                @type string
                @default null
                **/
                placeholder: null,
                /**
                Source data for select. It will be assigned to select2 `data` property and kept here just for convenience.
                Please note, that format is different from simple `select` input: use 'id' instead of 'value'.
                E.g. `[{id: 1, text: "text1"}, {id: 2, text: "text2"}, ...]`.
                 @property source
                @type array|string|function
                @default null
                **/
                source: null,
                /**
                Separator used to display tags.
                 @property viewseparator
                @type string
                @default ', '
                **/
                viewseparator: ', '
            });

            $.fn.editabletypes.select2 = Constructor;
        })(window.jQuery);

        /**
        * Combodate - 1.0.5
        * Dropdown date and time picker.
        * Converts text input into dropdowns to pick day, month, year, hour, minute and second.
        * Uses momentjs as datetime library http://momentjs.com.
        * For i18n include corresponding file from https://github.com/timrwood/moment/tree/master/lang
        *
        * Confusion at noon and midnight - see http://en.wikipedia.org/wiki/12-hour_clock#Confusion_at_noon_and_midnight
        * In combodate:
        * 12:00 pm --> 12:00 (24-h format, midday)
        * 12:00 am --> 00:00 (24-h format, midnight, start of day)
        *
        * Differs from momentjs parse rules:
        * 00:00 pm, 12:00 pm --> 12:00 (24-h format, day not change)
        * 00:00 am, 12:00 am --> 00:00 (24-h format, day not change)
        *
        *
        * Author: Vitaliy Potapov
        * Project page: http://github.com/vitalets/combodate
        * Copyright (c) 2012 Vitaliy Potapov. Released under MIT License.
        **/
        (function ($) {

            var Combodate = function (element, options) {
                this.$element = $(element);
                if (!this.$element.is('input')) {
                    $.error('Combodate should be applied to INPUT element');
                    return;
                }
                this.options = $.extend({}, $.fn.combodate.defaults, options, this.$element.data());
                this.init();
            };

            Combodate.prototype = {
                constructor: Combodate,
                init: function () {
                    this.map = {
                        //key   regexp    moment.method
                        day: ['D', 'date'],
                        month: ['M', 'month'],
                        year: ['Y', 'year'],
                        hour: ['[Hh]', 'hours'],
                        minute: ['m', 'minutes'],
                        second: ['s', 'seconds'],
                        ampm: ['[Aa]', '']
                    };

                    this.$widget = $('<span class="combodate"></span>').html(this.getTemplate());

                    this.initCombos();

                    //update original input on change
                    this.$widget.on('change', 'select', $.proxy(function (e) {
                        this.$element.val(this.getValue()).change();
                        // update days count if month or year changes
                        if (this.options.smartDays) {
                            if ($(e.target).is('.month') || $(e.target).is('.year')) {
                                this.fillCombo('day');
                            }
                        }
                    }, this));

                    this.$widget.find('select').css('width', 'auto');

                    // hide original input and insert widget
                    this.$element.hide().after(this.$widget);

                    // set initial value
                    this.setValue(this.$element.val() || this.options.value);
                },

                /*
                 Replace tokens in template with <select> elements
                */
                getTemplate: function () {
                    var tpl = this.options.template;

                    //first pass
                    $.each(this.map, function (k, v) {
                        v = v[0];
                        var r = new RegExp(v + '+'),
                            token = v.length > 1 ? v.substring(1, 2) : v;

                        tpl = tpl.replace(r, '{' + token + '}');
                    });

                    //replace spaces with &nbsp;
                    tpl = tpl.replace(/ /g, '&nbsp;');

                    //second pass
                    $.each(this.map, function (k, v) {
                        v = v[0];
                        var token = v.length > 1 ? v.substring(1, 2) : v;

                        tpl = tpl.replace('{' + token + '}', '<select class="' + k + '"></select>');
                    });

                    return tpl;
                },

                /*
                 Initialize combos that presents in template
                */
                initCombos: function () {
                    for (var k in this.map) {
                        var $c = this.$widget.find('.' + k);
                        // set properties like this.$day, this.$month etc.
                        this['$' + k] = $c.length ? $c : null;
                        // fill with items
                        this.fillCombo(k);
                    }
                },

                /*
                 Fill combo with items
                */
                fillCombo: function (k) {
                    var $combo = this['$' + k];
                    if (!$combo) {
                        return;
                    }

                    // define method name to fill items, e.g `fillDays`
                    var f = 'fill' + k.charAt(0).toUpperCase() + k.slice(1);
                    var items = this[f]();
                    var value = $combo.val();

                    $combo.empty();
                    for (var i = 0; i < items.length; i++) {
                        $combo.append('<option value="' + items[i][0] + '">' + items[i][1] + '</option>');
                    }

                    $combo.val(value);
                },

                /*
                 Initialize items of combos. Handles `firstItem` option
                */
                fillCommon: function (key) {
                    var values = [],
                        relTime;

                    if (this.options.firstItem === 'name') {
                        //need both to support moment ver < 2 and  >= 2
                        relTime = moment.relativeTime || moment.langData()._relativeTime;
                        var header = typeof relTime[key] === 'function' ? relTime[key](1, true, key, false) : relTime[key];
                        //take last entry (see momentjs lang files structure)
                        header = header.split(' ').reverse()[0];
                        values.push(['', header]);
                    } else if (this.options.firstItem === 'empty') {
                        values.push(['', '']);
                    }
                    return values;
                },

                /*
                fill day
                */
                fillDay: function () {
                    var items = this.fillCommon('d'),
                        name,
                        i,
                        twoDigit = this.options.template.indexOf('DD') !== -1,
                        daysCount = 31;

                    // detect days count (depends on month and year)
                    // originally https://github.com/vitalets/combodate/pull/7
                    if (this.options.smartDays && this.$month && this.$year) {
                        var month = parseInt(this.$month.val(), 10);
                        var year = parseInt(this.$year.val(), 10);

                        if (!isNaN(month) && !isNaN(year)) {
                            daysCount = moment([year, month]).daysInMonth();
                        }
                    }

                    for (i = 1; i <= daysCount; i++) {
                        name = twoDigit ? this.leadZero(i) : i;
                        items.push([i, name]);
                    }
                    return items;
                },

                /*
                fill month
                */
                fillMonth: function () {
                    var items = this.fillCommon('M'),
                        name,
                        i,
                        longNames = this.options.template.indexOf('MMMM') !== -1,
                        shortNames = this.options.template.indexOf('MMM') !== -1,
                        twoDigit = this.options.template.indexOf('MM') !== -1;

                    for (i = 0; i <= 11; i++) {
                        if (longNames) {
                            //see https://github.com/timrwood/momentjs.com/pull/36
                            name = moment().date(1).month(i).format('MMMM');
                        } else if (shortNames) {
                            name = moment().date(1).month(i).format('MMM');
                        } else if (twoDigit) {
                            name = this.leadZero(i + 1);
                        } else {
                            name = i + 1;
                        }
                        items.push([i, name]);
                    }
                    return items;
                },

                /*
                fill year
                */
                fillYear: function () {
                    var items = [],
                        name,
                        i,
                        longNames = this.options.template.indexOf('YYYY') !== -1;

                    for (i = this.options.maxYear; i >= this.options.minYear; i--) {
                        name = longNames ? i : (i + '').substring(2);
                        items[this.options.yearDescending ? 'push' : 'unshift']([i, name]);
                    }

                    items = this.fillCommon('y').concat(items);

                    return items;
                },

                /*
                fill hour
                */
                fillHour: function () {
                    var items = this.fillCommon('h'),
                        name,
                        i,
                        h12 = this.options.template.indexOf('h') !== -1,
                        h24 = this.options.template.indexOf('H') !== -1,
                        twoDigit = this.options.template.toLowerCase().indexOf('hh') !== -1,
                        min = h12 ? 1 : 0,
                        max = h12 ? 12 : 23;

                    for (i = min; i <= max; i++) {
                        name = twoDigit ? this.leadZero(i) : i;
                        items.push([i, name]);
                    }
                    return items;
                },

                /*
                fill minute
                */
                fillMinute: function () {
                    var items = this.fillCommon('m'),
                        name,
                        i,
                        twoDigit = this.options.template.indexOf('mm') !== -1;

                    for (i = 0; i <= 59; i += this.options.minuteStep) {
                        name = twoDigit ? this.leadZero(i) : i;
                        items.push([i, name]);
                    }
                    return items;
                },

                /*
                fill second
                */
                fillSecond: function () {
                    var items = this.fillCommon('s'),
                        name,
                        i,
                        twoDigit = this.options.template.indexOf('ss') !== -1;

                    for (i = 0; i <= 59; i += this.options.secondStep) {
                        name = twoDigit ? this.leadZero(i) : i;
                        items.push([i, name]);
                    }
                    return items;
                },

                /*
                fill ampm
                */
                fillAmpm: function () {
                    var ampmL = this.options.template.indexOf('a') !== -1,
                        ampmU = this.options.template.indexOf('A') !== -1,
                        items = [['am', ampmL ? 'am' : 'AM'], ['pm', ampmL ? 'pm' : 'PM']];
                    return items;
                },

                /*
                 Returns current date value from combos.
                 If format not specified - `options.format` used.
                 If format = `null` - Moment object returned.
                */
                getValue: function (format) {
                    var dt,
                        values = {},
                        that = this,
                        notSelected = false;

                    //getting selected values
                    $.each(this.map, function (k, v) {
                        if (k === 'ampm') {
                            return;
                        }
                        var def = k === 'day' ? 1 : 0;

                        values[k] = that['$' + k] ? parseInt(that['$' + k].val(), 10) : def;

                        if (isNaN(values[k])) {
                            notSelected = true;
                            return false;
                        }
                    });

                    //if at least one visible combo not selected - return empty string
                    if (notSelected) {
                        return '';
                    }

                    //convert hours 12h --> 24h
                    if (this.$ampm) {
                        //12:00 pm --> 12:00 (24-h format, midday), 12:00 am --> 00:00 (24-h format, midnight, start of day)
                        if (values.hour === 12) {
                            values.hour = this.$ampm.val() === 'am' ? 0 : 12;
                        } else {
                            values.hour = this.$ampm.val() === 'am' ? values.hour : values.hour + 12;
                        }
                    }

                    dt = moment([values.year, values.month, values.day, values.hour, values.minute, values.second]);

                    //highlight invalid date
                    this.highlight(dt);

                    format = format === undefined ? this.options.format : format;
                    if (format === null) {
                        return dt.isValid() ? dt : null;
                    } else {
                        return dt.isValid() ? dt.format(format) : '';
                    }
                },

                setValue: function (value) {
                    if (!value) {
                        return;
                    }

                    var dt = typeof value === 'string' ? moment(value, this.options.format) : moment(value),
                        that = this,
                        values = {};

                    //function to find nearest value in select options
                    function getNearest($select, value) {
                        var delta = {};
                        $select.children('option').each(function (i, opt) {
                            var optValue = $(opt).attr('value'),
                                distance;

                            if (optValue === '') return;
                            distance = Math.abs(optValue - value);
                            if (typeof delta.distance === 'undefined' || distance < delta.distance) {
                                delta = { value: optValue, distance: distance };
                            }
                        });
                        return delta.value;
                    }

                    if (dt.isValid()) {
                        //read values from date object
                        $.each(this.map, function (k, v) {
                            if (k === 'ampm') {
                                return;
                            }
                            values[k] = dt[v[1]]();
                        });

                        if (this.$ampm) {
                            //12:00 pm --> 12:00 (24-h format, midday), 12:00 am --> 00:00 (24-h format, midnight, start of day)
                            if (values.hour >= 12) {
                                values.ampm = 'pm';
                                if (values.hour > 12) {
                                    values.hour -= 12;
                                }
                            } else {
                                values.ampm = 'am';
                                if (values.hour === 0) {
                                    values.hour = 12;
                                }
                            }
                        }

                        $.each(values, function (k, v) {
                            //call val() for each existing combo, e.g. this.$hour.val()
                            if (that['$' + k]) {

                                if (k === 'minute' && that.options.minuteStep > 1 && that.options.roundTime) {
                                    v = getNearest(that['$' + k], v);
                                }

                                if (k === 'second' && that.options.secondStep > 1 && that.options.roundTime) {
                                    v = getNearest(that['$' + k], v);
                                }

                                that['$' + k].val(v);
                            }
                        });

                        // update days count
                        if (this.options.smartDays) {
                            this.fillCombo('day');
                        }

                        this.$element.val(dt.format(this.options.format)).change();
                    }
                },

                /*
                 highlight combos if date is invalid
                */
                highlight: function (dt) {
                    if (!dt.isValid()) {
                        if (this.options.errorClass) {
                            this.$widget.addClass(this.options.errorClass);
                        } else {
                            //store original border color
                            if (!this.borderColor) {
                                this.borderColor = this.$widget.find('select').css('border-color');
                            }
                            this.$widget.find('select').css('border-color', 'red');
                        }
                    } else {
                        if (this.options.errorClass) {
                            this.$widget.removeClass(this.options.errorClass);
                        } else {
                            this.$widget.find('select').css('border-color', this.borderColor);
                        }
                    }
                },

                leadZero: function (v) {
                    return v <= 9 ? '0' + v : v;
                },

                destroy: function () {
                    this.$widget.remove();
                    this.$element.removeData('combodate').show();
                }

                //todo: clear method
            };

            $.fn.combodate = function (option) {
                var d,
                    args = Array.apply(null, arguments);
                args.shift();

                //getValue returns date as string / object (not jQuery object)
                if (option === 'getValue' && this.length && (d = this.eq(0).data('combodate'))) {
                    return d.getValue.apply(d, args);
                }

                return this.each(function () {
                    var $this = $(this),
                        data = $this.data('combodate'),
                        options = typeof option == 'object' && option;
                    if (!data) {
                        $this.data('combodate', data = new Combodate(this, options));
                    }
                    if (typeof option == 'string' && typeof data[option] == 'function') {
                        data[option].apply(data, args);
                    }
                });
            };

            $.fn.combodate.defaults = {
                //in this format value stored in original input
                format: 'DD-MM-YYYY HH:mm',
                //in this format items in dropdowns are displayed
                template: 'D / MMM / YYYY   H : mm',
                //initial value, can be `new Date()`
                value: null,
                minYear: 1970,
                maxYear: 2015,
                yearDescending: true,
                minuteStep: 5,
                secondStep: 1,
                firstItem: 'empty', //'name', 'empty', 'none'
                errorClass: null,
                roundTime: true, // whether to round minutes and seconds if step > 1
                smartDays: false // whether days in combo depend on selected month: 31, 30, 28
            };
        })(window.jQuery);
        /**
        Combodate input - dropdown date and time picker.
        Based on [combodate](http://vitalets.github.com/combodate) plugin (included). To use it you should manually include [momentjs](http://momentjs.com).

            <script src="js/moment.min.js"></script>

        Allows to input:

        * only date
        * only time
        * both date and time

        Please note, that format is taken from momentjs and **not compatible** with bootstrap-datepicker / jquery UI datepicker.
        Internally value stored as `momentjs` object.

        @class combodate
        @extends abstractinput
        @final
        @since 1.4.0
        @example
        <a href="#" id="dob" data-type="combodate" data-pk="1" data-url="/post" data-value="1984-05-15" data-title="Select date"></a>
        <script>
        $(function(){
            $('#dob').editable({
                format: 'YYYY-MM-DD',
                viewformat: 'DD.MM.YYYY',
                template: 'D / MMMM / YYYY',
                combodate: {
                        minYear: 2000,
                        maxYear: 2015,
                        minuteStep: 1
                   }
                }
            });
        });
        </script>
        **/

        /*global moment*/

        (function ($) {
            "use strict";

            var Constructor = function (options) {
                this.init('combodate', options, Constructor.defaults);

                //by default viewformat equals to format
                if (!this.options.viewformat) {
                    this.options.viewformat = this.options.format;
                }

                //try parse combodate config defined as json string in data-combodate
                options.combodate = $.fn.editableutils.tryParseJson(options.combodate, true);

                //overriding combodate config (as by default jQuery extend() is not recursive)
                this.options.combodate = $.extend({}, Constructor.defaults.combodate, options.combodate, {
                    format: this.options.format,
                    template: this.options.template
                });
            };

            $.fn.editableutils.inherit(Constructor, $.fn.editabletypes.abstractinput);

            $.extend(Constructor.prototype, {
                render: function () {
                    this.$input.combodate(this.options.combodate);

                    if ($.fn.editableform.engine === 'bs3') {
                        this.$input.siblings().find('select').addClass('form-control');
                    }

                    if (this.options.inputclass) {
                        this.$input.siblings().find('select').addClass(this.options.inputclass);
                    }
                    //"clear" link
                    /*
                    if(this.options.clear) {
                        this.$clear = $('<a href="#"></a>').html(this.options.clear).click($.proxy(function(e){
                            e.preventDefault();
                            e.stopPropagation();
                            this.clear();
                        }, this));

                        this.$tpl.parent().append($('<div class="editable-clear">').append(this.$clear));
                    }
                    */
                },

                value2html: function (value, element) {
                    var text = value ? value.format(this.options.viewformat) : '';
                    //$(element).text(text);
                    Constructor.superclass.value2html.call(this, text, element);
                },

                html2value: function (html) {
                    return html ? moment(html, this.options.viewformat) : null;
                },

                value2str: function (value) {
                    return value ? value.format(this.options.format) : '';
                },

                str2value: function (str) {
                    return str ? moment(str, this.options.format) : null;
                },

                value2submit: function (value) {
                    return this.value2str(value);
                },

                value2input: function (value) {
                    this.$input.combodate('setValue', value);
                },

                input2value: function () {
                    return this.$input.combodate('getValue', null);
                },

                activate: function () {
                    this.$input.siblings('.combodate').find('select').eq(0).focus();
                },

                /*
                clear:  function() {
                   this.$input.data('datepicker').date = null;
                   this.$input.find('.active').removeClass('active');
                },
                */

                autosubmit: function () {}

            });

            Constructor.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
                /**
                @property tpl
                @default <input type="text">
                **/
                tpl: '<input type="text">',
                /**
                @property inputclass
                @default null
                **/
                inputclass: null,
                /**
                Format used for sending value to server. Also applied when converting date from <code>data-value</code> attribute.<br>
                See list of tokens in [momentjs docs](http://momentjs.com/docs/#/parsing/string-format)

                @property format
                @type string
                @default YYYY-MM-DD
                **/
                format: 'YYYY-MM-DD',
                /**
                Format used for displaying date. Also applied when converting date from element's text on init.
                If not specified equals to `format`.

                @property viewformat
                @type string
                @default null
                **/
                viewformat: null,
                /**
                Template used for displaying dropdowns.

                @property template
                @type string
                @default D / MMM / YYYY
                **/
                template: 'D / MMM / YYYY',
                /**
                Configuration of combodate.
                Full list of options: http://vitalets.github.com/combodate/#docs

                @property combodate
                @type object
                @default null
                **/
                combodate: null

                /*
                (not implemented yet)
                Text shown as clear date button.
                If <code>false</code> clear button will not be rendered.

                @property clear
                @type boolean|string
                @default 'x clear'
                */
                //clear: '&times; clear'
            });

            $.fn.editabletypes.combodate = Constructor;
        })(window.jQuery);

        /*
        Editableform based on Twitter Bootstrap 3
        */
        (function ($) {
            "use strict";

            //store parent methods

            var pInitInput = $.fn.editableform.Constructor.prototype.initInput;

            $.extend($.fn.editableform.Constructor.prototype, {
                initTemplate: function () {
                    this.$form = $($.fn.editableform.template);
                    this.$form.find('.control-group').addClass('form-group');
                    this.$form.find('.editable-error-block').addClass('help-block');
                },
                initInput: function () {
                    pInitInput.apply(this);

                    //for bs3 set default class `input-sm` to standard inputs
                    var emptyInputClass = this.input.options.inputclass === null || this.input.options.inputclass === false;
                    var defaultClass = 'input-sm';

                    //bs3 add `form-control` class to standard inputs
                    var stdtypes = 'text,select,textarea,password,email,url,tel,number,range,time,typeaheadjs'.split(',');
                    if (~$.inArray(this.input.type, stdtypes)) {
                        this.input.$input.addClass('form-control');
                        if (emptyInputClass) {
                            this.input.options.inputclass = defaultClass;
                            this.input.$input.addClass(defaultClass);
                        }
                    }

                    //apply bs3 size class also to buttons (to fit size of control)
                    var $btn = this.$form.find('.editable-buttons');
                    var classes = emptyInputClass ? [defaultClass] : this.input.options.inputclass.split(' ');
                    for (var i = 0; i < classes.length; i++) {
                        // `btn-sm` is default now
                        /*
                        if(classes[i].toLowerCase() === 'input-sm') {
                            $btn.find('button').addClass('btn-sm');
                        }
                        */
                        if (classes[i].toLowerCase() === 'input-lg') {
                            $btn.find('button').removeClass('btn-sm').addClass('btn-lg');
                        }
                    }
                }
            });

            //buttons
            $.fn.editableform.buttons = '<button type="submit" class="btn btn-primary btn-sm editable-submit">' + '<i class="glyphicon glyphicon-ok"></i>' + '</button>' + '<button type="button" class="btn btn-default btn-sm editable-cancel">' + '<i class="glyphicon glyphicon-remove"></i>' + '</button>';

            //error classes
            $.fn.editableform.errorGroupClass = 'has-error';
            $.fn.editableform.errorBlockClass = null;
            //engine
            $.fn.editableform.engine = 'bs3';
        })(window.jQuery);
        /**
        * Editable Popover3 (for Bootstrap 3)
        * ---------------------
        * requires bootstrap-popover.js
        */
        (function ($) {
            "use strict";

            //extend methods

            $.extend($.fn.editableContainer.Popup.prototype, {
                containerName: 'popover',
                containerDataName: 'bs.popover',
                innerCss: '.popover-content',
                defaults: $.fn.popover.Constructor.DEFAULTS,

                initContainer: function () {
                    $.extend(this.containerOptions, {
                        trigger: 'manual',
                        selector: false,
                        content: ' ',
                        template: this.defaults.template
                    });

                    //as template property is used in inputs, hide it from popover
                    var t;
                    if (this.$element.data('template')) {
                        t = this.$element.data('template');
                        this.$element.removeData('template');
                    }

                    this.call(this.containerOptions);

                    if (t) {
                        //restore data('template')
                        this.$element.data('template', t);
                    }
                },

                /* show */
                innerShow: function () {
                    this.call('show');
                },

                /* hide */
                innerHide: function () {
                    this.call('hide');
                },

                /* destroy */
                innerDestroy: function () {
                    this.call('destroy');
                },

                setContainerOption: function (key, value) {
                    this.container().options[key] = value;
                },

                /**
                * move popover to new position. This function mainly copied from bootstrap-popover.
                */
                /*jshint laxcomma: true, eqeqeq: false*/
                setPosition: function () {

                    (function () {
                        /*
                            var $tip = this.tip()
                            , inside
                            , pos
                            , actualWidth
                            , actualHeight
                            , placement
                            , tp
                            , tpt
                            , tpb
                            , tpl
                            , tpr;
                             placement = typeof this.options.placement === 'function' ?
                            this.options.placement.call(this, $tip[0], this.$element[0]) :
                            this.options.placement;
                             inside = /in/.test(placement);

                            $tip
                          //  .detach()
                          //vitalets: remove any placement class because otherwise they dont influence on re-positioning of visible popover
                            .removeClass('top right bottom left')
                            .css({ top: 0, left: 0, display: 'block' });
                          //  .insertAfter(this.$element);

                            pos = this.getPosition(inside);
                             actualWidth = $tip[0].offsetWidth;
                            actualHeight = $tip[0].offsetHeight;
                             placement = inside ? placement.split(' ')[1] : placement;
                             tpb = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2};
                            tpt = {top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2};
                            tpl = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth};
                            tpr = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width};
                             switch (placement) {
                                case 'bottom':
                                    if ((tpb.top + actualHeight) > ($(window).scrollTop() + $(window).height())) {
                                        if (tpt.top > $(window).scrollTop()) {
                                            placement = 'top';
                                        } else if ((tpr.left + actualWidth) < ($(window).scrollLeft() + $(window).width())) {
                                            placement = 'right';
                                        } else if (tpl.left > $(window).scrollLeft()) {
                                            placement = 'left';
                                        } else {
                                            placement = 'right';
                                        }
                                    }
                                    break;
                                case 'top':
                                    if (tpt.top < $(window).scrollTop()) {
                                        if ((tpb.top + actualHeight) < ($(window).scrollTop() + $(window).height())) {
                                            placement = 'bottom';
                                        } else if ((tpr.left + actualWidth) < ($(window).scrollLeft() + $(window).width())) {
                                            placement = 'right';
                                        } else if (tpl.left > $(window).scrollLeft()) {
                                            placement = 'left';
                                        } else {
                                            placement = 'right';
                                        }
                                    }
                                    break;
                                case 'left':
                                    if (tpl.left < $(window).scrollLeft()) {
                                        if ((tpr.left + actualWidth) < ($(window).scrollLeft() + $(window).width())) {
                                            placement = 'right';
                                        } else if (tpt.top > $(window).scrollTop()) {
                                            placement = 'top';
                                        } else if (tpt.top > $(window).scrollTop()) {
                                            placement = 'bottom';
                                        } else {
                                            placement = 'right';
                                        }
                                    }
                                    break;
                                case 'right':
                                    if ((tpr.left + actualWidth) > ($(window).scrollLeft() + $(window).width())) {
                                        if (tpl.left > $(window).scrollLeft()) {
                                            placement = 'left';
                                        } else if (tpt.top > $(window).scrollTop()) {
                                            placement = 'top';
                                        } else if (tpt.top > $(window).scrollTop()) {
                                            placement = 'bottom';
                                        }
                                    }
                                    break;
                            }
                             switch (placement) {
                                case 'bottom':
                                    tp = tpb;
                                    break;
                                case 'top':
                                    tp = tpt;
                                    break;
                                case 'left':
                                    tp = tpl;
                                    break;
                                case 'right':
                                    tp = tpr;
                                    break;
                            }
                             $tip
                            .offset(tp)
                            .addClass(placement)
                            .addClass('in');
                        */

                        var $tip = this.tip();

                        var placement = typeof this.options.placement == 'function' ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement;

                        var autoToken = /\s?auto?\s?/i;
                        var autoPlace = autoToken.test(placement);
                        if (autoPlace) {
                            placement = placement.replace(autoToken, '') || 'top';
                        }

                        var pos = this.getPosition();
                        var actualWidth = $tip[0].offsetWidth;
                        var actualHeight = $tip[0].offsetHeight;

                        if (autoPlace) {
                            var $parent = this.$element.parent();

                            var orgPlacement = placement;
                            var docScroll = document.documentElement.scrollTop || document.body.scrollTop;
                            var parentWidth = this.options.container == 'body' ? window.innerWidth : $parent.outerWidth();
                            var parentHeight = this.options.container == 'body' ? window.innerHeight : $parent.outerHeight();
                            var parentLeft = this.options.container == 'body' ? 0 : $parent.offset().left;

                            placement = placement == 'bottom' && pos.top + pos.height + actualHeight - docScroll > parentHeight ? 'top' : placement == 'top' && pos.top - docScroll - actualHeight < 0 ? 'bottom' : placement == 'right' && pos.right + actualWidth > parentWidth ? 'left' : placement == 'left' && pos.left - actualWidth < parentLeft ? 'right' : placement;

                            $tip.removeClass(orgPlacement).addClass(placement);
                        }

                        var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight);

                        this.applyPlacement(calculatedOffset, placement);
                    }).call(this.container());
                    /*jshint laxcomma: false, eqeqeq: true*/
                }
            });
        })(window.jQuery);

        /* =========================================================
         * bootstrap-datepicker.js
         * http://www.eyecon.ro/bootstrap-datepicker
         * =========================================================
         * Copyright 2012 Stefan Petre
         * Improvements by Andrew Rowls
         *
         * Licensed under the Apache License, Version 2.0 (the "License");
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         * ========================================================= */

        (function ($) {

            function UTCDate() {
                return new Date(Date.UTC.apply(Date, arguments));
            }
            function UTCToday() {
                var today = new Date();
                return UTCDate(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
            }

            // Picker object

            var Datepicker = function (element, options) {
                var that = this;

                this._process_options(options);

                this.element = $(element);
                this.isInline = false;
                this.isInput = this.element.is('input');
                this.component = this.element.is('.date') ? this.element.find('.add-on, .btn') : false;
                this.hasInput = this.component && this.element.find('input').length;
                if (this.component && this.component.length === 0) this.component = false;

                this.picker = $(DPGlobal.template);
                this._buildEvents();
                this._attachEvents();

                if (this.isInline) {
                    this.picker.addClass('datepicker-inline').appendTo(this.element);
                } else {
                    this.picker.addClass('datepicker-dropdown dropdown-menu');
                }

                if (this.o.rtl) {
                    this.picker.addClass('datepicker-rtl');
                    this.picker.find('.prev i, .next i').toggleClass('icon-arrow-left icon-arrow-right');
                }

                this.viewMode = this.o.startView;

                if (this.o.calendarWeeks) this.picker.find('tfoot th.today').attr('colspan', function (i, val) {
                    return parseInt(val) + 1;
                });

                this._allow_update = false;

                this.setStartDate(this.o.startDate);
                this.setEndDate(this.o.endDate);
                this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled);

                this.fillDow();
                this.fillMonths();

                this._allow_update = true;

                this.update();
                this.showMode();

                if (this.isInline) {
                    this.show();
                }
            };

            Datepicker.prototype = {
                constructor: Datepicker,

                _process_options: function (opts) {
                    // Store raw options for reference
                    this._o = $.extend({}, this._o, opts);
                    // Processed options
                    var o = this.o = $.extend({}, this._o);

                    // Check if "de-DE" style date is available, if not language should
                    // fallback to 2 letter code eg "de"
                    var lang = o.language;
                    if (!dates[lang]) {
                        lang = lang.split('-')[0];
                        if (!dates[lang]) lang = defaults.language;
                    }
                    o.language = lang;

                    switch (o.startView) {
                        case 2:
                        case 'decade':
                            o.startView = 2;
                            break;
                        case 1:
                        case 'year':
                            o.startView = 1;
                            break;
                        default:
                            o.startView = 0;
                    }

                    switch (o.minViewMode) {
                        case 1:
                        case 'months':
                            o.minViewMode = 1;
                            break;
                        case 2:
                        case 'years':
                            o.minViewMode = 2;
                            break;
                        default:
                            o.minViewMode = 0;
                    }

                    o.startView = Math.max(o.startView, o.minViewMode);

                    o.weekStart %= 7;
                    o.weekEnd = (o.weekStart + 6) % 7;

                    var format = DPGlobal.parseFormat(o.format);
                    if (o.startDate !== -Infinity) {
                        o.startDate = DPGlobal.parseDate(o.startDate, format, o.language);
                    }
                    if (o.endDate !== Infinity) {
                        o.endDate = DPGlobal.parseDate(o.endDate, format, o.language);
                    }

                    o.daysOfWeekDisabled = o.daysOfWeekDisabled || [];
                    if (!$.isArray(o.daysOfWeekDisabled)) o.daysOfWeekDisabled = o.daysOfWeekDisabled.split(/[,\s]*/);
                    o.daysOfWeekDisabled = $.map(o.daysOfWeekDisabled, function (d) {
                        return parseInt(d, 10);
                    });
                },
                _events: [],
                _secondaryEvents: [],
                _applyEvents: function (evs) {
                    for (var i = 0, el, ev; i < evs.length; i++) {
                        el = evs[i][0];
                        ev = evs[i][1];
                        el.on(ev);
                    }
                },
                _unapplyEvents: function (evs) {
                    for (var i = 0, el, ev; i < evs.length; i++) {
                        el = evs[i][0];
                        ev = evs[i][1];
                        el.off(ev);
                    }
                },
                _buildEvents: function () {
                    if (this.isInput) {
                        // single input
                        this._events = [[this.element, {
                            focus: $.proxy(this.show, this),
                            keyup: $.proxy(this.update, this),
                            keydown: $.proxy(this.keydown, this)
                        }]];
                    } else if (this.component && this.hasInput) {
                        // component: input + button
                        this._events = [
                        // For components that are not readonly, allow keyboard nav
                        [this.element.find('input'), {
                            focus: $.proxy(this.show, this),
                            keyup: $.proxy(this.update, this),
                            keydown: $.proxy(this.keydown, this)
                        }], [this.component, {
                            click: $.proxy(this.show, this)
                        }]];
                    } else if (this.element.is('div')) {
                        // inline datepicker
                        this.isInline = true;
                    } else {
                        this._events = [[this.element, {
                            click: $.proxy(this.show, this)
                        }]];
                    }

                    this._secondaryEvents = [[this.picker, {
                        click: $.proxy(this.click, this)
                    }], [$(window), {
                        resize: $.proxy(this.place, this)
                    }], [$(document), {
                        mousedown: $.proxy(function (e) {
                            // Clicked outside the datepicker, hide it
                            if (!(this.element.is(e.target) || this.element.find(e.target).size() || this.picker.is(e.target) || this.picker.find(e.target).size())) {
                                this.hide();
                            }
                        }, this)
                    }]];
                },
                _attachEvents: function () {
                    this._detachEvents();
                    this._applyEvents(this._events);
                },
                _detachEvents: function () {
                    this._unapplyEvents(this._events);
                },
                _attachSecondaryEvents: function () {
                    this._detachSecondaryEvents();
                    this._applyEvents(this._secondaryEvents);
                },
                _detachSecondaryEvents: function () {
                    this._unapplyEvents(this._secondaryEvents);
                },
                _trigger: function (event, altdate) {
                    var date = altdate || this.date,
                        local_date = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

                    this.element.trigger({
                        type: event,
                        date: local_date,
                        format: $.proxy(function (altformat) {
                            var format = altformat || this.o.format;
                            return DPGlobal.formatDate(date, format, this.o.language);
                        }, this)
                    });
                },

                show: function (e) {
                    if (!this.isInline) this.picker.appendTo('body');
                    this.picker.show();
                    this.height = this.component ? this.component.outerHeight() : this.element.outerHeight();
                    this.place();
                    this._attachSecondaryEvents();
                    if (e) {
                        e.preventDefault();
                    }
                    this._trigger('show');
                },

                hide: function (e) {
                    if (this.isInline) return;
                    if (!this.picker.is(':visible')) return;
                    this.picker.hide().detach();
                    this._detachSecondaryEvents();
                    this.viewMode = this.o.startView;
                    this.showMode();

                    if (this.o.forceParse && (this.isInput && this.element.val() || this.hasInput && this.element.find('input').val())) this.setValue();
                    this._trigger('hide');
                },

                remove: function () {
                    this.hide();
                    this._detachEvents();
                    this._detachSecondaryEvents();
                    this.picker.remove();
                    delete this.element.data().datepicker;
                    if (!this.isInput) {
                        delete this.element.data().date;
                    }
                },

                getDate: function () {
                    var d = this.getUTCDate();
                    return new Date(d.getTime() + d.getTimezoneOffset() * 60000);
                },

                getUTCDate: function () {
                    return this.date;
                },

                setDate: function (d) {
                    this.setUTCDate(new Date(d.getTime() - d.getTimezoneOffset() * 60000));
                },

                setUTCDate: function (d) {
                    this.date = d;
                    this.setValue();
                },

                setValue: function () {
                    var formatted = this.getFormattedDate();
                    if (!this.isInput) {
                        if (this.component) {
                            this.element.find('input').val(formatted);
                        }
                    } else {
                        this.element.val(formatted);
                    }
                },

                getFormattedDate: function (format) {
                    if (format === undefined) format = this.o.format;
                    return DPGlobal.formatDate(this.date, format, this.o.language);
                },

                setStartDate: function (startDate) {
                    this._process_options({ startDate: startDate });
                    this.update();
                    this.updateNavArrows();
                },

                setEndDate: function (endDate) {
                    this._process_options({ endDate: endDate });
                    this.update();
                    this.updateNavArrows();
                },

                setDaysOfWeekDisabled: function (daysOfWeekDisabled) {
                    this._process_options({ daysOfWeekDisabled: daysOfWeekDisabled });
                    this.update();
                    this.updateNavArrows();
                },

                place: function () {
                    if (this.isInline) return;
                    var zIndex = parseInt(this.element.parents().filter(function () {
                        return $(this).css('z-index') != 'auto';
                    }).first().css('z-index')) + 10;
                    var offset = this.component ? this.component.parent().offset() : this.element.offset();
                    var height = this.component ? this.component.outerHeight(true) : this.element.outerHeight(true);
                    this.picker.css({
                        top: offset.top + height,
                        left: offset.left,
                        zIndex: zIndex
                    });
                },

                _allow_update: true,
                update: function () {
                    if (!this._allow_update) return;

                    var date,
                        fromArgs = false;
                    if (arguments && arguments.length && (typeof arguments[0] === 'string' || arguments[0] instanceof Date)) {
                        date = arguments[0];
                        fromArgs = true;
                    } else {
                        date = this.isInput ? this.element.val() : this.element.data('date') || this.element.find('input').val();
                        delete this.element.data().date;
                    }

                    this.date = DPGlobal.parseDate(date, this.o.format, this.o.language);

                    if (fromArgs) this.setValue();

                    if (this.date < this.o.startDate) {
                        this.viewDate = new Date(this.o.startDate);
                    } else if (this.date > this.o.endDate) {
                        this.viewDate = new Date(this.o.endDate);
                    } else {
                        this.viewDate = new Date(this.date);
                    }
                    this.fill();
                },

                fillDow: function () {
                    var dowCnt = this.o.weekStart,
                        html = '<tr>';
                    if (this.o.calendarWeeks) {
                        var cell = '<th class="cw">&nbsp;</th>';
                        html += cell;
                        this.picker.find('.datepicker-days thead tr:first-child').prepend(cell);
                    }
                    while (dowCnt < this.o.weekStart + 7) {
                        html += '<th class="dow">' + dates[this.o.language].daysMin[dowCnt++ % 7] + '</th>';
                    }
                    html += '</tr>';
                    this.picker.find('.datepicker-days thead').append(html);
                },

                fillMonths: function () {
                    var html = '',
                        i = 0;
                    while (i < 12) {
                        html += '<span class="month">' + dates[this.o.language].monthsShort[i++] + '</span>';
                    }
                    this.picker.find('.datepicker-months td').html(html);
                },

                setRange: function (range) {
                    if (!range || !range.length) delete this.range;else this.range = $.map(range, function (d) {
                        return d.valueOf();
                    });
                    this.fill();
                },

                getClassNames: function (date) {
                    var cls = [],
                        year = this.viewDate.getUTCFullYear(),
                        month = this.viewDate.getUTCMonth(),
                        currentDate = this.date.valueOf(),
                        today = new Date();
                    if (date.getUTCFullYear() < year || date.getUTCFullYear() == year && date.getUTCMonth() < month) {
                        cls.push('old');
                    } else if (date.getUTCFullYear() > year || date.getUTCFullYear() == year && date.getUTCMonth() > month) {
                        cls.push('new');
                    }
                    // Compare internal UTC date with local today, not UTC today
                    if (this.o.todayHighlight && date.getUTCFullYear() == today.getFullYear() && date.getUTCMonth() == today.getMonth() && date.getUTCDate() == today.getDate()) {
                        cls.push('today');
                    }
                    if (currentDate && date.valueOf() == currentDate) {
                        cls.push('active');
                    }
                    if (date.valueOf() < this.o.startDate || date.valueOf() > this.o.endDate || $.inArray(date.getUTCDay(), this.o.daysOfWeekDisabled) !== -1) {
                        cls.push('disabled');
                    }
                    if (this.range) {
                        if (date > this.range[0] && date < this.range[this.range.length - 1]) {
                            cls.push('range');
                        }
                        if ($.inArray(date.valueOf(), this.range) != -1) {
                            cls.push('selected');
                        }
                    }
                    return cls;
                },

                fill: function () {
                    var d = new Date(this.viewDate),
                        year = d.getUTCFullYear(),
                        month = d.getUTCMonth(),
                        startYear = this.o.startDate !== -Infinity ? this.o.startDate.getUTCFullYear() : -Infinity,
                        startMonth = this.o.startDate !== -Infinity ? this.o.startDate.getUTCMonth() : -Infinity,
                        endYear = this.o.endDate !== Infinity ? this.o.endDate.getUTCFullYear() : Infinity,
                        endMonth = this.o.endDate !== Infinity ? this.o.endDate.getUTCMonth() : Infinity,
                        currentDate = this.date && this.date.valueOf(),
                        tooltip;
                    this.picker.find('.datepicker-days thead th.datepicker-switch').text(dates[this.o.language].months[month] + ' ' + year);
                    this.picker.find('tfoot th.today').text(dates[this.o.language].today).toggle(this.o.todayBtn !== false);
                    this.picker.find('tfoot th.clear').text(dates[this.o.language].clear).toggle(this.o.clearBtn !== false);
                    this.updateNavArrows();
                    this.fillMonths();
                    var prevMonth = UTCDate(year, month - 1, 28, 0, 0, 0, 0),
                        day = DPGlobal.getDaysInMonth(prevMonth.getUTCFullYear(), prevMonth.getUTCMonth());
                    prevMonth.setUTCDate(day);
                    prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.o.weekStart + 7) % 7);
                    var nextMonth = new Date(prevMonth);
                    nextMonth.setUTCDate(nextMonth.getUTCDate() + 42);
                    nextMonth = nextMonth.valueOf();
                    var html = [];
                    var clsName;
                    while (prevMonth.valueOf() < nextMonth) {
                        if (prevMonth.getUTCDay() == this.o.weekStart) {
                            html.push('<tr>');
                            if (this.o.calendarWeeks) {
                                // ISO 8601: First week contains first thursday.
                                // ISO also states week starts on Monday, but we can be more abstract here.
                                var
                                // Start of current week: based on weekstart/current date
                                ws = new Date(+prevMonth + (this.o.weekStart - prevMonth.getUTCDay() - 7) % 7 * 864e5),

                                // Thursday of this week
                                th = new Date(+ws + (7 + 4 - ws.getUTCDay()) % 7 * 864e5),

                                // First Thursday of year, year from thursday
                                yth = new Date(+(yth = UTCDate(th.getUTCFullYear(), 0, 1)) + (7 + 4 - yth.getUTCDay()) % 7 * 864e5),

                                // Calendar week: ms between thursdays, div ms per day, div 7 days
                                calWeek = (th - yth) / 864e5 / 7 + 1;
                                html.push('<td class="cw">' + calWeek + '</td>');
                            }
                        }
                        clsName = this.getClassNames(prevMonth);
                        clsName.push('day');

                        var before = this.o.beforeShowDay(prevMonth);
                        if (before === undefined) before = {};else if (typeof before === 'boolean') before = { enabled: before };else if (typeof before === 'string') before = { classes: before };
                        if (before.enabled === false) clsName.push('disabled');
                        if (before.classes) clsName = clsName.concat(before.classes.split(/\s+/));
                        if (before.tooltip) tooltip = before.tooltip;

                        clsName = $.unique(clsName);
                        html.push('<td class="' + clsName.join(' ') + '"' + (tooltip ? ' title="' + tooltip + '"' : '') + '>' + prevMonth.getUTCDate() + '</td>');
                        if (prevMonth.getUTCDay() == this.o.weekEnd) {
                            html.push('</tr>');
                        }
                        prevMonth.setUTCDate(prevMonth.getUTCDate() + 1);
                    }
                    this.picker.find('.datepicker-days tbody').empty().append(html.join(''));
                    var currentYear = this.date && this.date.getUTCFullYear();

                    var months = this.picker.find('.datepicker-months').find('th:eq(1)').text(year).end().find('span').removeClass('active');
                    if (currentYear && currentYear == year) {
                        months.eq(this.date.getUTCMonth()).addClass('active');
                    }
                    if (year < startYear || year > endYear) {
                        months.addClass('disabled');
                    }
                    if (year == startYear) {
                        months.slice(0, startMonth).addClass('disabled');
                    }
                    if (year == endYear) {
                        months.slice(endMonth + 1).addClass('disabled');
                    }

                    html = '';
                    year = parseInt(year / 10, 10) * 10;
                    var yearCont = this.picker.find('.datepicker-years').find('th:eq(1)').text(year + '-' + (year + 9)).end().find('td');
                    year -= 1;
                    for (var i = -1; i < 11; i++) {
                        html += '<span class="year' + (i == -1 ? ' old' : i == 10 ? ' new' : '') + (currentYear == year ? ' active' : '') + (year < startYear || year > endYear ? ' disabled' : '') + '">' + year + '</span>';
                        year += 1;
                    }
                    yearCont.html(html);
                },

                updateNavArrows: function () {
                    if (!this._allow_update) return;

                    var d = new Date(this.viewDate),
                        year = d.getUTCFullYear(),
                        month = d.getUTCMonth();
                    switch (this.viewMode) {
                        case 0:
                            if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear() && month <= this.o.startDate.getUTCMonth()) {
                                this.picker.find('.prev').css({ visibility: 'hidden' });
                            } else {
                                this.picker.find('.prev').css({ visibility: 'visible' });
                            }
                            if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear() && month >= this.o.endDate.getUTCMonth()) {
                                this.picker.find('.next').css({ visibility: 'hidden' });
                            } else {
                                this.picker.find('.next').css({ visibility: 'visible' });
                            }
                            break;
                        case 1:
                        case 2:
                            if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear()) {
                                this.picker.find('.prev').css({ visibility: 'hidden' });
                            } else {
                                this.picker.find('.prev').css({ visibility: 'visible' });
                            }
                            if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear()) {
                                this.picker.find('.next').css({ visibility: 'hidden' });
                            } else {
                                this.picker.find('.next').css({ visibility: 'visible' });
                            }
                            break;
                    }
                },

                click: function (e) {
                    e.preventDefault();
                    var target = $(e.target).closest('span, td, th');
                    if (target.length == 1) {
                        switch (target[0].nodeName.toLowerCase()) {
                            case 'th':
                                switch (target[0].className) {
                                    case 'datepicker-switch':
                                        this.showMode(1);
                                        break;
                                    case 'prev':
                                    case 'next':
                                        var dir = DPGlobal.modes[this.viewMode].navStep * (target[0].className == 'prev' ? -1 : 1);
                                        switch (this.viewMode) {
                                            case 0:
                                                this.viewDate = this.moveMonth(this.viewDate, dir);
                                                break;
                                            case 1:
                                            case 2:
                                                this.viewDate = this.moveYear(this.viewDate, dir);
                                                break;
                                        }
                                        this.fill();
                                        break;
                                    case 'today':
                                        var date = new Date();
                                        date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);

                                        this.showMode(-2);
                                        var which = this.o.todayBtn == 'linked' ? null : 'view';
                                        this._setDate(date, which);
                                        break;
                                    case 'clear':
                                        var element;
                                        if (this.isInput) element = this.element;else if (this.component) element = this.element.find('input');
                                        if (element) element.val("").change();
                                        this._trigger('changeDate');
                                        this.update();
                                        if (this.o.autoclose) this.hide();
                                        break;
                                }
                                break;
                            case 'span':
                                if (!target.is('.disabled')) {
                                    this.viewDate.setUTCDate(1);
                                    if (target.is('.month')) {
                                        var day = 1;
                                        var month = target.parent().find('span').index(target);
                                        var year = this.viewDate.getUTCFullYear();
                                        this.viewDate.setUTCMonth(month);
                                        this._trigger('changeMonth', this.viewDate);
                                        if (this.o.minViewMode === 1) {
                                            this._setDate(UTCDate(year, month, day, 0, 0, 0, 0));
                                        }
                                    } else {
                                        var year = parseInt(target.text(), 10) || 0;
                                        var day = 1;
                                        var month = 0;
                                        this.viewDate.setUTCFullYear(year);
                                        this._trigger('changeYear', this.viewDate);
                                        if (this.o.minViewMode === 2) {
                                            this._setDate(UTCDate(year, month, day, 0, 0, 0, 0));
                                        }
                                    }
                                    this.showMode(-1);
                                    this.fill();
                                }
                                break;
                            case 'td':
                                if (target.is('.day') && !target.is('.disabled')) {
                                    var day = parseInt(target.text(), 10) || 1;
                                    var year = this.viewDate.getUTCFullYear(),
                                        month = this.viewDate.getUTCMonth();
                                    if (target.is('.old')) {
                                        if (month === 0) {
                                            month = 11;
                                            year -= 1;
                                        } else {
                                            month -= 1;
                                        }
                                    } else if (target.is('.new')) {
                                        if (month == 11) {
                                            month = 0;
                                            year += 1;
                                        } else {
                                            month += 1;
                                        }
                                    }
                                    this._setDate(UTCDate(year, month, day, 0, 0, 0, 0));
                                }
                                break;
                        }
                    }
                },

                _setDate: function (date, which) {
                    if (!which || which == 'date') this.date = new Date(date);
                    if (!which || which == 'view') this.viewDate = new Date(date);
                    this.fill();
                    this.setValue();
                    this._trigger('changeDate');
                    var element;
                    if (this.isInput) {
                        element = this.element;
                    } else if (this.component) {
                        element = this.element.find('input');
                    }
                    if (element) {
                        element.change();
                        if (this.o.autoclose && (!which || which == 'date')) {
                            this.hide();
                        }
                    }
                },

                moveMonth: function (date, dir) {
                    if (!dir) return date;
                    var new_date = new Date(date.valueOf()),
                        day = new_date.getUTCDate(),
                        month = new_date.getUTCMonth(),
                        mag = Math.abs(dir),
                        new_month,
                        test;
                    dir = dir > 0 ? 1 : -1;
                    if (mag == 1) {
                        test = dir == -1
                        // If going back one month, make sure month is not current month
                        // (eg, Mar 31 -> Feb 31 == Feb 28, not Mar 02)
                        ? function () {
                            return new_date.getUTCMonth() == month;
                        }
                        // If going forward one month, make sure month is as expected
                        // (eg, Jan 31 -> Feb 31 == Feb 28, not Mar 02)
                        : function () {
                            return new_date.getUTCMonth() != new_month;
                        };
                        new_month = month + dir;
                        new_date.setUTCMonth(new_month);
                        // Dec -> Jan (12) or Jan -> Dec (-1) -- limit expected date to 0-11
                        if (new_month < 0 || new_month > 11) new_month = (new_month + 12) % 12;
                    } else {
                        // For magnitudes >1, move one month at a time...
                        for (var i = 0; i < mag; i++)
                        // ...which might decrease the day (eg, Jan 31 to Feb 28, etc)...
                        new_date = this.moveMonth(new_date, dir);
                        // ...then reset the day, keeping it in the new month
                        new_month = new_date.getUTCMonth();
                        new_date.setUTCDate(day);
                        test = function () {
                            return new_month != new_date.getUTCMonth();
                        };
                    }
                    // Common date-resetting loop -- if date is beyond end of month, make it
                    // end of month
                    while (test()) {
                        new_date.setUTCDate(--day);
                        new_date.setUTCMonth(new_month);
                    }
                    return new_date;
                },

                moveYear: function (date, dir) {
                    return this.moveMonth(date, dir * 12);
                },

                dateWithinRange: function (date) {
                    return date >= this.o.startDate && date <= this.o.endDate;
                },

                keydown: function (e) {
                    if (this.picker.is(':not(:visible)')) {
                        if (e.keyCode == 27) // allow escape to hide and re-show picker
                            this.show();
                        return;
                    }
                    var dateChanged = false,
                        dir,
                        day,
                        month,
                        newDate,
                        newViewDate;
                    switch (e.keyCode) {
                        case 27:
                            // escape
                            this.hide();
                            e.preventDefault();
                            break;
                        case 37: // left
                        case 39:
                            // right
                            if (!this.o.keyboardNavigation) break;
                            dir = e.keyCode == 37 ? -1 : 1;
                            if (e.ctrlKey) {
                                newDate = this.moveYear(this.date, dir);
                                newViewDate = this.moveYear(this.viewDate, dir);
                            } else if (e.shiftKey) {
                                newDate = this.moveMonth(this.date, dir);
                                newViewDate = this.moveMonth(this.viewDate, dir);
                            } else {
                                newDate = new Date(this.date);
                                newDate.setUTCDate(this.date.getUTCDate() + dir);
                                newViewDate = new Date(this.viewDate);
                                newViewDate.setUTCDate(this.viewDate.getUTCDate() + dir);
                            }
                            if (this.dateWithinRange(newDate)) {
                                this.date = newDate;
                                this.viewDate = newViewDate;
                                this.setValue();
                                this.update();
                                e.preventDefault();
                                dateChanged = true;
                            }
                            break;
                        case 38: // up
                        case 40:
                            // down
                            if (!this.o.keyboardNavigation) break;
                            dir = e.keyCode == 38 ? -1 : 1;
                            if (e.ctrlKey) {
                                newDate = this.moveYear(this.date, dir);
                                newViewDate = this.moveYear(this.viewDate, dir);
                            } else if (e.shiftKey) {
                                newDate = this.moveMonth(this.date, dir);
                                newViewDate = this.moveMonth(this.viewDate, dir);
                            } else {
                                newDate = new Date(this.date);
                                newDate.setUTCDate(this.date.getUTCDate() + dir * 7);
                                newViewDate = new Date(this.viewDate);
                                newViewDate.setUTCDate(this.viewDate.getUTCDate() + dir * 7);
                            }
                            if (this.dateWithinRange(newDate)) {
                                this.date = newDate;
                                this.viewDate = newViewDate;
                                this.setValue();
                                this.update();
                                e.preventDefault();
                                dateChanged = true;
                            }
                            break;
                        case 13:
                            // enter
                            this.hide();
                            e.preventDefault();
                            break;
                        case 9:
                            // tab
                            this.hide();
                            break;
                    }
                    if (dateChanged) {
                        this._trigger('changeDate');
                        var element;
                        if (this.isInput) {
                            element = this.element;
                        } else if (this.component) {
                            element = this.element.find('input');
                        }
                        if (element) {
                            element.change();
                        }
                    }
                },

                showMode: function (dir) {
                    if (dir) {
                        this.viewMode = Math.max(this.o.minViewMode, Math.min(2, this.viewMode + dir));
                    }
                    /*
                    	vitalets: fixing bug of very special conditions:
                    	jquery 1.7.1 + webkit + show inline datepicker in bootstrap popover.
                    	Method show() does not set display css correctly and datepicker is not shown.
                    	Changed to .css('display', 'block') solve the problem.
                    	See https://github.com/vitalets/x-editable/issues/37
                    		In jquery 1.7.2+ everything works fine.
                    */
                    //this.picker.find('>div').hide().filter('.datepicker-'+DPGlobal.modes[this.viewMode].clsName).show();
                    this.picker.find('>div').hide().filter('.datepicker-' + DPGlobal.modes[this.viewMode].clsName).css('display', 'block');
                    this.updateNavArrows();
                }
            };

            var DateRangePicker = function (element, options) {
                this.element = $(element);
                this.inputs = $.map(options.inputs, function (i) {
                    return i.jquery ? i[0] : i;
                });
                delete options.inputs;

                $(this.inputs).datepicker(options).bind('changeDate', $.proxy(this.dateUpdated, this));

                this.pickers = $.map(this.inputs, function (i) {
                    return $(i).data('datepicker');
                });
                this.updateDates();
            };
            DateRangePicker.prototype = {
                updateDates: function () {
                    this.dates = $.map(this.pickers, function (i) {
                        return i.date;
                    });
                    this.updateRanges();
                },
                updateRanges: function () {
                    var range = $.map(this.dates, function (d) {
                        return d.valueOf();
                    });
                    $.each(this.pickers, function (i, p) {
                        p.setRange(range);
                    });
                },
                dateUpdated: function (e) {
                    var dp = $(e.target).data('datepicker'),
                        new_date = dp.getUTCDate(),
                        i = $.inArray(e.target, this.inputs),
                        l = this.inputs.length;
                    if (i == -1) return;

                    if (new_date < this.dates[i]) {
                        // Date being moved earlier/left
                        while (i >= 0 && new_date < this.dates[i]) {
                            this.pickers[i--].setUTCDate(new_date);
                        }
                    } else if (new_date > this.dates[i]) {
                        // Date being moved later/right
                        while (i < l && new_date > this.dates[i]) {
                            this.pickers[i++].setUTCDate(new_date);
                        }
                    }
                    this.updateDates();
                },
                remove: function () {
                    $.map(this.pickers, function (p) {
                        p.remove();
                    });
                    delete this.element.data().datepicker;
                }
            };

            function opts_from_el(el, prefix) {
                // Derive options from element data-attrs
                var data = $(el).data(),
                    out = {},
                    inkey,
                    replace = new RegExp('^' + prefix.toLowerCase() + '([A-Z])'),
                    prefix = new RegExp('^' + prefix.toLowerCase());
                for (var key in data) if (prefix.test(key)) {
                    inkey = key.replace(replace, function (_, a) {
                        return a.toLowerCase();
                    });
                    out[inkey] = data[key];
                }
                return out;
            }

            function opts_from_locale(lang) {
                // Derive options from locale plugins
                var out = {};
                // Check if "de-DE" style date is available, if not language should
                // fallback to 2 letter code eg "de"
                if (!dates[lang]) {
                    lang = lang.split('-')[0];
                    if (!dates[lang]) return;
                }
                var d = dates[lang];
                $.each(locale_opts, function (i, k) {
                    if (k in d) out[k] = d[k];
                });
                return out;
            }

            var old = $.fn.datepicker;
            var datepicker = $.fn.datepicker = function (option) {
                var args = Array.apply(null, arguments);
                args.shift();
                var internal_return, this_return;
                this.each(function () {
                    var $this = $(this),
                        data = $this.data('datepicker'),
                        options = typeof option == 'object' && option;
                    if (!data) {
                        var elopts = opts_from_el(this, 'date'),

                        // Preliminary otions
                        xopts = $.extend({}, defaults, elopts, options),
                            locopts = opts_from_locale(xopts.language),

                        // Options priority: js args, data-attrs, locales, defaults
                        opts = $.extend({}, defaults, locopts, elopts, options);
                        if ($this.is('.input-daterange') || opts.inputs) {
                            var ropts = {
                                inputs: opts.inputs || $this.find('input').toArray()
                            };
                            $this.data('datepicker', data = new DateRangePicker(this, $.extend(opts, ropts)));
                        } else {
                            $this.data('datepicker', data = new Datepicker(this, opts));
                        }
                    }
                    if (typeof option == 'string' && typeof data[option] == 'function') {
                        internal_return = data[option].apply(data, args);
                        if (internal_return !== undefined) return false;
                    }
                });
                if (internal_return !== undefined) return internal_return;else return this;
            };

            var defaults = $.fn.datepicker.defaults = {
                autoclose: false,
                beforeShowDay: $.noop,
                calendarWeeks: false,
                clearBtn: false,
                daysOfWeekDisabled: [],
                endDate: Infinity,
                forceParse: true,
                format: 'mm/dd/yyyy',
                keyboardNavigation: true,
                language: 'en',
                minViewMode: 0,
                rtl: false,
                startDate: -Infinity,
                startView: 0,
                todayBtn: false,
                todayHighlight: false,
                weekStart: 0
            };
            var locale_opts = $.fn.datepicker.locale_opts = ['format', 'rtl', 'weekStart'];
            $.fn.datepicker.Constructor = Datepicker;
            var dates = $.fn.datepicker.dates = {
                en: {
                    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                    daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                    daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
                    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    today: "Today",
                    clear: "Clear"
                }
            };

            var DPGlobal = {
                modes: [{
                    clsName: 'days',
                    navFnc: 'Month',
                    navStep: 1
                }, {
                    clsName: 'months',
                    navFnc: 'FullYear',
                    navStep: 1
                }, {
                    clsName: 'years',
                    navFnc: 'FullYear',
                    navStep: 10
                }],
                isLeapYear: function (year) {
                    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
                },
                getDaysInMonth: function (year, month) {
                    return [31, DPGlobal.isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
                },
                validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
                nonpunctuation: /[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,
                parseFormat: function (format) {
                    // IE treats \0 as a string end in inputs (truncating the value),
                    // so it's a bad format delimiter, anyway
                    var separators = format.replace(this.validParts, '\0').split('\0'),
                        parts = format.match(this.validParts);
                    if (!separators || !separators.length || !parts || parts.length === 0) {
                        throw new Error("Invalid date format.");
                    }
                    return { separators: separators, parts: parts };
                },
                parseDate: function (date, format, language) {
                    if (date instanceof Date) return date;
                    if (typeof format === 'string') format = DPGlobal.parseFormat(format);
                    if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(date)) {
                        var part_re = /([\-+]\d+)([dmwy])/,
                            parts = date.match(/([\-+]\d+)([dmwy])/g),
                            part,
                            dir;
                        date = new Date();
                        for (var i = 0; i < parts.length; i++) {
                            part = part_re.exec(parts[i]);
                            dir = parseInt(part[1]);
                            switch (part[2]) {
                                case 'd':
                                    date.setUTCDate(date.getUTCDate() + dir);
                                    break;
                                case 'm':
                                    date = Datepicker.prototype.moveMonth.call(Datepicker.prototype, date, dir);
                                    break;
                                case 'w':
                                    date.setUTCDate(date.getUTCDate() + dir * 7);
                                    break;
                                case 'y':
                                    date = Datepicker.prototype.moveYear.call(Datepicker.prototype, date, dir);
                                    break;
                            }
                        }
                        return UTCDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0);
                    }
                    var parts = date && date.match(this.nonpunctuation) || [],
                        date = new Date(),
                        parsed = {},
                        setters_order = ['yyyy', 'yy', 'M', 'MM', 'm', 'mm', 'd', 'dd'],
                        setters_map = {
                        yyyy: function (d, v) {
                            return d.setUTCFullYear(v);
                        },
                        yy: function (d, v) {
                            return d.setUTCFullYear(2000 + v);
                        },
                        m: function (d, v) {
                            v -= 1;
                            while (v < 0) v += 12;
                            v %= 12;
                            d.setUTCMonth(v);
                            while (d.getUTCMonth() != v) d.setUTCDate(d.getUTCDate() - 1);
                            return d;
                        },
                        d: function (d, v) {
                            return d.setUTCDate(v);
                        }
                    },
                        val,
                        filtered,
                        part;
                    setters_map['M'] = setters_map['MM'] = setters_map['mm'] = setters_map['m'];
                    setters_map['dd'] = setters_map['d'];
                    date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
                    var fparts = format.parts.slice();
                    // Remove noop parts
                    if (parts.length != fparts.length) {
                        fparts = $(fparts).filter(function (i, p) {
                            return $.inArray(p, setters_order) !== -1;
                        }).toArray();
                    }
                    // Process remainder
                    if (parts.length == fparts.length) {
                        for (var i = 0, cnt = fparts.length; i < cnt; i++) {
                            val = parseInt(parts[i], 10);
                            part = fparts[i];
                            if (isNaN(val)) {
                                switch (part) {
                                    case 'MM':
                                        filtered = $(dates[language].months).filter(function () {
                                            var m = this.slice(0, parts[i].length),
                                                p = parts[i].slice(0, m.length);
                                            return m == p;
                                        });
                                        val = $.inArray(filtered[0], dates[language].months) + 1;
                                        break;
                                    case 'M':
                                        filtered = $(dates[language].monthsShort).filter(function () {
                                            var m = this.slice(0, parts[i].length),
                                                p = parts[i].slice(0, m.length);
                                            return m == p;
                                        });
                                        val = $.inArray(filtered[0], dates[language].monthsShort) + 1;
                                        break;
                                }
                            }
                            parsed[part] = val;
                        }
                        for (var i = 0, s; i < setters_order.length; i++) {
                            s = setters_order[i];
                            if (s in parsed && !isNaN(parsed[s])) setters_map[s](date, parsed[s]);
                        }
                    }
                    return date;
                },
                formatDate: function (date, format, language) {
                    if (typeof format === 'string') format = DPGlobal.parseFormat(format);
                    var val = {
                        d: date.getUTCDate(),
                        D: dates[language].daysShort[date.getUTCDay()],
                        DD: dates[language].days[date.getUTCDay()],
                        m: date.getUTCMonth() + 1,
                        M: dates[language].monthsShort[date.getUTCMonth()],
                        MM: dates[language].months[date.getUTCMonth()],
                        yy: date.getUTCFullYear().toString().substring(2),
                        yyyy: date.getUTCFullYear()
                    };
                    val.dd = (val.d < 10 ? '0' : '') + val.d;
                    val.mm = (val.m < 10 ? '0' : '') + val.m;
                    var date = [],
                        seps = $.extend([], format.separators);
                    for (var i = 0, cnt = format.parts.length; i <= cnt; i++) {
                        if (seps.length) date.push(seps.shift());
                        date.push(val[format.parts[i]]);
                    }
                    return date.join('');
                },
                headTemplate: '<thead>' + '<tr>' + '<th class="prev"><i class="icon-arrow-left"/></th>' + '<th colspan="5" class="datepicker-switch"></th>' + '<th class="next"><i class="icon-arrow-right"/></th>' + '</tr>' + '</thead>',
                contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
                footTemplate: '<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>'
            };
            DPGlobal.template = '<div class="datepicker">' + '<div class="datepicker-days">' + '<table class=" table-condensed">' + DPGlobal.headTemplate + '<tbody></tbody>' + DPGlobal.footTemplate + '</table>' + '</div>' + '<div class="datepicker-months">' + '<table class="table-condensed">' + DPGlobal.headTemplate + DPGlobal.contTemplate + DPGlobal.footTemplate + '</table>' + '</div>' + '<div class="datepicker-years">' + '<table class="table-condensed">' + DPGlobal.headTemplate + DPGlobal.contTemplate + DPGlobal.footTemplate + '</table>' + '</div>' + '</div>';

            $.fn.datepicker.DPGlobal = DPGlobal;

            /* DATEPICKER NO CONFLICT
            * =================== */

            $.fn.datepicker.noConflict = function () {
                $.fn.datepicker = old;
                return this;
            };

            /* DATEPICKER DATA-API
            * ================== */

            $(document).on('focus.datepicker.data-api click.datepicker.data-api', '[data-provide="datepicker"]', function (e) {
                var $this = $(this);
                if ($this.data('datepicker')) return;
                e.preventDefault();
                // component click requires us to explicitly show it
                datepicker.call($this, 'show');
            });
            $(function () {
                //$('[data-provide="datepicker-inline"]').datepicker();
                //vit: changed to support noConflict()
                datepicker.call($('[data-provide="datepicker-inline"]'));
            });
        })(window.jQuery);

        /**
        Bootstrap-datepicker.
        Description and examples: https://github.com/eternicode/bootstrap-datepicker.
        For **i18n** you should include js file from here: https://github.com/eternicode/bootstrap-datepicker/tree/master/js/locales
        and set `language` option.
        Since 1.4.0 date has different appearance in **popup** and **inline** modes.

        @class date
        @extends abstractinput
        @final
        @example
        <a href="#" id="dob" data-type="date" data-pk="1" data-url="/post" data-title="Select date">15/05/1984</a>
        <script>
        $(function(){
            $('#dob').editable({
                format: 'yyyy-mm-dd',
                viewformat: 'dd/mm/yyyy',
                datepicker: {
                        weekStart: 1
                   }
                }
            });
        });
        </script>
        **/
        (function ($) {
            "use strict";

            //store bootstrap-datepicker as bdateicker to exclude conflict with jQuery UI one

            $.fn.bdatepicker = $.fn.datepicker.noConflict();
            if (!$.fn.datepicker) {
                //if there were no other datepickers, keep also original name
                $.fn.datepicker = $.fn.bdatepicker;
            }

            var Date = function (options) {
                this.init('date', options, Date.defaults);
                this.initPicker(options, Date.defaults);
            };

            $.fn.editableutils.inherit(Date, $.fn.editabletypes.abstractinput);

            $.extend(Date.prototype, {
                initPicker: function (options, defaults) {
                    //'format' is set directly from settings or data-* attributes

                    //by default viewformat equals to format
                    if (!this.options.viewformat) {
                        this.options.viewformat = this.options.format;
                    }

                    //try parse datepicker config defined as json string in data-datepicker
                    options.datepicker = $.fn.editableutils.tryParseJson(options.datepicker, true);

                    //overriding datepicker config (as by default jQuery extend() is not recursive)
                    //since 1.4 datepicker internally uses viewformat instead of format. Format is for submit only
                    this.options.datepicker = $.extend({}, defaults.datepicker, options.datepicker, {
                        format: this.options.viewformat
                    });

                    //language
                    this.options.datepicker.language = this.options.datepicker.language || 'en';

                    //store DPglobal
                    this.dpg = $.fn.bdatepicker.DPGlobal;

                    //store parsed formats
                    this.parsedFormat = this.dpg.parseFormat(this.options.format);
                    this.parsedViewFormat = this.dpg.parseFormat(this.options.viewformat);
                },

                render: function () {
                    this.$input.bdatepicker(this.options.datepicker);

                    //"clear" link
                    if (this.options.clear) {
                        this.$clear = $('<a href="#"></a>').html(this.options.clear).click($.proxy(function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            this.clear();
                        }, this));

                        this.$tpl.parent().append($('<div class="editable-clear">').append(this.$clear));
                    }
                },

                value2html: function (value, element) {
                    var text = value ? this.dpg.formatDate(value, this.parsedViewFormat, this.options.datepicker.language) : '';
                    Date.superclass.value2html.call(this, text, element);
                },

                html2value: function (html) {
                    return this.parseDate(html, this.parsedViewFormat);
                },

                value2str: function (value) {
                    return value ? this.dpg.formatDate(value, this.parsedFormat, this.options.datepicker.language) : '';
                },

                str2value: function (str) {
                    return this.parseDate(str, this.parsedFormat);
                },

                value2submit: function (value) {
                    return this.value2str(value);
                },

                value2input: function (value) {
                    this.$input.bdatepicker('update', value);
                },

                input2value: function () {
                    return this.$input.data('datepicker').date;
                },

                activate: function () {},

                clear: function () {
                    this.$input.data('datepicker').date = null;
                    this.$input.find('.active').removeClass('active');
                    if (!this.options.showbuttons) {
                        this.$input.closest('form').submit();
                    }
                },

                autosubmit: function () {
                    this.$input.on('mouseup', '.day', function (e) {
                        if ($(e.currentTarget).is('.old') || $(e.currentTarget).is('.new')) {
                            return;
                        }
                        var $form = $(this).closest('form');
                        setTimeout(function () {
                            $form.submit();
                        }, 200);
                    });
                    //changedate is not suitable as it triggered when showing datepicker. see #149
                    /*
                    this.$input.on('changeDate', function(e){
                        var $form = $(this).closest('form');
                        setTimeout(function() {
                            $form.submit();
                        }, 200);
                    });
                    */
                },

                /*
                 For incorrect date bootstrap-datepicker returns current date that is not suitable
                 for datefield.
                 This function returns null for incorrect date.
                */
                parseDate: function (str, format) {
                    var date = null,
                        formattedBack;
                    if (str) {
                        date = this.dpg.parseDate(str, format, this.options.datepicker.language);
                        if (typeof str === 'string') {
                            formattedBack = this.dpg.formatDate(date, format, this.options.datepicker.language);
                            if (str !== formattedBack) {
                                date = null;
                            }
                        }
                    }
                    return date;
                }

            });

            Date.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
                /**
                @property tpl
                @default <div></div>
                **/
                tpl: '<div class="editable-date well"></div>',
                /**
                @property inputclass
                @default null
                **/
                inputclass: null,
                /**
                Format used for sending value to server. Also applied when converting date from <code>data-value</code> attribute.<br>
                Possible tokens are: <code>d, dd, m, mm, yy, yyyy</code>
                 @property format
                @type string
                @default yyyy-mm-dd
                **/
                format: 'yyyy-mm-dd',
                /**
                Format used for displaying date. Also applied when converting date from element's text on init.
                If not specified equals to <code>format</code>
                 @property viewformat
                @type string
                @default null
                **/
                viewformat: null,
                /**
                Configuration of datepicker.
                Full list of options: http://bootstrap-datepicker.readthedocs.org/en/latest/options.html
                 @property datepicker
                @type object
                @default {
                    weekStart: 0,
                    startView: 0,
                    minViewMode: 0,
                    autoclose: false
                }
                **/
                datepicker: {
                    weekStart: 0,
                    startView: 0,
                    minViewMode: 0,
                    autoclose: false
                },
                /**
                Text shown as clear date button.
                If <code>false</code> clear button will not be rendered.
                 @property clear
                @type boolean|string
                @default 'x clear'
                **/
                clear: '&times; clear'
            });

            $.fn.editabletypes.date = Date;
        })(window.jQuery);

        /**
        Bootstrap datefield input - modification for inline mode.
        Shows normal <input type="text"> and binds popup datepicker.
        Automatically shown in inline mode.

        @class datefield
        @extends date

        @since 1.4.0
        **/
        (function ($) {
            "use strict";

            var DateField = function (options) {
                this.init('datefield', options, DateField.defaults);
                this.initPicker(options, DateField.defaults);
            };

            $.fn.editableutils.inherit(DateField, $.fn.editabletypes.date);

            $.extend(DateField.prototype, {
                render: function () {
                    this.$input = this.$tpl.find('input');
                    this.setClass();
                    this.setAttr('placeholder');

                    //bootstrap-datepicker is set `bdateicker` to exclude conflict with jQuery UI one. (in date.js)
                    this.$tpl.bdatepicker(this.options.datepicker);

                    //need to disable original event handlers
                    this.$input.off('focus keydown');

                    //update value of datepicker
                    this.$input.keyup($.proxy(function () {
                        this.$tpl.removeData('date');
                        this.$tpl.bdatepicker('update');
                    }, this));
                },

                value2input: function (value) {
                    this.$input.val(value ? this.dpg.formatDate(value, this.parsedViewFormat, this.options.datepicker.language) : '');
                    this.$tpl.bdatepicker('update');
                },

                input2value: function () {
                    return this.html2value(this.$input.val());
                },

                activate: function () {
                    $.fn.editabletypes.text.prototype.activate.call(this);
                },

                autosubmit: function () {
                    //reset autosubmit to empty
                }
            });

            DateField.defaults = $.extend({}, $.fn.editabletypes.date.defaults, {
                /**
                @property tpl
                **/
                tpl: '<div class="input-append date"><input type="text"/><span class="add-on"><i class="icon-th"></i></span></div>',
                /**
                @property inputclass
                @default 'input-small'
                **/
                inputclass: 'input-small',

                /* datepicker config */
                datepicker: {
                    weekStart: 0,
                    startView: 0,
                    minViewMode: 0,
                    autoclose: true
                }
            });

            $.fn.editabletypes.datefield = DateField;
        })(window.jQuery);
        /**
        Bootstrap-datetimepicker.
        Based on [smalot bootstrap-datetimepicker plugin](https://github.com/smalot/bootstrap-datetimepicker).
        Before usage you should manually include dependent js and css:

            <link href="css/datetimepicker.css" rel="stylesheet" type="text/css"></link>
            <script src="js/bootstrap-datetimepicker.js"></script>

        For **i18n** you should include js file from here: https://github.com/smalot/bootstrap-datetimepicker/tree/master/js/locales
        and set `language` option.

        @class datetime
        @extends abstractinput
        @final
        @since 1.4.4
        @example
        <a href="#" id="last_seen" data-type="datetime" data-pk="1" data-url="/post" title="Select date & time">15/03/2013 12:45</a>
        <script>
        $(function(){
            $('#last_seen').editable({
                format: 'yyyy-mm-dd hh:ii',
                viewformat: 'dd/mm/yyyy hh:ii',
                datetimepicker: {
                        weekStart: 1
                   }
                }
            });
        });
        </script>
        **/
        (function ($) {
            "use strict";

            var DateTime = function (options) {
                this.init('datetime', options, DateTime.defaults);
                this.initPicker(options, DateTime.defaults);
            };

            $.fn.editableutils.inherit(DateTime, $.fn.editabletypes.abstractinput);

            $.extend(DateTime.prototype, {
                initPicker: function (options, defaults) {
                    //'format' is set directly from settings or data-* attributes

                    //by default viewformat equals to format
                    if (!this.options.viewformat) {
                        this.options.viewformat = this.options.format;
                    }

                    //try parse datetimepicker config defined as json string in data-datetimepicker
                    options.datetimepicker = $.fn.editableutils.tryParseJson(options.datetimepicker, true);

                    //overriding datetimepicker config (as by default jQuery extend() is not recursive)
                    //since 1.4 datetimepicker internally uses viewformat instead of format. Format is for submit only
                    this.options.datetimepicker = $.extend({}, defaults.datetimepicker, options.datetimepicker, {
                        format: this.options.viewformat
                    });

                    //language
                    this.options.datetimepicker.language = this.options.datetimepicker.language || 'en';

                    //store DPglobal
                    this.dpg = $.fn.datetimepicker.DPGlobal;

                    //store parsed formats
                    this.parsedFormat = this.dpg.parseFormat(this.options.format, this.options.formatType);
                    this.parsedViewFormat = this.dpg.parseFormat(this.options.viewformat, this.options.formatType);
                },

                render: function () {
                    this.$input.datetimepicker(this.options.datetimepicker);

                    //adjust container position when viewMode changes
                    //see https://github.com/smalot/bootstrap-datetimepicker/pull/80
                    this.$input.on('changeMode', function (e) {
                        var f = $(this).closest('form').parent();
                        //timeout here, otherwise container changes position before form has new size
                        setTimeout(function () {
                            f.triggerHandler('resize');
                        }, 0);
                    });

                    //"clear" link
                    if (this.options.clear) {
                        this.$clear = $('<a href="#"></a>').html(this.options.clear).click($.proxy(function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            this.clear();
                        }, this));

                        this.$tpl.parent().append($('<div class="editable-clear">').append(this.$clear));
                    }
                },

                value2html: function (value, element) {
                    //formatDate works with UTCDate!
                    var text = value ? this.dpg.formatDate(this.toUTC(value), this.parsedViewFormat, this.options.datetimepicker.language, this.options.formatType) : '';
                    if (element) {
                        DateTime.superclass.value2html.call(this, text, element);
                    } else {
                        return text;
                    }
                },

                html2value: function (html) {
                    //parseDate return utc date!
                    var value = this.parseDate(html, this.parsedViewFormat);
                    return value ? this.fromUTC(value) : null;
                },

                value2str: function (value) {
                    //formatDate works with UTCDate!
                    return value ? this.dpg.formatDate(this.toUTC(value), this.parsedFormat, this.options.datetimepicker.language, this.options.formatType) : '';
                },

                str2value: function (str) {
                    //parseDate return utc date!
                    var value = this.parseDate(str, this.parsedFormat);
                    return value ? this.fromUTC(value) : null;
                },

                value2submit: function (value) {
                    return this.value2str(value);
                },

                value2input: function (value) {
                    if (value) {
                        this.$input.data('datetimepicker').setDate(value);
                    }
                },

                input2value: function () {
                    //date may be cleared, in that case getDate() triggers error
                    var dt = this.$input.data('datetimepicker');
                    return dt.date ? dt.getDate() : null;
                },

                activate: function () {},

                clear: function () {
                    this.$input.data('datetimepicker').date = null;
                    this.$input.find('.active').removeClass('active');
                    if (!this.options.showbuttons) {
                        this.$input.closest('form').submit();
                    }
                },

                autosubmit: function () {
                    this.$input.on('mouseup', '.minute', function (e) {
                        var $form = $(this).closest('form');
                        setTimeout(function () {
                            $form.submit();
                        }, 200);
                    });
                },

                //convert date from local to utc
                toUTC: function (value) {
                    return value ? new Date(value.valueOf() - value.getTimezoneOffset() * 60000) : value;
                },

                //convert date from utc to local
                fromUTC: function (value) {
                    return value ? new Date(value.valueOf() + value.getTimezoneOffset() * 60000) : value;
                },

                /*
                 For incorrect date bootstrap-datetimepicker returns current date that is not suitable
                 for datetimefield.
                 This function returns null for incorrect date.
                */
                parseDate: function (str, format) {
                    var date = null,
                        formattedBack;
                    if (str) {
                        date = this.dpg.parseDate(str, format, this.options.datetimepicker.language, this.options.formatType);
                        if (typeof str === 'string') {
                            formattedBack = this.dpg.formatDate(date, format, this.options.datetimepicker.language, this.options.formatType);
                            if (str !== formattedBack) {
                                date = null;
                            }
                        }
                    }
                    return date;
                }

            });

            DateTime.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
                /**
                @property tpl
                @default <div></div>
                **/
                tpl: '<div class="editable-date well"></div>',
                /**
                @property inputclass
                @default null
                **/
                inputclass: null,
                /**
                Format used for sending value to server. Also applied when converting date from <code>data-value</code> attribute.<br>
                Possible tokens are: <code>d, dd, m, mm, yy, yyyy, h, i</code>

                @property format
                @type string
                @default yyyy-mm-dd hh:ii
                **/
                format: 'yyyy-mm-dd hh:ii',
                formatType: 'standard',
                /**
                Format used for displaying date. Also applied when converting date from element's text on init.
                If not specified equals to <code>format</code>

                @property viewformat
                @type string
                @default null
                **/
                viewformat: null,
                /**
                Configuration of datetimepicker.
                Full list of options: https://github.com/smalot/bootstrap-datetimepicker
                 @property datetimepicker
                @type object
                @default { }
                **/
                datetimepicker: {
                    todayHighlight: false,
                    autoclose: false
                },
                /**
                Text shown as clear date button.
                If <code>false</code> clear button will not be rendered.
                 @property clear
                @type boolean|string
                @default 'x clear'
                **/
                clear: '&times; clear'
            });

            $.fn.editabletypes.datetime = DateTime;
        })(window.jQuery);
        /**
        Bootstrap datetimefield input - datetime input for inline mode.
        Shows normal <input type="text"> and binds popup datetimepicker.
        Automatically shown in inline mode.

        @class datetimefield
        @extends datetime

        **/
        (function ($) {
            "use strict";

            var DateTimeField = function (options) {
                this.init('datetimefield', options, DateTimeField.defaults);
                this.initPicker(options, DateTimeField.defaults);
            };

            $.fn.editableutils.inherit(DateTimeField, $.fn.editabletypes.datetime);

            $.extend(DateTimeField.prototype, {
                render: function () {
                    this.$input = this.$tpl.find('input');
                    this.setClass();
                    this.setAttr('placeholder');

                    this.$tpl.datetimepicker(this.options.datetimepicker);

                    //need to disable original event handlers
                    this.$input.off('focus keydown');

                    //update value of datepicker
                    this.$input.keyup($.proxy(function () {
                        this.$tpl.removeData('date');
                        this.$tpl.datetimepicker('update');
                    }, this));
                },

                value2input: function (value) {
                    this.$input.val(this.value2html(value));
                    this.$tpl.datetimepicker('update');
                },

                input2value: function () {
                    return this.html2value(this.$input.val());
                },

                activate: function () {
                    $.fn.editabletypes.text.prototype.activate.call(this);
                },

                autosubmit: function () {
                    //reset autosubmit to empty
                }
            });

            DateTimeField.defaults = $.extend({}, $.fn.editabletypes.datetime.defaults, {
                /**
                @property tpl
                **/
                tpl: '<div class="input-append date"><input type="text"/><span class="add-on"><i class="icon-th"></i></span></div>',
                /**
                @property inputclass
                @default 'input-medium'
                **/
                inputclass: 'input-medium',

                /* datetimepicker config */
                datetimepicker: {
                    todayHighlight: false,
                    autoclose: true
                }
            });

            $.fn.editabletypes.datetimefield = DateTimeField;
        })(window.jQuery);
    })(this);

    return _retrieveGlobal();
});
System.registerDynamic("npm:tableexport.jquery.plugin@1.9.3.json", [], true, function() {
  return {
    "main": "tableExport.min.js",
    "format": "global",
    "meta": {
      "*.json": {
        "format": "json"
      },
      "LICENSE": {
        "globals": {
          "process": null
        }
      },
      "bower_components/file-saver/FileSaver.js": {
        "globals": {
          "process": null
        }
      },
      "bower_components/file-saver/FileSaver.min.js": {
        "globals": {
          "process": null
        }
      },
      "bower_components/html2canvas/.npmignore": {
        "globals": {
          "process": null
        }
      },
      "bower_components/html2canvas/Gruntfile.js": {
        "globals": {
          "process": null
        }
      },
      "bower_components/html2canvas/LICENSE": {
        "globals": {
          "process": null
        }
      },
      "bower_components/html2canvas/build/*": {
        "globals": {
          "process": null
        }
      },
      "bower_components/html2canvas/examples/*": {
        "globals": {
          "process": null
        }
      },
      "bower_components/html2canvas/src/*": {
        "globals": {
          "process": null
        }
      },
      "bower_components/jquery/AUTHORS.txt": {
        "globals": {
          "process": null
        }
      },
      "bower_components/jquery/LICENSE.txt": {
        "globals": {
          "process": null
        }
      },
      "bower_components/jquery/dist/*": {
        "globals": {
          "process": null
        }
      },
      "bower_components/jquery/external/*": {
        "globals": {
          "process": null
        }
      },
      "bower_components/jquery/src/ajax.js": {
        "globals": {
          "process": null
        }
      },
      "bower_components/jquery/src/ajax/*": {
        "globals": {
          "process": null
        }
      },
      "bower_components/jquery/src/attributes.js": {
        "globals": {
          "process": null
        }
      },
      "bower_components/jquery/src/attributes/*": {
        "globals": {
          "process": null
        }
      },
      "bower_components/jquery/src/callbacks.js": {
        "globals": {
          "process": null
        }
      },
      "bower_components/jquery/src/core.js": {
        "globals": {
          "process": null
        }
      },
      "bower_components/jquery/src/core/*": {
        "globals": {
          "process": null
        }
      },
      "bower_components/jquery/src/css.js": {
        "globals": {
          "process": null
        }
      },
      "bower_components/jquery/src/css/*": {
        "globals": {
          "process": null
        }
      },
      "bower_components/jquery/src/data.js": {
        "globals": {
          "process": null
        }
      },
      "bower_components/jquery/src/data/*": {
        "globals": {
          "process": null
        }
      },
      "bower_components/jquery/src/deferred.js": {
        "globals": {
          "process": null
        }
      },
      "bower_components/jquery/src/deferred/*": {
        "globals": {
          "process": null
        }
      },
      "bower_components/jquery/src/deprecated.js": {
        "globals": {
          "process": null
        }
      },
      "bower_components/jquery/src/dimensions.js": {
        "globals": {
          "process": null
        }
      },
      "bower_components/jquery/src/effects.js": {
        "globals": {
          "process": null
        }
      },
      "bower_components/jquery/src/effects/*": {
        "globals": {
          "process": null
        }
      },
      "bower_components/jquery/src/event.js": {
        "globals": {
          "process": null
        }
      },
      "bower_components/jquery/src/event/*": {
        "globals": {
          "process": null
        }
      },
      "bower_components/jquery/src/exports/*": {
        "globals": {
          "process": null
        }
      },
      "bower_components/jquery/src/jquery.js": {
        "globals": {
          "process": null
        }
      },
      "bower_components/jquery/src/manipulation.js": {
        "globals": {
          "process": null
        }
      },
      "bower_components/jquery/src/manipulation/*": {
        "globals": {
          "process": null
        }
      },
      "bower_components/jquery/src/offset.js": {
        "globals": {
          "process": null
        }
      },
      "bower_components/jquery/src/queue.js": {
        "globals": {
          "process": null
        }
      },
      "bower_components/jquery/src/queue/*": {
        "globals": {
          "process": null
        }
      },
      "bower_components/jquery/src/selector-native.js": {
        "globals": {
          "process": null
        }
      },
      "bower_components/jquery/src/selector-sizzle.js": {
        "globals": {
          "process": null
        }
      },
      "bower_components/jquery/src/selector.js": {
        "globals": {
          "process": null
        }
      },
      "bower_components/jquery/src/serialize.js": {
        "globals": {
          "process": null
        }
      },
      "bower_components/jquery/src/traversing.js": {
        "globals": {
          "process": null
        }
      },
      "bower_components/jquery/src/traversing/*": {
        "globals": {
          "process": null
        }
      },
      "bower_components/jquery/src/var/*": {
        "globals": {
          "process": null
        }
      },
      "bower_components/jquery/src/wrap.js": {
        "globals": {
          "process": null
        }
      },
      "bower_components/jspdf-autotable/.npmignore": {
        "globals": {
          "process": null
        }
      },
      "bower_components/jspdf-autotable/LICENSE.txt": {
        "globals": {
          "process": null
        }
      },
      "bower_components/jspdf-autotable/build.js": {
        "globals": {
          "process": null
        }
      },
      "bower_components/jspdf-autotable/dist/*": {
        "globals": {
          "process": null
        }
      },
      "bower_components/jspdf-autotable/examples/*": {
        "globals": {
          "process": null
        }
      },
      "bower_components/jspdf-autotable/samples.png": {
        "globals": {
          "process": null
        }
      },
      "bower_components/jspdf-autotable/src/*": {
        "globals": {
          "process": null
        }
      },
      "bower_components/jspdf/dist/*": {
        "globals": {
          "process": null
        }
      },
      "bower_components/tableExport.jquery.plugin/.npmignore": {
        "globals": {
          "process": null
        }
      },
      "bower_components/tableExport.jquery.plugin/tableExport.min.js": {
        "globals": {
          "process": null
        }
      },
      "tableExport.min.js": {
        "globals": {
          "process": null
        }
      }
    }
  };
});

System.registerDynamic("npm:tableexport.jquery.plugin@1.9.3/tableExport.min.js", [], false, function ($__require, $__exports, $__module) {
  var _retrieveGlobal = System.registry.get("@@global-helpers").prepareGlobal($__module.id, null, {});

  (function ($__global) {
    /*
     tableExport.jquery.plugin

     Copyright (c) 2015-2017 hhurz, https://github.com/hhurz

     Original Work Copyright (c) 2014 Giri Raj

     Licensed under the MIT License
    */
    (function (c) {
      c.fn.extend({ tableExport: function (n) {
          function N(b) {
            var a = [];c(b).find("thead").first().find("th").each(function (b, f) {
              void 0 !== c(f).attr("data-field") ? a[b] = c(f).attr("data-field") : a[b] = b.toString();
            });return a;
          }function x(b, m, e, f, z) {
            if (-1 == c.inArray(e, a.ignoreRow) && -1 == c.inArray(e - f, a.ignoreRow)) {
              var F = c(b).filter(function () {
                return "none" != c(this).data("tableexport-display") && (c(this).is(":visible") || "always" == c(this).data("tableexport-display") || "always" == c(this).closest("table").data("tableexport-display"));
              }).find(m),
                  l = 0;F.each(function (b) {
                if (("always" == c(this).data("tableexport-display") || "none" != c(this).css("display") && "hidden" != c(this).css("visibility") && "none" != c(this).data("tableexport-display")) && "function" === typeof z) {
                  var f,
                      m = 1,
                      r = 1;var d = F.length;if ("undefined" != typeof y[e] && 0 < y[e].length) {
                    var g = b;for (f = 0; f <= g; f++) "undefined" != typeof y[e][f] && (z(null, e, f), delete y[e][f], g++);b += y[e].length;d += y[e].length;
                  }c(this).is("[colspan]") && (m = parseInt(c(this).attr("colspan")) || 1, l += 0 < m ? m - 1 : 0);c(this).is("[rowspan]") && (r = parseInt(c(this).attr("rowspan")) || 1);f = d;d = b + l;g = !1;0 < a.ignoreColumn.length && ("string" == typeof a.ignoreColumn[0] ? I.length > d && "undefined" != typeof I[d] && -1 != c.inArray(I[d], a.ignoreColumn) && (g = !0) : "number" != typeof a.ignoreColumn[0] || -1 == c.inArray(d, a.ignoreColumn) && -1 == c.inArray(d - f, a.ignoreColumn) || (g = !0));if (!1 === g) for (z(this, e, b), f = 1; f < m; f++) z(null, e, b + f);if (1 < r) for (d = 1; d < r; d++) for ("undefined" == typeof y[e + d] && (y[e + d] = []), y[e + d][b + l] = "", f = 1; f < m; f++) y[e + d][b + l - f] = "";
                }
              });if ("undefined" != typeof y[e] && 0 < y[e].length) for (b = 0; b <= y[e].length; b++) "undefined" != typeof y[e][b] && (z(null, e, b), delete y[e][b]);
            }
          }function aa(b, m) {
            !0 === a.consoleLog && console.log(b.output());if ("string" === a.outputMode) return b.output();if ("base64" === a.outputMode) return D(b.output());if ("window" === a.outputMode) window.open(URL.createObjectURL(b.output("blob")));else try {
              var e = b.output("blob");saveAs(e, a.fileName + ".pdf");
            } catch (f) {
              A(a.fileName + ".pdf", "data:application/pdf" + (m ? "" : ";base64") + ",", m ? e : b.output());
            }
          }function ba(b, a, e) {
            var f = 0;"undefined" != typeof e && (f = e.colspan);if (0 <= f) {
              for (var m = b.width, c = b.textPos.x, l = a.table.columns.indexOf(a.column), r = 1; r < f; r++) m += a.table.columns[l + r].width;1 < f && ("right" === b.styles.halign ? c = b.textPos.x + m - b.width : "center" === b.styles.halign && (c = b.textPos.x + (m - b.width) / 2));b.width = m;b.textPos.x = c;"undefined" != typeof e && 1 < e.rowspan && (b.height *= e.rowspan);if ("middle" === b.styles.valign || "bottom" === b.styles.valign) e = ("string" === typeof b.text ? b.text.split(/\r\n|\r|\n/g) : b.text).length || 1, 2 < e && (b.textPos.y -= (2 - 1.15) / 2 * a.row.styles.fontSize * (e - 2) / 3);return !0;
            }return !1;
          }function ca(b, a, e) {
            "undefined" != typeof e.images && a.each(function () {
              var a = c(this).children();if (c(this).is("img")) {
                var m = da(this.src);e.images[m] = { url: this.src, src: this.src };
              }"undefined" != typeof a && 0 < a.length && ca(b, a, e);
            });
          }function ma(b, a) {
            function e(b) {
              if (b.url) {
                var f = new Image();m = ++c;f.crossOrigin = "Anonymous";f.onerror = f.onload = function () {
                  if (f.complete && (0 === f.src.indexOf("data:image/") && (f.width = b.width || f.width || 0, f.height = b.height || f.height || 0), f.width + f.height)) {
                    var e = document.createElement("canvas"),
                        l = e.getContext("2d");e.width = f.width;e.height = f.height;l.drawImage(f, 0, 0);b.src = e.toDataURL("image/jpeg");
                  }--c || a(m);
                };f.src = b.url;
              }
            }var f,
                m = 0,
                c = 0;if ("undefined" != typeof b.images) for (f in b.images) b.images.hasOwnProperty(f) && e(b.images[f]);(f = c) || (a(m), f = void 0);return f;
          }function ea(b, m, e) {
            m.each(function () {
              var f = c(this).children();if (c(this).is("div")) {
                var m = O(E(this, "background-color"), [255, 255, 255]),
                    F = O(E(this, "border-top-color"), [0, 0, 0]),
                    l = P(this, "border-top-width", a.jspdf.unit),
                    r = this.getBoundingClientRect(),
                    d = this.offsetLeft * e.dw;var g = this.offsetTop * e.dh;var h = r.width * e.dw,
                    r = r.height * e.dh;e.doc.setDrawColor.apply(void 0, F);e.doc.setFillColor.apply(void 0, m);e.doc.setLineWidth(l);e.doc.rect(b.x + d, b.y + g, h, r, l ? "FD" : "F");
              } else if (c(this).is("img") && "undefined" != typeof e.images && (g = da(this.src), m = e.images[g], "undefined" != typeof m)) {
                F = b.width / b.height;l = this.width / this.height;d = b.width;h = b.height;r = 19.049976 / 25.4;g = 0;l <= F ? (h = Math.min(b.height, this.height), d = this.width * h / this.height) : l > F && (d = Math.min(b.width, this.width), h = this.height * d / this.width);d *= r;h *= r;h < b.height && (g = (b.height - h) / 2);try {
                  e.doc.addImage(m.src, b.textPos.x, b.y + g, d, h);
                } catch (qa) {}b.textPos.x += d;
              }"undefined" != typeof f && 0 < f.length && ea(b, f, e);
            });
          }function fa(b, a, e) {
            if ("function" === typeof e.onAutotableText) e.onAutotableText(e.doc, b, a);else {
              var f = b.textPos.x,
                  m = b.textPos.y,
                  d = { halign: b.styles.halign, valign: b.styles.valign };if (a.length) {
                for (a = a[0]; a.previousSibling;) a = a.previousSibling;
                for (var l = !1, r = !1; a;) {
                  var g = a.innerText || a.textContent || "",
                      g = (g.length && " " == g[0] ? " " : "") + c.trim(g) + (1 < g.length && " " == g[g.length - 1] ? " " : "");c(a).is("br") && (f = b.textPos.x, m += e.doc.internal.getFontSize());c(a).is("b") ? l = !0 : c(a).is("i") && (r = !0);(l || r) && e.doc.setFontType(l && r ? "bolditalic" : l ? "bold" : "italic");var h = e.doc.getStringUnitWidth(g) * e.doc.internal.getFontSize();if (h) {
                    if ("linebreak" === b.styles.overflow && f > b.textPos.x && f + h > b.textPos.x + b.width) {
                      if (0 <= ".,!%*;:=-".indexOf(g.charAt(0))) {
                        var k = g.charAt(0),
                            h = e.doc.getStringUnitWidth(k) * e.doc.internal.getFontSize();f + h <= b.textPos.x + b.width && (e.doc.autoTableText(k, f, m, d), g = g.substring(1, g.length));h = e.doc.getStringUnitWidth(g) * e.doc.internal.getFontSize();
                      }f = b.textPos.x;m += e.doc.internal.getFontSize();
                    }for (; g.length && f + h > b.textPos.x + b.width;) g = g.substring(0, g.length - 1), h = e.doc.getStringUnitWidth(g) * e.doc.internal.getFontSize();e.doc.autoTableText(g, f, m, d);f += h;
                  }if (l || r) c(a).is("b") ? l = !1 : c(a).is("i") && (r = !1), e.doc.setFontType(l || r ? l ? "bold" : "italic" : "normal");
                  a = a.nextSibling;
                }b.textPos.x = f;b.textPos.y = m;
              } else e.doc.autoTableText(b.text, b.textPos.x, b.textPos.y, d);
            }
          }function Q(b, a, e) {
            return b.replace(new RegExp(a.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"), "g"), e);
          }function U(b) {
            b = Q(b || "0", a.numbers.html.thousandsSeparator, "");b = Q(b, a.numbers.html.decimalMark, ".");return "number" === typeof b || !1 !== jQuery.isNumeric(b) ? b : !1;
          }function v(b, m, e) {
            var f = "";if (null !== b) {
              var z = c(b);if (z[0].hasAttribute("data-tableexport-value")) var d = z.data("tableexport-value");else if (d = z.html(), "function" === typeof a.onCellHtmlData) d = a.onCellHtmlData(z, m, e, d);else if ("" != d) {
                b = c.parseHTML(d);var l = 0,
                    g = 0;d = "";c.each(b, function () {
                  if (c(this).is("input")) d += z.find("input").eq(l++).val();else if (c(this).is("select")) d += z.find("select option:selected").eq(g++).text();else if ("undefined" === typeof c(this).html()) d += c(this).text();else if (void 0 === jQuery().bootstrapTable || !0 !== c(this).hasClass("filterControl")) d += c(this).html();
                });
              }if (!0 === a.htmlContent) f = c.trim(d);else if ("" != d) {
                var h = d.replace(/\n/g, "\u2028").replace(/<br\s*[\/]?>/gi, "\u2060");b = c("<div/>").html(h).contents();h = "";c.each(b.text().split("\u2028"), function (b, a) {
                  0 < b && (h += " ");h += c.trim(a);
                });c.each(h.split("\u2060"), function (b, a) {
                  0 < b && (f += "\n");f += c.trim(a).replace(/\u00AD/g, "");
                });if ("json" == a.type || "excel" === a.type && "xmlss" === a.excelFileFormat || !1 === a.numbers.output) b = U(f), !1 !== b && (f = Number(b));else if (a.numbers.html.decimalMark != a.numbers.output.decimalMark || a.numbers.html.thousandsSeparator != a.numbers.output.thousandsSeparator) if (b = U(f), !1 !== b) {
                  var k = ("" + b).split(".");1 == k.length && (k[1] = "");var n = 3 < k[0].length ? k[0].length % 3 : 0,
                      f = (0 > b ? "-" : "") + (a.numbers.output.thousandsSeparator ? (n ? k[0].substr(0, n) + a.numbers.output.thousandsSeparator : "") + k[0].substr(n).replace(/(\d{3})(?=\d)/g, "$1" + a.numbers.output.thousandsSeparator) : k[0]) + (k[1].length ? a.numbers.output.decimalMark + k[1] : "");
                }
              }!0 === a.escape && (f = escape(f));"function" === typeof a.onCellData && (f = a.onCellData(z, m, e, f));
            }return f;
          }function na(b, a, e) {
            return a + "-" + e.toLowerCase();
          }function O(a, m) {
            var b = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/.exec(a),
                f = m;b && (f = [parseInt(b[1]), parseInt(b[2]), parseInt(b[3])]);return f;
          }function ga(b) {
            var a = E(b, "text-align"),
                e = E(b, "font-weight"),
                f = E(b, "font-style"),
                d = "";"start" == a && (a = "rtl" == E(b, "direction") ? "right" : "left");700 <= e && (d = "bold");"italic" == f && (d += f);"" === d && (d = "normal");a = { style: { align: a, bcolor: O(E(b, "background-color"), [255, 255, 255]), color: O(E(b, "color"), [0, 0, 0]), fstyle: d }, colspan: parseInt(c(b).attr("colspan")) || 0, rowspan: parseInt(c(b).attr("rowspan")) || 0 };null !== b && (b = b.getBoundingClientRect(), a.rect = { width: b.width, height: b.height });return a;
          }function E(a, c) {
            try {
              return window.getComputedStyle ? (c = c.replace(/([a-z])([A-Z])/, na), window.getComputedStyle(a, null).getPropertyValue(c)) : a.currentStyle ? a.currentStyle[c] : a.style[c];
            } catch (e) {}return "";
          }function P(a, c, e) {
            c = E(a, c).match(/\d+/);if (null !== c) {
              c = c[0];a = a.parentElement;var b = document.createElement("div");b.style.overflow = "hidden";b.style.visibility = "hidden";a.appendChild(b);b.style.width = 100 + e;e = 100 / b.offsetWidth;a.removeChild(b);return c * e;
            }return 0;
          }function V() {
            if (!(this instanceof V)) return new V();this.SheetNames = [];this.Sheets = {};
          }function oa(a) {
            for (var b = new ArrayBuffer(a.length), e = new Uint8Array(b), f = 0; f != a.length; ++f) e[f] = a.charCodeAt(f) & 255;return b;
          }function pa(a) {
            for (var b = {}, e = { s: { c: 1E7, r: 1E7 }, e: { c: 0, r: 0 } }, f = 0; f != a.length; ++f) for (var c = 0; c != a[f].length; ++c) {
              e.s.r > f && (e.s.r = f);e.s.c > c && (e.s.c = c);e.e.r < f && (e.e.r = f);e.e.c < c && (e.e.c = c);var d = { v: a[f][c] };if (null !== d.v) {
                var l = XLSX.utils.encode_cell({ c: c,
                  r: f });if ("number" === typeof d.v) d.t = "n";else if ("boolean" === typeof d.v) d.t = "b";else if (d.v instanceof Date) {
                  d.t = "n";d.z = XLSX.SSF._table[14];var g = d;var h = (Date.parse(d.v) - new Date(Date.UTC(1899, 11, 30))) / 864E5;g.v = h;
                } else d.t = "s";b[l] = d;
              }
            }1E7 > e.s.c && (b["!ref"] = XLSX.utils.encode_range(e));return b;
          }function da(a) {
            var b = 0,
                c;if (0 === a.length) return b;var f = 0;for (c = a.length; f < c; f++) {
              var d = a.charCodeAt(f);b = (b << 5) - b + d;b |= 0;
            }return b;
          }function A(a, c, e) {
            var b = window.navigator.userAgent;if (!1 !== a && (0 < b.indexOf("MSIE ") || b.match(/Trident.*rv\:11\./))) {
              if (window.navigator.msSaveOrOpenBlob) window.navigator.msSaveOrOpenBlob(new Blob([e]), a);else {
                if (c = document.createElement("iframe")) document.body.appendChild(c), c.setAttribute("style", "display:none"), c.contentDocument.open("txt/html", "replace"), c.contentDocument.write(e), c.contentDocument.close(), c.focus(), c.contentDocument.execCommand("SaveAs", !0, a), document.body.removeChild(c);
              }
            } else if (b = document.createElement("a")) {
              var d = null;b.style.display = "none";!1 !== a ? b.download = a : b.target = "_blank";"object" == typeof e ? (d = window.URL.createObjectURL(e), b.href = d) : 0 <= c.toLowerCase().indexOf("base64,") ? b.href = c + D(e) : b.href = c + encodeURIComponent(e);document.body.appendChild(b);if (document.createEvent) null === R && (R = document.createEvent("MouseEvents")), R.initEvent("click", !0, !1), b.dispatchEvent(R);else if (document.createEventObject) b.fireEvent("onclick");else if ("function" == typeof b.onclick) b.onclick();d && window.URL.revokeObjectURL(d);document.body.removeChild(b);
            }
          }function D(a) {
            var b = "",
                c,
                f = 0;a = a.replace(/\x0d\x0a/g, "\n");var d = "";for (c = 0; c < a.length; c++) {
              var g = a.charCodeAt(c);128 > g ? d += String.fromCharCode(g) : (127 < g && 2048 > g ? d += String.fromCharCode(g >> 6 | 192) : (d += String.fromCharCode(g >> 12 | 224), d += String.fromCharCode(g >> 6 & 63 | 128)), d += String.fromCharCode(g & 63 | 128));
            }for (a = d; f < a.length;) {
              var l = a.charCodeAt(f++);d = a.charCodeAt(f++);c = a.charCodeAt(f++);g = l >> 2;l = (l & 3) << 4 | d >> 4;var r = (d & 15) << 2 | c >> 6;var h = c & 63;isNaN(d) ? r = h = 64 : isNaN(c) && (h = 64);b = b + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(g) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(l) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(r) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(h);
            }return b;
          }var a = { consoleLog: !1, csvEnclosure: '"', csvSeparator: ",", csvUseBOM: !0, displayTableName: !1, escape: !1, excelFileFormat: "xlshtml", excelstyles: [], fileName: "tableExport", htmlContent: !1, ignoreColumn: [], ignoreRow: [], jsonScope: "all", jspdf: { orientation: "p", unit: "pt", format: "a4",
              margins: { left: 20, right: 10, top: 10, bottom: 10 }, autotable: { styles: { cellPadding: 2, rowHeight: 12, fontSize: 8, fillColor: 255, textColor: 50, fontStyle: "normal", overflow: "ellipsize", halign: "left", valign: "middle" }, headerStyles: { fillColor: [52, 73, 94], textColor: 255, fontStyle: "bold", halign: "center" }, alternateRowStyles: { fillColor: 245 }, tableExport: { onAfterAutotable: null, onBeforeAutotable: null, onAutotableText: null, onTable: null, outputImages: !0 } } }, numbers: { html: { decimalMark: ".", thousandsSeparator: "," }, output: { decimalMark: ".",
                thousandsSeparator: "," } }, onCellData: null, onCellHtmlData: null, onMsoNumberFormat: null, outputMode: "file", pdfmake: { enabled: !1, docDefinition: { pageOrientation: "portrait", defaultStyle: { font: "Roboto" } }, fonts: {} }, tbodySelector: "tr", tfootSelector: "tr", theadSelector: "tr", tableName: "myTableName", type: "csv", worksheetName: "Worksheet" },
              t = this,
              R = null,
              q = [],
              g = [],
              p = 0,
              y = [],
              h = "",
              I = [];c.extend(!0, a, n);I = N(t);if ("csv" == a.type || "tsv" == a.type || "txt" == a.type) {
            var C = "",
                J = 0,
                p = 0,
                W = function (b, d, e) {
              b.each(function () {
                h = "";x(this, d, p, e + b.length, function (b, c, e) {
                  var f = h,
                      d = "";if (null !== b) if (b = v(b, c, e), c = null === b || "" === b ? "" : b.toString(), "tsv" == a.type) b instanceof Date && b.toLocaleString(), d = Q(c, "\t", " ");else if (b instanceof Date) d = a.csvEnclosure + b.toLocaleString() + a.csvEnclosure;else if (d = Q(c, a.csvEnclosure, a.csvEnclosure + a.csvEnclosure), 0 <= d.indexOf(a.csvSeparator) || /[\r\n ]/g.test(d)) d = a.csvEnclosure + d + a.csvEnclosure;h = f + (d + ("tsv" == a.type ? "\t" : a.csvSeparator));
                });h = c.trim(h).substring(0, h.length - 1);0 < h.length && (0 < C.length && (C += "\n"), C += h);p++;
              });return b.length;
            },
                J = J + W(c(t).find("thead").first().find(a.theadSelector), "th,td", J);c(t).find("tbody").each(function () {
              J += W(c(this).find(a.tbodySelector), "td,th", J);
            });a.tfootSelector.length && W(c(t).find("tfoot").first().find(a.tfootSelector), "td,th", J);C += "\n";!0 === a.consoleLog && console.log(C);if ("string" === a.outputMode) return C;if ("base64" === a.outputMode) return D(C);if ("window" === a.outputMode) {
              A(!1, "data:text/" + ("csv" == a.type ? "csv" : "plain") + ";charset=utf-8,", C);return;
            }try {
              var w = new Blob([C], { type: "text/" + ("csv" == a.type ? "csv" : "plain") + ";charset=utf-8" });saveAs(w, a.fileName + "." + a.type, "csv" != a.type || !1 === a.csvUseBOM);
            } catch (b) {
              A(a.fileName + "." + a.type, "data:text/" + ("csv" == a.type ? "csv" : "plain") + ";charset=utf-8," + ("csv" == a.type && a.csvUseBOM ? "\ufeff" : ""), C);
            }
          } else if ("sql" == a.type) {
            var p = 0,
                u = "INSERT INTO `" + a.tableName + "` (",
                q = c(t).find("thead").first().find(a.theadSelector);q.each(function () {
              x(this, "th,td", p, q.length, function (a, c, e) {
                u += "'" + v(a, c, e) + "',";
              });p++;u = c.trim(u);u = c.trim(u).substring(0, u.length - 1);
            });u += ") VALUES ";c(t).find("tbody").each(function () {
              g.push.apply(g, c(this).find(a.tbodySelector));
            });a.tfootSelector.length && g.push.apply(g, c(t).find("tfoot").find(a.tfootSelector));c(g).each(function () {
              h = "";x(this, "td,th", p, q.length + g.length, function (a, c, e) {
                h += "'" + v(a, c, e) + "',";
              });3 < h.length && (u += "(" + h, u = c.trim(u).substring(0, u.length - 1), u += "),");p++;
            });u = c.trim(u).substring(0, u.length - 1);u += ";";!0 === a.consoleLog && console.log(u);if ("string" === a.outputMode) return u;if ("base64" === a.outputMode) return D(u);
            try {
              w = new Blob([u], { type: "text/plain;charset=utf-8" }), saveAs(w, a.fileName + ".sql");
            } catch (b) {
              A(a.fileName + ".sql", "data:application/sql;charset=utf-8,", u);
            }
          } else if ("json" == a.type) {
            var K = [],
                q = c(t).find("thead").first().find(a.theadSelector);q.each(function () {
              var a = [];x(this, "th,td", p, q.length, function (b, c, f) {
                a.push(v(b, c, f));
              });K.push(a);
            });var X = [];c(t).find("tbody").each(function () {
              g.push.apply(g, c(this).find(a.tbodySelector));
            });a.tfootSelector.length && g.push.apply(g, c(t).find("tfoot").find(a.tfootSelector));
            c(g).each(function () {
              var a = {},
                  d = 0;x(this, "td,th", p, q.length + g.length, function (b, c, g) {
                K.length ? a[K[K.length - 1][d]] = v(b, c, g) : a[d] = v(b, c, g);d++;
              });!1 === c.isEmptyObject(a) && X.push(a);p++;
            });n = "";n = "head" == a.jsonScope ? JSON.stringify(K) : "data" == a.jsonScope ? JSON.stringify(X) : JSON.stringify({ header: K, data: X });!0 === a.consoleLog && console.log(n);if ("string" === a.outputMode) return n;if ("base64" === a.outputMode) return D(n);try {
              w = new Blob([n], { type: "application/json;charset=utf-8" }), saveAs(w, a.fileName + ".json");
            } catch (b) {
              A(a.fileName + ".json", "data:application/json;charset=utf-8;base64,", n);
            }
          } else if ("xml" === a.type) {
            p = 0;var B = '<?xml version="1.0" encoding="utf-8"?>';B += "<tabledata><fields>";q = c(t).find("thead").first().find(a.theadSelector);q.each(function () {
              x(this, "th,td", p, q.length, function (a, c, e) {
                B += "<field>" + v(a, c, e) + "</field>";
              });p++;
            });B += "</fields><data>";var ha = 1;c(t).find("tbody").each(function () {
              g.push.apply(g, c(this).find(a.tbodySelector));
            });a.tfootSelector.length && g.push.apply(g, c(t).find("tfoot").find(a.tfootSelector));
            c(g).each(function () {
              var a = 1;h = "";x(this, "td,th", p, q.length + g.length, function (b, c, f) {
                h += "<column-" + a + ">" + v(b, c, f) + "</column-" + a + ">";a++;
              });0 < h.length && "<column-1></column-1>" != h && (B += '<row id="' + ha + '">' + h + "</row>", ha++);p++;
            });B += "</data></tabledata>";!0 === a.consoleLog && console.log(B);if ("string" === a.outputMode) return B;if ("base64" === a.outputMode) return D(B);try {
              w = new Blob([B], { type: "application/xml;charset=utf-8" }), saveAs(w, a.fileName + ".xml");
            } catch (b) {
              A(a.fileName + ".xml", "data:application/xml;charset=utf-8;base64,", B);
            }
          } else if ("excel" === a.type && "xmlss" === a.excelFileFormat) {
            var k = c(t).filter(function () {
              return "none" != c(this).data("tableexport-display") && (c(this).is(":visible") || "always" == c(this).data("tableexport-display"));
            });var Y = [];k.each(function () {
              var b = c(this),
                  d = "";p = 0;I = N(this);q = b.find("thead").first().find(a.theadSelector);var d = d + "<Table>",
                  e = 0;q.each(function () {
                h = "";x(this, "th,td", p, q.length, function (a, b, c) {
                  null !== a && (h += '<Cell><Data ss:Type="String">' + v(a, b, c) + "</Data></Cell>", e++);
                });0 < h.length && (d += "<Row>" + h + "</Row>");p++;
              });g = [];b.find("tbody").each(function () {
                g.push.apply(g, c(this).find(a.tbodySelector));
              });c(g).each(function () {
                c(this);h = "";x(this, "td,th", p, q.length + g.length, function (a, b, c) {
                  if (null !== a) {
                    var d = "String",
                        e = "";a = v(a, b, c);!1 !== jQuery.isNumeric(a) ? d = "Number" : (b = a, -1 < b.indexOf("%") ? (b = U(b.replace(/%/g, "")), !1 !== b && (b /= 100)) : b = !1, number = b, !1 !== number && (a = number, d = "Number", e = ' ss:StyleID="pct1"'));"Number" !== d && (a = a.replace(/\n/g, "<br>"));h += "<Cell" + e + '><Data ss:Type="' + d + '">' + a + "</Data></Cell>";
                  }
                });
                0 < h.length && (d += "<Row>" + h + "</Row>");p++;
              });d += "</Table>";Y.push(d);!0 === a.consoleLog && console.log(d);
            });k = '<?xml version="1.0" encoding="UTF-8"?><?mso-application progid="Excel.Sheet"?> <Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40"> <DocumentProperties xmlns="urn:schemas-microsoft-com:office:office"> <Created>' + new Date().toISOString() + '</Created> </DocumentProperties> <OfficeDocumentSettings xmlns="urn:schemas-microsoft-com:office:office"> <AllowPNG/> </OfficeDocumentSettings> <ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel"> <WindowHeight>9000</WindowHeight> <WindowWidth>13860</WindowWidth> <WindowTopX>0</WindowTopX> <WindowTopY>0</WindowTopY> <ProtectStructure>False</ProtectStructure> <ProtectWindows>False</ProtectWindows> </ExcelWorkbook> <Styles> <Style ss:ID="Default" ss:Name="Default"> <Alignment ss:Vertical="Center"/> <Borders/> <Font/> <Interior/> <NumberFormat/> <Protection/> </Style> <Style ss:ID="Normal" ss:Name="Normal"/> <Style ss:ID="pct1">   <NumberFormat ss:Format="Percent"/> </Style> </Styles>';
            for (n = 0; n < Y.length; n++) k += '<Worksheet ss:Name="' + ("string" === typeof a.worksheetName ? a.worksheetName + " " + (n + 1) : "undefined" !== typeof a.worksheetName[n] ? a.worksheetName[n] : "Table " + (n + 1)) + '">' + Y[n] + "<WorksheetOptions/> </Worksheet>";k += "</Workbook>";!0 === a.consoleLog && console.log(k);if ("string" === a.outputMode) return k;if ("base64" === a.outputMode) return D(k);try {
              w = new Blob([k], { type: "application/xml;charset=utf-8" }), saveAs(w, a.fileName + ".xml");
            } catch (b) {
              A(a.fileName + ".xml", "data:application/xml;charset=utf-8;base64,", B);
            }
          } else if ("excel" == a.type || "xls" == a.type || "word" == a.type || "doc" == a.type) {
            n = "excel" == a.type || "xls" == a.type ? "excel" : "word";var G = "excel" == n ? "xls" : "doc",
                S = 'xmlns:x="urn:schemas-microsoft-com:office:' + n + '"';k = c(t).filter(function () {
              return "none" != c(this).data("tableexport-display") && (c(this).is(":visible") || "always" == c(this).data("tableexport-display"));
            });var H = "";k.each(function () {
              var b = c(this);p = 0;I = N(this);H += "<table><thead>";q = b.find("thead").first().find(a.theadSelector);q.each(function () {
                h = "";
                x(this, "th,td", p, q.length, function (b, d, f) {
                  if (null !== b) {
                    var e = "";h += "<th";for (var g in a.excelstyles) if (a.excelstyles.hasOwnProperty(g)) {
                      var l = c(b).css(a.excelstyles[g]);"" !== l && "0px none rgb(0, 0, 0)" != l && "rgba(0, 0, 0, 0)" != l && (e += "" === e ? 'style="' : ";", e += a.excelstyles[g] + ":" + l);
                    }"" !== e && (h += " " + e + '"');c(b).is("[colspan]") && (h += ' colspan="' + c(b).attr("colspan") + '"');c(b).is("[rowspan]") && (h += ' rowspan="' + c(b).attr("rowspan") + '"');h += ">" + v(b, d, f) + "</th>";
                  }
                });0 < h.length && (H += "<tr>" + h + "</tr>");p++;
              });H += "</thead><tbody>";b.find("tbody").each(function () {
                g.push.apply(g, c(this).find(a.tbodySelector));
              });a.tfootSelector.length && g.push.apply(g, b.find("tfoot").find(a.tfootSelector));c(g).each(function () {
                var b = c(this);h = "";x(this, "td,th", p, q.length + g.length, function (d, f, g) {
                  if (null !== d) {
                    var e = "",
                        l = c(d).data("tableexport-msonumberformat");"undefined" == typeof l && "function" === typeof a.onMsoNumberFormat && (l = a.onMsoNumberFormat(d, f, g));"undefined" != typeof l && "" !== l && (e = "style=\"mso-number-format:'" + l + "'");for (var m in a.excelstyles) a.excelstyles.hasOwnProperty(m) && (l = c(d).css(a.excelstyles[m]), "" === l && (l = b.css(a.excelstyles[m])), "" !== l && "0px none rgb(0, 0, 0)" != l && "rgba(0, 0, 0, 0)" != l && (e += "" === e ? 'style="' : ";", e += a.excelstyles[m] + ":" + l));h += "<td";"" !== e && (h += " " + e + '"');c(d).is("[colspan]") && (h += ' colspan="' + c(d).attr("colspan") + '"');c(d).is("[rowspan]") && (h += ' rowspan="' + c(d).attr("rowspan") + '"');h += ">" + v(d, f, g).replace(/\n/g, "<br>") + "</td>";
                  }
                });0 < h.length && (H += "<tr>" + h + "</tr>");p++;
              });a.displayTableName && (H += "<tr><td></td></tr><tr><td></td></tr><tr><td>" + v(c("<p>" + a.tableName + "</p>")) + "</td></tr>");H += "</tbody></table>";!0 === a.consoleLog && console.log(H);
            });k = '<html xmlns:o="urn:schemas-microsoft-com:office:office" ' + S + ' xmlns="http://www.w3.org/TR/REC-html40">' + ('<meta http-equiv="content-type" content="application/vnd.ms-' + n + '; charset=UTF-8">') + "<head>";"excel" === n && (k += "\x3c!--[if gte mso 9]>", k += "<xml>", k += "<x:ExcelWorkbook>", k += "<x:ExcelWorksheets>", k += "<x:ExcelWorksheet>", k += "<x:Name>", k += a.worksheetName, k += "</x:Name>", k += "<x:WorksheetOptions>", k += "<x:DisplayGridlines/>", k += "</x:WorksheetOptions>", k += "</x:ExcelWorksheet>", k += "</x:ExcelWorksheets>", k += "</x:ExcelWorkbook>", k += "</xml>", k += "<![endif]--\x3e");k += "<style>br {mso-data-placement:same-cell;}</style>";k += "</head>";k += "<body>";k += H;k += "</body>";k += "</html>";!0 === a.consoleLog && console.log(k);if ("string" === a.outputMode) return k;if ("base64" === a.outputMode) return D(k);try {
              w = new Blob([k], { type: "application/vnd.ms-" + a.type }), saveAs(w, a.fileName + "." + G);
            } catch (b) {
              A(a.fileName + "." + G, "data:application/vnd.ms-" + n + ";base64,", k);
            }
          } else if ("xlsx" == a.type) {
            var ia = [],
                Z = [],
                p = 0,
                g = c(t).find("thead").first().find(a.theadSelector);c(t).find("tbody").each(function () {
              g.push.apply(g, c(this).find(a.tbodySelector));
            });a.tfootSelector.length && g.push.apply(g, c(t).find("tfoot").find(a.tfootSelector));c(g).each(function () {
              var a = [];x(this, "th,td", p, g.length, function (b, c, d) {
                if ("undefined" !== typeof b && null !== b) {
                  var e = parseInt(b.getAttribute("colspan")),
                      f = parseInt(b.getAttribute("rowspan"));b = v(b, c, d);"" !== b && b == +b && (b = +b);Z.forEach(function (b) {
                    if (p >= b.s.r && p <= b.e.r && a.length >= b.s.c && a.length <= b.e.c) for (var c = 0; c <= b.e.c - b.s.c; ++c) a.push(null);
                  });if (f || e) e = e || 1, Z.push({ s: { r: p, c: a.length }, e: { r: p + (f || 1) - 1, c: a.length + e - 1 } });a.push("" !== b ? b : null);if (e) for (f = 0; f < e - 1; ++f) a.push(null);
                }
              });ia.push(a);p++;
            });n = new V();G = pa(ia);G["!merges"] = Z;n.SheetNames.push(a.worksheetName);n.Sheets[a.worksheetName] = G;n = XLSX.write(n, { bookType: a.type, bookSST: !1, type: "binary" });try {
              w = new Blob([oa(n)], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" }), saveAs(w, a.fileName + "." + a.type);
            } catch (b) {
              A(a.fileName + "." + a.type, "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8,", w);
            }
          } else if ("png" == a.type) html2canvas(c(t)[0]).then(function (b) {
            b = b.toDataURL();for (var c = atob(b.substring(22)), d = new ArrayBuffer(c.length), f = new Uint8Array(d), g = 0; g < c.length; g++) f[g] = c.charCodeAt(g);!0 === a.consoleLog && console.log(c);if ("string" === a.outputMode) return c;if ("base64" === a.outputMode) return D(b);if ("window" === a.outputMode) window.open(b);else try {
              w = new Blob([d], { type: "image/png" }), saveAs(w, a.fileName + ".png");
            } catch (F) {
              A(a.fileName + ".png", "data:image/png,", w);
            }
          });else if ("pdf" == a.type) if (!0 === a.pdfmake.enabled) {
            n = [];var ja = [],
                p = 0,
                G = function (a, d, e) {
              var b = 0;c(a).each(function () {
                var a = [];x(this, d, p, e, function (b, c, d) {
                  if ("undefined" !== typeof b && null !== b) {
                    var e = parseInt(b.getAttribute("colspan")),
                        f = parseInt(b.getAttribute("rowspan"));b = v(b, c, d) || " ";1 < e || 1 < f ? a.push({ colSpan: e || 1, rowSpan: f || 1, text: b }) : a.push(b);
                  } else a.push(" ");
                });a.length && ja.push(a);b < a.length && (b = a.length);p++;
              });return b;
            },
                q = c(this).find("thead").first().find(a.theadSelector);k = G(q, "th,td", q.length);for (S = n.length; S < k; S++) n.push("*");c(this).find("tbody").each(function () {
              g.push.apply(g, c(this).find(a.tbodySelector));
            });a.tfootSelector.length && g.push.apply(g, c(this).find("tfoot").find(a.tfootSelector));G(g, "th,td", q.length + g.length);n = { content: [{ table: { headerRows: q.length, widths: n, body: ja } }] };c.extend(!0, n, a.pdfmake.docDefinition);pdfMake.fonts = { Roboto: { normal: "Roboto-Regular.ttf",
                bold: "Roboto-Medium.ttf", italics: "Roboto-Italic.ttf", bolditalics: "Roboto-MediumItalic.ttf" } };c.extend(!0, pdfMake.fonts, a.pdfmake.fonts);pdfMake.createPdf(n).getBuffer(function (b) {
              try {
                var c = new Blob([b], { type: "application/pdf" });saveAs(c, a.fileName + ".pdf");
              } catch (e) {
                A(a.fileName + ".pdf", "data:application/pdf;base64,", b);
              }
            });
          } else if (!1 === a.jspdf.autotable) {
            n = { dim: { w: P(c(t).first().get(0), "width", "mm"), h: P(c(t).first().get(0), "height", "mm") }, pagesplit: !1 };var ka = new jsPDF(a.jspdf.orientation, a.jspdf.unit, a.jspdf.format);ka.addHTML(c(t).first(), a.jspdf.margins.left, a.jspdf.margins.top, n, function () {
              aa(ka, !1);
            });
          } else {
            var d = a.jspdf.autotable.tableExport;if ("string" === typeof a.jspdf.format && "bestfit" === a.jspdf.format.toLowerCase()) {
              var L = { a0: [2383.94, 3370.39], a1: [1683.78, 2383.94], a2: [1190.55, 1683.78], a3: [841.89, 1190.55], a4: [595.28, 841.89] },
                  T = "",
                  M = "",
                  la = 0;c(t).filter(":visible").each(function () {
                if ("none" != c(this).css("display")) {
                  var a = P(c(this).get(0), "width", "pt");if (a > la) {
                    a > L.a0[0] && (T = "a0", M = "l");for (var d in L) L.hasOwnProperty(d) && L[d][1] > a && (T = d, M = "l", L[d][0] > a && (M = "p"));la = a;
                  }
                }
              });a.jspdf.format = "" === T ? "a4" : T;a.jspdf.orientation = "" === M ? "w" : M;
            }d.doc = new jsPDF(a.jspdf.orientation, a.jspdf.unit, a.jspdf.format);!0 === d.outputImages && (d.images = {});"undefined" != typeof d.images && (c(t).filter(function () {
              return "none" != c(this).data("tableexport-display") && (c(this).is(":visible") || "always" == c(this).data("tableexport-display"));
            }).each(function () {
              var b = 0;q = c(this).find("thead").find(a.theadSelector);c(this).find("tbody").each(function () {
                g.push.apply(g, c(this).find(a.tbodySelector));
              });a.tfootSelector.length && g.push.apply(g, c(this).find("tfoot").find(a.tfootSelector));c(g).each(function () {
                x(this, "td,th", q.length + b, q.length + g.length, function (a, b, f) {
                  "undefined" !== typeof a && null !== a && (b = c(a).children(), "undefined" != typeof b && 0 < b.length && ca(a, b, d));
                });b++;
              });
            }), q = [], g = []);ma(d, function (b) {
              c(t).filter(function () {
                return "none" != c(this).data("tableexport-display") && (c(this).is(":visible") || "always" == c(this).data("tableexport-display"));
              }).each(function () {
                var b,
                    e = 0;I = N(this);d.columns = [];d.rows = [];d.rowoptions = {};if ("function" === typeof d.onTable && !1 === d.onTable(c(this), a)) return !0;a.jspdf.autotable.tableExport = null;var f = c.extend(!0, {}, a.jspdf.autotable);a.jspdf.autotable.tableExport = d;f.margin = {};c.extend(!0, f.margin, a.jspdf.margins);f.tableExport = d;"function" !== typeof f.beforePageContent && (f.beforePageContent = function (a) {
                  1 == a.pageCount && a.table.rows.concat(a.table.headerRow).forEach(function (b) {
                    0 < b.height && (b.height += (2 - 1.15) / 2 * b.styles.fontSize, a.table.height += (2 - 1.15) / 2 * b.styles.fontSize);
                  });
                });"function" !== typeof f.createdHeaderCell && (f.createdHeaderCell = function (a, b) {
                  a.styles = c.extend({}, b.row.styles);if ("undefined" != typeof d.columns[b.column.dataKey]) {
                    var e = d.columns[b.column.dataKey];if ("undefined" != typeof e.rect) {
                      a.contentWidth = e.rect.width;if ("undefined" == typeof d.heightRatio || 0 === d.heightRatio) {
                        var g = b.row.raw[b.column.dataKey].rowspan ? b.row.raw[b.column.dataKey].rect.height / b.row.raw[b.column.dataKey].rowspan : b.row.raw[b.column.dataKey].rect.height;
                        d.heightRatio = a.styles.rowHeight / g;
                      }g = b.row.raw[b.column.dataKey].rect.height * d.heightRatio;g > a.styles.rowHeight && (a.styles.rowHeight = g);
                    }"undefined" != typeof e.style && !0 !== e.style.hidden && (a.styles.halign = e.style.align, "inherit" === f.styles.fillColor && (a.styles.fillColor = e.style.bcolor), "inherit" === f.styles.textColor && (a.styles.textColor = e.style.color), "inherit" === f.styles.fontStyle && (a.styles.fontStyle = e.style.fstyle));
                  }
                });"function" !== typeof f.createdCell && (f.createdCell = function (a, b) {
                  var c = d.rowoptions[b.row.index + ":" + b.column.dataKey];"undefined" != typeof c && "undefined" != typeof c.style && !0 !== c.style.hidden && (a.styles.halign = c.style.align, "inherit" === f.styles.fillColor && (a.styles.fillColor = c.style.bcolor), "inherit" === f.styles.textColor && (a.styles.textColor = c.style.color), "inherit" === f.styles.fontStyle && (a.styles.fontStyle = c.style.fstyle));
                });"function" !== typeof f.drawHeaderCell && (f.drawHeaderCell = function (a, b) {
                  var c = d.columns[b.column.dataKey];return (!0 !== c.style.hasOwnProperty("hidden") || !0 !== c.style.hidden) && 0 <= c.rowIndex ? ba(a, b, c) : !1;
                });"function" !== typeof f.drawCell && (f.drawCell = function (a, b) {
                  var c = d.rowoptions[b.row.index + ":" + b.column.dataKey];if (ba(a, b, c)) if (d.doc.rect(a.x, a.y, a.width, a.height, a.styles.fillStyle), "undefined" != typeof c && "undefined" != typeof c.kids && 0 < c.kids.length) {
                    var e = a.height / c.rect.height;if (e > d.dh || "undefined" == typeof d.dh) d.dh = e;d.dw = a.width / c.rect.width;e = a.textPos.y;ea(a, c.kids, d);a.textPos.y = e;fa(a, c.kids, d);
                  } else fa(a, {}, d);return !1;
                });d.headerrows = [];q = c(this).find("thead").find(a.theadSelector);
                q.each(function () {
                  b = 0;d.headerrows[e] = [];x(this, "th,td", e, q.length, function (a, c, f) {
                    var g = ga(a);g.title = v(a, c, f);g.key = b++;g.rowIndex = e;d.headerrows[e].push(g);
                  });e++;
                });if (0 < e) for (var h = e - 1; 0 <= h;) c.each(d.headerrows[h], function () {
                  var a = this;0 < h && null === this.rect && (a = d.headerrows[h - 1][this.key]);null !== a && 0 <= a.rowIndex && (!0 !== a.style.hasOwnProperty("hidden") || !0 !== a.style.hidden) && d.columns.push(a);
                }), h = 0 < d.columns.length ? -1 : h - 1;var k = 0;g = [];c(this).find("tbody").each(function () {
                  g.push.apply(g, c(this).find(a.tbodySelector));
                });
                a.tfootSelector.length && g.push.apply(g, c(this).find("tfoot").find(a.tfootSelector));c(g).each(function () {
                  var a = [];b = 0;x(this, "td,th", e, q.length + g.length, function (e, f, g) {
                    if ("undefined" === typeof d.columns[b]) {
                      var h = { title: "", key: b, style: { hidden: !0 } };d.columns.push(h);
                    }"undefined" !== typeof e && null !== e ? (h = ga(e), h.kids = c(e).children()) : (h = c.extend(!0, {}, d.rowoptions[k + ":" + (b - 1)]), h.colspan = -1);d.rowoptions[k + ":" + b++] = h;a.push(v(e, f, g));
                  });a.length && (d.rows.push(a), k++);e++;
                });if ("function" === typeof d.onBeforeAutotable) d.onBeforeAutotable(c(this), d.columns, d.rows, f);d.doc.autoTable(d.columns, d.rows, f);if ("function" === typeof d.onAfterAutotable) d.onAfterAutotable(c(this), f);a.jspdf.autotable.startY = d.doc.autoTableEndPosY() + f.margin.top;
              });aa(d.doc, "undefined" != typeof d.images && !1 === jQuery.isEmptyObject(d.images));"undefined" != typeof d.headerrows && (d.headerrows.length = 0);"undefined" != typeof d.columns && (d.columns.length = 0);"undefined" != typeof d.rows && (d.rows.length = 0);delete d.doc;d.doc = null;
            });
          }return this;
        } });
    })(jQuery);
  })(this);

  return _retrieveGlobal();
});
System.registerDynamic('npm:bootstrap-table@1.11.2/src/extensions/editable/bootstrap-table-editable.js', [], false, function ($__require, $__exports, $__module) {
    var _retrieveGlobal = System.registry.get("@@global-helpers").prepareGlobal($__module.id, null, {});

    (function ($__global) {
        /**
         * @author zhixin wen <wenzhixin2010@gmail.com>
         * extensions: https://github.com/vitalets/x-editable
         */

        (function ($) {

            'use strict';

            $.extend($.fn.bootstrapTable.defaults, {
                editable: true,
                onEditableInit: function () {
                    return false;
                },
                onEditableSave: function (field, row, oldValue, $el) {
                    return false;
                },
                onEditableShown: function (field, row, $el, editable) {
                    return false;
                },
                onEditableHidden: function (field, row, $el, reason) {
                    return false;
                }
            });

            $.extend($.fn.bootstrapTable.Constructor.EVENTS, {
                'editable-init.bs.table': 'onEditableInit',
                'editable-save.bs.table': 'onEditableSave',
                'editable-shown.bs.table': 'onEditableShown',
                'editable-hidden.bs.table': 'onEditableHidden'
            });

            var BootstrapTable = $.fn.bootstrapTable.Constructor,
                _initTable = BootstrapTable.prototype.initTable,
                _initBody = BootstrapTable.prototype.initBody;

            BootstrapTable.prototype.initTable = function () {
                var that = this;
                _initTable.apply(this, Array.prototype.slice.apply(arguments));

                if (!this.options.editable) {
                    return;
                }

                $.each(this.columns, function (i, column) {
                    if (!column.editable) {
                        return;
                    }

                    var editableOptions = {},
                        editableDataMarkup = [],
                        editableDataPrefix = 'editable-';

                    var processDataOptions = function (key, value) {
                        // Replace camel case with dashes.
                        var dashKey = key.replace(/([A-Z])/g, function ($1) {
                            return "-" + $1.toLowerCase();
                        });
                        if (dashKey.slice(0, editableDataPrefix.length) == editableDataPrefix) {
                            var dataKey = dashKey.replace(editableDataPrefix, 'data-');
                            editableOptions[dataKey] = value;
                        }
                    };

                    $.each(that.options, processDataOptions);

                    column.formatter = column.formatter || function (value, row, index) {
                        return value;
                    };
                    column._formatter = column._formatter ? column._formatter : column.formatter;
                    column.formatter = function (value, row, index) {
                        var result = column._formatter ? column._formatter(value, row, index) : value;

                        $.each(column, processDataOptions);

                        $.each(editableOptions, function (key, value) {
                            editableDataMarkup.push(' ' + key + '="' + value + '"');
                        });

                        var _dont_edit_formatter = false;
                        if (column.editable.hasOwnProperty('noeditFormatter')) {
                            _dont_edit_formatter = column.editable.noeditFormatter(value, row, index);
                        }

                        if (_dont_edit_formatter === false) {
                            return ['<a href="javascript:void(0)"', ' data-name="' + column.field + '"', ' data-pk="' + row[that.options.idField] + '"', ' data-value="' + result + '"', editableDataMarkup.join(''), '>' + '</a>'].join('');
                        } else {
                            return _dont_edit_formatter;
                        }
                    };
                });
            };

            BootstrapTable.prototype.initBody = function () {
                var that = this;
                _initBody.apply(this, Array.prototype.slice.apply(arguments));

                if (!this.options.editable) {
                    return;
                }

                $.each(this.columns, function (i, column) {
                    if (!column.editable) {
                        return;
                    }

                    that.$body.find('a[data-name="' + column.field + '"]').editable(column.editable).off('save').on('save', function (e, params) {
                        var data = that.getData(),
                            index = $(this).parents('tr[data-index]').data('index'),
                            row = data[index],
                            oldValue = row[column.field];

                        $(this).data('value', params.submitValue);
                        row[column.field] = params.submitValue;
                        that.trigger('editable-save', column.field, row, oldValue, $(this));
                        that.resetFooter();
                    });
                    that.$body.find('a[data-name="' + column.field + '"]').editable(column.editable).off('shown').on('shown', function (e, editable) {
                        var data = that.getData(),
                            index = $(this).parents('tr[data-index]').data('index'),
                            row = data[index];

                        that.trigger('editable-shown', column.field, row, $(this), editable);
                    });
                    that.$body.find('a[data-name="' + column.field + '"]').editable(column.editable).off('hidden').on('hidden', function (e, reason) {
                        var data = that.getData(),
                            index = $(this).parents('tr[data-index]').data('index'),
                            row = data[index];

                        that.trigger('editable-hidden', column.field, row, $(this), reason);
                    });
                });
                this.trigger('editable-init');
            };
        })(jQuery);
    })(this);

    return _retrieveGlobal();
});
System.registerDynamic('npm:bootstrap-table@1.11.2/src/extensions/export/bootstrap-table-export.js', [], false, function ($__require, $__exports, $__module) {
    var _retrieveGlobal = System.registry.get("@@global-helpers").prepareGlobal($__module.id, null, {});

    (function ($__global) {
        /**
         * @author zhixin wen <wenzhixin2010@gmail.com>
         * extensions: https://github.com/kayalshri/tableExport.jquery.plugin
         */

        (function ($) {
            'use strict';

            var sprintf = $.fn.bootstrapTable.utils.sprintf;

            var TYPE_NAME = {
                json: 'JSON',
                xml: 'XML',
                png: 'PNG',
                csv: 'CSV',
                txt: 'TXT',
                sql: 'SQL',
                doc: 'MS-Word',
                excel: 'MS-Excel',
                xlsx: 'MS-Excel (OpenXML)',
                powerpoint: 'MS-Powerpoint',
                pdf: 'PDF'
            };

            $.extend($.fn.bootstrapTable.defaults, {
                showExport: false,
                exportDataType: 'basic', // basic, all, selected
                // 'json', 'xml', 'png', 'csv', 'txt', 'sql', 'doc', 'excel', 'powerpoint', 'pdf'
                exportTypes: ['json', 'xml', 'csv', 'txt', 'sql', 'excel'],
                exportOptions: {}
            });

            $.extend($.fn.bootstrapTable.defaults.icons, {
                export: 'glyphicon-export icon-share'
            });

            $.extend($.fn.bootstrapTable.locales, {
                formatExport: function () {
                    return 'Export data';
                }
            });
            $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales);

            var BootstrapTable = $.fn.bootstrapTable.Constructor,
                _initToolbar = BootstrapTable.prototype.initToolbar;

            BootstrapTable.prototype.initToolbar = function () {
                this.showToolbar = this.options.showExport;

                _initToolbar.apply(this, Array.prototype.slice.apply(arguments));

                if (this.options.showExport) {
                    var that = this,
                        $btnGroup = this.$toolbar.find('>.btn-group'),
                        $export = $btnGroup.find('div.export');

                    if (!$export.length) {
                        $export = $(['<div class="export btn-group">', '<button class="btn' + sprintf(' btn-%s', this.options.buttonsClass) + sprintf(' btn-%s', this.options.iconSize) + ' dropdown-toggle" aria-label="export type" ' + 'title="' + this.options.formatExport() + '" ' + 'data-toggle="dropdown" type="button">', sprintf('<i class="%s %s"></i> ', this.options.iconsPrefix, this.options.icons.export), '<span class="caret"></span>', '</button>', '<ul class="dropdown-menu" role="menu">', '</ul>', '</div>'].join('')).appendTo($btnGroup);

                        var $menu = $export.find('.dropdown-menu'),
                            exportTypes = this.options.exportTypes;

                        if (typeof this.options.exportTypes === 'string') {
                            var types = this.options.exportTypes.slice(1, -1).replace(/ /g, '').split(',');

                            exportTypes = [];
                            $.each(types, function (i, value) {
                                exportTypes.push(value.slice(1, -1));
                            });
                        }
                        $.each(exportTypes, function (i, type) {
                            if (TYPE_NAME.hasOwnProperty(type)) {
                                $menu.append(['<li role="menuitem" data-type="' + type + '">', '<a href="javascript:void(0)">', TYPE_NAME[type], '</a>', '</li>'].join(''));
                            }
                        });

                        $menu.find('li').click(function () {
                            var type = $(this).data('type'),
                                doExport = function () {
                                that.$el.tableExport($.extend({}, that.options.exportOptions, {
                                    type: type,
                                    escape: false
                                }));
                            };

                            if (that.options.exportDataType === 'all' && that.options.pagination) {
                                that.$el.one(that.options.sidePagination === 'server' ? 'post-body.bs.table' : 'page-change.bs.table', function () {
                                    doExport();
                                    that.togglePagination();
                                });
                                that.togglePagination();
                            } else if (that.options.exportDataType === 'selected') {
                                var data = that.getData(),
                                    selectedData = that.getAllSelections();

                                // Quick fix #2220
                                if (that.options.sidePagination === 'server') {
                                    data = { total: that.options.totalRows };
                                    data[that.options.dataField] = that.getData();

                                    selectedData = { total: that.options.totalRows };
                                    selectedData[that.options.dataField] = that.getAllSelections();
                                }

                                that.load(selectedData);
                                doExport();
                                that.load(data);
                            } else {
                                doExport();
                            }
                        });
                    }
                }
            };
        })(jQuery);
    })(this);

    return _retrieveGlobal();
});
System.registerDynamic("npm:bootstrap-table@1.11.2.json", [], true, function() {
  return {
    "main": "dist/bootstrap-table.js",
    "format": "global",
    "meta": {
      "*.json": {
        "format": "json"
      },
      ".travis.yml": {
        "globals": {
          "process": null
        }
      },
      "Gruntfile.js": {
        "globals": {
          "process": null
        }
      },
      "LICENSE": {
        "globals": {
          "process": null
        }
      },
      "_config.yml": {
        "globals": {
          "process": null
        }
      },
      "dist/*": {
        "globals": {
          "process": null
        }
      },
      "docs/LICENSE": {
        "globals": {
          "process": null
        }
      },
      "docs/_i18n/*": {
        "globals": {
          "process": null
        }
      },
      "docs/_includes/*": {
        "globals": {
          "process": null
        }
      },
      "docs/_layouts/*": {
        "globals": {
          "process": null
        }
      },
      "docs/_plugins/*": {
        "globals": {
          "process": null
        }
      },
      "docs/apple-touch-icon.png": {
        "globals": {
          "process": null
        }
      },
      "docs/assets/*": {
        "globals": {
          "process": null
        }
      },
      "docs/dist/*": {
        "globals": {
          "process": null
        }
      },
      "docs/favicon.ico": {
        "globals": {
          "process": null
        }
      },
      "docs/robots.txt": {
        "globals": {
          "process": null
        }
      },
      "docs/sitemap.xml": {
        "globals": {
          "process": null
        }
      },
      "src/bootstrap-table.css": {
        "globals": {
          "process": null
        }
      },
      "src/bootstrap-table.js": {
        "globals": {
          "process": null
        }
      },
      "src/extensions/accent-neutralise/bootstrap-table-accent-neutralise.js": {
        "globals": {
          "process": null
        }
      },
      "src/extensions/angular/*": {
        "globals": {
          "process": null
        }
      },
      "src/extensions/auto-refresh/bootstrap-table-auto-refresh.css": {
        "globals": {
          "process": null
        }
      },
      "src/extensions/auto-refresh/bootstrap-table-auto-refresh.js": {
        "globals": {
          "process": null
        }
      },
      "src/extensions/click-edit-row/*": {
        "globals": {
          "process": null
        }
      },
      "src/extensions/cookie/bootstrap-table-cookie.js": {
        "globals": {
          "process": null
        }
      },
      "src/extensions/copy-rows/bootstrap-table-copy-rows.js": {
        "globals": {
          "process": null
        }
      },
      "src/extensions/editable/bootstrap-table-editable.js": {
        "globals": {
          "process": null
        }
      },
      "src/extensions/export/bootstrap-table-export.js": {
        "globals": {
          "process": null
        }
      },
      "src/extensions/filter-control/bootstrap-table-filter-control.css": {
        "globals": {
          "process": null
        }
      },
      "src/extensions/filter-control/bootstrap-table-filter-control.js": {
        "globals": {
          "process": null
        }
      },
      "src/extensions/filter/bootstrap-table-filter.js": {
        "globals": {
          "process": null
        }
      },
      "src/extensions/flat-json/bootstrap-table-flat-json.js": {
        "globals": {
          "process": null
        }
      },
      "src/extensions/group-by-v2/bootstrap-table-group-by.css": {
        "globals": {
          "process": null
        }
      },
      "src/extensions/group-by-v2/bootstrap-table-group-by.js": {
        "globals": {
          "process": null
        }
      },
      "src/extensions/group-by/bootstrap-table-group-by.css": {
        "globals": {
          "process": null
        }
      },
      "src/extensions/group-by/bootstrap-table-group-by.js": {
        "globals": {
          "process": null
        }
      },
      "src/extensions/i18n-enhance/bootstrap-table-i18n-enhance.js": {
        "globals": {
          "process": null
        }
      },
      "src/extensions/key-events/bootstrap-table-key-events.js": {
        "globals": {
          "process": null
        }
      },
      "src/extensions/mobile/bootstrap-table-mobile.js": {
        "globals": {
          "process": null
        }
      },
      "src/extensions/multi-column-toggle/bootstrap-table-multi-toggle.js": {
        "globals": {
          "process": null
        }
      },
      "src/extensions/multiple-search/bootstrap-table-multiple-search.js": {
        "globals": {
          "process": null
        }
      },
      "src/extensions/multiple-selection-row/bootstrap-table-multiple-selection-row.css": {
        "globals": {
          "process": null
        }
      },
      "src/extensions/multiple-selection-row/bootstrap-table-multiple-selection-row.js": {
        "globals": {
          "process": null
        }
      },
      "src/extensions/multiple-sort/bootstrap-table-multiple-sort.js": {
        "globals": {
          "process": null
        }
      },
      "src/extensions/natural-sorting/bootstrap-table-natural-sorting.js": {
        "globals": {
          "process": null
        }
      },
      "src/extensions/print/*": {
        "globals": {
          "process": null
        }
      },
      "src/extensions/reorder-columns/bootstrap-table-reorder-columns.js": {
        "globals": {
          "process": null
        }
      },
      "src/extensions/reorder-rows/bootstrap-table-reorder-rows.css": {
        "globals": {
          "process": null
        }
      },
      "src/extensions/reorder-rows/bootstrap-table-reorder-rows.js": {
        "globals": {
          "process": null
        }
      },
      "src/extensions/resizable/bootstrap-table-resizable.js": {
        "globals": {
          "process": null
        }
      },
      "src/extensions/select2-filter/bootstrap-table-select2-filter.js": {
        "globals": {
          "process": null
        }
      },
      "src/extensions/sticky-header/bootstrap-table-sticky-header.css": {
        "globals": {
          "process": null
        }
      },
      "src/extensions/sticky-header/bootstrap-table-sticky-header.js": {
        "globals": {
          "process": null
        }
      },
      "src/extensions/toolbar/bootstrap-table-toolbar.js": {
        "globals": {
          "process": null
        }
      },
      "src/extensions/tree-column/bootstrap-table-tree-column.css": {
        "globals": {
          "process": null
        }
      },
      "src/extensions/tree-column/bootstrap-table-tree-column.js": {
        "globals": {
          "process": null
        }
      },
      "src/extensions/tree-column/bootstrap-table-tree-column.less": {
        "globals": {
          "process": null
        }
      },
      "src/extensions/tree-column/icon.png": {
        "globals": {
          "process": null
        }
      },
      "src/locale/*": {
        "globals": {
          "process": null
        }
      }
    }
  };
});

System.registerDynamic('npm:bootstrap-table@1.11.2/src/extensions/mobile/bootstrap-table-mobile.js', [], false, function ($__require, $__exports, $__module) {
    var _retrieveGlobal = System.registry.get("@@global-helpers").prepareGlobal($__module.id, null, {});

    (function ($__global) {
        /**
         * @author: Dennis Hernández
         * @webSite: http://djhvscf.github.io/Blog
         * @version: v1.1.0
         */

        !function ($) {

            'use strict';

            var showHideColumns = function (that, checked) {
                if (that.options.columnsHidden.length > 0) {
                    $.each(that.columns, function (i, column) {
                        if (that.options.columnsHidden.indexOf(column.field) !== -1) {
                            if (column.visible !== checked) {
                                that.toggleColumn($.fn.bootstrapTable.utils.getFieldIndex(that.columns, column.field), checked, true);
                            }
                        }
                    });
                }
            };

            var resetView = function (that) {
                if (that.options.height || that.options.showFooter) {
                    setTimeout(function () {
                        that.resetView.call(that);
                    }, 1);
                }
            };

            var changeView = function (that, width, height) {
                if (that.options.minHeight) {
                    if (width <= that.options.minWidth && height <= that.options.minHeight) {
                        conditionCardView(that);
                    } else if (width > that.options.minWidth && height > that.options.minHeight) {
                        conditionFullView(that);
                    }
                } else {
                    if (width <= that.options.minWidth) {
                        conditionCardView(that);
                    } else if (width > that.options.minWidth) {
                        conditionFullView(that);
                    }
                }

                resetView(that);
            };

            var conditionCardView = function (that) {
                changeTableView(that, false);
                showHideColumns(that, false);
            };

            var conditionFullView = function (that) {
                changeTableView(that, true);
                showHideColumns(that, true);
            };

            var changeTableView = function (that, cardViewState) {
                that.options.cardView = cardViewState;
                that.toggleView();
            };

            var debounce = function (func, wait) {
                var timeout;
                return function () {
                    var context = this,
                        args = arguments;
                    var later = function () {
                        timeout = null;
                        func.apply(context, args);
                    };
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                };
            };

            $.extend($.fn.bootstrapTable.defaults, {
                mobileResponsive: false,
                minWidth: 562,
                minHeight: undefined,
                heightThreshold: 100, // just slightly larger than mobile chrome's auto-hiding toolbar
                checkOnInit: true,
                columnsHidden: []
            });

            var BootstrapTable = $.fn.bootstrapTable.Constructor,
                _init = BootstrapTable.prototype.init;

            BootstrapTable.prototype.init = function () {
                _init.apply(this, Array.prototype.slice.apply(arguments));

                if (!this.options.mobileResponsive) {
                    return;
                }

                if (!this.options.minWidth) {
                    return;
                }

                if (this.options.minWidth < 100 && this.options.resizable) {
                    console.log("The minWidth when the resizable extension is active should be greater or equal than 100");
                    this.options.minWidth = 100;
                }

                var that = this,
                    old = {
                    width: $(window).width(),
                    height: $(window).height()
                };

                $(window).on('resize orientationchange', debounce(function (evt) {
                    // reset view if height has only changed by at least the threshold.
                    var height = $(this).height(),
                        width = $(this).width();

                    if (Math.abs(old.height - height) > that.options.heightThreshold || old.width != width) {
                        changeView(that, width, height);
                        old = {
                            width: width,
                            height: height
                        };
                    }
                }, 200));

                if (this.options.checkOnInit) {
                    var height = $(window).height(),
                        width = $(window).width();
                    changeView(this, width, height);
                    old = {
                        width: width,
                        height: height
                    };
                }
            };
        }(jQuery);
    })(this);

    return _retrieveGlobal();
});
System.registerDynamic('reactiveadmintemplate/scripts/modules/table/bootstrap-table-group-by.js', [], false, function ($__require, $__exports, $__module) {
    var _retrieveGlobal = System.registry.get("@@global-helpers").prepareGlobal($__module.id, null, null);

    (function ($__global) {
        /*!
         * @version: 1.1.2
         * @name: Adapted table plugin
         *
         * @author: https://themeforest.net/user/flexlayers
         */
        /**
         * @author: Yura Knoxville
         * @version: v1.0.0
         */

        !function ($) {

            'use strict';

            var initBodyCaller, tableGroups;

            // it only does '%s', and return '' when arguments are undefined
            var sprintf = function (str) {
                var args = arguments,
                    flag = true,
                    i = 1;

                str = str.replace(/%s/g, function () {
                    var arg = args[i++];

                    if (typeof arg === 'undefined') {
                        flag = false;
                        return '';
                    }
                    return arg;
                });
                return flag ? str : '';
            };

            var groupBy = function (array, f) {
                var groups = {};
                array.forEach(function (o) {
                    var group = f(o);
                    groups[group] = groups[group] || [];
                    groups[group].push(o);
                });

                return groups;
            };

            var setGroups = function () {
                var that = this;
                tableGroups = [];
                if (this.options.groupBy && this.options.groupByField !== '') {

                    if (this.options.sortName != this.options.groupByField) {
                        this.data.sort(function (a, b) {
                            return a[that.options.groupByField].localeCompare(b[that.options.groupByField]);
                        });
                    }

                    var groups = groupBy(that.data, function (item) {
                        return [item[that.options.groupByField]];
                    });

                    var index = 0;
                    $.each(groups, function (key, value) {
                        tableGroups.push({
                            id: index,
                            name: key
                        });

                        value.forEach(function (item) {
                            if (!item._data) {
                                item._data = {};
                            }

                            item._data['parent-index'] = index;
                        });

                        index++;
                    });
                }
            };

            $.extend($.fn.bootstrapTable.defaults, {
                groupBy: false,
                groupByField: ''
            });

            var BootstrapTable = $.fn.bootstrapTable.Constructor,
                _initSort = BootstrapTable.prototype.initSort,
                _initBody = BootstrapTable.prototype.initBody,
                _updateSelected = BootstrapTable.prototype.updateSelected;

            BootstrapTable.prototype.initSort = function () {
                _initSort.apply(this, Array.prototype.slice.apply(arguments));
            };

            BootstrapTable.prototype.initBody = function () {
                initBodyCaller = true;
                setGroups.call(this);
                _initBody.apply(this, Array.prototype.slice.apply(arguments));

                if (this.options.groupBy && this.options.groupByField !== '') {
                    var that = this,
                        checkBox = false,
                        visibleColumns = 0;

                    this.columns.forEach(function (column) {
                        if (column.checkbox) {
                            checkBox = true;
                        } else {
                            if (column.visible) {
                                visibleColumns += 1;
                            }
                        }
                    });

                    if (this.options.detailView && !this.options.cardView) {
                        visibleColumns += 1;
                    }

                    tableGroups.forEach(function (item) {
                        var html = [];

                        html.push(sprintf('<tr class="info groupBy expanded" data-group-index="%s">', item.id));

                        if (that.options.detailView && !that.options.cardView) {
                            html.push('<td class="detail"></td>');
                        }

                        if (checkBox) {
                            html.push('<td class="bs-checkbox">', '<input name="btSelectGroup" type="checkbox" />', '</td>');
                        }

                        html.push('<td', sprintf(' colspan="%s"', visibleColumns), '>', item.name, '</td>');

                        html.push('</tr>');

                        that.$body.find('tr[data-parent-index=' + item.id + ']:first').before($(html.join('')));
                    });

                    this.$selectGroup = [];
                    this.$body.find('[name="btSelectGroup"]').each(function () {
                        var self = $(this);

                        that.$selectGroup.push({
                            group: self,
                            item: that.$selectItem.filter(function () {
                                return $(this).closest('tr').data('parent-index') === self.closest('tr').data('group-index');
                            })
                        });
                    });

                    this.$container.off('click', '.groupBy').on('click', '.groupBy', function (e) {
                        if ($(e.target).is('.custom-checkbox')) return;
                        $(this).toggleClass('expanded');
                        that.$body.find('tr[data-parent-index=' + $(this).closest('tr').data('group-index') + ']').toggleClass('hidden');
                    });

                    this.$container.off('click', '[name="btSelectGroup"]').on('click', '[name="btSelectGroup"]', function (event) {
                        event.stopImmediatePropagation();

                        var self = $(this);
                        var checked = self.prop('checked');
                        that[checked ? 'checkGroup' : 'uncheckGroup']($(this).closest('tr').data('group-index'));
                    });
                }

                initBodyCaller = false;
                this.updateSelected();
            };

            BootstrapTable.prototype.updateSelected = function () {
                if (!initBodyCaller) {
                    _updateSelected.apply(this, Array.prototype.slice.apply(arguments));

                    if (this.options.groupBy && this.options.groupByField !== '') {
                        this.$selectGroup.forEach(function (item) {
                            var checkGroup = item.item.filter(':enabled').length === item.item.filter(':enabled').filter(':checked').length;

                            item.group.prop('checked', checkGroup);
                        });
                    }
                }
            };

            BootstrapTable.prototype.getGroupSelections = function (index) {
                var that = this;

                return $.grep(this.data, function (row) {
                    return row[that.header.stateField] && row._data['parent-index'] === index;
                });
            };

            BootstrapTable.prototype.checkGroup = function (index) {
                this.checkGroup_(index, true);
            };

            BootstrapTable.prototype.uncheckGroup = function (index) {
                this.checkGroup_(index, false);
            };

            BootstrapTable.prototype.checkGroup_ = function (index, checked) {
                var rows;
                var filter = function () {
                    return $(this).closest('tr').data('parent-index') === index;
                };

                if (!checked) {
                    rows = this.getGroupSelections(index);
                }

                this.$selectItem.filter(filter).prop('checked', checked);

                this.updateRows();
                this.updateSelected();
                if (checked) {
                    rows = this.getGroupSelections(index);
                }
                this.trigger(checked ? 'check-all' : 'uncheck-all', rows);
            };
        }(jQuery);
    })(this);

    return _retrieveGlobal();
});
System.registerDynamic("reactiveadmintemplate/scripts/modules/table/bootstrap-table-filter-control.js", [], false, function ($__require, $__exports, $__module) {
    var _retrieveGlobal = System.registry.get("@@global-helpers").prepareGlobal($__module.id, null, null);

    (function ($__global) {
        /*!
         * @version: 1.1.2
         * @name: Adapted table plugin
         *
         * @author: https://themeforest.net/user/flexlayers
         */
        /**
         * @author: Dennis Hernández
         * @webSite: http://djhvscf.github.io/Blog
         * @version: v2.1.1
         */

        (function ($) {

            'use strict';

            var sprintf = $.fn.bootstrapTable.utils.sprintf,
                objectKeys = $.fn.bootstrapTable.utils.objectKeys;

            var getOptionsFromSelectControl = function (selectControl) {
                return selectControl.get(selectControl.length - 1).options;
            };

            var hideUnusedSelectOptions = function (selectControl, uniqueValues) {
                var options = getOptionsFromSelectControl(selectControl);

                for (var i = 0; i < options.length; i++) {
                    if (options[i].value !== "") {
                        if (!uniqueValues.hasOwnProperty(options[i].value)) {
                            selectControl.find(sprintf("option[value='%s']", options[i].value)).hide();
                        } else {
                            selectControl.find(sprintf("option[value='%s']", options[i].value)).show();
                        }
                    }
                }
            };

            var addOptionToSelectControl = function (selectControl, value, text) {
                value = $.trim(value);
                selectControl = $(selectControl.get(selectControl.length - 1));
                if (!existOptionInSelectControl(selectControl, value)) {
                    selectControl.append($("<option></option>").attr("value", value).text($('<div />').html(text).text()));
                }
            };

            var sortSelectControl = function (selectControl) {
                var $opts = selectControl.find('option:gt(0)');
                $opts.sort(function (a, b) {
                    a = $(a).text().toLowerCase();
                    b = $(b).text().toLowerCase();
                    if ($.isNumeric(a) && $.isNumeric(b)) {
                        // Convert numerical values from string to float.
                        a = parseFloat(a);
                        b = parseFloat(b);
                    }
                    return a > b ? 1 : a < b ? -1 : 0;
                });

                selectControl.find('option:gt(0)').remove();
                selectControl.append($opts);
            };

            var existOptionInSelectControl = function (selectControl, value) {
                var options = getOptionsFromSelectControl(selectControl);
                for (var i = 0; i < options.length; i++) {
                    if (options[i].value === value.toString()) {
                        //The value is not valid to add
                        return true;
                    }
                }

                //If we get here, the value is valid to add
                return false;
            };

            var fixHeaderCSS = function (that) {
                that.$tableHeader.css('height', '77px');
            };

            var getCurrentHeader = function (that) {
                var header = that.$header;
                if (that.options.height) {
                    header = that.$tableHeader;
                }

                return header;
            };

            var getCurrentSearchControls = function (that) {
                var searchControls = 'select, input';
                if (that.options.height) {
                    searchControls = 'table select, table input';
                }

                return searchControls;
            };

            var getCursorPosition = function (el) {
                if ($.fn.bootstrapTable.utils.isIEBrowser()) {
                    if ($(el).is('input')) {
                        var pos = 0;
                        if ('selectionStart' in el) {
                            pos = el.selectionStart;
                        } else if ('selection' in document) {
                            el.focus();
                            var Sel = document.selection.createRange();
                            var SelLength = document.selection.createRange().text.length;
                            Sel.moveStart('character', -el.value.length);
                            pos = Sel.text.length - SelLength;
                        }
                        return pos;
                    } else {
                        return -1;
                    }
                } else {
                    return -1;
                }
            };

            var setCursorPosition = function (el, index) {
                if ($.fn.bootstrapTable.utils.isIEBrowser()) {
                    if (el.setSelectionRange !== undefined) {
                        el.setSelectionRange(index, index);
                    } else {
                        $(el).val(el.value);
                    }
                }
            };

            var copyValues = function (that) {
                var header = getCurrentHeader(that),
                    searchControls = getCurrentSearchControls(that);

                that.options.valuesFilterControl = [];

                header.find(searchControls).each(function (index, ele) {
                    that.options.valuesFilterControl.push({
                        field: $(this).closest('[data-field]').data('field'),
                        value: $(this).val(),
                        position: getCursorPosition($(this).get(0))
                    });
                });
            };

            var setValues = function (that) {
                var field = null,
                    result = [],
                    header = getCurrentHeader(that),
                    searchControls = getCurrentSearchControls(that);

                if (that.options.valuesFilterControl.length > 0) {
                    header.find(searchControls).each(function (index, ele) {
                        field = $(this).closest('[data-field]').data('field');
                        result = $.grep(that.options.valuesFilterControl, function (valueObj) {
                            return valueObj.index === index;
                        });

                        if (result.length > 0) {
                            $(this).val(result[0].value);
                            setCursorPosition($(this).get(0), result[0].position);
                        }
                    });
                }
            };

            var collectBootstrapCookies = function cookiesRegex() {
                var cookies = [],
                    foundCookies = document.cookie.match(/(?:bs.table.)(\w*)/g);

                if (foundCookies) {
                    $.each(foundCookies, function (i, cookie) {
                        if (/./.test(cookie)) {
                            cookie = cookie.split(".").pop();
                        }

                        if ($.inArray(cookie, cookies) === -1) {
                            cookies.push(cookie);
                        }
                    });
                    return cookies;
                }
            };

            var initFilterSelectControls = function (that) {
                var data = that.data,
                    itemsPerPage = that.pageTo < that.options.data.length ? that.options.data.length : that.pageTo,
                    isColumnSearchableViaSelect = function (column) {
                    return column.filterControl && column.filterControl.toLowerCase() === 'select' && column.searchable;
                },
                    isFilterDataNotGiven = function (column) {
                    return column.filterData === undefined || column.filterData.toLowerCase() === 'column';
                },
                    hasSelectControlElement = function (selectControl) {
                    return selectControl && selectControl.length > 0;
                };

                var z = that.options.pagination ? that.options.sidePagination === 'server' ? that.pageTo : that.options.totalRows : that.pageTo;

                $.each(that.header.fields, function (j, field) {
                    var column = that.columns[$.fn.bootstrapTable.utils.getFieldIndex(that.columns, field)],
                        selectControl = $('.bootstrap-table-filter-control-' + escapeID(column.field));

                    if (isColumnSearchableViaSelect(column) && isFilterDataNotGiven(column) && hasSelectControlElement(selectControl)) {
                        if (selectControl.get(selectControl.length - 1).options.length === 0) {
                            //Added the default option
                            addOptionToSelectControl(selectControl, '', '');
                        }

                        var uniqueValues = {};
                        for (var i = 0; i < z; i++) {
                            //Added a new value
                            var fieldValue = data[i][field],
                                formattedValue = $.fn.bootstrapTable.utils.calculateObjectValue(that.header, that.header.formatters[j], [fieldValue, data[i], i], fieldValue);

                            // if ( formattedValue.indexOf('</a>') > -1 ){
                            //     let index = formattedValue.indexOf('data-value=');
                            //     if ( index > -1 ){
                            //         formattedValue = formattedValue.slice(index + 12).replace('"></a>', '');
                            //     }
                            // }
                            uniqueValues[formattedValue] = fieldValue;
                        }

                        for (var key in uniqueValues) {
                            addOptionToSelectControl(selectControl, uniqueValues[key], key);
                        }

                        sortSelectControl(selectControl);

                        if (that.options.hideUnusedSelectOptions) {
                            hideUnusedSelectOptions(selectControl, uniqueValues);
                        }
                    }
                });
            };

            var escapeID = function (id) {
                return String(id).replace(/(:|\.|\[|\]|,)/g, "\\$1");
            };

            var createControls = function (that, header) {
                var addedFilterControl = false,
                    isVisible,
                    html,
                    timeoutId = 0;

                $.each(that.columns, function (i, column) {
                    isVisible = 'hidden';
                    html = [];

                    if (!column.visible) {
                        return;
                    }

                    if (!column.filterControl) {
                        html.push('<div class="no-filter-control"></div>');
                    } else {
                        html.push('<div class="filter-control">');

                        var nameControl = column.filterControl.toLowerCase();
                        if (column.searchable && that.options.filterTemplate[nameControl]) {
                            addedFilterControl = true;
                            isVisible = 'visible';
                            html.push(that.options.filterTemplate[nameControl](that, column.field, isVisible, column.filterControlPlaceholder));
                        }
                    }

                    $.each(header.children().children(), function (i, tr) {
                        tr = $(tr);
                        if (tr.data('field') === column.field) {
                            tr.find('.fht-cell').append(html.join(''));
                            return false;
                        }
                    });

                    if (column.filterData !== undefined && column.filterData.toLowerCase() !== 'column') {
                        var filterDataType = getFilterDataMethod(filterDataMethods, column.filterData.substring(0, column.filterData.indexOf(':')));
                        var filterDataSource, selectControl;

                        if (filterDataType !== null) {
                            filterDataSource = column.filterData.substring(column.filterData.indexOf(':') + 1, column.filterData.length);
                            selectControl = $('.bootstrap-table-filter-control-' + escapeID(column.field));

                            addOptionToSelectControl(selectControl, '', '');
                            filterDataType(filterDataSource, selectControl);
                        } else {
                            throw new SyntaxError('Error. You should use any of these allowed filter data methods: var, json, url.' + ' Use like this: var: {key: "value"}');
                        }

                        var variableValues, key;
                        switch (filterDataType) {
                            case 'url':
                                $.ajax({
                                    url: filterDataSource,
                                    dataType: 'json',
                                    success: function (data) {
                                        for (var key in data) {
                                            addOptionToSelectControl(selectControl, key, data[key]);
                                        }
                                        sortSelectControl(selectControl);
                                    }
                                });
                                break;
                            case 'var':
                                variableValues = window[filterDataSource];
                                for (key in variableValues) {
                                    addOptionToSelectControl(selectControl, key, variableValues[key]);
                                }
                                sortSelectControl(selectControl);
                                break;
                            case 'jso':
                                variableValues = JSON.parse(filterDataSource);
                                for (key in variableValues) {
                                    addOptionToSelectControl(selectControl, key, variableValues[key]);
                                }
                                sortSelectControl(selectControl);
                                break;
                        }
                    }
                });

                if (addedFilterControl) {
                    header.off('keyup', 'input').on('keyup', 'input', function (event) {
                        clearTimeout(timeoutId);
                        timeoutId = setTimeout(function () {
                            that.onColumnSearch(event);
                        }, that.options.searchTimeOut);
                    });

                    header.off('change', 'select').on('change', 'select', function (event) {
                        clearTimeout(timeoutId);
                        timeoutId = setTimeout(function () {
                            that.onColumnSearch(event);
                        }, that.options.searchTimeOut);
                    });

                    header.off('mouseup', 'input').on('mouseup', 'input', function (event) {
                        var $input = $(this),
                            oldValue = $input.val();

                        if (oldValue === "") {
                            return;
                        }

                        setTimeout(function () {
                            var newValue = $input.val();

                            if (newValue === "") {
                                clearTimeout(timeoutId);
                                timeoutId = setTimeout(function () {
                                    that.onColumnSearch(event);
                                }, that.options.searchTimeOut);
                            }
                        }, 1);
                    });

                    if (header.find('.date-filter-control').length > 0) {
                        $.each(that.columns, function (i, column) {
                            if (column.filterControl !== undefined && column.filterControl.toLowerCase() === 'datepicker') {
                                header.find('.date-filter-control.bootstrap-table-filter-control-' + column.field).datepicker(column.filterDatepickerOptions).on('changeDate', function (e) {
                                    $(sprintf(".%s", e.currentTarget.classList.toString().split(" ").join("."))).val(e.currentTarget.value);
                                    //Fired the keyup event
                                    $(e.currentTarget).keyup();
                                });
                            }
                        });
                    }
                } else {
                    header.find('.filterControl').hide();
                }
            };

            var getDirectionOfSelectOptions = function (alignment) {
                alignment = alignment === undefined ? 'left' : alignment.toLowerCase();

                switch (alignment) {
                    case 'left':
                        return 'ltr';
                    case 'right':
                        return 'rtl';
                    case 'auto':
                        return 'auto';
                    default:
                        return 'ltr';
                }
            };

            var filterDataMethods = {
                'var': function (filterDataSource, selectControl) {
                    var variableValues = window[filterDataSource];
                    for (var key in variableValues) {
                        addOptionToSelectControl(selectControl, key, variableValues[key]);
                    }
                    sortSelectControl(selectControl);
                },
                'url': function (filterDataSource, selectControl) {
                    $.ajax({
                        url: filterDataSource,
                        dataType: 'json',
                        success: function (data) {
                            for (var key in data) {
                                addOptionToSelectControl(selectControl, key, data[key]);
                            }
                            sortSelectControl(selectControl);
                        }
                    });
                },
                'json': function (filterDataSource, selectControl) {
                    var variableValues = JSON.parse(filterDataSource);
                    for (var key in variableValues) {
                        addOptionToSelectControl(selectControl, key, variableValues[key]);
                    }
                    sortSelectControl(selectControl);
                }
            };

            var getFilterDataMethod = function (objFilterDataMethod, searchTerm) {
                var keys = Object.keys(objFilterDataMethod);
                for (var i = 0; i < keys.length; i++) {
                    if (keys[i] === searchTerm) {
                        return objFilterDataMethod[searchTerm];
                    }
                }
                return null;
            };

            $.extend($.fn.bootstrapTable.defaults, {
                filterControl: false,
                onColumnSearch: function (field, text) {
                    return false;
                },
                filterShowClear: false,
                alignmentSelectControlOptions: undefined,
                filterTemplate: {
                    input: function (that, field, isVisible, placeholder) {
                        return sprintf('<input type="text" class="form-control bootstrap-table-filter-control-%s" style="width: 100%; visibility: %s" placeholder="%s">', field, isVisible, placeholder);
                    },
                    select: function (that, field, isVisible) {
                        return sprintf('<select class="form-control bootstrap-table-filter-control-%s" style="width: 100%; visibility: %s" dir="%s"></select>', field, isVisible, getDirectionOfSelectOptions(that.options.alignmentSelectControlOptions));
                    },
                    datepicker: function (that, field, isVisible) {
                        return sprintf('<input type="text" class="form-control date-filter-control bootstrap-table-filter-control-%s" style="width: 100%; visibility: %s">', field, isVisible);
                    }
                },
                //internal variables
                valuesFilterControl: []
            });

            $.extend($.fn.bootstrapTable.COLUMN_DEFAULTS, {
                filterControl: undefined,
                filterData: undefined,
                filterDatepickerOptions: undefined,
                filterStrictSearch: false,
                filterStartsWithSearch: false,
                filterControlPlaceholder: ""
            });

            $.extend($.fn.bootstrapTable.Constructor.EVENTS, {
                'column-search.bs.table': 'onColumnSearch'
            });

            $.extend($.fn.bootstrapTable.defaults.icons, {
                clear: 'glyphicon-trash icon-clear'
            });

            $.extend($.fn.bootstrapTable.locales, {
                formatClearFilters: function () {
                    return 'Clear Filters';
                }
            });
            $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales);

            var BootstrapTable = $.fn.bootstrapTable.Constructor,
                _init = BootstrapTable.prototype.init,
                _initToolbar = BootstrapTable.prototype.initToolbar,
                _initHeader = BootstrapTable.prototype.initHeader,
                _initBody = BootstrapTable.prototype.initBody,
                _initSearch = BootstrapTable.prototype.initSearch;

            BootstrapTable.prototype.init = function () {
                //Make sure that the filterControl option is set
                if (this.options.filterControl) {
                    var that = this;

                    // Compatibility: IE < 9 and old browsers
                    if (!Object.keys) {
                        objectKeys();
                    }

                    //Make sure that the internal variables are set correctly
                    this.options.valuesFilterControl = [];

                    this.$el.on('reset-view.bs.table', function () {
                        //Create controls on $tableHeader if the height is set
                        if (!that.options.height) {
                            return;
                        }

                        //Avoid recreate the controls
                        if (that.$tableHeader.find('select').length > 0 || that.$tableHeader.find('input').length > 0) {
                            return;
                        }

                        createControls(that, that.$tableHeader);
                    }).on('post-header.bs.table', function () {
                        setValues(that);
                    }).on('post-body.bs.table', function () {
                        if (that.options.height) {
                            fixHeaderCSS(that);
                        }
                    }).on('column-switch.bs.table', function () {
                        setValues(that);
                    });
                }
                _init.apply(this, Array.prototype.slice.apply(arguments));
            };

            BootstrapTable.prototype.initToolbar = function () {
                this.showToolbar = this.options.filterControl && this.options.filterShowClear;

                _initToolbar.apply(this, Array.prototype.slice.apply(arguments));

                if (this.options.filterControl && this.options.filterShowClear) {
                    var $btnGroup = this.$toolbar.find('>.btn-group'),
                        $btnClear = $btnGroup.find('.filter-show-clear');

                    if (!$btnClear.length) {
                        $btnClear = $(['<button class="btn btn-default filter-show-clear" ', sprintf('type="button" title="%s">', this.options.formatClearFilters()), sprintf('<i class="%s %s"></i> ', this.options.iconsPrefix, this.options.icons.clear), '</button>'].join('')).appendTo($btnGroup);

                        $btnClear.off('click').on('click', $.proxy(this.clearFilterControl, this));
                    }
                }
            };

            BootstrapTable.prototype.initHeader = function () {
                _initHeader.apply(this, Array.prototype.slice.apply(arguments));

                if (!this.options.filterControl) {
                    return;
                }
                createControls(this, this.$header);
            };

            BootstrapTable.prototype.initBody = function () {
                _initBody.apply(this, Array.prototype.slice.apply(arguments));

                initFilterSelectControls(this);
            };

            BootstrapTable.prototype.initSearch = function () {
                _initSearch.apply(this, Array.prototype.slice.apply(arguments));

                if (this.options.sidePagination === 'server') {
                    return;
                }

                var that = this;
                var fp = $.isEmptyObject(this.filterColumnsPartial) ? null : this.filterColumnsPartial;

                //Check partial column filter
                this.data = fp ? $.grep(this.data, function (item, i) {
                    for (var key in fp) {
                        var thisColumn = that.columns[$.fn.bootstrapTable.utils.getFieldIndex(that.columns, key)];
                        var fval = fp[key].toLowerCase();
                        var value = item[key];

                        // Fix #142: search use formated data
                        if (thisColumn && thisColumn.searchFormatter) {
                            value = $.fn.bootstrapTable.utils.calculateObjectValue(that.header, that.header.formatters[$.inArray(key, that.header.fields)], [value, item, i], value);
                        }

                        if (thisColumn.filterStrictSearch) {
                            if (!($.inArray(key, that.header.fields) !== -1 && (typeof value === 'string' || typeof value === 'number') && value.toString().toLowerCase() === fval.toString().toLowerCase())) {
                                return false;
                            }
                        } else if (thisColumn.filterStartsWithSearch) {
                            if (!($.inArray(key, that.header.fields) !== -1 && (typeof value === 'string' || typeof value === 'number') && (value + '').toLowerCase().indexOf(fval) === 0)) {
                                return false;
                            }
                        } else {
                            if (!($.inArray(key, that.header.fields) !== -1 && (typeof value === 'string' || typeof value === 'number') && (value + '').toLowerCase().indexOf(fval) !== -1)) {
                                return false;
                            }
                        }
                    }
                    return true;
                }) : this.data;
            };

            BootstrapTable.prototype.initColumnSearch = function (filterColumnsDefaults) {
                copyValues(this);

                if (filterColumnsDefaults) {
                    this.filterColumnsPartial = filterColumnsDefaults;
                    this.updatePagination();

                    for (var filter in filterColumnsDefaults) {
                        this.trigger('column-search', filter, filterColumnsDefaults[filter]);
                    }
                }
            };

            BootstrapTable.prototype.onColumnSearch = function (event) {
                if ($.inArray(event.keyCode, [37, 38, 39, 40]) > -1) {
                    return;
                }

                copyValues(this);
                var text = $.trim($(event.currentTarget).val());
                var $field = $(event.currentTarget).closest('[data-field]').data('field');

                if ($.isEmptyObject(this.filterColumnsPartial)) {
                    this.filterColumnsPartial = {};
                }

                // if the searchText is the same as the previously selected column value,
                // bootstrapTable will not try searching again (even though the selected column
                // may be different from the previous search).  As a work around
                // we're manually appending some text to bootrap's searchText field
                // to guarantee that it will perform a search again when we call this.onSearch(event)
                // this.searchText += "randomText";
                //

                this.options.pageNumber = 1;
                if ($field != 'date') {
                    if (text) {
                        this.filterColumnsPartial[$field] = text;
                    } else {
                        delete this.filterColumnsPartial[$field];
                    }

                    this.onSearch(event);
                    this.trigger('column-search', $field, text);
                } else {
                    this.refresh();
                }
            };

            BootstrapTable.prototype.clearFilterControl = function () {

                if (this.options.filterControl && this.options.filterShowClear) {

                    var that = this,
                        cookies = collectBootstrapCookies(),
                        header = getCurrentHeader(that),
                        table = header.closest('table'),
                        controls = header.find(getCurrentSearchControls(that)),
                        search = that.$toolbar.find('.search input'),
                        timeoutId = 0;

                    $.each(that.options.valuesFilterControl, function (i, item) {
                        item.value = '';
                    });

                    header.find('.date-filter-control input').each(function () {
                        $(this).datepicker('clearDates');
                    });
                    controls.each(function () {
                        this.value = '';
                    });

                    setValues(that);

                    // Clear each type of filter if it exists.
                    // Requires the body to reload each time a type of filter is found because we never know
                    // which ones are going to be present.
                    if (controls.length > 0) {
                        this.filterColumnsPartial = {};
                        // $(controls[0]).trigger(controls[0].tagName === 'INPUT' ? 'keyup' : 'change');
                    } else {
                        return;
                    }

                    if (search.length > 0) {
                        that.resetSearch();
                    }

                    // use the default sort order if it exists. do nothing if it does not
                    if (that.options.sortName !== table.data('sortName') || that.options.sortOrder !== table.data('sortOrder')) {
                        var sorter = header.find(sprintf('[data-field="%s"]', $(controls[0]).closest('table').data('sortName')));
                        if (sorter.length > 0) {
                            that.onSort(table.data('sortName'), table.data('sortName'));
                            $(sorter).find('.sortable').trigger('click');
                        }
                    }

                    // clear cookies once the filters are clean
                    clearTimeout(timeoutId);
                    timeoutId = setTimeout(function () {
                        if (cookies && cookies.length > 0) {
                            $.each(cookies, function (i, item) {
                                if (that.deleteCookie !== undefined) {
                                    that.deleteCookie(item);
                                }
                            });
                        }
                    }, that.options.searchTimeOut);
                }
            };
        })(jQuery);
    })(this);

    return _retrieveGlobal();
});
System.registerDynamic("reactiveadmintemplate/scripts/modules/table/init.js", ["jquery-ui/ui/widgets/sortable", "bootstrap-table", "x-editable/dist/bootstrap3-editable/js/bootstrap-editable.js", "tableexport.jquery.plugin", "bootstrap-table/src/extensions/editable/bootstrap-table-editable", "bootstrap-table/src/extensions/export/bootstrap-table-export", "bootstrap-table/src/extensions/mobile/bootstrap-table-mobile", "./bootstrap-table-group-by", "./bootstrap-table-filter-control", "imageupload", "moment"], true, function ($__require, exports, module) {
    'use strict';

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    /*!
     * @version: 1.1.2
     * @name: tables
     *
     * @author: https://themeforest.net/user/flexlayers
     */
    $__require("jquery-ui/ui/widgets/sortable");
    $__require("bootstrap-table");
    $__require("x-editable/dist/bootstrap3-editable/js/bootstrap-editable.js");
    $__require("tableexport.jquery.plugin");
    $__require("bootstrap-table/src/extensions/editable/bootstrap-table-editable");
    $__require("bootstrap-table/src/extensions/export/bootstrap-table-export");
    $__require("bootstrap-table/src/extensions/mobile/bootstrap-table-mobile");
    $__require("./bootstrap-table-group-by");
    $__require("./bootstrap-table-filter-control");
    $__require("imageupload");
    var moment = $__require("moment");
    $(function () {
        // locals
        var $remove = $('#remove-table-row'),
            $new = $('#new-table-row'),
            selections;
        // Global options
        $.fn.editable.defaults.mode = 'inline';
        $.fn.editableform.buttons = "\n            <button type=\"submit\" class=\"btn btn-sm btn-primary editable-submit ml-2\"><i class=\"fa fa-check\"></i></button>\n            <button type=\"button\" class=\"btn btn-sm btn-default editable-cancel\"><i class=\"fa fa-rotate-left\"></i></button>";
        initNewProd('#new-prod-table');
        initTopProd('#top-prod-table');
        initTopCustom('#top-custom-table');
        initRoleTable('#table-roles');
        initUserTable('#table-users');
        initGroupRows('#table-group-rows');
        initTableAdvancedFilters('#table-advanced-filters');
        initTableNewInModal('#table-new-in-modal');
        initTableEditRows('#table-editable-rows');
        initTableEditColumns('#table-editable-columns');
        function initTopCustom(el) {
            var $table = $(el);
            if (!$table[0]) return;
            var newId = 0;
            var cols = [];
            var data = '';
            var columns = [{ field: 'id', title: 'ID', width: 40, align: 'left', valign: 'middle', sortable: true }, { field: 'name', title: 'Name', sortable: true, align: 'center', formatter: function (item) {
                    return "\n                    <a class=\"c-gray\" href=\"\">" + item + "</a>\n                ";
                } }, { field: 'items', title: 'Items', sortable: true, align: 'center' }, { field: 'date', title: 'Submit Date', align: 'center', sortable: true }, { field: 'total', title: 'Total', sortable: true, align: 'center' }];
            $table.bootstrapTable({
                url: 'assets/prod.json',
                mobileResponsive: true, minWidth: 767,
                classes: 'table', sortName: 'total', sortOrder: 'desc', buttonsAlign: 'left',
                pagination: true, pageSize: 9, pageList: '[All, 40, 25, 15, 9]', sidePagination: 'client', showPaginationSwitch: true,
                search: true, showFooter: false, showRefresh: true, showToggle: true, showColumns: true, showExport: true, detailView: false,
                idField: 'id', minimumCountColumns: '2',
                detailFormatter: detailFormatter, responseHandler: responseHandler,
                icons: {
                    paginationSwitchDown: 'icon-arrow-down-circle', paginationSwitchUp: 'icon-arrow-up-circle',
                    refresh: 'icon-refresh', toggle: 'icon-list', columns: 'icon-grid', 'export': 'icon-share-alt',
                    detailOpen: 'icon-plus', detailClose: 'icon-minus'
                },
                columns: columns
            });
            // sometimes footer render error.
            setTimeout(function () {
                return $table.bootstrapTable('resetView');
            }, 200);
            $table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
                $remove.prop('disabled', !$table.bootstrapTable('getSelections').length);
                selections = getIdSelections(this);
            });
            $table.on('all.bs.table', styleCheckboxes);
        }
        function initTopProd(el) {
            var $table = $(el);
            if (!$table[0]) return;
            var newId = 0;
            var cols = [];
            var data = '';
            var columns = [{ field: 'id', title: 'ID', width: 40, align: 'left', valign: 'middle', sortable: true }, { field: 'product', title: 'Product', sortable: true, align: 'center', formatter: function (item) {
                    return "\n                    <a class=\"c-gray\" href=\"product-single.html\">" + item + "</a>\n                ";
                } }, { field: 'views', title: 'Views', sortable: true, align: 'center' }, { field: 'date', title: 'Submit Date', align: 'center', sortable: true }, { field: 'price', title: 'Price', sortable: true, align: 'center' }];
            $table.bootstrapTable({
                url: 'assets/prod.json',
                mobileResponsive: true, minWidth: 767,
                classes: 'table', sortName: 'views', sortOrder: 'desc', buttonsAlign: 'left',
                pagination: true, pageSize: 9, pageList: '[All, 40, 25, 15, 9]', sidePagination: 'client', showPaginationSwitch: true,
                search: true, showFooter: false, showRefresh: true, showToggle: true, showColumns: true, showExport: true, detailView: false,
                idField: 'id', minimumCountColumns: '2',
                detailFormatter: detailFormatter, responseHandler: responseHandler,
                icons: {
                    paginationSwitchDown: 'icon-arrow-down-circle', paginationSwitchUp: 'icon-arrow-up-circle',
                    refresh: 'icon-refresh', toggle: 'icon-list', columns: 'icon-grid', 'export': 'icon-share-alt',
                    detailOpen: 'icon-plus', detailClose: 'icon-minus'
                },
                columns: columns
            });
            // sometimes footer render error.
            setTimeout(function () {
                return $table.bootstrapTable('resetView');
            }, 200);
            $table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
                $remove.prop('disabled', !$table.bootstrapTable('getSelections').length);
                selections = getIdSelections(this);
            });
            $table.on('all.bs.table', styleCheckboxes);
        }
        function initNewProd(el) {
            var $table = $(el);
            if (!$table[0]) return;
            var newId = 0;
            var cols = [];
            var data = '';
            var columns = [{ field: 'id', title: 'ID', width: 40, align: 'left', valign: 'middle', sortable: true }, { field: 'product', title: 'Product', sortable: true, align: 'center', formatter: function (item) {
                    return "\n                    <a class=\"c-gray\" href=\"product-single.html\">" + item + "</a>\n                ";
                } }, { field: 'items', title: 'Items', sortable: true, align: 'center' }, { field: 'date', title: 'Submit Date', align: 'center', sortable: true }, { field: 'price', title: 'Price', sortable: true, align: 'center' }];
            $table.bootstrapTable({
                url: 'assets/prod.json',
                mobileResponsive: true, minWidth: 767,
                classes: 'table', buttonsAlign: 'left',
                pagination: true, pageSize: 9, pageList: '[All, 40, 25, 15, 9]', sidePagination: 'client', showPaginationSwitch: true,
                search: true, showFooter: false, showRefresh: true, showToggle: true, showColumns: true, showExport: true, detailView: false,
                idField: 'id', minimumCountColumns: '2',
                detailFormatter: detailFormatter, responseHandler: responseHandler,
                icons: {
                    paginationSwitchDown: 'icon-arrow-down-circle', paginationSwitchUp: 'icon-arrow-up-circle',
                    refresh: 'icon-refresh', toggle: 'icon-list', columns: 'icon-grid', 'export': 'icon-share-alt',
                    detailOpen: 'icon-plus', detailClose: 'icon-minus'
                },
                columns: columns
            });
            // sometimes footer render error.
            setTimeout(function () {
                return $table.bootstrapTable('resetView');
            }, 200);
            $table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
                $remove.prop('disabled', !$table.bootstrapTable('getSelections').length);
                selections = getIdSelections(this);
            });
            $table.on('all.bs.table', styleCheckboxes);
        }
        function testABC() {
          console.log(" ae");
        }
        function initRoleTable(el) {
            var $table = $(el);
            if (!$table[0]) return;
            var newId = 0;
            var cols = [];
            var data = '';
            var columns = [{ field: 'state', checkbox: true, align: 'center', valign: 'middle' },
            // { field: 'id',  title: 'ID', width: 40, align: 'center',  valign: 'middle',  sortable: true },
            { field: 'image', title: 'Image', formatter: imageFormatter, align: 'center' }, { field: 'name', title: 'Name', sortable: true, align: 'center' }, { field: 'email', title: 'Email', align: 'center', sortable: true }, { field: 'capabilities', title: 'Capabilities', sortable: true, align: 'center' }, { field: 'job-title', title: 'Job Title', sortable: true, align: 'center' }, { field: 'link', title: 'Remove', align: 'center', formatter: linkRemoveColumnsFormatter,
                events: { 'click .editable-remove': function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        $table.bootstrapTable('remove', { field: 'id', values: [args[2].id] });
                    } }
            }];
            $table.bootstrapTable({
                url: 'assets/data1.json',
                mobileResponsive: true, minWidth: 767,
                classes: 'table',
                pagination: true, pageSize: 10, pageList: '[All, 40, 25, 15, 10]', sidePagination: 'client', showPaginationSwitch: true,
                search: true, showFooter: false, showRefresh: true, showToggle: true, showColumns: true, showExport: true, detailView: false,
                idField: 'id', /*toolbar: '#role-toolbar',*/minimumCountColumns: '2',
                detailFormatter: detailFormatter, responseHandler: responseHandler,
                groupBy: true, groupByField: 'role',
                icons: {
                    paginationSwitchDown: 'icon-arrow-down-circle', paginationSwitchUp: 'icon-arrow-up-circle',
                    refresh: 'icon-refresh', toggle: 'icon-list', columns: 'icon-grid', 'export': 'icon-share-alt',
                    detailOpen: 'icon-plus', detailClose: 'icon-minus'
                },
                columns: columns
            });
            // sometimes footer render error.
            setTimeout(function () {
                return $table.bootstrapTable('resetView');
            }, 200);
            $table.on('post-body.bs.table', function () {});
            $table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
                $remove.prop('disabled', !$table.bootstrapTable('getSelections').length);
                selections = getIdSelections(this);
            });
            $table.on('all.bs.table', styleCheckboxes);
        }
        function initUserTable(el) {
            var $table = $(el);
            if (!$table[0]) return;
            var newId = 0;
            var cols = [];
            var columns = [{ field: 'state', checkbox: true, align: 'center', valign: 'middle' },
            // { field: 'id',  title: 'ID', width: 40, align: 'center',  valign: 'middle',  sortable: true },
            { field: 'image', title: 'Image', formatter: imageFormatter, align: 'center' }, { field: 'name', title: 'Name', sortable: true, align: 'center', editable: {}, 'class': 'editable' }, { field: 'email', title: 'Email', align: 'center', sortable: true, editable: {}, 'class': 'editable' }, { field: 'credit-card', title: 'Credit Card #', sortable: true, align: 'center', editable: {}, 'class': 'editable' }, { field: 'job-title', title: 'Job Title', sortable: true, align: 'center', editable: {}, 'class': 'editable' }, { field: 'link', title: 'Remove', align: 'center', formatter: linkRemoveColumnsFormatter,
                events: { 'click .editable-remove': function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        $table.bootstrapTable('remove', { field: 'id', values: [args[2].id] });
                    } }
            }];
            $table.bootstrapTable({
                url: 'assets/data1_.php',
                mobileResponsive: true, minWidth: 767,
                classes: 'table',
                pagination: true, pageSize: 8, pageList: '[All, 40, 25, 15, 8]', sidePagination: 'client', showPaginationSwitch: true,
                search: true, showFooter: false, showRefresh: true, showToggle: true, showColumns: true, showExport: true, detailView: false,
                idField: 'id', toolbar: '#user-toolbar', minimumCountColumns: '2',
                detailFormatter: detailFormatter, responseHandler: responseHandler,
                icons: {
                    paginationSwitchDown: 'icon-arrow-down-circle', paginationSwitchUp: 'icon-arrow-up-circle',
                    refresh: 'icon-refresh', toggle: 'icon-list', columns: 'icon-grid', 'export': 'icon-share-alt',
                    detailOpen: 'icon-plus', detailClose: 'icon-minus'
                },
                columns: columns
            });
            // sometimes footer render error.
            setTimeout(function () {
                return $table.bootstrapTable('resetView');
            }, 200);
            $table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
                $remove.prop('disabled', !$table.bootstrapTable('getSelections').length);
                selections = getIdSelections(this);
            });
            $table.on('all.bs.table', styleCheckboxes);
            $('#bt-table-modal').appendTo($table.parent()).find('.modal-body').append(function () {
                cols = columns.slice(2);
                cols.pop();
                var html = [];
                $.each(cols, function (key, value) {
                    html.push('<div class="row mb-3"><div class="col-4 text-right"><b>' + value.title + ':</b></div><div class="col-8"><input class="form-control bt-modal-input-' + value.field + '" /></div></div>');
                });
                return html.join('');
            });
            $remove.click(function () {
                var ids = getIdSelections($table[0]);
                $table.bootstrapTable('remove', { field: 'id', values: ids });
                $remove.prop('disabled', true);
            });
            $new.click(function () {
                var data = $table.bootstrapTable('getData');
                var $modal = $('#bt-table-modal').modal('show');
                $modal.find('.imageupload').imageupload();
                $modal.find('.add-data').off().click(function () {
                    newId = newId ? ++newId : data && data.length && data[data.length - 1].id ? data[data.length - 1].id : 0;
                    var $inputs = $modal.find('input');
                    var image = $modal.find('.imageupload img').attr('src');
                    $table.bootstrapTable('insertRow', { index: 0,
                        row: {
                            id: newId,
                            image: image,
                            'name': $inputs[3].value ? $inputs[3].value : 'empty',
                            email: $inputs[4].value ? $inputs[4].value : 'empty',
                            'credit-card': $inputs[5].value ? $inputs[5].value : 'empty',
                            'job-title': $inputs[6].value ? $inputs[6].value : 'empty'
                        }
                    });
                    if ($modal.find('input[type="checkbox"]')[0].checked === false) {
                        $inputs.val('');
                        $modal.modal('hide');
                    }
                });
                $new.prop('disabled', false);
            });
        }
        function initGroupRows(el) {
            var $table = $(el);
            if (!$table[0]) return;
            var newId = 0;
            var cols = [],
                columns = [{ field: 'state', checkbox: true, align: 'center', valign: 'middle' }, { field: 'id', visible: false, title: 'ID', width: 40, align: 'center', valign: 'middle', sortable: true }, { field: 'company-name', title: 'Company Name', sortable: true, align: 'center', editable: {}, 'class': 'editable' }, { field: 'city', title: 'City', sortable: true, align: 'center', editable: {}, 'class': 'editable' }, { field: 'street-address', title: 'Street Address', sortable: true, align: 'center', editable: {}, 'class': 'editable' }, { field: 'phone', title: 'Phone', align: 'center', sortable: true, editable: {}, 'class': 'editable' }, { field: 'employees', title: 'Employees', sortable: true, align: 'center', editable: {}, 'class': 'editable' }, { field: 'link', title: 'Edit', align: 'center', formatter: linkEditRowsFormatter }];
            $table.bootstrapTable({
                url: 'assets/data4.json',
                mobileResponsive: true, minWidth: 767,
                classes: 'table table-no-bordered',
                pagination: true, pageSize: 20, pageList: '[All, 40, 30, 20, 10]', sidePagination: 'client', showPaginationSwitch: true,
                search: true, showFooter: false, showRefresh: true, showToggle: true, showColumns: true, showExport: true, detailView: true,
                idField: 'id', toolbar: '#toolbar', minimumCountColumns: '2',
                detailFormatter: detailFormatter, responseHandler: responseHandler,
                groupBy: true, groupByField: 'company-name',
                icons: {
                    paginationSwitchDown: 'icon-arrow-down-circle', paginationSwitchUp: 'icon-arrow-up-circle',
                    refresh: 'icon-refresh', toggle: 'icon-list', columns: 'icon-grid', 'export': 'icon-share-alt',
                    detailOpen: 'icon-plus', detailClose: 'icon-minus'
                },
                columns: columns
            });
            // sometimes footer render error.
            setTimeout(function () {
                return $table.bootstrapTable('resetView');
            }, 200);
            $('#bt-table-modal').appendTo($table.parent()).find('.modal-body').append(function () {
                cols = columns.slice(2);
                cols.pop();
                var html = [];
                $.each(cols, function (key, value) {
                    html.push('<div class="row mb-3"><div class="col-4 text-right"><b>' + value.title + ':</b></div><div class="col-8"><input class="form-control bt-modal-input-' + value.field + '" /></div></div>');
                });
                return html.join('');
            });
            $table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function (e) {
                $remove.prop('disabled', !$table.bootstrapTable('getSelections').length);
                selections = getIdSelections(this);
            });
            $table.on('all.bs.table', styleCheckboxes);
            $table.on('reset-view.bs.table', editHandler.bind($table[0]));
            $remove.click(function () {
                var ids = getIdSelections($table[0]);
                $table.bootstrapTable('remove', { field: 'id', values: ids });
                $remove.prop('disabled', true);
                styleCheckboxes();
            });
            $new.click(function () {
                var data = $table.bootstrapTable('getData');
                var $modal = $('#bt-table-modal').modal('show');
                $modal.find('.add-data').off().click(function () {
                    newId = newId ? ++newId : data && data.length && data[data.length - 1].id ? data[data.length - 1].id : 0;
                    var $inputs = $modal.find('input');
                    $table.bootstrapTable('insertRow', { index: 0,
                        row: {
                            id: newId,
                            'company-name': $inputs[0].value ? $inputs[0].value : 'empty',
                            'city': $inputs[1].value ? $inputs[1].value : 'empty',
                            'street-address': $inputs[2].value ? $inputs[2].value : 'empty',
                            'phone': $inputs[3].value ? $inputs[3].value : 'empty',
                            'employees': $inputs[4].value ? $inputs[4].value : 'empty'
                        }
                    });
                    if ($modal.find('input[type="checkbox"]')[0].checked === false) {
                        $inputs.val('');
                        $modal.modal('hide');
                    }
                });
                $new.prop('disabled', false);
            });
        }
        function initTableAdvancedFilters(el) {
            var $table = $(el);
            if (!$table[0]) return;
            var newId = 0;
            var cols = [];
            var columns = [{ field: 'state', checkbox: true, align: 'center' }, { field: 'id', title: 'ID', align: 'center', visible: false }, { field: 'name', title: 'Name', sortable: true, align: 'center', editable: {}, 'class': 'editable', filterControl: 'input', filterControlPlaceholder: '' }, { field: 'email', title: 'Email', align: 'center', sortable: true, editable: {}, 'class': 'editable', filterControl: 'input', filterControlPlaceholder: '' }, { field: 'credit-card', title: 'Credit Card #', sortable: true, align: 'center', editable: {}, 'class': 'editable', filterControl: 'input', filterControlPlaceholder: '' }, { field: 'job-title', title: 'Job Title', sortable: true, align: 'center', filterControl: 'select', filterStrictSearch: true }, { field: 'date', title: 'Registration Date', align: 'center', sortable: true, editable: {}, 'class': 'editable', filterControl: 'date' }, { field: 'link', title: 'Remove', align: 'center', formatter: linkRemoveColumnsFormatter,
                events: { 'click .editable-remove': function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        $table.bootstrapTable('remove', { field: 'id', values: [args[2].id] });
                    } }
            }];
            $table.bootstrapTable({
                url: 'assets/data3.json',
                mobileResponsive: true, minWidth: 767,
                classes: 'table',
                pagination: true, pageSize: 10, pageList: '[All, 40, 30, 20, 10]', sidePagination: 'client', showPaginationSwitch: true,
                search: true, showFooter: false, showRefresh: true, showToggle: true, showColumns: true, showExport: true, detailView: true,
                idField: 'id', toolbar: '#toolbar', minimumCountColumns: '2',
                detailFormatter: detailFormatter, responseHandler: responseHandler,
                filterControl: true, filterShowClear: true,
                icons: {
                    paginationSwitchDown: 'icon-arrow-down-circle', paginationSwitchUp: 'icon-arrow-up-circle',
                    refresh: 'icon-refresh', toggle: 'icon-list', columns: 'icon-grid', 'export': 'icon-share-alt',
                    detailOpen: 'icon-plus', detailClose: 'icon-minus', clear: 'icon-trash'
                },
                columns: columns,
                filterTemplate: {
                    input: function (that, field, isVisible, placeholder) {
                        return $.fn.bootstrapTable.utils.sprintf('<input type="text" class="form-control bootstrap-table-filter-control-%s" style="width: 100%; visibility: %s" placeholder="%s">', field, isVisible, placeholder);
                    },
                    select: function (that, field, isVisible) {
                        return $.fn.bootstrapTable.utils.sprintf("<div class=\"ui fluid select-dropdown form-control selection\" tabindex=\"0\"><select class=\"bootstrap-table-filter-control-%s\" style=\"width: 100%; visibility: %s\" dir=\"%s\"></select><i class=\"select-dropdown icon\"></i><div class=\"text\"></div><div class=\"menu\" tabindex=\"-1\"></div></div>", field, isVisible, getDirectionOfSelectOptions(undefined));
                    },
                    date: function (that, field, isVisible) {
                        return "<div class=\"bs-datepicker input-daterange date-filter-control bootstrap-table-filter-control-" + field + "\" style=\"width: 100%; visibility: " + isVisible + "\">" + '<input type="text" class="form-control w-100 mb-1" />' + '<input type="text" class="form-control w-100" />' + '</div>';
                    }
                }
            });
            var date;
            // sometimes footer render error.
            setTimeout(function () {
                return $table.bootstrapTable('resetView');
            }, 200);
            $table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
                $remove.prop('disabled', !$table.bootstrapTable('getSelections').length);
                selections = getIdSelections(this);
            });
            $table.on('load-success.bs.table column-search.bs.table search.bs.table column-switch.bs.table', function () {
                if (!date) date = $table.bootstrapTable('getData');
                if (!$table.find('.bs-datepicker').find('input').val()) return;
                $table.bootstrapTable('load', $.grep(date, function (row) {
                    return Date.parse(row.date) >= Date.parse($table.find('.bs-datepicker input').val()) && Date.parse(row.date) <= Date.parse($table.find('.bs-datepicker input').last().val());
                }));
            });
            $table.on('post-header.bs.table', function () {
                $table.find('.bs-datepicker').bsDatepicker({ 'autoclose': true, 'clearBtn': true, filterControlPlaceholder: '', 'todayHighlight': true }).on('show', function () {
                    $('.bs-datepicker-dropdown').css('opacity', '0').addClass('transition scale in').on('click', function () {
                        $(this).removeClass('transition scale in').css('opacity', '1');
                    });
                });
                $('.select-dropdown').selectDropdown();
            });
            $table.parents('.bootstrap-table').find('.filter-show-clear').click(function () {
                $('.select-dropdown').selectDropdown('clear');
            });
            $table.on('load-success.bs.table', function () {
                var $modal = $('#bt-table-modal');
                if ($modal.hasClass('modal-constructed')) return;
                $modal.addClass('modal-constructed').appendTo($table.parent()).find('.modal-body').append(function () {
                    cols = columns.slice(2, 6);
                    var html = [];
                    $.each(cols, function (key, value) {
                        if (value.field === 'job-title') {
                            html.push('<div class="row mb-3"><div class="col-4 text-right"><b>' + value.title + ':</b></div><div class="col-8">' + '<select class="ui form-control select-dropdown fluid search bt-modal-input-' + value.field + '">' + $('.bootstrap-table-filter-control-job-title').html() + '</select></div></div>');
                            return;
                        }
                        html.push('<div class="row mb-3"><div class="col-4 text-right"><b>' + value.title + ':</b></div><div class="col-8"><input class="form-control bt-modal-input-' + value.field + '" /></div></div>');
                    });
                    return html.join('');
                });
                $modal.find('.select-dropdown').selectDropdown();
            });
            $table.find('.bs-datepicker').on('changeDate', function (e) {
                $(e.currentTarget).find('input').each(function () {
                    $(this).keyup();
                });
            });
            $table.on('all.bs.table', styleCheckboxes);
            $remove.click(function () {
                var ids = getIdSelections($table[0]);
                $table.bootstrapTable('remove', { field: 'id', values: ids });
                $remove.prop('disabled', true);
            });
            $new.click(function () {
                var data = $table.bootstrapTable('getData');
                var $modal = $('#bt-table-modal').modal('show');
                $modal.find('.add-data').off().click(function () {
                    newId = newId ? ++newId : data && data.length && data[data.length - 1].id ? data[data.length - 1].id : 0;
                    var $inputs = $modal.find('input');
                    var $selects = $modal.find('select');
                    $table.bootstrapTable('insertRow', { index: 0,
                        row: {
                            id: newId,
                            'name': $inputs[0].value ? $inputs[0].value : 'empty',
                            email: $inputs[1].value ? $inputs[1].value : 'empty',
                            'job-title': $selects[0].value ? $selects[0].value : 'empty',
                            'credit-card': $inputs[2].value ? $inputs[2].value : 'empty',
                            'date': moment().format('l')
                        }
                    });
                    if ($modal.find('input[type="checkbox"]')[0].checked === false) {
                        $inputs.val('');
                        $modal.modal('hide');
                    }
                });
                $new.prop('disabled', false);
            });
        }
        function initTableNewInModal(el) {
            var $table = $(el);
            if (!$table[0]) return;
            var newId = 0;
            var cols = [];
            var columns = [{ field: 'state', checkbox: true, align: 'center', valign: 'middle' }, { field: 'id', title: 'ID', width: 40, align: 'center', valign: 'middle', sortable: true }, { field: 'name', title: 'Name', sortable: true, align: 'center', editable: {}, 'class': 'editable' }, { field: 'email', title: 'Email', align: 'center', sortable: true, editable: {}, 'class': 'editable' }, { field: 'credit-card', title: 'Credit Card #', sortable: true, align: 'center', editable: {}, 'class': 'editable' }, { field: 'job-title', title: 'Job Title', sortable: true, align: 'center', editable: {}, 'class': 'editable' }, { field: 'link', title: 'Remove', align: 'center', formatter: linkRemoveColumnsFormatter,
                events: { 'click .editable-remove': function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        $table.bootstrapTable('remove', { field: 'id', values: [args[2].id] });
                    } }
            }];
            $table.bootstrapTable({
                url: 'assets/data1.json',
                mobileResponsive: true, minWidth: 767,
                classes: 'table',
                pagination: true, pageSize: 10, pageList: '[All, 40, 30, 20, 10]', sidePagination: 'client', showPaginationSwitch: true,
                search: true, showFooter: false, showRefresh: true, showToggle: true, showColumns: true, showExport: true, detailView: true,
                idField: 'id', toolbar: '#toolbar', minimumCountColumns: '2',
                detailFormatter: detailFormatter, responseHandler: responseHandler,
                icons: {
                    paginationSwitchDown: 'icon-arrow-down-circle', paginationSwitchUp: 'icon-arrow-up-circle',
                    refresh: 'icon-refresh', toggle: 'icon-list', columns: 'icon-grid', 'export': 'icon-share-alt',
                    detailOpen: 'icon-plus', detailClose: 'icon-minus'
                },
                columns: columns
            });
            // sometimes footer render error.
            setTimeout(function () {
                return $table.bootstrapTable('resetView');
            }, 200);
            $table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
                $remove.prop('disabled', !$table.bootstrapTable('getSelections').length);
                selections = getIdSelections(this);
            });
            $table.on('all.bs.table', styleCheckboxes);
            $('#bt-table-modal').appendTo($table.parent()).find('.modal-body').append(function () {
                cols = columns.slice(2);
                cols.pop();
                var html = [];
                $.each(cols, function (key, value) {
                    html.push('<div class="row mb-3"><div class="col-4 text-right"><b>' + value.title + ':</b></div><div class="col-8"><input class="form-control bt-modal-input-' + value.field + '" /></div></div>');
                });
                return html.join('');
            });
            $remove.click(function () {
                var ids = getIdSelections($table[0]);
                $table.bootstrapTable('remove', { field: 'id', values: ids });
                $remove.prop('disabled', true);
            });
            $new.click(function () {
                var data = $table.bootstrapTable('getData');
                var $modal = $('#bt-table-modal').modal('show');
                $modal.find('.add-data').off().click(function () {
                    newId = newId ? ++newId : data && data.length && data[data.length - 1].id ? data[data.length - 1].id : 0;
                    var $inputs = $modal.find('input');
                    $table.bootstrapTable('insertRow', { index: 0,
                        row: {
                            id: newId,
                            'name': $inputs[0].value ? $inputs[0].value : 'empty',
                            email: $inputs[1].value ? $inputs[1].value : 'empty',
                            'job-title': $inputs[2].value ? $inputs[2].value : 'empty',
                            'credit-card': $inputs[3].value ? $inputs[3].value : 'empty'
                        }
                    });
                    if ($modal.find('input[type="checkbox"]')[0].checked === false) {
                        $inputs.val('');
                        $modal.modal('hide');
                    }
                });
                $new.prop('disabled', false);
            });
        }
        function initTableEditColumns(el) {
            var $table = $(el);
            if (!$table[0]) return;
            var newId = 0;
            $table.bootstrapTable({
                url: 'assets/data2.json',
                mobileResponsive: true, minWidth: 767,
                classes: 'table table-no-bordered',
                pagination: true, pageSize: 10, pageList: '[All, 40, 30, 20, 10]', sidePagination: 'client', showPaginationSwitch: true,
                search: true, showFooter: false, showRefresh: true, showToggle: true, showColumns: true, showExport: true, detailView: true,
                idField: 'id', toolbar: '#toolbar', minimumCountColumns: '2',
                detailFormatter: detailFormatter, responseHandler: responseHandler,
                icons: {
                    paginationSwitchDown: 'icon-arrow-down-circle', paginationSwitchUp: 'icon-arrow-up-circle',
                    refresh: 'icon-refresh', toggle: 'icon-list', columns: 'icon-grid', 'export': 'icon-share-alt',
                    detailOpen: 'icon-plus', detailClose: 'icon-minus'
                },
                columns: [{ field: 'state', checkbox: true, align: 'center', valign: 'middle' }, { field: 'id', title: 'ID', width: 40, align: 'center', valign: 'middle', sortable: true }, { field: 'company-name', title: 'Company Name', sortable: true, align: 'center', editable: {}, 'class': 'editable' }, { field: 'street-address', title: 'Street Address', sortable: true, align: 'center', editable: {}, 'class': 'editable' }, { field: 'phone', title: 'Phone', align: 'center', sortable: true, editable: {}, 'class': 'editable' }, { field: 'employees', title: 'Employees', sortable: true, align: 'center', editable: {}, 'class': 'editable' }, { field: 'link', title: 'Remove', align: 'center', formatter: linkRemoveColumnsFormatter,
                    events: { 'click .editable-remove': function () {
                            var args = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                args[_i] = arguments[_i];
                            }
                            $table.bootstrapTable('remove', { field: 'id', values: [args[2].id] });
                        } }
                }]
            });
            // sometimes footer render error.
            setTimeout(function () {
                return $table.bootstrapTable('resetView');
            }, 200);
            $table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
                $remove.prop('disabled', !$table.bootstrapTable('getSelections').length);
                selections = getIdSelections(this);
            });
            $table.on('all.bs.table', styleCheckboxes);
            $remove.click(function () {
                var ids = getIdSelections($table[0]);
                $table.bootstrapTable('remove', { field: 'id', values: ids });
                $remove.prop('disabled', true);
            });
            $new.click(function () {
                var data = $table.bootstrapTable('getData');
                newId = newId ? ++newId : data && data.length && data[data.length - 1].id ? data[data.length - 1].id : 0;
                $table.bootstrapTable('insertRow', {
                    index: 0, row: { id: newId, 'company-name': 'empty', phone: 'empty', 'street-address': 'empty', employees: 0 }
                });
                $new.prop('disabled', false);
            });
        }
        function initTableEditRows(el) {
            var $table = $(el);
            if (!$table[0]) return;
            var newId = 0;
            $table.bootstrapTable({
                url: 'assets/data2.json',
                mobileResponsive: true, minWidth: 767,
                classes: 'table table-no-bordered',
                pagination: true, pageSize: 12, pageList: '[All, 40, 30, 20, 12]', sidePagination: 'client', showPaginationSwitch: true,
                search: true, showFooter: false, showRefresh: true, showToggle: true, showColumns: true, showExport: true, detailView: true,
                idField: 'id', toolbar: '#toolbar', minimumCountColumns: '2',
                detailFormatter: detailFormatter, responseHandler: responseHandler,
                icons: {
                    paginationSwitchDown: 'icon-arrow-down-circle', paginationSwitchUp: 'icon-arrow-up-circle',
                    refresh: 'icon-refresh', toggle: 'icon-list', columns: 'icon-grid', 'export': 'icon-share-alt',
                    detailOpen: 'icon-plus', detailClose: 'icon-minus'
                },
                columns: [{ field: 'state', checkbox: true, align: 'center', valign: 'middle' }, { field: 'id', title: 'ID', width: 40, align: 'center', valign: 'middle', sortable: true }, { field: 'company-name', title: 'Company Name', sortable: true, align: 'center', editable: {}, 'class': 'editable' }, { field: 'street-address', title: 'Street Address', sortable: true, align: 'center', editable: {}, 'class': 'editable' }, { field: 'phone', title: 'Phone', align: 'center', sortable: true, editable: {}, 'class': 'editable' }, { field: 'employees', title: 'Employees', sortable: true, align: 'center', editable: {}, 'class': 'editable' }, { field: 'link', title: 'Edit', align: 'center', formatter: linkEditRowsFormatter }]
            });
            // sometimes footer render error.
            setTimeout(function () {
                return $table.bootstrapTable('resetView');
            }, 200);
            $table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
                $remove.prop('disabled', !$table.bootstrapTable('getSelections').length);
                selections = getIdSelections(this);
            });
            $table.on('all.bs.table', styleCheckboxes);
            $table.on('reset-view.bs.table', editHandler.bind($table[0]));
            $remove.click(function () {
                var ids = getIdSelections($table[0]);
                $table.bootstrapTable('remove', { field: 'id', values: ids });
                $remove.prop('disabled', true);
            });
            $new.click(function () {
                var data = $table.bootstrapTable('getData');
                newId = newId ? ++newId : data && data.length && data[data.length - 1].id ? data[data.length - 1].id : 0;
                $table.bootstrapTable('insertRow', {
                    index: 0, row: { id: newId, 'company-name': 'empty', phone: 'empty', 'street-address': 'empty', employees: 0 }
                });
                $new.prop('disabled', false);
            });
        }
        function editHandler() {
            var $table = $(this);
            $('.editable-cancel, .editable-submit').hide();
            var $editable = $table.find('.editable a');
            $editable.editable({
                type: 'text', emptytext: '', showbuttons: false, unsavedclass: null, toggle: 'manual', onblur: 'ignore'
            });
            function submitEditable(el) {
                $(el).find('.editableform').submit();
            }
            $table.find('.edit-row').on('click', function () {
                var $tr = $(this).parents('tr');
                var btns = $tr.find('.editable-cancel, .editable-submit').show();
                $(this).hide();
                $tr.find('.editable a').each(function () {
                    $(this).editable('show');
                    setTimeout(function () {
                        return $tr.find('.form-control').first().focus();
                    }, 10);
                });
                $tr.find('.editableform').each(function () {
                    $(this).on('keydown', function (e) {
                        if ((e.keyCode || e.which) === 13) {
                            submitEditable($tr[0]);
                        }
                    });
                });
                btns.click(function (e) {
                    if ($(e.target).is('.editable-submit')) submitEditable($tr[0]);
                    $tr.find('.editable a').editable('hide');
                    $tr.find('.edit-row').show();
                    btns.hide();
                    return false;
                });
                return false;
            });
        }
        function getIdSelections(el) {
            return $.map($(el).bootstrapTable('getSelections'), function (row) {
                return row.id;
            });
        }
        function styleCheckboxes() {
            $('input[name="btSelectItem"], input[name="btSelectGroup"], input[name="btSelectAll"], .fixed-table-toolbar [type="checkbox"]').each(function () {
                if (!$(this).hasClass('custom-control-input')) {
                    $(this).addClass('custom-control-input');
                    var $label = $(this).parent().is('label') ? $(this).parent().addClass('custom-control custom-checkbox') : $(this).wrap('<label class="custom-control custom-checkbox"></label>').parent();
                    $label.contents().filter(function () {
                        return this.nodeType === 3;
                    }).wrap('<span class="custom-control-description"></span>');
                    $('<span class="custom-control-indicator"></span>').appendTo($label);
                }
            });
        }
        function responseHandler(res) {
            $.each(res.rows, function (i, row) {
                row.state = $.inArray(row.id, selections) !== -1;
            });
            return res;
        }
        function detailFormatter() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var html = [];
            var row = args[1];
            html.push('<div class="row mb-1"><div class="col-3"><b>Custom</b></div><div class="col-9">Custom Value</div></div>');
            $.each(row, function (key, value) {
                html.push('<div class="row mb-1"><div class="col-3"><b>' + key + ':</b></div><div class="col-9">' + value + '</div></div>');
            });
            return html.join('');
        }
        function linkRemoveColumnsFormatter() {
            return "<a href=\"javascript:void(0)\" class=\"btn btn-sm btn-danger editable-remove\"><i class=\"fa fa-close\"></i></a>";
        }
        function linkEditRowsFormatter() {
            return "\n            <a class=\"edit-row c-gray-dark\" href=\"\"><i class=\"fa fa-edit icon-mr-ch\"></i>Edit</a>\n            <a href=\"\" class=\"btn btn-sm btn-primary editable-submit\"><i class=\"fa fa-check\"></i></a>\n            <a href=\"\" class=\"btn btn-sm btn-default editable-cancel\"><i class=\"fa fa-rotate-left\"></i></a>\n        ";
        }
        function getDirectionOfSelectOptions(alignment) {
            alignment = alignment === undefined ? 'left' : alignment.toLowerCase();
            switch (alignment) {
                case 'left':
                    return 'ltr';
                case 'right':
                    return 'rtl';
                case 'auto':
                    return 'auto';
                default:
                    return 'ltr';
            }
        }
        function imageFormatter(value, row) {
            var img = '<div class="table-user-image"><i class="icon-user"></i></div>';
            if (row.image) {
                img = '<img src="' + row.image + '" class="table-user-image">';
            }
            return img;
        }
    });
});
System.registerDynamic("reactiveadmintemplate/scripts/table.js", ["./app", "./modules/form/datapicker/init", "./modules/table/init"], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", { value: true });
  /*!
   * @version: 1.1.2
   * @name: table
   *
   * @author: https://themeforest.net/user/flexlayers
   */
  $__require("./app");
  $__require("./modules/form/datapicker/init");
  $__require("./modules/table/init");
});
