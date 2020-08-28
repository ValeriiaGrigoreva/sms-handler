//получаем доступ к необходимым элементам
const input = document.getElementById("input"),
      symbolCounter = document.getElementById("symbolCounter"),
      messagesCounter = document.getElementById("messagesCounter"),
      transButton = document.getElementById("transButton"),
      inputNumberOfMessages = document.getElementById("numberOfMessages"),
      sendButton = document.getElementById("sendButton");

/*при изменении инпута получаем текст, считаем кол-во символов, считаем 
кол-во сообщений с помощтю функции и добавляем эту информацию в HTML, также добавляем информацию 
о количестве сообщений в скрытый инпут для дальнейшей отправки в БД */    
input.addEventListener("input", () => {
    const inputText = input.value;
    const inputLength = inputText.length;
    const numberOfMessages = getNumberOfMessages(inputText, inputLength);

    symbolCounter.innerHTML = `Введено символов: ${inputLength}`;
    messagesCounter.innerHTML = `Количество SMS-сообщений, необходимых для отправки текста: ${numberOfMessages}`;
    inputNumberOfMessages.value = numberOfMessages;
});

//функция для расчета количества необходимых сообщений
getNumberOfMessages = (message, messageLength) => {
    let numberOfMessages = 0;
    if(isCyrillic(message)) {
        if(messageLength > 0 && messageLength <= 70) {
            numberOfMessages = 1;
        } else {
            numberOfMessages = Math.ceil(messageLength / 67);
        }
    } else {
        if (messageLength > 0 && messageLength <= 160) {
            numberOfMessages = 1;
        } else {
            numberOfMessages = Math.ceil(messageLength / 153);
        }
    }
    return numberOfMessages;
}

//строки с соответствием кириллических и латинских символов
const cyrillicSymbols = "а б в г д е ё ж з и й к л м н о п р с т у ф х ц ч ш щ ъ ы ь э ю я А Б В Г Д Е Ё Ж З И Й К Л М Н О П Р С Т У Ф Х Ц Ч Ш Щ Ъ Ы Ь Э Ю Я « » – — № `".split(" ");
const latinSymbols = "a b v g d e yo zh z i y k l m n o p r s t u f h ts ch sh sch ' i ' e u ya A B V G D E YO ZH Z I Y K L M N O P R S T U F H TS CH SH SCH ' I ' E U YA \" \" - - # '".split(" ");

/*при клике на кнопку транслитерации, если текст с кириллическими символами, получаем текст из инпута, 
делаем транслитерацию с помощью функции, заменяем текст в инпуте. если текст только из латинских символов 
и соответствует транслитерированному начальному тексту, то возвращаем в инпут текст на кириллице, в
противном случае ничего не меняется*/
let inputText;
let transliteratedInput;
transButton.addEventListener("click", (e) => {
    if(isCyrillic(input.value)) {
        inputText = input.value;
        transliteratedInput = getTransliteratedText(inputText);
        input.value = transliteratedInput;
    } else {
        if (input.value == transliteratedInput) {
            input.value = inputText;
        } 
    }

    e.preventDefault();
});

//функция для транслитерации
getTransliteratedText = (text) => {
    let result = "";
    let symbolIndex;
    for (let i = 0; i < text.length; i++) {
        symbolIndex = cyrillicSymbols.indexOf(text[i]);
        if (symbolIndex == -1) {
             result += text[i]
        } else {
            result += latinSymbols[symbolIndex];
        }
    }   
    return result;
}

//функция для проверки наличия кириллических символов в тексте
isCyrillic = (text) => /[а-яё»«№–`—]/i.test(text);




