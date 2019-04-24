<?php 
	class youtube {
		public static function getIdFromURL($url)
		{
			if($url) { 
				$url_string = parse_url($url, PHP_URL_QUERY);
				parse_str($url_string, $args);
				return isset($args['v']) ? $args['v'] : false;
			}
			return false;
		}
	}
?>