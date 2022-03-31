import { useState, useCallback } from 'react';

import Section from 'components/section/Section';
import FeedbackOptions from 'components/feedbackOptions/FeedbackOptions';
import Statistics from 'components/statistics/Statistics';
import Notification from 'components/notification/Notification';

import styles from './feedback.module.css';

const initialState = {
  good: 0,
  neutral: 0,
  bad: 0,
};

function Feedback() {
  const [counter, setCounter] = useState(initialState);

  const handleIncrement = useCallback(prop => {
    setCounter(prevState => {
      return {
        ...counter,
        [prop]: prevState[prop] + 1,
      };
    });
  }, []);

  const countTotalFeedback = () => {
    const total = counter.good + counter.neutral + counter.bad;
    return total;
  };

  const countPositivePercentage = () => {
    const positivePerc = Math.round(
      (counter.good / countTotalFeedback()) * 100
    );
    return positivePerc;
  };

  return (
    <div className={styles.mainContainer}>
      <Section title={'Please leave feedback'}>
        <FeedbackOptions
          options={Object.keys(counter)}
          onLeaveFeedback={handleIncrement}
        />
      </Section>
      <Section title={'Statistics'}>
        {countTotalFeedback() ? (
          <Statistics
            good={counter.good}
            neutral={counter.neutral}
            bad={counter.bad}
            total={countTotalFeedback()}
            positivePercentage={countPositivePercentage()}
          />
        ) : (
          <Notification message={'There is no feedback'} />
        )}
      </Section>
    </div>
  );
}

export default Feedback;
