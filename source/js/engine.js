'use strict'

import { U } from './modules/u.min.js'

import { QuizRenderer } from './modules/quiz-renderer.min.js'

import { QUIZ_DATA } from './modules/quiz-data.min.js'

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
				case 'start-quiz':
					U.showScreen('quiz'); break
				default:
					alert('На кнопку не назначено действие!')
			}
		})
	})
}

document.addEventListener('DOMContentLoaded', () => {
	U.showScreen('loading')

	updateButtonsActions()

	let questions = prepareQuestions(QUIZ_DATA.questions)

	let test = new QuizRenderer(questions, QUIZ_DATA.results)

	test.showQuestion()

	void(() => {
		let quizWidth = $check.get('quiz-width')

		if (
			quizWidth &&
			Number.isInteger(Number(quizWidth)) &&
			Number(quizWidth) > 1
		) {
			document.documentElement.style.setProperty('--quiz-width', `${quizWidth}px`)
		}
	})()
})

window.addEventListener('load', () => {
	ElementQueries.init()

	U.showScreen('start')
})
