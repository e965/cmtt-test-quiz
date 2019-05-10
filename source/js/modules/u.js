'use strict'

// Утилиты

export const U = {
	prepareText(text) {
		let regExps = {
			links: /\[link\|([^\]]+)\|([^\]]+)\]/,
			bold: /\[b\|([^\]]+)\]/
		}

		let linksInText = text.match(
			new RegExp(regExps.links, 'g')
		)

		let boldInText = text.match(
			new RegExp(regExps.bold, 'g')
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

		return text
	}
}
