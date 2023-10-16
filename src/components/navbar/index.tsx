import React, { useCallback } from "react";
import Dropdown from "components/dropdown";
import { FiAlignJustify } from "react-icons/fi";
import { Link } from "react-router-dom";
import navbarimage from "assets/img/layout/Navbar.png";
import { BsArrowBarUp } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import {
  TbTextDirectionLtr,
  TbTextDirectionRtl
} from "react-icons/tb";
import { Dir } from "layouts/application";
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from "react-redux";
import { setIsDarkMode } from "store/generalSlice";
import { RootState } from "store/rootReducer";



const Navbar = (props: {
  brandText: string;
  onOpenSidenav: () => void;
  onChangeDir: (dir: Dir) => void;
  secondary?: boolean | string;
}) => {
  const { onOpenSidenav, brandText, onChangeDir } = props;
  // const [darkmode, setDarkmode] = React.useState(false);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { isDarkMode } = useSelector((state: RootState) => state.generalSlice);

  const selectedDir: Dir = document.documentElement.dir as Dir;

  const extraClass = selectedDir === "ltr" ? "-left-48" : "left-8";

  const changeLanguage = useCallback((lng: string) => {
    i18n.changeLanguage(lng);
  }, [i18n])

  return (
    <nav className="sticky top-0 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-1 backdrop-blur-xl dark:bg-[#0b14374d]">

      <div className="relative mt-[3px] flex h-[61px] w-full flex-grow items-center justify-between px-10 gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:flex-grow-0 md:gap-1 xl:gap-2">
        <div className="flex h-full items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white xl:w-[225px]">
          <p className="pl-3 pr-2 text-xl">
            <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
          </p>
          <input
            type="text"
            placeholder="Search..."
            className="block h-full w-full rounded-full bg-lightPrimary text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white sm:w-fit"
          />
        </div>
        <span
          className="flex cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden"
          onClick={onOpenSidenav}
        >
          <FiAlignJustify className="h-5 w-5" />
        </span>
        <div className="flex justify-center items-center ">
          <div
            className="cursor-pointer text-gray-600 mx-3"
            onClick={() => {
              onChangeDir(selectedDir === 'rtl' ? "ltr" : 'rtl')
              changeLanguage(i18n.language === "en" ? "ar" : "en")
            }}
          >
            {selectedDir === 'ltr' ? (
              <TbTextDirectionRtl className="h-4 w-4 text-gray-600 dark:text-white" />
            ) : (
              <TbTextDirectionLtr className="h-4 w-4 text-gray-600 dark:text-white" />
            )}
          </div>

          <div
            className="cursor-pointer text-gray-600 mx-3"
            onClick={() => {
              if (isDarkMode) {
                document.body.classList.remove("dark");
                dispatch(setIsDarkMode(false));
              } else {
                document.body.classList.add("dark");
                dispatch(setIsDarkMode(true));
              }
            }}
          >
            {isDarkMode ? (
              <RiSunFill className="h-4 w-4 text-gray-600 dark:text-white" />
            ) : (
              <RiMoonFill className="h-4 w-4 text-gray-600 dark:text-white" />
            )}
          </div>
          {/* Profile & Dropdown */}
          <Dropdown
            button={
              <img
                className="h-10 w-10 rounded-full ml-2"
                src={'/assets/avatar.png'}
                alt="Elon Musk"
              />
            }
            children={
              <div className="flex h-28 w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
                <div className="mt-3 ml-4">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-navy-700 dark:text-white">
                      👋 {`${t('general.navBar.heyMsg')}`}, Mohamed
                    </p>
                  </div>
                </div>
                <div className="mt-3 h-px w-full bg-gray-200 dark:bg-white/20 " />
                <div className="mt-3 ml-4 mx-2 flex flex-col">
                  <a
                    href=" "
                    className="mt-3 text-sm font-medium text-red-500 hover:text-red-500"
                  >
                    {`${t('general.navBar.logOut')}`}
                  </a>
                </div>
              </div>
            }
            // classNames={"py-2 top-8 -left-[180px] w-max"}
            classNames={`py-2 top-8 ${extraClass} w-max`}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
