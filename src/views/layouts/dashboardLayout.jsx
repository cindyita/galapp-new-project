// import { useTranslation } from 'react-i18next';
import i18n from '../../services/i18nService';
import { useEffect, useState } from 'react';
import { Outlet } from "react-router-dom";

import { MdDashboard } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { SiGoogleforms } from "react-icons/si";
import { IoMdNotifications } from "react-icons/io";

function DashboardLayout() {

    // const { t } = useTranslation();

    const [languages, setLanguages] = useState({});
    const [selected, setSelected] = useState(i18n.language || 'es');

    useEffect(() => {
    fetch('/locales/_config.json')
    .then(res => res.json())
    .then(data => setLanguages(data))
    .catch(err => console.error('Error loading config.json:', err));
    }, []);

    const handleChange = (e) => {
    const newLang = e.target.value;
    setSelected(newLang);
    i18n.changeLanguage(newLang);
    };

    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

    const toggleSubmenu = (e) => {
        e.preventDefault();
        setIsSubmenuOpen(prev => !prev);
    };

    return ( 
      <>
            <div className="content-layout">
                
                <aside className="menu">
                    <div className="logo">
                        <img src="/img/system/icon-galapp.png" alt="Logo" />
                    </div>
                    <div>
                        <nav className="menu-nav">
                            <ul>
                                <li>
                                    <a href="#">
                                        <div><MdDashboard /></div> <span>Dashboard</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <div><IoMdSettings /></div> <span>Settings</span>
                                    </a>
                                </li>
                                <li>
                                    <a onClick={toggleSubmenu}>
                                        <div><SiGoogleforms /></div> <span>Contacto</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    
                </aside>

                <aside className={`submenu ${isSubmenuOpen ? 'open' : ''}`}>
                    <nav className="submenu-nav">
                        <ul>
                            <li>
                                <a href="#">
                                    <div><MdDashboard /></div> <span>Dashboard</span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div><IoMdSettings /></div> <span>Settings</span>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <div><SiGoogleforms /></div> <span>Buzón de comentarios</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </aside>

                <main>
                    <div className="main-content">
                        <header>
                            <div><i><h4 className="text-tertiary">Dashboard</h4></i></div>
                            <div className="is-flex is-gap-1">
                                <div>
                                    <input className="input" type="text" placeholder="Buscar.." />
                                </div>
                                <div className="select">
                                    <select value={selected} onChange={handleChange}>
                                        {Object.entries(languages).map(([code, name]) => (
                                        <option key={code} value={code}>
                                            {name}
                                        </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <div className="button2">
                                        <IoMdNotifications />
                                    </div>
                                </div>
                                <div>
                                    <nav role="navigation" aria-label="dropdown navigation">
                                        <div className="p-0 navbar-item is-hoverable">
                                            <a> 
                                                <div className="profile">
                                                    <img src="/img/system/profile_default.jpg" alt="Default" />
                                                </div>
                                            </a>

                                            <div className="navbar-dropdown is-right">
                                                <a className="navbar-item">
                                                    Overview
                                                </a>
                                                <a className="navbar-item">
                                                    Elements
                                                </a>
                                                <a className="navbar-item">
                                                    Components
                                                </a>
                                                <hr className="navbar-divider" />
                                                <div className="navbar-item">
                                                    Version 1.0.4
                                                </div>
                                            </div>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                        </header>
                        <div className="main-outlet mt-5 pt-5">
                            <Outlet />
                        </div>
                    </div>

                    <footer>
                        <hr />
                        <i>Galapp Project @ 2025</i>
                    </footer>
                </main>
                
            </div>
      </>
  )
}

export default DashboardLayout;
