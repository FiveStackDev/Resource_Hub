import Button from '@mui/material/Button';
import './css/Slidebar.css';
import { MdSpaceDashboard } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { GiHotMeal } from "react-icons/gi";
import { FaBoxOpen, FaTools, FaCog } from "react-icons/fa";
import { PiUsersFill } from "react-icons/pi";
import { IoDocumentsSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Slidebar() {

    const [activeTab, setActiveTab] = useState(0);
    const [isToggleSubmenu, setIsToggleSubmenu] = useState(false);

    function isOpenSubMenu(index) {
        setActiveTab(index);
        setIsToggleSubmenu(!isToggleSubmenu);
    }

    return (
        <div className='slidebar'>
            <ul>
                <li>
                    <Link to={'admin/DashboardAdmin'}>
                        <Button className='w-100'>
                            <span className='icon'><MdSpaceDashboard /></span>
                            Dashboard
                            <span className='arrow'></span>
                        </Button>
                    </Link>
                </li>
                <li>
                    <Button 
                        className={`w-100 ${activeTab === 1 ? 'active' : ''}`} 
                        onClick={() => isOpenSubMenu(1)}>
                        <span className='icon'><GiHotMeal /></span>
                        Meal
                        <span className='arrow'><IoIosArrowForward /></span>
                    </Button>
                    <div className={`submenuWrapper ${activeTab === 1 && isToggleSubmenu === true ? 'collapsed show' : 'collapsed'}`}> 
                        <ul className="submenu">
                            <li><Link to="admin/MealCalander">Meal Calander</Link></li>
                            <li><Link to="admin/AddMealTime">Add Meal Time</Link></li>
                            <li><Link to="admin/AddMealType">Add Meal Type</Link></li>
                        </ul>
                    </div>
                </li>
                <li>
                    <Button 
                        className={`w-100 ${activeTab === 2 ? 'active' : ''}`} 
                        onClick={() => isOpenSubMenu(2)}>
                        <span className='icon'><FaBoxOpen /></span>
                        Assets
                        <span className='arrow'><IoIosArrowForward /></span>
                    </Button>
                    <div className={`submenuWrapper ${activeTab === 2 && isToggleSubmenu === true ? 'collapsed show' : 'collapsed'}`}> 
                        <ul className="submenu">
                            <li><Link to="#">product list</Link></li>
                            <li><Link to="#">product list</Link></li>
                        </ul>
                    </div>
                </li>
                <li>
                    <Button 
                        className={`w-100 ${activeTab === 3 ? 'active' : ''}`} 
                        onClick={() => isOpenSubMenu(3)}>
                        <span className='icon'><FaTools /></span>
                        Maintenance
                        <span className='arrow'><IoIosArrowForward /></span>
                    </Button>
                    <div className={`submenuWrapper ${activeTab === 3 && isToggleSubmenu === true ? 'collapsed show' : 'collapsed'}`}> 
                        <ul className="submenu">
                            <li><Link to="#">product list</Link></li>
                            <li><Link to="#">product list</Link></li>
                        </ul>
                    </div>
                </li>
                <li>
                    <Button 
                        className={`w-100 ${activeTab === 4 ? 'active' : ''}`} 
                        onClick={() => isOpenSubMenu(4)}>
                        <span className='icon'><PiUsersFill /></span>
                        Users
                        <span className='arrow'><IoIosArrowForward /></span>
                    </Button>
                    <div className={`submenuWrapper ${activeTab === 4 && isToggleSubmenu === true ? 'collapsed show' : 'collapsed'}`}> 
                        <ul className="submenu">
                            <li><Link to="admin/users">User list</Link></li>
                        </ul>
                    </div>
                </li>
                <li>
                    <Button 
                        className={`w-100 ${activeTab === 5 ? 'active' : ''}`} 
                        onClick={() => isOpenSubMenu(5)}>
                        <span className='icon'><IoDocumentsSharp /></span>
                        Reports
                        <span className='arrow'><IoIosArrowForward /></span>
                    </Button>
                    <div className={`submenuWrapper ${activeTab === 5 && isToggleSubmenu === true ? 'collapsed show' : 'collapsed'}`}> 
                        <ul className="submenu">
                            <li><Link to="#">product list</Link></li>
                            <li><Link to="#">product list</Link></li>
                        </ul>
                    </div>
                </li>
            </ul>

            <div className="settings-container">
                <Link to={'/'}>
                    <div className="settings-button">
                        <FaCog /> Profile Settings
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Slidebar;
