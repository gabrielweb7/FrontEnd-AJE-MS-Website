"bundle";
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
System.registerDynamic("reactiveadmintemplate/scripts/modules/sortable.js", ["jquery-ui/ui/widgets/sortable"], true, function ($__require, exports, module) {
    'use strict';

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    /*!
     * @version: 1.1.2
     * @name: main
     *
     * @author: https://themeforest.net/user/flexlayers
     */
    $__require("jquery-ui/ui/widgets/sortable");
    $(function () {
        $('.sortable-list').each(function () {
            var id = Math.round(Math.random() * 100000);
            var newContainment = 'sortable-containment-' + id;
            var newSelector = 'sortable-list-' + id;
            $(this).parents('.sortable-containment').addClass(newContainment);
            $(this).addClass(newSelector);
            $('.' + newSelector).sortable({
                containment: '.' + newContainment,
                revert: 100,
                items: '.sortable-list-item',
                cursor: "move",
                handle: '.sortable-list-handle'
            });
        });
        $('.sortable-columns').each(function () {
            var id = Math.round(Math.random() * 100000);
            var newSelector = 'sortable-columns-' + id;
            $(this).addClass(newSelector);
            $('.' + newSelector).sortable({
                containment: '.content-wrap',
                revert: 100,
                items: '.sortable-column',
                cursor: "move",
                // handle: '.sortable-column-handle',
                connectWith: '.sortable-columns',
                helper: 'clone',
                appendTo: '#main'
            });
        });
    });
});
System.registerDynamic("npm:tinycolor2@1.4.1.json", [], true, function() {
  return {
    "main": "tinycolor.js",
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
      "demo/*": {
        "globals": {
          "process": null
        }
      },
      "dist/*": {
        "globals": {
          "process": null
        }
      },
      "docs/*": {
        "globals": {
          "process": null
        }
      },
      "index.html": {
        "globals": {
          "process": null
        }
      },
      "test/*": {
        "globals": {
          "process": null
        }
      },
      "tinycolor.js": {
        "globals": {
          "process": null
        }
      }
    }
  };
});

