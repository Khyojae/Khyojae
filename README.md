# OSS Contribution Card

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

GitHub 프로필 README에 **외부 오픈소스 기여 내역**을 자동으로 표시하는 위젯입니다.

자신의 레포가 아닌, 다른 프로젝트에 **merge된 PR**만 표시합니다.

## Preview

| Light | Dark |
|-------|------|
| ![Light](./contributions.svg) | ![Dark](./contributions-dark.svg) |

## Features

- **외부 기여만 표시** - 자신의 레포 제외, 다른 프로젝트에 merge된 PR만
- **자동 업데이트** - GitHub Actions로 매일 자동 갱신
- **5가지 테마** - `light`, `dark`, `nord`, `dracula`, `tokyo`
- **자동 테마 감지** - GitHub 라이트/다크 모드에 따라 자동 색상 전환
- **PR 번호 표시** - 각 카드에 PR 번호 표시 (예: #1492)
- **정렬 옵션** - 날짜순 또는 PR 수 기준 정렬
- **날짜 필터** - 최근 N개월 기여만 표시 가능

---

## Quick Start

### Step 1: 파일 복사

자신의 프로필 레포지토리 (`username/username`)에 다음 파일들을 복사합니다:

```
your-username/
├── .github/
│   └── workflows/
│       └── update-contributions.yml
├── src/
│   ├── index.js
│   ├── fetch-contributions.js
│   └── generate-svg.js
├── package.json
└── README.md (프로필 README)
```

### Step 2: Actions 권한 설정

레포지토리 **Settings** → **Actions** → **General**:

1. **Workflow permissions** 섹션에서
2. **"Read and write permissions"** 선택
3. **Save** 클릭

### Step 3: README에 이미지 추가

프로필 `README.md`에 다음을 추가:

```markdown
## Open Source Contributions

![My Contributions](./contributions.svg)
```

### Step 4: 실행

**자동 실행:** 하루 3번 자동 업데이트 (한국시간 09:00, 17:00, 01:00)

**수동 실행:**
1. **Actions** 탭 → **Update Contributions SVG**
2. **Run workflow** 클릭

---

## Configuration

레포지토리 **Settings** → **Secrets and variables** → **Actions** → **Variables** 탭에서 설정:

| Variable | Description | Default |
|----------|-------------|---------|
| `THEME` | 테마 (`light`, `dark`, `nord`, `dracula`, `tokyo`) | `light` |
| `AUTO_THEME` | GitHub 테마 자동 감지 (`true`/`false`) | `false` |
| `MAX_REPOS` | 표시할 최대 PR 수 (1-10) | `6` |
| `TITLE` | 커스텀 타이틀 | `Open-Source Contributions` |
| `SORT_BY` | 정렬 기준 (`date`: 최신순, `count`: PR 많은 순) | `date` |
| `MONTHS_AGO` | 최근 N개월만 표시 (예: `6`) | 전체 |

### 설정 예시

**자동 테마 감지 (권장):**

GitHub 라이트/다크 모드에 따라 자동으로 색상이 전환됩니다:

1. **Settings** → **Secrets and variables** → **Actions** → **Variables**
2. **New repository variable** 클릭
3. Name: `AUTO_THEME`, Value: `true`

> 💡 `AUTO_THEME=true`를 사용하면 `THEME` 설정은 무시됩니다.

**다크 테마 + 최근 6개월만 표시:**

1. **Settings** → **Secrets and variables** → **Actions** → **Variables**
2. **New repository variable** 클릭
3. 다음 변수들 추가:
   - Name: `THEME`, Value: `dark`
   - Name: `MONTHS_AGO`, Value: `6`

---

## Themes

| Theme | Description |
|-------|-------------|
| `light` | 밝은 배경, 초록 액센트 (기본값) |
| `dark` | 어두운 배경, 연두 액센트 |
| `nord` | Nord 컬러 팔레트 |
| `dracula` | Dracula 컬러 팔레트 |
| `tokyo` | Tokyo Night 컬러 팔레트 |

---

## Local Development

```bash
# 클론
git clone https://github.com/dbwls99706/oss-contribution-card
cd oss-contribution-card

# 실행 (실제 GitHub API 사용)
node src/index.js <your-username>

# 테마 변경
THEME=dark node src/index.js <your-username>

# 자동 테마 감지 (GitHub 라이트/다크 모드 자동 전환)
AUTO_THEME=true node src/index.js <your-username>

# 테스트 (Mock 데이터)
node src/index.js <your-username> --mock
```

---

## How It Works

```
GitHub Actions (매일 자동 실행)
         │
         ▼
┌─────────────────────────────────┐
│  1. GitHub Search API 호출      │
│     author:{user} type:pr       │
│     is:merged -user:{user}      │
└─────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  2. PR 데이터 정렬 및 필터링    │
└─────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  3. SVG 카드 생성               │
└─────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  4. contributions.svg 커밋      │
└─────────────────────────────────┘
```

---

## Limitations

- GitHub README에서 SVG 내부 링크는 보안상 비활성화됨
- PR 번호가 표시되므로 GitHub에서 직접 검색 가능

---

## Troubleshooting

### SVG가 생성되지 않아요
1. **Actions** 탭에서 워크플로우 실행 로그 확인
2. **Settings** → **Actions** → **General**에서 권한이 "Read and write"인지 확인

### 기여 내역이 안 보여요
- 자신의 레포가 아닌 **외부 프로젝트**에 merge된 PR만 표시됩니다
- PR이 실제로 merge되었는지 확인하세요

---

## License

MIT

---

## Credits

Created by [@dbwls99706](https://github.com/dbwls99706)
