"use client";
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { CiLogout } from "react-icons/ci";
import { IoMdArrowBack } from "react-icons/io";
import { IoAddCircleOutline } from "react-icons/io5";
import Container from "./ui/Container";
import { useRouter } from "next/navigation";
import Grid from "./ui/Grid";
import CreateDiveForm from "./CreateDiveForm";

const Profile = () => {
  const [openModal, setOpenModal] = useState<Boolean>(false);
  const { data: session } = useSession();
  const { back } = useRouter();

  const createDive = async () => {
    const values = {
      name: "Blanes port",
      country: "Espanya",
      location: "Blanes",
      description: "nice and cold",
      deepth: "12m",
      instructor: "Didac",
      suit: "7mm",
    };

    try {
      await fetch("api/dive", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          values,
        }),
      });
    } catch {
      throw Error("An error ocurred while registering. Please try again ");
    }
  };

  return (
    <Container className="pt-header">
      <div className="flex justify-between py-6 lg:py-12">
        <button className="flex gap-2 items-center" onClick={() => back()}>
          <IoMdArrowBack className="h-7 w-7" />
          <p>Go back</p>
        </button>
        <button className="flex gap-2 items-center" onClick={() => signOut()}>
          <CiLogout className="h-7 w-7" />
          <p>Log out</p>
        </button>
      </div>
      <h1 className="col-span-4 lg:col-span-12 flex justify-center text-3xl lg:text-4xl text-center pb-4">
        Welcome to your profile
      </h1>
      <Grid className="mt-10">
        <div className="col-span-4 lg:col-start-3 text-lg ">
          <div className="pb-6">Your information:</div>
          <div>
            <p>Name:</p>
            <span className="font-bold">{session?.user?.name} </span>
          </div>
          <div className="pt-6">
            <p>Email:</p>
            <span className="font-bold">{session?.user?.email} </span>
          </div>
        </div>
        <div className="col-span-6 lg:col-start-8 text-lg">
          <p className="pb-6">Your dives</p>
          <button
            onClick={() => setOpenModal(true)}
            className="flex gap-2 font-light py-2 border-gray border w-fit px-3 rounded-md bg-primary text-white"
          >
            <IoAddCircleOutline className="h-7 w-7 text-white" />
            <p>Add a dive </p>
          </button>
        </div>
      </Grid>
      {openModal && <CreateDiveForm />}
    </Container>
  );
};

export default Profile;
