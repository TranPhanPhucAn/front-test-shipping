"use server";

import { revalidateTag } from "next/cache";

export const handleCreateUserAction = async (data: any) => {
  // console.log(data);
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/users`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  revalidateTag("list-users");
  return await res.json();
};
export const handleUpdateUserAction = async (data: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/users/${data.id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  revalidateTag("list-users");
  return await res.json();
};
export const handleDeleteUserAction = async (id: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/users/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  revalidateTag("list-users");
  return await res.json();
};
