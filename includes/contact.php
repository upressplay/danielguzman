<div id="contact">
	<div id="contact_title" class="section_title blue_title">
		- Contact -
	</div><!-- about_title -->
	<div id="contact_info">
		<?php 
		
		$count = 0;
		foreach ( $contact_data as $c ) {
			if($count<1) {
				
				foreach ( $c['contacts'] as $cs ) {
					echo '<div class="contact">';
					echo '<p><span class="contact_title">' . $cs['contacts_name'] . '</span></p>' ;
					echo '<p>' . $cs['contacts_title'] . '</p>';

					echo '<p>Phone: ' . $cs['contacts_phone'] . '</p>';
					echo '<p> <a href="mailto:'. $cs['contacts_email'] . '" target="_top"> Email</a></p>' ;
					echo '</div>';

				}


			}
			
			$count++;
		}
		?>
	</div><!-- about_title -->
</div><!-- about -->




