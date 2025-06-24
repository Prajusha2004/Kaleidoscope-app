import { Link } from 'react-router-dom';

export default function BackButton() {
  return (
    <Link
      to="/"
      className="inline-flex items-center border border-orange-500 text-orange-700 px-4 py-2 rounded-full bg-orange-50 hover:bg-orange-100 transition"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      Back to Home
    </Link>
  );
}
