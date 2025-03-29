"use client"

import { format } from "date-fns";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function WorkSubmissionForm({ userProfile }: { userProfile: any }) {
    console.log("User Profile received:", userProfile); // Debug to verify prop
    
    // Format the current date
    const currentDate: string = format(new Date(), "PPP");
    
    // Overall notes from day 
    const [submissionNotes, setSubmissionNotes] = useState("")

    // Specific details for each task 
    const [workDetails, setWorkDetails] = useState({
        detailsNote: "",
        shootType: "",
        skuCount: 0,
      })


      const handleSubmit = () => {

        console.log("Form submitted")
      }
      

  
    return (
        
      <div className="p-4 border rounded-md">
        {/* <h2 className="text-xl font-bold mb-4">{userProfile?.username}</h2> */}
        
        <form onSubmit={handleSubmit}>
        <Card>

            <CardHeader>

                <CardTitle>Work Submission</CardTitle>
            
            </CardHeader>

            <CardContent>
                {/* {Work Detail Notes Section} */}
                <div>
                  <label> General Notes:</label>

                  <Textarea 

                    id="notes"
                    placeholder=""
                    className="resize-none"
                    value={submissionNotes}
                    onChange={(e) => setSubmissionNotes(e.target.value)}>

                  </Textarea>

                </div>

                <div>

                  
                  // Button to add 

                  
                  <Label>SKU Count</Label>
                  <Input/>
                  <Label>Shoot Type</Label>
                  <Input/>
              
                <Button className="mt-4" >Submit Work</Button>
                </div>
            </CardContent>




        </Card>
        </form>



      </div>
    );
  }