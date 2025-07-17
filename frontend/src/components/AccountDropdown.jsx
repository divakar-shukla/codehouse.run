import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LucideLogOut, NotebookText, User, CirclePlus } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { Navigate, Link } from "react-router-dom";

const AccountDropdown = () => {
  const { LogOut, authUser } = useAuthStore();

  const DoLogOut = async () => {
    try {
      await LogOut();
      Navigate("/login");
    } catch (error) {}
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <img
          src={
            authUser.avatar
              ? authUser.avatar
              : "https://avatar.iran.liara.run/public/30"
          }
          className="w-10"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{authUser.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <NotebookText />
          Dashboard
        </DropdownMenuItem>
        {authUser.role === "ADMIN" && (
          <Link to="/admin/add-problem">
            <DropdownMenuItem>
              <CirclePlus />
              Add Problem
            </DropdownMenuItem>
          </Link>
        )}
        <DropdownMenuItem onClick={DoLogOut}>
          <LucideLogOut />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountDropdown;
