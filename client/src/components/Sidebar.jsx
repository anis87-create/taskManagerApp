import { NavLink } from "react-router-dom";
import { MdDashboard, MdTask, MdCalendarToday } from "react-icons/md";

const Sidebar = () => {
  return (

    <aside className="col-span-2 h-screen  p-4  border-r border-gray-100">
          <nav className="flex flex-col space-y-2">
    
            <NavLink 
              to="dashboard"  
              className={({ isActive }) => 
                `p-3 rounded-md text-gray-700 flex items-center space-x-2 transition duration-300 ${
                  isActive ? "bg-orange-500 text-white" : "hover:bg-gray-100"
                }`}
              end
            >
              <MdDashboard size={20}/>
              <span style={{marginLeft:'5px'}}>Dashboard</span>
            </NavLink>
            
            <NavLink 
              to="/tasks" 
              className={({ isActive }) => 
                `p-3 rounded-md text-gray-700 flex items-center space-x-2 transition duration-300 ${
                  isActive ? "bg-orange-500 text-white" : "hover:bg-gray-100"
                }`}
              end
            >
              <MdTask size={20}/> 
              <span style={{marginLeft:'5px'}}>Tasks</span>
            </NavLink>
            <NavLink 
              to="/calendar" 
              className={({ isActive }) => 
                `p-3 rounded-md text-gray-700 flex items-center space-x-2 transition duration-300 ${
                  isActive ? "bg-orange-500 text-white" : "hover:bg-gray-100"
                }`}
              end
            >
              <MdCalendarToday />
              <span style={{marginLeft:'5px'}}> Calendar</span>
            </NavLink>
          </nav>
        </aside>
     
  );
};

export default Sidebar;
