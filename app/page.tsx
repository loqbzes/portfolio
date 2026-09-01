type Project = {
  period: string;
  title: string;
  summary: string;
  stack: string[];
  accent?: string;
};

const projects: Project[] = [
  {
    period: '2026.03 — 2026.06',
    title: '내부 CS·운영 지원 AI 에이전트',
    summary:
      '질의응답 데이터를 자동 수집·적재하고 서비스 및 코드 정보를 답변하는 에이전트를 개발했습니다. 간단한 버그는 담당자가 직접 수정해 PR로 전달할 수 있는 흐름까지 구현했습니다.',
    stack: ['Python', 'ECS', 'Claude Agent SDK', 'Terraform', 'S3', 'Slack'],
    accent: 'AI / AGENT',
  },
  {
    period: '2024.06 — 2026.07',
    title: '세무 정보 스크래핑 서비스 리뉴얼',
    summary:
      'Windows 기반 서비스를 Ubuntu·ECS 환경으로 전환하고 오토 스케일링과 IaC를 도입했습니다. 부가세 자료 스크래핑 시간을 약 4시간에서 1시간 30분으로 줄였습니다.',
    stack: ['Python', 'ECS', 'Docker', 'Terraform', 'GitHub Actions'],
    accent: '62.5% FASTER',
  },
  {
    period: '2023.01 — 2026.07',
    title: '세무사랑 자동화 봇',
    summary:
      '세무사랑과 협업해 C++ DLL API 호출과 ERP RPA를 결합한 자동화 태스크를 개발했습니다. Celery 기반으로 Windows 자동화 작업을 안정적으로 분산 실행했습니다.',
    stack: ['CPython', 'Celery', 'Windows Server', 'Redis', 'EC2'],
    accent: 'ERP / RPA',
  },
  {
    period: '2025.08',
    title: '홈택스·4대보험 수임사 스크래핑 백엔드',
    summary:
      '저장소를 DynamoDB에서 PostgreSQL로 전환했습니다. NoSQL 데이터를 RDB 구조로 재모델링하고 API를 구성해 비용을 절감하고 조회 편의성을 높였습니다.',
    stack: ['Python', 'Django', 'PostgreSQL', 'DynamoDB'],
  },
  {
    period: '2017.04 — 2023.07',
    title: '더존 SmartA 자동화 봇',
    summary:
      '재무정보 추출, 급여 입력, 세무 증명서 PDF 출력 등 다수의 ERP 자동화 스크립트를 개발·운영했습니다. Celery와 Redis로 작업을 비동기화하고 EC2 기반 서버·클라이언트를 관리했습니다.',
    stack: ['Python', 'Celery', 'Redis', 'Windows Server', 'EC2', 'S3'],
  },
  {
    period: '2020.06 — 2024.05',
    title: '세무 스크래핑·신고 서비스 개선',
    summary:
      '법인세·부가세·원천세·종소세, 4대보험 신고와 각종 증명서 출력을 다루는 서비스를 인수해 개선했습니다. 분산된 프로젝트를 통합하고 태스크 추상화, 정보 모델링, 로깅과 진행 상태 API를 정비했습니다.',
    stack: ['Python', 'Celery', 'DynamoDB', 'CloudWatch', 'Redis', 'S3'],
  },
  {
    period: '2019.04 — 2023.07',
    title: '슬랙·카카오톡 연동 상담 서비스',
    summary:
      '고객의 카카오톡과 담당자의 Slack을 연결하는 서비스를 유지보수·개선했습니다. 오류 알림, 근무 외 자동응답, 고객 정보 연동 UI를 추가하고 알림 기능을 Django 백엔드로 이전했습니다.',
    stack: ['Python', 'Flask', 'Django', 'Celery', 'Redis', 'Slack'],
  },
  {
    period: '2020.06 — 2022.10',
    title: '일별 금융정보 스크래핑',
    summary:
      '홈택스, 은행, 카드사, 여신금융협회의 금융정보를 매일 수집하는 시스템을 유지보수했습니다. 다양한 외부 데이터 소스의 수집 작업을 안정적으로 운영했습니다.',
    stack: ['Python', 'Celery', 'RDS', 'DynamoDB', 'Redis', 'EC2'],
  },
  {
    period: '2022.04 — 2022.07',
    title: 'Google Drive 동기화 리뉴얼',
    summary:
      '파일 생성·이동·삭제 이벤트에 맞춰 데이터베이스를 동기화하고, 회사 및 담당자 변경에 따른 권한·연결 상태를 갱신하는 기능을 담당했습니다.',
    stack: ['Python', 'Django', 'Google API', 'RDS'],
  },
  {
    period: '2019.08 — 2019.10',
    title: '세금계산서·NICE·알림톡 서버리스 앱',
    summary:
      '팝빌 회원가입과 세금계산서 발행, NICE 평가정보 수집, 카카오톡 알림톡 발송을 각각 독립적인 서버리스 애플리케이션으로 개발했습니다.',
    stack: ['Python', 'AWS Lambda', 'AWS SAM', 'SQS'],
  },
];

