import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { timingSafeEqual } from 'crypto';
import { isNullOrUndefined } from 'util';

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
    };
  }

  componentDidMount() {
    axios.get("http://localhost:8081/questions")
      .then(res => {
        console.log(res.data.questions);
        this.setState({ questions: res.data.questions });
      })
      .catch(err => {
        console.log(err);
      });

    // const questions = (await axios.get('http://localhost:8081/questions')).data.questions;
    // console.log(questions);
    // this.setState({
    //   questions: questions,
    // });
  }

  render() {
    if (isNullOrUndefined(this.state.questions[0])) {
      console.log(this.state.questions.length);
      console.log("question is null or undefined");
    }
    else {
      console.log(this.state.questions[0].question);
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-4 col-lg-3">
            <Link to="/questions/new">
              <div className="card text-white bg-secondary mb-3">
                <div className="card-header">Need help? Ask here!</div>
                <div className="card-body">
                  <h4 className="card-title">+ New Question</h4>
                  <p className="card-text">Don't worry. Help is on the way!</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="row">
          {
            this.state.questions.length > 0 ?
              <>
                {
                  this.state.questions.map((question, idx) =>
                    <div key={idx} className="col-sm-12 col-md-4 col-lg-3">
                      <Link to={`/questions/${question._id}`}>
                        <div className="card text-white bg-success mb-3">
                          <div className="card-header">Answers: {question.answers.length}</div>
                          <div className="card-body">
                            <h4 className="card-title">{question.question}</h4>
                            <p className="card-text">{question.details}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )
                }
              </>
              :
              <p>Loading questions...</p>
          }
        </div>
      </div>
    )
  }
}

export default Questions;