'use strict'

import { U } from './modules/u.min.js'

import { RenderTest } from './modules/render-test.min.js'

import { QUESTIONS } from './modules/questions.min.js'

let prepareQuestions = Q => {
	let questions = Q

	let a_e_t = 'answers_explanation_text'

	questions.forEach(question => {
		question.answers.forEach(answer => {
			if (a_e_t in question) {
				answer.explanation += ' ' + question[a_e_t]
			}

			answer.explanation = U.linkifyText(answer.explanation)
		})

		if (a_e_t in question) {
			delete question.answers_explanation_text
		}
	})

	return questions
}

let showScreen = screen => {
	let dataItemName = 'current'

	delete U.qs(`.screen[data-${dataItemName}]`).dataset[dataItemName]

	U.qs(`.screen-${screen}`).dataset[dataItemName] = ''
}

let updateButtonsActions = () => {
	let buttonsWithActions = U.qs('button[data-action', ['a'])

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
