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

	function addRules(rulesObj, ruleName) {
		for (var item in rulesObj) {
			$('#' + item).rules('add', rulesObj[item]);
		}
	}

	function removeRules(rulesObj, ruleName) {
		for (var item in rulesObj) {
			$('#' + item).rules('remove');
		}
	}

	function removeRulesGroup(rulesGroupObj) {
		// Remove all rules defined rulesGroupObj config object.
		// rulesGroupObj might be rules config object (i.e. an "associative" array) or it may be a "proper"
		//  array of rule objects.  It doesn't matter. jQuery.each() will still loop through them.
		$.each(rulesGroupObj, function(index, item) {
			removeRules(item, index);
		});
	}

	var vForm = document.getElementById("mainForm");
	$(vForm).validate({
	});

	/*
	 var rulesConfigObj = {
	 defaults : {
	 oneOfThree : {
	 message : "One out of three fields required, default"
	 }
	 },
	 ruleGroups : {
	 oneOfThree: {
	 field1 : {
	 require_from_group2 : [1, "#field1, #field2, #field3"],
	 messages : {
	 require_from_group2 : "One out of three fields required 1"
	 // require_from_group2 : function() {
	 // console.log(rulesConfigObj);
	 // return this.defaults.oneOfThree.message;
	 // }
	 }
	 },
	 field2 : {
	 require_from_group2 : [1, "#field1, #field2, #field3"],
	 messages : {
	 require_from_group2 : "One out of three fields required 2"
	 }
	 },
	 field3 : {
	 require_from_group2 : [1, "#field1, #field2, #field3"],
	 messages : {
	 require_from_group2 : "One out of three fields required 3"
	 }
	 }
	 },
	 twoOfThree : {
	 field1 : {
	 require_from_group2 : [2, "#field1, #field2, #field3"],
	 messages : {
	 require_from_group2 : "Two out of three fields required"
	 }
	 },
	 field2 : {
	 require_from_group2 : [2, "#field1, #field2, #field3"],
	 messages : {
	 require_from_group2 : "Two out of three fields required"
	 }
	 },
	 field3 : {
	 require_from_group2 : [2, "#field1, #field2, #field3"],
	 messages : {
	 require_from_group2 : "Two out of three fields required"
	 }
	 }
	 }
	 }
	 }
	 */
	/*
	 var rulesConfigObj = {
	 messages : {
	 oneOfThree : {
	 message : "One out of three fields required, default"
	 }
	 },
	 ruleGroups : {
	 oneOfThree : {
	 field1 : {
	 require_from_group2 : [1, "#field1, #field2, #field3"]
	 },
	 },
	 twoOfThree : {
	 field1 : {
	 require_from_group2 : [2, "#field1, #field2, #field3"]
	 }
	 }
	 */
	// addRules(rulesConfigObj.ruleGroups.oneOfThree);
	$.extend($.validator.messages, {
		require_from_group2 : "Select x from y fields"
	});

	$("input[name=switchVal]").change(function() {
		var rule1, rule2, rule3, formRule;
		var newVal = $(this).val();
		//removeRulesGroup(rulesConfigObj.ruleGroups);
		if (newVal === "1") {
			// addRules(rulesConfigObj.ruleGroups.oneOfThree);
			$("#field1, #field2, #field3").rules("remove", "require_from_group2");
			$("#field1, #field2, #field3").rules("add", {
				require_from_group2 : [1, "#field1, #field2, #field3"],
				messages : {
					require_from_group2 : "One from three"
				}
			});

		} else {
			// addRules(rulesConfigObj.ruleGroups.twoOfThree);
			rule1 = $("#field1").rules();
			rule2 = $("#field2").rules();
			rule3 = $("#field3").rules();
			$("#field1, #field2, #field3").rules("remove", "require_from_group2");
			$("#field1, #field2, #field3").rules("add", {
				require_from_group2 : [2, "#field1, #field2, #field3"],
				messages : {
					require_from_group2 : "Two from three"
				}
			});
		}

		rule1 = $("#field1").rules();
		rule2 = $("#field2").rules();
		rule3 = $("#field3").rules();
		console.log("done ");
	});
})(jQuery);
