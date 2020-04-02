import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { EVENT_DATE } from '../data/constants';
import { BREAKPOINTS } from '../style/constants';

const padNumber = (n) => String(n).padStart(2, '0');

const calculateTimeLeft = () => {
  const timeUntilEvent = moment.duration(moment(EVENT_DATE).diff(moment()));
  const days = Math.trunc(timeUntilEvent.asDays());
  const hours = Math.trunc(timeUntilEvent.subtract(days, 'days').asHours());
  const minutes = Math.trunc(timeUntilEvent.subtract(hours, 'hours').asMinutes());
  const seconds = Math.trunc(timeUntilEvent.subtract(minutes, 'minutes').asSeconds());

  return {
    days: padNumber(days),
    hours: padNumber(hours),
    minutes: padNumber(minutes),
    seconds: padNumber(seconds),
  };
};

const TimerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-align: center;
  font-size: 2rem;
  font-weight: 300;
  color: var(--color-text);
  text-transform: uppercase;
`;

const TimerComponent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  text-shadow: 0px 0px 10px #000;

  p {
    margin: 0;
    font-size: 1rem;
    font-weight: 400;
    text-shadow: 0px 0px 2px #000, 0px 0px 2px #000;
  }

  @media (min-width: ${BREAKPOINTS.hd}) {
    font-size: 6.25rem;
  }
`;


export const EventCountdown = () => {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());

    const id = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(id);
  }, [setTimeLeft]);

  return timeLeft != null ? (
    <TimerContainer>
      <TimerComponent>
        {timeLeft.days}
        <p>días</p>
      </TimerComponent>
      <TimerComponent>
        {timeLeft.hours}
        <p>horas</p>
      </TimerComponent>
      <TimerComponent>
        {timeLeft.minutes}
        <p>minutos</p>
      </TimerComponent>
      <TimerComponent>
        {timeLeft.seconds}
        <p>segundos</p>
      </TimerComponent>
    </TimerContainer>

  ) : null;
};
