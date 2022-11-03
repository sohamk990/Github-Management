export const incNum = (val) => {
    return {
        type: "INC",
        value: val
    }
}

export const decNum = (val) => {
    return {
        type: "DEC",
        value: val
    }
}