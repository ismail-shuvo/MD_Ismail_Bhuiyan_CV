'use client'
import { useState, useEffect } from 'react'
import { CVData, Experience, Project, Education } from '@/types/cv'
import { defaultCV } from '@/lib/defaultCV'

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [authError, setAuthError] = useState('')
  const [cv, setCV] = useState<CVData>(defaultCV)
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState('basics')

  useEffect(() => {
    const stored = sessionStorage.getItem('admin_token')
    if (stored) { setAuthed(true); loadCV(stored) }
  }, [])

  async function loadCV(token: string) {
    const res = await fetch('/api/cv')
    if (res.ok) setCV(await res.json())
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setAuthError('')
    const res = await fetch('/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${password}` },
      body: JSON.stringify({ _check: true })
    })
    if (res.status === 401) { setAuthError('Wrong password'); return }
    sessionStorage.setItem('admin_token', password)
    setAuthed(true)
    loadCV(password)
  }

  async function handleSave() {
    setLoading(true)
    setSaved(false)
    const token = sessionStorage.getItem('admin_token') || password
    const res = await fetch('/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(cv)
    })
    setLoading(false)
    if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 3000) }
  }

  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--paper)' }}>
        <div style={{ width: 360, padding: '2.5rem', border: '1px solid var(--border)', borderRadius: 12, background: 'white' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>Admin Access</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: '1.5rem' }}>CV Editor</h1>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input type="password" placeholder="Admin password" value={password} onChange={e => setPassword(e.target.value)} autoFocus />
            {authError && <p style={{ fontSize: 13, color: 'var(--accent)' }}>{authError}</p>}
            <button type="submit" className="btn-primary">Enter →</button>
          </form>
        </div>
      </div>
    )
  }

  const tabs = ['basics', 'experience', 'projects', 'education', 'skills']

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper-warm)' }}>
      {/* Top bar */}
      <div style={{ background: 'white', borderBottom: '1px solid var(--border)', padding: '0 2rem', height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-muted)' }}>cv-editor</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-faint)' }}>/ admin</span>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {saved && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'green' }}>✓ saved</span>}
          <a href="/" target="_blank" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-muted)', textDecoration: 'none' }}>view cv →</a>
          <button className="btn-primary" onClick={handleSave} disabled={loading} style={{ padding: '6px 18px', fontSize: 13 }}>
            {loading ? 'saving...' : 'Save changes'}
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: '2rem', background: 'white', padding: 4, borderRadius: 8, border: '1px solid var(--border)' }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)}
              style={{ padding: '6px 16px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13, fontFamily: 'var(--font-body)',
                background: activeTab === t ? 'var(--accent)' : 'transparent',
                color: activeTab === t ? 'white' : 'var(--ink-muted)', fontWeight: activeTab === t ? 500 : 400 }}>
              {t}
            </button>
          ))}
        </div>

        {/* Basics */}
        {activeTab === 'basics' && (
          <Card title="Basic Information">
            <Grid>
              <Field label="Full Name"><input value={cv.name} onChange={e => setCV({...cv, name: e.target.value})} /></Field>
              <Field label="Title / Role"><input value={cv.title} onChange={e => setCV({...cv, title: e.target.value})} /></Field>
              <Field label="Email"><input value={cv.email} onChange={e => setCV({...cv, email: e.target.value})} /></Field>
              <Field label="Phone"><input value={cv.phone} onChange={e => setCV({...cv, phone: e.target.value})} /></Field>
              <Field label="LinkedIn URL"><input value={cv.linkedin} onChange={e => setCV({...cv, linkedin: e.target.value})} /></Field>
              <Field label="Address"><input value={cv.address} onChange={e => setCV({...cv, address: e.target.value})} /></Field>
            </Grid>
            <Field label="About / Summary" style={{ marginTop: 16 }}>
              <textarea rows={5} value={cv.about} onChange={e => setCV({...cv, about: e.target.value})} style={{ resize: 'vertical' }} />
            </Field>
          </Card>
        )}

        {/* Experience */}
        {activeTab === 'experience' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {cv.experiences.map((exp, i) => (
              <Card key={i} title={`Experience ${i + 1}`} onDelete={() => setCV({...cv, experiences: cv.experiences.filter((_, j) => j !== i)})}>
                <Grid>
                  <Field label="Role"><input value={exp.role} onChange={e => updateExp(i, 'role', e.target.value, cv, setCV)} /></Field>
                  <Field label="Company"><input value={exp.company} onChange={e => updateExp(i, 'company', e.target.value, cv, setCV)} /></Field>
                  <Field label="Period"><input value={exp.period} onChange={e => updateExp(i, 'period', e.target.value, cv, setCV)} /></Field>
                  <Field label="Location"><input value={exp.location} onChange={e => updateExp(i, 'location', e.target.value, cv, setCV)} /></Field>
                </Grid>
                <Field label="Bullet points (one per line)" style={{ marginTop: 12 }}>
                  <textarea rows={5} value={exp.bullets.join('\n')}
                    onChange={e => updateExp(i, 'bullets', e.target.value.split('\n'), cv, setCV)}
                    style={{ resize: 'vertical' }} />
                </Field>
              </Card>
            ))}
           <button className="btn-secondary" onClick={() => setCV({...cv, experiences: [{ role: '', company: '', period: '', location: '', bullets: [] }, ...cv.experiences]})}>
  + Add experience
</button>
          </div>
        )}

        {/* Projects */}
        {activeTab === 'projects' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {cv.projects.map((proj, i) => (
              <Card key={i} title={`Project ${i + 1}`} onDelete={() => setCV({...cv, projects: cv.projects.filter((_, j) => j !== i)})}>
                <Grid>
                  <Field label="Title"><input value={proj.title} onChange={e => updateProj(i, 'title', e.target.value, cv, setCV)} /></Field>
                  <Field label="Period"><input value={proj.period} onChange={e => updateProj(i, 'period', e.target.value, cv, setCV)} /></Field>
                  <Field label="Description/Stack"><input value={proj.description} onChange={e => updateProj(i, 'description', e.target.value, cv, setCV)} /></Field>
                  <Field label="Link (optional)"><input value={proj.link || ''} onChange={e => updateProj(i, 'link', e.target.value, cv, setCV)} /></Field>
                </Grid>
                <Field label="Bullet points (one per line)" style={{ marginTop: 12 }}>
                  <textarea rows={4} value={proj.bullets.join('\n')}
                    onChange={e => updateProj(i, 'bullets', e.target.value.split('\n'), cv, setCV)}
                    style={{ resize: 'vertical' }} />
                </Field>
              </Card>
            ))}
          // Projects
<button className="btn-secondary" onClick={() => setCV({...cv, projects: [{ title: '', period: '', description: '', bullets: [], link: '' }, ...cv.projects]})}>
  + Add project
</button>
          </div>
        )}

        {/* Education */}
        {activeTab === 'education' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {cv.education.map((edu, i) => (
              <Card key={i} title={`Education ${i + 1}`} onDelete={() => setCV({...cv, education: cv.education.filter((_, j) => j !== i)})}>
                <Grid>
                  <Field label="Degree"><input value={edu.degree} onChange={e => updateEdu(i, 'degree', e.target.value, cv, setCV)} /></Field>
                  <Field label="Institution"><input value={edu.institution} onChange={e => updateEdu(i, 'institution', e.target.value, cv, setCV)} /></Field>
                  <Field label="Period"><input value={edu.period} onChange={e => updateEdu(i, 'period', e.target.value, cv, setCV)} /></Field>
                  <Field label="Location"><input value={edu.location} onChange={e => updateEdu(i, 'location', e.target.value, cv, setCV)} /></Field>
                </Grid>
              </Card>
            ))}
          // Education
<button className="btn-secondary" onClick={() => setCV({...cv, education: [{ degree: '', institution: '', period: '', location: '' }, ...cv.education]})}>
  + Add education
</button>

            <Card title="Certifications">
              <Field label="One per line">
                <textarea rows={4} value={cv.certifications.join('\n')}
                  onChange={e => setCV({...cv, certifications: e.target.value.split('\n').filter(Boolean)})}
                  style={{ resize: 'vertical' }} />
              </Field>
            </Card>
          </div>
        )}

        {/* Skills */}
        {activeTab === 'skills' && (
          <Card title="Skills">
            <Field label="One skill per line">
              <textarea rows={12} value={cv.skills.join('\n')}
                onChange={e => setCV({...cv, skills: e.target.value.split('\n').filter(Boolean)})}
                style={{ resize: 'vertical' }} />
            </Field>
            <p style={{ fontSize: 12, color: 'var(--ink-faint)', marginTop: 8 }}>
              {cv.skills.length} skills total
            </p>
          </Card>
        )}
      </div>
    </div>
  )
}

