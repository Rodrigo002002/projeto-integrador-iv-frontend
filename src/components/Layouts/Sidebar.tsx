import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { toggleSidebar } from '@/store/themeConfigSlice';
import { IRootState } from '@/store';
import React, { useState, useEffect } from 'react';
import { DynamicIcons } from '../DynamicIcons/DynamicIcons';
import AnimateHeight from 'react-animate-height';

const Sidebar = () => {
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const [errorSubMenu, setErrorSubMenu] = useState(false);
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    // @ts-ignore
    const semidark = useSelector((state: IRootState) => state.themeConfig.light);
    const location = useLocation();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    // @ts-ignore
    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="bg-white dark:bg-black h-full">
                    <div className="flex justify-between items-center px-4 py-3">
                        <NavLink to="/" className="main-logo flex items-center shrink-0">
                            <img className="w-8 ml-[5px] flex-none" src="/assets/images/logo.svg" alt="logo" />
                            <span className="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light">{t('AthleteVision')}</span>
                        </NavLink>

                        <button
                            type="button"
                            className="rounded-full hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <DynamicIcons className="w-5 h-5" name="IoClose" />
                        </button>
                    </div>
                    <PerfectScrollbar className="h-[calc(100vh-80px)] relative">
                        <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                            <li className="menu nav-item">
                                <Link type="button"
                                      to="/"
                                      className={`${currentMenu === 'home' ? 'active' : ''} nav-link group w-full`}
                                      onClick={() => toggleMenu('home')}>
                                    <div className="flex items-center">
                                        <DynamicIcons
                                            name="FaHome"
                                            className="group-hover:!text-primary shrink-0"
                                        />
                                        <span
                                            className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('home')}</span>
                                    </div>
                                </Link>
                            </li>

                            <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <DynamicIcons name="FaPerson" className="w-4 h-5 flex-none hidden" />
                                <span>{t('consult')}</span>
                            </h2>

                            <li className="menu nav-item">
                                <button type="button"
                                        className={`${currentMenu === 'teacher' ? 'active' : ''} nav-link group w-full`}
                                        onClick={() => toggleMenu('teacher')}>
                                    <div className="flex items-center">
                                        <DynamicIcons name="FaPerson" className="group-hover:!text-primary shrink-0" />
                                        <span
                                            className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('teacher')}</span>
                                    </div>

                                    <div className={currentMenu !== 'teacher' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <DynamicIcons name="FaCaretDown" />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'teacher' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/professor/consultar">{t('consult')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <li className="menu nav-item">
                                <button type="button"
                                        className={`${currentMenu === 'service' ? 'active' : ''} nav-link group w-full`}
                                        onClick={() => toggleMenu('service')}>
                                    <div className="flex items-center">
                                        <DynamicIcons name="MdDesignServices"
                                                      className="group-hover:!text-primary shrink-0" />
                                        <span
                                            className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('service')}</span>
                                    </div>

                                    <div className={currentMenu !== 'service' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <DynamicIcons name="FaCaretDown" />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'service' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink
                                                to="/servico/tipo/consultar">{`${t('type')} / ${t('consult')}`}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <li className="menu nav-item">
                                <button type="button"
                                        className={`${currentMenu === 'class' ? 'active' : ''} nav-link group w-full`}
                                        onClick={() => toggleMenu('class')}>
                                    <div className="flex items-center">
                                        <DynamicIcons name="FaPeopleGroup"
                                                      className="group-hover:!text-primary shrink-0" />
                                        <span
                                            className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('class')}</span>
                                    </div>

                                    <div className={currentMenu !== 'class' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <DynamicIcons name="FaCaretDown" />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'class' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/turma/consultar">{t('consult')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <li className="menu nav-item">
                                <button type="button"
                                        className={`${currentMenu === 'student' ? 'active' : ''} nav-link group w-full`}
                                        onClick={() => toggleMenu('student')}>
                                    <div className="flex items-center">
                                        <DynamicIcons name="FaRegAddressBook"
                                                      className="group-hover:!text-primary shrink-0" />
                                        <span
                                            className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('student')}</span>
                                    </div>

                                    <div className={currentMenu !== 'student' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <DynamicIcons name="FaCaretDown" />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'student' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/aluno/consultar">{t('consult')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <li className="menu nav-item">
                                <button type="button"
                                        className={`${currentMenu === 'team' ? 'active' : ''} nav-link group w-full`}
                                        onClick={() => toggleMenu('team')}>
                                    <div className="flex items-center">
                                        <DynamicIcons name="FaArrowsDownToPeople"
                                                      className="group-hover:!text-primary shrink-0" />
                                        <span
                                            className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('team')}</span>
                                    </div>

                                    <div className={currentMenu !== 'team' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <DynamicIcons name="FaCaretDown" />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'team' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/equipe/consultar">{t('consult')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <li className="menu nav-item">
                                <button type="button"
                                        className={`${currentMenu === 'event' ? 'active' : ''} nav-link group w-full`}
                                        onClick={() => toggleMenu('event')}>
                                    <div className="flex items-center">
                                        <DynamicIcons name="CiTrophy"
                                                      className="group-hover:!text-primary shrink-0" />
                                        <span
                                            className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('event')}</span>
                                    </div>

                                    <div className={currentMenu !== 'event' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <DynamicIcons name="FaCaretDown" />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'event' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/evento/consultar">{t('consult')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <li className="menu nav-item">
                                <button type="button"
                                        className={`${currentMenu === 'plan' ? 'active' : ''} nav-link group w-full`}
                                        onClick={() => toggleMenu('plan')}>
                                    <div className="flex items-center">
                                        <DynamicIcons name="CiMoneyCheck1"
                                                      className="group-hover:!text-primary shrink-0" />
                                        <span
                                            className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('plan')}</span>
                                    </div>

                                    <div className={currentMenu !== 'plan' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <DynamicIcons name="FaCaretDown" />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'plan' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/plano/consultar">{t('plan')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>
                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
