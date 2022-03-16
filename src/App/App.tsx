import { number } from 'prop-types'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import classes from './app.module.scss'
type valute = {
  CharCode: string
  ID: string
  Name: string
  Nominal: number
  NumCode: string
  Previous: number
  Value: number
}
type countryTag =
  | 'AMD'
  | 'AUD'
  | 'AZN'
  | 'BGN'
  | 'BRL'
  | 'BYN'
  | 'CAD'
  | 'CHF'
  | 'CNY'
  | 'CZK'
  | 'DKK'
  | 'EUR'
  | 'GBP'
  | 'HKD'
  | 'HUF'
  | 'INR'
  | 'JPY'
  | 'KGS'
  | 'KRW'
  | 'KZT'
  | 'MDL'
  | 'NOK'
  | 'PLN'
  | 'RON'
  | 'SEK'
  | 'SGD'
  | 'TJS'
  | 'TMT'
  | 'TRY'
  | 'UAH'
  | 'USD'
  | 'UZS'
  | 'XDR'
  | 'ZAR'
type Tvalute = {
  CharCode: string
  ID: string
  Name: string
  Nominal: number
  NumCode: string
  Previous: number
  Value: number
}
type tagCountry = Record<countryTag, Tvalute>
type Tcourses = {
  Date: string
  PreviousDate: string
  PreviousURL: string
  Timestamp: string
  Valute: tagCountry
}
type smth = keyof Tcourses['Valute']
const App = () => {
  function sootnoshenie(tag: countryTag) {
    switch (tag) {
      case 'AMD':
        return 'am'
      case 'AUD':
        return 'au'
      case 'AZN':
        return 'az'
      case 'BGN':
        return 'bg'
      case 'BRL':
        return 'br'
      case 'BYN':
        return 'by'
      case 'CAD':
        return 'ca'
      case 'CHF':
        return 'ch'
      case 'CNY':
        return 'cn'
      case 'CZK':
        return 'cz'
      case 'DKK':
        return 'dk'
      case 'EUR':
        return 'fr'
      case 'GBP':
        return 'gb'
      case 'HKD':
        return 'hk'
      case 'HUF':
        return 'hu'
      case 'INR':
        return 'in'
      case 'JPY':
        return 'jp'
      case 'KGS':
        return 'kg'
      case 'KRW':
        return 'kr'
      case 'KZT':
        return 'kz'
      case 'MDL':
        return 'md'
      case 'NOK':
        return 'no'
      case 'PLN':
        return 'pl'
      case 'RON':
        return 'ro'
      case 'SEK':
        return 'se'
      case 'SGD':
        return 'sg'
      case 'TJS':
        return 'tj'
      case 'TMT':
        return 'tm'
      case 'TRY':
        return 'tr'
      case 'UAH':
        return 'ua'
      case 'USD':
        return 'us'
      case 'UZS':
        return 'uz'
      case 'XDR':
        return 'us-la'
      case 'ZAR':
        return 'za'
      default:
        return 'ru'
    }
  }
  const [first, setFirst] = useState(
    JSON.parse(localStorage.getItem('first') || 'true')
  )
  const [showDate, setShowDate] = useState(true)
  const [currentDate, setCurrentDate] = useState(
    localStorage.getItem('courseDate') || '0'
  )
  const [courses, setCourses] = useState<Tcourses[]>([])
  const currentCourses = courses[0]
  function getCourse() {
    const dateNow = Date.now()
    async function fetchCourse() {
      localStorage.getItem('currentCourses')
      const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js')
      const data = await response.json()
      localStorage.setItem('currentCourses', JSON.stringify(data))
      localStorage.setItem('courseDate', JSON.stringify(dateNow))
      return data
    }
    if (
      localStorage.getItem('currentCourses') &&
      localStorage.getItem('courseDate')
    ) {
      dateNow - JSON.parse(localStorage.getItem('courseDate') || '0') > 3600000
        ? fetchCourse().then((res) => setCourses([].concat(res)))
        : setCourses(
            [].concat(
              JSON.parse(localStorage.getItem('currentCourses') || '{}')
            )
          )
      setCurrentDate(localStorage.getItem('courseDate') || '0')
    } else {
      debugger
      fetchCourse().then((res) => {
        setCurrentDate(localStorage.getItem('courseDate') || '0')
        setCourses([].concat(res))
      })
    }
  }
  useEffect(() => {
    getCourse()
  }, [])
  return !first ? (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <span
        className={classes.data}
        style={showDate ? { visibility: 'visible' } : { visibility: 'hidden' }}
      >
        {'Время получения данных: ' + new Date(+currentDate)}
      </span>
      <div>
        {currentCourses?.Valute ? (
          (Object.keys(currentCourses.Valute) as unknown as smth[]).map(
            (elem: smth) => (
              <div
                key={currentCourses.Valute ? currentCourses.Valute[elem].ID : 0}
                className={classes.hmm}
                onMouseEnter={() => setShowDate(false)}
                onMouseLeave={() => setShowDate(true)}
                onClick={() => setShowDate(false)}
              >
                <ul>
                  <li>
                    <span>
                      {currentCourses.Valute
                        ? currentCourses.Valute[elem].CharCode
                        : 0}
                    </span>
                  </li>
                  <li>
                    <span>
                      {currentCourses.Valute[elem].Value +
                        ' За ' +
                        currentCourses.Valute[elem].Nominal +
                        (currentCourses.Valute[elem].Nominal > 9
                          ? ' Единиц'
                          : ' Единицу')}
                    </span>
                  </li>
                  <li
                    className={
                      currentCourses.Valute[elem].Value >
                      currentCourses.Valute[elem].Previous
                        ? classes.up
                        : classes.down
                    }
                  >
                    <span>
                      {(currentCourses.Valute[elem].Value >
                      currentCourses.Valute[elem].Previous
                        ? '+'
                        : '') +
                        (
                          (1 -
                            currentCourses.Valute[elem].Previous /
                              currentCourses.Valute[elem].Value) *
                          100
                        ).toFixed(2) +
                        '%'}
                    </span>
                  </li>
                  <li>
                    <img
                      style={{
                        width: 'calc(1.2vh + 1.2vw)',
                        height: 'calc(1vh + 1vw)',
                      }}
                      src={`https://flagcdn.com/28x21/${sootnoshenie(
                        elem
                      )}.png`}
                      alt=''
                    />
                  </li>
                </ul>
                <span className={classes.tooltip}>
                  {'Это ' + currentCourses.Valute[elem].Name + '(ики)'}
                </span>
              </div>
            )
          )
        ) : (
          <div>no course</div>
        )}
      </div>
    </div>
  ) : (
    <div>
      <p>
        На мобильных телефонах кликните на Название|Цену|Проценты ,чтобы увидеть
        полное наименование валюты
      </p>
      <p>На пк наведите, чтобы увидеть полное наименование валюты</p>
      <p>
        Данные получаются, если с момента последнего получения данных прошло
        больше часа
      </p>
      <button
        style={{ marginLeft: '25%' }}
        onClick={() => {
          localStorage.setItem('first', 'false')
          setFirst(false)
        }}
      >
        <p>I Understand</p>
      </button>
    </div>
  )
}

export default App
