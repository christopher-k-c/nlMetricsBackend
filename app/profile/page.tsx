import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation';

export default async function Page() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }
  const { data: profiles } = await supabase.from('profiles').select()

  return <pre>{JSON.stringify(profiles, null, 2)}</pre>
}