System.registerDynamic("npm:tinycolor2@1.4.1/tinycolor.js", [], false, function ($__require, $__exports, $__module) {
    var _retrieveGlobal = System.registry.get("@@global-helpers").prepareGlobal($__module.id, null, {});

    (function ($__global) {
        // TinyColor v1.4.1
        // https://github.com/bgrins/TinyColor
        // Brian Grinstead, MIT License

        (function (Math) {

            var trimLeft = /^\s+/,
                trimRight = /\s+$/,
                tinyCounter = 0,
                mathRound = Math.round,
                mathMin = Math.min,
                mathMax = Math.max,
                mathRandom = Math.random;

            function tinycolor(color, opts) {

                color = color ? color : '';
                opts = opts || {};

                // If input is already a tinycolor, return itself
                if (color instanceof tinycolor) {
                    return color;
                }
                // If we are called as a function, call using new instead
                if (!(this instanceof tinycolor)) {
                    return new tinycolor(color, opts);
                }

                var rgb = inputToRGB(color);
                this._originalInput = color, this._r = rgb.r, this._g = rgb.g, this._b = rgb.b, this._a = rgb.a, this._roundA = mathRound(100 * this._a) / 100, this._format = opts.format || rgb.format;
                this._gradientType = opts.gradientType;

                // Don't let the range of [0,255] come back in [0,1].
                // Potentially lose a little bit of precision here, but will fix issues where
                // .5 gets interpreted as half of the total, instead of half of 1
                // If it was supposed to be 128, this was already taken care of by `inputToRgb`
                if (this._r < 1) {
                    this._r = mathRound(this._r);
                }
                if (this._g < 1) {
                    this._g = mathRound(this._g);
                }
                if (this._b < 1) {
                    this._b = mathRound(this._b);
                }

                this._ok = rgb.ok;
                this._tc_id = tinyCounter++;
            }

            tinycolor.prototype = {
                isDark: function () {
                    return this.getBrightness() < 128;
                },
                isLight: function () {
                    return !this.isDark();
                },
                isValid: function () {
                    return this._ok;
                },
                getOriginalInput: function () {
                    return this._originalInput;
                },
                getFormat: function () {
                    return this._format;
                },
                getAlpha: function () {
                    return this._a;
                },
                getBrightness: function () {
                    //http://www.w3.org/TR/AERT#color-contrast
                    var rgb = this.toRgb();
                    return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
                },
                getLuminance: function () {
                    //http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
                    var rgb = this.toRgb();
                    var RsRGB, GsRGB, BsRGB, R, G, B;
                    RsRGB = rgb.r / 255;
                    GsRGB = rgb.g / 255;
                    BsRGB = rgb.b / 255;

                    if (RsRGB <= 0.03928) {
                        R = RsRGB / 12.92;
                    } else {
                        R = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
                    }
                    if (GsRGB <= 0.03928) {
                        G = GsRGB / 12.92;
                    } else {
                        G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
                    }
                    if (BsRGB <= 0.03928) {
                        B = BsRGB / 12.92;
                    } else {
                        B = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
                    }
                    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
                },
                setAlpha: function (value) {
                    this._a = boundAlpha(value);
                    this._roundA = mathRound(100 * this._a) / 100;
                    return this;
                },
                toHsv: function () {
                    var hsv = rgbToHsv(this._r, this._g, this._b);
                    return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this._a };
                },
                toHsvString: function () {
                    var hsv = rgbToHsv(this._r, this._g, this._b);
                    var h = mathRound(hsv.h * 360),
                        s = mathRound(hsv.s * 100),
                        v = mathRound(hsv.v * 100);
                    return this._a == 1 ? "hsv(" + h + ", " + s + "%, " + v + "%)" : "hsva(" + h + ", " + s + "%, " + v + "%, " + this._roundA + ")";
                },
                toHsl: function () {
                    var hsl = rgbToHsl(this._r, this._g, this._b);
                    return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this._a };
                },
                toHslString: function () {
                    var hsl = rgbToHsl(this._r, this._g, this._b);
                    var h = mathRound(hsl.h * 360),
                        s = mathRound(hsl.s * 100),
                        l = mathRound(hsl.l * 100);
                    return this._a == 1 ? "hsl(" + h + ", " + s + "%, " + l + "%)" : "hsla(" + h + ", " + s + "%, " + l + "%, " + this._roundA + ")";
                },
                toHex: function (allow3Char) {
                    return rgbToHex(this._r, this._g, this._b, allow3Char);
                },
                toHexString: function (allow3Char) {
                    return '#' + this.toHex(allow3Char);
                },
                toHex8: function (allow4Char) {
                    return rgbaToHex(this._r, this._g, this._b, this._a, allow4Char);
                },
                toHex8String: function (allow4Char) {
                    return '#' + this.toHex8(allow4Char);
                },
                toRgb: function () {
                    return { r: mathRound(this._r), g: mathRound(this._g), b: mathRound(this._b), a: this._a };
                },
                toRgbString: function () {
                    return this._a == 1 ? "rgb(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ")" : "rgba(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ", " + this._roundA + ")";
                },
                toPercentageRgb: function () {
                    return { r: mathRound(bound01(this._r, 255) * 100) + "%", g: mathRound(bound01(this._g, 255) * 100) + "%", b: mathRound(bound01(this._b, 255) * 100) + "%", a: this._a };
                },
                toPercentageRgbString: function () {
                    return this._a == 1 ? "rgb(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%)" : "rgba(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
                },
                toName: function () {
                    if (this._a === 0) {
                        return "transparent";
                    }

                    if (this._a < 1) {
                        return false;
                    }

                    return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
                },
                toFilter: function (secondColor) {
                    var hex8String = '#' + rgbaToArgbHex(this._r, this._g, this._b, this._a);
                    var secondHex8String = hex8String;
                    var gradientType = this._gradientType ? "GradientType = 1, " : "";

                    if (secondColor) {
                        var s = tinycolor(secondColor);
                        secondHex8String = '#' + rgbaToArgbHex(s._r, s._g, s._b, s._a);
                    }

                    return "progid:DXImageTransform.Microsoft.gradient(" + gradientType + "startColorstr=" + hex8String + ",endColorstr=" + secondHex8String + ")";
                },
                toString: function (format) {
                    var formatSet = !!format;
                    format = format || this._format;

                    var formattedString = false;
                    var hasAlpha = this._a < 1 && this._a >= 0;
                    var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "hex4" || format === "hex8" || format === "name");

                    if (needsAlphaFormat) {
                        // Special case for "transparent", all other non-alpha formats
                        // will return rgba when there is transparency.
                        if (format === "name" && this._a === 0) {
                            return this.toName();
                        }
                        return this.toRgbString();
                    }
                    if (format === "rgb") {
                        formattedString = this.toRgbString();
                    }
                    if (format === "prgb") {
                        formattedString = this.toPercentageRgbString();
                    }
                    if (format === "hex" || format === "hex6") {
                        formattedString = this.toHexString();
                    }
                    if (format === "hex3") {
                        formattedString = this.toHexString(true);
                    }
                    if (format === "hex4") {
                        formattedString = this.toHex8String(true);
                    }
                    if (format === "hex8") {
                        formattedString = this.toHex8String();
                    }
                    if (format === "name") {
                        formattedString = this.toName();
                    }
                    if (format === "hsl") {
                        formattedString = this.toHslString();
                    }
                    if (format === "hsv") {
                        formattedString = this.toHsvString();
                    }

                    return formattedString || this.toHexString();
                },
                clone: function () {
                    return tinycolor(this.toString());
                },

                _applyModification: function (fn, args) {
                    var color = fn.apply(null, [this].concat([].slice.call(args)));
                    this._r = color._r;
                    this._g = color._g;
                    this._b = color._b;
                    this.setAlpha(color._a);
                    return this;
                },
                lighten: function () {
                    return this._applyModification(lighten, arguments);
                },
                brighten: function () {
                    return this._applyModification(brighten, arguments);
                },
                darken: function () {
                    return this._applyModification(darken, arguments);
                },
                desaturate: function () {
                    return this._applyModification(desaturate, arguments);
                },
                saturate: function () {
                    return this._applyModification(saturate, arguments);
                },
                greyscale: function () {
                    return this._applyModification(greyscale, arguments);
                },
                spin: function () {
                    return this._applyModification(spin, arguments);
                },

                _applyCombination: function (fn, args) {
                    return fn.apply(null, [this].concat([].slice.call(args)));
                },
                analogous: function () {
                    return this._applyCombination(analogous, arguments);
                },
                complement: function () {
                    return this._applyCombination(complement, arguments);
                },
                monochromatic: function () {
                    return this._applyCombination(monochromatic, arguments);
                },
                splitcomplement: function () {
                    return this._applyCombination(splitcomplement, arguments);
                },
                triad: function () {
                    return this._applyCombination(triad, arguments);
                },
                tetrad: function () {
                    return this._applyCombination(tetrad, arguments);
                }
            };

            // If input is an object, force 1 into "1.0" to handle ratios properly
            // String input requires "1.0" as input, so 1 will be treated as 1
            tinycolor.fromRatio = function (color, opts) {
                if (typeof color == "object") {
                    var newColor = {};
                    for (var i in color) {
                        if (color.hasOwnProperty(i)) {
                            if (i === "a") {
                                newColor[i] = color[i];
                            } else {
                                newColor[i] = convertToPercentage(color[i]);
                            }
                        }
                    }
                    color = newColor;
                }

                return tinycolor(color, opts);
            };

            // Given a string or object, convert that input to RGB
            // Possible string inputs:
            //
            //     "red"
            //     "#f00" or "f00"
            //     "#ff0000" or "ff0000"
            //     "#ff000000" or "ff000000"
            //     "rgb 255 0 0" or "rgb (255, 0, 0)"
            //     "rgb 1.0 0 0" or "rgb (1, 0, 0)"
            //     "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
            //     "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
            //     "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
            //     "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
            //     "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
            //
            function inputToRGB(color) {

                var rgb = { r: 0, g: 0, b: 0 };
                var a = 1;
                var s = null;
                var v = null;
                var l = null;
                var ok = false;
                var format = false;

                if (typeof color == "string") {
                    color = stringInputToObject(color);
                }

                if (typeof color == "object") {
                    if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
                        rgb = rgbToRgb(color.r, color.g, color.b);
                        ok = true;
                        format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
                    } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
                        s = convertToPercentage(color.s);
                        v = convertToPercentage(color.v);
                        rgb = hsvToRgb(color.h, s, v);
                        ok = true;
                        format = "hsv";
                    } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
                        s = convertToPercentage(color.s);
                        l = convertToPercentage(color.l);
                        rgb = hslToRgb(color.h, s, l);
                        ok = true;
                        format = "hsl";
                    }

                    if (color.hasOwnProperty("a")) {
                        a = color.a;
                    }
                }

                a = boundAlpha(a);

                return {
                    ok: ok,
                    format: color.format || format,
                    r: mathMin(255, mathMax(rgb.r, 0)),
                    g: mathMin(255, mathMax(rgb.g, 0)),
                    b: mathMin(255, mathMax(rgb.b, 0)),
                    a: a
                };
            }

            // Conversion Functions
            // --------------------

            // `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
            // <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>

            // `rgbToRgb`
            // Handle bounds / percentage checking to conform to CSS color spec
            // <http://www.w3.org/TR/css3-color/>
            // *Assumes:* r, g, b in [0, 255] or [0, 1]
            // *Returns:* { r, g, b } in [0, 255]
            function rgbToRgb(r, g, b) {
                return {
                    r: bound01(r, 255) * 255,
                    g: bound01(g, 255) * 255,
                    b: bound01(b, 255) * 255
                };
            }

            // `rgbToHsl`
            // Converts an RGB color value to HSL.
            // *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
            // *Returns:* { h, s, l } in [0,1]
            function rgbToHsl(r, g, b) {

                r = bound01(r, 255);
                g = bound01(g, 255);
                b = bound01(b, 255);

                var max = mathMax(r, g, b),
                    min = mathMin(r, g, b);
                var h,
                    s,
                    l = (max + min) / 2;

                if (max == min) {
                    h = s = 0; // achromatic
                } else {
                    var d = max - min;
                    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                    switch (max) {
                        case r:
                            h = (g - b) / d + (g < b ? 6 : 0);break;
                        case g:
                            h = (b - r) / d + 2;break;
                        case b:
                            h = (r - g) / d + 4;break;
                    }

                    h /= 6;
                }

                return { h: h, s: s, l: l };
            }

            // `hslToRgb`
            // Converts an HSL color value to RGB.
            // *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
            // *Returns:* { r, g, b } in the set [0, 255]
            function hslToRgb(h, s, l) {
                var r, g, b;

                h = bound01(h, 360);
                s = bound01(s, 100);
                l = bound01(l, 100);

                function hue2rgb(p, q, t) {
                    if (t < 0) t += 1;
                    if (t > 1) t -= 1;
                    if (t < 1 / 6) return p + (q - p) * 6 * t;
                    if (t < 1 / 2) return q;
                    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                    return p;
                }

                if (s === 0) {
                    r = g = b = l; // achromatic
                } else {
                    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                    var p = 2 * l - q;
                    r = hue2rgb(p, q, h + 1 / 3);
                    g = hue2rgb(p, q, h);
                    b = hue2rgb(p, q, h - 1 / 3);
                }

                return { r: r * 255, g: g * 255, b: b * 255 };
            }

            // `rgbToHsv`
            // Converts an RGB color value to HSV
            // *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
            // *Returns:* { h, s, v } in [0,1]
            function rgbToHsv(r, g, b) {

                r = bound01(r, 255);
                g = bound01(g, 255);
                b = bound01(b, 255);

                var max = mathMax(r, g, b),
                    min = mathMin(r, g, b);
                var h,
                    s,
                    v = max;

                var d = max - min;
                s = max === 0 ? 0 : d / max;

                if (max == min) {
                    h = 0; // achromatic
                } else {
                    switch (max) {
                        case r:
                            h = (g - b) / d + (g < b ? 6 : 0);break;
                        case g:
                            h = (b - r) / d + 2;break;
                        case b:
                            h = (r - g) / d + 4;break;
                    }
                    h /= 6;
                }
                return { h: h, s: s, v: v };
            }

            // `hsvToRgb`
            // Converts an HSV color value to RGB.
            // *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
            // *Returns:* { r, g, b } in the set [0, 255]
            function hsvToRgb(h, s, v) {

                h = bound01(h, 360) * 6;
                s = bound01(s, 100);
                v = bound01(v, 100);

                var i = Math.floor(h),
                    f = h - i,
                    p = v * (1 - s),
                    q = v * (1 - f * s),
                    t = v * (1 - (1 - f) * s),
                    mod = i % 6,
                    r = [v, q, p, p, t, v][mod],
                    g = [t, v, v, q, p, p][mod],
                    b = [p, p, t, v, v, q][mod];

                return { r: r * 255, g: g * 255, b: b * 255 };
            }

            // `rgbToHex`
            // Converts an RGB color to hex
            // Assumes r, g, and b are contained in the set [0, 255]
            // Returns a 3 or 6 character hex
            function rgbToHex(r, g, b, allow3Char) {

                var hex = [pad2(mathRound(r).toString(16)), pad2(mathRound(g).toString(16)), pad2(mathRound(b).toString(16))];

                // Return a 3 character hex if possible
                if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
                    return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
                }

                return hex.join("");
            }

            // `rgbaToHex`
            // Converts an RGBA color plus alpha transparency to hex
            // Assumes r, g, b are contained in the set [0, 255] and
            // a in [0, 1]. Returns a 4 or 8 character rgba hex
            function rgbaToHex(r, g, b, a, allow4Char) {

                var hex = [pad2(mathRound(r).toString(16)), pad2(mathRound(g).toString(16)), pad2(mathRound(b).toString(16)), pad2(convertDecimalToHex(a))];

                // Return a 4 character hex if possible
                if (allow4Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1) && hex[3].charAt(0) == hex[3].charAt(1)) {
                    return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
                }

                return hex.join("");
            }

            // `rgbaToArgbHex`
            // Converts an RGBA color to an ARGB Hex8 string
            // Rarely used, but required for "toFilter()"
            function rgbaToArgbHex(r, g, b, a) {

                var hex = [pad2(convertDecimalToHex(a)), pad2(mathRound(r).toString(16)), pad2(mathRound(g).toString(16)), pad2(mathRound(b).toString(16))];

                return hex.join("");
            }

            // `equals`
            // Can be called with any tinycolor input
            tinycolor.equals = function (color1, color2) {
                if (!color1 || !color2) {
                    return false;
                }
                return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
            };

            tinycolor.random = function () {
                return tinycolor.fromRatio({
                    r: mathRandom(),
                    g: mathRandom(),
                    b: mathRandom()
                });
            };

            // Modification Functions
            // ----------------------
            // Thanks to less.js for some of the basics here
            // <https://github.com/cloudhead/less.js/blob/master/lib/less/functions.js>

            function desaturate(color, amount) {
                amount = amount === 0 ? 0 : amount || 10;
                var hsl = tinycolor(color).toHsl();
                hsl.s -= amount / 100;
                hsl.s = clamp01(hsl.s);
                return tinycolor(hsl);
            }

            function saturate(color, amount) {
                amount = amount === 0 ? 0 : amount || 10;
                var hsl = tinycolor(color).toHsl();
                hsl.s += amount / 100;
                hsl.s = clamp01(hsl.s);
                return tinycolor(hsl);
            }

            function greyscale(color) {
                return tinycolor(color).desaturate(100);
            }

            function lighten(color, amount) {
                amount = amount === 0 ? 0 : amount || 10;
                var hsl = tinycolor(color).toHsl();
                hsl.l += amount / 100;
                hsl.l = clamp01(hsl.l);
                return tinycolor(hsl);
            }

            function brighten(color, amount) {
                amount = amount === 0 ? 0 : amount || 10;
                var rgb = tinycolor(color).toRgb();
                rgb.r = mathMax(0, mathMin(255, rgb.r - mathRound(255 * -(amount / 100))));
                rgb.g = mathMax(0, mathMin(255, rgb.g - mathRound(255 * -(amount / 100))));
                rgb.b = mathMax(0, mathMin(255, rgb.b - mathRound(255 * -(amount / 100))));
                return tinycolor(rgb);
            }

            function darken(color, amount) {
                amount = amount === 0 ? 0 : amount || 10;
                var hsl = tinycolor(color).toHsl();
                hsl.l -= amount / 100;
                hsl.l = clamp01(hsl.l);
                return tinycolor(hsl);
            }

            // Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
            // Values outside of this range will be wrapped into this range.
            function spin(color, amount) {
                var hsl = tinycolor(color).toHsl();
                var hue = (hsl.h + amount) % 360;
                hsl.h = hue < 0 ? 360 + hue : hue;
                return tinycolor(hsl);
            }

            // Combination Functions
            // ---------------------
            // Thanks to jQuery xColor for some of the ideas behind these
            // <https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js>

            function complement(color) {
                var hsl = tinycolor(color).toHsl();
                hsl.h = (hsl.h + 180) % 360;
                return tinycolor(hsl);
            }

            function triad(color) {
                var hsl = tinycolor(color).toHsl();
                var h = hsl.h;
                return [tinycolor(color), tinycolor({ h: (h + 120) % 360, s: hsl.s, l: hsl.l }), tinycolor({ h: (h + 240) % 360, s: hsl.s, l: hsl.l })];
            }

            function tetrad(color) {
                var hsl = tinycolor(color).toHsl();
                var h = hsl.h;
                return [tinycolor(color), tinycolor({ h: (h + 90) % 360, s: hsl.s, l: hsl.l }), tinycolor({ h: (h + 180) % 360, s: hsl.s, l: hsl.l }), tinycolor({ h: (h + 270) % 360, s: hsl.s, l: hsl.l })];
            }

            function splitcomplement(color) {
                var hsl = tinycolor(color).toHsl();
                var h = hsl.h;
                return [tinycolor(color), tinycolor({ h: (h + 72) % 360, s: hsl.s, l: hsl.l }), tinycolor({ h: (h + 216) % 360, s: hsl.s, l: hsl.l })];
            }

            function analogous(color, results, slices) {
                results = results || 6;
                slices = slices || 30;

                var hsl = tinycolor(color).toHsl();
                var part = 360 / slices;
                var ret = [tinycolor(color)];

                for (hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results;) {
                    hsl.h = (hsl.h + part) % 360;
                    ret.push(tinycolor(hsl));
                }
                return ret;
            }

            function monochromatic(color, results) {
                results = results || 6;
                var hsv = tinycolor(color).toHsv();
                var h = hsv.h,
                    s = hsv.s,
                    v = hsv.v;
                var ret = [];
                var modification = 1 / results;

                while (results--) {
                    ret.push(tinycolor({ h: h, s: s, v: v }));
                    v = (v + modification) % 1;
                }

                return ret;
            }

            // Utility Functions
            // ---------------------

            tinycolor.mix = function (color1, color2, amount) {
                amount = amount === 0 ? 0 : amount || 50;

                var rgb1 = tinycolor(color1).toRgb();
                var rgb2 = tinycolor(color2).toRgb();

                var p = amount / 100;

                var rgba = {
                    r: (rgb2.r - rgb1.r) * p + rgb1.r,
                    g: (rgb2.g - rgb1.g) * p + rgb1.g,
                    b: (rgb2.b - rgb1.b) * p + rgb1.b,
                    a: (rgb2.a - rgb1.a) * p + rgb1.a
                };

                return tinycolor(rgba);
            };

            // Readability Functions
            // ---------------------
            // <http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef (WCAG Version 2)

            // `contrast`
            // Analyze the 2 colors and returns the color contrast defined by (WCAG Version 2)
            tinycolor.readability = function (color1, color2) {
                var c1 = tinycolor(color1);
                var c2 = tinycolor(color2);
                return (Math.max(c1.getLuminance(), c2.getLuminance()) + 0.05) / (Math.min(c1.getLuminance(), c2.getLuminance()) + 0.05);
            };

            // `isReadable`
            // Ensure that foreground and background color combinations meet WCAG2 guidelines.
            // The third argument is an optional Object.
            //      the 'level' property states 'AA' or 'AAA' - if missing or invalid, it defaults to 'AA';
            //      the 'size' property states 'large' or 'small' - if missing or invalid, it defaults to 'small'.
            // If the entire object is absent, isReadable defaults to {level:"AA",size:"small"}.

            // *Example*
            //    tinycolor.isReadable("#000", "#111") => false
            //    tinycolor.isReadable("#000", "#111",{level:"AA",size:"large"}) => false
            tinycolor.isReadable = function (color1, color2, wcag2) {
                var readability = tinycolor.readability(color1, color2);
                var wcag2Parms, out;

                out = false;

                wcag2Parms = validateWCAG2Parms(wcag2);
                switch (wcag2Parms.level + wcag2Parms.size) {
                    case "AAsmall":
                    case "AAAlarge":
                        out = readability >= 4.5;
                        break;
                    case "AAlarge":
                        out = readability >= 3;
                        break;
                    case "AAAsmall":
                        out = readability >= 7;
                        break;
                }
                return out;
            };

            // `mostReadable`
            // Given a base color and a list of possible foreground or background
            // colors for that base, returns the most readable color.
            // Optionally returns Black or White if the most readable color is unreadable.
            // *Example*
            //    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:false}).toHexString(); // "#112255"
            //    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:true}).toHexString();  // "#ffffff"
            //    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"large"}).toHexString(); // "#faf3f3"
            //    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"small"}).toHexString(); // "#ffffff"
            tinycolor.mostReadable = function (baseColor, colorList, args) {
                var bestColor = null;
                var bestScore = 0;
                var readability;
                var includeFallbackColors, level, size;
                args = args || {};
                includeFallbackColors = args.includeFallbackColors;
                level = args.level;
                size = args.size;

                for (var i = 0; i < colorList.length; i++) {
                    readability = tinycolor.readability(baseColor, colorList[i]);
                    if (readability > bestScore) {
                        bestScore = readability;
                        bestColor = tinycolor(colorList[i]);
                    }
                }

                if (tinycolor.isReadable(baseColor, bestColor, { "level": level, "size": size }) || !includeFallbackColors) {
                    return bestColor;
                } else {
                    args.includeFallbackColors = false;
                    return tinycolor.mostReadable(baseColor, ["#fff", "#000"], args);
                }
            };

            // Big List of Colors
            // ------------------
            // <http://www.w3.org/TR/css3-color/#svg-color>
            var names = tinycolor.names = {
                aliceblue: "f0f8ff",
                antiquewhite: "faebd7",
                aqua: "0ff",
                aquamarine: "7fffd4",
                azure: "f0ffff",
                beige: "f5f5dc",
                bisque: "ffe4c4",
                black: "000",
                blanchedalmond: "ffebcd",
                blue: "00f",
                blueviolet: "8a2be2",
                brown: "a52a2a",
                burlywood: "deb887",
                burntsienna: "ea7e5d",
                cadetblue: "5f9ea0",
                chartreuse: "7fff00",
                chocolate: "d2691e",
                coral: "ff7f50",
                cornflowerblue: "6495ed",
                cornsilk: "fff8dc",
                crimson: "dc143c",
                cyan: "0ff",
                darkblue: "00008b",
                darkcyan: "008b8b",
                darkgoldenrod: "b8860b",
                darkgray: "a9a9a9",
                darkgreen: "006400",
                darkgrey: "a9a9a9",
                darkkhaki: "bdb76b",
                darkmagenta: "8b008b",
                darkolivegreen: "556b2f",
                darkorange: "ff8c00",
                darkorchid: "9932cc",
                darkred: "8b0000",
                darksalmon: "e9967a",
                darkseagreen: "8fbc8f",
                darkslateblue: "483d8b",
                darkslategray: "2f4f4f",
                darkslategrey: "2f4f4f",
                darkturquoise: "00ced1",
                darkviolet: "9400d3",
                deeppink: "ff1493",
                deepskyblue: "00bfff",
                dimgray: "696969",
                dimgrey: "696969",
                dodgerblue: "1e90ff",
                firebrick: "b22222",
                floralwhite: "fffaf0",
                forestgreen: "228b22",
                fuchsia: "f0f",
                gainsboro: "dcdcdc",
                ghostwhite: "f8f8ff",
                gold: "ffd700",
                goldenrod: "daa520",
                gray: "808080",
                green: "008000",
                greenyellow: "adff2f",
                grey: "808080",
                honeydew: "f0fff0",
                hotpink: "ff69b4",
                indianred: "cd5c5c",
                indigo: "4b0082",
                ivory: "fffff0",
                khaki: "f0e68c",
                lavender: "e6e6fa",
                lavenderblush: "fff0f5",
                lawngreen: "7cfc00",
                lemonchiffon: "fffacd",
                lightblue: "add8e6",
                lightcoral: "f08080",
                lightcyan: "e0ffff",
                lightgoldenrodyellow: "fafad2",
                lightgray: "d3d3d3",
                lightgreen: "90ee90",
                lightgrey: "d3d3d3",
                lightpink: "ffb6c1",
                lightsalmon: "ffa07a",
                lightseagreen: "20b2aa",
                lightskyblue: "87cefa",
                lightslategray: "789",
                lightslategrey: "789",
                lightsteelblue: "b0c4de",
                lightyellow: "ffffe0",
                lime: "0f0",
                limegreen: "32cd32",
                linen: "faf0e6",
                magenta: "f0f",
                maroon: "800000",
                mediumaquamarine: "66cdaa",
                mediumblue: "0000cd",
                mediumorchid: "ba55d3",
                mediumpurple: "9370db",
                mediumseagreen: "3cb371",
                mediumslateblue: "7b68ee",
                mediumspringgreen: "00fa9a",
                mediumturquoise: "48d1cc",
                mediumvioletred: "c71585",
                midnightblue: "191970",
                mintcream: "f5fffa",
                mistyrose: "ffe4e1",
                moccasin: "ffe4b5",
                navajowhite: "ffdead",
                navy: "000080",
                oldlace: "fdf5e6",
                olive: "808000",
                olivedrab: "6b8e23",
                orange: "ffa500",
                orangered: "ff4500",
                orchid: "da70d6",
                palegoldenrod: "eee8aa",
                palegreen: "98fb98",
                paleturquoise: "afeeee",
                palevioletred: "db7093",
                papayawhip: "ffefd5",
                peachpuff: "ffdab9",
                peru: "cd853f",
                pink: "ffc0cb",
                plum: "dda0dd",
                powderblue: "b0e0e6",
                purple: "800080",
                rebeccapurple: "663399",
                red: "f00",
                rosybrown: "bc8f8f",
                royalblue: "4169e1",
                saddlebrown: "8b4513",
                salmon: "fa8072",
                sandybrown: "f4a460",
                seagreen: "2e8b57",
                seashell: "fff5ee",
                sienna: "a0522d",
                silver: "c0c0c0",
                skyblue: "87ceeb",
                slateblue: "6a5acd",
                slategray: "708090",
                slategrey: "708090",
                snow: "fffafa",
                springgreen: "00ff7f",
                steelblue: "4682b4",
                tan: "d2b48c",
                teal: "008080",
                thistle: "d8bfd8",
                tomato: "ff6347",
                turquoise: "40e0d0",
                violet: "ee82ee",
                wheat: "f5deb3",
                white: "fff",
                whitesmoke: "f5f5f5",
                yellow: "ff0",
                yellowgreen: "9acd32"
            };

            // Make it easy to access colors via `hexNames[hex]`
            var hexNames = tinycolor.hexNames = flip(names);

            // Utilities
            // ---------

            // `{ 'name1': 'val1' }` becomes `{ 'val1': 'name1' }`
            function flip(o) {
                var flipped = {};
                for (var i in o) {
                    if (o.hasOwnProperty(i)) {
                        flipped[o[i]] = i;
                    }
                }
                return flipped;
            }

            // Return a valid alpha value [0,1] with all invalid values being set to 1
            function boundAlpha(a) {
                a = parseFloat(a);

                if (isNaN(a) || a < 0 || a > 1) {
                    a = 1;
                }

                return a;
            }

            // Take input from [0, n] and return it as [0, 1]
            function bound01(n, max) {
                if (isOnePointZero(n)) {
                    n = "100%";
                }

                var processPercent = isPercentage(n);
                n = mathMin(max, mathMax(0, parseFloat(n)));

                // Automatically convert percentage into number
                if (processPercent) {
                    n = parseInt(n * max, 10) / 100;
                }

                // Handle floating point rounding errors
                if (Math.abs(n - max) < 0.000001) {
                    return 1;
                }

                // Convert into [0, 1] range if it isn't already
                return n % max / parseFloat(max);
            }

            // Force a number between 0 and 1
            function clamp01(val) {
                return mathMin(1, mathMax(0, val));
            }

            // Parse a base-16 hex value into a base-10 integer
            function parseIntFromHex(val) {
                return parseInt(val, 16);
            }

            // Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
            // <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
            function isOnePointZero(n) {
                return typeof n == "string" && n.indexOf('.') != -1 && parseFloat(n) === 1;
            }

            // Check to see if string passed in is a percentage
            function isPercentage(n) {
                return typeof n === "string" && n.indexOf('%') != -1;
            }

            // Force a hex value to have 2 characters
            function pad2(c) {
                return c.length == 1 ? '0' + c : '' + c;
            }

            // Replace a decimal with it's percentage value
            function convertToPercentage(n) {
                if (n <= 1) {
                    n = n * 100 + "%";
                }

                return n;
            }

            // Converts a decimal to a hex value
            function convertDecimalToHex(d) {
                return Math.round(parseFloat(d) * 255).toString(16);
            }
            // Converts a hex value to a decimal
            function convertHexToDecimal(h) {
                return parseIntFromHex(h) / 255;
            }

            var matchers = function () {

                // <http://www.w3.org/TR/css3-values/#integers>
                var CSS_INTEGER = "[-\\+]?\\d+%?";

                // <http://www.w3.org/TR/css3-values/#number-value>
                var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";

                // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
                var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";

                // Actual matching.
                // Parentheses and commas are optional, but not required.
                // Whitespace can take the place of commas or opening paren
                var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
                var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";

                return {
                    CSS_UNIT: new RegExp(CSS_UNIT),
                    rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
                    rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
                    hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
                    hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
                    hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
                    hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
                    hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
                    hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
                    hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
                    hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
                };
            }();

            // `isValidCSSUnit`
            // Take in a single string / number and check to see if it looks like a CSS unit
            // (see `matchers` above for definition).
            function isValidCSSUnit(color) {
                return !!matchers.CSS_UNIT.exec(color);
            }

            // `stringInputToObject`
            // Permissive string parsing.  Take in a number of formats, and output an object
            // based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
            function stringInputToObject(color) {

                color = color.replace(trimLeft, '').replace(trimRight, '').toLowerCase();
                var named = false;
                if (names[color]) {
                    color = names[color];
                    named = true;
                } else if (color == 'transparent') {
                    return { r: 0, g: 0, b: 0, a: 0, format: "name" };
                }

                // Try to match string input using regular expressions.
                // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
                // Just return an object and let the conversion functions handle that.
                // This way the result will be the same whether the tinycolor is initialized with string or object.
                var match;
                if (match = matchers.rgb.exec(color)) {
                    return { r: match[1], g: match[2], b: match[3] };
                }
                if (match = matchers.rgba.exec(color)) {
                    return { r: match[1], g: match[2], b: match[3], a: match[4] };
                }
                if (match = matchers.hsl.exec(color)) {
                    return { h: match[1], s: match[2], l: match[3] };
                }
                if (match = matchers.hsla.exec(color)) {
                    return { h: match[1], s: match[2], l: match[3], a: match[4] };
                }
                if (match = matchers.hsv.exec(color)) {
                    return { h: match[1], s: match[2], v: match[3] };
                }
                if (match = matchers.hsva.exec(color)) {
                    return { h: match[1], s: match[2], v: match[3], a: match[4] };
                }
                if (match = matchers.hex8.exec(color)) {
                    return {
                        r: parseIntFromHex(match[1]),
                        g: parseIntFromHex(match[2]),
                        b: parseIntFromHex(match[3]),
                        a: convertHexToDecimal(match[4]),
                        format: named ? "name" : "hex8"
                    };
                }
                if (match = matchers.hex6.exec(color)) {
                    return {
                        r: parseIntFromHex(match[1]),
                        g: parseIntFromHex(match[2]),
                        b: parseIntFromHex(match[3]),
                        format: named ? "name" : "hex"
                    };
                }
                if (match = matchers.hex4.exec(color)) {
                    return {
                        r: parseIntFromHex(match[1] + '' + match[1]),
                        g: parseIntFromHex(match[2] + '' + match[2]),
                        b: parseIntFromHex(match[3] + '' + match[3]),
                        a: convertHexToDecimal(match[4] + '' + match[4]),
                        format: named ? "name" : "hex8"
                    };
                }
                if (match = matchers.hex3.exec(color)) {
                    return {
                        r: parseIntFromHex(match[1] + '' + match[1]),
                        g: parseIntFromHex(match[2] + '' + match[2]),
                        b: parseIntFromHex(match[3] + '' + match[3]),
                        format: named ? "name" : "hex"
                    };
                }

                return false;
            }

            function validateWCAG2Parms(parms) {
                // return valid WCAG2 parms for isReadable.
                // If input parms are invalid, return {"level":"AA", "size":"small"}
                var level, size;
                parms = parms || { "level": "AA", "size": "small" };
                level = (parms.level || "AA").toUpperCase();
                size = (parms.size || "small").toLowerCase();
                if (level !== "AA" && level !== "AAA") {
                    level = "AA";
                }
                if (size !== "small" && size !== "large") {
                    size = "small";
                }
                return { "level": level, "size": size };
            }

            // Node: Export function
            if (typeof module !== "undefined" && module.exports) {
                module.exports = tinycolor;
            }
            // AMD/requirejs: Define the module
            else if (typeof define === 'function' && define.amd) {
                    define(function () {
                        return tinycolor;
                    });
                }
                // Browser: Expose to window
                else {
                        window.tinycolor = tinycolor;
                    }
        })(Math);
    })(this);

    return _retrieveGlobal();
});
System.registerDynamic("npm:spectrum-colorpicker@1.8.0.json", [], true, function() {
  return {
    "main": "spectrum.js",
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
      "build/*": {
        "globals": {
          "process": null
        }
      },
      "docs/*": {
        "globals": {
          "process": null
        }
      },
      "example/*": {
        "globals": {
          "process": null
        }
      },
      "i18n/*": {
        "globals": {
          "process": null
        }
      },
      "index.html": {
        "globals": {
          "process": null
        }
      },
      "spectrum.css": {
        "globals": {
          "process": null
        }
      },
      "spectrum.js": {
        "globals": {
          "process": null
        }
      },
      "test/*": {
        "globals": {
          "process": null
        }
      },
      "themes/*": {
        "globals": {
          "process": null
        }
      }
    }
  };
});

