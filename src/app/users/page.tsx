import UsersTable from "@//components/users/users.table";
const calculatePagesCount = (pageSize: number, totalCount: number) => {
  return totalCount < pageSize ? 1 : Math.ceil(totalCount / pageSize);
};

const UsersPage = async (props: any) => {
  const LIMIT: number = 5;
  const page: number = props?.searchParams?.page ?? 1;
  console.log("api: ", process.env.NEXT_PUBLIC_URL_BACKEND);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/users?_page=${page}&_limit=${LIMIT}`,
    {
      method: "GET",
      // cache: "no-cache",
      // next: {
      //   revalidate: 60,
      // },
      next: {
        tags: ["list-users"],
      },
    }
  );
  // console.log("res: ", res);
  const total_items = +(res.headers?.get("X-Total-Count") ?? 0);
  const total_pages = calculatePagesCount(LIMIT, total_items);
  const data = await res.json();
  // console.log("data:", data);
  return (
    <div>
      <UsersTable
        users={data ? data : []}
        meta={{ current: page, pageSize: LIMIT, total: total_items }}
      />
    </div>
  );
};
export default UsersPage;
