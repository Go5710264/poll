const pollTitle = document.getElementById('poll__title'); // доступ к вопросу
const pollAnswers = document.getElementById('poll__answers'); // обертка для ответов
const pollAnswer = document.createElement('button');
pollAnswer.classList.add('poll__answer');
let result;
let index;
let respNumber;
const xhr = new XMLHttpRequest();

function serverRequest(arg) {
    if (arg === 'get') {
        xhr.open('GET', 'https://netology-slow-rest.herokuapp.com/poll.php');
        xhr.send();
        xhr.addEventListener('load', questionLoading);
    } else if (arg === respNumber) {
        xhr.open('POST', 'https://netology-slow-rest.herokuapp.com/poll.php');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(`vote=${index}&answer=${respNumber}`);
        xhr.removeEventListener('load', questionLoading); // удаление отслеживания загрузки файлов с сервера

        xhr.onload = function() {
            let statistics = JSON.parse(xhr.response);
            console.log(statistics)
            let numberVoters = 0; // общее количество проголосовавших

            statistics.stat.forEach((element) => {
                numberVoters = numberVoters + element.votes;
            })

            statistics.stat.forEach((element) => { // статистика каждого ответа
                let answerName = document.createElement('div'); // элемент названия ответа
                answerName.textContent = `${element.answer}: `; // добавление имени в элемент
                let percent = document.createElement('b'); // элемент процента
                percent.textContent = `${(element.votes * 100 / numberVoters).toFixed(2)}%`; // добавление имени в элемент
                answerName.appendChild(percent);
                pollAnswers.appendChild(answerName); // добавление элемента в ответы
            })

            Array.from(document.getElementsByTagName('button')).forEach((element) => element.remove()); // удаление кнопок
        }
    }
}

function questionLoading() {
    let result = JSON.parse(xhr.response);

    Object.entries(result).forEach(([key, value]) => {
        if (key === 'id') {
            index = value;
        }
        
        Object.entries(value).forEach(([nastedKey, nastedValue]) => {
            if (nastedKey === 'title') {
                pollTitle.textContent = nastedValue;
            } else {
                nastedValue.forEach((answer) => {
                    let pollAnswerClone = pollAnswer.cloneNode(false);
                    pollAnswerClone.textContent = answer;
                    pollAnswers.appendChild(pollAnswerClone);
                })
            }
        })
    })

    document.querySelectorAll('.poll__answer').forEach((answer, responseNumber) => {
        answer.addEventListener('click', () => {
            alert('Спасибо, ваш голос засчитан!');
            respNumber = responseNumber;
            serverRequest(respNumber);
        })
    })
}

serverRequest('get');


