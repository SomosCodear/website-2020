import styled, { keyframes } from 'styled-components';
import { transparentize } from 'polished'
import { COLORS } from '../../style/constants';

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

export const Hashtag = styled.a`
  --xTranslation: ${({ translation: { x } }) => x}px;
  --yTranslation: ${({ translation: { y } }) => y}px;
  animation: ${hashtagAnimation} linear ${({ duration }) => duration}ms forwards;
  position: absolute;
  left: ${({ initialPosition: { x } }) => x}px;
  top: ${({ initialPosition: { y } }) => y}px;
  font-size: ${({ size }) => size}rem;
  font-weight: 100;
  color: ${transparentize(0.7, COLORS.lilac.text)};
  text-decoration: none;

  &:hover {
  color: ${transparentize(0.3, COLORS.lilac.text)};
  }
`;
