import React from "react"

const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex gap-2 items-center mb-6">
      <p className="text-gray-500 uppercase tracking-widest text-lg sm:text-2xl">
        {text1}{" "}
        <span className="text-gray-800 font-bold">
          {text2}
        </span>
      </p>
      <div className="flex flex-col gap-[2px]">
        <p className="w-8 sm:w-16 h-[2px] bg-gray-800 rounded-full"></p>
        <p className="w-5 sm:w-10 h-[2px] bg-gray-400 rounded-full self-end"></p>
      </div>
    </div>
  )
}

export default Title
