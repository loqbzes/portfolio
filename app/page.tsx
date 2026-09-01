type Project = {
  period: string;
  title: string;
  work: string[];
  result?: string;
  stack: string[];
};

const projects: Project[] = [
  {
    period: '2026.03 — 2026.06',
    title: '내부 CS·운영 지원 AI 에이전트 개발',
    work: [
      '2025년 1월부터 축적된 CS·운영 질의응답 데이터를 자동 수집하고 저장하는 파이프라인 개발',
      '운영 담당자의 질문에 서비스 정보와 관련 코드 위치·내용을 제공하는 질의응답 기능 구현',
      '간단한 버그를 운영 담당자가 수정한 뒤 Pull Request로 전달할 수 있는 작업 흐름 구현',
    ],
    stack: ['Python', 'ECS', 'Claude Agent SDK', 'Terraform', 'S3', 'Slack', 'GitHub Actions'],
  },
  {
    period: '2024.06 — 2026.07',
    title: '세무 정보 스크래핑 서비스 리뉴얼',
    work: [
      '신규 서비스에 대응할 수 있도록 기존 스크래핑 구조를 경량화하고 수평 확장이 가능한 형태로 재구성',
      '실행 환경을 Windows에서 Ubuntu 컨테이너로 전환하고 ECS 오토 스케일링 구성',
      'Terraform으로 인프라 정의를 코드화하고 GitHub Actions 배포 파이프라인 구성',
      '세무 신고 일정에 맞춰 기존 기능을 신규 서비스로 순차 이전하고 스크래핑 태스크를 지속 개발',
    ],
    result: '부가세 자료 스크래핑 소요 시간을 약 4시간에서 1시간 30분으로 단축',
    stack: ['Python', 'ECS', 'Docker', 'Terraform', 'GitHub Actions'],
  },
  {
    period: '2023.01 — 2026.07',
    title: '세무사랑 자동화 봇 개발',
    work: [
      '세무사랑 측이 제공한 C++ DLL API를 CPython에서 호출하는 연동 모듈 개발',
      'DLL API로 처리할 수 없는 업무는 Windows UI 자동화를 결합해 ERP 자동화 태스크로 구현',
      'Celery와 Redis를 이용해 Windows 서버에서 자동화 작업을 비동기로 실행',
    ],
    stack: ['CPython', 'C++ DLL API', 'Celery', 'Redis', 'EC2 Windows Server', 'GitHub Actions'],
  },
  {
    period: '2025.08',
    title: '홈택스·4대보험 수임사 스크래핑 웹 백엔드',
    work: [
      '수임사 스크래핑 데이터 저장소를 DynamoDB에서 PostgreSQL로 변경',
      'NoSQL 형태의 기존 데이터를 관계형 구조로 저장하기 위한 모델 설계',
      '저장·조회에 필요한 Django API 구성',
    ],
    result: 'DynamoDB 사용 비용을 줄이고 관계형 조회와 운영 쿼리의 편의성을 개선',
    stack: ['Python', 'Django', 'PostgreSQL', 'DynamoDB'],
  },
  {
    period: '2017.04 — 2023.07',
    title: '더존 SmartA ERP 자동화 봇 개발',
    work: [
      '재무제표 등 재무정보 추출, 급여 데이터 입력, 세무 증명서 PDF 출력 자동화 구현',
      'SmartA 자체 스크래핑을 포함한 다수의 Windows 자동화 스크립트 개발·유지보수',
      'Celery 기반 비동기 작업으로 자동화 태스크를 실행하고 Redis로 큐 상태 관리',
      'EC2 Windows Server에서 ERP 서버와 자동화 클라이언트를 운영하고 실행 성능을 최적화',
      'CloudWatch·Slack으로 로그와 오류를 수집하고 운영 알림 구성',
    ],
    stack: ['Python', 'Celery', 'Redis', 'EC2 Windows Server', 'S3', 'CloudWatch', 'Slack'],
  },
  {
    period: '2020.06 — 2024.05',
    title: '세무 정보 스크래핑·신고 서비스 개선',
    work: [
      '법인세·부가세·원천세·종합소득세의 국세·지방세 신고와 4대보험 신고 기능 유지보수',
      '홈택스·고용보험 자료, 세무신고 도움자료, PG사 데이터 스크래핑과 증명서 출력 기능 개발',
      '여러 마이크로서비스로 흩어진 프로젝트와 중복 태스크를 하나의 프로젝트로 통합',
      '추상 클래스를 도입해 공통 실행 흐름과 세목별 고유 로직을 분리하고 신고·스크래핑 정보를 모델링',
      '로깅을 LogDNA에서 CloudWatch로 이전하고 작업 진행 과정을 DB에 기록하도록 개선',
      '운영자가 작업 상태를 확인할 수 있도록 API 문서를 추가',
    ],
    stack: ['Python', 'Celery', 'EC2', 'S3', 'DynamoDB', 'CloudWatch', 'Redis', 'Slack'],
  },
  {
    period: '2019.04 — 2023.07',
    title: 'Slack·카카오톡 연동 상담 서비스 개선',
    work: [
      '고객의 카카오톡 메시지와 담당 직원의 Slack을 연결하는 상담 서비스 인수·유지보수',
      '로깅과 오류 알림을 추가하고 휴일·근무 시간 외 자동응답 기능 구현',
      'Slack Bot에서 카카오톡 고객과 백엔드 고객 정보를 연결해 확인하는 UI 개발',
      '기존 코드를 분석·리팩터링하고 카카오톡·메일·Slack 알림 기능을 Django 백엔드로 이전',
    ],
    stack: ['Python', 'Flask', 'Django', 'Celery', 'EC2', 'Redis', 'Slack'],
  },
  {
    period: '2020.06 — 2022.10',
    title: '일별 금융정보 스크래핑 유지보수',
    work: [
      '고객사의 일별 금융정보 수집 작업과 장애 대응',
      '홈택스, 은행, 카드사, 여신금융협회 데이터를 외부 스크래핑 서비스를 통해 수집·저장',
      'Celery 태스크와 Redis 큐, RDS·DynamoDB 저장소 운영',
    ],
    stack: ['Python', 'Celery', 'EC2 Windows Server', 'RDS', 'DynamoDB', 'Redis'],
  },
  {
    period: '2022.04 — 2022.07',
    title: 'Google Drive 동기화 기능 리뉴얼',
    work: [
      'Google Drive의 파일 생성·이동·삭제 이벤트에 따라 내부 데이터베이스를 갱신하는 기능 개발',
      '회사 또는 담당자 변경 시 Drive 파일과 내부 고객 정보의 연결을 동기화하는 기능 담당',
    ],
    stack: ['Python', 'Django', 'Google API', 'RDS'],
  },
  {
    period: '2019.08 — 2019.10',
    title: '세금계산서·NICE·알림톡 서버리스 앱 개발',
    work: [
      '팝빌 회원가입과 세금계산서 발행 기능 개발',
      'NICE 평가정보 수집 기능 개발',
      '카카오톡 알림톡 발송 기능을 Lambda 기반 서버리스 애플리케이션으로 구현',
    ],
    stack: ['Python', 'AWS Lambda', 'AWS SAM', 'SQS'],
  },
];

