<?php /**/ ?><?php
/*
Plugin Name: Sample Plugin
Plugin URI: http://yourls.org/
Description: Sample plugin to illustrate how actions and filters work. Read its source. Refer to the <a href="http://yourls.org/pluginapi">Plugin API documentation</a> for more details.
Version: 0.1
Author: Ozh
Author URI: http://ozh.org/
*/

/* Example of an action
 *
 * We're going to add an entry to the menu.
 *
 * The menu is drawn by function yourls_html_menu() in file includes/functions-html.php.
 * Right before the function outputs the closing </ul>, notice the following function call:
 * yourls_do_action( 'admin_menu' );
 * This function says: "hey, for your information, I've just done something called 'admin menu', thought I'd let you know..."
 *
 * We're going to hook into this action and add our menu entry
 */
 
yourls_add_action( 'admin_menu', 'ozh_sample_add_menu' );
/* This says: when YOURLS does action 'admin_menu', call function 'ozh_sample_add_menu'
 */

function ozh_sample_add_menu() {
	echo '<li><a href="http://ozh.org/">Ozh</a></li>';
}
/* And that's it. Activate the plugin and notice the new menu entry.
 */

 

/* Example of a filter
 *
 * We're going to modify the <title> of pages in the admin area
 *
 * The <title> tag is generated by function yourls_html_head() in includes/functions-html.php
 * Notice the following function call:
 * $title = yourls_apply_filter( 'html_title', 'YOURLS: Your Own URL Shortener' );
 * This function means: give $title the value "YOURLS: Your Own URL Shortener", unless a
 * filter modifies this value.
 *
 * We're going to hook into this filter and modify this value.
 */
 
yourls_add_filter( 'html_title', 'ozh_sample_change_title' );
/* This says: when filter 'html_title' is triggered, send its value to function 'ozh_sample_change_title'
 * and use what this function will return.
 */
 
function ozh_sample_change_title( $value ) {
	$value = $value . ' (we have hacked this title)';
	return $value; // a filter *always* has to return a value
}
/* And that's it. Activate the plugin and notice how the page title changes */

