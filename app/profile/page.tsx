import { WorkSubmissionForm } from '@/components/work-submission-form';
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation';


export default async function Page() {

  // Establish connection to Supabase
  const supabase = await createClient()


  // Destructure user object via Supabase auth
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Get user profile from Supabase 
  const { data: userProfile, error: profileError } = await supabase
    .from('profiles')
    .select('id, username')  // Only select needed fields
    .eq('id', user.id)  // Assuming user is already checked for null
    .single();  // Expect a single result


  if (profileError) {
    console.log(profileError + "Profile not found")
  }

  return (
    <>
    <WorkSubmissionForm userProfile={userProfile} />
    </>



)
}