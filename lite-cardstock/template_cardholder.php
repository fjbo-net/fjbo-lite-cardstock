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

	lite Cardstock: template_cardholder.php

	Wordpress Page Template for displaying the Page's Children as an interactive slider.
*/
	get_header();
			?>
			<section id="entry-container">

			<?php
	if(have_posts()) {
		while(have_posts()) {
			the_post();

			//Get Page Info
			$page_id = get_the_ID();

			?>
				<article class="entry page">
					<div class="container">
						<h2 class="title"><?php the_title(); ?></h2>
						<?php
						the_content();
						?>
					</div>
				</article>
				<?php
		}
	} else {
		?>
		<article class="entry page page-message">
			<div class="container">
				<h2 class="title">Uh oh!</h2>
				<p>This page does not have any content available right now.</p>
			</div>
		</article>
		<?php
	}

	$pages_query_ars = array(
		'post_type' => 'page',
		'post_parent' => $page_id,
		'order' => 'ASC',
		'orderby' => 'date'
	);

	$page_children = new WP_Query($pages_query_ars);

	if($page_children->have_posts()) {
		while($page_children->have_posts()) {
			$page_children->the_post();
			?>
				<article class="entry page page-children">
					<div class="container">
					<h2 class="title"><?php the_title(); ?></h2>
					<?php
					the_content();
					?>
					</div>
				</article>
			<?php
		}
	}
	?>
			</section>

	<?php

	get_footer();
?>
