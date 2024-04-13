import { getUserById } from "@/service/api/user";
import { notFound } from "next/navigation";
import { EditUserForm } from "./edit-user-form";

const EditUserPage = async ({ params: { id } }: { params: { id: string } }) => {
  const user = await getUserById(id);
  if (!user) notFound();

  return <EditUserForm {...user} />;
};

export default EditUserPage;
