import List from "@/state-management/recoil/list";
import {RecoilRoot} from "recoil";

export default function Home() {
  return (
    <RecoilRoot>
      <List />
    </RecoilRoot>
  );
}
