var input_url = window.prompt("Enter your URL: ");

function str2hex(str) {
  var arr = [];
  for (var i = 0, l = str.length; i < l; i ++) {
    var hex = Number(str.charCodeAt(i)).toString(16);
    arr.push(hex);
  }
  return arr.join('');
}

function hex2a(str) {
	let arr_hex = str.split('');
	let reformattedArray = arr_hex.map(char => {
		const replacements = {
			'0': 'a',
			'1': 'à',
			'2': 'á',
			'3': 'â',
			'4': 'ã',
			'5': 'ä',
			'6': 'å',
			'7': 'æ',
			'8': 'A',
			'9': 'À',
			'a': 'Á',
			'b': 'Â',
			'c': 'Ã',
			'd': 'Ä',
			'e': 'Å',
			'f': 'Æ'
		};
		return replacements[char];
	})

	return reformattedArray.join('');
}

try {
	new URL(input_url);
} catch (e) {
	console.error('URL is not valid', e);
}

let new_url = hex2a(str2hex(input_url))

while (new_url.length < 200) {
	new_url = "áaaÂ" + new_url;
}

new_url = "https://aaa.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.com/a?" + new_url;

window.prompt("Please copy the resulting URL: ", new_url);
