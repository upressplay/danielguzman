<?php


function site_scripts()  { 

  
}
add_filter( 'wp_audio_shortcode', 'audio_short_fix', 10, 5 );
function audio_short_fix( $html, $atts, $audio, $post_id, $library )
{
	$html = str_replace ( 'visibility: hidden;' ,'' , $html );
	return $html;
}


add_action( 'wp_enqueue_scripts', 'site_scripts' ); // Register this fxn and allow Wordpress to call it automatcally in the header

if ( function_exists( 'add_image_size' ) ) add_theme_support( 'post-thumbnails' );

	if ( function_exists( 'add_image_size' ) ) {
	add_image_size( 'header-display', 1600, 700, true );
	add_image_size( 'gallery-thumb', 300, 300, true );
	add_image_size( 'gallery-display', 1600, 900, true );
	add_image_size( 'video-thumb', 300, 170, true );
	add_image_size( 'video-display', 1600, 900, true );
	add_image_size( 'news-thumb', 300, 129, true );
	add_image_size( 'news-display', 1600, 686, true );
	add_image_size( 'headshots-thumb', 200, 299, true );
	add_image_size( 'headshots-display', 1286, 1920, true );
	add_image_size( 'share', 1200, 630, true );
}

add_action( 'init', 'create_site_post_types' );

function create_site_post_types() {

	register_post_type( 'header',
		array(
			'labels' => array(
				'name' => 'Header',
				'singular_name' => 'Header',
				'add_new' => 'Add Header',
			),
			'public' => true,
			'show_ui' => true,
			'show_in_nav_menus' => false,
			'query_var' => true,
			'has_archive' => false,
			'supports' => array('title'),
			'show_in_nav_menus' => true,
			'can_export' => true,
			'hierarchical' => false,
			'exclude_from_search' => true,
			'rewrite' => array('slug' => 'header','with_front' => false),
		)
	);

	register_post_type( 'about',
		array(
			'labels' => array(
				'name' => 'About',
				'singular_name' => 'About',
				'add_new' => 'Add About',
			),
			'public' => true,
			'show_ui' => true,
			'show_in_nav_menus' => false,
			'query_var' => true,
			'has_archive' => false,
			'supports' => array('title'),
			'show_in_nav_menus' => true,
			'can_export' => true,
			'hierarchical' => false,
			'exclude_from_search' => true,
			'rewrite' => array('slug' => 'about','with_front' => false),
		)
	);

	register_post_type( 'news',
		array(
			'labels' => array(
				'name' => 'News',
				'singular_name' => 'News',
				'add_new' => 'Add News',
			),
			'public' => true,
			'show_ui' => true,
			'show_in_nav_menus' => false,
			'query_var' => true,
			'has_archive' => false,
			'supports' => array('title'),
			'show_in_nav_menus' => true,
			'can_export' => true,
			'hierarchical' => false,
			'exclude_from_search' => true,
			'rewrite' => array('slug' => 'news','with_front' => false),
		)
	);

	register_post_type( 'headshots',
		array(
			'labels' => array(
				'name' => 'Headshots',
				'singular_name' => 'Headshots',
				'add_new' => 'Add Headshots',
			),
			'public' => true,
			'show_ui' => true,
			'show_in_nav_menus' => false,
			'query_var' => true,
			'has_archive' => false,
			'supports' => array('title'),
			'show_in_nav_menus' => true,
			'can_export' => true,
			'hierarchical' => false,
			'exclude_from_search' => true,
			'rewrite' => array('slug' => 'headshots','with_front' => false),
		)
	);

	register_post_type( 'gallery',
		array(
			'labels' => array(
				'name' => 'Gallery',
				'singular_name' => 'Gallery Image',
				'add_new' => 'Add Gallery Image',
			),
			'public' => true,
			'show_ui' => true,
			'show_in_nav_menus' => false,
			'query_var' => true,
			'has_archive' => false,
			'supports' => array('title'),
			'show_in_nav_menus' => true,
			'can_export' => true,
			'hierarchical' => false,
			'exclude_from_search' => true,
			'rewrite' => array('slug' => 'gallery','with_front' => false),
		)
	);

	register_post_type( 'videos',
		array(
			'labels' => array(
				'name' => 'Videos',
				'singular_name' => 'Video',
				'add_new' => 'Add Video',
			),
			'public' => true,
			'show_ui' => true,
			'show_in_nav_menus' => false,
			'query_var' => true,
			'has_archive' => false,
			'supports' => array('title'),
			'show_in_nav_menus' => true,
			'can_export' => true,
			'hierarchical' => false,
			'exclude_from_search' => true,
			'rewrite' => array('slug' => 'videos','with_front' => false),
		)
	);

	register_post_type( 'resume',
		array(
			'labels' => array(
				'name' => 'Resume',
				'singular_name' => 'Resume',
				'add_new' => 'Add Resume',
			),
			'public' => true,
			'show_ui' => true,
			'show_in_nav_menus' => false,
			'query_var' => true,
			'has_archive' => false,
			'supports' => array('title'),
			'show_in_nav_menus' => true,
			'can_export' => true,
			'hierarchical' => false,
			'exclude_from_search' => true,
			'rewrite' => array('slug' => 'resume','with_front' => false),
		)
	);

	register_post_type( 'contact',
		array(
			'labels' => array(
				'name' => 'Contact',
				'singular_name' => 'Contact',
				'add_new' => 'Add Contact',
			),
			'public' => true,
			'show_ui' => true,
			'show_in_nav_menus' => false,
			'query_var' => true,
			'has_archive' => false,
			'supports' => array('title'),
			'show_in_nav_menus' => true,
			'can_export' => true,
			'hierarchical' => false,
			'exclude_from_search' => true,
			'rewrite' => array('slug' => 'contact','with_front' => false),
		)
	);


}

function add_custom_controller($controllers) {
    $controllers[] = 'sitedata';
    return $controllers;
}
add_filter('json_api_controllers', 'add_custom_controller');


function set_custom_controller_path() {
  return get_template_directory()."/lib/custom-apis/site_data.php";
}

add_filter('json_api_sitedata_controller_path', 'set_custom_controller_path');



if( function_exists('acf_add_options_page') ) {
	
	acf_add_options_page(array(
		'page_title' 	=> 'Page Settings',
		'menu_title'	=> 'Page Settings',
		'menu_slug' 	=> 'theme-general-settings',
		'capability'	=> 'edit_posts',
		'redirect'		=> false
	));
	
	acf_add_options_sub_page(array(
		'page_title' 	=> 'Theme Header Settings',
		'menu_title'	=> 'Header',
		'parent_slug'	=> 'theme-general-settings',
	));
	
	acf_add_options_sub_page(array(
		'page_title' 	=> 'Theme Footer Settings',
		'menu_title'	=> 'Footer',
		'parent_slug'	=> 'theme-general-settings',
	));
	
}
