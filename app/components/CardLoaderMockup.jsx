export default function CardLoaderMockup() {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md overflow-hidden border border-gray-300 w-full sm:w-[calc(50%-12px)] lg:w-[30%] flex flex-col min-h-[180px] md:min-h-[400px] animate-pulse">
      {/* Date + Duration Skeleton */}
      <div className="flex justify-between items-center text-xs font-medium text-gray-500">
        <span className="h-4 w-24 bg-gray-200 rounded block" />
        <span className="flex items-center ml-2 bg-gray-100 p-2 rounded-full w-20 h-6">
          <span className="w-4 h-4 rounded-full bg-gray-300 mr-2" />
          <span className="h-4 w-10 bg-gray-200 rounded block" />
        </span>
      </div>
      {/* Title Skeleton */}
      <div className="mt-2 h-6 w-3/4 bg-gray-200 rounded" />
      {/* Content Skeleton */}
      <div className="mt-2 flex-grow">
        <div className="h-4 w-full bg-gray-200 rounded mb-2" />
        <div className="h-4 w-5/6 bg-gray-200 rounded mb-2" />
        <div className="h-4 w-2/3 bg-gray-200 rounded mb-2" />
        <div className="h-4 w-1/2 bg-gray-200 rounded" />
        {/* Read more button mock */}
        <div className="ml-1 mt-2 h-4 w-20 bg-orange-200 rounded" />
      </div>
      {/* Actions Skeleton */}
      <div className="mt-4 flex justify-end items-center space-x-2">
        <span className="p-2 rounded-full bg-gray-200 w-8 h-8" />
        <span className="p-2 rounded-full bg-gray-200 w-8 h-8" />
        <span className="p-2 rounded-full bg-gray-200 w-8 h-8" />
      </div>
    </div>
  );
}
