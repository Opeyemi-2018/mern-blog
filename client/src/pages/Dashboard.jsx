import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import DashSidebar from "../components/DashSidebar"
import Profile from "../components/Profile"

const Dashboard = () => {
  let location = useLocation()
  let [tab, setTab] = useState('')

  useEffect(() => {
    let urlParams = new URLSearchParams(location.search)
    let tabFromUrl = urlParams.get('tab')
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
  }, [location.search])
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <div>
        <DashSidebar/>
      </div>
       
       {/* profile */}
      <div>
      {tab === 'profile' && <Profile/>}
      </div>
    </div>
  )
}

export default Dashboard