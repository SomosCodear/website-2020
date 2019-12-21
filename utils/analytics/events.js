import {
  ANALYTICS_CATEGORIES,
  ANALYTICS_EVENTS,
  ANALYTICS_LABELS,
} from '../../data/constants';

export const initializeEvents = (ga) => ({
  trackClickedCodear() {
    ga.event({
      category: ANALYTICS_CATEGORIES.navigation,
      action: ANALYTICS_EVENTS.navigation.visitedCodearHomepage,
    });

    ga.outboundLink({
      label: ANALYTICS_LABELS.clickedOnCodearLogo,
    });
  },

  trackClickedCoC() {
    ga.event({
      category: ANALYTICS_CATEGORIES.navigation,
      action: ANALYTICS_EVENTS.navigation.visitedCodearCoC,
    });

    ga.outboundLink({
      label: ANALYTICS_LABELS.clickedOnCoCLink,
    });
  },

  trackClickedTwitter() {
    ga.event({
      category: ANALYTICS_CATEGORIES.socialMedia,
      action: ANALYTICS_EVENTS.socialMedia.visitedTwitter,
    });

    ga.outboundLink({
      label: ANALYTICS_LABELS.clickedOnTwitterLink,
    });
  },

  trackClickedInstagram() {
    ga.event({
      category: ANALYTICS_CATEGORIES.socialMedia,
      action: ANALYTICS_EVENTS.socialMedia.visitedInstagram,
    });

    ga.outboundLink({
      label: ANALYTICS_LABELS.clickedOnInstagramLink,
    });
  },

  trackClickedParticipateAboveTheFold() {
    ga.event({
      category: ANALYTICS_CATEGORIES.cfp,
      event: ANALYTICS_EVENTS.cfp.enteredForm,
      label: 'Above the fold',
    });

    ga.outboundLink({
      label: ANALYTICS_LABELS.clickedOnCFPSubmitButton,
    });
  },

  trackClickedParticipateBelowTheFold() {
    ga.event({
      category: ANALYTICS_CATEGORIES.cfp,
      event: ANALYTICS_EVENTS.cfp.enteredForm,
      label: 'Below the fold',
    });

    ga.outboundLink({
      label: ANALYTICS_LABELS.clickedOnCFPSubmitButton,
    });
  },
});
