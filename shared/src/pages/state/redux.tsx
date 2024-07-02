import List from "@/state-management/redux/list";

import { Provider } from "react-redux";
import { store } from "@/state-management/redux/store";

export default function Home() {
  return (
    <Provider store={store}>
      <List />
    </Provider>
  );
}
