import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Modal } from "@/components/ui/modal" // Assume you have a modal component
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from "axios"
import { baseUrl } from "@/baseUrl"

const AuthRequest = ({ patientId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [authRequest, setAuthRequest] = useState(null) // To hold auth request data if it exists
  const [formData, setFormData] = useState({
    treatmentType: '',
    insurancePlan: '',
    dateOfService: '',
    diagnosisCode: '',
    doctorNotes: '',
    requestStatus: 'Pending',
  })

  useEffect(() => {
    // Fetch existing authorization request if it exists
    getAuthorizationRequest()
  }, [])

  const getAuthorizationRequest = async () => {
    try {
      const res = await axios.get(`${baseUrl}/auth-requests/${patientId}`)
      if (res.data) {
        setAuthRequest(res.data)
        setFormData(res.data) // Pre-fill form with existing data
      }
    } catch (error) {
      console.log("No existing authorization request found", error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSelectChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = async () => {
    if (authRequest) {
      // Update the existing request status
      try {
        await axios.put(`${baseUrl}/auth-requests/${authRequest._id}`, {
          requestStatus: formData.requestStatus,
        })
        alert('Authorization request updated successfully')
        setIsModalOpen(false)
      } catch (error) {
        console.error("Error updating authorization request", error)
      }
    } else {
      // Create a new authorization request
      try {
        await axios.post(`${baseUrl}/auth-requests`, {
          ...formData,
          patientId,
        })
        alert('Authorization request created successfully')
        setIsModalOpen(false)
        getAuthorizationRequest() // Refresh the auth request
      } catch (error) {
        console.error("Error creating authorization request", error)
      }
    }
  }

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>
        {authRequest ? "View Authorization" : "Request Authorization"}
      </Button>

      {/* Modal */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)} title="Authorization Request">
          <div className="p-4 space-y-4">
            {authRequest ? (
              <>
                <Label>Treatment Type</Label>
                <Input value={authRequest.treatmentType} readOnly />

                <Label>Insurance Plan</Label>
                <Input value={authRequest.insurancePlan} readOnly />

                <Label>Date of Service</Label>
                <Input type="date" value={authRequest.dateOfService.split('T')[0]} readOnly />

                <Label>Diagnosis Code</Label>
                <Input value={authRequest.diagnosisCode} readOnly />

                <Label>Doctor Notes</Label>
                <Input value={authRequest.doctorNotes} readOnly />

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
            ) : (
              <>
                {/* Input form for new authorization request */}
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
            )}
          </div>
          <div className="flex justify-end p-4">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {authRequest ? "Update Request" : "Submit Request"}
            </Button>
          </div>
        </Modal>
      )}
    </>
  )
}

export default AuthRequest
