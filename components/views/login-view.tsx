"use client";

import { supabase } from "@/lib/supabase-client";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { FoundItem } from "@/lib/types";
import StaffView from "./staff-view";

interface PendingItem extends FoundItem {
  id: number;
} 

export default function LoginView() {
  const [session, setSession] = useState<Session>()
  const [login, setLogin] = useState<{email: string; password: string}>({
    email: "",
    password: "",
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!login) return;
    const {error} = await supabase.auth.signInWithPassword({
      email: login.email,
      password: login.password,
    })
    if (error) {
      console.error("Error logging in:", error.message)
      toast.error("Login failed. Please check your credentials and try again.")
      return;
    }
    toast.success("Successfully logged in. Re-open this view.")
    return;
  }

  const handleLogout = async () => {
    const {error} = await supabase.auth.signOut()
    if (error) {
      console.error("Error logging out:", error.message)
      return;
    }
    toast.success("Successfully logged out. Re-open this view.")
    return;
  }

  useEffect(() => {
    const fetchSession = async () => {
      const currentSession = await supabase.auth.getSession()
      setSession(currentSession.data.session || undefined)
    }
    fetchSession()
  },[])
  
  return (
    <>
      {session ? (
        <div className="flex flex-col gap-4 py-4">
          <div className="flex w-full justify-between">
            <p>Welcome, staff member! You are logged in. View pending posts below.</p>
            <Button type="submit" className="self-start start text-white" onClick={handleLogout}>
              Log Out
            </Button>
          </div>
          <StaffView/>
        </div>
      ) : (
        <div className="flex flex-col gap-4 text-center">
          <p>Please log in to access the staff view.</p>
          <form 
            className="flex flex-col gap-4"
            onSubmit={handleLogin}
          >
            <Input
              type="text"
              placeholder="Email..."
              className="hover:cursor-text"
              onChange = {(e) => setLogin({...login, email: e.target.value})}
            />
            <Input
              type="password"
              placeholder="Password..."
              onChange = {(e) => setLogin({...login, password: e.target.value})}
            />
            <Button type="submit" className="self-start start text-white">
              Log In
            </Button>
          </form>
        </div>
      )}
    </>
  )
}