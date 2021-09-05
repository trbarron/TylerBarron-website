const Radiobutton = (params) => {

    const onChange = params.onChange;

    return (
        <div className="main flex border overflow-hidden m-4 select-none">
            <div className="title py-3 my-auto px-5 bg-gray text-white text-sm font-semibold mr-3">{params.title}</div>

            {params.options.map((element) => {
                return (
                    <label className="flex radio p-2 cursor-pointer">
                        <input
                            className="my-auto transform scale-125"
                            type="radio"
                            name="sfg"
                            onChange={() => onChange(element)}
                            key={element}
                        />
                        <div className="title px-2">{element}</div>
                    </label>)
            })}
        </div>
    )
}

export default Radiobutton