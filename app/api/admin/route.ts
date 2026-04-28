import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!authHeader || authHeader !== `Bearer ${adminPassword}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { data: existing } = await supabase
      .from('cv_data')
      .select('id')
      .limit(1)
      .single()

    let result
    if (existing?.id) {
      result = await supabase
        .from('cv_data')
        .update({ ...body, updated_at: new Date().toISOString() })
        .eq('id', existing.id)
    } else {
      result = await supabase
        .from('cv_data')
        .insert([{ ...body, updated_at: new Date().toISOString() }])
    }

    if (result.error) throw result.error
    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
