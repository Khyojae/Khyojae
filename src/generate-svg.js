/**
 * GitHub 기여 데이터를 SVG 카드로 생성
 */

// 테마 정의
const themes = {
  light: {
    background: '#ffffff',
    border: '#e4e2e2',
    title: '#2f80ed',
    text: '#333333',
    subtext: '#666666',
    repoName: '#0366d6',
    prCount: '#28a745',
    icon: '#586069'
  },
  dark: {
    background: '#0d1117',
    border: '#30363d',
    title: '#58a6ff',
    text: '#c9d1d9',
    subtext: '#8b949e',
    repoName: '#58a6ff',
    prCount: '#3fb950',
    icon: '#8b949e'
  },
  gradient: {
    background: 'url(#grad)',
    border: '#e4e2e2',
    title: '#ffffff',
    text: '#ffffff',
    subtext: 'rgba(255,255,255,0.8)',
    repoName: '#ffffff',
    prCount: '#ffd700',
    icon: 'rgba(255,255,255,0.9)'
  }
};

// PR 아이콘 SVG path
const prIcon = `<path fill-rule="evenodd" d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z"/>`;

// 레포 아이콘 SVG path
const repoIcon = `<path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"/>`;

/**
 * 날짜를 "2025.10" 형식으로 포맷
 */
function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}`;
}

/**
 * SVG 카드 생성
 */
export function generateSVG(data, options = {}) {
  const {
    theme = 'light',
    maxRepos = 6,
    width = 450,
    showTitle = true
  } = options;

  const colors = themes[theme] || themes.light;
  const repos = data.contributions.slice(0, maxRepos);

  // 높이 계산: 헤더 + 통계 + 레포 목록
  const headerHeight = showTitle ? 60 : 20;
  const statsHeight = 40;
  const repoHeight = 45;
  const padding = 20;
  const totalHeight = headerHeight + statsHeight + (repos.length * repoHeight) + padding * 2;

  // 그라데이션 정의 (gradient 테마용)
  const gradientDef = theme === 'gradient' ? `
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
      </linearGradient>
    </defs>
  ` : '';

  // 헤더 섹션
  const header = showTitle ? `
    <g transform="translate(${padding}, ${padding})">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="${colors.icon}">
        ${prIcon}
      </svg>
      <text x="24" y="13" font-family="Segoe UI, Ubuntu, Sans-Serif" font-size="14" font-weight="600" fill="${colors.title}">
        ${data.username}'s Open Source Contributions
      </text>
    </g>
  ` : '';

  // 통계 섹션
  const statsY = showTitle ? headerHeight : padding;
  const stats = `
    <g transform="translate(${padding}, ${statsY})">
      <text font-family="Segoe UI, Ubuntu, Sans-Serif" font-size="12" fill="${colors.subtext}">
        <tspan font-weight="600" fill="${colors.prCount}">${data.totalPRs}</tspan> PRs merged in
        <tspan font-weight="600" fill="${colors.text}">${data.totalRepos}</tspan> repositories
      </text>
    </g>
  `;

  // 레포 목록
  const repoListY = statsY + statsHeight;
  const repoItems = repos.map((repo, index) => {
    const y = index * repoHeight;
    const [owner, repoName] = repo.name.split('/');

    return `
      <g transform="translate(0, ${y})">
        <svg x="0" y="0" width="14" height="14" viewBox="0 0 16 16" fill="${colors.icon}">
          ${repoIcon}
        </svg>
        <text x="20" y="11" font-family="Segoe UI, Ubuntu, Sans-Serif" font-size="13" fill="${colors.repoName}" font-weight="500">
          ${owner}/<tspan font-weight="600">${repoName}</tspan>
        </text>
        <text x="${width - padding * 2 - 10}" y="11" font-family="Segoe UI, Ubuntu, Sans-Serif" font-size="12" fill="${colors.prCount}" text-anchor="end" font-weight="600">
          ${repo.prs.length} PR${repo.prs.length > 1 ? 's' : ''}
        </text>
        <text x="20" y="30" font-family="Segoe UI, Ubuntu, Sans-Serif" font-size="11" fill="${colors.subtext}">
          Latest: ${formatDate(repo.latestMerge)}${repo.prs.length > 0 ? ` · ${repo.prs[0].title.substring(0, 40)}${repo.prs[0].title.length > 40 ? '...' : ''}` : ''}
        </text>
        ${index < repos.length - 1 ? `<line x1="0" y1="42" x2="${width - padding * 2}" y2="42" stroke="${colors.border}" stroke-width="1" opacity="0.5"/>` : ''}
      </g>
    `;
  }).join('');

  const repoList = `
    <g transform="translate(${padding}, ${repoListY})">
      ${repoItems}
    </g>
  `;

  // "더 보기" 표시 (maxRepos보다 많을 경우)
  const moreText = data.contributions.length > maxRepos ? `
    <text x="${width / 2}" y="${totalHeight - 10}" font-family="Segoe UI, Ubuntu, Sans-Serif" font-size="11" fill="${colors.subtext}" text-anchor="middle">
      +${data.contributions.length - maxRepos} more repositories
    </text>
  ` : '';

  return `
<svg width="${width}" height="${totalHeight}" viewBox="0 0 ${width} ${totalHeight}" xmlns="http://www.w3.org/2000/svg">
  ${gradientDef}
  <rect width="${width}" height="${totalHeight}" fill="${colors.background}" rx="6" ry="6" stroke="${colors.border}" stroke-width="1"/>
  ${header}
  ${stats}
  ${repoList}
  ${moreText}
</svg>
  `.trim();
}

/**
 * 기여가 없을 때의 SVG
 */
export function generateEmptySVG(username, options = {}) {
  const { theme = 'light', width = 450 } = options;
  const colors = themes[theme] || themes.light;

  return `
<svg width="${width}" height="120" viewBox="0 0 ${width} 120" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="120" fill="${colors.background}" rx="6" ry="6" stroke="${colors.border}" stroke-width="1"/>
  <g transform="translate(20, 20)">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="${colors.icon}">
      ${prIcon}
    </svg>
    <text x="24" y="13" font-family="Segoe UI, Ubuntu, Sans-Serif" font-size="14" font-weight="600" fill="${colors.title}">
      ${username}'s Open Source Contributions
    </text>
  </g>
  <text x="${width / 2}" y="75" font-family="Segoe UI, Ubuntu, Sans-Serif" font-size="13" fill="${colors.subtext}" text-anchor="middle">
    No external contributions found yet.
  </text>
  <text x="${width / 2}" y="95" font-family="Segoe UI, Ubuntu, Sans-Serif" font-size="11" fill="${colors.subtext}" text-anchor="middle">
    Start contributing to open source projects!
  </text>
</svg>
  `.trim();
}
