import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import {
    toggleAnimation,
    toggleLayout,
    toggleMenu,
    toggleNavbar,
    toggleRTL,
    toggleSemiDark,
    toggleTheme
} from '@/store/slices/themeConfig';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { IRootState } from '@/store';
import { DynamicIcons } from '@/components/DynamicIcons/DynamicIcons';

const Setting = () => {
    const { t } = useTranslation();
    const themeConfig = useAppSelector((state: IRootState) => state.themeConfig);
    const dispatch = useAppDispatch();

    const [showCustomizer, setShowCustomizer] = useState(false);
    const [isUserInteracting, setIsUserInteracting] = useState(false);

    useEffect(() => {
        if (isUserInteracting) {
            const configAsJson = JSON.stringify({
                theme: themeConfig.theme,
                menu: themeConfig.menu,
                layout: themeConfig.layout,
                rtlClass: themeConfig.rtlClass,
                navbar: themeConfig.navbar,
                animation: themeConfig.animation
            });

            console.log(configAsJson);

            setIsUserInteracting(false);
        }
    }, [themeConfig, isUserInteracting]);

    const handleReset = () => {
        setIsUserInteracting(true);
    };

    const handleThemeChange = (theme: string) => {
        setIsUserInteracting(true);
        dispatch(toggleTheme(theme));
    };

    const handleMenuChange = (menu: string) => {
        setIsUserInteracting(true);
        dispatch(toggleMenu(menu));
    };

    const handleSemiDarkChange = (semiDark: boolean) => {
        setIsUserInteracting(true);
        dispatch(toggleSemiDark(semiDark));
    };

    const handleLayoutChange = (layout: string) => {
        setIsUserInteracting(true);
        dispatch(toggleLayout(layout));
    };

    const handleRTLChange = (rtlClass: string) => {
        setIsUserInteracting(true);
        dispatch(toggleRTL(rtlClass));
    };

    const handleNavbarChange = (navbar: string) => {
        setIsUserInteracting(true);
        dispatch(toggleNavbar(navbar));
    };

    const handleAnimation = (animation: string) => {
        setIsUserInteracting(true);
        dispatch(toggleAnimation(animation));
    };

    return (
        <div>
            <div
                className={`${(showCustomizer && '!block') || ''} fixed inset-0 bg-[black]/60 z-[51] px-4 hidden transition-[display]`}
                onClick={() => setShowCustomizer(false)}></div>

            <nav
                className={`${
                    (showCustomizer && 'ltr:!right-0 rtl:!left-0') || ''
                } bg-white fixed ltr:-right-[400px] rtl:-left-[400px] top-0 bottom-0 w-full max-w-[400px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-[right] duration-300 z-[51] dark:bg-black p-4`}
            >
                <button
                    type="button"
                    className="bg-primary ltr:rounded-tl-full rtl:rounded-tr-full ltr:rounded-bl-full rtl:rounded-br-full absolute ltr:-left-12 rtl:-right-12 top-0 bottom-0 my-auto w-12 h-10 flex justify-center items-center text-white cursor-pointer"
                    onClick={() => setShowCustomizer(!showCustomizer)}
                >
                    <DynamicIcons name={'IoSettingsOutline'} className="animate-[spin_3s_linear_infinite] w-5 h-5" />
                </button>

                <OverlayScrollbarsComponent defer className="h-[calc(100vh-50px)]">
                    <div className="  h-full">
                        <div className="text-center relative pb-5">
                            <button type="button"
                                    className="absolute top-0 ltr:left-0 rtl:right-0 opacity-80 hover:opacity-100 dark:text-white"
                                    onClick={() => setShowCustomizer(false)}>
                                <DynamicIcons name={'IoIosClose'} className="w-5 h-5" />
                            </button>

                            <h4 className="mb-1 dark:text-white">{t('theme.customizerTitle')}</h4>
                            <p className="text-white-dark">{t('theme.customizerDescription')}</p>
                        </div>

                        <div className="flex flex-wrap items-center justify-center pb-5">
                            <button type="button"
                                    className="btn btn-outline-primary"
                                    onClick={() => handleReset()}
                            >
                                <DynamicIcons name={'BiReset'} className="w-5 h-5 shrink-0 ltr:mr-2 rtl:ml-2" />
                                {t('theme.reset')}
                            </button>
                        </div>

                        <div
                            className="border border-dashed border-white-light dark:border-[#1b2e4b] rounded-md mb-3 p-3">
                            <h5 className="mb-1 text-base dark:text-white leading-none">{t('theme.colorScheme')}</h5>
                            <p className="text-white-dark text-xs">{t('theme.colorSchemeDescription')}</p>
                            <div className="grid grid-cols-3 gap-2 mt-3">
                                <button type="button"
                                        className={`${themeConfig.theme === 'light' ? 'btn-primary' : 'btn-outline-primary'} btn`}
                                        onClick={() => handleThemeChange('light')}>
                                    <DynamicIcons name={'FaSun'} className="w-5 h-5 shrink-0 ltr:mr-2 rtl:ml-2" />
                                    {t('theme.light')}
                                </button>

                                <button type="button"
                                        className={`${themeConfig.theme === 'dark' ? 'btn-primary' : 'btn-outline-primary'} btn`}
                                        onClick={() => handleThemeChange('dark')}>
                                    <DynamicIcons name={'FaMoon'} className="w-5 h-5 shrink-0 ltr:mr-2 rtl:ml-2" />
                                    {t('theme.dark')}
                                </button>

                                <button type="button"
                                        className={`${themeConfig.theme === 'system' ? 'btn-primary' : 'btn-outline-primary'} btn`}
                                        onClick={() => handleThemeChange('system')}>
                                    <DynamicIcons name={'FaLaptop'} className="w-5 h-5 shrink-0 ltr:mr-2 rtl:ml-2" />
                                    {t('theme.system')}
                                </button>
                            </div>
                        </div>

                        <div
                            className="border border-dashed border-white-light dark:border-[#1b2e4b] rounded-md mb-3 p-3">
                            <h5 className="mb-1 text-base dark:text-white leading-none">{t('theme.navigationPosition')}</h5>
                            <p className="text-white-dark text-xs">{t('theme.navigationDescription')}</p>
                            <div className="grid grid-cols-3 gap-2 mt-3">
                                <button type="button"
                                        className={`${themeConfig.menu === 'horizontal' ? 'btn-primary' : 'btn-outline-primary'} btn`}
                                        onClick={() => handleMenuChange('horizontal')}>
                                    {t('theme.horizontal')}
                                </button>

                                <button type="button"
                                        className={`${themeConfig.menu === 'vertical' ? 'btn-primary' : 'btn-outline-primary'} btn`}
                                        onClick={() => handleMenuChange('vertical')}>
                                    {t('theme.vertical')}
                                </button>

                                <button
                                    type="button"
                                    className={`${themeConfig.menu === 'collapsible-vertical' ? 'btn-primary' : 'btn-outline-primary'} btn`}
                                    onClick={() => handleMenuChange('collapsible-vertical')}
                                >
                                    {t('theme.collapsible')}
                                </button>
                            </div>
                        </div>

                        <div
                            className="border border-dashed border-white-light dark:border-[#1b2e4b] rounded-md mb-3 p-3">
                            <h5 className="mb-1 text-base dark:text-white leading-none">{t('theme.layoutStyle')}</h5>
                            <p className="text-white-dark text-xs">{t('theme.layoutDescription')}</p>
                            <div className="flex gap-2 mt-3">
                                <button
                                    type="button"
                                    className={`${themeConfig.layout === 'boxed-layout' ? 'btn-primary' : 'btn-outline-primary'} btn flex-auto`}
                                    onClick={() => handleLayoutChange('boxed-layout')}
                                >
                                    {t('theme.box')}
                                </button>

                                <button type="button"
                                        className={`${themeConfig.layout === 'full' ? 'btn-primary' : 'btn-outline-primary'} btn flex-auto`}
                                        onClick={() => handleLayoutChange('full')}>
                                    {t('theme.full')}
                                </button>
                            </div>
                        </div>

                        <div
                            className="border border-dashed border-white-light dark:border-[#1b2e4b] rounded-md mb-3 p-3">
                            <h5 className="mb-1 text-base dark:text-white leading-none">{t('theme.direction')}</h5>
                            <p className="text-white-dark text-xs">{t('theme.directionDescription')}</p>
                            <div className="flex gap-2 mt-3">
                                <button type="button"
                                        className={`${themeConfig.rtlClass === 'ltr' ? 'btn-primary' : 'btn-outline-primary'} btn flex-auto`}
                                        onClick={() => handleRTLChange('ltr')}>
                                    {t('theme.ltr')}
                                </button>

                                <button type="button"
                                        className={`${themeConfig.rtlClass === 'rtl' ? 'btn-primary' : 'btn-outline-primary'} btn flex-auto`}
                                        onClick={() => handleRTLChange('rtl')}>
                                    {t('theme.rtl')}
                                </button>
                            </div>
                        </div>

                        <div
                            className="border border-dashed border-white-light dark:border-[#1b2e4b] rounded-md mb-3 p-3">
                            <h5 className="mb-1 text-base dark:text-white leading-none">{t('theme.navbarType')}</h5>
                            <p className="text-white-dark text-xs">{t('theme.navbarDescription')}</p>
                            <div className="mt-3 flex items-center gap-3 text-primary">
                                <label className="inline-flex mb-0">
                                    <input
                                        type="radio"
                                        checked={themeConfig.navbar === 'navbar-sticky'}
                                        value="navbar-sticky"
                                        className="form-radio"
                                        onChange={() => handleNavbarChange('navbar-sticky')}
                                    />
                                    <span>{t('theme.sticky')}</span>
                                </label>
                                <label className="inline-flex mb-0">
                                    <input
                                        type="radio"
                                        checked={themeConfig.navbar === 'navbar-floating'}
                                        value="navbar-floating"
                                        className="form-radio"
                                        onChange={() => handleNavbarChange('navbar-floating')}
                                    />
                                    <span>{t('theme.floating')}</span>
                                </label>
                                <label className="inline-flex mb-0">
                                    <input
                                        type="radio"
                                        checked={themeConfig.navbar === 'navbar-static'}
                                        value="navbar-static"
                                        className="form-radio"
                                        onChange={() => handleNavbarChange('navbar-static')}
                                    />
                                    <span>{t('theme.static')}</span>
                                </label>
                            </div>
                        </div>

                        <div
                            className="border border-dashed border-white-light dark:border-[#1b2e4b] rounded-md mb-3 p-3">
                            <h5 className="mb-1 text-base dark:text-white leading-none">{t('theme.routerTransition')}</h5>
                            <p className="text-white-dark text-xs">{t('theme.routerTransitionDescription')}</p>
                            <div className="mt-3">
                                <select className="form-select border-primary text-primary"
                                        value={themeConfig.animation}
                                        onChange={(e) => handleAnimation(e.target.value)}>
                                    <option value=" ">{t('theme.none')}</option>
                                    <option value="animate__fadeIn">{t('theme.fade')}</option>
                                    <option value="animate__fadeInDown">{t('theme.fadeDown')}</option>
                                    <option value="animate__fadeInUp">{t('theme.fadeUp')}</option>
                                    <option value="animate__fadeInLeft">{t('theme.fadeLeft')}</option>
                                    <option value="animate__fadeInRight">{t('theme.fadeRight')}</option>
                                    <option value="animate__slideInDown">{t('theme.slideDown')}</option>
                                    <option value="animate__slideInLeft">{t('theme.slideLeft')}</option>
                                    <option value="animate__slideInRight">{t('theme.slideRight')}</option>
                                    <option value="animate__zoomIn">{t('theme.zoomIn')}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </OverlayScrollbarsComponent>
            </nav>
        </div>
    );
};

export default Setting;
