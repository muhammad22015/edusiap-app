import React from 'react';

const UploadForm: React.FC = () => {
    return (
        <form
            className="flex relative flex-col items-start pt-6 pr-20 pb-20 pl-8 mt-2.5 w-full text-base text-black min-h-[924px] max-md:px-5 max-md:max-w-full"
            style={{ backgroundColor: '#F6E9DA' }}
        >
            <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/c0d52516637309c6a7d9f01766fd46c0a52b6a06?placeholderIfAbsent=true&apiKey=600b45a3b00b44838808f9741fb53917"
                alt=""
                className="object-cover absolute inset-0 size-full"
            />
            <h2 className="relative text-3xl font-medium text-slate-700">Upload Video</h2>

            <label htmlFor="url-video" className="relative mt-16 ml-6 max-md:mt-10 max-md:ml-2.5">
                Url Video
            </label>
            <input
                type="url"
                id="url-video"
                className="relative px-8 py-3.5 mt-3 ml-6 max-w-full rounded-lg bg-stone-50 w-[1042px] max-md:px-5"
                placeholder="Alexa Rawles"
            />

            <label htmlFor="video-title" className="relative mt-8 ml-6 max-md:ml-2.5">
                Judul Video
            </label>
            <input
                type="text"
                id="video-title"
                className="relative px-9 py-3.5 mt-3 ml-6 max-w-full whitespace-nowrap rounded-lg bg-stone-50 w-[1042px] max-md:px-5"
                placeholder="AlxRawwrr"
            />

            <label htmlFor="video-description" className="relative mt-9 ml-6 max-md:ml-2.5">
                Deskripsi Video
            </label>
            <textarea
                id="video-description"
                className="relative px-9 pt-3.5 pb-24 mt-3 ml-6 max-w-full whitespace-nowrap rounded-lg bg-stone-50 w-[1042px] max-md:px-5"
                placeholder="AlxRawwrr"
            ></textarea>

            <label htmlFor="thumbnail" className="relative mt-8 ml-6 max-md:ml-2.5">
                Thumbnail
            </label>
            <input
                type="file"
                id="thumbnail"
                accept="image/*"
                className="sr-only"
            />
            <label
                htmlFor="thumbnail"
                className="relative px-7 py-2.5 mt-4 ml-6 text-white whitespace-nowrap bg-lime-900 rounded-lg max-md:px-5 max-md:ml-2.5 cursor-pointer"
            >
                Input
            </label>

            <div className="relative mt-9 ml-6 max-md:ml-2.5">Tambahkan Kuis</div>
            <button
                type="button"
                className="relative px-7 py-2.5 mt-5 ml-5 text-white whitespace-nowrap bg-lime-900 rounded-lg max-md:px-5 max-md:ml-2.5"
            >
                Tambahkan
            </button>

            <button
                type="submit"
                className="relative self-center px-16 py-2.5 mt-8 max-w-full text-center text-white whitespace-nowrap bg-lime-900 rounded-lg w-[390px] max-md:px-5"
            >
                Upload
            </button>
        </form>
    );
};

export default UploadForm;
