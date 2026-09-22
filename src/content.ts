import contentData from './content.json';

export interface BannerOption {
  id: string;
  badge: string;
  message: string;
}

export interface SheetIntroConfig {
  intro: string;
  attribution: string;
  curatorName: string;
  badgeText: string;
}

export interface GetPlacedContent {
  brand: {
    name: string;
    shortName: string;
    primaryTagline: string;
    alternativeTaglines: string[];
    footer: {
      copyright: string;
      disclaimer: string;
    };
    seo: {
      defaultTitle: string;
      sheetTitleTemplate: string;
      metaDescription: string;
      keywords: string[];
    };
  };
  topBanner: {
    defaultActiveOption: string;
    options: Record<string, BannerOption>;
  };
  navigation: {
    groups: Record<string, { key: string; options: string[]; activeLabel: string }>;
    items: Record<string, { label: string; description: string }>;
  };
  sheetIntros: {
    platformGeneralIntro: string;
    sheets: Record<string, SheetIntroConfig>;
  };
  rewrittenBracketedTopics: Record<string, string>;
  microcopy: {
    progressStates: {
      zeroPercent: { headline: string; subline: string };
      inProgress: { headline: string; subline: string };
      hundredPercent: { headline: string; subline: string };
    };
    checkbox: {
      markDone: string;
      markUndone: string;
      solvedToast: string;
    };
    toggles: {
      readMore: string;
      readLess: string;
      expandTopic: string;
      collapseTopic: string;
      expandAll: string;
      collapseAll: string;
    };
    modalsAndActions: Record<string, string>;
    stats: Record<string, string>;
    filters: Record<string, string>;
  };
}

export const content: GetPlacedContent = contentData as GetPlacedContent;

/**
 * Utility function to translate a raw topic name into the original GetPlaced rewritten title
 * if a bracketed description rewrite is registered.
 */
export function getRewrittenTopicTitle(rawTopic: string): string {
  if (!rawTopic) return '';
  return content.rewrittenBracketedTopics[rawTopic] || rawTopic;
}

/**
 * Utility function to retrieve the sheet intro, attribution, and badge metadata by slug.
 */
export function getSheetMeta(sheetSlug: string): SheetIntroConfig | null {
  return content.sheetIntros.sheets[sheetSlug] || null;
}

export default content;
