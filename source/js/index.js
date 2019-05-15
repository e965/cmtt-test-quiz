'use strict'

let vcSearch = () => {
	let _data = prompt('Что хотите найти?', 'Rambler Group купили издательство «Комитет»')

	if (_data) {
		window.open(`https://vc.ru/search/${encodeURIComponent(_data)}`)
	}
}

let updateButtonsActions = () => {
	let buttonsWithActions = $make.qs('button[data-action]', ['a'])

	buttonsWithActions.forEach(button => {
		button.addEventListener('click', e => {
			let _action = e.target.dataset.action

			switch (_action) {
				case 'vc-search':
					vcSearch(); break
				default:
					alert('На кнопку не назначено действие!')
			}
		})
	})
}

document.addEventListener('DOMContentLoaded', () => {
	updateButtonsActions()
})
