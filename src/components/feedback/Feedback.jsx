import { Component } from 'react';

import Section from 'components/section/Section';
import FeedbackOptions from 'components/feedbackOptions/FeedbackOptions';
import Statistics from 'components/statistics/Statistics';
import Notification from 'components/notification/Notification';

import styles from './feedback.module.css';

class Feedback extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  handleIncrement = (property) => {
    this.setState(prevState => {
      return {
        [property]: prevState[property] + 1,
      };
    });
    this.countTotalFeedback();
    this.countPositiveFeedbackPercentage();
  };

  countTotalFeedback() {
    const total = this.state.good + this.state.neutral + this.state.bad;
    return total;
  }

  countPositiveFeedbackPercentage() {
    const positivePerc = Math.round(
      (this.state.good / this.countTotalFeedback()) * 100
    );
    return positivePerc;
  }

  render() {
    const { good, neutral, bad } = this.state;

    return (
      <div className={styles.mainContainer}>
        <Section title={'Please leave feedback'}>
          <FeedbackOptions
            options={Object.keys(this.state)}
            onLeaveFeedback={this.handleIncrement}
          />
        </Section>
        <Section title={'Statistics'}>
          {this.countTotalFeedback() ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={this.countTotalFeedback()}
              positivePercentage={this.countPositiveFeedbackPercentage()}
            />
          ) : (
            <Notification
              message={'There is no feedback'}
              // totalRating={this.countTotalFeedback()}
            />
          )}
        </Section>
      </div>
    );
  }
}

export default Feedback;
