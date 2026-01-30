/**
 * GitHub 기여 데이터를 SVG 카드로 생성 (Premium Design)
 */

// 테마 정의 - 더 세련된 색상
const themes = {
  light: {
    background: '#ffffff',
    cardBg: '#f6f8fa',
    border: '#e1e4e8',
    title: '#24292f',
    titleAccent: '#0969da',
    text: '#24292f',
    subtext: '#57606a',
    repoName: '#0969da',
    owner: '#57606a',
    prBadgeBg: '#dafbe1',
    prBadgeText: '#1a7f37',
    statBg: '#f0f3f6',
    statText: '#24292f',
    statLabel: '#57606a',
    icon: '#57606a',
    divider: '#d0d7de'
  },
  dark: {
    background: '#0d1117',
    cardBg: '#161b22',
    border: '#30363d',
    title: '#e6edf3',
    titleAccent: '#58a6ff',
    text: '#e6edf3',
    subtext: '#8b949e',
    repoName: '#58a6ff',
    owner: '#8b949e',
    prBadgeBg: '#238636',
    prBadgeText: '#ffffff',
    statBg: '#21262d',
    statText: '#e6edf3',
    statLabel: '#8b949e',
    icon: '#8b949e',
    divider: '#30363d'
  },
  nord: {
    background: '#2e3440',
    cardBg: '#3b4252',
    border: '#4c566a',
    title: '#eceff4',
    titleAccent: '#88c0d0',
    text: '#eceff4',
    subtext: '#d8dee9',
    repoName: '#88c0d0',
    owner: '#d8dee9',
    prBadgeBg: '#a3be8c',
    prBadgeText: '#2e3440',
    statBg: '#434c5e',
    statText: '#eceff4',
    statLabel: '#d8dee9',
    icon: '#d8dee9',
    divider: '#4c566a'
  },
  dracula: {
    background: '#282a36',
    cardBg: '#44475a',
    border: '#6272a4',
    title: '#f8f8f2',
    titleAccent: '#bd93f9',
    text: '#f8f8f2',
    subtext: '#6272a4',
    repoName: '#8be9fd',
    owner: '#6272a4',
    prBadgeBg: '#50fa7b',
    prBadgeText: '#282a36',
    statBg: '#44475a',
    statText: '#f8f8f2',
    statLabel: '#6272a4',
    icon: '#6272a4',
    divider: '#6272a4'
  },
  tokyo: {
    background: '#1a1b26',
    cardBg: '#24283b',
    border: '#414868',
    title: '#c0caf5',
    titleAccent: '#7aa2f7',
    text: '#c0caf5',
    subtext: '#565f89',
    repoName: '#7aa2f7',
    owner: '#565f89',
    prBadgeBg: '#9ece6a',
    prBadgeText: '#1a1b26',
    statBg: '#1f2335',
    statText: '#c0caf5',
    statLabel: '#565f89',
    icon: '#565f89',
    divider: '#414868'
  }
};

// 아이콘 paths
const icons = {
  pr: `<path fill-rule="evenodd" d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z"/>`,
  repo: `<path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"/>`,
  merged: `<path fill-rule="evenodd" d="M5 3.254V3.25a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5A.75.75 0 015 3.25zm0 5.5a.75.75 0 01.75-.75h5.5a.75.75 0 010 1.5h-5.5a.75.75 0 01-.75-.75zm0 5.5a.75.75 0 01.75-.75h5.5a.75.75 0 010 1.5h-5.5a.75.75 0 01-.75-.75z"/>`,
  check: `<path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/>`
};

function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function truncate(str, maxLen) {
  if (str.length <= maxLen) return str;
  return str.substring(0, maxLen - 3) + '...';
}

/**
 * SVG 카드 생성 - Premium Design
 */
