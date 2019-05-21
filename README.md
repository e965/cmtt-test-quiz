## Тестовое задание для [вакансии](https://vc.ru/team/65766) frontend-разработчика спецпроектов в [«Комитете»](https://cmtt.ru)

### Как запустить?

* `git clone https://github.com/tehcojam/cmtt-test && cd cmtt-test`
* `npm install`
* `gulp` — если хотите просто собрать проект (соберётся в директорию `dist/`)
* `gulp dev` — если хотите покодить (или посмотреть в браузере)

### Примечания:

* Блоку теста можно задать фиксированную ширину, задав GET-параметр `?quiz-width` с нужной шириной в пикселях (без `px`!). Например: `index.html/?quiz-width=640`
* Можно пропустить весь тест и перейти сразу к финальному экрану, дважды кликнув на номер вопроса сверху от вопроса. При этом выставится рандомное количество баллов
* Добавлена не предусмотренная заданием кнопка шаринга в Telegram. Digital Resistance, еее!
* На последний вопрос теста (про Тинькова) указаны правильными все ответы (потому что фактически так и есть). В задании был правильным только первый ответ

### Важный момент

Здесь используются наработки проектов [NYAN.STREAM](https://github.com/nyanstream) и [Cojam](https://github.com/cojamru).  

Также используются [kamina.js](https://github.com/tehcojam/kamina-js), [Likely](https://github.com/valerypatorius/Likely) и [CSS Element Queries](https://github.com/marcj/css-element-queries).  

Исходный код распространяется под [лицензией MIT](LICENSE). Изображения в `dist_static/assets/img/` принадлежат сторонним лицам.
