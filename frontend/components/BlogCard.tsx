import { Link } from "react-router-dom";

interface BlogCardProps {
  id: string;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  thumbnail: string;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
  thumbnail,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="mt-4 ml-4 ">
        <a
          href="#"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-2xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <img
            className="object-cover w-96 rounded-lg h-72 md:h-48 md:w-52  md:p-2 md:rounded-lg"
            src={thumbnail}
            alt=""
          />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {authorName} . {publishedDate}
            </p>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {content}
            </p>
          </div>
        </a>
      </div>
    </Link>
  );
};
