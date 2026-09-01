type Project = {
  period: string;
  title: string;
  work: string[];
  result?: string;
  stack: string[];
  caseStudy?: {
    problem: string[];
    ownership: string[];
    flow: string[];
    guardrails: string[];
    outcomes: string[];
  };
};

const projects: Project[] = [
  {
    period: '2026.03 — 2026.06',
    title: '내부 CS·운영 지원 AI 에이전트 개발',
    work: [
      'Slack 질의응답 수집, S3 적재, 에이전트용 API와 Slack 연동 기능 개발',
    ],
    stack: ['Python', 'Slack Bolt', 'Claude Agent SDK', 'S3', 'ECS', 'GitHub'],
    caseStudy: {
      problem: [
        '복잡한 세무 도메인과 내부 시스템으로 인한 CS·운영 담당자의 학습 기간 장기화',
        '문의마다 개발자가 관련 코드와 과거 응답 기록을 직접 찾아야 하는 구조',
        '실무 판단이 필요한 문의에 개발자가 답변하기 어려운 상황 발생',
      ],
      ownership: [
        '애플리케이션 개발 전 과정을 단독으로 담당했습니다. 배포에는 기존 저장소의 인프라와 CI/CD 체계를 활용했습니다.',
      ],
      flow: [
        '개발진에 전달할 CS를 담당자가 선택하거나 스레드에서 AI를 멘션하면 Slack Bolt가 이벤트와 전체 스레드 내용을 수신',
        'Claude Agent SDK가 에이전트를 실행하고, 질문에 따라 필요한 정보원을 도구로 자율 선택',
        '일별·월별로 수집해 S3에 Markdown으로 저장한 과거 질의응답, 주요 소스 코드, 내부 시스템 조회 API를 사용',
        '조회 결과를 같은 Slack 스레드에 바로 응답',
        'Slack 멘션으로 코드 수정을 명시적으로 요청하고 안전장치 조건을 충족한 경우에만 소스 코드를 수정해 별도 브랜치와 Draft PR을 생성',
      ],
      guardrails: [
        '기능 변경으로 판단되는 요청은 코드 수정을 거절',
        '수정 범위가 100줄을 초과하면 작업을 거절',
        '자동 반영하지 않고 Draft PR 생성까지만 수행하며 최종 리뷰는 개발자가 담당',
      ],
      outcomes: [
        '개발자에게 직접 전달되던 CS 문의 해소',
        'CS·운영 담당자의 긍정적인 사용 반응',
        '다른 사업부의 Slack 기반 AI 에이전트 개발로 확산',
      ],
    },
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
  ['Backend', 'Python, Django, Flask, ORM, REST API'],
  ['Data', 'PostgreSQL, RDS, DynamoDB, S3, Data Modeling'],
  ['Async / Messaging', 'Celery, Redis, SQS'],
  ['AWS', 'ECS, EC2, Lambda, CloudWatch'],
  ['Infra / CI', 'Docker, Terraform, GitHub Actions, Linux, Windows Server'],
  ['Integration', 'Web Scraping, C++ DLL API, Google API, Slack, KakaoTalk, AI Agent'],
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
        <p className="role">PYTHON BACKEND DEVELOPER / 2017 — 2026</p>
        <h1>PORTFOLIO</h1>
        <div className="intro-grid">
          <p>
            9년 동안 Python으로 웹 백엔드, 비동기 작업 시스템과 데이터 수집
            서비스를 개발했습니다. Django·Flask API부터 Celery 작업 처리, AWS 인프라,
            세무 신고·ERP 연동과 내부 운영용 AI 에이전트까지 담당했습니다.
          </p>
          <dl>
            <div><dt>지원 분야</dt><dd>Python Backend</dd></div>
            <div><dt>개발 경력</dt><dd>2017.04 — 2026.07</dd></div>
            <div><dt>주요 분야</dt><dd>웹 백엔드 · 비동기 처리 · 데이터 수집</dd></div>
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
              <li>Django·Flask 기반 웹 백엔드, 데이터 모델과 API 개발</li>
              <li>Celery·Redis 기반 비동기 작업 시스템 개발 및 장기 운영</li>
              <li>PostgreSQL·DynamoDB·RDS를 사용한 수집 데이터 저장 구조 설계·변경</li>
              <li>AWS Lambda 서버리스 애플리케이션과 외부 서비스 연동 기능 개발</li>
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
              {project.caseStudy ? (
                <div className="case-study">
                  <div className="case-overview">
                    <section>
                      <h4>기존 문제</h4>
                      <ul>{project.caseStudy.problem.map((item) => <li key={item}>{item}</li>)}</ul>
                    </section>
                    <section>
                      <h4>담당 범위</h4>
                      <p className="case-single">{project.caseStudy.ownership[0]}</p>
                    </section>
                  </div>
                  <section>
                    <h4>처리 구조</h4>
                    <div className="flow-list">
                      {project.caseStudy.flow.map((item, index) => (
                        <div className="flow-step" key={item}>
                          <span>{String(index + 1).padStart(2, '0')}</span>
                          <div>
                            <p>{item}</p>
                            {index === project.caseStudy!.flow.length - 1 && (
                              <div className="flow-guardrails">
                                <strong>코드 수정 조건</strong>
                                <ul>{project.caseStudy!.guardrails.map((guardrail) => <li key={guardrail}>{guardrail}</li>)}</ul>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                  <section className="case-outcome">
                    <h4>도입 결과</h4>
                    <ul>{project.caseStudy.outcomes.map((item) => <li key={item}>{item}</li>)}</ul>
                  </section>
                </div>
              ) : (
                <>
                  <h4>수행 업무</h4>
                  <ul className="work-list">
                    {project.work.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  {project.result && (
                    <div className="result"><span>결과</span><strong>{project.result}</strong></div>
                  )}
                </>
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
