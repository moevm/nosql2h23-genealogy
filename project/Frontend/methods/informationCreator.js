export const generateInfo = (node) => {
  return node.name + '\n ' +
    node?.patronymic + '\n ' + node.surname + '\n ' +
    node.gender + '\n ' +
    generateDate(node.dateOfBirth) + (node.dateOfDeath === undefined ? '' : ' - ' + generateDate(node.dateOfDeath))
}

export const generateNPS = (node) => {
  return node.name + ' ' +
    node?.patronymic + ' ' + node.surname
}
export const generateDate = (date) => {
  console.log(date)
  return (+date.day.low < 10 ? `0${date.day.low}.` : `${date.day.low}.`) +
    (+date.month.low < 10 ? `0${date.month.low}.` : ` ${date.month.low}.`) +
    date.year.low
}
