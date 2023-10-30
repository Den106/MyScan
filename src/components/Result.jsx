import styles from '../styles/Result.module.css'
import {ResultItem} from './detail/Resultitem'
import {GeneralResultLoader, ResultSlider} from './detail/ResultSlider'
import ResultSoon from '../images/ResultSoon.svg'
import {tableCreat} from './func/tableResult'
import {useContext, useEffect, useState} from 'react'
import  ResultContext  from '../context/createContext'
import {Documents} from '../API/API.jsx'


async function getDetailData(documentIds) {
  try {
    return await Documents(documentIds);
  } catch (error) {
    console.error("Failed to fetch detail data", error);
    return null;
  }
}

function getFirstN(documentList, n) {
  return documentList.slice(0, n);
}

function DemonstResult() {
  const context = useContext(ResultContext)
  const [countDocs, setCountDocs] = useState(4)

  const resultGeneralData = context.generalData
  const resultData = context.data

  const detailsData = context.detailsData
  const setDetailsData = context.setDetailsData

  useEffect(() => {
    if (resultData && resultData.data.items.length > 0) {
      const documentIds = getFirstN(resultData.data.items, countDocs).map(item => item.encodedId);
      getDetailData(documentIds).then(setDetailsData);
    }
  }, [resultData, countDocs, ])

  const moreResultPub = () => {
    const countDocsIterator = 10;
    const remainingDocs = resultData.data.items.length - countDocs;
    const additionalDocs = Math.min(remainingDocs, countDocsIterator);
    setCountDocs(countDocs + additionalDocs);
  }

  return (
    <main className={styles.resultPage}>
      <div className={styles.soonResult}>
        <div className={styles.titleBlock}>
          <h1 className={styles.title}>Ищем. Скоро будут результаты</h1>
          <p className={styles.text}>Поиск может занять некоторое время, просим сохранять терпение.</p>
        </div>
        <img className={styles.resultImg} src={ResultSoon} alt="soon result" />
      </div>
      <div className={styles.summaryBlock}>
        <h2 className={styles.subtitle}>Общая сводка</h2>
        <p className={styles.dataSum}>Найдено
          {!resultGeneralData
            ? ` 0`
            : ` ${tableCreat(resultGeneralData.data.data).length}`} вариантов
        </p>
        {<ResultSlider isLoading={!resultGeneralData} data={!resultGeneralData
          ? []
          : resultGeneralData.data.data} />}
      </div>
      <div className={styles.resultBlock}>
        <h2 className={styles.subtitle}>Список документов</h2>
        <ul className={styles.resultList}>
          {!resultData || +resultData.data.items.length === 0
            ? <p></p>
            : !detailsData
              ? <GeneralResultLoader />
              : detailsData.data.map(item => <ResultItem key={item.ok.id} data={item.ok} />)}
        </ul>
        <button onClick={moreResultPub} className={resultData && ((countDocs) >= +resultData.data.items.length) ? styles.seeMorePubHidden : styles.seeMorePub}>Показать больше</button>
      </div>
    </main>
  )
}

export { DemonstResult }