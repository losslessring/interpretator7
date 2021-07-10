import { global } from '../../global/global.js'


export function isNumber(str) {
    return /^\d+$/.test(str)
}

export function numberValue(str) {
    return Number(str)
}

export function isOperation(str) {
    return str in global
}

export function apply(operation, args){
    return global[operation](args)
}

export function isExpression(str) {
    return str[0] ==="(" && str[str.length - 1] === ")"
    
}