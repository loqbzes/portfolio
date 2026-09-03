type Project = {
  period: string;
  title: string;
  work: string[];
  result?: string;
  stack: string[];
  caseStudy?: {
    background?: string;
    problem: string[];
    ownership: string[];
    flow: string[];
    guardrails?: string[];
    operations?: string[];
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
    period: '2020.06 — 2026.07',
    title: '세무 정보 스크래핑 서비스 운영·리뉴얼',
    work: [
      'Windows 기반 스크래핑 서비스를 Linux·ECS 기반으로 리뉴얼',
    ],
    stack: ['Python', 'Celery', 'ElastiCache for Redis', 'ECS', 'ECR', 'Docker', 'Terraform', 'GitHub Actions', 'CloudWatch', 'Sentry'],
    caseStudy: {
      background:
        '2020년부터 기존 세무 정보 스크래핑·신고 서비스를 인수해 운영하고 기능을 개선했습니다. 2024년부터 Windows 기반 서비스의 용량 한계를 해결하기 위해 Linux·ECS 기반의 신규 애플리케이션을 개발했습니다. 이 리뉴얼은 새로운 Git 저장소 생성부터 직접 진행했습니다.',
      problem: [
        'Windows 기반 실행 환경으로 인한 오토 스케일링 제약',
        '긴 개별 스크래핑 처리 시간과 제한된 동시 처리량',
        '작업을 여러 구간으로 나누는 우회 방식을 적용해도 추가 처리가 불가능한 용량 한계',
      ],
      ownership: [
        '저장소 생성부터 Linux 스크래핑 코드, Docker 이미지, Celery·Redis 구성, ECS·오토 스케일링, Terraform과 CI/CD까지 전체를 직접 구축했습니다.',
      ],
      flow: [
        '스크래핑 코드를 Linux 환경에서 실행하도록 변경해 개별 작업의 처리 시간을 단축',
        '스크래핑 요청을 Celery 태스크로 발행하고 ECS Task에서 실행되는 Celery 워커가 처리',
        'ElastiCache for Redis를 Celery 브로커로 사용하고 Celery Result Backend에 작업 결과와 상태를 저장',
        'ECS Task의 CPU 사용량을 기준으로 실행 Task 수를 자동 조정해 동시 처리량을 확대',
        'staging 브랜치 대상 PR에서 테스트를 실행하고, GitHub Actions에서 Docker 이미지 빌드·ECR 업로드·ECS 배포를 수행',
      ],
      operations: [
        'Celery Flower로 워커와 태스크 상태 확인',
        'CloudWatch Logs로 실행 로그 수집',
        'Sentry로 예외 수집과 오류 상황 추적',
        '실패한 작업은 운영자가 수동 실행하거나 사용자가 직접 재시도',
      ],
      outcomes: [
        'Linux 전환과 동시 처리량 확대를 함께 적용해 부가세 자료 스크래핑 시간을 약 4시간에서 1시간 30분으로 단축',
        '세무 일정에 맞춰 약 1년간 기능을 단계적으로 이전',
        'Windows가 반드시 필요한 일부 작업을 제외한 모든 스크래핑을 신규 환경으로 전환',
      ],
    },
  },
  {
    period: '2023.01 — 2026.07',
    title: '세무사랑 ERP API 연동',
    work: [
      'SmartA에서 수행하던 ERP 업무를 세무사랑 API 기반으로 이전',
    ],
    stack: ['Python 3.6 32-bit', 'CPython', 'C++ DLL API', 'Celery', 'Redis', 'Windows UI Automation', 'EC2 Windows Server'],
    caseStudy: {
      problem: [
        'SmartA에서 수행하던 ERP 업무를 세무사랑 환경으로 이전할 필요',
        '세무사랑 DLL이 Python 3.6 32-bit에서만 로드돼 기존 애플리케이션과 호환되지 않는 제약',
        '데이터 조회·저장은 API로 가능했지만 일부 API는 실제 ERP 화면 실행이 필수',
      ],
      ownership: [
        'PM과 함께 필요한 API와 파라미터를 산출해 세무사랑 측에 전달할 개발 요청 문서를 작성했으며, DLL 호출 애플리케이션부터 기존 시스템 연동과 UI 자동화까지 모든 개발을 직접 담당했습니다.',
      ],
      flow: [
        'ERP 데이터 조회·저장 작업은 세무사랑 API로 처리하고 화면이 필요한 기능만 UI 자동화로 보완',
        'C++ DLL을 로드할 수 있는 Python 3.6 32-bit 전용 CPython 애플리케이션을 별도로 구성',
        '기존 애플리케이션에서 어댑터를 통해 DLL 호출 애플리케이션의 Celery 태스크를 요청',
        '로그인 상태를 유지한 순차 실행을 위해 Windows 로컬 환경에 별도 Redis 큐와 Celery 워커를 구성',
        '로그인 태스크 실행 후 필요한 경우 UI 자동화를 수행하고, 이어서 API 호출 태스크를 실행',
      ],
      outcomes: [
        'SmartA에서 수행하던 ERP 업무 전체를 세무사랑 환경으로 이전',
        'SmartA 업데이트 종료 이후 모든 대상 업무를 세무사랑 기반으로 운영',
      ],
    },
  },
  {
    period: '2025.08',
    title: '홈택스·4대보험 수임사 스크래핑 웹 백엔드',
    work: [
      '스크래핑 데이터 저장·조회 구조를 DynamoDB에서 PostgreSQL로 전환',
    ],
    stack: ['Python', 'Django', 'ORM', 'PostgreSQL', 'DynamoDB', 'AWS Lambda'],
    caseStudy: {
      problem: [
        'DynamoDB의 높은 운영 비용',
        '조회 조건이 추가될 때마다 별도 인덱스와 추가 개발이 필요한 구조',
        '인덱스 증가에 따라 저장·조회 비용도 함께 증가',
        'DynamoDB 데이터와 회사 정보를 연결하기 위한 예약 Lambda 태스크 운영',
      ],
      ownership: [
        '기존 Django 프로젝트에서 PostgreSQL 데이터 모델, 스크래핑 결과 적재 로직과 API를 직접 구현했습니다. 기존 인프라와 배포 구성은 변경하지 않았습니다.',
      ],
      flow: [
        '매일 수행되는 전체 스크래핑의 결과를 PostgreSQL에 직접 적재',
        '사업자등록번호가 일치하는 스크래핑 데이터와 기존 회사 데이터를 Foreign Key로 연결',
        '별도 데이터 마이그레이션 없이 신규 구조 적용 후 다음 전체 스크래핑부터 PostgreSQL 데이터로 전환',
        'Django API 안에서 SQL 쿼리로 회사와 스크래핑 데이터를 연결해 홈택스·4대보험 수임 여부를 확인',
      ],
      outcomes: [
        '기존 DynamoDB 테이블 제거를 통한 저장·조회 비용 절감',
        'DynamoDB를 읽어 회사 정보를 연결하던 예약 Lambda 태스크 제거',
        '수임 여부 확인 흐름을 Django 백엔드 내부의 관계형 조회로 단순화',
      ],
    },
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
                  {project.caseStudy.background && (
                    <section className="case-background">
                      <h4>프로젝트 범위</h4>
                      <p className="case-single">{project.caseStudy.background}</p>
                    </section>
                  )}
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
                            {index === project.caseStudy!.flow.length - 1 && project.caseStudy!.guardrails && (
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
                  {project.caseStudy.operations && (
                    <section className="case-operations">
                      <h4>운영 및 모니터링</h4>
                      <ul>{project.caseStudy.operations.map((item) => <li key={item}>{item}</li>)}</ul>
                    </section>
                  )}
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
