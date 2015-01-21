var namespaceAutoComplete = jQuery('#namespace-auto-complete');

namespaceAutoComplete.on('autocompleteclose', function() {

    var langText = jQuery(this).val();
    if (!langText) return;

    // if closed without picking from the list, do nothing
    if (langText.indexOf(')') < 3) return;

    var langCodes = langText.match(/\(([a-z-]+)\)/i);

    if ((!langCodes) || (langCodes.length !== 2)) return;
    var id = langCodes[1];

    //if the namespace didn't change, do nothing
    if (NS && (id === NS)) return;

    var action = jQuery('#namespace-auto-complete-action').val();
    var pos = action.indexOf(':');
    if (pos > -1) action = action.substr(pos + 1);

    window.location.href = DOKU_BASE + id + '/' + action;
});

namespaceAutoComplete.on('keyup', function(event) {

    if (event.which !== 13) return;

    var id = jQuery(this).val();

    //if the namespace didn't change, do nothing
    if (NS && (id === NS)) return;

    var action = jQuery('#namespace-auto-complete-action').val();
    var pos = action.indexOf(':');
    if (pos > -1) action = action.substr(pos + 1);

    window.location.href = DOKU_BASE  + id + '/' + action;
});
