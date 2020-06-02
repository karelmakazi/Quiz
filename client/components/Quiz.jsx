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

    //GET QUIZ CONTENT
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

  //REDUX 
  handleResultsSubmit(dispatch){
    let scoreCarrier = {
      previousScore: this.state.previous,
      currentScore: this.state.score,
      highName: this.state.highname,
      }
    dispatch (setScoreTransfer(scoreCarrier))
  }

   //SCORING
  questionResponseHandler(response){
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
        return '#C33038' 
      case 'Films':
        return '#D66C2A' 
      case 'Science':
        return '#73A7E3' 
      case 'History':
        return '#702C68' 
      default:
        return 'black' 
    }
   }
   
   render() {
     
    const {dispatch} = this.props
    const {categorySelected} = this.props
    const currentScore = this.state.score
    const previousScore = this.state.previous
    const highName = this.state.highname
    const highScore = 'Highscore: ' + highName + ' ' + previousScore + '.'
    const yourScore = ' Your Score: ' + currentScore + '.'
    let scoreBody = highScore + yourScore
    const color = this.categoryFormatting(categorySelected)
    const slice1 = (categorySelected == 'Films') ? 'FILMS' : ''
    const slice2 = (categorySelected == 'Animals') ? 'ANIMALS' : ''
    const slice3 = (categorySelected == 'Science') ? 'SCIENCE' : ''
    const slice4 = (categorySelected == 'History') ? 'HISTORY' : ''
      
    return (
      <div className="mainContainer">

        <div className="contentContainer shadow">
          <h1 className="categoryHead" style={{color: color}}> {categorySelected}</h1>
          <h3> {scoreBody} </h3>
          <div className='mapContainer'>
            { this.state.results.map((result, index) => {
                return (<div className='question' key={index}>
                  <Question question={result.question} correctAnswer={result.correct_answer} 
                  color={color} id={index} parentHandler={this.questionResponseHandler}/>
                  </div>)
              })
            }
          </div>
          <div className='footerContainer' style={{backgroundColor: color}}>
            <Link to='/' className='footerNav'>HOME</Link>
            <Link to='/Score' className='footerNav' 
              onClick={() => this.handleResultsSubmit(dispatch)} >SCORE</Link>
          </div>
        </div>

        <div className='slice1'>
            <div className='sliceContent'><h2>{slice1}</h2></div>
        </div>
        <div className='slice2'>
          <div className='sliceContent'><h2>{slice2}</h2></div>
        </div>
        <div className='slice3'>
          <div className='sliceContent'><h2>{slice3}</h2></div>
        </div>
        <div className='slice4'>
          <div className='sliceContent'><h2>{slice4}</h2></div>
        </div>

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