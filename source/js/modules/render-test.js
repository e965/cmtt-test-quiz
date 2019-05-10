import { U } from './u.min.js'

export class RenderTest {
	constructor(Q) {
		this.questions = Q

		this.qNum = 0
		this.score = 0
	}

	getCurrentQuestion() {
		return this.questions[this.qNum]
	}

	showQuestion() {
		let questionTemplate = $make.qs('#question')

		let currQ = this.getCurrentQuestion()

		let _content = questionTemplate.content

		$make.qsf('.question__title', _content).textContent = currQ.title

		currQ.answers.forEach(answer => {
			let listItem = $create.elem('li')

			$make.qsf('.question__answers', _content).appendChild(listItem)
		})

	}

	nextQuestion() {

	}


}
