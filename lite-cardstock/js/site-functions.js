/*
	Theme Name: Lite Cardstock
	Theme URI: https://github.com/fjbo-net/fjbo-lite-cardstock
	Author: Francisco Javier Becerra-Ortiz
	Author URI: http://fjbo.net/
	Description: The Lite Cardstock Theme for Wordpress is an Open-Source project by Francisco Javier Becerra-Ortiz (FJBO) that features a slider-like user interface in Parent Pages. Lite Cardstock is very lightweight, minimalistic, refined, interactive, smart and responsive. Lite Cardstock sports vibrant, warm, and elegant colors. Bring your visitors an innovative way to engage with your content. Currently under development.
	Version: 0.1
	License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
	License URI: http://creativecommons.org/licenses/by-nc-sa/4.0/
	Tags: modern, minimalistic, one-column, tan, white, yellow, flexible-width, custom-logo, interactive, simple, minimalistic, light, lightweight
	Text Domain: fjbo-net

	Lite Cardstock Theme by Francisco Javier Becerra-Ortiz (FJBO) is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
	Permissions beyond the scope of this license may be available at https://github.com/fjbo-net.

	lite Cardstock: site-function.js

	This file contains all site-wide javascript functions used by the Theme.
*/

if(!window.fjbo) window.fjbo = {};

window.fjbo.vMode = {};
if(window.fjbo.vMode) {
	window.fjbo.vMode.h = window.innerHeight;
	window.fjbo.vMode.w = window.innerWidth;
	window.fjbo.vMode.get = function() {
		if(window.innerWidth <= 800) return 1;
		else if(window.innerWidth <= 1260) return 2;
		else return 3;
	}
}
