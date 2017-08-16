// Run this on page load
$(document).ready(function() {

	// Variable for storing upcoming section fadeIn function
	// that will be cancelled if another section is selected
	// before the function has executed.
	var timeoutID = null;

	// functions

	// Gets 'nav a' element and the corresponding
	// 'section' element from a hash string.
	function getNavlinkAndSectionElementsByHash(hash) {
		var lowerhash = hash.toLowerCase();
		if (lowerhash == "" || lowerhash == null || lowerhash == "#") {
			lowerhash = "#home";
		};
		var link = $("[href='"+lowerhash+"']");
		var section = $(lowerhash);
		return [link, section];
	};
		
	// Underlines a given 'nav a' element and
	// removes the underline from all others.
	// Does nothing if the given 'nav a' element
	// is already underlined.
	function switchActiveNavlink(navlink) {
		if (navlink.length != 0 && !($(navlink).css("text-decoration") == "underline")) {
			$("nav a").css("text-decoration", "none");
			$(navlink).css("text-decoration", "underline");
		};
	};

	// Fades out the currently displayed 'section'
	// element and returns a function on a timer
	// that will fade in the given 'section' element
	// after 500 milliseconds.
	// Does nothing if the given 'section' element
	// is already displayed.
	function switchActiveSection(newSection, timeoutID) {
		window.clearTimeout(timeoutID);
		if ($(newSection).length != 0 && $(newSection).css("display") == "none") {
			var sections = $("section");
			for (var i = 0; i < sections.length; i++) {
				if ($(sections[i]).css("display") != "none") {
					$(sections[i]).fadeOut(225);
				};
			};
		};
		return window.setTimeout(function() {$(newSection).fadeIn(225);}, 500);
	};

	// Calls previous functions to change which 'nav a' element
	// is underlined and which 'section' element is displayed.
	function changeActivePage(hash, timeoutID) {
		var elements = getNavlinkAndSectionElementsByHash(hash);
		switchActiveNavlink(elements[0]);
		return switchActiveSection(elements[1], timeoutID);
	};


	// Event listeners

	// Event listener for url hash change.
	// On change, will call changeActivePage()
	// with new hash string.
	$(window).on("hashchange", function() {
		timeoutID = changeActivePage(window.location.hash, timeoutID);
	});


	// Run once on load.

	// Set 'display' css property on all 'section' elements to 'none' as default.
	$("main section").css("display", "none");

	// Set 'display' css property on all '.sectionHeader' class elements to 'none'
	// as default.
	$(".sectionHeader").css("display", "none");

	// Underline correct 'nav a' element and display corresponding
	// 'section' element from the hash value in the address bar.
	// If either no hash exists or an invalid one is present, change
	// the hash to '#home' and continue as above.
	var activeNavlinkAndSection = getNavlinkAndSectionElementsByHash(window.location.hash);
	if (activeNavlinkAndSection[0].length == 0) {
		window.location.hash = "#home";
		activeNavlinkAndSection = getNavlinkAndSectionElementsByHash("#home");
	}
	$(activeNavlinkAndSection[0]).css("text-decoration", "underline");
	$(activeNavlinkAndSection[1]).css("display", "block");
	
});