function updateExp(i: number, key: keyof Experience, val: string | string[], cv: CVData, setCV: (cv: CVData) => void) {
  const exps = [...cv.experiences]
  exps[i] = { ...exps[i], [key]: val }
  setCV({ ...cv, experiences: exps })
}

function updateProj(i: number, key: keyof Project, val: string | string[], cv: CVData, setCV: (cv: CVData) => void) {
  const projs = [...cv.projects]
  projs[i] = { ...projs[i], [key]: val }
  setCV({ ...cv, projects: projs })
}

function updateEdu(i: number, key: keyof Education, val: string, cv: CVData, setCV: (cv: CVData) => void) {
  const edus = [...cv.education]
  edus[i] = { ...edus[i], [key]: val }
  setCV({ ...cv, education: edus })
}

function Card({ title, children, onDelete }: { title: string; children: React.ReactNode; onDelete?: () => void }) {
  return (
    <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 10, padding: '1.25rem 1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-faint)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{title}</p>
        {onDelete && <button onClick={onDelete} style={{ background: 'none', border: 'none', color: 'var(--ink-faint)', cursor: 'pointer', fontSize: 18 }}>×</button>}
      </div>
      {children}
    </div>
  )
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>{children}</div>
}

function Field({ label, children, style }: { label: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={style}>
      <p style={{ fontSize: 11, color: 'var(--ink-muted)', marginBottom: 4, fontFamily: 'var(--font-mono)' }}>{label}</p>
      {children}
    </div>
  )
}
