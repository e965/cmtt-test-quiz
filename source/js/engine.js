'use strict'

import { U } from './modules/u.min.js'

import { RenderTest } from './modules/render-test.min.js'

import { QUESTIONS } from './modules/questions.min.js'

import { RESULTS } from './modules/results.min.js'

let prepareQuestions = Q => {
	let questions = Q

	let e_c_t = 'expl_common_text'

	questions.forEach(question => {
		question.answers.forEach(answer => {
			if (e_c_t in question && !('special_expl' in answer)) {
				answer.explanation += ' ' + question[e_c_t]
			}

			answer.text = U.prepareText(answer.text)

			answer.explanation = U.prepareText(answer.explanation)
		})

		if (e_c_t in question) { delete question[e_c_t] }
	})

	return questions
}

let updateButtonsActions = () => {
	let buttonsWithActions = $make.qs('button[data-action]', ['a'])

	buttonsWithActions.forEach(button => {
		button.addEventListener('click', e => {
			let _action = e.target.dataset.action

			switch (_action) {
				case 'start-test':
					U.showScreen('test'); break
				default:
					alert('На кнопку не назначено действие!')
			}
		})
	})
}

document.addEventListener('DOMContentLoaded', () => {
	U.showScreen('start')
	updateButtonsActions()

	let questions = prepareQuestions(QUESTIONS)

	let test = new RenderTest(questions, RESULTS)

	test.showQuestion()
})
