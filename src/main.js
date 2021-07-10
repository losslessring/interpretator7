import { evaluate } from './eval/evaluate.js'
//import { parse } from './parse/parse.js'

//console.log(evaluate("234"))
//console.log(evaluate("add 1 2 3"))


function createTree(array, fieldToCheck, fieldToAdd) {   


  function createTreeFromArray(array, prevNode) {
      
      if (array.length === 0){
          return
      }

      let newNode = {
          value: array[0][fieldToCheck],
          parent: prevNode.value,
          data: array[0][fieldToAdd],
          children:[]

      }

      if (array[0][fieldToCheck][0] > prevNode.value[0] && 
          array[0][fieldToCheck][1] < prevNode.value[1]) {
      
          prevNode.children.push(newNode)
          returnStack.push(newNode)

          return createTreeFromArray(array.slice(1), newNode)
      }
      else {
          returnStack.pop()
          let lastStackElement = returnStack[returnStack.length - 1]
          //console.log(lastStackElement)
          return createTreeFromArray(array, lastStackElement)
      }
  }   

  let tree = { 
      value: [-1, Infinity],
      parent: [-1, Infinity],
      data: "root",
      children:[]
  }

  let returnStack = []
  returnStack.push(tree) 


  createTreeFromArray(array, tree)
  return tree
  

}

function parse(str, tokens = []){
    
    if (str.length === 0){
        console.log(tokens)
        return tokens
    }
    
    //const tokens = str.split('')
    console.log(str)
    switch (true) {
        case str[0] === '(':
            const openBracketIndex = 0
            const closeBracketIndex = findClosingBracketIndex(str, openBracketIndex)
            
            //const expression = programText.slice(openBracketIndex, closeBracketIndex + 1)
            const expression = str.slice(openBracketIndex + 1, closeBracketIndex)
            //console.log(expression)
            //parse(expression, [{type: 'expression', value: expression}])
            //console.log(`Токен ${expression}`)
            return parse(expression, [...tokens, expression])
            break
        case /\S/.test(str[0]):
            //console.log(`Токен ${str[0]}`)
            return parse(str.slice(1), [...tokens, str[0]])
            break
        case str[0] === ' ':
            //console.log(`Токен ${str[0]}`)
            return parse(str.slice(1), tokens)
            break
        default:
            console.log(`Syntax error, unexpected symbol ${str[0]}`);
      }


}


function findClosingBracketIndex(str, pos) {
    if (str[pos] !== '(') {
      throw new Error('The position must contain an opening bracket');
    }
    let level = 1;
    for (let index = pos + 1; index < str.length; index++) {
      if (str[index] === '(') {
        level++;
      } else if (str[index] === ')') {
        level--;
      }
      
      if (level === 0) {
        return index;
      }
    }
    return -1;
}

//const programText = '(+ 1 2 (+ 2 5 (- 8 2 (+ 1 9))) (+ 3 4))'
const programText = '(+ 1 2 (+ 3 4) (+ 5 6))'
const searchStr = '[(]'
const openBracketIndices = [...programText.matchAll(new RegExp(searchStr, 'gi'))].map(a => a.index);
//console.log(openBracketIndices)


const expressionsMap = openBracketIndices.map(openBracketIndex => {
    const closeBracketIndex = findClosingBracketIndex(programText, openBracketIndex)
    //const expression = programText.slice(openBracketIndex, closeBracketIndex + 1)
    const expression = programText.slice(openBracketIndex, closeBracketIndex + 1)
    const tokens = expression.split(/(?!\(.*)\s(?![^(]*?\))/g)
    //const tokens = parse(expression)
    return {
        expression,
        tokens,
        //closeBracketIndex,
        //openBracketIndex,
        range: [openBracketIndex, closeBracketIndex]
        
    }

})

console.log(expressionsMap)

let tree = createTree(expressionsMap, "range", "expression" )
console.log(tree)

//const testString = '+ 2 5 (- 8 2)'
//const noStartEndBrackets = testString.slice(1, testString.length - 1)
//console.log(noStartEndBrackets)
//const tokens = noStartEndBrackets.split(/(?!\(.*)\s(?![^(]*?\))/g)
//const tokens = testString.split(/(?!\(.*)\s(?![^(]*?\))/g)
//console.log(tokens)

//console.log(parse(programText, []))


