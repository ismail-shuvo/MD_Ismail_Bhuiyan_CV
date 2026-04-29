import { NextResponse } from 'next/server'
import { defaultCV } from '@/lib/defaultCV'

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

    const res = await fetch(`${supabaseUrl}/rest/v1/cv_data?select=*&limit=1`, {
      headers: {
        'apikey': serviceKey,
        'Authorization': `Bearer ${serviceKey}`,
      },
      cache: 'no-store'
    })

    const data = await res.json()
    if (!data?.length) return NextResponse.json(defaultCV)
    return NextResponse.json(data[0])
  } catch {
    return NextResponse.json(defaultCV)
  }
}
