/**
* jQuery.highlight 1.0.0
* Copyright (C) 2012 Frozenball <orkkiolento [at] gmail [dot] com>
* Licensed with The MIT License (MIT), http://www.opensource.org/licenses/mit-license.php
* 
* Adds a black overlay to highlight elements.
* 
* Example usage:
* 
* $('#element').highlight();
* $.removeHighlight();
* 
* Styling:
* Use #jQueryHighlight ID.
* 
**/


(function($) {
    /**
     *  Adds a black overlay to the page
     */
    var addBlack = function(options){
        el = $('<div id="'+options['useID']+'" style="position:fixed; top:0px; left:0px; right:0px; bottom:0px;"></div>');
        if (options['bgColor'] !== null) {
            el.css('background-color',options['bgColor']);
        }
        el.css('opacity',options['opacity']);
        /*
        el.width($(document).outerWidth());
        el.height($(document).height());
*/        
        el.css('z-index',options['zIndex']);
        $('html').append(el);
        if (options['animation'] === true) el.hide().fadeIn('fast');
        return el;
    };
    
    /**
     *  Where we store element's z-index & position
     */
    var stored = [];
    
    /**
     *  Default options for this plugin
     */
    var defaultOptions = {
        bgColor: 'black',
        opacity: 0.7,
        zIndex: 1000,
        animation: true,
        useID: 'jQueryHighlight',
        timeOut: false
    };
    
    /**
     * Function to remove the highlight effect
     */
    var removeHighlight = function(opt) {
        var options = $.extend({}, defaultOptions, opt);
        $.each(stored,function(){
            var $this = this[0];
            $this.css('position',this[1]);
            $this.css('z-index',this[2]);
        });
        if (options['animation'] === true) {
            $('#'+options['useID']).fadeOut('fast',function(){
                $(this).remove();
            });
        } else {
            $('#'+options['useID']).remove();
        }
    }
    
    /**
     * Exposing the remove highlight method to the public namespace
     */
    $.highlight = function(opt) {
        if (opt === undefined) opt = {};
        removeHighlight(opt);
    }
    
    /**
     * Adds a highlight to elements
     * 
     * For example,
     * 
     * $('#element').highlight();
     * $('a').highlight();
     */
    $.fn.highlight = function(opt) {
        if (opt === undefined) opt = {};
        var options = $.extend({}, defaultOptions, opt);
        
        removeHighlight(options);
        addBlack(options);
        if (options['timeOut'] !== false) {
            setTimeout(function(){
                removeHighlight(options);
            },options['timeOut']);
        }
        return this.each(function() {
            var $this = $(this);
            stored.push([$this,$this.css('position'),$this.css('z-index')]);
            $this.css('position','relative');
            $this.css('z-index',options['zIndex']+1);
        });
    };
})(jQuery);