export function generateSVG(data, options = {}) {
  const {
    theme = 'light',
    maxRepos = 5,
    width = 495,
    showTitle = true,
    showAnimation = true,
    compact = false
  } = options;

  const colors = themes[theme] || themes.light;
  const repos = data.contributions.slice(0, maxRepos);
  const padding = 25;
  const cardPadding = 16;

  // 높이 계산
  const headerHeight = showTitle ? 70 : 10;
  const statsHeight = 50;
  const repoCardHeight = compact ? 50 : 70;
  const repoGap = 12;
  const footerHeight = data.contributions.length > maxRepos ? 35 : 15;
  const totalHeight = headerHeight + statsHeight + (repos.length * (repoCardHeight + repoGap)) + footerHeight + padding;

  // 애니메이션 스타일
  const animationStyle = showAnimation ? `
    <style>
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .repo-card {
        animation: fadeIn 0.5s ease-out forwards;
        opacity: 0;
      }
      ${repos.map((_, i) => `.repo-card-${i} { animation-delay: ${0.1 + i * 0.1}s; }`).join('\n      ')}
    </style>
  ` : '';

  // 헤더
  const header = showTitle ? `
    <g transform="translate(${padding}, ${padding})">
      <text font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
            font-size="18" font-weight="600" fill="${colors.title}">
        <tspan fill="${colors.titleAccent}">@${escapeXml(data.username)}</tspan>'s OSS Contributions
      </text>
      <text y="28" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
            font-size="12" fill="${colors.subtext}">
        Merged pull requests to external repositories
      </text>
    </g>
  ` : '';

  // 통계 뱃지
  const statsY = headerHeight;
  const stats = `
    <g transform="translate(${padding}, ${statsY})">
      <!-- Total PRs Badge -->
      <g>
        <rect width="100" height="36" rx="8" fill="${colors.statBg}"/>
        <text x="50" y="15" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
              font-size="16" font-weight="700" fill="${colors.statText}" text-anchor="middle">
          ${data.totalPRs}
        </text>
        <text x="50" y="28" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
              font-size="10" fill="${colors.statLabel}" text-anchor="middle">
          PRs Merged
        </text>
      </g>

      <!-- Total Repos Badge -->
      <g transform="translate(115, 0)">
        <rect width="100" height="36" rx="8" fill="${colors.statBg}"/>
        <text x="50" y="15" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
              font-size="16" font-weight="700" fill="${colors.statText}" text-anchor="middle">
          ${data.totalRepos}
        </text>
        <text x="50" y="28" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
              font-size="10" fill="${colors.statLabel}" text-anchor="middle">
          Repositories
        </text>
      </g>
    </g>
  `;

  // 레포지토리 카드 목록
  const repoListY = statsY + statsHeight + 10;
  const repoCards = repos.map((repo, index) => {
    const y = index * (repoCardHeight + repoGap);
    const [owner, repoName] = repo.name.split('/');
    const prTitle = repo.prs[0]?.title || '';
    const cardWidth = width - padding * 2;

    if (compact) {
      return `
        <g class="repo-card repo-card-${index}" transform="translate(0, ${y})">
          <rect width="${cardWidth}" height="${repoCardHeight}" rx="8" fill="${colors.cardBg}" stroke="${colors.border}" stroke-width="1"/>
          <g transform="translate(${cardPadding}, ${cardPadding})">
            <!-- Repo Icon -->
            <svg x="0" y="1" width="14" height="14" viewBox="0 0 16 16" fill="${colors.icon}">${icons.repo}</svg>

            <!-- Repo Name -->
            <text x="20" y="12" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" font-size="13">
              <tspan fill="${colors.owner}">${escapeXml(owner)}/</tspan><tspan fill="${colors.repoName}" font-weight="600">${escapeXml(repoName)}</tspan>
            </text>

            <!-- PR Badge -->
            <g transform="translate(${cardWidth - cardPadding * 2 - 55}, -2)">
              <rect width="50" height="22" rx="11" fill="${colors.prBadgeBg}"/>
              <svg x="8" y="4" width="12" height="12" viewBox="0 0 16 16" fill="${colors.prBadgeText}">${icons.pr}</svg>
              <text x="36" y="15" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
                    font-size="12" font-weight="600" fill="${colors.prBadgeText}" text-anchor="middle">
                ${repo.prs.length}
              </text>
            </g>
          </g>
        </g>
      `;
    }

    return `
      <g class="repo-card repo-card-${index}" transform="translate(0, ${y})">
        <rect width="${cardWidth}" height="${repoCardHeight}" rx="10" fill="${colors.cardBg}" stroke="${colors.border}" stroke-width="1"/>
        <g transform="translate(${cardPadding}, ${cardPadding})">
          <!-- Repo Icon -->
          <svg x="0" y="2" width="16" height="16" viewBox="0 0 16 16" fill="${colors.icon}">${icons.repo}</svg>

          <!-- Repo Name -->
          <text x="24" y="14" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" font-size="14">
            <tspan fill="${colors.owner}">${escapeXml(owner)}/</tspan><tspan fill="${colors.repoName}" font-weight="600">${escapeXml(repoName)}</tspan>
          </text>

          <!-- PR Badge -->
          <g transform="translate(${cardWidth - cardPadding * 2 - 60}, 0)">
            <rect width="55" height="24" rx="12" fill="${colors.prBadgeBg}"/>
            <svg x="10" y="5" width="14" height="14" viewBox="0 0 16 16" fill="${colors.prBadgeText}">${icons.pr}</svg>
            <text x="40" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
                  font-size="12" font-weight="600" fill="${colors.prBadgeText}" text-anchor="middle">
              ${repo.prs.length}
            </text>
          </g>

          <!-- Latest PR Title -->
          <text x="24" y="36" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
                font-size="11" fill="${colors.subtext}">
            ${escapeXml(truncate(prTitle, 50))}
          </text>

          <!-- Date -->
          <text x="24" y="52" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
                font-size="10" fill="${colors.subtext}" opacity="0.7">
            ${formatDate(repo.latestMerge)}
          </text>
        </g>
      </g>
    `;
  }).join('');

  const repoList = `
    <g transform="translate(${padding}, ${repoListY})">
      ${repoCards}
    </g>
  `;

  // 더 보기 푸터
  const moreCount = data.contributions.length - maxRepos;
  const footer = moreCount > 0 ? `
    <text x="${width / 2}" y="${totalHeight - 15}"
          font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
          font-size="11" fill="${colors.subtext}" text-anchor="middle" opacity="0.8">
      + ${moreCount} more ${moreCount === 1 ? 'repository' : 'repositories'}
    </text>
  ` : '';

  return `
<svg width="${width}" height="${totalHeight}" viewBox="0 0 ${width} ${totalHeight}" xmlns="http://www.w3.org/2000/svg">
  ${animationStyle}
  <rect width="${width}" height="${totalHeight}" fill="${colors.background}" rx="12"/>
  ${header}
  ${stats}
  ${repoList}
  ${footer}
</svg>
  `.trim();
}

/**
 * 기여가 없을 때의 SVG
 */
export function generateEmptySVG(username, options = {}) {
  const { theme = 'light', width = 495 } = options;
  const colors = themes[theme] || themes.light;

  return `
<svg width="${width}" height="150" viewBox="0 0 ${width} 150" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="150" fill="${colors.background}" rx="12"/>
  <g transform="translate(25, 25)">
    <text font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
          font-size="18" font-weight="600" fill="${colors.title}">
      <tspan fill="${colors.titleAccent}">@${escapeXml(username)}</tspan>'s OSS Contributions
    </text>
  </g>
  <g transform="translate(${width / 2}, 85)">
    <svg x="-20" y="-20" width="40" height="40" viewBox="0 0 16 16" fill="${colors.icon}" opacity="0.5">
      ${icons.pr}
    </svg>
  </g>
  <text x="${width / 2}" y="115" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
        font-size="13" fill="${colors.subtext}" text-anchor="middle">
    No external contributions yet
  </text>
  <text x="${width / 2}" y="135" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
        font-size="11" fill="${colors.subtext}" text-anchor="middle" opacity="0.7">
    Start contributing to open source!
  </text>
</svg>
  `.trim();
}
