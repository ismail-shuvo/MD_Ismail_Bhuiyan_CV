import { defaultCV } from '@/lib/defaultCV'
import { CVData } from '@/types/cv'
import Link from 'next/link'
import PrintButton from '@/components/PrintButton'
import GlitchName from '@/components/GlitchName'
import FadeSection from '@/components/FadeSection'

async function getCV(): Promise<CVData> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/cv`, { cache: 'no-store' })
    if (!res.ok) return defaultCV
    return res.json()
  } catch {
    return defaultCV
  }
}

export default async function Home() {
  const cv = await getCV()

  return (
    <main style={{ background: 'var(--paper)', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ borderBottom: '1px solid var(--border)', background: 'var(--paper)' }} className="no-print sticky top-0 z-10">
        <div style={{ maxWidth: '100%', margin: '0 auto', padding: '0 4rem', height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <GlitchName name={cv.name} />
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <PrintButton />
          </div>
        </div>
      </header>

      <div style={{ maxWidth: '100%', margin: '0 auto', padding: '3rem 4rem 6rem' }}>

        {/* Hero */}
        <section className="animate-fade-up stagger-1" style={{ marginBottom: '4rem', paddingBottom: '3rem', borderBottom: '1px solid var(--border)' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            CV / Résumé
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3.5rem, 8vw, 6rem)', lineHeight: 1.05, color: 'var(--ink)', marginBottom: '0.75rem' }}>
            {cv.name}
          </h1>
          <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', color: 'var(--accent)', marginBottom: '2rem' }}>
            {cv.title}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
            {[
              { label: 'Email', value: cv.email, href: `mailto:${cv.email}` },
              { label: 'Phone', value: cv.phone, href: `tel:${cv.phone}` },
              { label: 'LinkedIn', value: 'linkedin.com/in/ismail-shuvo', href: cv.linkedin },
              { label: 'Location', value: cv.address, href: null },
            ].map(item => (
              <div key={item.label}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-faint)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>{item.label}</p>
                {item.href ? (
                  <a href={item.href} style={{ fontSize: 13, color: 'var(--ink)', textDecoration: 'none', borderBottom: '1px solid var(--border)' }}>
                    {item.value}
                  </a>
                ) : (
                  <p style={{ fontSize: 13, color: 'var(--ink)' }}>{item.value}</p>
                )}
              </div>
            ))}
          </div>
          <p style={{ fontSize: 16, color: 'var(--ink-muted)', lineHeight: 1.8, maxWidth: '100%' }}>
            {cv.about}
          </p>
        </section>

        {/* Skills */}
        <FadeSection delay={0}>
          <Section title="Skills" delay="stagger-2">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {cv.skills.map((skill, i) => (
                <span key={i} className="tag">{skill}</span>
              ))}
            </div>
          </Section>
        </FadeSection>

        {/* Experience */}
        <FadeSection delay={100}>
          <Section title="Experience" delay="stagger-3">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              {cv.experiences.map((exp, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '3px 1fr', gap: '0 2rem' }}>
                  <div style={{ background: i === 0 ? 'var(--accent)' : 'var(--border)', width: 3, marginTop: 4 }} />
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 4, marginBottom: 6 }}>
                      <h3 style={{ fontSize: 20, fontWeight: 500, color: 'var(--ink)' }}>{exp.role}</h3>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--ink-faint)' }}>{exp.period}</span>
                    </div>
                    <p style={{ fontSize: 15, color: 'var(--accent)', marginBottom: 14 }}>{exp.company} · {exp.location}</p>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {exp.bullets.map((b, j) => (
                        <li key={j} style={{ fontSize: 15, color: 'var(--ink-muted)', paddingLeft: 20, position: 'relative' }}>
                          <span style={{ position: 'absolute', left: 0, color: 'var(--accent)' }}>—</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </FadeSection>

        {/* Projects */}
        <FadeSection delay={200}>
          <Section title="Projects" delay="stagger-4">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {cv.projects.map((proj, i) => (
                <div key={i} style={{ background: 'var(--paper-warm)', border: '1px solid var(--border)', borderRadius: 8, padding: '1.25rem 1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 4, marginBottom: 4 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 500, color: 'var(--ink)' }}>{proj.title}</h3>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-faint)' }}>{proj.period}</span>
                  </div>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent)', marginBottom: 12 }}>{proj.description}</p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5, marginBottom: proj.link ? 12 : 0 }}>
                    {proj.bullets.map((b, j) => (
                      <li key={j} style={{ fontSize: 13, color: 'var(--ink-muted)', paddingLeft: 14, position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0, color: 'var(--accent)' }}>›</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noopener noreferrer"
                      style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent)', textDecoration: 'none' }}>
                      View project →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </Section>
        </FadeSection>

        {/* Education & Certs */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr', gap: '0 3rem' }}>
          <FadeSection delay={300}>
            <Section title="Education" delay="stagger-5">
              {cv.education.map((edu, i) => (
                <div key={i}>
                  <h3 style={{ fontSize: 15, fontWeight: 500, color: 'var(--ink)', marginBottom: 4 }}>{edu.degree}</h3>
                  <p style={{ fontSize: 13, color: 'var(--accent)', marginBottom: 2 }}>{edu.institution}</p>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-faint)' }}>{edu.period} · {edu.location}</p>
                </div>
              ))}
            </Section>
          </FadeSection>

          {/* Vertical divider */}
          <div style={{ background: 'var(--border)', width: 1 }} />

          <FadeSection delay={400}>
            <Section title="Certifications" delay="stagger-5">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {cv.certifications.map((cert, i) => (
                  <span key={i} style={{ background: 'var(--accent-soft)', color: 'var(--accent)', border: '1px solid #8c00ff', borderRadius: 4, padding: '16px 40px', fontSize: 20, fontWeight: 500 }}>
                    {cert}
                  </span>
                ))}
              </div>
            </Section>
          </FadeSection>
        </div>

      </div>

      <footer style={{ borderTop: '1px solid var(--border)', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'center' }} className="no-print">
        <Link href="/admin" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-faint)', textDecoration: 'none' }}>
          admin
        </Link>
      </footer>
    </main>
  )
}

function Section({ title, children, delay }: { title: string; children: React.ReactNode; delay?: string }) {
  return (
    <section className={`animate-fade-up ${delay || ''}`} style={{ marginBottom: '3.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.5rem' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-faint)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          {title}
        </span>
        <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>
      {children}
    </section>
  )
}
