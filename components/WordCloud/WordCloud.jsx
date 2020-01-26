import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import useDimensions from 'react-use-dimensions';
import useInterval from '@use-it/interval';
import { Hashtag } from './Hashtag';

const SIMULTANEOUS_HASHTAGS = 5;
const HASHTAG_TTL = 3000;
const BASE_SIZE = 1;
const getRandomSign = () => (Math.round(Math.random()) === 0 ? -1 : 1);

export const WordCloud = ({ hashtags, className }) => {
  const [containerRef, containerDimensions] = useDimensions();
  const [baseIndex, setBaseIndex] = useState(0);
  const [currentHashtags, setCurrentHashtags] = useState([]);
  const average = useMemo(
    () => hashtags.reduce((sum, { count }) => sum + count, 0) / hashtags.length,
    [hashtags],
  );

  const updateBaseIndex = useCallback(() => setBaseIndex((currentIndex) => {
    let nextIndex = currentIndex + 1;

    if (nextIndex >= hashtags.length) {
      nextIndex -= hashtags.length;
    }

    return nextIndex;
  }), [hashtags, setBaseIndex]);
  useInterval(updateBaseIndex, HASHTAG_TTL / SIMULTANEOUS_HASHTAGS);

  const prepareHashtag = useCallback((hashtagIndex) => {
    const { hashtag, count } = hashtags[hashtagIndex];
    return {
      text: `#${hashtag}`,
      url: `https://twitter.com/search?q=${encodeURIComponent(hashtag)}&src=typed_query`,
      size: BASE_SIZE + count / average,
      initialPosition: {
        x: Math.ceil(Math.random() * containerDimensions.width),
        y: Math.ceil(Math.random() * containerDimensions.height),
      },
      translation: {
        x: 100 * getRandomSign(),
        y: 100 * getRandomSign(),
      },
    };
  }, [hashtags, average, containerDimensions]);

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
      {currentHashtags.map(({
        text,
        url,
        size,
        initialPosition,
        translation,
      }) => (
        <Hashtag
          size={size}
          initialPosition={initialPosition}
          translation={translation}
          duration={HASHTAG_TTL}
          key={text}
          href={url}
          target="_blank"
        >
          {text}
        </Hashtag>
      ))}
    </div>
  );
};

WordCloud.propTypes = {
  hashtags: PropTypes.arrayOf(PropTypes.shape({
    hashtag: PropTypes.string,
    count: PropTypes.number,
  })).isRequired,
  className: PropTypes.string,
};

WordCloud.defaultProps = {
  className: null,
};
