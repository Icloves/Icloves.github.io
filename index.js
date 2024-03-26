const btnAdd = document.querySelector('#btn-add');
const textInput = document.querySelector('input');
const divColText = document.querySelector('.col-text');
const divColTranslation = document.querySelector('.col-translation');
let textUser;

function translit(myInnerText) {
  let endWord = '';
  const objConverter = {
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'g',
    д: 'd',
    е: 'e',
    ё: 'e',
    ж: 'zh',
    з: 'z',
    и: 'i',
    й: 'y',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    х: 'h',
    ц: 'c',
    ч: 'ch',
    ш: 'sh',
    щ: 'sch',
    ь: '',
    ы: 'y',
    ъ: '',
    э: 'e',
    ю: 'yu',
    я: 'ya',

    А: 'A',
    Б: 'B',
    В: 'V',
    Г: 'G',
    Д: 'D',
    Е: 'E',
    Ё: 'E',
    Ж: 'Zh',
    З: 'Z',
    И: 'I',
    Й: 'Y',
    К: 'K',
    Л: 'L',
    М: 'M',
    Н: 'N',
    О: 'O',
    П: 'P',
    Р: 'R',
    С: 'S',
    Т: 'T',
    У: 'U',
    Ф: 'F',
    Х: 'H',
    Ц: 'C',
    Ч: 'Ch',
    Ш: 'Sh',
    Щ: 'Sch',
    Ь: '',
    Ы: 'Y',
    Ъ: '',
    Э: 'E',
    Ю: 'Yu',
    Я: 'Ya',
  };

  for (let i = 0; i < myInnerText.length; i += 1) {
    if (objConverter[myInnerText[i]] === undefined) {
      endWord += myInnerText[i];
    } else {
      endWord += objConverter[myInnerText[i]];
    }
  }
  return endWord;
}

function wordTrim(word) {
  return word.length > 7 ? `${word.slice(0, 7)}...` : word;
}

function addTitle(word, divElement) {
  if (word.length > 7) {
    const divTitle = document.createElement('div');
    divTitle.innerText = word;
    divTitle.style.cssText = `
    border-radius: 10px;
    background-color: white;
    min-height: 20px;
    min-width: 50px;    
    font-family: var(--font);
    font-weight: 400;
    font-size: 16px;
    padding: 8px 16px 10px 16px;
    text-align: center;
    display: none;
    position: absolute;
    `;
    divElement.appendChild(divTitle);
    divElement.addEventListener('mouseenter', () => {
      divTitle.style.display = 'block';
    });
    divElement.addEventListener('mouseleave', () => {
      divTitle.style.display = 'none';
    });
  }
}

function createElementText(text) {
  const divCellText = document.createElement('div');
  divCellText.className = 'cell-text';

  const divIndex = document.createElement('div');
  divIndex.className = 'index';
  divCellText.appendChild(divIndex);

  const divText = document.createElement('div');
  divText.className = 'text';
  const myText = text;
  divText.innerText = wordTrim(text);
  divCellText.appendChild(divText);

  if (document.documentElement.clientWidth > 480) {
    addTitle(myText, divText);
  }

  const divClose = document.createElement('div');
  divClose.className = 'close';
  divClose.id = 'close-text';

  const imgClose = document.createElement('img');
  imgClose.src = 'svg/cross.svg';
  imgClose.alt = 'Удалить строку';

  divClose.appendChild(imgClose);
  divCellText.appendChild(divClose);

  divColText.appendChild(divCellText);
}

function createElementTranslation(text) {
  const divCellTranslation = document.createElement('div');
  divCellTranslation.className = 'cell-translation';

  const divIndexTranslation = document.createElement('div');
  divIndexTranslation.className = 'index-translate';
  divCellTranslation.appendChild(divIndexTranslation);

  const divTextTranslation = document.createElement('div');
  divTextTranslation.className = 'translation-text';
  const textTranslit = translit(text);
  divTextTranslation.innerText = wordTrim(textTranslit);

  divCellTranslation.appendChild(divTextTranslation);

  if (document.documentElement.clientWidth > 480) {
    addTitle(textTranslit, divTextTranslation);
  }

  const divCloseTranslate = document.createElement('div');
  divCloseTranslate.className = 'close';
  divCloseTranslate.id = 'close-translate';

  const imgClose = document.createElement('img');
  imgClose.src = 'svg/cross.svg';
  imgClose.alt = 'Удалить строку';

  divCloseTranslate.appendChild(imgClose);
  divCellTranslation.appendChild(divCloseTranslate);

  divColTranslation.appendChild(divCellTranslation);
}

function updateIndex() {
  const divIndex = document.querySelectorAll('.index');
  const divIndexTranslate = document.querySelectorAll('.index-translate');
  for (let i = 1; i < divIndex.length; i += 1) {
    divIndex[i].innerText = i + 1;
    divIndexTranslate[i].innerText = i + 1;
  }
}

function closeAll(text, translate) {
  const btnCloseAll = document.querySelector('.closeAll');
  btnCloseAll.addEventListener('click', () => {
    for (let i = 1; i < text.length; i += 1) {
      text[i].remove();
      translate[i].remove();
    }
  });
}

function closeRow() {
  const btnClose = document.querySelectorAll('#close-translate');
  const btnCloseForMobile = document.querySelectorAll('#close-text');
  const divCellTextAll = document.querySelectorAll('.cell-text');
  const divCellTranslationAll = document.querySelectorAll('.cell-translation');

  for (let i = 1; i < btnClose.length; i += 1) {
    btnClose[i].addEventListener('click', () => {
      divCellTextAll[i].remove();
      divCellTranslationAll[i].remove();
      updateIndex();
    });
    btnCloseForMobile[i].addEventListener('click', () => {
      divCellTextAll[i].remove();
      divCellTranslationAll[i].remove();
      updateIndex();
    });
  }

  closeAll(divCellTextAll, divCellTranslationAll);
}

function btnClick() {
  textUser = textInput.value;
  createElementText(textUser);
  createElementTranslation(textUser);
  updateIndex();
  textInput.value = '';
  closeRow();
}

btnAdd.addEventListener('click', btnClick);
textInput.addEventListener('keyup', (event) => {
  event.preventDefault();
  if (event.code === 'Enter') {
    btnClick();
  }
});
