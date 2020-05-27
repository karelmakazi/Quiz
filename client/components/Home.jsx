import React from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {setQuizDetails} from '../actions'


function eventHandler(dispatch){
  let selectedCat = event.target.value
  dispatch (setQuizDetails(selectedCat))
}

function Home (props) {
  const {dispatch} = props

  return (
          <div className="mainContainer">
            <div className="contentContainer shadow">
              <h1>QUIZZICAL</h1>
              <p>
                A competetive quiz game guaranteed to lose you more friends than Monopoly.
              </p>
              <div className="buttonContainer">
                <div>
                  <h2>
                  CATEGORIES
                  </h2>
                </div>
                <div>
                  <Link to='/Quiz'><button className='categoryFilms' value='Films' 
                    onClick={() => eventHandler(dispatch)}> FILMS </button>
                  </Link>
                  <Link to='/Quiz'><button className='categoryAnimals' value='Animals' 
                    onClick={() => eventHandler(dispatch)}> ANIMALS </button>
                  </Link>
                  <Link to='/Quiz'><button className='categoryScience' value='Science' 
                    onClick={() => eventHandler(dispatch)}> SCIENCE </button>
                  </Link>
                  <Link to='/Quiz'><button className='categoryHistory' value='History' 
                    onClick={() => eventHandler(dispatch)}> HISTORY </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
  )
}

export default connect () (Home)
