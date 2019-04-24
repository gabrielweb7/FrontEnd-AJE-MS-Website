"bundle";
System.registerDynamic('reactiveadmintemplate/scripts/modules/form/validation/main.js', [], false, function ($__require, $__exports, $__module) {
  var _retrieveGlobal = System.registry.get("@@global-helpers").prepareGlobal($__module.id, null, null);

  (function ($__global) {
    /*!
     * @version: 1.1.2
     * @name: Adapted Form plugin
     *
     * @author: https://themeforest.net/user/flexlayers
     */
    /*!
     * # Semantic UI - Form Validation
     * http://github.com/semantic-org/semantic-ui/
     *
     *
     * Released under the MIT license
     * http://opensource.org/licenses/MIT
     *
     */

    ;(function ($, window, document, undefined) {

      "use strict";

      window = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();

      $.fn.form = function (parameters) {
        var $allModules = $(this),
            moduleSelector = $allModules.selector || '',
            time = new Date().getTime(),
            performance = [],
            query = arguments[0],
            legacyParameters = arguments[1],
            methodInvoked = typeof query == 'string',
            queryArguments = [].slice.call(arguments, 1),
            returnedValue;
        $allModules.each(function () {
          var $module = $(this),
              element = this,
              formErrors = [],
              keyHeldDown = false,


          // set at run-time
          $field,
              $group,
              $message,
              $prompt,
              $submit,
              $clear,
              $reset,
              settings,
              validation,
              metadata,
              selector,
              className,
              regExp,
              error,
              namespace,
              moduleNamespace,
              eventNamespace,
              instance,
              module;

          module = {

            initialize: function () {

              // settings grabbed at run time
              module.get.settings();
              if (methodInvoked) {
                if (instance === undefined) {
                  module.instantiate();
                }
                module.invoke(query);
              } else {
                if (instance !== undefined) {
                  instance.invoke('destroy');
                }
                module.verbose('Initializing form validation', $module, settings);
                module.bindEvents();
                module.set.defaults();
                module.instantiate();
              }
            },

            instantiate: function () {
              module.verbose('Storing instance of module', module);
              instance = module;
              $module.data(moduleNamespace, module);
            },

            destroy: function () {
              module.verbose('Destroying previous module', instance);
              module.removeEvents();
              $module.removeData(moduleNamespace);
            },

            refresh: function () {
              module.verbose('Refreshing selector cache');
              $group = $module.find(selector.group).not(selector.ignore);
              $field = $module.find(selector.field).not(selector.ignore);
              $message = $module.find(selector.message);
              $prompt = $module.find(selector.prompt);

              $submit = $module.find(selector.submit);
              $clear = $module.find(selector.clear);
              $reset = $module.find(selector.reset);
            },

            submit: function () {
              module.verbose('Submitting form', $module);
              $module.submit();
            },

            attachEvents: function (selector, action) {
              action = action || 'submit';
              $(selector).on('click' + eventNamespace, function (event) {
                module[action]();
                event.preventDefault();
              });
            },

            bindEvents: function () {
              module.verbose('Attaching form events');
              $module.on('submit' + eventNamespace, module.validate.form).on('blur' + eventNamespace, selector.field, module.event.field.blur).on('click' + eventNamespace, selector.submit, module.submit).on('click' + eventNamespace, selector.reset, module.reset).on('click' + eventNamespace, selector.clear, module.clear);
              if (settings.keyboardShortcuts) {
                $module.on('keydown' + eventNamespace, selector.field, module.event.field.keydown);
              }
              $field.each(function () {
                var $input = $(this),
                    type = $input.prop('type'),
                    inputEvent = module.get.changeEvent(type, $input);
                $(this).on(inputEvent + eventNamespace, module.event.field.change);
              });
            },

            clear: function () {
              $field.each(function () {
                var $field = $(this),
                    $element = $field.parent(),
                    $fieldGroup = $field.closest($group),
                    $prompt = $fieldGroup.find(selector.prompt),
                    defaultValue = $field.data(metadata.defaultValue) || '',
                    isCheckbox = $element.is(selector.uiCheckbox),
                    isDropdown = $element.is(selector.uiDropdown),
                    isErrored = $fieldGroup.hasClass(className.error);
                if (isErrored) {
                  module.verbose('Resetting error on field', $fieldGroup);
                  $fieldGroup.removeClass(className.error);
                  $prompt.remove();
                }
                if (isDropdown) {
                  module.verbose('Resetting dropdown value', $element, defaultValue);
                  $element.selectDropdown('clear');
                } else if (isCheckbox) {
                  $field.prop('checked', false);
                } else {
                  module.verbose('Resetting field value', $field, defaultValue);
                  $field.val('');
                }
              });
            },

            reset: function () {
              $field.each(function () {
                var $field = $(this),
                    $element = $field.parent(),
                    $fieldGroup = $field.closest($group),
                    $prompt = $fieldGroup.find(selector.prompt),
                    defaultValue = $field.data(metadata.defaultValue),
                    isCheckbox = $element.is(selector.uiCheckbox),
                    isDropdown = $element.is(selector.uiDropdown),
                    isErrored = $fieldGroup.hasClass(className.error);
                if (defaultValue === undefined) {
                  return;
                }
                if (isErrored) {
                  module.verbose('Resetting error on field', $fieldGroup);
                  $fieldGroup.removeClass(className.error);
                  $prompt.remove();
                }
                if (isDropdown) {
                  module.verbose('Resetting dropdown value', $element, defaultValue);
                  $element.selectDropdown('restore defaults');
                } else if (isCheckbox) {
                  module.verbose('Resetting checkbox value', $element, defaultValue);
                  $field.prop('checked', defaultValue);
                } else {
                  module.verbose('Resetting field value', $field, defaultValue);
                  $field.val(defaultValue);
                }
              });
            },

            determine: {
              isValid: function () {
                var allValid = true;
                $.each(validation, function (fieldName, field) {
                  if (!module.validate.field(field, fieldName, true)) {
                    allValid = false;
                  }
                });
                return allValid;
              }
            },

            is: {
              bracketedRule: function (rule) {
                return rule.type && rule.type.match(settings.regExp.bracket);
              },
              empty: function ($field) {
                if (!$field || $field.length === 0) {
                  return true;
                } else if ($field.is('input[type="checkbox"]')) {
                  return !$field.is(':checked');
                } else {
                  return module.is.blank($field);
                }
              },
              blank: function ($field) {
                return $.trim($field.val()) === '';
              },
              valid: function (field) {
                var allValid = true;
                if (field) {
                  module.verbose('Checking if field is valid', field);
                  return module.validate.field(validation[field], field, false);
                } else {
                  module.verbose('Checking if form is valid');
                  $.each(validation, function (fieldName, field) {
                    if (!module.is.valid(fieldName)) {
                      allValid = false;
                    }
                  });
                  return allValid;
                }
              }
            },

            removeEvents: function () {
              $module.off(eventNamespace);
              $field.off(eventNamespace);
              $submit.off(eventNamespace);
              $field.off(eventNamespace);
            },

            event: {
              field: {
                keydown: function (event) {
                  var $field = $(this),
                      key = event.which,
                      isInput = $field.is(selector.input),
                      isCheckbox = $field.is(selector.checkbox),
                      isInDropdown = $field.closest(selector.uiDropdown).length > 0,
                      keyCode = {
                    enter: 13,
                    escape: 27
                  };
                  if (key == keyCode.escape) {
                    module.verbose('Escape key pressed blurring field');
                    $field.blur();
                  }
                  if (!event.ctrlKey && key == keyCode.enter && isInput && !isInDropdown && !isCheckbox) {
                    if (!keyHeldDown) {
                      $field.one('keyup' + eventNamespace, module.event.field.keyup);
                      module.submit();
                      module.debug('Enter pressed on input submitting form');
                    }
                    keyHeldDown = true;
                  }
                },
                keyup: function () {
                  keyHeldDown = false;
                },
                blur: function (event) {
                  var $field = $(this),
                      $fieldGroup = $field.closest($group),
                      validationRules = module.get.validation($field);
                  if ($fieldGroup.hasClass(className.error)) {
                    module.debug('Revalidating field', $field, validationRules);
                    if (validationRules) {
                      module.validate.field(validationRules);
                    }
                  } else if (settings.on == 'blur' || settings.on == 'change') {
                    if (validationRules) {
                      module.validate.field(validationRules);
                    }
                  }
                },
                change: function (event) {
                  var $field = $(this),
                      $fieldGroup = $field.closest($group),
                      validationRules = module.get.validation($field);
                  if (validationRules && (settings.on == 'change' || $fieldGroup.hasClass(className.error) && settings.revalidate)) {
                    clearTimeout(module.timer);
                    module.timer = setTimeout(function () {
                      module.debug('Revalidating field', $field, module.get.validation($field));
                      module.validate.field(validationRules);
                    }, settings.delay);
                  }
                }
              }

            },

            get: {
              ancillaryValue: function (rule) {
                if (!rule.type || !rule.value && !module.is.bracketedRule(rule)) {
                  return false;
                }
                return rule.value !== undefined ? rule.value : rule.type.match(settings.regExp.bracket)[1] + '';
              },
              ruleName: function (rule) {
                if (module.is.bracketedRule(rule)) {
                  return rule.type.replace(rule.type.match(settings.regExp.bracket)[0], '');
                }
                return rule.type;
              },
              changeEvent: function (type, $input) {
                if (type == 'checkbox' || type == 'radio' || type == 'hidden' || $input.is('select')) {
                  return 'change';
                } else {
                  return module.get.inputEvent();
                }
              },
              inputEvent: function () {
                return document.createElement('input').oninput !== undefined ? 'input' : document.createElement('input').onpropertychange !== undefined ? 'propertychange' : 'keyup';
              },
              prompt: function (rule, field) {
                var ruleName = module.get.ruleName(rule),
                    ancillary = module.get.ancillaryValue(rule),
                    prompt = rule.prompt || settings.prompt[ruleName] || settings.text.unspecifiedRule,
                    requiresValue = prompt.search('{value}') !== -1,
                    requiresName = prompt.search('{name}') !== -1,
                    $label,
                    $field,
                    name;
                if (requiresName || requiresValue) {
                  $field = module.get.field(field.identifier);
                }
                if (requiresValue) {
                  prompt = prompt.replace('{value}', $field.val());
                }
                if (requiresName) {
                  $label = $field.closest(selector.group).find('label').eq(0);
                  name = $label.length == 1 ? $label.text() : $field.prop('placeholder') || settings.text.unspecifiedField;
                  prompt = prompt.replace('{name}', name);
                }
                prompt = prompt.replace('{identifier}', field.identifier);
                prompt = prompt.replace('{ruleValue}', ancillary);
                if (!rule.prompt) {
                  module.verbose('Using default validation prompt for type', prompt, ruleName);
                }
                return prompt;
              },
              settings: function () {
                if ($.isPlainObject(parameters)) {
                  var keys = Object.keys(parameters),
                      isLegacySettings = keys.length > 0 ? parameters[keys[0]].identifier !== undefined && parameters[keys[0]].rules !== undefined : false,
                      ruleKeys;
                  if (isLegacySettings) {
                    // 1.x (ducktyped)
                    settings = $.extend(true, {}, $.fn.form.settings, legacyParameters);
                    validation = $.extend({}, $.fn.form.settings.defaults, parameters);
                    module.error(settings.error.oldSyntax, element);
                    module.verbose('Extending settings from legacy parameters', validation, settings);
                  } else {
                    // 2.x
                    if (parameters.fields) {
                      ruleKeys = Object.keys(parameters.fields);
                      if (typeof parameters.fields[ruleKeys[0]] == 'string' || $.isArray(parameters.fields[ruleKeys[0]])) {
                        $.each(parameters.fields, function (name, rules) {
                          if (typeof rules == 'string') {
                            rules = [rules];
                          }
                          parameters.fields[name] = {
                            rules: []
                          };
                          $.each(rules, function (index, rule) {
                            parameters.fields[name].rules.push({ type: rule });
                          });
                        });
                      }
                    }

                    settings = $.extend(true, {}, $.fn.form.settings, parameters);
                    validation = $.extend({}, $.fn.form.settings.defaults, settings.fields);
                    module.verbose('Extending settings', validation, settings);
                  }
                } else {
                  settings = $.fn.form.settings;
                  validation = $.fn.form.settings.defaults;
                  module.verbose('Using default form validation', validation, settings);
                }

                // shorthand
                namespace = settings.namespace;
                metadata = settings.metadata;
                selector = settings.selector;
                className = settings.className;
                regExp = settings.regExp;
                error = settings.error;
                moduleNamespace = 'module-' + namespace;
                eventNamespace = '.' + namespace;

                // grab instance
                instance = $module.data(moduleNamespace);

                // refresh selector cache
                module.refresh();
              },
              field: function (identifier) {
                module.verbose('Finding field with identifier', identifier);
                identifier = module.escape.string(identifier);
                if ($field.filter('#' + identifier).length > 0) {
                  return $field.filter('#' + identifier);
                } else if ($field.filter('[name="' + identifier + '"]').length > 0) {
                  return $field.filter('[name="' + identifier + '"]');
                } else if ($field.filter('[name="' + identifier + '[]"]').length > 0) {
                  return $field.filter('[name="' + identifier + '[]"]');
                } else if ($field.filter('[data-' + metadata.validate + '="' + identifier + '"]').length > 0) {
                  return $field.filter('[data-' + metadata.validate + '="' + identifier + '"]');
                }
                return $('<input/>');
              },
              fields: function (fields) {
                var $fields = $();
                $.each(fields, function (index, name) {
                  $fields = $fields.add(module.get.field(name));
                });
                return $fields;
              },
              validation: function ($field) {
                var fieldValidation, identifier;
                if (!validation) {
                  return false;
                }
                $.each(validation, function (fieldName, field) {
                  identifier = field.identifier || fieldName;
                  if (module.get.field(identifier)[0] == $field[0]) {
                    field.identifier = identifier;
                    fieldValidation = field;
                  }
                });
                return fieldValidation || false;
              },
              value: function (field) {
                var fields = [],
                    results;
                fields.push(field);
                results = module.get.values.call(element, fields);
                return results[field];
              },
              values: function (fields) {
                var $fields = $.isArray(fields) ? module.get.fields(fields) : $field,
                    values = {};
                $fields.each(function (index, field) {
                  var $field = $(field),
                      type = $field.prop('type'),
                      name = $field.prop('name'),
                      value = $field.val(),
                      isCheckbox = $field.is(selector.checkbox),
                      isRadio = $field.is(selector.radio),
                      isMultiple = name.indexOf('[]') !== -1,
                      isChecked = isCheckbox ? $field.is(':checked') : false;
                  if (name) {
                    if (isMultiple) {
                      name = name.replace('[]', '');
                      if (!values[name]) {
                        values[name] = [];
                      }
                      if (isCheckbox) {
                        if (isChecked) {
                          values[name].push(value || true);
                        } else {
                          values[name].push(false);
                        }
                      } else {
                        values[name].push(value);
                      }
                    } else {
                      if (isRadio) {
                        if (isChecked) {
                          values[name] = value;
                        }
                      } else if (isCheckbox) {
                        if (isChecked) {
                          values[name] = value || true;
                        } else {
                          values[name] = false;
                        }
                      } else {
                        values[name] = value;
                      }
                    }
                  }
                });
                return values;
              }
            },

            has: {

              field: function (identifier) {
                module.verbose('Checking for existence of a field with identifier', identifier);
                identifier = module.escape.string(identifier);
                if (typeof identifier !== 'string') {
                  module.error(error.identifier, identifier);
                }
                if ($field.filter('#' + identifier).length > 0) {
                  return true;
                } else if ($field.filter('[name="' + identifier + '"]').length > 0) {
                  return true;
                } else if ($field.filter('[data-' + metadata.validate + '="' + identifier + '"]').length > 0) {
                  return true;
                }
                return false;
              }

            },

            escape: {
              string: function (text) {
                text = String(text);
                return text.replace(regExp.escape, '\\$&');
              }
            },

            add: {
              prompt: function (identifier, errors) {
                var $field = module.get.field(identifier),
                    $fieldGroup = $field.closest($group),
                    $prompt = $fieldGroup.children(selector.prompt),
                    promptExists = $prompt.length !== 0;
                errors = typeof errors == 'string' ? [errors] : errors;
                module.verbose('Adding field error state', identifier);
                $fieldGroup.addClass(className.error);
                if (settings.inline) {
                  if (!promptExists) {
                    $prompt = settings.templates.prompt(errors);
                    $prompt.appendTo($fieldGroup);
                  }
                  $prompt.html(errors[0]);
                  if (!promptExists) {
                    if (settings.transition && $.fn.transition !== undefined && $module.transition('is supported')) {
                      module.verbose('Displaying error with css transition', settings.transition);
                      $prompt.transition(settings.transition + ' in', settings.duration);
                    } else {
                      module.verbose('Displaying error with fallback javascript animation');
                      $prompt.fadeIn(settings.duration);
                    }
                  } else {
                    module.verbose('Inline errors are disabled, no inline error added', identifier);
                  }
                }
              },
              errors: function (errors) {
                module.debug('Adding form error messages', errors);
                module.set.error();
                $message.html(settings.templates.error(errors));
              }
            },

            remove: {
              prompt: function (identifier) {
                var $field = module.get.field(identifier),
                    $fieldGroup = $field.closest($group),
                    $prompt = $fieldGroup.children(selector.prompt);
                $fieldGroup.removeClass(className.error);
                if (settings.inline && $prompt.is(':visible')) {
                  module.verbose('Removing prompt for field', identifier);
                  if (settings.transition && $.fn.transition !== undefined && $module.transition('is supported')) {
                    $prompt.transition(settings.transition + ' out', settings.duration, function () {
                      $prompt.remove();
                    });
                  } else {
                    $prompt.fadeOut(settings.duration, function () {
                      $prompt.remove();
                    });
                  }
                }
              }
            },

            set: {
              success: function () {
                $module.removeClass(className.error).addClass(className.success);
              },
              defaults: function () {
                $field.each(function () {
                  var $field = $(this),
                      isCheckbox = $field.filter(selector.checkbox).length > 0,
                      value = isCheckbox ? $field.is(':checked') : $field.val();
                  $field.data(metadata.defaultValue, value);
                });
              },
              error: function () {
                // $module
                //   .removeClass(className.success)
                //   .addClass(className.error)
                // ;
              },
              value: function (field, value) {
                var fields = {};
                fields[field] = value;
                return module.set.values.call(element, fields);
              },
              values: function (fields) {
                if ($.isEmptyObject(fields)) {
                  return;
                }
                $.each(fields, function (key, value) {
                  var $field = module.get.field(key),
                      $element = $field.parent(),
                      isMultiple = $.isArray(value),
                      isCheckbox = $element.is(selector.uiCheckbox),
                      isDropdown = $element.is(selector.uiDropdown),
                      isRadio = $field.is(selector.radio) && isCheckbox,
                      fieldExists = $field.length > 0,
                      $multipleField;
                  if (fieldExists) {
                    if (isMultiple && isCheckbox) {
                      module.verbose('Selecting multiple', value, $field);
                      $element.checkbox('uncheck');
                      $.each(value, function (index, value) {
                        $multipleField = $field.filter('[value="' + value + '"]');
                        $element = $multipleField.parent();
                        if ($multipleField.length > 0) {
                          $element.checkbox('check');
                        }
                      });
                    } else if (isRadio) {
                      module.verbose('Selecting radio value', value, $field);
                      $field.filter('[value="' + value + '"]').parent(selector.uiCheckbox).checkbox('check');
                    } else if (isCheckbox) {
                      module.verbose('Setting checkbox value', value, $element);
                      if (value === true) {
                        $element.checkbox('check');
                      } else {
                        $element.checkbox('uncheck');
                      }
                    } else if (isDropdown) {
                      module.verbose('Setting dropdown value', value, $element);
                      $element.selectDropdown('set selected', value);
                    } else {
                      module.verbose('Setting field value', value, $field);
                      $field.val(value);
                    }
                  }
                });
              }
            },

            validate: {

              form: function (event, ignoreCallbacks) {
                var values = module.get.values(),
                    apiRequest;

                // input keydown event will fire submit repeatedly by browser default
                if (keyHeldDown) {
                  return false;
                }

                // reset errors
                formErrors = [];
                if (module.determine.isValid()) {
                  module.debug('Form has no validation errors, submitting');
                  module.set.success();
                  if (ignoreCallbacks !== true) {
                    return settings.onSuccess.call(element, event, values);
                  }
                } else {
                  module.debug('Form has errors');
                  module.set.error();
                  if (!settings.inline) {
                    module.add.errors(formErrors);
                  }
                  // prevent ajax submit
                  if ($module.data('moduleApi') !== undefined) {
                    event.stopImmediatePropagation();
                  }
                  if (ignoreCallbacks !== true) {
                    return settings.onFailure.call(element, formErrors, values);
                  }
                }
              },

              // takes a validation object and returns whether field passes validation
              field: function (field, fieldName, showErrors) {
                showErrors = showErrors !== undefined ? showErrors : true;
                if (typeof field == 'string') {
                  module.verbose('Validating field', field);
                  fieldName = field;
                  field = validation[field];
                }
                var identifier = field.identifier || fieldName,
                    $field = module.get.field(identifier),
                    $dependsField = field.depends ? module.get.field(field.depends) : false,
                    fieldValid = true,
                    fieldErrors = [];
                if (!field.identifier) {
                  module.debug('Using field name as identifier', identifier);
                  field.identifier = identifier;
                }
                if ($field.prop('disabled')) {
                  module.debug('Field is disabled. Skipping', identifier);
                  fieldValid = true;
                } else if (field.optional && module.is.blank($field)) {
                  module.debug('Field is optional and blank. Skipping', identifier);
                  fieldValid = true;
                } else if (field.depends && module.is.empty($dependsField)) {
                  module.debug('Field depends on another value that is not present or empty. Skipping', $dependsField);
                  fieldValid = true;
                } else if (field.rules !== undefined) {
                  $.each(field.rules, function (index, rule) {
                    if (module.has.field(identifier) && !module.validate.rule(field, rule)) {
                      module.debug('Field is invalid', identifier, rule.type);
                      fieldErrors.push(module.get.prompt(rule, field));
                      fieldValid = false;
                    }
                  });
                }
                if (fieldValid) {
                  if (showErrors) {
                    module.remove.prompt(identifier, fieldErrors);
                    settings.onValid.call($field);
                  }
                } else {
                  if (showErrors) {
                    formErrors = formErrors.concat(fieldErrors);
                    module.add.prompt(identifier, fieldErrors);
                    settings.onInvalid.call($field, fieldErrors);
                  }
                  return false;
                }
                return true;
              },

              // takes validation rule and returns whether field passes rule
              rule: function (field, rule) {
                var $field = module.get.field(field.identifier),
                    type = rule.type,
                    value = $field.val(),
                    isValid = true,
                    ancillary = module.get.ancillaryValue(rule),
                    ruleName = module.get.ruleName(rule),
                    ruleFunction = settings.rules[ruleName];
                if (!$.isFunction(ruleFunction)) {
                  module.error(error.noRule, ruleName);
                  return;
                }
                // cast to string avoiding encoding special values
                value = value === undefined || value === '' || value === null ? '' : $.trim(value + '');
                return ruleFunction.call($field, value, ancillary);
              }
            },

            setting: function (name, value) {
              if ($.isPlainObject(name)) {
                $.extend(true, settings, name);
              } else if (value !== undefined) {
                settings[name] = value;
              } else {
                return settings[name];
              }
            },
            internal: function (name, value) {
              if ($.isPlainObject(name)) {
                $.extend(true, module, name);
              } else if (value !== undefined) {
                module[name] = value;
              } else {
                return module[name];
              }
            },
            debug: function () {
              if (!settings.silent && settings.debug) {
                if (settings.performance) {
                  module.performance.log(arguments);
                } else {
                  module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
                  module.debug.apply(console, arguments);
                }
              }
            },
            verbose: function () {
              if (!settings.silent && settings.verbose && settings.debug) {
                if (settings.performance) {
                  module.performance.log(arguments);
                } else {
                  module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
                  module.verbose.apply(console, arguments);
                }
              }
            },
            error: function () {
              if (!settings.silent) {
                module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
                module.error.apply(console, arguments);
              }
            },
            performance: {
              log: function (message) {
                var currentTime, executionTime, previousTime;
                if (settings.performance) {
                  currentTime = new Date().getTime();
                  previousTime = time || currentTime;
                  executionTime = currentTime - previousTime;
                  time = currentTime;
                  performance.push({
                    'Name': message[0],
                    'Arguments': [].slice.call(message, 1) || '',
                    'Element': element,
                    'Execution Time': executionTime
                  });
                }
                clearTimeout(module.performance.timer);
                module.performance.timer = setTimeout(module.performance.display, 500);
              },
              display: function () {
                var title = settings.name + ':',
                    totalTime = 0;
                time = false;
                clearTimeout(module.performance.timer);
                $.each(performance, function (index, data) {
                  totalTime += data['Execution Time'];
                });
                title += ' ' + totalTime + 'ms';
                if (moduleSelector) {
                  title += ' \'' + moduleSelector + '\'';
                }
                if ($allModules.length > 1) {
                  title += ' ' + '(' + $allModules.length + ')';
                }
                if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
                  console.groupCollapsed(title);
                  if (console.table) {
                    console.table(performance);
                  } else {
                    $.each(performance, function (index, data) {
                      console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                    });
                  }
                  console.groupEnd();
                }
                performance = [];
              }
            },
            invoke: function (query, passedArguments, context) {
              var object = instance,
                  maxDepth,
                  found,
                  response;
              passedArguments = passedArguments || queryArguments;
              context = element || context;
              if (typeof query == 'string' && object !== undefined) {
                query = query.split(/[\. ]/);
                maxDepth = query.length - 1;
                $.each(query, function (depth, value) {
                  var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;
                  if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                    object = object[camelCaseValue];
                  } else if (object[camelCaseValue] !== undefined) {
                    found = object[camelCaseValue];
                    return false;
                  } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                    object = object[value];
                  } else if (object[value] !== undefined) {
                    found = object[value];
                    return false;
                  } else {
                    return false;
                  }
                });
              }
              if ($.isFunction(found)) {
                response = found.apply(context, passedArguments);
              } else if (found !== undefined) {
                response = found;
              }
              if ($.isArray(returnedValue)) {
                returnedValue.push(response);
              } else if (returnedValue !== undefined) {
                returnedValue = [returnedValue, response];
              } else if (response !== undefined) {
                returnedValue = response;
              }
              return found;
            }
          };
          module.initialize();
        });

        return returnedValue !== undefined ? returnedValue : this;
      };

      $.fn.form.settings = {

        name: 'Form',
        namespace: 'form',

        debug: false,
        verbose: false,
        performance: true,

        fields: false,

        keyboardShortcuts: true,
        on: 'submit',
        inline: false,

        delay: 200,
        revalidate: true,

        transition: 'scale',
        duration: 200,

        onValid: function () {},
        onInvalid: function () {},
        onSuccess: function () {
          return true;
        },
        onFailure: function () {
          return false;
        },

        metadata: {
          defaultValue: 'default',
          validate: 'validate'
        },

        regExp: {
          htmlID: /^[a-zA-Z][\w:.-]*$/g,
          bracket: /\[(.*)\]/i,
          decimal: /^\d+\.?\d*$/,
          email: /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,
          escape: /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,
          flags: /^\/(.*)\/(.*)?/,
          integer: /^\-?\d+$/,
          number: /^\-?\d*(\.\d+)?$/,
          url: /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/i
        },

        text: {
          unspecifiedRule: 'Please enter a valid value',
          unspecifiedField: 'This field'
        },

        prompt: {
          empty: '{name} must have a value',
          checked: '{name} must be checked',
          email: '{name} must be a valid e-mail',
          url: '{name} must be a valid url',
          regExp: '{name} is not formatted correctly',
          integer: '{name} must be an integer',
          decimal: '{name} must be a decimal number',
          number: '{name} must be set to a number',
          is: '{name} must be "{ruleValue}"',
          isExactly: '{name} must be exactly "{ruleValue}"',
          not: '{name} cannot be set to "{ruleValue}"',
          notExactly: '{name} cannot be set to exactly "{ruleValue}"',
          contain: '{name} cannot contain "{ruleValue}"',
          containExactly: '{name} cannot contain exactly "{ruleValue}"',
          doesntContain: '{name} must contain  "{ruleValue}"',
          doesntContainExactly: '{name} must contain exactly "{ruleValue}"',
          minLength: '{name} must be at least {ruleValue} characters',
          length: '{name} must be at least {ruleValue} characters',
          exactLength: '{name} must be exactly {ruleValue} characters',
          maxLength: '{name} cannot be longer than {ruleValue} characters',
          match: '{name} must match {ruleValue} field',
          different: '{name} must have a different value than {ruleValue} field',
          creditCard: '{name} must be a valid credit card number',
          minCount: '{name} must have at least {ruleValue} choices',
          exactCount: '{name} must have exactly {ruleValue} choices',
          maxCount: '{name} must have {ruleValue} or less choices'
        },

        selector: {
          checkbox: 'input[type="checkbox"], input[type="radio"]',
          clear: '.clear',
          field: 'input, textarea, select',
          group: '.form-group',
          ignore: '',
          input: 'input',
          message: '.error.message',
          prompt: '.form-control-feedback',
          radio: 'input[type="radio"]',
          reset: '.reset:not([type="reset"])',
          submit: '.submit:not([type="submit"])',
          uiCheckbox: '.ui.checkbox',
          uiDropdown: '.ui.select-dropdown'
        },

        className: {
          error: 'has-danger',
          label: 'form-control-feedback',
          pressed: 'down',
          success: 'success'
        },

        error: {
          identifier: 'You must specify a string identifier for each field',
          method: 'The method you called is not defined.',
          noRule: 'There is no rule matching the one you specified',
          oldSyntax: 'Starting in 2.0 forms now only take a single settings object. Validation settings converted to new syntax automatically.'
        },

        templates: {

          // template that produces error message
          error: function (errors) {
            var html = '<ul class="list">';
            $.each(errors, function (index, value) {
              html += '<li>' + value + '</li>';
            });
            html += '</ul>';
            return $(html);
          },

          // template that produces label
          prompt: function (errors) {
            return $('<div/>').addClass('form-control-feedback').html(errors[0]);
          }
        },

        rules: {

          // is not empty or blank string
          empty: function (value) {
            return !(value === undefined || '' === value || $.isArray(value) && value.length === 0);
          },

          // checkbox checked
          checked: function () {
            return $(this).filter(':checked').length > 0;
          },

          // is most likely an email
          email: function (value) {
            return $.fn.form.settings.regExp.email.test(value);
          },

          // value is most likely url
          url: function (value) {
            return $.fn.form.settings.regExp.url.test(value);
          },

          // matches specified regExp
          regExp: function (value, regExp) {
            if (regExp instanceof RegExp) {
              return value.match(regExp);
            }
            var regExpParts = regExp.match($.fn.form.settings.regExp.flags),
                flags;
            // regular expression specified as /baz/gi (flags)
            if (regExpParts) {
              regExp = regExpParts.length >= 2 ? regExpParts[1] : regExp;
              flags = regExpParts.length >= 3 ? regExpParts[2] : '';
            }
            return value.match(new RegExp(regExp, flags));
          },

          // is valid integer or matches range
          integer: function (value, range) {
            var intRegExp = $.fn.form.settings.regExp.integer,
                min,
                max,
                parts;
            if (!range || ['', '..'].indexOf(range) !== -1) {
              // do nothing
            } else if (range.indexOf('..') == -1) {
              if (intRegExp.test(range)) {
                min = max = range - 0;
              }
            } else {
              parts = range.split('..', 2);
              if (intRegExp.test(parts[0])) {
                min = parts[0] - 0;
              }
              if (intRegExp.test(parts[1])) {
                max = parts[1] - 0;
              }
            }
            return intRegExp.test(value) && (min === undefined || value >= min) && (max === undefined || value <= max);
          },

          // is valid number (with decimal)
          decimal: function (value) {
            return $.fn.form.settings.regExp.decimal.test(value);
          },

          // is valid number
          number: function (value) {
            return $.fn.form.settings.regExp.number.test(value);
          },

          // is value (case insensitive)
          is: function (value, text) {
            text = typeof text == 'string' ? text.toLowerCase() : text;
            value = typeof value == 'string' ? value.toLowerCase() : value;
            return value == text;
          },

          // is value
          isExactly: function (value, text) {
            return value == text;
          },

          // value is not another value (case insensitive)
          not: function (value, notValue) {
            value = typeof value == 'string' ? value.toLowerCase() : value;
            notValue = typeof notValue == 'string' ? notValue.toLowerCase() : notValue;
            return value != notValue;
          },

          // value is not another value (case sensitive)
          notExactly: function (value, notValue) {
            return value != notValue;
          },

          // value contains text (insensitive)
          contains: function (value, text) {
            // escape regex characters
            text = text.replace($.fn.form.settings.regExp.escape, "\\$&");
            return value.search(new RegExp(text, 'i')) !== -1;
          },

          // value contains text (case sensitive)
          containsExactly: function (value, text) {
            // escape regex characters
            text = text.replace($.fn.form.settings.regExp.escape, "\\$&");
            return value.search(new RegExp(text)) !== -1;
          },

          // value contains text (insensitive)
          doesntContain: function (value, text) {
            // escape regex characters
            text = text.replace($.fn.form.settings.regExp.escape, "\\$&");
            return value.search(new RegExp(text, 'i')) === -1;
          },

          // value contains text (case sensitive)
          doesntContainExactly: function (value, text) {
            // escape regex characters
            text = text.replace($.fn.form.settings.regExp.escape, "\\$&");
            return value.search(new RegExp(text)) === -1;
          },

          // is at least string length
          minLength: function (value, requiredLength) {
            return value !== undefined ? value.length >= requiredLength : false;
          },

          // see rls notes for 2.0.6 (this is a duplicate of minLength)
          length: function (value, requiredLength) {
            return value !== undefined ? value.length >= requiredLength : false;
          },

          // is exactly length
          exactLength: function (value, requiredLength) {
            return value !== undefined ? value.length == requiredLength : false;
          },

          // is less than length
          maxLength: function (value, maxLength) {
            return value !== undefined ? value.length <= maxLength : false;
          },

          // matches another field
          match: function (value, identifier) {
            var $form = $(this),
                matchingValue;
            if ($('[data-validate="' + identifier + '"]').length > 0) {
              matchingValue = $('[data-validate="' + identifier + '"]').val();
            } else if ($('#' + identifier).length > 0) {
              matchingValue = $('#' + identifier).val();
            } else if ($('[name="' + identifier + '"]').length > 0) {
              matchingValue = $('[name="' + identifier + '"]').val();
            } else if ($('[name="' + identifier + '[]"]').length > 0) {
              matchingValue = $('[name="' + identifier + '[]"]');
            }
            return matchingValue !== undefined ? value.toString() == matchingValue.toString() : false;
          },

          // different than another field
          different: function (value, identifier) {
            // use either id or name of field
            var $form = $(this),
                matchingValue;
            if ($('[data-validate="' + identifier + '"]').length > 0) {
              matchingValue = $('[data-validate="' + identifier + '"]').val();
            } else if ($('#' + identifier).length > 0) {
              matchingValue = $('#' + identifier).val();
            } else if ($('[name="' + identifier + '"]').length > 0) {
              matchingValue = $('[name="' + identifier + '"]').val();
            } else if ($('[name="' + identifier + '[]"]').length > 0) {
              matchingValue = $('[name="' + identifier + '[]"]');
            }
            return matchingValue !== undefined ? value.toString() !== matchingValue.toString() : false;
          },

          creditCard: function (cardNumber, cardTypes) {
            var cards = {
              visa: {
                pattern: /^4/,
                length: [16]
              },
              amex: {
                pattern: /^3[47]/,
                length: [15]
              },
              mastercard: {
                pattern: /^5[1-5]/,
                length: [16]
              },
              discover: {
                pattern: /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,
                length: [16]
              },
              unionPay: {
                pattern: /^(62|88)/,
                length: [16, 17, 18, 19]
              },
              jcb: {
                pattern: /^35(2[89]|[3-8][0-9])/,
                length: [16]
              },
              maestro: {
                pattern: /^(5018|5020|5038|6304|6759|676[1-3])/,
                length: [12, 13, 14, 15, 16, 17, 18, 19]
              },
              dinersClub: {
                pattern: /^(30[0-5]|^36)/,
                length: [14]
              },
              laser: {
                pattern: /^(6304|670[69]|6771)/,
                length: [16, 17, 18, 19]
              },
              visaElectron: {
                pattern: /^(4026|417500|4508|4844|491(3|7))/,
                length: [16]
              }
            },
                valid = {},
                validCard = false,
                requiredTypes = typeof cardTypes == 'string' ? cardTypes.split(',') : false,
                unionPay,
                validation;

            if (typeof cardNumber !== 'string' || cardNumber.length === 0) {
              return;
            }

            // allow dashes in card
            cardNumber = cardNumber.replace(/[\-]/g, '');

            // verify card types
            if (requiredTypes) {
              $.each(requiredTypes, function (index, type) {
                // verify each card type
                validation = cards[type];
                if (validation) {
                  valid = {
                    length: $.inArray(cardNumber.length, validation.length) !== -1,
                    pattern: cardNumber.search(validation.pattern) !== -1
                  };
                  if (valid.length && valid.pattern) {
                    validCard = true;
                  }
                }
              });

              if (!validCard) {
                return false;
              }
            }

            // skip luhn for UnionPay
            unionPay = {
              number: $.inArray(cardNumber.length, cards.unionPay.length) !== -1,
              pattern: cardNumber.search(cards.unionPay.pattern) !== -1
            };
            if (unionPay.number && unionPay.pattern) {
              return true;
            }

            // verify luhn, adapted from  <https://gist.github.com/2134376>
            var length = cardNumber.length,
                multiple = 0,
                producedValue = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]],
                sum = 0;
            while (length--) {
              sum += producedValue[multiple][parseInt(cardNumber.charAt(length), 10)];
              multiple ^= 1;
            }
            return sum % 10 === 0 && sum > 0;
          },

          minCount: function (value, minCount) {
            if (minCount == 0) {
              return true;
            }
            if (minCount == 1) {
              return value !== '';
            }
            return value.split(',').length >= minCount;
          },

          exactCount: function (value, exactCount) {
            if (exactCount == 0) {
              return value === '';
            }
            if (exactCount == 1) {
              return value !== '' && value.search(',') === -1;
            }
            return value.split(',').length == exactCount;
          },

          maxCount: function (value, maxCount) {
            if (maxCount == 0) {
              return false;
            }
            if (maxCount == 1) {
              return value.search(',') === -1;
            }
            return value.split(',').length <= maxCount;
          }
        }

      };
    })(jQuery, window, document);
  })(this);

  return _retrieveGlobal();
});
System.registerDynamic("reactiveadmintemplate/scripts/modules/form/validation/init.js", ["./main"], true, function ($__require, exports, module) {
    'use strict';

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    /*!
     * @version: 1.1.2
     * @name: picker
     *
     * @author: https://themeforest.net/user/flexlayers
     */
    $__require("./main");
    $(function () {
        var fields = {
            name: {
                identifier: 'name',
                rules: [{ type: 'empty', prompt: 'Please enter your name' }]
            },
            email: {
                identifier: 'email',
                rules: [{ type: 'email', prompt: 'Please enter a valid e-mail' }]
            },
            url: {
                identifier: 'url',
                rules: [{ type: 'url', prompt: 'Please enter a url' }]
            },
            number: {
                identifier: 'number',
                rules: [{ type: 'number', prompt: 'Please enter a valid number' }]
            },
            integer: {
                identifier: 'integer',
                rules: [{ type: 'integer[1..100]', prompt: 'Please enter an integer value' }]
            },
            decimal: {
                identifier: 'decimal',
                rules: [{ type: 'decimal', prompt: 'Please enter a valid desimal number' }]
            },
            exactCard: {
                identifier: 'exact-card',
                rules: [{ type: 'creditCard[visa,amex,maestro]', prompt: 'Please enter a valid credit card' }]
            },
            visa: {
                identifier: 'visa',
                rules: [{ type: 'creditCard[visa]', prompt: 'Please enter a valid credit card' }]
            },
            amex: {
                identifier: 'amex',
                rules: [{ type: 'creditCard[amex]', prompt: 'Please enter a valid credit card' }]
            },
            mastercard: {
                identifier: 'mastercard',
                rules: [{ type: 'creditCard[mastercard]', prompt: 'Please enter a valid credit card' }]
            },
            discover: {
                identifier: 'discover',
                rules: [{ type: 'creditCard[discover]', prompt: 'Please enter a valid credit card' }]
            },
            unionpay: {
                identifier: 'unionpay',
                rules: [{ type: 'creditCard[unionpay]', prompt: 'Please enter a valid credit card' }]
            },
            jcb: {
                identifier: 'jcb',
                rules: [{ type: 'creditCard[jcb]', prompt: 'Please enter a valid credit card' }]
            },
            dinersClub: {
                identifier: 'dinersClub',
                rules: [{ type: 'creditCard[dinersClub]', prompt: 'Please enter a valid credit card' }]
            },
            maestro: {
                identifier: 'maestro',
                rules: [{ type: 'creditCard[maestro]', prompt: 'Please enter a valid credit card' }]
            },
            laser: {
                identifier: 'laser',
                rules: [{ type: 'creditCard[laser]', prompt: 'Please enter a valid credit card' }]
            },
            visaElectron: {
                identifier: 'visaElectron',
                rules: [{ type: 'creditCard[visaElectron]', prompt: 'Please enter a valid credit card' }]
            },
            card: {
                identifier: 'card',
                rules: [{ type: 'creditCard', prompt: 'Please enter a valid credit card' }]
            },
            regex: {
                identifier: 'regex',
                rules: [{ type: 'regExp[/^[a-z0-9_-]{4,16}$/]', prompt: 'Please enter a 4-16 letter username' }]
            },
            gender: {
                identifier: 'gender',
                rules: [{ type: 'empty', prompt: 'Please select a gender' }]
            },
            minCount: {
                identifier: 'minCount',
                rules: [{ type: 'minCount[2]', prompt: 'Please select at least two skills' }]
            },
            maxCount: {
                identifier: 'maxCount',
                rules: [{ type: 'maxCount[2]', prompt: 'Please select a max of two skills' }]
            },
            exactCount: {
                identifier: 'exactCount',
                rules: [{ type: 'exactCount[2]', prompt: 'Please select two skills' }]
            },
            password: {
                identifier: 'password',
                rules: [{ type: 'empty', prompt: 'Please enter a password' }, { type: 'minLength[6]', prompt: 'Your password must be at least {ruleValue} characters' }]
            },
            minLength: {
                identifier: 'minLength',
                rules: [{ type: 'minLength[6]', prompt: 'Please type at least {ruleValue} characters' }]
            },
            exactLength: {
                identifier: 'exactLength',
                rules: [{ type: 'exactLength[6]', prompt: 'Please enter exactly 6 characters' }]
            },
            maxLength: {
                identifier: 'maxLength',
                rules: [{ type: 'maxLength[6]', prompt: 'Please enter at most 6 characters' }]
            },
            checked: {
                identifier: 'checked',
                rules: [{ type: 'checked', prompt: 'You must agree to the terms and conditions' }]
            },
            color: {
                identifier: 'color',
                rules: [{ type: 'regExp', value: /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/i }]
            },
            match: {
                identifier: 'match2',
                rules: [{ type: 'match[match1]', prompt: 'Please put the same value in both fields' }]
            },
            different: {
                identifier: 'different2',
                rules: [{ type: 'different[different1]', prompt: 'Please put different values for each field' }]
            }
        };
        $('.form-validation').form({
            on: 'change',
            inline: true,
            fields: fields
        });
        $('.form-validation-submit').form({
            on: 'submit',
            inline: true,
            fields: fields
        });
        $('.form-validation-blur').form({
            on: 'blur',
            inline: true,
            fields: fields
        });
        $('.form-validation-error-list').form({
            on: 'submit',
            onFailure: function () {
                $(this).find('.modal').modal('show');
                return false;
            },
            fields: fields
        });
    });
});
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
 * @version: 1.1.2
 * @name: Adapted datatimepicker plugin
 *
 * @author: https://themeforest.net/user/flexlayers
 */
/*! version : 4.17.47
 =========================================================
 bootstrap-datetimejs
 https://github.com/Eonasdan/bootstrap--datetimepicker
 Copyright (c) 2015 Jonathan Peterson
 =========================================================
 */
/*
 The MIT License (MIT)

 Copyright (c) 2015 Jonathan Peterson

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */
/*global define:false */
/*global exports:false */
/*global require:false */
/*global jQuery:false */
/*global moment:false */
(function (factory) {
    'use strict';

    if ('function' === 'function' && true) {
        // AMD is used - Register as an anonymous module.
        System.registerDynamic('reactiveadmintemplate/scripts/modules/form/datatimepicker/main.js', ['jquery', 'moment'], false, function ($__require, $__exports, $__module) {
            if (typeof factory === 'function') {
                return factory.call(this, $__require('jquery'), $__require('moment'));
            } else {
                return factory;
            }
        });
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'), require('moment'));
    } else {
        // Neither AMD nor CommonJS used. Use global variables.
        if (typeof jQuery === 'undefined') {
            throw 'bs-datetimepicker requires jQuery to be loaded first';
        }
        if (typeof moment === 'undefined') {
            throw 'bs-datetimepicker requires Moment.js to be loaded first';
        }
        factory(jQuery, moment);
    }
})(function ($, moment) {
    'use strict';

    if (!moment) {
        throw new Error('bs-datetimepicker requires Moment.js to be loaded first');
    }

    var dateTimePicker = function (element, options) {
        var picker = {},
            date,
            viewDate,
            unset = true,
            input,
            component = false,
            widget = false,
            use24Hours,
            minViewModeNumber = 0,
            actualFormat,
            parseFormats,
            currentViewMode,
            datePickerModes = [{
            clsName: 'days',
            navFnc: 'M',
            navStep: 1
        }, {
            clsName: 'months',
            navFnc: 'y',
            navStep: 1
        }, {
            clsName: 'years',
            navFnc: 'y',
            navStep: 10
        }, {
            clsName: 'decades',
            navFnc: 'y',
            navStep: 100
        }],
            viewModes = ['days', 'months', 'years', 'decades'],
            verticalModes = ['top', 'bottom', 'auto'],
            horizontalModes = ['left', 'right', 'auto'],
            toolbarPlacements = ['default', 'top', 'bottom'],
            keyMap = {
            'up': 38,
            38: 'up',
            'down': 40,
            40: 'down',
            'left': 37,
            37: 'left',
            'right': 39,
            39: 'right',
            'tab': 9,
            9: 'tab',
            'escape': 27,
            27: 'escape',
            'enter': 13,
            13: 'enter',
            'pageUp': 33,
            33: 'pageUp',
            'pageDown': 34,
            34: 'pageDown',
            'shift': 16,
            16: 'shift',
            'control': 17,
            17: 'control',
            'space': 32,
            32: 'space',
            't': 84,
            84: 't',
            'delete': 46,
            46: 'delete'
        },
            keyState = {},


        /********************************************************************************
         *
         * Private functions
         *
         ********************************************************************************/

        hasTimeZone = function () {
            return moment.tz !== undefined && options.timeZone !== undefined && options.timeZone !== null && options.timeZone !== '';
        },
            getMoment = function (d) {
            var returnMoment;

            if (d === undefined || d === null) {
                returnMoment = moment(); //TODO should this use format? and locale?
            } else if (moment.isDate(d) || moment.isMoment(d)) {
                // If the date that is passed in is already a Date() or moment() object,
                // pass it directly to moment.
                returnMoment = moment(d);
            } else if (hasTimeZone()) {
                // There is a string to parse and a default time zone
                // parse with the tz function which takes a default time zone if it is not in the format string
                returnMoment = moment.tz(d, parseFormats, options.useStrict, options.timeZone);
            } else {
                returnMoment = moment(d, parseFormats, options.useStrict);
            }

            if (hasTimeZone()) {
                returnMoment.tz(options.timeZone);
            }

            return returnMoment;
        },
            isEnabled = function (granularity) {
            if (typeof granularity !== 'string' || granularity.length > 1) {
                throw new TypeError('isEnabled expects a single character string parameter');
            }
            switch (granularity) {
                case 'y':
                    return actualFormat.indexOf('Y') !== -1;
                case 'M':
                    return actualFormat.indexOf('M') !== -1;
                case 'd':
                    return actualFormat.toLowerCase().indexOf('d') !== -1;
                case 'h':
                case 'H':
                    return actualFormat.toLowerCase().indexOf('h') !== -1;
                case 'm':
                    return actualFormat.indexOf('m') !== -1;
                case 's':
                    return actualFormat.indexOf('s') !== -1;
                default:
                    return false;
            }
        },
            hasTime = function () {
            return isEnabled('h') || isEnabled('m') || isEnabled('s');
        },
            hasDate = function () {
            return isEnabled('y') || isEnabled('M') || isEnabled('d');
        },
            getDatePickerTemplate = function () {
            var headTemplate = $('<thead>').append($('<tr>').append($('<th>').addClass('prev').attr('data-action', 'previous').append($('<span>').addClass(options.icons.previous))).append($('<th>').addClass('picker-switch').attr('data-action', 'pickerSwitch').attr('colspan', options.calendarWeeks ? '6' : '5')).append($('<th>').addClass('next').attr('data-action', 'next').append($('<span>').addClass(options.icons.next)))),
                contTemplate = $('<tbody>').append($('<tr>').append($('<td>').attr('colspan', options.calendarWeeks ? '8' : '7')));

            return [$('<div>').addClass('bs-datepicker-days').append($('<table>').addClass('table-condensed').append(headTemplate).append($('<tbody>'))), $('<div>').addClass('bs-datepicker-months').append($('<table>').addClass('table-condensed').append(headTemplate.clone()).append(contTemplate.clone())), $('<div>').addClass('bs-datepicker-years').append($('<table>').addClass('table-condensed').append(headTemplate.clone()).append(contTemplate.clone())), $('<div>').addClass('bs-datepicker-decades').append($('<table>').addClass('table-condensed').append(headTemplate.clone()).append(contTemplate.clone()))];
        },
            getTimePickerMainTemplate = function () {
            var topRow = $('<tr>'),
                middleRow = $('<tr>'),
                bottomRow = $('<tr>');

            if (isEnabled('h')) {
                topRow.append($('<td>').append($('<a>').attr({ href: '#', tabindex: '-1', 'title': options.tooltips.incrementHour }).addClass('btn').attr('data-action', 'incrementHours').append($('<span>').addClass(options.icons.up))));
                middleRow.append($('<td>').append($('<span>').addClass('timepicker-hour').attr({ 'data-time-component': 'hours', 'title': options.tooltips.pickHour }).attr('data-action', 'showHours')));
                bottomRow.append($('<td>').append($('<a>').attr({ href: '#', tabindex: '-1', 'title': options.tooltips.decrementHour }).addClass('btn').attr('data-action', 'decrementHours').append($('<span>').addClass(options.icons.down))));
            }
            if (isEnabled('m')) {
                if (isEnabled('h')) {
                    topRow.append($('<td>').addClass('separator'));
                    middleRow.append($('<td>').addClass('separator').html(':'));
                    bottomRow.append($('<td>').addClass('separator'));
                }
                topRow.append($('<td>').append($('<a>').attr({ href: '#', tabindex: '-1', 'title': options.tooltips.incrementMinute }).addClass('btn').attr('data-action', 'incrementMinutes').append($('<span>').addClass(options.icons.up))));
                middleRow.append($('<td>').append($('<span>').addClass('timepicker-minute').attr({ 'data-time-component': 'minutes', 'title': options.tooltips.pickMinute }).attr('data-action', 'showMinutes')));
                bottomRow.append($('<td>').append($('<a>').attr({ href: '#', tabindex: '-1', 'title': options.tooltips.decrementMinute }).addClass('btn').attr('data-action', 'decrementMinutes').append($('<span>').addClass(options.icons.down))));
            }
            if (isEnabled('s')) {
                if (isEnabled('m')) {
                    topRow.append($('<td>').addClass('separator'));
                    middleRow.append($('<td>').addClass('separator').html(':'));
                    bottomRow.append($('<td>').addClass('separator'));
                }
                topRow.append($('<td>').append($('<a>').attr({ href: '#', tabindex: '-1', 'title': options.tooltips.incrementSecond }).addClass('btn').attr('data-action', 'incrementSeconds').append($('<span>').addClass(options.icons.up))));
                middleRow.append($('<td>').append($('<span>').addClass('timepicker-second').attr({ 'data-time-component': 'seconds', 'title': options.tooltips.pickSecond }).attr('data-action', 'showSeconds')));
                bottomRow.append($('<td>').append($('<a>').attr({ href: '#', tabindex: '-1', 'title': options.tooltips.decrementSecond }).addClass('btn').attr('data-action', 'decrementSeconds').append($('<span>').addClass(options.icons.down))));
            }

            if (!use24Hours) {
                topRow.append($('<td>').addClass('separator'));
                middleRow.append($('<td>').append($('<button>').addClass('btn btn-primary').attr({ 'data-action': 'togglePeriod', tabindex: '-1', 'title': options.tooltips.togglePeriod })));
                bottomRow.append($('<td>').addClass('separator'));
            }

            return $('<div>').addClass('timepicker-picker').append($('<table>').addClass('table-condensed').append([topRow, middleRow, bottomRow]));
        },
            getTimePickerTemplate = function () {
            var hoursView = $('<div>').addClass('timepicker-hours').append($('<table>').addClass('table-condensed')),
                minutesView = $('<div>').addClass('timepicker-minutes').append($('<table>').addClass('table-condensed')),
                secondsView = $('<div>').addClass('timepicker-seconds').append($('<table>').addClass('table-condensed')),
                ret = [getTimePickerMainTemplate()];

            if (isEnabled('h')) {
                ret.push(hoursView);
            }
            if (isEnabled('m')) {
                ret.push(minutesView);
            }
            if (isEnabled('s')) {
                ret.push(secondsView);
            }

            return ret;
        },
            getToolbar = function () {
            var row = [];
            if (options.showTodayButton) {
                row.push($('<td>').append($('<a>').attr({ 'data-action': 'today', 'title': options.tooltips.today }).append($('<span>').addClass(options.icons.today))));
            }
            if (!options.sideBySide && hasDate() && hasTime()) {
                row.push($('<td>').append($('<a>').attr({ 'data-action': 'togglePicker', 'title': options.tooltips.selectTime }).append($('<span>').addClass(options.icons.time))));
            }
            if (options.showClear) {
                row.push($('<td>').append($('<a>').attr({ 'data-action': 'clear', 'title': options.tooltips.clear }).append($('<span>').addClass(options.icons.clear))));
            }
            if (options.showClose) {
                row.push($('<td>').append($('<a>').attr({ 'data-action': 'close', 'title': options.tooltips.close }).append($('<span>').addClass(options.icons.close))));
            }
            return $('<table>').addClass('table-condensed').append($('<tbody>').append($('<tr>').append(row)));
        },
            getTemplate = function () {
            var template = $('<div>').addClass('bs-datetimepicker-widget dropdown-menu'),
                dateView = $('<div>').addClass('bs-datepicker').append(getDatePickerTemplate()),
                timeView = $('<div>').addClass('timepicker').append(getTimePickerTemplate()),
                content = $('<ul>').addClass('list-unstyled'),
                toolbar = $('<li>').addClass('picker-switch' + (options.collapse ? ' accordion-toggle' : '')).append(getToolbar());

            if (options.inline) {
                template.removeClass('dropdown-menu');
            }

            if (use24Hours) {
                template.addClass('usetwentyfour');
            }

            if (isEnabled('s') && !use24Hours) {
                template.addClass('wider');
            }

            if (options.sideBySide && hasDate() && hasTime()) {
                template.addClass('timepicker-sbs');
                if (options.toolbarPlacement === 'top') {
                    template.append(toolbar);
                }
                template.append($('<div>').addClass('row').append(dateView.addClass('col-md-6')).append(timeView.addClass('col-md-6')));
                if (options.toolbarPlacement === 'bottom') {
                    template.append(toolbar);
                }
                return template;
            }

            if (options.toolbarPlacement === 'top') {
                content.append(toolbar);
            }
            if (hasDate()) {
                content.append($('<li>').addClass(options.collapse && hasTime() ? 'collapse in show' : '').append(dateView));
            }
            if (options.toolbarPlacement === 'default') {
                content.append(toolbar);
            }
            if (hasTime()) {
                content.append($('<li>').addClass(options.collapse && hasDate() ? 'collapse' : '').append(timeView));
            }
            if (options.toolbarPlacement === 'bottom') {
                content.append(toolbar);
            }
            return template.append(content);
        },
            dataToOptions = function () {
            var eData,
                dataOptions = {};

            if (element.is('input') || options.inline) {
                eData = element.data();
            } else {
                eData = element.find('input').data();
            }

            if (eData.dateOptions && eData.dateOptions instanceof Object) {
                dataOptions = $.extend(true, dataOptions, eData.dateOptions);
            }

            $.each(options, function (key) {
                var attributeName = 'date' + key.charAt(0).toUpperCase() + key.slice(1);
                if (eData[attributeName] !== undefined) {
                    dataOptions[key] = eData[attributeName];
                }
            });
            return dataOptions;
        },
            place = function () {
            var position = (component || element).position(),
                offset = (component || element).offset(),
                vertical = options.widgetPositioning.vertical,
                horizontal = options.widgetPositioning.horizontal,
                parent;

            if (options.widgetParent) {
                parent = options.widgetParent.append(widget);
            } else if (element.is('input')) {
                parent = element.after(widget).parent();
            } else if (options.inline) {
                parent = element.append(widget);
                return;
            } else {
                parent = element;
                element.children().first().after(widget);
            }

            // Top and bottom logic
            if (vertical === 'auto') {
                if (offset.top + widget.height() * 1.5 >= $(window).height() + $(window).scrollTop() && widget.height() + element.outerHeight() < offset.top) {
                    vertical = 'top';
                } else {
                    vertical = 'bottom';
                }
            }

            // Left and right logic
            if (horizontal === 'auto') {
                if (parent.width() < offset.left + widget.outerWidth() / 2 && offset.left + widget.outerWidth() > $(window).width()) {
                    horizontal = 'right';
                } else {
                    horizontal = 'left';
                }
            }

            if (vertical === 'top') {
                widget.addClass('top').removeClass('bottom');
            } else {
                widget.addClass('bottom').removeClass('top');
            }

            if (horizontal === 'right') {
                widget.addClass('pull-right');
            } else {
                widget.removeClass('pull-right');
            }

            // find the first parent element that has a non-static css positioning
            if (parent.css('position') === 'static') {
                parent = parent.parents().filter(function () {
                    return $(this).css('position') !== 'static';
                }).first();
            }

            if (parent.length === 0) {
                throw new Error('bs-datetimepicker component should be placed within a non-static positioned container');
            }

            widget.css({
                top: vertical === 'top' ? 'auto' : position.top + element.outerHeight(),
                bottom: vertical === 'top' ? parent.outerHeight() - (parent === element ? 0 : position.top) : 'auto',
                left: horizontal === 'left' ? parent === element ? 0 : position.left : 'auto',
                right: horizontal === 'left' ? 'auto' : parent.outerWidth() - element.outerWidth() - (parent === element ? 0 : position.left)
            });
        },
            notifyEvent = function (e) {
            if (e.type === 'dp.change' && (e.date && e.date.isSame(e.oldDate) || !e.date && !e.oldDate)) {
                return;
            }
            element.trigger(e);
        },
            viewUpdate = function (e) {
            if (e === 'y') {
                e = 'YYYY';
            }
            notifyEvent({
                type: 'dp.update',
                change: e,
                viewDate: viewDate.clone()
            });
        },
            showMode = function (dir) {
            if (!widget) {
                return;
            }
            if (dir) {
                currentViewMode = Math.max(minViewModeNumber, Math.min(3, currentViewMode + dir));
            }
            widget.find('.bs-datepicker > div').hide().filter('.bs-datepicker-' + datePickerModes[currentViewMode].clsName).show();
        },
            fillDow = function () {
            var row = $('<tr>'),
                currentDate = viewDate.clone().startOf('w').startOf('d');

            if (options.calendarWeeks === true) {
                row.append($('<th>').addClass('cw').text('#'));
            }

            while (currentDate.isBefore(viewDate.clone().endOf('w'))) {
                row.append($('<th>').addClass('dow').text(currentDate.format('dd')));
                currentDate.add(1, 'd');
            }
            widget.find('.bs-datepicker-days thead').append(row);
        },
            isInDisabledDates = function (testDate) {
            return options.disabledDates[testDate.format('YYYY-MM-DD')] === true;
        },
            isInEnabledDates = function (testDate) {
            return options.enabledDates[testDate.format('YYYY-MM-DD')] === true;
        },
            isInDisabledHours = function (testDate) {
            return options.disabledHours[testDate.format('H')] === true;
        },
            isInEnabledHours = function (testDate) {
            return options.enabledHours[testDate.format('H')] === true;
        },
            isValid = function (targetMoment, granularity) {
            if (!targetMoment.isValid()) {
                return false;
            }
            if (options.disabledDates && granularity === 'd' && isInDisabledDates(targetMoment)) {
                return false;
            }
            if (options.enabledDates && granularity === 'd' && !isInEnabledDates(targetMoment)) {
                return false;
            }
            if (options.minDate && targetMoment.isBefore(options.minDate, granularity)) {
                return false;
            }
            if (options.maxDate && targetMoment.isAfter(options.maxDate, granularity)) {
                return false;
            }
            if (options.daysOfWeekDisabled && granularity === 'd' && options.daysOfWeekDisabled.indexOf(targetMoment.day()) !== -1) {
                return false;
            }
            if (options.disabledHours && (granularity === 'h' || granularity === 'm' || granularity === 's') && isInDisabledHours(targetMoment)) {
                return false;
            }
            if (options.enabledHours && (granularity === 'h' || granularity === 'm' || granularity === 's') && !isInEnabledHours(targetMoment)) {
                return false;
            }
            if (options.disabledTimeIntervals && (granularity === 'h' || granularity === 'm' || granularity === 's')) {
                var found = false;
                $.each(options.disabledTimeIntervals, function () {
                    if (targetMoment.isBetween(this[0], this[1])) {
                        found = true;
                        return false;
                    }
                });
                if (found) {
                    return false;
                }
            }
            return true;
        },
            fillMonths = function () {
            var spans = [],
                monthsShort = viewDate.clone().startOf('y').startOf('d');
            while (monthsShort.isSame(viewDate, 'y')) {
                spans.push($('<span>').attr('data-action', 'selectMonth').addClass('month').text(monthsShort.format('MMM')));
                monthsShort.add(1, 'M');
            }
            widget.find('.bs-datepicker-months td').empty().append(spans);
        },
            updateMonths = function () {
            var monthsView = widget.find('.bs-datepicker-months'),
                monthsViewHeader = monthsView.find('th'),
                months = monthsView.find('tbody').find('span');

            monthsViewHeader.eq(0).find('span').attr('title', options.tooltips.prevYear);
            monthsViewHeader.eq(1).attr('title', options.tooltips.selectYear);
            monthsViewHeader.eq(2).find('span').attr('title', options.tooltips.nextYear);

            monthsView.find('.disabled').removeClass('disabled');

            if (!isValid(viewDate.clone().subtract(1, 'y'), 'y')) {
                monthsViewHeader.eq(0).addClass('disabled');
            }

            monthsViewHeader.eq(1).text(viewDate.year());

            if (!isValid(viewDate.clone().add(1, 'y'), 'y')) {
                monthsViewHeader.eq(2).addClass('disabled');
            }

            months.removeClass('active');
            if (date.isSame(viewDate, 'y') && !unset) {
                months.eq(date.month()).addClass('active');
            }

            months.each(function (index) {
                if (!isValid(viewDate.clone().month(index), 'M')) {
                    $(this).addClass('disabled');
                }
            });
        },
            updateYears = function () {
            var yearsView = widget.find('.bs-datepicker-years'),
                yearsViewHeader = yearsView.find('th'),
                startYear = viewDate.clone().subtract(5, 'y'),
                endYear = viewDate.clone().add(6, 'y'),
                html = '';

            yearsViewHeader.eq(0).find('span').attr('title', options.tooltips.prevDecade);
            yearsViewHeader.eq(1).attr('title', options.tooltips.selectDecade);
            yearsViewHeader.eq(2).find('span').attr('title', options.tooltips.nextDecade);

            yearsView.find('.disabled').removeClass('disabled');

            if (options.minDate && options.minDate.isAfter(startYear, 'y')) {
                yearsViewHeader.eq(0).addClass('disabled');
            }

            yearsViewHeader.eq(1).text(startYear.year() + '-' + endYear.year());

            if (options.maxDate && options.maxDate.isBefore(endYear, 'y')) {
                yearsViewHeader.eq(2).addClass('disabled');
            }

            while (!startYear.isAfter(endYear, 'y')) {
                html += '<span data-action="selectYear" class="year' + (startYear.isSame(date, 'y') && !unset ? ' active' : '') + (!isValid(startYear, 'y') ? ' disabled' : '') + '">' + startYear.year() + '</span>';
                startYear.add(1, 'y');
            }

            yearsView.find('td').html(html);
        },
            updateDecades = function () {
            var decadesView = widget.find('.bs-datepicker-decades'),
                decadesViewHeader = decadesView.find('th'),
                startDecade = moment({ y: viewDate.year() - viewDate.year() % 100 - 1 }),
                endDecade = startDecade.clone().add(100, 'y'),
                startedAt = startDecade.clone(),
                minDateDecade = false,
                maxDateDecade = false,
                endDecadeYear,
                html = '';

            decadesViewHeader.eq(0).find('span').attr('title', options.tooltips.prevCentury);
            decadesViewHeader.eq(2).find('span').attr('title', options.tooltips.nextCentury);

            decadesView.find('.disabled').removeClass('disabled');

            if (startDecade.isSame(moment({ y: 1900 })) || options.minDate && options.minDate.isAfter(startDecade, 'y')) {
                decadesViewHeader.eq(0).addClass('disabled');
            }

            decadesViewHeader.eq(1).text(startDecade.year() + '-' + endDecade.year());

            if (startDecade.isSame(moment({ y: 2000 })) || options.maxDate && options.maxDate.isBefore(endDecade, 'y')) {
                decadesViewHeader.eq(2).addClass('disabled');
            }

            while (!startDecade.isAfter(endDecade, 'y')) {
                endDecadeYear = startDecade.year() + 12;
                minDateDecade = options.minDate && options.minDate.isAfter(startDecade, 'y') && options.minDate.year() <= endDecadeYear;
                maxDateDecade = options.maxDate && options.maxDate.isAfter(startDecade, 'y') && options.maxDate.year() <= endDecadeYear;
                html += '<span data-action="selectDecade" class="decade' + (date.isAfter(startDecade) && date.year() <= endDecadeYear ? ' active' : '') + (!isValid(startDecade, 'y') && !minDateDecade && !maxDateDecade ? ' disabled' : '') + '" data-selection="' + (startDecade.year() + 6) + '">' + (startDecade.year() + 1) + ' - ' + (startDecade.year() + 12) + '</span>';
                startDecade.add(12, 'y');
            }
            html += '<span></span><span></span><span></span>'; //push the dangling block over, at least this way it's even

            decadesView.find('td').html(html);
            decadesViewHeader.eq(1).text(startedAt.year() + 1 + '-' + startDecade.year());
        },
            fillDate = function () {
            var daysView = widget.find('.bs-datepicker-days'),
                daysViewHeader = daysView.find('th'),
                currentDate,
                html = [],
                row,
                clsNames = [],
                i;

            if (!hasDate()) {
                return;
            }

            daysViewHeader.eq(0).find('span').attr('title', options.tooltips.prevMonth);
            daysViewHeader.eq(1).attr('title', options.tooltips.selectMonth);
            daysViewHeader.eq(2).find('span').attr('title', options.tooltips.nextMonth);

            daysView.find('.disabled').removeClass('disabled');
            daysViewHeader.eq(1).text(viewDate.format(options.dayViewHeaderFormat));

            if (!isValid(viewDate.clone().subtract(1, 'M'), 'M')) {
                daysViewHeader.eq(0).addClass('disabled');
            }
            if (!isValid(viewDate.clone().add(1, 'M'), 'M')) {
                daysViewHeader.eq(2).addClass('disabled');
            }

            currentDate = viewDate.clone().startOf('M').startOf('w').startOf('d');

            for (i = 0; i < 42; i++) {
                //always display 42 days (should show 6 weeks)
                if (currentDate.weekday() === 0) {
                    row = $('<tr>');
                    if (options.calendarWeeks) {
                        row.append('<td class="cw">' + currentDate.week() + '</td>');
                    }
                    html.push(row);
                }
                clsNames = ['day'];
                if (currentDate.isBefore(viewDate, 'M')) {
                    clsNames.push('old');
                }
                if (currentDate.isAfter(viewDate, 'M')) {
                    clsNames.push('new');
                }
                if (currentDate.isSame(date, 'd') && !unset) {
                    clsNames.push('active');
                }
                if (!isValid(currentDate, 'd')) {
                    clsNames.push('disabled');
                }
                if (currentDate.isSame(getMoment(), 'd')) {
                    clsNames.push('today');
                }
                if (currentDate.day() === 0 || currentDate.day() === 6) {
                    clsNames.push('weekend');
                }
                notifyEvent({
                    type: 'dp.classify',
                    date: currentDate,
                    classNames: clsNames
                });
                row.append('<td data-action="selectDay" data-day="' + currentDate.format('L') + '" class="' + clsNames.join(' ') + '">' + currentDate.date() + '</td>');
                currentDate.add(1, 'd');
            }

            daysView.find('tbody').empty().append(html);

            updateMonths();

            updateYears();

            updateDecades();
        },
            fillHours = function () {
            var table = widget.find('.timepicker-hours table'),
                currentHour = viewDate.clone().startOf('d'),
                html = [],
                row = $('<tr>');

            if (viewDate.hour() > 11 && !use24Hours) {
                currentHour.hour(12);
            }
            while (currentHour.isSame(viewDate, 'd') && (use24Hours || viewDate.hour() < 12 && currentHour.hour() < 12 || viewDate.hour() > 11)) {
                if (currentHour.hour() % 4 === 0) {
                    row = $('<tr>');
                    html.push(row);
                }
                row.append('<td data-action="selectHour" class="hour' + (!isValid(currentHour, 'h') ? ' disabled' : '') + '">' + currentHour.format(use24Hours ? 'HH' : 'hh') + '</td>');
                currentHour.add(1, 'h');
            }
            table.empty().append(html);
        },
            fillMinutes = function () {
            var table = widget.find('.timepicker-minutes table'),
                currentMinute = viewDate.clone().startOf('h'),
                html = [],
                row = $('<tr>'),
                step = options.stepping === 1 ? 5 : options.stepping;

            while (viewDate.isSame(currentMinute, 'h')) {
                if (currentMinute.minute() % (step * 4) === 0) {
                    row = $('<tr>');
                    html.push(row);
                }
                row.append('<td data-action="selectMinute" class="minute' + (!isValid(currentMinute, 'm') ? ' disabled' : '') + '">' + currentMinute.format('mm') + '</td>');
                currentMinute.add(step, 'm');
            }
            table.empty().append(html);
        },
            fillSeconds = function () {
            var table = widget.find('.timepicker-seconds table'),
                currentSecond = viewDate.clone().startOf('m'),
                html = [],
                row = $('<tr>');

            while (viewDate.isSame(currentSecond, 'm')) {
                if (currentSecond.second() % 20 === 0) {
                    row = $('<tr>');
                    html.push(row);
                }
                row.append('<td data-action="selectSecond" class="second' + (!isValid(currentSecond, 's') ? ' disabled' : '') + '">' + currentSecond.format('ss') + '</td>');
                currentSecond.add(5, 's');
            }

            table.empty().append(html);
        },
            fillTime = function () {
            var toggle,
                newDate,
                timeComponents = widget.find('.timepicker span[data-time-component]');

            if (!use24Hours) {
                toggle = widget.find('.timepicker [data-action=togglePeriod]');
                newDate = date.clone().add(date.hours() >= 12 ? -12 : 12, 'h');

                toggle.text(date.format('A'));

                if (isValid(newDate, 'h')) {
                    toggle.removeClass('disabled');
                } else {
                    toggle.addClass('disabled');
                }
            }
            timeComponents.filter('[data-time-component=hours]').text(date.format(use24Hours ? 'HH' : 'hh'));
            timeComponents.filter('[data-time-component=minutes]').text(date.format('mm'));
            timeComponents.filter('[data-time-component=seconds]').text(date.format('ss'));

            fillHours();
            fillMinutes();
            fillSeconds();
        },
            update = function () {
            if (!widget) {
                return;
            }
            fillDate();
            fillTime();
        },
            setValue = function (targetMoment) {
            var oldDate = unset ? null : date;

            // case of calling setValue(null or false)
            if (!targetMoment) {
                unset = true;
                input.val('');
                element.data('date', '');
                notifyEvent({
                    type: 'dp.change',
                    date: false,
                    oldDate: oldDate
                });
                update();
                return;
            }

            targetMoment = targetMoment.clone().locale(options.locale);

            if (hasTimeZone()) {
                targetMoment.tz(options.timeZone);
            }

            if (options.stepping !== 1) {
                targetMoment.minutes(Math.round(targetMoment.minutes() / options.stepping) * options.stepping).seconds(0);

                while (options.minDate && targetMoment.isBefore(options.minDate)) {
                    targetMoment.add(options.stepping, 'minutes');
                }
            }

            if (isValid(targetMoment)) {
                date = targetMoment;
                viewDate = date.clone();
                input.val(date.format(actualFormat));
                element.data('date', date.format(actualFormat));
                unset = false;
                update();
                notifyEvent({
                    type: 'dp.change',
                    date: date.clone(),
                    oldDate: oldDate
                });
            } else {
                if (!options.keepInvalid) {
                    input.val(unset ? '' : date.format(actualFormat));
                } else {
                    notifyEvent({
                        type: 'dp.change',
                        date: targetMoment,
                        oldDate: oldDate
                    });
                }
                notifyEvent({
                    type: 'dp.error',
                    date: targetMoment,
                    oldDate: oldDate
                });
            }
        },


        /**
         * Hides the widget. Possibly will emit dp.hide
         */
        hide = function () {
            var transitioning = false;
            if (!widget) {
                return picker;
            }
            // Ignore event if in the middle of a picker transition
            widget.find('.collapse').each(function () {
                var collapseData = $(this).data('collapse');
                if (collapseData && collapseData.transitioning) {
                    transitioning = true;
                    return false;
                }
                return true;
            });
            if (transitioning) {
                return picker;
            }
            if (component && component.hasClass('btn')) {
                component.toggleClass('active');
            }
            widget.hide();

            $(window).off('resize', place);
            widget.off('click', '[data-action]');
            widget.off('mousedown', false);

            widget.remove();
            widget = false;

            notifyEvent({
                type: 'dp.hide',
                date: date.clone()
            });

            input.blur();

            viewDate = date.clone();

            return picker;
        },
            clear = function () {
            setValue(null);
        },
            parseInputDate = function (inputDate) {
            if (options.parseInputDate === undefined) {
                if (!moment.isMoment(inputDate) || inputDate instanceof Date) {
                    inputDate = getMoment(inputDate);
                }
            } else {
                inputDate = options.parseInputDate(inputDate);
            }
            //inputDate.locale(options.locale);
            return inputDate;
        },


        /********************************************************************************
         *
         * Widget UI interaction functions
         *
         ********************************************************************************/
        actions = {
            next: function () {
                var navFnc = datePickerModes[currentViewMode].navFnc;
                viewDate.add(datePickerModes[currentViewMode].navStep, navFnc);
                fillDate();
                viewUpdate(navFnc);
            },

            previous: function () {
                var navFnc = datePickerModes[currentViewMode].navFnc;
                viewDate.subtract(datePickerModes[currentViewMode].navStep, navFnc);
                fillDate();
                viewUpdate(navFnc);
            },

            pickerSwitch: function () {
                showMode(1);
            },

            selectMonth: function (e) {
                var month = $(e.target).closest('tbody').find('span').index($(e.target));
                viewDate.month(month);
                if (currentViewMode === minViewModeNumber) {
                    setValue(date.clone().year(viewDate.year()).month(viewDate.month()));
                    if (!options.inline) {
                        hide();
                    }
                } else {
                    showMode(-1);
                    fillDate();
                }
                viewUpdate('M');
            },

            selectYear: function (e) {
                var year = parseInt($(e.target).text(), 10) || 0;
                viewDate.year(year);
                if (currentViewMode === minViewModeNumber) {
                    setValue(date.clone().year(viewDate.year()));
                    if (!options.inline) {
                        hide();
                    }
                } else {
                    showMode(-1);
                    fillDate();
                }
                viewUpdate('YYYY');
            },

            selectDecade: function (e) {
                var year = parseInt($(e.target).data('selection'), 10) || 0;
                viewDate.year(year);
                if (currentViewMode === minViewModeNumber) {
                    setValue(date.clone().year(viewDate.year()));
                    if (!options.inline) {
                        hide();
                    }
                } else {
                    showMode(-1);
                    fillDate();
                }
                viewUpdate('YYYY');
            },

            selectDay: function (e) {
                var day = viewDate.clone();
                if ($(e.target).is('.old')) {
                    day.subtract(1, 'M');
                }
                if ($(e.target).is('.new')) {
                    day.add(1, 'M');
                }
                setValue(day.date(parseInt($(e.target).text(), 10)));
                if (!hasTime() && !options.keepOpen && !options.inline) {
                    hide();
                }
            },

            incrementHours: function () {
                var newDate = date.clone().add(1, 'h');
                if (isValid(newDate, 'h')) {
                    setValue(newDate);
                }
            },

            incrementMinutes: function () {
                var newDate = date.clone().add(options.stepping, 'm');
                if (isValid(newDate, 'm')) {
                    setValue(newDate);
                }
            },

            incrementSeconds: function () {
                var newDate = date.clone().add(1, 's');
                if (isValid(newDate, 's')) {
                    setValue(newDate);
                }
            },

            decrementHours: function () {
                var newDate = date.clone().subtract(1, 'h');
                if (isValid(newDate, 'h')) {
                    setValue(newDate);
                }
            },

            decrementMinutes: function () {
                var newDate = date.clone().subtract(options.stepping, 'm');
                if (isValid(newDate, 'm')) {
                    setValue(newDate);
                }
            },

            decrementSeconds: function () {
                var newDate = date.clone().subtract(1, 's');
                if (isValid(newDate, 's')) {
                    setValue(newDate);
                }
            },

            togglePeriod: function () {
                setValue(date.clone().add(date.hours() >= 12 ? -12 : 12, 'h'));
            },

            togglePicker: function (e) {
                var $this = $(e.target),
                    $parent = $this.closest('ul'),
                    expanded = $parent.find('.show'),
                    closed = $parent.find('.collapse:not(.show)'),
                    collapseData;

                if (expanded && expanded.length) {
                    collapseData = expanded.data('collapse');
                    if (collapseData && collapseData.transitioning) {
                        return;
                    }
                    if (expanded.collapse) {
                        // if collapse plugin is available through bootstrap.js then use it
                        expanded.collapse('hide');
                        closed.collapse('show');
                    } else {
                        // otherwise just toggle in class on the two views
                        expanded.removeClass('in show');
                        closed.addClass('in show');
                    }
                    if ($this.is('span')) {
                        $this.toggleClass(options.icons.time + ' ' + options.icons.date);
                    } else {
                        $this.find('span').toggleClass(options.icons.time + ' ' + options.icons.date);
                    }

                    // NOTE: uncomment if toggled state will be restored in show()
                    //if (component) {
                    //    component.find('span').toggleClass(options.icons.time + ' ' + options.icons.date);
                    //}
                }
            },

            showPicker: function () {
                widget.find('.timepicker > div:not(.timepicker-picker)').hide();
                widget.find('.timepicker .timepicker-picker').show();
            },

            showHours: function () {
                widget.find('.timepicker .timepicker-picker').hide();
                widget.find('.timepicker .timepicker-hours').show();
            },

            showMinutes: function () {
                widget.find('.timepicker .timepicker-picker').hide();
                widget.find('.timepicker .timepicker-minutes').show();
            },

            showSeconds: function () {
                widget.find('.timepicker .timepicker-picker').hide();
                widget.find('.timepicker .timepicker-seconds').show();
            },

            selectHour: function (e) {
                var hour = parseInt($(e.target).text(), 10);

                if (!use24Hours) {
                    if (date.hours() >= 12) {
                        if (hour !== 12) {
                            hour += 12;
                        }
                    } else {
                        if (hour === 12) {
                            hour = 0;
                        }
                    }
                }
                setValue(date.clone().hours(hour));
                actions.showPicker.call(picker);
            },

            selectMinute: function (e) {
                setValue(date.clone().minutes(parseInt($(e.target).text(), 10)));
                actions.showPicker.call(picker);
            },

            selectSecond: function (e) {
                setValue(date.clone().seconds(parseInt($(e.target).text(), 10)));
                actions.showPicker.call(picker);
            },

            clear: clear,

            today: function () {
                var todaysDate = getMoment();
                if (isValid(todaysDate, 'd')) {
                    setValue(todaysDate);
                }
            },

            close: hide
        },
            doAction = function (e) {
            if ($(e.currentTarget).is('.disabled')) {
                return false;
            }
            actions[$(e.currentTarget).data('action')].apply(picker, arguments);
            return false;
        },


        /**
         * Shows the widget. Possibly will emit dp.show and dp.change
         */
        show = function () {
            var currentMoment,
                useCurrentGranularity = {
                'year': function (m) {
                    return m.month(0).date(1).hours(0).seconds(0).minutes(0);
                },
                'month': function (m) {
                    return m.date(1).hours(0).seconds(0).minutes(0);
                },
                'day': function (m) {
                    return m.hours(0).seconds(0).minutes(0);
                },
                'hour': function (m) {
                    return m.seconds(0).minutes(0);
                },
                'minute': function (m) {
                    return m.seconds(0);
                }
            };

            if (input.prop('disabled') || !options.ignoreReadonly && input.prop('readonly') || widget) {
                return picker;
            }
            if (input.val() !== undefined && input.val().trim().length !== 0) {
                setValue(parseInputDate(input.val().trim()));
            } else if (unset && options.useCurrent && (options.inline || input.is('input') && input.val().trim().length === 0)) {
                currentMoment = getMoment();
                if (typeof options.useCurrent === 'string') {
                    currentMoment = useCurrentGranularity[options.useCurrent](currentMoment);
                }
                setValue(currentMoment);
            }
            widget = getTemplate();

            fillDow();
            fillMonths();

            widget.find('.timepicker-hours').hide();
            widget.find('.timepicker-minutes').hide();
            widget.find('.timepicker-seconds').hide();

            update();
            showMode();

            $(window).on('resize', place);
            widget.on('click', '[data-action]', doAction); // this handles clicks on the widget
            widget.on('mousedown', false);

            if (component && component.hasClass('btn')) {
                component.toggleClass('active');
            }
            place();
            widget.show();
            if (options.focusOnShow && !input.is(':focus')) {
                input.focus();
            }

            notifyEvent({
                type: 'dp.show'
            });
            return picker;
        },


        /**
         * Shows or hides the widget
         */
        toggle = function () {
            return widget ? hide() : show();
        },
            keydown = function (e) {
            var handler = null,
                index,
                index2,
                pressedKeys = [],
                pressedModifiers = {},
                currentKey = e.which,
                keyBindKeys,
                allModifiersPressed,
                pressed = 'p';

            keyState[currentKey] = pressed;

            for (index in keyState) {
                if (keyState.hasOwnProperty(index) && keyState[index] === pressed) {
                    pressedKeys.push(index);
                    if (parseInt(index, 10) !== currentKey) {
                        pressedModifiers[index] = true;
                    }
                }
            }

            for (index in options.keyBinds) {
                if (options.keyBinds.hasOwnProperty(index) && typeof options.keyBinds[index] === 'function') {
                    keyBindKeys = index.split(' ');
                    if (keyBindKeys.length === pressedKeys.length && keyMap[currentKey] === keyBindKeys[keyBindKeys.length - 1]) {
                        allModifiersPressed = true;
                        for (index2 = keyBindKeys.length - 2; index2 >= 0; index2--) {
                            if (!(keyMap[keyBindKeys[index2]] in pressedModifiers)) {
                                allModifiersPressed = false;
                                break;
                            }
                        }
                        if (allModifiersPressed) {
                            handler = options.keyBinds[index];
                            break;
                        }
                    }
                }
            }

            if (handler) {
                handler.call(picker, widget);
                e.stopPropagation();
                e.preventDefault();
            }
        },
            keyup = function (e) {
            keyState[e.which] = 'r';
            e.stopPropagation();
            e.preventDefault();
        },
            change = function (e) {
            var val = $(e.target).val().trim(),
                parsedDate = val ? parseInputDate(val) : null;
            setValue(parsedDate);
            e.stopImmediatePropagation();
            return false;
        },
            attachDatePickerElementEvents = function () {
            input.on({
                'change': change,
                'blur': options.debug ? '' : hide,
                'keydown': keydown,
                'keyup': keyup,
                'focus': options.allowInputToggle ? show : ''
            });

            if (element.is('input')) {
                input.on({
                    'focus': show
                });
            } else if (component) {
                component.on('click', toggle);
                component.on('mousedown', false);
            }
        },
            detachDatePickerElementEvents = function () {
            input.off({
                'change': change,
                'blur': blur,
                'keydown': keydown,
                'keyup': keyup,
                'focus': options.allowInputToggle ? hide : ''
            });

            if (element.is('input')) {
                input.off({
                    'focus': show
                });
            } else if (component) {
                component.off('click', toggle);
                component.off('mousedown', false);
            }
        },
            indexGivenDates = function (givenDatesArray) {
            // Store given enabledDates and disabledDates as keys.
            // This way we can check their existence in O(1) time instead of looping through whole array.
            // (for example: options.enabledDates['2014-02-27'] === true)
            var givenDatesIndexed = {};
            $.each(givenDatesArray, function () {
                var dDate = parseInputDate(this);
                if (dDate.isValid()) {
                    givenDatesIndexed[dDate.format('YYYY-MM-DD')] = true;
                }
            });
            return Object.keys(givenDatesIndexed).length ? givenDatesIndexed : false;
        },
            indexGivenHours = function (givenHoursArray) {
            // Store given enabledHours and disabledHours as keys.
            // This way we can check their existence in O(1) time instead of looping through whole array.
            // (for example: options.enabledHours['2014-02-27'] === true)
            var givenHoursIndexed = {};
            $.each(givenHoursArray, function () {
                givenHoursIndexed[this] = true;
            });
            return Object.keys(givenHoursIndexed).length ? givenHoursIndexed : false;
        },
            initFormatting = function () {
            var format = options.format || 'L LT';

            actualFormat = format.replace(/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, function (formatInput) {
                var newinput = date.localeData().longDateFormat(formatInput) || formatInput;
                return newinput.replace(/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, function (formatInput2) {
                    //temp fix for #740
                    return date.localeData().longDateFormat(formatInput2) || formatInput2;
                });
            });

            parseFormats = options.extraFormats ? options.extraFormats.slice() : [];
            if (parseFormats.indexOf(format) < 0 && parseFormats.indexOf(actualFormat) < 0) {
                parseFormats.push(actualFormat);
            }

            use24Hours = actualFormat.toLowerCase().indexOf('a') < 1 && actualFormat.replace(/\[.*?\]/g, '').indexOf('h') < 1;

            if (isEnabled('y')) {
                minViewModeNumber = 2;
            }
            if (isEnabled('M')) {
                minViewModeNumber = 1;
            }
            if (isEnabled('d')) {
                minViewModeNumber = 0;
            }

            currentViewMode = Math.max(minViewModeNumber, currentViewMode);

            if (!unset) {
                setValue(date);
            }
        };

        /********************************************************************************
         *
         * Public API functions
         * =====================
         *
         * Important: Do not expose direct references to private objects or the options
         * object to the outer world. Always return a clone when returning values or make
         * a clone when setting a private variable.
         *
         ********************************************************************************/
        picker.destroy = function () {
            ///<summary>Destroys the widget and removes all attached event listeners</summary>
            hide();
            detachDatePickerElementEvents();
            element.removeData('DateTimePicker');
            element.removeData('date');
        };

        picker.toggle = toggle;

        picker.show = show;

        picker.hide = hide;

        picker.disable = function () {
            ///<summary>Disables the input element, the component is attached to, by adding a disabled="true" attribute to it.
            ///If the widget was visible before that call it is hidden. Possibly emits dp.hide</summary>
            hide();
            if (component && component.hasClass('btn')) {
                component.addClass('disabled');
            }
            input.prop('disabled', true);
            return picker;
        };

        picker.enable = function () {
            ///<summary>Enables the input element, the component is attached to, by removing disabled attribute from it.</summary>
            if (component && component.hasClass('btn')) {
                component.removeClass('disabled');
            }
            input.prop('disabled', false);
            return picker;
        };

        picker.ignoreReadonly = function (ignoreReadonly) {
            if (arguments.length === 0) {
                return options.ignoreReadonly;
            }
            if (typeof ignoreReadonly !== 'boolean') {
                throw new TypeError('ignoreReadonly () expects a boolean parameter');
            }
            options.ignoreReadonly = ignoreReadonly;
            return picker;
        };

        picker.options = function (newOptions) {
            if (arguments.length === 0) {
                return $.extend(true, {}, options);
            }

            if (!(newOptions instanceof Object)) {
                throw new TypeError('options() options parameter should be an object');
            }
            $.extend(true, options, newOptions);
            $.each(options, function (key, value) {
                if (picker[key] !== undefined) {
                    picker[key](value);
                } else {
                    throw new TypeError('option ' + key + ' is not recognized!');
                }
            });
            return picker;
        };

        picker.date = function (newDate) {
            ///<signature helpKeyword="$.fn.bsDatetimepicker.date">
            ///<summary>Returns the component's model current date, a moment object or null if not set.</summary>
            ///<returns type="Moment">date.clone()</returns>
            ///</signature>
            ///<signature>
            ///<summary>Sets the components model current moment to it. Passing a null value unsets the components model current moment. Parsing of the newDate parameter is made using moment library with the options.format and options.useStrict components configuration.</summary>
            ///<param name="newDate" locid="$.fn.bsDatetimepicker.date_p:newDate">Takes string, Date, moment, null parameter.</param>
            ///</signature>
            if (arguments.length === 0) {
                if (unset) {
                    return null;
                }
                return date.clone();
            }

            if (newDate !== null && typeof newDate !== 'string' && !moment.isMoment(newDate) && !(newDate instanceof Date)) {
                throw new TypeError('date() parameter must be one of [null, string, moment or Date]');
            }

            setValue(newDate === null ? null : parseInputDate(newDate));
            return picker;
        };

        picker.format = function (newFormat) {
            ///<summary>test su</summary>
            ///<param name="newFormat">info about para</param>
            ///<returns type="string|boolean">returns foo</returns>
            if (arguments.length === 0) {
                return options.format;
            }

            if (typeof newFormat !== 'string' && (typeof newFormat !== 'boolean' || newFormat !== false)) {
                throw new TypeError('format() expects a string or boolean:false parameter ' + newFormat);
            }

            options.format = newFormat;
            if (actualFormat) {
                initFormatting(); // reinit formatting
            }
            return picker;
        };

        picker.timeZone = function (newZone) {
            if (arguments.length === 0) {
                return options.timeZone;
            }

            if (typeof newZone !== 'string') {
                throw new TypeError('newZone() expects a string parameter');
            }

            options.timeZone = newZone;

            return picker;
        };

        picker.dayViewHeaderFormat = function (newFormat) {
            if (arguments.length === 0) {
                return options.dayViewHeaderFormat;
            }

            if (typeof newFormat !== 'string') {
                throw new TypeError('dayViewHeaderFormat() expects a string parameter');
            }

            options.dayViewHeaderFormat = newFormat;
            return picker;
        };

        picker.extraFormats = function (formats) {
            if (arguments.length === 0) {
                return options.extraFormats;
            }

            if (formats !== false && !(formats instanceof Array)) {
                throw new TypeError('extraFormats() expects an array or false parameter');
            }

            options.extraFormats = formats;
            if (parseFormats) {
                initFormatting(); // reinit formatting
            }
            return picker;
        };

        picker.disabledDates = function (dates) {
            ///<signature helpKeyword="$.fn.bsDatetimepicker.disabledDates">
            ///<summary>Returns an array with the currently set disabled dates on the component.</summary>
            ///<returns type="array">options.disabledDates</returns>
            ///</signature>
            ///<signature>
            ///<summary>Setting this takes precedence over options.minDate, options.maxDate configuration. Also calling this function removes the configuration of
            ///options.enabledDates if such exist.</summary>
            ///<param name="dates" locid="$.fn.bsDatetimepicker.disabledDates_p:dates">Takes an [ string or Date or moment ] of values and allows the user to select only from those days.</param>
            ///</signature>
            if (arguments.length === 0) {
                return options.disabledDates ? $.extend({}, options.disabledDates) : options.disabledDates;
            }

            if (!dates) {
                options.disabledDates = false;
                update();
                return picker;
            }
            if (!(dates instanceof Array)) {
                throw new TypeError('disabledDates() expects an array parameter');
            }
            options.disabledDates = indexGivenDates(dates);
            options.enabledDates = false;
            update();
            return picker;
        };

        picker.enabledDates = function (dates) {
            ///<signature helpKeyword="$.fn.bsDatetimepicker.enabledDates">
            ///<summary>Returns an array with the currently set enabled dates on the component.</summary>
            ///<returns type="array">options.enabledDates</returns>
            ///</signature>
            ///<signature>
            ///<summary>Setting this takes precedence over options.minDate, options.maxDate configuration. Also calling this function removes the configuration of options.disabledDates if such exist.</summary>
            ///<param name="dates" locid="$.fn.bsDatetimepicker.enabledDates_p:dates">Takes an [ string or Date or moment ] of values and allows the user to select only from those days.</param>
            ///</signature>
            if (arguments.length === 0) {
                return options.enabledDates ? $.extend({}, options.enabledDates) : options.enabledDates;
            }

            if (!dates) {
                options.enabledDates = false;
                update();
                return picker;
            }
            if (!(dates instanceof Array)) {
                throw new TypeError('enabledDates() expects an array parameter');
            }
            options.enabledDates = indexGivenDates(dates);
            options.disabledDates = false;
            update();
            return picker;
        };

        picker.daysOfWeekDisabled = function (daysOfWeekDisabled) {
            if (arguments.length === 0) {
                return options.daysOfWeekDisabled.splice(0);
            }

            if (typeof daysOfWeekDisabled === 'boolean' && !daysOfWeekDisabled) {
                options.daysOfWeekDisabled = false;
                update();
                return picker;
            }

            if (!(daysOfWeekDisabled instanceof Array)) {
                throw new TypeError('daysOfWeekDisabled() expects an array parameter');
            }
            options.daysOfWeekDisabled = daysOfWeekDisabled.reduce(function (previousValue, currentValue) {
                currentValue = parseInt(currentValue, 10);
                if (currentValue > 6 || currentValue < 0 || isNaN(currentValue)) {
                    return previousValue;
                }
                if (previousValue.indexOf(currentValue) === -1) {
                    previousValue.push(currentValue);
                }
                return previousValue;
            }, []).sort();
            if (options.useCurrent && !options.keepInvalid) {
                var tries = 0;
                while (!isValid(date, 'd')) {
                    date.add(1, 'd');
                    if (tries === 31) {
                        throw 'Tried 31 times to find a valid date';
                    }
                    tries++;
                }
                setValue(date);
            }
            update();
            return picker;
        };

        picker.maxDate = function (maxDate) {
            if (arguments.length === 0) {
                return options.maxDate ? options.maxDate.clone() : options.maxDate;
            }

            if (typeof maxDate === 'boolean' && maxDate === false) {
                options.maxDate = false;
                update();
                return picker;
            }

            if (typeof maxDate === 'string') {
                if (maxDate === 'now' || maxDate === 'moment') {
                    maxDate = getMoment();
                }
            }

            var parsedDate = parseInputDate(maxDate);

            if (!parsedDate.isValid()) {
                throw new TypeError('maxDate() Could not parse date parameter: ' + maxDate);
            }
            if (options.minDate && parsedDate.isBefore(options.minDate)) {
                throw new TypeError('maxDate() date parameter is before options.minDate: ' + parsedDate.format(actualFormat));
            }
            options.maxDate = parsedDate;
            if (options.useCurrent && !options.keepInvalid && date.isAfter(maxDate)) {
                setValue(options.maxDate);
            }
            if (viewDate.isAfter(parsedDate)) {
                viewDate = parsedDate.clone().subtract(options.stepping, 'm');
            }
            update();
            return picker;
        };

        picker.minDate = function (minDate) {
            if (arguments.length === 0) {
                return options.minDate ? options.minDate.clone() : options.minDate;
            }

            if (typeof minDate === 'boolean' && minDate === false) {
                options.minDate = false;
                update();
                return picker;
            }

            if (typeof minDate === 'string') {
                if (minDate === 'now' || minDate === 'moment') {
                    minDate = getMoment();
                }
            }

            var parsedDate = parseInputDate(minDate);

            if (!parsedDate.isValid()) {
                throw new TypeError('minDate() Could not parse date parameter: ' + minDate);
            }
            if (options.maxDate && parsedDate.isAfter(options.maxDate)) {
                throw new TypeError('minDate() date parameter is after options.maxDate: ' + parsedDate.format(actualFormat));
            }
            options.minDate = parsedDate;
            if (options.useCurrent && !options.keepInvalid && date.isBefore(minDate)) {
                setValue(options.minDate);
            }
            if (viewDate.isBefore(parsedDate)) {
                viewDate = parsedDate.clone().add(options.stepping, 'm');
            }
            update();
            return picker;
        };

        picker.defaultDate = function (defaultDate) {
            ///<signature helpKeyword="$.fn.bsDatetimepicker.defaultDate">
            ///<summary>Returns a moment with the options.defaultDate option configuration or false if not set</summary>
            ///<returns type="Moment">date.clone()</returns>
            ///</signature>
            ///<signature>
            ///<summary>Will set the picker's inital date. If a boolean:false value is passed the options.defaultDate parameter is cleared.</summary>
            ///<param name="defaultDate" locid="$.fn.bsDatetimepicker.defaultDate_p:defaultDate">Takes a string, Date, moment, boolean:false</param>
            ///</signature>
            if (arguments.length === 0) {
                return options.defaultDate ? options.defaultDate.clone() : options.defaultDate;
            }
            if (!defaultDate) {
                options.defaultDate = false;
                return picker;
            }

            if (typeof defaultDate === 'string') {
                if (defaultDate === 'now' || defaultDate === 'moment') {
                    defaultDate = getMoment();
                } else {
                    defaultDate = getMoment(defaultDate);
                }
            }

            var parsedDate = parseInputDate(defaultDate);
            if (!parsedDate.isValid()) {
                throw new TypeError('defaultDate() Could not parse date parameter: ' + defaultDate);
            }
            if (!isValid(parsedDate)) {
                throw new TypeError('defaultDate() date passed is invalid according to component setup validations');
            }

            options.defaultDate = parsedDate;

            if (options.defaultDate && options.inline || input.val().trim() === '') {
                setValue(options.defaultDate);
            }
            return picker;
        };

        picker.locale = function (locale) {
            if (arguments.length === 0) {
                return options.locale;
            }

            if (!moment.localeData(locale)) {
                throw new TypeError('locale() locale ' + locale + ' is not loaded from moment locales!');
            }

            options.locale = locale;
            date.locale(options.locale);
            viewDate.locale(options.locale);

            if (actualFormat) {
                initFormatting(); // reinit formatting
            }
            if (widget) {
                hide();
                show();
            }
            return picker;
        };

        picker.stepping = function (stepping) {
            if (arguments.length === 0) {
                return options.stepping;
            }

            stepping = parseInt(stepping, 10);
            if (isNaN(stepping) || stepping < 1) {
                stepping = 1;
            }
            options.stepping = stepping;
            return picker;
        };

        picker.useCurrent = function (useCurrent) {
            var useCurrentOptions = ['year', 'month', 'day', 'hour', 'minute'];
            if (arguments.length === 0) {
                return options.useCurrent;
            }

            if (typeof useCurrent !== 'boolean' && typeof useCurrent !== 'string') {
                throw new TypeError('useCurrent() expects a boolean or string parameter');
            }
            if (typeof useCurrent === 'string' && useCurrentOptions.indexOf(useCurrent.toLowerCase()) === -1) {
                throw new TypeError('useCurrent() expects a string parameter of ' + useCurrentOptions.join(', '));
            }
            options.useCurrent = useCurrent;
            return picker;
        };

        picker.collapse = function (collapse) {
            if (arguments.length === 0) {
                return options.collapse;
            }

            if (typeof collapse !== 'boolean') {
                throw new TypeError('collapse() expects a boolean parameter');
            }
            if (options.collapse === collapse) {
                return picker;
            }
            options.collapse = collapse;
            if (widget) {
                hide();
                show();
            }
            return picker;
        };

        picker.icons = function (icons) {
            if (arguments.length === 0) {
                return $.extend({}, options.icons);
            }

            if (!(icons instanceof Object)) {
                throw new TypeError('icons() expects parameter to be an Object');
            }
            $.extend(options.icons, icons);
            if (widget) {
                hide();
                show();
            }
            return picker;
        };

        picker.tooltips = function (tooltips) {
            if (arguments.length === 0) {
                return $.extend({}, options.tooltips);
            }

            if (!(tooltips instanceof Object)) {
                throw new TypeError('tooltips() expects parameter to be an Object');
            }
            $.extend(options.tooltips, tooltips);
            if (widget) {
                hide();
                show();
            }
            return picker;
        };

        picker.useStrict = function (useStrict) {
            if (arguments.length === 0) {
                return options.useStrict;
            }

            if (typeof useStrict !== 'boolean') {
                throw new TypeError('useStrict() expects a boolean parameter');
            }
            options.useStrict = useStrict;
            return picker;
        };

        picker.sideBySide = function (sideBySide) {
            if (arguments.length === 0) {
                return options.sideBySide;
            }

            if (typeof sideBySide !== 'boolean') {
                throw new TypeError('sideBySide() expects a boolean parameter');
            }
            options.sideBySide = sideBySide;
            if (widget) {
                hide();
                show();
            }
            return picker;
        };

        picker.viewMode = function (viewMode) {
            if (arguments.length === 0) {
                return options.viewMode;
            }

            if (typeof viewMode !== 'string') {
                throw new TypeError('viewMode() expects a string parameter');
            }

            if (viewModes.indexOf(viewMode) === -1) {
                throw new TypeError('viewMode() parameter must be one of (' + viewModes.join(', ') + ') value');
            }

            options.viewMode = viewMode;
            currentViewMode = Math.max(viewModes.indexOf(viewMode), minViewModeNumber);

            showMode();
            return picker;
        };

        picker.toolbarPlacement = function (toolbarPlacement) {
            if (arguments.length === 0) {
                return options.toolbarPlacement;
            }

            if (typeof toolbarPlacement !== 'string') {
                throw new TypeError('toolbarPlacement() expects a string parameter');
            }
            if (toolbarPlacements.indexOf(toolbarPlacement) === -1) {
                throw new TypeError('toolbarPlacement() parameter must be one of (' + toolbarPlacements.join(', ') + ') value');
            }
            options.toolbarPlacement = toolbarPlacement;

            if (widget) {
                hide();
                show();
            }
            return picker;
        };

        picker.widgetPositioning = function (widgetPositioning) {
            if (arguments.length === 0) {
                return $.extend({}, options.widgetPositioning);
            }

            if ({}.toString.call(widgetPositioning) !== '[object Object]') {
                throw new TypeError('widgetPositioning() expects an object variable');
            }
            if (widgetPositioning.horizontal) {
                if (typeof widgetPositioning.horizontal !== 'string') {
                    throw new TypeError('widgetPositioning() horizontal variable must be a string');
                }
                widgetPositioning.horizontal = widgetPositioning.horizontal.toLowerCase();
                if (horizontalModes.indexOf(widgetPositioning.horizontal) === -1) {
                    throw new TypeError('widgetPositioning() expects horizontal parameter to be one of (' + horizontalModes.join(', ') + ')');
                }
                options.widgetPositioning.horizontal = widgetPositioning.horizontal;
            }
            if (widgetPositioning.vertical) {
                if (typeof widgetPositioning.vertical !== 'string') {
                    throw new TypeError('widgetPositioning() vertical variable must be a string');
                }
                widgetPositioning.vertical = widgetPositioning.vertical.toLowerCase();
                if (verticalModes.indexOf(widgetPositioning.vertical) === -1) {
                    throw new TypeError('widgetPositioning() expects vertical parameter to be one of (' + verticalModes.join(', ') + ')');
                }
                options.widgetPositioning.vertical = widgetPositioning.vertical;
            }
            update();
            return picker;
        };

        picker.calendarWeeks = function (calendarWeeks) {
            if (arguments.length === 0) {
                return options.calendarWeeks;
            }

            if (typeof calendarWeeks !== 'boolean') {
                throw new TypeError('calendarWeeks() expects parameter to be a boolean value');
            }

            options.calendarWeeks = calendarWeeks;
            update();
            return picker;
        };

        picker.showTodayButton = function (showTodayButton) {
            if (arguments.length === 0) {
                return options.showTodayButton;
            }

            if (typeof showTodayButton !== 'boolean') {
                throw new TypeError('showTodayButton() expects a boolean parameter');
            }

            options.showTodayButton = showTodayButton;
            if (widget) {
                hide();
                show();
            }
            return picker;
        };

        picker.showClear = function (showClear) {
            if (arguments.length === 0) {
                return options.showClear;
            }

            if (typeof showClear !== 'boolean') {
                throw new TypeError('showClear() expects a boolean parameter');
            }

            options.showClear = showClear;
            if (widget) {
                hide();
                show();
            }
            return picker;
        };

        picker.widgetParent = function (widgetParent) {
            if (arguments.length === 0) {
                return options.widgetParent;
            }

            if (typeof widgetParent === 'string') {
                widgetParent = $(widgetParent);
            }

            if (widgetParent !== null && typeof widgetParent !== 'string' && !(widgetParent instanceof $)) {
                throw new TypeError('widgetParent() expects a string or a jQuery object parameter');
            }

            options.widgetParent = widgetParent;
            if (widget) {
                hide();
                show();
            }
            return picker;
        };

        picker.keepOpen = function (keepOpen) {
            if (arguments.length === 0) {
                return options.keepOpen;
            }

            if (typeof keepOpen !== 'boolean') {
                throw new TypeError('keepOpen() expects a boolean parameter');
            }

            options.keepOpen = keepOpen;
            return picker;
        };

        picker.focusOnShow = function (focusOnShow) {
            if (arguments.length === 0) {
                return options.focusOnShow;
            }

            if (typeof focusOnShow !== 'boolean') {
                throw new TypeError('focusOnShow() expects a boolean parameter');
            }

            options.focusOnShow = focusOnShow;
            return picker;
        };

        picker.inline = function (inline) {
            if (arguments.length === 0) {
                return options.inline;
            }

            if (typeof inline !== 'boolean') {
                throw new TypeError('inline() expects a boolean parameter');
            }

            options.inline = inline;
            return picker;
        };

        picker.clear = function () {
            clear();
            return picker;
        };

        picker.keyBinds = function (keyBinds) {
            if (arguments.length === 0) {
                return options.keyBinds;
            }

            options.keyBinds = keyBinds;
            return picker;
        };

        picker.getMoment = function (d) {
            return getMoment(d);
        };

        picker.debug = function (debug) {
            if (typeof debug !== 'boolean') {
                throw new TypeError('debug() expects a boolean parameter');
            }

            options.debug = debug;
            return picker;
        };

        picker.allowInputToggle = function (allowInputToggle) {
            if (arguments.length === 0) {
                return options.allowInputToggle;
            }

            if (typeof allowInputToggle !== 'boolean') {
                throw new TypeError('allowInputToggle() expects a boolean parameter');
            }

            options.allowInputToggle = allowInputToggle;
            return picker;
        };

        picker.showClose = function (showClose) {
            if (arguments.length === 0) {
                return options.showClose;
            }

            if (typeof showClose !== 'boolean') {
                throw new TypeError('showClose() expects a boolean parameter');
            }

            options.showClose = showClose;
            return picker;
        };

        picker.keepInvalid = function (keepInvalid) {
            if (arguments.length === 0) {
                return options.keepInvalid;
            }

            if (typeof keepInvalid !== 'boolean') {
                throw new TypeError('keepInvalid() expects a boolean parameter');
            }
            options.keepInvalid = keepInvalid;
            return picker;
        };

        picker.datepickerInput = function (datepickerInput) {
            if (arguments.length === 0) {
                return options.datepickerInput;
            }

            if (typeof datepickerInput !== 'string') {
                throw new TypeError('datepickerInput() expects a string parameter');
            }

            options.datepickerInput = datepickerInput;
            return picker;
        };

        picker.parseInputDate = function (parseInputDate) {
            if (arguments.length === 0) {
                return options.parseInputDate;
            }

            if (typeof parseInputDate !== 'function') {
                throw new TypeError('parseInputDate() sholud be as function');
            }

            options.parseInputDate = parseInputDate;

            return picker;
        };

        picker.disabledTimeIntervals = function (disabledTimeIntervals) {
            ///<signature helpKeyword="$.fn.bsDatetimepicker.disabledTimeIntervals">
            ///<summary>Returns an array with the currently set disabled dates on the component.</summary>
            ///<returns type="array">options.disabledTimeIntervals</returns>
            ///</signature>
            ///<signature>
            ///<summary>Setting this takes precedence over options.minDate, options.maxDate configuration. Also calling this function removes the configuration of
            ///options.enabledDates if such exist.</summary>
            ///<param name="dates" locid="$.fn.bsDatetimepicker.disabledTimeIntervals_p:dates">Takes an [ string or Date or moment ] of values and allows the user to select only from those days.</param>
            ///</signature>
            if (arguments.length === 0) {
                return options.disabledTimeIntervals ? $.extend({}, options.disabledTimeIntervals) : options.disabledTimeIntervals;
            }

            if (!disabledTimeIntervals) {
                options.disabledTimeIntervals = false;
                update();
                return picker;
            }
            if (!(disabledTimeIntervals instanceof Array)) {
                throw new TypeError('disabledTimeIntervals() expects an array parameter');
            }
            options.disabledTimeIntervals = disabledTimeIntervals;
            update();
            return picker;
        };

        picker.disabledHours = function (hours) {
            ///<signature helpKeyword="$.fn.bsDatetimepicker.disabledHours">
            ///<summary>Returns an array with the currently set disabled hours on the component.</summary>
            ///<returns type="array">options.disabledHours</returns>
            ///</signature>
            ///<signature>
            ///<summary>Setting this takes precedence over options.minDate, options.maxDate configuration. Also calling this function removes the configuration of
            ///options.enabledHours if such exist.</summary>
            ///<param name="hours" locid="$.fn.bsDatetimepicker.disabledHours_p:hours">Takes an [ int ] of values and disallows the user to select only from those hours.</param>
            ///</signature>
            if (arguments.length === 0) {
                return options.disabledHours ? $.extend({}, options.disabledHours) : options.disabledHours;
            }

            if (!hours) {
                options.disabledHours = false;
                update();
                return picker;
            }
            if (!(hours instanceof Array)) {
                throw new TypeError('disabledHours() expects an array parameter');
            }
            options.disabledHours = indexGivenHours(hours);
            options.enabledHours = false;
            if (options.useCurrent && !options.keepInvalid) {
                var tries = 0;
                while (!isValid(date, 'h')) {
                    date.add(1, 'h');
                    if (tries === 24) {
                        throw 'Tried 24 times to find a valid date';
                    }
                    tries++;
                }
                setValue(date);
            }
            update();
            return picker;
        };

        picker.enabledHours = function (hours) {
            ///<signature helpKeyword="$.fn.bsDatetimepicker.enabledHours">
            ///<summary>Returns an array with the currently set enabled hours on the component.</summary>
            ///<returns type="array">options.enabledHours</returns>
            ///</signature>
            ///<signature>
            ///<summary>Setting this takes precedence over options.minDate, options.maxDate configuration. Also calling this function removes the configuration of options.disabledHours if such exist.</summary>
            ///<param name="hours" locid="$.fn.bsDatetimepicker.enabledHours_p:hours">Takes an [ int ] of values and allows the user to select only from those hours.</param>
            ///</signature>
            if (arguments.length === 0) {
                return options.enabledHours ? $.extend({}, options.enabledHours) : options.enabledHours;
            }

            if (!hours) {
                options.enabledHours = false;
                update();
                return picker;
            }
            if (!(hours instanceof Array)) {
                throw new TypeError('enabledHours() expects an array parameter');
            }
            options.enabledHours = indexGivenHours(hours);
            options.disabledHours = false;
            if (options.useCurrent && !options.keepInvalid) {
                var tries = 0;
                while (!isValid(date, 'h')) {
                    date.add(1, 'h');
                    if (tries === 24) {
                        throw 'Tried 24 times to find a valid date';
                    }
                    tries++;
                }
                setValue(date);
            }
            update();
            return picker;
        };
        /**
         * Returns the component's model current viewDate, a moment object or null if not set. Passing a null value unsets the components model current moment. Parsing of the newDate parameter is made using moment library with the options.format and options.useStrict components configuration.
         * @param {Takes string, viewDate, moment, null parameter.} newDate
         * @returns {viewDate.clone()}
         */
        picker.viewDate = function (newDate) {
            if (arguments.length === 0) {
                return viewDate.clone();
            }

            if (!newDate) {
                viewDate = date.clone();
                return picker;
            }

            if (typeof newDate !== 'string' && !moment.isMoment(newDate) && !(newDate instanceof Date)) {
                throw new TypeError('viewDate() parameter must be one of [string, moment or Date]');
            }

            viewDate = parseInputDate(newDate);
            viewUpdate();
            return picker;
        };

        // initializing element and component attributes
        if (element.is('input')) {
            input = element;
        } else {
            input = element.find(options.datepickerInput);
            if (input.length === 0) {
                input = element.find('input');
            } else if (!input.is('input')) {
                throw new Error('CSS class "' + options.datepickerInput + '" cannot be applied to non input element');
            }
        }

        if (element.hasClass('input-group')) {
            // in case there is more then one 'input-group-addon' Issue #48
            if (element.find('.bs-datepickerbutton').length === 0) {
                component = element.find('.input-group-addon');
            } else {
                component = element.find('.bs-datepickerbutton');
            }
        }

        if (!options.inline && !input.is('input')) {
            throw new Error('Could not initialize DateTimePicker without an input element');
        }

        // Set defaults for date here now instead of in var declaration
        date = getMoment();
        viewDate = date.clone();

        $.extend(true, options, dataToOptions());

        picker.options(options);

        initFormatting();

        attachDatePickerElementEvents();

        if (input.prop('disabled')) {
            picker.disable();
        }
        if (input.is('input') && input.val().trim().length !== 0) {
            setValue(parseInputDate(input.val().trim()));
        } else if (options.defaultDate && input.attr('placeholder') === undefined) {
            setValue(options.defaultDate);
        }
        if (options.inline) {
            show();
        }
        return picker;
    };

    /********************************************************************************
     *
     * jQuery plugin constructor and defaults object
     *
     ********************************************************************************/

    /**
    * See (http://jquery.com/).
    * @name jQuery
    * @class
    * See the jQuery Library  (http://jquery.com/) for full details.  This just
    * documents the function and classes that are added to jQuery by this plug-in.
    */
    /**
     * See (http://jquery.com/)
     * @name fn
     * @class
     * See the jQuery Library  (http://jquery.com/) for full details.  This just
     * documents the function and classes that are added to jQuery by this plug-in.
     * @memberOf jQuery
     */
    /**
     * Show comments
     * @class bsDatetimepicker
     * @memberOf jQuery.fn
     */
    $.fn.bsDatetimepicker = function (options) {
        options = options || {};

        var args = Array.prototype.slice.call(arguments, 1),
            isInstance = true,
            thisMethods = ['destroy', 'hide', 'show', 'toggle'],
            returnValue;

        if (typeof options === 'object') {
            return this.each(function () {
                var $this = $(this),
                    _options;
                if (!$this.data('DateTimePicker')) {
                    // create a private copy of the defaults object
                    _options = $.extend(true, {}, $.fn.bsDatetimepicker.defaults, options);
                    $this.data('DateTimePicker', dateTimePicker($this, _options));
                }
            });
        } else if (typeof options === 'string') {
            this.each(function () {
                var $this = $(this),
                    instance = $this.data('DateTimePicker');
                if (!instance) {
                    throw new Error('bs-datetimepicker("' + options + '") method was called on an element that is not using DateTimePicker');
                }

                returnValue = instance[options].apply(instance, args);
                isInstance = returnValue === instance;
            });

            if (isInstance || $.inArray(options, thisMethods) > -1) {
                return this;
            }

            return returnValue;
        }

        throw new TypeError('Invalid arguments for DateTimePicker: ' + options);
    };

    $.fn.bsDatetimepicker.defaults = {
        timeZone: '',
        format: false,
        dayViewHeaderFormat: 'MMMM YYYY',
        extraFormats: false,
        stepping: 1,
        minDate: false,
        maxDate: false,
        useCurrent: true,
        collapse: true,
        locale: moment.locale(),
        defaultDate: false,
        disabledDates: false,
        enabledDates: false,
        icons: {
            time: 'fa fa-clock-o',
            date: 'fa fa-calendar',
            up: 'fa fa-angle-up',
            down: 'fa fa-angle-down',
            previous: 'fa fa-angle-double-left',
            next: 'fa fa-angle-double-right',
            today: 'fa  fa-crosshairs',
            clear: 'fa fa-trash',
            close: 'fa fa-close'
        },
        tooltips: {
            today: 'Go to today',
            clear: 'Clear selection',
            close: 'Close the picker',
            selectMonth: 'Select Month',
            prevMonth: 'Previous Month',
            nextMonth: 'Next Month',
            selectYear: 'Select Year',
            prevYear: 'Previous Year',
            nextYear: 'Next Year',
            selectDecade: 'Select Decade',
            prevDecade: 'Previous Decade',
            nextDecade: 'Next Decade',
            prevCentury: 'Previous Century',
            nextCentury: 'Next Century',
            pickHour: 'Pick Hour',
            incrementHour: 'Increment Hour',
            decrementHour: 'Decrement Hour',
            pickMinute: 'Pick Minute',
            incrementMinute: 'Increment Minute',
            decrementMinute: 'Decrement Minute',
            pickSecond: 'Pick Second',
            incrementSecond: 'Increment Second',
            decrementSecond: 'Decrement Second',
            togglePeriod: 'Toggle Period',
            selectTime: 'Select Time'
        },
        useStrict: false,
        sideBySide: false,
        daysOfWeekDisabled: false,
        calendarWeeks: false,
        viewMode: 'days',
        toolbarPlacement: 'default',
        showTodayButton: false,
        showClear: false,
        showClose: false,
        widgetPositioning: {
            horizontal: 'auto',
            vertical: 'auto'
        },
        widgetParent: null,
        ignoreReadonly: false,
        keepOpen: false,
        focusOnShow: true,
        inline: false,
        keepInvalid: false,
        datepickerInput: '.bs-datepickerinput',
        keyBinds: {
            up: function (widget) {
                if (!widget) {
                    return;
                }
                var d = this.date() || this.getMoment();
                if (widget.find('.bs-datepicker').is(':visible')) {
                    this.date(d.clone().subtract(7, 'd'));
                } else {
                    this.date(d.clone().add(this.stepping(), 'm'));
                }
            },
            down: function (widget) {
                if (!widget) {
                    this.show();
                    return;
                }
                var d = this.date() || this.getMoment();
                if (widget.find('.bs-datepicker').is(':visible')) {
                    this.date(d.clone().add(7, 'd'));
                } else {
                    this.date(d.clone().subtract(this.stepping(), 'm'));
                }
            },
            'control up': function (widget) {
                if (!widget) {
                    return;
                }
                var d = this.date() || this.getMoment();
                if (widget.find('.bs-datepicker').is(':visible')) {
                    this.date(d.clone().subtract(1, 'y'));
                } else {
                    this.date(d.clone().add(1, 'h'));
                }
            },
            'control down': function (widget) {
                if (!widget) {
                    return;
                }
                var d = this.date() || this.getMoment();
                if (widget.find('.bs-datepicker').is(':visible')) {
                    this.date(d.clone().add(1, 'y'));
                } else {
                    this.date(d.clone().subtract(1, 'h'));
                }
            },
            left: function (widget) {
                if (!widget) {
                    return;
                }
                var d = this.date() || this.getMoment();
                if (widget.find('.bs-datepicker').is(':visible')) {
                    this.date(d.clone().subtract(1, 'd'));
                }
            },
            right: function (widget) {
                if (!widget) {
                    return;
                }
                var d = this.date() || this.getMoment();
                if (widget.find('.bs-datepicker').is(':visible')) {
                    this.date(d.clone().add(1, 'd'));
                }
            },
            pageUp: function (widget) {
                if (!widget) {
                    return;
                }
                var d = this.date() || this.getMoment();
                if (widget.find('.bs-datepicker').is(':visible')) {
                    this.date(d.clone().subtract(1, 'M'));
                }
            },
            pageDown: function (widget) {
                if (!widget) {
                    return;
                }
                var d = this.date() || this.getMoment();
                if (widget.find('.bs-datepicker').is(':visible')) {
                    this.date(d.clone().add(1, 'M'));
                }
            },
            enter: function () {
                this.hide();
            },
            escape: function () {
                this.hide();
            },
            //tab: function (widget) { //this break the flow of the form. disabling for now
            //    var toggle = widget.find('.picker-switch a[data-action="togglePicker"]');
            //    if(toggle.length > 0) toggle.click();
            //},
            'control space': function (widget) {
                if (!widget) {
                    return;
                }
                if (widget.find('.timepicker').is(':visible')) {
                    widget.find('.btn[data-action="togglePeriod"]').click();
                }
            },
            t: function () {
                this.date(this.getMoment());
            },
            'delete': function () {
                this.clear();
            }
        },
        debug: false,
        allowInputToggle: false,
        disabledTimeIntervals: false,
        disabledHours: false,
        enabledHours: false,
        viewDate: false
    };

    return $.fn.bsDatetimepicker;
});
System.registerDynamic("reactiveadmintemplate/scripts/modules/form/datatimepicker/init.js", ["moment", "./main"], true, function ($__require, exports, module) {
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
    $__require("moment");
    $__require("./main");
    $(function () {
        ////////////////////////
        // Data Time Picker
        $('.datetimepicker.picker-simple').bsDatetimepicker({});
        $('.datetimepicker.picker-format').bsDatetimepicker({
            showTodayButton: true,
            showClear: true,
            format: 'MMM D, YYYY    h:mm A'
        });
        $('.datetimepicker.picker-inline').bsDatetimepicker({
            inline: true,
            calendarWeeks: true
        });
        $('.datetimepicker.picker-disabled').bsDatetimepicker({
            daysOfWeekDisabled: [0, 5, 6],
            disabledHours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 19, 20, 21, 22, 23]
        });
        var $linkedInputs = $('.datetimepicker.picker-range input'),
            $firstInput = $linkedInputs.first(),
            $lastInput = $linkedInputs.last();
        $firstInput.bsDatetimepicker();
        $lastInput.bsDatetimepicker({ useCurrent: false });
        $firstInput.on('dp.change', function (e) {
            $lastInput.data('DateTimePicker').minDate(e.date);
        });
        $lastInput.on('dp.change', function (e) {
            $firstInput.data('DateTimePicker').maxDate(e.date);
        });
        $('.datetimepicker').on('dp.show', function () {
            $('.bs-datetimepicker-widget.dropdown-menu').css('opacity', '0').addClass('transition scale in').on('click', function () {
                $(this).removeClass('transition scale in').css('opacity', '1');
            });
        });
        // End Data Time Picker
    });
});
System.registerDynamic("npm:bootstrap-timepicker@0.5.2.json", [], true, function() {
  return {
    "main": "js/bootstrap-timepicker.js",
    "format": "global",
    "meta": {
      "*.json": {
        "format": "json"
      },
      "css/*": {
        "globals": {
          "process": null
        }
      },
      "js/*": {
        "globals": {
          "process": null
        }
      }
    }
  };
});

System.registerDynamic('npm:bootstrap-timepicker@0.5.2/js/bootstrap-timepicker.js', [], false, function ($__require, $__exports, $__module) {
  var _retrieveGlobal = System.registry.get("@@global-helpers").prepareGlobal($__module.id, null, {});

  (function ($__global) {
    /*!
     * Timepicker Component for Twitter Bootstrap
     *
     * Copyright 2013 Joris de Wit and bootstrap-timepicker contributors
     *
     * Contributors https://github.com/jdewit/bootstrap-timepicker/graphs/contributors
     *
     * For the full copyright and license information, please view the LICENSE
     * file that was distributed with this source code.
     */
    (function ($, window, document) {
      'use strict';

      // TIMEPICKER PUBLIC CLASS DEFINITION

      var Timepicker = function (element, options) {
        this.widget = '';
        this.$element = $(element);
        this.defaultTime = options.defaultTime;
        this.disableFocus = options.disableFocus;
        this.disableMousewheel = options.disableMousewheel;
        this.isOpen = options.isOpen;
        this.minuteStep = options.minuteStep;
        this.modalBackdrop = options.modalBackdrop;
        this.orientation = options.orientation;
        this.secondStep = options.secondStep;
        this.snapToStep = options.snapToStep;
        this.showInputs = options.showInputs;
        this.showMeridian = options.showMeridian;
        this.showSeconds = options.showSeconds;
        this.template = options.template;
        this.appendWidgetTo = options.appendWidgetTo;
        this.showWidgetOnAddonClick = options.showWidgetOnAddonClick;
        this.icons = options.icons;
        this.maxHours = options.maxHours;
        this.explicitMode = options.explicitMode; // If true 123 = 1:23, 12345 = 1:23:45, else invalid.

        this.handleDocumentClick = function (e) {
          var self = e.data.scope;
          // This condition was inspired by bootstrap-datepicker.
          // The element the timepicker is invoked on is the input but it has a sibling for addon/button.
          if (!(self.$element.parent().find(e.target).length || self.$widget.is(e.target) || self.$widget.find(e.target).length)) {
            self.hideWidget();
          }
        };

        this._init();
      };

      Timepicker.prototype = {

        constructor: Timepicker,
        _init: function () {
          var self = this;

          if (this.showWidgetOnAddonClick && this.$element.parent().hasClass('input-group') && this.$element.parent().hasClass('bootstrap-timepicker')) {
            this.$element.parent('.input-group.bootstrap-timepicker').find('.input-group-addon').on({
              'click.timepicker': $.proxy(this.showWidget, this)
            });
            this.$element.on({
              'focus.timepicker': $.proxy(this.highlightUnit, this),
              'click.timepicker': $.proxy(this.highlightUnit, this),
              'keydown.timepicker': $.proxy(this.elementKeydown, this),
              'blur.timepicker': $.proxy(this.blurElement, this),
              'mousewheel.timepicker DOMMouseScroll.timepicker': $.proxy(this.mousewheel, this)
            });
          } else {
            if (this.template) {
              this.$element.on({
                'focus.timepicker': $.proxy(this.showWidget, this),
                'click.timepicker': $.proxy(this.showWidget, this),
                'blur.timepicker': $.proxy(this.blurElement, this),
                'mousewheel.timepicker DOMMouseScroll.timepicker': $.proxy(this.mousewheel, this)
              });
            } else {
              this.$element.on({
                'focus.timepicker': $.proxy(this.highlightUnit, this),
                'click.timepicker': $.proxy(this.highlightUnit, this),
                'keydown.timepicker': $.proxy(this.elementKeydown, this),
                'blur.timepicker': $.proxy(this.blurElement, this),
                'mousewheel.timepicker DOMMouseScroll.timepicker': $.proxy(this.mousewheel, this)
              });
            }
          }

          if (this.template !== false) {
            this.$widget = $(this.getTemplate()).on('click', $.proxy(this.widgetClick, this));
          } else {
            this.$widget = false;
          }

          if (this.showInputs && this.$widget !== false) {
            this.$widget.find('input').each(function () {
              $(this).on({
                'click.timepicker': function () {
                  $(this).select();
                },
                'keydown.timepicker': $.proxy(self.widgetKeydown, self),
                'keyup.timepicker': $.proxy(self.widgetKeyup, self)
              });
            });
          }

          this.setDefaultTime(this.defaultTime);
        },

        blurElement: function () {
          this.highlightedUnit = null;
          this.updateFromElementVal();
        },

        clear: function () {
          this.hour = '';
          this.minute = '';
          this.second = '';
          this.meridian = '';

          this.$element.val('');
        },

        decrementHour: function () {
          if (this.showMeridian) {
            if (this.hour === 1) {
              this.hour = 12;
            } else if (this.hour === 12) {
              this.hour--;

              return this.toggleMeridian();
            } else if (this.hour === 0) {
              this.hour = 11;

              return this.toggleMeridian();
            } else {
              this.hour--;
            }
          } else {
            if (this.hour <= 0) {
              this.hour = this.maxHours - 1;
            } else {
              this.hour--;
            }
          }
        },

        decrementMinute: function (step) {
          var newVal;

          if (step) {
            newVal = this.minute - step;
          } else {
            newVal = this.minute - this.minuteStep;
          }

          if (newVal < 0) {
            this.decrementHour();
            this.minute = newVal + 60;
          } else {
            this.minute = newVal;
          }
        },

        decrementSecond: function () {
          var newVal = this.second - this.secondStep;

          if (newVal < 0) {
            this.decrementMinute(true);
            this.second = newVal + 60;
          } else {
            this.second = newVal;
          }
        },

        elementKeydown: function (e) {
          switch (e.which) {
            case 9:
              //tab
              if (e.shiftKey) {
                if (this.highlightedUnit === 'hour') {
                  this.hideWidget();
                  break;
                }
                this.highlightPrevUnit();
              } else if (this.showMeridian && this.highlightedUnit === 'meridian' || this.showSeconds && this.highlightedUnit === 'second' || !this.showMeridian && !this.showSeconds && this.highlightedUnit === 'minute') {
                this.hideWidget();
                break;
              } else {
                this.highlightNextUnit();
              }
              e.preventDefault();
              this.updateFromElementVal();
              break;
            case 27:
              // escape
              this.updateFromElementVal();
              break;
            case 37:
              // left arrow
              e.preventDefault();
              this.highlightPrevUnit();
              this.updateFromElementVal();
              break;
            case 38:
              // up arrow
              e.preventDefault();
              switch (this.highlightedUnit) {
                case 'hour':
                  this.incrementHour();
                  this.highlightHour();
                  break;
                case 'minute':
                  this.incrementMinute();
                  this.highlightMinute();
                  break;
                case 'second':
                  this.incrementSecond();
                  this.highlightSecond();
                  break;
                case 'meridian':
                  this.toggleMeridian();
                  this.highlightMeridian();
                  break;
              }
              this.update();
              break;
            case 39:
              // right arrow
              e.preventDefault();
              this.highlightNextUnit();
              this.updateFromElementVal();
              break;
            case 40:
              // down arrow
              e.preventDefault();
              switch (this.highlightedUnit) {
                case 'hour':
                  this.decrementHour();
                  this.highlightHour();
                  break;
                case 'minute':
                  this.decrementMinute();
                  this.highlightMinute();
                  break;
                case 'second':
                  this.decrementSecond();
                  this.highlightSecond();
                  break;
                case 'meridian':
                  this.toggleMeridian();
                  this.highlightMeridian();
                  break;
              }

              this.update();
              break;
          }
        },

        getCursorPosition: function () {
          var input = this.$element.get(0);

          if ('selectionStart' in input) {
            // Standard-compliant browsers

            return input.selectionStart;
          } else if (document.selection) {
            // IE fix
            input.focus();
            var sel = document.selection.createRange(),
                selLen = document.selection.createRange().text.length;

            sel.moveStart('character', -input.value.length);

            return sel.text.length - selLen;
          }
        },

        getTemplate: function () {
          var template, hourTemplate, minuteTemplate, secondTemplate, meridianTemplate, templateContent;

          if (this.showInputs) {
            hourTemplate = '<input type="text" class="bootstrap-timepicker-hour" maxlength="2"/>';
            minuteTemplate = '<input type="text" class="bootstrap-timepicker-minute" maxlength="2"/>';
            secondTemplate = '<input type="text" class="bootstrap-timepicker-second" maxlength="2"/>';
            meridianTemplate = '<input type="text" class="bootstrap-timepicker-meridian" maxlength="2"/>';
          } else {
            hourTemplate = '<span class="bootstrap-timepicker-hour"></span>';
            minuteTemplate = '<span class="bootstrap-timepicker-minute"></span>';
            secondTemplate = '<span class="bootstrap-timepicker-second"></span>';
            meridianTemplate = '<span class="bootstrap-timepicker-meridian"></span>';
          }

          templateContent = '<table>' + '<tr>' + '<td><a href="#" data-action="incrementHour"><span class="' + this.icons.up + '"></span></a></td>' + '<td class="separator">&nbsp;</td>' + '<td><a href="#" data-action="incrementMinute"><span class="' + this.icons.up + '"></span></a></td>' + (this.showSeconds ? '<td class="separator">&nbsp;</td>' + '<td><a href="#" data-action="incrementSecond"><span class="' + this.icons.up + '"></span></a></td>' : '') + (this.showMeridian ? '<td class="separator">&nbsp;</td>' + '<td class="meridian-column"><a href="#" data-action="toggleMeridian"><span class="' + this.icons.up + '"></span></a></td>' : '') + '</tr>' + '<tr>' + '<td>' + hourTemplate + '</td> ' + '<td class="separator">:</td>' + '<td>' + minuteTemplate + '</td> ' + (this.showSeconds ? '<td class="separator">:</td>' + '<td>' + secondTemplate + '</td>' : '') + (this.showMeridian ? '<td class="separator">&nbsp;</td>' + '<td>' + meridianTemplate + '</td>' : '') + '</tr>' + '<tr>' + '<td><a href="#" data-action="decrementHour"><span class="' + this.icons.down + '"></span></a></td>' + '<td class="separator"></td>' + '<td><a href="#" data-action="decrementMinute"><span class="' + this.icons.down + '"></span></a></td>' + (this.showSeconds ? '<td class="separator">&nbsp;</td>' + '<td><a href="#" data-action="decrementSecond"><span class="' + this.icons.down + '"></span></a></td>' : '') + (this.showMeridian ? '<td class="separator">&nbsp;</td>' + '<td><a href="#" data-action="toggleMeridian"><span class="' + this.icons.down + '"></span></a></td>' : '') + '</tr>' + '</table>';

          switch (this.template) {
            case 'modal':
              template = '<div class="bootstrap-timepicker-widget modal hide fade in" data-backdrop="' + (this.modalBackdrop ? 'true' : 'false') + '">' + '<div class="modal-header">' + '<a href="#" class="close" data-dismiss="modal">&times;</a>' + '<h3>Pick a Time</h3>' + '</div>' + '<div class="modal-content">' + templateContent + '</div>' + '<div class="modal-footer">' + '<a href="#" class="btn btn-primary" data-dismiss="modal">OK</a>' + '</div>' + '</div>';
              break;
            case 'dropdown':
              template = '<div class="bootstrap-timepicker-widget dropdown-menu">' + templateContent + '</div>';
              break;
          }

          return template;
        },

        getTime: function () {
          if (this.hour === '') {
            return '';
          }

          return this.hour + ':' + (this.minute.toString().length === 1 ? '0' + this.minute : this.minute) + (this.showSeconds ? ':' + (this.second.toString().length === 1 ? '0' + this.second : this.second) : '') + (this.showMeridian ? ' ' + this.meridian : '');
        },

        hideWidget: function () {
          if (this.isOpen === false) {
            return;
          }

          this.$element.trigger({
            'type': 'hide.timepicker',
            'time': {
              'value': this.getTime(),
              'hours': this.hour,
              'minutes': this.minute,
              'seconds': this.second,
              'meridian': this.meridian
            }
          });

          if (this.template === 'modal' && this.$widget.modal) {
            this.$widget.modal('hide');
          } else {
            this.$widget.removeClass('open');
          }

          $(document).off('mousedown.timepicker, touchend.timepicker', this.handleDocumentClick);

          this.isOpen = false;
          // show/hide approach taken by datepicker
          this.$widget.detach();
        },

        highlightUnit: function () {
          this.position = this.getCursorPosition();
          if (this.position >= 0 && this.position <= 2) {
            this.highlightHour();
          } else if (this.position >= 3 && this.position <= 5) {
            this.highlightMinute();
          } else if (this.position >= 6 && this.position <= 8) {
            if (this.showSeconds) {
              this.highlightSecond();
            } else {
              this.highlightMeridian();
            }
          } else if (this.position >= 9 && this.position <= 11) {
            this.highlightMeridian();
          }
        },

        highlightNextUnit: function () {
          switch (this.highlightedUnit) {
            case 'hour':
              this.highlightMinute();
              break;
            case 'minute':
              if (this.showSeconds) {
                this.highlightSecond();
              } else if (this.showMeridian) {
                this.highlightMeridian();
              } else {
                this.highlightHour();
              }
              break;
            case 'second':
              if (this.showMeridian) {
                this.highlightMeridian();
              } else {
                this.highlightHour();
              }
              break;
            case 'meridian':
              this.highlightHour();
              break;
          }
        },

        highlightPrevUnit: function () {
          switch (this.highlightedUnit) {
            case 'hour':
              if (this.showMeridian) {
                this.highlightMeridian();
              } else if (this.showSeconds) {
                this.highlightSecond();
              } else {
                this.highlightMinute();
              }
              break;
            case 'minute':
              this.highlightHour();
              break;
            case 'second':
              this.highlightMinute();
              break;
            case 'meridian':
              if (this.showSeconds) {
                this.highlightSecond();
              } else {
                this.highlightMinute();
              }
              break;
          }
        },

        highlightHour: function () {
          var $element = this.$element.get(0),
              self = this;

          this.highlightedUnit = 'hour';

          if ($element.setSelectionRange) {
            setTimeout(function () {
              if (self.hour < 10) {
                $element.setSelectionRange(0, 1);
              } else {
                $element.setSelectionRange(0, 2);
              }
            }, 0);
          }
        },

        highlightMinute: function () {
          var $element = this.$element.get(0),
              self = this;

          this.highlightedUnit = 'minute';

          if ($element.setSelectionRange) {
            setTimeout(function () {
              if (self.hour < 10) {
                $element.setSelectionRange(2, 4);
              } else {
                $element.setSelectionRange(3, 5);
              }
            }, 0);
          }
        },

        highlightSecond: function () {
          var $element = this.$element.get(0),
              self = this;

          this.highlightedUnit = 'second';

          if ($element.setSelectionRange) {
            setTimeout(function () {
              if (self.hour < 10) {
                $element.setSelectionRange(5, 7);
              } else {
                $element.setSelectionRange(6, 8);
              }
            }, 0);
          }
        },

        highlightMeridian: function () {
          var $element = this.$element.get(0),
              self = this;

          this.highlightedUnit = 'meridian';

          if ($element.setSelectionRange) {
            if (this.showSeconds) {
              setTimeout(function () {
                if (self.hour < 10) {
                  $element.setSelectionRange(8, 10);
                } else {
                  $element.setSelectionRange(9, 11);
                }
              }, 0);
            } else {
              setTimeout(function () {
                if (self.hour < 10) {
                  $element.setSelectionRange(5, 7);
                } else {
                  $element.setSelectionRange(6, 8);
                }
              }, 0);
            }
          }
        },

        incrementHour: function () {
          if (this.showMeridian) {
            if (this.hour === 11) {
              this.hour++;
              return this.toggleMeridian();
            } else if (this.hour === 12) {
              this.hour = 0;
            }
          }
          if (this.hour === this.maxHours - 1) {
            this.hour = 0;

            return;
          }
          this.hour++;
        },

        incrementMinute: function (step) {
          var newVal;

          if (step) {
            newVal = this.minute + step;
          } else {
            newVal = this.minute + this.minuteStep - this.minute % this.minuteStep;
          }

          if (newVal > 59) {
            this.incrementHour();
            this.minute = newVal - 60;
          } else {
            this.minute = newVal;
          }
        },

        incrementSecond: function () {
          var newVal = this.second + this.secondStep - this.second % this.secondStep;

          if (newVal > 59) {
            this.incrementMinute(true);
            this.second = newVal - 60;
          } else {
            this.second = newVal;
          }
        },

        mousewheel: function (e) {
          if (this.disableMousewheel) {
            return;
          }

          e.preventDefault();
          e.stopPropagation();

          var delta = e.originalEvent.wheelDelta || -e.originalEvent.detail,
              scrollTo = null;

          if (e.type === 'mousewheel') {
            scrollTo = e.originalEvent.wheelDelta * -1;
          } else if (e.type === 'DOMMouseScroll') {
            scrollTo = 40 * e.originalEvent.detail;
          }

          if (scrollTo) {
            e.preventDefault();
            $(this).scrollTop(scrollTo + $(this).scrollTop());
          }

          switch (this.highlightedUnit) {
            case 'minute':
              if (delta > 0) {
                this.incrementMinute();
              } else {
                this.decrementMinute();
              }
              this.highlightMinute();
              break;
            case 'second':
              if (delta > 0) {
                this.incrementSecond();
              } else {
                this.decrementSecond();
              }
              this.highlightSecond();
              break;
            case 'meridian':
              this.toggleMeridian();
              this.highlightMeridian();
              break;
            default:
              if (delta > 0) {
                this.incrementHour();
              } else {
                this.decrementHour();
              }
              this.highlightHour();
              break;
          }

          return false;
        },

        /**
         * Given a segment value like 43, will round and snap the segment
         * to the nearest "step", like 45 if step is 15. Segment will
         * "overflow" to 0 if it's larger than 59 or would otherwise
         * round up to 60.
         */
        changeToNearestStep: function (segment, step) {
          if (segment % step === 0) {
            return segment;
          }
          if (Math.round(segment % step / step)) {
            return (segment + (step - segment % step)) % 60;
          } else {
            return segment - segment % step;
          }
        },

        // This method was adapted from bootstrap-datepicker.
        place: function () {
          if (this.isInline) {
            return;
          }
          var widgetWidth = this.$widget.outerWidth(),
              widgetHeight = this.$widget.outerHeight(),
              visualPadding = 10,
              windowWidth = $(window).width(),
              windowHeight = $(window).height(),
              scrollTop = $(window).scrollTop();

          var zIndex = parseInt(this.$element.parents().filter(function () {
            return $(this).css('z-index') !== 'auto';
          }).first().css('z-index'), 10) + 10;
          var offset = this.component ? this.component.parent().offset() : this.$element.offset();
          var height = this.component ? this.component.outerHeight(true) : this.$element.outerHeight(false);
          var width = this.component ? this.component.outerWidth(true) : this.$element.outerWidth(false);
          var left = offset.left,
              top = offset.top;

          this.$widget.removeClass('timepicker-orient-top timepicker-orient-bottom timepicker-orient-right timepicker-orient-left');

          if (this.orientation.x !== 'auto') {
            this.$widget.addClass('timepicker-orient-' + this.orientation.x);
            if (this.orientation.x === 'right') {
              left -= widgetWidth - width;
            }
          } else {
            // auto x orientation is best-placement: if it crosses a window edge, fudge it sideways
            // Default to left
            this.$widget.addClass('timepicker-orient-left');
            if (offset.left < 0) {
              left -= offset.left - visualPadding;
            } else if (offset.left + widgetWidth > windowWidth) {
              left = windowWidth - widgetWidth - visualPadding;
            }
          }
          // auto y orientation is best-situation: top or bottom, no fudging, decision based on which shows more of the widget
          var yorient = this.orientation.y,
              topOverflow,
              bottomOverflow;
          if (yorient === 'auto') {
            topOverflow = -scrollTop + offset.top - widgetHeight;
            bottomOverflow = scrollTop + windowHeight - (offset.top + height + widgetHeight);
            if (Math.max(topOverflow, bottomOverflow) === bottomOverflow) {
              yorient = 'top';
            } else {
              yorient = 'bottom';
            }
          }
          this.$widget.addClass('timepicker-orient-' + yorient);
          if (yorient === 'top') {
            top += height;
          } else {
            top -= widgetHeight + parseInt(this.$widget.css('padding-top'), 10);
          }

          this.$widget.css({
            top: top,
            left: left,
            zIndex: zIndex
          });
        },

        remove: function () {
          $('document').off('.timepicker');
          if (this.$widget) {
            this.$widget.remove();
          }
          delete this.$element.data().timepicker;
        },

        setDefaultTime: function (defaultTime) {
          if (!this.$element.val()) {
            if (defaultTime === 'current') {
              var dTime = new Date(),
                  hours = dTime.getHours(),
                  minutes = dTime.getMinutes(),
                  seconds = dTime.getSeconds(),
                  meridian = 'AM';

              if (seconds !== 0) {
                seconds = Math.ceil(dTime.getSeconds() / this.secondStep) * this.secondStep;
                if (seconds === 60) {
                  minutes += 1;
                  seconds = 0;
                }
              }

              if (minutes !== 0) {
                minutes = Math.ceil(dTime.getMinutes() / this.minuteStep) * this.minuteStep;
                if (minutes === 60) {
                  hours += 1;
                  minutes = 0;
                }
              }

              if (this.showMeridian) {
                if (hours === 0) {
                  hours = 12;
                } else if (hours >= 12) {
                  if (hours > 12) {
                    hours = hours - 12;
                  }
                  meridian = 'PM';
                } else {
                  meridian = 'AM';
                }
              }

              this.hour = hours;
              this.minute = minutes;
              this.second = seconds;
              this.meridian = meridian;

              this.update();
            } else if (defaultTime === false) {
              this.hour = 0;
              this.minute = 0;
              this.second = 0;
              this.meridian = 'AM';
            } else {
              this.setTime(defaultTime);
            }
          } else {
            this.updateFromElementVal();
          }
        },

        setTime: function (time, ignoreWidget) {
          if (!time) {
            this.clear();
            return;
          }

          var timeMode, timeArray, hour, minute, second, meridian;

          if (typeof time === 'object' && time.getMonth) {
            // this is a date object
            hour = time.getHours();
            minute = time.getMinutes();
            second = time.getSeconds();

            if (this.showMeridian) {
              meridian = 'AM';
              if (hour > 12) {
                meridian = 'PM';
                hour = hour % 12;
              }

              if (hour === 12) {
                meridian = 'PM';
              }
            }
          } else {
            timeMode = (/a/i.test(time) ? 1 : 0) + (/p/i.test(time) ? 2 : 0); // 0 = none, 1 = AM, 2 = PM, 3 = BOTH.
            if (timeMode > 2) {
              // If both are present, fail.
              this.clear();
              return;
            }

            timeArray = time.replace(/[^0-9\:]/g, '').split(':');

            hour = timeArray[0] ? timeArray[0].toString() : timeArray.toString();

            if (this.explicitMode && hour.length > 2 && hour.length % 2 !== 0) {
              this.clear();
              return;
            }

            minute = timeArray[1] ? timeArray[1].toString() : '';
            second = timeArray[2] ? timeArray[2].toString() : '';

            // adaptive time parsing
            if (hour.length > 4) {
              second = hour.slice(-2);
              hour = hour.slice(0, -2);
            }

            if (hour.length > 2) {
              minute = hour.slice(-2);
              hour = hour.slice(0, -2);
            }

            if (minute.length > 2) {
              second = minute.slice(-2);
              minute = minute.slice(0, -2);
            }

            hour = parseInt(hour, 10);
            minute = parseInt(minute, 10);
            second = parseInt(second, 10);

            if (isNaN(hour)) {
              hour = 0;
            }
            if (isNaN(minute)) {
              minute = 0;
            }
            if (isNaN(second)) {
              second = 0;
            }

            // Adjust the time based upon unit boundary.
            // NOTE: Negatives will never occur due to time.replace() above.
            if (second > 59) {
              second = 59;
            }

            if (minute > 59) {
              minute = 59;
            }

            if (hour >= this.maxHours) {
              // No day/date handling.
              hour = this.maxHours - 1;
            }

            if (this.showMeridian) {
              if (hour > 12) {
                // Force PM.
                timeMode = 2;
                hour -= 12;
              }
              if (!timeMode) {
                timeMode = 1;
              }
              if (hour === 0) {
                hour = 12; // AM or PM, reset to 12.  0 AM = 12 AM.  0 PM = 12 PM, etc.
              }
              meridian = timeMode === 1 ? 'AM' : 'PM';
            } else if (hour < 12 && timeMode === 2) {
              hour += 12;
            } else {
              if (hour >= this.maxHours) {
                hour = this.maxHours - 1;
              } else if (hour < 0 || hour === 12 && timeMode === 1) {
                hour = 0;
              }
            }
          }

          this.hour = hour;
          if (this.snapToStep) {
            this.minute = this.changeToNearestStep(minute, this.minuteStep);
            this.second = this.changeToNearestStep(second, this.secondStep);
          } else {
            this.minute = minute;
            this.second = second;
          }
          this.meridian = meridian;

          this.update(ignoreWidget);
        },

        showWidget: function () {
          if (this.isOpen) {
            return;
          }

          if (this.$element.is(':disabled')) {
            return;
          }

          // show/hide approach taken by datepicker
          this.$widget.appendTo(this.appendWidgetTo);
          $(document).on('mousedown.timepicker, touchend.timepicker', { scope: this }, this.handleDocumentClick);

          this.$element.trigger({
            'type': 'show.timepicker',
            'time': {
              'value': this.getTime(),
              'hours': this.hour,
              'minutes': this.minute,
              'seconds': this.second,
              'meridian': this.meridian
            }
          });

          this.place();
          if (this.disableFocus) {
            this.$element.blur();
          }

          // widget shouldn't be empty on open
          if (this.hour === '') {
            if (this.defaultTime) {
              this.setDefaultTime(this.defaultTime);
            } else {
              this.setTime('0:0:0');
            }
          }

          if (this.template === 'modal' && this.$widget.modal) {
            this.$widget.modal('show').on('hidden', $.proxy(this.hideWidget, this));
          } else {
            if (this.isOpen === false) {
              this.$widget.addClass('open');
            }
          }

          this.isOpen = true;
        },

        toggleMeridian: function () {
          this.meridian = this.meridian === 'AM' ? 'PM' : 'AM';
        },

        update: function (ignoreWidget) {
          this.updateElement();
          if (!ignoreWidget) {
            this.updateWidget();
          }

          this.$element.trigger({
            'type': 'changeTime.timepicker',
            'time': {
              'value': this.getTime(),
              'hours': this.hour,
              'minutes': this.minute,
              'seconds': this.second,
              'meridian': this.meridian
            }
          });
        },

        updateElement: function () {
          this.$element.val(this.getTime()).change();
        },

        updateFromElementVal: function () {
          this.setTime(this.$element.val());
        },

        updateWidget: function () {
          if (this.$widget === false) {
            return;
          }

          var hour = this.hour,
              minute = this.minute.toString().length === 1 ? '0' + this.minute : this.minute,
              second = this.second.toString().length === 1 ? '0' + this.second : this.second;

          if (this.showInputs) {
            this.$widget.find('input.bootstrap-timepicker-hour').val(hour);
            this.$widget.find('input.bootstrap-timepicker-minute').val(minute);

            if (this.showSeconds) {
              this.$widget.find('input.bootstrap-timepicker-second').val(second);
            }
            if (this.showMeridian) {
              this.$widget.find('input.bootstrap-timepicker-meridian').val(this.meridian);
            }
          } else {
            this.$widget.find('span.bootstrap-timepicker-hour').text(hour);
            this.$widget.find('span.bootstrap-timepicker-minute').text(minute);

            if (this.showSeconds) {
              this.$widget.find('span.bootstrap-timepicker-second').text(second);
            }
            if (this.showMeridian) {
              this.$widget.find('span.bootstrap-timepicker-meridian').text(this.meridian);
            }
          }
        },

        updateFromWidgetInputs: function () {
          if (this.$widget === false) {
            return;
          }

          var t = this.$widget.find('input.bootstrap-timepicker-hour').val() + ':' + this.$widget.find('input.bootstrap-timepicker-minute').val() + (this.showSeconds ? ':' + this.$widget.find('input.bootstrap-timepicker-second').val() : '') + (this.showMeridian ? this.$widget.find('input.bootstrap-timepicker-meridian').val() : '');

          this.setTime(t, true);
        },

        widgetClick: function (e) {
          e.stopPropagation();
          e.preventDefault();

          var $input = $(e.target),
              action = $input.closest('a').data('action');

          if (action) {
            this[action]();
          }
          this.update();

          if ($input.is('input')) {
            $input.get(0).setSelectionRange(0, 2);
          }
        },

        widgetKeydown: function (e) {
          var $input = $(e.target),
              name = $input.attr('class').replace('bootstrap-timepicker-', '');

          switch (e.which) {
            case 9:
              //tab
              if (e.shiftKey) {
                if (name === 'hour') {
                  return this.hideWidget();
                }
              } else if (this.showMeridian && name === 'meridian' || this.showSeconds && name === 'second' || !this.showMeridian && !this.showSeconds && name === 'minute') {
                return this.hideWidget();
              }
              break;
            case 27:
              // escape
              this.hideWidget();
              break;
            case 38:
              // up arrow
              e.preventDefault();
              switch (name) {
                case 'hour':
                  this.incrementHour();
                  break;
                case 'minute':
                  this.incrementMinute();
                  break;
                case 'second':
                  this.incrementSecond();
                  break;
                case 'meridian':
                  this.toggleMeridian();
                  break;
              }
              this.setTime(this.getTime());
              $input.get(0).setSelectionRange(0, 2);
              break;
            case 40:
              // down arrow
              e.preventDefault();
              switch (name) {
                case 'hour':
                  this.decrementHour();
                  break;
                case 'minute':
                  this.decrementMinute();
                  break;
                case 'second':
                  this.decrementSecond();
                  break;
                case 'meridian':
                  this.toggleMeridian();
                  break;
              }
              this.setTime(this.getTime());
              $input.get(0).setSelectionRange(0, 2);
              break;
          }
        },

        widgetKeyup: function (e) {
          if (e.which === 65 || e.which === 77 || e.which === 80 || e.which === 46 || e.which === 8 || e.which >= 48 && e.which <= 57 || e.which >= 96 && e.which <= 105) {
            this.updateFromWidgetInputs();
          }
        }
      };

      //TIMEPICKER PLUGIN DEFINITION
      $.fn.timepicker = function (option) {
        var args = Array.apply(null, arguments);
        args.shift();
        return this.each(function () {
          var $this = $(this),
              data = $this.data('timepicker'),
              options = typeof option === 'object' && option;

          if (!data) {
            $this.data('timepicker', data = new Timepicker(this, $.extend({}, $.fn.timepicker.defaults, options, $(this).data())));
          }

          if (typeof option === 'string') {
            data[option].apply(data, args);
          }
        });
      };

      $.fn.timepicker.defaults = {
        defaultTime: 'current',
        disableFocus: false,
        disableMousewheel: false,
        isOpen: false,
        minuteStep: 15,
        modalBackdrop: false,
        orientation: { x: 'auto', y: 'auto' },
        secondStep: 15,
        snapToStep: false,
        showSeconds: false,
        showInputs: true,
        showMeridian: true,
        template: 'dropdown',
        appendWidgetTo: 'body',
        showWidgetOnAddonClick: true,
        icons: {
          up: 'glyphicon glyphicon-chevron-up',
          down: 'glyphicon glyphicon-chevron-down'
        },
        maxHours: 24,
        explicitMode: false
      };

      $.fn.timepicker.Constructor = Timepicker;

      $(document).on('focus.timepicker.data-api click.timepicker.data-api', '[data-provide="timepicker"]', function (e) {
        var $this = $(this);
        if ($this.data('timepicker')) {
          return;
        }
        e.preventDefault();
        // component click requires us to explicitly show it
        $this.timepicker();
      });
    })(jQuery, window, document);
  })(this);

  return _retrieveGlobal();
});
System.registerDynamic("reactiveadmintemplate/scripts/modules/form/time-picker.js", ["timepicker"], true, function ($__require, exports, module) {
    'use strict';

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    /*!
     * @version: 1.1.2
     * @name: time-picker
     *
     * @author: https://themeforest.net/user/flexlayers
     */
    $__require("timepicker");
    $(function () {
        ////////////////////////
        // Time Picker
        var timepicker = { icons: { up: 'fa fa-angle-up', down: 'fa fa-angle-down' }, showMeridian: true };
        $('.timepicker.picker-simple').timepicker(timepicker);
        $('.timepicker.picker-second').timepicker($.extend({}, timepicker, { showSeconds: true }));
        $('.timepicker.picker-twenty-four').timepicker($.extend({}, timepicker, { showMeridian: false, showSeconds: true }));
        $('.timepicker').on('show.timepicker', function () {
            $('.bootstrap-timepicker-widget.dropdown-menu').css('opacity', '0').addClass('transition scale in').on('click', function () {
                $(this).removeClass('transition scale in').css('opacity', '1');
            });
        });
        // End Time Picker
    });
});
System.registerDynamic("npm:inputmask@3.3.8/dist/inputmask/inputmask.js", [], false, function ($__require, $__exports, $__module) {
    var _retrieveGlobal = System.registry.get("@@global-helpers").prepareGlobal($__module.id, null, {});

    (function ($__global) {
        /*!
        * inputmask.js
        * https://github.com/RobinHerbots/Inputmask
        * Copyright (c) 2010 - 2017 Robin Herbots
        * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
        * Version: 3.3.8
        */

        !function (factory) {
            "function" == typeof define && define.amd ? define(["./dependencyLibs/inputmask.dependencyLib", "./global/window", "./global/document"], factory) : "object" == typeof exports ? module.exports = factory(require("./dependencyLibs/inputmask.dependencyLib"), require("./global/window"), require("./global/document")) : window.Inputmask = factory(window.dependencyLib || jQuery, window, document);
        }(function ($, window, document, undefined) {
            function Inputmask(alias, options, internal) {
                if (!(this instanceof Inputmask)) return new Inputmask(alias, options, internal);
                this.el = undefined, this.events = {}, this.maskset = undefined, this.refreshValue = !1, !0 !== internal && ($.isPlainObject(alias) ? options = alias : (options = options || {}, options.alias = alias), this.opts = $.extend(!0, {}, this.defaults, options), this.noMasksCache = options && options.definitions !== undefined, this.userOptions = options || {}, this.isRTL = this.opts.numericInput, resolveAlias(this.opts.alias, options, this.opts));
            }
            function resolveAlias(aliasStr, options, opts) {
                var aliasDefinition = Inputmask.prototype.aliases[aliasStr];
                return aliasDefinition ? (aliasDefinition.alias && resolveAlias(aliasDefinition.alias, undefined, opts), $.extend(!0, opts, aliasDefinition), $.extend(!0, opts, options), !0) : (null === opts.mask && (opts.mask = aliasStr), !1);
            }
            function generateMaskSet(opts, nocache) {
                function generateMask(mask, metadata, opts) {
                    var regexMask = !1;
                    if (null !== mask && "" !== mask || (regexMask = null !== opts.regex, regexMask ? (mask = opts.regex, mask = mask.replace(/^(\^)(.*)(\$)$/, "$2")) : (regexMask = !0, mask = ".*")), 1 === mask.length && !1 === opts.greedy && 0 !== opts.repeat && (opts.placeholder = ""), opts.repeat > 0 || "*" === opts.repeat || "+" === opts.repeat) {
                        var repeatStart = "*" === opts.repeat ? 0 : "+" === opts.repeat ? 1 : opts.repeat;
                        mask = opts.groupmarker.start + mask + opts.groupmarker.end + opts.quantifiermarker.start + repeatStart + "," + opts.repeat + opts.quantifiermarker.end;
                    }
                    var masksetDefinition,
                        maskdefKey = regexMask ? "regex_" + opts.regex : opts.numericInput ? mask.split("").reverse().join("") : mask;
                    return Inputmask.prototype.masksCache[maskdefKey] === undefined || !0 === nocache ? (masksetDefinition = {
                        mask: mask,
                        maskToken: Inputmask.prototype.analyseMask(mask, regexMask, opts),
                        validPositions: {},
                        _buffer: undefined,
                        buffer: undefined,
                        tests: {},
                        metadata: metadata,
                        maskLength: undefined
                    }, !0 !== nocache && (Inputmask.prototype.masksCache[maskdefKey] = masksetDefinition, masksetDefinition = $.extend(!0, {}, Inputmask.prototype.masksCache[maskdefKey]))) : masksetDefinition = $.extend(!0, {}, Inputmask.prototype.masksCache[maskdefKey]), masksetDefinition;
                }
                if ($.isFunction(opts.mask) && (opts.mask = opts.mask(opts)), $.isArray(opts.mask)) {
                    if (opts.mask.length > 1) {
                        opts.keepStatic = null === opts.keepStatic || opts.keepStatic;
                        var altMask = opts.groupmarker.start;
                        return $.each(opts.numericInput ? opts.mask.reverse() : opts.mask, function (ndx, msk) {
                            altMask.length > 1 && (altMask += opts.groupmarker.end + opts.alternatormarker + opts.groupmarker.start), msk.mask === undefined || $.isFunction(msk.mask) ? altMask += msk : altMask += msk.mask;
                        }), altMask += opts.groupmarker.end, generateMask(altMask, opts.mask, opts);
                    }
                    opts.mask = opts.mask.pop();
                }
                return opts.mask && opts.mask.mask !== undefined && !$.isFunction(opts.mask.mask) ? generateMask(opts.mask.mask, opts.mask, opts) : generateMask(opts.mask, opts.mask, opts);
            }
            function maskScope(actionObj, maskset, opts) {
                function getMaskTemplate(baseOnInput, minimalPos, includeMode) {
                    minimalPos = minimalPos || 0;
                    var ndxIntlzr,
                        test,
                        testPos,
                        maskTemplate = [],
                        pos = 0,
                        lvp = getLastValidPosition();
                    do {
                        !0 === baseOnInput && getMaskSet().validPositions[pos] ? (testPos = getMaskSet().validPositions[pos], test = testPos.match, ndxIntlzr = testPos.locator.slice(), maskTemplate.push(!0 === includeMode ? testPos.input : !1 === includeMode ? test.nativeDef : getPlaceholder(pos, test))) : (testPos = getTestTemplate(pos, ndxIntlzr, pos - 1), test = testPos.match, ndxIntlzr = testPos.locator.slice(), (!1 === opts.jitMasking || pos < lvp || "number" == typeof opts.jitMasking && isFinite(opts.jitMasking) && opts.jitMasking > pos) && maskTemplate.push(!1 === includeMode ? test.nativeDef : getPlaceholder(pos, test))), pos++;
                    } while ((maxLength === undefined || pos < maxLength) && (null !== test.fn || "" !== test.def) || minimalPos > pos);
                    return "" === maskTemplate[maskTemplate.length - 1] && maskTemplate.pop(), getMaskSet().maskLength = pos + 1, maskTemplate;
                }
                function getMaskSet() {
                    return maskset;
                }
                function resetMaskSet(soft) {
                    var maskset = getMaskSet();
                    maskset.buffer = undefined, !0 !== soft && (maskset.validPositions = {}, maskset.p = 0);
                }
                function getLastValidPosition(closestTo, strict, validPositions) {
                    var before = -1,
                        after = -1,
                        valids = validPositions || getMaskSet().validPositions;
                    closestTo === undefined && (closestTo = -1);
                    for (var posNdx in valids) {
                        var psNdx = parseInt(posNdx);
                        valids[psNdx] && (strict || !0 !== valids[psNdx].generatedInput) && (psNdx <= closestTo && (before = psNdx), psNdx >= closestTo && (after = psNdx));
                    }
                    return -1 !== before && closestTo - before > 1 || after < closestTo ? before : after;
                }
                function stripValidPositions(start, end, nocheck, strict) {
                    var i,
                        startPos = start,
                        positionsClone = $.extend(!0, {}, getMaskSet().validPositions),
                        needsValidation = !1;
                    for (getMaskSet().p = start, i = end - 1; i >= startPos; i--) getMaskSet().validPositions[i] !== undefined && (!0 !== nocheck && (!getMaskSet().validPositions[i].match.optionality && function (pos) {
                        var posMatch = getMaskSet().validPositions[pos];
                        if (posMatch !== undefined && null === posMatch.match.fn) {
                            var prevMatch = getMaskSet().validPositions[pos - 1],
                                nextMatch = getMaskSet().validPositions[pos + 1];
                            return prevMatch !== undefined && nextMatch !== undefined;
                        }
                        return !1;
                    }(i) || !1 === opts.canClearPosition(getMaskSet(), i, getLastValidPosition(), strict, opts)) || delete getMaskSet().validPositions[i]);
                    for (resetMaskSet(!0), i = startPos + 1; i <= getLastValidPosition();) {
                        for (; getMaskSet().validPositions[startPos] !== undefined;) startPos++;
                        if (i < startPos && (i = startPos + 1), getMaskSet().validPositions[i] === undefined && isMask(i)) i++;else {
                            var t = getTestTemplate(i);
                            !1 === needsValidation && positionsClone[startPos] && positionsClone[startPos].match.def === t.match.def ? (getMaskSet().validPositions[startPos] = $.extend(!0, {}, positionsClone[startPos]), getMaskSet().validPositions[startPos].input = t.input, delete getMaskSet().validPositions[i], i++) : positionCanMatchDefinition(startPos, t.match.def) ? !1 !== isValid(startPos, t.input || getPlaceholder(i), !0) && (delete getMaskSet().validPositions[i], i++, needsValidation = !0) : isMask(i) || (i++, startPos--), startPos++;
                        }
                    }
                    resetMaskSet(!0);
                }
                function determineTestTemplate(tests, guessNextBest) {
                    for (var testPos, testPositions = tests, lvp = getLastValidPosition(), lvTest = getMaskSet().validPositions[lvp] || getTests(0)[0], lvTestAltArr = lvTest.alternation !== undefined ? lvTest.locator[lvTest.alternation].toString().split(",") : [], ndx = 0; ndx < testPositions.length && (testPos = testPositions[ndx], !(testPos.match && (opts.greedy && !0 !== testPos.match.optionalQuantifier || (!1 === testPos.match.optionality || !1 === testPos.match.newBlockMarker) && !0 !== testPos.match.optionalQuantifier) && (lvTest.alternation === undefined || lvTest.alternation !== testPos.alternation || testPos.locator[lvTest.alternation] !== undefined && checkAlternationMatch(testPos.locator[lvTest.alternation].toString().split(","), lvTestAltArr))) || !0 === guessNextBest && (null !== testPos.match.fn || /[0-9a-bA-Z]/.test(testPos.match.def))); ndx++);
                    return testPos;
                }
                function getTestTemplate(pos, ndxIntlzr, tstPs) {
                    return getMaskSet().validPositions[pos] || determineTestTemplate(getTests(pos, ndxIntlzr ? ndxIntlzr.slice() : ndxIntlzr, tstPs));
                }
                function getTest(pos) {
                    return getMaskSet().validPositions[pos] ? getMaskSet().validPositions[pos] : getTests(pos)[0];
                }
                function positionCanMatchDefinition(pos, def) {
                    for (var valid = !1, tests = getTests(pos), tndx = 0; tndx < tests.length; tndx++) if (tests[tndx].match && tests[tndx].match.def === def) {
                        valid = !0;
                        break;
                    }
                    return valid;
                }
                function getTests(pos, ndxIntlzr, tstPs) {
                    function resolveTestFromToken(maskToken, ndxInitializer, loopNdx, quantifierRecurse) {
                        function handleMatch(match, loopNdx, quantifierRecurse) {
                            function isFirstMatch(latestMatch, tokenGroup) {
                                var firstMatch = 0 === $.inArray(latestMatch, tokenGroup.matches);
                                return firstMatch || $.each(tokenGroup.matches, function (ndx, match) {
                                    if (!0 === match.isQuantifier && (firstMatch = isFirstMatch(latestMatch, tokenGroup.matches[ndx - 1]))) return !1;
                                }), firstMatch;
                            }
                            function resolveNdxInitializer(pos, alternateNdx, targetAlternation) {
                                var bestMatch, indexPos;
                                if (getMaskSet().validPositions[pos - 1] && targetAlternation && getMaskSet().tests[pos]) for (var vpAlternation = getMaskSet().validPositions[pos - 1].locator, tpAlternation = getMaskSet().tests[pos][0].locator, i = 0; i < targetAlternation; i++) if (vpAlternation[i] !== tpAlternation[i]) return vpAlternation.slice(targetAlternation + 1);
                                return (getMaskSet().tests[pos] || getMaskSet().validPositions[pos]) && $.each(getMaskSet().tests[pos] || [getMaskSet().validPositions[pos]], function (ndx, lmnt) {
                                    var alternation = targetAlternation !== undefined ? targetAlternation : lmnt.alternation,
                                        ndxPos = lmnt.locator[alternation] !== undefined ? lmnt.locator[alternation].toString().indexOf(alternateNdx) : -1;
                                    (indexPos === undefined || ndxPos < indexPos) && -1 !== ndxPos && (bestMatch = lmnt, indexPos = ndxPos);
                                }), bestMatch ? bestMatch.locator.slice((targetAlternation !== undefined ? targetAlternation : bestMatch.alternation) + 1) : targetAlternation !== undefined ? resolveNdxInitializer(pos, alternateNdx) : undefined;
                            }
                            if (testPos > 1e4) throw "Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " + getMaskSet().mask;
                            if (testPos === pos && match.matches === undefined) return matches.push({
                                match: match,
                                locator: loopNdx.reverse(),
                                cd: cacheDependency
                            }), !0;
                            if (match.matches !== undefined) {
                                if (match.isGroup && quantifierRecurse !== match) {
                                    if (match = handleMatch(maskToken.matches[$.inArray(match, maskToken.matches) + 1], loopNdx)) return !0;
                                } else if (match.isOptional) {
                                    var optionalToken = match;
                                    if (match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse)) {
                                        if (latestMatch = matches[matches.length - 1].match, !isFirstMatch(latestMatch, optionalToken)) return !0;
                                        insertStop = !0, testPos = pos;
                                    }
                                } else if (match.isAlternator) {
                                    var maltMatches,
                                        alternateToken = match,
                                        malternateMatches = [],
                                        currentMatches = matches.slice(),
                                        loopNdxCnt = loopNdx.length,
                                        altIndex = ndxInitializer.length > 0 ? ndxInitializer.shift() : -1;
                                    if (-1 === altIndex || "string" == typeof altIndex) {
                                        var amndx,
                                            currentPos = testPos,
                                            ndxInitializerClone = ndxInitializer.slice(),
                                            altIndexArr = [];
                                        if ("string" == typeof altIndex) altIndexArr = altIndex.split(",");else for (amndx = 0; amndx < alternateToken.matches.length; amndx++) altIndexArr.push(amndx);
                                        for (var ndx = 0; ndx < altIndexArr.length; ndx++) {
                                            if (amndx = parseInt(altIndexArr[ndx]), matches = [], ndxInitializer = resolveNdxInitializer(testPos, amndx, loopNdxCnt) || ndxInitializerClone.slice(), !0 !== (match = handleMatch(alternateToken.matches[amndx] || maskToken.matches[amndx], [amndx].concat(loopNdx), quantifierRecurse) || match) && match !== undefined && altIndexArr[altIndexArr.length - 1] < alternateToken.matches.length) {
                                                var ntndx = $.inArray(match, maskToken.matches) + 1;
                                                maskToken.matches.length > ntndx && (match = handleMatch(maskToken.matches[ntndx], [ntndx].concat(loopNdx.slice(1, loopNdx.length)), quantifierRecurse)) && (altIndexArr.push(ntndx.toString()), $.each(matches, function (ndx, lmnt) {
                                                    lmnt.alternation = loopNdx.length - 1;
                                                }));
                                            }
                                            maltMatches = matches.slice(), testPos = currentPos, matches = [];
                                            for (var ndx1 = 0; ndx1 < maltMatches.length; ndx1++) {
                                                var altMatch = maltMatches[ndx1],
                                                    dropMatch = !1;
                                                altMatch.alternation = altMatch.alternation || loopNdxCnt;
                                                for (var ndx2 = 0; ndx2 < malternateMatches.length; ndx2++) {
                                                    var altMatch2 = malternateMatches[ndx2];
                                                    if ("string" != typeof altIndex || -1 !== $.inArray(altMatch.locator[altMatch.alternation].toString(), altIndexArr)) {
                                                        if (function (source, target) {
                                                            return source.match.nativeDef === target.match.nativeDef || source.match.def === target.match.nativeDef || source.match.nativeDef === target.match.def;
                                                        }(altMatch, altMatch2)) {
                                                            dropMatch = !0, altMatch.alternation === altMatch2.alternation && -1 === altMatch2.locator[altMatch2.alternation].toString().indexOf(altMatch.locator[altMatch.alternation]) && (altMatch2.locator[altMatch2.alternation] = altMatch2.locator[altMatch2.alternation] + "," + altMatch.locator[altMatch.alternation], altMatch2.alternation = altMatch.alternation), altMatch.match.nativeDef === altMatch2.match.def && (altMatch.locator[altMatch.alternation] = altMatch2.locator[altMatch2.alternation], malternateMatches.splice(malternateMatches.indexOf(altMatch2), 1, altMatch));
                                                            break;
                                                        }
                                                        if (altMatch.match.def === altMatch2.match.def) {
                                                            dropMatch = !1;
                                                            break;
                                                        }
                                                        if (function (source, target) {
                                                            return null === source.match.fn && null !== target.match.fn && target.match.fn.test(source.match.def, getMaskSet(), pos, !1, opts, !1);
                                                        }(altMatch, altMatch2) || function (source, target) {
                                                            return null !== source.match.fn && null !== target.match.fn && target.match.fn.test(source.match.def.replace(/[\[\]]/g, ""), getMaskSet(), pos, !1, opts, !1);
                                                        }(altMatch, altMatch2)) {
                                                            altMatch.alternation === altMatch2.alternation && -1 === altMatch.locator[altMatch.alternation].toString().indexOf(altMatch2.locator[altMatch2.alternation].toString().split("")[0]) && (altMatch.na = altMatch.na || altMatch.locator[altMatch.alternation].toString(), -1 === altMatch.na.indexOf(altMatch.locator[altMatch.alternation].toString().split("")[0]) && (altMatch.na = altMatch.na + "," + altMatch.locator[altMatch2.alternation].toString().split("")[0]), dropMatch = !0, altMatch.locator[altMatch.alternation] = altMatch2.locator[altMatch2.alternation].toString().split("")[0] + "," + altMatch.locator[altMatch.alternation], malternateMatches.splice(malternateMatches.indexOf(altMatch2), 0, altMatch));
                                                            break;
                                                        }
                                                    }
                                                }
                                                dropMatch || malternateMatches.push(altMatch);
                                            }
                                        }
                                        "string" == typeof altIndex && (malternateMatches = $.map(malternateMatches, function (lmnt, ndx) {
                                            if (isFinite(ndx)) {
                                                var alternation = lmnt.alternation,
                                                    altLocArr = lmnt.locator[alternation].toString().split(",");
                                                lmnt.locator[alternation] = undefined, lmnt.alternation = undefined;
                                                for (var alndx = 0; alndx < altLocArr.length; alndx++) -1 !== $.inArray(altLocArr[alndx], altIndexArr) && (lmnt.locator[alternation] !== undefined ? (lmnt.locator[alternation] += ",", lmnt.locator[alternation] += altLocArr[alndx]) : lmnt.locator[alternation] = parseInt(altLocArr[alndx]), lmnt.alternation = alternation);
                                                if (lmnt.locator[alternation] !== undefined) return lmnt;
                                            }
                                        })), matches = currentMatches.concat(malternateMatches), testPos = pos, insertStop = matches.length > 0, match = malternateMatches.length > 0, ndxInitializer = ndxInitializerClone.slice();
                                    } else match = handleMatch(alternateToken.matches[altIndex] || maskToken.matches[altIndex], [altIndex].concat(loopNdx), quantifierRecurse);
                                    if (match) return !0;
                                } else if (match.isQuantifier && quantifierRecurse !== maskToken.matches[$.inArray(match, maskToken.matches) - 1]) for (var qt = match, qndx = ndxInitializer.length > 0 ? ndxInitializer.shift() : 0; qndx < (isNaN(qt.quantifier.max) ? qndx + 1 : qt.quantifier.max) && testPos <= pos; qndx++) {
                                    var tokenGroup = maskToken.matches[$.inArray(qt, maskToken.matches) - 1];
                                    if (match = handleMatch(tokenGroup, [qndx].concat(loopNdx), tokenGroup)) {
                                        if (latestMatch = matches[matches.length - 1].match, latestMatch.optionalQuantifier = qndx > qt.quantifier.min - 1, isFirstMatch(latestMatch, tokenGroup)) {
                                            if (qndx > qt.quantifier.min - 1) {
                                                insertStop = !0, testPos = pos;
                                                break;
                                            }
                                            return !0;
                                        }
                                        return !0;
                                    }
                                } else if (match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse)) return !0;
                            } else testPos++;
                        }
                        for (var tndx = ndxInitializer.length > 0 ? ndxInitializer.shift() : 0; tndx < maskToken.matches.length; tndx++) if (!0 !== maskToken.matches[tndx].isQuantifier) {
                            var match = handleMatch(maskToken.matches[tndx], [tndx].concat(loopNdx), quantifierRecurse);
                            if (match && testPos === pos) return match;
                            if (testPos > pos) break;
                        }
                    }
                    function filterTests(tests) {
                        if (opts.keepStatic && pos > 0 && tests.length > 1 + ("" === tests[tests.length - 1].match.def ? 1 : 0) && !0 !== tests[0].match.optionality && !0 !== tests[0].match.optionalQuantifier && null === tests[0].match.fn && !/[0-9a-bA-Z]/.test(tests[0].match.def)) {
                            if (getMaskSet().validPositions[pos - 1] === undefined) return [determineTestTemplate(tests)];
                            if (getMaskSet().validPositions[pos - 1].alternation === tests[0].alternation) return [determineTestTemplate(tests)];
                            if (getMaskSet().validPositions[pos - 1]) return [determineTestTemplate(tests)];
                        }
                        return tests;
                    }
                    var latestMatch,
                        maskTokens = getMaskSet().maskToken,
                        testPos = ndxIntlzr ? tstPs : 0,
                        ndxInitializer = ndxIntlzr ? ndxIntlzr.slice() : [0],
                        matches = [],
                        insertStop = !1,
                        cacheDependency = ndxIntlzr ? ndxIntlzr.join("") : "";
                    if (pos > -1) {
                        if (ndxIntlzr === undefined) {
                            for (var test, previousPos = pos - 1; (test = getMaskSet().validPositions[previousPos] || getMaskSet().tests[previousPos]) === undefined && previousPos > -1;) previousPos--;
                            test !== undefined && previousPos > -1 && (ndxInitializer = function (tests) {
                                var locator = [];
                                return $.isArray(tests) || (tests = [tests]), tests.length > 0 && (tests[0].alternation === undefined ? (locator = determineTestTemplate(tests.slice()).locator.slice(), 0 === locator.length && (locator = tests[0].locator.slice())) : $.each(tests, function (ndx, tst) {
                                    if ("" !== tst.def) if (0 === locator.length) locator = tst.locator.slice();else for (var i = 0; i < locator.length; i++) tst.locator[i] && -1 === locator[i].toString().indexOf(tst.locator[i]) && (locator[i] += "," + tst.locator[i]);
                                })), locator;
                            }(test), cacheDependency = ndxInitializer.join(""), testPos = previousPos);
                        }
                        if (getMaskSet().tests[pos] && getMaskSet().tests[pos][0].cd === cacheDependency) return filterTests(getMaskSet().tests[pos]);
                        for (var mtndx = ndxInitializer.shift(); mtndx < maskTokens.length; mtndx++) {
                            if (resolveTestFromToken(maskTokens[mtndx], ndxInitializer, [mtndx]) && testPos === pos || testPos > pos) break;
                        }
                    }
                    return (0 === matches.length || insertStop) && matches.push({
                        match: {
                            fn: null,
                            cardinality: 0,
                            optionality: !0,
                            casing: null,
                            def: "",
                            placeholder: ""
                        },
                        locator: [],
                        cd: cacheDependency
                    }), ndxIntlzr !== undefined && getMaskSet().tests[pos] ? filterTests($.extend(!0, [], matches)) : (getMaskSet().tests[pos] = $.extend(!0, [], matches), filterTests(getMaskSet().tests[pos]));
                }
                function getBufferTemplate() {
                    return getMaskSet()._buffer === undefined && (getMaskSet()._buffer = getMaskTemplate(!1, 1), getMaskSet().buffer === undefined && (getMaskSet().buffer = getMaskSet()._buffer.slice())), getMaskSet()._buffer;
                }
                function getBuffer(noCache) {
                    return getMaskSet().buffer !== undefined && !0 !== noCache || (getMaskSet().buffer = getMaskTemplate(!0, getLastValidPosition(), !0)), getMaskSet().buffer;
                }
                function refreshFromBuffer(start, end, buffer) {
                    var i, p;
                    if (!0 === start) resetMaskSet(), start = 0, end = buffer.length;else for (i = start; i < end; i++) delete getMaskSet().validPositions[i];
                    for (p = start, i = start; i < end; i++) if (resetMaskSet(!0), buffer[i] !== opts.skipOptionalPartCharacter) {
                        var valResult = isValid(p, buffer[i], !0, !0);
                        !1 !== valResult && (resetMaskSet(!0), p = valResult.caret !== undefined ? valResult.caret : valResult.pos + 1);
                    }
                }
                function casing(elem, test, pos) {
                    switch (opts.casing || test.casing) {
                        case "upper":
                            elem = elem.toUpperCase();
                            break;

                        case "lower":
                            elem = elem.toLowerCase();
                            break;

                        case "title":
                            var posBefore = getMaskSet().validPositions[pos - 1];
                            elem = 0 === pos || posBefore && posBefore.input === String.fromCharCode(Inputmask.keyCode.SPACE) ? elem.toUpperCase() : elem.toLowerCase();
                            break;

                        default:
                            if ($.isFunction(opts.casing)) {
                                var args = Array.prototype.slice.call(arguments);
                                args.push(getMaskSet().validPositions), elem = opts.casing.apply(this, args);
                            }
                    }
                    return elem;
                }
                function checkAlternationMatch(altArr1, altArr2, na) {
                    for (var naNdx, altArrC = opts.greedy ? altArr2 : altArr2.slice(0, 1), isMatch = !1, naArr = na !== undefined ? na.split(",") : [], i = 0; i < naArr.length; i++) -1 !== (naNdx = altArr1.indexOf(naArr[i])) && altArr1.splice(naNdx, 1);
                    for (var alndx = 0; alndx < altArr1.length; alndx++) if (-1 !== $.inArray(altArr1[alndx], altArrC)) {
                        isMatch = !0;
                        break;
                    }
                    return isMatch;
                }
                function isValid(pos, c, strict, fromSetValid, fromAlternate, validateOnly) {
                    function isSelection(posObj) {
                        var selection = isRTL ? posObj.begin - posObj.end > 1 || posObj.begin - posObj.end == 1 : posObj.end - posObj.begin > 1 || posObj.end - posObj.begin == 1;
                        return selection && 0 === posObj.begin && posObj.end === getMaskSet().maskLength ? "full" : selection;
                    }
                    function _isValid(position, c, strict) {
                        var rslt = !1;
                        return $.each(getTests(position), function (ndx, tst) {
                            for (var test = tst.match, loopend = c ? 1 : 0, chrs = "", i = test.cardinality; i > loopend; i--) chrs += getBufferElement(position - (i - 1));
                            if (c && (chrs += c), getBuffer(!0), !1 !== (rslt = null != test.fn ? test.fn.test(chrs, getMaskSet(), position, strict, opts, isSelection(pos)) : (c === test.def || c === opts.skipOptionalPartCharacter) && "" !== test.def && {
                                c: getPlaceholder(position, test, !0) || test.def,
                                pos: position
                            })) {
                                var elem = rslt.c !== undefined ? rslt.c : c;
                                elem = elem === opts.skipOptionalPartCharacter && null === test.fn ? getPlaceholder(position, test, !0) || test.def : elem;
                                var validatedPos = position,
                                    possibleModifiedBuffer = getBuffer();
                                if (rslt.remove !== undefined && ($.isArray(rslt.remove) || (rslt.remove = [rslt.remove]), $.each(rslt.remove.sort(function (a, b) {
                                    return b - a;
                                }), function (ndx, lmnt) {
                                    stripValidPositions(lmnt, lmnt + 1, !0);
                                })), rslt.insert !== undefined && ($.isArray(rslt.insert) || (rslt.insert = [rslt.insert]), $.each(rslt.insert.sort(function (a, b) {
                                    return a - b;
                                }), function (ndx, lmnt) {
                                    isValid(lmnt.pos, lmnt.c, !0, fromSetValid);
                                })), rslt.refreshFromBuffer) {
                                    var refresh = rslt.refreshFromBuffer;
                                    if (refreshFromBuffer(!0 === refresh ? refresh : refresh.start, refresh.end, possibleModifiedBuffer), rslt.pos === undefined && rslt.c === undefined) return rslt.pos = getLastValidPosition(), !1;
                                    if ((validatedPos = rslt.pos !== undefined ? rslt.pos : position) !== position) return rslt = $.extend(rslt, isValid(validatedPos, elem, !0, fromSetValid)), !1;
                                } else if (!0 !== rslt && rslt.pos !== undefined && rslt.pos !== position && (validatedPos = rslt.pos, refreshFromBuffer(position, validatedPos, getBuffer().slice()), validatedPos !== position)) return rslt = $.extend(rslt, isValid(validatedPos, elem, !0)), !1;
                                return (!0 === rslt || rslt.pos !== undefined || rslt.c !== undefined) && (ndx > 0 && resetMaskSet(!0), setValidPosition(validatedPos, $.extend({}, tst, {
                                    input: casing(elem, test, validatedPos)
                                }), fromSetValid, isSelection(pos)) || (rslt = !1), !1);
                            }
                        }), rslt;
                    }
                    function setValidPosition(pos, validTest, fromSetValid, isSelection) {
                        if (isSelection || opts.insertMode && getMaskSet().validPositions[pos] !== undefined && fromSetValid === undefined) {
                            var i,
                                positionsClone = $.extend(!0, {}, getMaskSet().validPositions),
                                lvp = getLastValidPosition(undefined, !0);
                            for (i = pos; i <= lvp; i++) delete getMaskSet().validPositions[i];
                            getMaskSet().validPositions[pos] = $.extend(!0, {}, validTest);
                            var j,
                                valid = !0,
                                vps = getMaskSet().validPositions,
                                needsValidation = !1,
                                initialLength = getMaskSet().maskLength;
                            for (i = j = pos; i <= lvp; i++) {
                                var t = positionsClone[i];
                                if (t !== undefined) for (var posMatch = j; posMatch < getMaskSet().maskLength && (null === t.match.fn && vps[i] && (!0 === vps[i].match.optionalQuantifier || !0 === vps[i].match.optionality) || null != t.match.fn);) {
                                    if (posMatch++, !1 === needsValidation && positionsClone[posMatch] && positionsClone[posMatch].match.def === t.match.def) getMaskSet().validPositions[posMatch] = $.extend(!0, {}, positionsClone[posMatch]), getMaskSet().validPositions[posMatch].input = t.input, fillMissingNonMask(posMatch), j = posMatch, valid = !0;else if (positionCanMatchDefinition(posMatch, t.match.def)) {
                                        var result = isValid(posMatch, t.input, !0, !0);
                                        valid = !1 !== result, j = result.caret || result.insert ? getLastValidPosition() : posMatch, needsValidation = !0;
                                    } else if (!(valid = !0 === t.generatedInput) && posMatch >= getMaskSet().maskLength - 1) break;
                                    if (getMaskSet().maskLength < initialLength && (getMaskSet().maskLength = initialLength), valid) break;
                                }
                                if (!valid) break;
                            }
                            if (!valid) return getMaskSet().validPositions = $.extend(!0, {}, positionsClone), resetMaskSet(!0), !1;
                        } else getMaskSet().validPositions[pos] = $.extend(!0, {}, validTest);
                        return resetMaskSet(!0), !0;
                    }
                    function fillMissingNonMask(maskPos) {
                        for (var pndx = maskPos - 1; pndx > -1 && !getMaskSet().validPositions[pndx]; pndx--);
                        var testTemplate, testsFromPos;
                        for (pndx++; pndx < maskPos; pndx++) getMaskSet().validPositions[pndx] === undefined && (!1 === opts.jitMasking || opts.jitMasking > pndx) && (testsFromPos = getTests(pndx, getTestTemplate(pndx - 1).locator, pndx - 1).slice(), "" === testsFromPos[testsFromPos.length - 1].match.def && testsFromPos.pop(), (testTemplate = determineTestTemplate(testsFromPos)) && (testTemplate.match.def === opts.radixPointDefinitionSymbol || !isMask(pndx, !0) || $.inArray(opts.radixPoint, getBuffer()) < pndx && testTemplate.match.fn && testTemplate.match.fn.test(getPlaceholder(pndx), getMaskSet(), pndx, !1, opts)) && !1 !== (result = _isValid(pndx, getPlaceholder(pndx, testTemplate.match, !0) || (null == testTemplate.match.fn ? testTemplate.match.def : "" !== getPlaceholder(pndx) ? getPlaceholder(pndx) : getBuffer()[pndx]), !0)) && (getMaskSet().validPositions[result.pos || pndx].generatedInput = !0));
                    }
                    strict = !0 === strict;
                    var maskPos = pos;
                    pos.begin !== undefined && (maskPos = isRTL && !isSelection(pos) ? pos.end : pos.begin);
                    var result = !0,
                        positionsClone = $.extend(!0, {}, getMaskSet().validPositions);
                    if ($.isFunction(opts.preValidation) && !strict && !0 !== fromSetValid && !0 !== validateOnly && (result = opts.preValidation(getBuffer(), maskPos, c, isSelection(pos), opts)), !0 === result) {
                        if (fillMissingNonMask(maskPos), isSelection(pos) && (handleRemove(undefined, Inputmask.keyCode.DELETE, pos, !0, !0), maskPos = getMaskSet().p), maskPos < getMaskSet().maskLength && (maxLength === undefined || maskPos < maxLength) && (result = _isValid(maskPos, c, strict), (!strict || !0 === fromSetValid) && !1 === result && !0 !== validateOnly)) {
                            var currentPosValid = getMaskSet().validPositions[maskPos];
                            if (!currentPosValid || null !== currentPosValid.match.fn || currentPosValid.match.def !== c && c !== opts.skipOptionalPartCharacter) {
                                if ((opts.insertMode || getMaskSet().validPositions[seekNext(maskPos)] === undefined) && !isMask(maskPos, !0)) for (var nPos = maskPos + 1, snPos = seekNext(maskPos); nPos <= snPos; nPos++) if (!1 !== (result = _isValid(nPos, c, strict))) {
                                    !function (originalPos, newPos) {
                                        var vp = getMaskSet().validPositions[newPos];
                                        if (vp) for (var targetLocator = vp.locator, tll = targetLocator.length, ps = originalPos; ps < newPos; ps++) if (getMaskSet().validPositions[ps] === undefined && !isMask(ps, !0)) {
                                            var tests = getTests(ps).slice(),
                                                bestMatch = determineTestTemplate(tests, !0),
                                                equality = -1;
                                            "" === tests[tests.length - 1].match.def && tests.pop(), $.each(tests, function (ndx, tst) {
                                                for (var i = 0; i < tll; i++) {
                                                    if (tst.locator[i] === undefined || !checkAlternationMatch(tst.locator[i].toString().split(","), targetLocator[i].toString().split(","), tst.na)) {
                                                        var targetAI = targetLocator[i],
                                                            bestMatchAI = bestMatch.locator[i],
                                                            tstAI = tst.locator[i];
                                                        targetAI - bestMatchAI > Math.abs(targetAI - tstAI) && (bestMatch = tst);
                                                        break;
                                                    }
                                                    equality < i && (equality = i, bestMatch = tst);
                                                }
                                            }), bestMatch = $.extend({}, bestMatch, {
                                                input: getPlaceholder(ps, bestMatch.match, !0) || bestMatch.match.def
                                            }), bestMatch.generatedInput = !0, setValidPosition(ps, bestMatch, !0), getMaskSet().validPositions[newPos] = undefined, _isValid(newPos, vp.input, !0);
                                        }
                                    }(maskPos, result.pos !== undefined ? result.pos : nPos), maskPos = nPos;
                                    break;
                                }
                            } else result = {
                                caret: seekNext(maskPos)
                            };
                        }
                        !1 === result && opts.keepStatic && !strict && !0 !== fromAlternate && (result = function (pos, c, strict) {
                            var lastAlt,
                                alternation,
                                altPos,
                                prevAltPos,
                                i,
                                validPos,
                                altNdxs,
                                decisionPos,
                                validPsClone = $.extend(!0, {}, getMaskSet().validPositions),
                                isValidRslt = !1,
                                lAltPos = getLastValidPosition();
                            for (prevAltPos = getMaskSet().validPositions[lAltPos]; lAltPos >= 0; lAltPos--) if ((altPos = getMaskSet().validPositions[lAltPos]) && altPos.alternation !== undefined) {
                                if (lastAlt = lAltPos, alternation = getMaskSet().validPositions[lastAlt].alternation, prevAltPos.locator[altPos.alternation] !== altPos.locator[altPos.alternation]) break;
                                prevAltPos = altPos;
                            }
                            if (alternation !== undefined) {
                                decisionPos = parseInt(lastAlt);
                                var decisionTaker = prevAltPos.locator[prevAltPos.alternation || alternation] !== undefined ? prevAltPos.locator[prevAltPos.alternation || alternation] : altNdxs[0];
                                decisionTaker.length > 0 && (decisionTaker = decisionTaker.split(",")[0]);
                                var possibilityPos = getMaskSet().validPositions[decisionPos],
                                    prevPos = getMaskSet().validPositions[decisionPos - 1];
                                $.each(getTests(decisionPos, prevPos ? prevPos.locator : undefined, decisionPos - 1), function (ndx, test) {
                                    altNdxs = test.locator[alternation] ? test.locator[alternation].toString().split(",") : [];
                                    for (var mndx = 0; mndx < altNdxs.length; mndx++) {
                                        var validInputs = [],
                                            staticInputsBeforePos = 0,
                                            staticInputsBeforePosAlternate = 0,
                                            verifyValidInput = !1;
                                        if (decisionTaker < altNdxs[mndx] && (test.na === undefined || -1 === $.inArray(altNdxs[mndx], test.na.split(",")) || -1 === $.inArray(decisionTaker.toString(), altNdxs))) {
                                            getMaskSet().validPositions[decisionPos] = $.extend(!0, {}, test);
                                            var possibilities = getMaskSet().validPositions[decisionPos].locator;
                                            for (getMaskSet().validPositions[decisionPos].locator[alternation] = parseInt(altNdxs[mndx]), null == test.match.fn ? (possibilityPos.input !== test.match.def && (verifyValidInput = !0, !0 !== possibilityPos.generatedInput && validInputs.push(possibilityPos.input)), staticInputsBeforePosAlternate++, getMaskSet().validPositions[decisionPos].generatedInput = !/[0-9a-bA-Z]/.test(test.match.def), getMaskSet().validPositions[decisionPos].input = test.match.def) : getMaskSet().validPositions[decisionPos].input = possibilityPos.input, i = decisionPos + 1; i < getLastValidPosition(undefined, !0) + 1; i++) validPos = getMaskSet().validPositions[i], validPos && !0 !== validPos.generatedInput && /[0-9a-bA-Z]/.test(validPos.input) ? validInputs.push(validPos.input) : i < pos && staticInputsBeforePos++, delete getMaskSet().validPositions[i];
                                            for (verifyValidInput && validInputs[0] === test.match.def && validInputs.shift(), resetMaskSet(!0), isValidRslt = !0; validInputs.length > 0;) {
                                                var input = validInputs.shift();
                                                if (input !== opts.skipOptionalPartCharacter && !(isValidRslt = isValid(getLastValidPosition(undefined, !0) + 1, input, !1, fromSetValid, !0))) break;
                                            }
                                            if (isValidRslt) {
                                                getMaskSet().validPositions[decisionPos].locator = possibilities;
                                                var targetLvp = getLastValidPosition(pos) + 1;
                                                for (i = decisionPos + 1; i < getLastValidPosition() + 1; i++) ((validPos = getMaskSet().validPositions[i]) === undefined || null == validPos.match.fn) && i < pos + (staticInputsBeforePosAlternate - staticInputsBeforePos) && staticInputsBeforePosAlternate++;
                                                pos += staticInputsBeforePosAlternate - staticInputsBeforePos, isValidRslt = isValid(pos > targetLvp ? targetLvp : pos, c, strict, fromSetValid, !0);
                                            }
                                            if (isValidRslt) return !1;
                                            resetMaskSet(), getMaskSet().validPositions = $.extend(!0, {}, validPsClone);
                                        }
                                    }
                                });
                            }
                            return isValidRslt;
                        }(maskPos, c, strict)), !0 === result && (result = {
                            pos: maskPos
                        });
                    }
                    if ($.isFunction(opts.postValidation) && !1 !== result && !strict && !0 !== fromSetValid && !0 !== validateOnly) {
                        var postResult = opts.postValidation(getBuffer(!0), result, opts);
                        if (postResult.refreshFromBuffer && postResult.buffer) {
                            var refresh = postResult.refreshFromBuffer;
                            refreshFromBuffer(!0 === refresh ? refresh : refresh.start, refresh.end, postResult.buffer);
                        }
                        result = !0 === postResult ? result : postResult;
                    }
                    return result && result.pos === undefined && (result.pos = maskPos), !1 !== result && !0 !== validateOnly || (resetMaskSet(!0), getMaskSet().validPositions = $.extend(!0, {}, positionsClone)), result;
                }
                function isMask(pos, strict) {
                    var test = getTestTemplate(pos).match;
                    if ("" === test.def && (test = getTest(pos).match), null != test.fn) return test.fn;
                    if (!0 !== strict && pos > -1) {
                        var tests = getTests(pos);
                        return tests.length > 1 + ("" === tests[tests.length - 1].match.def ? 1 : 0);
                    }
                    return !1;
                }
                function seekNext(pos, newBlock) {
                    var maskL = getMaskSet().maskLength;
                    if (pos >= maskL) return maskL;
                    var position = pos;
                    for (getTests(maskL + 1).length > 1 && (getMaskTemplate(!0, maskL + 1, !0), maskL = getMaskSet().maskLength); ++position < maskL && (!0 === newBlock && (!0 !== getTest(position).match.newBlockMarker || !isMask(position)) || !0 !== newBlock && !isMask(position)););
                    return position;
                }
                function seekPrevious(pos, newBlock) {
                    var tests,
                        position = pos;
                    if (position <= 0) return 0;
                    for (; --position > 0 && (!0 === newBlock && !0 !== getTest(position).match.newBlockMarker || !0 !== newBlock && !isMask(position) && (tests = getTests(position), tests.length < 2 || 2 === tests.length && "" === tests[1].match.def)););
                    return position;
                }
                function getBufferElement(position) {
                    return getMaskSet().validPositions[position] === undefined ? getPlaceholder(position) : getMaskSet().validPositions[position].input;
                }
                function writeBuffer(input, buffer, caretPos, event, triggerInputEvent) {
                    if (event && $.isFunction(opts.onBeforeWrite)) {
                        var result = opts.onBeforeWrite.call(inputmask, event, buffer, caretPos, opts);
                        if (result) {
                            if (result.refreshFromBuffer) {
                                var refresh = result.refreshFromBuffer;
                                refreshFromBuffer(!0 === refresh ? refresh : refresh.start, refresh.end, result.buffer || buffer), buffer = getBuffer(!0);
                            }
                            caretPos !== undefined && (caretPos = result.caret !== undefined ? result.caret : caretPos);
                        }
                    }
                    input !== undefined && (input.inputmask._valueSet(buffer.join("")), caretPos === undefined || event !== undefined && "blur" === event.type ? renderColorMask(input, caretPos, 0 === buffer.length) : android && event && "input" === event.type ? setTimeout(function () {
                        caret(input, caretPos);
                    }, 0) : caret(input, caretPos), !0 === triggerInputEvent && (skipInputEvent = !0, $(input).trigger("input")));
                }
                function getPlaceholder(pos, test, returnPL) {
                    if (test = test || getTest(pos).match, test.placeholder !== undefined || !0 === returnPL) return $.isFunction(test.placeholder) ? test.placeholder(opts) : test.placeholder;
                    if (null === test.fn) {
                        if (pos > -1 && getMaskSet().validPositions[pos] === undefined) {
                            var prevTest,
                                tests = getTests(pos),
                                staticAlternations = [];
                            if (tests.length > 1 + ("" === tests[tests.length - 1].match.def ? 1 : 0)) for (var i = 0; i < tests.length; i++) if (!0 !== tests[i].match.optionality && !0 !== tests[i].match.optionalQuantifier && (null === tests[i].match.fn || prevTest === undefined || !1 !== tests[i].match.fn.test(prevTest.match.def, getMaskSet(), pos, !0, opts)) && (staticAlternations.push(tests[i]), null === tests[i].match.fn && (prevTest = tests[i]), staticAlternations.length > 1 && /[0-9a-bA-Z]/.test(staticAlternations[0].match.def))) return opts.placeholder.charAt(pos % opts.placeholder.length);
                        }
                        return test.def;
                    }
                    return opts.placeholder.charAt(pos % opts.placeholder.length);
                }
                function checkVal(input, writeOut, strict, nptvl, initiatingEvent) {
                    function isTemplateMatch(ndx, charCodes) {
                        return -1 !== getBufferTemplate().slice(ndx, seekNext(ndx)).join("").indexOf(charCodes) && !isMask(ndx) && getTest(ndx).match.nativeDef === charCodes.charAt(charCodes.length - 1);
                    }
                    var inputValue = nptvl.slice(),
                        charCodes = "",
                        initialNdx = -1,
                        result = undefined;
                    if (resetMaskSet(), strict || !0 === opts.autoUnmask) initialNdx = seekNext(initialNdx);else {
                        var staticInput = getBufferTemplate().slice(0, seekNext(-1)).join(""),
                            matches = inputValue.join("").match(new RegExp("^" + Inputmask.escapeRegex(staticInput), "g"));
                        matches && matches.length > 0 && (inputValue.splice(0, matches.length * staticInput.length), initialNdx = seekNext(initialNdx));
                    }
                    if (-1 === initialNdx ? (getMaskSet().p = seekNext(initialNdx), initialNdx = 0) : getMaskSet().p = initialNdx, $.each(inputValue, function (ndx, charCode) {
                        if (charCode !== undefined) if (getMaskSet().validPositions[ndx] === undefined && inputValue[ndx] === getPlaceholder(ndx) && isMask(ndx, !0) && !1 === isValid(ndx, inputValue[ndx], !0, undefined, undefined, !0)) getMaskSet().p++;else {
                            var keypress = new $.Event("_checkval");
                            keypress.which = charCode.charCodeAt(0), charCodes += charCode;
                            var lvp = getLastValidPosition(undefined, !0),
                                lvTest = getMaskSet().validPositions[lvp],
                                nextTest = getTestTemplate(lvp + 1, lvTest ? lvTest.locator.slice() : undefined, lvp);
                            if (!isTemplateMatch(initialNdx, charCodes) || strict || opts.autoUnmask) {
                                var pos = strict ? ndx : null == nextTest.match.fn && nextTest.match.optionality && lvp + 1 < getMaskSet().p ? lvp + 1 : getMaskSet().p;
                                result = EventHandlers.keypressEvent.call(input, keypress, !0, !1, strict, pos), initialNdx = pos + 1, charCodes = "";
                            } else result = EventHandlers.keypressEvent.call(input, keypress, !0, !1, !0, lvp + 1);
                            if (!1 !== result && !strict && $.isFunction(opts.onBeforeWrite)) {
                                var origResult = result;
                                if (result = opts.onBeforeWrite.call(inputmask, keypress, getBuffer(), result.forwardPosition, opts), (result = $.extend(origResult, result)) && result.refreshFromBuffer) {
                                    var refresh = result.refreshFromBuffer;
                                    refreshFromBuffer(!0 === refresh ? refresh : refresh.start, refresh.end, result.buffer), resetMaskSet(!0), result.caret && (getMaskSet().p = result.caret, result.forwardPosition = result.caret);
                                }
                            }
                        }
                    }), writeOut) {
                        var caretPos = undefined;
                        document.activeElement === input && result && (caretPos = opts.numericInput ? seekPrevious(result.forwardPosition) : result.forwardPosition), writeBuffer(input, getBuffer(), caretPos, initiatingEvent || new $.Event("checkval"), initiatingEvent && "input" === initiatingEvent.type);
                    }
                }
                function unmaskedvalue(input) {
                    if (input) {
                        if (input.inputmask === undefined) return input.value;
                        input.inputmask && input.inputmask.refreshValue && EventHandlers.setValueEvent.call(input);
                    }
                    var umValue = [],
                        vps = getMaskSet().validPositions;
                    for (var pndx in vps) vps[pndx].match && null != vps[pndx].match.fn && umValue.push(vps[pndx].input);
                    var unmaskedValue = 0 === umValue.length ? "" : (isRTL ? umValue.reverse() : umValue).join("");
                    if ($.isFunction(opts.onUnMask)) {
                        var bufferValue = (isRTL ? getBuffer().slice().reverse() : getBuffer()).join("");
                        unmaskedValue = opts.onUnMask.call(inputmask, bufferValue, unmaskedValue, opts);
                    }
                    return unmaskedValue;
                }
                function caret(input, begin, end, notranslate) {
                    function translatePosition(pos) {
                        if (!0 !== notranslate && isRTL && "number" == typeof pos && (!opts.greedy || "" !== opts.placeholder)) {
                            pos = getBuffer().join("").length - pos;
                        }
                        return pos;
                    }
                    var range;
                    if (begin === undefined) return input.setSelectionRange ? (begin = input.selectionStart, end = input.selectionEnd) : window.getSelection ? (range = window.getSelection().getRangeAt(0), range.commonAncestorContainer.parentNode !== input && range.commonAncestorContainer !== input || (begin = range.startOffset, end = range.endOffset)) : document.selection && document.selection.createRange && (range = document.selection.createRange(), begin = 0 - range.duplicate().moveStart("character", -input.inputmask._valueGet().length), end = begin + range.text.length), {
                        begin: translatePosition(begin),
                        end: translatePosition(end)
                    };
                    if (begin.begin !== undefined && (end = begin.end, begin = begin.begin), "number" == typeof begin) {
                        begin = translatePosition(begin), end = translatePosition(end), end = "number" == typeof end ? end : begin;
                        var scrollCalc = parseInt(((input.ownerDocument.defaultView || window).getComputedStyle ? (input.ownerDocument.defaultView || window).getComputedStyle(input, null) : input.currentStyle).fontSize) * end;
                        if (input.scrollLeft = scrollCalc > input.scrollWidth ? scrollCalc : 0, mobile || !1 !== opts.insertMode || begin !== end || end++, input.setSelectionRange) input.selectionStart = begin, input.selectionEnd = end;else if (window.getSelection) {
                            if (range = document.createRange(), input.firstChild === undefined || null === input.firstChild) {
                                var textNode = document.createTextNode("");
                                input.appendChild(textNode);
                            }
                            range.setStart(input.firstChild, begin < input.inputmask._valueGet().length ? begin : input.inputmask._valueGet().length), range.setEnd(input.firstChild, end < input.inputmask._valueGet().length ? end : input.inputmask._valueGet().length), range.collapse(!0);
                            var sel = window.getSelection();
                            sel.removeAllRanges(), sel.addRange(range);
                        } else input.createTextRange && (range = input.createTextRange(), range.collapse(!0), range.moveEnd("character", end), range.moveStart("character", begin), range.select());
                        renderColorMask(input, {
                            begin: begin,
                            end: end
                        });
                    }
                }
                function determineLastRequiredPosition(returnDefinition) {
                    var pos,
                        testPos,
                        buffer = getBuffer(),
                        bl = buffer.length,
                        lvp = getLastValidPosition(),
                        positions = {},
                        lvTest = getMaskSet().validPositions[lvp],
                        ndxIntlzr = lvTest !== undefined ? lvTest.locator.slice() : undefined;
                    for (pos = lvp + 1; pos < buffer.length; pos++) testPos = getTestTemplate(pos, ndxIntlzr, pos - 1), ndxIntlzr = testPos.locator.slice(), positions[pos] = $.extend(!0, {}, testPos);
                    var lvTestAlt = lvTest && lvTest.alternation !== undefined ? lvTest.locator[lvTest.alternation] : undefined;
                    for (pos = bl - 1; pos > lvp && (testPos = positions[pos], (testPos.match.optionality || testPos.match.optionalQuantifier && testPos.match.newBlockMarker || lvTestAlt && (lvTestAlt !== positions[pos].locator[lvTest.alternation] && null != testPos.match.fn || null === testPos.match.fn && testPos.locator[lvTest.alternation] && checkAlternationMatch(testPos.locator[lvTest.alternation].toString().split(","), lvTestAlt.toString().split(",")) && "" !== getTests(pos)[0].def)) && buffer[pos] === getPlaceholder(pos, testPos.match)); pos--) bl--;
                    return returnDefinition ? {
                        l: bl,
                        def: positions[bl] ? positions[bl].match : undefined
                    } : bl;
                }
                function clearOptionalTail(buffer) {
                    for (var validPos, rl = determineLastRequiredPosition(), bl = buffer.length, lv = getMaskSet().validPositions[getLastValidPosition()]; rl < bl && !isMask(rl, !0) && (validPos = lv !== undefined ? getTestTemplate(rl, lv.locator.slice(""), lv) : getTest(rl)) && !0 !== validPos.match.optionality && (!0 !== validPos.match.optionalQuantifier && !0 !== validPos.match.newBlockMarker || rl + 1 === bl && "" === (lv !== undefined ? getTestTemplate(rl + 1, lv.locator.slice(""), lv) : getTest(rl + 1)).match.def);) rl++;
                    for (; (validPos = getMaskSet().validPositions[rl - 1]) && validPos && validPos.match.optionality && validPos.input === opts.skipOptionalPartCharacter;) rl--;
                    return buffer.splice(rl), buffer;
                }
                function isComplete(buffer) {
                    if ($.isFunction(opts.isComplete)) return opts.isComplete(buffer, opts);
                    if ("*" === opts.repeat) return undefined;
                    var complete = !1,
                        lrp = determineLastRequiredPosition(!0),
                        aml = seekPrevious(lrp.l);
                    if (lrp.def === undefined || lrp.def.newBlockMarker || lrp.def.optionality || lrp.def.optionalQuantifier) {
                        complete = !0;
                        for (var i = 0; i <= aml; i++) {
                            var test = getTestTemplate(i).match;
                            if (null !== test.fn && getMaskSet().validPositions[i] === undefined && !0 !== test.optionality && !0 !== test.optionalQuantifier || null === test.fn && buffer[i] !== getPlaceholder(i, test)) {
                                complete = !1;
                                break;
                            }
                        }
                    }
                    return complete;
                }
                function handleRemove(input, k, pos, strict, fromIsValid) {
                    if ((opts.numericInput || isRTL) && (k === Inputmask.keyCode.BACKSPACE ? k = Inputmask.keyCode.DELETE : k === Inputmask.keyCode.DELETE && (k = Inputmask.keyCode.BACKSPACE), isRTL)) {
                        var pend = pos.end;
                        pos.end = pos.begin, pos.begin = pend;
                    }
                    k === Inputmask.keyCode.BACKSPACE && (pos.end - pos.begin < 1 || !1 === opts.insertMode) ? (pos.begin = seekPrevious(pos.begin), getMaskSet().validPositions[pos.begin] !== undefined && getMaskSet().validPositions[pos.begin].input === opts.groupSeparator && pos.begin--) : k === Inputmask.keyCode.DELETE && pos.begin === pos.end && (pos.end = isMask(pos.end, !0) && getMaskSet().validPositions[pos.end] && getMaskSet().validPositions[pos.end].input !== opts.radixPoint ? pos.end + 1 : seekNext(pos.end) + 1, getMaskSet().validPositions[pos.begin] !== undefined && getMaskSet().validPositions[pos.begin].input === opts.groupSeparator && pos.end++), stripValidPositions(pos.begin, pos.end, !1, strict), !0 !== strict && function () {
                        if (opts.keepStatic) {
                            for (var validInputs = [], lastAlt = getLastValidPosition(-1, !0), positionsClone = $.extend(!0, {}, getMaskSet().validPositions), prevAltPos = getMaskSet().validPositions[lastAlt]; lastAlt >= 0; lastAlt--) {
                                var altPos = getMaskSet().validPositions[lastAlt];
                                if (altPos) {
                                    if (!0 !== altPos.generatedInput && /[0-9a-bA-Z]/.test(altPos.input) && validInputs.push(altPos.input), delete getMaskSet().validPositions[lastAlt], altPos.alternation !== undefined && altPos.locator[altPos.alternation] !== prevAltPos.locator[altPos.alternation]) break;
                                    prevAltPos = altPos;
                                }
                            }
                            if (lastAlt > -1) for (getMaskSet().p = seekNext(getLastValidPosition(-1, !0)); validInputs.length > 0;) {
                                var keypress = new $.Event("keypress");
                                keypress.which = validInputs.pop().charCodeAt(0), EventHandlers.keypressEvent.call(input, keypress, !0, !1, !1, getMaskSet().p);
                            } else getMaskSet().validPositions = $.extend(!0, {}, positionsClone);
                        }
                    }();
                    var lvp = getLastValidPosition(pos.begin, !0);
                    if (lvp < pos.begin) getMaskSet().p = seekNext(lvp);else if (!0 !== strict && (getMaskSet().p = pos.begin, !0 !== fromIsValid)) for (; getMaskSet().p < lvp && getMaskSet().validPositions[getMaskSet().p] === undefined;) getMaskSet().p++;
                }
                function initializeColorMask(input) {
                    function findCaretPos(clientx) {
                        var caretPos,
                            e = document.createElement("span");
                        for (var style in computedStyle) isNaN(style) && -1 !== style.indexOf("font") && (e.style[style] = computedStyle[style]);
                        e.style.textTransform = computedStyle.textTransform, e.style.letterSpacing = computedStyle.letterSpacing, e.style.position = "absolute", e.style.height = "auto", e.style.width = "auto", e.style.visibility = "hidden", e.style.whiteSpace = "nowrap", document.body.appendChild(e);
                        var itl,
                            inputText = input.inputmask._valueGet(),
                            previousWidth = 0;
                        for (caretPos = 0, itl = inputText.length; caretPos <= itl; caretPos++) {
                            if (e.innerHTML += inputText.charAt(caretPos) || "_", e.offsetWidth >= clientx) {
                                var offset1 = clientx - previousWidth,
                                    offset2 = e.offsetWidth - clientx;
                                e.innerHTML = inputText.charAt(caretPos), offset1 -= e.offsetWidth / 3, caretPos = offset1 < offset2 ? caretPos - 1 : caretPos;
                                break;
                            }
                            previousWidth = e.offsetWidth;
                        }
                        return document.body.removeChild(e), caretPos;
                    }
                    var computedStyle = (input.ownerDocument.defaultView || window).getComputedStyle(input, null),
                        template = document.createElement("div");
                    template.style.width = computedStyle.width, template.style.textAlign = computedStyle.textAlign, colorMask = document.createElement("div"), colorMask.className = "im-colormask", input.parentNode.insertBefore(colorMask, input), input.parentNode.removeChild(input), colorMask.appendChild(template), colorMask.appendChild(input), input.style.left = template.offsetLeft + "px", $(input).on("click", function (e) {
                        return caret(input, findCaretPos(e.clientX)), EventHandlers.clickEvent.call(input, [e]);
                    }), $(input).on("keydown", function (e) {
                        e.shiftKey || !1 === opts.insertMode || setTimeout(function () {
                            renderColorMask(input);
                        }, 0);
                    });
                }
                function renderColorMask(input, caretPos, clear) {
                    function handleStatic() {
                        isStatic || null !== test.fn && testPos.input !== undefined ? isStatic && (null !== test.fn && testPos.input !== undefined || "" === test.def) && (isStatic = !1, maskTemplate += "</span>") : (isStatic = !0, maskTemplate += "<span class='im-static'>");
                    }
                    function handleCaret(force) {
                        !0 !== force && pos !== caretPos.begin || document.activeElement !== input || (maskTemplate += "<span class='im-caret' style='border-right-width: 1px;border-right-style: solid;'></span>");
                    }
                    var test,
                        testPos,
                        ndxIntlzr,
                        maskTemplate = "",
                        isStatic = !1,
                        pos = 0;
                    if (colorMask !== undefined) {
                        var buffer = getBuffer();
                        if (caretPos === undefined ? caretPos = caret(input) : caretPos.begin === undefined && (caretPos = {
                            begin: caretPos,
                            end: caretPos
                        }), !0 !== clear) {
                            var lvp = getLastValidPosition();
                            do {
                                handleCaret(), getMaskSet().validPositions[pos] ? (testPos = getMaskSet().validPositions[pos], test = testPos.match, ndxIntlzr = testPos.locator.slice(), handleStatic(), maskTemplate += buffer[pos]) : (testPos = getTestTemplate(pos, ndxIntlzr, pos - 1), test = testPos.match, ndxIntlzr = testPos.locator.slice(), (!1 === opts.jitMasking || pos < lvp || "number" == typeof opts.jitMasking && isFinite(opts.jitMasking) && opts.jitMasking > pos) && (handleStatic(), maskTemplate += getPlaceholder(pos, test))), pos++;
                            } while ((maxLength === undefined || pos < maxLength) && (null !== test.fn || "" !== test.def) || lvp > pos || isStatic);
                            -1 === maskTemplate.indexOf("im-caret") && handleCaret(!0), isStatic && handleStatic();
                        }
                        var template = colorMask.getElementsByTagName("div")[0];
                        template.innerHTML = maskTemplate, input.inputmask.positionColorMask(input, template);
                    }
                }
                maskset = maskset || this.maskset, opts = opts || this.opts;
                var undoValue,
                    $el,
                    maxLength,
                    colorMask,
                    inputmask = this,
                    el = this.el,
                    isRTL = this.isRTL,
                    skipKeyPressEvent = !1,
                    skipInputEvent = !1,
                    ignorable = !1,
                    mouseEnter = !1,
                    EventRuler = {
                    on: function (input, eventName, eventHandler) {
                        var ev = function (e) {
                            if (this.inputmask === undefined && "FORM" !== this.nodeName) {
                                var imOpts = $.data(this, "_inputmask_opts");
                                imOpts ? new Inputmask(imOpts).mask(this) : EventRuler.off(this);
                            } else {
                                if ("setvalue" === e.type || "FORM" === this.nodeName || !(this.disabled || this.readOnly && !("keydown" === e.type && e.ctrlKey && 67 === e.keyCode || !1 === opts.tabThrough && e.keyCode === Inputmask.keyCode.TAB))) {
                                    switch (e.type) {
                                        case "input":
                                            if (!0 === skipInputEvent) return skipInputEvent = !1, e.preventDefault();
                                            break;

                                        case "keydown":
                                            skipKeyPressEvent = !1, skipInputEvent = !1;
                                            break;

                                        case "keypress":
                                            if (!0 === skipKeyPressEvent) return e.preventDefault();
                                            skipKeyPressEvent = !0;
                                            break;

                                        case "click":
                                            if (iemobile || iphone) {
                                                var that = this,
                                                    args = arguments;
                                                return setTimeout(function () {
                                                    eventHandler.apply(that, args);
                                                }, 0), !1;
                                            }
                                    }
                                    var returnVal = eventHandler.apply(this, arguments);
                                    return !1 === returnVal && (e.preventDefault(), e.stopPropagation()), returnVal;
                                }
                                e.preventDefault();
                            }
                        };
                        input.inputmask.events[eventName] = input.inputmask.events[eventName] || [], input.inputmask.events[eventName].push(ev), -1 !== $.inArray(eventName, ["submit", "reset"]) ? null !== input.form && $(input.form).on(eventName, ev) : $(input).on(eventName, ev);
                    },
                    off: function (input, event) {
                        if (input.inputmask && input.inputmask.events) {
                            var events;
                            event ? (events = [], events[event] = input.inputmask.events[event]) : events = input.inputmask.events, $.each(events, function (eventName, evArr) {
                                for (; evArr.length > 0;) {
                                    var ev = evArr.pop();
                                    -1 !== $.inArray(eventName, ["submit", "reset"]) ? null !== input.form && $(input.form).off(eventName, ev) : $(input).off(eventName, ev);
                                }
                                delete input.inputmask.events[eventName];
                            });
                        }
                    }
                },
                    EventHandlers = {
                    keydownEvent: function (e) {
                        var input = this,
                            $input = $(input),
                            k = e.keyCode,
                            pos = caret(input);
                        if (k === Inputmask.keyCode.BACKSPACE || k === Inputmask.keyCode.DELETE || iphone && k === Inputmask.keyCode.BACKSPACE_SAFARI || e.ctrlKey && k === Inputmask.keyCode.X && !function (eventName) {
                            var el = document.createElement("input"),
                                evName = "on" + eventName,
                                isSupported = evName in el;
                            return isSupported || (el.setAttribute(evName, "return;"), isSupported = "function" == typeof el[evName]), el = null, isSupported;
                        }("cut")) e.preventDefault(), handleRemove(input, k, pos), writeBuffer(input, getBuffer(!0), getMaskSet().p, e, input.inputmask._valueGet() !== getBuffer().join("")), input.inputmask._valueGet() === getBufferTemplate().join("") ? $input.trigger("cleared") : !0 === isComplete(getBuffer()) && $input.trigger("complete");else if (k === Inputmask.keyCode.END || k === Inputmask.keyCode.PAGE_DOWN) {
                            e.preventDefault();
                            var caretPos = seekNext(getLastValidPosition());
                            opts.insertMode || caretPos !== getMaskSet().maskLength || e.shiftKey || caretPos--, caret(input, e.shiftKey ? pos.begin : caretPos, caretPos, !0);
                        } else k === Inputmask.keyCode.HOME && !e.shiftKey || k === Inputmask.keyCode.PAGE_UP ? (e.preventDefault(), caret(input, 0, e.shiftKey ? pos.begin : 0, !0)) : (opts.undoOnEscape && k === Inputmask.keyCode.ESCAPE || 90 === k && e.ctrlKey) && !0 !== e.altKey ? (checkVal(input, !0, !1, undoValue.split("")), $input.trigger("click")) : k !== Inputmask.keyCode.INSERT || e.shiftKey || e.ctrlKey ? !0 === opts.tabThrough && k === Inputmask.keyCode.TAB ? (!0 === e.shiftKey ? (null === getTest(pos.begin).match.fn && (pos.begin = seekNext(pos.begin)), pos.end = seekPrevious(pos.begin, !0), pos.begin = seekPrevious(pos.end, !0)) : (pos.begin = seekNext(pos.begin, !0), pos.end = seekNext(pos.begin, !0), pos.end < getMaskSet().maskLength && pos.end--), pos.begin < getMaskSet().maskLength && (e.preventDefault(), caret(input, pos.begin, pos.end))) : e.shiftKey || !1 === opts.insertMode && (k === Inputmask.keyCode.RIGHT ? setTimeout(function () {
                            var caretPos = caret(input);
                            caret(input, caretPos.begin);
                        }, 0) : k === Inputmask.keyCode.LEFT && setTimeout(function () {
                            var caretPos = caret(input);
                            caret(input, isRTL ? caretPos.begin + 1 : caretPos.begin - 1);
                        }, 0)) : (opts.insertMode = !opts.insertMode, caret(input, opts.insertMode || pos.begin !== getMaskSet().maskLength ? pos.begin : pos.begin - 1));
                        opts.onKeyDown.call(this, e, getBuffer(), caret(input).begin, opts), ignorable = -1 !== $.inArray(k, opts.ignorables);
                    },
                    keypressEvent: function (e, checkval, writeOut, strict, ndx) {
                        var input = this,
                            $input = $(input),
                            k = e.which || e.charCode || e.keyCode;
                        if (!(!0 === checkval || e.ctrlKey && e.altKey) && (e.ctrlKey || e.metaKey || ignorable)) return k === Inputmask.keyCode.ENTER && undoValue !== getBuffer().join("") && (undoValue = getBuffer().join(""), setTimeout(function () {
                            $input.trigger("change");
                        }, 0)), !0;
                        if (k) {
                            46 === k && !1 === e.shiftKey && "" !== opts.radixPoint && (k = opts.radixPoint.charCodeAt(0));
                            var forwardPosition,
                                pos = checkval ? {
                                begin: ndx,
                                end: ndx
                            } : caret(input),
                                c = String.fromCharCode(k);
                            getMaskSet().writeOutBuffer = !0;
                            var valResult = isValid(pos, c, strict);
                            if (!1 !== valResult && (resetMaskSet(!0), forwardPosition = valResult.caret !== undefined ? valResult.caret : checkval ? valResult.pos + 1 : seekNext(valResult.pos), getMaskSet().p = forwardPosition), !1 !== writeOut && (setTimeout(function () {
                                opts.onKeyValidation.call(input, k, valResult, opts);
                            }, 0), getMaskSet().writeOutBuffer && !1 !== valResult)) {
                                var buffer = getBuffer();
                                writeBuffer(input, buffer, opts.numericInput && valResult.caret === undefined ? seekPrevious(forwardPosition) : forwardPosition, e, !0 !== checkval), !0 !== checkval && setTimeout(function () {
                                    !0 === isComplete(buffer) && $input.trigger("complete");
                                }, 0);
                            }
                            if (e.preventDefault(), checkval) return !1 !== valResult && (valResult.forwardPosition = forwardPosition), valResult;
                        }
                    },
                    pasteEvent: function (e) {
                        var tempValue,
                            input = this,
                            ev = e.originalEvent || e,
                            $input = $(input),
                            inputValue = input.inputmask._valueGet(!0),
                            caretPos = caret(input);
                        isRTL && (tempValue = caretPos.end, caretPos.end = caretPos.begin, caretPos.begin = tempValue);
                        var valueBeforeCaret = inputValue.substr(0, caretPos.begin),
                            valueAfterCaret = inputValue.substr(caretPos.end, inputValue.length);
                        if (valueBeforeCaret === (isRTL ? getBufferTemplate().reverse() : getBufferTemplate()).slice(0, caretPos.begin).join("") && (valueBeforeCaret = ""), valueAfterCaret === (isRTL ? getBufferTemplate().reverse() : getBufferTemplate()).slice(caretPos.end).join("") && (valueAfterCaret = ""), isRTL && (tempValue = valueBeforeCaret, valueBeforeCaret = valueAfterCaret, valueAfterCaret = tempValue), window.clipboardData && window.clipboardData.getData) inputValue = valueBeforeCaret + window.clipboardData.getData("Text") + valueAfterCaret;else {
                            if (!ev.clipboardData || !ev.clipboardData.getData) return !0;
                            inputValue = valueBeforeCaret + ev.clipboardData.getData("text/plain") + valueAfterCaret;
                        }
                        var pasteValue = inputValue;
                        if ($.isFunction(opts.onBeforePaste)) {
                            if (!1 === (pasteValue = opts.onBeforePaste.call(inputmask, inputValue, opts))) return e.preventDefault();
                            pasteValue || (pasteValue = inputValue);
                        }
                        return checkVal(input, !1, !1, isRTL ? pasteValue.split("").reverse() : pasteValue.toString().split("")), writeBuffer(input, getBuffer(), seekNext(getLastValidPosition()), e, undoValue !== getBuffer().join("")), !0 === isComplete(getBuffer()) && $input.trigger("complete"), e.preventDefault();
                    },
                    inputFallBackEvent: function (e) {
                        var input = this,
                            inputValue = input.inputmask._valueGet();
                        if (getBuffer().join("") !== inputValue) {
                            var caretPos = caret(input);
                            if (!1 === function (input, inputValue, caretPos) {
                                if ("." === inputValue.charAt(caretPos.begin - 1) && "" !== opts.radixPoint && (inputValue = inputValue.split(""), inputValue[caretPos.begin - 1] = opts.radixPoint.charAt(0), inputValue = inputValue.join("")), inputValue.charAt(caretPos.begin - 1) === opts.radixPoint && inputValue.length > getBuffer().length) {
                                    var keypress = new $.Event("keypress");
                                    return keypress.which = opts.radixPoint.charCodeAt(0), EventHandlers.keypressEvent.call(input, keypress, !0, !0, !1, caretPos.begin - 1), !1;
                                }
                            }(input, inputValue, caretPos)) return !1;
                            if (inputValue = inputValue.replace(new RegExp("(" + Inputmask.escapeRegex(getBufferTemplate().join("")) + ")*"), ""), !1 === function (input, inputValue, caretPos) {
                                if (iemobile) {
                                    var inputChar = inputValue.replace(getBuffer().join(""), "");
                                    if (1 === inputChar.length) {
                                        var keypress = new $.Event("keypress");
                                        return keypress.which = inputChar.charCodeAt(0), EventHandlers.keypressEvent.call(input, keypress, !0, !0, !1, getMaskSet().validPositions[caretPos.begin - 1] ? caretPos.begin : caretPos.begin - 1), !1;
                                    }
                                }
                            }(input, inputValue, caretPos)) return !1;
                            caretPos.begin > inputValue.length && (caret(input, inputValue.length), caretPos = caret(input));
                            var buffer = getBuffer().join(""),
                                frontPart = inputValue.substr(0, caretPos.begin),
                                backPart = inputValue.substr(caretPos.begin),
                                frontBufferPart = buffer.substr(0, caretPos.begin),
                                backBufferPart = buffer.substr(caretPos.begin),
                                selection = caretPos,
                                entries = "",
                                isEntry = !1;
                            if (frontPart !== frontBufferPart) {
                                selection.begin = 0;
                                for (var fpl = (isEntry = frontPart.length >= frontBufferPart.length) ? frontPart.length : frontBufferPart.length, i = 0; frontPart.charAt(i) === frontBufferPart.charAt(i) && i < fpl; i++) selection.begin++;
                                isEntry && (entries += frontPart.slice(selection.begin, selection.end));
                            }
                            backPart !== backBufferPart && (backPart.length > backBufferPart.length ? isEntry && (selection.end = selection.begin) : backPart.length < backBufferPart.length ? selection.end += backBufferPart.length - backPart.length : backPart.charAt(0) !== backBufferPart.charAt(0) && selection.end++), writeBuffer(input, getBuffer(), selection), entries.length > 0 ? $.each(entries.split(""), function (ndx, entry) {
                                var keypress = new $.Event("keypress");
                                keypress.which = entry.charCodeAt(0), ignorable = !1, EventHandlers.keypressEvent.call(input, keypress);
                            }) : (selection.begin === selection.end - 1 && caret(input, seekPrevious(selection.begin + 1), selection.end), e.keyCode = Inputmask.keyCode.DELETE, EventHandlers.keydownEvent.call(input, e)), e.preventDefault();
                        }
                    },
                    setValueEvent: function (e) {
                        this.inputmask.refreshValue = !1;
                        var input = this,
                            value = input.inputmask._valueGet(!0);
                        $.isFunction(opts.onBeforeMask) && (value = opts.onBeforeMask.call(inputmask, value, opts) || value), value = value.split(""), checkVal(input, !0, !1, isRTL ? value.reverse() : value), undoValue = getBuffer().join(""), (opts.clearMaskOnLostFocus || opts.clearIncomplete) && input.inputmask._valueGet() === getBufferTemplate().join("") && input.inputmask._valueSet("");
                    },
                    focusEvent: function (e) {
                        var input = this,
                            nptValue = input.inputmask._valueGet();
                        opts.showMaskOnFocus && (!opts.showMaskOnHover || opts.showMaskOnHover && "" === nptValue) && (input.inputmask._valueGet() !== getBuffer().join("") ? writeBuffer(input, getBuffer(), seekNext(getLastValidPosition())) : !1 === mouseEnter && caret(input, seekNext(getLastValidPosition()))), !0 === opts.positionCaretOnTab && !1 === mouseEnter && "" !== nptValue && (writeBuffer(input, getBuffer(), caret(input)), EventHandlers.clickEvent.apply(input, [e, !0])), undoValue = getBuffer().join("");
                    },
                    mouseleaveEvent: function (e) {
                        var input = this;
                        if (mouseEnter = !1, opts.clearMaskOnLostFocus && document.activeElement !== input) {
                            var buffer = getBuffer().slice(),
                                nptValue = input.inputmask._valueGet();
                            nptValue !== input.getAttribute("placeholder") && "" !== nptValue && (-1 === getLastValidPosition() && nptValue === getBufferTemplate().join("") ? buffer = [] : clearOptionalTail(buffer), writeBuffer(input, buffer));
                        }
                    },
                    clickEvent: function (e, tabbed) {
                        function doRadixFocus(clickPos) {
                            if ("" !== opts.radixPoint) {
                                var vps = getMaskSet().validPositions;
                                if (vps[clickPos] === undefined || vps[clickPos].input === getPlaceholder(clickPos)) {
                                    if (clickPos < seekNext(-1)) return !0;
                                    var radixPos = $.inArray(opts.radixPoint, getBuffer());
                                    if (-1 !== radixPos) {
                                        for (var vp in vps) if (radixPos < vp && vps[vp].input !== getPlaceholder(vp)) return !1;
                                        return !0;
                                    }
                                }
                            }
                            return !1;
                        }
                        var input = this;
                        setTimeout(function () {
                            if (document.activeElement === input) {
                                var selectedCaret = caret(input);
                                if (tabbed && (isRTL ? selectedCaret.end = selectedCaret.begin : selectedCaret.begin = selectedCaret.end), selectedCaret.begin === selectedCaret.end) switch (opts.positionCaretOnClick) {
                                    case "none":
                                        break;

                                    case "radixFocus":
                                        if (doRadixFocus(selectedCaret.begin)) {
                                            var radixPos = getBuffer().join("").indexOf(opts.radixPoint);
                                            caret(input, opts.numericInput ? seekNext(radixPos) : radixPos);
                                            break;
                                        }

                                    default:
                                        var clickPosition = selectedCaret.begin,
                                            lvclickPosition = getLastValidPosition(clickPosition, !0),
                                            lastPosition = seekNext(lvclickPosition);
                                        if (clickPosition < lastPosition) caret(input, isMask(clickPosition, !0) || isMask(clickPosition - 1, !0) ? clickPosition : seekNext(clickPosition));else {
                                            var lvp = getMaskSet().validPositions[lvclickPosition],
                                                tt = getTestTemplate(lastPosition, lvp ? lvp.match.locator : undefined, lvp),
                                                placeholder = getPlaceholder(lastPosition, tt.match);
                                            if ("" !== placeholder && getBuffer()[lastPosition] !== placeholder && !0 !== tt.match.optionalQuantifier && !0 !== tt.match.newBlockMarker || !isMask(lastPosition, !0) && tt.match.def === placeholder) {
                                                var newPos = seekNext(lastPosition);
                                                (clickPosition >= newPos || clickPosition === lastPosition) && (lastPosition = newPos);
                                            }
                                            caret(input, lastPosition);
                                        }
                                }
                            }
                        }, 0);
                    },
                    dblclickEvent: function (e) {
                        var input = this;
                        setTimeout(function () {
                            caret(input, 0, seekNext(getLastValidPosition()));
                        }, 0);
                    },
                    cutEvent: function (e) {
                        var input = this,
                            $input = $(input),
                            pos = caret(input),
                            ev = e.originalEvent || e,
                            clipboardData = window.clipboardData || ev.clipboardData,
                            clipData = isRTL ? getBuffer().slice(pos.end, pos.begin) : getBuffer().slice(pos.begin, pos.end);
                        clipboardData.setData("text", isRTL ? clipData.reverse().join("") : clipData.join("")), document.execCommand && document.execCommand("copy"), handleRemove(input, Inputmask.keyCode.DELETE, pos), writeBuffer(input, getBuffer(), getMaskSet().p, e, undoValue !== getBuffer().join("")), input.inputmask._valueGet() === getBufferTemplate().join("") && $input.trigger("cleared");
                    },
                    blurEvent: function (e) {
                        var $input = $(this),
                            input = this;
                        if (input.inputmask) {
                            var nptValue = input.inputmask._valueGet(),
                                buffer = getBuffer().slice();
                            "" !== nptValue && (opts.clearMaskOnLostFocus && (-1 === getLastValidPosition() && nptValue === getBufferTemplate().join("") ? buffer = [] : clearOptionalTail(buffer)), !1 === isComplete(buffer) && (setTimeout(function () {
                                $input.trigger("incomplete");
                            }, 0), opts.clearIncomplete && (resetMaskSet(), buffer = opts.clearMaskOnLostFocus ? [] : getBufferTemplate().slice())), writeBuffer(input, buffer, undefined, e)), undoValue !== getBuffer().join("") && (undoValue = buffer.join(""), $input.trigger("change"));
                        }
                    },
                    mouseenterEvent: function (e) {
                        var input = this;
                        mouseEnter = !0, document.activeElement !== input && opts.showMaskOnHover && input.inputmask._valueGet() !== getBuffer().join("") && writeBuffer(input, getBuffer());
                    },
                    submitEvent: function (e) {
                        undoValue !== getBuffer().join("") && $el.trigger("change"), opts.clearMaskOnLostFocus && -1 === getLastValidPosition() && el.inputmask._valueGet && el.inputmask._valueGet() === getBufferTemplate().join("") && el.inputmask._valueSet(""), opts.removeMaskOnSubmit && (el.inputmask._valueSet(el.inputmask.unmaskedvalue(), !0), setTimeout(function () {
                            writeBuffer(el, getBuffer());
                        }, 0));
                    },
                    resetEvent: function (e) {
                        el.inputmask.refreshValue = !0, setTimeout(function () {
                            $el.trigger("setvalue");
                        }, 0);
                    }
                };
                Inputmask.prototype.positionColorMask = function (input, template) {
                    input.style.left = template.offsetLeft + "px";
                };
                var valueBuffer;
                if (actionObj !== undefined) switch (actionObj.action) {
                    case "isComplete":
                        return el = actionObj.el, isComplete(getBuffer());

                    case "unmaskedvalue":
                        return el !== undefined && actionObj.value === undefined || (valueBuffer = actionObj.value, valueBuffer = ($.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call(inputmask, valueBuffer, opts) || valueBuffer : valueBuffer).split(""), checkVal(undefined, !1, !1, isRTL ? valueBuffer.reverse() : valueBuffer), $.isFunction(opts.onBeforeWrite) && opts.onBeforeWrite.call(inputmask, undefined, getBuffer(), 0, opts)), unmaskedvalue(el);

                    case "mask":
                        !function (elem) {
                            EventRuler.off(elem);
                            var isSupported = function (input, opts) {
                                var elementType = input.getAttribute("type"),
                                    isSupported = "INPUT" === input.tagName && -1 !== $.inArray(elementType, opts.supportsInputType) || input.isContentEditable || "TEXTAREA" === input.tagName;
                                if (!isSupported) if ("INPUT" === input.tagName) {
                                    var el = document.createElement("input");
                                    el.setAttribute("type", elementType), isSupported = "text" === el.type, el = null;
                                } else isSupported = "partial";
                                return !1 !== isSupported ? function (npt) {
                                    function getter() {
                                        return this.inputmask ? this.inputmask.opts.autoUnmask ? this.inputmask.unmaskedvalue() : -1 !== getLastValidPosition() || !0 !== opts.nullable ? document.activeElement === this && opts.clearMaskOnLostFocus ? (isRTL ? clearOptionalTail(getBuffer().slice()).reverse() : clearOptionalTail(getBuffer().slice())).join("") : valueGet.call(this) : "" : valueGet.call(this);
                                    }
                                    function setter(value) {
                                        valueSet.call(this, value), this.inputmask && $(this).trigger("setvalue");
                                    }
                                    var valueGet, valueSet;
                                    if (!npt.inputmask.__valueGet) {
                                        if (!0 !== opts.noValuePatching) {
                                            if (Object.getOwnPropertyDescriptor) {
                                                "function" != typeof Object.getPrototypeOf && (Object.getPrototypeOf = "object" == typeof "test".__proto__ ? function (object) {
                                                    return object.__proto__;
                                                } : function (object) {
                                                    return object.constructor.prototype;
                                                });
                                                var valueProperty = Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(npt), "value") : undefined;
                                                valueProperty && valueProperty.get && valueProperty.set ? (valueGet = valueProperty.get, valueSet = valueProperty.set, Object.defineProperty(npt, "value", {
                                                    get: getter,
                                                    set: setter,
                                                    configurable: !0
                                                })) : "INPUT" !== npt.tagName && (valueGet = function () {
                                                    return this.textContent;
                                                }, valueSet = function (value) {
                                                    this.textContent = value;
                                                }, Object.defineProperty(npt, "value", {
                                                    get: getter,
                                                    set: setter,
                                                    configurable: !0
                                                }));
                                            } else document.__lookupGetter__ && npt.__lookupGetter__("value") && (valueGet = npt.__lookupGetter__("value"), valueSet = npt.__lookupSetter__("value"), npt.__defineGetter__("value", getter), npt.__defineSetter__("value", setter));
                                            npt.inputmask.__valueGet = valueGet, npt.inputmask.__valueSet = valueSet;
                                        }
                                        npt.inputmask._valueGet = function (overruleRTL) {
                                            return isRTL && !0 !== overruleRTL ? valueGet.call(this.el).split("").reverse().join("") : valueGet.call(this.el);
                                        }, npt.inputmask._valueSet = function (value, overruleRTL) {
                                            valueSet.call(this.el, null === value || value === undefined ? "" : !0 !== overruleRTL && isRTL ? value.split("").reverse().join("") : value);
                                        }, valueGet === undefined && (valueGet = function () {
                                            return this.value;
                                        }, valueSet = function (value) {
                                            this.value = value;
                                        }, function (type) {
                                            if ($.valHooks && ($.valHooks[type] === undefined || !0 !== $.valHooks[type].inputmaskpatch)) {
                                                var valhookGet = $.valHooks[type] && $.valHooks[type].get ? $.valHooks[type].get : function (elem) {
                                                    return elem.value;
                                                },
                                                    valhookSet = $.valHooks[type] && $.valHooks[type].set ? $.valHooks[type].set : function (elem, value) {
                                                    return elem.value = value, elem;
                                                };
                                                $.valHooks[type] = {
                                                    get: function (elem) {
                                                        if (elem.inputmask) {
                                                            if (elem.inputmask.opts.autoUnmask) return elem.inputmask.unmaskedvalue();
                                                            var result = valhookGet(elem);
                                                            return -1 !== getLastValidPosition(undefined, undefined, elem.inputmask.maskset.validPositions) || !0 !== opts.nullable ? result : "";
                                                        }
                                                        return valhookGet(elem);
                                                    },
                                                    set: function (elem, value) {
                                                        var result,
                                                            $elem = $(elem);
                                                        return result = valhookSet(elem, value), elem.inputmask && $elem.trigger("setvalue"), result;
                                                    },
                                                    inputmaskpatch: !0
                                                };
                                            }
                                        }(npt.type), function (npt) {
                                            EventRuler.on(npt, "mouseenter", function (event) {
                                                var $input = $(this);
                                                this.inputmask._valueGet() !== getBuffer().join("") && $input.trigger("setvalue");
                                            });
                                        }(npt));
                                    }
                                }(input) : input.inputmask = undefined, isSupported;
                            }(elem, opts);
                            if (!1 !== isSupported && (el = elem, $el = $(el), maxLength = el !== undefined ? el.maxLength : undefined, -1 === maxLength && (maxLength = undefined), !0 === opts.colorMask && initializeColorMask(el), android && (el.hasOwnProperty("inputmode") && (el.inputmode = opts.inputmode, el.setAttribute("inputmode", opts.inputmode)), "rtfm" === opts.androidHack && (!0 !== opts.colorMask && initializeColorMask(el), el.type = "password")), !0 === isSupported && (EventRuler.on(el, "submit", EventHandlers.submitEvent), EventRuler.on(el, "reset", EventHandlers.resetEvent), EventRuler.on(el, "mouseenter", EventHandlers.mouseenterEvent), EventRuler.on(el, "blur", EventHandlers.blurEvent), EventRuler.on(el, "focus", EventHandlers.focusEvent), EventRuler.on(el, "mouseleave", EventHandlers.mouseleaveEvent), !0 !== opts.colorMask && EventRuler.on(el, "click", EventHandlers.clickEvent), EventRuler.on(el, "dblclick", EventHandlers.dblclickEvent), EventRuler.on(el, "paste", EventHandlers.pasteEvent), EventRuler.on(el, "dragdrop", EventHandlers.pasteEvent), EventRuler.on(el, "drop", EventHandlers.pasteEvent), EventRuler.on(el, "cut", EventHandlers.cutEvent), EventRuler.on(el, "complete", opts.oncomplete), EventRuler.on(el, "incomplete", opts.onincomplete), EventRuler.on(el, "cleared", opts.oncleared), android || !0 === opts.inputEventOnly ? el.removeAttribute("maxLength") : (EventRuler.on(el, "keydown", EventHandlers.keydownEvent), EventRuler.on(el, "keypress", EventHandlers.keypressEvent)), EventRuler.on(el, "compositionstart", $.noop), EventRuler.on(el, "compositionupdate", $.noop), EventRuler.on(el, "compositionend", $.noop), EventRuler.on(el, "keyup", $.noop), EventRuler.on(el, "input", EventHandlers.inputFallBackEvent), EventRuler.on(el, "beforeinput", $.noop)), EventRuler.on(el, "setvalue", EventHandlers.setValueEvent), undoValue = getBufferTemplate().join(""), "" !== el.inputmask._valueGet(!0) || !1 === opts.clearMaskOnLostFocus || document.activeElement === el)) {
                                var initialValue = $.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call(inputmask, el.inputmask._valueGet(!0), opts) || el.inputmask._valueGet(!0) : el.inputmask._valueGet(!0);
                                "" !== initialValue && checkVal(el, !0, !1, isRTL ? initialValue.split("").reverse() : initialValue.split(""));
                                var buffer = getBuffer().slice();
                                undoValue = buffer.join(""), !1 === isComplete(buffer) && opts.clearIncomplete && resetMaskSet(), opts.clearMaskOnLostFocus && document.activeElement !== el && (-1 === getLastValidPosition() ? buffer = [] : clearOptionalTail(buffer)), writeBuffer(el, buffer), document.activeElement === el && caret(el, seekNext(getLastValidPosition()));
                            }
                        }(el);
                        break;

                    case "format":
                        return valueBuffer = ($.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call(inputmask, actionObj.value, opts) || actionObj.value : actionObj.value).split(""), checkVal(undefined, !0, !1, isRTL ? valueBuffer.reverse() : valueBuffer), actionObj.metadata ? {
                            value: isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join(""),
                            metadata: maskScope.call(this, {
                                action: "getmetadata"
                            }, maskset, opts)
                        } : isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join("");

                    case "isValid":
                        actionObj.value ? (valueBuffer = actionObj.value.split(""), checkVal(undefined, !0, !0, isRTL ? valueBuffer.reverse() : valueBuffer)) : actionObj.value = getBuffer().join("");
                        for (var buffer = getBuffer(), rl = determineLastRequiredPosition(), lmib = buffer.length - 1; lmib > rl && !isMask(lmib); lmib--);
                        return buffer.splice(rl, lmib + 1 - rl), isComplete(buffer) && actionObj.value === getBuffer().join("");

                    case "getemptymask":
                        return getBufferTemplate().join("");

                    case "remove":
                        if (el && el.inputmask) {
                            $el = $(el), el.inputmask._valueSet(opts.autoUnmask ? unmaskedvalue(el) : el.inputmask._valueGet(!0)), EventRuler.off(el);
                            Object.getOwnPropertyDescriptor && Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), "value") && el.inputmask.__valueGet && Object.defineProperty(el, "value", {
                                get: el.inputmask.__valueGet,
                                set: el.inputmask.__valueSet,
                                configurable: !0
                            }) : document.__lookupGetter__ && el.__lookupGetter__("value") && el.inputmask.__valueGet && (el.__defineGetter__("value", el.inputmask.__valueGet), el.__defineSetter__("value", el.inputmask.__valueSet)), el.inputmask = undefined;
                        }
                        return el;

                    case "getmetadata":
                        if ($.isArray(maskset.metadata)) {
                            var maskTarget = getMaskTemplate(!0, 0, !1).join("");
                            return $.each(maskset.metadata, function (ndx, mtdt) {
                                if (mtdt.mask === maskTarget) return maskTarget = mtdt, !1;
                            }), maskTarget;
                        }
                        return maskset.metadata;
                }
            }
            var ua = navigator.userAgent,
                mobile = /mobile/i.test(ua),
                iemobile = /iemobile/i.test(ua),
                iphone = /iphone/i.test(ua) && !iemobile,
                android = /android/i.test(ua) && !iemobile;
            return Inputmask.prototype = {
                dataAttribute: "data-inputmask",
                defaults: {
                    placeholder: "_",
                    optionalmarker: {
                        start: "[",
                        end: "]"
                    },
                    quantifiermarker: {
                        start: "{",
                        end: "}"
                    },
                    groupmarker: {
                        start: "(",
                        end: ")"
                    },
                    alternatormarker: "|",
                    escapeChar: "\\",
                    mask: null,
                    regex: null,
                    oncomplete: $.noop,
                    onincomplete: $.noop,
                    oncleared: $.noop,
                    repeat: 0,
                    greedy: !0,
                    autoUnmask: !1,
                    removeMaskOnSubmit: !1,
                    clearMaskOnLostFocus: !0,
                    insertMode: !0,
                    clearIncomplete: !1,
                    alias: null,
                    onKeyDown: $.noop,
                    onBeforeMask: null,
                    onBeforePaste: function (pastedValue, opts) {
                        return $.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call(this, pastedValue, opts) : pastedValue;
                    },
                    onBeforeWrite: null,
                    onUnMask: null,
                    showMaskOnFocus: !0,
                    showMaskOnHover: !0,
                    onKeyValidation: $.noop,
                    skipOptionalPartCharacter: " ",
                    numericInput: !1,
                    rightAlign: !1,
                    undoOnEscape: !0,
                    radixPoint: "",
                    radixPointDefinitionSymbol: undefined,
                    groupSeparator: "",
                    keepStatic: null,
                    positionCaretOnTab: !0,
                    tabThrough: !1,
                    supportsInputType: ["text", "tel", "password"],
                    ignorables: [8, 9, 13, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 0, 229],
                    isComplete: null,
                    canClearPosition: $.noop,
                    preValidation: null,
                    postValidation: null,
                    staticDefinitionSymbol: undefined,
                    jitMasking: !1,
                    nullable: !0,
                    inputEventOnly: !1,
                    noValuePatching: !1,
                    positionCaretOnClick: "lvp",
                    casing: null,
                    inputmode: "verbatim",
                    colorMask: !1,
                    androidHack: !1,
                    importDataAttributes: !0
                },
                definitions: {
                    "9": {
                        validator: "[0-9\uff11-\uff19]",
                        cardinality: 1,
                        definitionSymbol: "*"
                    },
                    a: {
                        validator: "[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
                        cardinality: 1,
                        definitionSymbol: "*"
                    },
                    "*": {
                        validator: "[0-9\uff11-\uff19A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
                        cardinality: 1
                    }
                },
                aliases: {},
                masksCache: {},
                mask: function (elems) {
                    function importAttributeOptions(npt, opts, userOptions, dataAttribute) {
                        function importOption(option, optionData) {
                            null !== (optionData = optionData !== undefined ? optionData : npt.getAttribute(dataAttribute + "-" + option)) && ("string" == typeof optionData && (0 === option.indexOf("on") ? optionData = window[optionData] : "false" === optionData ? optionData = !1 : "true" === optionData && (optionData = !0)), userOptions[option] = optionData);
                        }
                        if (!0 === opts.importDataAttributes) {
                            var option,
                                dataoptions,
                                optionData,
                                p,
                                attrOptions = npt.getAttribute(dataAttribute);
                            if (attrOptions && "" !== attrOptions && (attrOptions = attrOptions.replace(new RegExp("'", "g"), '"'), dataoptions = JSON.parse("{" + attrOptions + "}")), dataoptions) {
                                optionData = undefined;
                                for (p in dataoptions) if ("alias" === p.toLowerCase()) {
                                    optionData = dataoptions[p];
                                    break;
                                }
                            }
                            importOption("alias", optionData), userOptions.alias && resolveAlias(userOptions.alias, userOptions, opts);
                            for (option in opts) {
                                if (dataoptions) {
                                    optionData = undefined;
                                    for (p in dataoptions) if (p.toLowerCase() === option.toLowerCase()) {
                                        optionData = dataoptions[p];
                                        break;
                                    }
                                }
                                importOption(option, optionData);
                            }
                        }
                        return $.extend(!0, opts, userOptions), ("rtl" === npt.dir || opts.rightAlign) && (npt.style.textAlign = "right"), ("rtl" === npt.dir || opts.numericInput) && (npt.dir = "ltr", npt.removeAttribute("dir"), opts.isRTL = !0), opts;
                    }
                    var that = this;
                    return "string" == typeof elems && (elems = document.getElementById(elems) || document.querySelectorAll(elems)), elems = elems.nodeName ? [elems] : elems, $.each(elems, function (ndx, el) {
                        var scopedOpts = $.extend(!0, {}, that.opts);
                        importAttributeOptions(el, scopedOpts, $.extend(!0, {}, that.userOptions), that.dataAttribute);
                        var maskset = generateMaskSet(scopedOpts, that.noMasksCache);
                        maskset !== undefined && (el.inputmask !== undefined && (el.inputmask.opts.autoUnmask = !0, el.inputmask.remove()), el.inputmask = new Inputmask(undefined, undefined, !0), el.inputmask.opts = scopedOpts, el.inputmask.noMasksCache = that.noMasksCache, el.inputmask.userOptions = $.extend(!0, {}, that.userOptions), el.inputmask.isRTL = scopedOpts.isRTL || scopedOpts.numericInput, el.inputmask.el = el, el.inputmask.maskset = maskset, $.data(el, "_inputmask_opts", scopedOpts), maskScope.call(el.inputmask, {
                            action: "mask"
                        }));
                    }), elems && elems[0] ? elems[0].inputmask || this : this;
                },
                option: function (options, noremask) {
                    return "string" == typeof options ? this.opts[options] : "object" == typeof options ? ($.extend(this.userOptions, options), this.el && !0 !== noremask && this.mask(this.el), this) : void 0;
                },
                unmaskedvalue: function (value) {
                    return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), maskScope.call(this, {
                        action: "unmaskedvalue",
                        value: value
                    });
                },
                remove: function () {
                    return maskScope.call(this, {
                        action: "remove"
                    });
                },
                getemptymask: function () {
                    return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), maskScope.call(this, {
                        action: "getemptymask"
                    });
                },
                hasMaskedValue: function () {
                    return !this.opts.autoUnmask;
                },
                isComplete: function () {
                    return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), maskScope.call(this, {
                        action: "isComplete"
                    });
                },
                getmetadata: function () {
                    return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), maskScope.call(this, {
                        action: "getmetadata"
                    });
                },
                isValid: function (value) {
                    return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), maskScope.call(this, {
                        action: "isValid",
                        value: value
                    });
                },
                format: function (value, metadata) {
                    return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), maskScope.call(this, {
                        action: "format",
                        value: value,
                        metadata: metadata
                    });
                },
                analyseMask: function (mask, regexMask, opts) {
                    function MaskToken(isGroup, isOptional, isQuantifier, isAlternator) {
                        this.matches = [], this.openGroup = isGroup || !1, this.alternatorGroup = !1, this.isGroup = isGroup || !1, this.isOptional = isOptional || !1, this.isQuantifier = isQuantifier || !1, this.isAlternator = isAlternator || !1, this.quantifier = {
                            min: 1,
                            max: 1
                        };
                    }
                    function insertTestDefinition(mtoken, element, position) {
                        position = position !== undefined ? position : mtoken.matches.length;
                        var prevMatch = mtoken.matches[position - 1];
                        if (regexMask) 0 === element.indexOf("[") || escaped && /\\d|\\s|\\w]/i.test(element) || "." === element ? mtoken.matches.splice(position++, 0, {
                            fn: new RegExp(element, opts.casing ? "i" : ""),
                            cardinality: 1,
                            optionality: mtoken.isOptional,
                            newBlockMarker: prevMatch === undefined || prevMatch.def !== element,
                            casing: null,
                            def: element,
                            placeholder: undefined,
                            nativeDef: element
                        }) : (escaped && (element = element[element.length - 1]), $.each(element.split(""), function (ndx, lmnt) {
                            prevMatch = mtoken.matches[position - 1], mtoken.matches.splice(position++, 0, {
                                fn: null,
                                cardinality: 0,
                                optionality: mtoken.isOptional,
                                newBlockMarker: prevMatch === undefined || prevMatch.def !== lmnt && null !== prevMatch.fn,
                                casing: null,
                                def: opts.staticDefinitionSymbol || lmnt,
                                placeholder: opts.staticDefinitionSymbol !== undefined ? lmnt : undefined,
                                nativeDef: lmnt
                            });
                        })), escaped = !1;else {
                            var maskdef = (opts.definitions ? opts.definitions[element] : undefined) || Inputmask.prototype.definitions[element];
                            if (maskdef && !escaped) {
                                for (var prevalidators = maskdef.prevalidator, prevalidatorsL = prevalidators ? prevalidators.length : 0, i = 1; i < maskdef.cardinality; i++) {
                                    var prevalidator = prevalidatorsL >= i ? prevalidators[i - 1] : [],
                                        validator = prevalidator.validator,
                                        cardinality = prevalidator.cardinality;
                                    mtoken.matches.splice(position++, 0, {
                                        fn: validator ? "string" == typeof validator ? new RegExp(validator, opts.casing ? "i" : "") : new function () {
                                            this.test = validator;
                                        }() : new RegExp("."),
                                        cardinality: cardinality || 1,
                                        optionality: mtoken.isOptional,
                                        newBlockMarker: prevMatch === undefined || prevMatch.def !== (maskdef.definitionSymbol || element),
                                        casing: maskdef.casing,
                                        def: maskdef.definitionSymbol || element,
                                        placeholder: maskdef.placeholder,
                                        nativeDef: element
                                    }), prevMatch = mtoken.matches[position - 1];
                                }
                                mtoken.matches.splice(position++, 0, {
                                    fn: maskdef.validator ? "string" == typeof maskdef.validator ? new RegExp(maskdef.validator, opts.casing ? "i" : "") : new function () {
                                        this.test = maskdef.validator;
                                    }() : new RegExp("."),
                                    cardinality: maskdef.cardinality,
                                    optionality: mtoken.isOptional,
                                    newBlockMarker: prevMatch === undefined || prevMatch.def !== (maskdef.definitionSymbol || element),
                                    casing: maskdef.casing,
                                    def: maskdef.definitionSymbol || element,
                                    placeholder: maskdef.placeholder,
                                    nativeDef: element
                                });
                            } else mtoken.matches.splice(position++, 0, {
                                fn: null,
                                cardinality: 0,
                                optionality: mtoken.isOptional,
                                newBlockMarker: prevMatch === undefined || prevMatch.def !== element && null !== prevMatch.fn,
                                casing: null,
                                def: opts.staticDefinitionSymbol || element,
                                placeholder: opts.staticDefinitionSymbol !== undefined ? element : undefined,
                                nativeDef: element
                            }), escaped = !1;
                        }
                    }
                    function verifyGroupMarker(maskToken) {
                        maskToken && maskToken.matches && $.each(maskToken.matches, function (ndx, token) {
                            var nextToken = maskToken.matches[ndx + 1];
                            (nextToken === undefined || nextToken.matches === undefined || !1 === nextToken.isQuantifier) && token && token.isGroup && (token.isGroup = !1, regexMask || (insertTestDefinition(token, opts.groupmarker.start, 0), !0 !== token.openGroup && insertTestDefinition(token, opts.groupmarker.end))), verifyGroupMarker(token);
                        });
                    }
                    function defaultCase() {
                        if (openenings.length > 0) {
                            if (currentOpeningToken = openenings[openenings.length - 1], insertTestDefinition(currentOpeningToken, m), currentOpeningToken.isAlternator) {
                                alternator = openenings.pop();
                                for (var mndx = 0; mndx < alternator.matches.length; mndx++) alternator.matches[mndx].isGroup = !1;
                                openenings.length > 0 ? (currentOpeningToken = openenings[openenings.length - 1], currentOpeningToken.matches.push(alternator)) : currentToken.matches.push(alternator);
                            }
                        } else insertTestDefinition(currentToken, m);
                    }
                    function reverseTokens(maskToken) {
                        maskToken.matches = maskToken.matches.reverse();
                        for (var match in maskToken.matches) if (maskToken.matches.hasOwnProperty(match)) {
                            var intMatch = parseInt(match);
                            if (maskToken.matches[match].isQuantifier && maskToken.matches[intMatch + 1] && maskToken.matches[intMatch + 1].isGroup) {
                                var qt = maskToken.matches[match];
                                maskToken.matches.splice(match, 1), maskToken.matches.splice(intMatch + 1, 0, qt);
                            }
                            maskToken.matches[match].matches !== undefined ? maskToken.matches[match] = reverseTokens(maskToken.matches[match]) : maskToken.matches[match] = function (st) {
                                return st === opts.optionalmarker.start ? st = opts.optionalmarker.end : st === opts.optionalmarker.end ? st = opts.optionalmarker.start : st === opts.groupmarker.start ? st = opts.groupmarker.end : st === opts.groupmarker.end && (st = opts.groupmarker.start), st;
                            }(maskToken.matches[match]);
                        }
                        return maskToken;
                    }
                    var match,
                        m,
                        openingToken,
                        currentOpeningToken,
                        alternator,
                        lastMatch,
                        groupToken,
                        tokenizer = /(?:[?*+]|\{[0-9\+\*]+(?:,[0-9\+\*]*)?\})|[^.?*+^${[]()|\\]+|./g,
                        regexTokenizer = /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g,
                        escaped = !1,
                        currentToken = new MaskToken(),
                        openenings = [],
                        maskTokens = [];
                    for (regexMask && (opts.optionalmarker.start = undefined, opts.optionalmarker.end = undefined); match = regexMask ? regexTokenizer.exec(mask) : tokenizer.exec(mask);) {
                        if (m = match[0], regexMask) switch (m.charAt(0)) {
                            case "?":
                                m = "{0,1}";
                                break;

                            case "+":
                            case "*":
                                m = "{" + m + "}";
                        }
                        if (escaped) defaultCase();else switch (m.charAt(0)) {
                            case opts.escapeChar:
                                escaped = !0, regexMask && defaultCase();
                                break;

                            case opts.optionalmarker.end:
                            case opts.groupmarker.end:
                                if (openingToken = openenings.pop(), openingToken.openGroup = !1, openingToken !== undefined) {
                                    if (openenings.length > 0) {
                                        if (currentOpeningToken = openenings[openenings.length - 1], currentOpeningToken.matches.push(openingToken), currentOpeningToken.isAlternator) {
                                            alternator = openenings.pop();
                                            for (var mndx = 0; mndx < alternator.matches.length; mndx++) alternator.matches[mndx].isGroup = !1, alternator.matches[mndx].alternatorGroup = !1;
                                            openenings.length > 0 ? (currentOpeningToken = openenings[openenings.length - 1], currentOpeningToken.matches.push(alternator)) : currentToken.matches.push(alternator);
                                        }
                                    } else currentToken.matches.push(openingToken);
                                } else defaultCase();
                                break;

                            case opts.optionalmarker.start:
                                openenings.push(new MaskToken(!1, !0));
                                break;

                            case opts.groupmarker.start:
                                openenings.push(new MaskToken(!0));
                                break;

                            case opts.quantifiermarker.start:
                                var quantifier = new MaskToken(!1, !1, !0);
                                m = m.replace(/[{}]/g, "");
                                var mq = m.split(","),
                                    mq0 = isNaN(mq[0]) ? mq[0] : parseInt(mq[0]),
                                    mq1 = 1 === mq.length ? mq0 : isNaN(mq[1]) ? mq[1] : parseInt(mq[1]);
                                if ("*" !== mq1 && "+" !== mq1 || (mq0 = "*" === mq1 ? 0 : 1), quantifier.quantifier = {
                                    min: mq0,
                                    max: mq1
                                }, openenings.length > 0) {
                                    var matches = openenings[openenings.length - 1].matches;
                                    match = matches.pop(), match.isGroup || (groupToken = new MaskToken(!0), groupToken.matches.push(match), match = groupToken), matches.push(match), matches.push(quantifier);
                                } else match = currentToken.matches.pop(), match.isGroup || (regexMask && null === match.fn && "." === match.def && (match.fn = new RegExp(match.def, opts.casing ? "i" : "")), groupToken = new MaskToken(!0), groupToken.matches.push(match), match = groupToken), currentToken.matches.push(match), currentToken.matches.push(quantifier);
                                break;

                            case opts.alternatormarker:
                                if (openenings.length > 0) {
                                    currentOpeningToken = openenings[openenings.length - 1];
                                    var subToken = currentOpeningToken.matches[currentOpeningToken.matches.length - 1];
                                    lastMatch = currentOpeningToken.openGroup && (subToken.matches === undefined || !1 === subToken.isGroup && !1 === subToken.isAlternator) ? openenings.pop() : currentOpeningToken.matches.pop();
                                } else lastMatch = currentToken.matches.pop();
                                if (lastMatch.isAlternator) openenings.push(lastMatch);else if (lastMatch.alternatorGroup ? (alternator = openenings.pop(), lastMatch.alternatorGroup = !1) : alternator = new MaskToken(!1, !1, !1, !0), alternator.matches.push(lastMatch), openenings.push(alternator), lastMatch.openGroup) {
                                    lastMatch.openGroup = !1;
                                    var alternatorGroup = new MaskToken(!0);
                                    alternatorGroup.alternatorGroup = !0, openenings.push(alternatorGroup);
                                }
                                break;

                            default:
                                defaultCase();
                        }
                    }
                    for (; openenings.length > 0;) openingToken = openenings.pop(), currentToken.matches.push(openingToken);
                    return currentToken.matches.length > 0 && (verifyGroupMarker(currentToken), maskTokens.push(currentToken)), (opts.numericInput || opts.isRTL) && reverseTokens(maskTokens[0]), maskTokens;
                }
            }, Inputmask.extendDefaults = function (options) {
                $.extend(!0, Inputmask.prototype.defaults, options);
            }, Inputmask.extendDefinitions = function (definition) {
                $.extend(!0, Inputmask.prototype.definitions, definition);
            }, Inputmask.extendAliases = function (alias) {
                $.extend(!0, Inputmask.prototype.aliases, alias);
            }, Inputmask.format = function (value, options, metadata) {
                return Inputmask(options).format(value, metadata);
            }, Inputmask.unmask = function (value, options) {
                return Inputmask(options).unmaskedvalue(value);
            }, Inputmask.isValid = function (value, options) {
                return Inputmask(options).isValid(value);
            }, Inputmask.remove = function (elems) {
                $.each(elems, function (ndx, el) {
                    el.inputmask && el.inputmask.remove();
                });
            }, Inputmask.escapeRegex = function (str) {
                var specials = ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^"];
                return str.replace(new RegExp("(\\" + specials.join("|\\") + ")", "gim"), "\\$1");
            }, Inputmask.keyCode = {
                ALT: 18,
                BACKSPACE: 8,
                BACKSPACE_SAFARI: 127,
                CAPS_LOCK: 20,
                COMMA: 188,
                COMMAND: 91,
                COMMAND_LEFT: 91,
                COMMAND_RIGHT: 93,
                CONTROL: 17,
                DELETE: 46,
                DOWN: 40,
                END: 35,
                ENTER: 13,
                ESCAPE: 27,
                HOME: 36,
                INSERT: 45,
                LEFT: 37,
                MENU: 93,
                NUMPAD_ADD: 107,
                NUMPAD_DECIMAL: 110,
                NUMPAD_DIVIDE: 111,
                NUMPAD_ENTER: 108,
                NUMPAD_MULTIPLY: 106,
                NUMPAD_SUBTRACT: 109,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                PERIOD: 190,
                RIGHT: 39,
                SHIFT: 16,
                SPACE: 32,
                TAB: 9,
                UP: 38,
                WINDOWS: 91,
                X: 88
            }, Inputmask;
        });
    })(this);

    return _retrieveGlobal();
});
System.registerDynamic("npm:inputmask@3.3.8/dist/inputmask/jquery.inputmask.js", [], false, function ($__require, $__exports, $__module) {
    var _retrieveGlobal = System.registry.get("@@global-helpers").prepareGlobal($__module.id, null, {});

    (function ($__global) {
        /*!
        * jquery.inputmask.js
        * https://github.com/RobinHerbots/Inputmask
        * Copyright (c) 2010 - 2017 Robin Herbots
        * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
        * Version: 3.3.8
        */

        !function (factory) {
            "function" == typeof define && define.amd ? define(["jquery", "./inputmask"], factory) : "object" == typeof exports ? module.exports = factory(require("jquery"), require("./inputmask")) : factory(jQuery, window.Inputmask);
        }(function ($, Inputmask) {
            return void 0 === $.fn.inputmask && ($.fn.inputmask = function (fn, options) {
                var nptmask,
                    input = this[0];
                if (void 0 === options && (options = {}), "string" == typeof fn) switch (fn) {
                    case "unmaskedvalue":
                        return input && input.inputmask ? input.inputmask.unmaskedvalue() : $(input).val();

                    case "remove":
                        return this.each(function () {
                            this.inputmask && this.inputmask.remove();
                        });

                    case "getemptymask":
                        return input && input.inputmask ? input.inputmask.getemptymask() : "";

                    case "hasMaskedValue":
                        return !(!input || !input.inputmask) && input.inputmask.hasMaskedValue();

                    case "isComplete":
                        return !input || !input.inputmask || input.inputmask.isComplete();

                    case "getmetadata":
                        return input && input.inputmask ? input.inputmask.getmetadata() : void 0;

                    case "setvalue":
                        $(input).val(options), input && void 0 === input.inputmask && $(input).triggerHandler("setvalue");
                        break;

                    case "option":
                        if ("string" != typeof options) return this.each(function () {
                            if (void 0 !== this.inputmask) return this.inputmask.option(options);
                        });
                        if (input && void 0 !== input.inputmask) return input.inputmask.option(options);
                        break;

                    default:
                        return options.alias = fn, nptmask = new Inputmask(options), this.each(function () {
                            nptmask.mask(this);
                        });
                } else {
                    if ("object" == typeof fn) return nptmask = new Inputmask(fn), void 0 === fn.mask && void 0 === fn.alias ? this.each(function () {
                        if (void 0 !== this.inputmask) return this.inputmask.option(fn);
                        nptmask.mask(this);
                    }) : this.each(function () {
                        nptmask.mask(this);
                    });
                    if (void 0 === fn) return this.each(function () {
                        nptmask = new Inputmask(options), nptmask.mask(this);
                    });
                }
            }), $.fn.inputmask;
        });
    })(this);

    return _retrieveGlobal();
});
System.registerDynamic("npm:inputmask@3.3.8/dist/inputmask/inputmask.date.extensions.js", [], false, function ($__require, $__exports, $__module) {
    var _retrieveGlobal = System.registry.get("@@global-helpers").prepareGlobal($__module.id, null, {});

    (function ($__global) {
        /*!
        * inputmask.date.extensions.js
        * https://github.com/RobinHerbots/Inputmask
        * Copyright (c) 2010 - 2017 Robin Herbots
        * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
        * Version: 3.3.8
        */

        !function (factory) {
            "function" == typeof define && define.amd ? define(["./dependencyLibs/inputmask.dependencyLib", "./inputmask"], factory) : "object" == typeof exports ? module.exports = factory(require("./dependencyLibs/inputmask.dependencyLib"), require("./inputmask")) : factory(window.dependencyLib || jQuery, window.Inputmask);
        }(function ($, Inputmask) {
            function isLeapYear(year) {
                return isNaN(year) || 29 === new Date(year, 2, 0).getDate();
            }
            return Inputmask.extendAliases({
                "dd/mm/yyyy": {
                    mask: "1/2/y",
                    placeholder: "dd/mm/yyyy",
                    regex: {
                        val1pre: new RegExp("[0-3]"),
                        val1: new RegExp("0[1-9]|[12][0-9]|3[01]"),
                        val2pre: function (separator) {
                            var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
                            return new RegExp("((0[1-9]|[12][0-9]|3[01])" + escapedSeparator + "[01])");
                        },
                        val2: function (separator) {
                            var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
                            return new RegExp("((0[1-9]|[12][0-9])" + escapedSeparator + "(0[1-9]|1[012]))|(30" + escapedSeparator + "(0[13-9]|1[012]))|(31" + escapedSeparator + "(0[13578]|1[02]))");
                        }
                    },
                    leapday: "29/02/",
                    separator: "/",
                    yearrange: {
                        minyear: 1900,
                        maxyear: 2099
                    },
                    isInYearRange: function (chrs, minyear, maxyear) {
                        if (isNaN(chrs)) return !1;
                        var enteredyear = parseInt(chrs.concat(minyear.toString().slice(chrs.length))),
                            enteredyear2 = parseInt(chrs.concat(maxyear.toString().slice(chrs.length)));
                        return !isNaN(enteredyear) && minyear <= enteredyear && enteredyear <= maxyear || !isNaN(enteredyear2) && minyear <= enteredyear2 && enteredyear2 <= maxyear;
                    },
                    determinebaseyear: function (minyear, maxyear, hint) {
                        var currentyear = new Date().getFullYear();
                        if (minyear > currentyear) return minyear;
                        if (maxyear < currentyear) {
                            for (var maxYearPrefix = maxyear.toString().slice(0, 2), maxYearPostfix = maxyear.toString().slice(2, 4); maxyear < maxYearPrefix + hint;) maxYearPrefix--;
                            var maxxYear = maxYearPrefix + maxYearPostfix;
                            return minyear > maxxYear ? minyear : maxxYear;
                        }
                        if (minyear <= currentyear && currentyear <= maxyear) {
                            for (var currentYearPrefix = currentyear.toString().slice(0, 2); maxyear < currentYearPrefix + hint;) currentYearPrefix--;
                            var currentYearAndHint = currentYearPrefix + hint;
                            return currentYearAndHint < minyear ? minyear : currentYearAndHint;
                        }
                        return currentyear;
                    },
                    onKeyDown: function (e, buffer, caretPos, opts) {
                        var $input = $(this);
                        if (e.ctrlKey && e.keyCode === Inputmask.keyCode.RIGHT) {
                            var today = new Date();
                            $input.val(today.getDate().toString() + (today.getMonth() + 1).toString() + today.getFullYear().toString()), $input.trigger("setvalue");
                        }
                    },
                    getFrontValue: function (mask, buffer, opts) {
                        for (var start = 0, length = 0, i = 0; i < mask.length && "2" !== mask.charAt(i); i++) {
                            var definition = opts.definitions[mask.charAt(i)];
                            definition ? (start += length, length = definition.cardinality) : length++;
                        }
                        return buffer.join("").substr(start, length);
                    },
                    postValidation: function (buffer, currentResult, opts) {
                        var dayMonthValue,
                            year,
                            bufferStr = buffer.join("");
                        return 0 === opts.mask.indexOf("y") ? (year = bufferStr.substr(0, 4), dayMonthValue = bufferStr.substring(4, 10)) : (year = bufferStr.substring(6, 10), dayMonthValue = bufferStr.substr(0, 6)), currentResult && (dayMonthValue !== opts.leapday || isLeapYear(year));
                    },
                    definitions: {
                        "1": {
                            validator: function (chrs, maskset, pos, strict, opts) {
                                if ("3" == chrs.charAt(0)) {
                                    if (new RegExp("[2-9]").test(chrs.charAt(1))) return chrs = "30", maskset.buffer[pos] = "0", pos++, {
                                        pos: pos
                                    };
                                }
                                var isValid = opts.regex.val1.test(chrs);
                                return strict || isValid || chrs.charAt(1) !== opts.separator && -1 === "-./".indexOf(chrs.charAt(1)) || !(isValid = opts.regex.val1.test("0" + chrs.charAt(0))) ? isValid : (maskset.buffer[pos - 1] = "0", {
                                    refreshFromBuffer: {
                                        start: pos - 1,
                                        end: pos
                                    },
                                    pos: pos,
                                    c: chrs.charAt(0)
                                });
                            },
                            cardinality: 2,
                            prevalidator: [{
                                validator: function (chrs, maskset, pos, strict, opts) {
                                    var pchrs = chrs;
                                    isNaN(maskset.buffer[pos + 1]) || (pchrs += maskset.buffer[pos + 1]);
                                    var isValid = 1 === pchrs.length ? opts.regex.val1pre.test(pchrs) : opts.regex.val1.test(pchrs);
                                    if (!strict && !isValid) {
                                        if (isValid = opts.regex.val1.test(chrs + "0")) return maskset.buffer[pos] = chrs, maskset.buffer[++pos] = "0", {
                                            pos: pos,
                                            c: "0"
                                        };
                                        if (isValid = opts.regex.val1.test("0" + chrs)) return maskset.buffer[pos] = "0", pos++, {
                                            pos: pos
                                        };
                                    }
                                    return isValid;
                                },
                                cardinality: 1
                            }]
                        },
                        "2": {
                            validator: function (chrs, maskset, pos, strict, opts) {
                                var frontValue = opts.getFrontValue(maskset.mask, maskset.buffer, opts);
                                if (-1 !== frontValue.indexOf(opts.placeholder[0]) && (frontValue = "01" + opts.separator), "1" == chrs.charAt(0)) {
                                    if (new RegExp("[3-9]").test(chrs.charAt(1))) return chrs = "10", maskset.buffer[pos] = "0", pos++, {
                                        pos: pos
                                    };
                                }
                                var isValid = opts.regex.val2(opts.separator).test(frontValue + chrs);
                                return strict || isValid || chrs.charAt(1) !== opts.separator && -1 === "-./".indexOf(chrs.charAt(1)) || !(isValid = opts.regex.val2(opts.separator).test(frontValue + "0" + chrs.charAt(0))) ? isValid : (maskset.buffer[pos - 1] = "0", {
                                    refreshFromBuffer: {
                                        start: pos - 1,
                                        end: pos
                                    },
                                    pos: pos,
                                    c: chrs.charAt(0)
                                });
                            },
                            cardinality: 2,
                            prevalidator: [{
                                validator: function (chrs, maskset, pos, strict, opts) {
                                    isNaN(maskset.buffer[pos + 1]) || (chrs += maskset.buffer[pos + 1]);
                                    var frontValue = opts.getFrontValue(maskset.mask, maskset.buffer, opts);
                                    -1 !== frontValue.indexOf(opts.placeholder[0]) && (frontValue = "01" + opts.separator);
                                    var isValid = 1 === chrs.length ? opts.regex.val2pre(opts.separator).test(frontValue + chrs) : opts.regex.val2(opts.separator).test(frontValue + chrs);
                                    return strict || isValid || !(isValid = opts.regex.val2(opts.separator).test(frontValue + "0" + chrs)) ? isValid : (maskset.buffer[pos] = "0", pos++, {
                                        pos: pos
                                    });
                                },
                                cardinality: 1
                            }]
                        },
                        y: {
                            validator: function (chrs, maskset, pos, strict, opts) {
                                return opts.isInYearRange(chrs, opts.yearrange.minyear, opts.yearrange.maxyear);
                            },
                            cardinality: 4,
                            prevalidator: [{
                                validator: function (chrs, maskset, pos, strict, opts) {
                                    var isValid = opts.isInYearRange(chrs, opts.yearrange.minyear, opts.yearrange.maxyear);
                                    if (!strict && !isValid) {
                                        var yearPrefix = opts.determinebaseyear(opts.yearrange.minyear, opts.yearrange.maxyear, chrs + "0").toString().slice(0, 1);
                                        if (isValid = opts.isInYearRange(yearPrefix + chrs, opts.yearrange.minyear, opts.yearrange.maxyear)) return maskset.buffer[pos++] = yearPrefix.charAt(0), {
                                            pos: pos
                                        };
                                        if (yearPrefix = opts.determinebaseyear(opts.yearrange.minyear, opts.yearrange.maxyear, chrs + "0").toString().slice(0, 2), isValid = opts.isInYearRange(yearPrefix + chrs, opts.yearrange.minyear, opts.yearrange.maxyear)) return maskset.buffer[pos++] = yearPrefix.charAt(0), maskset.buffer[pos++] = yearPrefix.charAt(1), {
                                            pos: pos
                                        };
                                    }
                                    return isValid;
                                },
                                cardinality: 1
                            }, {
                                validator: function (chrs, maskset, pos, strict, opts) {
                                    var isValid = opts.isInYearRange(chrs, opts.yearrange.minyear, opts.yearrange.maxyear);
                                    if (!strict && !isValid) {
                                        var yearPrefix = opts.determinebaseyear(opts.yearrange.minyear, opts.yearrange.maxyear, chrs).toString().slice(0, 2);
                                        if (isValid = opts.isInYearRange(chrs[0] + yearPrefix[1] + chrs[1], opts.yearrange.minyear, opts.yearrange.maxyear)) return maskset.buffer[pos++] = yearPrefix.charAt(1), {
                                            pos: pos
                                        };
                                        if (yearPrefix = opts.determinebaseyear(opts.yearrange.minyear, opts.yearrange.maxyear, chrs).toString().slice(0, 2), isValid = opts.isInYearRange(yearPrefix + chrs, opts.yearrange.minyear, opts.yearrange.maxyear)) return maskset.buffer[pos - 1] = yearPrefix.charAt(0), maskset.buffer[pos++] = yearPrefix.charAt(1), maskset.buffer[pos++] = chrs.charAt(0), {
                                            refreshFromBuffer: {
                                                start: pos - 3,
                                                end: pos
                                            },
                                            pos: pos
                                        };
                                    }
                                    return isValid;
                                },
                                cardinality: 2
                            }, {
                                validator: function (chrs, maskset, pos, strict, opts) {
                                    return opts.isInYearRange(chrs, opts.yearrange.minyear, opts.yearrange.maxyear);
                                },
                                cardinality: 3
                            }]
                        }
                    },
                    insertMode: !1,
                    autoUnmask: !1
                },
                "mm/dd/yyyy": {
                    placeholder: "mm/dd/yyyy",
                    alias: "dd/mm/yyyy",
                    regex: {
                        val2pre: function (separator) {
                            var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
                            return new RegExp("((0[13-9]|1[012])" + escapedSeparator + "[0-3])|(02" + escapedSeparator + "[0-2])");
                        },
                        val2: function (separator) {
                            var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
                            return new RegExp("((0[1-9]|1[012])" + escapedSeparator + "(0[1-9]|[12][0-9]))|((0[13-9]|1[012])" + escapedSeparator + "30)|((0[13578]|1[02])" + escapedSeparator + "31)");
                        },
                        val1pre: new RegExp("[01]"),
                        val1: new RegExp("0[1-9]|1[012]")
                    },
                    leapday: "02/29/",
                    onKeyDown: function (e, buffer, caretPos, opts) {
                        var $input = $(this);
                        if (e.ctrlKey && e.keyCode === Inputmask.keyCode.RIGHT) {
                            var today = new Date();
                            $input.val((today.getMonth() + 1).toString() + today.getDate().toString() + today.getFullYear().toString()), $input.trigger("setvalue");
                        }
                    }
                },
                "yyyy/mm/dd": {
                    mask: "y/1/2",
                    placeholder: "yyyy/mm/dd",
                    alias: "mm/dd/yyyy",
                    leapday: "/02/29",
                    onKeyDown: function (e, buffer, caretPos, opts) {
                        var $input = $(this);
                        if (e.ctrlKey && e.keyCode === Inputmask.keyCode.RIGHT) {
                            var today = new Date();
                            $input.val(today.getFullYear().toString() + (today.getMonth() + 1).toString() + today.getDate().toString()), $input.trigger("setvalue");
                        }
                    }
                },
                "dd.mm.yyyy": {
                    mask: "1.2.y",
                    placeholder: "dd.mm.yyyy",
                    leapday: "29.02.",
                    separator: ".",
                    alias: "dd/mm/yyyy"
                },
                "dd-mm-yyyy": {
                    mask: "1-2-y",
                    placeholder: "dd-mm-yyyy",
                    leapday: "29-02-",
                    separator: "-",
                    alias: "dd/mm/yyyy"
                },
                "mm.dd.yyyy": {
                    mask: "1.2.y",
                    placeholder: "mm.dd.yyyy",
                    leapday: "02.29.",
                    separator: ".",
                    alias: "mm/dd/yyyy"
                },
                "mm-dd-yyyy": {
                    mask: "1-2-y",
                    placeholder: "mm-dd-yyyy",
                    leapday: "02-29-",
                    separator: "-",
                    alias: "mm/dd/yyyy"
                },
                "yyyy.mm.dd": {
                    mask: "y.1.2",
                    placeholder: "yyyy.mm.dd",
                    leapday: ".02.29",
                    separator: ".",
                    alias: "yyyy/mm/dd"
                },
                "yyyy-mm-dd": {
                    mask: "y-1-2",
                    placeholder: "yyyy-mm-dd",
                    leapday: "-02-29",
                    separator: "-",
                    alias: "yyyy/mm/dd"
                },
                datetime: {
                    mask: "1/2/y h:s",
                    placeholder: "dd/mm/yyyy hh:mm",
                    alias: "dd/mm/yyyy",
                    regex: {
                        hrspre: new RegExp("[012]"),
                        hrs24: new RegExp("2[0-4]|1[3-9]"),
                        hrs: new RegExp("[01][0-9]|2[0-4]"),
                        ampm: new RegExp("^[a|p|A|P][m|M]"),
                        mspre: new RegExp("[0-5]"),
                        ms: new RegExp("[0-5][0-9]")
                    },
                    timeseparator: ":",
                    hourFormat: "24",
                    definitions: {
                        h: {
                            validator: function (chrs, maskset, pos, strict, opts) {
                                if ("24" === opts.hourFormat && 24 === parseInt(chrs, 10)) return maskset.buffer[pos - 1] = "0", maskset.buffer[pos] = "0", {
                                    refreshFromBuffer: {
                                        start: pos - 1,
                                        end: pos
                                    },
                                    c: "0"
                                };
                                var isValid = opts.regex.hrs.test(chrs);
                                if (!strict && !isValid && (chrs.charAt(1) === opts.timeseparator || -1 !== "-.:".indexOf(chrs.charAt(1))) && (isValid = opts.regex.hrs.test("0" + chrs.charAt(0)))) return maskset.buffer[pos - 1] = "0", maskset.buffer[pos] = chrs.charAt(0), pos++, {
                                    refreshFromBuffer: {
                                        start: pos - 2,
                                        end: pos
                                    },
                                    pos: pos,
                                    c: opts.timeseparator
                                };
                                if (isValid && "24" !== opts.hourFormat && opts.regex.hrs24.test(chrs)) {
                                    var tmp = parseInt(chrs, 10);
                                    return 24 === tmp ? (maskset.buffer[pos + 5] = "a", maskset.buffer[pos + 6] = "m") : (maskset.buffer[pos + 5] = "p", maskset.buffer[pos + 6] = "m"), tmp -= 12, tmp < 10 ? (maskset.buffer[pos] = tmp.toString(), maskset.buffer[pos - 1] = "0") : (maskset.buffer[pos] = tmp.toString().charAt(1), maskset.buffer[pos - 1] = tmp.toString().charAt(0)), {
                                        refreshFromBuffer: {
                                            start: pos - 1,
                                            end: pos + 6
                                        },
                                        c: maskset.buffer[pos]
                                    };
                                }
                                return isValid;
                            },
                            cardinality: 2,
                            prevalidator: [{
                                validator: function (chrs, maskset, pos, strict, opts) {
                                    var isValid = opts.regex.hrspre.test(chrs);
                                    return strict || isValid || !(isValid = opts.regex.hrs.test("0" + chrs)) ? isValid : (maskset.buffer[pos] = "0", pos++, {
                                        pos: pos
                                    });
                                },
                                cardinality: 1
                            }]
                        },
                        s: {
                            validator: "[0-5][0-9]",
                            cardinality: 2,
                            prevalidator: [{
                                validator: function (chrs, maskset, pos, strict, opts) {
                                    var isValid = opts.regex.mspre.test(chrs);
                                    return strict || isValid || !(isValid = opts.regex.ms.test("0" + chrs)) ? isValid : (maskset.buffer[pos] = "0", pos++, {
                                        pos: pos
                                    });
                                },
                                cardinality: 1
                            }]
                        },
                        t: {
                            validator: function (chrs, maskset, pos, strict, opts) {
                                return opts.regex.ampm.test(chrs + "m");
                            },
                            casing: "lower",
                            cardinality: 1
                        }
                    },
                    insertMode: !1,
                    autoUnmask: !1
                },
                datetime12: {
                    mask: "1/2/y h:s t\\m",
                    placeholder: "dd/mm/yyyy hh:mm xm",
                    alias: "datetime",
                    hourFormat: "12"
                },
                "mm/dd/yyyy hh:mm xm": {
                    mask: "1/2/y h:s t\\m",
                    placeholder: "mm/dd/yyyy hh:mm xm",
                    alias: "datetime12",
                    regex: {
                        val2pre: function (separator) {
                            var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
                            return new RegExp("((0[13-9]|1[012])" + escapedSeparator + "[0-3])|(02" + escapedSeparator + "[0-2])");
                        },
                        val2: function (separator) {
                            var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
                            return new RegExp("((0[1-9]|1[012])" + escapedSeparator + "(0[1-9]|[12][0-9]))|((0[13-9]|1[012])" + escapedSeparator + "30)|((0[13578]|1[02])" + escapedSeparator + "31)");
                        },
                        val1pre: new RegExp("[01]"),
                        val1: new RegExp("0[1-9]|1[012]")
                    },
                    leapday: "02/29/",
                    onKeyDown: function (e, buffer, caretPos, opts) {
                        var $input = $(this);
                        if (e.ctrlKey && e.keyCode === Inputmask.keyCode.RIGHT) {
                            var today = new Date();
                            $input.val((today.getMonth() + 1).toString() + today.getDate().toString() + today.getFullYear().toString()), $input.trigger("setvalue");
                        }
                    }
                },
                "hh:mm t": {
                    mask: "h:s t\\m",
                    placeholder: "hh:mm xm",
                    alias: "datetime",
                    hourFormat: "12"
                },
                "h:s t": {
                    mask: "h:s t\\m",
                    placeholder: "hh:mm xm",
                    alias: "datetime",
                    hourFormat: "12"
                },
                "hh:mm:ss": {
                    mask: "h:s:s",
                    placeholder: "hh:mm:ss",
                    alias: "datetime",
                    autoUnmask: !1
                },
                "hh:mm": {
                    mask: "h:s",
                    placeholder: "hh:mm",
                    alias: "datetime",
                    autoUnmask: !1
                },
                date: {
                    alias: "dd/mm/yyyy"
                },
                "mm/yyyy": {
                    mask: "1/y",
                    placeholder: "mm/yyyy",
                    leapday: "donotuse",
                    separator: "/",
                    alias: "mm/dd/yyyy"
                },
                shamsi: {
                    regex: {
                        val2pre: function (separator) {
                            var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
                            return new RegExp("((0[1-9]|1[012])" + escapedSeparator + "[0-3])");
                        },
                        val2: function (separator) {
                            var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
                            return new RegExp("((0[1-9]|1[012])" + escapedSeparator + "(0[1-9]|[12][0-9]))|((0[1-9]|1[012])" + escapedSeparator + "30)|((0[1-6])" + escapedSeparator + "31)");
                        },
                        val1pre: new RegExp("[01]"),
                        val1: new RegExp("0[1-9]|1[012]")
                    },
                    yearrange: {
                        minyear: 1300,
                        maxyear: 1499
                    },
                    mask: "y/1/2",
                    leapday: "/12/30",
                    placeholder: "yyyy/mm/dd",
                    alias: "mm/dd/yyyy",
                    clearIncomplete: !0
                },
                "yyyy-mm-dd hh:mm:ss": {
                    mask: "y-1-2 h:s:s",
                    placeholder: "yyyy-mm-dd hh:mm:ss",
                    alias: "datetime",
                    separator: "-",
                    leapday: "-02-29",
                    regex: {
                        val2pre: function (separator) {
                            var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
                            return new RegExp("((0[13-9]|1[012])" + escapedSeparator + "[0-3])|(02" + escapedSeparator + "[0-2])");
                        },
                        val2: function (separator) {
                            var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
                            return new RegExp("((0[1-9]|1[012])" + escapedSeparator + "(0[1-9]|[12][0-9]))|((0[13-9]|1[012])" + escapedSeparator + "30)|((0[13578]|1[02])" + escapedSeparator + "31)");
                        },
                        val1pre: new RegExp("[01]"),
                        val1: new RegExp("0[1-9]|1[012]")
                    },
                    onKeyDown: function (e, buffer, caretPos, opts) {}
                }
            }), Inputmask;
        });
    })(this);

    return _retrieveGlobal();
});
System.registerDynamic("npm:inputmask@3.3.8.json", [], true, function() {
  return {
    "main": "index.js",
    "format": "global",
    "meta": {
      "*.json": {
        "format": "json"
      },
      "css/*": {
        "globals": {
          "process": null
        }
      },
      "dist/*": {
        "globals": {
          "process": null
        }
      },
      "index.js": {
        "globals": {
          "process": null
        }
      }
    }
  };
});

System.registerDynamic("npm:inputmask@3.3.8/dist/inputmask/inputmask.extensions.js", [], false, function ($__require, $__exports, $__module) {
    var _retrieveGlobal = System.registry.get("@@global-helpers").prepareGlobal($__module.id, null, {});

    (function ($__global) {
        /*!
        * inputmask.extensions.js
        * https://github.com/RobinHerbots/Inputmask
        * Copyright (c) 2010 - 2017 Robin Herbots
        * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
        * Version: 3.3.8
        */

        !function (factory) {
            "function" == typeof define && define.amd ? define(["./dependencyLibs/inputmask.dependencyLib", "./inputmask"], factory) : "object" == typeof exports ? module.exports = factory(require("./dependencyLibs/inputmask.dependencyLib"), require("./inputmask")) : factory(window.dependencyLib || jQuery, window.Inputmask);
        }(function ($, Inputmask) {
            return Inputmask.extendDefinitions({
                A: {
                    validator: "[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
                    cardinality: 1,
                    casing: "upper"
                },
                "&": {
                    validator: "[0-9A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
                    cardinality: 1,
                    casing: "upper"
                },
                "#": {
                    validator: "[0-9A-Fa-f]",
                    cardinality: 1,
                    casing: "upper"
                }
            }), Inputmask.extendAliases({
                url: {
                    definitions: {
                        i: {
                            validator: ".",
                            cardinality: 1
                        }
                    },
                    mask: "(\\http://)|(\\http\\s://)|(ftp://)|(ftp\\s://)i{+}",
                    insertMode: !1,
                    autoUnmask: !1,
                    inputmode: "url"
                },
                ip: {
                    mask: "i[i[i]].i[i[i]].i[i[i]].i[i[i]]",
                    definitions: {
                        i: {
                            validator: function (chrs, maskset, pos, strict, opts) {
                                return pos - 1 > -1 && "." !== maskset.buffer[pos - 1] ? (chrs = maskset.buffer[pos - 1] + chrs, chrs = pos - 2 > -1 && "." !== maskset.buffer[pos - 2] ? maskset.buffer[pos - 2] + chrs : "0" + chrs) : chrs = "00" + chrs, new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]").test(chrs);
                            },
                            cardinality: 1
                        }
                    },
                    onUnMask: function (maskedValue, unmaskedValue, opts) {
                        return maskedValue;
                    },
                    inputmode: "numeric"
                },
                email: {
                    mask: "*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]",
                    greedy: !1,
                    onBeforePaste: function (pastedValue, opts) {
                        return pastedValue = pastedValue.toLowerCase(), pastedValue.replace("mailto:", "");
                    },
                    definitions: {
                        "*": {
                            validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~-]",
                            cardinality: 1,
                            casing: "lower"
                        },
                        "-": {
                            validator: "[0-9A-Za-z-]",
                            cardinality: 1,
                            casing: "lower"
                        }
                    },
                    onUnMask: function (maskedValue, unmaskedValue, opts) {
                        return maskedValue;
                    },
                    inputmode: "email"
                },
                mac: {
                    mask: "##:##:##:##:##:##"
                },
                vin: {
                    mask: "V{13}9{4}",
                    definitions: {
                        V: {
                            validator: "[A-HJ-NPR-Za-hj-npr-z\\d]",
                            cardinality: 1,
                            casing: "upper"
                        }
                    },
                    clearIncomplete: !0,
                    autoUnmask: !0
                }
            }), Inputmask;
        });
    })(this);

    return _retrieveGlobal();
});
System.registerDynamic("reactiveadmintemplate/scripts/modules/form/input-mask.js", ["inputmask/dist/inputmask/inputmask", "inputmask/dist/inputmask/jquery.inputmask", "inputmask/dist/inputmask/inputmask.date.extensions", "inputmask/dist/inputmask/inputmask.extensions"], true, function ($__require, exports, module) {
    'use strict';

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    /*!
     * @version: 1.1.2
     * @name: input-mask
     *
     * @author: https://themeforest.net/user/flexlayers
     */
    $__require("inputmask/dist/inputmask/inputmask");
    $__require("inputmask/dist/inputmask/jquery.inputmask");
    $__require("inputmask/dist/inputmask/inputmask.date.extensions");
    $__require("inputmask/dist/inputmask/inputmask.extensions");
    $(function () {
        ////////////////////////
        // Input Mask
        $('input.tax-mask').inputmask('99-9999999', { 'onincomplete': triggerMaskIncomplete, oncomplete: triggerMaskComplete });
        $('input.phone-mask').inputmask('(999) 999-9999', { 'onincomplete': triggerMaskIncomplete, oncomplete: triggerMaskComplete });
        $('input.dynamic-mask').inputmask('9-a{1,3}9{1,3}', { 'onincomplete': triggerMaskIncomplete, oncomplete: triggerMaskComplete });
        $('input.optional-mask').inputmask('999[-999]', { 'onincomplete': triggerMaskIncomplete, oncomplete: triggerMaskComplete });
        $('input.alternator-mask').inputmask('(999)|(aaa)', { 'onincomplete': triggerMaskIncomplete, oncomplete: triggerMaskComplete });
        $('input.date-mask').inputmask('dd/mm/yyyy', { 'onincomplete': triggerMaskIncomplete, oncomplete: triggerMaskComplete });
        $('input.date-time-mask').inputmask('mm/dd/yyyy hh:mm xm', { 'onincomplete': triggerMaskIncomplete, oncomplete: triggerMaskComplete });
        $('input.url-mask').inputmask('url', { 'onincomplete': triggerMaskIncomplete, oncomplete: triggerMaskComplete });
        $('input.ip-mask').inputmask('ip', { 'onincomplete': triggerMaskIncomplete, oncomplete: triggerMaskComplete });
        $('input.email-mask').inputmask('email', { 'onincomplete': triggerMaskIncomplete, oncomplete: triggerMaskComplete });
        $('input.mac-mask').inputmask('mac', { 'onincomplete': triggerMaskIncomplete, oncomplete: triggerMaskComplete });
        $('input.vin-mask').inputmask('vin', { 'onincomplete': triggerMaskIncomplete, oncomplete: triggerMaskComplete });
        $('input.currency-mask').inputmask('$ 999,9 .99', { 'onincomplete': triggerMaskIncomplete, oncomplete: triggerMaskComplete });
        function triggerMaskIncomplete() {
            var $parent = $(this).parents('.form-group');
            if (!$parent.hasClass('has-danger')) {
                $(this).addClass('form-control-danger');
                $parent.addClass('has-danger');
                $('<div class="form-control-feedback mt-1 d-inline-block">Input is Incomplete</div>').appendTo($parent).css('opacity', 0).addClass('transition drop in');
            }
        }
        function triggerMaskComplete() {
            var $parent = $(this).parents('.form-group');
            if ($parent.hasClass('has-danger')) {
                $(this).removeClass('form-control-danger');
                $parent.removeClass('has-danger').find('div.form-control-feedback').remove();
            }
        }
        // End Input Mask
    });
});
/*!
 * @version: 1.1.2
 * @name: Adapted editor plugin
 *
 * @author: https://themeforest.net/user/flexlayers
 */
/**
 * Super simple wysiwyg editor v0.8.6
 * http://summernote.org/
 *
 * summernote.js
 * Copyright 2013- Alan Hong. and other contributors
 * summernote may be freely distributed under the MIT license./
 *
 * Date: 2017-07-16T16:33Z
 */
(function (factory) {
    /* global define */
    if ('function' === 'function' && true) {
        // AMD. Register as an anonymous module.
        System.registerDynamic('reactiveadmintemplate/scripts/modules/form/editor/summernote.js', ['jquery'], false, function ($__require, $__exports, $__module) {
            if (typeof factory === 'function') {
                return factory.call(this, $__require('jquery'));
            } else {
                return factory;
            }
        });
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(window.jQuery);
    }
})(function ($) {
    'use strict';

    /**
     * @class core.func
     *
     * func utils (for high-order func's arg)
     *
     * @singleton
     * @alternateClassName func
     */

    var func = function () {
        var eq = function (itemA) {
            return function (itemB) {
                return itemA === itemB;
            };
        };

        var eq2 = function (itemA, itemB) {
            return itemA === itemB;
        };

        var peq2 = function (propName) {
            return function (itemA, itemB) {
                return itemA[propName] === itemB[propName];
            };
        };

        var ok = function () {
            return true;
        };

        var fail = function () {
            return false;
        };

        var not = function (f) {
            return function () {
                return !f.apply(f, arguments);
            };
        };

        var and = function (fA, fB) {
            return function (item) {
                return fA(item) && fB(item);
            };
        };

        var self = function (a) {
            return a;
        };

        var invoke = function (obj, method) {
            return function () {
                return obj[method].apply(obj, arguments);
            };
        };

        var idCounter = 0;

        /**
         * generate a globally-unique id
         *
         * @param {String} [prefix]
         */
        var uniqueId = function (prefix) {
            var id = ++idCounter + '';
            return prefix ? prefix + id : id;
        };

        /**
         * returns bnd (bounds) from rect
         *
         * - IE Compatibility Issue: http://goo.gl/sRLOAo
         * - Scroll Issue: http://goo.gl/sNjUc
         *
         * @param {Rect} rect
         * @return {Object} bounds
         * @return {Number} bounds.top
         * @return {Number} bounds.left
         * @return {Number} bounds.width
         * @return {Number} bounds.height
         */
        var rect2bnd = function (rect) {
            var $document = $(document);
            return {
                top: rect.top + $document.scrollTop(),
                left: rect.left + $document.scrollLeft(),
                width: rect.right - rect.left,
                height: rect.bottom - rect.top
            };
        };

        /**
         * returns a copy of the object where the keys have become the values and the values the keys.
         * @param {Object} obj
         * @return {Object}
         */
        var invertObject = function (obj) {
            var inverted = {};
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    inverted[obj[key]] = key;
                }
            }
            return inverted;
        };

        /**
         * @param {String} namespace
         * @param {String} [prefix]
         * @return {String}
         */
        var namespaceToCamel = function (namespace, prefix) {
            prefix = prefix || '';
            return prefix + namespace.split('.').map(function (name) {
                return name.substring(0, 1).toUpperCase() + name.substring(1);
            }).join('');
        };

        /**
         * Returns a function, that, as long as it continues to be invoked, will not
         * be triggered. The function will be called after it stops being called for
         * N milliseconds. If `immediate` is passed, trigger the function on the
         * leading edge, instead of the trailing.
         * @param {Function} func
         * @param {Number} wait
         * @param {Boolean} immediate
         * @return {Function}
         */
        var debounce = function (func, wait, immediate) {
            var timeout;
            return function () {
                var context = this,
                    args = arguments;
                var later = function () {
                    timeout = null;
                    if (!immediate) {
                        func.apply(context, args);
                    }
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) {
                    func.apply(context, args);
                }
            };
        };

        return {
            eq: eq,
            eq2: eq2,
            peq2: peq2,
            ok: ok,
            fail: fail,
            self: self,
            not: not,
            and: and,
            invoke: invoke,
            uniqueId: uniqueId,
            rect2bnd: rect2bnd,
            invertObject: invertObject,
            namespaceToCamel: namespaceToCamel,
            debounce: debounce
        };
    }();

    /**
     * @class core.list
     *
     * list utils
     *
     * @singleton
     * @alternateClassName list
     */
    var list = function () {
        /**
         * returns the first item of an array.
         *
         * @param {Array} array
         */
        var head = function (array) {
            return array[0];
        };

        /**
         * returns the last item of an array.
         *
         * @param {Array} array
         */
        var last = function (array) {
            return array[array.length - 1];
        };

        /**
         * returns everything but the last entry of the array.
         *
         * @param {Array} array
         */
        var initial = function (array) {
            return array.slice(0, array.length - 1);
        };

        /**
         * returns the rest of the items in an array.
         *
         * @param {Array} array
         */
        var tail = function (array) {
            return array.slice(1);
        };

        /**
         * returns item of array
         */
        var find = function (array, pred) {
            for (var idx = 0, len = array.length; idx < len; idx++) {
                var item = array[idx];
                if (pred(item)) {
                    return item;
                }
            }
        };

        /**
         * returns true if all of the values in the array pass the predicate truth test.
         */
        var all = function (array, pred) {
            for (var idx = 0, len = array.length; idx < len; idx++) {
                if (!pred(array[idx])) {
                    return false;
                }
            }
            return true;
        };

        /**
         * returns index of item
         */
        var indexOf = function (array, item) {
            return $.inArray(item, array);
        };

        /**
         * returns true if the value is present in the list.
         */
        var contains = function (array, item) {
            return indexOf(array, item) !== -1;
        };

        /**
         * get sum from a list
         *
         * @param {Array} array - array
         * @param {Function} fn - iterator
         */
        var sum = function (array, fn) {
            fn = fn || func.self;
            return array.reduce(function (memo, v) {
                return memo + fn(v);
            }, 0);
        };

        /**
         * returns a copy of the collection with array type.
         * @param {Collection} collection - collection eg) node.childNodes, ...
         */
        var from = function (collection) {
            var result = [],
                idx = -1,
                length = collection.length;
            while (++idx < length) {
                result[idx] = collection[idx];
            }
            return result;
        };

        /**
         * returns whether list is empty or not
         */
        var isEmpty = function (array) {
            return !array || !array.length;
        };

        /**
         * cluster elements by predicate function.
         *
         * @param {Array} array - array
         * @param {Function} fn - predicate function for cluster rule
         * @param {Array[]}
         */
        var clusterBy = function (array, fn) {
            if (!array.length) {
                return [];
            }
            var aTail = tail(array);
            return aTail.reduce(function (memo, v) {
                var aLast = last(memo);
                if (fn(last(aLast), v)) {
                    aLast[aLast.length] = v;
                } else {
                    memo[memo.length] = [v];
                }
                return memo;
            }, [[head(array)]]);
        };

        /**
         * returns a copy of the array with all false values removed
         *
         * @param {Array} array - array
         * @param {Function} fn - predicate function for cluster rule
         */
        var compact = function (array) {
            var aResult = [];
            for (var idx = 0, len = array.length; idx < len; idx++) {
                if (array[idx]) {
                    aResult.push(array[idx]);
                }
            }
            return aResult;
        };

        /**
         * produces a duplicate-free version of the array
         *
         * @param {Array} array
         */
        var unique = function (array) {
            var results = [];

            for (var idx = 0, len = array.length; idx < len; idx++) {
                if (!contains(results, array[idx])) {
                    results.push(array[idx]);
                }
            }

            return results;
        };

        /**
         * returns next item.
         * @param {Array} array
         */
        var next = function (array, item) {
            var idx = indexOf(array, item);
            if (idx === -1) {
                return null;
            }

            return array[idx + 1];
        };

        /**
         * returns prev item.
         * @param {Array} array
         */
        var prev = function (array, item) {
            var idx = indexOf(array, item);
            if (idx === -1) {
                return null;
            }

            return array[idx - 1];
        };

        return {
            head: head, last: last, initial: initial, tail: tail,
            prev: prev, next: next, find: find, contains: contains,
            all: all, sum: sum, from: from, isEmpty: isEmpty,
            clusterBy: clusterBy, compact: compact, unique: unique
        };
    }();

    var isSupportAmd = 'function' === 'function' && true;

    /**
     * returns whether font is installed or not.
     *
     * @param {String} fontName
     * @return {Boolean}
     */
    var isFontInstalled = function (fontName) {
        var testFontName = fontName === 'Comic Sans MS' ? 'Courier New' : 'Comic Sans MS';
        var $tester = $('<div>').css({
            position: 'absolute',
            left: '-9999px',
            top: '-9999px',
            fontSize: '200px'
        }).text('mmmmmmmmmwwwwwww').appendTo(document.body);

        var originalWidth = $tester.css('fontFamily', testFontName).width();
        var width = $tester.css('fontFamily', fontName + ',' + testFontName).width();

        $tester.remove();

        return originalWidth !== width;
    };

    var userAgent = navigator.userAgent;
    var isMSIE = /MSIE|Trident/i.test(userAgent);
    var browserVersion;
    if (isMSIE) {
        var matches = /MSIE (\d+[.]\d+)/.exec(userAgent);
        if (matches) {
            browserVersion = parseFloat(matches[1]);
        }
        matches = /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(userAgent);
        if (matches) {
            browserVersion = parseFloat(matches[1]);
        }
    }

    var isEdge = /Edge\/\d+/.test(userAgent);

    var hasCodeMirror = !!window.CodeMirror;
    if (!hasCodeMirror && isSupportAmd && typeof require !== 'undefined') {
        if (typeof require.resolve !== 'undefined') {
            try {
                // If CodeMirror can't be resolved, `require.resolve` will throw an
                // exception and `hasCodeMirror` won't be set to `true`.
                require.resolve('codemirror');
                hasCodeMirror = true;
            } catch (e) {
                // Do nothing.
            }
        } else if (typeof eval('require').specified !== 'undefined') {
            hasCodeMirror = eval('require').specified('codemirror');
        }
    }

    /**
     * @class core.agent
     *
     * Object which check platform and agent
     *
     * @singleton
     * @alternateClassName agent
     */
    var agent = {
        isMac: navigator.appVersion.indexOf('Mac') > -1,
        isMSIE: isMSIE,
        isEdge: isEdge,
        isFF: !isEdge && /firefox/i.test(userAgent),
        isPhantom: /PhantomJS/i.test(userAgent),
        isWebkit: !isEdge && /webkit/i.test(userAgent),
        isChrome: !isEdge && /chrome/i.test(userAgent),
        isSafari: !isEdge && /safari/i.test(userAgent),
        browserVersion: browserVersion,
        jqueryVersion: parseFloat($.fn.jquery),
        isSupportAmd: isSupportAmd,
        hasCodeMirror: hasCodeMirror,
        isFontInstalled: isFontInstalled,
        isW3CRangeSupport: !!document.createRange
    };

    var NBSP_CHAR = String.fromCharCode(160);
    var ZERO_WIDTH_NBSP_CHAR = '\ufeff';

    /**
     * @class core.dom
     *
     * Dom functions
     *
     * @singleton
     * @alternateClassName dom
     */
    var dom = function () {
        /**
         * @method isEditable
         *
         * returns whether node is `note-editable` or not.
         *
         * @param {Node} node
         * @return {Boolean}
         */
        var isEditable = function (node) {
            return node && $(node).hasClass('note-editable');
        };

        /**
         * @method isControlSizing
         *
         * returns whether node is `note-control-sizing` or not.
         *
         * @param {Node} node
         * @return {Boolean}
         */
        var isControlSizing = function (node) {
            return node && $(node).hasClass('note-control-sizing');
        };

        /**
         * @method makePredByNodeName
         *
         * returns predicate which judge whether nodeName is same
         *
         * @param {String} nodeName
         * @return {Function}
         */
        var makePredByNodeName = function (nodeName) {
            nodeName = nodeName.toUpperCase();
            return function (node) {
                return node && node.nodeName.toUpperCase() === nodeName;
            };
        };

        /**
         * @method isText
         *
         *
         *
         * @param {Node} node
         * @return {Boolean} true if node's type is text(3)
         */
        var isText = function (node) {
            return node && node.nodeType === 3;
        };

        /**
         * @method isElement
         *
         *
         *
         * @param {Node} node
         * @return {Boolean} true if node's type is element(1)
         */
        var isElement = function (node) {
            return node && node.nodeType === 1;
        };

        /**
         * ex) br, col, embed, hr, img, input, ...
         * @see http://www.w3.org/html/wg/drafts/html/master/syntax.html#void-elements
         */
        var isVoid = function (node) {
            return node && /^BR|^IMG|^HR|^IFRAME|^BUTTON/.test(node.nodeName.toUpperCase());
        };

        var isPara = function (node) {
            if (isEditable(node)) {
                return false;
            }

            // Chrome(v31.0), FF(v25.0.1) use DIV for paragraph
            return node && /^DIV|^P|^LI|^H[1-7]/.test(node.nodeName.toUpperCase());
        };

        var isHeading = function (node) {
            return node && /^H[1-7]/.test(node.nodeName.toUpperCase());
        };

        var isPre = makePredByNodeName('PRE');

        var isLi = makePredByNodeName('LI');

        var isPurePara = function (node) {
            return isPara(node) && !isLi(node);
        };

        var isTable = makePredByNodeName('TABLE');

        var isData = makePredByNodeName('DATA');

        var isInline = function (node) {
            return !isBodyContainer(node) && !isList(node) && !isHr(node) && !isPara(node) && !isTable(node) && !isBlockquote(node) && !isData(node);
        };

        var isList = function (node) {
            return node && /^UL|^OL/.test(node.nodeName.toUpperCase());
        };

        var isHr = makePredByNodeName('HR');

        var isCell = function (node) {
            return node && /^TD|^TH/.test(node.nodeName.toUpperCase());
        };

        var isBlockquote = makePredByNodeName('BLOCKQUOTE');

        var isBodyContainer = function (node) {
            return isCell(node) || isBlockquote(node) || isEditable(node);
        };

        var isAnchor = makePredByNodeName('A');

        var isParaInline = function (node) {
            return isInline(node) && !!ancestor(node, isPara);
        };

        var isBodyInline = function (node) {
            return isInline(node) && !ancestor(node, isPara);
        };

        var isBody = makePredByNodeName('BODY');

        /**
         * returns whether nodeB is closest sibling of nodeA
         *
         * @param {Node} nodeA
         * @param {Node} nodeB
         * @return {Boolean}
         */
        var isClosestSibling = function (nodeA, nodeB) {
            return nodeA.nextSibling === nodeB || nodeA.previousSibling === nodeB;
        };

        /**
         * returns array of closest siblings with node
         *
         * @param {Node} node
         * @param {function} [pred] - predicate function
         * @return {Node[]}
         */
        var withClosestSiblings = function (node, pred) {
            pred = pred || func.ok;

            var siblings = [];
            if (node.previousSibling && pred(node.previousSibling)) {
                siblings.push(node.previousSibling);
            }
            siblings.push(node);
            if (node.nextSibling && pred(node.nextSibling)) {
                siblings.push(node.nextSibling);
            }
            return siblings;
        };

        /**
         * blank HTML for cursor position
         * - [workaround] old IE only works with &nbsp;
         * - [workaround] IE11 and other browser works with bogus br
         */
        var blankHTML = agent.isMSIE && agent.browserVersion < 11 ? '&nbsp;' : '<br>';

        /**
         * @method nodeLength
         *
         * returns #text's text size or element's childNodes size
         *
         * @param {Node} node
         */
        var nodeLength = function (node) {
            if (isText(node)) {
                return node.nodeValue.length;
            }

            if (node) {
                return node.childNodes.length;
            }

            return 0;
        };

        /**
         * returns whether node is empty or not.
         *
         * @param {Node} node
         * @return {Boolean}
         */
        var isEmpty = function (node) {
            var len = nodeLength(node);

            if (len === 0) {
                return true;
            } else if (!isText(node) && len === 1 && node.innerHTML === blankHTML) {
                // ex) <p><br></p>, <span><br></span>
                return true;
            } else if (list.all(node.childNodes, isText) && node.innerHTML === '') {
                // ex) <p></p>, <span></span>
                return true;
            }

            return false;
        };

        /**
         * padding blankHTML if node is empty (for cursor position)
         */
        var paddingBlankHTML = function (node) {
            if (!isVoid(node) && !nodeLength(node)) {
                node.innerHTML = blankHTML;
            }
        };

        /**
         * find nearest ancestor predicate hit
         *
         * @param {Node} node
         * @param {Function} pred - predicate function
         */
        var ancestor = function (node, pred) {
            while (node) {
                if (pred(node)) {
                    return node;
                }
                if (isEditable(node)) {
                    break;
                }

                node = node.parentNode;
            }
            return null;
        };

        /**
         * find nearest ancestor only single child blood line and predicate hit
         *
         * @param {Node} node
         * @param {Function} pred - predicate function
         */
        var singleChildAncestor = function (node, pred) {
            node = node.parentNode;

            while (node) {
                if (nodeLength(node) !== 1) {
                    break;
                }
                if (pred(node)) {
                    return node;
                }
                if (isEditable(node)) {
                    break;
                }

                node = node.parentNode;
            }
            return null;
        };

        /**
         * returns new array of ancestor nodes (until predicate hit).
         *
         * @param {Node} node
         * @param {Function} [optional] pred - predicate function
         */
        var listAncestor = function (node, pred) {
            pred = pred || func.fail;

            var ancestors = [];
            ancestor(node, function (el) {
                if (!isEditable(el)) {
                    ancestors.push(el);
                }

                return pred(el);
            });
            return ancestors;
        };

        /**
         * find farthest ancestor predicate hit
         */
        var lastAncestor = function (node, pred) {
            var ancestors = listAncestor(node);
            return list.last(ancestors.filter(pred));
        };

        /**
         * returns common ancestor node between two nodes.
         *
         * @param {Node} nodeA
         * @param {Node} nodeB
         */
        var commonAncestor = function (nodeA, nodeB) {
            var ancestors = listAncestor(nodeA);
            for (var n = nodeB; n; n = n.parentNode) {
                if ($.inArray(n, ancestors) > -1) {
                    return n;
                }
            }
            return null; // difference document area
        };

        /**
         * listing all previous siblings (until predicate hit).
         *
         * @param {Node} node
         * @param {Function} [optional] pred - predicate function
         */
        var listPrev = function (node, pred) {
            pred = pred || func.fail;

            var nodes = [];
            while (node) {
                if (pred(node)) {
                    break;
                }
                nodes.push(node);
                node = node.previousSibling;
            }
            return nodes;
        };

        /**
         * listing next siblings (until predicate hit).
         *
         * @param {Node} node
         * @param {Function} [pred] - predicate function
         */
        var listNext = function (node, pred) {
            pred = pred || func.fail;

            var nodes = [];
            while (node) {
                if (pred(node)) {
                    break;
                }
                nodes.push(node);
                node = node.nextSibling;
            }
            return nodes;
        };

        /**
         * listing descendant nodes
         *
         * @param {Node} node
         * @param {Function} [pred] - predicate function
         */
        var listDescendant = function (node, pred) {
            var descendants = [];
            pred = pred || func.ok;

            // start DFS(depth first search) with node
            (function fnWalk(current) {
                if (node !== current && pred(current)) {
                    descendants.push(current);
                }
                for (var idx = 0, len = current.childNodes.length; idx < len; idx++) {
                    fnWalk(current.childNodes[idx]);
                }
            })(node);

            return descendants;
        };

        /**
         * wrap node with new tag.
         *
         * @param {Node} node
         * @param {Node} tagName of wrapper
         * @return {Node} - wrapper
         */
        var wrap = function (node, wrapperName) {
            var parent = node.parentNode;
            var wrapper = $('<' + wrapperName + '>')[0];

            parent.insertBefore(wrapper, node);
            wrapper.appendChild(node);

            return wrapper;
        };

        /**
         * insert node after preceding
         *
         * @param {Node} node
         * @param {Node} preceding - predicate function
         */
        var insertAfter = function (node, preceding) {
            var next = preceding.nextSibling,
                parent = preceding.parentNode;
            if (next) {
                parent.insertBefore(node, next);
            } else {
                parent.appendChild(node);
            }
            return node;
        };

        /**
         * append elements.
         *
         * @param {Node} node
         * @param {Collection} aChild
         */
        var appendChildNodes = function (node, aChild) {
            $.each(aChild, function (idx, child) {
                node.appendChild(child);
            });
            return node;
        };

        /**
         * returns whether boundaryPoint is left edge or not.
         *
         * @param {BoundaryPoint} point
         * @return {Boolean}
         */
        var isLeftEdgePoint = function (point) {
            return point.offset === 0;
        };

        /**
         * returns whether boundaryPoint is right edge or not.
         *
         * @param {BoundaryPoint} point
         * @return {Boolean}
         */
        var isRightEdgePoint = function (point) {
            return point.offset === nodeLength(point.node);
        };

        /**
         * returns whether boundaryPoint is edge or not.
         *
         * @param {BoundaryPoint} point
         * @return {Boolean}
         */
        var isEdgePoint = function (point) {
            return isLeftEdgePoint(point) || isRightEdgePoint(point);
        };

        /**
         * returns whether node is left edge of ancestor or not.
         *
         * @param {Node} node
         * @param {Node} ancestor
         * @return {Boolean}
         */
        var isLeftEdgeOf = function (node, ancestor) {
            while (node && node !== ancestor) {
                if (position(node) !== 0) {
                    return false;
                }
                node = node.parentNode;
            }

            return true;
        };

        /**
         * returns whether node is right edge of ancestor or not.
         *
         * @param {Node} node
         * @param {Node} ancestor
         * @return {Boolean}
         */
        var isRightEdgeOf = function (node, ancestor) {
            if (!ancestor) {
                return false;
            }
            while (node && node !== ancestor) {
                if (position(node) !== nodeLength(node.parentNode) - 1) {
                    return false;
                }
                node = node.parentNode;
            }

            return true;
        };

        /**
         * returns whether point is left edge of ancestor or not.
         * @param {BoundaryPoint} point
         * @param {Node} ancestor
         * @return {Boolean}
         */
        var isLeftEdgePointOf = function (point, ancestor) {
            return isLeftEdgePoint(point) && isLeftEdgeOf(point.node, ancestor);
        };

        /**
         * returns whether point is right edge of ancestor or not.
         * @param {BoundaryPoint} point
         * @param {Node} ancestor
         * @return {Boolean}
         */
        var isRightEdgePointOf = function (point, ancestor) {
            return isRightEdgePoint(point) && isRightEdgeOf(point.node, ancestor);
        };

        /**
         * returns offset from parent.
         *
         * @param {Node} node
         */
        var position = function (node) {
            var offset = 0;
            while (node = node.previousSibling) {
                offset += 1;
            }
            return offset;
        };

        var hasChildren = function (node) {
            return !!(node && node.childNodes && node.childNodes.length);
        };

        /**
         * returns previous boundaryPoint
         *
         * @param {BoundaryPoint} point
         * @param {Boolean} isSkipInnerOffset
         * @return {BoundaryPoint}
         */
        var prevPoint = function (point, isSkipInnerOffset) {
            var node, offset;

            if (point.offset === 0) {
                if (isEditable(point.node)) {
                    return null;
                }

                node = point.node.parentNode;
                offset = position(point.node);
            } else if (hasChildren(point.node)) {
                node = point.node.childNodes[point.offset - 1];
                offset = nodeLength(node);
            } else {
                node = point.node;
                offset = isSkipInnerOffset ? 0 : point.offset - 1;
            }

            return {
                node: node,
                offset: offset
            };
        };

        /**
         * returns next boundaryPoint
         *
         * @param {BoundaryPoint} point
         * @param {Boolean} isSkipInnerOffset
         * @return {BoundaryPoint}
         */
        var nextPoint = function (point, isSkipInnerOffset) {
            var node, offset;

            if (nodeLength(point.node) === point.offset) {
                if (isEditable(point.node)) {
                    return null;
                }

                node = point.node.parentNode;
                offset = position(point.node) + 1;
            } else if (hasChildren(point.node)) {
                node = point.node.childNodes[point.offset];
                offset = 0;
            } else {
                node = point.node;
                offset = isSkipInnerOffset ? nodeLength(point.node) : point.offset + 1;
            }

            return {
                node: node,
                offset: offset
            };
        };

        /**
         * returns whether pointA and pointB is same or not.
         *
         * @param {BoundaryPoint} pointA
         * @param {BoundaryPoint} pointB
         * @return {Boolean}
         */
        var isSamePoint = function (pointA, pointB) {
            return pointA.node === pointB.node && pointA.offset === pointB.offset;
        };

        /**
         * returns whether point is visible (can set cursor) or not.
         *
         * @param {BoundaryPoint} point
         * @return {Boolean}
         */
        var isVisiblePoint = function (point) {
            if (isText(point.node) || !hasChildren(point.node) || isEmpty(point.node)) {
                return true;
            }

            var leftNode = point.node.childNodes[point.offset - 1];
            var rightNode = point.node.childNodes[point.offset];
            if ((!leftNode || isVoid(leftNode)) && (!rightNode || isVoid(rightNode))) {
                return true;
            }

            return false;
        };

        /**
         * @method prevPointUtil
         *
         * @param {BoundaryPoint} point
         * @param {Function} pred
         * @return {BoundaryPoint}
         */
        var prevPointUntil = function (point, pred) {
            while (point) {
                if (pred(point)) {
                    return point;
                }

                point = prevPoint(point);
            }

            return null;
        };

        /**
         * @method nextPointUntil
         *
         * @param {BoundaryPoint} point
         * @param {Function} pred
         * @return {BoundaryPoint}
         */
        var nextPointUntil = function (point, pred) {
            while (point) {
                if (pred(point)) {
                    return point;
                }

                point = nextPoint(point);
            }

            return null;
        };

        /**
         * returns whether point has character or not.
         *
         * @param {Point} point
         * @return {Boolean}
         */
        var isCharPoint = function (point) {
            if (!isText(point.node)) {
                return false;
            }

            var ch = point.node.nodeValue.charAt(point.offset - 1);
            return ch && ch !== ' ' && ch !== NBSP_CHAR;
        };

        /**
         * @method walkPoint
         *
         * @param {BoundaryPoint} startPoint
         * @param {BoundaryPoint} endPoint
         * @param {Function} handler
         * @param {Boolean} isSkipInnerOffset
         */
        var walkPoint = function (startPoint, endPoint, handler, isSkipInnerOffset) {
            var point = startPoint;

            while (point) {
                handler(point);

                if (isSamePoint(point, endPoint)) {
                    break;
                }

                var isSkipOffset = isSkipInnerOffset && startPoint.node !== point.node && endPoint.node !== point.node;
                point = nextPoint(point, isSkipOffset);
            }
        };

        /**
         * @method makeOffsetPath
         *
         * return offsetPath(array of offset) from ancestor
         *
         * @param {Node} ancestor - ancestor node
         * @param {Node} node
         */
        var makeOffsetPath = function (ancestor, node) {
            var ancestors = listAncestor(node, func.eq(ancestor));
            return ancestors.map(position).reverse();
        };

        /**
         * @method fromOffsetPath
         *
         * return element from offsetPath(array of offset)
         *
         * @param {Node} ancestor - ancestor node
         * @param {array} offsets - offsetPath
         */
        var fromOffsetPath = function (ancestor, offsets) {
            var current = ancestor;
            for (var i = 0, len = offsets.length; i < len; i++) {
                if (current.childNodes.length <= offsets[i]) {
                    current = current.childNodes[current.childNodes.length - 1];
                } else {
                    current = current.childNodes[offsets[i]];
                }
            }
            return current;
        };

        /**
         * @method splitNode
         *
         * split element or #text
         *
         * @param {BoundaryPoint} point
         * @param {Object} [options]
         * @param {Boolean} [options.isSkipPaddingBlankHTML] - default: false
         * @param {Boolean} [options.isNotSplitEdgePoint] - default: false
         * @return {Node} right node of boundaryPoint
         */
        var splitNode = function (point, options) {
            var isSkipPaddingBlankHTML = options && options.isSkipPaddingBlankHTML;
            var isNotSplitEdgePoint = options && options.isNotSplitEdgePoint;

            // edge case
            if (isEdgePoint(point) && (isText(point.node) || isNotSplitEdgePoint)) {
                if (isLeftEdgePoint(point)) {
                    return point.node;
                } else if (isRightEdgePoint(point)) {
                    return point.node.nextSibling;
                }
            }

            // split #text
            if (isText(point.node)) {
                return point.node.splitText(point.offset);
            } else {
                var childNode = point.node.childNodes[point.offset];
                var clone = insertAfter(point.node.cloneNode(false), point.node);
                appendChildNodes(clone, listNext(childNode));

                if (!isSkipPaddingBlankHTML) {
                    paddingBlankHTML(point.node);
                    paddingBlankHTML(clone);
                }

                return clone;
            }
        };

        /**
         * @method splitTree
         *
         * split tree by point
         *
         * @param {Node} root - split root
         * @param {BoundaryPoint} point
         * @param {Object} [options]
         * @param {Boolean} [options.isSkipPaddingBlankHTML] - default: false
         * @param {Boolean} [options.isNotSplitEdgePoint] - default: false
         * @return {Node} right node of boundaryPoint
         */
        var splitTree = function (root, point, options) {
            // ex) [#text, <span>, <p>]
            var ancestors = listAncestor(point.node, func.eq(root));

            if (!ancestors.length) {
                return null;
            } else if (ancestors.length === 1) {
                return splitNode(point, options);
            }

            return ancestors.reduce(function (node, parent) {
                if (node === point.node) {
                    node = splitNode(point, options);
                }

                return splitNode({
                    node: parent,
                    offset: node ? dom.position(node) : nodeLength(parent)
                }, options);
            });
        };

        /**
         * split point
         *
         * @param {Point} point
         * @param {Boolean} isInline
         * @return {Object}
         */
        var splitPoint = function (point, isInline) {
            // find splitRoot, container
            //  - inline: splitRoot is a child of paragraph
            //  - block: splitRoot is a child of bodyContainer
            var pred = isInline ? isPara : isBodyContainer;
            var ancestors = listAncestor(point.node, pred);
            var topAncestor = list.last(ancestors) || point.node;

            var splitRoot, container;
            if (pred(topAncestor)) {
                splitRoot = ancestors[ancestors.length - 2];
                container = topAncestor;
            } else {
                splitRoot = topAncestor;
                container = splitRoot.parentNode;
            }

            // if splitRoot is exists, split with splitTree
            var pivot = splitRoot && splitTree(splitRoot, point, {
                isSkipPaddingBlankHTML: isInline,
                isNotSplitEdgePoint: isInline
            });

            // if container is point.node, find pivot with point.offset
            if (!pivot && container === point.node) {
                pivot = point.node.childNodes[point.offset];
            }

            return {
                rightNode: pivot,
                container: container
            };
        };

        var create = function (nodeName) {
            return document.createElement(nodeName);
        };

        var createText = function (text) {
            return document.createTextNode(text);
        };

        /**
         * @method remove
         *
         * remove node, (isRemoveChild: remove child or not)
         *
         * @param {Node} node
         * @param {Boolean} isRemoveChild
         */
        var remove = function (node, isRemoveChild) {
            if (!node || !node.parentNode) {
                return;
            }
            if (node.removeNode) {
                return node.removeNode(isRemoveChild);
            }

            var parent = node.parentNode;
            if (!isRemoveChild) {
                var nodes = [];
                var i, len;
                for (i = 0, len = node.childNodes.length; i < len; i++) {
                    nodes.push(node.childNodes[i]);
                }

                for (i = 0, len = nodes.length; i < len; i++) {
                    parent.insertBefore(nodes[i], node);
                }
            }

            parent.removeChild(node);
        };

        /**
         * @method removeWhile
         *
         * @param {Node} node
         * @param {Function} pred
         */
        var removeWhile = function (node, pred) {
            while (node) {
                if (isEditable(node) || !pred(node)) {
                    break;
                }

                var parent = node.parentNode;
                remove(node);
                node = parent;
            }
        };

        /**
         * @method replace
         *
         * replace node with provided nodeName
         *
         * @param {Node} node
         * @param {String} nodeName
         * @return {Node} - new node
         */
        var replace = function (node, nodeName) {
            if (node.nodeName.toUpperCase() === nodeName.toUpperCase()) {
                return node;
            }

            var newNode = create(nodeName);

            if (node.style.cssText) {
                newNode.style.cssText = node.style.cssText;
            }

            appendChildNodes(newNode, list.from(node.childNodes));
            insertAfter(newNode, node);
            remove(node);

            return newNode;
        };

        var isTextarea = makePredByNodeName('TEXTAREA');

        /**
         * @param {jQuery} $node
         * @param {Boolean} [stripLinebreaks] - default: false
         */
        var value = function ($node, stripLinebreaks) {
            var val = isTextarea($node[0]) ? $node.val() : $node.html();
            if (stripLinebreaks) {
                return val.replace(/[\n\r]/g, '');
            }
            return val;
        };

        /**
         * @method html
         *
         * get the HTML contents of node
         *
         * @param {jQuery} $node
         * @param {Boolean} [isNewlineOnBlock]
         */
        var html = function ($node, isNewlineOnBlock) {
            var markup = value($node);

            if (isNewlineOnBlock) {
                var regexTag = /<(\/?)(\b(?!!)[^>\s]*)(.*?)(\s*\/?>)/g;
                markup = markup.replace(regexTag, function (match, endSlash, name) {
                    name = name.toUpperCase();
                    var isEndOfInlineContainer = /^DIV|^TD|^TH|^P|^LI|^H[1-7]/.test(name) && !!endSlash;
                    var isBlockNode = /^BLOCKQUOTE|^TABLE|^TBODY|^TR|^HR|^UL|^OL/.test(name);

                    return match + (isEndOfInlineContainer || isBlockNode ? '\n' : '');
                });
                markup = $.trim(markup);
            }

            return markup;
        };

        var posFromPlaceholder = function (placeholder) {
            var $placeholder = $(placeholder);
            var pos = $placeholder.offset();
            var height = $placeholder.outerHeight(true); // include margin

            return {
                left: pos.left,
                top: pos.top + height
            };
        };

        var attachEvents = function ($node, events) {
            Object.keys(events).forEach(function (key) {
                $node.on(key, events[key]);
            });
        };

        var detachEvents = function ($node, events) {
            Object.keys(events).forEach(function (key) {
                $node.off(key, events[key]);
            });
        };

        return {
            /** @property {String} NBSP_CHAR */
            NBSP_CHAR: NBSP_CHAR,
            /** @property {String} ZERO_WIDTH_NBSP_CHAR */
            ZERO_WIDTH_NBSP_CHAR: ZERO_WIDTH_NBSP_CHAR,
            /** @property {String} blank */
            blank: blankHTML,
            /** @property {String} emptyPara */
            emptyPara: '<p>' + blankHTML + '</p>',
            makePredByNodeName: makePredByNodeName,
            isEditable: isEditable,
            isControlSizing: isControlSizing,
            isText: isText,
            isElement: isElement,
            isVoid: isVoid,
            isPara: isPara,
            isPurePara: isPurePara,
            isHeading: isHeading,
            isInline: isInline,
            isBlock: func.not(isInline),
            isBodyInline: isBodyInline,
            isBody: isBody,
            isParaInline: isParaInline,
            isPre: isPre,
            isList: isList,
            isTable: isTable,
            isData: isData,
            isCell: isCell,
            isBlockquote: isBlockquote,
            isBodyContainer: isBodyContainer,
            isAnchor: isAnchor,
            isDiv: makePredByNodeName('DIV'),
            isLi: isLi,
            isBR: makePredByNodeName('BR'),
            isSpan: makePredByNodeName('SPAN'),
            isB: makePredByNodeName('B'),
            isU: makePredByNodeName('U'),
            isS: makePredByNodeName('S'),
            isI: makePredByNodeName('I'),
            isImg: makePredByNodeName('IMG'),
            isTextarea: isTextarea,
            isEmpty: isEmpty,
            isEmptyAnchor: func.and(isAnchor, isEmpty),
            isClosestSibling: isClosestSibling,
            withClosestSiblings: withClosestSiblings,
            nodeLength: nodeLength,
            isLeftEdgePoint: isLeftEdgePoint,
            isRightEdgePoint: isRightEdgePoint,
            isEdgePoint: isEdgePoint,
            isLeftEdgeOf: isLeftEdgeOf,
            isRightEdgeOf: isRightEdgeOf,
            isLeftEdgePointOf: isLeftEdgePointOf,
            isRightEdgePointOf: isRightEdgePointOf,
            prevPoint: prevPoint,
            nextPoint: nextPoint,
            isSamePoint: isSamePoint,
            isVisiblePoint: isVisiblePoint,
            prevPointUntil: prevPointUntil,
            nextPointUntil: nextPointUntil,
            isCharPoint: isCharPoint,
            walkPoint: walkPoint,
            ancestor: ancestor,
            singleChildAncestor: singleChildAncestor,
            listAncestor: listAncestor,
            lastAncestor: lastAncestor,
            listNext: listNext,
            listPrev: listPrev,
            listDescendant: listDescendant,
            commonAncestor: commonAncestor,
            wrap: wrap,
            insertAfter: insertAfter,
            appendChildNodes: appendChildNodes,
            position: position,
            hasChildren: hasChildren,
            makeOffsetPath: makeOffsetPath,
            fromOffsetPath: fromOffsetPath,
            splitTree: splitTree,
            splitPoint: splitPoint,
            create: create,
            createText: createText,
            remove: remove,
            removeWhile: removeWhile,
            replace: replace,
            html: html,
            value: value,
            posFromPlaceholder: posFromPlaceholder,
            attachEvents: attachEvents,
            detachEvents: detachEvents
        };
    }();

    /**
     * @param {jQuery} $note
     * @param {Object} options
     * @return {Context}
     */
    var Context = function ($note, options) {
        var self = this;

        var ui = $.summernote.ui;
        this.memos = {};
        this.modules = {};
        this.layoutInfo = {};
        this.options = options;

        /**
         * create layout and initialize modules and other resources
         */
        this.initialize = function () {
            this.layoutInfo = ui.createLayout($note, options);
            this._initialize();
            $note.hide();
            return this;
        };

        /**
         * destroy modules and other resources and remove layout
         */
        this.destroy = function () {
            this._destroy();
            $note.removeData('summernote');
            ui.removeLayout($note, this.layoutInfo);
        };

        /**
         * destory modules and other resources and initialize it again
         */
        this.reset = function () {
            var disabled = self.isDisabled();
            this.code(dom.emptyPara);
            this._destroy();
            this._initialize();

            if (disabled) {
                self.disable();
            }
        };

        this._initialize = function () {
            // add optional buttons
            var buttons = $.extend({}, this.options.buttons);
            Object.keys(buttons).forEach(function (key) {
                self.memo('button.' + key, buttons[key]);
            });

            var modules = $.extend({}, this.options.modules, $.summernote.plugins || {});

            // add and initialize modules
            Object.keys(modules).forEach(function (key) {
                self.module(key, modules[key], true);
            });

            Object.keys(this.modules).forEach(function (key) {
                self.initializeModule(key);
            });
        };

        this._destroy = function () {
            // destroy modules with reversed order
            Object.keys(this.modules).reverse().forEach(function (key) {
                self.removeModule(key);
            });

            Object.keys(this.memos).forEach(function (key) {
                self.removeMemo(key);
            });
        };

        this.code = function (html) {
            var isActivated = this.invoke('codeview.isActivated');

            if (html === undefined) {
                this.invoke('codeview.sync');
                return isActivated ? this.layoutInfo.codable.val() : this.layoutInfo.editable.html();
            } else {
                if (isActivated) {
                    this.layoutInfo.codable.val(html);
                } else {
                    this.layoutInfo.editable.html(html);
                }
                $note.val(html);
                this.triggerEvent('change', html);
            }
        };

        this.isDisabled = function () {
            return this.layoutInfo.editable.attr('contenteditable') === 'false';
        };

        this.enable = function () {
            this.layoutInfo.editable.attr('contenteditable', true);
            this.invoke('toolbar.activate', true);
        };

        this.disable = function () {
            // close codeview if codeview is opend
            if (this.invoke('codeview.isActivated')) {
                this.invoke('codeview.deactivate');
            }
            this.layoutInfo.editable.attr('contenteditable', false);
            this.invoke('toolbar.deactivate', true);
        };

        this.triggerEvent = function () {
            var namespace = list.head(arguments);
            var args = list.tail(list.from(arguments));

            var callback = this.options.callbacks[func.namespaceToCamel(namespace, 'on')];
            if (callback) {
                callback.apply($note[0], args);
            }
            $note.trigger('summernote.' + namespace, args);
        };

        this.initializeModule = function (key) {
            var module = this.modules[key];
            module.shouldInitialize = module.shouldInitialize || func.ok;
            if (!module.shouldInitialize()) {
                return;
            }

            // initialize module
            if (module.initialize) {
                module.initialize();
            }

            // attach events
            if (module.events) {
                dom.attachEvents($note, module.events);
            }
        };

        this.module = function (key, ModuleClass, withoutIntialize) {
            if (arguments.length === 1) {
                return this.modules[key];
            }

            this.modules[key] = new ModuleClass(this);

            if (!withoutIntialize) {
                this.initializeModule(key);
            }
        };

        this.removeModule = function (key) {
            var module = this.modules[key];
            if (module.shouldInitialize()) {
                if (module.events) {
                    dom.detachEvents($note, module.events);
                }

                if (module.destroy) {
                    module.destroy();
                }
            }

            delete this.modules[key];
        };

        this.memo = function (key, obj) {
            if (arguments.length === 1) {
                return this.memos[key];
            }
            this.memos[key] = obj;
        };

        this.removeMemo = function (key) {
            if (this.memos[key] && this.memos[key].destroy) {
                this.memos[key].destroy();
            }

            delete this.memos[key];
        };

        this.createInvokeHandler = function (namespace, value) {
            return function (event) {
                event.preventDefault();
                self.invoke(namespace, value || $(event.target).closest('[data-value]').data('value'));
            };
        };

        this.invoke = function () {
            var namespace = list.head(arguments);
            var args = list.tail(list.from(arguments));

            var splits = namespace.split('.');
            var hasSeparator = splits.length > 1;
            var moduleName = hasSeparator && list.head(splits);
            var methodName = hasSeparator ? list.last(splits) : list.head(splits);

            var module = this.modules[moduleName || 'editor'];
            if (!moduleName && this[methodName]) {
                return this[methodName].apply(this, args);
            } else if (module && module[methodName] && module.shouldInitialize()) {
                return module[methodName].apply(module, args);
            }
        };

        return this.initialize();
    };

    $.fn.extend({
        /**
         * Summernote API
         *
         * @param {Object|String}
         * @return {this}
         */
        summernote: function () {
            var type = $.type(list.head(arguments));
            var isExternalAPICalled = type === 'string';
            var hasInitOptions = type === 'object';

            var options = hasInitOptions ? list.head(arguments) : {};

            options = $.extend({}, $.summernote.options, options);
            options.langInfo = $.extend(true, {}, $.summernote.lang['en-US'], $.summernote.lang[options.lang]);
            options.icons = $.extend(true, {}, $.summernote.options.icons, options.icons);

            this.each(function (idx, note) {
                var $note = $(note);
                if (!$note.data('summernote')) {
                    var context = new Context($note, options);
                    $note.data('summernote', context);
                    $note.data('summernote').triggerEvent('init', context.layoutInfo);
                }
            });

            var $note = this.first();
            if ($note.length) {
                var context = $note.data('summernote');
                if (isExternalAPICalled) {
                    return context.invoke.apply(context, list.from(arguments));
                } else if (options.focus) {
                    context.invoke('editor.focus');
                }
            }

            return this;
        }
    });

    var Renderer = function (markup, children, options, callback) {
        this.render = function ($parent) {
            var $node = $(markup);

            if (options && options.contents) {
                $node.html(options.contents);
            }

            if (options && options.className) {
                $node.addClass(options.className);
            }

            if (options && options.data) {
                $.each(options.data, function (k, v) {
                    $node.attr('data-' + k, v);
                });
            }

            if (options && options.click) {
                $node.on('click', options.click);
            }

            if (children) {
                var $container = $node.find('.note-children-container');
                children.forEach(function (child) {
                    child.render($container.length ? $container : $node);
                });
            }

            if (callback) {
                callback($node, options);
            }

            if (options && options.callback) {
                options.callback($node);
            }

            if ($parent) {
                $parent.append($node);
            }

            return $node;
        };
    };

    var renderer = {
        create: function (markup, callback) {
            return function () {
                var children = $.isArray(arguments[0]) ? arguments[0] : [];
                var options = typeof arguments[1] === 'object' ? arguments[1] : arguments[0];
                if (options && options.children) {
                    children = options.children;
                }
                return new Renderer(markup, children, options, callback);
            };
        }
    };

    var editor = renderer.create('<div class="note-editor note-frame panel panel-default"/>');
    var toolbar = renderer.create('<div class="note-toolbar panel-heading"/>');
    var editingArea = renderer.create('<div class="note-editing-area"/>');
    var codable = renderer.create('<textarea class="note-codable"/>');
    var editable = renderer.create('<div class="note-editable panel-body form-control" contentEditable="true"/>');
    var statusbar = renderer.create(['<div class="note-statusbar">', '  <div class="note-resizebar">', '    <div class="note-icon-bar"/>', '    <div class="note-icon-bar"/>', '    <div class="note-icon-bar"/>', '  </div>', '</div>'].join(''));

    var airEditor = renderer.create('<div class="note-editor"/>');
    var airEditable = renderer.create('<div class="note-editable" contentEditable="true"/>');

    var buttonGroup = renderer.create('<div class="note-btn-group btn-group">');
    var button = renderer.create('<button type="button" class="note-btn btn btn-default btn-sm" tabindex="-1">', function ($node, options) {
        if (options && options.tooltip) {
            $node.attr({
                title: options.tooltip
            }).tooltip({
                container: 'body',
                trigger: 'hover',
                placement: 'bottom'
            });
        }
    });

    var dropdown = renderer.create('<div class="dropdown-menu">', function ($node, options) {
        var markup = $.isArray(options.items) ? options.items.map(function (item) {
            var value = typeof item === 'string' ? item : item.value || '';
            var content = options.template ? options.template(item) : item;
            return '<li class="dropdown-item"><a href="#" data-value="' + value + '">' + content + '</a></li>';
        }).join('') : options.items;

        $node.html(markup);
    });

    var dropdownCheck = renderer.create('<div class="dropdown-menu note-check">', function ($node, options) {
        var markup = $.isArray(options.items) ? options.items.map(function (item) {
            var value = typeof item === 'string' ? item : item.value || '';
            var content = options.template ? options.template(item) : item;
            return '<li class="dropdown-item"><a href="#" data-value="' + value + '">' + icon(options.checkClassName) + ' ' + content + '</a></li>';
        }).join('') : options.items;
        $node.html(markup);
    });

    var palette = renderer.create('<div class="note-color-palette"/>', function ($node, options) {
        var contents = [];
        for (var row = 0, rowSize = options.colors.length; row < rowSize; row++) {
            var eventName = options.eventName;
            var colors = options.colors[row];
            var buttons = [];
            for (var col = 0, colSize = colors.length; col < colSize; col++) {
                var color = colors[col];
                buttons.push(['<button type="button" class="note-color-btn"', 'style="background-color:', color, '" ', 'data-event="', eventName, '" ', 'data-value="', color, '" ', 'title="', color, '" ', 'data-toggle="button" tabindex="-1"></button>'].join(''));
            }
            contents.push('<div class="note-color-row">' + buttons.join('') + '</div>');
        }
        $node.html(contents.join(''));

        $node.find('.note-color-btn').tooltip({
            container: 'body',
            trigger: 'hover',
            placement: 'bottom'
        });
    });

    var dialog = renderer.create('<div class="modal" aria-hidden="false" tabindex="-1"/>', function ($node, options) {
        if (options.fade) {
            $node.addClass('fade');
        }
        $node.html(['<div class="modal-dialog">', '  <div class="modal-content">', options.title ? '    <div class="modal-header">' + '      <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + '      <h4 class="modal-title">' + options.title + '</h4>' + '    </div>' : '', '    <div class="modal-body">' + options.body + '</div>', options.footer ? '    <div class="modal-footer">' + options.footer + '</div>' : '', '  </div>', '</div>'].join(''));
    });

    var popover = renderer.create(['<div class="note-popover popover in">', '  <div class="arrow"/>', '  <div class="popover-content note-children-container"/>', '</div>'].join(''), function ($node, options) {
        var direction = typeof options.direction !== 'undefined' ? options.direction : 'bottom';

        $node.addClass(direction);
        $node.hide();
        if (options.hideArrow) {
            $node.find('.arrow').hide();
        }
    });

    var icon = function (iconClassName, tagName) {
        tagName = tagName || 'i';
        return '<' + tagName + ' class="' + iconClassName + '"/>';
    };

    var ui = {
        editor: editor,
        toolbar: toolbar,
        editingArea: editingArea,
        codable: codable,
        editable: editable,
        statusbar: statusbar,
        airEditor: airEditor,
        airEditable: airEditable,
        buttonGroup: buttonGroup,
        button: button,
        dropdown: dropdown,
        dropdownCheck: dropdownCheck,
        palette: palette,
        dialog: dialog,
        popover: popover,
        icon: icon,

        toggleBtn: function ($btn, isEnable) {
            $btn.toggleClass('disabled', !isEnable);
            $btn.attr('disabled', !isEnable);
        },

        toggleBtnActive: function ($btn, isActive) {
            $btn.toggleClass('active', isActive);
        },

        onDialogShown: function ($dialog, handler) {
            $dialog.one('shown.bs.modal', handler);
        },

        onDialogHidden: function ($dialog, handler) {
            $dialog.one('hidden.bs.modal', handler);
        },

        showDialog: function ($dialog) {
            $dialog.modal('show');
        },

        hideDialog: function ($dialog) {
            $dialog.modal('hide');
        },

        createLayout: function ($note, options) {
            var $editor = (options.airMode ? ui.airEditor([ui.editingArea([ui.airEditable()])]) : ui.editor([ui.toolbar(), ui.editingArea([ui.codable(), ui.editable()]), ui.statusbar()])).render();

            $editor.insertAfter($note);

            return {
                note: $note,
                editor: $editor,
                toolbar: $editor.find('.note-toolbar'),
                editingArea: $editor.find('.note-editing-area'),
                editable: $editor.find('.note-editable'),
                codable: $editor.find('.note-codable'),
                statusbar: $editor.find('.note-statusbar')
            };
        },

        removeLayout: function ($note, layoutInfo) {
            $note.html(layoutInfo.editable.html());
            layoutInfo.editor.remove();
            $note.show();
        }
    };

    $.summernote = $.summernote || {
        lang: {}
    };

    $.extend($.summernote.lang, {
        'en-US': {
            font: {
                bold: 'Bold',
                italic: 'Italic',
                underline: 'Underline',
                clear: 'Remove Font Style',
                height: 'Line Height',
                name: 'Font Family',
                strikethrough: 'Strikethrough',
                subscript: 'Subscript',
                superscript: 'Superscript',
                size: 'Font Size'
            },
            image: {
                image: 'Picture',
                insert: 'Insert Image',
                resizeFull: 'Resize Full',
                resizeHalf: 'Resize Half',
                resizeQuarter: 'Resize Quarter',
                floatLeft: 'Float Left',
                floatRight: 'Float Right',
                floatNone: 'Float None',
                shapeRounded: 'Shape: Rounded',
                shapeCircle: 'Shape: Circle',
                shapeThumbnail: 'Shape: Thumbnail',
                shapeNone: 'Shape: None',
                dragImageHere: 'Drag image or text here',
                dropImage: 'Drop image or Text',
                selectFromFiles: 'Select from files',
                maximumFileSize: 'Maximum file size',
                maximumFileSizeError: 'Maximum file size exceeded.',
                url: 'Image URL',
                remove: 'Remove Image'
            },
            video: {
                video: 'Video',
                videoLink: 'Video Link',
                insert: 'Insert Video',
                url: 'Video URL?',
                providers: '(YouTube, Vimeo, Vine, Instagram, DailyMotion or Youku)'
            },
            link: {
                link: 'Link',
                insert: 'Insert Link',
                unlink: 'Unlink',
                edit: 'Edit',
                textToDisplay: 'Text to display',
                url: 'To what URL should this link go?',
                openInNewWindow: 'Open in new window'
            },
            table: {
                table: 'Table'
            },
            hr: {
                insert: 'Insert Horizontal Rule'
            },
            style: {
                style: 'Style',
                normal: 'Normal',
                blockquote: 'Quote',
                pre: 'Code',
                h1: 'Header 1',
                h2: 'Header 2',
                h3: 'Header 3',
                h4: 'Header 4',
                h5: 'Header 5',
                h6: 'Header 6'
            },
            lists: {
                unordered: 'Unordered list',
                ordered: 'Ordered list'
            },
            options: {
                help: 'Help',
                fullscreen: 'Full Screen',
                codeview: 'Code View'
            },
            paragraph: {
                paragraph: 'Paragraph',
                outdent: 'Outdent',
                indent: 'Indent',
                left: 'Align left',
                center: 'Align center',
                right: 'Align right',
                justify: 'Justify full'
            },
            color: {
                recent: 'Recent Color',
                more: 'More Color',
                background: 'Background Color',
                foreground: 'Foreground Color',
                transparent: 'Transparent',
                setTransparent: 'Set transparent',
                reset: 'Reset',
                resetToDefault: 'Reset to default'
            },
            shortcut: {
                shortcuts: 'Keyboard shortcuts',
                close: 'Close',
                textFormatting: 'Text formatting',
                action: 'Action',
                paragraphFormatting: 'Paragraph formatting',
                documentStyle: 'Document Style',
                extraKeys: 'Extra keys'
            },
            help: {
                'insertParagraph': 'Insert Paragraph',
                'undo': 'Undoes the last command',
                'redo': 'Redoes the last command',
                'tab': 'Tab',
                'untab': 'Untab',
                'bold': 'Set a bold style',
                'italic': 'Set a italic style',
                'underline': 'Set a underline style',
                'strikethrough': 'Set a strikethrough style',
                'removeFormat': 'Clean a style',
                'justifyLeft': 'Set left align',
                'justifyCenter': 'Set center align',
                'justifyRight': 'Set right align',
                'justifyFull': 'Set full align',
                'insertUnorderedList': 'Toggle unordered list',
                'insertOrderedList': 'Toggle ordered list',
                'outdent': 'Outdent on current paragraph',
                'indent': 'Indent on current paragraph',
                'formatPara': 'Change current block\'s format as a paragraph(P tag)',
                'formatH1': 'Change current block\'s format as H1',
                'formatH2': 'Change current block\'s format as H2',
                'formatH3': 'Change current block\'s format as H3',
                'formatH4': 'Change current block\'s format as H4',
                'formatH5': 'Change current block\'s format as H5',
                'formatH6': 'Change current block\'s format as H6',
                'insertHorizontalRule': 'Insert horizontal rule',
                'linkDialog.show': 'Show Link Dialog'
            },
            history: {
                undo: 'Undo',
                redo: 'Redo'
            },
            specialChar: {
                specialChar: 'SPECIAL CHARACTERS',
                select: 'Select Special characters'
            }
        }
    });

    /**
     * @class core.key
     *
     * Object for keycodes.
     *
     * @singleton
     * @alternateClassName key
     */
    var key = function () {
        var keyMap = {
            'BACKSPACE': 8,
            'TAB': 9,
            'ENTER': 13,
            'SPACE': 32,

            // Arrow
            'LEFT': 37,
            'UP': 38,
            'RIGHT': 39,
            'DOWN': 40,

            // Number: 0-9
            'NUM0': 48,
            'NUM1': 49,
            'NUM2': 50,
            'NUM3': 51,
            'NUM4': 52,
            'NUM5': 53,
            'NUM6': 54,
            'NUM7': 55,
            'NUM8': 56,

            // Alphabet: a-z
            'B': 66,
            'E': 69,
            'I': 73,
            'J': 74,
            'K': 75,
            'L': 76,
            'R': 82,
            'S': 83,
            'U': 85,
            'V': 86,
            'Y': 89,
            'Z': 90,

            'SLASH': 191,
            'LEFTBRACKET': 219,
            'BACKSLASH': 220,
            'RIGHTBRACKET': 221
        };

        return {
            /**
             * @method isEdit
             *
             * @param {Number} keyCode
             * @return {Boolean}
             */
            isEdit: function (keyCode) {
                return list.contains([keyMap.BACKSPACE, keyMap.TAB, keyMap.ENTER, keyMap.SPACE], keyCode);
            },
            /**
             * @method isMove
             *
             * @param {Number} keyCode
             * @return {Boolean}
             */
            isMove: function (keyCode) {
                return list.contains([keyMap.LEFT, keyMap.UP, keyMap.RIGHT, keyMap.DOWN], keyCode);
            },
            /**
             * @property {Object} nameFromCode
             * @property {String} nameFromCode.8 "BACKSPACE"
             */
            nameFromCode: func.invertObject(keyMap),
            code: keyMap
        };
    }();

    var range = function () {

        /**
         * return boundaryPoint from TextRange, inspired by Andy Na's HuskyRange.js
         *
         * @param {TextRange} textRange
         * @param {Boolean} isStart
         * @return {BoundaryPoint}
         *
         * @see http://msdn.microsoft.com/en-us/library/ie/ms535872(v=vs.85).aspx
         */
        var textRangeToPoint = function (textRange, isStart) {
            var container = textRange.parentElement(),
                offset;

            var tester = document.body.createTextRange(),
                prevContainer;
            var childNodes = list.from(container.childNodes);
            for (offset = 0; offset < childNodes.length; offset++) {
                if (dom.isText(childNodes[offset])) {
                    continue;
                }
                tester.moveToElementText(childNodes[offset]);
                if (tester.compareEndPoints('StartToStart', textRange) >= 0) {
                    break;
                }
                prevContainer = childNodes[offset];
            }

            if (offset !== 0 && dom.isText(childNodes[offset - 1])) {
                var textRangeStart = document.body.createTextRange(),
                    curTextNode = null;
                textRangeStart.moveToElementText(prevContainer || container);
                textRangeStart.collapse(!prevContainer);
                curTextNode = prevContainer ? prevContainer.nextSibling : container.firstChild;

                var pointTester = textRange.duplicate();
                pointTester.setEndPoint('StartToStart', textRangeStart);
                var textCount = pointTester.text.replace(/[\r\n]/g, '').length;

                while (textCount > curTextNode.nodeValue.length && curTextNode.nextSibling) {
                    textCount -= curTextNode.nodeValue.length;
                    curTextNode = curTextNode.nextSibling;
                }

                /* jshint ignore:start */
                var dummy = curTextNode.nodeValue; // enforce IE to re-reference curTextNode, hack
                /* jshint ignore:end */

                if (isStart && curTextNode.nextSibling && dom.isText(curTextNode.nextSibling) && textCount === curTextNode.nodeValue.length) {
                    textCount -= curTextNode.nodeValue.length;
                    curTextNode = curTextNode.nextSibling;
                }

                container = curTextNode;
                offset = textCount;
            }

            return {
                cont: container,
                offset: offset
            };
        };

        /**
         * return TextRange from boundary point (inspired by google closure-library)
         * @param {BoundaryPoint} point
         * @return {TextRange}
         */
        var pointToTextRange = function (point) {
            var textRangeInfo = function (container, offset) {
                var node, isCollapseToStart;

                if (dom.isText(container)) {
                    var prevTextNodes = dom.listPrev(container, func.not(dom.isText));
                    var prevContainer = list.last(prevTextNodes).previousSibling;
                    node = prevContainer || container.parentNode;
                    offset += list.sum(list.tail(prevTextNodes), dom.nodeLength);
                    isCollapseToStart = !prevContainer;
                } else {
                    node = container.childNodes[offset] || container;
                    if (dom.isText(node)) {
                        return textRangeInfo(node, 0);
                    }

                    offset = 0;
                    isCollapseToStart = false;
                }

                return {
                    node: node,
                    collapseToStart: isCollapseToStart,
                    offset: offset
                };
            };

            var textRange = document.body.createTextRange();
            var info = textRangeInfo(point.node, point.offset);

            textRange.moveToElementText(info.node);
            textRange.collapse(info.collapseToStart);
            textRange.moveStart('character', info.offset);
            return textRange;
        };

        /**
         * Wrapped Range
         *
         * @constructor
         * @param {Node} sc - start container
         * @param {Number} so - start offset
         * @param {Node} ec - end container
         * @param {Number} eo - end offset
         */
        var WrappedRange = function (sc, so, ec, eo) {
            this.sc = sc;
            this.so = so;
            this.ec = ec;
            this.eo = eo;

            // nativeRange: get nativeRange from sc, so, ec, eo
            var nativeRange = function () {
                if (agent.isW3CRangeSupport) {
                    var w3cRange = document.createRange();
                    w3cRange.setStart(sc, so);
                    w3cRange.setEnd(ec, eo);

                    return w3cRange;
                } else {
                    var textRange = pointToTextRange({
                        node: sc,
                        offset: so
                    });

                    textRange.setEndPoint('EndToEnd', pointToTextRange({
                        node: ec,
                        offset: eo
                    }));

                    return textRange;
                }
            };

            this.getPoints = function () {
                return {
                    sc: sc,
                    so: so,
                    ec: ec,
                    eo: eo
                };
            };

            this.getStartPoint = function () {
                return {
                    node: sc,
                    offset: so
                };
            };

            this.getEndPoint = function () {
                return {
                    node: ec,
                    offset: eo
                };
            };

            /**
             * select update visible range
             */
            this.select = function () {
                var nativeRng = nativeRange();
                if (agent.isW3CRangeSupport) {
                    var selection = document.getSelection();
                    if (selection.rangeCount > 0) {
                        selection.removeAllRanges();
                    }
                    selection.addRange(nativeRng);
                } else {
                    nativeRng.select();
                }

                return this;
            };

            /**
             * Moves the scrollbar to start container(sc) of current range
             *
             * @return {WrappedRange}
             */
            this.scrollIntoView = function (container) {
                var height = $(container).height();
                if (container.scrollTop + height < this.sc.offsetTop) {
                    container.scrollTop += Math.abs(container.scrollTop + height - this.sc.offsetTop);
                }

                return this;
            };

            /**
             * @return {WrappedRange}
             */
            this.normalize = function () {

                /**
                 * @param {BoundaryPoint} point
                 * @param {Boolean} isLeftToRight
                 * @return {BoundaryPoint}
                 */
                var getVisiblePoint = function (point, isLeftToRight) {
                    if (dom.isVisiblePoint(point) && !dom.isEdgePoint(point) || dom.isVisiblePoint(point) && dom.isRightEdgePoint(point) && !isLeftToRight || dom.isVisiblePoint(point) && dom.isLeftEdgePoint(point) && isLeftToRight || dom.isVisiblePoint(point) && dom.isBlock(point.node) && dom.isEmpty(point.node)) {
                        return point;
                    }

                    // point on block's edge
                    var block = dom.ancestor(point.node, dom.isBlock);
                    if ((dom.isLeftEdgePointOf(point, block) || dom.isVoid(dom.prevPoint(point).node)) && !isLeftToRight || (dom.isRightEdgePointOf(point, block) || dom.isVoid(dom.nextPoint(point).node)) && isLeftToRight) {

                        // returns point already on visible point
                        if (dom.isVisiblePoint(point)) {
                            return point;
                        }
                        // reverse direction
                        isLeftToRight = !isLeftToRight;
                    }

                    var nextPoint = isLeftToRight ? dom.nextPointUntil(dom.nextPoint(point), dom.isVisiblePoint) : dom.prevPointUntil(dom.prevPoint(point), dom.isVisiblePoint);
                    return nextPoint || point;
                };

                var endPoint = getVisiblePoint(this.getEndPoint(), false);
                var startPoint = this.isCollapsed() ? endPoint : getVisiblePoint(this.getStartPoint(), true);

                return new WrappedRange(startPoint.node, startPoint.offset, endPoint.node, endPoint.offset);
            };

            /**
             * returns matched nodes on range
             *
             * @param {Function} [pred] - predicate function
             * @param {Object} [options]
             * @param {Boolean} [options.includeAncestor]
             * @param {Boolean} [options.fullyContains]
             * @return {Node[]}
             */
            this.nodes = function (pred, options) {
                pred = pred || func.ok;

                var includeAncestor = options && options.includeAncestor;
                var fullyContains = options && options.fullyContains;

                // TODO compare points and sort
                var startPoint = this.getStartPoint();
                var endPoint = this.getEndPoint();

                var nodes = [];
                var leftEdgeNodes = [];

                dom.walkPoint(startPoint, endPoint, function (point) {
                    if (dom.isEditable(point.node)) {
                        return;
                    }

                    var node;
                    if (fullyContains) {
                        if (dom.isLeftEdgePoint(point)) {
                            leftEdgeNodes.push(point.node);
                        }
                        if (dom.isRightEdgePoint(point) && list.contains(leftEdgeNodes, point.node)) {
                            node = point.node;
                        }
                    } else if (includeAncestor) {
                        node = dom.ancestor(point.node, pred);
                    } else {
                        node = point.node;
                    }

                    if (node && pred(node)) {
                        nodes.push(node);
                    }
                }, true);

                return list.unique(nodes);
            };

            /**
             * returns commonAncestor of range
             * @return {Element} - commonAncestor
             */
            this.commonAncestor = function () {
                return dom.commonAncestor(sc, ec);
            };

            /**
             * returns expanded range by pred
             *
             * @param {Function} pred - predicate function
             * @return {WrappedRange}
             */
            this.expand = function (pred) {
                var startAncestor = dom.ancestor(sc, pred);
                var endAncestor = dom.ancestor(ec, pred);

                if (!startAncestor && !endAncestor) {
                    return new WrappedRange(sc, so, ec, eo);
                }

                var boundaryPoints = this.getPoints();

                if (startAncestor) {
                    boundaryPoints.sc = startAncestor;
                    boundaryPoints.so = 0;
                }

                if (endAncestor) {
                    boundaryPoints.ec = endAncestor;
                    boundaryPoints.eo = dom.nodeLength(endAncestor);
                }

                return new WrappedRange(boundaryPoints.sc, boundaryPoints.so, boundaryPoints.ec, boundaryPoints.eo);
            };

            /**
             * @param {Boolean} isCollapseToStart
             * @return {WrappedRange}
             */
            this.collapse = function (isCollapseToStart) {
                if (isCollapseToStart) {
                    return new WrappedRange(sc, so, sc, so);
                } else {
                    return new WrappedRange(ec, eo, ec, eo);
                }
            };

            /**
             * splitText on range
             */
            this.splitText = function () {
                var isSameContainer = sc === ec;
                var boundaryPoints = this.getPoints();

                if (dom.isText(ec) && !dom.isEdgePoint(this.getEndPoint())) {
                    ec.splitText(eo);
                }

                if (dom.isText(sc) && !dom.isEdgePoint(this.getStartPoint())) {
                    boundaryPoints.sc = sc.splitText(so);
                    boundaryPoints.so = 0;

                    if (isSameContainer) {
                        boundaryPoints.ec = boundaryPoints.sc;
                        boundaryPoints.eo = eo - so;
                    }
                }

                return new WrappedRange(boundaryPoints.sc, boundaryPoints.so, boundaryPoints.ec, boundaryPoints.eo);
            };

            /**
             * delete contents on range
             * @return {WrappedRange}
             */
            this.deleteContents = function () {
                if (this.isCollapsed()) {
                    return this;
                }

                var rng = this.splitText();
                var nodes = rng.nodes(null, {
                    fullyContains: true
                });

                // find new cursor point
                var point = dom.prevPointUntil(rng.getStartPoint(), function (point) {
                    return !list.contains(nodes, point.node);
                });

                var emptyParents = [];
                $.each(nodes, function (idx, node) {
                    // find empty parents
                    var parent = node.parentNode;
                    if (point.node !== parent && dom.nodeLength(parent) === 1) {
                        emptyParents.push(parent);
                    }
                    dom.remove(node, false);
                });

                // remove empty parents
                $.each(emptyParents, function (idx, node) {
                    dom.remove(node, false);
                });

                return new WrappedRange(point.node, point.offset, point.node, point.offset).normalize();
            };

            /**
             * makeIsOn: return isOn(pred) function
             */
            var makeIsOn = function (pred) {
                return function () {
                    var ancestor = dom.ancestor(sc, pred);
                    return !!ancestor && ancestor === dom.ancestor(ec, pred);
                };
            };

            // isOnEditable: judge whether range is on editable or not
            this.isOnEditable = makeIsOn(dom.isEditable);
            // isOnList: judge whether range is on list node or not
            this.isOnList = makeIsOn(dom.isList);
            // isOnAnchor: judge whether range is on anchor node or not
            this.isOnAnchor = makeIsOn(dom.isAnchor);
            // isOnCell: judge whether range is on cell node or not
            this.isOnCell = makeIsOn(dom.isCell);
            // isOnData: judge whether range is on data node or not
            this.isOnData = makeIsOn(dom.isData);

            /**
             * @param {Function} pred
             * @return {Boolean}
             */
            this.isLeftEdgeOf = function (pred) {
                if (!dom.isLeftEdgePoint(this.getStartPoint())) {
                    return false;
                }

                var node = dom.ancestor(this.sc, pred);
                return node && dom.isLeftEdgeOf(this.sc, node);
            };

            /**
             * returns whether range was collapsed or not
             */
            this.isCollapsed = function () {
                return sc === ec && so === eo;
            };

            /**
             * wrap inline nodes which children of body with paragraph
             *
             * @return {WrappedRange}
             */
            this.wrapBodyInlineWithPara = function () {
                if (dom.isBodyContainer(sc) && dom.isEmpty(sc)) {
                    sc.innerHTML = dom.emptyPara;
                    return new WrappedRange(sc.firstChild, 0, sc.firstChild, 0);
                }

                /**
                 * [workaround] firefox often create range on not visible point. so normalize here.
                 *  - firefox: |<p>text</p>|
                 *  - chrome: <p>|text|</p>
                 */
                var rng = this.normalize();
                if (dom.isParaInline(sc) || dom.isPara(sc)) {
                    return rng;
                }

                // find inline top ancestor
                var topAncestor;
                if (dom.isInline(rng.sc)) {
                    var ancestors = dom.listAncestor(rng.sc, func.not(dom.isInline));
                    topAncestor = list.last(ancestors);
                    if (!dom.isInline(topAncestor)) {
                        topAncestor = ancestors[ancestors.length - 2] || rng.sc.childNodes[rng.so];
                    }
                } else {
                    topAncestor = rng.sc.childNodes[rng.so > 0 ? rng.so - 1 : 0];
                }

                // siblings not in paragraph
                var inlineSiblings = dom.listPrev(topAncestor, dom.isParaInline).reverse();
                inlineSiblings = inlineSiblings.concat(dom.listNext(topAncestor.nextSibling, dom.isParaInline));

                // wrap with paragraph
                if (inlineSiblings.length) {
                    var para = dom.wrap(list.head(inlineSiblings), 'p');
                    dom.appendChildNodes(para, list.tail(inlineSiblings));
                }

                return this.normalize();
            };

            /**
             * insert node at current cursor
             *
             * @param {Node} node
             * @return {Node}
             */
            this.insertNode = function (node) {
                var rng = this.wrapBodyInlineWithPara().deleteContents();
                var info = dom.splitPoint(rng.getStartPoint(), dom.isInline(node));

                if (info.rightNode) {
                    info.rightNode.parentNode.insertBefore(node, info.rightNode);
                } else {
                    info.container.appendChild(node);
                }

                return node;
            };

            /**
             * insert html at current cursor
             */
            this.pasteHTML = function (markup) {
                var contentsContainer = $('<div></div>').html(markup)[0];
                var childNodes = list.from(contentsContainer.childNodes);

                var rng = this.wrapBodyInlineWithPara().deleteContents();

                return childNodes.reverse().map(function (childNode) {
                    return rng.insertNode(childNode);
                }).reverse();
            };

            /**
             * returns text in range
             *
             * @return {String}
             */
            this.toString = function () {
                var nativeRng = nativeRange();
                return agent.isW3CRangeSupport ? nativeRng.toString() : nativeRng.text;
            };

            /**
             * returns range for word before cursor
             *
             * @param {Boolean} [findAfter] - find after cursor, default: false
             * @return {WrappedRange}
             */
            this.getWordRange = function (findAfter) {
                var endPoint = this.getEndPoint();

                if (!dom.isCharPoint(endPoint)) {
                    return this;
                }

                var startPoint = dom.prevPointUntil(endPoint, function (point) {
                    return !dom.isCharPoint(point);
                });

                if (findAfter) {
                    endPoint = dom.nextPointUntil(endPoint, function (point) {
                        return !dom.isCharPoint(point);
                    });
                }

                return new WrappedRange(startPoint.node, startPoint.offset, endPoint.node, endPoint.offset);
            };

            /**
             * create offsetPath bookmark
             *
             * @param {Node} editable
             */
            this.bookmark = function (editable) {
                return {
                    s: {
                        path: dom.makeOffsetPath(editable, sc),
                        offset: so
                    },
                    e: {
                        path: dom.makeOffsetPath(editable, ec),
                        offset: eo
                    }
                };
            };

            /**
             * create offsetPath bookmark base on paragraph
             *
             * @param {Node[]} paras
             */
            this.paraBookmark = function (paras) {
                return {
                    s: {
                        path: list.tail(dom.makeOffsetPath(list.head(paras), sc)),
                        offset: so
                    },
                    e: {
                        path: list.tail(dom.makeOffsetPath(list.last(paras), ec)),
                        offset: eo
                    }
                };
            };

            /**
             * getClientRects
             * @return {Rect[]}
             */
            this.getClientRects = function () {
                var nativeRng = nativeRange();
                return nativeRng.getClientRects();
            };
        };

        /**
         * @class core.range
         *
         * Data structure
         *  * BoundaryPoint: a point of dom tree
         *  * BoundaryPoints: two boundaryPoints corresponding to the start and the end of the Range
         *
         * See to http://www.w3.org/TR/DOM-Level-2-Traversal-Range/ranges.html#Level-2-Range-Position
         *
         * @singleton
         * @alternateClassName range
         */
        return {
            /**
             * create Range Object From arguments or Browser Selection
             *
             * @param {Node} sc - start container
             * @param {Number} so - start offset
             * @param {Node} ec - end container
             * @param {Number} eo - end offset
             * @return {WrappedRange}
             */
            create: function (sc, so, ec, eo) {
                if (arguments.length === 4) {
                    return new WrappedRange(sc, so, ec, eo);
                } else if (arguments.length === 2) {
                    //collapsed
                    ec = sc;
                    eo = so;
                    return new WrappedRange(sc, so, ec, eo);
                } else {
                    var wrappedRange = this.createFromSelection();
                    if (!wrappedRange && arguments.length === 1) {
                        wrappedRange = this.createFromNode(arguments[0]);
                        return wrappedRange.collapse(dom.emptyPara === arguments[0].innerHTML);
                    }
                    return wrappedRange;
                }
            },

            createFromSelection: function () {
                var sc, so, ec, eo;
                if (agent.isW3CRangeSupport) {
                    var selection = document.getSelection();
                    if (!selection || selection.rangeCount === 0) {
                        return null;
                    } else if (dom.isBody(selection.anchorNode)) {
                        // Firefox: returns entire body as range on initialization.
                        // We won't never need it.
                        return null;
                    }

                    var nativeRng = selection.getRangeAt(0);
                    sc = nativeRng.startContainer;
                    so = nativeRng.startOffset;
                    ec = nativeRng.endContainer;
                    eo = nativeRng.endOffset;
                } else {
                    // IE8: TextRange
                    var textRange = document.selection.createRange();
                    var textRangeEnd = textRange.duplicate();
                    textRangeEnd.collapse(false);
                    var textRangeStart = textRange;
                    textRangeStart.collapse(true);

                    var startPoint = textRangeToPoint(textRangeStart, true),
                        endPoint = textRangeToPoint(textRangeEnd, false);

                    // same visible point case: range was collapsed.
                    if (dom.isText(startPoint.node) && dom.isLeftEdgePoint(startPoint) && dom.isTextNode(endPoint.node) && dom.isRightEdgePoint(endPoint) && endPoint.node.nextSibling === startPoint.node) {
                        startPoint = endPoint;
                    }

                    sc = startPoint.cont;
                    so = startPoint.offset;
                    ec = endPoint.cont;
                    eo = endPoint.offset;
                }

                return new WrappedRange(sc, so, ec, eo);
            },

            /**
             * @method
             *
             * create WrappedRange from node
             *
             * @param {Node} node
             * @return {WrappedRange}
             */
            createFromNode: function (node) {
                var sc = node;
                var so = 0;
                var ec = node;
                var eo = dom.nodeLength(ec);

                // browsers can't target a picture or void node
                if (dom.isVoid(sc)) {
                    so = dom.listPrev(sc).length - 1;
                    sc = sc.parentNode;
                }
                if (dom.isBR(ec)) {
                    eo = dom.listPrev(ec).length - 1;
                    ec = ec.parentNode;
                } else if (dom.isVoid(ec)) {
                    eo = dom.listPrev(ec).length;
                    ec = ec.parentNode;
                }

                return this.create(sc, so, ec, eo);
            },

            /**
             * create WrappedRange from node after position
             *
             * @param {Node} node
             * @return {WrappedRange}
             */
            createFromNodeBefore: function (node) {
                return this.createFromNode(node).collapse(true);
            },

            /**
             * create WrappedRange from node after position
             *
             * @param {Node} node
             * @return {WrappedRange}
             */
            createFromNodeAfter: function (node) {
                return this.createFromNode(node).collapse();
            },

            /**
             * @method
             *
             * create WrappedRange from bookmark
             *
             * @param {Node} editable
             * @param {Object} bookmark
             * @return {WrappedRange}
             */
            createFromBookmark: function (editable, bookmark) {
                var sc = dom.fromOffsetPath(editable, bookmark.s.path);
                var so = bookmark.s.offset;
                var ec = dom.fromOffsetPath(editable, bookmark.e.path);
                var eo = bookmark.e.offset;
                return new WrappedRange(sc, so, ec, eo);
            },

            /**
             * @method
             *
             * create WrappedRange from paraBookmark
             *
             * @param {Object} bookmark
             * @param {Node[]} paras
             * @return {WrappedRange}
             */
            createFromParaBookmark: function (bookmark, paras) {
                var so = bookmark.s.offset;
                var eo = bookmark.e.offset;
                var sc = dom.fromOffsetPath(list.head(paras), bookmark.s.path);
                var ec = dom.fromOffsetPath(list.last(paras), bookmark.e.path);

                return new WrappedRange(sc, so, ec, eo);
            }
        };
    }();

    /**
     * @class core.async
     *
     * Async functions which returns `Promise`
     *
     * @singleton
     * @alternateClassName async
     */
    var async = function () {
        /**
         * @method readFileAsDataURL
         *
         * read contents of file as representing URL
         *
         * @param {File} file
         * @return {Promise} - then: dataUrl
         */
        var readFileAsDataURL = function (file) {
            return $.Deferred(function (deferred) {
                $.extend(new FileReader(), {
                    onload: function (e) {
                        var dataURL = e.target.result;
                        deferred.resolve(dataURL);
                    },
                    onerror: function () {
                        deferred.reject(this);
                    }
                }).readAsDataURL(file);
            }).promise();
        };

        /**
         * @method createImage
         *
         * create `<image>` from url string
         *
         * @param {String} url
         * @return {Promise} - then: $image
         */
        var createImage = function (url) {
            return $.Deferred(function (deferred) {
                var $img = $('<img>');

                $img.one('load', function () {
                    $img.off('error abort');
                    deferred.resolve($img);
                }).one('error abort', function () {
                    $img.off('load').detach();
                    deferred.reject($img);
                }).css({
                    display: 'none'
                }).appendTo(document.body).attr('src', url);
            }).promise();
        };

        return {
            readFileAsDataURL: readFileAsDataURL,
            createImage: createImage
        };
    }();

    /**
     * @class editing.History
     *
     * Editor History
     *
     */
    var History = function ($editable) {
        var stack = [],
            stackOffset = -1;
        var editable = $editable[0];

        var makeSnapshot = function () {
            var rng = range.create(editable);
            var emptyBookmark = { s: { path: [], offset: 0 }, e: { path: [], offset: 0 } };

            return {
                contents: $editable.html(),
                bookmark: rng ? rng.bookmark(editable) : emptyBookmark
            };
        };

        var applySnapshot = function (snapshot) {
            if (snapshot.contents !== null) {
                $editable.html(snapshot.contents);
            }
            if (snapshot.bookmark !== null) {
                range.createFromBookmark(editable, snapshot.bookmark).select();
            }
        };

        /**
         * @method rewind
         * Rewinds the history stack back to the first snapshot taken.
         * Leaves the stack intact, so that "Redo" can still be used.
         */
        this.rewind = function () {
            // Create snap shot if not yet recorded
            if ($editable.html() !== stack[stackOffset].contents) {
                this.recordUndo();
            }

            // Return to the first available snapshot.
            stackOffset = 0;

            // Apply that snapshot.
            applySnapshot(stack[stackOffset]);
        };

        /**
         * @method reset
         * Resets the history stack completely; reverting to an empty editor.
         */
        this.reset = function () {
            // Clear the stack.
            stack = [];

            // Restore stackOffset to its original value.
            stackOffset = -1;

            // Clear the editable area.
            $editable.html('');

            // Record our first snapshot (of nothing).
            this.recordUndo();
        };

        /**
         * undo
         */
        this.undo = function () {
            // Create snap shot if not yet recorded
            if ($editable.html() !== stack[stackOffset].contents) {
                this.recordUndo();
            }

            if (0 < stackOffset) {
                stackOffset--;
                applySnapshot(stack[stackOffset]);
            }
        };

        /**
         * redo
         */
        this.redo = function () {
            if (stack.length - 1 > stackOffset) {
                stackOffset++;
                applySnapshot(stack[stackOffset]);
            }
        };

        /**
         * recorded undo
         */
        this.recordUndo = function () {
            stackOffset++;

            // Wash out stack after stackOffset
            if (stack.length > stackOffset) {
                stack = stack.slice(0, stackOffset);
            }

            // Create new snapshot and push it to the end
            stack.push(makeSnapshot());
        };
    };

    /**
     * @class editing.Style
     *
     * Style
     *
     */
    var Style = function () {
        /**
         * @method jQueryCSS
         *
         * [workaround] for old jQuery
         * passing an array of style properties to .css()
         * will result in an object of property-value pairs.
         * (compability with version < 1.9)
         *
         * @private
         * @param  {jQuery} $obj
         * @param  {Array} propertyNames - An array of one or more CSS properties.
         * @return {Object}
         */
        var jQueryCSS = function ($obj, propertyNames) {
            if (agent.jqueryVersion < 1.9) {
                var result = {};
                $.each(propertyNames, function (idx, propertyName) {
                    result[propertyName] = $obj.css(propertyName);
                });
                return result;
            }
            return $obj.css.call($obj, propertyNames);
        };

        /**
         * returns style object from node
         *
         * @param {jQuery} $node
         * @return {Object}
         */
        this.fromNode = function ($node) {
            var properties = ['font-family', 'font-size', 'text-align', 'list-style-type', 'line-height'];
            var styleInfo = jQueryCSS($node, properties) || {};
            styleInfo['font-size'] = parseInt(styleInfo['font-size'], 10);
            return styleInfo;
        };

        /**
         * paragraph level style
         *
         * @param {WrappedRange} rng
         * @param {Object} styleInfo
         */
        this.stylePara = function (rng, styleInfo) {
            $.each(rng.nodes(dom.isPara, {
                includeAncestor: true
            }), function (idx, para) {
                $(para).css(styleInfo);
            });
        };

        /**
         * insert and returns styleNodes on range.
         *
         * @param {WrappedRange} rng
         * @param {Object} [options] - options for styleNodes
         * @param {String} [options.nodeName] - default: `SPAN`
         * @param {Boolean} [options.expandClosestSibling] - default: `false`
         * @param {Boolean} [options.onlyPartialContains] - default: `false`
         * @return {Node[]}
         */
        this.styleNodes = function (rng, options) {
            rng = rng.splitText();

            var nodeName = options && options.nodeName || 'SPAN';
            var expandClosestSibling = !!(options && options.expandClosestSibling);
            var onlyPartialContains = !!(options && options.onlyPartialContains);

            if (rng.isCollapsed()) {
                return [rng.insertNode(dom.create(nodeName))];
            }

            var pred = dom.makePredByNodeName(nodeName);
            var nodes = rng.nodes(dom.isText, {
                fullyContains: true
            }).map(function (text) {
                return dom.singleChildAncestor(text, pred) || dom.wrap(text, nodeName);
            });

            if (expandClosestSibling) {
                if (onlyPartialContains) {
                    var nodesInRange = rng.nodes();
                    // compose with partial contains predication
                    pred = func.and(pred, function (node) {
                        return list.contains(nodesInRange, node);
                    });
                }

                return nodes.map(function (node) {
                    var siblings = dom.withClosestSiblings(node, pred);
                    var head = list.head(siblings);
                    var tails = list.tail(siblings);
                    $.each(tails, function (idx, elem) {
                        dom.appendChildNodes(head, elem.childNodes);
                        dom.remove(elem);
                    });
                    return list.head(siblings);
                });
            } else {
                return nodes;
            }
        };

        /**
         * get current style on cursor
         *
         * @param {WrappedRange} rng
         * @return {Object} - object contains style properties.
         */
        this.current = function (rng) {
            var $cont = $(!dom.isElement(rng.sc) ? rng.sc.parentNode : rng.sc);
            var styleInfo = this.fromNode($cont);

            // document.queryCommandState for toggle state
            // [workaround] prevent Firefox nsresult: "0x80004005 (NS_ERROR_FAILURE)"
            try {
                styleInfo = $.extend(styleInfo, {
                    'font-bold': document.queryCommandState('bold') ? 'bold' : 'normal',
                    'font-italic': document.queryCommandState('italic') ? 'italic' : 'normal',
                    'font-underline': document.queryCommandState('underline') ? 'underline' : 'normal',
                    'font-subscript': document.queryCommandState('subscript') ? 'subscript' : 'normal',
                    'font-superscript': document.queryCommandState('superscript') ? 'superscript' : 'normal',
                    'font-strikethrough': document.queryCommandState('strikethrough') ? 'strikethrough' : 'normal'
                });
            } catch (e) {}

            // list-style-type to list-style(unordered, ordered)
            if (!rng.isOnList()) {
                styleInfo['list-style'] = 'none';
            } else {
                var orderedTypes = ['circle', 'disc', 'disc-leading-zero', 'square'];
                var isUnordered = $.inArray(styleInfo['list-style-type'], orderedTypes) > -1;
                styleInfo['list-style'] = isUnordered ? 'unordered' : 'ordered';
            }

            var para = dom.ancestor(rng.sc, dom.isPara);
            if (para && para.style['line-height']) {
                styleInfo['line-height'] = para.style.lineHeight;
            } else {
                var lineHeight = parseInt(styleInfo['line-height'], 10) / parseInt(styleInfo['font-size'], 10);
                styleInfo['line-height'] = lineHeight.toFixed(1);
            }

            styleInfo.anchor = rng.isOnAnchor() && dom.ancestor(rng.sc, dom.isAnchor);
            styleInfo.ancestors = dom.listAncestor(rng.sc, dom.isEditable);
            styleInfo.range = rng;

            return styleInfo;
        };
    };

    /**
     * @class editing.Bullet
     *
     * @alternateClassName Bullet
     */
    var Bullet = function () {
        var self = this;

        /**
         * toggle ordered list
         */
        this.insertOrderedList = function (editable) {
            this.toggleList('OL', editable);
        };

        /**
         * toggle unordered list
         */
        this.insertUnorderedList = function (editable) {
            this.toggleList('UL', editable);
        };

        /**
         * indent
         */
        this.indent = function (editable) {
            var self = this;
            var rng = range.create(editable).wrapBodyInlineWithPara();

            var paras = rng.nodes(dom.isPara, { includeAncestor: true });
            var clustereds = list.clusterBy(paras, func.peq2('parentNode'));

            $.each(clustereds, function (idx, paras) {
                var head = list.head(paras);
                if (dom.isLi(head)) {
                    self.wrapList(paras, head.parentNode.nodeName);
                } else {
                    $.each(paras, function (idx, para) {
                        $(para).css('marginLeft', function (idx, val) {
                            return (parseInt(val, 10) || 0) + 25;
                        });
                    });
                }
            });

            rng.select();
        };

        /**
         * outdent
         */
        this.outdent = function (editable) {
            var self = this;
            var rng = range.create(editable).wrapBodyInlineWithPara();

            var paras = rng.nodes(dom.isPara, { includeAncestor: true });
            var clustereds = list.clusterBy(paras, func.peq2('parentNode'));

            $.each(clustereds, function (idx, paras) {
                var head = list.head(paras);
                if (dom.isLi(head)) {
                    self.releaseList([paras]);
                } else {
                    $.each(paras, function (idx, para) {
                        $(para).css('marginLeft', function (idx, val) {
                            val = parseInt(val, 10) || 0;
                            return val > 25 ? val - 25 : '';
                        });
                    });
                }
            });

            rng.select();
        };

        /**
         * toggle list
         *
         * @param {String} listName - OL or UL
         */
        this.toggleList = function (listName, editable) {
            var rng = range.create(editable).wrapBodyInlineWithPara();

            var paras = rng.nodes(dom.isPara, { includeAncestor: true });
            var bookmark = rng.paraBookmark(paras);
            var clustereds = list.clusterBy(paras, func.peq2('parentNode'));

            // paragraph to list
            if (list.find(paras, dom.isPurePara)) {
                var wrappedParas = [];
                $.each(clustereds, function (idx, paras) {
                    wrappedParas = wrappedParas.concat(self.wrapList(paras, listName));
                });
                paras = wrappedParas;
                // list to paragraph or change list style
            } else {
                var diffLists = rng.nodes(dom.isList, {
                    includeAncestor: true
                }).filter(function (listNode) {
                    return !$.nodeName(listNode, listName);
                });

                if (diffLists.length) {
                    $.each(diffLists, function (idx, listNode) {
                        dom.replace(listNode, listName);
                    });
                } else {
                    paras = this.releaseList(clustereds, true);
                }
            }

            range.createFromParaBookmark(bookmark, paras).select();
        };

        /**
         * @param {Node[]} paras
         * @param {String} listName
         * @return {Node[]}
         */
        this.wrapList = function (paras, listName) {
            var head = list.head(paras);
            var last = list.last(paras);

            var prevList = dom.isList(head.previousSibling) && head.previousSibling;
            var nextList = dom.isList(last.nextSibling) && last.nextSibling;

            var listNode = prevList || dom.insertAfter(dom.create(listName || 'UL'), last);

            // P to LI
            paras = paras.map(function (para) {
                return dom.isPurePara(para) ? dom.replace(para, 'LI') : para;
            });

            // append to list(<ul>, <ol>)
            dom.appendChildNodes(listNode, paras);

            if (nextList) {
                dom.appendChildNodes(listNode, list.from(nextList.childNodes));
                dom.remove(nextList);
            }

            return paras;
        };

        /**
         * @method releaseList
         *
         * @param {Array[]} clustereds
         * @param {Boolean} isEscapseToBody
         * @return {Node[]}
         */
        this.releaseList = function (clustereds, isEscapseToBody) {
            var releasedParas = [];

            $.each(clustereds, function (idx, paras) {
                var head = list.head(paras);
                var last = list.last(paras);

                var headList = isEscapseToBody ? dom.lastAncestor(head, dom.isList) : head.parentNode;
                var lastList = headList.childNodes.length > 1 ? dom.splitTree(headList, {
                    node: last.parentNode,
                    offset: dom.position(last) + 1
                }, {
                    isSkipPaddingBlankHTML: true
                }) : null;

                var middleList = dom.splitTree(headList, {
                    node: head.parentNode,
                    offset: dom.position(head)
                }, {
                    isSkipPaddingBlankHTML: true
                });

                paras = isEscapseToBody ? dom.listDescendant(middleList, dom.isLi) : list.from(middleList.childNodes).filter(dom.isLi);

                // LI to P
                if (isEscapseToBody || !dom.isList(headList.parentNode)) {
                    paras = paras.map(function (para) {
                        return dom.replace(para, 'P');
                    });
                }

                $.each(list.from(paras).reverse(), function (idx, para) {
                    dom.insertAfter(para, headList);
                });

                // remove empty lists
                var rootLists = list.compact([headList, middleList, lastList]);
                $.each(rootLists, function (idx, rootList) {
                    var listNodes = [rootList].concat(dom.listDescendant(rootList, dom.isList));
                    $.each(listNodes.reverse(), function (idx, listNode) {
                        if (!dom.nodeLength(listNode)) {
                            dom.remove(listNode, true);
                        }
                    });
                });

                releasedParas = releasedParas.concat(paras);
            });

            return releasedParas;
        };
    };

    /**
     * @class editing.Typing
     *
     * Typing
     *
     */
    var Typing = function () {

        // a Bullet instance to toggle lists off
        var bullet = new Bullet();

        /**
         * insert tab
         *
         * @param {WrappedRange} rng
         * @param {Number} tabsize
         */
        this.insertTab = function (rng, tabsize) {
            var tab = dom.createText(new Array(tabsize + 1).join(dom.NBSP_CHAR));
            rng = rng.deleteContents();
            rng.insertNode(tab, true);

            rng = range.create(tab, tabsize);
            rng.select();
        };

        /**
         * insert paragraph
         */
        this.insertParagraph = function (editable) {
            var rng = range.create(editable);

            // deleteContents on range.
            rng = rng.deleteContents();

            // Wrap range if it needs to be wrapped by paragraph
            rng = rng.wrapBodyInlineWithPara();

            // finding paragraph
            var splitRoot = dom.ancestor(rng.sc, dom.isPara);

            var nextPara;
            // on paragraph: split paragraph
            if (splitRoot) {
                // if it is an empty line with li
                if (dom.isEmpty(splitRoot) && dom.isLi(splitRoot)) {
                    // toogle UL/OL and escape
                    bullet.toggleList(splitRoot.parentNode.nodeName);
                    return;
                    // if it is an empty line with para on blockquote
                } else if (dom.isEmpty(splitRoot) && dom.isPara(splitRoot) && dom.isBlockquote(splitRoot.parentNode)) {
                    // escape blockquote
                    dom.insertAfter(splitRoot, splitRoot.parentNode);
                    nextPara = splitRoot;
                    // if new line has content (not a line break)
                } else {
                    nextPara = dom.splitTree(splitRoot, rng.getStartPoint());

                    var emptyAnchors = dom.listDescendant(splitRoot, dom.isEmptyAnchor);
                    emptyAnchors = emptyAnchors.concat(dom.listDescendant(nextPara, dom.isEmptyAnchor));

                    $.each(emptyAnchors, function (idx, anchor) {
                        dom.remove(anchor);
                    });

                    // replace empty heading or pre with P tag
                    if ((dom.isHeading(nextPara) || dom.isPre(nextPara)) && dom.isEmpty(nextPara)) {
                        nextPara = dom.replace(nextPara, 'p');
                    }
                }
                // no paragraph: insert empty paragraph
            } else {
                var next = rng.sc.childNodes[rng.so];
                nextPara = $(dom.emptyPara)[0];
                if (next) {
                    rng.sc.insertBefore(nextPara, next);
                } else {
                    rng.sc.appendChild(nextPara);
                }
            }

            range.create(nextPara, 0).normalize().select().scrollIntoView(editable);
        };
    };

    /**
     * @class editing.Table
     *
     * Table
     *
     */
    var Table = function () {
        /**
         * handle tab key
         *
         * @param {WrappedRange} rng
         * @param {Boolean} isShift
         */
        this.tab = function (rng, isShift) {
            var cell = dom.ancestor(rng.commonAncestor(), dom.isCell);
            var table = dom.ancestor(cell, dom.isTable);
            var cells = dom.listDescendant(table, dom.isCell);

            var nextCell = list[isShift ? 'prev' : 'next'](cells, cell);
            if (nextCell) {
                range.create(nextCell, 0).select();
            }
        };

        /**
         * create empty table element
         *
         * @param {Number} rowCount
         * @param {Number} colCount
         * @return {Node}
         */
        this.createTable = function (colCount, rowCount, options) {
            var tds = [],
                tdHTML;
            for (var idxCol = 0; idxCol < colCount; idxCol++) {
                tds.push('<td>' + dom.blank + '</td>');
            }
            tdHTML = tds.join('');

            var trs = [],
                trHTML;
            for (var idxRow = 0; idxRow < rowCount; idxRow++) {
                trs.push('<tr>' + tdHTML + '</tr>');
            }
            trHTML = trs.join('');
            var $table = $('<table>' + trHTML + '</table>');
            if (options && options.tableClassName) {
                $table.addClass(options.tableClassName);
            }

            return $table[0];
        };
    };

    var KEY_BOGUS = 'bogus';

    /**
     * @class Editor
     */
    var Editor = function (context) {
        var self = this;

        var $note = context.layoutInfo.note;
        var $editor = context.layoutInfo.editor;
        var $editable = context.layoutInfo.editable;
        var options = context.options;
        var lang = options.langInfo;

        var editable = $editable[0];
        var lastRange = null;

        var style = new Style();
        var table = new Table();
        var typing = new Typing();
        var bullet = new Bullet();
        var history = new History($editable);

        this.initialize = function () {
            // bind custom events
            $editable.on('keydown', function (event) {
                if (event.keyCode === key.code.ENTER) {
                    context.triggerEvent('enter', event);
                }
                context.triggerEvent('keydown', event);

                if (!event.isDefaultPrevented()) {
                    if (options.shortcuts) {
                        self.handleKeyMap(event);
                    } else {
                        self.preventDefaultEditableShortCuts(event);
                    }
                }
            }).on('keyup', function (event) {
                context.triggerEvent('keyup', event);
            }).on('focus', function (event) {
                context.triggerEvent('focus', event);
            }).on('blur', function (event) {
                context.triggerEvent('blur', event);
            }).on('mousedown', function (event) {
                context.triggerEvent('mousedown', event);
            }).on('mouseup', function (event) {
                context.triggerEvent('mouseup', event);
            }).on('scroll', function (event) {
                context.triggerEvent('scroll', event);
            }).on('paste', function (event) {
                context.triggerEvent('paste', event);
            });

            // init content before set event
            $editable.html(dom.html($note) || dom.emptyPara);

            // [workaround] IE doesn't have input events for contentEditable
            // - see: https://goo.gl/4bfIvA
            var changeEventName = agent.isMSIE ? 'DOMCharacterDataModified DOMSubtreeModified DOMNodeInserted' : 'input';
            $editable.on(changeEventName, func.debounce(function () {
                context.triggerEvent('change', $editable.html());
            }, 250));

            $editor.on('focusin', function (event) {
                context.triggerEvent('focusin', event);
            }).on('focusout', function (event) {
                context.triggerEvent('focusout', event);
            });

            if (!options.airMode) {
                if (options.width) {
                    $editor.outerWidth(options.width);
                }
                if (options.height) {
                    $editable.outerHeight(options.height);
                }
                if (options.maxHeight) {
                    $editable.css('max-height', options.maxHeight);
                }
                if (options.minHeight) {
                    $editable.css('min-height', options.minHeight);
                }
            }

            history.recordUndo();
        };

        this.destroy = function () {
            $editable.off();
        };

        this.handleKeyMap = function (event) {
            var keyMap = options.keyMap[agent.isMac ? 'mac' : 'pc'];
            var keys = [];

            if (event.metaKey) {
                keys.push('CMD');
            }
            if (event.ctrlKey && !event.altKey) {
                keys.push('CTRL');
            }
            if (event.shiftKey) {
                keys.push('SHIFT');
            }

            var keyName = key.nameFromCode[event.keyCode];
            if (keyName) {
                keys.push(keyName);
            }

            var eventName = keyMap[keys.join('+')];
            if (eventName) {
                event.preventDefault();
                context.invoke(eventName);
            } else if (key.isEdit(event.keyCode)) {
                this.afterCommand();
            }
        };

        this.preventDefaultEditableShortCuts = function (event) {
            // B(Bold, 66) / I(Italic, 73) / U(Underline, 85)
            if ((event.ctrlKey || event.metaKey) && list.contains([66, 73, 85], event.keyCode)) {
                event.preventDefault();
            }
        };

        /**
         * create range
         * @return {WrappedRange}
         */
        this.createRange = function () {
            this.focus();
            return range.create(editable);
        };

        /**
         * saveRange
         *
         * save current range
         *
         * @param {Boolean} [thenCollapse=false]
         */
        this.saveRange = function (thenCollapse) {
            lastRange = this.createRange();
            if (thenCollapse) {
                lastRange.collapse().select();
            }
        };

        /**
         * restoreRange
         *
         * restore lately range
         */
        this.restoreRange = function () {
            if (lastRange) {
                lastRange.select();
                this.focus();
            }
        };

        this.saveTarget = function (node) {
            $editable.data('target', node);
        };

        this.clearTarget = function () {
            $editable.removeData('target');
        };

        this.restoreTarget = function () {
            return $editable.data('target');
        };

        /**
         * currentStyle
         *
         * current style
         * @return {Object|Boolean} unfocus
         */
        this.currentStyle = function () {
            var rng = range.create();
            if (rng) {
                rng = rng.normalize();
            }
            return rng ? style.current(rng) : style.fromNode($editable);
        };

        /**
         * style from node
         *
         * @param {jQuery} $node
         * @return {Object}
         */
        this.styleFromNode = function ($node) {
            return style.fromNode($node);
        };

        /**
         * undo
         */
        this.undo = function () {
            context.triggerEvent('before.command', $editable.html());
            history.undo();
            context.triggerEvent('change', $editable.html());
        };
        context.memo('help.undo', lang.help.undo);

        /**
         * redo
         */
        this.redo = function () {
            context.triggerEvent('before.command', $editable.html());
            history.redo();
            context.triggerEvent('change', $editable.html());
        };
        context.memo('help.redo', lang.help.redo);

        /**
         * before command
         */
        var beforeCommand = this.beforeCommand = function () {
            context.triggerEvent('before.command', $editable.html());
            // keep focus on editable before command execution
            self.focus();
        };

        /**
         * after command
         * @param {Boolean} isPreventTrigger
         */
        var afterCommand = this.afterCommand = function (isPreventTrigger) {
            history.recordUndo();
            if (!isPreventTrigger) {
                context.triggerEvent('change', $editable.html());
            }
        };

        /* jshint ignore:start */
        // native commands(with execCommand), generate function for execCommand
        var commands = ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'formatBlock', 'removeFormat', 'backColor', 'foreColor', 'fontName'];

        for (var idx = 0, len = commands.length; idx < len; idx++) {
            this[commands[idx]] = function (sCmd) {
                return function (value) {
                    beforeCommand();
                    document.execCommand(sCmd, false, value);
                    afterCommand(true);
                };
            }(commands[idx]);
            context.memo('help.' + commands[idx], lang.help[commands[idx]]);
        }
        /* jshint ignore:end */

        /**
         * handle tab key
         */
        this.tab = function () {
            var rng = this.createRange();
            if (rng.isCollapsed() && rng.isOnCell()) {
                table.tab(rng);
            } else {
                beforeCommand();
                typing.insertTab(rng, options.tabSize);
                afterCommand();
            }
        };
        context.memo('help.tab', lang.help.tab);

        /**
         * handle shift+tab key
         */
        this.untab = function () {
            var rng = this.createRange();
            if (rng.isCollapsed() && rng.isOnCell()) {
                table.tab(rng, true);
            }
        };
        context.memo('help.untab', lang.help.untab);

        /**
         * run given function between beforeCommand and afterCommand
         */
        this.wrapCommand = function (fn) {
            return function () {
                beforeCommand();
                fn.apply(self, arguments);
                afterCommand();
            };
        };

        /**
         * insert paragraph
         */
        this.insertParagraph = this.wrapCommand(function () {
            typing.insertParagraph(editable);
        });
        context.memo('help.insertParagraph', lang.help.insertParagraph);

        this.insertOrderedList = this.wrapCommand(function () {
            bullet.insertOrderedList(editable);
        });
        context.memo('help.insertOrderedList', lang.help.insertOrderedList);

        this.insertUnorderedList = this.wrapCommand(function () {
            bullet.insertUnorderedList(editable);
        });
        context.memo('help.insertUnorderedList', lang.help.insertUnorderedList);

        this.indent = this.wrapCommand(function () {
            bullet.indent(editable);
        });
        context.memo('help.indent', lang.help.indent);

        this.outdent = this.wrapCommand(function () {
            bullet.outdent(editable);
        });
        context.memo('help.outdent', lang.help.outdent);

        /**
         * insert image
         *
         * @param {String} src
         * @param {String|Function} param
         * @return {Promise}
         */
        this.insertImage = function (src, param) {
            return async.createImage(src, param).then(function ($image) {
                beforeCommand();

                if (typeof param === 'function') {
                    param($image);
                } else {
                    if (typeof param === 'string') {
                        $image.attr('data-filename', param);
                    }
                    $image.css('width', Math.min($editable.width(), $image.width()));
                }

                $image.show();
                range.create(editable).insertNode($image[0]);
                range.createFromNodeAfter($image[0]).select();
                afterCommand();
            }).fail(function (e) {
                context.triggerEvent('image.upload.error', e);
            });
        };

        /**
         * insertImages
         * @param {File[]} files
         */
        this.insertImages = function (files) {
            $.each(files, function (idx, file) {
                var filename = file.name;
                if (options.maximumImageFileSize && options.maximumImageFileSize < file.size) {
                    context.triggerEvent('image.upload.error', lang.image.maximumFileSizeError);
                } else {
                    async.readFileAsDataURL(file).then(function (dataURL) {
                        return self.insertImage(dataURL, filename);
                    }).fail(function () {
                        context.triggerEvent('image.upload.error');
                    });
                }
            });
        };

        /**
         * insertImagesOrCallback
         * @param {File[]} files
         */
        this.insertImagesOrCallback = function (files) {
            var callbacks = options.callbacks;

            // If onImageUpload options setted
            if (callbacks.onImageUpload) {
                context.triggerEvent('image.upload', files);
                // else insert Image as dataURL
            } else {
                this.insertImages(files);
            }
        };

        /**
         * insertNode
         * insert node
         * @param {Node} node
         */
        this.insertNode = this.wrapCommand(function (node) {
            var rng = this.createRange();
            rng.insertNode(node);
            range.createFromNodeAfter(node).select();
        });

        /**
         * insert text
         * @param {String} text
         */
        this.insertText = this.wrapCommand(function (text) {
            var rng = this.createRange();
            var textNode = rng.insertNode(dom.createText(text));
            range.create(textNode, dom.nodeLength(textNode)).select();
        });

        /**
         * return selected plain text
         * @return {String} text
         */
        this.getSelectedText = function () {
            var rng = this.createRange();

            // if range on anchor, expand range with anchor
            if (rng.isOnAnchor()) {
                rng = range.createFromNode(dom.ancestor(rng.sc, dom.isAnchor));
            }

            return rng.toString();
        };

        /**
         * paste HTML
         * @param {String} markup
         */
        this.pasteHTML = this.wrapCommand(function (markup) {
            var contents = this.createRange().pasteHTML(markup);
            range.createFromNodeAfter(list.last(contents)).select();
        });

        /**
         * formatBlock
         *
         * @param {String} tagName
         */
        this.formatBlock = this.wrapCommand(function (tagName) {
            // [workaround] for MSIE, IE need `<`
            tagName = agent.isMSIE ? '<' + tagName + '>' : tagName;
            document.execCommand('FormatBlock', false, tagName);
        });

        this.formatPara = function () {
            this.formatBlock('P');
        };
        context.memo('help.formatPara', lang.help.formatPara);

        /* jshint ignore:start */
        for (var idx = 1; idx <= 6; idx++) {
            this['formatH' + idx] = function (idx) {
                return function () {
                    this.formatBlock('H' + idx);
                };
            }(idx);
            context.memo('help.formatH' + idx, lang.help['formatH' + idx]);
        }
        /* jshint ignore:end */

        /**
         * fontSize
         *
         * @param {String} value - px
         */
        this.fontSize = function (value) {
            var rng = this.createRange();

            if (rng && rng.isCollapsed()) {
                var spans = style.styleNodes(rng);
                var firstSpan = list.head(spans);

                $(spans).css({
                    'font-size': value + 'px'
                });

                // [workaround] added styled bogus span for style
                //  - also bogus character needed for cursor position
                if (firstSpan && !dom.nodeLength(firstSpan)) {
                    firstSpan.innerHTML = dom.ZERO_WIDTH_NBSP_CHAR;
                    range.createFromNodeAfter(firstSpan.firstChild).select();
                    $editable.data(KEY_BOGUS, firstSpan);
                }
            } else {
                beforeCommand();
                $(style.styleNodes(rng)).css({
                    'font-size': value + 'px'
                });
                afterCommand();
            }
        };

        /**
         * insert horizontal rule
         */
        this.insertHorizontalRule = this.wrapCommand(function () {
            var hrNode = this.createRange().insertNode(dom.create('HR'));
            if (hrNode.nextSibling) {
                range.create(hrNode.nextSibling, 0).normalize().select();
            }
        });
        context.memo('help.insertHorizontalRule', lang.help.insertHorizontalRule);

        /**
         * remove bogus node and character
         */
        this.removeBogus = function () {
            var bogusNode = $editable.data(KEY_BOGUS);
            if (!bogusNode) {
                return;
            }

            var textNode = list.find(list.from(bogusNode.childNodes), dom.isText);

            var bogusCharIdx = textNode.nodeValue.indexOf(dom.ZERO_WIDTH_NBSP_CHAR);
            if (bogusCharIdx !== -1) {
                textNode.deleteData(bogusCharIdx, 1);
            }

            if (dom.isEmpty(bogusNode)) {
                dom.remove(bogusNode);
            }

            $editable.removeData(KEY_BOGUS);
        };

        /**
         * lineHeight
         * @param {String} value
         */
        this.lineHeight = this.wrapCommand(function (value) {
            style.stylePara(this.createRange(), {
                lineHeight: value
            });
        });

        /**
         * unlink
         *
         * @type command
         */
        this.unlink = function () {
            var rng = this.createRange();
            if (rng.isOnAnchor()) {
                var anchor = dom.ancestor(rng.sc, dom.isAnchor);
                rng = range.createFromNode(anchor);
                rng.select();

                beforeCommand();
                document.execCommand('unlink');
                afterCommand();
            }
        };

        /**
         * create link (command)
         *
         * @param {Object} linkInfo
         */
        this.createLink = this.wrapCommand(function (linkInfo) {
            var linkUrl = linkInfo.url;
            var linkText = linkInfo.text;
            var isNewWindow = linkInfo.isNewWindow;
            var rng = linkInfo.range || this.createRange();
            var isTextChanged = rng.toString() !== linkText;

            // handle spaced urls from input
            if (typeof linkUrl === 'string') {
                linkUrl = linkUrl.trim();
            }

            if (options.onCreateLink) {
                linkUrl = options.onCreateLink(linkUrl);
            }

            var anchors = [];
            if (isTextChanged) {
                rng = rng.deleteContents();
                var anchor = rng.insertNode($('<A>' + linkText + '</A>')[0]);
                anchors.push(anchor);
            } else {
                anchors = style.styleNodes(rng, {
                    nodeName: 'A',
                    expandClosestSibling: true,
                    onlyPartialContains: true
                });
            }

            $.each(anchors, function (idx, anchor) {
                // if url doesn't match an URL schema, set http:// as default
                linkUrl = /^[A-Za-z][A-Za-z0-9+-.]*\:[\/\/]?/.test(linkUrl) ? linkUrl : 'http://' + linkUrl;

                $(anchor).attr('href', linkUrl);
                if (isNewWindow) {
                    $(anchor).attr('target', '_blank');
                } else {
                    $(anchor).removeAttr('target');
                }
            });

            var startRange = range.createFromNodeBefore(list.head(anchors));
            var startPoint = startRange.getStartPoint();
            var endRange = range.createFromNodeAfter(list.last(anchors));
            var endPoint = endRange.getEndPoint();

            range.create(startPoint.node, startPoint.offset, endPoint.node, endPoint.offset).select();
        });

        /**
         * returns link info
         *
         * @return {Object}
         * @return {WrappedRange} return.range
         * @return {String} return.text
         * @return {Boolean} [return.isNewWindow=true]
         * @return {String} [return.url=""]
         */
        this.getLinkInfo = function () {
            var rng = this.createRange().expand(dom.isAnchor);

            // Get the first anchor on range(for edit).
            var $anchor = $(list.head(rng.nodes(dom.isAnchor)));

            return {
                range: rng,
                text: rng.toString(),
                isNewWindow: $anchor.length ? $anchor.attr('target') === '_blank' : false,
                url: $anchor.length ? $anchor.attr('href') : ''
            };
        };

        /**
         * setting color
         *
         * @param {Object} sObjColor  color code
         * @param {String} sObjColor.foreColor foreground color
         * @param {String} sObjColor.backColor background color
         */
        this.color = this.wrapCommand(function (colorInfo) {
            var foreColor = colorInfo.foreColor;
            var backColor = colorInfo.backColor;

            if (foreColor) {
                document.execCommand('foreColor', false, foreColor);
            }
            if (backColor) {
                document.execCommand('backColor', false, backColor);
            }
        });

        /**
         * insert Table
         *
         * @param {String} dimension of table (ex : "5x5")
         */
        this.insertTable = this.wrapCommand(function (dim) {
            var dimension = dim.split('x');

            var rng = this.createRange().deleteContents();
            rng.insertNode(table.createTable(dimension[0], dimension[1], options));
        });

        /**
         * float me
         *
         * @param {String} value
         */
        this.floatMe = this.wrapCommand(function (value) {
            var $target = $(this.restoreTarget());
            $target.css('float', value);
        });

        /**
         * resize overlay element
         * @param {String} value
         */
        this.resize = this.wrapCommand(function (value) {
            var $target = $(this.restoreTarget());
            $target.css({
                width: value * 100 + '%',
                height: ''
            });
        });

        /**
         * @param {Position} pos
         * @param {jQuery} $target - target element
         * @param {Boolean} [bKeepRatio] - keep ratio
         */
        this.resizeTo = function (pos, $target, bKeepRatio) {
            var imageSize;
            if (bKeepRatio) {
                var newRatio = pos.y / pos.x;
                var ratio = $target.data('ratio');
                imageSize = {
                    width: ratio > newRatio ? pos.x : pos.y / ratio,
                    height: ratio > newRatio ? pos.x * ratio : pos.y
                };
            } else {
                imageSize = {
                    width: pos.x,
                    height: pos.y
                };
            }

            $target.css(imageSize);
        };

        /**
         * remove media object
         */
        this.removeMedia = this.wrapCommand(function () {
            var $target = $(this.restoreTarget()).detach();
            context.triggerEvent('media.delete', $target, $editable);
        });

        /**
         * returns whether editable area has focus or not.
         */
        this.hasFocus = function () {
            return $editable.is(':focus');
        };

        /**
         * set focus
         */
        this.focus = function () {
            // [workaround] Screen will move when page is scolled in IE.
            //  - do focus when not focused
            if (!this.hasFocus()) {
                $editable.focus();
            }
        };

        /**
         * returns whether contents is empty or not.
         * @return {Boolean}
         */
        this.isEmpty = function () {
            return dom.isEmpty($editable[0]) || dom.emptyPara === $editable.html();
        };

        /**
         * Removes all contents and restores the editable instance to an _emptyPara_.
         */
        this.empty = function () {
            context.invoke('code', dom.emptyPara);
        };
    };

    var Clipboard = function (context) {
        var self = this;

        var $editable = context.layoutInfo.editable;

        this.events = {
            'summernote.keydown': function (we, e) {
                if (self.needKeydownHook()) {
                    if ((e.ctrlKey || e.metaKey) && e.keyCode === key.code.V) {
                        context.invoke('editor.saveRange');
                        self.$paste.focus();

                        setTimeout(function () {
                            self.pasteByHook();
                        }, 0);
                    }
                }
            }
        };

        this.needKeydownHook = function () {
            return agent.isMSIE && agent.browserVersion > 10 || agent.isFF;
        };

        this.initialize = function () {
            // [workaround] getting image from clipboard
            //  - IE11 and Firefox: CTRL+v hook
            //  - Webkit: event.clipboardData
            if (this.needKeydownHook()) {
                this.$paste = $('<div tabindex="-1" />').attr('contenteditable', true).css({
                    position: 'absolute',
                    left: -100000,
                    opacity: 0
                });
                $editable.before(this.$paste);

                this.$paste.on('paste', function (event) {
                    context.triggerEvent('paste', event);
                });
            } else {
                $editable.on('paste', this.pasteByEvent);
            }
        };

        this.destroy = function () {
            if (this.needKeydownHook()) {
                this.$paste.remove();
                this.$paste = null;
            }
        };

        this.pasteByHook = function () {
            var node = this.$paste[0].firstChild;

            if (dom.isImg(node)) {
                var dataURI = node.src;
                var decodedData = atob(dataURI.split(',')[1]);
                var array = new Uint8Array(decodedData.length);
                for (var i = 0; i < decodedData.length; i++) {
                    array[i] = decodedData.charCodeAt(i);
                }

                var blob = new Blob([array], { type: 'image/png' });
                blob.name = 'clipboard.png';

                context.invoke('editor.restoreRange');
                context.invoke('editor.focus');
                context.invoke('editor.insertImagesOrCallback', [blob]);
            } else {
                var pasteContent = $('<div />').html(this.$paste.html()).html();
                context.invoke('editor.restoreRange');
                context.invoke('editor.focus');

                if (pasteContent) {
                    context.invoke('editor.pasteHTML', pasteContent);
                }
            }

            this.$paste.empty();
        };

        /**
         * paste by clipboard event
         *
         * @param {Event} event
         */
        this.pasteByEvent = function (event) {
            var clipboardData = event.originalEvent.clipboardData;
            if (clipboardData && clipboardData.items && clipboardData.items.length) {
                var item = list.head(clipboardData.items);
                if (item.kind === 'file' && item.type.indexOf('image/') !== -1) {
                    context.invoke('editor.insertImagesOrCallback', [item.getAsFile()]);
                }
                context.invoke('editor.afterCommand');
            }
        };
    };

    var Dropzone = function (context) {
        var $document = $(document);
        var $editor = context.layoutInfo.editor;
        var $editable = context.layoutInfo.editable;
        var options = context.options;
        var lang = options.langInfo;
        var documentEventHandlers = {};

        var $dropzone = $(['<div class="note-dropzone">', '  <div class="note-dropzone-message"/>', '</div>'].join('')).prependTo($editor);

        var detachDocumentEvent = function () {
            Object.keys(documentEventHandlers).forEach(function (key) {
                $document.off(key.substr(2).toLowerCase(), documentEventHandlers[key]);
            });
            documentEventHandlers = {};
        };

        /**
         * attach Drag and Drop Events
         */
        this.initialize = function () {
            if (options.disableDragAndDrop) {
                // prevent default drop event
                documentEventHandlers.onDrop = function (e) {
                    e.preventDefault();
                };
                $document.on('drop', documentEventHandlers.onDrop);
            } else {
                this.attachDragAndDropEvent();
            }
        };

        /**
         * attach Drag and Drop Events
         */
        this.attachDragAndDropEvent = function () {
            var collection = $(),
                $dropzoneMessage = $dropzone.find('.note-dropzone-message');

            documentEventHandlers.onDragenter = function (e) {
                var isCodeview = context.invoke('codeview.isActivated');
                var hasEditorSize = $editor.width() > 0 && $editor.height() > 0;
                if (!isCodeview && !collection.length && hasEditorSize) {
                    $editor.addClass('dragover');
                    $dropzone.width($editor.width());
                    $dropzone.height($editor.height());
                    $dropzoneMessage.text(lang.image.dragImageHere);
                }
                collection = collection.add(e.target);
            };

            documentEventHandlers.onDragleave = function (e) {
                collection = collection.not(e.target);
                if (!collection.length) {
                    $editor.removeClass('dragover');
                }
            };

            documentEventHandlers.onDrop = function () {
                collection = $();
                $editor.removeClass('dragover');
            };

            // show dropzone on dragenter when dragging a object to document
            // -but only if the editor is visible, i.e. has a positive width and height
            $document.on('dragenter', documentEventHandlers.onDragenter).on('dragleave', documentEventHandlers.onDragleave).on('drop', documentEventHandlers.onDrop);

            // change dropzone's message on hover.
            $dropzone.on('dragenter', function () {
                $dropzone.addClass('hover');
                $dropzoneMessage.text(lang.image.dropImage);
            }).on('dragleave', function () {
                $dropzone.removeClass('hover');
                $dropzoneMessage.text(lang.image.dragImageHere);
            });

            // attach dropImage
            $dropzone.on('drop', function (event) {
                var dataTransfer = event.originalEvent.dataTransfer;

                if (dataTransfer && dataTransfer.files && dataTransfer.files.length) {
                    event.preventDefault();
                    $editable.focus();
                    context.invoke('editor.insertImagesOrCallback', dataTransfer.files);
                } else {
                    $.each(dataTransfer.types, function (idx, type) {
                        var content = dataTransfer.getData(type);

                        if (type.toLowerCase().indexOf('text') > -1) {
                            context.invoke('editor.pasteHTML', content);
                        } else {
                            $(content).each(function () {
                                context.invoke('editor.insertNode', this);
                            });
                        }
                    });
                }
            }).on('dragover', false); // prevent default dragover event
        };

        this.destroy = function () {
            detachDocumentEvent();
        };
    };

    var CodeMirror;
    if (agent.hasCodeMirror) {
        if (agent.isSupportAmd) {
            require(['codemirror'], function (cm) {
                CodeMirror = cm;
            });
        } else {
            CodeMirror = window.CodeMirror;
        }
    }

    /**
     * @class Codeview
     */
    var Codeview = function (context) {
        var $editor = context.layoutInfo.editor;
        var $editable = context.layoutInfo.editable;
        var $codable = context.layoutInfo.codable;
        var options = context.options;

        this.sync = function () {
            var isCodeview = this.isActivated();
            if (isCodeview && agent.hasCodeMirror) {
                $codable.data('cmEditor').save();
            }
        };

        /**
         * @return {Boolean}
         */
        this.isActivated = function () {
            return $editor.hasClass('codeview');
        };

        /**
         * toggle codeview
         */
        this.toggle = function () {
            if (this.isActivated()) {
                this.deactivate();
            } else {
                this.activate();
            }
            context.triggerEvent('codeview.toggled');
        };

        /**
         * activate code view
         */
        this.activate = function () {
            $codable.val(dom.html($editable, options.prettifyHtml));
            $codable.height($editable.height());

            context.invoke('toolbar.updateCodeview', true);
            $editor.addClass('codeview');
            $codable.focus();

            // activate CodeMirror as codable
            if (agent.hasCodeMirror) {
                var cmEditor = CodeMirror.fromTextArea($codable[0], options.codemirror);

                // CodeMirror TernServer
                if (options.codemirror.tern) {
                    var server = new CodeMirror.TernServer(options.codemirror.tern);
                    cmEditor.ternServer = server;
                    cmEditor.on('cursorActivity', function (cm) {
                        server.updateArgHints(cm);
                    });
                }

                // CodeMirror hasn't Padding.
                cmEditor.setSize(null, $editable.outerHeight());
                $codable.data('cmEditor', cmEditor);
            }
        };

        /**
         * deactivate code view
         */
        this.deactivate = function () {
            // deactivate CodeMirror as codable
            if (agent.hasCodeMirror) {
                var cmEditor = $codable.data('cmEditor');
                $codable.val(cmEditor.getValue());
                cmEditor.toTextArea();
            }

            var value = dom.value($codable, options.prettifyHtml) || dom.emptyPara;
            var isChange = $editable.html() !== value;

            $editable.html(value);
            $editable.height(options.height ? $codable.height() : 'auto');
            $editor.removeClass('codeview');

            if (isChange) {
                context.triggerEvent('change', $editable.html(), $editable);
            }

            $editable.focus();

            context.invoke('toolbar.updateCodeview', false);
        };

        this.destroy = function () {
            if (this.isActivated()) {
                this.deactivate();
            }
        };
    };

    var EDITABLE_PADDING = 24;

    var Statusbar = function (context) {
        var $document = $(document);
        var $statusbar = context.layoutInfo.statusbar;
        var $editable = context.layoutInfo.editable;
        var options = context.options;

        this.initialize = function () {
            if (options.airMode || options.disableResizeEditor) {
                return;
            }

            $statusbar.on('mousedown', function (event) {
                event.preventDefault();
                event.stopPropagation();

                var editableTop = $editable.offset().top - $document.scrollTop();

                $document.on('mousemove', function (event) {
                    var height = event.clientY - (editableTop + EDITABLE_PADDING);

                    height = options.minheight > 0 ? Math.max(height, options.minheight) : height;
                    height = options.maxHeight > 0 ? Math.min(height, options.maxHeight) : height;

                    $editable.height(height);
                }).one('mouseup', function () {
                    $document.off('mousemove');
                });
            });
        };

        this.destroy = function () {
            $statusbar.off();
            $statusbar.remove();
        };
    };

    var Fullscreen = function (context) {
        var $editor = context.layoutInfo.editor;
        var $toolbar = context.layoutInfo.toolbar;
        var $editable = context.layoutInfo.editable;
        var $codable = context.layoutInfo.codable;

        var $window = $(window);
        var $scrollbar = $('html, body');

        /**
         * toggle fullscreen
         */
        this.toggle = function () {
            var resize = function (size) {
                $editable.css('height', size.h);
                $codable.css('height', size.h);
                if ($codable.data('cmeditor')) {
                    $codable.data('cmeditor').setsize(null, size.h);
                }
            };

            $editor.toggleClass('fullscreen');
            if (this.isFullscreen()) {
                $editable.data('orgHeight', $editable.css('height'));

                $window.on('resize', function () {
                    resize({
                        h: $window.height() - $toolbar.outerHeight()
                    });
                }).trigger('resize');

                $scrollbar.css('overflow', 'hidden');
            } else {
                $window.off('resize');
                resize({
                    h: $editable.data('orgHeight')
                });
                $scrollbar.css('overflow', 'visible');
            }

            context.invoke('toolbar.updateFullscreen', this.isFullscreen());
        };

        this.isFullscreen = function () {
            return $editor.hasClass('fullscreen');
        };
    };

    var Handle = function (context) {
        var self = this;

        var $document = $(document);
        var $editingArea = context.layoutInfo.editingArea;
        var options = context.options;

        this.events = {
            'summernote.mousedown': function (we, e) {
                if (self.update(e.target)) {
                    e.preventDefault();
                }
            },
            'summernote.keyup summernote.scroll summernote.change summernote.dialog.shown': function () {
                self.update();
            }
        };

        this.initialize = function () {
            this.$handle = $(['<div class="note-handle">', '<div class="note-control-selection">', '<div class="note-control-selection-bg"></div>', '<div class="note-control-holder note-control-nw"></div>', '<div class="note-control-holder note-control-ne"></div>', '<div class="note-control-holder note-control-sw"></div>', '<div class="', options.disableResizeImage ? 'note-control-holder' : 'note-control-sizing', ' note-control-se"></div>', options.disableResizeImage ? '' : '<div class="note-control-selection-info"></div>', '</div>', '</div>'].join('')).prependTo($editingArea);

            this.$handle.on('mousedown', function (event) {
                if (dom.isControlSizing(event.target)) {
                    event.preventDefault();
                    event.stopPropagation();

                    var $target = self.$handle.find('.note-control-selection').data('target'),
                        posStart = $target.offset(),
                        scrollTop = $document.scrollTop();

                    $document.on('mousemove', function (event) {
                        context.invoke('editor.resizeTo', {
                            x: event.clientX - posStart.left,
                            y: event.clientY - (posStart.top - scrollTop)
                        }, $target, !event.shiftKey);

                        self.update($target[0]);
                    }).one('mouseup', function (e) {
                        e.preventDefault();
                        $document.off('mousemove');
                        context.invoke('editor.afterCommand');
                    });

                    if (!$target.data('ratio')) {
                        // original ratio.
                        $target.data('ratio', $target.height() / $target.width());
                    }
                }
            });
        };

        this.destroy = function () {
            this.$handle.remove();
        };

        this.update = function (target) {
            var isImage = dom.isImg(target);
            var $selection = this.$handle.find('.note-control-selection');

            context.invoke('imagePopover.update', target);

            if (isImage) {
                var $image = $(target);
                var pos = $image.position();

                // include margin
                var imageSize = {
                    w: $image.outerWidth(true),
                    h: $image.outerHeight(true)
                };

                $selection.css({
                    display: 'block',
                    left: pos.left,
                    top: pos.top,
                    width: imageSize.w,
                    height: imageSize.h
                }).data('target', $image); // save current image element.

                var sizingText = imageSize.w + 'x' + imageSize.h;
                $selection.find('.note-control-selection-info').text(sizingText);
                context.invoke('editor.saveTarget', target);
            } else {
                this.hide();
            }

            return isImage;
        };

        /**
         * hide
         *
         * @param {jQuery} $handle
         */
        this.hide = function () {
            context.invoke('editor.clearTarget');
            this.$handle.children().hide();
        };
    };

    var AutoLink = function (context) {
        var self = this;
        var defaultScheme = 'http://';
        var linkPattern = /^([A-Za-z][A-Za-z0-9+-.]*\:[\/\/]?|mailto:[A-Z0-9._%+-]+@)?(www\.)?(.+)$/i;

        this.events = {
            'summernote.keyup': function (we, e) {
                if (!e.isDefaultPrevented()) {
                    self.handleKeyup(e);
                }
            },
            'summernote.keydown': function (we, e) {
                self.handleKeydown(e);
            }
        };

        this.initialize = function () {
            this.lastWordRange = null;
        };

        this.destroy = function () {
            this.lastWordRange = null;
        };

        this.replace = function () {
            if (!this.lastWordRange) {
                return;
            }

            var keyword = this.lastWordRange.toString();
            var match = keyword.match(linkPattern);

            if (match && (match[1] || match[2])) {
                var link = match[1] ? keyword : defaultScheme + keyword;
                var node = $('<a />').html(keyword).attr('href', link)[0];

                this.lastWordRange.insertNode(node);
                this.lastWordRange = null;
                context.invoke('editor.focus');
            }
        };

        this.handleKeydown = function (e) {
            if (list.contains([key.code.ENTER, key.code.SPACE], e.keyCode)) {
                var wordRange = context.invoke('editor.createRange').getWordRange();
                this.lastWordRange = wordRange;
            }
        };

        this.handleKeyup = function (e) {
            if (list.contains([key.code.ENTER, key.code.SPACE], e.keyCode)) {
                this.replace();
            }
        };
    };

    /**
     * textarea auto sync.
     */
    var AutoSync = function (context) {
        var $note = context.layoutInfo.note;

        this.events = {
            'summernote.change': function () {
                $note.val(context.invoke('code'));
            }
        };

        this.shouldInitialize = function () {
            return dom.isTextarea($note[0]);
        };
    };

    var Placeholder = function (context) {
        var self = this;
        var $editingArea = context.layoutInfo.editingArea;
        var options = context.options;

        this.events = {
            'summernote.init summernote.change': function () {
              //  self.update();
            },
            'summernote.codeview.toggled': function () {
                self.update();
            }
        };

        this.shouldInitialize = function () {
            return !!options.placeholder;
        };

        this.initialize = function () {
            this.$placeholder = $('<div class="note-placeholder">');
            this.$placeholder.on('click', function () {
                context.invoke('focus');
            }).text(options.placeholder).prependTo($editingArea);
        };

        this.destroy = function () {
            this.$placeholder.remove();
        };

        this.update = function () {
            var isShow = !context.invoke('codeview.isActivated') && context.invoke('editor.isEmpty');
            this.$placeholder.toggle(isShow);
        };
    };

    var Buttons = function (context) {
        var self = this;
        var ui = $.summernote.ui;

        var $toolbar = context.layoutInfo.toolbar;
        var options = context.options;
        var lang = options.langInfo;

        var invertedKeyMap = func.invertObject(options.keyMap[agent.isMac ? 'mac' : 'pc']);

        var representShortcut = this.representShortcut = function (editorMethod) {
            var shortcut = invertedKeyMap[editorMethod];
            if (!options.shortcuts || !shortcut) {
                return '';
            }

            if (agent.isMac) {
                shortcut = shortcut.replace('CMD', '⌘').replace('SHIFT', '⇧');
            }

            shortcut = shortcut.replace('BACKSLASH', '\\').replace('SLASH', '/').replace('LEFTBRACKET', '[').replace('RIGHTBRACKET', ']');

            return ' (' + shortcut + ')';
        };

        this.initialize = function () {
            this.addToolbarButtons();
            this.addImagePopoverButtons();
            this.addLinkPopoverButtons();
            this.fontInstalledMap = {};
        };

        this.destroy = function () {
            delete this.fontInstalledMap;
        };

        this.isFontInstalled = function (name) {
            if (!self.fontInstalledMap.hasOwnProperty(name)) {
                self.fontInstalledMap[name] = agent.isFontInstalled(name) || list.contains(options.fontNamesIgnoreCheck, name);
            }

            return self.fontInstalledMap[name];
        };

        this.addToolbarButtons = function () {
            context.memo('button.style', function () {
                return ui.buttonGroup([ui.button({
                    className: '',
                    contents: ui.icon(options.icons.magic) + ' ' + ui.icon(options.icons.caret, 'span'),
                    tooltip: lang.style.style,
                    data: {
                        toggle: 'dropdown'
                    }
                }), ui.dropdown({
                    className: 'dropdown-style',
                    items: context.options.styleTags,
                    template: function (item) {

                        if (typeof item === 'string') {
                            item = { tag: item, title: lang.style.hasOwnProperty(item) ? lang.style[item] : item };
                        }

                        var tag = item.tag;
                        var title = item.title;
                        var style = item.style ? ' style="' + item.style + '" ' : '';
                        var className = item.className ? ' class="' + item.className + '"' : '';

                        return '<' + tag + style + className + '>' + title + '</' + tag + '>';
                    },
                    click: context.createInvokeHandler('editor.formatBlock')
                })]).render();
            });

            context.memo('button.bold', function () {
                return ui.button({
                    className: 'note-btn-bold',
                    contents: ui.icon(options.icons.bold),
                    tooltip: lang.font.bold + representShortcut('bold'),
                    click: context.createInvokeHandler('editor.bold')
                }).render();
            });

            context.memo('button.italic', function () {
                return ui.button({
                    className: 'note-btn-italic',
                    contents: ui.icon(options.icons.italic),
                    tooltip: lang.font.italic + representShortcut('italic'),
                    click: context.createInvokeHandler('editor.italic')
                }).render();
            });

            context.memo('button.underline', function () {
                return ui.button({
                    className: 'note-btn-underline',
                    contents: ui.icon(options.icons.underline),
                    tooltip: lang.font.underline + representShortcut('underline'),
                    click: context.createInvokeHandler('editor.underline')
                }).render();
            });

            context.memo('button.clear', function () {
                return ui.button({
                    contents: ui.icon(options.icons.eraser),
                    tooltip: lang.font.clear + representShortcut('removeFormat'),
                    click: context.createInvokeHandler('editor.removeFormat')
                }).render();
            });

            context.memo('button.strikethrough', function () {
                return ui.button({
                    className: 'note-btn-strikethrough',
                    contents: ui.icon(options.icons.strikethrough),
                    tooltip: lang.font.strikethrough + representShortcut('strikethrough'),
                    click: context.createInvokeHandler('editor.strikethrough')
                }).render();
            });

            context.memo('button.superscript', function () {
                return ui.button({
                    className: 'note-btn-superscript',
                    contents: ui.icon(options.icons.superscript),
                    tooltip: lang.font.superscript,
                    click: context.createInvokeHandler('editor.superscript')
                }).render();
            });

            context.memo('button.subscript', function () {
                return ui.button({
                    className: 'note-btn-subscript',
                    contents: ui.icon(options.icons.subscript),
                    tooltip: lang.font.subscript,
                    click: context.createInvokeHandler('editor.subscript')
                }).render();
            });

            context.memo('button.fontname', function () {
                return ui.buttonGroup([ui.button({
                    className: '',
                    contents: '<span class="note-current-fontname"/> ' + ui.icon(options.icons.caret, 'span'),
                    tooltip: lang.font.name,
                    data: {
                        toggle: 'dropdown'
                    }
                }), ui.dropdownCheck({
                    className: 'dropdown-fontname',
                    checkClassName: '',
                    items: options.fontNames.filter(self.isFontInstalled),
                    template: function (item) {
                        return '<span style="font-family:' + item + '">' + item + '</span>';
                    },
                    click: context.createInvokeHandler('editor.fontName')
                })]).render();
            });

            context.memo('button.fontsize', function () {
                return ui.buttonGroup([ui.button({
                    className: '',
                    contents: '<span class="note-current-fontsize"/>' + ui.icon(options.icons.caret, 'span'),
                    tooltip: lang.font.size,
                    data: {
                        toggle: 'dropdown'
                    }
                }), ui.dropdownCheck({
                    className: 'dropdown-fontsize',
                    checkClassName: options.icons.menuCheck,
                    items: options.fontSizes,
                    click: context.createInvokeHandler('editor.fontSize')
                })]).render();
            });

            context.memo('button.color', function () {
                return ui.buttonGroup({
                    className: 'note-color',
                    children: [ui.button({
                        className: 'note-current-color-button',
                        contents: ui.icon(options.icons.font + ' note-recent-color'),
                        tooltip: lang.color.recent,
                        click: function (e) {
                            var $button = $(e.currentTarget);
                            context.invoke('editor.color', {
                                backColor: $button.attr('data-backColor'),
                                foreColor: $button.attr('data-foreColor')
                            });
                        },
                        callback: function ($button) {
                            var $recentColor = $button.find('.note-recent-color');
                            $recentColor.css('background-color', '#FFFF00');
                            $button.attr('data-backColor', '#FFFF00');
                        }
                    }), ui.button({
                        className: '',
                        contents: ui.icon(options.icons.caret, 'span'),
                        tooltip: lang.color.more,
                        data: {
                            toggle: 'dropdown'
                        }
                    }), ui.dropdown({
                        items: ['<li>', '<div class="btn-group">', '  <div class="note-palette-title">' + lang.color.background + '</div>', '  <div>', '    <button type="button" class="note-color-reset btn btn-default" data-event="backColor" data-value="inherit">', lang.color.transparent, '    </button>', '  </div>', '  <div class="note-holder" data-event="backColor"/>', '</div>', '<div class="btn-group">', '  <div class="note-palette-title">' + lang.color.foreground + '</div>', '  <div>', '    <button type="button" class="note-color-reset btn btn-default" data-event="removeFormat" data-value="foreColor">', lang.color.resetToDefault, '    </button>', '  </div>', '  <div class="note-holder" data-event="foreColor"/>', '</div>', '</li>'].join(''),
                        callback: function ($dropdown) {
                            $dropdown.find('.note-holder').each(function () {
                                var $holder = $(this);
                                $holder.append(ui.palette({
                                    colors: options.colors,
                                    eventName: $holder.data('event')
                                }).render());
                            });
                        },
                        click: function (event) {
                            var $button = $(event.target);
                            var eventName = $button.data('event');
                            var value = $button.data('value');

                            if (eventName && value) {
                                var key = eventName === 'backColor' ? 'background-color' : 'color';
                                var $color = $button.closest('.note-color').find('.note-recent-color');
                                var $currentButton = $button.closest('.note-color').find('.note-current-color-button');

                                $color.css(key, value);
                                $currentButton.attr('data-' + eventName, value);
                                context.invoke('editor.' + eventName, value);
                            }
                        }
                    })]
                }).render();
            });

            context.memo('button.ul', function () {
                return ui.button({
                    contents: ui.icon(options.icons.unorderedlist),
                    tooltip: lang.lists.unordered + representShortcut('insertUnorderedList'),
                    click: context.createInvokeHandler('editor.insertUnorderedList')
                }).render();
            });

            context.memo('button.ol', function () {
                return ui.button({
                    contents: ui.icon(options.icons.orderedlist),
                    tooltip: lang.lists.ordered + representShortcut('insertOrderedList'),
                    click: context.createInvokeHandler('editor.insertOrderedList')
                }).render();
            });

            var justifyLeft = ui.button({
                contents: ui.icon(options.icons.alignLeft),
                tooltip: lang.paragraph.left + representShortcut('justifyLeft'),
                click: context.createInvokeHandler('editor.justifyLeft')
            });

            var justifyCenter = ui.button({
                contents: ui.icon(options.icons.alignCenter),
                tooltip: lang.paragraph.center + representShortcut('justifyCenter'),
                click: context.createInvokeHandler('editor.justifyCenter')
            });

            var justifyRight = ui.button({
                contents: ui.icon(options.icons.alignRight),
                tooltip: lang.paragraph.right + representShortcut('justifyRight'),
                click: context.createInvokeHandler('editor.justifyRight')
            });

            var justifyFull = ui.button({
                contents: ui.icon(options.icons.alignJustify),
                tooltip: lang.paragraph.justify + representShortcut('justifyFull'),
                click: context.createInvokeHandler('editor.justifyFull')
            });

            var outdent = ui.button({
                contents: ui.icon(options.icons.outdent),
                tooltip: lang.paragraph.outdent + representShortcut('outdent'),
                click: context.createInvokeHandler('editor.outdent')
            });

            var indent = ui.button({
                contents: ui.icon(options.icons.indent),
                tooltip: lang.paragraph.indent + representShortcut('indent'),
                click: context.createInvokeHandler('editor.indent')
            });

            context.memo('button.justifyLeft', justifyLeft.render());
            context.memo('button.justifyCenter', justifyCenter.render());
            context.memo('button.justifyRight', justifyRight.render());
            context.memo('button.justifyFull', justifyFull.render());
            context.memo('button.outdent', outdent.render());
            context.memo('button.indent', indent.render());

            context.memo('button.paragraph', function () {
                return ui.buttonGroup([ui.button({
                    className: '',
                    contents: ui.icon(options.icons.alignLeft) + ' ' + ui.icon(options.icons.caret, 'span'),
                    tooltip: lang.paragraph.paragraph,
                    data: {
                        toggle: 'dropdown'
                    }
                }), ui.dropdown([ui.buttonGroup({
                    className: 'note-align',
                    children: [justifyLeft, justifyCenter, justifyRight, justifyFull]
                }), ui.buttonGroup({
                    className: 'note-list',
                    children: [outdent, indent]
                })])]).render();
            });

            context.memo('button.height', function () {
                return ui.buttonGroup([ui.button({
                    className: '',
                    contents: ui.icon(options.icons.textHeight) + ' ' + ui.icon(options.icons.caret, 'span'),
                    tooltip: lang.font.height,
                    data: {
                        toggle: 'dropdown'
                    }
                }), ui.dropdownCheck({
                    items: options.lineHeights,
                    checkClassName: options.icons.menuCheck,
                    className: 'dropdown-line-height',
                    click: context.createInvokeHandler('editor.lineHeight')
                })]).render();
            });

            context.memo('button.table', function () {
                return ui.buttonGroup([ui.button({
                    className: '',
                    contents: ui.icon(options.icons.table) + ' ' + ui.icon(options.icons.caret, 'span'),
                    tooltip: lang.table.table,
                    data: {
                        toggle: 'dropdown'
                    }
                }), ui.dropdown({
                    className: 'note-table',
                    items: ['<div class="note-dimension-picker">', '  <div class="note-dimension-picker-mousecatcher" data-event="insertTable" data-value="1x1"/>', '  <div class="note-dimension-picker-highlighted"/>', '  <div class="note-dimension-picker-unhighlighted"/>', '</div>', '<div class="note-dimension-display">1 x 1</div>'].join('')
                })], {
                    callback: function ($node) {
                        var $catcher = $node.find('.note-dimension-picker-mousecatcher');
                        $catcher.css({
                            width: options.insertTableMaxSize.col + 'em',
                            height: options.insertTableMaxSize.row + 'em'
                        }).mousedown(context.createInvokeHandler('editor.insertTable')).on('mousemove', self.tableMoveHandler);
                    }
                }).render();
            });

            context.memo('button.link', function () {
                return ui.button({
                    contents: ui.icon(options.icons.link),
                    tooltip: lang.link.link + representShortcut('linkDialog.show'),
                    click: context.createInvokeHandler('linkDialog.show')
                }).render();
            });

            context.memo('button.picture', function () {
                return ui.button({
                    contents: ui.icon(options.icons.picture),
                    tooltip: lang.image.image,
                    click: context.createInvokeHandler('imageDialog.show')
                }).render();
            });

            context.memo('button.video', function () {
                return ui.button({
                    contents: ui.icon(options.icons.video),
                    tooltip: lang.video.video,
                    click: context.createInvokeHandler('videoDialog.show')
                }).render();
            });

            context.memo('button.hr', function () {
                return ui.button({
                    contents: ui.icon(options.icons.minus),
                    tooltip: lang.hr.insert + representShortcut('insertHorizontalRule'),
                    click: context.createInvokeHandler('editor.insertHorizontalRule')
                }).render();
            });

            context.memo('button.fullscreen', function () {
                return ui.button({
                    className: 'btn-fullscreen',
                    contents: ui.icon(options.icons.arrowsAlt),
                    tooltip: lang.options.fullscreen,
                    click: context.createInvokeHandler('fullscreen.toggle')
                }).render();
            });

            context.memo('button.codeview', function () {
                return ui.button({
                    className: 'btn-codeview',
                    contents: ui.icon(options.icons.code),
                    tooltip: lang.options.codeview,
                    click: context.createInvokeHandler('codeview.toggle')
                }).render();
            });

            context.memo('button.redo', function () {
                return ui.button({
                    contents: ui.icon(options.icons.redo),
                    tooltip: lang.history.redo + representShortcut('redo'),
                    click: context.createInvokeHandler('editor.redo')
                }).render();
            });

            context.memo('button.undo', function () {
                return ui.button({
                    contents: ui.icon(options.icons.undo),
                    tooltip: lang.history.undo + representShortcut('undo'),
                    click: context.createInvokeHandler('editor.undo')
                }).render();
            });

            context.memo('button.help', function () {
                return ui.button({
                    contents: ui.icon(options.icons.question),
                    tooltip: lang.options.help,
                    click: context.createInvokeHandler('helpDialog.show')
                }).render();
            });
        };

        /**
         * image : [
         *   ['imagesize', ['imageSize100', 'imageSize50', 'imageSize25']],
         *   ['float', ['floatLeft', 'floatRight', 'floatNone' ]],
         *   ['remove', ['removeMedia']]
         * ],
         */
        this.addImagePopoverButtons = function () {
            // Image Size Buttons
            context.memo('button.imageSize100', function () {
                return ui.button({
                    contents: '<span class="note-fontsize-10">100%</span>',
                    tooltip: lang.image.resizeFull,
                    click: context.createInvokeHandler('editor.resize', '1')
                }).render();
            });
            context.memo('button.imageSize50', function () {
                return ui.button({
                    contents: '<span class="note-fontsize-10">50%</span>',
                    tooltip: lang.image.resizeHalf,
                    click: context.createInvokeHandler('editor.resize', '0.5')
                }).render();
            });
            context.memo('button.imageSize25', function () {
                return ui.button({
                    contents: '<span class="note-fontsize-10">25%</span>',
                    tooltip: lang.image.resizeQuarter,
                    click: context.createInvokeHandler('editor.resize', '0.25')
                }).render();
            });

            // Float Buttons
            context.memo('button.floatLeft', function () {
                return ui.button({
                    contents: ui.icon(options.icons.alignLeft),
                    tooltip: lang.image.floatLeft,
                    click: context.createInvokeHandler('editor.floatMe', 'left')
                }).render();
            });

            context.memo('button.floatRight', function () {
                return ui.button({
                    contents: ui.icon(options.icons.alignRight),
                    tooltip: lang.image.floatRight,
                    click: context.createInvokeHandler('editor.floatMe', 'right')
                }).render();
            });

            context.memo('button.floatNone', function () {
                return ui.button({
                    contents: ui.icon(options.icons.alignJustify),
                    tooltip: lang.image.floatNone,
                    click: context.createInvokeHandler('editor.floatMe', 'none')
                }).render();
            });

            // Remove Buttons
            context.memo('button.removeMedia', function () {
                return ui.button({
                    contents: ui.icon(options.icons.trash),
                    tooltip: lang.image.remove,
                    click: context.createInvokeHandler('editor.removeMedia')
                }).render();
            });
        };

        this.addLinkPopoverButtons = function () {
            context.memo('button.linkDialogShow', function () {
                return ui.button({
                    contents: ui.icon(options.icons.link),
                    tooltip: lang.link.edit,
                    click: context.createInvokeHandler('linkDialog.show')
                }).render();
            });

            context.memo('button.unlink', function () {
                return ui.button({
                    contents: ui.icon(options.icons.unlink),
                    tooltip: lang.link.unlink,
                    click: context.createInvokeHandler('editor.unlink')
                }).render();
            });
        };

        this.build = function ($container, groups) {
            for (var groupIdx = 0, groupLen = groups.length; groupIdx < groupLen; groupIdx++) {
                var group = groups[groupIdx];
                var groupName = group[0];
                var buttons = group[1];

                var $group = ui.buttonGroup({
                    className: 'note-' + groupName
                }).render();

                for (var idx = 0, len = buttons.length; idx < len; idx++) {
                    var button = context.memo('button.' + buttons[idx]);
                    if (button) {
                        $group.append(typeof button === 'function' ? button(context) : button);
                    }
                }
                $group.appendTo($container);
            }
        };

        this.updateCurrentStyle = function () {
            var styleInfo = context.invoke('editor.currentStyle');
            this.updateBtnStates({
                '.note-btn-bold': function () {
                    return styleInfo['font-bold'] === 'bold';
                },
                '.note-btn-italic': function () {
                    return styleInfo['font-italic'] === 'italic';
                },
                '.note-btn-underline': function () {
                    return styleInfo['font-underline'] === 'underline';
                },
                '.note-btn-subscript': function () {
                    return styleInfo['font-subscript'] === 'subscript';
                },
                '.note-btn-superscript': function () {
                    return styleInfo['font-superscript'] === 'superscript';
                },
                '.note-btn-strikethrough': function () {
                    return styleInfo['font-strikethrough'] === 'strikethrough';
                }
            });

            if (styleInfo['font-family']) {
                var fontNames = styleInfo['font-family'].split(',').map(function (name) {
                    return name.replace(/[\'\"]/g, '').replace(/\s+$/, '').replace(/^\s+/, '');
                });
                var fontName = list.find(fontNames, self.isFontInstalled);

                $toolbar.find('.dropdown-fontname li a').each(function () {
                    // always compare string to avoid creating another func.
                    var isChecked = $(this).data('value') + '' === fontName + '';
                    this.className = isChecked ? 'checked' : '';
                });
                $toolbar.find('.note-current-fontname').text(fontName);
            }

            if (styleInfo['font-size']) {
                var fontSize = styleInfo['font-size'];
                $toolbar.find('.dropdown-fontsize li a').each(function () {
                    // always compare with string to avoid creating another func.
                    var isChecked = $(this).data('value') + '' === fontSize + '';
                    this.className = isChecked ? 'checked' : '';
                });
                $toolbar.find('.note-current-fontsize').text(fontSize);
            }

            if (styleInfo['line-height']) {
                var lineHeight = styleInfo['line-height'];
                $toolbar.find('.dropdown-line-height li a').each(function () {
                    // always compare with string to avoid creating another func.
                    var isChecked = $(this).data('value') + '' === lineHeight + '';
                    this.className = isChecked ? 'checked' : '';
                });
            }
        };

        this.updateBtnStates = function (infos) {
            $.each(infos, function (selector, pred) {
                ui.toggleBtnActive($toolbar.find(selector), pred());
            });
        };

        this.tableMoveHandler = function (event) {
            var PX_PER_EM = 18;
            var $picker = $(event.target.parentNode); // target is mousecatcher
            var $dimensionDisplay = $picker.next();
            var $catcher = $picker.find('.note-dimension-picker-mousecatcher');
            var $highlighted = $picker.find('.note-dimension-picker-highlighted');
            var $unhighlighted = $picker.find('.note-dimension-picker-unhighlighted');

            var posOffset;
            // HTML5 with jQuery - e.offsetX is undefined in Firefox
            if (event.offsetX === undefined) {
                var posCatcher = $(event.target).offset();
                posOffset = {
                    x: event.pageX - posCatcher.left,
                    y: event.pageY - posCatcher.top
                };
            } else {
                posOffset = {
                    x: event.offsetX,
                    y: event.offsetY
                };
            }

            var dim = {
                c: Math.ceil(posOffset.x / PX_PER_EM) || 1,
                r: Math.ceil(posOffset.y / PX_PER_EM) || 1
            };

            $highlighted.css({ width: dim.c + 'em', height: dim.r + 'em' });
            $catcher.data('value', dim.c + 'x' + dim.r);

            if (3 < dim.c && dim.c < options.insertTableMaxSize.col) {
                $unhighlighted.css({ width: dim.c + 1 + 'em' });
            }

            if (3 < dim.r && dim.r < options.insertTableMaxSize.row) {
                $unhighlighted.css({ height: dim.r + 1 + 'em' });
            }

            $dimensionDisplay.html(dim.c + ' x ' + dim.r);
        };
    };

    var Toolbar = function (context) {
        var ui = $.summernote.ui;

        var $note = context.layoutInfo.note;
        var $toolbar = context.layoutInfo.toolbar;
        var options = context.options;

        this.shouldInitialize = function () {
            return !options.airMode;
        };

        this.initialize = function () {
            options.toolbar = options.toolbar || [];

            if (!options.toolbar.length) {
                $toolbar.hide();
            } else {
                context.invoke('buttons.build', $toolbar, options.toolbar);
            }

            if (options.toolbarContainer) {
                $toolbar.appendTo(options.toolbarContainer);
            }

            $note.on('summernote.keyup summernote.mouseup summernote.change', function () {
                context.invoke('buttons.updateCurrentStyle');
            });

            context.invoke('buttons.updateCurrentStyle');
        };

        this.destroy = function () {
            $toolbar.children().remove();
        };

        this.updateFullscreen = function (isFullscreen) {
            ui.toggleBtnActive($toolbar.find('.btn-fullscreen'), isFullscreen);
        };

        this.updateCodeview = function (isCodeview) {
            ui.toggleBtnActive($toolbar.find('.btn-codeview'), isCodeview);
            if (isCodeview) {
                this.deactivate();
            } else {
                this.activate();
            }
        };

        this.activate = function (isIncludeCodeview) {
            var $btn = $toolbar.find('button');
            if (!isIncludeCodeview) {
                $btn = $btn.not('.btn-codeview');
            }
            ui.toggleBtn($btn, true);
        };

        this.deactivate = function (isIncludeCodeview) {
            var $btn = $toolbar.find('button');
            if (!isIncludeCodeview) {
                $btn = $btn.not('.btn-codeview');
            }
            ui.toggleBtn($btn, false);
        };
    };

    var LinkDialog = function (context) {
        var self = this;
        var ui = $.summernote.ui;

        var $editor = context.layoutInfo.editor;
        var options = context.options;
        var lang = options.langInfo;

        this.initialize = function () {
            var $container = options.dialogsInBody ? $(document.body) : $editor;

            var body = '<div class="form-group">' + '<label>' + lang.link.textToDisplay + '</label>' + '<input class="note-link-text form-control" type="text" />' + '</div>' + '<div class="form-group">' + '<label>' + lang.link.url + '</label>' + '<input class="note-link-url form-control" type="text" value="http://" />' + '</div>' + (!options.disableLinkTarget ? '<div class="checkbox">' + '<label>' + '<input type="checkbox" checked> ' + lang.link.openInNewWindow + '</label>' + '</div>' : '');
            var footer = '<button href="#" class="btn btn-primary note-link-btn disabled" disabled>' + lang.link.insert + '</button>';

            this.$dialog = ui.dialog({
                className: 'link-dialog',
                title: lang.link.insert,
                fade: options.dialogsFade,
                body: body,
                footer: footer
            }).render().appendTo($container);
        };

        this.destroy = function () {
            ui.hideDialog(this.$dialog);
            this.$dialog.remove();
        };

        this.bindEnterKey = function ($input, $btn) {
            $input.on('keypress', function (event) {
                if (event.keyCode === key.code.ENTER) {
                    $btn.trigger('click');
                }
            });
        };

        /**
         * toggle update button
         */
        this.toggleLinkBtn = function ($linkBtn, $linkText, $linkUrl) {
            ui.toggleBtn($linkBtn, $linkText.val() && $linkUrl.val());
        };

        /**
         * Show link dialog and set event handlers on dialog controls.
         *
         * @param {Object} linkInfo
         * @return {Promise}
         */
        this.showLinkDialog = function (linkInfo) {
            return $.Deferred(function (deferred) {
                var $linkText = self.$dialog.find('.note-link-text'),
                    $linkUrl = self.$dialog.find('.note-link-url'),
                    $linkBtn = self.$dialog.find('.note-link-btn'),
                    $openInNewWindow = self.$dialog.find('input[type=checkbox]');

                ui.onDialogShown(self.$dialog, function () {
                    context.triggerEvent('dialog.shown');

                    // if no url was given, copy text to url
                    if (!linkInfo.url) {
                        linkInfo.url = linkInfo.text;
                    }

                    $linkText.val(linkInfo.text);

                    var handleLinkTextUpdate = function () {
                        self.toggleLinkBtn($linkBtn, $linkText, $linkUrl);
                        // if linktext was modified by keyup,
                        // stop cloning text from linkUrl
                        linkInfo.text = $linkText.val();
                    };

                    $linkText.on('input', handleLinkTextUpdate).on('paste', function () {
                        setTimeout(handleLinkTextUpdate, 0);
                    });

                    var handleLinkUrlUpdate = function () {
                        self.toggleLinkBtn($linkBtn, $linkText, $linkUrl);
                        // display same link on `Text to display` input
                        // when create a new link
                        if (!linkInfo.text) {
                            $linkText.val($linkUrl.val());
                        }
                    };

                    $linkUrl.on('input', handleLinkUrlUpdate).on('paste', function () {
                        setTimeout(handleLinkUrlUpdate, 0);
                    }).val(linkInfo.url).trigger('focus');

                    self.toggleLinkBtn($linkBtn, $linkText, $linkUrl);
                    self.bindEnterKey($linkUrl, $linkBtn);
                    self.bindEnterKey($linkText, $linkBtn);

                    $openInNewWindow.prop('checked', linkInfo.isNewWindow);

                    $linkBtn.one('click', function (event) {
                        event.preventDefault();

                        deferred.resolve({
                            range: linkInfo.range,
                            url: $linkUrl.val(),
                            text: $linkText.val(),
                            isNewWindow: $openInNewWindow.is(':checked')
                        });
                        self.$dialog.modal('hide');
                    });
                });

                ui.onDialogHidden(self.$dialog, function () {
                    // detach events
                    $linkText.off('input paste keypress');
                    $linkUrl.off('input paste keypress');
                    $linkBtn.off('click');

                    if (deferred.state() === 'pending') {
                        deferred.reject();
                    }
                });

                ui.showDialog(self.$dialog);
            }).promise();
        };

        /**
         * @param {Object} layoutInfo
         */
        this.show = function () {
            var linkInfo = context.invoke('editor.getLinkInfo');

            context.invoke('editor.saveRange');
            this.showLinkDialog(linkInfo).then(function (linkInfo) {
                context.invoke('editor.restoreRange');
                context.invoke('editor.createLink', linkInfo);
            }).fail(function () {
                context.invoke('editor.restoreRange');
            });
        };
        context.memo('help.linkDialog.show', options.langInfo.help['linkDialog.show']);
    };

    var LinkPopover = function (context) {
        var self = this;
        var ui = $.summernote.ui;

        var options = context.options;

        this.events = {
            'summernote.keyup summernote.mouseup summernote.change summernote.scroll': function () {
                self.update();
            },
            'summernote.dialog.shown': function () {
                self.hide();
            }
        };

        this.shouldInitialize = function () {
            return !list.isEmpty(options.popover.link);
        };

        this.initialize = function () {
            this.$popover = ui.popover({
                className: 'note-link-popover',
                callback: function ($node) {
                    var $content = $node.find('.popover-content');
                    $content.prepend('<span><a target="_blank"></a>&nbsp;</span>');
                }
            }).render().appendTo('body');
            var $content = this.$popover.find('.popover-content');

            context.invoke('buttons.build', $content, options.popover.link);
        };

        this.destroy = function () {
            this.$popover.remove();
        };

        this.update = function () {
            // Prevent focusing on editable when invoke('code') is executed
            if (!context.invoke('editor.hasFocus')) {
                this.hide();
                return;
            }

            var rng = context.invoke('editor.createRange');
            if (rng.isCollapsed() && rng.isOnAnchor()) {
                var anchor = dom.ancestor(rng.sc, dom.isAnchor);
                var href = $(anchor).attr('href');
                this.$popover.find('a').attr('href', href).html(href);

                var pos = dom.posFromPlaceholder(anchor);
                this.$popover.css({
                    display: 'block',
                    left: pos.left,
                    top: pos.top
                });
            } else {
                this.hide();
            }
        };

        this.hide = function () {
            this.$popover.hide();
        };
    };

    var ImageDialog = function (context) {
        var self = this;
        var ui = $.summernote.ui;

        var $editor = context.layoutInfo.editor;
        var options = context.options;
        var lang = options.langInfo;

        this.initialize = function () {
            var $container = options.dialogsInBody ? $(document.body) : $editor;

            var imageLimitation = '';
            if (options.maximumImageFileSize) {
                var unit = Math.floor(Math.log(options.maximumImageFileSize) / Math.log(1024));
                var readableSize = (options.maximumImageFileSize / Math.pow(1024, unit)).toFixed(2) * 1 + ' ' + ' KMGTP'[unit] + 'B';
                imageLimitation = '<small>' + lang.image.maximumFileSize + ' : ' + readableSize + '</small>';
            }

            var body = '<div class="form-group note-group-select-from-files">' + '<label>' + lang.image.selectFromFiles + '</label>' + '<input class="note-image-input form-control" type="file" name="files" accept="image/*" multiple="multiple" />' + imageLimitation + '</div>' + '<div class="form-group note-group-image-url" style="overflow:auto;">' + '<label>' + lang.image.url + '</label>' + '<input class="note-image-url form-control col-md-12" type="text" />' + '</div>';
            var footer = '<button href="#" class="btn btn-primary note-image-btn disabled" disabled>' + lang.image.insert + '</button>';

            this.$dialog = ui.dialog({
                title: lang.image.insert,
                fade: options.dialogsFade,
                body: body,
                footer: footer
            }).render().appendTo($container);
        };

        this.destroy = function () {
            ui.hideDialog(this.$dialog);
            this.$dialog.remove();
        };

        this.bindEnterKey = function ($input, $btn) {
            $input.on('keypress', function (event) {
                if (event.keyCode === key.code.ENTER) {
                    $btn.trigger('click');
                }
            });
        };

        this.show = function () {
            context.invoke('editor.saveRange');
            this.showImageDialog().then(function (data) {
                // [workaround] hide dialog before restore range for IE range focus
                ui.hideDialog(self.$dialog);
                context.invoke('editor.restoreRange');

                if (typeof data === 'string') {
                    // image url
                    context.invoke('editor.insertImage', data);
                } else {
                    // array of files
                    context.invoke('editor.insertImagesOrCallback', data);
                }
            }).fail(function () {
                context.invoke('editor.restoreRange');
            });
        };

        /**
         * show image dialog
         *
         * @param {jQuery} $dialog
         * @return {Promise}
         */
        this.showImageDialog = function () {
            return $.Deferred(function (deferred) {
                var $imageInput = self.$dialog.find('.note-image-input'),
                    $imageUrl = self.$dialog.find('.note-image-url'),
                    $imageBtn = self.$dialog.find('.note-image-btn');

                ui.onDialogShown(self.$dialog, function () {
                    context.triggerEvent('dialog.shown');

                    // Cloning imageInput to clear element.
                    $imageInput.replaceWith($imageInput.clone().on('change', function () {
                        deferred.resolve(this.files || this.value);
                    }).val(''));

                    $imageBtn.click(function (event) {
                        event.preventDefault();

                        deferred.resolve($imageUrl.val());
                    });

                    $imageUrl.on('keyup paste', function () {
                        var url = $imageUrl.val();
                        ui.toggleBtn($imageBtn, url);
                    }).val('').trigger('focus');
                    self.bindEnterKey($imageUrl, $imageBtn);
                });

                ui.onDialogHidden(self.$dialog, function () {
                    $imageInput.off('change');
                    $imageUrl.off('keyup paste keypress');
                    $imageBtn.off('click');

                    if (deferred.state() === 'pending') {
                        deferred.reject();
                    }
                });

                ui.showDialog(self.$dialog);
            });
        };
    };

    var ImagePopover = function (context) {
        var ui = $.summernote.ui;

        var options = context.options;

        this.shouldInitialize = function () {
            return !list.isEmpty(options.popover.image);
        };

        this.initialize = function () {
            this.$popover = ui.popover({
                className: 'note-image-popover'
            }).render().appendTo('body');
            var $content = this.$popover.find('.popover-content');

            context.invoke('buttons.build', $content, options.popover.image);
        };

        this.destroy = function () {
            this.$popover.remove();
        };

        this.update = function (target) {
            if (dom.isImg(target)) {
                var pos = dom.posFromPlaceholder(target);
                this.$popover.css({
                    display: 'block',
                    left: pos.left,
                    top: pos.top
                });
            } else {
                this.hide();
            }
        };

        this.hide = function () {
            this.$popover.hide();
        };
    };

    var VideoDialog = function (context) {
        var self = this;
        var ui = $.summernote.ui;

        var $editor = context.layoutInfo.editor;
        var options = context.options;
        var lang = options.langInfo;

        this.initialize = function () {
            var $container = options.dialogsInBody ? $(document.body) : $editor;

            var body = '<div class="form-group row-fluid">' + '<label>' + lang.video.url + ' <small class="text-muted">' + lang.video.providers + '</small></label>' + '<input class="note-video-url form-control span12" type="text" />' + '</div>';
            var footer = '<button href="#" class="btn btn-primary note-video-btn disabled" disabled>' + lang.video.insert + '</button>';

            this.$dialog = ui.dialog({
                title: lang.video.insert,
                fade: options.dialogsFade,
                body: body,
                footer: footer
            }).render().appendTo($container);
        };

        this.destroy = function () {
            ui.hideDialog(this.$dialog);
            this.$dialog.remove();
        };

        this.bindEnterKey = function ($input, $btn) {
            $input.on('keypress', function (event) {
                if (event.keyCode === key.code.ENTER) {
                    $btn.trigger('click');
                }
            });
        };

        this.createVideoNode = function (url) {
            // video url patterns(youtube, instagram, vimeo, dailymotion, youku, mp4, ogg, webm)
            var ytRegExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
            var ytMatch = url.match(ytRegExp);

            var igRegExp = /(?:www\.|\/\/)instagram\.com\/p\/(.[a-zA-Z0-9_-]*)/;
            var igMatch = url.match(igRegExp);

            var vRegExp = /\/\/vine\.co\/v\/([a-zA-Z0-9]+)/;
            var vMatch = url.match(vRegExp);

            var vimRegExp = /\/\/(player\.)?vimeo\.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/;
            var vimMatch = url.match(vimRegExp);

            var dmRegExp = /.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/;
            var dmMatch = url.match(dmRegExp);

            var youkuRegExp = /\/\/v\.youku\.com\/v_show\/id_(\w+)=*\.html/;
            var youkuMatch = url.match(youkuRegExp);

            var mp4RegExp = /^.+.(mp4|m4v)$/;
            var mp4Match = url.match(mp4RegExp);

            var oggRegExp = /^.+.(ogg|ogv)$/;
            var oggMatch = url.match(oggRegExp);

            var webmRegExp = /^.+.(webm)$/;
            var webmMatch = url.match(webmRegExp);

            var $video;
            if (ytMatch && ytMatch[1].length === 11) {
                var youtubeId = ytMatch[1];
                $video = $('<iframe>').attr('frameborder', 0).attr('src', '//www.youtube.com/embed/' + youtubeId).attr('width', '640').attr('height', '360');
            } else if (igMatch && igMatch[0].length) {
                $video = $('<iframe>').attr('frameborder', 0).attr('src', 'https://instagram.com/p/' + igMatch[1] + '/embed/').attr('width', '612').attr('height', '710').attr('scrolling', 'no').attr('allowtransparency', 'true');
            } else if (vMatch && vMatch[0].length) {
                $video = $('<iframe>').attr('frameborder', 0).attr('src', vMatch[0] + '/embed/simple').attr('width', '600').attr('height', '600').attr('class', 'vine-embed');
            } else if (vimMatch && vimMatch[3].length) {
                $video = $('<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen>').attr('frameborder', 0).attr('src', '//player.vimeo.com/video/' + vimMatch[3]).attr('width', '640').attr('height', '360');
            } else if (dmMatch && dmMatch[2].length) {
                $video = $('<iframe>').attr('frameborder', 0).attr('src', '//www.dailymotion.com/embed/video/' + dmMatch[2]).attr('width', '640').attr('height', '360');
            } else if (youkuMatch && youkuMatch[1].length) {
                $video = $('<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen>').attr('frameborder', 0).attr('height', '498').attr('width', '510').attr('src', '//player.youku.com/embed/' + youkuMatch[1]);
            } else if (mp4Match || oggMatch || webmMatch) {
                $video = $('<video controls>').attr('src', url).attr('width', '640').attr('height', '360');
            } else {
                // this is not a known video link. Now what, Cat? Now what?
                return false;
            }

            $video.addClass('note-video-clip');

            return $video[0];
        };

        this.show = function () {
            var text = context.invoke('editor.getSelectedText');
            context.invoke('editor.saveRange');
            this.showVideoDialog(text).then(function (url) {
                // [workaround] hide dialog before restore range for IE range focus
                ui.hideDialog(self.$dialog);
                context.invoke('editor.restoreRange');

                // build node
                var $node = self.createVideoNode(url);

                if ($node) {
                    // insert video node
                    context.invoke('editor.insertNode', $node);
                }
            }).fail(function () {
                context.invoke('editor.restoreRange');
            });
        };

        /**
         * show image dialog
         *
         * @param {jQuery} $dialog
         * @return {Promise}
         */
        this.showVideoDialog = function (text) {
            return $.Deferred(function (deferred) {
                var $videoUrl = self.$dialog.find('.note-video-url'),
                    $videoBtn = self.$dialog.find('.note-video-btn');

                ui.onDialogShown(self.$dialog, function () {
                    context.triggerEvent('dialog.shown');

                    $videoUrl.val(text).on('input', function () {
                        ui.toggleBtn($videoBtn, $videoUrl.val());
                    }).trigger('focus');

                    $videoBtn.click(function (event) {
                        event.preventDefault();

                        deferred.resolve($videoUrl.val());
                    });

                    self.bindEnterKey($videoUrl, $videoBtn);
                });

                ui.onDialogHidden(self.$dialog, function () {
                    $videoUrl.off('input');
                    $videoBtn.off('click');

                    if (deferred.state() === 'pending') {
                        deferred.reject();
                    }
                });

                ui.showDialog(self.$dialog);
            });
        };
    };

    var HelpDialog = function (context) {
        var self = this;
        var ui = $.summernote.ui;

        var $editor = context.layoutInfo.editor;
        var options = context.options;
        var lang = options.langInfo;

        this.createShortCutList = function () {
            var keyMap = options.keyMap[agent.isMac ? 'mac' : 'pc'];
            return Object.keys(keyMap).map(function (key) {
                var command = keyMap[key];
                var $row = $('<div><div class="help-list-item"/></div>');
                $row.append($('<label><kbd>' + key + '</kdb></label>').css({
                    'width': 180,
                    'margin-right': 10
                })).append($('<span/>').html(context.memo('help.' + command) || command));
                return $row.html();
            }).join('');
        };

        this.initialize = function () {
            var $container = options.dialogsInBody ? $(document.body) : $editor;

            var body = ['<p class="text-center">',
            // '<a href="http://summernote.org/" target="_blank">Summernote 0.8.2</a> · ',
            // '<a href="https://github.com/summernote/summernote" target="_blank">Project</a> · ',
            // '<a href="https://github.com/summernote/summernote/issues" target="_blank">Issues</a>',
            '</p>'].join('');

            this.$dialog = ui.dialog({
                title: lang.options.help,
                fade: options.dialogsFade,
                body: this.createShortCutList(),
                footer: body,
                callback: function ($node) {
                    $node.find('.modal-body').css({
                        'max-height': 300,
                        'overflow-y': 'scroll'
                    });
                }
            }).render().appendTo($container);
        };

        this.destroy = function () {
            ui.hideDialog(this.$dialog);
            this.$dialog.remove();
        };

        /**
         * show help dialog
         *
         * @return {Promise}
         */
        this.showHelpDialog = function () {
            return $.Deferred(function (deferred) {
                ui.onDialogShown(self.$dialog, function () {
                    context.triggerEvent('dialog.shown');
                    deferred.resolve();
                });
                ui.showDialog(self.$dialog);
            }).promise();
        };

        this.show = function () {
            context.invoke('editor.saveRange');
            this.showHelpDialog().then(function () {
                context.invoke('editor.restoreRange');
            });
        };
    };

    var AirPopover = function (context) {
        var self = this;
        var ui = $.summernote.ui;

        var options = context.options;

        var AIR_MODE_POPOVER_X_OFFSET = 20;

        this.events = {
            'summernote.keyup summernote.mouseup summernote.scroll': function () {
                self.update();
            },
            'summernote.change summernote.dialog.shown': function () {
                self.hide();
            },
            'summernote.focusout': function (we, e) {
                // [workaround] Firefox doesn't support relatedTarget on focusout
                //  - Ignore hide action on focus out in FF.
                if (agent.isFF) {
                    return;
                }

                if (!e.relatedTarget || !dom.ancestor(e.relatedTarget, func.eq(self.$popover[0]))) {
                    self.hide();
                }
            }
        };

        this.shouldInitialize = function () {
            return options.airMode && !list.isEmpty(options.popover.air);
        };

        this.initialize = function () {
            this.$popover = ui.popover({
                className: 'note-air-popover'
            }).render().appendTo('body');
            var $content = this.$popover.find('.popover-content');

            context.invoke('buttons.build', $content, options.popover.air);
        };

        this.destroy = function () {
            this.$popover.remove();
        };

        this.update = function () {
            var styleInfo = context.invoke('editor.currentStyle');
            if (styleInfo.range && !styleInfo.range.isCollapsed()) {
                var rect = list.last(styleInfo.range.getClientRects());
                if (rect) {
                    var bnd = func.rect2bnd(rect);
                    this.$popover.css({
                        display: 'block',
                        left: Math.max(bnd.left + bnd.width / 2, 0) - AIR_MODE_POPOVER_X_OFFSET,
                        top: bnd.top + bnd.height
                    });
                }
            } else {
                this.hide();
            }
        };

        this.hide = function () {
            this.$popover.hide();
        };
    };

    var HintPopover = function (context) {
        var self = this;
        var ui = $.summernote.ui;

        var POPOVER_DIST = 5;
        var hint = context.options.hint || [];
        var direction = context.options.hintDirection || 'bottom';
        var hints = $.isArray(hint) ? hint : [hint];

        this.events = {
            'summernote.keyup': function (we, e) {
                if (!e.isDefaultPrevented()) {
                    self.handleKeyup(e);
                }
            },
            'summernote.keydown': function (we, e) {
                self.handleKeydown(e);
            },
            'summernote.dialog.shown': function () {
                self.hide();
            }
        };

        this.shouldInitialize = function () {
            return hints.length > 0;
        };

        this.initialize = function () {
            this.lastWordRange = null;
            this.$popover = ui.popover({
                className: 'note-hint-popover',
                hideArrow: true,
                direction: ''
            }).render().appendTo('body');

            this.$popover.hide();

            this.$content = this.$popover.find('.popover-content');

            this.$content.on('click', '.note-hint-item', function () {
                self.$content.find('.active').removeClass('active');
                $(this).addClass('active');
                self.replace();
            });
        };

        this.destroy = function () {
            this.$popover.remove();
        };

        this.selectItem = function ($item) {
            this.$content.find('.active').removeClass('active');
            if (!$item.length) {
                return;
            }
            $item.addClass('active');

            this.$content[0].scrollTop = $item[0].offsetTop - this.$content.innerHeight() / 2;
        };

        this.moveDown = function () {
            var $current = this.$content.find('.note-hint-item.active');
            var $next = $current.next();

            if ($next.length) {
                this.selectItem($next);
            } else {
                var $nextGroup = $current.parent().next();

                if (!$nextGroup.length) {
                    $nextGroup = this.$content.find('.note-hint-group').first();
                }

                this.selectItem($nextGroup.find('.note-hint-item').first());
            }
        };

        this.moveUp = function () {
            var $current = this.$content.find('.note-hint-item.active');
            var $prev = $current.prev();

            if ($prev.length) {
                this.selectItem($prev);
            } else {
                var $prevGroup = $current.parent().prev();

                if (!$prevGroup.length) {
                    $prevGroup = this.$content.find('.note-hint-group').last();
                }

                this.selectItem($prevGroup.find('.note-hint-item').last());
            }
        };

        this.replace = function () {
            var $item = this.$content.find('.note-hint-item.active');

            if ($item.length) {
                var node = this.nodeFromItem($item);
                this.lastWordRange.insertNode(node);
                range.createFromNode(node).collapse().select();

                this.lastWordRange = null;
                this.hide();
                context.invoke('editor.focus');
            }
        };

        this.nodeFromItem = function ($item) {
            var hint = hints[$item.data('index')];
            var item = $item.data('item');
            var node = hint.content ? hint.content(item) : item;
            if (typeof node === 'string') {
                node = dom.createText(node);
            }
            return node;
        };

        this.createItemTemplates = function (hintIdx, items) {
            var hint = hints[hintIdx];
            return items.map(function (item, idx) {
                var $item = $('<div class="note-hint-item"/>');
                $item.append(hint.template ? hint.template(item) : item + '');
                $item.data({
                    'index': hintIdx,
                    'item': item
                });

                if (hintIdx === 0 && idx === 0) {
                    $item.addClass('active');
                }
                return $item;
            });
        };

        this.handleKeydown = function (e) {
            if (!this.$popover.is(':visible')) {
                return;
            }

            if (e.keyCode === key.code.ENTER) {
                e.preventDefault();
                this.replace();
            } else if (e.keyCode === key.code.UP) {
                e.preventDefault();
                this.moveUp();
            } else if (e.keyCode === key.code.DOWN) {
                e.preventDefault();
                this.moveDown();
            }
        };

        this.searchKeyword = function (index, keyword, callback) {
            var hint = hints[index];
            if (hint && hint.match.test(keyword) && hint.search) {
                var matches = hint.match.exec(keyword);
                hint.search(matches[1], callback);
            } else {
                callback();
            }
        };

        this.createGroup = function (idx, keyword) {
            var $group = $('<div class="note-hint-group note-hint-group-' + idx + '"/>');
            this.searchKeyword(idx, keyword, function (items) {
                items = items || [];
                if (items.length) {
                    $group.html(self.createItemTemplates(idx, items));
                    self.show();
                }
            });

            return $group;
        };

        this.handleKeyup = function (e) {
            if (list.contains([key.code.ENTER, key.code.UP, key.code.DOWN], e.keyCode)) {
                if (e.keyCode === key.code.ENTER) {
                    if (this.$popover.is(':visible')) {}
                }
            } else {
                var wordRange = context.invoke('editor.createRange').getWordRange();
                var keyword = wordRange.toString();
                if (hints.length && keyword) {
                    this.$content.empty();

                    var bnd = func.rect2bnd(list.last(wordRange.getClientRects()));
                    if (bnd) {

                        this.$popover.hide();

                        this.lastWordRange = wordRange;

                        hints.forEach(function (hint, idx) {
                            if (hint.match.test(keyword)) {
                                self.createGroup(idx, keyword).appendTo(self.$content);
                            }
                        });

                        // set position for popover after group is created
                        if (direction === 'top') {
                            this.$popover.css({
                                left: bnd.left,
                                top: bnd.top - this.$popover.outerHeight() - POPOVER_DIST
                            });
                        } else {
                            this.$popover.css({
                                left: bnd.left,
                                top: bnd.top + bnd.height + POPOVER_DIST
                            });
                        }
                    }
                } else {
                    this.hide();
                }
            }
        };

        this.show = function () {
            this.$popover.show();
        };

        this.hide = function () {
            this.$popover.hide();
        };
    };

    $.summernote = $.extend($.summernote, {
        version: '0.8.2',
        ui: ui,
        dom: dom,

        plugins: {},

        options: {
            modules: {
                'editor': Editor,
                'clipboard': Clipboard,
                'dropzone': Dropzone,
                'codeview': Codeview,
                'statusbar': Statusbar,
                'fullscreen': Fullscreen,
                'handle': Handle,
                // FIXME: HintPopover must be front of autolink
                //  - Script error about range when Enter key is pressed on hint popover
                'hintPopover': HintPopover,
                'autoLink': AutoLink,
                'autoSync': AutoSync,
                'placeholder': Placeholder,
                'buttons': Buttons,
                'toolbar': Toolbar,
                'linkDialog': LinkDialog,
                'linkPopover': LinkPopover,
                'imageDialog': ImageDialog,
                'imagePopover': ImagePopover,
                'videoDialog': VideoDialog,
                'helpDialog': HelpDialog,
                'airPopover': AirPopover
            },

            buttons: {},

            lang: 'en-US',

            // toolbar
            toolbar: [['style', ['style']], ['font', ['bold', 'underline', 'clear']], ['fontname', ['fontname']], ['color', ['color']], ['para', ['ul', 'ol', 'paragraph']], ['table', ['table']], ['insert', ['link', 'picture', 'video']], ['view', ['fullscreen', 'codeview', 'help']]],

            // popover
            popover: {
                image: [['imagesize', ['imageSize100', 'imageSize50', 'imageSize25']], ['float', ['floatLeft', 'floatRight', 'floatNone']], ['remove', ['removeMedia']]],
                link: [['link', ['linkDialogShow', 'unlink']]],
                air: [['color', ['color']], ['font', ['bold', 'underline', 'clear']], ['para', ['ul', 'paragraph']], ['table', ['table']], ['insert', ['link', 'picture']]]
            },

            // air mode: inline editor
            airMode: false,

            width: null,
            height: null,

            focus: false,
            tabSize: 4,
            styleWithSpan: true,
            shortcuts: true,
            textareaAutoSync: true,
            direction: null,

            styleTags: ['p', 'blockquote', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],

            fontNames: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Helvetica Neue', 'Helvetica', 'Impact', 'Lucida Grande', 'Tahoma', 'Times New Roman', 'Verdana'],

            fontSizes: ['8', '9', '10', '11', '12', '14', '18', '24', '36'],

            // pallete colors(n x n)
            colors: [['#000000', '#424242', '#636363', '#9C9C94', '#CEC6CE', '#EFEFEF', '#F7F7F7', '#FFFFFF'], ['#FF0000', '#FF9C00', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#9C00FF', '#FF00FF'], ['#F7C6CE', '#FFE7CE', '#FFEFC6', '#D6EFD6', '#CEDEE7', '#CEE7F7', '#D6D6E7', '#E7D6DE'], ['#E79C9C', '#FFC69C', '#FFE79C', '#B5D6A5', '#A5C6CE', '#9CC6EF', '#B5A5D6', '#D6A5BD'], ['#E76363', '#F7AD6B', '#FFD663', '#94BD7B', '#73A5AD', '#6BADDE', '#8C7BC6', '#C67BA5'], ['#CE0000', '#E79439', '#EFC631', '#6BA54A', '#4A7B8C', '#3984C6', '#634AA5', '#A54A7B'], ['#9C0000', '#B56308', '#BD9400', '#397B21', '#104A5A', '#085294', '#311873', '#731842'], ['#630000', '#7B3900', '#846300', '#295218', '#083139', '#003163', '#21104A', '#4A1031']],

            lineHeights: ['1.0', '1.2', '1.4', '1.5', '1.6', '1.8', '2.0', '3.0'],

            tableClassName: 'table table-bordered',

            insertTableMaxSize: {
                col: 10,
                row: 10
            },

            dialogsInBody: false,
            dialogsFade: false,

            maximumImageFileSize: null,

            callbacks: {
                onInit: null,
                onFocus: null,
                onBlur: null,
                onEnter: null,
                onKeyup: null,
                onKeydown: null,
                onImageUpload: null,
                onImageUploadError: null
            },

            codemirror: {
                mode: 'text/html',
                htmlMode: true,
                lineNumbers: true
            },

            keyMap: {
                pc: {
                    'ENTER': 'insertParagraph',
                    'CTRL+Z': 'undo',
                    'CTRL+Y': 'redo',
                    'TAB': 'tab',
                    'SHIFT+TAB': 'untab',
                    'CTRL+B': 'bold',
                    'CTRL+I': 'italic',
                    'CTRL+U': 'underline',
                    'CTRL+SHIFT+S': 'strikethrough',
                    'CTRL+BACKSLASH': 'removeFormat',
                    'CTRL+SHIFT+L': 'justifyLeft',
                    'CTRL+SHIFT+E': 'justifyCenter',
                    'CTRL+SHIFT+R': 'justifyRight',
                    'CTRL+SHIFT+J': 'justifyFull',
                    'CTRL+SHIFT+NUM7': 'insertUnorderedList',
                    'CTRL+SHIFT+NUM8': 'insertOrderedList',
                    'CTRL+LEFTBRACKET': 'outdent',
                    'CTRL+RIGHTBRACKET': 'indent',
                    'CTRL+NUM0': 'formatPara',
                    'CTRL+NUM1': 'formatH1',
                    'CTRL+NUM2': 'formatH2',
                    'CTRL+NUM3': 'formatH3',
                    'CTRL+NUM4': 'formatH4',
                    'CTRL+NUM5': 'formatH5',
                    'CTRL+NUM6': 'formatH6',
                    'CTRL+ENTER': 'insertHorizontalRule',
                    'CTRL+K': 'linkDialog.show'
                },

                mac: {
                    'ENTER': 'insertParagraph',
                    'CMD+Z': 'undo',
                    'CMD+SHIFT+Z': 'redo',
                    'TAB': 'tab',
                    'SHIFT+TAB': 'untab',
                    'CMD+B': 'bold',
                    'CMD+I': 'italic',
                    'CMD+U': 'underline',
                    'CMD+SHIFT+S': 'strikethrough',
                    'CMD+BACKSLASH': 'removeFormat',
                    'CMD+SHIFT+L': 'justifyLeft',
                    'CMD+SHIFT+E': 'justifyCenter',
                    'CMD+SHIFT+R': 'justifyRight',
                    'CMD+SHIFT+J': 'justifyFull',
                    'CMD+SHIFT+NUM7': 'insertUnorderedList',
                    'CMD+SHIFT+NUM8': 'insertOrderedList',
                    'CMD+LEFTBRACKET': 'outdent',
                    'CMD+RIGHTBRACKET': 'indent',
                    'CMD+NUM0': 'formatPara',
                    'CMD+NUM1': 'formatH1',
                    'CMD+NUM2': 'formatH2',
                    'CMD+NUM3': 'formatH3',
                    'CMD+NUM4': 'formatH4',
                    'CMD+NUM5': 'formatH5',
                    'CMD+NUM6': 'formatH6',
                    'CMD+ENTER': 'insertHorizontalRule',
                    'CMD+K': 'linkDialog.show'
                }
            },
            icons: {
                'alignCenter': 'fa fa-align-center',
                'alignJustify': 'fa fa-align-justify',
                'alignLeft': 'fa fa-align-left',
                'alignRight': 'fa fa-align-right',
                'indent': 'fa fa-indent',
                'outdent': 'fa fa-outdent',
                'arrowsAlt': 'fa fa-arrows-alt',
                'bold': 'fa fa-bold',
                'caret': 'fa icon-ml-ch fa-angle-down',
                'circle': 'fa fa-circle',
                'close': 'fa fa-close',
                'code': 'fa fa-code',
                'eraser': 'fa fa-eraser',
                'font': 'fa fa-font',
                'frame': 'fa fa-frame',
                'italic': 'fa fa-italic',
                'link': 'fa fa-link',
                'unlink': 'fa fa-chain-broken',
                'magic': 'fa fa-magic',
                'menuCheck': 'fa fa-check',
                'minus': 'fa fa-minus',
                'orderedlist': 'fa fa-list-ol',
                'pencil': 'fa fa-pencil',
                'picture': 'fa fa-image',
                'question': 'fa fa-question',
                'redo': 'icon-action-redo',
                'square': 'fa fa-square',
                'strikethrough': 'fa fa-strikethrough',
                'subscript': 'fa fa-subscript',
                'superscript': 'fa fa-superscript',
                'table': 'fa fa-table',
                'textHeight': 'fa fa-text-height',
                'trash': 'fa fa-trash',
                'underline': 'fa fa-underline',
                'undo': 'icon-action-undo',
                'unorderedlist': 'fa fa-list-ul',
                'video': 'fa fa-file-video-o'
            }
        }
    });
});
System.registerDynamic("reactiveadmintemplate/scripts/modules/form/editor/init.js", ["./summernote"], true, function ($__require, exports, module) {
    'use strict';

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    /*!
     * @version: 1.1.2
     * @name: text-editor
     *
     * @author: https://themeforest.net/user/flexlayers
     */
    $__require("./summernote");
    $(function () {
        ////////////////////////
        // Text Editor
        var summernote = { height: 270 };
        $('.summernote.text-edit-lite').summernote($.extend({}, summernote, { airMode: true }));
		
        $('.summernote.text-edit-simple').summernote($.extend({}, summernote, {defaultFontName: '',
            toolbar: [['font', ['bold', 'italic']], ['text', ['underline', 'strikethrough', 'clear']], ['style', ['fontsize']], ['para', ['paragraph']], ['color', ['color']], ['insert', ['link', 'picture', 'video']], ['view', ['codeview']]]
        }));
		
        $('.summernote.text-edit-full').summernote($.extend({}, summernote, {
            toolbar: [['redo', ['undo', 'redo']], ['style', ['style']], ['font', ['bold', 'italic', 'underline', 'strikethrough', 'clear']], ['sub', ['subscript', 'superscript']], ['insert', ['link', 'picture', 'video', 'hr']], ['fontname', ['fontname']], ['style', ['fontsize', 'height']], ['para', ['ul', 'ol', 'paragraph', 'table']], ['color', ['color']], ['view', ['codeview', 'help', 'fullscreen']]],
            fontNames: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Merriweather', 'Helvetica', 'Open Sans'],
            minHeight: null,
            maxHeight: null
        }));
        $('.btn-text-edit-edit').click(function () {
            $('.summernote.text-edit-click').summernote($.extend({}, summernote, { focus: true })).next('.note-editor').transition({
                animation: 'scale in up',
                onComplete: function () {
                    $(this).removeClass('transition');
                }
            });
        });
        $('.btn-text-edit-save').click(function () {
            // let text = $('.summernote.text-edit-click').summernote('code');
            $('.summernote.text-edit-click').summernote('destroy');
        });
        var emojis = [],
            emojiUrls = [];
        $('.summernote.text-edit-hint').summernote($.extend({}, summernote, {
            height: 150,
            toolbar: false,
            placeholder: 'type with apple, orange, watermelon and lemon',
            hint: [{
                mentions: ['ben', 'sam', 'alvin', 'david'],
                match: /\B@(\w*)$/,
                search: function (keyword, callback) {
                    callback($.grep(this.mentions, function (item) {
                        return item.indexOf(keyword) === 0;
                    }));
                },
                content: function (item) {
                    return '@' + item;
                }
            }, {
                match: /:([\-+\w]+)$/,
                search: function (keyword, callback) {
                    callback($.grep(emojis, function (item) {
                        return item.indexOf(keyword) === 0;
                    }));
                },
                template: function (item) {
                    var content = emojiUrls[item];
                    return '<img src="' + content + '" width="20" /> :' + item + ':';
                },
                content: function (item) {
                    var url = emojiUrls[item];
                    if (url) {
                        return $('<img />').attr('src', url).css('width', 20)[0];
                    }
                    return '';
                }
            }]
        })).next('.note-editor').click(function () {
            if (!emojis.length) {
                $.ajax({
                    url: 'https://api.github.com/emojis',
                    async: true
                }).then(function (data) {
                    emojis = Object.keys(data);
                    emojiUrls = data;
                });
            }
            return false;
        });
        // End Text Editor
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
System.registerDynamic("github:istvan-ujjmeszaros/bootstrap-touchspin@3.1.2.json", [], true, function() {
  return {
    "main": "dist/jquery.bootstrap-touchspin.js"
  };
});

System.registerDynamic('github:istvan-ujjmeszaros/bootstrap-touchspin@3.1.2/dist/jquery.bootstrap-touchspin.js', [], false, function ($__require, $__exports, $__module) {
  var _retrieveGlobal = System.registry.get("@@global-helpers").prepareGlobal($__module.id, null, null);

  (function ($__global) {
    /*
     *  Bootstrap TouchSpin - v3.1.2
     *  A mobile and touch friendly input spinner component for Bootstrap 3.
     *  http://www.virtuosoft.eu/code/bootstrap-touchspin/
     *
     *  Made by István Ujj-Mészáros
     *  Under Apache License v2.0 License
     */
    (function ($) {
      'use strict';

      var _currentSpinnerId = 0;

      function _scopedEventName(name, id) {
        return name + '.touchspin_' + id;
      }

      function _scopeEventNames(names, id) {
        return $.map(names, function (name) {
          return _scopedEventName(name, id);
        });
      }

      $.fn.TouchSpin = function (options) {

        if (options === 'destroy') {
          this.each(function () {
            var originalinput = $(this),
                originalinput_data = originalinput.data();
            $(document).off(_scopeEventNames(['mouseup', 'touchend', 'touchcancel', 'mousemove', 'touchmove', 'scroll', 'scrollstart'], originalinput_data.spinnerid).join(' '));
          });
          return;
        }

        var defaults = {
          min: 0,
          max: 100,
          initval: '',
          replacementval: '',
          step: 1,
          decimals: 0,
          stepinterval: 100,
          forcestepdivisibility: 'round', // none | floor | round | ceil
          stepintervaldelay: 500,
          verticalbuttons: false,
          verticalupclass: 'glyphicon glyphicon-chevron-up',
          verticaldownclass: 'glyphicon glyphicon-chevron-down',
          prefix: '',
          postfix: '',
          prefix_extraclass: '',
          postfix_extraclass: '',
          booster: true,
          boostat: 10,
          maxboostedstep: false,
          mousewheel: true,
          buttondown_class: 'btn btn-default',
          buttonup_class: 'btn btn-default',
          buttondown_txt: '-',
          buttonup_txt: '+'
        };

        var attributeMap = {
          min: 'min',
          max: 'max',
          initval: 'init-val',
          replacementval: 'replacement-val',
          step: 'step',
          decimals: 'decimals',
          stepinterval: 'step-interval',
          verticalbuttons: 'vertical-buttons',
          verticalupclass: 'vertical-up-class',
          verticaldownclass: 'vertical-down-class',
          forcestepdivisibility: 'force-step-divisibility',
          stepintervaldelay: 'step-interval-delay',
          prefix: 'prefix',
          postfix: 'postfix',
          prefix_extraclass: 'prefix-extra-class',
          postfix_extraclass: 'postfix-extra-class',
          booster: 'booster',
          boostat: 'boostat',
          maxboostedstep: 'max-boosted-step',
          mousewheel: 'mouse-wheel',
          buttondown_class: 'button-down-class',
          buttonup_class: 'button-up-class',
          buttondown_txt: 'button-down-txt',
          buttonup_txt: 'button-up-txt'
        };

        return this.each(function () {

          var settings,
              originalinput = $(this),
              originalinput_data = originalinput.data(),
              container,
              elements,
              value,
              downSpinTimer,
              upSpinTimer,
              downDelayTimeout,
              upDelayTimeout,
              spincount = 0,
              spinning = false;

          init();

          function init() {
            if (originalinput.data('alreadyinitialized')) {
              return;
            }

            originalinput.data('alreadyinitialized', true);
            _currentSpinnerId += 1;
            originalinput.data('spinnerid', _currentSpinnerId);

            if (!originalinput.is('input')) {
              console.log('Must be an input.');
              return;
            }

            _initSettings();
            _setInitval();
            _checkValue();
            _buildHtml();
            _initElements();
            _hideEmptyPrefixPostfix();
            _bindEvents();
            _bindEventsInterface();
            elements.input.css('display', 'block');
          }

          function _setInitval() {
            if (settings.initval !== '' && originalinput.val() === '') {
              originalinput.val(settings.initval);
            }
          }

          function changeSettings(newsettings) {
            _updateSettings(newsettings);
            _checkValue();

            var value = elements.input.val();

            if (value !== '') {
              value = Number(elements.input.val());
              elements.input.val(value.toFixed(settings.decimals));
            }
          }

          function _initSettings() {
            settings = $.extend({}, defaults, originalinput_data, _parseAttributes(), options);
          }

          function _parseAttributes() {
            var data = {};
            $.each(attributeMap, function (key, value) {
              var attrName = 'bts-' + value + '';
              if (originalinput.is('[data-' + attrName + ']')) {
                data[key] = originalinput.data(attrName);
              }
            });
            return data;
          }

          function _updateSettings(newsettings) {
            settings = $.extend({}, settings, newsettings);

            // Update postfix and prefix texts if those settings were changed.
            if (newsettings.postfix) {
              originalinput.parent().find('.bootstrap-touchspin-postfix').text(newsettings.postfix);
            }
            if (newsettings.prefix) {
              originalinput.parent().find('.bootstrap-touchspin-prefix').text(newsettings.prefix);
            }
          }

          function _buildHtml() {
            var initval = originalinput.val(),
                parentelement = originalinput.parent();

            if (initval !== '') {
              initval = Number(initval).toFixed(settings.decimals);
            }

            originalinput.data('initvalue', initval).val(initval);
            originalinput.addClass('form-control');

            if (parentelement.hasClass('input-group')) {
              _advanceInputGroup(parentelement);
            } else {
              _buildInputGroup();
            }
          }

          function _advanceInputGroup(parentelement) {
            parentelement.addClass('bootstrap-touchspin');

            var prev = originalinput.prev(),
                next = originalinput.next();

            var downhtml,
                uphtml,
                prefixhtml = '<span class="input-group-addon bootstrap-touchspin-prefix">' + settings.prefix + '</span>',
                postfixhtml = '<span class="input-group-addon bootstrap-touchspin-postfix">' + settings.postfix + '</span>';

            if (prev.hasClass('input-group-btn')) {
              downhtml = '<button class="' + settings.buttondown_class + ' bootstrap-touchspin-down" type="button">' + settings.buttondown_txt + '</button>';
              prev.append(downhtml);
            } else {
              downhtml = '<span class="input-group-btn"><button class="' + settings.buttondown_class + ' bootstrap-touchspin-down" type="button">' + settings.buttondown_txt + '</button></span>';
              $(downhtml).insertBefore(originalinput);
            }

            if (next.hasClass('input-group-btn')) {
              uphtml = '<button class="' + settings.buttonup_class + ' bootstrap-touchspin-up" type="button">' + settings.buttonup_txt + '</button>';
              next.prepend(uphtml);
            } else {
              uphtml = '<span class="input-group-btn"><button class="' + settings.buttonup_class + ' bootstrap-touchspin-up" type="button">' + settings.buttonup_txt + '</button></span>';
              $(uphtml).insertAfter(originalinput);
            }

            $(prefixhtml).insertBefore(originalinput);
            $(postfixhtml).insertAfter(originalinput);

            container = parentelement;
          }

          function _buildInputGroup() {
            var html;

            if (settings.verticalbuttons) {
              html = '<div class="input-group bootstrap-touchspin"><span class="input-group-addon bootstrap-touchspin-prefix">' + settings.prefix + '</span><span class="input-group-addon bootstrap-touchspin-postfix">' + settings.postfix + '</span><span class="input-group-btn-vertical"><button class="' + settings.buttondown_class + ' bootstrap-touchspin-up" type="button"><i class="' + settings.verticalupclass + '"></i></button><button class="' + settings.buttonup_class + ' bootstrap-touchspin-down" type="button"><i class="' + settings.verticaldownclass + '"></i></button></span></div>';
            } else {
              html = '<div class="input-group bootstrap-touchspin"><span class="input-group-btn"><button class="' + settings.buttondown_class + ' bootstrap-touchspin-down" type="button">' + settings.buttondown_txt + '</button></span><span class="input-group-addon bootstrap-touchspin-prefix">' + settings.prefix + '</span><span class="input-group-addon bootstrap-touchspin-postfix">' + settings.postfix + '</span><span class="input-group-btn"><button class="' + settings.buttonup_class + ' bootstrap-touchspin-up" type="button">' + settings.buttonup_txt + '</button></span></div>';
            }

            container = $(html).insertBefore(originalinput);

            $('.bootstrap-touchspin-prefix', container).after(originalinput);

            if (originalinput.hasClass('input-sm')) {
              container.addClass('input-group-sm');
            } else if (originalinput.hasClass('input-lg')) {
              container.addClass('input-group-lg');
            }
          }

          function _initElements() {
            elements = {
              down: $('.bootstrap-touchspin-down', container),
              up: $('.bootstrap-touchspin-up', container),
              input: $('input', container),
              prefix: $('.bootstrap-touchspin-prefix', container).addClass(settings.prefix_extraclass),
              postfix: $('.bootstrap-touchspin-postfix', container).addClass(settings.postfix_extraclass)
            };
          }

          function _hideEmptyPrefixPostfix() {
            if (settings.prefix === '') {
              elements.prefix.hide();
            }

            if (settings.postfix === '') {
              elements.postfix.hide();
            }
          }

          function _bindEvents() {
            originalinput.on('keydown', function (ev) {
              var code = ev.keyCode || ev.which;

              if (code === 38) {
                if (spinning !== 'up') {
                  upOnce();
                  startUpSpin();
                }
                ev.preventDefault();
              } else if (code === 40) {
                if (spinning !== 'down') {
                  downOnce();
                  startDownSpin();
                }
                ev.preventDefault();
              }
            });

            originalinput.on('keyup', function (ev) {
              var code = ev.keyCode || ev.which;

              if (code === 38) {
                stopSpin();
              } else if (code === 40) {
                stopSpin();
              }
            });

            originalinput.on('blur', function () {
              _checkValue();
            });

            elements.down.on('keydown', function (ev) {
              var code = ev.keyCode || ev.which;

              if (code === 32 || code === 13) {
                if (spinning !== 'down') {
                  downOnce();
                  startDownSpin();
                }
                ev.preventDefault();
              }
            });

            elements.down.on('keyup', function (ev) {
              var code = ev.keyCode || ev.which;

              if (code === 32 || code === 13) {
                stopSpin();
              }
            });

            elements.up.on('keydown', function (ev) {
              var code = ev.keyCode || ev.which;

              if (code === 32 || code === 13) {
                if (spinning !== 'up') {
                  upOnce();
                  startUpSpin();
                }
                ev.preventDefault();
              }
            });

            elements.up.on('keyup', function (ev) {
              var code = ev.keyCode || ev.which;

              if (code === 32 || code === 13) {
                stopSpin();
              }
            });

            elements.down.on('mousedown.touchspin', function (ev) {
              elements.down.off('touchstart.touchspin'); // android 4 workaround

              if (originalinput.is(':disabled')) {
                return;
              }

              downOnce();
              startDownSpin();

              ev.preventDefault();
              ev.stopPropagation();
            });

            elements.down.on('touchstart.touchspin', function (ev) {
              elements.down.off('mousedown.touchspin'); // android 4 workaround

              if (originalinput.is(':disabled')) {
                return;
              }

              downOnce();
              startDownSpin();

              ev.preventDefault();
              ev.stopPropagation();
            });

            elements.up.on('mousedown.touchspin', function (ev) {
              elements.up.off('touchstart.touchspin'); // android 4 workaround

              if (originalinput.is(':disabled')) {
                return;
              }

              upOnce();
              startUpSpin();

              ev.preventDefault();
              ev.stopPropagation();
            });

            elements.up.on('touchstart.touchspin', function (ev) {
              elements.up.off('mousedown.touchspin'); // android 4 workaround

              if (originalinput.is(':disabled')) {
                return;
              }

              upOnce();
              startUpSpin();

              ev.preventDefault();
              ev.stopPropagation();
            });

            elements.up.on('mouseout touchleave touchend touchcancel', function (ev) {
              if (!spinning) {
                return;
              }

              ev.stopPropagation();
              stopSpin();
            });

            elements.down.on('mouseout touchleave touchend touchcancel', function (ev) {
              if (!spinning) {
                return;
              }

              ev.stopPropagation();
              stopSpin();
            });

            elements.down.on('mousemove touchmove', function (ev) {
              if (!spinning) {
                return;
              }

              ev.stopPropagation();
              ev.preventDefault();
            });

            elements.up.on('mousemove touchmove', function (ev) {
              if (!spinning) {
                return;
              }

              ev.stopPropagation();
              ev.preventDefault();
            });

            $(document).on(_scopeEventNames(['mouseup', 'touchend', 'touchcancel'], _currentSpinnerId).join(' '), function (ev) {
              if (!spinning) {
                return;
              }

              ev.preventDefault();
              stopSpin();
            });

            $(document).on(_scopeEventNames(['mousemove', 'touchmove', 'scroll', 'scrollstart'], _currentSpinnerId).join(' '), function (ev) {
              if (!spinning) {
                return;
              }

              ev.preventDefault();
              stopSpin();
            });

            originalinput.on('mousewheel DOMMouseScroll', function (ev) {
              if (!settings.mousewheel || !originalinput.is(':focus')) {
                return;
              }

              var delta = ev.originalEvent.wheelDelta || -ev.originalEvent.deltaY || -ev.originalEvent.detail;

              ev.stopPropagation();
              ev.preventDefault();

              if (delta < 0) {
                downOnce();
              } else {
                upOnce();
              }
            });
          }

          function _bindEventsInterface() {
            originalinput.on('touchspin.uponce', function () {
              stopSpin();
              upOnce();
            });

            originalinput.on('touchspin.downonce', function () {
              stopSpin();
              downOnce();
            });

            originalinput.on('touchspin.startupspin', function () {
              startUpSpin();
            });

            originalinput.on('touchspin.startdownspin', function () {
              startDownSpin();
            });

            originalinput.on('touchspin.stopspin', function () {
              stopSpin();
            });

            originalinput.on('touchspin.updatesettings', function (e, newsettings) {
              changeSettings(newsettings);
            });
          }

          function _forcestepdivisibility(value) {
            switch (settings.forcestepdivisibility) {
              case 'round':
                return (Math.round(value / settings.step) * settings.step).toFixed(settings.decimals);
              case 'floor':
                return (Math.floor(value / settings.step) * settings.step).toFixed(settings.decimals);
              case 'ceil':
                return (Math.ceil(value / settings.step) * settings.step).toFixed(settings.decimals);
              default:
                return value;
            }
          }

          function _checkValue() {
            var val, parsedval, returnval;

            val = originalinput.val();

            if (val === '') {
              if (settings.replacementval !== '') {
                originalinput.val(settings.replacementval);
                originalinput.trigger('change');
              }
              return;
            }

            if (settings.decimals > 0 && val === '.') {
              return;
            }

            parsedval = parseFloat(val);

            if (isNaN(parsedval)) {
              if (settings.replacementval !== '') {
                parsedval = settings.replacementval;
              } else {
                parsedval = 0;
              }
            }

            returnval = parsedval;

            if (parsedval.toString() !== val) {
              returnval = parsedval;
            }

            if (parsedval < settings.min) {
              returnval = settings.min;
            }

            if (parsedval > settings.max) {
              returnval = settings.max;
            }

            returnval = _forcestepdivisibility(returnval);

            if (Number(val).toString() !== returnval.toString()) {
              originalinput.val(returnval);
              originalinput.trigger('change');
            }
          }

          function _getBoostedStep() {
            if (!settings.booster) {
              return settings.step;
            } else {
              var boosted = Math.pow(2, Math.floor(spincount / settings.boostat)) * settings.step;

              if (settings.maxboostedstep) {
                if (boosted > settings.maxboostedstep) {
                  boosted = settings.maxboostedstep;
                  value = Math.round(value / boosted) * boosted;
                }
              }

              return Math.max(settings.step, boosted);
            }
          }

          function upOnce() {
            _checkValue();

            value = parseFloat(elements.input.val());
            if (isNaN(value)) {
              value = 0;
            }

            var initvalue = value,
                boostedstep = _getBoostedStep();

            value = value + boostedstep;

            if (value > settings.max) {
              value = settings.max;
              originalinput.trigger('touchspin.on.max');
              stopSpin();
            }

            elements.input.val(Number(value).toFixed(settings.decimals));

            if (initvalue !== value) {
              originalinput.trigger('change');
            }
          }

          function downOnce() {
            _checkValue();

            value = parseFloat(elements.input.val());
            if (isNaN(value)) {
              value = 0;
            }

            var initvalue = value,
                boostedstep = _getBoostedStep();

            value = value - boostedstep;

            if (value < settings.min) {
              value = settings.min;
              originalinput.trigger('touchspin.on.min');
              stopSpin();
            }

            elements.input.val(value.toFixed(settings.decimals));

            if (initvalue !== value) {
              originalinput.trigger('change');
            }
          }

          function startDownSpin() {
            stopSpin();

            spincount = 0;
            spinning = 'down';

            originalinput.trigger('touchspin.on.startspin');
            originalinput.trigger('touchspin.on.startdownspin');

            downDelayTimeout = setTimeout(function () {
              downSpinTimer = setInterval(function () {
                spincount++;
                downOnce();
              }, settings.stepinterval);
            }, settings.stepintervaldelay);
          }

          function startUpSpin() {
            stopSpin();

            spincount = 0;
            spinning = 'up';

            originalinput.trigger('touchspin.on.startspin');
            originalinput.trigger('touchspin.on.startupspin');

            upDelayTimeout = setTimeout(function () {
              upSpinTimer = setInterval(function () {
                spincount++;
                upOnce();
              }, settings.stepinterval);
            }, settings.stepintervaldelay);
          }

          function stopSpin() {
            clearTimeout(downDelayTimeout);
            clearTimeout(upDelayTimeout);
            clearInterval(downSpinTimer);
            clearInterval(upSpinTimer);

            switch (spinning) {
              case 'up':
                originalinput.trigger('touchspin.on.stopupspin');
                originalinput.trigger('touchspin.on.stopspin');
                break;
              case 'down':
                originalinput.trigger('touchspin.on.stopdownspin');
                originalinput.trigger('touchspin.on.stopspin');
                break;
            }

            spincount = 0;
            spinning = false;
          }
        });
      };
    })(jQuery);
  })(this);

  return _retrieveGlobal();
});
System.registerDynamic("reactiveadmintemplate/scripts/modules/form/touch-spin.js", ["touchspin"], true, function ($__require, exports, module) {
    'use strict';

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    /*!
     * @version: 1.1.2
     * @name: touch-spin
     *
     * @author: https://themeforest.net/user/flexlayers
     */
    $__require("touchspin");
    $(function () {
        ////////////////////////
        // Touch Spin
        var spinDefault = { min: 0, max: 100, step: 1, decimals: 0, boostat: 5, maxboostedstep: 100 };
        $('input.spin-simple, input.spin').TouchSpin(spinDefault);
        $('input.spin-percent').TouchSpin($.extend({}, spinDefault, { postfix: '&nbsp;%&nbsp' }));
        $('input.spin-dollar').TouchSpin($.extend({}, spinDefault, { prefix: '&nbsp$&nbsp', max: 1000000, maxboostedstep: 100000 }));
        $('input.spin-vertical').TouchSpin($.extend({}, spinDefault, { verticalbuttons: true, verticalupclass: 'fa fa-plus',
            verticaldownclass: 'fa fa-minus' }));
        $('input.spin-btn').TouchSpin($.extend({}, spinDefault, { postfix: 'Button', postfix_extraclass: 'btn btn-default' }));
        $('input.spin-btn-group').TouchSpin($.extend({}, spinDefault, { postfix: 'Button', postfix_extraclass: 'btn btn-default' }));
        // End Touch Spin
    });
});
System.registerDynamic("reactiveadmintemplate/scripts/modules/wizard/main.js", [], false, function ($__require, $__exports, $__module) {
    var _retrieveGlobal = System.registry.get("@@global-helpers").prepareGlobal($__module.id, null, null);

    (function ($__global) {
        /*!
         * @version: 1.1.2
         * @name: Adapted wizard plugin
         *
         * @author: https://themeforest.net/user/flexlayers
         */
        /*!
         * jQuery Steps v1.1.0 - 09/04/2014
         * Copyright (c) 2014 Rafael Staib (http://www.jquery-steps.com)
         * Licensed under MIT http://www.opensource.org/licenses/MIT
         */
        ;(function ($, undefined) {
            $.fn.extend({
                _aria: function (name, value) {
                    return this.attr("aria-" + name, value);
                },

                _removeAria: function (name) {
                    return this.removeAttr("aria-" + name);
                },

                _enableAria: function (enable) {
                    return enable == null || enable ? this.removeClass("disabled")._aria("disabled", "false") : this.addClass("disabled")._aria("disabled", "true");
                },

                _showAria: function (show) {
                    return show == null || show ? this.show()._aria("hidden", "false") : this.hide()._aria("hidden", "true");
                },

                _selectAria: function (select) {
                    return select == null || select ? this.addClass("current")._aria("selected", "true") : this.removeClass("current")._aria("selected", "false");
                },

                _id: function (id) {
                    return id ? this.attr("id", id) : this.attr("id");
                }
            });

            if (!String.prototype.format) {
                String.prototype.format = function () {
                    var args = arguments.length === 1 && $.isArray(arguments[0]) ? arguments[0] : arguments;
                    var formattedString = this;
                    for (var i = 0; i < args.length; i++) {
                        var pattern = new RegExp("\\{" + i + "\\}", "gm");
                        formattedString = formattedString.replace(pattern, args[i]);
                    }
                    return formattedString;
                };
            }

            /**
             * A global unique id count.
             *
             * @static
             * @private
             * @property _uniqueId
             * @type Integer
             **/
            var _uniqueId = 0;

            /**
             * The plugin prefix for cookies.
             *
             * @final
             * @private
             * @property _cookiePrefix
             * @type String
             **/
            var _cookiePrefix = "jQu3ry_5teps_St@te_";

            /**
             * Suffix for the unique tab id.
             *
             * @final
             * @private
             * @property _tabSuffix
             * @type String
             * @since 0.9.7
             **/
            var _tabSuffix = "-t-";

            /**
             * Suffix for the unique tabpanel id.
             *
             * @final
             * @private
             * @property _tabpanelSuffix
             * @type String
             * @since 0.9.7
             **/
            var _tabpanelSuffix = "-p-";

            /**
             * Suffix for the unique title id.
             *
             * @final
             * @private
             * @property _titleSuffix
             * @type String
             * @since 0.9.7
             **/
            var _titleSuffix = "-h-";

            /**
             * An error message for an "index out of range" error.
             *
             * @final
             * @private
             * @property _indexOutOfRangeErrorMessage
             * @type String
             **/
            var _indexOutOfRangeErrorMessage = "Index out of range.";

            /**
             * An error message for an "missing corresponding element" error.
             *
             * @final
             * @private
             * @property _missingCorrespondingElementErrorMessage
             * @type String
             **/
            var _missingCorrespondingElementErrorMessage = "One or more corresponding step {0} are missing.";

            /**
             * Adds a step to the cache.
             *
             * @static
             * @private
             * @method addStepToCache
             * @param wizard {Object} A jQuery wizard object
             * @param step {Object} The step object to add
             **/
            function addStepToCache(wizard, step) {
                getSteps(wizard).push(step);
            }

            function analyzeData(wizard, options, state) {
                var stepTitles = wizard.children(options.headerTag),
                    stepContents = wizard.children(options.bodyTag);

                // Validate content
                if (stepTitles.length > stepContents.length) {
                    throwError(_missingCorrespondingElementErrorMessage, "contents");
                } else if (stepTitles.length < stepContents.length) {
                    throwError(_missingCorrespondingElementErrorMessage, "titles");
                }

                var startIndex = options.startIndex;

                state.stepCount = stepTitles.length;

                // Tries to load the saved state (step position)
                if (options.saveState && $.cookie) {
                    var savedState = $.cookie(_cookiePrefix + getUniqueId(wizard));
                    // Sets the saved position to the start index if not undefined or out of range
                    var savedIndex = parseInt(savedState, 0);
                    if (!isNaN(savedIndex) && savedIndex < state.stepCount) {
                        startIndex = savedIndex;
                    }
                }

                state.currentIndex = startIndex;

                stepTitles.each(function (index) {
                    var item = $(this),
                        // item == header
                    content = stepContents.eq(index),
                        modeData = content.data("mode"),
                        mode = modeData == null ? contentMode.html : getValidEnumValue(contentMode, /^\s*$/.test(modeData) || isNaN(modeData) ? modeData : parseInt(modeData, 0)),
                        contentUrl = mode === contentMode.html || content.data("url") === undefined ? "" : content.data("url"),
                        contentLoaded = mode !== contentMode.html && content.data("loaded") === "1",
                        step = $.extend({}, stepModel, {
                        title: item.html(),
                        content: mode === contentMode.html ? content.html() : "",
                        contentUrl: contentUrl,
                        contentMode: mode,
                        contentLoaded: contentLoaded
                    });

                    addStepToCache(wizard, step);
                });
            }

            /**
             * Triggers the onCanceled event.
             *
             * @static
             * @private
             * @method cancel
             * @param wizard {Object} The jQuery wizard object
             **/
            function cancel(wizard) {
                wizard.triggerHandler("canceled");
            }

            function decreaseCurrentIndexBy(state, decreaseBy) {
                return state.currentIndex - decreaseBy;
            }

            /**
             * Removes the control functionality completely and transforms the current state to the initial HTML structure.
             *
             * @static
             * @private
             * @method destroy
             * @param wizard {Object} A jQuery wizard object
             **/
            function destroy(wizard, options) {
                var eventNamespace = getEventNamespace(wizard);

                // Remove virtual data objects from the wizard
                wizard.unbind(eventNamespace).removeData("uid").removeData("options").removeData("state").removeData("steps").removeData("eventNamespace").find(".actions a").unbind(eventNamespace);

                // Remove attributes and CSS classes from the wizard
                wizard.removeClass(options.clearFixCssClass + " vertical");

                var contents = wizard.find(".content > *");

                // Remove virtual data objects from panels and their titles
                contents.removeData("loaded").removeData("mode").removeData("url");

                // Remove attributes, CSS classes and reset inline styles on all panels and their titles
                contents.removeAttr("id").removeAttr("role").removeAttr("tabindex").removeAttr("class").removeAttr("style")._removeAria("labelledby")._removeAria("hidden");

                // Empty panels if the mode is set to 'async' or 'iframe'
                wizard.find(".content > [data-mode='async'],.content > [data-mode='iframe']").empty();

                var wizardSubstitute = $("<{0} class=\"{1}\"></{0}>".format(wizard.get(0).tagName, wizard.attr("class")));

                var wizardId = wizard._id();
                if (wizardId != null && wizardId !== "") {
                    wizardSubstitute._id(wizardId);
                }

                wizardSubstitute.html(wizard.find(".content").html());
                wizard.after(wizardSubstitute);
                wizard.remove();

                return wizardSubstitute;
            }

            /**
             * Triggers the onFinishing and onFinished event.
             *
             * @static
             * @private
             * @method finishStep
             * @param wizard {Object} The jQuery wizard object
             * @param state {Object} The state container of the current wizard
             **/
            function finishStep(wizard, state) {
                var currentStep = wizard.find(".steps li").eq(state.currentIndex);

                if (wizard.triggerHandler("finishing", [state.currentIndex])) {
                    currentStep.addClass("done").removeClass("error");
                    wizard.triggerHandler("finished", [state.currentIndex]);
                } else {
                    currentStep.addClass("error");
                }
            }

            /**
             * Gets or creates if not exist an unique event namespace for the given wizard instance.
             *
             * @static
             * @private
             * @method getEventNamespace
             * @param wizard {Object} A jQuery wizard object
             * @return {String} Returns the unique event namespace for the given wizard
             */
            function getEventNamespace(wizard) {
                var eventNamespace = wizard.data("eventNamespace");

                if (eventNamespace == null) {
                    eventNamespace = "." + getUniqueId(wizard);
                    wizard.data("eventNamespace", eventNamespace);
                }

                return eventNamespace;
            }

            function getStepAnchor(wizard, index) {
                var uniqueId = getUniqueId(wizard);

                return wizard.find("#" + uniqueId + _tabSuffix + index);
            }

            function getStepPanel(wizard, index) {
                var uniqueId = getUniqueId(wizard);

                return wizard.find("#" + uniqueId + _tabpanelSuffix + index);
            }

            function getStepTitle(wizard, index) {
                var uniqueId = getUniqueId(wizard);

                return wizard.find("#" + uniqueId + _titleSuffix + index);
            }

            function getOptions(wizard) {
                return wizard.data("options");
            }

            function getState(wizard) {
                return wizard.data("state");
            }

            function getSteps(wizard) {
                return wizard.data("steps");
            }

            /**
             * Gets a specific step object by index.
             *
             * @static
             * @private
             * @method getStep
             * @param index {Integer} An integer that belongs to the position of a step
             * @return {Object} A specific step object
             **/
            function getStep(wizard, index) {
                var steps = getSteps(wizard);

                if (index < 0 || index >= steps.length) {
                    throwError(_indexOutOfRangeErrorMessage);
                }

                return steps[index];
            }

            /**
             * Gets or creates if not exist an unique id from the given wizard instance.
             *
             * @static
             * @private
             * @method getUniqueId
             * @param wizard {Object} A jQuery wizard object
             * @return {String} Returns the unique id for the given wizard
             */
            function getUniqueId(wizard) {
                var uniqueId = wizard.data("uid");

                if (uniqueId == null) {
                    uniqueId = wizard._id();
                    if (uniqueId == null) {
                        uniqueId = "steps-uid-".concat(_uniqueId);
                        wizard._id(uniqueId);
                    }

                    _uniqueId++;
                    wizard.data("uid", uniqueId);
                }

                return uniqueId;
            }

            /**
             * Gets a valid enum value by checking a specific enum key or value.
             *
             * @static
             * @private
             * @method getValidEnumValue
             * @param enumType {Object} Type of enum
             * @param keyOrValue {Object} Key as `String` or value as `Integer` to check for
             */
            function getValidEnumValue(enumType, keyOrValue) {
                validateArgument("enumType", enumType);
                validateArgument("keyOrValue", keyOrValue);

                // Is key
                if (typeof keyOrValue === "string") {
                    var value = enumType[keyOrValue];
                    if (value === undefined) {
                        throwError("The enum key '{0}' does not exist.", keyOrValue);
                    }

                    return value;
                }
                // Is value
                else if (typeof keyOrValue === "number") {
                        for (var key in enumType) {
                            if (enumType[key] === keyOrValue) {
                                return keyOrValue;
                            }
                        }

                        throwError("Invalid enum value '{0}'.", keyOrValue);
                    }
                    // Type is not supported
                    else {
                            throwError("Invalid key or value type.");
                        }
            }

            /**
             * Routes to the next step.
             *
             * @static
             * @private
             * @method goToNextStep
             * @param wizard {Object} The jQuery wizard object
             * @param options {Object} Settings of the current wizard
             * @param state {Object} The state container of the current wizard
             * @return {Boolean} Indicates whether the action executed
             **/
            function goToNextStep(wizard, options, state) {
                return paginationClick(wizard, options, state, increaseCurrentIndexBy(state, 1));
            }

            /**
             * Routes to the previous step.
             *
             * @static
             * @private
             * @method goToPreviousStep
             * @param wizard {Object} The jQuery wizard object
             * @param options {Object} Settings of the current wizard
             * @param state {Object} The state container of the current wizard
             * @return {Boolean} Indicates whether the action executed
             **/
            function goToPreviousStep(wizard, options, state) {
                return paginationClick(wizard, options, state, decreaseCurrentIndexBy(state, 1));
            }

            /**
             * Routes to a specific step by a given index.
             *
             * @static
             * @private
             * @method goToStep
             * @param wizard {Object} The jQuery wizard object
             * @param options {Object} Settings of the current wizard
             * @param state {Object} The state container of the current wizard
             * @param index {Integer} The position (zero-based) to route to
             * @return {Boolean} Indicates whether the action succeeded or failed
             **/
            function goToStep(wizard, options, state, index) {
                if (index < 0 || index >= state.stepCount) {
                    throwError(_indexOutOfRangeErrorMessage);
                }

                if (options.forceMoveForward && index < state.currentIndex) {
                    return;
                }

                var oldIndex = state.currentIndex;
                if (wizard.triggerHandler("stepChanging", [state.currentIndex, index])) {
                    // Save new state
                    state.currentIndex = index;
                    saveCurrentStateToCookie(wizard, options, state);

                    // Change visualisation
                    refreshStepNavigation(wizard, options, state, oldIndex);
                    refreshPagination(wizard, options, state);
                    loadAsyncContent(wizard, options, state);
                    startTransitionEffect(wizard, options, state, index, oldIndex, function () {
                        wizard.triggerHandler("stepChanged", [index, oldIndex]);
                    });
                } else {
                    wizard.find(".steps li").eq(oldIndex).addClass("error");
                }

                return true;
            }

            function increaseCurrentIndexBy(state, increaseBy) {
                return state.currentIndex + increaseBy;
            }

            /**
             * Initializes the component.
             *
             * @static
             * @private
             * @method initialize
             * @param options {Object} The component settings
             **/
            function initialize(options) {
                /*jshint -W040 */
                var opts = $.extend(true, {}, defaults, options);

                return this.each(function () {
                    var wizard = $(this);
                    var state = {
                        currentIndex: opts.startIndex,
                        currentStep: null,
                        stepCount: 0,
                        transitionElement: null
                    };

                    // Create data container
                    wizard.data("options", opts);
                    wizard.data("state", state);
                    wizard.data("steps", []);

                    analyzeData(wizard, opts, state);
                    render(wizard, opts, state);
                    registerEvents(wizard, opts);

                    // Trigger focus
                    if (opts.autoFocus && _uniqueId === 0) {
                        getStepAnchor(wizard, opts.startIndex).focus();
                    }

                    wizard.triggerHandler("init", [opts.startIndex]);
                });
            }

            /**
             * Inserts a new step to a specific position.
             *
             * @static
             * @private
             * @method insertStep
             * @param wizard {Object} The jQuery wizard object
             * @param options {Object} Settings of the current wizard
             * @param state {Object} The state container of the current wizard
             * @param index {Integer} The position (zero-based) to add
             * @param step {Object} The step object to add
             * @example
             *     $("#wizard").steps().insert(0, {
             *         title: "Title",
             *         content: "", // optional
             *         contentMode: "async", // optional
             *         contentUrl: "/Content/Step/1" // optional
             *     });
             * @chainable
             **/
            function insertStep(wizard, options, state, index, step) {
                if (index < 0 || index > state.stepCount) {
                    throwError(_indexOutOfRangeErrorMessage);
                }

                // TODO: Validate step object

                // Change data
                step = $.extend({}, stepModel, step);
                insertStepToCache(wizard, index, step);
                if (state.currentIndex !== state.stepCount && state.currentIndex >= index) {
                    state.currentIndex++;
                    saveCurrentStateToCookie(wizard, options, state);
                }
                state.stepCount++;

                var contentContainer = wizard.find(".content"),
                    header = $("<{0}>{1}</{0}>".format(options.headerTag, step.title)),
                    body = $("<{0}></{0}>".format(options.bodyTag));

                if (step.contentMode == null || step.contentMode === contentMode.html) {
                    body.html(step.content);
                }

                if (index === 0) {
                    contentContainer.prepend(body).prepend(header);
                } else {
                    getStepPanel(wizard, index - 1).after(body).after(header);
                }

                renderBody(wizard, state, body, index);
                renderTitle(wizard, options, state, header, index);
                refreshSteps(wizard, options, state, index);
                if (index === state.currentIndex) {
                    refreshStepNavigation(wizard, options, state);
                }
                refreshPagination(wizard, options, state);

                return wizard;
            }

            /**
             * Inserts a step object to the cache at a specific position.
             *
             * @static
             * @private
             * @method insertStepToCache
             * @param wizard {Object} A jQuery wizard object
             * @param index {Integer} The position (zero-based) to add
             * @param step {Object} The step object to add
             **/
            function insertStepToCache(wizard, index, step) {
                getSteps(wizard).splice(index, 0, step);
            }

            /**
             * Handles the keyup DOM event for pagination.
             *
             * @static
             * @private
             * @event keyup
             * @param event {Object} An event object
             */
            function keyUpHandler(event) {
                var wizard = $(this),
                    options = getOptions(wizard),
                    state = getState(wizard);

                if (options.suppressPaginationOnFocus && wizard.find(":focus").is(":input")) {
                    event.preventDefault();
                    return false;
                }

                var keyCodes = { left: 37, right: 39 };
                if (event.keyCode === keyCodes.left) {
                    event.preventDefault();
                    goToPreviousStep(wizard, options, state);
                } else if (event.keyCode === keyCodes.right) {
                    event.preventDefault();
                    goToNextStep(wizard, options, state);
                }
            }

            /**
             * Loads and includes async content.
             *
             * @static
             * @private
             * @method loadAsyncContent
             * @param wizard {Object} A jQuery wizard object
             * @param options {Object} Settings of the current wizard
             * @param state {Object} The state container of the current wizard
             */
            function loadAsyncContent(wizard, options, state) {
                if (state.stepCount > 0) {
                    var currentIndex = state.currentIndex,
                        currentStep = getStep(wizard, currentIndex);

                    if (!options.enableContentCache || !currentStep.contentLoaded) {
                        switch (getValidEnumValue(contentMode, currentStep.contentMode)) {
                            case contentMode.iframe:
                                wizard.find(".content > .body").eq(state.currentIndex).empty().html("<iframe src=\"" + currentStep.contentUrl + "\" frameborder=\"0\" scrolling=\"no\" />").data("loaded", "1");
                                break;

                            case contentMode.async:
                                var currentStepContent = getStepPanel(wizard, currentIndex)._aria("busy", "true").empty().append(renderTemplate(options.loadingTemplate, { text: options.labels.loading }));

                                $.ajax({ url: currentStep.contentUrl, cache: false }).done(function (data) {
                                    currentStepContent.empty().html(data)._aria("busy", "false").data("loaded", "1");
                                    wizard.triggerHandler("contentLoaded", [currentIndex]);
                                });
                                break;
                        }
                    }
                }
            }

            /**
             * Fires the action next or previous click event.
             *
             * @static
             * @private
             * @method paginationClick
             * @param wizard {Object} The jQuery wizard object
             * @param options {Object} Settings of the current wizard
             * @param state {Object} The state container of the current wizard
             * @param index {Integer} The position (zero-based) to route to
             * @return {Boolean} Indicates whether the event fired successfully or not
             **/
            function paginationClick(wizard, options, state, index) {
                var oldIndex = state.currentIndex;

                if (index >= 0 && index < state.stepCount && !(options.forceMoveForward && index < state.currentIndex)) {
                    var anchor = getStepAnchor(wizard, index),
                        parent = anchor.parent(),
                        isDisabled = parent.hasClass("disabled");

                    // Enable the step to make the anchor clickable!
                    parent._enableAria();
                    anchor.click();

                    // An error occured
                    if (oldIndex === state.currentIndex && isDisabled) {
                        // Disable the step again if current index has not changed; prevents click action.
                        parent._enableAria(false);
                        return false;
                    }

                    return true;
                }

                return false;
            }

            /**
             * Fires when a pagination click happens.
             *
             * @static
             * @private
             * @event click
             * @param event {Object} An event object
             */
            function paginationClickHandler(event) {
                event.preventDefault();

                var anchor = $(this),
                    wizard = anchor.parent().parent().parent().parent(),
                    options = getOptions(wizard),
                    state = getState(wizard),
                    href = anchor.attr("href");

                switch (href.substring(href.lastIndexOf("#") + 1)) {
                    case "cancel":
                        cancel(wizard);
                        break;

                    case "finish":
                        finishStep(wizard, state);
                        break;

                    case "next":
                        goToNextStep(wizard, options, state);
                        break;

                    case "previous":
                        goToPreviousStep(wizard, options, state);
                        break;
                }
            }

            /**
             * Refreshs the visualization state for the entire pagination.
             *
             * @static
             * @private
             * @method refreshPagination
             * @param wizard {Object} A jQuery wizard object
             * @param options {Object} Settings of the current wizard
             * @param state {Object} The state container of the current wizard
             */
            function refreshPagination(wizard, options, state) {
                if (options.enablePagination) {
                    var finish = wizard.find(".actions a[href$='#finish']").parent(),
                        next = wizard.find(".actions a[href$='#next']").parent();

                    if (!options.forceMoveForward) {
                        var previous = wizard.find(".actions a[href$='#previous']").parent();
                        previous._enableAria(state.currentIndex > 0);
                    }

                    if (options.enableFinishButton && options.showFinishButtonAlways) {
                        finish._enableAria(state.stepCount > 0);
                        next._enableAria(state.stepCount > 1 && state.stepCount > state.currentIndex + 1);
                    } else {
                        finish._showAria(options.enableFinishButton && state.stepCount === state.currentIndex + 1);
                        next._showAria(state.stepCount === 0 || state.stepCount > state.currentIndex + 1)._enableAria(state.stepCount > state.currentIndex + 1 || !options.enableFinishButton);
                    }
                }
            }

            /**
             * Refreshs the visualization state for the step navigation (tabs).
             *
             * @static
             * @private
             * @method refreshStepNavigation
             * @param wizard {Object} A jQuery wizard object
             * @param options {Object} Settings of the current wizard
             * @param state {Object} The state container of the current wizard
             * @param [oldIndex] {Integer} The index of the prior step
             */
            function refreshStepNavigation(wizard, options, state, oldIndex) {
                var currentOrNewStepAnchor = getStepAnchor(wizard, state.currentIndex),
                    currentInfo = $("<span class=\"current-info audible\">" + options.labels.current + " </span>"),
                    stepTitles = wizard.find(".content > .title");

                if (oldIndex != null) {
                    var oldStepAnchor = getStepAnchor(wizard, oldIndex);
                    oldStepAnchor.parent().addClass("done").removeClass("error")._selectAria(false);
                    stepTitles.eq(oldIndex).removeClass("current").next(".body").removeClass("current");
                    currentInfo = oldStepAnchor.find(".current-info");
                    currentOrNewStepAnchor.focus();
                }

                currentOrNewStepAnchor.prepend(currentInfo).parent()._selectAria().removeClass("done")._enableAria();
                stepTitles.eq(state.currentIndex).addClass("current").next(".body").addClass("current");
            }

            /**
             * Refreshes step buttons and their related titles beyond a certain position.
             *
             * @static
             * @private
             * @method refreshSteps
             * @param wizard {Object} A jQuery wizard object
             * @param options {Object} Settings of the current wizard
             * @param state {Object} The state container of the current wizard
             * @param index {Integer} The start point for refreshing ids
             */
            function refreshSteps(wizard, options, state, index) {
                var uniqueId = getUniqueId(wizard);

                for (var i = index; i < state.stepCount; i++) {
                    var uniqueStepId = uniqueId + _tabSuffix + i,
                        uniqueBodyId = uniqueId + _tabpanelSuffix + i,
                        uniqueHeaderId = uniqueId + _titleSuffix + i,
                        title = wizard.find(".title").eq(i)._id(uniqueHeaderId);

                    wizard.find(".steps a").eq(i)._id(uniqueStepId)._aria("controls", uniqueBodyId).attr("href", "#" + uniqueHeaderId).html(renderTemplate(options.titleTemplate, { index: i + 1, title: title.html() }));
                    wizard.find(".body").eq(i)._id(uniqueBodyId)._aria("labelledby", uniqueHeaderId);
                }
            }

            function registerEvents(wizard, options) {
                var eventNamespace = getEventNamespace(wizard);

                wizard.bind("canceled" + eventNamespace, options.onCanceled);
                wizard.bind("contentLoaded" + eventNamespace, options.onContentLoaded);
                wizard.bind("finishing" + eventNamespace, options.onFinishing);
                wizard.bind("finished" + eventNamespace, options.onFinished);
                wizard.bind("init" + eventNamespace, options.onInit);
                wizard.bind("stepChanging" + eventNamespace, options.onStepChanging);
                wizard.bind("stepChanged" + eventNamespace, options.onStepChanged);

                if (options.enableKeyNavigation) {
                    wizard.bind("keyup" + eventNamespace, keyUpHandler);
                }

                wizard.find(".actions a").bind("click" + eventNamespace, paginationClickHandler);
            }

            /**
             * Removes a specific step by an given index.
             *
             * @static
             * @private
             * @method removeStep
             * @param wizard {Object} A jQuery wizard object
             * @param options {Object} Settings of the current wizard
             * @param state {Object} The state container of the current wizard
             * @param index {Integer} The position (zero-based) of the step to remove
             * @return Indecates whether the item is removed.
             **/
            function removeStep(wizard, options, state, index) {
                // Index out of range and try deleting current item will return false.
                if (index < 0 || index >= state.stepCount || state.currentIndex === index) {
                    return false;
                }

                // Change data
                removeStepFromCache(wizard, index);
                if (state.currentIndex > index) {
                    state.currentIndex--;
                    saveCurrentStateToCookie(wizard, options, state);
                }
                state.stepCount--;

                getStepTitle(wizard, index).remove();
                getStepPanel(wizard, index).remove();
                getStepAnchor(wizard, index).parent().remove();

                // Set the "first" class to the new first step button
                if (index === 0) {
                    wizard.find(".steps li").first().addClass("first");
                }

                // Set the "last" class to the new last step button
                if (index === state.stepCount) {
                    wizard.find(".steps li").eq(index).addClass("last");
                }

                refreshSteps(wizard, options, state, index);
                refreshPagination(wizard, options, state);

                return true;
            }

            function removeStepFromCache(wizard, index) {
                getSteps(wizard).splice(index, 1);
            }

            /**
             * Transforms the base html structure to a more sensible html structure.
             *
             * @static
             * @private
             * @method render
             * @param wizard {Object} A jQuery wizard object
             * @param options {Object} Settings of the current wizard
             * @param state {Object} The state container of the current wizard
             **/
            function render(wizard, options, state) {
                // Create a content wrapper and copy HTML from the intial wizard structure
                var wrapperTemplate = "<{0} class=\"{1}\">{2}</{0}>",
                    orientation = getValidEnumValue(stepsOrientation, options.stepsOrientation),
                    verticalCssClass = orientation === stepsOrientation.vertical ? " vertical" : "",
                    contentWrapper = '<' + options.contentContainerTag + ' class="content ' + options.clearFixCssClass + '"></' + options.contentContainerTag + '>',
                    stepsWrapper = $(wrapperTemplate.format(options.stepsContainerTag, "steps " + options.clearFixCssClass, "<ul role=\"tablist\"></ul>"));

                // Transform the wizard wrapper and remove the inner HTML
                wizard.attr("role", "application").wrapInner(contentWrapper).prepend(stepsWrapper).addClass(options.cssClass + " " + options.clearFixCssClass + verticalCssClass);

                var stepTitles = wizard.find('> ' + options.contentContainerTag).children(options.headerTag),
                    stepContents = wizard.find('> ' + options.contentContainerTag).children(options.bodyTag);

                // Add WIA-ARIA support
                stepContents.each(function (index) {
                    renderBody(wizard, state, $(this), index);
                });

                stepTitles.each(function (index) {
                    renderTitle(wizard, options, state, $(this), index);
                });

                refreshStepNavigation(wizard, options, state);
                renderPagination(wizard, options, state);
            }

            /**
             * Transforms the body to a proper tabpanel.
             *
             * @static
             * @private
             * @method renderBody
             * @param wizard {Object} A jQuery wizard object
             * @param body {Object} A jQuery body object
             * @param index {Integer} The position of the body
             */
            function renderBody(wizard, state, body, index) {
                var uniqueId = getUniqueId(wizard),
                    uniqueBodyId = uniqueId + _tabpanelSuffix + index,
                    uniqueHeaderId = uniqueId + _titleSuffix + index;

                body._id(uniqueBodyId).attr("role", "tabpanel")._aria("labelledby", uniqueHeaderId).addClass("body")._showAria(state.currentIndex === index);
            }

            /**
             * Renders a pagination if enabled.
             *
             * @static
             * @private
             * @method renderPagination
             * @param wizard {Object} A jQuery wizard object
             * @param options {Object} Settings of the current wizard
             * @param state {Object} The state container of the current wizard
             */
            function renderPagination(wizard, options, state) {
                if (options.enablePagination) {
                    var pagination = "<{0} class=\"actions {1}\"><ul role=\"menu\" aria-label=\"{2}\">{3}</ul></{0}>",
                        buttonTemplate = "<li><a href=\"#{0}\" role=\"menuitem\">{1}</a></li>",
                        buttons = "";

                    if (!options.forceMoveForward) {
                        buttons += buttonTemplate.format("previous", options.labels.previous);
                    }

                    buttons += buttonTemplate.format("next", options.labels.next);

                    if (options.enableFinishButton) {
                        buttons += buttonTemplate.format("finish", options.labels.finish);
                    }

                    if (options.enableCancelButton) {
                        buttons += buttonTemplate.format("cancel", options.labels.cancel);
                    }

                    wizard.append(pagination.format(options.actionContainerTag, options.clearFixCssClass, options.labels.pagination, buttons));

                    refreshPagination(wizard, options, state);
                    loadAsyncContent(wizard, options, state);
                }
            }

            /**
             * Renders a template and replaces all placeholder.
             *
             * @static
             * @private
             * @method renderTemplate
             * @param template {String} A template
             * @param substitutes {Object} A list of substitute
             * @return {String} The rendered template
             */
            function renderTemplate(template, substitutes) {
                var matches = template.match(/#([a-z]*)#/gi);

                for (var i = 0; i < matches.length; i++) {
                    var match = matches[i],
                        key = match.substring(1, match.length - 1);

                    if (substitutes[key] === undefined) {
                        throwError("The key '{0}' does not exist in the substitute collection!", key);
                    }

                    template = template.replace(match, substitutes[key]);
                }

                return template;
            }

            /**
             * Transforms the title to a step item button.
             *
             * @static
             * @private
             * @method renderTitle
             * @param wizard {Object} A jQuery wizard object
             * @param options {Object} Settings of the current wizard
             * @param state {Object} The state container of the current wizard
             * @param header {Object} A jQuery header object
             * @param index {Integer} The position of the header
             */
            function renderTitle(wizard, options, state, header, index) {
                var uniqueId = getUniqueId(wizard),
                    uniqueStepId = uniqueId + _tabSuffix + index,
                    uniqueBodyId = uniqueId + _tabpanelSuffix + index,
                    uniqueHeaderId = uniqueId + _titleSuffix + index,
                    stepCollection = wizard.find(".steps > ul"),
                    title = renderTemplate(options.titleTemplate, {
                    index: index + 1,
                    title: header.html()
                }),
                    stepItem = $("<li role=\"tab\"><a id=\"" + uniqueStepId + "\" href=\"#" + uniqueHeaderId + "\" aria-controls=\"" + uniqueBodyId + "\">" + title + "</a></li>");

                stepItem._enableAria(options.enableAllSteps || state.currentIndex > index);

                if (state.currentIndex > index) {
                    stepItem.addClass("done");
                }

                header._id(uniqueHeaderId).attr("tabindex", "-1").addClass("title");

                if (index === 0) {
                    stepCollection.prepend(stepItem);
                } else {
                    stepCollection.find("li").eq(index - 1).after(stepItem);
                }

                // Set the "first" class to the new first step button
                if (index === 0) {
                    stepCollection.find("li").removeClass("first").eq(index).addClass("first");
                }

                // Set the "last" class to the new last step button
                if (index === state.stepCount - 1) {
                    stepCollection.find("li").removeClass("last").eq(index).addClass("last");
                }

                // Register click event
                stepItem.children("a").bind("click" + getEventNamespace(wizard), stepClickHandler);
            }

            /**
             * Saves the current state to a cookie.
             *
             * @static
             * @private
             * @method saveCurrentStateToCookie
             * @param wizard {Object} A jQuery wizard object
             * @param options {Object} Settings of the current wizard
             * @param state {Object} The state container of the current wizard
             */
            function saveCurrentStateToCookie(wizard, options, state) {
                if (options.saveState && $.cookie) {
                    $.cookie(_cookiePrefix + getUniqueId(wizard), state.currentIndex);
                }
            }

            function startTransitionEffect(wizard, options, state, index, oldIndex, doneCallback) {
                var stepContents = wizard.find(".content > .body"),
                    effect = getValidEnumValue(transitionEffect, options.transitionEffect),
                    effectSpeed = options.transitionEffectSpeed,
                    newStep = stepContents.eq(index),
                    currentStep = stepContents.eq(oldIndex);

                switch (effect) {
                    case transitionEffect.fade:
                    case transitionEffect.slide:
                        var hide = effect === transitionEffect.fade ? "fadeOut" : "slideUp",
                            show = effect === transitionEffect.fade ? "fadeIn" : "slideDown";

                        state.transitionElement = newStep;
                        currentStep[hide](effectSpeed, function () {
                            var wizard = $(this)._showAria(false).parent().parent(),
                                state = getState(wizard);

                            if (state.transitionElement) {
                                state.transitionElement[show](effectSpeed, function () {
                                    $(this)._showAria();
                                }).promise().done(doneCallback);
                                state.transitionElement = null;
                            }
                        });
                        break;

                    case transitionEffect.slideLeft:
                        var outerWidth = currentStep.outerWidth(true),
                            posFadeOut = index > oldIndex ? -outerWidth : outerWidth,
                            posFadeIn = index > oldIndex ? outerWidth : -outerWidth;

                        $.when(currentStep.animate({ left: posFadeOut }, effectSpeed, function () {
                            $(this)._showAria(false);
                        }), newStep.css("left", posFadeIn + "px")._showAria().animate({ left: 0 }, effectSpeed)).done(doneCallback);
                        break;

                    default:
                        $.when(currentStep._showAria(false), newStep._showAria()).done(doneCallback);
                        break;
                }
            }

            /**
             * Fires when a step click happens.
             *
             * @static
             * @private
             * @event click
             * @param event {Object} An event object
             */
            function stepClickHandler(event) {
                event.preventDefault();

                var anchor = $(this),
                    wizard = anchor.parent().parent().parent().parent(),
                    options = getOptions(wizard),
                    state = getState(wizard),
                    oldIndex = state.currentIndex;

                if (anchor.parent().is(":not(.disabled):not(.current)")) {
                    var href = anchor.attr("href"),
                        position = parseInt(href.substring(href.lastIndexOf("-") + 1), 0);

                    goToStep(wizard, options, state, position);
                }

                // If nothing has changed
                if (oldIndex === state.currentIndex) {
                    getStepAnchor(wizard, oldIndex).focus();
                    return false;
                }
            }

            function throwError(message) {
                if (arguments.length > 1) {
                    message = message.format(Array.prototype.slice.call(arguments, 1));
                }

                throw new Error(message);
            }

            /**
             * Checks an argument for null or undefined and throws an error if one check applies.
             *
             * @static
             * @private
             * @method validateArgument
             * @param argumentName {String} The name of the given argument
             * @param argumentValue {Object} The argument itself
             */
            function validateArgument(argumentName, argumentValue) {
                if (argumentValue == null) {
                    throwError("The argument '{0}' is null or undefined.", argumentName);
                }
            }

            /**
             * Represents a jQuery wizard plugin.
             *
             * @class steps
             * @constructor
             * @param [method={}] The name of the method as `String` or an JSON object for initialization
             * @param [params=]* {Array} Additional arguments for a method call
             * @chainable
             **/
            $.fn.steps = function (method) {
                if ($.fn.steps[method]) {
                    return $.fn.steps[method].apply(this, Array.prototype.slice.call(arguments, 1));
                } else if (typeof method === "object" || !method) {
                    return initialize.apply(this, arguments);
                } else {
                    $.error("Method " + method + " does not exist on jQuery.steps");
                }
            };

            /**
             * Adds a new step.
             *
             * @method add
             * @param step {Object} The step object to add
             * @chainable
             **/
            $.fn.steps.add = function (step) {
                var state = getState(this);
                return insertStep(this, getOptions(this), state, state.stepCount, step);
            };

            /**
             * Removes the control functionality completely and transforms the current state to the initial HTML structure.
             *
             * @method destroy
             * @chainable
             **/
            $.fn.steps.destroy = function () {
                return destroy(this, getOptions(this));
            };

            /**
             * Triggers the onFinishing and onFinished event.
             *
             * @method finish
             **/
            $.fn.steps.finish = function () {
                finishStep(this, getState(this));
            };

            /**
             * Gets the current step index.
             *
             * @method getCurrentIndex
             * @return {Integer} The actual step index (zero-based)
             * @for steps
             **/
            $.fn.steps.getCurrentIndex = function () {
                return getState(this).currentIndex;
            };

            /**
             * Gets the current step object.
             *
             * @method getCurrentStep
             * @return {Object} The actual step object
             **/
            $.fn.steps.getCurrentStep = function () {
                return getStep(this, getState(this).currentIndex);
            };

            /**
             * Gets a specific step object by index.
             *
             * @method getStep
             * @param index {Integer} An integer that belongs to the position of a step
             * @return {Object} A specific step object
             **/
            $.fn.steps.getStep = function (index) {
                return getStep(this, index);
            };

            /**
             * Inserts a new step to a specific position.
             *
             * @method insert
             * @param index {Integer} The position (zero-based) to add
             * @param step {Object} The step object to add
             * @example
             *     $("#wizard").steps().insert(0, {
             *         title: "Title",
             *         content: "", // optional
             *         contentMode: "async", // optional
             *         contentUrl: "/Content/Step/1" // optional
             *     });
             * @chainable
             **/
            $.fn.steps.insert = function (index, step) {
                return insertStep(this, getOptions(this), getState(this), index, step);
            };

            /**
             * Routes to the next step.
             *
             * @method next
             * @return {Boolean} Indicates whether the action executed
             **/
            $.fn.steps.next = function () {
                return goToNextStep(this, getOptions(this), getState(this));
            };

            /**
             * Routes to the previous step.
             *
             * @method previous
             * @return {Boolean} Indicates whether the action executed
             **/
            $.fn.steps.previous = function () {
                return goToPreviousStep(this, getOptions(this), getState(this));
            };

            /**
             * Removes a specific step by an given index.
             *
             * @method remove
             * @param index {Integer} The position (zero-based) of the step to remove
             * @return Indecates whether the item is removed.
             **/
            $.fn.steps.remove = function (index) {
                return removeStep(this, getOptions(this), getState(this), index);
            };

            /**
             * Sets a specific step object by index.
             *
             * @method setStep
             * @param index {Integer} An integer that belongs to the position of a step
             * @param step {Object} The step object to change
             **/
            $.fn.steps.setStep = function (index, step) {
                throw new Error("Not yet implemented!");
            };

            /**
             * Skips an certain amount of steps.
             *
             * @method skip
             * @param count {Integer} The amount of steps that should be skipped
             * @return {Boolean} Indicates whether the action executed
             **/
            $.fn.steps.skip = function (count) {
                throw new Error("Not yet implemented!");
            };

            /**
             * An enum represents the different content types of a step and their loading mechanisms.
             *
             * @class contentMode
             * @for steps
             **/
            var contentMode = $.fn.steps.contentMode = {
                /**
                 * HTML embedded content
                 *
                 * @readOnly
                 * @property html
                 * @type Integer
                 * @for contentMode
                 **/
                html: 0,

                /**
                 * IFrame embedded content
                 *
                 * @readOnly
                 * @property iframe
                 * @type Integer
                 * @for contentMode
                 **/
                iframe: 1,

                /**
                 * Async embedded content
                 *
                 * @readOnly
                 * @property async
                 * @type Integer
                 * @for contentMode
                 **/
                async: 2
            };

            /**
             * An enum represents the orientation of the steps navigation.
             *
             * @class stepsOrientation
             * @for steps
             **/
            var stepsOrientation = $.fn.steps.stepsOrientation = {
                /**
                 * Horizontal orientation
                 *
                 * @readOnly
                 * @property horizontal
                 * @type Integer
                 * @for stepsOrientation
                 **/
                horizontal: 0,

                /**
                 * Vertical orientation
                 *
                 * @readOnly
                 * @property vertical
                 * @type Integer
                 * @for stepsOrientation
                 **/
                vertical: 1
            };

            /**
             * An enum that represents the various transition animations.
             *
             * @class transitionEffect
             * @for steps
             **/
            var transitionEffect = $.fn.steps.transitionEffect = {
                /**
                 * No transition animation
                 *
                 * @readOnly
                 * @property none
                 * @type Integer
                 * @for transitionEffect
                 **/
                none: 0,

                /**
                 * Fade in transition
                 *
                 * @readOnly
                 * @property fade
                 * @type Integer
                 * @for transitionEffect
                 **/
                fade: 1,

                /**
                 * Slide up transition
                 *
                 * @readOnly
                 * @property slide
                 * @type Integer
                 * @for transitionEffect
                 **/
                slide: 2,

                /**
                 * Slide left transition
                 *
                 * @readOnly
                 * @property slideLeft
                 * @type Integer
                 * @for transitionEffect
                 **/
                slideLeft: 3
            };

            var stepModel = $.fn.steps.stepModel = {
                title: "",
                content: "",
                contentUrl: "",
                contentMode: contentMode.html,
                contentLoaded: false
            };

            /**
             * An object that represents the default settings.
             * There are two possibities to override the sub-properties.
             * Either by doing it generally (global) or on initialization.
             *
             * @static
             * @class defaults
             * @for steps
             * @example
             *   // Global approach
             *   $.steps.defaults.headerTag = "h3";
             * @example
             *   // Initialization approach
             *   $("#wizard").steps({ headerTag: "h3" });
             **/
            var defaults = $.fn.steps.defaults = {
                /**
                 * The header tag is used to find the step button text within the declared wizard area.
                 *
                 * @property headerTag
                 * @type String
                 * @default "h1"
                 * @for defaults
                 **/
                headerTag: "h1",

                /**
                 * The body tag is used to find the step content within the declared wizard area.
                 *
                 * @property bodyTag
                 * @type String
                 * @default "div"
                 * @for defaults
                 **/
                bodyTag: "div",

                /**
                 * The content container tag which will be used to wrap all step contents.
                 *
                 * @property contentContainerTag
                 * @type String
                 * @default "div"
                 * @for defaults
                 **/
                contentContainerTag: "div",

                /**
                 * The action container tag which will be used to wrap the pagination navigation.
                 *
                 * @property actionContainerTag
                 * @type String
                 * @default "div"
                 * @for defaults
                 **/
                actionContainerTag: "div",

                /**
                 * The steps container tag which will be used to wrap the steps navigation.
                 *
                 * @property stepsContainerTag
                 * @type String
                 * @default "div"
                 * @for defaults
                 **/
                stepsContainerTag: "div",

                /**
                 * The css class which will be added to the outer component wrapper.
                 *
                 * @property cssClass
                 * @type String
                 * @default "wizard"
                 * @for defaults
                 * @example
                 *     <div class="wizard">
                 *         ...
                 *     </div>
                 **/
                cssClass: "wizard",

                /**
                 * The css class which will be used for floating scenarios.
                 *
                 * @property clearFixCssClass
                 * @type String
                 * @default "clearfix"
                 * @for defaults
                 **/
                clearFixCssClass: "clearfix",

                /**
                 * Determines whether the steps are vertically or horizontally oriented.
                 *
                 * @property stepsOrientation
                 * @type stepsOrientation
                 * @default horizontal
                 * @for defaults
                 * @since 1.0.0
                 **/
                stepsOrientation: stepsOrientation.horizontal,

                /*
                 * Tempplates
                 */

                /**
                 * The title template which will be used to create a step button.
                 *
                 * @property titleTemplate
                 * @type String
                 * @default "<span class=\"number\">#index#.</span> #title#"
                 * @for defaults
                 **/
                titleTemplate: "<span class=\"number\">#index#.</span> #title#",

                /**
                 * The loading template which will be used to create the loading animation.
                 *
                 * @property loadingTemplate
                 * @type String
                 * @default "<span class=\"spinner\"></span> #text#"
                 * @for defaults
                 **/
                loadingTemplate: "<span class=\"spinner\"></span> #text#",

                /*
                 * Behaviour
                 */

                /**
                 * Sets the focus to the first wizard instance in order to enable the key navigation from the begining if `true`.
                 *
                 * @property autoFocus
                 * @type Boolean
                 * @default false
                 * @for defaults
                 * @since 0.9.4
                 **/
                autoFocus: false,

                /**
                 * Enables all steps from the begining if `true` (all steps are clickable).
                 *
                 * @property enableAllSteps
                 * @type Boolean
                 * @default false
                 * @for defaults
                 **/
                enableAllSteps: false,

                /**
                 * Enables keyboard navigation if `true` (arrow left and arrow right).
                 *
                 * @property enableKeyNavigation
                 * @type Boolean
                 * @default true
                 * @for defaults
                 **/
                enableKeyNavigation: true,

                /**
                 * Enables pagination if `true`.
                 *
                 * @property enablePagination
                 * @type Boolean
                 * @default true
                 * @for defaults
                 **/
                enablePagination: true,

                /**
                 * Suppresses pagination if a form field is focused.
                 *
                 * @property suppressPaginationOnFocus
                 * @type Boolean
                 * @default true
                 * @for defaults
                 **/
                suppressPaginationOnFocus: true,

                /**
                 * Enables cache for async loaded or iframe embedded content.
                 *
                 * @property enableContentCache
                 * @type Boolean
                 * @default true
                 * @for defaults
                 **/
                enableContentCache: true,

                /**
                 * Shows the cancel button if enabled.
                 *
                 * @property enableCancelButton
                 * @type Boolean
                 * @default false
                 * @for defaults
                 **/
                enableCancelButton: false,

                /**
                 * Shows the finish button if enabled.
                 *
                 * @property enableFinishButton
                 * @type Boolean
                 * @default true
                 * @for defaults
                 **/
                enableFinishButton: true,

                /**
                 * Not yet implemented.
                 *
                 * @property preloadContent
                 * @type Boolean
                 * @default false
                 * @for defaults
                 **/
                preloadContent: false,

                /**
                 * Shows the finish button always (on each step; right beside the next button) if `true`.
                 * Otherwise the next button will be replaced by the finish button if the last step becomes active.
                 *
                 * @property showFinishButtonAlways
                 * @type Boolean
                 * @default false
                 * @for defaults
                 **/
                showFinishButtonAlways: false,

                /**
                 * Prevents jumping to a previous step.
                 *
                 * @property forceMoveForward
                 * @type Boolean
                 * @default false
                 * @for defaults
                 **/
                forceMoveForward: false,

                /**
                 * Saves the current state (step position) to a cookie.
                 * By coming next time the last active step becomes activated.
                 *
                 * @property saveState
                 * @type Boolean
                 * @default false
                 * @for defaults
                 **/
                saveState: false,

                /**
                 * The position to start on (zero-based).
                 *
                 * @property startIndex
                 * @type Integer
                 * @default 0
                 * @for defaults
                 **/
                startIndex: 0,

                /*
                 * Animation Effect Configuration
                 */

                /**
                 * The animation effect which will be used for step transitions.
                 *
                 * @property transitionEffect
                 * @type transitionEffect
                 * @default none
                 * @for defaults
                 **/
                transitionEffect: transitionEffect.none,

                /**
                 * Animation speed for step transitions (in milliseconds).
                 *
                 * @property transitionEffectSpeed
                 * @type Integer
                 * @default 200
                 * @for defaults
                 **/
                transitionEffectSpeed: 200,

                /*
                 * Events
                 */

                /**
                 * Fires before the step changes and can be used to prevent step changing by returning `false`.
                 * Very useful for form validation.
                 *
                 * @property onStepChanging
                 * @type Event
                 * @default function (event, currentIndex, newIndex) { return true; }
                 * @for defaults
                 **/
                onStepChanging: function (event, currentIndex, newIndex) {
                    return true;
                },

                /**
                 * Fires after the step has change.
                 *
                 * @property onStepChanged
                 * @type Event
                 * @default function (event, currentIndex, priorIndex) { }
                 * @for defaults
                 **/
                onStepChanged: function (event, currentIndex, priorIndex) {},

                /**
                 * Fires after cancelation.
                 *
                 * @property onCanceled
                 * @type Event
                 * @default function (event) { }
                 * @for defaults
                 **/
                onCanceled: function (event) {},

                /**
                 * Fires before finishing and can be used to prevent completion by returning `false`.
                 * Very useful for form validation.
                 *
                 * @property onFinishing
                 * @type Event
                 * @default function (event, currentIndex) { return true; }
                 * @for defaults
                 **/
                onFinishing: function (event, currentIndex) {
                    return true;
                },

                /**
                 * Fires after completion.
                 *
                 * @property onFinished
                 * @type Event
                 * @default function (event, currentIndex) { }
                 * @for defaults
                 **/
                onFinished: function (event, currentIndex) {},

                /**
                 * Fires after async content is loaded.
                 *
                 * @property onContentLoaded
                 * @type Event
                 * @default function (event, index) { }
                 * @for defaults
                 **/
                onContentLoaded: function (event, currentIndex) {},

                /**
                 * Fires when the wizard is initialized.
                 *
                 * @property onInit
                 * @type Event
                 * @default function (event) { }
                 * @for defaults
                 **/
                onInit: function (event, currentIndex) {},

                /**
                 * Contains all labels.
                 *
                 * @property labels
                 * @type Object
                 * @for defaults
                 **/
                labels: {
                    /**
                     * Label for the cancel button.
                     *
                     * @property cancel
                     * @type String
                     * @default "Cancel"
                     * @for defaults
                     **/
                    cancel: "Cancel",

                    /**
                     * This label is important for accessability reasons.
                     * Indicates which step is activated.
                     *
                     * @property current
                     * @type String
                     * @default "current step:"
                     * @for defaults
                     **/
                    current: "current step:",

                    /**
                     * This label is important for accessability reasons and describes the kind of navigation.
                     *
                     * @property pagination
                     * @type String
                     * @default "Pagination"
                     * @for defaults
                     * @since 0.9.7
                     **/
                    pagination: "Pagination",

                    /**
                     * Label for the finish button.
                     *
                     * @property finish
                     * @type String
                     * @default "Finish"
                     * @for defaults
                     **/
                    finish: "Finish",

                    /**
                     * Label for the next button.
                     *
                     * @property next
                     * @type String
                     * @default "Next"
                     * @for defaults
                     **/
                    next: "Next",

                    /**
                     * Label for the previous button.
                     *
                     * @property previous
                     * @type String
                     * @default "Previous"
                     * @for defaults
                     **/
                    previous: "Previous",

                    /**
                     * Label for the loading animation.
                     *
                     * @property loading
                     * @type String
                     * @default "Loading ..."
                     * @for defaults
                     **/
                    loading: "Loading ..."
                }
            };
        })(jQuery);
    })(this);

    return _retrieveGlobal();
});
System.registerDynamic("reactiveadmintemplate/scripts/modules/wizard/init.js", ["./main"], true, function ($__require, exports, module) {
    'use strict';

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    /*!
     * @version: 1.1.2
     * @name: validation
     *
     * @author: https://themeforest.net/user/flexlayers
     */
    $__require("./main");
    var wizard = {
        headerTag: "h3",
        bodyTag: "section",
        transitionEffect: "slideLeft",
        autoFocus: true,
        onInit: initSteps,
        onStepChanged: resizeJquerySteps,
        onStepChanging: validateStep,
        onFinishing: validateStep,
        labels: {
            cancel: "Cancel",
            current: "current step:",
            pagination: "Pagination",
            finish: "Finish",
            next: "Next",
            previous: "Prev",
            loading: "Loading ..."
        }
    };
    var fields = {
        email: {
            identifier: 'email',
            rules: [{ type: 'email', prompt: 'Please enter a valid e-mail' }]
        },
        password: {
            identifier: 'password',
            rules: [{ type: 'empty', prompt: 'Please enter a password' }, { type: 'minLength[6]', prompt: 'Your password must be at least {ruleValue} characters' }]
        },
        checked: {
            identifier: 'checked',
            rules: [{ type: 'checked', prompt: 'You must agree to the terms and conditions' }]
        }
    };
    // titleTemplate: '<span class="number">#index#.</span> #title#',
    // loadingTemplate: '<span class="spinner"></span> #text#'
    $(".wizard-buttons").steps(wizard);
    $(".wizard-navigation").steps($.extend({}, wizard, { enableAllSteps: true }));
    $(".wizard-navigation-icons").steps($.extend({}, wizard, { enableAllSteps: true, titleTemplate: "#title#" }));
    $(".wizard-navigation-vertical").steps($.extend({}, wizard, { enableAllSteps: true, stepsOrientation: "vertical" }));
    $(".wizard-navigation-vertical-tab").steps($.extend({}, wizard, { enableFinishButton: false, enablePagination: false, enableAllSteps: true, titleTemplate: "#title#", cssClass: "tabcontrol", stepsOrientation: "vertical" }));
    $(".wizard-navigation-tabs").steps($.extend({}, wizard, { enableFinishButton: false, enablePagination: false, enableAllSteps: true, titleTemplate: "#title#", cssClass: "tabcontrol" }));
    $('#myModal').on('shown.bs.modal', function () {
        resizeJquerySteps($(this).find('.wizard')[0]);
    });
    function validateStep(e) {
        var $target = $(e.target);
        var $form = $target.parent('form');
        if (!$form.length) return true;
        validateForm(e);
        return $form.form('is valid');
    }
    function validateForm(e) {
        var $form = $(e.target).parent('form');
        $form.form({
            on: 'change',
            inline: true,
            fields: fields,
            selector: { ignore: ':hidden' },
            onInvalid: function () {
                resizeJquerySteps(e.target);
            }
        });
        $form.form('validate form');
    }
    function initSteps(e) {
        var $target = $(e.target);
        $target.find('.content').height($target.find('.body.current').outerHeight());
        var $steps = $target.not('.vertical, .tabcontrol').find('.steps > ul > li');
        $steps.width(100 / $steps.length + '%');
        $(window).on('resize', function () {
            setTimeout(function () {
                return resizeJquerySteps(e);
            }, 100);
        });
        var $form = $target.parent('form');
        if (!$form.length) return;
        $target.parent('.form-step-validation').form({
            on: 'change',
            inline: true,
            fields: fields
        });
    }
    function resizeJquerySteps(e) {
        $(e).find('.content').animate({ height: $(e).find('.body.current').outerHeight() }, 200);
    }
});
System.registerDynamic("reactiveadmintemplate/scripts/form-addon.js", ["./app", "./modules/form/validation/init", "./modules/form/datapicker/init", "./modules/form/datatimepicker/init", "./modules/form/time-picker", "./modules/form/input-mask", "./modules/form/editor/init", "./modules/form/color-picker", "./modules/form/touch-spin", "./modules/wizard/init"], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", { value: true });
  /*!
   * @version: 1.1.2
   * @name: form-addon
   *
   * @author: https://themeforest.net/user/flexlayers
   */
  $__require("./app");
  $__require("./modules/form/validation/init");
  $__require("./modules/form/datapicker/init");
  $__require("./modules/form/datatimepicker/init");
  $__require("./modules/form/time-picker");
  $__require("./modules/form/input-mask");
  $__require("./modules/form/editor/init");
  $__require("./modules/form/color-picker");
  $__require("./modules/form/touch-spin");
  $__require("./modules/wizard/init");
});