"use client";

import { TiFlagOutline } from "react-icons/ti";

const Header = () => (
  <div className=" text-center flex flex-col bg-gray-700 text-white shadow-xl">
    <div className=" text-4xl">Flagle</div>
    <div>Worldle for flags</div>
    <Icon icon={<TiFlagOutline size="30" />} />
  </div>
);

const Icon = ({ icon, text = "Built by Caden 💡" }) => (
  <div className="icon group">
    {icon}
    <span className="tooltip group-hover:scale-100"> {text}</span>
  </div>
);

export default Header;
