/**
 * Remove go button from translation dropdown
 */
jQuery(function(){
    var $frm = jQuery('#translation__dropdown');
    if(!$frm.length) return;

    var dropdown = $frm.find('select[name=id]');
    if (!dropdown.length) return;

    $frm.find('input[name=go]').hide();
    dropdown.change(function() {

        var id = jQuery(this).val();

        // this should hopefully detect rewriting good enough:
        var action = $frm.attr('action');

        window.location.href = (action.substr(action.length - 1) == '/')
            ? action + id : action + '?id=' + id;
    });
});

jQuery(function() {
    // show the current namespace description
    if (!NS) return;
    var nsDescription = NS;
    var cookie = DokuCookie.getValue('currentNamespaceCodes');
    if (cookie) {
        var val = cookie.split(':');
        if ((val.length > 1) && (val[0] === NS))
            nsDescription = val[1];
    }
    jQuery('#namespace-auto-complete').val(nsDescription);
});
