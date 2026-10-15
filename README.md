# 원호초등학교 STEP-UP 연구학교 모바일 사이트

GitHub Pages에 바로 올릴 수 있는 정적 웹사이트입니다.

## 구성

- `index.html` : 전체 페이지 구조
- `css/styles.css` : 모바일 반응형 디자인과 애니메이션
- `js/app.js` : 아코디언 카드, 실시간 일정, 교실 약도, 바로가기, 맨위로 버튼
- `assets/wonhodori.png` : 원호돌이 캐릭터
- `assets/school-logo.png` : 원호초등학교 교표
- `assets/classroom-layout-original.png` : 원본 교실 배치도 참고 이미지
- `assets/today-schedule-source.png` : 오늘의 일정 참고 이미지
- `assets/closing-program-source.png` : 종결보고회 식순 참고 이미지
- `.nojekyll` : GitHub Pages에서 파일을 그대로 제공하도록 하는 설정

## GitHub Pages 게시 방법

1. 새 GitHub 저장소를 만듭니다.
2. 이 폴더 안의 파일과 폴더를 **그대로 저장소 최상위(root)** 에 업로드합니다.
3. GitHub 저장소의 `Settings` → `Pages`로 이동합니다.
4. `Build and deployment`에서 `Deploy from a branch`를 선택합니다.
5. Branch를 `main`, 폴더를 `/ (root)`로 선택한 뒤 저장합니다.
6. 잠시 뒤 표시되는 GitHub Pages 주소로 접속합니다.

## 수정할 때 자주 보는 곳

- 학년별 프로젝트 내용/링크: `js/app.js`의 `projects`
- 공개수업 지도안 링크: `js/app.js`의 `lessons`
- 교실 배치: `js/app.js`의 `floorLayouts`
- 오늘의 일정 시간: `index.html`의 `data-start`, `data-end`
- 색상/크기: `css/styles.css`

## 일정 실시간 강조

테스트를 위해 날짜는 검사하지 않고, **매일 한국시간(Asia/Seoul)** 기준으로 해당 시간대의 일정이 자동 강조됩니다.
