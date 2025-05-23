import { useState } from "react";
import Button from "./button";
import BackupModal from "./backupModal";
import CustomSvg from "./customSvg";
import { useForm } from "react-hook-form";
import { needHelp } from "../services/userServices";

const HelpSection = ({ triggerToast }) => {
  const [help, setHelpOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const askForHelp = async (data) => {
    const response = await needHelp(data);
    reset();
    setHelpOpen(false);
    if (response !== 200) {
      triggerToast("error");
      return;
    }
    triggerToast("success");
  };

  return (
    <>
      <div className="p-4 rounded-lg bg-background text-text">
        <img src="/images/plant.png" alt="plant" />

        <p className="text-sm mt-4 mb-6 text-text w-[172px]">
          If you need help with{" "}
          <span className="text-[var(--color-secondary)]">TaskPro</span>, check
          out our support resources or reach out to our customer support team.
        </p>

        <div className="flex items-center gap-[8px] mt-6">
          <CustomSvg
            href={"/svg/symbol-defs.svg"}
            id={"icon-help"}
            className={"size-5.5 stroke-current fill-[var(--color-icon-color)]"}
          />
          <span
            className="text-text font-medium cursor-pointer"
            onClick={() => setHelpOpen(true)}
          >
            Need help?
          </span>
        </div>

        {/* NEED HELP MODAL */}
        <BackupModal
          size={"lg"}
          open={help}
          closeModal={() => setHelpOpen(false)}
        >
          <form
            className=" flex flex-col gap-6"
            onSubmit={handleSubmit(askForHelp)}
          >
            <h4>Need Help</h4>
            <div className="flex flex-col gap-3.5">
              <input
                type="email"
                className="outline-0"
                placeholder="Email address"
                {...register("email")}
              ></input>
              <textarea
                className="w-full h-32 py-3.5 px-5 rounded-md text-input-text ring-1 ring-input focus:ring-input-active outline-0"
                placeholder="Comment"
                {...register("comment")}
              ></textarea>
            </div>
            <Button type="submit" variant={"primary"}>
              Send
            </Button>
          </form>
        </BackupModal>
      </div>
    </>
  );
};

export default HelpSection;
