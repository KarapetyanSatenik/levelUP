function createVocabulary(...documents) {
  const vocabulary = {};
  let sortedDocuments = makeDocumentUnique(...documents);
  sortedDocuments.forEach((words, i) => {
    for (let j = 0; j < words.length; j++) {
      const el = words[j];
      if (!(el in vocabulary)) {
        if (
          el === "is" ||
          el === "to" ||
          el === "of" ||
          el === "the" ||
          el === "a" ||
          el === "an" ||
          el === "on" ||
          el === "over" ||
          el === "are" ||
          el === "am"
        ) {
          continue;
        }
        vocabulary[el] = String(i);
      } else {
        vocabulary[el] = vocabulary[el] + String(i);
      }
    }
  });

  return vocabulary;
}

console.log(
  createVocabulary(
    "home sales rise in july",
    "increase in home sales in july",
    "july new sale rise"
  )
);

function searchWord(vocabulary, words) {
  const searchingResult = {};
  words.forEach((el) => {
    if (el in vocabulary) {
      searchingResult[el] = vocabulary[el];
    }
  });
  console.log(111, searchingResult);

//   let convertObjectToArray = [];
//   for (const key in searchingResult) {
//     convertObjectToArray.push(searchingResult[key]);
//   }
//   console.log(222, convertObjectToArray);

}

function makeDocumentUnique(...documents) {
  let finallyResult = [];
  documents.forEach((el) => {
    finallyResult.push(Array.from(new Set(el.split(" "))));
  });

  return finallyResult;
}

// let words = prompt("input words");

let splitWords = ["july", "rise"];

console.log(
  searchWord(
    createVocabulary(
      "home sales rise in july",
      "increase in home sales in july",
      "july new sale rise"
    ),
    splitWords
  )
);

function addition(number){
return number+=1
}

console.log(addition(3));