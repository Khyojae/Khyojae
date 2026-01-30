/**
 * GitHub 기여 데이터를 SVG 카드로 생성 (github-readme-stats 스타일)
 */

const themes = {
  light: {
    background: '#ffffff',
    border: '#e4e2e2',
    title: '#2f80ed',
    text: '#333333',
    label: '#666666',
    value: '#333333',
    repoName: '#0366d6',
    icon: '#586069',
    prCount: '#28a745'
  },
  dark: {
    background: '#1a1b27',
    border: '#38395b',
    title: '#70a5fd',
    text: '#a9b1d6',
    label: '#8b949e',
    value: '#c9d1d9',
    repoName: '#70a5fd',
    icon: '#8b949e',
    prCount: '#3fb950'
  },
  nord: {
    background: '#2e3440',
    border: '#4c566a',
    title: '#88c0d0',
    text: '#eceff4',
    label: '#d8dee9',
    value: '#eceff4',
    repoName: '#88c0d0',
    icon: '#d8dee9',
    prCount: '#a3be8c'
  },
  dracula: {
    background: '#282a36',
    border: '#6272a4',
    title: '#ff79c6',
    text: '#f8f8f2',
    label: '#6272a4',
    value: '#f8f8f2',
    repoName: '#8be9fd',
    icon: '#6272a4',
    prCount: '#50fa7b'
  },
  tokyo: {
    background: '#1a1b26',
    border: '#414868',
    title: '#7aa2f7',
    text: '#c0caf5',
    label: '#565f89',
    value: '#c0caf5',
    repoName: '#7aa2f7',
    icon: '#565f89',
    prCount: '#9ece6a'
  }
};

// 아이콘 paths
const icons = {
  pr: `<path fill-rule="evenodd" d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z"/>`,
  repo: `<path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"/>`,
  merged: `<path fill-rule="evenodd" d="M5 3.254V3.25a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5A.75.75 0 015 3.25zm2.45 1.217a.75.75 0 010 1.06l-1.97 1.97a.75.75 0 01-1.06-1.06l1.97-1.97a.75.75 0 011.06 0zm1.06 1.06a.75.75 0 011.06 0l3.97 3.97a.75.75 0 11-1.06 1.06l-3.97-3.97a.75.75 0 010-1.06z"/>`
};

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * SVG 카드 생성 - github-readme-stats 스타일
 */
export function generateSVG(data, options = {}) {
  const {
    theme = 'light',
    maxRepos = 6,
    width = 350
  } = options;

  const colors = themes[theme] || themes.light;
  const repos = data.contributions.slice(0, maxRepos);

  const paddingX = 25;
  const paddingY = 25;
  const lineHeight = 25;
  const titleHeight = 20;
  const gapAfterTitle = 15;
  const statsLines = 2;
  const gapAfterStats = 12;

  // 콘텐츠 높이 계산
  const contentHeight = titleHeight + gapAfterTitle + (statsLines * lineHeight) + gapAfterStats + (repos.length * lineHeight);
  const totalHeight = contentHeight + (paddingY * 2);

  // 내부 레이아웃 Y 좌표
  const titleY = 14;
  const statsY = titleHeight + gapAfterTitle;
  const reposY = statsY + (statsLines * lineHeight) + gapAfterStats;

  // 통계 라인
  const statsSection = `
    <g transform="translate(0, ${statsY})">
      <!-- PRs Merged -->
      <g>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="${colors.icon}">${icons.pr}</svg>
        <text x="22" y="11" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" font-size="12" fill="${colors.label}">
          PRs Merged:
        </text>
        <text x="${width - paddingX * 2}" y="11" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" font-size="12" font-weight="600" fill="${colors.value}" text-anchor="end">
          ${data.totalPRs}
        </text>
      </g>

      <!-- Repositories -->
      <g transform="translate(0, ${lineHeight})">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="${colors.icon}">${icons.repo}</svg>
        <text x="22" y="11" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" font-size="12" fill="${colors.label}">
          Repositories:
        </text>
        <text x="${width - paddingX * 2}" y="11" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" font-size="12" font-weight="600" fill="${colors.value}" text-anchor="end">
          ${data.totalRepos}
        </text>
      </g>
    </g>
  `;

  // 레포 목록
  const repoLines = repos.map((repo, index) => {
    const y = index * lineHeight;
    return `
      <g transform="translate(0, ${y})">
        <circle cx="6" cy="6" r="4" fill="${colors.prCount}" opacity="0.8"/>
        <text x="18" y="10" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" font-size="12" fill="${colors.repoName}">
          ${escapeXml(repo.name)}
        </text>
        <text x="${width - paddingX * 2}" y="10" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" font-size="12" fill="${colors.prCount}" text-anchor="end" font-weight="600">
          ${repo.prs.length} PR${repo.prs.length > 1 ? 's' : ''}
        </text>
      </g>
    `;
  }).join('');

  const repoSection = `
    <g transform="translate(0, ${reposY})">
      ${repoLines}
    </g>
  `;

  return `
<svg width="${width}" height="${totalHeight}" viewBox="0 0 ${width} ${totalHeight}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${totalHeight}" fill="${colors.background}" rx="6" stroke="${colors.border}" stroke-width="1"/>

  <!-- Content (vertically centered) -->
  <g transform="translate(${paddingX}, ${paddingY})">
    <!-- Title -->
    <text y="${titleY}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" font-size="14" font-weight="600" fill="${colors.title}">
      ${escapeXml(data.username)}'s OSS Contributions
    </text>

    ${statsSection}
    ${repoSection}
  </g>
</svg>
  `.trim();
}

/**
 * 기여가 없을 때의 SVG
 */
export function generateEmptySVG(username, options = {}) {
  const { theme = 'light', width = 350 } = options;
  const colors = themes[theme] || themes.light;

  return `
<svg width="${width}" height="100" viewBox="0 0 ${width} 100" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="100" fill="${colors.background}" rx="6" stroke="${colors.border}" stroke-width="1"/>
  <text x="20" y="30" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" font-size="14" font-weight="600" fill="${colors.title}">
    ${escapeXml(username)}'s OSS Contributions
  </text>
  <text x="${width / 2}" y="65" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" font-size="12" fill="${colors.label}" text-anchor="middle">
    No external contributions yet
  </text>
</svg>
  `.trim();
}
