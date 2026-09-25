type MemoListSkeletonProps = {
  className?: string;
};

export default function MemoListSkeleton({
  className = "mt-8",
}: MemoListSkeletonProps) {
  return (
    <div role="status" className={`w-full min-w-0 ${className}`}>
      <span className="sr-only">메모를 불러오는 중입니다.</span>
      <ul
        aria-hidden="true"
        className="flex w-[105%] flex-wrap gap-4 motion-safe:animate-pulse"
      >
        {Array.from({ length: 8 }, (_, index) => (
          <li key={index} className="w-[285px] max-w-full shrink-0">
            <div className="flex h-[285px] w-full flex-col rounded-2xl bg-blue02/50 px-5 py-8">
              <div className="flex shrink-0 items-center justify-between gap-3"></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
