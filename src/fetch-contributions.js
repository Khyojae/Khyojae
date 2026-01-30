/**
 * GitHub API를 사용하여 외부 레포에 merged된 PR 목록을 가져옴
 *
 * @source https://github.com/dbwls99706/oss-contribution-card
 */

import https from 'https';

function httpsGet(url, headers) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        ...headers,
        'User-Agent': 'github-contribution-widget'
      }
    };

    https.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error('Failed to parse JSON response'));
          }
        } else {
          reject(new Error(`GitHub API error: ${res.statusCode}`));
        }
      });
    }).on('error', reject);
  });
}

export async function fetchContributions(username, token = null) {
  const headers = {
    'Accept': 'application/vnd.github.v3+json'
  };

  if (token) {
    headers['Authorization'] = `token ${token}`;
  }

  // 자신의 레포를 제외한 merged PR만 검색
  const query = encodeURIComponent(`author:${username} type:pr is:merged -user:${username}`);
  const url = `https://api.github.com/search/issues?q=${query}&per_page=100&sort=updated`;

  const data = await httpsGet(url, headers);

  // 레포별로 그룹화
  const repoMap = new Map();

  for (const item of data.items || []) {
    // repository_url에서 owner/repo 추출
    const repoFullName = item.repository_url.replace('https://api.github.com/repos/', '');

    if (!repoMap.has(repoFullName)) {
      repoMap.set(repoFullName, {
        name: repoFullName,
        prs: [],
        latestMerge: null
      });
    }

    const repo = repoMap.get(repoFullName);
    const mergedAt = item.pull_request?.merged_at;

    repo.prs.push({
      number: item.number,
      title: item.title,
      url: item.html_url,
      mergedAt: mergedAt
    });

    // 가장 최근 merge 날짜 업데이트
    if (mergedAt && (!repo.latestMerge || new Date(mergedAt) > new Date(repo.latestMerge))) {
      repo.latestMerge = mergedAt;
    }
  }

  // 배열로 변환하고 PR 수 기준 정렬
  const contributions = Array.from(repoMap.values())
    .sort((a, b) => b.prs.length - a.prs.length);

  return {
    username,
    totalPRs: data.total_count || 0,
    totalRepos: contributions.length,
    contributions
  };
}
