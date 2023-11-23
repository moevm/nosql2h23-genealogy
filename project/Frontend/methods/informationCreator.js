export const generateInfo = (node) => {
  return node.name + '\n ' +
    node?.patronymic + '\n ' + node.surname + '\n ' +
    node.gender + '\n ' +
    generateDate(node.dateOfBirth) + (node.dateOfDeath === undefined ? '' : ' - ' + generateDate(node.dateOfDeath))
}

export const generateDate = (date) => {
  return (+date.day.low < 10 ? `0${date.day.low}.` : `${date.day.low}.`) +
    (+date.month.low < 10 ? `0${date.month.low}.` : ` ${date.month.low}.`) +
    date.year.low
}
