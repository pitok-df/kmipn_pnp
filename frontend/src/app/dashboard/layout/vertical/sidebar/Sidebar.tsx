"use client";

import React, { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import SidebarContent from "./Sidebaritems";
import NavItems from "./NavItems";
import NavCollapse from "./NavCollapse";
import SimpleBar from "simplebar-react";
import FullLogo from "../../shared/logo/FullLogo";
import { Icon } from "@iconify/react";
import Upgrade from "./Upgrade";
import NameUser from "@/app/components/dashboard/NameUser";
import LogoutButton from "../header/LogoutButton";
import { getUserLogin } from "@/services/authServices";

const SidebarLayout = () => {
  const [role, setRole] = useState(null)
  useEffect(() => {
    const fetchingUser = async () => {
      try {
        const user = await getUserLogin()
        setRole(user.role)
        console.log(user);

      } catch (error) {
        console.log("Something went wrong");
        return (<div>gagal menampilkan menu</div>)
      }
    }
    fetchingUser()
  }, []);
  return (
    <>
      <div className="xl:block hidden">
        <div className="flex">
          <Sidebar
            className="fixed menu-sidebar pt-6 bg-white dark:bg-darkgray z-[10]"
            aria-label="Sidebar with multi-level dropdown example"
          >
            <div className="mb-7 px-4 brand-logo">
              <FullLogo />
            </div>

            <SimpleBar className="h-[calc(100vh_-_120px)]">
              <Sidebar.Items className="px-4">
                <Sidebar.ItemGroup className="sidebar-nav">
                  {SidebarContent.map((item, index) => (
                    <React.Fragment key={index}>
                      <h5 className="text-link font-semibold text-sm caption">
                        <span className="hide-menu">{item.heading}</span>
                      </h5>
                      <Icon
                        icon="solar:menu-dots-bold"
                        className="text-ld block mx-auto mt-6 leading-6 dark:text-opacity-60 hide-icon"
                        height={18}
                      />

                      {item.children?.map((child, index) => (
                        child.permission === role ?
                          <React.Fragment key={child.id && index}>
                            {child.children ? (
                              <div className="collpase-items">
                                <NavCollapse item={child} />
                              </div>
                            ) : (
                              <NavItems item={child} />
                            )}
                          </React.Fragment> : ''
                      ))}
                    </React.Fragment>
                  ))}
                </Sidebar.ItemGroup>
              </Sidebar.Items>
              <div className="block sm:hidden  px-4 mt-8 relative">
                <div className="py-4 inline text-[16px] text-slate-900">Wellcome, <strong><NameUser /></strong>! </div>
                <LogoutButton />
              </div>
            </SimpleBar>
          </Sidebar>
        </div>
      </div>
    </>
  );
};

export default SidebarLayout;
