interface Blog {
  title: string;
  content: string;
  authorName: string;
  thumbnail: string;
  publishedDate: string;
}

export const FullBlog = ({
  title,
  content,
  authorName,
  thumbnail,
  publishedDate,
}: Blog) => {
  return (
    <div className="flex items-center justify-center mt-32">
      <div className="flex flex-col items-center rounded-xl shadow-2xl md:flex-row md:max-w-5xl md:h-2/4 dark:bg-slate-200">
        <div className="flex flex-col justify-between p-8 leading-normal w-full md:w-2/3">
          <h5 className="mb-4 text-2xl font-bold dark:text-black">{title}</h5>
          <div className="flex mb-2">
            <div className="pr-2 font-normal text-gray-800 dark:text-gray-500">
              {authorName}
            </div>
            <div className="font-normal text-gray-700 dark:text-gray-500">
              {publishedDate}
            </div>
          </div>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-500">
            {content}
          </p>
        </div>
        <img
          className="object-cover w-full h-96 md:h-full md:w-2/4 rounded-t-lg md:rounded-l-lg"
          src={thumbnail}
          alt=""
        />
      </div>
    </div>
  );
};
