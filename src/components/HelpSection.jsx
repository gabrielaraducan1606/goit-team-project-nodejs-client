import { useState } from "react";
import Button from "./button";
import BackupModal from "./backupModal";

const HelpSection = () => {
  const [help, setHelpOpen] = useState(false);

  // const handleSend = () => {
    // console.log("Send Request", { email, message });
    // setIsModalOpen(false);
  // };

  return (
    <div className="p-4 rounded-lg bg-background text-text">
      <img src="/svg/plant.svg" alt="plant" />

      <p className="text-sm mt-4 mb-6 text-text w-[172px]">
        If you need help with <span className="text-[#BEDBB0]">TaskPro</span>,
        check out our support resources or reach out to our customer support
        team.
      </p>

      <div className="flex items-center gap-[8px] mt-6">
        <img src="/svg/help.svg" fill="red" alt="help-symbol" />
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
        <form className=" flex flex-col gap-6">
          <h4>Need Help</h4>
          <div className="flex flex-col gap-3.5">
            <input
              type="email"
              className="outline-0"
              placeholder="Email address"
              name="email"
            ></input>
            <textarea
              className="w-full h-32 py-3.5 px-5 rounded-md text-input-text ring-1 ring-input focus:ring-input-active outline-0"
              placeholder="Comment"
            ></textarea>
          </div>
          <Button type="submit" variant={"primary"}>
            Send
          </Button>
        </form>
      </BackupModal>
    </div>
  );
};

export default HelpSection;
