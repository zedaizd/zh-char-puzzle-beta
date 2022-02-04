# 字知之明

這是一個拆字猜字遊戲的專案  
Forked from [hannahcode/word-guessing-game](https://github.com/hannahcode/word-guessing-game)  

## 關於素材

拆字資料以及部件圖片的來源是[全字庫](https://www.cns11643.gov.tw/index.jsp)的[授權下載區域](https://www.cns11643.gov.tw/pageView.jsp?ID=59)  
拆字資料經過轉換成 YAML 後置於 `datasets/full`  
部件圖片經過批次去背存成 PNG 置於 `public/parts`  

常用字表來自[教育部常用字表](https://language.moe.gov.tw/result.aspx?classify_sn=23&subclassify_sn=437&content_sn=46)  
原檔選擇 Excel 轉換成 YAML 後置於 `datasets/frequently-used-subset`  

## Original Readme from hannahcode/word-guessing-game

Word Guessing Game

This is a clone project of a popular word guessing game made using React, Typescript, and Tailwind.

_To Run Locally:_
Clone the repository and perform the following command line actions:

```bash
$ cd word-guessing-game
$ npm install
$ npm run start
```

_To build/run docker container:_

```bash
$ docker build -t game .
$ docker run -d -p 3000:3000 game
```

open http://localhost:3000 in browser.

_To create a version in a different language:_

- Update the title, the description, and the "You need to enable JavaScript" message in `public/index.html`
- Update the language attribute in the HTML tag in `public/index.html`
- Update the name and short name in `public/manifest.json`
- Update the strings in `src/constants/strings.ts`
- Add all of the five letter words in the language to `src/constants/validGuesses.ts`, replacing the English words
- Add a list of goal words in the language to `src/constants/wordlist.ts`, replacing the English words
- Update the "About" modal in `src/components/modals/AboutModel.tsx`
- Update the "Info" modal in `src/components/modals/InfoModal.tsx`
- If the language has letters that are not present in English, add them to the `CharValue` type in `src/lib/statuses.ts` and update the keyboard in `src/lib/components/keyboard/Keyboard.tsx`
- If the language's letters are made of multiple unicode characters, use a grapheme splitter at various points throughout the app or normalize the input so that all of the letters are made of a single character
- If the language is written right-to-left, add `dir="rtl"` to the HTML tag in `public/index.html` and prepend `\u202E` (the unicode right-to-left override character) to the return statement of the inner function in `generateEmojiGrid` in `src/lib/share.ts`
