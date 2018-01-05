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

	lite Cardstock: header.php

	Default Site Header template.
*/
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
	<head>
		<meta charset="<?php bloginfo('charset');?>" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,, minimum-scale=1.0, user-scalable=no">
		<title><?php bloginfo('name'); ?></title>
		<?php wp_head(); ?>
	</head>
	<body <?php body_class(); ?>>
		<div id="site-container">
		<header id="the-header">
		<?php
			if(has_custom_logo()) {
				the_custom_logo();
			} else {
				?>
				<h1 id="site-title"><a href="<?php echo home_url(); ?>"><?php bloginfo('name'); ?></a></h1>
				<h5 id="site-tagline"><?php bloginfo('description'); ?></h5>
				<?php
			}
		?>
		</header>
		<nav id="the-nav">
			<?php
				$the_nav_args = array(
					'theme_location' => 'primary'
				);
				wp_nav_menu($the_nav_args);
			?>
		</nav>