System.registerDynamic('npm:spectrum-colorpicker@1.8.0/spectrum.js', [], false, function ($__require, $__exports, $__module) {
    var _retrieveGlobal = System.registry.get("@@global-helpers").prepareGlobal($__module.id, null, {});

    (function ($__global) {
        // Spectrum Colorpicker v1.8.0
        // https://github.com/bgrins/spectrum
        // Author: Brian Grinstead
        // License: MIT

        (function (factory) {
            "use strict";

            if (typeof define === 'function' && define.amd) {
                // AMD
                define(['jquery'], factory);
            } else if (typeof exports == "object" && typeof module == "object") {
                // CommonJS
                module.exports = factory(require('jquery'));
            } else {
                // Browser
                factory(jQuery);
            }
        })(function ($, undefined) {
            "use strict";

            var defaultOpts = {

                // Callbacks
                beforeShow: noop,
                move: noop,
                change: noop,
                show: noop,
                hide: noop,

                // Options
                color: false,
                flat: false,
                showInput: false,
                allowEmpty: false,
                showButtons: true,
                clickoutFiresChange: true,
                showInitial: false,
                showPalette: false,
                showPaletteOnly: false,
                hideAfterPaletteSelect: false,
                togglePaletteOnly: false,
                showSelectionPalette: true,
                localStorageKey: false,
                appendTo: "body",
                maxSelectionSize: 7,
                cancelText: "cancel",
                chooseText: "choose",
                togglePaletteMoreText: "more",
                togglePaletteLessText: "less",
                clearText: "Clear Color Selection",
                noColorSelectedText: "No Color Selected",
                preferredFormat: false,
                className: "", // Deprecated - use containerClassName and replacerClassName instead.
                containerClassName: "",
                replacerClassName: "",
                showAlpha: false,
                theme: "sp-light",
                palette: [["#ffffff", "#000000", "#ff0000", "#ff8000", "#ffff00", "#008000", "#0000ff", "#4b0082", "#9400d3"]],
                selectionPalette: [],
                disabled: false,
                offset: null
            },
                spectrums = [],
                IE = !!/msie/i.exec(window.navigator.userAgent),
                rgbaSupport = function () {
                function contains(str, substr) {
                    return !!~('' + str).indexOf(substr);
                }

                var elem = document.createElement('div');
                var style = elem.style;
                style.cssText = 'background-color:rgba(0,0,0,.5)';
                return contains(style.backgroundColor, 'rgba') || contains(style.backgroundColor, 'hsla');
            }(),
                replaceInput = ["<div class='sp-replacer'>", "<div class='sp-preview'><div class='sp-preview-inner'></div></div>", "<div class='sp-dd'>&#9660;</div>", "</div>"].join(''),
                markup = function () {

                // IE does not support gradients with multiple stops, so we need to simulate
                //  that for the rainbow slider with 8 divs that each have a single gradient
                var gradientFix = "";
                if (IE) {
                    for (var i = 1; i <= 6; i++) {
                        gradientFix += "<div class='sp-" + i + "'></div>";
                    }
                }

                return ["<div class='sp-container sp-hidden'>", "<div class='sp-palette-container'>", "<div class='sp-palette sp-thumb sp-cf'></div>", "<div class='sp-palette-button-container sp-cf'>", "<button type='button' class='sp-palette-toggle'></button>", "</div>", "</div>", "<div class='sp-picker-container'>", "<div class='sp-top sp-cf'>", "<div class='sp-fill'></div>", "<div class='sp-top-inner'>", "<div class='sp-color'>", "<div class='sp-sat'>", "<div class='sp-val'>", "<div class='sp-dragger'></div>", "</div>", "</div>", "</div>", "<div class='sp-clear sp-clear-display'>", "</div>", "<div class='sp-hue'>", "<div class='sp-slider'></div>", gradientFix, "</div>", "</div>", "<div class='sp-alpha'><div class='sp-alpha-inner'><div class='sp-alpha-handle'></div></div></div>", "</div>", "<div class='sp-input-container sp-cf'>", "<input class='sp-input' type='text' spellcheck='false'  />", "</div>", "<div class='sp-initial sp-thumb sp-cf'></div>", "<div class='sp-button-container sp-cf'>", "<a class='sp-cancel' href='#'></a>", "<button type='button' class='sp-choose'></button>", "</div>", "</div>", "</div>"].join("");
            }();

            function paletteTemplate(p, color, className, opts) {
                var html = [];
                for (var i = 0; i < p.length; i++) {
                    var current = p[i];
                    if (current) {
                        var tiny = tinycolor(current);
                        var c = tiny.toHsl().l < 0.5 ? "sp-thumb-el sp-thumb-dark" : "sp-thumb-el sp-thumb-light";
                        c += tinycolor.equals(color, current) ? " sp-thumb-active" : "";
                        var formattedString = tiny.toString(opts.preferredFormat || "rgb");
                        var swatchStyle = rgbaSupport ? "background-color:" + tiny.toRgbString() : "filter:" + tiny.toFilter();
                        html.push('<span title="' + formattedString + '" data-color="' + tiny.toRgbString() + '" class="' + c + '"><span class="sp-thumb-inner" style="' + swatchStyle + ';" /></span>');
                    } else {
                        var cls = 'sp-clear-display';
                        html.push($('<div />').append($('<span data-color="" style="background-color:transparent;" class="' + cls + '"></span>').attr('title', opts.noColorSelectedText)).html());
                    }
                }
                return "<div class='sp-cf " + className + "'>" + html.join('') + "</div>";
            }

            function hideAll() {
                for (var i = 0; i < spectrums.length; i++) {
                    if (spectrums[i]) {
                        spectrums[i].hide();
                    }
                }
            }

            function instanceOptions(o, callbackContext) {
                var opts = $.extend({}, defaultOpts, o);
                opts.callbacks = {
                    'move': bind(opts.move, callbackContext),
                    'change': bind(opts.change, callbackContext),
                    'show': bind(opts.show, callbackContext),
                    'hide': bind(opts.hide, callbackContext),
                    'beforeShow': bind(opts.beforeShow, callbackContext)
                };

                return opts;
            }

            function spectrum(element, o) {

                var opts = instanceOptions(o, element),
                    flat = opts.flat,
                    showSelectionPalette = opts.showSelectionPalette,
                    localStorageKey = opts.localStorageKey,
                    theme = opts.theme,
                    callbacks = opts.callbacks,
                    resize = throttle(reflow, 10),
                    visible = false,
                    isDragging = false,
                    dragWidth = 0,
                    dragHeight = 0,
                    dragHelperHeight = 0,
                    slideHeight = 0,
                    slideWidth = 0,
                    alphaWidth = 0,
                    alphaSlideHelperWidth = 0,
                    slideHelperHeight = 0,
                    currentHue = 0,
                    currentSaturation = 0,
                    currentValue = 0,
                    currentAlpha = 1,
                    palette = [],
                    paletteArray = [],
                    paletteLookup = {},
                    selectionPalette = opts.selectionPalette.slice(0),
                    maxSelectionSize = opts.maxSelectionSize,
                    draggingClass = "sp-dragging",
                    shiftMovementDirection = null;

                var doc = element.ownerDocument,
                    body = doc.body,
                    boundElement = $(element),
                    disabled = false,
                    container = $(markup, doc).addClass(theme),
                    pickerContainer = container.find(".sp-picker-container"),
                    dragger = container.find(".sp-color"),
                    dragHelper = container.find(".sp-dragger"),
                    slider = container.find(".sp-hue"),
                    slideHelper = container.find(".sp-slider"),
                    alphaSliderInner = container.find(".sp-alpha-inner"),
                    alphaSlider = container.find(".sp-alpha"),
                    alphaSlideHelper = container.find(".sp-alpha-handle"),
                    textInput = container.find(".sp-input"),
                    paletteContainer = container.find(".sp-palette"),
                    initialColorContainer = container.find(".sp-initial"),
                    cancelButton = container.find(".sp-cancel"),
                    clearButton = container.find(".sp-clear"),
                    chooseButton = container.find(".sp-choose"),
                    toggleButton = container.find(".sp-palette-toggle"),
                    isInput = boundElement.is("input"),
                    isInputTypeColor = isInput && boundElement.attr("type") === "color" && inputTypeColorSupport(),
                    shouldReplace = isInput && !flat,
                    replacer = shouldReplace ? $(replaceInput).addClass(theme).addClass(opts.className).addClass(opts.replacerClassName) : $([]),
                    offsetElement = shouldReplace ? replacer : boundElement,
                    previewElement = replacer.find(".sp-preview-inner"),
                    initialColor = opts.color || isInput && boundElement.val(),
                    colorOnShow = false,
                    currentPreferredFormat = opts.preferredFormat,
                    clickoutFiresChange = !opts.showButtons || opts.clickoutFiresChange,
                    isEmpty = !initialColor,
                    allowEmpty = opts.allowEmpty && !isInputTypeColor;

                function applyOptions() {

                    if (opts.showPaletteOnly) {
                        opts.showPalette = true;
                    }

                    toggleButton.text(opts.showPaletteOnly ? opts.togglePaletteMoreText : opts.togglePaletteLessText);

                    if (opts.palette) {
                        palette = opts.palette.slice(0);
                        paletteArray = $.isArray(palette[0]) ? palette : [palette];
                        paletteLookup = {};
                        for (var i = 0; i < paletteArray.length; i++) {
                            for (var j = 0; j < paletteArray[i].length; j++) {
                                var rgb = tinycolor(paletteArray[i][j]).toRgbString();
                                paletteLookup[rgb] = true;
                            }
                        }
                    }

                    container.toggleClass("sp-flat", flat);
                    container.toggleClass("sp-input-disabled", !opts.showInput);
                    container.toggleClass("sp-alpha-enabled", opts.showAlpha);
                    container.toggleClass("sp-clear-enabled", allowEmpty);
                    container.toggleClass("sp-buttons-disabled", !opts.showButtons);
                    container.toggleClass("sp-palette-buttons-disabled", !opts.togglePaletteOnly);
                    container.toggleClass("sp-palette-disabled", !opts.showPalette);
                    container.toggleClass("sp-palette-only", opts.showPaletteOnly);
                    container.toggleClass("sp-initial-disabled", !opts.showInitial);
                    container.addClass(opts.className).addClass(opts.containerClassName);

                    reflow();
                }

                function initialize() {

                    if (IE) {
                        container.find("*:not(input)").attr("unselectable", "on");
                    }

                    applyOptions();

                    if (shouldReplace) {
                        boundElement.after(replacer).hide();
                    }

                    if (!allowEmpty) {
                        clearButton.hide();
                    }

                    if (flat) {
                        boundElement.after(container).hide();
                    } else {

                        var appendTo = opts.appendTo === "parent" ? boundElement.parent() : $(opts.appendTo);
                        if (appendTo.length !== 1) {
                            appendTo = $("body");
                        }

                        appendTo.append(container);
                    }

                    updateSelectionPaletteFromStorage();

                    offsetElement.bind("click.spectrum touchstart.spectrum", function (e) {
                        if (!disabled) {
                            toggle();
                        }

                        e.stopPropagation();

                        if (!$(e.target).is("input")) {
                            e.preventDefault();
                        }
                    });

                    if (boundElement.is(":disabled") || opts.disabled === true) {
                        disable();
                    }

                    // Prevent clicks from bubbling up to document.  This would cause it to be hidden.
                    container.click(stopPropagation);

                    // Handle user typed input
                    textInput.change(setFromTextInput);
                    textInput.bind("paste", function () {
                        setTimeout(setFromTextInput, 1);
                    });
                    textInput.keydown(function (e) {
                        if (e.keyCode == 13) {
                            setFromTextInput();
                        }
                    });

                    cancelButton.text(opts.cancelText);
                    cancelButton.bind("click.spectrum", function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                        revert();
                        hide();
                    });

                    clearButton.attr("title", opts.clearText);
                    clearButton.bind("click.spectrum", function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                        isEmpty = true;
                        move();

                        if (flat) {
                            //for the flat style, this is a change event
                            updateOriginalInput(true);
                        }
                    });

                    chooseButton.text(opts.chooseText);
                    chooseButton.bind("click.spectrum", function (e) {
                        e.stopPropagation();
                        e.preventDefault();

                        if (IE && textInput.is(":focus")) {
                            textInput.trigger('change');
                        }

                        if (isValid()) {
                            updateOriginalInput(true);
                            hide();
                        }
                    });

                    toggleButton.text(opts.showPaletteOnly ? opts.togglePaletteMoreText : opts.togglePaletteLessText);
                    toggleButton.bind("click.spectrum", function (e) {
                        e.stopPropagation();
                        e.preventDefault();

                        opts.showPaletteOnly = !opts.showPaletteOnly;

                        // To make sure the Picker area is drawn on the right, next to the
                        // Palette area (and not below the palette), first move the Palette
                        // to the left to make space for the picker, plus 5px extra.
                        // The 'applyOptions' function puts the whole container back into place
                        // and takes care of the button-text and the sp-palette-only CSS class.
                        if (!opts.showPaletteOnly && !flat) {
                            container.css('left', '-=' + (pickerContainer.outerWidth(true) + 5));
                        }
                        applyOptions();
                    });

                    draggable(alphaSlider, function (dragX, dragY, e) {
                        currentAlpha = dragX / alphaWidth;
                        isEmpty = false;
                        if (e.shiftKey) {
                            currentAlpha = Math.round(currentAlpha * 10) / 10;
                        }

                        move();
                    }, dragStart, dragStop);

                    draggable(slider, function (dragX, dragY) {
                        currentHue = parseFloat(dragY / slideHeight);
                        isEmpty = false;
                        if (!opts.showAlpha) {
                            currentAlpha = 1;
                        }
                        move();
                    }, dragStart, dragStop);

                    draggable(dragger, function (dragX, dragY, e) {

                        // shift+drag should snap the movement to either the x or y axis.
                        if (!e.shiftKey) {
                            shiftMovementDirection = null;
                        } else if (!shiftMovementDirection) {
                            var oldDragX = currentSaturation * dragWidth;
                            var oldDragY = dragHeight - currentValue * dragHeight;
                            var furtherFromX = Math.abs(dragX - oldDragX) > Math.abs(dragY - oldDragY);

                            shiftMovementDirection = furtherFromX ? "x" : "y";
                        }

                        var setSaturation = !shiftMovementDirection || shiftMovementDirection === "x";
                        var setValue = !shiftMovementDirection || shiftMovementDirection === "y";

                        if (setSaturation) {
                            currentSaturation = parseFloat(dragX / dragWidth);
                        }
                        if (setValue) {
                            currentValue = parseFloat((dragHeight - dragY) / dragHeight);
                        }

                        isEmpty = false;
                        if (!opts.showAlpha) {
                            currentAlpha = 1;
                        }

                        move();
                    }, dragStart, dragStop);

                    if (!!initialColor) {
                        set(initialColor);

                        // In case color was black - update the preview UI and set the format
                        // since the set function will not run (default color is black).
                        updateUI();
                        currentPreferredFormat = opts.preferredFormat || tinycolor(initialColor).format;

                        addColorToSelectionPalette(initialColor);
                    } else {
                        updateUI();
                    }

                    if (flat) {
                        show();
                    }

                    function paletteElementClick(e) {
                        if (e.data && e.data.ignore) {
                            set($(e.target).closest(".sp-thumb-el").data("color"));
                            move();
                        } else {
                            set($(e.target).closest(".sp-thumb-el").data("color"));
                            move();
                            updateOriginalInput(true);
                            if (opts.hideAfterPaletteSelect) {
                                hide();
                            }
                        }

                        return false;
                    }

                    var paletteEvent = IE ? "mousedown.spectrum" : "click.spectrum touchstart.spectrum";
                    paletteContainer.delegate(".sp-thumb-el", paletteEvent, paletteElementClick);
                    initialColorContainer.delegate(".sp-thumb-el:nth-child(1)", paletteEvent, { ignore: true }, paletteElementClick);
                }

                function updateSelectionPaletteFromStorage() {

                    if (localStorageKey && window.localStorage) {

                        // Migrate old palettes over to new format.  May want to remove this eventually.
                        try {
                            var oldPalette = window.localStorage[localStorageKey].split(",#");
                            if (oldPalette.length > 1) {
                                delete window.localStorage[localStorageKey];
                                $.each(oldPalette, function (i, c) {
                                    addColorToSelectionPalette(c);
                                });
                            }
                        } catch (e) {}

                        try {
                            selectionPalette = window.localStorage[localStorageKey].split(";");
                        } catch (e) {}
                    }
                }

                function addColorToSelectionPalette(color) {
                    if (showSelectionPalette) {
                        var rgb = tinycolor(color).toRgbString();
                        if (!paletteLookup[rgb] && $.inArray(rgb, selectionPalette) === -1) {
                            selectionPalette.push(rgb);
                            while (selectionPalette.length > maxSelectionSize) {
                                selectionPalette.shift();
                            }
                        }

                        if (localStorageKey && window.localStorage) {
                            try {
                                window.localStorage[localStorageKey] = selectionPalette.join(";");
                            } catch (e) {}
                        }
                    }
                }

                function getUniqueSelectionPalette() {
                    var unique = [];
                    if (opts.showPalette) {
                        for (var i = 0; i < selectionPalette.length; i++) {
                            var rgb = tinycolor(selectionPalette[i]).toRgbString();

                            if (!paletteLookup[rgb]) {
                                unique.push(selectionPalette[i]);
                            }
                        }
                    }

                    return unique.reverse().slice(0, opts.maxSelectionSize);
                }

                function drawPalette() {

                    var currentColor = get();

                    var html = $.map(paletteArray, function (palette, i) {
                        return paletteTemplate(palette, currentColor, "sp-palette-row sp-palette-row-" + i, opts);
                    });

                    updateSelectionPaletteFromStorage();

                    if (selectionPalette) {
                        html.push(paletteTemplate(getUniqueSelectionPalette(), currentColor, "sp-palette-row sp-palette-row-selection", opts));
                    }

                    paletteContainer.html(html.join(""));
                }

                function drawInitial() {
                    if (opts.showInitial) {
                        var initial = colorOnShow;
                        var current = get();
                        initialColorContainer.html(paletteTemplate([initial, current], current, "sp-palette-row-initial", opts));
                    }
                }

                function dragStart() {
                    if (dragHeight <= 0 || dragWidth <= 0 || slideHeight <= 0) {
                        reflow();
                    }
                    isDragging = true;
                    container.addClass(draggingClass);
                    shiftMovementDirection = null;
                    boundElement.trigger('dragstart.spectrum', [get()]);
                }

                function dragStop() {
                    isDragging = false;
                    container.removeClass(draggingClass);
                    boundElement.trigger('dragstop.spectrum', [get()]);
                }

                function setFromTextInput() {

                    var value = textInput.val();

                    if ((value === null || value === "") && allowEmpty) {
                        set(null);
                        updateOriginalInput(true);
                    } else {
                        var tiny = tinycolor(value);
                        if (tiny.isValid()) {
                            set(tiny);
                            updateOriginalInput(true);
                        } else {
                            textInput.addClass("sp-validation-error");
                        }
                    }
                }

                function toggle() {
                    if (visible) {
                        hide();
                    } else {
                        show();
                    }
                }

                function show() {
                    var event = $.Event('beforeShow.spectrum');

                    if (visible) {
                        reflow();
                        return;
                    }

                    boundElement.trigger(event, [get()]);

                    if (callbacks.beforeShow(get()) === false || event.isDefaultPrevented()) {
                        return;
                    }

                    hideAll();
                    visible = true;

                    $(doc).bind("keydown.spectrum", onkeydown);
                    $(doc).bind("click.spectrum", clickout);
                    $(window).bind("resize.spectrum", resize);
                    replacer.addClass("sp-active");
                    container.removeClass("sp-hidden");

                    reflow();
                    updateUI();

                    colorOnShow = get();

                    drawInitial();
                    callbacks.show(colorOnShow);
                    boundElement.trigger('show.spectrum', [colorOnShow]);
                }

                function onkeydown(e) {
                    // Close on ESC
                    if (e.keyCode === 27) {
                        hide();
                    }
                }

                function clickout(e) {
                    // Return on right click.
                    if (e.button == 2) {
                        return;
                    }

                    // If a drag event was happening during the mouseup, don't hide
                    // on click.
                    if (isDragging) {
                        return;
                    }

                    if (clickoutFiresChange) {
                        updateOriginalInput(true);
                    } else {
                        revert();
                    }
                    hide();
                }

                function hide() {
                    // Return if hiding is unnecessary
                    if (!visible || flat) {
                        return;
                    }
                    visible = false;

                    $(doc).unbind("keydown.spectrum", onkeydown);
                    $(doc).unbind("click.spectrum", clickout);
                    $(window).unbind("resize.spectrum", resize);

                    replacer.removeClass("sp-active");
                    container.addClass("sp-hidden");

                    callbacks.hide(get());
                    boundElement.trigger('hide.spectrum', [get()]);
                }

                function revert() {
                    set(colorOnShow, true);
                }

                function set(color, ignoreFormatChange) {
                    if (tinycolor.equals(color, get())) {
                        // Update UI just in case a validation error needs
                        // to be cleared.
                        updateUI();
                        return;
                    }

                    var newColor, newHsv;
                    if (!color && allowEmpty) {
                        isEmpty = true;
                    } else {
                        isEmpty = false;
                        newColor = tinycolor(color);
                        newHsv = newColor.toHsv();

                        currentHue = newHsv.h % 360 / 360;
                        currentSaturation = newHsv.s;
                        currentValue = newHsv.v;
                        currentAlpha = newHsv.a;
                    }
                    updateUI();

                    if (newColor && newColor.isValid() && !ignoreFormatChange) {
                        currentPreferredFormat = opts.preferredFormat || newColor.getFormat();
                    }
                }

                function get(opts) {
                    opts = opts || {};

                    if (allowEmpty && isEmpty) {
                        return null;
                    }

                    return tinycolor.fromRatio({
                        h: currentHue,
                        s: currentSaturation,
                        v: currentValue,
                        a: Math.round(currentAlpha * 100) / 100
                    }, { format: opts.format || currentPreferredFormat });
                }

                function isValid() {
                    return !textInput.hasClass("sp-validation-error");
                }

                function move() {
                    updateUI();

                    callbacks.move(get());
                    boundElement.trigger('move.spectrum', [get()]);
                }

                function updateUI() {

                    textInput.removeClass("sp-validation-error");

                    updateHelperLocations();

                    // Update dragger background color (gradients take care of saturation and value).
                    var flatColor = tinycolor.fromRatio({ h: currentHue, s: 1, v: 1 });
                    dragger.css("background-color", flatColor.toHexString());

                    // Get a format that alpha will be included in (hex and names ignore alpha)
                    var format = currentPreferredFormat;
                    if (currentAlpha < 1 && !(currentAlpha === 0 && format === "name")) {
                        if (format === "hex" || format === "hex3" || format === "hex6" || format === "name") {
                            format = "rgb";
                        }
                    }

                    var realColor = get({ format: format }),
                        displayColor = '';

                    //reset background info for preview element
                    previewElement.removeClass("sp-clear-display");
                    previewElement.css('background-color', 'transparent');

                    if (!realColor && allowEmpty) {
                        // Update the replaced elements background with icon indicating no color selection
                        previewElement.addClass("sp-clear-display");
                    } else {
                        var realHex = realColor.toHexString(),
                            realRgb = realColor.toRgbString();

                        // Update the replaced elements background color (with actual selected color)
                        if (rgbaSupport || realColor.alpha === 1) {
                            previewElement.css("background-color", realRgb);
                        } else {
                            previewElement.css("background-color", "transparent");
                            previewElement.css("filter", realColor.toFilter());
                        }

                        if (opts.showAlpha) {
                            var rgb = realColor.toRgb();
                            rgb.a = 0;
                            var realAlpha = tinycolor(rgb).toRgbString();
                            var gradient = "linear-gradient(left, " + realAlpha + ", " + realHex + ")";

                            if (IE) {
                                alphaSliderInner.css("filter", tinycolor(realAlpha).toFilter({ gradientType: 1 }, realHex));
                            } else {
                                alphaSliderInner.css("background", "-webkit-" + gradient);
                                alphaSliderInner.css("background", "-moz-" + gradient);
                                alphaSliderInner.css("background", "-ms-" + gradient);
                                // Use current syntax gradient on unprefixed property.
                                alphaSliderInner.css("background", "linear-gradient(to right, " + realAlpha + ", " + realHex + ")");
                            }
                        }

                        displayColor = realColor.toString(format);
                    }

                    // Update the text entry input as it changes happen
                    if (opts.showInput) {
                        textInput.val(displayColor);
                    }

                    if (opts.showPalette) {
                        drawPalette();
                    }

                    drawInitial();
                }

                function updateHelperLocations() {
                    var s = currentSaturation;
                    var v = currentValue;

                    if (allowEmpty && isEmpty) {
                        //if selected color is empty, hide the helpers
                        alphaSlideHelper.hide();
                        slideHelper.hide();
                        dragHelper.hide();
                    } else {
                        //make sure helpers are visible
                        alphaSlideHelper.show();
                        slideHelper.show();
                        dragHelper.show();

                        // Where to show the little circle in that displays your current selected color
                        var dragX = s * dragWidth;
                        var dragY = dragHeight - v * dragHeight;
                        dragX = Math.max(-dragHelperHeight, Math.min(dragWidth - dragHelperHeight, dragX - dragHelperHeight));
                        dragY = Math.max(-dragHelperHeight, Math.min(dragHeight - dragHelperHeight, dragY - dragHelperHeight));
                        dragHelper.css({
                            "top": dragY + "px",
                            "left": dragX + "px"
                        });

                        var alphaX = currentAlpha * alphaWidth;
                        alphaSlideHelper.css({
                            "left": alphaX - alphaSlideHelperWidth / 2 + "px"
                        });

                        // Where to show the bar that displays your current selected hue
                        var slideY = currentHue * slideHeight;
                        slideHelper.css({
                            "top": slideY - slideHelperHeight + "px"
                        });
                    }
                }

                function updateOriginalInput(fireCallback) {
                    var color = get(),
                        displayColor = '',
                        hasChanged = !tinycolor.equals(color, colorOnShow);

                    if (color) {
                        displayColor = color.toString(currentPreferredFormat);
                        // Update the selection palette with the current color
                        addColorToSelectionPalette(color);
                    }

                    if (isInput) {
                        boundElement.val(displayColor);
                    }

                    if (fireCallback && hasChanged) {
                        callbacks.change(color);
                        boundElement.trigger('change', [color]);
                    }
                }

                function reflow() {
                    if (!visible) {
                        return; // Calculations would be useless and wouldn't be reliable anyways
                    }
                    dragWidth = dragger.width();
                    dragHeight = dragger.height();
                    dragHelperHeight = dragHelper.height();
                    slideWidth = slider.width();
                    slideHeight = slider.height();
                    slideHelperHeight = slideHelper.height();
                    alphaWidth = alphaSlider.width();
                    alphaSlideHelperWidth = alphaSlideHelper.width();

                    if (!flat) {
                        container.css("position", "absolute");
                        if (opts.offset) {
                            container.offset(opts.offset);
                        } else {
                            container.offset(getOffset(container, offsetElement));
                        }
                    }

                    updateHelperLocations();

                    if (opts.showPalette) {
                        drawPalette();
                    }

                    boundElement.trigger('reflow.spectrum');
                }

                function destroy() {
                    boundElement.show();
                    offsetElement.unbind("click.spectrum touchstart.spectrum");
                    container.remove();
                    replacer.remove();
                    spectrums[spect.id] = null;
                }

                function option(optionName, optionValue) {
                    if (optionName === undefined) {
                        return $.extend({}, opts);
                    }
                    if (optionValue === undefined) {
                        return opts[optionName];
                    }

                    opts[optionName] = optionValue;

                    if (optionName === "preferredFormat") {
                        currentPreferredFormat = opts.preferredFormat;
                    }
                    applyOptions();
                }

                function enable() {
                    disabled = false;
                    boundElement.attr("disabled", false);
                    offsetElement.removeClass("sp-disabled");
                }

                function disable() {
                    hide();
                    disabled = true;
                    boundElement.attr("disabled", true);
                    offsetElement.addClass("sp-disabled");
                }

                function setOffset(coord) {
                    opts.offset = coord;
                    reflow();
                }

                initialize();

                var spect = {
                    show: show,
                    hide: hide,
                    toggle: toggle,
                    reflow: reflow,
                    option: option,
                    enable: enable,
                    disable: disable,
                    offset: setOffset,
                    set: function (c) {
                        set(c);
                        updateOriginalInput();
                    },
                    get: get,
                    destroy: destroy,
                    container: container
                };

                spect.id = spectrums.push(spect) - 1;

                return spect;
            }

            /**
            * checkOffset - get the offset below/above and left/right element depending on screen position
            * Thanks https://github.com/jquery/jquery-ui/blob/master/ui/jquery.ui.datepicker.js
            */
            function getOffset(picker, input) {
                var extraY = 0;
                var dpWidth = picker.outerWidth();
                var dpHeight = picker.outerHeight();
                var inputHeight = input.outerHeight();
                var doc = picker[0].ownerDocument;
                var docElem = doc.documentElement;
                var viewWidth = docElem.clientWidth + $(doc).scrollLeft();
                var viewHeight = docElem.clientHeight + $(doc).scrollTop();
                var offset = input.offset();
                offset.top += inputHeight;

                offset.left -= Math.min(offset.left, offset.left + dpWidth > viewWidth && viewWidth > dpWidth ? Math.abs(offset.left + dpWidth - viewWidth) : 0);

                offset.top -= Math.min(offset.top, offset.top + dpHeight > viewHeight && viewHeight > dpHeight ? Math.abs(dpHeight + inputHeight - extraY) : extraY);

                return offset;
            }

            /**
            * noop - do nothing
            */
            function noop() {}

            /**
            * stopPropagation - makes the code only doing this a little easier to read in line
            */
            function stopPropagation(e) {
                e.stopPropagation();
            }

            /**
            * Create a function bound to a given object
            * Thanks to underscore.js
            */
            function bind(func, obj) {
                var slice = Array.prototype.slice;
                var args = slice.call(arguments, 2);
                return function () {
                    return func.apply(obj, args.concat(slice.call(arguments)));
                };
            }

            /**
            * Lightweight drag helper.  Handles containment within the element, so that
            * when dragging, the x is within [0,element.width] and y is within [0,element.height]
            */
            function draggable(element, onmove, onstart, onstop) {
                onmove = onmove || function () {};
                onstart = onstart || function () {};
                onstop = onstop || function () {};
                var doc = document;
                var dragging = false;
                var offset = {};
                var maxHeight = 0;
                var maxWidth = 0;
                var hasTouch = 'ontouchstart' in window;

                var duringDragEvents = {};
                duringDragEvents["selectstart"] = prevent;
                duringDragEvents["dragstart"] = prevent;
                duringDragEvents["touchmove mousemove"] = move;
                duringDragEvents["touchend mouseup"] = stop;

                function prevent(e) {
                    if (e.stopPropagation) {
                        e.stopPropagation();
                    }
                    if (e.preventDefault) {
                        e.preventDefault();
                    }
                    e.returnValue = false;
                }

                function move(e) {
                    if (dragging) {
                        // Mouseup happened outside of window
                        if (IE && doc.documentMode < 9 && !e.button) {
                            return stop();
                        }

                        var t0 = e.originalEvent && e.originalEvent.touches && e.originalEvent.touches[0];
                        var pageX = t0 && t0.pageX || e.pageX;
                        var pageY = t0 && t0.pageY || e.pageY;

                        var dragX = Math.max(0, Math.min(pageX - offset.left, maxWidth));
                        var dragY = Math.max(0, Math.min(pageY - offset.top, maxHeight));

                        if (hasTouch) {
                            // Stop scrolling in iOS
                            prevent(e);
                        }

                        onmove.apply(element, [dragX, dragY, e]);
                    }
                }

                function start(e) {
                    var rightclick = e.which ? e.which == 3 : e.button == 2;

                    if (!rightclick && !dragging) {
                        if (onstart.apply(element, arguments) !== false) {
                            dragging = true;
                            maxHeight = $(element).height();
                            maxWidth = $(element).width();
                            offset = $(element).offset();

                            $(doc).bind(duringDragEvents);
                            $(doc.body).addClass("sp-dragging");

                            move(e);

                            prevent(e);
                        }
                    }
                }

                function stop() {
                    if (dragging) {
                        $(doc).unbind(duringDragEvents);
                        $(doc.body).removeClass("sp-dragging");

                        // Wait a tick before notifying observers to allow the click event
                        // to fire in Chrome.
                        setTimeout(function () {
                            onstop.apply(element, arguments);
                        }, 0);
                    }
                    dragging = false;
                }

                $(element).bind("touchstart mousedown", start);
            }

            function throttle(func, wait, debounce) {
                var timeout;
                return function () {
                    var context = this,
                        args = arguments;
                    var throttler = function () {
                        timeout = null;
                        func.apply(context, args);
                    };
                    if (debounce) clearTimeout(timeout);
                    if (debounce || !timeout) timeout = setTimeout(throttler, wait);
                };
            }

            function inputTypeColorSupport() {
                return $.fn.spectrum.inputTypeColorSupport();
            }

            /**
            * Define a jQuery plugin
            */
            var dataID = "spectrum.id";
            $.fn.spectrum = function (opts, extra) {

                if (typeof opts == "string") {

                    var returnValue = this;
                    var args = Array.prototype.slice.call(arguments, 1);

                    this.each(function () {
                        var spect = spectrums[$(this).data(dataID)];
                        if (spect) {
                            var method = spect[opts];
                            if (!method) {
                                throw new Error("Spectrum: no such method: '" + opts + "'");
                            }

                            if (opts == "get") {
                                returnValue = spect.get();
                            } else if (opts == "container") {
                                returnValue = spect.container;
                            } else if (opts == "option") {
                                returnValue = spect.option.apply(spect, args);
                            } else if (opts == "destroy") {
                                spect.destroy();
                                $(this).removeData(dataID);
                            } else {
                                method.apply(spect, args);
                            }
                        }
                    });

                    return returnValue;
                }

                // Initializing a new instance of spectrum
                return this.spectrum("destroy").each(function () {
                    var options = $.extend({}, opts, $(this).data());
                    var spect = spectrum(this, options);
                    $(this).data(dataID, spect.id);
                });
            };

            $.fn.spectrum.load = true;
            $.fn.spectrum.loadOpts = {};
            $.fn.spectrum.draggable = draggable;
            $.fn.spectrum.defaults = defaultOpts;
            $.fn.spectrum.inputTypeColorSupport = function inputTypeColorSupport() {
                if (typeof inputTypeColorSupport._cachedResult === "undefined") {
                    var colorInput = $("<input type='color'/>")[0]; // if color element is supported, value will default to not null
                    inputTypeColorSupport._cachedResult = colorInput.type === "color" && colorInput.value !== "";
                }
                return inputTypeColorSupport._cachedResult;
            };

            $.spectrum = {};
            $.spectrum.localization = {};
            $.spectrum.palettes = {};

            $.fn.spectrum.processNativeColorInputs = function () {
                var colorInputs = $("input[type=color]");
                if (colorInputs.length && !inputTypeColorSupport()) {
                    colorInputs.spectrum({
                        preferredFormat: "hex6"
                    });
                }
            };

            // TinyColor v1.1.2
            // https://github.com/bgrins/TinyColor
            // Brian Grinstead, MIT License

            (function () {

                var trimLeft = /^[\s,#]+/,
                    trimRight = /\s+$/,
                    tinyCounter = 0,
                    math = Math,
                    mathRound = math.round,
                    mathMin = math.min,
                    mathMax = math.max,
                    mathRandom = math.random;

                var tinycolor = function (color, opts) {

                    color = color ? color : '';
                    opts = opts || {};

                    // If input is already a tinycolor, return itself
                    if (color instanceof tinycolor) {
                        return color;
                    }
                    // If we are called as a function, call using new instead
                    if (!(this instanceof tinycolor)) {
                        return new tinycolor(color, opts);
                    }

                    var rgb = inputToRGB(color);
                    this._originalInput = color, this._r = rgb.r, this._g = rgb.g, this._b = rgb.b, this._a = rgb.a, this._roundA = mathRound(100 * this._a) / 100, this._format = opts.format || rgb.format;
                    this._gradientType = opts.gradientType;

                    // Don't let the range of [0,255] come back in [0,1].
                    // Potentially lose a little bit of precision here, but will fix issues where
                    // .5 gets interpreted as half of the total, instead of half of 1
                    // If it was supposed to be 128, this was already taken care of by `inputToRgb`
                    if (this._r < 1) {
                        this._r = mathRound(this._r);
                    }
                    if (this._g < 1) {
                        this._g = mathRound(this._g);
                    }
                    if (this._b < 1) {
                        this._b = mathRound(this._b);
                    }

                    this._ok = rgb.ok;
                    this._tc_id = tinyCounter++;
                };

                tinycolor.prototype = {
                    isDark: function () {
                        return this.getBrightness() < 128;
                    },
                    isLight: function () {
                        return !this.isDark();
                    },
                    isValid: function () {
                        return this._ok;
                    },
                    getOriginalInput: function () {
                        return this._originalInput;
                    },
                    getFormat: function () {
                        return this._format;
                    },
                    getAlpha: function () {
                        return this._a;
                    },
                    getBrightness: function () {
                        var rgb = this.toRgb();
                        return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
                    },
                    setAlpha: function (value) {
                        this._a = boundAlpha(value);
                        this._roundA = mathRound(100 * this._a) / 100;
                        return this;
                    },
                    toHsv: function () {
                        var hsv = rgbToHsv(this._r, this._g, this._b);
                        return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this._a };
                    },
                    toHsvString: function () {
                        var hsv = rgbToHsv(this._r, this._g, this._b);
                        var h = mathRound(hsv.h * 360),
                            s = mathRound(hsv.s * 100),
                            v = mathRound(hsv.v * 100);
                        return this._a == 1 ? "hsv(" + h + ", " + s + "%, " + v + "%)" : "hsva(" + h + ", " + s + "%, " + v + "%, " + this._roundA + ")";
                    },
                    toHsl: function () {
                        var hsl = rgbToHsl(this._r, this._g, this._b);
                        return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this._a };
                    },
                    toHslString: function () {
                        var hsl = rgbToHsl(this._r, this._g, this._b);
                        var h = mathRound(hsl.h * 360),
                            s = mathRound(hsl.s * 100),
                            l = mathRound(hsl.l * 100);
                        return this._a == 1 ? "hsl(" + h + ", " + s + "%, " + l + "%)" : "hsla(" + h + ", " + s + "%, " + l + "%, " + this._roundA + ")";
                    },
                    toHex: function (allow3Char) {
                        return rgbToHex(this._r, this._g, this._b, allow3Char);
                    },
                    toHexString: function (allow3Char) {
                        return '#' + this.toHex(allow3Char);
                    },
                    toHex8: function () {
                        return rgbaToHex(this._r, this._g, this._b, this._a);
                    },
                    toHex8String: function () {
                        return '#' + this.toHex8();
                    },
                    toRgb: function () {
                        return { r: mathRound(this._r), g: mathRound(this._g), b: mathRound(this._b), a: this._a };
                    },
                    toRgbString: function () {
                        return this._a == 1 ? "rgb(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ")" : "rgba(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ", " + this._roundA + ")";
                    },
                    toPercentageRgb: function () {
                        return { r: mathRound(bound01(this._r, 255) * 100) + "%", g: mathRound(bound01(this._g, 255) * 100) + "%", b: mathRound(bound01(this._b, 255) * 100) + "%", a: this._a };
                    },
                    toPercentageRgbString: function () {
                        return this._a == 1 ? "rgb(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%)" : "rgba(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
                    },
                    toName: function () {
                        if (this._a === 0) {
                            return "transparent";
                        }

                        if (this._a < 1) {
                            return false;
                        }

                        return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
                    },
                    toFilter: function (secondColor) {
                        var hex8String = '#' + rgbaToHex(this._r, this._g, this._b, this._a);
                        var secondHex8String = hex8String;
                        var gradientType = this._gradientType ? "GradientType = 1, " : "";

                        if (secondColor) {
                            var s = tinycolor(secondColor);
                            secondHex8String = s.toHex8String();
                        }

                        return "progid:DXImageTransform.Microsoft.gradient(" + gradientType + "startColorstr=" + hex8String + ",endColorstr=" + secondHex8String + ")";
                    },
                    toString: function (format) {
                        var formatSet = !!format;
                        format = format || this._format;

                        var formattedString = false;
                        var hasAlpha = this._a < 1 && this._a >= 0;
                        var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "name");

                        if (needsAlphaFormat) {
                            // Special case for "transparent", all other non-alpha formats
                            // will return rgba when there is transparency.
                            if (format === "name" && this._a === 0) {
                                return this.toName();
                            }
                            return this.toRgbString();
                        }
                        if (format === "rgb") {
                            formattedString = this.toRgbString();
                        }
                        if (format === "prgb") {
                            formattedString = this.toPercentageRgbString();
                        }
                        if (format === "hex" || format === "hex6") {
                            formattedString = this.toHexString();
                        }
                        if (format === "hex3") {
                            formattedString = this.toHexString(true);
                        }
                        if (format === "hex8") {
                            formattedString = this.toHex8String();
                        }
                        if (format === "name") {
                            formattedString = this.toName();
                        }
                        if (format === "hsl") {
                            formattedString = this.toHslString();
                        }
                        if (format === "hsv") {
                            formattedString = this.toHsvString();
                        }

                        return formattedString || this.toHexString();
                    },

                    _applyModification: function (fn, args) {
                        var color = fn.apply(null, [this].concat([].slice.call(args)));
                        this._r = color._r;
                        this._g = color._g;
                        this._b = color._b;
                        this.setAlpha(color._a);
                        return this;
                    },
                    lighten: function () {
                        return this._applyModification(lighten, arguments);
                    },
                    brighten: function () {
                        return this._applyModification(brighten, arguments);
                    },
                    darken: function () {
                        return this._applyModification(darken, arguments);
                    },
                    desaturate: function () {
                        return this._applyModification(desaturate, arguments);
                    },
                    saturate: function () {
                        return this._applyModification(saturate, arguments);
                    },
                    greyscale: function () {
                        return this._applyModification(greyscale, arguments);
                    },
                    spin: function () {
                        return this._applyModification(spin, arguments);
                    },

                    _applyCombination: function (fn, args) {
                        return fn.apply(null, [this].concat([].slice.call(args)));
                    },
                    analogous: function () {
                        return this._applyCombination(analogous, arguments);
                    },
                    complement: function () {
                        return this._applyCombination(complement, arguments);
                    },
                    monochromatic: function () {
                        return this._applyCombination(monochromatic, arguments);
                    },
                    splitcomplement: function () {
                        return this._applyCombination(splitcomplement, arguments);
                    },
                    triad: function () {
                        return this._applyCombination(triad, arguments);
                    },
                    tetrad: function () {
                        return this._applyCombination(tetrad, arguments);
                    }
                };

                // If input is an object, force 1 into "1.0" to handle ratios properly
                // String input requires "1.0" as input, so 1 will be treated as 1
                tinycolor.fromRatio = function (color, opts) {
                    if (typeof color == "object") {
                        var newColor = {};
                        for (var i in color) {
                            if (color.hasOwnProperty(i)) {
                                if (i === "a") {
                                    newColor[i] = color[i];
                                } else {
                                    newColor[i] = convertToPercentage(color[i]);
                                }
                            }
                        }
                        color = newColor;
                    }

                    return tinycolor(color, opts);
                };

                // Given a string or object, convert that input to RGB
                // Possible string inputs:
                //
                //     "red"
                //     "#f00" or "f00"
                //     "#ff0000" or "ff0000"
                //     "#ff000000" or "ff000000"
                //     "rgb 255 0 0" or "rgb (255, 0, 0)"
                //     "rgb 1.0 0 0" or "rgb (1, 0, 0)"
                //     "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
                //     "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
                //     "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
                //     "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
                //     "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
                //
                function inputToRGB(color) {

                    var rgb = { r: 0, g: 0, b: 0 };
                    var a = 1;
                    var ok = false;
                    var format = false;

                    if (typeof color == "string") {
                        color = stringInputToObject(color);
                    }

                    if (typeof color == "object") {
                        if (color.hasOwnProperty("r") && color.hasOwnProperty("g") && color.hasOwnProperty("b")) {
                            rgb = rgbToRgb(color.r, color.g, color.b);
                            ok = true;
                            format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
                        } else if (color.hasOwnProperty("h") && color.hasOwnProperty("s") && color.hasOwnProperty("v")) {
                            color.s = convertToPercentage(color.s);
                            color.v = convertToPercentage(color.v);
                            rgb = hsvToRgb(color.h, color.s, color.v);
                            ok = true;
                            format = "hsv";
                        } else if (color.hasOwnProperty("h") && color.hasOwnProperty("s") && color.hasOwnProperty("l")) {
                            color.s = convertToPercentage(color.s);
                            color.l = convertToPercentage(color.l);
                            rgb = hslToRgb(color.h, color.s, color.l);
                            ok = true;
                            format = "hsl";
                        }

                        if (color.hasOwnProperty("a")) {
                            a = color.a;
                        }
                    }

                    a = boundAlpha(a);

                    return {
                        ok: ok,
                        format: color.format || format,
                        r: mathMin(255, mathMax(rgb.r, 0)),
                        g: mathMin(255, mathMax(rgb.g, 0)),
                        b: mathMin(255, mathMax(rgb.b, 0)),
                        a: a
                    };
                }

                // Conversion Functions
                // --------------------

                // `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
                // <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>

                // `rgbToRgb`
                // Handle bounds / percentage checking to conform to CSS color spec
                // <http://www.w3.org/TR/css3-color/>
                // *Assumes:* r, g, b in [0, 255] or [0, 1]
                // *Returns:* { r, g, b } in [0, 255]
                function rgbToRgb(r, g, b) {
                    return {
                        r: bound01(r, 255) * 255,
                        g: bound01(g, 255) * 255,
                        b: bound01(b, 255) * 255
                    };
                }

                // `rgbToHsl`
                // Converts an RGB color value to HSL.
                // *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
                // *Returns:* { h, s, l } in [0,1]
                function rgbToHsl(r, g, b) {

                    r = bound01(r, 255);
                    g = bound01(g, 255);
                    b = bound01(b, 255);

                    var max = mathMax(r, g, b),
                        min = mathMin(r, g, b);
                    var h,
                        s,
                        l = (max + min) / 2;

                    if (max == min) {
                        h = s = 0; // achromatic
                    } else {
                        var d = max - min;
                        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                        switch (max) {
                            case r:
                                h = (g - b) / d + (g < b ? 6 : 0);break;
                            case g:
                                h = (b - r) / d + 2;break;
                            case b:
                                h = (r - g) / d + 4;break;
                        }

                        h /= 6;
                    }

                    return { h: h, s: s, l: l };
                }

                // `hslToRgb`
                // Converts an HSL color value to RGB.
                // *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
                // *Returns:* { r, g, b } in the set [0, 255]
                function hslToRgb(h, s, l) {
                    var r, g, b;

                    h = bound01(h, 360);
                    s = bound01(s, 100);
                    l = bound01(l, 100);

                    function hue2rgb(p, q, t) {
                        if (t < 0) t += 1;
                        if (t > 1) t -= 1;
                        if (t < 1 / 6) return p + (q - p) * 6 * t;
                        if (t < 1 / 2) return q;
                        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                        return p;
                    }

                    if (s === 0) {
                        r = g = b = l; // achromatic
                    } else {
                        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                        var p = 2 * l - q;
                        r = hue2rgb(p, q, h + 1 / 3);
                        g = hue2rgb(p, q, h);
                        b = hue2rgb(p, q, h - 1 / 3);
                    }

                    return { r: r * 255, g: g * 255, b: b * 255 };
                }

                // `rgbToHsv`
                // Converts an RGB color value to HSV
                // *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
                // *Returns:* { h, s, v } in [0,1]
                function rgbToHsv(r, g, b) {

                    r = bound01(r, 255);
                    g = bound01(g, 255);
                    b = bound01(b, 255);

                    var max = mathMax(r, g, b),
                        min = mathMin(r, g, b);
                    var h,
                        s,
                        v = max;

                    var d = max - min;
                    s = max === 0 ? 0 : d / max;

                    if (max == min) {
                        h = 0; // achromatic
                    } else {
                        switch (max) {
                            case r:
                                h = (g - b) / d + (g < b ? 6 : 0);break;
                            case g:
                                h = (b - r) / d + 2;break;
                            case b:
                                h = (r - g) / d + 4;break;
                        }
                        h /= 6;
                    }
                    return { h: h, s: s, v: v };
                }

                // `hsvToRgb`
                // Converts an HSV color value to RGB.
                // *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
                // *Returns:* { r, g, b } in the set [0, 255]
                function hsvToRgb(h, s, v) {

                    h = bound01(h, 360) * 6;
                    s = bound01(s, 100);
                    v = bound01(v, 100);

                    var i = math.floor(h),
                        f = h - i,
                        p = v * (1 - s),
                        q = v * (1 - f * s),
                        t = v * (1 - (1 - f) * s),
                        mod = i % 6,
                        r = [v, q, p, p, t, v][mod],
                        g = [t, v, v, q, p, p][mod],
                        b = [p, p, t, v, v, q][mod];

                    return { r: r * 255, g: g * 255, b: b * 255 };
                }

                // `rgbToHex`
                // Converts an RGB color to hex
                // Assumes r, g, and b are contained in the set [0, 255]
                // Returns a 3 or 6 character hex
                function rgbToHex(r, g, b, allow3Char) {

                    var hex = [pad2(mathRound(r).toString(16)), pad2(mathRound(g).toString(16)), pad2(mathRound(b).toString(16))];

                    // Return a 3 character hex if possible
                    if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
                        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
                    }

                    return hex.join("");
                }
                // `rgbaToHex`
                // Converts an RGBA color plus alpha transparency to hex
                // Assumes r, g, b and a are contained in the set [0, 255]
                // Returns an 8 character hex
                function rgbaToHex(r, g, b, a) {

                    var hex = [pad2(convertDecimalToHex(a)), pad2(mathRound(r).toString(16)), pad2(mathRound(g).toString(16)), pad2(mathRound(b).toString(16))];

                    return hex.join("");
                }

                // `equals`
                // Can be called with any tinycolor input
                tinycolor.equals = function (color1, color2) {
                    if (!color1 || !color2) {
                        return false;
                    }
                    return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
                };
                tinycolor.random = function () {
                    return tinycolor.fromRatio({
                        r: mathRandom(),
                        g: mathRandom(),
                        b: mathRandom()
                    });
                };

                // Modification Functions
                // ----------------------
                // Thanks to less.js for some of the basics here
                // <https://github.com/cloudhead/less.js/blob/master/lib/less/functions.js>

                function desaturate(color, amount) {
                    amount = amount === 0 ? 0 : amount || 10;
                    var hsl = tinycolor(color).toHsl();
                    hsl.s -= amount / 100;
                    hsl.s = clamp01(hsl.s);
                    return tinycolor(hsl);
                }

                function saturate(color, amount) {
                    amount = amount === 0 ? 0 : amount || 10;
                    var hsl = tinycolor(color).toHsl();
                    hsl.s += amount / 100;
                    hsl.s = clamp01(hsl.s);
                    return tinycolor(hsl);
                }

                function greyscale(color) {
                    return tinycolor(color).desaturate(100);
                }

                function lighten(color, amount) {
                    amount = amount === 0 ? 0 : amount || 10;
                    var hsl = tinycolor(color).toHsl();
                    hsl.l += amount / 100;
                    hsl.l = clamp01(hsl.l);
                    return tinycolor(hsl);
                }

                function brighten(color, amount) {
                    amount = amount === 0 ? 0 : amount || 10;
                    var rgb = tinycolor(color).toRgb();
                    rgb.r = mathMax(0, mathMin(255, rgb.r - mathRound(255 * -(amount / 100))));
                    rgb.g = mathMax(0, mathMin(255, rgb.g - mathRound(255 * -(amount / 100))));
                    rgb.b = mathMax(0, mathMin(255, rgb.b - mathRound(255 * -(amount / 100))));
                    return tinycolor(rgb);
                }

                function darken(color, amount) {
                    amount = amount === 0 ? 0 : amount || 10;
                    var hsl = tinycolor(color).toHsl();
                    hsl.l -= amount / 100;
                    hsl.l = clamp01(hsl.l);
                    return tinycolor(hsl);
                }

                // Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
                // Values outside of this range will be wrapped into this range.
                function spin(color, amount) {
                    var hsl = tinycolor(color).toHsl();
                    var hue = (mathRound(hsl.h) + amount) % 360;
                    hsl.h = hue < 0 ? 360 + hue : hue;
                    return tinycolor(hsl);
                }

                // Combination Functions
                // ---------------------
                // Thanks to jQuery xColor for some of the ideas behind these
                // <https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js>

                function complement(color) {
                    var hsl = tinycolor(color).toHsl();
                    hsl.h = (hsl.h + 180) % 360;
                    return tinycolor(hsl);
                }

                function triad(color) {
                    var hsl = tinycolor(color).toHsl();
                    var h = hsl.h;
                    return [tinycolor(color), tinycolor({ h: (h + 120) % 360, s: hsl.s, l: hsl.l }), tinycolor({ h: (h + 240) % 360, s: hsl.s, l: hsl.l })];
                }

                function tetrad(color) {
                    var hsl = tinycolor(color).toHsl();
                    var h = hsl.h;
                    return [tinycolor(color), tinycolor({ h: (h + 90) % 360, s: hsl.s, l: hsl.l }), tinycolor({ h: (h + 180) % 360, s: hsl.s, l: hsl.l }), tinycolor({ h: (h + 270) % 360, s: hsl.s, l: hsl.l })];
                }

                function splitcomplement(color) {
                    var hsl = tinycolor(color).toHsl();
                    var h = hsl.h;
                    return [tinycolor(color), tinycolor({ h: (h + 72) % 360, s: hsl.s, l: hsl.l }), tinycolor({ h: (h + 216) % 360, s: hsl.s, l: hsl.l })];
                }

                function analogous(color, results, slices) {
                    results = results || 6;
                    slices = slices || 30;

                    var hsl = tinycolor(color).toHsl();
                    var part = 360 / slices;
                    var ret = [tinycolor(color)];

                    for (hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results;) {
                        hsl.h = (hsl.h + part) % 360;
                        ret.push(tinycolor(hsl));
                    }
                    return ret;
                }

                function monochromatic(color, results) {
                    results = results || 6;
                    var hsv = tinycolor(color).toHsv();
                    var h = hsv.h,
                        s = hsv.s,
                        v = hsv.v;
                    var ret = [];
                    var modification = 1 / results;

                    while (results--) {
                        ret.push(tinycolor({ h: h, s: s, v: v }));
                        v = (v + modification) % 1;
                    }

                    return ret;
                }

                // Utility Functions
                // ---------------------

                tinycolor.mix = function (color1, color2, amount) {
                    amount = amount === 0 ? 0 : amount || 50;

                    var rgb1 = tinycolor(color1).toRgb();
                    var rgb2 = tinycolor(color2).toRgb();

                    var p = amount / 100;
                    var w = p * 2 - 1;
                    var a = rgb2.a - rgb1.a;

                    var w1;

                    if (w * a == -1) {
                        w1 = w;
                    } else {
                        w1 = (w + a) / (1 + w * a);
                    }

                    w1 = (w1 + 1) / 2;

                    var w2 = 1 - w1;

                    var rgba = {
                        r: rgb2.r * w1 + rgb1.r * w2,
                        g: rgb2.g * w1 + rgb1.g * w2,
                        b: rgb2.b * w1 + rgb1.b * w2,
                        a: rgb2.a * p + rgb1.a * (1 - p)
                    };

                    return tinycolor(rgba);
                };

                // Readability Functions
                // ---------------------
                // <http://www.w3.org/TR/AERT#color-contrast>

                // `readability`
                // Analyze the 2 colors and returns an object with the following properties:
                //    `brightness`: difference in brightness between the two colors
                //    `color`: difference in color/hue between the two colors
                tinycolor.readability = function (color1, color2) {
                    var c1 = tinycolor(color1);
                    var c2 = tinycolor(color2);
                    var rgb1 = c1.toRgb();
                    var rgb2 = c2.toRgb();
                    var brightnessA = c1.getBrightness();
                    var brightnessB = c2.getBrightness();
                    var colorDiff = Math.max(rgb1.r, rgb2.r) - Math.min(rgb1.r, rgb2.r) + Math.max(rgb1.g, rgb2.g) - Math.min(rgb1.g, rgb2.g) + Math.max(rgb1.b, rgb2.b) - Math.min(rgb1.b, rgb2.b);

                    return {
                        brightness: Math.abs(brightnessA - brightnessB),
                        color: colorDiff
                    };
                };

                // `readable`
                // http://www.w3.org/TR/AERT#color-contrast
                // Ensure that foreground and background color combinations provide sufficient contrast.
                // *Example*
                //    tinycolor.isReadable("#000", "#111") => false
                tinycolor.isReadable = function (color1, color2) {
                    var readability = tinycolor.readability(color1, color2);
                    return readability.brightness > 125 && readability.color > 500;
                };

                // `mostReadable`
                // Given a base color and a list of possible foreground or background
                // colors for that base, returns the most readable color.
                // *Example*
                //    tinycolor.mostReadable("#123", ["#fff", "#000"]) => "#000"
                tinycolor.mostReadable = function (baseColor, colorList) {
                    var bestColor = null;
                    var bestScore = 0;
                    var bestIsReadable = false;
                    for (var i = 0; i < colorList.length; i++) {

                        // We normalize both around the "acceptable" breaking point,
                        // but rank brightness constrast higher than hue.

                        var readability = tinycolor.readability(baseColor, colorList[i]);
                        var readable = readability.brightness > 125 && readability.color > 500;
                        var score = 3 * (readability.brightness / 125) + readability.color / 500;

                        if (readable && !bestIsReadable || readable && bestIsReadable && score > bestScore || !readable && !bestIsReadable && score > bestScore) {
                            bestIsReadable = readable;
                            bestScore = score;
                            bestColor = tinycolor(colorList[i]);
                        }
                    }
                    return bestColor;
                };

                // Big List of Colors
                // ------------------
                // <http://www.w3.org/TR/css3-color/#svg-color>
                var names = tinycolor.names = {
                    aliceblue: "f0f8ff",
                    antiquewhite: "faebd7",
                    aqua: "0ff",
                    aquamarine: "7fffd4",
                    azure: "f0ffff",
                    beige: "f5f5dc",
                    bisque: "ffe4c4",
                    black: "000",
                    blanchedalmond: "ffebcd",
                    blue: "00f",
                    blueviolet: "8a2be2",
                    brown: "a52a2a",
                    burlywood: "deb887",
                    burntsienna: "ea7e5d",
                    cadetblue: "5f9ea0",
                    chartreuse: "7fff00",
                    chocolate: "d2691e",
                    coral: "ff7f50",
                    cornflowerblue: "6495ed",
                    cornsilk: "fff8dc",
                    crimson: "dc143c",
                    cyan: "0ff",
                    darkblue: "00008b",
                    darkcyan: "008b8b",
                    darkgoldenrod: "b8860b",
                    darkgray: "a9a9a9",
                    darkgreen: "006400",
                    darkgrey: "a9a9a9",
                    darkkhaki: "bdb76b",
                    darkmagenta: "8b008b",
                    darkolivegreen: "556b2f",
                    darkorange: "ff8c00",
                    darkorchid: "9932cc",
                    darkred: "8b0000",
                    darksalmon: "e9967a",
                    darkseagreen: "8fbc8f",
                    darkslateblue: "483d8b",
                    darkslategray: "2f4f4f",
                    darkslategrey: "2f4f4f",
                    darkturquoise: "00ced1",
                    darkviolet: "9400d3",
                    deeppink: "ff1493",
                    deepskyblue: "00bfff",
                    dimgray: "696969",
                    dimgrey: "696969",
                    dodgerblue: "1e90ff",
                    firebrick: "b22222",
                    floralwhite: "fffaf0",
                    forestgreen: "228b22",
                    fuchsia: "f0f",
                    gainsboro: "dcdcdc",
                    ghostwhite: "f8f8ff",
                    gold: "ffd700",
                    goldenrod: "daa520",
                    gray: "808080",
                    green: "008000",
                    greenyellow: "adff2f",
                    grey: "808080",
                    honeydew: "f0fff0",
                    hotpink: "ff69b4",
                    indianred: "cd5c5c",
                    indigo: "4b0082",
                    ivory: "fffff0",
                    khaki: "f0e68c",
                    lavender: "e6e6fa",
                    lavenderblush: "fff0f5",
                    lawngreen: "7cfc00",
                    lemonchiffon: "fffacd",
                    lightblue: "add8e6",
                    lightcoral: "f08080",
                    lightcyan: "e0ffff",
                    lightgoldenrodyellow: "fafad2",
                    lightgray: "d3d3d3",
                    lightgreen: "90ee90",
                    lightgrey: "d3d3d3",
                    lightpink: "ffb6c1",
                    lightsalmon: "ffa07a",
                    lightseagreen: "20b2aa",
                    lightskyblue: "87cefa",
                    lightslategray: "789",
                    lightslategrey: "789",
                    lightsteelblue: "b0c4de",
                    lightyellow: "ffffe0",
                    lime: "0f0",
                    limegreen: "32cd32",
                    linen: "faf0e6",
                    magenta: "f0f",
                    maroon: "800000",
                    mediumaquamarine: "66cdaa",
                    mediumblue: "0000cd",
                    mediumorchid: "ba55d3",
                    mediumpurple: "9370db",
                    mediumseagreen: "3cb371",
                    mediumslateblue: "7b68ee",
                    mediumspringgreen: "00fa9a",
                    mediumturquoise: "48d1cc",
                    mediumvioletred: "c71585",
                    midnightblue: "191970",
                    mintcream: "f5fffa",
                    mistyrose: "ffe4e1",
                    moccasin: "ffe4b5",
                    navajowhite: "ffdead",
                    navy: "000080",
                    oldlace: "fdf5e6",
                    olive: "808000",
                    olivedrab: "6b8e23",
                    orange: "ffa500",
                    orangered: "ff4500",
                    orchid: "da70d6",
                    palegoldenrod: "eee8aa",
                    palegreen: "98fb98",
                    paleturquoise: "afeeee",
                    palevioletred: "db7093",
                    papayawhip: "ffefd5",
                    peachpuff: "ffdab9",
                    peru: "cd853f",
                    pink: "ffc0cb",
                    plum: "dda0dd",
                    powderblue: "b0e0e6",
                    purple: "800080",
                    rebeccapurple: "663399",
                    red: "f00",
                    rosybrown: "bc8f8f",
                    royalblue: "4169e1",
                    saddlebrown: "8b4513",
                    salmon: "fa8072",
                    sandybrown: "f4a460",
                    seagreen: "2e8b57",
                    seashell: "fff5ee",
                    sienna: "a0522d",
                    silver: "c0c0c0",
                    skyblue: "87ceeb",
                    slateblue: "6a5acd",
                    slategray: "708090",
                    slategrey: "708090",
                    snow: "fffafa",
                    springgreen: "00ff7f",
                    steelblue: "4682b4",
                    tan: "d2b48c",
                    teal: "008080",
                    thistle: "d8bfd8",
                    tomato: "ff6347",
                    turquoise: "40e0d0",
                    violet: "ee82ee",
                    wheat: "f5deb3",
                    white: "fff",
                    whitesmoke: "f5f5f5",
                    yellow: "ff0",
                    yellowgreen: "9acd32"
                };

                // Make it easy to access colors via `hexNames[hex]`
                var hexNames = tinycolor.hexNames = flip(names);

                // Utilities
                // ---------

                // `{ 'name1': 'val1' }` becomes `{ 'val1': 'name1' }`
                function flip(o) {
                    var flipped = {};
                    for (var i in o) {
                        if (o.hasOwnProperty(i)) {
                            flipped[o[i]] = i;
                        }
                    }
                    return flipped;
                }

                // Return a valid alpha value [0,1] with all invalid values being set to 1
                function boundAlpha(a) {
                    a = parseFloat(a);

                    if (isNaN(a) || a < 0 || a > 1) {
                        a = 1;
                    }

                    return a;
                }

                // Take input from [0, n] and return it as [0, 1]
                function bound01(n, max) {
                    if (isOnePointZero(n)) {
                        n = "100%";
                    }

                    var processPercent = isPercentage(n);
                    n = mathMin(max, mathMax(0, parseFloat(n)));

                    // Automatically convert percentage into number
                    if (processPercent) {
                        n = parseInt(n * max, 10) / 100;
                    }

                    // Handle floating point rounding errors
                    if (math.abs(n - max) < 0.000001) {
                        return 1;
                    }

                    // Convert into [0, 1] range if it isn't already
                    return n % max / parseFloat(max);
                }

                // Force a number between 0 and 1
                function clamp01(val) {
                    return mathMin(1, mathMax(0, val));
                }

                // Parse a base-16 hex value into a base-10 integer
                function parseIntFromHex(val) {
                    return parseInt(val, 16);
                }

                // Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
                // <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
                function isOnePointZero(n) {
                    return typeof n == "string" && n.indexOf('.') != -1 && parseFloat(n) === 1;
                }

                // Check to see if string passed in is a percentage
                function isPercentage(n) {
                    return typeof n === "string" && n.indexOf('%') != -1;
                }

                // Force a hex value to have 2 characters
                function pad2(c) {
                    return c.length == 1 ? '0' + c : '' + c;
                }

                // Replace a decimal with it's percentage value
                function convertToPercentage(n) {
                    if (n <= 1) {
                        n = n * 100 + "%";
                    }

                    return n;
                }

                // Converts a decimal to a hex value
                function convertDecimalToHex(d) {
                    return Math.round(parseFloat(d) * 255).toString(16);
                }
                // Converts a hex value to a decimal
                function convertHexToDecimal(h) {
                    return parseIntFromHex(h) / 255;
                }

                var matchers = function () {

                    // <http://www.w3.org/TR/css3-values/#integers>
                    var CSS_INTEGER = "[-\\+]?\\d+%?";

                    // <http://www.w3.org/TR/css3-values/#number-value>
                    var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";

                    // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
                    var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";

                    // Actual matching.
                    // Parentheses and commas are optional, but not required.
                    // Whitespace can take the place of commas or opening paren
                    var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
                    var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";

                    return {
                        rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
                        rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
                        hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
                        hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
                        hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
                        hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
                        hex3: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
                        hex6: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
                        hex8: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
                    };
                }();

                // `stringInputToObject`
                // Permissive string parsing.  Take in a number of formats, and output an object
                // based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
                function stringInputToObject(color) {

                    color = color.replace(trimLeft, '').replace(trimRight, '').toLowerCase();
                    var named = false;
                    if (names[color]) {
                        color = names[color];
                        named = true;
                    } else if (color == 'transparent') {
                        return { r: 0, g: 0, b: 0, a: 0, format: "name" };
                    }

                    // Try to match string input using regular expressions.
                    // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
                    // Just return an object and let the conversion functions handle that.
                    // This way the result will be the same whether the tinycolor is initialized with string or object.
                    var match;
                    if (match = matchers.rgb.exec(color)) {
                        return { r: match[1], g: match[2], b: match[3] };
                    }
                    if (match = matchers.rgba.exec(color)) {
                        return { r: match[1], g: match[2], b: match[3], a: match[4] };
                    }
                    if (match = matchers.hsl.exec(color)) {
                        return { h: match[1], s: match[2], l: match[3] };
                    }
                    if (match = matchers.hsla.exec(color)) {
                        return { h: match[1], s: match[2], l: match[3], a: match[4] };
                    }
                    if (match = matchers.hsv.exec(color)) {
                        return { h: match[1], s: match[2], v: match[3] };
                    }
                    if (match = matchers.hsva.exec(color)) {
                        return { h: match[1], s: match[2], v: match[3], a: match[4] };
                    }
                    if (match = matchers.hex8.exec(color)) {
                        return {
                            a: convertHexToDecimal(match[1]),
                            r: parseIntFromHex(match[2]),
                            g: parseIntFromHex(match[3]),
                            b: parseIntFromHex(match[4]),
                            format: named ? "name" : "hex8"
                        };
                    }
                    if (match = matchers.hex6.exec(color)) {
                        return {
                            r: parseIntFromHex(match[1]),
                            g: parseIntFromHex(match[2]),
                            b: parseIntFromHex(match[3]),
                            format: named ? "name" : "hex"
                        };
                    }
                    if (match = matchers.hex3.exec(color)) {
                        return {
                            r: parseIntFromHex(match[1] + '' + match[1]),
                            g: parseIntFromHex(match[2] + '' + match[2]),
                            b: parseIntFromHex(match[3] + '' + match[3]),
                            format: named ? "name" : "hex"
                        };
                    }

                    return false;
                }

                window.tinycolor = tinycolor;
            })();

            $(function () {
                if ($.fn.spectrum.load) {
                    $.fn.spectrum.processNativeColorInputs();
                }
            });
        });
    })(this);

    return _retrieveGlobal();
});
System.registerDynamic("reactiveadmintemplate/scripts/modules/form/color-picker.js", ["tinycolor", "colorpicker"], true, function ($__require, exports, module) {
    'use strict';

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    /*!
     * @version: 1.1.2
     * @name: color-picker
     *
     * @author: https://themeforest.net/user/flexlayers
     */
    $__require("tinycolor");
    $__require("colorpicker");
    $(function () {
        ////////////////////////
        // Color Picker
        $('input.color-picker.picker-only-palette').spectrum({
            showPaletteOnly: true, hideAfterPaletteSelect: true, color: '#498033',
            palette: [['#ebebeb', '#c57a1f', '#2d6f70', 'rgb(53, 59, 74)', 'hsv 100 70 50'], ['#9a2e12', '#ba9d2b', '#498033', '#3a5190', '#5f368e']]
        });
        $('input.color-picker.picker-with-palette').spectrum({
            showAlpha: true, showPalette: true, color: '#5f368e', showInitial: true, showInput: true,
            palette: [['#ebebeb', '#c57a1f', '#2d6f70', 'rgb(53, 59, 74)', 'hsv 100 70 50'], ['#9a2e12', '#ba9d2b', '#498033', '#3a5190', '#5f368e']]
        });
        $('input.color-picker.picker-toggle-palette').spectrum({
            showAlpha: true, showPaletteOnly: true, hideAfterPaletteSelect: true,
            togglePaletteOnly: true, togglePaletteMoreText: 'more', togglePaletteLessText: 'less',
            color: '#3a5190',
            palette: [['#ebebeb', '#c57a1f', '#2d6f70', 'rgb(53, 59, 74)', 'hsv 100 70 50'], ['#9a2e12', '#ba9d2b', '#498033', '#3a5190', '#5f368e']]
        });
        $('input.color-picker.picker-simple').spectrum({ showAlpha: true });
        $('.input-group-addon input.color-picker').on('move.spectrum', function (e, color) {
            $(this).parents('.input-group').find('> input').val(color.toRgbString());
        });
        $('input.color-picker').on('show.spectrum', function () {
            $('.sp-container').css('opacity', '0').addClass('transition fade in').on('click', function () {
                $(this).removeClass('transition scale in').css('opacity', '1');
            });
        });
        // End Color Picker
    });
});
System.registerDynamic("reactiveadmintemplate/scripts/task.js", ["./app", "./modules/sortable", "./modules/form/color-picker"], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", { value: true });
  /*!
   * @version: 1.1.2
   * @name: task
   *
   * @author: https://themeforest.net/user/flexlayers
   */
  $__require("./app");
  $__require("./modules/sortable");
  $__require("./modules/form/color-picker");
});