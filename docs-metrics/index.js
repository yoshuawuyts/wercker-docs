/**
 * Setup buttons and links
 */
var signupNavSub        =    document.querySelector('#signup-nav-sub');
var signupFooterSub     =    document.querySelector('#signup-footer-sub');
var newsletterJoin      =    document.querySelector('#newsletter-join');

/**
 * Setup event listeners
 */
signupNavSub.onclick = trackSignupClick;
signupFooterSub.onclick = trackSignupClick;
newsletterJoin.onclick = trackCorporateClick;

/**
 * Sign up clicks on sub pages
 */
function trackSignupClick (e) {
  var buttonId  =  e.target.getAttribute('id');
  var pageId    =  document.querySelector('body').getAttribute('id');
  return client.trackExternalLink(event, 'signup_click', {id: buttonId, page: pageId});
}

/**
 * External link clicks
 */
function trackCorporateClick (e) {
  var buttonId  =  e.target.getAttribute('id');
  var pageId    =  document.querySelector('body').getAttribute('id');
  return client.trackExternalLink(event, "corporate_click", {id: buttonId, page: pageId});
}
