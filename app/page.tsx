import { projects, skills, profile, careerHighlights } from './portfolio-data';
import PdfDownloads from './pdf-downloads';

export default function Home() {
  return (
    <main id="top">
      <header className="topbar">
        <a href="#top" className="name">{profile.name}</a>
        <nav aria-label="주요 메뉴">
          <a href="#summary">경력 요약</a>
          <a href="#projects" className="projects-link">프로젝트</a>
          <a href="#skills">기술</a>
          <a href="#contact">연락처</a>
        </nav>
      </header>

      <section className="intro page-width">
        <p className="role">PYTHON BACKEND DEVELOPER / 2017 — 2026</p>
        <h1>PORTFOLIO</h1>
        <div className="intro-grid">
          <p>{profile.intro}</p>
          <dl>
            <div><dt>지원 분야</dt><dd>{profile.target}</dd></div>
            <div><dt>개발 경력</dt><dd>{profile.period}</dd></div>
            <div><dt>주요 분야</dt><dd>{profile.specialties}</dd></div>
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
              <div><h3>{profile.company}</h3><p>{profile.position}</p></div>
              <time>{profile.period}</time>
            </div>
            <ul className="plain-list">
              {careerHighlights.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        </div>
      </section>

      <section className="projects page-width" id="projects">
        <div className="section-title sticky-title">
          <span>02</span>
          <h2>프로젝트</h2>
          <p>혜움랩스에서 수행한 주요 프로젝트의 개발 내용과 설계 선택, 결과를 정리했습니다.</p>
        </div>
        <div className="project-list">
          {projects.map((project, index) => (
            <article className="project" key={project.title}>
              <div className="project-meta">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <time>{project.period}</time>
              </div>
              <h3>{project.title}</h3>
              {project.caseStudy && (
                <div className="project-highlight">
                  <span>주요 결과</span>
                  <p>{project.caseStudy.outcomes[0]}</p>
                </div>
              )}
              {project.caseStudy ? (
                <div className="case-study">
                  {project.caseStudy.background && (
                    <section className="case-background">
                      <h4>프로젝트 범위</h4>
                      <p className="case-single">{project.caseStudy.background}</p>
                    </section>
                  )}
                  {project.caseStudy.history && (
                    <section className="case-operations">
                      <h4>리뉴얼 전 개발·개선</h4>
                      <ul>{project.caseStudy.history.map((item) => <li key={item}>{item}</li>)}</ul>
                    </section>
                  )}
                  <div className="case-overview">
                    <section>
                      <h4>{project.caseStudy.problemLabel ?? '기존 문제'}</h4>
                      <ul>{project.caseStudy.problem.map((item) => <li key={item}>{item}</li>)}</ul>
                    </section>
                    <section>
                      <h4>담당 범위</h4>
                      <p className="case-single">{project.caseStudy.ownership[0]}</p>
                    </section>
                  </div>
                  {project.caseStudy.flow && (
                    <section>
                      <h4>처리 구조</h4>
                      <div className="flow-list">
                        {project.caseStudy.flow.map((item, index) => (
                          <div className="flow-step" key={item}>
                            <span>{String(index + 1).padStart(2, '0')}</span>
                            <div>
                              <p>{item}</p>
                              {index === project.caseStudy!.flow!.length - 1 && project.caseStudy!.guardrails && (
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
                  )}
                  {project.caseStudy.operations && (
                    <section className="case-operations">
                      <h4>운영 및 모니터링</h4>
                      <ul>{project.caseStudy.operations.map((item) => <li key={item}>{item}</li>)}</ul>
                    </section>
                  )}
                  {project.caseStudy.outcomes.length > 1 && (
                    <section className="case-outcome">
                      <h4>도입 결과</h4>
                      <ul>{project.caseStudy.outcomes.slice(1).map((item) => <li key={item}>{item}</li>)}</ul>
                    </section>
                  )}
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
          <div><h3>{profile.education}</h3><time>{profile.educationPeriod}</time></div>
          <p>{profile.educationStatus}</p>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="page-width contact-inner">
          <div className="section-title dark-title"><span>05</span><h2>연락처</h2></div>
          <div className="contact-info">
            <a href={`mailto:${profile.email}`}><span>Email</span><strong>{profile.email}</strong></a>
            <a href={profile.phoneHref}><span>Phone</span><strong>{profile.phone}</strong></a>
          </div>
        </div>
      </section>

      <footer>
        <span>{profile.name} · {profile.role}</span>
        <div className="footer-actions">
          <PdfDownloads />
          <a href="#top">맨 위로 ↑</a>
        </div>
      </footer>
    </main>
  );
}
