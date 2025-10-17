import Navbar from "../Components/Navbar";
import Select from "react-select";
import { BsStars } from "react-icons/bs";
import { LuCodeXml } from "react-icons/lu";

function Home() {

  const options = [
    { value: "html-css", label: "HTML + CSS" },
    { value: "html-tailwind", label: "HTML + Tailwind CSS" },
    { value: "html-bootstrap", label: "HTML + Bootstrap" },
    { value: "html-css-js", label: "HTML + CSS + JS" },
    { value: "html-tailwind-bootstrap", label: "HTML + Tailwind CSS + Bootstrap" },
  ];

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#000", // black background
      borderColor: state.isFocused ? "#555" : "#333", // darker border when focused
      boxShadow: state.isFocused ? "0 0 0 1px #555" : "none",
      color: "#fff", // text color
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#000", // black menu background
      color: "#fff",
    }),
    menuList: (provided) => ({
      ...provided,
      backgroundColor: "#000",
      color: "#fff",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#333" : "#000", // hover effect
      color: "#fff",
      cursor: "pointer",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#fff",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#aaa", // placeholder color
    }),
  };
  
  return (
    <>
      <Navbar />
      <div className="flex items-center px-[100px] justify-between gap-[20px]">
        <div className="left w-[50%] h-auto py-[30px] rounded-xl mt-5 bg-[#141319] p-[20px]">
          <h3 className="text-[24px] sp-text font-semibold">
            AI Component Generator
          </h3>
          <p className="text-[gray] mt-3 text-[16px]">
            Describe your component and let AI do the work
          </p>

          <p className="text-[15px] font-[700] mt-4">Framework</p>
          <Select
            className="mt-4"
            options={options}
            styles={customStyles}
            placeholder="Select an option"
          />
          <p className="text-[15px] font-[700] mt-4">
            Write your prompt for generating components :{" "}
          </p>
          <textarea
            className="w-full min-h-[250px] bg-[#09090B] mt-5 h-[200px] rounded-xl p-[10px]"
            placeholder="Write prompt here"
          ></textarea>

          <div className="flex items-center justify-between">
            <p className="text-[gray]">
              Click on Generate Button to generate your UI component{" "}
            </p>
            <button className="generate flex items-center p-[15px] rounded-lg border-0 bg-gradient-to-r from-purple-400  to-purple-600 mt-3  px-[20px] gap-[10px] transition-all hover:opacity-[0.7]">
              <i>
                <BsStars />
              </i>
              Generate
            </button>
          </div>
        </div>
        <div className="right w-[50%] h-[80vh] mt-5 bg-[#141319] rounded-xl">
          <div className="skeleton w-full h-full flex items-center flex-col justify-center">
            <div className="circle p-[20px] w-[70px] h-[70px] flex items-center justify-center text-[30px] rounded-[50%] bg-gradient-to-r from-purple-400  to-purple-600">
              <LuCodeXml />
            </div>
            <p className="text-[16px] text-[gray] mt-3">Your component and code will appear here.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
