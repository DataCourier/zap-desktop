import React from 'react'
import PropTypes from 'prop-types'

import Moment from 'react-moment'
import 'moment-timezone'

import { btc, blockExplorer } from 'utils'

import styles from './Transaction.scss'


const Transaction = ({ transaction, ticker, currentTicker }) => (
  <div className={styles.container}>
    <header>
      <div className={styles.title}>
        <h2>
          {
            transaction.amount < 0 ?
              'Sent'
              :
              'Received'
          }
        </h2>
        <h1>
          <span className={styles.value}>
            {
              ticker.currency === 'usd' ?
                btc.satoshisToUsd(transaction.amount, currentTicker.price_usd)
                :
                btc.satoshisToBtc(transaction.amount)
            }
          </span>
          <i>BTC</i>
        </h1>
      </div>
      <h3 onClick={() => blockExplorer.showTransaction(transaction.tx_hash)}>{transaction.tx_hash}</h3>
    </header>
    <dl>
      <dt>Confirmations</dt>
      <dd>{transaction.num_confirmations}</dd>
      <dt>Fee</dt>
      <dd>
        {
          ticker.currency === 'usd' ?
            btc.satoshisToUsd(transaction.total_fees)
            :
            btc.satoshisToBtc(transaction.total_fees)
        }
      </dd>
      <dt>Date</dt>
      <dd>
        <Moment format='MMM Do'>{transaction.time_stamp * 1000}</Moment>
      </dd>
    </dl>
  </div>
)

Transaction.propTypes = {
  transaction: PropTypes.object.isRequired,
  ticker: PropTypes.object.isRequired,
  currentTicker: PropTypes.object.isRequired
}

export default Transaction
