import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import useDimensions from 'react-use-dimensions';
import useInterval from '@use-it/interval';
import { Hashtag } from './Hashtag';

const hashtags = [
  { text: '#frontend', size: 'l' },
  { text: '#frameworks', size: 'm' },
  { text: '#accesibilidad', size: 'l' },
  { text: '#backend', size: 's' },
  { text: '#nodejs', size: 'l' },
  { text: '#javascript', size: 'm' },
  { text: '#design', size: 's' },
  { text: '#webcomponents', size: 'l' },
];

const SIMULTANEOUS_HASHTAGS = 5;
const HASHTAG_TTL = 3000;
const getRandomSign = () => (Math.round(Math.random()) === 0 ? -1 : 1);

export const WordCloud = ({ className }) => {
  const [containerRef, containerDimensions] = useDimensions();
  const [baseIndex, setBaseIndex] = useState(0);
  const [currentHashtags, setCurrentHashtags] = useState([]);

  const updateBaseIndex = useCallback(() => setBaseIndex((currentIndex) => {
    let nextIndex = currentIndex + 1;

    if (nextIndex >= hashtags.length) {
      nextIndex -= hashtags.length;
    }

    return nextIndex;
  }), [setBaseIndex]);
  useInterval(updateBaseIndex, HASHTAG_TTL / SIMULTANEOUS_HASHTAGS);

  const prepareHashtag = useCallback((hashtagIndex) => {
    const { text } = hashtags[hashtagIndex];

    return {
      text,
      initialPosition: {
        x: Math.ceil(Math.random() * containerDimensions.width),
        y: Math.ceil(Math.random() * containerDimensions.height),
      },
      translation: {
        x: 100 * getRandomSign(),
        y: 100 * getRandomSign(),
      },
    };
  }, [containerDimensions]);

  // clear hashtags when container dimensions change
  useEffect(() => {
    setCurrentHashtags([]);
    setBaseIndex(0);
  }, [containerDimensions, setCurrentHashtags, setBaseIndex]);

  useEffect(() => setCurrentHashtags((existingHashtags) => {
    let newHashtags = [prepareHashtag(baseIndex), ...existingHashtags];
    newHashtags = newHashtags.slice(0, SIMULTANEOUS_HASHTAGS);

    return newHashtags;
  }), [baseIndex, setCurrentHashtags, prepareHashtag]);

  return (
    <div className={className} ref={containerRef}>
      {currentHashtags.map(({ text, initialPosition, translation }) => (
        <Hashtag
          initialPosition={initialPosition}
          translation={translation}
          duration={HASHTAG_TTL}
          key={text}
        >
          {text}
        </Hashtag>
      ))}
    </div>
  );
};

WordCloud.propTypes = {
  className: PropTypes.string,
};

WordCloud.defaultProps = {
  className: null,
};
