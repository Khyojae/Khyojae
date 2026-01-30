/**
 * GitHub 기여 데이터를 SVG 카드로 생성
 *
 * @source https://github.com/dbwls99706/oss-contribution-card
 */

const themes = {
  light: {
    bgGradient: ['#e8f4fc', '#f0e6fa'],
    cardBg: '#1e2130',
    cardBorder: '#2a2f45',
    title: '#1a1a2e',
    subtitle: '#22c55e',
    cardTitle: '#ffffff',
    cardText: '#a0a3b1',
    badge: '#22c55e',
    badgeText: '#ffffff',
    date: '#6b7280',
    dateIcon: '#22c55e',
    credit: '#9ca3af'
  },
  dark: {
    bgGradient: ['#1a1b26', '#24283b'],
    cardBg: '#2d3348',
    cardBorder: '#414868',
    title: '#c0caf5',
    subtitle: '#9ece6a',
    cardTitle: '#c0caf5',
    cardText: '#565f89',
    badge: '#9ece6a',
    badgeText: '#1a1b26',
    date: '#565f89',
    dateIcon: '#9ece6a',
    credit: '#565f89'
  }
};

const icons = {
  check: `<path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd"/>`,
  github: `<path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>`,
  home: `<path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>`
};

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function truncate(str, len) {
  if (!str) return '';
  return str.length > len ? str.substring(0, len) + '...' : str;
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

/**
 * SVG 카드 생성 - 카드 그리드 스타일
 */
export function generateSVG(data, options = {}) {
  const {
    theme = 'light',
    maxRepos = 4,
    width = 480
  } = options;

  const colors = themes[theme] || themes.light;

  // PR 단위로 펼치기 (레포별이 아닌 PR별로)
  const allPRs = [];
  for (const repo of data.contributions) {
    for (const pr of repo.prs) {
      allPRs.push({
        repoName: repo.name,
        ...pr
      });
    }
  }
  const prs = allPRs.slice(0, maxRepos);

  // 그리드 설정
  const cols = 2;
  const rows = Math.ceil(prs.length / cols);
  const cardWidth = 200;
  const cardHeight = 100;
  const cardGap = 16;
  const padding = 30;

  // 헤더 높이
  const headerHeight = 80;

  // 전체 높이 계산
  const gridHeight = rows * cardHeight + (rows - 1) * cardGap;
  const totalHeight = headerHeight + gridHeight + padding * 2;

  // 그라데이션 배경
  const background = `
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${colors.bgGradient[0]}"/>
        <stop offset="100%" style="stop-color:${colors.bgGradient[1]}"/>
      </linearGradient>
    </defs>
    <rect width="${width}" height="${totalHeight}" fill="url(#bgGrad)" rx="16"/>
  `;

  // 헤더
  const header = `
    <g transform="translate(${padding}, ${padding})">
      <text font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" font-size="22" font-weight="700" fill="${colors.title}">
        Open-Source Contributions
      </text>
      <g transform="translate(0, 35)">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="${colors.subtitle}">${icons.check}</svg>
        <text x="26" y="15" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" font-size="14" font-weight="600" fill="${colors.subtitle}">
          ${data.totalPRs} PR${data.totalPRs > 1 ? 's' : ''} Merged
        </text>
      </g>
    </g>
  `;

  // 카드 생성
  const cards = prs.map((pr, index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    const x = padding + col * (cardWidth + cardGap);
    const y = headerHeight + padding + row * (cardHeight + cardGap);

    return `
      <g transform="translate(${x}, ${y})">
        <!-- Card Background -->
        <rect width="${cardWidth}" height="${cardHeight}" rx="12" fill="${colors.cardBg}"/>

        <!-- GitHub Icon -->
        <g transform="translate(14, 14)">
          <circle cx="14" cy="14" r="14" fill="#2d3348"/>
          <svg x="6" y="6" width="16" height="16" viewBox="0 0 16 16" fill="#ffffff">${icons.github}</svg>
        </g>

        <!-- Repo Name -->
        <text x="50" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" font-size="12" font-weight="600" fill="${colors.cardTitle}">
          ${escapeXml(truncate(pr.repoName, 18))}
        </text>

        <!-- PR Title -->
        <text x="50" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" font-size="10" fill="${colors.cardText}">
          ${escapeXml(truncate(pr.title, 22))}
        </text>

        <!-- Merged Badge -->
        <g transform="translate(14, 55)">
          <rect width="58" height="18" rx="4" fill="${colors.badge}"/>
          <text x="29" y="13" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" font-size="10" font-weight="600" fill="${colors.badgeText}" text-anchor="middle">
            ✓ Merged
          </text>
        </g>

        <!-- Date -->
        <g transform="translate(14, 78)">
          <svg width="12" height="12" viewBox="0 0 20 20" fill="${colors.dateIcon}">${icons.home}</svg>
          <text x="16" y="10" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" font-size="9" fill="${colors.date}">
            Merged on ${formatDate(pr.mergedAt)}
          </text>
        </g>
      </g>
    `;
  }).join('');

  return `
<svg width="${width}" height="${totalHeight}" viewBox="0 0 ${width} ${totalHeight}" xmlns="http://www.w3.org/2000/svg">
  ${background}
  ${header}
  ${cards}
</svg>
  `.trim();
}

/**
 * 기여가 없을 때의 SVG
 */
export function generateEmptySVG(username, options = {}) {
  const { theme = 'light', width = 480 } = options;
  const colors = themes[theme] || themes.light;

  return `
<svg width="${width}" height="150" viewBox="0 0 ${width} 150" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${colors.bgGradient[0]}"/>
      <stop offset="100%" style="stop-color:${colors.bgGradient[1]}"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="150" fill="url(#bgGrad)" rx="16"/>
  <text x="30" y="45" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" font-size="22" font-weight="700" fill="${colors.title}">
    Open-Source Contributions
  </text>
  <text x="${width / 2}" y="100" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" font-size="14" fill="${colors.cardText}" text-anchor="middle">
    No contributions yet. Start contributing!
  </text>
</svg>
  `.trim();
}
