import ga from 'react-ga';
import {
  ANALYTICS_ID,
  ANALYTICS_CATEGORIES,
  ANALYTICS_EVENTS,
  ANALYTICS_LABELS,
} from '../../data/constants';

ga.initialize(process.env.NODE_ENV === 'production' ? ANALYTICS_ID : '');

export function trackClickedCodear() {
  ga.event({
    category: ANALYTICS_CATEGORIES.navigation,
    action: ANALYTICS_EVENTS.navigation.visitedCodearHomepage,
  });

  ga.outboundLink({
    label: ANALYTICS_LABELS.clickedOnCodearLogo,
  });
}

export function trackClickedCoC() {
  ga.event({
    category: ANALYTICS_CATEGORIES.navigation,
    action: ANALYTICS_EVENTS.navigation.visitedCodearCoC,
  });

  ga.outboundLink({
    label: ANALYTICS_LABELS.clickedOnCoCLink,
  });
}

export function trackClickedTwitter() {
  ga.event({
    category: ANALYTICS_CATEGORIES.socialMedia,
    action: ANALYTICS_EVENTS.socialMedia.visitedTwitter,
  });

  ga.outboundLink({
    label: ANALYTICS_LABELS.clickedOnTwitterLink,
  });
}

export function trackClickedInstagram() {
  ga.event({
    category: ANALYTICS_CATEGORIES.socialMedia,
    action: ANALYTICS_EVENTS.socialMedia.visitedInstagram,
  });

  ga.outboundLink({
    label: ANALYTICS_LABELS.clickedOnInstagramLink,
  });
}

export function trackClickedParticipateAboveTheFold() {
  ga.event({
    category: ANALYTICS_CATEGORIES.cfp,
    event: ANALYTICS_EVENTS.cfp.enteredForm,
    label: 'Above the fold',
  });

  ga.outboundLink({
    label: ANALYTICS_LABELS.clickedOnCFPSubmitButton,
  });
}

export function trackClickedParticipateBelowTheFold() {
  ga.event({
    category: ANALYTICS_CATEGORIES.cfp,
    event: ANALYTICS_EVENTS.cfp.enteredForm,
    label: 'Below the fold',
  });

  ga.outboundLink({
    label: ANALYTICS_LABELS.clickedOnCFPSubmitButton,
  });
}
