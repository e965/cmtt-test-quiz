import { U } from './u.min.js'

export class RenderTest {
	constructor(Q) {
		this.questions = Q

		this.qLength = this.questions.length

		this.qNum = 0
		this.score = 0
	}

	getCurrentQuestion() {
		return this.questions[this.qNum]
	}

	nextQuestion() {
		this.qNum++
		this.showQuestion()
	}

	increaseScore() { this.score++ }

	showQuestion() {
		let currQ = this.getCurrentQuestion()

		let qTemplate = document.importNode($make.qs('#question').content, true)

		let qNode = $make.qsf('.question', qTemplate)

		$make.qsf('.question__counter', qNode).textContent = `${this.qNum + 1}/${this.qLength}`

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

		let nextQbtn = $make.qsf('.question__next-btn', qNode)

		if (this.qNum + 1 !== this.qLength) {
			nextQbtn.addEventListener('click', e => { this.nextQuestion() })
		} else {
			nextQbtn.firstChild.textContent = 'Завершить тест'
			nextQbtn.addEventListener('click', e => { this.final() })
		}


		$make.qs('.screen-test').textContent = ''

		$make.qs('.screen-test').appendChild(qNode)
	}

	final() {
		alert(`Ваш счёт: ${this.score} из ${this.qLength}`)
	}
}