const skills = [
  ['Backend', 'Python, Django, Flask, ORM, PostgreSQL'],
  ['Async', 'Celery, Redis, SQS'],
  ['AWS', 'ECS, EC2, Lambda, S3, RDS, DynamoDB, CloudWatch'],
  ['Infra / CI', 'Docker, Terraform, GitHub Actions, Linux, Windows Server'],
  ['Automation', 'Web Scraping, Windows UI Automation, ERP RPA, C++ DLL API'],
  ['Integration', 'Slack, KakaoTalk, Google API, AI Agent'],
];

export default function Home() {
  return (
    <main id="top">
      <header className="topbar">
        <a href="#top" className="name">이동호</a>
        <nav aria-label="주요 메뉴">
          <a href="#summary">경력 요약</a>
          <a href="#projects">프로젝트</a>
          <a href="#skills">기술</a>
          <a href="#contact">연락처</a>
        </nav>
      </header>

      <section className="intro page-width">
        <p className="role">CAREER PORTFOLIO / 2017 — 2026</p>
        <h1>Python Backend<br />Developer</h1>
        <div className="intro-grid">
          <p>
            9년 4개월 동안 Python으로 세무 자료 수집, 세무 신고, ERP 자동화,
            웹 백엔드와 내부 운영용 AI 에이전트를 개발했습니다.
          </p>
          <dl>
            <div><dt>지원 분야</dt><dd>Python Backend</dd></div>
            <div><dt>개발 경력</dt><dd>2017.04 — 2026.07</dd></div>
            <div><dt>주요 도메인</dt><dd>세무 IT · 업무 자동화</dd></div>
          </dl>
        </div>
      </section>

      <section className="summary page-width" id="summary">
        <div className="section-title">
          <span>01</span>
          <h2>경력 요약</h2>
        </div>
        <div className="summary-content">
          <article>
            <div className="employment-heading">
              <div><h3>혜움랩스</h3><p>Python 개발자 · 정규직</p></div>
              <time>2017.04 — 2026.07</time>
            </div>
            <ul className="plain-list">
              <li>Celery 기반의 스크래핑·세무 신고·ERP 자동화 작업 개발 및 장기 운영</li>
              <li>Django·Flask 웹 백엔드와 AWS Lambda 서버리스 애플리케이션 개발</li>
              <li>ECS·Docker·Terraform을 사용한 Linux 기반 스크래핑 서비스 리뉴얼</li>
              <li>CloudWatch·Slack을 사용한 실행 상태, 로그, 오류 모니터링 구성</li>
              <li>CS·운영 데이터를 활용한 내부 지원 AI 에이전트 개발</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="projects page-width" id="projects">
        <div className="section-title sticky-title">
          <span>02</span>
          <h2>프로젝트</h2>
          <p>혜움랩스에서 수행한 개발 업무 전체를 기간 역순으로 정리했습니다.</p>
        </div>
        <div className="project-list">
          {projects.map((project, index) => (
            <article className="project" key={project.title}>
              <div className="project-meta">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <time>{project.period}</time>
              </div>
              <h3>{project.title}</h3>
              <h4>수행 업무</h4>
              <ul className="work-list">
                {project.work.map((item) => <li key={item}>{item}</li>)}
              </ul>
              {project.result && (
                <div className="result"><span>결과</span><strong>{project.result}</strong></div>
              )}
              <ul className="tags" aria-label={`${project.title} 기술 스택`}>
                {project.stack.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="skills page-width" id="skills">
        <div className="section-title">
          <span>03</span>
          <h2>기술</h2>
        </div>
        <dl className="skill-table">
          {skills.map(([category, items]) => (
            <div key={category}><dt>{category}</dt><dd>{items}</dd></div>
          ))}
        </dl>
      </section>

      <section className="education page-width">
        <div className="section-title">
          <span>04</span>
          <h2>학력</h2>
        </div>
        <div className="education-content">
          <div><h3>세종대학교 경영학과</h3><time>2006.03 — 2013.06</time></div>
          <p>졸업</p>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="page-width contact-inner">
          <div className="section-title dark-title"><span>05</span><h2>연락처</h2></div>
          <div className="contact-info">
            <a href="mailto:loqbzes@gmail.com"><span>Email</span><strong>loqbzes@gmail.com</strong></a>
            <a href="tel:+821032728012"><span>Phone</span><strong>+82 10-3272-8012</strong></a>
          </div>
        </div>
      </section>

      <footer>
        <span>이동호 · Python Backend Developer</span>
        <a href="#top">맨 위로 ↑</a>
      </footer>
    </main>
  );
}
