<?php
/*
	Template Name: Cardholder Template
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

	lite Cardstock: functions.php

	Site Wordpress functions file.
*/

	function FJBO_Cardstock_Resources() {
		wp_enqueue_style('style', get_stylesheet_uri());
		wp_enqueue_script("jquery");

		wp_register_script('fjboCardstockFunctions', (get_template_directory_uri().'/js/site-functions.js'), false);
		wp_enqueue_script('fjboCardstockFunctions');

		wp_register_script('fjboCardstockSlider', (get_template_directory_uri().'/js/cardstock-slider.js'), array('jquery', 'fjboCardstockFunctions'), false, true);
		if(is_page_template('template_cardholder.php')) {
			wp_enqueue_script('fjboCardstockSlider');
		}
	}

	function FJBO_Cardstock_Slider_Scripts() {
		wp_register_script('fjboCardstockSlider', (get_template_directory_uri().'/js/cardstock-slider.js'), array('jquery', 'fjboCardstockFunctions'));
		wp_enqueue_script('fjboCardstockSlider');
	}

	function FJBO_Cardstock_Setup() {
		// Define Navigation
		register_nav_menus(array(
			'primary' => __('Primary Menu')
		));

		// Register support for custom logo
		add_theme_support('custom-logo');
	}

	add_action('wp_enqueue_scripts', 'FJBO_Cardstock_Resources');
	add_action('after_setup_theme', 'FJBO_Cardstock_Setup');
?>
