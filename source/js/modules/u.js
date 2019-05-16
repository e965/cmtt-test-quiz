'use strict'

// Утилиты

export const U = {
	prepareText(text) {
		let regExps = {
			links: /\[link\|([^\]]+)\|([^\]]+)\]/,
			bold: /\[b\|([^\]]+)\]/,
			quote: /\[q\|([^\]]+)\]/,
		}

		let linksInText = text.match(
			new RegExp(regExps.links, 'g')
		)

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

		let boldInText = text.match(
			new RegExp(regExps.bold, 'g')
		)

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

		let quoteInText = text.match(
			new RegExp(regExps.quote, 'g')
		)

		if (quoteInText) {
			quoteInText.forEach(quote => {
				let _quote = quote.split('|')

				text = text.replace(
					regExps.quote,
					$create.elem(
						'b',
						_quote[1].replace(/]/g, ''),
						'',
						['html']
					)
				)
			})
		}

		return text
	}
}
