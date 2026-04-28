import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { defaultCV } from '@/lib/defaultCV'

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
    const { data, error } = await supabase
      .from('cv_data')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(1)
      .single()

    if (error || !data) {
      return NextResponse.json(defaultCV)
    }
    return NextResponse.json(data)
  } catch {
    return NextResponse.json(defaultCV)
  }
}
