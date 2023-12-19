export const generateInfo = (node) => {
  return node.name + ' ' +
    node?.patronymic + ' ' + node.surname + ' ' +
    node.gender + ' ' +
    generateDate(node.dateOfBirth) + (node.dateOfDeath === undefined ? '' : ' - ' + generateDate(node.dateOfDeath))
}

export const generateNPS = (node) => {
  return node.name + ' ' +
    node?.patronymic + ' ' + node.surname
}
export const generateDate = (date) => {
  return (+date?.day.low < 10 ? `0${date?.day.low}.` : `${date?.day.low}.`) +
    (+date?.month.low < 10 ? `0${date?.month.low}.` : `${date?.month.low}.`) +
    date?.year.low
}

export const dateToObjectDate = (date) => {

  if(date === ""){
    return new Date()
  }
  const dateSplit = date.split('.')
  const dateRes = `${dateSplit[2]}-${dateSplit[1]}-${dateSplit[0]}`
  return new Date(dateRes)
}
