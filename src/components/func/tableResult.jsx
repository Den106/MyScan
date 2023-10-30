function parseDate(date) {
    const dateSub = new Date(date)

    const day = (+dateSub.getDate()) < 10
        ? `0${+dateSub.getDate()}`
        : +dateSub.getDate()

    const month = (+dateSub.getMonth() + 1) < 10
        ? `0${+dateSub.getMonth() + 1}`
        : +dateSub.getMonth() + 1

    const year = dateSub.getFullYear()

    return `${day}.${month}.${year}`
}


const tableCreat = (arr) => {
    const resArr = []
    if (!arr || !arr.length) {
        return []
    } else {
        if (arr[0].histogramType === "totalDocuments") {
            arr[0].data.forEach(dataItem => {
                resArr.push({
                    date: parseDate(dataItem.date),
                    totalValue: dataItem.value,
                    riskValue: 0
                })
            })
            if (arr[1]) {
                resArr.forEach((resItem, index) => {
                    resItem.riskValue = arr[1].data[index].value
                })
            }
        }

        if (arr[0].histogramType === "riskFactors") {
            arr[0].data.forEach(dataItem => {
                resArr.push({
                    date: parseDate(dataItem.date),
                    totalValue: 0,
                    riskValue: dataItem.value
                })
            })
            if (arr[1]) {
                resArr.forEach((resItem, index) => {
                    resItem.totalValue = arr[1].data[index].value
                })
            }
        }
        return resArr
    }

}

function parseXml(xml) {
    const parser = new DOMParser()
    const html = parser.parseFromString(xml, "text/xml")
    let result = ''
    html.getElementsByTagName("scandoc")[0].childNodes.forEach((node, index) => {
        if (index < 3) {
            if ((node.innerHTML).match(/[а-я ]/gi)) {
                result += (node.innerHTML).match(/[а-я ]/gi).join('')
            }
        }
    })
    return result + '...'
}

export { parseDate, tableCreat, parseXml}