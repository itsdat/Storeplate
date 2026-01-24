import VerifyEmailLayout from "@/layouts/home/verify-email/VerifyEmailLayout";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const query = await searchParams;
  const token = query.token;
  //   if(token){
  //     const res = await AuthApis.verifyMail(token)

  //   }
  return <VerifyEmailLayout token={token} />;
}
