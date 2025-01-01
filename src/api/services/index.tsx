import * as User from "./User";

const requireAllServices = (ctx: any): React.FC<any>[] => {
  const keys = ctx.keys();
  const modules = keys.map(ctx);

  return keys.map((key: string, index: number) => modules[index].StoreProvider);
};

const getAllServices = (): typeof User[] => {
  // return requireAllServices(
  //   require.context("api/services/", true, /index\.tsx$/)
  // );
  return [User];
};

export default getAllServices();
