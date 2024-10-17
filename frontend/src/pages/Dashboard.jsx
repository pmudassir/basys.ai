import { columns } from "@/components/columns"
import { DataTable } from "@/components/data-table"
import axios from "axios"
import { useEffect, useState } from "react"
import { baseUrl } from "@/baseUrl"

const Dashboard = () => {
  const [data, setData] = useState('')

  useEffect(() => {
    getPatients()
  }, [])

  const getPatients = async () => {
    try {
      const res = await axios.get(`${baseUrl}/patients`)
      const data = await res.data
      setData(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome to Basys.ai !</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of Patients.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            Hello
          </div>
        </div>
        <DataTable columns={columns} data={data} refreshPatient={getPatients} />
      </div>
    </>
  )
}

export default Dashboard