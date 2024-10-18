import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from "axios"
import { baseUrl } from "@/baseUrl"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"


// eslint-disable-next-line react/prop-types
const AuthRequest = ({ patientId, open, setOpen }) => {
  const [formData, setFormData] = useState({
    treatmentType: '',
    insurancePlan: '',
    dateOfService: '',
    diagnosisCode: '',
    doctorNotes: '',
    requestStatus: 'Pending',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSelectChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = async () => {
    try {
      await axios.post(`${baseUrl}/auth-requests`, {
        ...formData,
        patientId,
      })
      alert('Authorization request created successfully')
    } catch (error) {
      console.error("Error creating authorization request", error)
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Authorization Request</DialogTitle>
          </DialogHeader>
          <div className="p-4 space-y-4">
            <>
              <Label>Treatment Type</Label>
              <Input
                name="treatmentType"
                value={formData.treatmentType}
                onChange={handleInputChange}
                placeholder="Enter treatment type"
              />

              <Label>Insurance Plan</Label>
              <Input
                name="insurancePlan"
                value={formData.insurancePlan}
                onChange={handleInputChange}
                placeholder="Enter insurance plan"
              />

              <Label>Date of Service</Label>
              <Input
                name="dateOfService"
                type="date"
                value={formData.dateOfService}
                onChange={handleInputChange}
              />

              <Label>Diagnosis Code</Label>
              <Input
                name="diagnosisCode"
                value={formData.diagnosisCode}
                onChange={handleInputChange}
                placeholder="Enter diagnosis code"
              />

              <Label>Doctor Notes</Label>
              <Input
                name="doctorNotes"
                value={formData.doctorNotes}
                onChange={handleInputChange}
                placeholder="Enter doctor notes"
              />

              <Label>Request Status</Label>
              <Select
                onValueChange={(value) => handleSelectChange("requestStatus", value)}
                value={formData.requestStatus}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Denied">Denied</SelectItem>
                </SelectContent>
              </Select>
            </>
          </div>
          <div className="flex justify-end p-4">
            <Button onClick={handleSubmit}>
              Submit Request
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AuthRequest
