import React, { useState, useEffect } from 'react'
import ImmCard from "../../components/immCard/ImmCard"
import ProcessTable from "../../components/processTable/ProcessTable"
import { fetchStatusData, processTableColumnDefinition } from "../../services/utility/homePageUtility"
import io from 'socket.io-client'
import "./home.scss"
import config from '../../config/config'

const Home: React.FC = () => {
  const [machineStatus, setMachineStatus] = useState<any[]>([])
  const [processTableData, setProcessTableData] = useState<any[]>([])
  const [newRowIndex, setNewRowIndex] = useState<number | null>(null) // State to track newly added row
  let timer: NodeJS.Timeout

  useEffect(() => {
    const socket = io(config.baseURL)
    socket.on('processRecord', (data) => {
      clearTimeout(timer)
      const newData = { ...data, id: data.datamatrix }
      setProcessTableData(prevData => [newData, ...prevData.slice(0, 19)])
      setNewRowIndex(data.datamatrix) 
       timer = setTimeout(() => setNewRowIndex(null), 2000) 
    })

    const fetchData = async () => {
      try {
        const { machineStatus } = await fetchStatusData()
        setMachineStatus(machineStatus)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchData()
    const interval = setInterval(fetchData, 60000)

    return () => {
      clearInterval(interval)
      socket.disconnect()
    }
  }, [])

  return (
    <div className="home">
      {machineStatus.map((item, index) => (
        <div key={index} className="cardcell card">
          <ImmCard {...item} />
        </div>
      ))}
      <div className="cell table">
        <ProcessTable
          title="Process"
          columns={processTableColumnDefinition}
          rows={processTableData}
          newRowIndex={newRowIndex}
        />
      </div>
    </div>
  )
}

export default Home
