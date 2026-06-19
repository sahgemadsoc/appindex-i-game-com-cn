// assets/content-map.js

const contentConfig = {
  siteUrl: "https://appindex-i-game.com.cn",
  primaryTag: "爱游戏",
  sections: [
    {
      id: "home",
      title: "首页推荐",
      tags: ["爱游戏", "热门", "精选", "手游"],
      items: [
        { name: "幻想冒险", slug: "fantasy-adventure", keywords: ["rpg", "冒险", "幻想"] },
        { name: "极速赛车", slug: "speed-racing", keywords: ["竞速", "赛车", "爱游戏"] },
        { name: "欢乐消除", slug: "happy-match", keywords: ["消除", "休闲", "益智"] }
      ]
    },
    {
      id: "strategy",
      title: "策略塔防",
      tags: ["爱游戏", "策略", "塔防"],
      items: [
        { name: "王国保卫战", slug: "kingdom-defense", keywords: ["塔防", "策略", "中世纪"] },
        { name: "星际指挥官", slug: "star-commander", keywords: ["科幻", "策略", "宇宙"] }
      ]
    },
    {
      id: "puzzle",
      title: "益智解谜",
      tags: ["益智", "解谜", "爱游戏"],
      items: [
        { name: "逃脱密室", slug: "escape-room", keywords: ["解谜", "逃脱", "密室"] },
        { name: "数独大师", slug: "sudoku-master", keywords: ["数独", "数学", "逻辑"] }
      ]
    }
  ]
};

function filterByKeyword(items, keyword) {
  if (!keyword || keyword.trim() === "") return items;
  const lowerKeyword = keyword.toLowerCase().trim();
  return items.filter(item => {
    const nameMatch = item.name.toLowerCase().includes(lowerKeyword);
    const keywordMatch = item.keywords.some(k => k.toLowerCase().includes(lowerKeyword));
    return nameMatch || keywordMatch;
  });
}

function getSectionsByTag(tag) {
  if (!tag || tag.trim() === "") return contentConfig.sections;
  const lowerTag = tag.toLowerCase().trim();
  return contentConfig.sections.filter(section =>
    section.tags.some(t => t.toLowerCase().includes(lowerTag))
  );
}

function searchContent(query) {
  const results = [];
  const lowerQuery = query.toLowerCase().trim();
  contentConfig.sections.forEach(section => {
    const matchedItems = section.items.filter(item => {
      const nameMatch = item.name.toLowerCase().includes(lowerQuery);
      const keywordMatch = item.keywords.some(k => k.toLowerCase().includes(lowerQuery));
      const tagMatch = section.tags.some(t => t.toLowerCase().includes(lowerQuery));
      return nameMatch || keywordMatch || tagMatch;
    });
    if (matchedItems.length > 0) {
      results.push({
        sectionId: section.id,
        sectionTitle: section.title,
        items: matchedItems
      });
    }
  });
  return results;
}

function getSiteInfo() {
  return {
    url: contentConfig.siteUrl,
    primaryTag: contentConfig.primaryTag,
    totalSections: contentConfig.sections.length,
    totalItems: contentConfig.sections.reduce((acc, sec) => acc + sec.items.length, 0)
  };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    contentConfig,
    filterByKeyword,
    getSectionsByTag,
    searchContent,
    getSiteInfo
  };
}