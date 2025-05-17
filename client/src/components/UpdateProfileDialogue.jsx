import { Dialog, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import React, { useState } from "react";
import { DialogHeader } from "@/components/ui/dialog";
import { USER_API_END_POINT } from "@/utils/constant";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/authSlice";
import axios from "axios";
import { toast } from "sonner";

const UpdateProfileDialogue = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "", // Convert array to string
    file: user?.profile?.resume || null,
  });

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills.split(",").map((skill) => skill.trim())); // Convert back to array

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
        setLoading(true)
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (e) {
      console.error(e);
      toast.error(e.response?.data?.message || "Something went wrong");
    }
    finally{
        setLoading(false)
    }

    setLoading(false);
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={submitHandler}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullName" className="text-right">
                Name
              </Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                onChange={changeEventHandler}
                value={input.fullName}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                onChange={changeEventHandler}
                value={input.email}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phoneNumber" className="text-right">
                Number
              </Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                onChange={changeEventHandler}
                value={input.phoneNumber}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio" className="text-right">
                Bio
              </Label>
              <Input
                id="bio"
                name="bio"
                type="text"
                onChange={changeEventHandler}
                value={input.bio}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="skills" className="text-right">
                Skills
              </Label>
              <Input
                id="skills"
                name="skills"
                type="text"
                onChange={changeEventHandler}
                value={input.skills}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="file" className="text-right">
                Resume
              </Label>
              <Input
                id="file"
                name="file"
                type="file"
                
                accept="application/pdf"
                onChange={fileChangeHandler}
                className="col-span-3"
              />
            </div>
          </div>

          <DialogFooter>
            {loading ? (
              <Button className="w-full my-4">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full my-4">
                Update
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialogue;
