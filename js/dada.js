// When loaded, init
$( function() {
	init();
});


// Delimiters for operations
var delimiters = {
	'Lines': "\n",
	'Words': " "
};

// Init
function init () {

	// Create cut-up options
	var c = 0; // Count how many delimit options we have
	var checked = ''; // Uh, could you do this more easily?
	for (var d in delimiters) {
		if (c == 0) { checked = ' checked'; } else { checked = ''; }
		c++;

		$("#options").append("<input type='radio' name='delimiter' value='" + d + "'" + checked + "> " + d + " ");
	}
	
	// Fire jQuery UI sortable and focus the textarea
	$("#pasteboard").sortable();
	$("#poem").focus();
}

function cutUp () {
	// Clear the pasteboard
	$("#pasteboard").html('');

	// Hide the start screen and show cut-up
	$("#tools").hide(1);
	$("#cutup").show(1);

	// Get text
	var text = $("#poem")[0].value;

	// Get method from radio boxes
	var method = $('input[name=delimiter]:checked').val();

	// According to it get limiter and split text
	var delimiter = delimiters[method];

	// If we are not splitting by line breaks, let's remove them altogether
	console.log('delimit: "' + delimiter + '"');
	if (delimiter != "\n") {
		console.log('Jep');
		text = text.replace(/\n/g, " ");
	}

	var pieces = text.split(delimiter);

	// Shuffle pieces	
	shuffle(pieces);

	// Append pieces to the pasteboard
	for (var p in pieces) {
		var piece = pieces[p];
		if (piece != "") {
			$("#pasteboard").append("<div class='piece " + method + "'><p>" + piece + "</p></div>");
		}
	}

	// If no text was given, display this message
	if ($("#pasteboard").html() == '') {
		$("#pasteboard").html('You should give some text to cut up.');
	}
}

// Show tools when returning from pasteboard
function showTools() {
	$("#cutup").hide();
	$("#tools").show();
}

// Shuffle the pieces
function shuffleItems () {
	$("#pasteboard").randomize(".piece");
}


// Some helper functions
// Thank you, Russ Cam & gruppler @ stackoverflow

(function($) {
$.fn.randomize = function(childElem) {
  return this.each(function() {
      var $this = $(this);
      var elems = $this.children(childElem);

      elems.sort(function() { return (Math.round(Math.random())-0.5); });  

      $this.detach(childElem);  

      for(var i=0; i < elems.length; i++)
        $this.append(elems[i]);      

  });    
}
})(jQuery);

// Thank you, random person (called just "Jeff") on stackoverflow
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}
