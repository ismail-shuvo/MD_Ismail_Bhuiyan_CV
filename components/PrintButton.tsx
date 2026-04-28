'use client'

export default function PrintButton() {
  return (
    <a href="/cv.pdf" download="MD_Ismail_Bhuiyan_CV.pdf" className="btn-secondary" style={{ fontSize: 12, padding: '5px 12px', textDecoration: 'none', display: 'inline-block' }}>
      Download CV (PDF)
    </a>
  )
}
