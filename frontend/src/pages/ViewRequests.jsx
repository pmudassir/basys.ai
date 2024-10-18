import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import axios from "axios"
import { baseUrl } from "@/baseUrl"

const RequestsModal = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    getAuthorizationRequest()
  }, [])

  const getAuthorizationRequest = async () => {
    try {
      const res = await axios.get(`${baseUrl}/auth-requests`)
      console.log(res.data);
      setData(res.data)
    } catch (error) {
      console.log("No existing authorization request found", error)
    }
  }
  return (
    <div className="gap-4 py-4 justify-center items-center flex flex-col">
      <Label className="text-center font-bold">Authorization Requests</Label>
      {data.map((request) => (
        <Card key={request._id} className="p-10">
          <CardHeader>
            <CardTitle>{request.patientId.name}</CardTitle>
          </CardHeader>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-bold">Treatment Type</Label>
            <Input
              value={request.treatmentType}
              className="col-span-3"
              readOnly
            />
            <Label className="text-right font-bold">Insurance Plan</Label>
            <Input
              value={request.insurancePlan}
              className="col-span-3"
              readOnly
            />
            <Label className="text-right font-bold">Date of Service</Label>
            <Input
              value={request.dateOfService}
              className="col-span-3"
              readOnly
            />
            <Label className="text-right font-bold">Authorization Status</Label>
            <Input
              value={request.requestStatus}
              className="col-span-3"
              readOnly
            />
          </div>
        </Card>
      ))}
    </div>
  )
}

export default RequestsModal