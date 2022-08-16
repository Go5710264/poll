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
            console.log(JSON.parse(xhr.response));
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

// const xhr = new XMLHttpRequest();
// xhr.open('GET', 'https://netology-slow-rest.herokuapp.com/poll.php');
// xhr.send();


// xhr.onload = function() {
//     let result = JSON.parse(xhr.response);
//     let index;

//     Object.entries(result).forEach(([key, value]) => {
//         if (key === 'id') {
//             index = value;
//         }
        
//         Object.entries(value).forEach(([nastedKey, nastedValue]) => {
//             console.log(nastedKey, nastedValue);
//             if (nastedKey === 'title') {
//                 pollTitle.textContent = nastedValue;
//             } else {
//                 nastedValue.forEach((answer) => {
//                     let pollAnswerClone = pollAnswer.cloneNode(false);
//                     pollAnswerClone.textContent = answer;
//                     pollAnswers.appendChild(pollAnswerClone);
//                 })
//             }
//         })
//     })

//     document.querySelectorAll('.poll__answer').forEach((answer, responseNumber) => {
//         answer.addEventListener('click', () => {
//             alert('Спасибо, ваш голос засчитан!');
            
//             xhr.open('POST', 'https://netology-slow-rest.herokuapp.com/poll.php');
//             xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
//             xhr.send(`vote=${index}&answer=${responseNumber}`);

//             xhr.onload = function() {
//                 console.log(JSON.parse(xhr.response));
//             }
//         })
//     })
   
// }


