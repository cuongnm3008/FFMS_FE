"use strict";

import KTSticky from "./sticky.js";
import KTMenu from "./menu.js";

// Class definition
var KTLayoutHeader = function() {
    // Private variables
    var header;

    // Private functions
    var handleSticky = function() {        
        // Proceed only if header element exists
        if (!header) {
            return;
        }

        var sticky = KTSticky.getInstance(header);
        var timer;

        if (sticky) {
            sticky.on('kt.sticky.change', function() {
                timer = setTimeout(function() {
                    KTMenu.updateDropdowns(); 
                }, 300);              
            });
        }
    }
    
    // Public methods
	return {
		init: function() {
            header = document.querySelector('#kt_header');
            
            handleSticky();
		}
	};
}();

export default KTLayoutHeader;