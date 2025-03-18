"use client"

import { format } from "date-fns";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function WorkSubmissionForm({ userProfile }: { userProfile: any }) {
    console.log("User Profile received:", userProfile); // Debug to verify prop
    
    // Format the current date
    const currentDate: string = format(new Date(), "PPP");

    // Form state, validation, submission logic
    // This component would handle the actual submission process
    // and would receive the userId prop to associate with submissions
    
    return (
        
      <div className="p-4 border rounded-md">
        <h2 className="text-xl font-bold mb-4">{userProfile?.username}</h2>
        
        
        <Card>
            <CardHeader>
                <CardTitle>Work Submission For {currentDate}</CardTitle>
            </CardHeader>
            <CardContent>
                <textarea></textarea>
            </CardContent>



            <Button>Submit Work</Button>
        </Card>



      </div>
    );
  }