import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import iconSide from "../../../assets/images/IconSideBar.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore";
export default function AppSideBar() {
  let [isCollapsed, setIsCollapsed] = useState(false);
  let { LogoutUser } = useAuthStore();
  let navigate = useNavigate();
  const ToogleSideBar = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <>
      <div className="sideBar-Container  text-white">
        <Sidebar collapsed={isCollapsed}>
          <Menu>
            <div className="img text-center py-4  ">
              <img
                onClick={ToogleSideBar}
                src={iconSide}
                className="sidebar-toggle "
              />
            </div>
            <MenuItem
              component={<Link to={"/dashboard"} />}
              icon={<i className="fa-regular fa-house"></i>}
            >
              {" "}
              Home{" "}
            </MenuItem>
            <MenuItem
              component={<Link to={"/dashboard/users"} />}
              icon={<i className="fa-regular fa-user"></i>}
            >
              Users
            </MenuItem>
            <MenuItem
              component={<Link to={"/dashboard/recipes"} />}
              icon={<i className="fa-solid fa-border-all"></i>}
            >
              Recipes{" "}
            </MenuItem>
            <MenuItem
              component={<Link to={"/dashboard/categories"} />}
              icon={<i className="fa-regular fa-calendar"></i>}
            >
              Categories
            </MenuItem>
            <MenuItem icon={<i className="fa-solid fa-unlock"></i>}>
              {" "}
              Change Password{" "}
            </MenuItem>
            <MenuItem
              onClick={() => LogoutUser(navigate)}
              icon={<i className="fa-solid fa-arrow-right-from-bracket"></i>}
            >
              {" "}
              LogOut{" "}
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
      ;
    </>
  );
}
