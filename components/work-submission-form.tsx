"use client"

import { format } from "date-fns";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from '@/utils/supabase/client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


// Define the props for the WorkSubmissionForm component
interface WorkSubmissionFormProps {
  userProfile: {
    id: string;
    username: string;
  } | null;
}

interface WorkDetail {
  detailsNote: string;
  shootType: string;
  skuCount: number;
}

// Define the WorkSubmissionForm component
export function WorkSubmissionForm({ userProfile }: WorkSubmissionFormProps) {
  const supabase = createClient()
  const [combinedWorkDetails, setCombinedWorkDetails] = useState<WorkDetail[]>([])
  

  
  // Overall notes from day 
  const [submissionNotes, setSubmissionNotes] = useState("")

  // Specific details for each task 
  const [workDetails, setWorkDetails] = useState<WorkDetail>({
    detailsNote: "",
    shootType: "",
    skuCount: 0,
  })

  // Add the work details to the combined work details array
  const addWorkDetail = () => {
    setCombinedWorkDetails([...combinedWorkDetails, workDetails])
    setWorkDetails({
      detailsNote: "",
      shootType: "",
      skuCount: 0,
    })
    

    console.log("Combined work details:", combinedWorkDetails)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    // Prevent from refreshing the page when the form is submitted
    e.preventDefault()
    if (!userProfile?.id) {
      console.error("No user ID available")
      return
    }

    try {
      // Double check auth before submission
      const { data: { user } } = await supabase.auth.getUser()
      console.log("Auth check before submission:", user?.id)

      // First verify we can read the auth user
      const { data: authData, error: authError } = await supabase
        .from('profiles')
        .select('id')
        .single()
      
      console.log("Profile check:", { authData, authError })

      if (!user?.id) {
        throw new Error('No authenticated user found')
      }

      const {data: submissionData, error: submissionError} = await supabase
      .from("work_submissions")
      .insert([{
        user_id: userProfile.id, 
        notes: submissionNotes,
        created_at: new Date(),
      }])
      .select()
      
      console.log("Submission attempt result:", { data: submissionData, error: submissionError })

      if (submissionError || !submissionData?.[0]) {
        throw submissionError || new Error('No submission data returned')
      }

      const { error: detailsError } = await supabase
      .from('work_details')
      .insert([
        {
          work_submission: submissionData[0].id,
          shoot_type: workDetails.shootType,
          sku_count: workDetails.skuCount,
          notes: workDetails.detailsNote,
          created_at: new Date()
        }
      ]);
    
      if (detailsError) throw detailsError;
      // Clear form after successful submission
      setSubmissionNotes("")
      setWorkDetails({
        detailsNote: "",
        shootType: "",
        skuCount: 0,
      })
      
    } catch (error) {
      console.error('Error submitting work:', error)
      // You might want to show this error to the user in a more friendly way
    }
  }

  return (
      


      <form onSubmit={handleSubmit} className="space-y-8">
    <Card className="w-full bg-[#161b22] border-[#30363d]">
      <CardHeader>
        <CardTitle>Work Submission</CardTitle>
      </CardHeader>
      <CardContent>
              {/* {Work Detail Notes Section - Overall Notes i.e. Work Submissions */}
              <div>
                <label> General Notes:</label>
                <Textarea 
                  id="notes"
                  placeholder=""
                  className="resize-none "
                  value={submissionNotes}
                  onChange={(e) => setSubmissionNotes(e.target.value)}>
                </Textarea>
              </div>
              {/* Work Task Section - Specific Details for each task i.e. Work Details */}
              <div>
                <Label>SKU Count</Label>
                <Input
                id="skuCount"
                type="number"
                min="0"
                value={workDetails.skuCount}
                onChange={(e) => setWorkDetails({...workDetails, skuCount: parseInt(e.target.value) || 0})}
              />


              
              <div>

                <Label>Shoot Type</Label>

                {/* Dropdown for Shoot Type */}
                {/* Set the workDetail property, shootType, to the selected value */}
                <Select required value={workDetails.shootType}
                  // Uisng an anon function to update the shootType property
                  onValueChange={(value) => setWorkDetails({...workDetails, shootType: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a shoot type" />
                </SelectTrigger>

                <SelectContent >
                  <SelectItem value="Flat-Lay">Flat-Lay</SelectItem>
                  <SelectItem value="Still-Life">Still-Life</SelectItem>
                  <SelectItem value="Studio Model">Studio Model</SelectItem>
                  <SelectItem value="Creative">Creative</SelectItem>
                </SelectContent>


                </Select>

                <Button 
                  type="button" // Important: type="button" prevents form submission
                  onClick={addWorkDetail} 
                  className="mt-4 mr-2"
                >
                  Add Work Detail
                </Button>


              </div>

              <div>
                {combinedWorkDetails.map((detail, index) => (
                  <div key={index}>
                    <p>Shoot Type: {detail.shootType}</p>
                    <p>SKU Count: {detail.skuCount}</p>
                    <p>Details Note: {detail.detailsNote}</p>
                  </div>
                ))}
              </div>
                <hr />
              
                <Button type="submit" className="mt-4" >Submit Work</Button>
              </div>
          </CardContent>
        </Card>
      </form>

  );
}