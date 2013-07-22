(function($) {
	jQuery.validator.addMethod("require_from_group2", function(value, element, options) {
		// Based on require_from_group method, which is included with jQuery Validate itself, in the additional-methods.js file.
		// This version is Ryley's answer at http://stackoverflow.com/questions/4128657/jquery-validation-changing-rules-dynamically
		// and his JSFiddle at http://jsfiddle.net/ryleyb/wHpus/66/
		var validator = this;
		var minRequired = options[0];
		var selector = options[1];
		var validOrNot = jQuery(selector, element.form).filter(function() {
			return validator.elementValue(this);
		}).length >= minRequired;

		// remove all events in namespace upload

		jQuery(selector, element.form).off('.require_from_group2');

		if (this.settings.onkeyup) {
			jQuery(selector, element.form).on({
				'keyup.require_from_group2' : function(e) {
					jQuery(selector, element.form).valid();
				}
			});
		}
		if (this.settings.onfocusin) {
			jQuery(selector, element.form).on({
				'focusin.require_from_group2' : function(e) {
					jQuery(selector, element.form).valid();
				}
			});
		}
		if (this.settings.click) {
			jQuery(selector, element.form).on({
				'click.require_from_group2' : function(e) {
					jQuery(selector, element.form).valid();
				}
			});
		}
		if (this.settings.focusout) {
			jQuery(selector, element.form).on({
				'focusout.require_from_group2' : function(e) {
					jQuery(selector, element.form).valid();
				}
			});
		}
		return validOrNot;
	});

	var vForm = document.getElementById("mainForm");
	$(vForm).validate({
	});

	$.extend($.validator.messages, {
		require_from_group2 : "Select x from y fields"
	});

	window.myApp = window.myApp || {};
	myApp.functions = myApp.functions || {};
	myApp.functions.updateRules = function() {
		var rule1, rule2, rule3, formRule;
		var newVal = $("input[name=switchVal]:checked").val();
		if (newVal === "1") {
			$("#field1, #field2, #field3").rules("remove", "require_from_group2");
			$("#field1, #field2, #field3").rules("add", {
				require_from_group2 : [1, "#field1, #field2, #field3"],
				messages : {
					require_from_group2 : "One from three"
				}
			});

		} else {
			$("#field1, #field2, #field3").rules("remove", "require_from_group2");
			$("#field1, #field2, #field3").rules("add", {
				require_from_group2 : [2, "#field1, #field2, #field3"],
				messages : {
					require_from_group2 : "Two from three"
				}
			});
		}
	};

	myApp.functions.updateRules();
	$("input[name=switchVal]").change(function() {
		myApp.functions.updateRules();
	});
})(jQuery);
