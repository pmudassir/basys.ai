import axios from "axios"
import { useEffect, useState } from "react"
import { baseUrl } from "@/baseUrl"
import { useNavigate, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AuthRequest from "@/components/auth-request"

const Patient = () => {
  const [data, setData] = useState({
    name: "",
    age: "",
    condition: "",
    medicalHistory: [{ treatment: "", doctor: "", notes: "" }],
    medicationHistory: [{ medication: "", dosage: "" }],
    labResults: [{ date: "", test: "", result: "" }],
    treatmentPlan: {
      treatmentType: "",
      doctor: "",
      startDate: "",
      status: "Ongoing"
    }
  })
  const [isModalOpen, setIsModalOpen] = useState(false)

  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    getPatient()
  }, [])

  const getPatient = async () => {
    try {
      const res = await axios.get(`${baseUrl}/patients/${id}`)
      const data = await res.data
      setData(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  const handleNestedChange = (section, index, field, value) => {
    const updatedSection = [...data[section]];
    updatedSection[index][field] = value;
    setData({ ...data, [section]: updatedSection });
  }

  const handleTreatmentPlanChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      treatmentPlan: {
        ...data.treatmentPlan,
        [name]: value,
      }
    })
  }

  const handleSubmit = async () => {
    try {
      await axios.put(`${baseUrl}/patients/${id}`, data);
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  }

  const handleBack = () => {
    navigate("/")
  }

  return (
    <div className="flex items-center justify-center">
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>Patient Details</CardTitle>
          <CardDescription>You can view and update patient details here.</CardDescription>
        </CardHeader>
        <CardContent>
          <AuthRequest open={isModalOpen} setOpen={setIsModalOpen} patientId={id} />
          <Button onClick={() => setIsModalOpen(true)}>
            Request Authorization
          </Button>
          <form>
            <div className="grid w-full mt-5 items-center gap-4">
              {/* Basic Info */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={data.name} onChange={handleInputChange} placeholder="Name" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="age">Age</Label>
                <Input id="age" name="age" value={data.age} onChange={handleInputChange} placeholder="Age" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="condition">Condition</Label>
                <Input id="condition" name="condition" value={data.condition} onChange={handleInputChange} placeholder="Condition" />
              </div>

              {/* Medical History */}
              <h3 className="font-bold">Medical History</h3>
              {data.medicalHistory.length === 0 && (
                <>
                  <p className="text-muted-foreground text-xs">No medical history found.</p>
                  <Button variant="outline" onClick={() => setData({ ...data, medicalHistory: [{ treatment: "", doctor: "", notes: "" }] })}>Add History</Button>
                </>
              )}
              {data.medicalHistory.map((history, index) => (
                <div key={index} className="space-y-2">
                  <Input
                    placeholder="Treatment"
                    value={history.treatment}
                    onChange={(e) => handleNestedChange("medicalHistory", index, "treatment", e.target.value)}
                  />
                  <Input
                    placeholder="Doctor"
                    value={history.doctor}
                    onChange={(e) => handleNestedChange("medicalHistory", index, "doctor", e.target.value)}
                  />
                  <Input
                    placeholder="Notes"
                    value={history.notes}
                    onChange={(e) => handleNestedChange("medicalHistory", index, "notes", e.target.value)}
                  />
                </div>
              ))}

              {/* Medication History */}
              <h3 className="font-bold">Medication History</h3>
              {data.medicationHistory.length === 0 && (
                <>
                  <p className="text-muted-foreground text-xs">No medication history found.</p>
                  <Button variant="outline" onClick={() => setData({ ...data, medicationHistory: [{ medication: "", dosage: "" }] })}>Add Medication</Button>
                </>
              )}
              {data.medicationHistory.map((medication, index) => (
                <div key={index} className="space-y-2">
                  <Input
                    placeholder="Medication"
                    value={medication.medication}
                    onChange={(e) => handleNestedChange("medicationHistory", index, "medication", e.target.value)}
                  />
                  <Input
                    placeholder="Dosage"
                    value={medication.dosage}
                    onChange={(e) => handleNestedChange("medicationHistory", index, "dosage", e.target.value)}
                  />
                </div>
              ))}

              {/* Lab Results */}
              <h3 className="font-bold">Lab Results</h3>
              {data.labResults.length === 0 && (
                <>
                  <p className="text-muted-foreground text-xs">No lab results found.</p>
                  <Button variant="outline" onClick={() => setData({ ...data, labResults: [{ date: "", test: "", result: "" }] })}>Add Result</Button>
                </>
              )}
              {data.labResults.map((result, index) => (
                <div key={index} className="space-y-2">
                  <Input
                    placeholder="Test"
                    value={result.test}
                    onChange={(e) => handleNestedChange("labResults", index, "test", e.target.value)}
                  />
                  <Input
                    type="date"
                    placeholder="Date"
                    value={result.date?.split("T")[0]} // formatting Date
                    onChange={(e) => handleNestedChange("labResults", index, "date", e.target.value)}
                  />
                  <Input
                    placeholder="Result"
                    value={result.result}
                    onChange={(e) => handleNestedChange("labResults", index, "result", e.target.value)}
                  />
                </div>
              ))}

              {/* Treatment Plan */}
              <h3 className="font-bold">Treatment Plan</h3>
              <Input
                placeholder="Treatment Type"
                name="treatmentType"
                value={data.treatmentPlan.treatmentType}
                onChange={handleTreatmentPlanChange}
              />
              <Input
                placeholder="Doctor"
                name="doctor"
                value={data.treatmentPlan.doctor}
                onChange={handleTreatmentPlanChange}
              />
              <Input
                type="date"
                placeholder="Start Date"
                name="startDate"
                value={data.treatmentPlan.startDate?.split("T")[0]}
                onChange={handleTreatmentPlanChange}
              />
              <Select onValueChange={(value) => handleTreatmentPlanChange({ target: { name: 'status', value } })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ongoing">Ongoing</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Discontinued">Discontinued</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleBack} variant="outline">Back</Button>
          <Button onClick={handleSubmit}> Update</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Patient
