
<div id="headshots">
<div id="headshots_title" class="section_title white_title">
	- Headshots -	
</div><!-- headshots_title -->
	<?php 
		
		$count = 0;
		foreach ( $headshots_data as $h ) {

			echo '<a href="/headshots/'. $h['id'] . '" entry_id="'. $h['id'] . '">';
			echo '<div id="'. $h['id'] .'" class="headshots_thumb" type="'.$h['video_types'].'">';
			echo '</div>';
			echo '</a>';
			
			$count++;
		}
		?>
		<div id="load_more_headshots">
			<div id="load_more_headshots_btn">
				- Load More - 
			</div><!-- load_more_videos -->
		</div><!-- load_more -->
</div><!-- headshots -->




