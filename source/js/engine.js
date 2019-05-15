'use strict'

import { U } from './modules/u.min.js'

import { RenderTest } from './modules/render-test.min.js'

import { QUESTIONS } from './modules/questions.min.js'

let prepareQuestions = Q => {
	let questions = Q

	let e_c_t = 'expl_common_text'

	questions.forEach(question => {
		question.answers.forEach(answer => {
			if (e_c_t in question) {
				answer.explanation += ' ' + question[e_c_t]
			}

			answer.explanation = U.prepareText(answer.explanation)
		})

		if (e_c_t in question) { delete question[e_c_t] }
	})

	return questions
}

let showScreen = screen => {
	let dataItemName = 'current'

	delete $make.qs(`.screen[data-${dataItemName}]`).dataset[dataItemName]

	$make.qs(`.screen-${screen}`).dataset[dataItemName] = ''
}

let updateButtonsActions = () => {
	let buttonsWithActions = $make.qs('button[data-action]', ['a'])

	buttonsWithActions.forEach(button => {
		button.addEventListener('click', e => {
			let _action = e.target.dataset.action

			switch (_action) {
				case 'start-test':
					showScreen('test'); break
				default:
					alert('На кнопку не назначено действие!')
			}
		})
	})
}

document.addEventListener('DOMContentLoaded', () => {
	showScreen('start')
	updateButtonsActions()

	let questions = prepareQuestions(QUESTIONS)

	let test = new RenderTest(questions)

	test.showQuestion()
})
