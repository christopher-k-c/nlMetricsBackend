import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import React from "react";

export default async function WorkListPage() {
  const supabase = await createClient();
  // Auth check (optional, or you can show public list)
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/sign-in");
  }

  // Fetch all work submissions and their details
  const { data: submissions, error } = await supabase
    .from('work_submissions')
    .select('id, notes, created_at, user_id, work_details(id, shoot_type, sku_count, notes, created_at)')
    .order('created_at', { ascending: false });

  if (error) {
    return <div>Error loading submissions: {error.message}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-white">All Work Submissions</h1>
      <div className="space-y-6">
        {submissions && submissions.length > 0 ? (
          submissions.map((submission: any) => (
            <Card key={submission.id} className="bg-[#161b22] border-[#30363d] text-white">
              <CardHeader>
                <CardTitle className="text-xl">Submission #{submission.id}</CardTitle>
                <div className="text-sm text-[#8b949e]">{new Date(submission.created_at).toLocaleString()}</div>
                <div className="text-sm text-[#8b949e]">User ID: {submission.user_id}</div>
                <div className="mt-2">Notes: {submission.notes}</div>
              </CardHeader>
              <CardContent>
                <details>
                  <summary className="cursor-pointer font-semibold mb-2">Show Work Details</summary>
                  <div className="space-y-2 mt-2">
                    {submission.work_details && submission.work_details.length > 0 ? (
                      submission.work_details.map((detail: any) => (
                        <div key={detail.id} className="p-3 border rounded bg-[#0d1117] border-[#30363d]">
                          <div>Shoot Type: {detail.shoot_type}</div>
                          <div>SKU Count: {detail.sku_count}</div>
                          <div>Notes: {detail.notes}</div>
                          <div className="text-xs text-[#8b949e]">{new Date(detail.created_at).toLocaleString()}</div>
                        </div>
                      ))
                    ) : (
                      <div className="text-[#8b949e]">No work details.</div>
                    )}
                  </div>
                </details>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-[#8b949e]">No submissions found.</div>
        )}
      </div>
    </div>
  );
} 