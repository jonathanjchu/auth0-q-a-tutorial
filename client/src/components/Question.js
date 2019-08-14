import React, { Component } from 'react';
import axios from 'axios';
import SubmitAnswer from './SubmitAnswer';
import auth0Client from '../Auth';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: null,
    };

    this.submitAnswer = this.submitAnswer.bind(this);
  }

  async componentDidMount() {
    await this.refreshQuestion();
  }

  async refreshQuestion() {
    const { match: { params } } = this.props;
    const question = (await axios.get(`http://localhost:8081/questions/${params.questionId}`)).data.question;
    this.setState({
      question,
    });
  }

  async submitAnswer(answer) {
    await axios.post(`http://localhost:8081/questions/${this.state.question.id}/answers`, {
      answer,
    }, {
        headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
      });
    await this.refreshQuestion();
  }

  render() {
    const { question } = this.state;
    if (question === null) return <p>Loading ...</p>;
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron col-12">
            <h1 className="display-3">{question.question}</h1>
            <p className="lead">{question.details}</p>
            <p>Answers:</p>
            {
              question.answers ?
                <>
                  {
                    question.answers.map((answer, idx) => (
                      <p className="lead" key={idx}>{answer.answer}</p>
                    ))
                  }
                </>
                :
                <p>No Answers</p>
            }
            <hr className="my-4" />
            <SubmitAnswer questionId={question._id} submitAnswer={this.submitAnswer} />
          </div>
        </div>
      </div>
    )
  }
}

export default Question;