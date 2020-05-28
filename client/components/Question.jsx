import React from 'react'

class Question extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      answered: 0,
    }
  }
  
  feedback = ''
  feedbackColour ='white'
  resCode = 3

  // quizAnswerHandler(answer) {
  //   let responseValue = event.target.value
  //   let resCode = (responseValue === answer) ? 1 : 0
  //   this.feedback = (resCode === 1) ? 'CORRECT' : 'WRONG'
  //   this.feedbackColour = (resCode === 1) ? 'green' : 'violet'
  //   this.props.parentHandler(resCode)
  // }

  quizAnswerHandler(answer) {
    if (this.state.answered === 0) {
      let responseValue = event.target.value
      let resCode = (responseValue === answer) ? 1 : 0
      this.feedback = (resCode === 1) ? 'CORRECT' : 'WRONG'
      this.feedbackColour = (resCode === 1) ? 'green' : '#C33038'
      this.props.parentHandler(resCode)
      this.setState({ answered: 1 })
    } else {
      console.log('already answered that')
      }
    } 

  render() {
    const question = this.props.question
    const answer = this.props.correctAnswer
    const number = 'Q' + (this.props.id + 1) + '. '
    const color = this.props.color
    let display = (this.state.answered === 1)? 'none' : ''
    let feedbackDisplay = (this.state.answered === 0)? 'none' : ''
    let resultIndicator = this.feedback
   
    return (
      <div className='questionContainer'>
        <div className='questionNumber' style={{color: color}}>
          {number}
        </div>
        <div className='questionBody'>
          {question}
        </div>
        <div className='questionAnswers'>
          <div className='twoOptions' style={{borderLeft: `3px solid ${color}`}}>
            <button style={{display:`${display}`}} value={'True'} 
              onClick={() => this.quizAnswerHandler(answer)}>TRUE</button>
            <button style={{display:`${display}`}} value={'False'} 
              onClick={() => this.quizAnswerHandler(answer)}>FALSE</button>
            <div className='resultIndicator' style={{display:`${feedbackDisplay}`, color:this.feedbackColour}}>
              {resultIndicator}
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default Question
