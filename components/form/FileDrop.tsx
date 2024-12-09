
import { File } from "lucide-react";

type Props = {
    getRootProps: () => {},
    getInputProps: () => {},
    fileList: any[] | null
}

const FileDrop = ({getRootProps,getInputProps,fileList,...props}: Props) => {
    return (
        <div
            {...getRootProps()}
            className="w-full p-9 bg-white rounded-lg shadow-lg"
        >
            <h1 className="text-center text-2xl sm:text-2xl font-semibold mb-4 text-gray-800">
                File Drop and Upload
            </h1>
            <div
                className="bg-gray-100 p-8 text-center rounded-lg border-dashed border-2 border-gray-300 hover:border-blue-500 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-md"
                id="dropzone"
            >
                <label
                    htmlFor="fileInput"
                    className="cursor-pointer flex flex-col items-center space-y-2"
                >
                    <svg
                        className="w-16 h-16 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        ></path>
                    </svg>
                    <span className="text-gray-600">
                        Drag and drop your files here
                    </span>
                    <span className="text-gray-500 text-sm">
                        (or click to select)
                    </span>
                </label>
                <input
                    {...getInputProps()}
                    className="hidden"
                    type="file"
                    id="fileInput"
                    multiple
                />
            </div>
            <div className="mt-6" id="fileList">
                {fileList && fileList?.length > 0
                    ? fileList.map((image) => (
                          <div key={image.name} className="flex gap-3 mb-3">
                              <File />
                              <p className="font-semibold">{image.name}</p>
                          </div>
                      ))
                    : null}
            </div>
        </div>
    );
};

export default FileDrop;
