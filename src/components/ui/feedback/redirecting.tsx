import { redirect } from "next/navigation";

export default function Redirecting(): React.JSX.Element {
    redirect("/forbidden");
}