import React from "react";

type RadioProps = {
    onChange: (element: any) => any;
    checkedVal: string;
    title: string;
    options: string[];
    default?: string;
};

const Radiobutton: React.FC<RadioProps> = ({ onChange, checkedVal, title, options }) => {

    return (
        <div className="main flex flex-col md:flex-row border overflow-hidden my-4 select-none">
            <div className="title py-3 my-auto px-5 bg-gray text-white text-sm font-semibold">{title}</div>

            {options.map((element) => {
                return (
                    <label key={element} className="flex radio p-2 cursor-pointer pl-4 ">
                        <input
                            className="my-auto scale-125"
                            type="radio"
                            name="radio-colors"
                            onChange={() => onChange(element)}
                            checked={element === checkedVal}
                        />
                        <div className="title px-2">{element}</div>
                    </label>
                );
            })}
        </div>
    )
}

export default Radiobutton;