(() => {
  'use strict';

  /* ---------- helpers ---------- */
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const smoothTo = (el) => {
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 8;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  /* ---------- hero mascot spacing ---------- */
  const characterZone = $('#characterZone');
  const mascot = $('#wonhodoriImage');
  const mascotWrap = $('#wonhodoriWrap');

  const updateMascotGap = () => {
    if (!characterZone || !mascot) return;
    const h = mascot.getBoundingClientRect().height;
    if (h > 0) characterZone.style.setProperty('--character-gap', `${Math.round(h * 0.25)}px`);
  };
  mascot?.addEventListener('load', updateMascotGap);
  if (mascot?.complete) updateMascotGap();
  window.addEventListener('resize', updateMascotGap, { passive: true });
  mascotWrap?.addEventListener('animationend', () => mascotWrap.classList.add('float'));

  /* ---------- quick menu ---------- */
  $$('.quick-card').forEach((button) => {
    button.addEventListener('click', () => smoothTo(document.getElementById(button.dataset.target)));
  });

  /* ---------- reveal sections ---------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  $$('.reveal-section').forEach((section) => revealObserver.observe(section));

  /* ---------- floating top button: section 3 onward ---------- */
  const topButton = $('#topButton');
  const tasksSection = $('#tasksSection');
  const quickMenu = $('#quickMenu');
  const updateTopButton = () => {
    if (!topButton || !tasksSection) return;
    const threshold = tasksSection.offsetTop - 120;
    topButton.classList.toggle('show', window.scrollY >= threshold);
  };
  window.addEventListener('scroll', updateTopButton, { passive: true });
  window.addEventListener('resize', updateTopButton, { passive: true });
  topButton?.addEventListener('click', () => smoothTo(quickMenu));
  updateTopButton();

  /* ---------- section 4 project cards ---------- */
  const projects = [
    {
      grade: 1,
      title: '지구를 지켜요',
      summary: '생활 속 환경 문제를 살펴보고 나와 지구를 위한 녹색생활을 실천해요.',
      keywords: ['환경 문제 탐구', '녹색생활 실천', '실천 과정 공유'],
      location: '탄소제로교육관(구미)',
      hours: '23차시',
      link: 'https://sites.google.com/view/25wonhobogo/%ED%99%88/26-pro/1-pro'
    },
    {
      grade: 2,
      title: '자연톡톡 발명 탐험대',
      summary: '동식물의 특징과 자연의 원리에서 아이디어를 찾아 창의적인 발명으로 연결해요.',
      keywords: ['동식물 관찰', '자연의 원리 탐구', '창의적 발명'],
      location: '국립낙동강생물자원관(상주)',
      hours: '19차시',
      link: 'https://sites.google.com/view/25wonhobogo/%ED%99%88/26-pro/2-pro'
    },
    {
      grade: 3,
      title: '뚝딱! 꼬마 과학 발명가',
      summary: '물체와 물질의 성질을 탐구하고 생활 속 문제를 해결하는 발명품을 구상해요.',
      keywords: ['물체와 물질 탐구', '유니버설 디자인', '생활 문제 해결'],
      location: '구미과학관',
      hours: '27차시',
      link: 'https://sites.google.com/view/25wonhobogo/%ED%99%88/26-pro/3-pro'
    },
    {
      grade: 4,
      title: '태양계의 별과 행성',
      summary: '태양계의 행성과 별의 특징을 관찰·비교하며 우주에 대한 탐구를 넓혀요.',
      keywords: ['태양계 탐구', '별과 행성 관찰', '과학적 표현'],
      location: '예천천문우주센터',
      hours: '20차시',
      link: 'https://sites.google.com/view/25wonhobogo/%ED%99%88/26-pro/4-pro'
    },
    {
      grade: 5,
      title: '효율적으로 에너지 활용하는 친환경 하우스 설계하기',
      summary: '친환경 에너지 기술과 효율화 원리를 탐구해 친환경 하우스를 설계해요.',
      keywords: ['재생에너지 탐구', '에너지 효율', '친환경 하우스 설계'],
      location: '국립청소년미래환경센터(봉화)',
      hours: '32차시',
      link: 'https://sites.google.com/view/25wonhobogo/%ED%99%88/26-pro/5-pro'
    },
    {
      grade: 6,
      title: '과학과 함께 떠나는 진로 여행',
      summary: '미래 사회와 인공지능·로봇을 탐구하고 미래 사회 속 나의 모습을 설계해요.',
      keywords: ['미래 사회 탐구', '인공지능·로봇', '과학 진로 설계'],
      location: '경상북도교육청 메이커교육관(구미)',
      hours: '36차시',
      link: 'https://sites.google.com/view/25wonhobogo/%ED%99%88/26-pro/6-pro'
    }
  ];

  const projectList = $('#projectList');
  projects.forEach((item) => {
    const card = document.createElement('article');
    card.className = `project-card grade${item.grade}`;
    card.innerHTML = `
      <button class="project-card-button" type="button" aria-expanded="false">
        <span class="project-grade">${item.grade}</span>
        <span><strong class="project-title">${item.title}</strong><p class="project-summary">${item.summary}</p></span>
        <span class="project-toggle" aria-hidden="true"></span>
      </button>
      <div class="project-detail"><div class="project-detail-inner"><div class="project-detail-box">
        <div class="project-label">PROJECT KEYWORDS</div>
        <div class="project-keywords">${item.keywords.map((k) => `<span>${k}</span>`).join('')}</div>
        <div class="project-location"><small>창의융합에듀파크 연계 장소</small><strong>${item.location}</strong></div>
        <div class="project-hours"><span>전체 프로젝트</span><strong>${item.hours}</strong></div>
        <a class="project-link" href="${item.link}" target="_blank" rel="noopener noreferrer">프로젝트 계획서 보기 →</a>
      </div></div></div>`;
    projectList?.appendChild(card);
  });

  const projectCards = $$('.project-card', projectList);
  projectCards.forEach((card) => {
    const button = $('.project-card-button', card);
    button?.addEventListener('click', () => {
      const open = card.classList.contains('open');
      projectCards.forEach((other) => {
        other.classList.remove('open');
        $('.project-card-button', other)?.setAttribute('aria-expanded', 'false');
      });
      if (!open) {
        card.classList.add('open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------- schedule: every day, Asia/Seoul ---------- */
  const scheduleCards = $$('.schedule-card');
  const toMinutes = (time) => {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
  };
  const koreaMinutes = () => {
    const parts = new Intl.DateTimeFormat('ko-KR', {
      timeZone: 'Asia/Seoul', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
    }).formatToParts(new Date());
    const values = Object.fromEntries(parts.map((p) => [p.type, p.value]));
    return Number(values.hour) * 60 + Number(values.minute);
  };
  const updateSchedule = () => {
    const now = koreaMinutes();
    scheduleCards.forEach((card) => {
      const active = now >= toMinutes(card.dataset.start) && now < toMinutes(card.dataset.end);
      card.classList.toggle('current', active);
    });
  };
  updateSchedule();
  setInterval(updateSchedule, 15000);

  /* ---------- classroom floor data ---------- */
  const floorLayouts = {
    1: [
      { label:'기타', row:1, col:1 },
      { label:'과학실', row:1, col:2, span:2, type:'special' },
      { label:'기타', row:1, col:4 },
      { label:'병설유치원', row:1, col:7, span:4, type:'special' },
      { label:'중앙계단', row:2, col:7, type:'stair' },
      { label:'기타', row:3, col:1, span:2 },
      { label:'보건실', row:3, col:3 },
      { label:'중앙현관', row:3, col:4, span:3, type:'entrance' },
      { label:'행정실', row:3, col:7 }, { label:'교장실', row:3, col:8 }, { label:'교무실', row:3, col:9, span:2 }
    ],
    2: [
      { label:'4-5', grade:4, row:1, col:1 },
      { label:'1-1', grade:1, row:1, col:2 }, { label:'1-2', grade:1, row:1, col:3 }, { label:'1-3', grade:1, row:1, col:4 },
      { label:'연결통로', row:1, col:5, type:'connector' },
      { label:'도서관', row:1, col:6, span:2, type:'special' },
      { label:'1-4', grade:1, row:1, col:8 }, { label:'1-5', grade:1, row:1, col:9 }, { label:'1-6', grade:1, row:1, col:10 },
      { label:'중앙계단', row:2, col:6, span:2, type:'stair' },
      { label:'기타', row:3, col:1 }, { label:'2-1', grade:2, row:3, col:2 }, { label:'2-2', grade:2, row:3, col:3 },
      { label:'기타', row:3, col:4, span:4 }, { label:'컴퓨터실', row:3, col:8, span:3, type:'special' }
    ],
    3: [
      { label:'4-1', grade:4, row:1, col:1 }, { label:'4-2', grade:4, row:1, col:2 }, { label:'4-3', grade:4, row:1, col:3 }, { label:'4-4', grade:4, row:1, col:4 },
      { label:'연결통로', row:1, col:5, type:'connector' },
      { stack:['기타','돌봄'], row:1, col:6, span:2, type:'stack' },
      { label:'3-4', grade:3, row:1, col:8 }, { label:'3-5', grade:3, row:1, col:9 }, { label:'3-6', grade:3, row:1, col:10 },
      { label:'중앙계단', row:2, col:6, span:2, type:'stair' },
      { label:'2-3', grade:2, row:3, col:1 }, { label:'2-4', grade:2, row:3, col:2 }, { label:'2-5', grade:2, row:3, col:3 },
      { label:'기타', row:3, col:4, span:3 }, { label:'2-6', grade:2, row:3, col:7 },
      { label:'3-1', grade:3, row:3, col:8 }, { label:'3-2', grade:3, row:3, col:9 }, { label:'3-3', grade:3, row:3, col:10 }
    ],
    4: [
      { label:'5-1', grade:5, row:1, col:1 }, { label:'5-2', grade:5, row:1, col:2 }, { label:'5-3', grade:5, row:1, col:3 }, { label:'5-4', grade:5, row:1, col:4 },
      { label:'연결통로', row:1, col:5, type:'connector' },
      { label:'수학체험실', row:1, col:6, span:2, type:'special' },
      { label:'5-5', grade:5, row:1, col:8 }, { label:'5-6', grade:5, row:1, col:9 }, { label:'5-7', grade:5, row:1, col:10 },
      { label:'중앙계단', row:2, col:6, span:2, type:'stair' },
      { label:'기타', row:3, col:1 }, { label:'6-1', grade:6, row:3, col:2 }, { label:'6-2', grade:6, row:3, col:3 },
      { label:'기타', row:3, col:4, span:4 }, { label:'6-3', grade:6, row:3, col:8 }, { label:'6-4', grade:6, row:3, col:9 }, { label:'6-5', grade:6, row:3, col:10 }
    ]
  };

  const makeFloorPlan = (floor, highlightGrade = null, all = false) => {
    const shell = document.createElement('div'); shell.className = 'floor-plan-shell';
    const side = document.createElement('div'); side.className = 'floor-side'; side.innerHTML = '<span class="rear">후관</span><span class="main">본관</span>';
    const grid = document.createElement('div'); grid.className = 'floor-grid';
    (floorLayouts[floor] || []).forEach((room) => {
      const el = document.createElement('div'); el.className = 'room';
      el.style.gridRow = room.type === 'connector' ? '1 / span 2' : String(room.row);
      el.style.gridColumn = `${room.col} / span ${room.span || 1}`;
      if (room.type) el.classList.add(room.type === 'entrance' ? 'entrance' : room.type);
      if (!all && room.grade && Number(room.grade) === Number(highlightGrade)) el.classList.add('highlight');
      if (all && room.grade) el.classList.add(`grade-color-${room.grade}`);
      if (Array.isArray(room.stack)) {
        el.innerHTML = room.stack.map((x) => `<span>${x}</span>`).join('');
      } else if (room.label === '중앙계단') {
        el.innerHTML = '중앙<br>계단';
      } else if (room.label === '중앙현관') {
        el.innerHTML = '중앙<br>현관';
      } else if (room.label === '수학체험실') {
        el.innerHTML = '수학<br>체험실';
      } else {
        el.textContent = room.label || '';
      }
      grid.appendChild(el);
    });
    shell.append(side, grid);
    return shell;
  };

  /* ---------- lesson cards ---------- */
  const lessons = [
    { grade:1, location:'2층 · 1-1 ~ 1-6 교실', floors:[{floor:2,text:'1-1 ~ 1-6'}], link:'https://sites.google.com/view/25wonhobogo/%ED%99%88/26-teach/1-teach' },
    { grade:2, location:'2층·3층 · 2-1 ~ 2-6 교실', floors:[{floor:3,text:'2-3 ~ 2-6'},{floor:2,text:'2-1 · 2-2'}], link:'https://sites.google.com/view/25wonhobogo/%ED%99%88/26-teach/2-teach' },
    { grade:3, location:'3층 · 3-1 ~ 3-6 교실', floors:[{floor:3,text:'3-1 ~ 3-6'}], link:'https://sites.google.com/view/25wonhobogo/%ED%99%88/26-teach/3-teach' },
    { grade:4, location:'2층·3층 · 4-1 ~ 4-5 교실', floors:[{floor:3,text:'4-1 ~ 4-4'},{floor:2,text:'4-5'}], link:'https://sites.google.com/view/25wonhobogo/%ED%99%88/26-teach/4-teach' },
    { grade:5, location:'4층 · 5-1 ~ 5-7 교실', floors:[{floor:4,text:'5-1 ~ 5-7'}], link:'https://sites.google.com/view/25wonhobogo/%ED%99%88/26-teach/5-teach' },
    { grade:6, location:'4층 · 6-1 ~ 6-5 교실', floors:[{floor:4,text:'6-1 ~ 6-5'}], link:'https://sites.google.com/view/25wonhobogo/%ED%99%88/26-teach/6-teach' }
  ];

  const lessonList = $('#lessonList');
  lessons.forEach((item) => {
    const card = document.createElement('article'); card.className = `lesson-card grade${item.grade}`;
    const floors = item.floors.map((f) => `<div class="floor-section"><div class="floor-title"><b>${f.floor}층</b><span>${f.text}</span></div><div class="floor-plan-box"><div class="floor-mount" data-floor="${f.floor}" data-grade="${item.grade}"></div></div></div>`).join('');
    card.innerHTML = `<button class="lesson-button" type="button" aria-expanded="false"><span class="lesson-grade">${item.grade}</span><span><strong class="lesson-title">${item.grade}학년 공개수업</strong><div class="lesson-location">${item.location}</div></span><span class="lesson-chevron"></span></button><div class="lesson-detail"><div class="lesson-detail-inner"><div class="lesson-detail-box">${floors}<a class="lesson-link" href="${item.link}" target="_blank" rel="noopener noreferrer">${item.grade}학년 공개수업 지도안 보기 →</a></div></div></div>`;
    lessonList?.appendChild(card);
  });
  const direct = document.createElement('article'); direct.className = 'lesson-card grade7';
  direct.innerHTML = `<a class="lesson-direct" href="https://sites.google.com/view/25wonhobogo/%ED%99%88/26-teach/7-teach" target="_blank" rel="noopener noreferrer"><span class="lesson-grade">+</span><span><strong class="lesson-title">전담 · 비교과 공개수업</strong><div class="lesson-location">지도안 바로 보기</div></span><span style="font-size:22px;font-weight:900;color:var(--accent)">→</span></a>`;
  lessonList?.appendChild(direct);

  $$('.floor-mount').forEach((mount) => mount.appendChild(makeFloorPlan(Number(mount.dataset.floor), Number(mount.dataset.grade), false)));

  const lessonCards = $$('.lesson-card:not(.grade7)', lessonList);
  lessonCards.forEach((card) => {
    const button = $('.lesson-button', card);
    button?.addEventListener('click', () => {
      const open = card.classList.contains('open');
      lessonCards.forEach((other) => { other.classList.remove('open'); $('.lesson-button', other)?.setAttribute('aria-expanded','false'); });
      if (!open) { card.classList.add('open'); button.setAttribute('aria-expanded','true'); }
    });
  });

  /* ---------- whole school map ---------- */
  const campusBuilding = $('#campusBuilding');
  [4,3,2,1].forEach((floor) => {
    const row = document.createElement('div'); row.className = 'campus-floor';
    const no = document.createElement('div'); no.className = 'campus-floor-no'; no.textContent = `${floor}F`;
    const plan = document.createElement('div'); plan.className = 'campus-plan'; plan.appendChild(makeFloorPlan(floor, null, true));
    row.append(no, plan); campusBuilding?.appendChild(row);
  });

  /* ---------- keep horizontal overflow out ---------- */
  const lockX = () => { document.documentElement.style.overflowX = 'hidden'; document.body.style.overflowX = 'hidden'; };
  lockX();
  window.addEventListener('resize', lockX, { passive: true });
})();
