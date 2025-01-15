import type { Child } from "../../types/api";
import clsx from "clsx";
import { useCheckInChild } from "../../hooks/useCheckInChild";
import { useCheckOutChild } from "../../hooks/useCheckOutChild";

function ChildCard(props: Child) {
  const { childId, checkedIn } = props;
  const checkInChild = useCheckInChild();
  const checkOutChild = useCheckOutChild();

  const handleToggleChildStatus = () => {
    if (checkedIn) {
      checkOutChild.mutate(childId || "");
    } else {
      checkInChild.mutate(childId || "");
    }
  };

  if (!childId) return null;

  return (
    <button
      onClick={handleToggleChildStatus}
      className={clsx(
        "bg-grey-100 rounded-xsmall w-full overflow-hidden shadow-elevation-01 hover:shadow-elevation-02",
        checkedIn
          ? "border-4 border-green-600 hover:border-8"
          : "border border-grey-200 hover:border-4"
      )}
    >
      <span className="relative flex grow items-center justify-center overflow-hidden lg:min-h-[208px] max-h-[280px] p-2 bg-grey-300">
        <img
          alt={props.name.fullName ?? ""}
          src={props.image.large ?? ""}
          className="w-auto h-full cover"
        />
      </span>
      <footer className="relative h-20 flex flex-col grow-0 items-center justify-center w-full bg-gray-100 p-2">
        <span
          className={clsx(
            "absolute z-10 -top-4 h-8 bg-grey-100 rounded-full border-2 border-grey-100",
            checkedIn ? "text-green-600" : "text-red-700"
          )}
        >
          {checkedIn ? checkInIcon : checkOutIcon}
        </span>
        <span className="flex flex-col h-12">{props.name.fullName}</span>
      </footer>
    </button>
  );
}

export default ChildCard;

const checkOutIcon = (
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    data-testid="check-out-icon"
    aria-label="check out"
  >
    <g transform="translate(0,30) scale(0.1,-0.1)" fill="currentColor">
      <path d="M95 286 c-102 -44 -122 -172 -40 -245 64 -56 147 -50 204 14 53 61 50 143 -7 198 -48 46 -102 57 -157 33z m25 -76 c28 -25 29 -25 56 1 24 22 44 19 44 -7 0 -9 -9 -23 -21 -32 l-20 -17 20 -22 c42 -45 19 -77 -27 -38 l-29 24 -22 -26 c-21 -23 -24 -24 -39 -9 -15 14 -14 18 7 40 l23 24 -22 30 c-34 46 -12 69 30 32z" />
    </g>
  </svg>
);

const checkInIcon = (
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    data-testid="check-in-icon"
    aria-label="check in"
  >
    <g transform="translate(0,30) scale(0.1,-0.1)" fill="currentColor">
      <path d="M105 285 c-102 -36 -131 -160 -56 -236 56 -56 146 -56 202 0 106 107 -4 285 -146 236z m145 -80 c10 -12 2 -26 -53 -82 l-65 -67 -41 44 c-23 24 -40 49 -38 55 7 20 38 16 57 -7 l20 -23 42 47 c47 51 59 56 78 33z" />
    </g>
  </svg>
);
