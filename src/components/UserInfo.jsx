import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../redux/selectors";
import BackupModal from "./backupModal";
import CustomSvg from "./customSvg";
import Button from "./button";
import { useForm } from "react-hook-form";
import { updateUserProfile, uploadUserAvatar } from "../services/reduxServices";

const UserInfo = () => {
  const user = useSelector(selectUserData);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState();
  const fileRef = useRef();
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const avatarURL = `${import.meta.env.VITE_API_URL}/auth/${user.avatarURL}`;
  const [defaultAvatar, setAvatar] = useState(
    user.avatarURL ? (
      <img
        src={avatarURL}
        alt="avatar url"
        className="size-[4rem] rounded-lg"
      />
    ) : (
      <CustomSvg
        href={"/svg/user-sprite.svg"}
        id={"user"}
        className={"size-[4rem]"}
      />
    )
  );

  const selectImage = () => {
    fileRef.current.click();
  };

  const displayImage = () => {
    const uploadedFile = fileRef.current.files[0];
    setFile(uploadedFile);
    const fileURL = URL.createObjectURL(uploadedFile);

    setAvatar(
      <img
        src={fileURL}
        alt="avatar image"
        className="size-[4rem] rounded-lg"
      />
    );
  };

  const editUser = async (data) => {
    dispatch(updateUserProfile(data));
    if (file) {
      dispatch(uploadUserAvatar(file));
    }
    setAvatar(
      user.avatarURL ? (
        <img
          src={avatarURL}
          alt="avatar url"
          className="size-[4rem] rounded-lg"
        />
      ) : (
        <CustomSvg
          href={"/svg/user-sprite.svg"}
          id={"user"}
          className={"size-[4rem]"}
        />
      )
    );
    setOpen(false);
    setFile();
    reset();
  };

  return (
    <>
      <div
        className="flex items-center space-x-3 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <span className="font-medium">{user.name || "User"}</span>
        {user.avatarURL ? (
          <img src={avatarURL} alt="avatar url" className="size-8 rounded-lg" />
        ) : (
          <CustomSvg
            href={"/svg/user-sprite.svg"}
            id={"user"}
            className={"size-8"}
          />
        )}
      </div>
      <BackupModal open={open} closeModal={() => setOpen(false)}>
        <h4>Edit Profile</h4>
        <div className="flex justify-center relative">
          {defaultAvatar}
          <Button
            variant={"small"}
            className={
              "absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 size-6"
            }
            onClick={selectImage}
          >
            +
          </Button>
        </div>
        <form
          onSubmit={handleSubmit(editUser)}
          className="flex flex-col gap-3.5"
        >
          <label>
            <input
              type="file"
              id="file"
              hidden
              ref={fileRef}
              onChange={displayImage}
            />
          </label>
          <input
            className="outline-0"
            defaultValue={user.name}
            {...register("name")}
          />
          <input
            className="outline-0"
            defaultValue={user.email}
            {...register("email")}
          />
          <input
            className="outline-0"
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          <Button type="submit" variant={"primary"}>
            Send
          </Button>
        </form>
      </BackupModal>
    </>
  );
};

export default UserInfo;
