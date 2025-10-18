import Navbar from "../Components/Navbar";
import Select from "react-select";
import { BsStars } from "react-icons/bs";
import { LuCodeXml } from "react-icons/lu";
import Editor from "@monaco-editor/react";
import { useState } from "react";
import { IoCopySharp } from "react-icons/io5";
import { PiExportBold } from "react-icons/pi";
import { ImNewTab } from "react-icons/im";
import { LuRefreshCw } from "react-icons/lu";
import { GoogleGenAI } from "@google/genai";
import { ClipLoader } from "react-spinners";

function Home() {
  const options = [
    { value: "html-css", label: "HTML + CSS" },
    { value: "html-tailwind", label: "HTML + Tailwind CSS" },
    { value: "html-bootstrap", label: "HTML + Bootstrap" },
    { value: "html-css-js", label: "HTML + CSS + JS" },
    {
      value: "html-tailwind-bootstrap",
      label: "HTML + Tailwind CSS + Bootstrap",
    },
  ];

  const [outputScreen, setOutputScreen] = useState(false);
  const [tab, setTab] = useState(1);
  const [prompt, setPrompt] = useState("");
  const [framework, setFramework] = useState(options[0]);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  function extractCode(response) {
    const match = response.match(/```(?:\w+)?\n?([\s\S]*?)```/);
    return match ? match[1].trim() : response.trim();
  }

  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_API_KEY,
  });

  async function getResponse() {
    setLoading(true);
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
       You are an experienced programmer with expertise in web development and UI/UX design. You create modern, animated, and fully responsive UI components. You are highly skilled in HTML, CSS, Tailwind CSS, Bootstrap, JavaScript, React, Next.js, Vue.js, Angular, and more.

Now, generate a UI component for: ${prompt}  
Framework to use: ${framework.value}  

Requirements:  
The code must be clean, well-structured, and easy to understand.  
Optimize for SEO where applicable.  
Focus on creating a modern, animated, and responsive UI design.  
Include high-quality hover effects, shadows, animations, colors, and typography.  
Return ONLY the code, formatted properly in **Markdown fenced code blocks**.  
Do NOT include explanations, text, comments, or anything else besides the code.  
And give the whole code in a single HTML file.
      `,
    });
    console.log(response.text);
    setCode(extractCode(response.text));
    setOutputScreen(true);
    setLoading(false);
  }

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
            onChange={(e) => {
              setFramework(e.value);
            }}
            className="mt-4"
            options={options}
            styles={customStyles}
            placeholder="Select an option"
          />
          <p className="text-[15px] font-[700] mt-4">
            Write your prompt for generating components :{" "}
          </p>
          <textarea
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
            value={prompt}
            className="w-full min-h-[250px] bg-[#09090B] mt-5 h-[200px] rounded-xl p-[10px]"
            placeholder="Write prompt here"
          ></textarea>

          <div className="flex items-center justify-between">
            <p className="text-[gray]">
              Click on Generate Button to generate your UI component{" "}
            </p>
            <button
              onClick={getResponse}
              className="generate flex items-center p-[15px] rounded-lg border-0 bg-gradient-to-r from-purple-400  to-purple-600 mt-3  px-[20px] gap-[10px] transition-all hover:opacity-[0.7]"
            >
              <i>
                <BsStars />
              </i>
              Generate
            </button>
          </div>
        </div>
        <div className="right relative w-[50%] h-[80vh] mt-5 bg-[#141319] rounded-xl">
          {outputScreen === false ? (
            <>
              {loading === true ? (
                <>
                  <div className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.7)] backdrop-blur-sm z-[9999]">
                    <ClipLoader color="#a855f7" size={80} />
                  </div>
                </>
              ) : (
                ""
              )}

              <div className="skeleton w-full h-full flex items-center flex-col justify-center">
                <div className="circle p-[20px] w-[70px] h-[70px] flex items-center justify-center text-[30px] rounded-[50%] bg-gradient-to-r from-purple-400  to-purple-600">
                  <LuCodeXml />
                </div>
                <p className="text-[16px] text-[gray] mt-3">
                  Your component and code will appear here.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="top w-full h-[60px] bg-[#17171C] flex items-center gap-[15px] px-[20px] ">
                <button
                  onClick={() => setTab(1)}
                  className={`btn w-[50%] p-[10px] rounded-xl cursor-pointer transition-all ${
                    tab === 1 ? "bg-[#333]" : ""
                  }`}
                >
                  Code
                </button>
                <button
                  onClick={() => setTab(2)}
                  className={`btn w-[50%] p-[10px] rounded-xl cursor-pointer transition-all ${
                    tab === 2 ? "bg-[#333]" : ""
                  }`}
                >
                  Preview
                </button>
              </div>

              <div className="top-2 w-full h-[60px] bg-[#17171C] flex items-center justify-between gap-[15px] px-[20px]">
                <div className="left">
                  <p className="font-bold">Code Editor</p>
                </div>

                <div className="right flex items-center gap-[10px]">
                  {tab === 1 ? (
                    <>
                      <button className="copy w-[40px] h-[40px] rounded-xl border-[1px] border-zinc-800 flex items-center justify-center transition-all hover:bg-[#333]">
                        <IoCopySharp />
                      </button>

                      <button className="export w-[40px] h-[40px] rounded-xl border-[1px] border-zinc-800 flex items-center justify-center transition-all hover:bg-[#333]">
                        <PiExportBold />
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="copy w-[40px] h-[40px] rounded-xl border-[1px] border-zinc-800 flex items-center justify-center transition-all hover:bg-[#333]">
                        <ImNewTab />
                      </button>

                      <button className="export w-[40px] h-[40px] rounded-xl border-[1px] border-zinc-800 flex items-center justify-center transition-all hover:bg-[#333]">
                        <LuRefreshCw />
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="editor h-full">
                {tab === 1 ? (
                  <>
                    <Editor
                      value={code}
                      height="100%"
                      theme="vs-dark"
                      language="html"
                      
                    />
                  </>
                ) : (
                  <>
                    <div className="preview w-full h-full bg-white text-black flex items-center justify-center"></div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
