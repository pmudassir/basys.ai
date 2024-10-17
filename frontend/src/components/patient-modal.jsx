import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import axios from "axios"
import { baseUrl } from "@/baseUrl"

// eslint-disable-next-line react/prop-types
const PatientModal = ({ open, setOpen, refreshPatient }) => {
  const [patientDetails, setPatientDetails] = useState({
    name: "",
    age: "",
    condition: "",
    treatmentPlan: {
      treatmentType: "",
      status: "",
    }
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setPatientDetails((prevDetails) => ({
        ...prevDetails,
        [parent]: {
          ...prevDetails[parent],
          [child]: value,
        },
      }));
    } else {
      setPatientDetails({
        ...patientDetails,
        [name]: value,
      });
    }
  };

  const handleStatusChange = (status) => {
    setPatientDetails((prevDetails) => ({
      ...prevDetails,
      treatmentPlan: {
        ...prevDetails.treatmentPlan,
        status: status,
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${baseUrl}/patients`, patientDetails);
      setOpen(false);
      refreshPatient()
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Patient</DialogTitle>
          <DialogDescription>
            Add the patients details. Click create to add the patient once you have filled in the details.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Patient Name"
              onChange={handleInputChange}
              value={patientDetails.name}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="age" className="text-right">
              Age
            </Label>
            <Input
              id="age"
              name="age"
              placeholder="Patient Age"
              onChange={handleInputChange}
              value={patientDetails.age}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="condition" className="text-right">
              Condition
            </Label>
            <Input
              id="condition"
              name="condition"
              placeholder="Patient Condition"
              onChange={handleInputChange}
              value={patientDetails.condition}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="treatmentPlan.treatmentType" className="text-right">
              Treatment
            </Label>
            <Input
              id="treatmentPlan.treatmentType"
              name="treatmentPlan.treatmentType"
              placeholder="Treatment Type"
              onChange={handleInputChange}
              value={patientDetails.treatmentPlan.treatmentType}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="treatmentPlan.status" className="text-right">
              Status
            </Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-5">
                  <span className="sr-only">Open menu</span>
                  {patientDetails.treatmentPlan.status ? patientDetails.treatmentPlan.status : "Status"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => handleStatusChange("Ongoing")}>
                  Ongoing
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleStatusChange("Completed")}>
                  Completed
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleStatusChange("Discontinued")}>
                  Discontinued
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} type="submit">Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default PatientModal
