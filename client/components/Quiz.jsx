import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import request from 'superagent'
import Question from './Question'
import { addName } from '../api'
import { setScoreTransfer } from '../actions'

//SCORING

var count = 0

class Quiz extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      score: 0,
      previous: '',
      results: [],
      name:'',
      highname:'',
    }

    this.questionResponseHandler = this.questionResponseHandler.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleResultsSubmit = this.handleResultsSubmit.bind(this)

  }

  componentDidMount() { 
    const {categorySelected} = this.props

    //QUIZ CONTENT
    const newAPI = this.apiConstructor(categorySelected)
    request.get(newAPI)
      .then(res => {
        const results = res.body.results
        this.setState({
          results: results
        })
      })

    //CATEGORY PREVIOUS SCORE
    let catRetrieval = `/api/v1/score/${categorySelected}`
     
    request.get(catRetrieval)
    .then(res => {
      this.setState({
        previous: res.body[0].previous,
        highname: res.body[0].name
      })
    })
  }

  //API CONSTRUCTORS
  apiConstructor(category){
    var number = this.apiNumber(category)
    return 'https://opentdb.com/api.php?amount=10&category=' + number + 
            '&difficulty=easy&type=boolean'
  }

  apiNumber(category){
    switch (category){
      case 'Animals':
        return '27'
      case 'Films':
        return '11'
      case 'Science':
        return '17'
      case 'History':
        return '23'
      default:
        return 'black'
    }
  }

  //EVENT HANDLERS
  handleChange(event){
    this.setState({
      [event.target.name]:event.target.value
     })
   }

  handleSubmit(event){
    event.preventDefault()
    addName(this.state)
  }

  handleResultsSubmit(dispatch){
    let scoreCarrier = {
      previousScore: this.state.previous,
      currentScore: this.state.score,
      highName: this.state.highname
      }
    dispatch (setScoreTransfer(scoreCarrier))
  }

   //SCORING
  questionResponseHandler(response, currentScore){
     let nowScore = this.state.score
     let newScore = nowScore + response

     this.setState({
      score: newScore,
    })
     
   }

   //CONDITIONAL FORMATTING
  categoryFormatting(category){
      switch (category){
        case 'Animals':
          return 'orangered'
        case 'Films':
          return 'orange'
        case 'Science':
          return 'cornflowerblue'
        case 'History':
          return 'Purple'
        default:
          return 'black'
      }
   }
   
   render() {
     
    const {categorySelected} = this.props
    const {dispatch} = this.props
    const currentScore = this.state.score
    const previousScore = this.state.previous
    const highName = this.state.highname
    const color = this.categoryFormatting(categorySelected)
    const scoreBody = 'Previous Score: ' + previousScore + ' > ' + highName
      
    return (
      <div>
        <div className='scoreIndicator'>
          {scoreBody}
        </div>
        <h2 style={{color: color}}> {categorySelected}</h2>
        <h3> Your Score: {currentScore}</h3>
   
        {
          this.state.results.map((result, index) => {
            return (
              <div key={index}>
                <Question question={result.question} correctAnswer={result.correct_answer} 
                  color={color} id={index} parentHandler={this.questionResponseHandler}/>
              </div>
            )
          })
        }
        <Link to='/'>Home</Link>
        <Link to='/Score' onClick={() => this.handleResultsSubmit(dispatch)} >Proceed</Link>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    categorySelected: state.quizDetail
  }
}

export default connect(mapStateToProps)(Quiz)