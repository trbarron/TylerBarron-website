const Radiobutton = (params) => {

    return (
        <div class="main flex border rounded-full overflow-hidden m-4 select-none">
            <div class="title py-3 my-auto px-5 bg-blue-500 text-white text-sm font-semibold mr-3">Type of Opponent</div>
            <label class="flex radio p-2 cursor-pointer">
                <input class="my-auto transform scale-125" type="radio" name="sfg" />
                <div class="title px-2">Human</div>
            </label>

            <label class="flex radio p-2 cursor-pointer">
                <input class="my-auto transform scale-125" type="radio" name="sfg" />
                <div class="title px-2">Random</div>
            </label>

            <label class="flex radio p-2 cursor-pointer">
                <input class="my-auto transform scale-125" type="radio" name="sfg" />
                <div class="title px-2">Strong Opponent</div>
            </label>

            <label class="flex radio p-2 cursor-pointer">
                <input class="my-auto transform scale-125" type="radio" name="sfg" />
                <div class="title px-2">1000's of Opponents</div>
            </label>

        </div>
    )
}

export default Radiobutton