import { U } from './u.min.js'

export class RenderTest {
	constructor(Q, R) {
		this.questions = Q
		this.results = R

		this.qLength = this.questions.length

		this.qNum = 0
		this.score = 0

		this.refresh()
	}

	getCurrentQuestion() {
		return this.questions[this.qNum]
	}

	nextQuestion() {
		this.qNum++
		this.showQuestion()
	}

	increaseScore() { this.score++ }

	showTest() {
		U.showScreen('test')
	}

	refresh() {
		this.qNum = 0
		this.score = 0

		// U.shuffleArray(this.questions)

		this.questions.forEach(question => {
			U.shuffleArray(question.answers)
		})
	}

	showQuestion() {
		let currQ = this.getCurrentQuestion()

		let qTemplate = document.importNode($make.qs('#question').content, true)

		let qNode = $make.qsf('.question', qTemplate)

		$make.qsf('.question__counter', qNode).textContent = `${this.qNum + 1}/${this.qLength}`

		// debuh
		$make.qsf('.question__counter', qNode).addEventListener('click', e => {
			this.score = Math.floor(Math.random() * (this.qLength + 1))
			this.final()
		})

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
		let scoreKey = -1

		Object.keys(this.results).forEach(key => {
			// плюсуем "ключ" до тех пор, пока не попадём на нужный результат
			if (this.score >= Number(key)) { scoreKey++ }
		})

		let ourResult = Object.entries(this.results)[scoreKey]

		let finalScreenBackground = $create.elem('div', '', 'background')

		finalScreenBackground.dataset.scoreKey = ourResult[0]

		let finalScreenTemplate = document.importNode($make.qs('#final').content, true)

		let finalScreenNode = $make.qsf('.final', finalScreenTemplate)

		$make.qsf('.final__score', finalScreenNode).textContent = `${this.score} из ${this.qLength} правильных ответов`

		$make.qsf('.final__text', finalScreenNode).textContent = ourResult[1].text

		$make.qsf('.final__refresh-btn', finalScreenNode)
			.addEventListener('click', e => {
				this.refresh()
				this.showQuestion()
				this.showTest()
			})

		$make.qs('.screen-final').textContent = ''

		$make.qs('.screen-final').appendChild(finalScreenBackground)

		$make.qs('.screen-final').appendChild(finalScreenNode)

		U.showScreen('final')

		setTimeout(likely.initiate, 0)
	}
}
