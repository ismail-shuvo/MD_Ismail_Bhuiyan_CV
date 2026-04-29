import { NextRequest, NextResponse } from 'next/server'
import { defaultCV } from '@/lib/defaultCV'

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!authHeader || authHeader !== `Bearer ${adminPassword}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    if (body._check) return NextResponse.json({ ok: true })

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

    // Check if row exists
    const getRes = await fetch(`${supabaseUrl}/rest/v1/cv_data?select=id&limit=1`, {
      headers: {
        'apikey': serviceKey,
        'Authorization': `Bearer ${serviceKey}`,
        'Content-Type': 'application/json'
      }
    })
    const existing = await getRes.json()

    const payload = { ...body, updated_at: new Date().toISOString() }
    delete payload._check

    let res
    if (existing?.length > 0) {
      res = await fetch(`${supabaseUrl}/rest/v1/cv_data?id=eq.${existing[0].id}`, {
        method: 'PATCH',
        headers: {
          'apikey': serviceKey,
          'Authorization': `Bearer ${serviceKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(payload)
      })
    } else {
      res = await fetch(`${supabaseUrl}/rest/v1/cv_data`, {
        method: 'POST',
        headers: {
          'apikey': serviceKey,
          'Authorization': `Bearer ${serviceKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(payload)
      })
    }

    if (!res.ok) {
      const err = await res.text()
      throw new Error(err)
    }

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('Admin API error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
