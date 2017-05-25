(function ( $ ) {
    'use strict';

    var SimpleNavScroller = function(element, options) {
        var htmlBodyElement = $('html, body');
        var simpleNavScrollerElement = $(element);
        var targetElement;

        var settings = $.extend(true, {
            attributeForFindTargetElement: 'href',
            targetElementAttribute: 'id',
            topSpace: 0, // int topSpace: value | function topSpace: function() { return (int) topSpace }
            animateDuration: 400,
            animateFunction: 'linear',
            elements: {
                targetElement: false,
            },
        }, options);

        if($.type(settings.elements.targetElement) === 'string' || $.type(settings.elements.targetElement) === 'object') {
            targetElement = $(settings.elements.targetElement);
        } else {
            attributeForFindTargetElement = simpleNavScrollerElement.attr(settings.attributeForFindTargetElement);

            if ( attributeForFindTargetElement !== null && attributeForFindTargetElement !== '' ) {
                attributeForFindTargetElement = attributeForFindTargetElement.replace( /^#/, '' );
            }

            targetElement = $('[' + settings.targetElementAttribute + '="' + attributeForFindTargetElement + '"]');
        }

        if(targetElement.length > 0) {
            targetElement = targetElement.first();
            simpleNavScrollerElement.on('click', eventScroll);

        }

        function getTopSpace() {
            if($.type(settings.topSpace) === 'function') {
                return settings.topSpace();
            }

            return settings.topSpace;
        }

        function eventScroll(event) {
            event.preventDefault();
            event.stopPropagation();
            simpleNavScrollerElement.trigger('start-scrolling');

            htmlBodyElement.animate({
                scrollTop: targetElement.offset().top - getTopSpace()
            }, settings.animateDuration, settings.animateFunction, function() {
                simpleNavScrollerElement.trigger('end-scrolling');
            } );
        }
    };

    //Initialize jQuery function
    $.fn.simpleNavigationScroller = function() {
        var simpleNavScrollerElements = this;
        var i;

        for (i = 0; i < simpleNavScrollerElements.length; i++) {
            var simpleNavScrollerElement = simpleNavScrollerElements[i];

            if(!(simpleNavScrollerElement.simpleNavScroller instanceof SimpleNavScroller)) {
                simpleNavScrollerElement.simpleNavScroller = new SimpleNavScroller(simpleNavScrollerElement, arguments[0]);
            }
        }

        return simpleNavScrollerElements;
    };

}( jQuery ));
