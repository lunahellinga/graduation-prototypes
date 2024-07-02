import List from "@/state-management/jotai/list";
import { Provider } from "jotai";

export default function Home() {
  return (
    <Provider>
      <List />
    </Provider>
  );
}
