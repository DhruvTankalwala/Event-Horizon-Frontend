import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Input, Loader, TextArea as Textarea } from "../index";
import { Card, CardContent, CardHeader, CardTitle } from "../ChartComponent";
import { Github, Instagram, Linkedin, Globe, Edit, Save, X, LinkIcon,Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { editUserProfileApi, getUserProfileApi, updateImageUrlApi } from "../../apiEndPoints";

export default function UserProfileComponent() {
  const {userId} = useParams();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading , setLoading] = useState(true)
  const [error , setError] = useState(null)
  console.log("User-Profile",userId);
  
  useEffect(() => {
    const fetchUserProfile = async()=>{
        const res = await getUserProfileApi(userId);
        if(res.statusCode == 200){
            console.log(res.data);
            setUser(res.data)
            setLoading(false)
        }else{
            toast.error(res.message)
        }
    }
    fetchUserProfile();
  }, [userId]);

  const isOwnProfile = userId === localStorage.getItem("userId");
  
  console.log(isOwnProfile);
  
  const formik = useFormik({
    initialValues: {
      id : user?.id || null,
      name: user?.name || "",
      bio: user?.bio || "",
      imageUrl : user?.imageUrl || null,
      socialPlatforms: user?.socialPlatforms || [],
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      bio: Yup.string().required("Bio is required"),
    }),
    onSubmit: async(values) => {
      setUser(values);
      setLoading(true)
      const res = await editUserProfileApi(values);
      setLoading(false);
      setIsEditing(false);
      toast.success("Profile Updated Successfully");
    },
  });

  const handleImageChange = async(e)=>{
      setError(null)
    const file = e.currentTarget.files[0];
    console.log(file);
    
    if(file){
        if(file.size > 2 * 1024 * 1024){
            setError("Image size should be lesser than 2MB")
        }else{
            console.log(URL.createObjectURL(file));
            document.getElementById("user-image").setAttribute("src",URL.createObjectURL(file))
            const res = await updateImageUrlApi(file);
            console.log(res);
            if(res.statusCode == 200){
                toast.success(res.message)
            }else{
                toast.error("Error updating image")
            }
        } 
    }
  }

  if(loading){
    return <Loader />
  }
  if (!user) return <div>User not found</div>

  return (
    <div className="min-h-screen  text-white">
      <main className="container mx-auto px-4 py-8">
        <motion.h1
          className="text-4xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {isEditing ? "Edit Profile" : "User Profile"}
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Side Profile Card */}
          <Card className="bg-gray-800">
            <CardContent className="p-6 flex flex-col items-center">

                <div className="relative w-32 mb-4">
                <img
                    id="user-image"
                    src={user.imageUrl}
                    alt={user.name}
                    className="w-32 h-32 rounded-full object-cover"
                />
                {isEditing && (
                    <>
                        <label
                        htmlFor="image-upload"
                        className="absolute -bottom-3 right-0 cursor-pointer"
                    >
                        <div className="rounded-full bg-purple-600 p-2 hover:bg-purple-700 transition-colors duration-300">
                        <Pencil className="h-4 w-4 text-white" />
                        </div>
                    </label>
                    <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                    />
                    {error && <p className="text-red-600" >{error}</p>}
                </>
                )}
                </div>
            
              <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
              <p className="text-gray-400 mb-4">{user.email}</p>
              <p className="text-gray-300">{user.bio}</p>
              {isOwnProfile && !isEditing && (
                <Button onClick={() => setIsEditing(true)} className="mt-4 bg-purple-600 hover:bg-purple-700 transition-colors duration-300">
                  <Edit className="w-4 h-4 mr-2" /> Edit Profile
                </Button>
              )}
            </CardContent>
          </Card>
          {/* Right Side Form / Display Card */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {isEditing ? (
              <Card className="bg-gray-800">
                <CardHeader>
                  <CardTitle>Edit Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <Input
                      name="name"
                      placeholder="Name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      className="bg-gray-700 text-white"
                      error={formik.touched.name && formik.errors.name}
                      touched={formik.touched.name}
                    />
                    
                    <Textarea
                      name="bio"
                      placeholder="Bio"
                      value={formik.values.bio}
                      onChange={formik.handleChange}
                      className="bg-gray-700 text-white"
                      error={formik.touched.bio && formik.errors.bio}
                      touched={formik.touched.bio}
                    />

                    <div>
                      <h3 className="text-xl font-bold mt-4">Social Profiles</h3>
                      {formik.values.socialPlatforms.map((profile, index) => (
                        <div key={index} className="mb-4 p-4 bg-gray-700 rounded">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold">{profile.platform}</span>
                            {/* <profile.icon className="w-4 h-4" /> */}
                          </div>
                          <Input
                            name={`socialPlatforms[${index}].platformUsername`}
                            placeholder="Username"
                            value={formik.values.socialPlatforms[index].platformUsername}
                            onChange={formik.handleChange}
                            className="bg-gray-600 text-white mb-2"
                            error={
                              formik.touched.socialPlatforms?.[index]?.platformUsername &&
                              formik.errors.socialPlatforms?.[index]?.platformUsername
                            }
                            touched={formik.touched.socialPlatforms?.[index]?.platformUsername}
                          />
                          <Input
                            name={`socialPlatforms[${index}].platformUrl`}
                            placeholder="Profile URL"
                            value={formik.values.socialPlatforms[index].platformUrl}
                            onChange={formik.handleChange}
                            className="bg-gray-600 text-white"
                            error={
                              formik.touched.socialPlatforms?.[index]?.platformUrl &&
                              formik.errors.socialPlatforms?.[index]?.platformUrl
                            }
                            touched={formik.touched.socialPlatforms?.[index]?.platformUrl}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button type="button" onClick={() => setIsEditing(false)} className="bg-gray-700 hover:bg-gray-600 transition-colors duration-300">
                        <X className="w-4 h-4 mr-2" /> Cancel
                      </Button>
                      <Button type="submit"  className="bg-purple-600 hover:bg-purple-700 transition-colors duration-300">
                        <Save className="w-4 h-4 mr-2" /> Save Changes
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-gray-800">
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{user.bio}</p>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {user.socialPlatforms.map((profile, index) => (
                      <Card key={index} className="bg-gray-800">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                          <CardTitle className="text-sm font-medium">{profile.platform}</CardTitle>
                          {/* <profile.icon className="w-4 h-4 text-gray-400" /> */}
                        </CardHeader>
                        <CardContent>
                          <p className="text-purple-400 mb-2">{profile.platformUsername}</p>
                          {!isOwnProfile && (
                            <Button
                              onClick={() => {
                                window.open(profile.platformUrl, "_blank");
                                toast.success(`Opening ${profile.platform} profile in a new tab.`);

                              }}
                              className="w-full bg-purple-600 hover:bg-purple-700 transition-colors duration-300"
                            >
                              <LinkIcon className="w-4 h-4 mr-2" /> Connect on {profile.platform}
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
