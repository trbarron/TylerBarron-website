const Radiobutton = (params) => {

    const onChange = params.onChange;
    const checkedVal = params.checkedVal;

    return (
        <div className="main flex flex-col md:flex-row border overflow-hidden my-4 select-none">
            <div className="title py-3 my-auto px-5 bg-gray text-white text-sm font-semibold">{params.title}</div>

            {params.options.map((element) => {
                return (
                    <label className="flex radio p-2 cursor-pointer pl-4 ">
                        <input
                            className="my-auto scale-125"
                            type="radio"
                            name="radio-colors"
                            onChange={() => onChange(element)}
                            key={element}                            
                            checked={element === checkedVal}
                        />
                        <div className="title px-2">{element}</div>
                    </label>)
            })}
        </div>
    )
}

export default Radiobutton