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

		let _content = document.importNode($make.qs('#question').content, true)

		let qNode = $make.qsf('.question', _content)

		$make.qsf('.question__counter', qNode).textContent = `${this.qNum + 1}/${this.questions.length}`

		$make.qsf('.question__title', qNode).textContent = currQ.question

		currQ.answers.forEach(answer => {
			let listItem = $create.elem('li')
			let answerBtn = $create.elem('button', answer.text, 'button button__answer')

			answerBtn.addEventListener('click', e => {
				qNode.dataset.answered = ''
				listItem.dataset.selected = ''

				if ('right' in answer && answer.right) {
					listItem.dataset.right = ''

					this.increaseScore()
				} else {
					listItem.dataset.wrong = ''
				}

				$make.qsf('.question__explanation', qNode).textContent = ''
				$make.qsf('.question__explanation', qNode).insertAdjacentHTML('afterbegin', answer.explanation)
			})

			listItem.appendChild(answerBtn)

			$make.qsf('.question__answers', qNode).appendChild(listItem)
		})

		$make.qsf('.question__next-btn', qNode).addEventListener('click', e => {
			this.nextQuestion()

			console.log(this.score)
		})

		$make.qs('.screen-test').textContent = ''

		$make.qs('.screen-test').appendChild(qNode)
	}

	nextQuestion() {
		this.qNum++
		this.showQuestion()
	}

	increaseScore() { this.score++ }
}
