import List from "@/state-management/recoil-with-family/list";
import {RecoilRoot} from "recoil";

export default function Home() {
  return (
    <RecoilRoot>
      <List />
    </RecoilRoot>
  );
}
