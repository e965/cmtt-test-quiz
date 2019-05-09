'use strict'

// Утилиты
// Часть кода взята из https://github.com/tehcojam/kamina-js/blob/master/dist/kamina.js

export const U = {
	qs: (qS, options = []) => {
		return options.includes('a')
			? document.querySelectorAll(qS)
			: document.querySelector(qS)
	},

	qsf: (qS, from, options = []) => {
		if (!from.nodeName) {
			from = document.querySelector(from)
		}

		return options.includes('a')
			? from.querySelectorAll(qS)
			: from.querySelector(qS)
	},

	createElem: (what = '', content = '', classes = '', options = []) => {
		let elem = document.createElement(what)

		if (classes != '') {
			elem.setAttribute('class', classes)
		}

		if (content != '') {
			elem.innerHTML = options.includes('s')
				? $make.safe(content)
				: content
		}

		return options.includes('html')
			? elem.outerHTML
			: elem
	},

	createLink: (url = 'javascript:void(0)', content = '', classes = '', options = []) => {
		let link = document.createElement('a')

		link.setAttribute('href', url)

		if (url.startsWith('http')) {
			link.setAttribute('target', '_blank')
		}

		if (options.includes('e')) {
			link.setAttribute('rel', 'nofollow noopener')
		}

		if (classes != '') {
			link.setAttribute('class', classes)
		}

		if (content != '') {
			link.innerHTML = options.includes('s')
				? $make.safe(content)
				: content
		}

		return options.includes('html')
			? link.outerHTML
			: link
	},

	linkifyText(text) {
		let linksRegExp = /\[link\|([^\]]+)\|([^\]]+)\]/

		let linksInText = text.match(
			new RegExp(linksRegExp, 'g')
		)

		if (linksInText) {
			linksInText.forEach(link => {
				let _link = link.split('|')

				text = text.replace(
					linksRegExp,
					this.createLink(
						_link[1],
						_link[2].replace(/]/g, ''),
						'',
						['e', 'html']
					)
				)
			})
		}

		return text
	}
}
