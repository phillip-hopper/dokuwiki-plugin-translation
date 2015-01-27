/**
 * Our implementation fo the DokuCookie for cross-domain support
 */
var Door43Cookie = {
    data: {},
    name: 'DOOR43_PREFS',

    /**
     * Save a value to the cookie
     */
    setValue: function(key,val){
        var text = [],
            _this = this;
        this.init();
        this.data[key] = val;

        //save the whole data array
        jQuery.each(_this.data, function (key, val) {
            if (_this.data.hasOwnProperty(key)) {
                text.push(encodeURIComponent(key)+'#'+encodeURIComponent(val));
            }
        });

        if (DOKU_BASE === '/') {
            jQuery.cookie(this.name, text.join('#'), {expires: 365, path: DOKU_BASE, domain: '.door43.org'});
        }
        else {
            jQuery.cookie(this.name, text.join('#'), {expires: 365, path: DOKU_BASE});
        }

    },

    /**
     * Get a Value from the Cookie
     */
    getValue: function(key){
        this.init();
        return this.data[key];
    },

    /**
     * Loads the current set cookie
     */
    init: function(){
        var text, parts, i;
        if(!jQuery.isEmptyObject(this.data)) {
            return;
        }
        text = jQuery.cookie(this.name);
        if(text){
            parts = text.split('#');
            for(i = 0; i < parts.length; i += 2){
                this.data[decodeURIComponent(parts[i])] = decodeURIComponent(parts[i+1]);
            }
        }
    }
};


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
    var cookie = Door43Cookie.getValue('recentNamespaceCodes');

    if (cookie) {
        var cookies = cookie.split(';');
        console.log(cookies);
        for (var i = 0; i < cookies.length; i++) {

            var val = cookies[i].split(':');
            if ((val.length > 1) && (val[0] === NS)) {

                nsDescription = val[1];
                break;
            }
        }
    }
    jQuery('#namespace-auto-complete').val(nsDescription);
});
