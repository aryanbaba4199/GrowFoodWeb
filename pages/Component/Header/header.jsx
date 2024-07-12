import React, { useEffect, useState } from "react";
import Search from "./search";
import { FaHome, FaLockOpen, FaLock, FaCartPlus } from "react-icons/fa";
import Link from "next/link";
import Logo from "@/public/assets/logo.png";
import { useRouter } from "next/router";
import Image from "next/image";
import { logout, fetchUserDetails } from "@/Redux/actions/userAuthAction";
import { MdAdminPanelSettings } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { MdMenu } from "react-icons/md";
import { Drawer } from "@mui/material";
import { SiIfood } from "react-icons/si";

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { token, user } = useSelector((state) => state.auth);
  const [menu, setMenu] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserDetails());
    }
    setIsMounted(true);
  }, [dispatch, token]);

  const handleSignOut = () => {
    dispatch(logout());
    router.reload();
  };

  if (!isMounted) {
    return null; // or return a loading spinner
  }

  

  return (
    <>
      <div className="bg-slate-950 text-white">
        <div className="flex justify-between items-center px-4">
          <div className="w-[20%] flex justify-start gap-3 items-center">
            {user?.email === "aryanbaba4199@gmail.com" && (
              <MdMenu onClick={() => setMenu(!menu)} className="text-3xl hover:cursor-pointer" />
            )}
            <Link href="/">
              <Image
                src={Logo}
                className="w-auto h-12 rounded-full p-1"
                alt="Logo"
              />
            </Link>
          </div>
          <div className="w-[30%]">
            <Search />
          </div>
          <div className="flex justify-start ml-12 items-center gap-12 w-[50%]">
            <Link href="/" className="flex gap-2 ">
              <span>
                <FaHome className="mt-1 text-yellow-500" />
              </span>
              <span>Home</span>
            </Link>
            <Link href="/cart" className="flex gap-2 ">
              <span>
                <FaCartPlus className="mt-1 text-yellow-500" />
              </span>
              <span>Cart</span>
            </Link>
            {token ? (
              <button onClick={handleSignOut} className="flex gap-2 ">
                <span>
                  <FaLockOpen className="mt-1 text-yellow-500" />
                </span>
                <span>Log out</span>
              </button>
            ) : (
              <Link href="/auth" className="flex gap-2 ">
                <span>
                  <FaLock className="mt-1 text-red-500" />
                </span>
                <span>Log In</span>
              </Link>
            )}
            {user?.email === "aryanbaba4199@gmail.com" ? (
              <Link href="/admin" className="flex gap-2 ">
                <span className="mt-1 text-blue-800">
                  <MdAdminPanelSettings />
                </span>
                <span>Admin</span>
              </Link>
            ) : (
              user && (
                <button className="flex gap-2 ">
                  <span className="mt-1 text-blue-800">
                    <MdAdminPanelSettings />
                  </span>
                  <span>Profile</span>
                </button>
              )
            )}
          </div>
        </div>
      </div>
      <Drawer open={menu} onClose={() => setMenu(false)}>
        <div className="bg-slate-950 text-white h-full flex flex-col">
          <div className="flex flex-col justify-center items-center mt-8 font-semibold">
            <SiIfood className="text-7xl" />
            <span className="text-lg">
              Grow <span className="text-green-400">Food</span>
            </span>
          </div>
          <div onClick={()=>setMenu(false)} className="flex focus:bg-green-600 px-12 hover:cursor-pointer hover:bg-gray-800 py-1 justify-start items-center mt-12">
            <Link href={`/admin/dashboard`} className="">Home</Link>
          </div>
          <div onClick={()=>setMenu(false)} className="flex focus:bg-green-600 px-12 hover:cursor-pointer hover:bg-gray-800 py-1 justify-start items-center mt-4">
            <Link href={`/admin/orders`} className="">Orders</Link>
          </div>
          <div onClick={()=>setMenu(false)} className="flex focus:bg-green-600 px-12 hover:cursor-pointer hover:bg-gray-800 py-1 justify-start items-center mt-4">
            <Link href={`/admin/products`} className="">Products</Link>
          </div>
          <div onClick={()=>setMenu(false)} className="flex focus:bg-green-600 px-12 hover:cursor-pointer hover:bg-gray-800 py-1 justify-start items-center mt-4">
            <Link href={`/admin/brands`} className="">Brands</Link>
          </div>
          <div onClick={()=>setMenu(false)} className="flex focus:bg-green-600 px-12 hover:cursor-pointer hover:bg-gray-800 py-1 justify-start items-center mt-4">
            <Link href={`/admin/category`} className="">Category</Link>
          </div>
          <div onClick={()=>setMenu(false)} className="flex focus:bg-green-600 px-12 hover:cursor-pointer hover:bg-gray-800 py-1 justify-start items-center mt-4">
            <Link href={`/admin/analytics`} className="">Analytics</Link>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Header;
