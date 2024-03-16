import { redirect } from "next/navigation";
import { checkRole } from "../../../utils/roles";
import { SearchUsers } from "./_search-users";
import { auth, clerkClient, currentUser } from "@clerk/nextjs";
import { setRole } from "./_actions";
// import {handleAction} from '../../../components/pageRefresher'
 
export default async function AdminDashboard(params: {
  searchParams: { search?: string };
}) {

  if (!checkRole("admin")) {
    redirect("/");
    
  }
  const {userId} = auth()
  
 
  const query = params.searchParams.search;
  // const clerkClient = 
 
  const users = query ? (await clerkClient.users.getUserList({ query })) : [];
 
  return (
    <>
    <section className='mt-8'>

    <h1 className='text-center text-primary mb-4 text-2xl'>Admin's Dashboard</h1>
      <SearchUsers />
 
      {users.map((user) => {
        return (
          <div key={user.id} className="mx-auto flex md:flex-row flex-col justify-between p-2 mt-5">
          <div className="flex md:flex-row flex-col md:gap-8 md:items-center">
            <div>
              {user.firstName} {user.lastName}
            </div>
            <div>
              {
                user.emailAddresses.find(
                  (email) => email.id === user.primaryEmailAddressId
                )?.emailAddress
              }
            </div>
            <div>{user.publicMetadata.role as string}</div>
          </div>
          <div className="flex flex-row lg:text-sm md:gap-3 md:ml-8 md:border-l-4 lg:p-2 lg:gap-2 ">
          <div className=" w-7 text-gray-700 "></div>
            <div>
              <form action={setRole}>
                <input type="hidden" value={user.id} name="id" />
                <input type="hidden" value="admin" name="role" />
                {
                  user.id == userId ? (
                    <button disabled={true} className="disabled:bg-gray-600 lg:text-sm cursor-not-allowed" type="submit">Make Admin</button>
                    
                    ):
                  <button type="submit">Make Admin</button>
                  }
              </form>
            </div>
            <div>
              <form action={setRole}>
                <input type="hidden" value={user.id} name="id" />
                <input type="hidden" value="moderator" name="role" />
                {
                  user.id == userId ? (
                    <button disabled={true} className="disabled:bg-gray-600 lg:text-sm cursor-not-allowed" type="submit">Make Admin</button>
                    
                    ):
                <button type="submit">Make Moderator</button>
                  }
              </form>
            </div>
          </div>
          </div>
        );
      })}
      </section>
    </>
  );
}