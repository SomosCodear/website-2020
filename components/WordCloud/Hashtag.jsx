import styled, { keyframes } from 'styled-components';

const hashtagAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translate(0, 0);
  }

  20% {
    opacity: 1;
  }

  80% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: translate(var(--xTranslation), var(--yTranslation));
  }
`;

export const Hashtag = styled.span`
  --xTranslation: ${({ translation: { x } }) => x}px;
  --yTranslation: ${({ translation: { y } }) => y}px;
  animation: ${hashtagAnimation} linear ${({ duration }) => duration}ms forwards;
  position: absolute;
  left: ${({ initialPosition: { x } }) => x}px;
  top: ${({ initialPosition: { y } }) => y}px;
`;