const skillGroups = [
  {
    number: '01',
    title: 'Backend',
    items: ['Python', 'Django', 'Flask', 'ORM', 'PostgreSQL'],
  },
  {
    number: '02',
    title: 'Async & Automation',
    items: ['Celery', 'Redis', 'Windows Automation', 'Scraping', 'AI Agent'],
  },
  {
    number: '03',
    title: 'Cloud & Delivery',
    items: ['AWS', 'ECS', 'EC2', 'Lambda', 'Docker', 'Terraform', 'GitHub Actions'],
  },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="이동호 포트폴리오 홈">
          DONGHO <span>LEE</span>
        </a>
        <nav aria-label="주요 메뉴">
          <a href="#about">소개</a>
          <a href="#expertise">역량</a>
          <a href="#work">프로젝트</a>
          <a className="nav-contact" href="#contact">연락하기</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span aria-hidden="true" /> Python Backend Engineer</p>
          <h1>
            복잡한 실무를 이해하고,
            <br />
            <em>작동하는 자동화</em>로 바꿉니다.
          </h1>
          <p className="hero-description">
            회계 실무에서 출발해 9년간 세무 IT 서비스를 만들어 온 개발자 이동호입니다.
            스크래핑, ERP 자동화, 비동기 시스템과 AI 에이전트로 반복 업무를 제품으로 전환합니다.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">
              모든 프로젝트 보기 <span aria-hidden="true">↘</span>
            </a>
            <a className="text-link" href="mailto:loqbzes@gmail.com">
              이메일 보내기 <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <aside className="hero-card" aria-label="경력 요약">
          <div className="card-topline">
            <span>PROFILE / 2026</span>
            <span className="availability">OPEN TO OPPORTUNITIES</span>
          </div>
          <div className="monogram" aria-hidden="true"><span>DL</span></div>
          <div className="card-summary">
            <p>FOCUS</p>
            <strong>Python Backend</strong>
            <span>Automation · Data Collection · AI Agent</span>
          </div>
        </aside>
      </section>

      <section className="stats" aria-label="경력 주요 수치">
        <article><strong>11<span>년+</span></strong><p>회계 실무를 포함한<br />전체 경력</p></article>
        <article><strong>9<span>년+</span></strong><p>Python 기반<br />개발 경력</p></article>
        <article><strong>10</strong><p>설계·개선·운영한<br />주요 프로젝트</p></article>
        <article><strong>62.5<span>%</span></strong><p>대표 스크래핑<br />처리 시간 단축</p></article>
      </section>

      <section className="about section-shell" id="about">
        <div className="section-heading">
          <p className="section-label">ABOUT / DOMAIN × ENGINEERING</p>
          <h2>업무의 언어와<br />기술의 언어를 연결합니다.</h2>
        </div>
        <div className="about-body">
          <p className="lead">
            경영학과에서 회계와 세법을 공부하고 실제 회계 업무를 경험한 뒤,
            반복되는 업무를 더 나은 방식으로 해결하고 싶어 개발자가 되었습니다.
          </p>
          <p>
            혜움랩스에서 세무 데이터를 수집하는 스크래핑부터 ERP 입력 자동화, 세무 신고,
            상담 채널, 서버리스 마이크로서비스, 웹 백엔드와 AI 에이전트까지 폭넓게 개발했습니다.
            사람이 직접 해야 했던 복잡한 절차를 분석하고, 실패를 추적할 수 있으며,
            운영자가 믿고 사용할 수 있는 시스템으로 만드는 데 강점이 있습니다.
          </p>
          <div className="career-line">
            <article>
              <span>2013 — 2015</span>
              <strong>미디어윌네트웍스</strong>
              <p>회계 담당 · 결산, 재무보고, 부가세 신고</p>
            </article>
            <article>
              <span>2017 — 2026</span>
              <strong>혜움랩스</strong>
              <p>Python 개발 · Backend, Automation, AI</p>
            </article>
          </div>
        </div>
      </section>

      <section className="expertise" id="expertise">
        <div className="section-shell">
          <div className="expertise-intro">
            <p className="section-label light">EXPERTISE</p>
            <h2>오래 운영되는<br />백엔드를 만듭니다.</h2>
            <p>도메인 모델링부터 비동기 실행, 인프라와 운영 가시성까지 전체 흐름을 함께 봅니다.</p>
          </div>
          <div className="skill-groups">
            {skillGroups.map((group) => (
              <article key={group.number}>
                <span className="skill-number">{group.number}</span>
                <div>
                  <h3>{group.title}</h3>
                  <ul>
                    {group.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="impact section-shell" aria-labelledby="impact-title">
        <div className="section-heading">
          <p className="section-label">SELECTED IMPACT</p>
          <h2 id="impact-title">규모보다 중요한 것은<br />실제로 달라진 결과입니다.</h2>
        </div>
        <div className="impact-grid">
          <article className="impact-card impact-primary">
            <span>01 / PERFORMANCE</span>
            <strong>4h</strong>
            <i aria-hidden="true">→</i>
            <strong>1.5h</strong>
            <p>ECS 오토 스케일링과 서비스 리뉴얼로 부가세 자료 수집 시간을 단축했습니다.</p>
          </article>
          <article className="impact-card">
            <span>02 / OPERABILITY</span>
            <h3>흩어진 작업을<br />하나의 구조로</h3>
            <p>다수의 마이크로서비스와 태스크를 통합하고 추상화·모델링·로깅을 정비했습니다.</p>
          </article>
          <article className="impact-card">
            <span>03 / NEXT INTERFACE</span>
            <h3>질문에서<br />수정 PR까지</h3>
            <p>운영 지식과 코드 정보를 연결해 답변하고 간단한 버그 수정까지 지원하는 AI 에이전트를 개발했습니다.</p>
          </article>
        </div>
      </section>

      <section className="projects section-shell" id="work">
        <div className="projects-header">
          <div>
            <p className="section-label">ALL PROJECTS / 2017 — 2026</p>
            <h2>진행한 모든 프로젝트</h2>
          </div>
          <p>
            신규 개발뿐 아니라 인수인계, 리뉴얼, 리팩터링과 장기 운영까지 포함했습니다.
            실무에서 소프트웨어의 수명 전체를 경험했습니다.
          </p>
        </div>
        <div className="project-list">
          {projects.map((project, index) => (
            <article className="project-row" key={project.title}>
              <div className="project-index">{String(index + 1).padStart(2, '0')}</div>
              <div className="project-period">{project.period}</div>
              <div className="project-content">
                <div className="project-title-line">
                  <h3>{project.title}</h3>
                  {project.accent && <span>{project.accent}</span>}
                </div>
                <p>{project.summary}</p>
                <ul aria-label={`${project.title} 기술 스택`}>
                  {project.stack.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="education section-shell">
        <p className="section-label">EDUCATION</p>
        <div>
          <span>2006.03 — 2013.06</span>
          <h2>세종대학교 경영학과</h2>
          <p>중급회계 · 관리회계 · 세법</p>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="section-shell">
          <p className="section-label light">CONTACT</p>
          <h2>도메인을 깊이 이해하는<br />Python 백엔드 개발자를 찾고 계신가요?</h2>
          <div className="contact-links">
            <a href="mailto:loqbzes@gmail.com">
              <span>Email</span><strong>loqbzes@gmail.com</strong><i aria-hidden="true">↗</i>
            </a>
            <a href="tel:+821032728012">
              <span>Phone</span><strong>+82 10-3272-8012</strong><i aria-hidden="true">↗</i>
            </a>
          </div>
        </div>
      </section>

      <footer>
        <a className="wordmark" href="#top">DONGHO <span>LEE</span></a>
        <p>Python Backend Engineer · Seoul, Korea</p>
        <span>© 2026 이동호</span>
      </footer>
    </main>
  );
}
