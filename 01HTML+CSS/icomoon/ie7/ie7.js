/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-location': '&#xe947;',
		'icon-location2': '&#xe948;',
		'icon-arrow-up-left2': '&#xea39;',
		'icon-arrow-up2': '&#xea3a;',
		'icon-arrow-up-right2': '&#xea3b;',
		'icon-arrow-right2': '&#xea3c;',
		'icon-arrow-down-right2': '&#xea3d;',
		'icon-arrow-down2': '&#xea3e;',
		'icon-arrow-down-left2': '&#xea3f;',
		'icon-arrow-left2': '&#xea40;',
		'icon-circle-up': '&#xea41;',
		'icon-circle-right': '&#xea42;',
		'icon-circle-down': '&#xea43;',
		'icon-circle-left': '&#xea44;',
		'icon-ctrl': '&#xea50;',
		'icon-search': '&#xe986;',
		'icon-cart': '&#xe93a;',
		'icon-home': '&#xe900;',
		'icon-droplet': '&#xe90b;',
		'icon-image': '&#xe90d;',
		'icon-camera': '&#xe90f;',
		'icon-headphones': '&#xe910;',
		'icon-music': '&#xe911;',
		'icon-play': '&#xe912;',
		'icon-film': '&#xe913;',
		'icon-video-camera': '&#xe914;',
		'icon-books': '&#xe920;',
		'icon-file-empty': '&#xe924;',
		'icon-files-empty': '&#xe925;',
		'icon-folder': '&#xe92f;',
		'icon-phone': '&#xe942;',
		'icon-phone-hang-up': '&#xe943;',
		'icon-bookmark': '&#xe9d2;',
		'icon-heart': '&#xe9da;',
		'icon-heart-broken': '&#xe9db;',
		'icon-man': '&#xe9dc;',
		'icon-woman': '&#xe9dd;',
		'icon-man-woman': '&#xe9de;',
		'icon-tongue': '&#xe9e3;',
		'icon-sad': '&#xe9e5;',
		'icon-wink': '&#xe9e7;',
		'icon-cross': '&#xea0f;',
		'icon-checkmark': '&#xea10;',
		'icon-play2': '&#xea15;',
		'icon-pause': '&#xea16;',
		'icon-stop': '&#xea17;',
		'icon-volume-high': '&#xea26;',
		'icon-loop2': '&#xea2e;',
		'icon-twitter': '&#xea96;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
