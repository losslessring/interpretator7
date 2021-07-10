import { evaluate } from "../eval/evaluate.js";

export function parse(str) {
    const tokens =  str.split(' ')
    
    return recursiveParse(tokens)
}

function recursiveParse(tokens) {
    if (tokens.length === 0) {
        return 
    }
    const tokenValue = evaluate(tokens[0])
    console.log(tokenValue)
    return recursiveParse(tokens.slice(1))
}