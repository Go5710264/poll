const pollTitle = document.getElementById('poll__title'); // доступ к вопросу
const pollAnswers = document.getElementById('poll__answers'); // обертка для ответов
const pollAnswer = document.createElement('button');
pollAnswer.classList.add('poll__answer');

let xhr = new XMLHttpRequest();
xhr.open('GET', 'https://netology-slow-rest.herokuapp.com/poll.php');
xhr.send();

xhr.onload = function() {
    let result = JSON.parse(xhr.response);
    let index;

    Object.entries(result).forEach(([key, value]) => {
        if (key === 'id') {
            index = value;
        }
        
        Object.entries(value).forEach(([nastedKey, nastedValue]) => {
            console.log(nastedKey, nastedValue);
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
            
            let newXHR = new XMLHttpRequest();
            newXHR.open('POST', 'https://netology-slow-rest.herokuapp.com/poll.php');
            newXHR.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            newXHR.send(`vote=${index}&answer=${responseNumber}`);

            newXHR.onload = function() {
                console.log(JSON.parse(newXHR.response));
            }
        })
    })
   
}


