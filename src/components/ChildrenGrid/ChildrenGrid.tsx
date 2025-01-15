import { useEffect, useMemo, useState } from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import { Button, Card, Skeleton } from "@mui/material";
import type { Child } from "../../types/api";
import ChildCard from "../ChildCard/ChildCard";
import { useGetChildren } from "../../hooks/useGetChildren";
import { ACCESS_TOKEN, GROUP_ID, INSTITUTION_ID } from "../../constants/api";

const CHILDREN_PER_PAGE = 10;

function ChildrenGrid() {
  // Read the page number from the URL search params
  const initialPage = parseInt(
    new URLSearchParams(window.location.search).get("page") || "1",
    10
  );
  const { data, isLoading, error } = useGetChildren({
    accessToken: ACCESS_TOKEN,
    groupId: GROUP_ID,
    institutionId: INSTITUTION_ID,
  });

  const [page, setPage] = useState<number>(initialPage);

  useEffect(() => {
    // Update the URL when the page changes without reloading the page
    const params = new URLSearchParams(window.location.search);
    params.set("page", page.toString());

    // Update the browser's URL and preserve history
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );
  }, [page]);

  const currentPage = useMemo(
    () => (page > 0 ? (page - 1) * CHILDREN_PER_PAGE : 1),
    [page]
  );

  const totalPagesNr = useMemo(
    () =>
      data?.children.length
        ? Math.ceil(data?.children.length / CHILDREN_PER_PAGE)
        : 1,
    [data]
  );

  const paginatedData = useMemo(
    () => data?.children.slice(currentPage, CHILDREN_PER_PAGE * page),
    [data, currentPage, page]
  );

  if (error) {
    return <div>Something went wrong. Try again later.</div>;
  }

  if (data?.children.length === 0) {
    return <div>There is no child in the system.</div>;
  }

  if (!data) {
    return null;
  }

  const handleNavigatePage = (type: "previous" | "next") =>
    type === "previous"
      ? setPage((prevState) => prevState - 1)
      : setPage((prevState) => prevState + 1);

  return (
    <section>
      <div className="flex items-center gap-6 justify-center py-6">
        <Button
          variant="contained"
          disabled={isLoading || page === 1}
          onClick={() => handleNavigatePage("previous")}
        >
          previous
        </Button>
        <span>
          {isLoading ? (
            <Skeleton
              animation="wave"
              width={82}
              height={24}
              className="w-full h-full cover"
            />
          ) : (
            `Page ${page} of ${totalPagesNr}`
          )}
        </span>
        <Button
          variant="contained"
          disabled={isLoading || page === totalPagesNr}
          onClick={() => handleNavigatePage("next")}
          className=""
        >
          next
        </Button>
      </div>
      <Box>
        <div className="w-full max-w-7xl flex justify-center items-center">
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 2, sm: 8, md: 10 }}
            className="flex justify-center w-full"
          >
            {isLoading
              ? [...Array(CHILDREN_PER_PAGE)].map((_, i) => (
                  <Grid
                    key={`card-placeholder-${i}`}
                    size={2}
                    className="flex justify-center w-full"
                  >
                    <CardSkeleton />
                  </Grid>
                ))
              : paginatedData?.map((child: Child) => (
                  <Grid
                    key={child.childId}
                    size={2}
                    className="flex justify-center w-full"
                  >
                    <ChildCard {...child} />
                  </Grid>
                ))}
          </Grid>
        </div>
      </Box>
    </section>
  );
}

const CardSkeleton = () => (
  <Card
    data-testid="card-skeleton"
    sx={{
      minWidth: 195,
      minHeight: 274,
      m: 0,
      p: 0,
      paddingBottom: 0,
      width: "100%",
    }}
    className="bg-grey-100 rounded-xsmall w-full overflow-hidden shadow-elevation-01 hover:shadow-elevation-02 border border-grey-200"
  >
    <Skeleton sx={{ height: 208 }} animation="wave" variant="rectangular" />
    <div className="relative h-20 flex flex-col grow-0 items-center justify-center w-full bg-gray-100 p-2">
      <span className="absolute z-10 -top-4 h-8 bg-grey-100 rounded-full border-2 border-grey-100">
        <Skeleton
          sx={{ height: 30, width: 30 }}
          animation="wave"
          variant="circular"
        />
      </span>

      <span className="flex h-12 w-full justify-center">
        <Skeleton
          animation="wave"
          width="70%"
          height={24}
          className="w-full h-full cover"
        />
      </span>
    </div>
  </Card>
);

export default ChildrenGrid;
