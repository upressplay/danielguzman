<?php
class json_api_sitedata_controller {
/**put your functions here to return data e.g.  Do the WP queries and then return on the info you want in a loop*/


	public function header () {

		query_posts( array ( 'post_type' => 'header' ) );

		$data = array();

		while ( have_posts() ) : the_post();

			$post = get_post(get_the_ID());

			$entry = array(
				'id' => $post->post_name,
				'title' => get_the_title(),
				'img' => get_field('header_img'),
				'loaded' => false
				);
			$data[] = $entry;
		endwhile;

		return array(
			'status' => 'ok',
			'data' => $data
		);
	}

	public function about () {

		query_posts( array ( 'post_type' => 'about' ) );

		$data = array();

		while ( have_posts() ) : the_post();

			$post = get_post(get_the_ID());

			$entry = array(
				'id' => $post->post_name,
				'title' => get_the_title(),
				'desc' => get_field('about_desc'),
				'img' => get_field('about_img'),
				);
			$data[] = $entry;
		endwhile;

		return array(
			'status' => 'ok',
			'data' => $data
		);
	}


	public function videos () {

		query_posts( array ( 'post_type' => 'videos' ) );

		$data = array();

		while ( have_posts() ) : the_post();

			$post = get_post(get_the_ID());

			$entry = array(
				'id' => $post->post_name,
				'title' => get_the_title(),
				'img' => get_field('video_img'),
				'desc' => get_field('video_desc'),
				'type' => get_field('video_type'),
				'video_id' => get_field('video_id'),
				'sort' => get_field('video_sort_type'),
				);
			$data[] = $entry;
		endwhile;

		return array(
			'status' => 'ok',
			'data' => $data
		);


	}


	public function news () {

		query_posts( array ( 'post_type' => 'news' ) );

		$data = array();

		while ( have_posts() ) : the_post();

			$post = get_post(get_the_ID());

			$entry = array(
				'id' => $post->post_name,
				'title' => get_the_title(),
				'img' => get_field('news_img'),
				'desc' => get_field('news_desc'),
				'short_desc' => get_field('news_short_desc'),
				'ext_link' => get_field('news_ext_link'),
				'videos' => get_field('news_videos'),
				);
			$data[] = $entry;
		endwhile;

		return array(
			'status' => 'ok',
			'data' => $data
		);


	}

	

	public function gallery () {

		query_posts( array ( 'post_type' => 'gallery' , 'post_count' => 100) );

		$data = array();

		while ( have_posts() ) : the_post();

			$post = get_post(get_the_ID());

			$entry = array(
				'id' => $post->post_name,
				'title' => get_the_title(),
				'desc' => get_field('gallery_desc'),
				'img' => get_field('gallery_img'),
				);
			$data[] = $entry;
		endwhile;

		return array(
			'status' => 'ok',
			'data' => $data
		);

	}

	public function headshots () {

		query_posts( array ( 'post_type' => 'headshots' ) );

		$data = array();

		while ( have_posts() ) : the_post();

			$post = get_post(get_the_ID());

			$entry = array(
				'id' => $post->post_name,
				'title' => get_the_title(),
				'desc' => get_field('headshots_desc'),
				'img' => get_field('headshots_img'),
				'loaded' => false,
				);
			$data[] = $entry;
		endwhile;

		return array(
			'status' => 'ok',
			'data' => $data
		);

	}

	public function resume () {

		query_posts( array ( 'post_type' => 'resume' ) );

		$data = array();

		while ( have_posts() ) : the_post();

			$post = get_post(get_the_ID());

			$entry = array(
				'id' => $post->post_name,
				'title' => get_the_title(),
				'groups' => get_field('resume_group'),
				);
			$data[] = $entry;
		endwhile;

		return array(
			'status' => 'ok',
			'data' => $data
		);

	}

	public function contact () {

		query_posts( array ( 'post_type' => 'contact' ) );

		$data = array();

		while ( have_posts() ) : the_post();

			$post = get_post(get_the_ID());

			$entry = array(
				'id' => $post->post_name,
				'title' => get_the_title(),
				'address' => get_field('contact_address'),
				'phone' => get_field('contact_phone'),
				'map' => get_field('contact_map'),
				'contacts' => get_field('contacts'),
				);
			$data[] = $entry;
		endwhile;

		return array(
			'status' => 'ok',
			'data' => $data
		);
	}


}

?>