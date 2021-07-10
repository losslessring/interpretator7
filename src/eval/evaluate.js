import {isNumber, numberValue, isOperation, apply} from './eval_functions/check_token.js'


export function evaluate(str) {

    const token = str.split(' ').slice(0)[0]
    //console.log(token)
    const restTokens = str.split(' ').slice(1)
    //console.log(restTokens)
    // isExpression(token) ? evaluate(token) :
    return isOperation(token) ? apply(token, restTokens) :
           isNumber(token)   ? numberValue(token) : "error"
}