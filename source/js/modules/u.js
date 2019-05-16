'use strict'

// Утилиты

export const U = {
	prepareText(text) {
		let regExps = {
			links: new RegExp(/\[link\|(?:[^\]]+)\|([^\]]+)\]/, 'g'),
			bold: new RegExp(/\[b\|(?:[^\]]+)\]/, 'g'),
			quote: new RegExp(/\[q\|(?:[^\]]+)\]/, 'g'),
		}

		let linksInText = text.match(regExps.links)

		if (linksInText) {
			linksInText.forEach(link => {
				let _link = link.split('|')

				text = text.replace(
					regExps.links,
					$create.link(
						_link[1],
						_link[2].replace(/]/g, ''),
						'',
						['e', 'html']
					)
				)
			})
		}

		let boldInText = text.match(regExps.bold)

		if (boldInText) {
			boldInText.forEach(bold => {
				let _bold = bold.split('|')

				text = text.replace(
					regExps.bold,
					$create.elem(
						'b',
						_bold[1].replace(/]/g, ''),
						'',
						['html']
					)
				)
			})
		}

		let quoteInText = text.match(regExps.quote)

		if (quoteInText) {
			quoteInText.forEach(quote => {
				let _quote = quote.split('|')

				text = text.replace(
					regExps.quote,
					$create.elem(
						'q',
						_quote[1].replace(/]/g, ''),
						'',
						['html']
					)
				)
			})
		}

		return text
	},

	shuffleArray(a) {
		// взято отсюда: https://stackoverflow.com/a/6274381

		for (let i = a.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));

			[a[i], a[j]] = [a[j], a[i]];
		}

		return a;
	}
}
