import React from 'react'
import '../styles/history.css'

const history = () => {
  return (
    <div className='main-container'>
          <div className="history-container">
            <h1>Previous Bots</h1>
            <div className="history">
              {/* {botNames.map((botName, index) => ( */}
                <div className="history-item" >
                  <div className="history-item-name"></div>
                </div>
              {/* ))} */}
            </div>
          </div>
        </div>
  )
}

export default history
