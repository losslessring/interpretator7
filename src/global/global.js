export let global = {
    add: (args) => {
        return args.reduce((acc, cur) => Number(acc) + Number(cur))
    }
}