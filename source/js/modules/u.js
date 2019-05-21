'use strict'

// Утилиты

export const U = {
	showScreen(screen) {
		let dataItemName = 'current'

		delete $make.qs(`.screen[data-${dataItemName}]`).dataset[dataItemName]

		$make.qs(`.screen-${screen}`).dataset[dataItemName] = ''
	},

	prepareText(text) {
		let regExps = {
			links:  new RegExp(/\[link\|(?:[^\]]+)\|([^\]]+)\]/),
			bold:   new RegExp(/\[b\|(?:[^\]]+)\]/),
			quote:  new RegExp(/\[q\|(?:[^\]]+)\]/),
		}

		let regExps_keys = Object.keys(regExps)

		let regExps_g = {}

		regExps_keys.forEach(key => {
			regExps_g[key] = new RegExp(regExps[key], 'g')
		})

		let matches = {}

		regExps_keys.forEach(key => {
			matches[key] = text.match(regExps_g[key])
		})

		if (matches.links) {
			matches.links.forEach(link => {
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

		if (matches.bold) {
			matches.bold.forEach(bold => {
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

		if (matches.quote) {
			matches.quote.forEach(quote => {
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
			[a[i], a[j]] = [a[j], a[i]]
		}

		return a
	},

	clearNode(_node, exceptions = []) {
		if (_node.hasChildNodes()) {
			_node.childNodes.forEach(node_ => {
				exceptions.forEach(exception => {
					if (!node_.classList.contains(exception)) {
						node_.remove()
					}
				})

			})
		}
	},
}
