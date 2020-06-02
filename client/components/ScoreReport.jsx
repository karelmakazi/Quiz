import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { addName } from '../api'

class ScoreReport extends Component {
  constructor(props) {
    super(props)
    this.state ={
      name:'',
      categorySelected: this.props.categorySelected,
      currentScore: this.props.currentScore,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.categoryFormatting = this.categoryFormatting.bind(this)

  }

  // EVENT HANDLERS
  handleChange(event){
    this.setState({
      [event.target.name]:event.target.value
     })
   }

   handleSubmit(event){
    event.preventDefault()
    addName(this.state)
  }

  // DYNAMIC FORMATTING
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
    const {categorySelected, currentScore, previousScore, highName, color} = this.props
    const catColor = this.categoryFormatting(categorySelected)
    const slice1 = (categorySelected == 'Films') ? 'FILMS' : ''
    const slice2 = (categorySelected == 'Animals') ? 'ANIMALS' : ''
    const slice3 = (categorySelected == 'Science') ? 'SCIENCE' : ''
    const slice4 = (categorySelected == 'History') ? 'HISTORY' : ''
    const scoreFeedback = (currentScore > previousScore) ? `You beat ${  highName  }'s ${   categorySelected  } highscore!` 
    : `${highName  }'s ${  categorySelected  } highscore still stands!`
    

    return (
      <div className="mainContainer">

        <div className="contentContainer shadow">
          <div className='reportSection'>
            <h1>QUIZZICAL</h1>
            <div className='reportBark' style={{color: catColor}}>{scoreFeedback}</div>
            <div className='reportScore'>
              HIGHSCORE:
              {previousScore}
            </div>
            <div className='reportScore'>
              YOUR SCORE:
              {currentScore}
            </div>
            <div className='nameEntry' style={{borderTop: `3px solid ${catColor}`, borderBottom: `3px solid ${catColor}`}}>
              <label htmlFor='userName'>ENTER YOUR NAME </label>
              <input id='userName' value={this.state.name} name='name' onChange={this.handleChange} />
              <div className='footerNav' style={{color: catColor}} onClick={this.handleSubmit}>
                <Link to='/' className='footerNav'>SUBMIT SCORE </Link>
              </div>
            </div>
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
    categorySelected: state.quizDetail,
    currentScore: state.reportDetail[0].currentScore,
    previousScore: state.reportDetail[0].previousScore,
    highName: state.reportDetail[0].highName,
    }
}

export default connect(mapStateToProps)(ScoreReport)